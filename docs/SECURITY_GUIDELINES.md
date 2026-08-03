# SECURITY_GUIDELINES.md — Principes de sécurité

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : CTO / Lead Software Architect
> **Documents liés** : [[PROJECT_CHARTER.md]] §3.7, [[ARCHITECTURE_PRINCIPLES.md]], [[DEFINITION_OF_DONE.md]]

---

## 1. Authentification

- Melodia délègue l'authentification à la source de données (`MusicSource` — voir [[ARCHITECTURE_PRINCIPLES.md]] §2) ; Melodia ne stocke jamais de mot de passe en clair, y compris temporairement en mémoire au-delà de la requête d'authentification initiale.
- Le flux d'authentification obtient un token de session auprès du serveur, qui seul est conservé (voir §2).
- Support prévu pour l'authentification multi-serveurs (un utilisateur peut connecter plusieurs bibliothèques/serveurs) sans mélange de sessions entre elles.

## 2. Stockage sécurisé

- **Desktop/Mobile (natif, via Tauri)** : les tokens d'authentification sont stockés via le trousseau natif de l'OS (Windows Credential Manager, Keychain macOS, Secret Service Linux, Keystore Android, Keychain iOS) — jamais en fichier texte brut, jamais dans `localStorage`.
- **Web/PWA** : en l'absence de trousseau natif, le token est stocké de façon chiffrée dans IndexedDB (jamais `localStorage` en clair, vulnérable à toute XSS — voir §3), avec une durée de vie de session limitée et un renouvellement explicite.
- Aucune donnée sensible (token, identifiants) n'est jamais journalisée, même en mode debug (voir §9).

## 3. Protection XSS
- Aucun rendu de HTML non échappé provenant d'une source externe (métadonnées de piste, paroles, notes d'album) sans passage par une sanitisation stricte (liste blanche de balises minimales si le formatage riche est nécessaire, sinon texte brut).
- `dangerouslySetInnerHTML` (React) est interdit sauf dérogation documentée par ADR avec sanitisation prouvée par test.
- Content Security Policy stricte activée sur le build Web (pas de `unsafe-inline` pour les scripts).

## 4. Protection CSRF
- Les requêtes vers `MusicSource` utilisent des tokens d'authentification en en-tête (Bearer), pas de cookies de session porteurs d'autorité implicite — ce qui rend la classe d'attaque CSRF non applicable au modèle d'authentification retenu. Si un mode d'authentification par cookie devait être introduit pour un futur connecteur, un jeton anti-CSRF serait obligatoire (à documenter par ADR le cas échéant).

## 5. Protection des tokens
- Durée de vie des tokens minimisée côté client (renouvellement plutôt que conservation longue durée quand le serveur le permet).
- Révocation immédiate du token local lors d'une déconnexion explicite, sur tous les appareils si le serveur le supporte.
- Aucun token transmis à un tiers (pas de service d'analytics recevant des en-têtes d'authentification, même par erreur d'instrumentation).

## 6. Validation
- Toute donnée entrant dans l'application depuis une source externe (réponse serveur, fichier de configuration, import de playlist) est validée par un schéma (Zod — voir [[TECH_STACK.md]]) à la frontière de la couche Data, avant d'atteindre la couche Domain.
- Toute donnée saisie par l'utilisateur (recherche, renommage de playlist) est validée et échappée avant tout usage dans une requête ou un rendu.

## 7. Permissions
- Sur Desktop/Mobile, Melodia demande uniquement les permissions OS strictement nécessaires (accès réseau, stockage local, notifications, contrôle média) — principe du moindre privilège. Toute nouvelle permission requise par une fonctionnalité future doit être justifiée explicitement dans la PR correspondante et documentée à l'utilisateur au moment de la demande.
- Aucun accès au système de fichiers en dehors des répertoires applicatifs dédiés (téléchargements hors ligne, cache), sauf action explicite de l'utilisateur (ex. sélection d'un dossier d'export).

## 8. Gestion des erreurs
- Les erreurs affichées à l'utilisateur ne révèlent jamais de détail d'implémentation sensible (trace de pile, chemin de fichier serveur, structure interne de la base locale).
- Les erreurs de la couche Data (`MusicSource`, `LocalStore`) sont typées (voir [[CODING_STANDARDS.md]] §4.4) et traduites en messages utilisateur génériques et actionnables par la couche UI.

## 9. Journalisation
- Aucune donnée personnelle ou sensible (identifiants, tokens, contenu de bibliothèque personnelle identifiable) dans les journaux, y compris en développement.
- Les journaux de diagnostic envoyés volontairement par un utilisateur (rapport de bug) sont expurgés automatiquement des champs sensibles avant export.
- Toute télémétrie est **opt-in explicite**, anonymisée, et documentée précisément (quelles données, à quelle fin, durée de conservation) — cohérent avec [[PROJECT_CHARTER.md]] §4 (Melodia ne collecte ni ne revend de données utilisateur par défaut).

## 10. Dépendances et supply chain
- Analyse automatisée des vulnérabilités connues (CVE) sur les dépendances à chaque PR et de façon planifiée (voir [[ENGINEERING_GUIDE.md]] §2.5).
- Verrouillage strict des versions de dépendances (lockfile commité), aucune installation depuis une source non officielle.

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0) | CTO / Lead Software Architect |

# JELLYFIN_INTEGRATION.md — Intégration Jellyfin concrète (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Principal Software Architect
> **Documents liés** : [[ARCHITECTURE_PRINCIPLES.md]] §2, [[SECURITY_GUIDELINES.md]], [[DATA_LAYER.md]]

Ce document est l'implémentation concrète de `JellyfinSource`, la seule implémentation actuelle de l'interface `MusicSource` définie dans [[ARCHITECTURE_PRINCIPLES.md]] §2. Rien ici ne fuit au-delà de la couche Data — la couche Domain et la couche UI ne connaissent que `MusicSource`, jamais Jellyfin directement (rappel de l'invariant d'architecture).

---

## 1. Choix du client d'API

**Décision retenue : SDK officiel `@jellyfin/sdk` (npm), plutôt qu'un client HTTP écrit à la main.**

| Option | Avantages | Inconvénients |
|---|---|---|
| Client HTTP maison | Contrôle total, aucune dépendance externe | Réimplémente un travail déjà résolu et maintenu par le projet Jellyfin lui-même ; toute évolution de l'API doit être suivie manuellement |
| SDK officiel `@jellyfin/sdk` | Typé, maintenu par l'écosystème Jellyfin, suit les évolutions de version de l'API serveur | Dépendance externe supplémentaire |

**Pourquoi** : conforme au critère de dépendance d'[[ENGINEERING_GUIDE.md]] §2.3 (préférer une dépendance quand le problème est déjà résolu et standardisé) — suivre les changements de l'API Jellyfin au fil de ses versions est exactement le type de travail qu'une dépendance officielle maintenue absorbe mieux qu'une réimplémentation locale, et réduit directement le risque de rupture de compatibilité déjà identifié dans [[PROJECT_CHARTER.md]] §5. Le SDK est encapsulé entièrement dans `JellyfinSource` ([[ARCHITECTURE.md]] §2) — aucun type du SDK n'est exposé au-delà de la couche Data (mapping vers les entités internes, [[ARCHITECTURE_PRINCIPLES.md]] §2.2).

---

## 2. Authentification

- Flux standard Jellyfin (nom d'utilisateur/mot de passe ou Quick Connect) exécuté une seule fois par serveur connecté ; le jeton d'accès retourné est seul conservé (jamais le mot de passe, voir [[SECURITY_GUIDELINES.md]] §1).
- Stockage du jeton : trousseau natif de l'OS sur Desktop/Mobile, IndexedDB chiffré en repli Web (voir [[SECURITY_GUIDELINES.md]] §2) — aucune divergence avec la politique de sécurité déjà actée.
- Renouvellement : le SDK détecte un jeton expiré (401) et déclenche un flux de ré-authentification silencieux si des identifiants persistants sont disponibles (Desktop/Mobile via trousseau natif), sinon une invite explicite de reconnexion.

## 3. Récupération des données et synchronisation incrémentale

- **Synchronisation initiale** : récupération complète de la bibliothèque (artistes, albums, pistes, playlists) au premier lancement, écrite dans `LocalStore` ([[DATA_LAYER.md]] §2) et indexée ([[DATA_LAYER.md]] §3).
- **Synchronisation incrémentale** : appels ultérieurs filtrés par date de modification (paramètre de l'API Jellyfin correspondant), ne récupérant que les éléments modifiés depuis `sync_meta.last_sync` ([[DATA_LAYER.md]] §2.1) — jamais un re-téléchargement complet à chaque ouverture d'application.
- **Déclenchement** : à l'ouverture de l'application (si la dernière synchronisation date de plus d'un intervalle configurable), et manuellement à la demande de l'utilisateur. Pas de synchronisation en arrière-plan continue en Phase 1 (cohérent avec [[ARCHITECTURE_PRINCIPLES.md]] §3.3, stratégie pull déclenchée).

## 4. Gestion des erreurs

Toute erreur réseau ou serveur est mappée vers un type `MusicSourceError` fermé ([[CODING_STANDARDS.md]] §4.4) : `NetworkUnavailable`, `Unauthorized`, `ServerVersionUnsupported`, `NotFound`, `RateLimited`, `Unknown`. La couche UI traduit chacun en message actionnable (« Vérifiez votre connexion », « Reconnectez-vous ») — jamais une exception non typée remontée telle quelle (voir [[SECURITY_GUIDELINES.md]] §8).

## 5. Gestion des images

- Les pochettes d'album/artiste sont récupérées via l'API d'images Jellyfin, en demandant explicitement une taille adaptée au contexte d'affichage (vignette de liste vs plein écran « lecture en cours ») — jamais l'image en pleine résolution pour une vignette.
- Mise en cache locale des images déjà récupérées (fichier binaire référencé depuis `LocalStore`), avec la même politique de nettoyage que le contenu audio téléchargé ([[DATA_LAYER.md]] §2.3).

## 6. Multi-serveurs

- Chaque serveur connecté a sa propre session (jeton, identifiant utilisateur, état de synchronisation) isolée dans `LocalStore` — jamais de mélange de catalogues entre serveurs dans une même vue sans que l'utilisateur ait explicitement choisi une vue combinée.
- La déconnexion d'un serveur purge son jeton (voir [[SECURITY_GUIDELINES.md]] §5) mais conserve, par défaut, le cache de métadonnées local (reconnexion rapide) — purgeable explicitement par l'utilisateur.

## 7. Compatibilité de version d'API

Le connecteur déclare une plage de versions d'API Jellyfin supportées. Une version serveur hors plage déclenche `ServerVersionUnsupported` avec un message explicite, plutôt qu'un comportement dégradé silencieux — cohérent avec le risque déjà identifié dans [[PROJECT_CHARTER.md]] §5 (changement de version Jellyfin cassant la compatibilité) et testé via des tests de contrat contre plusieurs versions de serveur en CI ([[TESTING_STRATEGY.md]]).

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | Principal Software Architect |

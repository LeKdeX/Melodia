# SECURITY_GUIDE.md — Sécurité opérationnelle (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 0.8.0
> **Date de création** : 2026-08-03
> **Propriétaire** : CTO
> **Documents liés** : [[SECURITY_GUIDELINES.md]], [[CI_CD_GUIDE.md]], [[JELLYFIN_INTEGRATION.md]]

Ce document ne redéfinit aucun principe de [[SECURITY_GUIDELINES.md]] — il en précise l'implémentation opérationnelle concrète : configuration exacte, outillage, secrets de CI.

---

## 1. Content Security Policy — configuration concrète

```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';   /* Tailwind JIT injecte des styles ; pas de script inline autorisé */
img-src 'self' data: https:;         /* pochettes servies par le serveur Jellyfin de l'utilisateur, domaine variable */
connect-src 'self' https: wss:;      /* API Jellyfin, domaine du serveur choisi par l'utilisateur à la connexion */
media-src 'self' https: blob:;       /* flux audio + lecture depuis blobs mis en cache localement */
object-src 'none';
base-uri 'self';
frame-ancestors 'none';
```

**Pourquoi `connect-src`/`img-src`/`media-src` ne peuvent pas être restreints à un domaine unique** : contrairement à une application SaaS classique, le domaine du serveur Jellyfin est choisi par l'utilisateur à la connexion (auto-hébergement, voir [[PROJECT_CHARTER.md]] §1) — la CSP ne peut donc pas figer un domaine à l'avance. Le compromis est documenté explicitement plutôt que silencieusement affaibli : `script-src` et `object-src` restent strictement fermés (aucun script tiers, aucun plugin), ce qui couvre le vecteur XSS principal (voir [[SECURITY_GUIDELINES.md]] §3) même si `connect-src`/`img-src`/`media-src` restent ouverts par nécessité fonctionnelle.

## 2. Scan de dépendances

**Décision retenue : `pnpm audit` en CI (bloquant sur CVE critique/haute) + Dependabot (GitHub) pour les mises à jour automatisées de sécurité.**

| Option | Avantages | Inconvénients |
|---|---|---|
| `pnpm audit` seul | Natif au gestionnaire de paquets déjà retenu, aucune dépendance de service tiers | Ne propose pas de mise à jour automatique, uniquement un signal |
| Snyk | Base de vulnérabilités plus riche, tableau de bord dédié | Service tiers payant au-delà d'un usage gratuit limité, dépendance externe supplémentaire pour un besoin déjà couvert |
| Dependabot (GitHub natif) | Gratuit sur dépôt public, intégré nativement à la plateforme d'hébergement déjà retenue ([[TECH_STACK.md]] §1, GitHub Actions) | Couverture de base de vulnérabilités légèrement moins riche que Snyk |

**Pourquoi** : `pnpm audit` + Dependabot couvrent le besoin sans introduire de dépendance de service tiers payant, cohérent avec [[ENGINEERING_GUIDE.md]] §2.1 (une dépendance/un service n'est ajouté que si le besoin ne peut pas être couvert autrement) — réévaluable par ADR si la couverture s'avère insuffisante en pratique.

## 3. Gestion des secrets en CI/CD

- Aucun secret (jeton de signature de release, identifiants de publication sur les stores d'applications) en clair dans le dépôt, y compris dans l'historique — vérifié par un scanner de secrets en pre-commit et en CI (ex. `gitleaks`).
- Secrets stockés exclusivement dans les secrets chiffrés de la plateforme CI (GitHub Actions Secrets), scoping au minimum de jobs qui en ont réellement besoin (ex. le secret de signature Desktop n'est exposé qu'au job de build Desktop, jamais à l'ensemble du pipeline).
- Rotation des secrets de signature/publication documentée dans [[CHECKLISTS.md]] (checklist de release).

## 3bis. Gestion du jeton d'authentification Jellyfin (ajout Phase 12)

- **Stockage** : jeton de session Jellyfin persisté via le stockage sécurisé natif de la plateforme (Tauri Stronghold/Keychain système sur desktop, stockage chiffré équivalent sur mobile) — jamais en clair dans `LocalStore` (IndexedDB/SQLite, [[DATA_LAYER.md]] §2), qui reste conçu pour des données non sensibles (métadonnées musicales).
- **Web (PWA)** : à défaut d'un stockage sécurisé natif équivalent, le jeton reste en mémoire (jamais persisté en `localStorage` en clair, vecteur XSS classique) — une reconnexion est requise après fermeture complète de l'onglet, compromis documenté explicitement plutôt que silencieusement affaibli (cohérent avec [[SECURITY_GUIDELINES.md]] §3).
- **Transmission** : uniquement via l'en-tête d'autorisation HTTPS vers le serveur Jellyfin choisi par l'utilisateur ([[JELLYFIN_INTEGRATION.md]] §2), jamais journalisé en clair ([[LOGGING_SYSTEM.md]] §7, seuls les 4 derniers caractères peuvent apparaître pour corrélation de débogage).
- **Expiration** : voir [[ERROR_STATES.md]] §6/§8 pour le comportement produit déjà acté (renouvellement silencieux ou reconnexion) — non redécidé ici.
- **Export** : jamais inclus dans un export de données personnelles ([[IMPORT_EXPORT_SYSTEM.md]] §5, déjà acté).

## 3ter. Protection des données locales au repos (ajout Phase 13)

> **Gap identifié et comblé** : §3bis décide déjà du chiffrement du jeton d'authentification. Aucune décision n'existait jusqu'ici sur le reste de `LocalStore` ([[DATABASE_SCHEMA.md]]) — métadonnées de bibliothèque, historique d'écoute, favoris, playlists locales.

- **Décision retenue : pas de chiffrement systématique de l'ensemble de `LocalStore`.** Justification : les métadonnées de bibliothèque (titres, pochettes, playlists) ne sont pas des données sensibles au sens de la menace considérée (le modèle de menace de [[SECURITY_GUIDELINES.md]] cible l'exfiltration réseau/XSS, pas l'accès physique à l'appareil de l'utilisateur — un appareil personnel auto-hébergé, cohérent avec [[PROJECT_CHARTER.md]] §1) ; chiffrer l'ensemble ajouterait un coût de performance mesurable (déchiffrement à chaque lecture sur une bibliothèque de 200 000 titres, [[PERFORMANCE_BUDGET.md]] §8) sans bénéfice de sécurité proportionné.
- **Exception assumée — l'historique d'écoute** : bien que local par principe ([[PRODUCT_RULES.md]] §10), l'historique reste une donnée personnelle plus sensible qu'une métadonnée de catalogue (révèle des habitudes). Il ne reçoit **pas** de chiffrement dédié non plus, pour la même raison de coût/bénéfice, mais reste soumis à la suppression intégrale à la demande déjà actée ([[STATISTICS_SPECIFICATION.md]] §2) — la protection retenue est le contrôle utilisateur (accès, export, suppression), pas le chiffrement.
- **Protection contre la corruption** (distincte du chiffrement) : voir [[DATA_LAYER.md]] §2.2 (sauvegarde avant migration destructive) et [[ERROR_HANDLING.md]] §1 (`StorageError`) — non redécidé ici, une corruption physique n'est pas une question de confidentialité mais d'intégrité, déjà traitée par ces deux documents.
- **Réévaluation** : cette décision est réévaluable par ADR si Melodia introduit une fonctionnalité multi-utilisateurs sur un même appareil partagé (hors périmètre actuel, [[PROJECT_CHARTER.md]] §1) — un tel scénario changerait le modèle de menace et justifierait un chiffrement par profil.

## 3quater. Sécurité de l'état applicatif (ajout Architecture d'état)

> **Gap identifié et comblé** : ni §3bis (jeton) ni §3ter (chiffrement au repos) ne couvraient l'exposition de l'état applicatif lui-même via l'outillage de développement — un état qui ne contient déjà aucune donnée sensible en profondeur (§3ter, jeton exclu de `LocalStore`) peut néanmoins révéler des informations non destinées à un tiers ayant un accès physique à l'appareil (historique de recherche récent, [[STORE_SPECIFICATIONS.md]] `searchStore`) si l'outillage de débogage reste actif en production.

- **Middleware devtools Zustand** : activé uniquement en développement (`NODE_ENV !== 'production'`), jamais en build de production — un état applicatif inspectable via l'extension Redux DevTools (compatible Zustand) en production exposerait la totalité de l'état client à quiconque a accès à l'appareil déverrouillé, y compris `searchStore.recentSearches` et `settingsStore`.
- **Middleware `persist`** ([[LOCAL_STATE.md]] §3) : n'écrit jamais de donnée déjà exclue de `LocalStore` par §3ter (le jeton reste géré exclusivement par le trousseau natif/mémoire, jamais par le middleware `persist` de Zustand, cohérent avec §3bis).
- **`developerStore`/`labsStore`** ([[STORE_SPECIFICATIONS.md]] §2) : les outils de debug qu'ils activent restent accessibles uniquement depuis un menu explicite ([[SETTINGS_SYSTEM.md]]), jamais activés par défaut en production — cohérent avec le traitement déjà acté de la vue Logs ([[LOGGING_SYSTEM.md]] §4, réservée au contexte développeur/support).

## 3quinquies. Cycle de vie des Blob URL pour la lecture locale (ajout Moteur Audio)

> **Gap identifié et comblé** : la lecture d'un fichier téléchargé/en cache ([[AUDIO_ENGINE.md]] §0bis.2, source `local`/`cache`) nécessite une Blob URL (`URL.createObjectURL()`) pour être assignée à `HTMLAudioElement.src` — jamais couvert jusqu'ici alors que ce mécanisme a un coût de sécurité et de mémoire réel s'il n'est pas géré explicitement.

- **Révocation obligatoire** : toute Blob URL créée pour une lecture locale est révoquée (`URL.revokeObjectURL()`) dès que la piste correspondante quitte le double buffer ([[AUDIO_ENGINE.md]] §3) — jamais laissée active au-delà de sa consommation réelle, cohérent avec la prévention de fuite mémoire déjà actée ([[PLAYBACK_ENGINE.md]] §6).
- **Portée** : une Blob URL n'est jamais partagée au-delà du Media Adapter qui l'a créée ([[AUDIO_ENGINE.md]] §0bis.1) — jamais exposée à un composant React ou journalisée ([[LOGGING_SYSTEM.md]] §7, cohérent avec l'exclusion déjà actée des données sensibles des journaux).
- **CSP** : `media-src blob:` déjà explicitement autorisé dans la Content Security Policy (§1, « lecture depuis blobs mis en cache localement ») — aucune modification requise, ce gap ne concernait que le cycle de vie applicatif, pas la politique réseau.

## 3sexies. Intégrité du stockage local (ajout Plateforme Offline)

> Distinct de §3ter (chiffrement — confidentialité) et §3quinquies (Blob URL — cycle de vie mémoire) : cette section traite l'**intégrité**, pas la confidentialité — garantir qu'une donnée locale n'a pas été altérée, accidentellement ou non, jamais qu'elle est illisible à un tiers.

- **Validation à la lecture** : toute entité lue depuis `LocalStore` est validée par schéma avant consommation par le Domain ([[MAPPER_GUIDE.md]] §3, déjà acté — le mapping Storage→Domain reste défensif) — une entrée qui échoue la validation est traitée comme une corruption ([[CACHE_SYSTEM.md]] §7 pour le cache, [[RESILIENCE_GUIDE.md]] §2 pour la base elle-même), jamais consommée telle quelle avec un risque de comportement indéfini.
- **Checksum des téléchargements** : déjà acté ([[DOWNLOAD_SYSTEM.md]] §5quater) — ce document confirme que cette vérification sert un objectif de sécurité autant que de fiabilité (un fichier corrompu ou altéré entre le serveur et le disque local n'est jamais joué comme s'il était intact).
- **Permissions de fichier** (Desktop/Mobile, accès natif via Tauri) : le répertoire de données Melodia utilise les permissions par défaut du système accordées à l'application — jamais des permissions élargies au-delà du strict nécessaire ([[SECURITY_GUIDE.md]] §4, principe du moindre privilège déjà acté pour Tauri en général, appliqué ici spécifiquement au stockage).
- **Protection contre l'altération externe** (un processus tiers modifie directement le fichier `LocalStore` hors de l'application) : non activement détectée en dehors de la validation à la lecture (§ci-dessus) — une signature/hachage de fichier complet serait disproportionné au modèle de menace déjà écarté pour l'ensemble de `LocalStore` (§3ter, accès physique à un appareil personnel, pas un scénario d'altération malveillante active anticipé pour ce produit).

## 4. Sécurité spécifique au packaging natif (Tauri)

- Permissions Tauri déclarées explicitement et au minimum nécessaire dans la configuration de capacités (`tauri.conf.json` / fichiers de capacités Tauri 2), conformément au principe du moindre privilège déjà posé dans [[SECURITY_GUIDELINES.md]] §7.
- Aucune commande Tauri (`invoke`) exposée côté frontend sans validation stricte de ses paramètres côté Rust — un paramètre non validé côté natif est un vecteur d'escalade bien plus sérieux qu'une entrée non validée côté web (accès système direct).

## 5. Revue de sécurité

Une revue de sécurité manuelle (checklist dédiée, voir [[CHECKLISTS.md]]) est obligatoire avant chaque release majeure, et systématique pour toute PR touchant l'authentification, le stockage de jetons ou les permissions Tauri — indépendamment de la revue de code standard ([[DEFINITION_OF_DONE.md]]).

---

## 6. Checklist de validation

- [ ] La CSP (§1) est revue à chaque ajout de domaine externe requis par une nouvelle fonctionnalité.
- [ ] Le choix pnpm audit + Dependabot plutôt qu'un service tiers payant est justifié par les critères de dépendance ([[ENGINEERING_GUIDE.md]] §2.1).
- [ ] Les risques de sécurité par décision technique (Tauri, SDK Jellyfin, plugins natifs futurs) sont couverts dans [[RISK_REGISTER_TECHNICAL.md]].
- [ ] Toute évolution vers des plugins natifs CarPlay/Android Auto (voir [[EVOLVABILITY.md]] §5-6) est soumise à la revue de sécurité de la §5 avant merge.

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | CTO |
| 0.2.0 | 2026-08-03 | Ajout de la checklist de validation et des renvois vers les documents du complément Phase 0.5 | CTO |
| 0.3.0 | 2026-08-04 | Phase 12 : ajout §3bis (gestion du jeton d'authentification Jellyfin) | Security Engineer |
| 0.4.0 | 2026-08-04 | Phase 13 : ajout §3ter (décision réelle sur le chiffrement au repos des données locales, gap comblé) — au lieu de créer DATA_SECURITY.md en doublon | Security Engineer |
| 0.5.0 | 2026-08-04 | Architecture d'état : ajout §3quater (devtools Zustand désactivés en production, middleware persist, developerStore/labsStore) — au lieu de créer STATE_SECURITY.md en doublon | Security Engineer |
| 0.6.0 | 2026-08-04 | Moteur Audio : ajout §3quinquies (cycle de vie des Blob URL pour la lecture locale) — au lieu de créer AUDIO_SECURITY.md en doublon | Security Engineer |
| 0.7.0 | 2026-08-04 | Plateforme Offline : ajout §3sexies (intégrité du stockage local : validation à la lecture, checksum, permissions, altération externe) — au lieu de créer OFFLINE_SECURITY.md en doublon | Security Engineer |
| 0.8.0 | 2026-08-05 | TASK-002 : correction de la citation §3ter vers PERFORMANCE_BUDGET.md (section 0, inexistante → section 8) ; correction du numéro de version en en-tête, resté désynchronisé (« 0.1.0 ») du tableau ci-dessus | Staff Technical Lead |

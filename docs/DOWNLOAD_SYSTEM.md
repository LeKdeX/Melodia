# DOWNLOAD_SYSTEM.md — Système de téléchargement (Phase 9)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Audio Software Engineer / Performance Engineer
> **Documents liés** : [[TRACK_COMPONENTS.md]] §4, [[SETTINGS_COMPONENTS.md]] (Storage Indicator, Cache Manager), [[SKELETON_SYSTEM.md]] §7

> **Cadrage** : Download Button existait déjà comme instance d'IconButton ([[PLAYER_COMPONENTS.md]]). Ce document couvre le système complet — file de téléchargement, priorités, stockage — resté sans spécification jusqu'ici.

---

## 1. Déclenchement

Depuis Track Actions ([[TRACK_COMPONENTS.md]] §6), Album/Playlist Actions ([[ALBUM_COMPONENTS.md]] §3, [[PLAYLIST_COMPONENTS.md]] §3, téléchargement groupé) — toujours une action explicite, jamais un téléchargement automatique de contenu non demandé (à l'exception d'un réglage explicite « télécharger automatiquement les nouvelles playlists suivies », opt-in, [[SETTINGS_COMPONENTS.md]]).

## 2. Progression

Barre de progression locale à l'élément concerné ([[ANIMATION_LIBRARY.md]] §10, Progress Fill) — jamais un indicateur global peu informatif pour un téléchargement individuel ([[MOTION_GUIDELINES.md]] §10, déjà acté). Une vue dédiée « Téléchargements » liste l'ensemble des téléchargements actifs et en attente avec leur progression individuelle (Track Row, [[TRACK_COMPONENTS.md]] §1, avec ProgressBar en lieu et place de la durée).

## 3. File de téléchargement et priorités

- **Ordre par défaut** : premier demandé, premier téléchargé (FIFO) — prévisible, jamais un ordre qui semble arbitraire à l'utilisateur.
- **Priorité manuelle** : un élément de la file peut être remonté en tête manuellement (« Télécharger en premier », Menu Button, [[BUTTON_SPECIFICATION.md]]) — jamais une priorité automatique invisible qui surprendrait l'utilisateur sur l'ordre réel.
- **Téléchargements simultanés** : nombre borné (limite configurable dans les Paramètres, valeur par défaut raisonnable pour ne pas saturer la connexion) — au-delà, les éléments supplémentaires restent en file d'attente visible, jamais masqués.

## 4. Pause et reprise

Chaque téléchargement individuel et la file entière sont pausables/reprenables — un téléchargement en pause conserve sa progression déjà téléchargée (reprise partielle, jamais un redémarrage depuis zéro) si le protocole de transfert le permet, dégradation silencieuse vers un redémarrage complet sinon (signalé dans les détails du téléchargement concerné, jamais caché).

## 5. Échec

Voir [[ERROR_STATES.md]] pour le message — ce document précise le comportement : un échec ne bloque jamais la file, les téléchargements suivants continuent ; l'élément en échec propose une action « Réessayer » directe, reste visible dans la liste (jamais retiré silencieusement) jusqu'à résolution ou suppression explicite par l'utilisateur.

## 5bis. Reprise après redémarrage (ajout Phase 11)

La file de téléchargement persiste dans `LocalStore` ([[DATA_LAYER.md]]) — au redémarrage de l'application, tout téléchargement en cours ou en attente reprend automatiquement sans action utilisateur, dans son ordre de priorité déjà établi (§3) — jamais une file perdue silencieusement par une fermeture de l'application, y compris une fermeture non planifiée (crash). Un téléchargement partiellement transféré reprend depuis sa progression déjà actée (§4), jamais depuis zéro si le protocole le permet.

## 5ter. Téléchargement intelligent (ajout Phase 11)

Suggestion (jamais automatique) de télécharger un contenu selon des signaux d'usage locaux — ex. une playlist réécoutée fréquemment en un mois sans être téléchargée. **Règle absolue** : reste une suggestion visible (bannière discrète ou badge sur l'élément concerné) jamais un téléchargement déclenché sans confirmation explicite, cohérent avec [[DOWNLOAD_SYSTEM.md]] §1 (toujours une action explicite). Basé exclusivement sur l'historique local ([[STATISTICS_SPECIFICATION.md]] §2), jamais transmis ni calculé côté serveur.

## 5quater. Validation et vérification d'intégrité (ajout Phase 13)

- **Validation à réception** : un fichier téléchargé est vérifié (taille attendue conforme à `MediaSources` du DTO d'origine, [[DTO_SPECIFICATION.md]]) avant d'être marqué `completed` dans `Download` ([[DOMAIN_MODELS.md]] §3) — un fichier incomplet ou tronqué reste en `failed`, jamais marqué `completed` par optimisme.
- **Vérification périodique** : à l'ouverture de la vue Téléchargements, un sondage léger (existence du fichier référencé par `localFileRef`) détecte un fichier disparu/corrompu hors du contrôle de l'application (suppression manuelle sur le disque, corruption du support de stockage) — l'entrée passe alors à un statut « à retélécharger », jamais silencieusement retirée de la liste sans explication.
- **Suppression** : une suppression explicite d'un téléchargement retire à la fois l'entrée `Download` et le fichier référencé de façon atomique — jamais l'un sans l'autre (fichier orphelin ou entrée pointant vers rien).

## 5quinquies. Conditions de déclenchement automatique (ajout Plateforme Offline)

> Distinct du téléchargement intelligent déjà acté (§5ter, suggestion jamais automatique) : ces trois réglages contrôlent **quand** un téléchargement déjà en file (manuel ou suggéré-accepté) est autorisé à s'exécuter, jamais s'il doit exister.

- **Wi-Fi uniquement** : réglage activé par défaut sur mobile ([[SETTINGS_SYSTEM.md]]) — un téléchargement en file reste en attente (statut `queued`, [[DOMAIN_MODELS.md]] §3) tant qu'une connexion Wi-Fi n'est pas détectée ([[OFFLINE_SYSTEM.md]] §1ter), jamais annulé, simplement différé.
- **Téléchargement sur batterie** : réglage désactivé par défaut sur mobile (déclenche uniquement sur charge) — cohérent avec la stratégie générale de réduction batterie ([[PERFORMANCE_GUIDE.md]] §5septies). Un téléchargement déjà en cours au moment où l'appareil quitte la charge n'est jamais interrompu brutalement, seule la mise en file de nouveaux éléments est différée.
- **Téléchargement nocturne** : plage horaire configurable pendant laquelle les téléchargements en attente sont priorisés automatiquement (utile combiné à Wi-Fi uniquement/sur charge, qui rendent la journée moins propice) — jamais une obligation, un téléchargement explicite (§1, action directe de l'utilisateur) s'exécute immédiatement indépendamment de cette plage.

**Combinaison** : les trois réglages sont indépendants et cumulables (ET logique, cohérent avec la combinaison de filtres déjà actée pour la recherche, [[FILTER_ENGINE.md]] §2) — un téléchargement attend que **toutes** les conditions activées soient réunies, jamais une seule suffisante parmi plusieurs activées.

## 6. Gestion du stockage

Voir Storage Indicator et Cache Manager ([[SETTINGS_COMPONENTS.md]]) pour l'anatomie déjà spécifiée — ce document précise la règle produit : l'utilisateur voit toujours l'espace utilisé par les téléchargements distinctement du cache technique (pochettes, waveform, [[PERFORMANCE_GUIDE.md]] §6bis) — supprimer le cache technique ne supprime jamais un téléchargement explicite de l'utilisateur, les deux suivent des cycles de vie et des actions de suppression séparés ([[DIALOG_LIBRARY.md]] §2 pour la suppression d'un téléchargement, §5 pour la réinitialisation du cache).

## 7. Qualité de téléchargement

Réglage de qualité audio pour les téléchargements (peut différer de la qualité de streaming, [[SETTINGS_SPECIFICATION.md]]) — un changement de réglage de qualité ne modifie jamais rétroactivement les téléchargements déjà effectués, s'applique uniquement aux téléchargements futurs, signalé explicitement si l'utilisateur pourrait s'attendre au contraire.

## 8. Accessibilité et performance

Chaque élément en téléchargement reste navigable/annoncé comme les autres Track Row ([[TRACK_COMPONENTS.md]] §7). Liste de téléchargements virtualisée au-delà du seuil habituel ([[PERFORMANCE_BUDGET.md]] §3) — mêmes règles que toute liste dense de l'application, non redécidées ici.

---

## 9. Checklist de validation

- [ ] Aucun téléchargement automatique de contenu non demandé, sauf opt-in explicite (§1).
- [ ] Un échec de téléchargement ne bloque jamais les autres éléments de la file (§5).
- [ ] Stockage technique (cache) et téléchargements explicites restent des concepts et des actions de suppression distincts (§6).

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 9) | Audio Software Engineer / Performance Engineer |
| 0.2.0 | 2026-08-04 | Phase 11 : ajout §5bis (reprise après redémarrage) et §5ter (téléchargement intelligent, suggestion jamais automatique) — au lieu de créer un second DOWNLOAD_SYSTEM.md | Audio Platform Engineer |
| 0.3.0 | 2026-08-04 | Phase 13 : ajout §5quater (validation/vérification d'intégrité post-téléchargement) — au lieu de créer DOWNLOAD_ENGINE.md en doublon | Database Architect |
| 0.4.0 | 2026-08-04 | Plateforme Offline : ajout §5quinquies (Wi-Fi uniquement/sur batterie/nocturne, combinables) — au lieu de créer DOWNLOAD_PLATFORM.md en doublon | Resilience Engineer |

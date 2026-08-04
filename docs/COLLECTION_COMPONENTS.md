# COLLECTION_COMPONENTS.md — Genres, collections et vues dérivées (Phase 9)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / Information Architect
> **Documents liés** : [[LIBRARY_COMPONENTS.md]], [[NAVIGATION_HISTORY.md]], [[LIBRARY_SPECIFICATION.md]]

> **Cadrage** : [[LIBRARY_COMPONENTS.md]] a déjà spécifié Genre Card/Grid, Collection Grid, Folder View, Pinned Items, Favorites, Recently Added/Played en profondeur compacte — non redécrits ici. Ce document approfondit ce qui restait sous-spécifié : Smart Collections, et clarifie où vivent Favorites/History pour éviter toute confusion de source de vérité.

---

## 1. Smart Collections

Collection générée automatiquement selon une règle plutôt que constituée manuellement (ex. « Ajoutés ce mois-ci », « Jamais écoutés ») — distincte d'une Smart Queue ([[QUEUE_SPECIFICATION.md]] §5, portée limitée à la file de lecture) par sa portée : une Smart Collection est une vue permanente de la bibliothèque, consultable à tout moment, pas une extension temporaire de la file en cours.

- **Anatomie** : Collection Grid ([[LIBRARY_COMPONENTS.md]]) avec un indicateur visuel discret (icône) signalant qu'il s'agit d'une règle automatique plutôt qu'une sélection manuelle — jamais indiscernable d'une Collection créée par l'utilisateur, qui induirait en erreur sur ce qui est modifiable.
- **Règles disponibles** (exemples, liste extensible sans redécision de l'anatomie) : ajout récent, jamais écouté, écouté récemment, par plage de note si une fonctionnalité de notation existe un jour ([[FEATURE_ROADMAP.md]], non engagée).
- **Non éditable manuellement** : on ne retire jamais un titre individuel d'une Smart Collection (il y est ou n'y est pas selon la règle) — seule la règle elle-même est modifiable, via un panneau dédié distinct de l'édition de playlist ([[PLAYLIST_COMPONENTS.md]]).

## 2. Pinned Collections — épinglage

Voir [[LIBRARY_COMPONENTS.md]] (Pinned Items) pour l'anatomie — cette section précise uniquement la portée : n'importe quel type de collection (Album, Playlist, Genre, Smart Collection §1, Artiste) peut être épinglé, toujours dans la même zone d'accès rapide de la Sidebar/BottomBar ([[NAVIGATION_GUIDE.md]] §1) — jamais une zone d'épinglage séparée par type de contenu, qui fragmenterait l'accès rapide.

## 3. Favorites — source de vérité unique

Un seul mécanisme de favori dans toute l'application (Favorite Button, [[BUTTON_SPECIFICATION.md]] §Boutons du domaine lecteur ; Track Actions, [[TRACK_COMPONENTS.md]] §6) — la vue Favorites ([[LIBRARY_COMPONENTS.md]]) est une Collection Grid filtrée sur ce statut unique, jamais un second système de favoris parallèle. Un favori s'applique au niveau du titre individuel uniquement à ce stade — favoriser un album entier ou un artiste entier reste une action groupée qui favorise chaque titre qu'il contient (§Bulk Favorite ci-dessous), pas un statut de favori séparé au niveau de l'album/artiste lui-même.

## 4. Bulk Favorite (action groupée)

Depuis l'Album Header ou la Playlist Header ([[ALBUM_COMPONENTS.md]] §3, [[PLAYLIST_COMPONENTS.md]] §3), une action « Ajouter tout aux favoris » applique le favori à chaque titre du contexte — feedback visuel immédiat (icônes qui se remplissent en cascade, catégorie Micro, [[MOTION_GUIDELINES.md]] §12ter, décalage de rythme) plutôt qu'un état de chargement bloquant.

## 5. Favorite Animation

Voir [[ANIMATION_LIBRARY.md]] §9 (Favorite Bounce) — non redécrite ici, appliquée telle quelle à chaque instance de Favorite Button dans ce document.

## 6. Recently Added / Recently Played / Top Rated / Downloaded / Offline

Toutes des vues dérivées (Collection Grid filtrée/triée) d'une seule source de données chacune, jamais une donnée dupliquée :
- **Recently Added** : tri par date d'ajout à la bibliothèque (métadonnée Jellyfin).
- **Recently Played** : vue dédupliquée de l'historique de lecture ([[NAVIGATION_HISTORY.md]] §5) — non redécrite ici.
- **Top Rated** : dépend d'une fonctionnalité de notation non engagée à ce jour ([[FEATURE_ROADMAP.md]]) — section réservée, non spécifiée davantage tant que non engagée.
- **Downloaded** : voir [[DOWNLOAD_SYSTEM.md]] pour la gestion, cette vue n'est qu'un filtre sur le statut de téléchargement.
- **Offline** : voir [[OFFLINE_SYSTEM.md]] — distincte de Downloaded : Offline montre ce qui est réellement accessible hors connexion actuellement, Downloaded montre tout ce qui a été téléchargé (peut différer si un téléchargement a été corrompu/supprimé du stockage externe).

## 7. Folder View

Voir [[LIBRARY_COMPONENTS.md]] — arborescence conditionnelle à l'import de fichiers locaux, non redécrite ici.

---

## 8. Checklist de validation

- [ ] Smart Collections reste visuellement distinguable d'une collection manuelle, jamais ambiguë.
- [ ] Un seul mécanisme de favori existe dans toute l'application (§3), aucun système parallèle.
- [ ] Downloaded et Offline restent deux vues distinctes avec une raison claire de leur différence (§6).

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 9) | Product Designer / Information Architect |

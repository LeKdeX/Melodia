# STORE_DEPENDENCY_GRAPH.md — Matrice complète des stores (Architecture d'état)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Staff React Engineer
> **Documents liés** : [[STORE_SPECIFICATIONS.md]], [[EVENT_SYSTEM.md]], [[REPOSITORY_PATTERN.md]]

Matrice bonus demandée par le cadrage : pour chacun des 13 stores réels ([[STORE_SPECIFICATIONS.md]] §3), les données qu'il possède, les repositories qu'il consomme (le cas échéant), les événements qu'il émet/écoute ([[EVENT_SYSTEM.md]] §3), et ses modules consommateurs ([[MODULES.md]]). Ne redéfinit aucune de ces informations — les recompose depuis les documents qui les possèdent chacun.

---

## 1. Matrice complète

| Store | Données possédées | Repository consommé | Événements émis | Événements écoutés | Modules consommateurs |
|---|---|---|---|---|---|
| `playerStore` | Position, volume, état de lecture | Aucun (jamais de Repository direct, [[STORE_SPECIFICATIONS.md]] §1) | `player.trackChanged`, `player.playbackStateChanged` | `download.completed` (pour proposer la lecture hors ligne d'un élément fraîchement téléchargé) | `player`, `queue` (lecture seule) |
| `queueStore` | Ordre de la file, mode répétition/aléatoire | Aucun | Aucun (consulté via sélecteur, pas d'événement propre) | `player.trackChanged` (avance l'index courant) | `queue`, `player` |
| `libraryStore` | Filtres/tri actifs | Aucun (les données filtrées viennent de TanStack Query, [[SERVER_STATE.md]]) | Aucun | `sync.cycleCompleted` (invalide un filtre devenu incohérent si un élément filtré a disparu) | `library`, `albums`, `artists`, `tracks` |
| `albumStore` | État d'UI d'écran (onglet actif) | Aucun | Aucun | Aucun | `albums` uniquement |
| `artistStore` | État d'UI d'écran (onglet actif) | Aucun | Aucun | Aucun | `artists` uniquement |
| `searchStore` | Requête active, recherches récentes | Aucun (résultats dérivés, [[DERIVED_STATE.md]]) | Aucun | `search.indexRebuilt` (invalide un résultat en cours) | `search` |
| `themeStore` | Thème actif, dégradé courant | Aucun | Aucun | `theme.extracted`, `player.trackChanged` | `themes`, transverse (TopBar, Player) |
| `settingsStore` | Toutes les préférences | `SettingsRepository` (hydratation initiale uniquement, jamais lu en continu) | Aucun | Aucun | `settings`, `themes`, `notifications` |
| `downloadStore` | File active, progression en temps réel | `DownloadRepository` (écriture du statut final uniquement) | `download.completed`, `download.failed` | Aucun | `downloads` |
| `syncStore` | Statut de synchronisation affiché | Aucun | `sync.cycleCompleted`, `sync.conflictDetected` | `server.reconnected` | `sync`, transverse (indicateur TopBar) |
| `notificationStore` | File de toasts/bannières actifs | Aucun | `notification.dismissed` | Tous les événements des autres catégories qui déclenchent une notification (§2 de [[EVENT_SYSTEM.md]]) | `notifications`, transverse |
| `developerStore` | Outils de debug activés | Aucun | Aucun | Aucun | `developer` |
| `labsStore` | Feature flags activés localement | Aucun (définition des flags via [[FEATURE_FLAGS.md]], pas un Repository) | Aucun | Aucun | `labs`, transverse (tout module dont une fonctionnalité est sous flag) |
| `uiStore` | Sidebar/Fullscreen/Panels partagés | Aucun | Aucun | Aucun | Transverse (Layout, TopBar, Sidebar, Player) |

## 2. Lecture de la matrice

- **Colonne « Repository consommé » majoritairement vide** : confirme la règle déjà actée ([[STORE_SPECIFICATIONS.md]] §1) — un store ne consomme un Repository qu'à l'hydratation initiale (préférences, statut de téléchargement final), jamais en lecture continue pour une donnée serveur.
- **`notificationStore` est le point de convergence de la quasi-totalité des événements** — cohérent avec son rôle transverse déjà acté ([[NOTIFICATION_LIBRARY.md]] §8bis), pas une anomalie de couplage.
- **Aucun store n'émet un événement `navigation.*`** — cohérent avec [[EVENT_SYSTEM.md]] §4 (catégorie fermée).

---

## 3. Ce que ce document ne fait pas

- Ne redéfinit aucune donnée déjà présente dans [[STORE_SPECIFICATIONS.md]], [[EVENT_SYSTEM.md]] ou [[REPOSITORY_PATTERN.md]] — recompose uniquement.
- Ne redéfinit pas les modules eux-mêmes (voir [[MODULES.md]]).

## 4. Checklist de validation

- [ ] Tout nouveau store ajouté à [[STORE_SPECIFICATIONS.md]] reçoit une ligne dans cette matrice avant merge.
- [ ] Toute nouvelle dépendance store↔Repository reste l'exception (hydratation), jamais la lecture continue (§2).

## 5. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Architecture d'état) | Staff React Engineer |

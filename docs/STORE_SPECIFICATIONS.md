# STORE_SPECIFICATIONS.md — Spécification des 17 stores Zustand (Architecture d'état)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal State Management Architect
> **Documents liés** : [[CODING_STANDARDS.md]] §4.3, [[MODULES.md]], [[ARCHITECTURE_PRINCIPLES.md]] §4

[[CODING_STANDARDS.md]] §4.3 a déjà posé la règle générale (« un store par domaine, jamais un store fourre-tout »). [[MODULES.md]] a déjà listé les 18 modules de fonctionnalité et leur surface publique (hooks). Ce document descend d'un niveau supplémentaire : **le store Zustand concret derrière chaque hook**, sa forme exacte, sa frontière, ses dépendances. Un store gère exclusivement de l'état client (§1) — jamais de donnée serveur, cohérent avec l'invariant déjà acté ([[ARCHITECTURE_PRINCIPLES.md]] §4).

---

## 1. Convention commune

- Un fichier par store : `packages/app/src/features/<feature>/store/<nom>Store.ts` ([[CODING_STANDARDS.md]] §1).
- Nommage `camelCase` suffixé `Store` ([[CODING_STANDARDS.md]] §2) : `playerStore`, `queueStore`...
- Actions nommées à l'impératif (`play()`, `pause()`, `seekTo(position)`), jamais de mutation directe exposée hors du store (déjà acté).
- Un store ne connaît jamais React (aucun import de composant, aucun hook React interne autre que le hook généré par Zustand lui-même) — testable en isolation totale (voir [[TESTING_STRATEGY.md]] pour les scénarios de test propres à l'état).
- Un store ne connaît jamais un Repository directement pour une donnée serveur — un store qui a besoin d'une donnée serveur la reçoit en paramètre d'action depuis un composant/hook qui l'a lui-même obtenue via TanStack Query ([[SERVER_STATE.md]]), jamais un store qui appelle un Repository lui-même (violerait l'invariant état serveur/état client, [[ARCHITECTURE_PRINCIPLES.md]] §4).

## 2. Les 17 stores

| Store | Domaine | Données possédées (forme abrégée) | Ne possède jamais |
|---|---|---|---|
| `playerStore` | Lecture active | `currentTrackId`, `position`, `volume`, `playbackState`, `isMuted` | La liste des pistes elle-même (référence uniquement, [[QUEUE_SPECIFICATION.md]]) |
| `queueStore` | File d'attente | `queue: trackId[]`, `currentIndex`, `repeatMode`, `shuffleMode`, `history: trackId[]` | Les métadonnées des pistes (référencées par id, résolues via [[SERVER_STATE.md]]) |
| `libraryStore` | Filtres/tri de bibliothèque actifs | `activeFilters`, `sortOrder`, `viewMode` (grille/liste) | La liste des albums/artistes elle-même (état serveur, [[SERVER_STATE.md]]) |
| `albumStore` | Éphémère à l'écran Album (voir §4, souvent inutile en pratique) | État d'UI propre à l'écran (onglet actif, sélecteur de disque) | Les métadonnées d'album (état serveur) |
| `artistStore` | Idem, propre à l'écran Artiste | Onglet actif (discographie/bio) | Les métadonnées d'artiste (état serveur) |
| `trackStore` *(n'existe pas — voir §3)* | — | — | — |
| `searchStore` | Recherche active | `query`, `activeFilters`, `recentSearches` (persisté) | Les résultats eux-mêmes (dérivés, [[DERIVED_STATE.md]]) |
| `themeStore` | Thème actif | `themeMode`, `dynamicThemeEnabled`, dégradé courant dérivé | Les tokens de couleur eux-mêmes ([[DESIGN_TOKENS.md]]) |
| `settingsStore` (= `preferencesStore` de [[CODING_STANDARDS.md]] §4.3, même store) | Préférences persistées | Toutes les entrées de [[SETTINGS_SYSTEM.md]] | Rien qui ne soit une préférence |
| `downloadStore` | File de téléchargement active | `activeDownloads`, progression en temps réel | Le statut persistant final (`LocalStore`/`DownloadRepository`, [[REPOSITORY_PATTERN.md]]) |
| `syncStore` | Statut de synchronisation courant | `syncState` (synchronisé/en cours/hors ligne), dernier horodatage | La logique de synchronisation elle-même ([[SYNC_ENGINE_SPECIFICATION.md]]) |
| `notificationStore` | File de notifications transitoires actives | `activeToasts[]`, `activeBanners[]` | L'historique de notifications passées (non conservé, transitoire par nature) |
| `statisticsStore` *(n'existe pas — voir §3)* | — | — | — |
| `developerStore` | État des outils de debug activés | `debugOverlaysEnabled`, `verboseLogging` | Les journaux eux-mêmes ([[LOGGING_SYSTEM.md]]) |
| `labsStore` | Feature flags activés localement | `enabledFlags: string[]` | La définition des flags ([[FEATURE_FLAGS.md]]) |
| `historyStore` *(n'existe pas — voir §3)* | — | — | — |
| `favoriteStore` *(n'existe pas — voir §3)* | — | — | — |
| `uiStore` (ajout [[UI_STATE.md]] §2, hors des 17 noms candidats du cadrage) | Préoccupations de présentation transverses | `sidebarState`, `fullscreenActive`, `sharedPanelState` | Tout domaine métier (filtres, tri — voir [[UI_STATE.md]] §2) |

## 3. Pourquoi 12 stores réels et non 17

Le cadrage nomme 17 stores candidats. L'audit trouve que **quatre n'ont pas de raison d'exister comme store Zustand** :

- **`trackStore`** : une piste n'a aucun état client propre au-delà de son statut dans `queueStore` (en cours de lecture) ou son statut favori (`favoriteStore` fusionné, voir ci-dessous) — créer un store dédié violerait KISS ([[ARCHITECTURE_PRINCIPLES.md]] §8bis) pour une entité qui est déjà entièrement de l'état serveur ([[SERVER_STATE.md]]).
- **`statisticsStore`** : les statistiques sont un état **dérivé** ([[STATISTICS_ENGINE.md]], calculé et mis en cache), jamais un état client à muter — un store Zustand impliquerait une action de mutation qui n'a pas de sens ici. Consommé via un hook de requête (`useStatistics()`, déjà [[MODULES.md]] §6), pas un store.
- **`historyStore`** et **`favoriteStore`** : `History` et `Favorite` sont des entités persistées via `HistoryRepository`/`FavoriteRepository` ([[REPOSITORY_PATTERN.md]] §2) et consommées via TanStack Query (état serveur-like, bien que la source soit locale — voir [[SERVER_STATE.md]] §4 pour la justification de ce traitement) — un store Zustand dupliquerait cette donnée sans raison, violation directe du principe « une donnée n'existe qu'une seule fois » (§5 de ce document).

**Conséquence** : 17 noms candidats → 12 stores réels (`playerStore`, `queueStore`, `libraryStore`, `albumStore`, `artistStore`, `searchStore`, `themeStore`, `settingsStore`/`preferencesStore` fusionnés, `downloadStore`, `syncStore`, `notificationStore`, `developerStore`, `labsStore`) + 5 domaines correctement couverts par TanStack Query plutôt que par un store, **+ 1 store transverse non nommé par le cadrage** (`uiStore`, [[UI_STATE.md]] §2, nécessaire pour Sidebar/Fullscreen/Panels partagés) = **13 stores réels au total**. Ce constat est documenté explicitement plutôt que forcé à 17 pour respecter la lettre du cadrage au détriment de la cohérence architecturale.

## 4. `albumStore`/`artistStore` — statut marginal assumé

Ces deux stores sont légitimes mais minces : ils ne détiennent qu'un état d'UI propre à un écran spécifique (onglet actif). Un contributeur qui implémente ces écrans peut légitimement choisir un `useState` local plutôt qu'un store global si l'état ne survit pas à la navigation hors de l'écran — voir l'arbre de décision déjà acté ([[DATA_LAYER.md]] §1, règle 1). Listés ici pour complétude, pas comme une obligation d'implémentation si le besoin réel s'avère plus mince qu'anticipé.

## 5. Frontières et dépendances

- Un store ne dépend jamais d'un autre store directement (pas d'import croisé entre stores) — un composant qui a besoin de deux stores les consomme tous les deux séparément via deux hooks, jamais un store qui lit l'état d'un autre en interne (cohérent avec [[ARCHITECTURE.md]] §3bis, une feature n'importe jamais l'intérieur d'une autre).
- Exception explicite : `queueStore` peut lire `playerStore.currentTrackId` en lecture seule via un sélecteur composé au niveau du hook consommateur (jamais à l'intérieur de la définition du store lui-même) — cohérent avec la règle déjà actée ([[ARCHITECTURE.md]] §3bis, `player`↔`queue`).
- Aucun store ne dépend directement d'un Repository ([[REPOSITORY_PATTERN.md]]) — voir §1.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas la règle générale de nommage/structure (voir [[CODING_STANDARDS.md]] §4.3).
- Ne redéfinit pas les modules de fonctionnalité eux-mêmes (voir [[MODULES.md]]).
- Ne décrit pas la persistance (`persist` middleware) — voir [[LOCAL_STATE.md]] pour quels stores sont persistés.

## 7. Checklist de validation

- [ ] Tout nouveau store proposé est d'abord vérifié contre §3 (est-ce vraiment un état client mutable, ou un état serveur/dérivé déguisé ?).
- [ ] Aucun store n'importe un autre store ou un Repository directement (§5).
- [ ] Un store qui ne survit pas à la navigation reste un candidat `useState` local avant d'être un store global (§4).

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Architecture d'état) | Principal State Management Architect |

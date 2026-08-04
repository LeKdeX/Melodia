# DOMAIN_MODELS.md — Entités de domaine officielles (Phase 13)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Senior Data Architect
> **Documents liés** : [[ARCHITECTURE_PRINCIPLES.md]] §2.1, [[DATA_FLOW.md]], [[DATABASE_SCHEMA.md]]

[[ARCHITECTURE_PRINCIPLES.md]] §2.1 a déjà posé le principe : les entités de domaine sont indépendantes de tout vocabulaire Jellyfin. Ce document est la définition officielle et centrale de chaque entité — un contributeur qui a besoin de connaître la forme exacte d'un `Track` consulte ce document, jamais une définition locale à une feature qui pourrait diverger.

---

## 1. Convention commune

- Localisation : `packages/core/src/entities/`, un fichier par entité, `PascalCase` ([[CODING_STANDARDS.md]] §2).
- Une entité de domaine est un type de données pur — aucune méthode de mutation, aucun appel réseau ou I/O. Toute opération vit dans un Repository ([[REPOSITORY_PATTERN.md]]) ou un Service.
- Une entité ne connaît jamais sa provenance (Jellyfin vs local) — ce qui la distingue reste au niveau `Repository`/`LocalStore`, jamais un champ `source` qui fuiterait un détail d'implémentation dans le Domain.

## 2. Entités dérivées de Jellyfin (source distante, cache local)

| Entité | Champs essentiels | Relations | Invariant |
|---|---|---|---|
| `Album` | `id`, `title`, `artistId`, `year`, `genreIds[]`, `trackCount` | `1—N` avec `Track`, `N—1` avec `Artist` | `trackCount` toujours dérivé du nombre réel de `Track` liés, jamais stocké indépendamment sans revalidation |
| `Artist` | `id`, `name`, `biography?`, `albumIds[]` | `1—N` avec `Album` | — |
| `Track` | `id`, `title`, `durationMs`, `trackNumber`, `albumId`, `artistIds[]`, `genreIds[]` | `N—1` avec `Album`, `N—N` avec `Artist` (featuring) | `durationMs` toujours en millisecondes (jamais l'unité Jellyfin native, conversion actée au Mapper, [[DATA_FLOW.md]] §3) |
| `Genre` | `id`, `name` | `N—N` avec `Album`/`Track` | — |
| `Collection` | `id`, `name`, `type`, `childIds[]` | `1—N` avec `Album`/`Playlist` selon `type` | Voir [[COLLECTION_COMPONENTS.md]] §1 pour la taxonomie produit des types, non redéfinie ici |
| `Artwork` | `entityId`, `entityType`, `sourceUrl`, `dominantColor?`, `status` (`loaded`/`fallback`/`loading`) | `1—1` avec l'entité qu'elle illustre | Ne stocke jamais l'image elle-même (binaire géré par [[CACHE_SYSTEM.md]]), uniquement son descripteur — cohérent avec [[ARTWORK_SYSTEM.md]] |

## 3. Entités strictement locales (jamais synchronisées vers Jellyfin telles quelles)

| Entité | Champs essentiels | Relations | Invariant |
|---|---|---|---|
| `Playlist` | `id`, `title`, `trackIds[]` (ordonné), `type` (classique/intelligente/dynamique...), `rules?` | `N—N` avec `Track` | `rules` présent uniquement si `type` est basé sur des règles ([[PLAYLIST_SPECIFICATION.md]] §1) — jamais les deux représentations simultanément pour un même type |
| `Favorite` | `entityId`, `entityType`, `addedAt` | `N—1` avec l'entité favorisée (`Track`/`Album`/`Artist`/`Playlist`) | Un seul mécanisme de favori pour toute l'application ([[COLLECTION_COMPONENTS.md]] §3, déjà acté) — jamais une entité `Favorite` distincte par type |
| `History` (événement d'écoute) | `trackId`, `startedAt`, `listenedDurationMs`, `context` (playlist/album/recherche/mix) | `N—1` avec `Track` | Un événement n'est créé que si le seuil de comptage d'écoute est atteint ([[STATISTICS_SPECIFICATION.md]] §2) — jamais un événement partiel pré-seuil persisté puis complété |
| `Download` | `trackId`, `status` (`queued`/`downloading`/`paused`/`completed`/`failed`), `progress`, `qualityProfile`, `localFileRef` | `1—1` avec `Track` | `localFileRef` n'existe que si `status = completed` — jamais un état incohérent où un fichier est référencé sans être réellement présent (voir [[DOWNLOAD_SYSTEM.md]], validation post-téléchargement) |

## 4. Entités calculées (jamais persistées comme source de vérité, dérivées à la demande)

| Entité | Champs essentiels | Dérivée de | Invariant |
|---|---|---|---|
| `Statistics` (agrégat) | `period`, `totalListeningMs`, `topArtists[]`, `topAlbums[]`, `topTracks[]` | `History` (§3), recalculée par [[STATISTICS_ENGINE.md]] | Jamais stockée comme table indépendante en source de vérité — uniquement mise en cache de résultat ([[CACHE_SYSTEM.md]] §1, Statistics Cache), toujours reconstructible depuis `History` |
| `Recommendation` | `entityId`, `entityType`, `score`, `reason` | `History`, `Favorite`, signaux temporels — voir [[RECOMMENDATION_ENGINE.md]] | `score` n'a de sens que relativement à un contexte de génération (ex. un Daily Mix précis) — jamais comparé entre deux contextes différents |
| `Theme` (état dynamique) | `dominantColor`, `gradientStops[]`, `sourceArtworkId` | `Artwork` active (piste en cours de lecture) | Recalculé à chaque changement de piste, jamais persisté au-delà de la session courante ([[DYNAMIC_THEME_GUIDE.md]]) |

---

## 5. Ce que ce document ne fait pas

- Ne redéfinit pas le comportement produit de chaque entité (voir la spécification produit correspondante : [[PLAYLIST_SPECIFICATION.md]], [[STATISTICS_SPECIFICATION.md]], [[DISCOVERY_SPECIFICATION.md]]).
- Ne redéfinit pas le schéma de persistance physique (voir [[DATABASE_SCHEMA.md]]).
- Ne redéfinit pas les règles de transformation DTO→entité (voir [[MAPPER_GUIDE.md]]).

## 6. Checklist de validation

- [ ] Toute nouvelle entité de domaine est ajoutée ici avant tout usage dans une feature ([[DEFINITION_OF_DONE.md]]).
- [ ] Aucune entité n'expose une méthode de mutation ou un appel I/O (§1).
- [ ] Une entité calculée (§4) n'est jamais traitée comme source de vérité persistée.

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Phase 13) | Senior Data Architect |

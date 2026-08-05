# REPOSITORY_PATTERN.md — Repositories par domaine (Phase 13)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Database Architect
> **Documents liés** : [[ARCHITECTURE_PRINCIPLES.md]] §3, §8bis (Repository Pattern), [[DOMAIN_MODELS.md]], [[MODULES.md]]

[[ARCHITECTURE_PRINCIPLES.md]] §8bis a déjà nommé `LocalStore` comme *le* repository du cache local, au singulier. Ce document descend d'un niveau : `LocalStore` reste l'interface de persistance bas niveau (lecture/écriture de tables, [[DATABASE_SCHEMA.md]]), mais chaque domaine expose son propre **repository de domaine** — une façade typée et spécifique au-dessus de `LocalStore`/`MusicSource`, jamais un accès direct aux tables depuis une feature.

---

## 1. Pourquoi un repository par domaine plutôt qu'un `LocalStore` consommé directement

`LocalStore` reste générique (lire/écrire une table, une transaction). Un repository de domaine ajoute la sémantique métier minimale (ex. `AlbumRepository.getByArtist(artistId)` plutôt qu'une requête générique sur la table `albums` filtrée à la main dans chaque feature qui en a besoin) — évite la duplication de logique de requête à travers les features, cohérent avec [[ENGINEERING_GUIDE.md]] §1.3 (non-duplication) et avec la frontière déjà actée qu'une feature n'accède jamais directement à `LocalStore` ([[ARCHITECTURE.md]] §3bis).

## 2. Liste officielle des repositories

| Repository | Domaine | Dépend de | Consommé par (modules, [[MODULES.md]]) |
|---|---|---|---|
| `AlbumRepository` | `Album` | `LocalStore`, `MusicSource` (via cache invalidé par sync) | `albums`, `library` |
| `ArtistRepository` | `Artist` | `LocalStore`, `MusicSource` | `artists`, `library` |
| `TrackRepository` | `Track` — expose aussi `getPlaybackSource(trackId)` (ajout Moteur Audio, résout local/cache/streaming en un `PlaybackSource` opaque, voir [[AUDIO_ENGINE.md]] §0bis.2) | `LocalStore`, `MusicSource`, `DownloadRepository` (consultation du statut téléchargé) | `tracks`, `library`, `player`, `queue` (lecture seule) |
| `PlaylistRepository` | `Playlist` | `LocalStore` (+ `MusicSource` pour les playlists Jellyfin natives) | `library` (section playlists) |
| `HistoryRepository` | `History` | `LocalStore` uniquement — jamais `MusicSource` (donnée strictement locale, [[STATISTICS_SPECIFICATION.md]] §2) | `statistics` |
| `FavoriteRepository` | `Favorite` | `LocalStore` (+ `MusicSource` en écriture optionnelle, [[MAPPER_GUIDE.md]] §4) | Toute feature d'affichage, en lecture (via sélecteur, jamais un import direct) |
| `DownloadRepository` | `Download` | `LocalStore`, `platform` (accès fichier natif) | `downloads` |
| `StatisticsRepository` | `Statistics` (agrégat calculé) | `HistoryRepository` (jamais `LocalStore` directement — un agrégat se recalcule, ne se lit jamais comme une table brute) | `statistics` |
| `RecommendationRepository` | `Recommendation` | `HistoryRepository`, `FavoriteRepository` | `search` (Daily Mix), `library` (Découverte) |
| `SettingsRepository` | Préférences utilisateur | `LocalStore` uniquement | `settings`, `themes`, `notifications` |
| `CollectionRepository` (ajout Architecture d'état) | `Collection` | `LocalStore`, `MusicSource` | `library` (gap trouvé lors de la rédaction de [[SERVER_STATE.md]] §5 — `Collection` avait une entité de domaine mais aucun repository dédié) |
| `ArtworkRepository` (ajout Architecture d'état) | `Artwork` (descripteur uniquement, jamais le binaire) | `LocalStore`, `MusicSource` | `library`, `player` (idem, gap trouvé lors de la rédaction de [[SERVER_STATE.md]] §5) |

## 3. Interface type (illustrative, pas une spécification finale d'implémentation)

```
interface AlbumRepository {
  getById(id: string): Promise<Result<Album, NotFoundError>>
  getByArtist(artistId: string): Promise<Result<Album[], never>>
  search(query: string): Promise<Result<Album[], never>>
}
```

- Chaque méthode retourne un `Result<T, E>` ([[ERROR_HANDLING.md]] §2), jamais une exception pour un cas attendu.
- Aucune méthode n'expose un type `Row` de stockage ou un DTO Jellyfin — uniquement des entités de domaine ([[DOMAIN_MODELS.md]]) ou des primitives.

## 4. Règles de dépendance

- Un repository peut dépendre de `LocalStore`, `MusicSource`, `platform`, et d'un **autre repository** du même niveau (ex. `StatisticsRepository` → `HistoryRepository`) — jamais d'une feature ou d'un composant UI.
- Un repository ne dépend jamais directement d'un autre repository dans le sens inverse d'une dépendance déjà déclarée ailleurs (pas de cycle) — vérifiable par le même linter d'architecture que les frontières de module ([[ARCHITECTURE.md]] §3bis).
- `RecommendationRepository` et `StatisticsRepository` sont les deux seuls repositories qui dépendent d'autres repositories plutôt que directement de `LocalStore` — parce que leur donnée est par nature dérivée (§2), jamais stockée comme source de vérité indépendante ([[DOMAIN_MODELS.md]] §4).

## 5. Matrice de dépendance repositories ↔ services (bonus du cadrage)

| Repository | Service consommateur principal | Nature de l'appel |
|---|---|---|
| `TrackRepository` | Service de lecture (`player`) | Lecture directe à chaque changement de piste |
| `HistoryRepository` | Service d'enregistrement d'écoute (déclenché quand le seuil de comptage de [[STATISTICS_SPECIFICATION.md]] §2 est franchi) | Écriture à chaque écoute qualifiée |
| `StatisticsRepository` | [[STATISTICS_ENGINE.md]] (Web Worker) | Lecture en arrière-plan, jamais sur le thread principal |
| `RecommendationRepository` | [[RECOMMENDATION_ENGINE.md]] | Lecture à la génération d'un Daily Mix, jamais en temps réel à chaque interaction |
| `PlaylistRepository` | [[PLAYLIST_ENGINE.md]] (réévaluation des règles) | Lecture/écriture à l'ouverture d'une playlist intelligente |
| `DownloadRepository` | Service de téléchargement ([[DOWNLOAD_SYSTEM.md]]) | Écriture à chaque changement de statut de la file |
| `FavoriteRepository` | Service de synchronisation ([[SYNC_ENGINE_SPECIFICATION.md]]) | Lecture à chaque cycle de synchronisation pour détecter les conflits ([[OFFLINE_SYSTEM.md]] §5-6) |

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas `MusicSource`/`LocalStore` eux-mêmes (voir [[ARCHITECTURE_PRINCIPLES.md]] §2-3).
- Ne redéfinit pas la forme des entités retournées (voir [[DOMAIN_MODELS.md]]).
- Ne redéfinit pas le schéma physique consulté par `LocalStore` (voir [[DATABASE_SCHEMA.md]]).

## 7. Checklist de validation

- [ ] Toute nouvelle table de [[DATABASE_SCHEMA.md]] a un repository de domaine associé avant tout accès depuis une feature.
- [ ] Aucun repository ne retourne un DTO ou un type de ligne de stockage brut (§3).
- [ ] Aucun cycle de dépendance entre repositories (§4).

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Phase 13) | Database Architect |
| 1.1.0 | 2026-08-04 | Architecture d'état : ajout de `CollectionRepository` et `ArtworkRepository` (§2), gaps trouvés lors de la rédaction de [[SERVER_STATE.md]] | Database Architect |
| 1.2.0 | 2026-08-04 | Moteur Audio : ajout de `TrackRepository.getPlaybackSource(trackId)` (§2), résolution locale/cache/streaming requise par [[AUDIO_ENGINE.md]] §0bis.2 | Database Architect |

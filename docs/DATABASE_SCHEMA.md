# DATABASE_SCHEMA.md — Schéma logique de la base locale (Phase 13)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Database Architect
> **Documents liés** : [[DATA_LAYER.md]] §2.1, [[DOMAIN_MODELS.md]], [[INDEXEDDB_ARCHITECTURE.md]]

[[DATA_LAYER.md]] §2.1 esquissait un schéma minimal (« au minimum `tracks`, `albums`, `artists`, `playlists`, `playback_state`, `search_index_meta`, `sync_meta` »). Ce document en est la version exhaustive et faisant autorité — **schéma logique**, valable identiquement pour les deux implémentations de `LocalStore` (`SqliteStore` et `IndexedDbStore`, [[ARCHITECTURE_PRINCIPLES.md]] §3.1) ; l'implémentation physique propre à Dexie/IndexedDB est déportée dans [[INDEXEDDB_ARCHITECTURE.md]] pour ne pas mélanger schéma logique et détail de plateforme.

---

## 1. Tables

| Table | Rôle | Correspond à |
|---|---|---|
| `albums` | Métadonnées d'album mises en cache | [[DOMAIN_MODELS.md]] §2, `Album` |
| `artists` | Métadonnées d'artiste mises en cache | `Artist` |
| `tracks` | Métadonnées de piste mises en cache | `Track` |
| `genres` | Référentiel de genres | `Genre` |
| `collections` | Regroupements (dossiers, collections Jellyfin) | `Collection` |
| `playlists` | Playlists (classiques, intelligentes — règles sérialisées, dynamiques) | `Playlist` |
| `history` | Journal d'écoute local | `History` |
| `favorites` | Statut de favori, unique pour toute entité favorisable | `Favorite` |
| `downloads` | File et statut de téléchargement | `Download` |
| `settings` | Préférences utilisateur (clé/valeur typée) | Consommé par `SettingsRepository` ([[REPOSITORY_PATTERN.md]]) |
| `statistics_cache` | Résultat mis en cache des agrégats calculés | `Statistics` (jamais source de vérité, [[DOMAIN_MODELS.md]] §4) |
| `artwork` | Descripteurs d'illustration (pas le binaire) | `Artwork` |
| `cache_meta` | Métadonnées de gouvernance du cache (taille, dernière purge, par catégorie) | [[CACHE_SYSTEM.md]] |
| `sync_meta` | Horodatage de dernière synchronisation réussie, par bibliothèque | [[SYNC_ENGINE_SPECIFICATION.md]] |
| `logs` | Entrées de journal applicatif | [[LOGGING_SYSTEM.md]] |
| `diagnostics_snapshots` | Instantanés ponctuels de santé système (pas un flux continu) | [[DIAGNOSTICS_SYSTEM.md]] |
| `search_index_meta` | Métadonnées de sérialisation de l'index FlexSearch | [[DATA_LAYER.md]] §3 |
| `playback_state` | État de lecture persisté (reprise après redémarrage) | `player`/`queue` ([[MODULES.md]] §1-2) |

## 2. Relations

```
artists 1───N albums 1───N tracks N───N genres
                  │                  │
                  └──────N───N───────┘ (artistes en featuring sur une piste)

playlists N───N tracks (table de jonction playlist_tracks, ordre préservé par un champ `position`)
collections 1───N albums | 1───N playlists (selon `collections.type`)

favorites.entityId ──→ (albums.id | artists.id | tracks.id | playlists.id), polymorphe par entityType
history.trackId ──→ tracks.id
downloads.trackId ──→ tracks.id (1—1, voir DOMAIN_MODELS.md §3)
artwork.entityId ──→ (albums.id | artists.id), polymorphe par entityType
```

**Pourquoi une relation polymorphe pour `favorites`/`artwork` plutôt qu'une table par type d'entité** : une seule table de jonction évite quatre tables quasi identiques (`favorite_tracks`, `favorite_albums`...) pour un gain de typage marginal — cohérent avec KISS ([[ARCHITECTURE_PRINCIPLES.md]] §8bis) ; le typage fort reste garanti au niveau du Repository ([[REPOSITORY_PATTERN.md]] §2, `FavoriteRepository`), pas au niveau du schéma physique.

## 3. Index

| Table | Index | Justification |
|---|---|---|
| `tracks` | `albumId`, `artistIds` (multi-entry) | Accès de premier ordre « toutes les pistes d'un album/artiste » ([[DATA_LAYER.md]] §2.4, déjà acté) |
| `history` | `trackId`, `startedAt` | Requêtes d'agrégation par piste et par période ([[STATISTICS_ENGINE.md]]) |
| `favorites` | composé `[entityType+entityId]` (unique) | Empêche un doublon de favori pour une même entité, garde-fou au niveau index plutôt que seulement applicatif |
| `downloads` | `status` | Filtrage fréquent de la vue Téléchargements par statut ([[DOWNLOAD_SCREENS.md]]) |
| `logs` | `category`, `timestamp` | Rotation et filtrage ([[LOGGING_SYSTEM.md]] §1-2) |
| `playlist_tracks` | composé `[playlistId+position]` | Préserve et interroge efficacement l'ordre sans champ dénormalisé sur `tracks` |

Toute table sans index déclaré ci-dessus est interrogée exclusivement par sa clé primaire — cohérent avec la règle déjà actée qu'aucun accès de premier ordre ne scanne une table complète ([[DATA_LAYER.md]] §2.4).

## 4. Contraintes

- Clé primaire `id` (chaîne, identifiant Jellyfin d'origine pour les entités synchronisées — jamais régénéré localement, pour rester stable à travers les synchronisations).
- `history`, `favorites`, `downloads`, `playlists` (classiques et locales), `settings` : identifiants générés localement (UUID) — aucune dépendance à Jellyfin pour leur existence.
- Suppression en cascade : supprimer une `track` du cache (retrait côté serveur, [[SYNC_ENGINE_SPECIFICATION.md]] §4) retire ses entrées `favorites`/`playlist_tracks` associées mais **jamais** ses entrées `history` ou `downloads` déjà actées ([[OFFLINE_SYSTEM.md]] §2, [[DOWNLOAD_SYSTEM.md]] §6 — le contenu déjà téléchargé et l'historique déjà enregistré survivent à la suppression côté serveur).
- Aucune contrainte de clé étrangère bloquante entre `tracks` et `albums` — un `albumId` orphelin (album pas encore synchronisé) est toléré temporairement pendant un import initial progressif ([[SYNC_ENGINE_SPECIFICATION.md]] §1), résolu à la fin du cycle de synchronisation.

## 5. Versions et migrations

Le numéro de version du schéma est global (pas par table) — une migration ajoute/modifie une ou plusieurs tables de façon atomique et idempotente, cohérent avec [[DATA_LAYER.md]] §2.2 déjà acté (sauvegarde préalable, jamais de migration destructive silencieuse). Le détail de l'implémentation Dexie du versioning (API `version().stores()`) vit dans [[INDEXEDDB_ARCHITECTURE.md]] §3, non redécrit ici.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas l'implémentation physique Dexie (voir [[INDEXEDDB_ARCHITECTURE.md]]).
- Ne redéfinit pas la forme des entités de domaine correspondantes (voir [[DOMAIN_MODELS.md]]).
- Ne redéfinit pas les règles d'expiration/priorité de cache (voir [[CACHE_SYSTEM.md]]).

## 7. Checklist de validation

- [ ] Toute nouvelle table est ajoutée ici avant toute implémentation Dexie/SQLite ([[DEFINITION_OF_DONE.md]]).
- [ ] Toute relation polymorphe (§2) reste typée fortement au niveau du Repository, jamais seulement au niveau du schéma.
- [ ] Aucun accès de premier ordre ne scanne une table sans index déclaré (§3).

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Phase 13) | Database Architect |

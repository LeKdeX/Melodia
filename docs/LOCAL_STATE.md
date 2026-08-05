# LOCAL_STATE.md — Classification de l'état local (Architecture d'état)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Senior TypeScript Engineer
> **Documents liés** : [[ARCHITECTURE_PRINCIPLES.md]] §4.2, [[STORE_SPECIFICATIONS.md]], [[SERVER_STATE.md]] §4

[[ARCHITECTURE_PRINCIPLES.md]] §4.2 a déjà posé le principe : l'état local (éphémère ou persisté) passe par Zustand. Ce document classe précisément quel mécanisme gère chaque domaine « local » — parce que « local » ne veut pas dire systématiquement « store Zustand » (voir [[SERVER_STATE.md]] §4, Historique/Favoris sont locaux mais consommés via TanStack Query).

---

## 1. Domaines d'état local par mécanisme réel

| Domaine | Mécanisme | Persisté (`persist` middleware ou `LocalStore`) |
|---|---|---|
| Préférences | `settingsStore` ([[STORE_SPECIFICATIONS.md]] §2) | Oui — `persist` Zustand vers `LocalStore` |
| Historique | `HistoryRepository` via TanStack Query ([[SERVER_STATE.md]] §4) | Oui — `LocalStore` directement, jamais dans un store Zustand |
| Favoris | `FavoriteRepository` via TanStack Query ([[SERVER_STATE.md]] §4) | Oui — idem |
| Téléchargements (file active) | `downloadStore` (progression en temps réel) + `DownloadRepository` (statut persistant, [[DOWNLOAD_SYSTEM.md]] §5quater) | Partiellement — la progression en cours n'est jamais persistée telle quelle, seul le statut final l'est |
| Lecture locale (position, volume) | `playerStore` | Oui pour le volume/dernière position (reprise après redémarrage), non pour l'état de lecture actif lui-même |
| Playlists locales | `PlaylistRepository`/`PlaylistEngine` via TanStack Query ([[PLAYLIST_ENGINE.md]]) | Oui — `LocalStore` |
| Statistiques | Aucun store — état dérivé calculé ([[STATISTICS_ENGINE.md]], [[STORE_SPECIFICATIONS.md]] §3) | Résultat mis en cache (`statistics_cache`, [[DATABASE_SCHEMA.md]]), jamais un store |
| Index de recherche | Ni store ni TanStack Query — vit dans le Worker FlexSearch lui-même ([[DATA_LAYER.md]] §3), consommé via `searchStore` pour la requête active uniquement | Oui — sérialisé (`search_index_meta`, [[DATABASE_SCHEMA.md]]) |
| Cache | Aucun store — géré entièrement par [[CACHE_SYSTEM.md]] au niveau `LocalStore`, jamais exposé à l'état client | Oui, par définition |
| Offline (statut) | `syncStore` (statut affiché) + logique dans [[OFFLINE_SYSTEM.md]] (comportement) | Le statut lui-même n'est pas persisté (recalculé à chaque démarrage selon la connectivité réelle) |

## 2. Règle de choix persist vs non-persisté

- **Persisté** (`persist` middleware Zustand ou `LocalStore` direct) : la donnée doit survivre à un redémarrage complet de l'application (préférences, volume, file de téléchargement en attente).
- **Non persisté** : la donnée est réinitialisée à chaque démarrage par nature (statut de lecture actif « en cours de lecture », qui n'a pas de sens avant qu'une lecture soit relancée explicitement).
- **Jamais un store Zustand persisté pour une donnée déjà gérée par un Repository/`LocalStore`** (§1, Historique/Favoris/Playlists locales) — persister la même donnée à deux endroits est une violation directe de « une donnée n'existe qu'une seule fois » ([[STATE_MANAGEMENT.md]] §2).

## 3. Middleware `persist` — convention

Le middleware `persist` de Zustand cible `IndexedDbStore`/`SqliteStore` via un adaptateur de stockage dédié (pas `localStorage`, réservé aux cas où aucun accès à `LocalStore` n'est disponible — inexistant dans Melodia, `LocalStore` est toujours disponible) — cohérent avec [[SECURITY_GUIDE.md]] §3ter (aucune donnée sensible dans `localStorage` en clair).

---

## 4. Ce que ce document ne fait pas

- Ne redéfinit pas les stores eux-mêmes (voir [[STORE_SPECIFICATIONS.md]]).
- Ne redéfinit pas le mécanisme de persistance physique (voir [[DATABASE_SCHEMA.md]], [[INDEXEDDB_ARCHITECTURE.md]]).
- Ne redéfinit pas pourquoi Historique/Favoris sont traités comme état serveur-like (voir [[SERVER_STATE.md]] §4).

## 5. Checklist de validation

- [ ] Tout nouveau domaine d'état local est classé ici avant implémentation, avec le mécanisme réel choisi (§1).
- [ ] Aucune donnée n'est persistée à deux endroits simultanément (§2).
- [ ] Aucun `persist` Zustand ne cible `localStorage` directement (§3).

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Architecture d'état) | Senior TypeScript Engineer |

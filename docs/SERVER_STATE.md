# SERVER_STATE.md — Classification de l'état serveur (Architecture d'état)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Senior TypeScript Engineer
> **Documents liés** : [[ARCHITECTURE_PRINCIPLES.md]] §4.1, [[REPOSITORY_PATTERN.md]], [[TANSTACK_QUERY_GUIDE.md]]

[[ARCHITECTURE_PRINCIPLES.md]] §4.1 a déjà tranché : toute donnée dont la source de vérité est distante passe par TanStack Query, jamais copiée dans Zustand. Ce document répond à une question laissée ouverte : **quels domaines précis sont de l'état serveur**, et comment chacun s'articule avec son Repository ([[REPOSITORY_PATTERN.md]]). La configuration technique de TanStack Query elle-même (query keys, cache time...) vit dans [[TANSTACK_QUERY_GUIDE.md]], non redécrite ici.

---

## 1. Domaines d'état serveur

| Domaine | Repository source | Nature |
|---|---|---|
| Albums | `AlbumRepository` | Distant (Jellyfin), mis en cache local |
| Artists | `ArtistRepository` | Distant, mis en cache local |
| Tracks | `TrackRepository` | Distant, mis en cache local |
| Genres | Référentiel via `AlbumRepository`/`TrackRepository` (pas de repository dédié — voir [[DATABASE_SCHEMA.md]] §1, table `genres` sans repository de domaine propre car jamais interrogée seule) | Distant |
| Collections | `CollectionRepository` *(non listé dans [[REPOSITORY_PATTERN.md]] §2 — ajouté ici comme gap comblé, voir §5)* | Distant |
| Images (descripteurs) | Via `ArtworkRepository` *(idem, gap comblé §5)* | Distant (descripteur), binaire géré par [[CACHE_SYSTEM.md]] |
| Sessions | Géré par le flux d'authentification ([[JELLYFIN_INTEGRATION.md]] §2) — jamais mis en cache TanStack Query, vit en mémoire/trousseau natif ([[SECURITY_GUIDE.md]] §3bis) | Distant, cycle de vie différent de tout le reste |
| Utilisateurs (profil du compte connecté) | Via le SDK Jellyfin directement au moment de la connexion, pas de re-fetch périodique | Distant, quasi-statique |
| Permissions | Idem Utilisateurs — dérivées de la session active | Distant, quasi-statique |

## 2. Playlists — cas mixte, pas un domaine pur

Une playlist Jellyfin native est de l'état serveur (`PlaylistRepository`, [[REPOSITORY_PATTERN.md]] §2) ; une playlist locale (classique, intelligente, dynamique — [[PLAYLIST_ENGINE.md]] §1) est de l'état **local** ([[LOCAL_STATE.md]]), jamais serveur. Un composant qui affiche une playlist ne présuppose jamais laquelle des deux sans vérifier son type — les deux partagent la même forme d'entité ([[DOMAIN_MODELS.md]] §3) mais des mécanismes de requête différents.

## 3. Règle de query key par domaine

Convention détaillée dans [[TANSTACK_QUERY_GUIDE.md]] §1 — ce document se limite à confirmer que chaque domaine du §1 a une clé de premier niveau dédiée (`['albums', ...]`, `['artists', ...]`, etc.), jamais un espace de clé partagé entre deux domaines qui rendrait l'invalidation ciblée impossible.

## 4. Historique et Favoris — traitement délibéré comme état serveur-like

Bien que `History` et `Favorite` soient des entités **strictement locales** ([[DOMAIN_MODELS.md]] §3, jamais transmises à un serveur externe), elles sont consommées via TanStack Query plutôt que via un store Zustand ([[STORE_SPECIFICATIONS.md]] §3) — parce que leur source de vérité est `LocalStore` via un Repository, exactement le même pattern d'accès qu'une donnée Jellyfin (juste une latence quasi nulle au lieu d'un aller-retour réseau). TanStack Query gère cet accès de façon identique, qu'il s'agisse d'IndexedDB ou d'un réseau — la distinction serveur/local porte sur *où vit la source de vérité par rapport au Repository*, pas sur *la latence d'accès*.

## 5. Gap comblé — repositories manquants dans REPOSITORY_PATTERN.md

L'écriture de ce document a révélé que [[REPOSITORY_PATTERN.md]] §2 omettait deux repositories réellement nécessaires pour couvrir §1 ci-dessus : `CollectionRepository` et `ArtworkRepository`. Ajoutés à [[REPOSITORY_PATTERN.md]] §2 (voir son historique de révisions) plutôt que laissés implicites ici.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas les repositories eux-mêmes (voir [[REPOSITORY_PATTERN.md]]).
- Ne redéfinit pas la configuration technique de TanStack Query (voir [[TANSTACK_QUERY_GUIDE.md]]).
- Ne redéfinit pas les entités de domaine (voir [[DOMAIN_MODELS.md]]).

## 7. Checklist de validation

- [ ] Tout nouveau domaine de donnée distante est ajouté ici avant d'être consommé par une feature.
- [ ] Aucune donnée de §1 n'est jamais copiée dans un store Zustand ([[ARCHITECTURE_PRINCIPLES.md]] §4.1, invariant).
- [ ] Playlists (§2) : le composant consommateur distingue toujours playlist Jellyfin vs locale avant de choisir le mécanisme de requête.

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Architecture d'état) | Senior TypeScript Engineer |

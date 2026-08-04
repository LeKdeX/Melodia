# DATA_FLOW.md — Flux de données de bout en bout (Phase 12)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Senior TypeScript Engineer
> **Documents liés** : [[ARCHITECTURE_PRINCIPLES.md]] §2-4, [[DATA_LAYER.md]], [[JELLYFIN_INTEGRATION.md]]

[[ARCHITECTURE_PRINCIPLES.md]] §2-4 et [[DATA_LAYER.md]] définissent déjà les interfaces (`MusicSource`, `LocalStore`) et les règles d'usage de l'état. Ce document répond à une question que ni l'un ni l'autre ne couvre explicitement : **par quelles formes typées intermédiaires** une donnée passe-t-elle entre la réponse brute du serveur Jellyfin et son affichage à l'écran ? Aucune de ces formes n'est une redécision architecturale — chacune existe déjà implicitement dans le mapping décrit à [[ARCHITECTURE_PRINCIPLES.md]] §2.2 ; ce document les nomme et les enchaîne explicitement.

---

## 1. Le pipeline complet

```
Jellyfin (serveur)
      │  réponse JSON brute, vocabulaire et forme propres à l'API Jellyfin
      ▼
DTO (Data Transfer Object)
      │  type TypeScript qui reflète fidèlement la forme de la réponse Jellyfin,
      │  interne à JellyfinSource, jamais exporté au-delà de packages/core/src/data/sources/
      ▼
Mapper
      │  fonction pure et testée isolément (ARCHITECTURE_PRINCIPLES.md §2.2),
      │  normalise les champs absents/incohérents, jamais de `null` propagé silencieusement
      ▼
Entité de domaine (Track, Album, Artist, Playlist)
      │  type interne à Melodia, indépendant de tout vocabulaire Jellyfin
      │  (ARCHITECTURE_PRINCIPLES.md §2.1) — c'est la forme que voit le Domain
      ▼
Repository (MusicSource / LocalStore)
      │  interface unique d'accès, jamais de requête réseau ou de requête
      │  IndexedDB/SQLite directe en dehors de cette couche
      ▼
Cache
      │  TanStack Query (état serveur) et/ou LocalStore (persistance hors ligne)
      │  selon l'arbre de décision déjà acté (DATA_LAYER.md §1)
      ▼
Store (Zustand, état client uniquement)
      │  jamais une copie de l'état serveur — uniquement l'état dérivé/éphémère
      │  qui référence l'entité par identifiant (ARCHITECTURE_PRINCIPLES.md §4)
      ▼
ViewModel
      │  forme prête pour l'affichage (valeurs formatées : durée en mm:ss,
      │  date relative, libellé pluralisé) — calculée par un sélecteur/hook,
      │  jamais stockée en doublon de l'entité de domaine
      ▼
UI (composant React)
```

## 2. Rôle et frontière de chaque étape

| Étape | Type/forme | Où elle vit | Ce qu'elle ne fait jamais |
|---|---|---|---|
| DTO | `JellyfinTrackDto`, `JellyfinAlbumDto`... | `packages/core/src/data/sources/jellyfin/dto/` | N'est jamais importé en dehors de `JellyfinSource` — un DTO qui fuit jusqu'à un composant UI est une violation de frontière détectable en revue |
| Mapper | `mapTrackDto(dto: JellyfinTrackDto): Track` | `packages/core/src/data/sources/jellyfin/mappers/` | Ne lève jamais d'exception sur un champ manquant — retourne une valeur par défaut explicite documentée dans la fonction ([[CODING_STANDARDS.md]] §4.4, fonction pure) |
| Entité de domaine | `Track`, `Album`, `Artist`, `Playlist` (`packages/core/src/entities/`) | Couche Domain | N'inclut jamais un champ propre à l'API Jellyfin (ex. un identifiant de format interne Jellyfin non pertinent au Domain) |
| Repository | Interfaces `MusicSource`/`LocalStore` | `packages/core/src/data/` | N'est jamais implémenté deux fois avec des comportements divergents non testés (voir [[RISK_REGISTER_TECHNICAL.md]] §4, divergence SqliteStore/IndexedDbStore) |
| Cache | TanStack Query (serveur) / `LocalStore` (persistant) | `@melodia/core` + hooks `@melodia/app` | Ne mélange jamais les deux natures d'état dans un seul mécanisme (invariant déjà acté, [[ARCHITECTURE_PRINCIPLES.md]] §4) |
| Store (Zustand) | `playerStore`, `queueStore`, `preferencesStore`... | `packages/app/src/features/*/store/` | Ne duplique jamais une donnée déjà disponible via le cache serveur — uniquement une référence (ex. `currentTrackId`), jamais une copie complète de l'entité |
| ViewModel | ex. `TrackRowViewModel { title, artistName, durationLabel, isPlaying }` | Hook/sélecteur au plus près du composant consommateur (`useTrackRowViewModel(trackId)`) | N'est jamais stocké dans un store — recalculé à la demande à partir de l'entité + de l'état dérivé, coût négligeable et toujours à jour |

## 3. Exemple concret — affichage d'une ligne de piste (Track Row)

1. `JellyfinSource.getTracks(albumId)` reçoit un tableau de `JellyfinTrackDto` (champs bruts : `Id`, `Name`, `RunTimeTicks`, `IndexNumber`...).
2. `mapTrackDto()` transforme chaque DTO en `Track` (`{ id, title, durationMs, trackNumber, artistId, albumId }`), convertissant les ticks Jellyfin en millisecondes et substituant `"Titre inconnu"` à un champ `Name` absent (jamais un `undefined` propagé).
3. `JellyfinSource` (implémentation de `MusicSource`) retourne `Track[]` au repository, mis en cache par TanStack Query sous la clé `['tracks', albumId]` et persisté dans `LocalStore` pour l'accès hors ligne (DATA_LAYER.md §2).
4. Le composant `TrackList` ([[TRACK_COMPONENTS.md]]) consomme `useTracks(albumId)` (cache) et `usePlayer()` (store, pour savoir si une piste de la liste est celle en cours de lecture).
5. `useTrackRowViewModel(track, playerState)` combine les deux en un ViewModel prêt à l'affichage : `durationLabel: "3:42"`, `isPlaying: true` pour la piste active — jamais recalculé ailleurs, jamais stocké.
6. `TrackRow` ([[TRACK_COMPONENTS.md]]) reçoit uniquement ce ViewModel en props, sans connaître ni Jellyfin, ni le store, ni le cache (cohérent avec [[CODING_STANDARDS.md]] §4.1, aucune logique métier dans un composant de présentation).

## 4. Gestion des erreurs dans le pipeline

Chaque étape a une responsabilité d'erreur distincte, détaillée dans [[ERROR_HANDLING.md]] plutôt que redécrite ici : le Mapper normalise (jamais d'exception), le Repository retourne des erreurs typées (`Result<T, MusicSourceError>`, [[CODING_STANDARDS.md]] §4.4), le Cache expose un état `error` consommable par l'UI (TanStack Query), et la présentation de l'erreur à l'utilisateur suit [[ERROR_STATES.md]]/[[ERROR_EXPERIENCE.md]] — non redécidé ici.

---

## 5. Ce que ce document ne fait pas

- Ne redéfinit pas les interfaces `MusicSource`/`LocalStore` elles-mêmes (voir [[ARCHITECTURE_PRINCIPLES.md]] §2-3).
- Ne redéfinit pas l'arbre de décision de choix du mécanisme d'état (voir [[DATA_LAYER.md]] §1).
- Ne redécrit pas la stratégie de synchronisation serveur↔local (voir [[SYNC_ENGINE_SPECIFICATION.md]]).

## 6. Checklist de validation

- [ ] Toute nouvelle entité de domaine ajoutée a un DTO et un Mapper dédiés testés isolément (cohérent avec [[ARCHITECTURE_PRINCIPLES.md]] §2.2).
- [ ] Aucun DTO n'est importé en dehors de `packages/core/src/data/sources/` (vérifiable par le linter d'architecture, [[CODING_STANDARDS.md]] §1).
- [ ] Aucun ViewModel n'est stocké dans un store Zustand (vérifié en revue de code, [[DEFINITION_OF_DONE.md]]).

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Phase 12) | Senior TypeScript Engineer |

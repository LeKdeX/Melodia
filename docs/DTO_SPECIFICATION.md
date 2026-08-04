# DTO_SPECIFICATION.md — Spécification des DTO Jellyfin (Phase 13)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Senior Data Architect
> **Documents liés** : [[DATA_FLOW.md]] §2, [[ARCHITECTURE_PRINCIPLES.md]] §2, [[JELLYFIN_INTEGRATION.md]], [[MAPPER_GUIDE.md]]

[[DATA_FLOW.md]] §2 a déjà posé le principe : un DTO reflète fidèlement la réponse Jellyfin, interne à `JellyfinSource`, jamais exporté au-delà. Ce document liste **concrètement** chaque DTO nécessaire à la couverture fonctionnelle actuelle du produit — la forme exacte suit celle de l'API Jellyfin telle qu'exposée par `@jellyfin/sdk` ([[JELLYFIN_INTEGRATION.md]] §1), pas une réinvention.

---

## 1. Convention commune

- Nommage : `Jellyfin<Entité>Dto` (`JellyfinAlbumDto`, `JellyfinTrackDto`...), `PascalCase`, cohérent avec [[CODING_STANDARDS.md]] §2.
- Localisation : `packages/core/src/data/sources/jellyfin/dto/`, un fichier par DTO.
- Un DTO ne contient **aucune méthode**, uniquement des champs — toute logique (formatage, calcul) vit dans le Mapper ([[MAPPER_GUIDE.md]]), jamais dans le DTO lui-même.
- Un champ optionnel côté Jellyfin reste optionnel (`?`) dans le DTO — c'est au Mapper de décider d'une valeur par défaut, jamais au DTO de la préjuger.

## 2. DTO par domaine

| DTO | Champs représentatifs (non exhaustif, suit le SDK) | Consommé par |
|---|---|---|
| `JellyfinAlbumDto` | `Id`, `Name`, `AlbumArtist`, `ProductionYear`, `Genres[]`, `ImageTags` | `mapAlbumDto` → `Album` |
| `JellyfinArtistDto` | `Id`, `Name`, `Overview`, `ImageTags` | `mapArtistDto` → `Artist` |
| `JellyfinTrackDto` | `Id`, `Name`, `RunTimeTicks`, `IndexNumber`, `AlbumId`, `ArtistItems[]`, `MediaSources[]` | `mapTrackDto` → `Track` (exemple complet déjà déroulé dans [[DATA_FLOW.md]] §3) |
| `JellyfinGenreDto` | `Id`, `Name` | `mapGenreDto` → `Genre` |
| `JellyfinCollectionDto` | `Id`, `Name`, `CollectionType`, `ChildCount` | `mapCollectionDto` → `Collection` |
| `JellyfinPlaylistDto` | `Id`, `Name`, `ChildCount`, `Overview` | `mapPlaylistDto` → `Playlist` (source Jellyfin uniquement — une playlist locale n'a pas de DTO, voir [[PLAYLIST_ENGINE.md]] §1) |
| `JellyfinUserDto` | `Id`, `Name`, `ServerId`, `Policy` | `mapUserDto` → session utilisateur ([[JELLYFIN_INTEGRATION.md]] §2), jamais persisté au-delà de la session active |
| `JellyfinImageDto` | `ImageType`, `ImageIndex`, `Tag` — pas un DTO de contenu binaire, uniquement le descripteur utilisé pour construire l'URL de requête d'image | `mapArtworkDescriptor` → [[ARTWORK_SYSTEM.md]] |
| `JellyfinSessionDto` | `AccessToken`, `ServerId`, `User` | Consommé uniquement par le flux d'authentification ([[JELLYFIN_INTEGRATION.md]] §2, [[SECURITY_GUIDE.md]] §3bis) — jamais persisté tel quel, seul le jeton en est extrait |
| `JellyfinLyricsDto` *(préparé, non consommé)* | `Lyrics[]` (texte + horodatage optionnel) | Réservé pour [[LYRICS_SYSTEM.md]] — aucun mapper actif tant que la source de paroles synchronisées n'est pas tranchée (statut ouvert, voir `CLAUDE.md` journal Phase 1 volume 2) |
| `JellyfinStatisticsDto` *(non applicable)* | — | Aucune statistique ne provient de Jellyfin — l'historique d'écoute est strictement local ([[STATISTICS_SPECIFICATION.md]] §2, [[PRODUCT_RULES.md]] §10) ; ce DTO n'existe pas et ne doit jamais être créé, listé ici uniquement pour clore explicitement la question plutôt que la laisser implicite |

## 3. Ce qu'un DTO n'est jamais

- Jamais retourné par un Repository ([[REPOSITORY_PATTERN.md]]) — un Repository ne retourne que des entités de domaine ou des ViewModels, jamais un DTO.
- Jamais persisté tel quel dans `LocalStore` ([[DATABASE_SCHEMA.md]]) — la persistance suit toujours le schéma logique de l'entité de domaine, pas la forme Jellyfin.
- Jamais versionné indépendamment — un DTO suit la version de l'API Jellyfin ciblée ([[JELLYFIN_INTEGRATION.md]] §7), pas un cycle de version propre à Melodia.

---

## 4. Ce que ce document ne fait pas

- Ne redéfinit pas les entités de domaine cibles (voir [[DOMAIN_MODELS.md]]).
- Ne redéfinit pas les règles de transformation (voir [[MAPPER_GUIDE.md]]).
- Ne redéfinit pas le choix du SDK officiel (voir [[JELLYFIN_INTEGRATION.md]] §1).

## 5. Checklist de validation

- [ ] Tout nouveau champ consommé depuis l'API Jellyfin est d'abord ajouté au DTO concerné, jamais consommé directement depuis la réponse brute du SDK dans un Mapper.
- [ ] Aucun DTO n'est importé en dehors de `packages/core/src/data/sources/jellyfin/` ([[DATA_FLOW.md]] §2, vérifiable par le linter d'architecture).
- [ ] `JellyfinStatisticsDto` reste absent tant que la donnée statistique demeure strictement locale (§2).

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Phase 13) | Senior Data Architect |

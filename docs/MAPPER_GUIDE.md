# MAPPER_GUIDE.md — Règles de transformation entre couches (Phase 13)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Senior TypeScript Engineer
> **Documents liés** : [[DATA_FLOW.md]] §2-3, [[DTO_SPECIFICATION.md]], [[DOMAIN_MODELS.md]]

[[DATA_FLOW.md]] a déjà nommé et enchaîné le pipeline complet, avec un exemple unique (Track). Ce document généralise la règle à **quatre directions de mapping distinctes** (pas seulement DTO→Domain) et pose les règles qui s'appliquent à chacune, sans redécrire le pipeline lui-même.

---

## 1. Les quatre directions

| Direction | Fonction type | Où elle vit | Fréquence d'usage |
|---|---|---|---|
| DTO → Domain | `mapTrackDto(dto: JellyfinTrackDto): Track` | `packages/core/src/data/sources/jellyfin/mappers/` | À chaque récupération depuis `JellyfinSource` ([[DATA_FLOW.md]] §3) |
| Domain → DTO | `mapTrackToDto(track: Track): Partial<JellyfinTrackDto>` | Idem, réservé aux écritures vers Jellyfin (ex. mise à jour d'une playlist collaborative) | Rare — la majorité des entités locales (Playlist classique, Favorite, History) n'ont jamais de forme DTO sortante, voir §4 |
| IndexedDB/SQLite → Domain | `mapRowToTrack(row: TrackRow): Track` | `packages/core/src/data/stores/*/mappers/` | À chaque lecture depuis `LocalStore` ([[DATABASE_SCHEMA.md]]) |
| Domain → ViewModel | `useTrackRowViewModel(track, playerState)` (hook, pas une fonction pure isolée — voir [[DATA_FLOW.md]] §2, ViewModel) | Au plus près du composant consommateur | À chaque rendu qui nécessite une forme d'affichage |

## 2. Règles communes aux quatre directions

- **Fonction pure, testée isolément** : un mapper ne fait jamais d'appel réseau, ne lit jamais `LocalStore`, ne dépend d'aucun état global — uniquement une transformation d'entrée vers sortie ([[CODING_STANDARDS.md]] §4.4-4.5).
- **Aucune logique métier** : un mapper convertit une forme, il ne décide jamais d'une règle produit (ex. un mapper ne décide jamais si une écoute franchit le seuil de comptage de [[STATISTICS_SPECIFICATION.md]] §2 — cette décision vit dans un Service, jamais dans le mapper).
- **Aucune exception** : un champ manquant ou incohérent reçoit une valeur par défaut explicite et documentée en commentaire uniquement si la valeur par défaut n'est pas déjà évidente au nom du champ ([[ENGINEERING_GUIDE.md]] §1.5) — jamais un `null`/`undefined` propagé silencieusement au Domain.
- **Un mapper par paire de types** : jamais un mapper générique paramétré qui gère plusieurs entités par réflexion — la prévisibilité prime sur la réduction de duplication ici (trois lignes similaires par entité valent mieux qu'une abstraction générique fragile, cohérent avec le principe déjà acté dans `CLAUDE.md`, accord de collaboration).

## 3. IndexedDB/SQLite → Domain — règle spécifique

Contrairement au mapping DTO→Domain (qui normalise une source externe imprévisible), le mapping stockage→Domain part d'une donnée déjà écrite par Melodia lui-même selon [[DATABASE_SCHEMA.md]] — la donnée est donc supposée déjà valide à l'écriture (validée une fois en amont, voir [[SECURITY_GUIDE.md]] pour la validation par schéma au chargement). Ce mapper reste néanmoins défensif (voir [[ERROR_HANDLING.md]] §1, `StorageError`) pour couvrir une corruption physique, jamais pour couvrir une donnée mal formée à l'écriture (qui serait un bug à corriger à la source, pas à masquer au mapping).

## 4. Domain → DTO — cas d'usage restreint

Cette direction n'existe que pour les trois cas suivants, jamais utilisée par défaut :
1. Mise à jour d'une playlist Jellyfin existante (nom, ordre des morceaux).
2. Synchronisation d'un favori Jellyfin natif si l'utilisateur active l'option de double favori ([[COLLECTION_COMPONENTS.md]] §3).
3. Écriture de statut de lecture (progression) si l'utilisateur active la synchronisation de progression avec Jellyfin (fonctionnalité native de l'API Jellyfin).

Toute nouvelle entité locale n'a **jamais** de mapper Domain→DTO par défaut — n'en créer un que lorsqu'un besoin réel d'écriture vers Jellyfin est engagé, cohérent avec YAGNI ([[ARCHITECTURE_PRINCIPLES.md]] §8bis).

## 5. Domain → ViewModel — différence de nature

Contrairement aux trois autres directions (fonctions pures indépendantes du rendu), le mapping Domain→ViewModel est généralement un hook ([[DATA_FLOW.md]] §2) car il combine souvent plusieurs sources (l'entité elle-même + un état dérivé du store, ex. `isPlaying`). Un ViewModel n'est jamais stocké — recalculé à la demande, coût négligeable ([[DATA_FLOW.md]] §2, checklist).

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas le pipeline complet (voir [[DATA_FLOW.md]]).
- Ne redéfinit pas la forme des DTO ou des entités (voir [[DTO_SPECIFICATION.md]], [[DOMAIN_MODELS.md]]).

## 7. Checklist de validation

- [ ] Tout nouveau mapper est une fonction pure testée isolément (§2), sauf les hooks Domain→ViewModel (§5, exception explicite).
- [ ] Aucun mapper Domain→DTO n'est créé sans un besoin d'écriture vers Jellyfin réellement engagé (§4).
- [ ] Aucune logique métier (seuils, règles de scoring) ne vit dans un mapper (§2).

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Phase 13) | Senior TypeScript Engineer |

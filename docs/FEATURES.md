# FEATURES.md — Registre des Features (Implementation Plan)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-05
> **Propriétaire** : Senior Product Manager
> **Documents liés** : [[EPICS.md]], [[TASK_BREAKDOWN.md]], [[MODULES.md]]

Chaque Feature appartient à exactement un Epic ([[EPICS.md]]) et se décompose en Stories ([[TASK_BREAKDOWN.md]]). Les Features listées ci-dessous couvrent l'intégralité des systèmes documentés (vérifié en auto-revue, [[ARCHITECTURE_REVIEW.md]] appliqué à ce backlog) — aucun système de `docs/` sans Feature de rattachement.

---

## 1. Convention d'identifiant

Format `FEATURE-0NN`, séquentiel, stable, jamais réutilisé. Chaque Feature référence son Epic parent et son document technique propriétaire — jamais une Feature qui invente un comportement non déjà documenté ailleurs.

## 2. Registre complet

### EPIC-001 — Architecture validée

| ID | Feature | Document propriétaire |
|---|---|---|
| FEATURE-001 | Relecture finale de cohérence documentaire | [[ARCHITECTURE_REVIEW.md]] |
| FEATURE-002 | Checklist pré-implémentation validée | [[DOCUMENTATION_CHECKLIST.md]] |

### EPIC-002 — Workspace

| ID | Feature | Document propriétaire |
|---|---|---|
| FEATURE-003 | Initialisation monorepo pnpm/Turborepo | [[STACK_DECISIONS.md]] §3 |
| FEATURE-004 | Squelette des 4 packages (`core`/`ui`/`platform`/`app`) | [[ARCHITECTURE.md]] §1-2 |
| FEATURE-005 | Configuration partagée (`packages/config`) | [[ARCHITECTURE.md]] §2, [[CONFIGURATION_GUIDE.md]] |
| FEATURE-006 | CI de base (lint, typecheck) | [[CI_CD_GUIDE.md]] §1 |

### EPIC-003 — Fondations

| ID | Feature | Document propriétaire |
|---|---|---|
| FEATURE-007 | Design Tokens implémentés | [[DESIGN_TOKENS.md]] |
| FEATURE-008 | Composants Foundation (Button/Card/TextField/Dialog/Toast/Tabs) | [[COMPONENT_LIBRARY.md]] §2 |
| FEATURE-009 | Linter d'architecture (frontières de couches/modules) | [[ARCHITECTURE_PRINCIPLES.md]] §7, [[ARCHITECTURE.md]] §3bis |
| FEATURE-010 | Stores de base (`uiStore`, `settingsStore`) | [[STORE_SPECIFICATIONS.md]] |
| FEATURE-011 | Routing de base (TanStack Router) | [[FRONTEND_ARCHITECTURE.md]] §2 |
| FEATURE-012 | `AppProviders` et composition racine | [[FRONTEND_ARCHITECTURE.md]] §6 |
| FEATURE-083 | Bootstrap de l'application (Web + Desktop) — ADR-0002, gap de planification corrigé | [[ARCHITECTURE.md]] §1, [[CONFIGURATION_GUIDE.md]] |

### EPIC-004 — Connexion Jellyfin

| ID | Feature | Document propriétaire |
|---|---|---|
| FEATURE-013 | Intégration SDK `@jellyfin/sdk` | [[JELLYFIN_INTEGRATION.md]] §1 |
| FEATURE-014 | Flux d'authentification + stockage du jeton | [[JELLYFIN_INTEGRATION.md]] §2, [[SECURITY_GUIDE.md]] §3bis |
| FEATURE-015 | DTO + Mappers Track/Album/Artist | [[DTO_SPECIFICATION.md]], [[MAPPER_GUIDE.md]] |
| FEATURE-016 | Écran Connexion serveur (Onboarding) | [[ONBOARDING_SCREENS.md]] |
| FEATURE-017 | Gestion des erreurs de connexion | [[JELLYFIN_INTEGRATION.md]] §4 |

### EPIC-005 — Synchronisation

| ID | Feature | Document propriétaire |
|---|---|---|
| FEATURE-018 | Schéma de base locale (Dexie) | [[DATABASE_SCHEMA.md]], [[INDEXEDDB_ARCHITECTURE.md]] |
| FEATURE-019 | Repository Layer (Album/Artist/Track/Playlist/Collection/Artwork) | [[REPOSITORY_PATTERN.md]] §2 |
| FEATURE-020 | Sync Engine — import initial | [[SYNC_ENGINE_SPECIFICATION.md]] §1 |
| FEATURE-021 | Sync Engine — incrémental, Delta/Batch | [[SYNC_ENGINE_SPECIFICATION.md]] §2, §7bis |
| FEATURE-022 | Journal de changements locaux | [[SYNC_ENGINE_SPECIFICATION.md]] §4bis |
| FEATURE-023 | TanStack Query — configuration Server State | [[TANSTACK_QUERY_GUIDE.md]] |

### EPIC-006 — Bibliothèque

| ID | Feature | Document propriétaire |
|---|---|---|
| FEATURE-024 | Écrans Bibliothèque (Albums/Artists/Tracks/Genres) | [[LIBRARY_SCREENS.md]] |
| FEATURE-025 | Composants de carte (Album/Artist/Playlist/Track Row) | [[LIBRARY_COMPONENTS.md]], [[MUSIC_COMPONENT_LIBRARY.md]] |
| FEATURE-026 | Virtualisation de liste | [[PERFORMANCE_BUDGET.md]] §3 |
| FEATURE-027 | Filtres et tri de bibliothèque | [[FILTER_ENGINE.md]], [[SORT_ENGINE.md]] |
| FEATURE-028 | Favoris | [[COLLECTION_COMPONENTS.md]] §3, [[REPOSITORY_PATTERN.md]] (`FavoriteRepository`) |
| FEATURE-029 | Playlists classiques (CRUD) | [[PLAYLIST_SPECIFICATION.md]], [[PLAYLIST_ENGINE.md]] |
| FEATURE-030 | Écran Album / Écran Artiste | [[ALBUM_SCREEN.md]], [[ARTIST_SCREEN.md]] |

### EPIC-007 — Lecteur Audio

| ID | Feature | Document propriétaire |
|---|---|---|
| FEATURE-031 | Playback Engine (cycle de vie) | [[PLAYBACK_ENGINE.md]] |
| FEATURE-032 | Machine à états de lecture | [[PLAYBACK_STATE_MACHINE.md]] |
| FEATURE-033 | Media Adapter (double buffer, gapless) | [[AUDIO_ENGINE.md]] §3 |
| FEATURE-034 | Command API | [[COMMAND_API.md]] |
| FEATURE-035 | Playback Controller (résolution de source) | [[PLAYBACK_CONTROLLER.md]] |
| FEATURE-036 | Queue Engine | [[AUDIO_ENGINE.md]] §1, [[QUEUE_SPECIFICATION.md]] |
| FEATURE-037 | MediaSession API | [[AUDIO_ENGINE.md]] §8 |
| FEATURE-038 | Mini Player + Fullscreen Player UI | [[PLAYER_COMPONENTS.md]], [[PLAYER_SCREENS.md]] |
| FEATURE-039 | Device Picker (sortie audio) | [[PLAYBACK_DEVICES.md]] |
| FEATURE-040 | Enrichissements (Crossfade/ReplayGain/EQ/Visualiseur) | [[AUDIO_ENGINE.md]] §4-7 |

### EPIC-008 — Recherche

| ID | Feature | Document propriétaire |
|---|---|---|
| FEATURE-041 | Index Engine (construction/mise à jour) | [[INDEX_ENGINE.md]] |
| FEATURE-042 | Sept index par entité | [[SEARCH_INDEX_SPECIFICATION.md]] |
| FEATURE-043 | Search Engine (tolérance aux fautes, multi-mots) | [[DATA_LAYER.md]] §3.4-3.5 |
| FEATURE-044 | Ranking Engine | [[RANKING_ENGINE.md]] |
| FEATURE-045 | Suggestion Engine | [[SUGGESTION_ENGINE.md]] |
| FEATURE-046 | UI Recherche (SearchField, Search Results) | [[SEARCH_COMPONENTS.md]], [[SEARCH_SCREENS.md]] |
| FEATURE-047 | Command Palette | [[COMMAND_PALETTE.md]] |

### EPIC-009 — Téléchargements

| ID | Feature | Document propriétaire |
|---|---|---|
| FEATURE-048 | Download Engine (file, priorités, pause/reprise) | [[DOWNLOAD_SYSTEM.md]] §1-5 |
| FEATURE-049 | Validation/checksum post-téléchargement | [[DOWNLOAD_SYSTEM.md]] §5quater |
| FEATURE-050 | `TrackRepository.getPlaybackSource` (priorité locale/cache/streaming) | [[AUDIO_ENGINE.md]] §0bis.2 |
| FEATURE-051 | Storage Manager (quota, nettoyage) | [[STORAGE_MANAGER.md]] |
| FEATURE-052 | Conditions Wi-Fi/batterie/nocturne | [[DOWNLOAD_SYSTEM.md]] §5quinquies |
| FEATURE-053 | Écran Téléchargements | [[DOWNLOAD_SCREENS.md]] |

### EPIC-010 — Offline

| ID | Feature | Document propriétaire |
|---|---|---|
| FEATURE-054 | Détection réseau (types de connexion) | [[OFFLINE_SYSTEM.md]] §1, §1ter |
| FEATURE-055 | Mode avion (bascule manuelle) | [[OFFLINE_SYSTEM.md]] §1bis |
| FEATURE-056 | Bibliothèque locale en mode hors ligne | [[OFFLINE_SYSTEM.md]] §2 |
| FEATURE-057 | Conflict Resolution (favoris/playlists) | [[CONFLICT_RESOLUTION.md]] |
| FEATURE-058 | Resilience/Recovery (8 scénarios) | [[RESILIENCE_GUIDE.md]] |
| FEATURE-059 | Background Tasks (registre + ordonnancement) | [[BACKGROUND_TASKS.md]] |

### EPIC-011 — Statistiques

| ID | Feature | Document propriétaire |
|---|---|---|
| FEATURE-060 | Enregistrement de l'historique d'écoute | [[STATISTICS_SPECIFICATION.md]] §2, [[AUDIO_ENGINE.md]] §9 |
| FEATURE-061 | Statistics Engine (Worker, agrégats) | [[STATISTICS_ENGINE.md]] |
| FEATURE-062 | Écran Statistiques (tableau de bord) | [[STATISTICS_SCREENS.md]] |
| FEATURE-063 | Recommendation Engine + Daily Mix | [[RECOMMENDATION_ENGINE.md]] |
| FEATURE-064 | Wrapped | [[WRAPPED_SPECIFICATION.md]] |

### EPIC-012 — Optimisations

| ID | Feature | Document propriétaire |
|---|---|---|
| FEATURE-065 | Fixture synthétique 200 000 titres + mesure | [[PERFORMANCE_GUIDE.md]] §4 |
| FEATURE-066 | Discipline de mémoïsation/re-render | [[PERFORMANCE_GUIDE.md]] §5, §5quater |
| FEATURE-067 | Audit d'accessibilité complet | [[ACCESSIBILITY_GUIDE.md]] |
| FEATURE-068 | Optimisation batterie/CPU globale | [[PERFORMANCE_GUIDE.md]] §5septies |

### EPIC-013 — Bêta

| ID | Feature | Document propriétaire |
|---|---|---|
| FEATURE-069 | Écran Paramètres (10 catégories) | [[SETTINGS_SCREENS.md]], [[SETTINGS_SYSTEM.md]] |
| FEATURE-070 | Onboarding complet | [[ONBOARDING_SCREENS.md]], [[ONBOARDING_COPY.md]] |
| FEATURE-071 | États d'erreur/vides restants | [[ERROR_SCREENS.md]], [[EMPTY_STATES.md]] |
| FEATURE-072 | Diagnostics + Logging | [[DIAGNOSTICS_SYSTEM.md]], [[LOGGING_SYSTEM.md]] |
| FEATURE-073 | Feature Flags / Labs Panel | [[FEATURE_FLAGS.md]] |
| FEATURE-074 | Maintenance (reconstruire/réparer/réindexer) | [[MAINTENANCE_SYSTEM.md]] |

### EPIC-014 — Release Candidate

| ID | Feature | Document propriétaire |
|---|---|---|
| FEATURE-075 | Correction des bugs P0/P1 remontés en bêta | [[GITHUB_LABELS.md]] |
| FEATURE-076 | Gel de fonctionnalités | [[RELEASE_PLAN.md]] |
| FEATURE-077 | Audit de sécurité final | [[SECURITY_GUIDE.md]] §5 |
| FEATURE-078 | Tests E2E Desktop complets | [[TESTING_STRATEGY.md]] §5 |

### EPIC-015 — Version 1.0

| ID | Feature | Document propriétaire |
|---|---|---|
| FEATURE-079 | Pipeline de release (build multi-cible, signature) | [[CI_CD_GUIDE.md]] §3 |
| FEATURE-080 | Publication Web (PWA) | [[TECH_STACK.md]] §1 |
| FEATURE-081 | Publication Desktop (Win/Mac/Linux) | [[TECH_STACK.md]] §1 |
| FEATURE-082 | `CHANGELOG.md` et notes de version | [[GIT_WORKFLOW.md]] §5 |

---

## 3. Ce que ce document ne fait pas

- Ne détaille pas les Stories/Tasks de chaque Feature (voir [[TASK_BREAKDOWN.md]]).
- Ne redéfinit aucun comportement — chaque Feature renvoie à son document propriétaire, jamais une redescription.

## 4. Checklist de validation

- [ ] Chaque système de `docs/` a au moins une Feature de rattachement (vérifié en auto-revue, [[IMPLEMENTATION_ROADMAP.md]] §5).
- [ ] Aucune Feature n'invente un comportement non déjà documenté.
- [ ] Chaque Feature appartient à exactement un Epic.

## 5. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-05 | Création initiale du document (Implementation Plan) — 82 Features réparties sur 15 Epics | Senior Product Manager |
| 1.1.0 | 2026-08-05 | ADR-0002 : ajout de FEATURE-083 (Bootstrap de l'application, EPIC-003) — gap de planification confirmé (aucune Task ne créait le point d'entrée réel de l'application) | Staff Software Engineer |

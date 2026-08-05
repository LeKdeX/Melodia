# EPICS.md — Registre des Epics (Implementation Plan)

> **Statut** : document fondateur, vivant
> **Version** : 1.1.0
> **Date de création** : 2026-08-05
> **Propriétaire** : Principal Software Architect
> **Documents liés** : [[MILESTONES.md]], [[FEATURES.md]], [[DEPENDENCY_GRAPH.md]]

**Décision de granularité assumée** : un Epic par jalon ([[MILESTONES.md]]), jamais un découpage indépendant qui obligerait à maintenir deux hiérarchies parallèles. Chaque Epic est composé de Features ([[FEATURES.md]]), chaque Feature de Stories, chaque Story de Tasks, chaque Task de Subtasks ([[TASK_BREAKDOWN.md]]).

---

## 1. Convention d'identifiant

Format `EPIC-0NN`, stable, jamais réutilisé même si un Epic est abandonné (cohérent avec la stabilité d'identifiant déjà exigée par le cadrage). Numérotation séquentielle dans l'ordre des jalons — ne préjuge pas d'un ordre d'exécution strict au-delà des dépendances réelles ([[DEPENDENCY_GRAPH.md]]).

## 2. Registre complet

| ID | Nom | Jalon | Portée | Documents de référence |
|---|---|---|---|---|
| EPIC-001 | Architecture validée | M0 | Aucun développement — vérification finale de cohérence documentaire avant premier commit de code | [[ARCHITECTURE_REVIEW.md]], [[DOCUMENTATION_CHECKLIST.md]] |
| EPIC-002 | Workspace | M1 | Monorepo pnpm/Turborepo, CI de base, squelette de packages | [[ARCHITECTURE.md]], [[STACK_DECISIONS.md]] §3, [[CI_CD_GUIDE.md]] |
| EPIC-003 | Fondations | M2 | Frontières de packages effectives, Design System v1 (composants Foundation), state management de base, bootstrap applicatif Web + Desktop (FEATURE-083, ADR-0002) | [[COMPONENT_LIBRARY.md]], [[FOUNDATIONS.md]], [[STORE_SPECIFICATIONS.md]], [[ARCHITECTURE.md]] §1 |
| EPIC-004 | Connexion Jellyfin | M3 | `JellyfinSource`, authentification, DTO/Mapper des entités de base | [[JELLYFIN_INTEGRATION.md]], [[DTO_SPECIFICATION.md]], [[MAPPER_GUIDE.md]] |
| EPIC-005 | Synchronisation | M4 | Sync Engine, Repository Layer, schéma de base locale | [[SYNC_ENGINE_SPECIFICATION.md]], [[REPOSITORY_PATTERN.md]], [[DATABASE_SCHEMA.md]], [[INDEXEDDB_ARCHITECTURE.md]] |
| EPIC-006 | Bibliothèque | M5 | Écrans et composants de bibliothèque (Albums/Artists/Tracks/Playlists/Genres/Collections) | [[LIBRARY_SCREENS.md]], [[LIBRARY_COMPONENTS.md]], [[MUSIC_COMPONENT_LIBRARY.md]] |
| EPIC-007 | Lecteur Audio | M6 | Moteur audio complet, Queue, Command API, MediaSession | [[AUDIO_ENGINE.md]], [[PLAYBACK_ENGINE.md]], [[PLAYBACK_CONTROLLER.md]], [[COMMAND_API.md]] |
| EPIC-008 | Recherche | M7 | Index Engine, Search Engine, Ranking/Suggestion/Filter/Sort Engines | [[SEARCH_ENGINE.md]], [[INDEX_ENGINE.md]], [[RANKING_ENGINE.md]] |
| EPIC-009 | Téléchargements | M8 | File de téléchargement, Storage Manager, priorité locale/cache/streaming | [[DOWNLOAD_SYSTEM.md]], [[STORAGE_MANAGER.md]] |
| EPIC-010 | Offline | M9 | Détection réseau, Conflict Resolution, Resilience/Recovery | [[OFFLINE_SYSTEM.md]], [[CONFLICT_RESOLUTION.md]], [[RESILIENCE_GUIDE.md]] |
| EPIC-011 | Statistiques | M10 | Statistics Engine, Recommendation Engine, Wrapped | [[STATISTICS_ENGINE.md]], [[RECOMMENDATION_ENGINE.md]], [[WRAPPED_SPECIFICATION.md]] |
| EPIC-012 | Optimisations | M11 | Tenue des budgets de performance sur fixture 200 000 titres, audit d'accessibilité | [[PERFORMANCE_BUDGET.md]], [[PERFORMANCE_GUIDE.md]], [[ACCESSIBILITY_GUIDE.md]] |
| EPIC-013 | Bêta | M12 | Écrans restants (Settings, Onboarding, Error), durcissement, diagnostics | [[SETTINGS_SCREENS.md]], [[ONBOARDING_SCREENS.md]], [[DIAGNOSTICS_SYSTEM.md]] |
| EPIC-014 | Release Candidate | M13 | Correction des retours bêta, gel de fonctionnalités | [[QUALITY_GATES.md]], [[RELEASE_PLAN.md]] |
| EPIC-015 | Version 1.0 | M14 | Publication Web + Desktop | [[ROADMAP.md]] Phase 1, [[GIT_WORKFLOW.md]] §4 |

## 3. Dépendances au niveau Epic (résumé)

Voir [[DEPENDENCY_GRAPH.md]] pour le détail complet et le diagramme — résumé : EPIC-001 → 002 → 003 → 004 → 005 → {006, 007, 008 en parallèle} → 009 (dépend de 007) → 010 (dépend de 009) → 011 (dépend de 010) → 012 → 013 → 014 → 015. Chaque Epic dépend strictement de son prédécesseur direct dans cette chaîne, sauf les trois marqués parallélisables.

---

## 4. Ce que ce document ne fait pas

- Ne détaille pas les Features de chaque Epic (voir [[FEATURES.md]]).
- Ne redéfinit pas les critères de sortie de jalon (voir [[MILESTONES.md]]).
- Ne calcule pas le chemin critique (voir [[DEPENDENCY_GRAPH.md]]).

## 5. Checklist de validation

- [ ] Chaque Epic correspond exactement à un jalon de [[MILESTONES.md]], sans écart.
- [ ] Tout nouvel Epic reçoit un ID stable avant toute Feature qui lui est rattachée.
- [ ] Aucun Epic n'est orphelin de documents de référence.

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-05 | Création initiale du document (Implementation Plan) | Principal Software Architect |
| 1.1.0 | 2026-08-05 | ADR-0002 : portée d'EPIC-003 complétée (bootstrap applicatif Web/Desktop, FEATURE-083) — gap de planification corrigé | Staff Technical Lead |

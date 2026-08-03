# GIT_WORKFLOW.md — Conventions Git

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Engineering Manager
> **Documents liés** : [[DEVELOPMENT_GUIDELINES.md]], [[DEFINITION_OF_DONE.md]], [[CODING_STANDARDS.md]]

---

## 1. Convention des branches

Format : `<type>/<courte-description-en-kebab-case>`

| Type | Usage |
|---|---|
| `feature/` | Nouvelle fonctionnalité |
| `fix/` | Correction de bug |
| `chore/` | Tâche d'ingénierie sans impact fonctionnel (dépendances, config) |
| `docs/` | Documentation uniquement |
| `refactor/` | Refactorisation sans changement de comportement observable |
| `perf/` | Optimisation de performance mesurée |
| `release/` | Branche de préparation de release |

Exemples : `feature/gapless-playback`, `fix/queue-reorder-crash`, `docs/update-architecture-principles`.

- `main` est toujours déployable. Aucun commit direct sur `main` : uniquement via Pull Request mergée.
- Pas de branche de développement long-lived parallèle à `main` (pas de `develop`) : le trunk-based development est retenu pour sa simplicité et sa cohérence avec des releases fréquentes (voir [[ENGINEERING_GUIDE.md]] §1.1).

---

## 2. Convention des commits — Conventional Commits

Format : `<type>(<scope>): <description au présent, impératif>`

| Type | Usage |
|---|---|
| `feat` | Nouvelle fonctionnalité utilisateur |
| `fix` | Correction de bug |
| `refactor` | Changement de code sans changement de comportement |
| `perf` | Amélioration de performance |
| `test` | Ajout ou modification de tests |
| `docs` | Documentation |
| `chore` | Maintenance (dépendances, configuration, outillage) |
| `ci` | Modification des pipelines CI/CD |

Le `scope` correspond à la feature ou au module concerné (`feat(player): add crossfade support`).

Un `BREAKING CHANGE:` en pied de message déclenche une version majeure lors de la release (voir §4).

**Pourquoi Conventional Commits** : format lisible par des outils (génération automatique de changelog, détermination automatique du type de version SemVer), et lisible par des humains sans formation préalable — cohérent avec l'objectif Communauté ([[PROJECT_CHARTER.md]] §3.10).

---

## 3. Convention des Pull Requests

- Titre en Conventional Commit (repris tel quel comme message de merge squash — voir §3.1).
- Description obligatoire avec : contexte/motivation, changements apportés, comment tester, captures d'écran/vidéo pour tout changement visuel.
- Une PR répond à un seul objectif logique — pas de PR mélangeant une fonctionnalité et une refactorisation sans lien.
- Revue obligatoire d'au moins une personne non-auteure avant merge (voir [[ENGINEERING_GUIDE.md]] §1.10).
- La CI (lint, typecheck, tests, build) doit être verte avant merge — aucune exception, aucun `--no-verify`.
- Checklist de [[DEFINITION_OF_DONE.md]] cochée explicitement dans le template de PR avant de demander la revue.

### 3.1 Stratégie de merge
**Squash and merge** systématique vers `main`. Chaque PR devient un unique commit sur `main`, avec un historique linéaire et lisible.
**Pourquoi** : l'historique de travail intermédiaire au sein d'une branche (commits de correction, « wip », etc.) n'a pas de valeur à long terme sur `main` ; seul l'historique logique par fonctionnalité en a.

---

## 4. Convention des releases — SemVer

Melodia suit [Semantic Versioning](https://semver.org/) : `MAJOR.MINOR.PATCH`.
- `MAJOR` : rupture de compatibilité (API publique future, format de données stockées, `BREAKING CHANGE` dans les commits inclus).
- `MINOR` : nouvelle fonctionnalité rétrocompatible.
- `PATCH` : correction de bug rétrocompatible.

Le type de version est déterminé automatiquement à partir des types de commits inclus depuis la dernière release (outillage type `semantic-release` ou équivalent, configuré en CI).

Une release est taguée `vX.Y.Z` sur `main`, déclenchant le pipeline de build multi-cible et de publication (voir [[TECH_STACK.md]] §1, CI/CD).

---

## 5. Convention des changelogs

Le `CHANGELOG.md` est généré automatiquement à partir des messages de commits Conventional Commits à chaque release — jamais rédigé manuellement, pour garantir qu'il reste synchronisé avec l'historique réel (cohérent avec [[ENGINEERING_GUIDE.md]] §1.5, éviter la documentation qui se désynchronise).

Format retenu : [Keep a Changelog](https://keepachangelog.com/), sections `Added` / `Changed` / `Fixed` / `Removed` / `Security` par version.

---

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0) | Engineering Manager |

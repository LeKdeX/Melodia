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

**Exemple concret (ajout Engineering Handbook)** :
```
feat(player)!: remove deprecated crossfade legacy API

BREAKING CHANGE: `player.setCrossfadeLegacy()` is removed, use
`player.setCrossfade({ durationMs })` instead (COMMAND_API.md §2).
```
Le `!` après le scope est optionnel mais recommandé en complément du pied `BREAKING CHANGE:` — signal visuel immédiat dans le log Git court, sans remplacer le pied de message qui reste la seule source lue par l'outillage de génération de version.

**Pourquoi Conventional Commits** : format lisible par des outils (génération automatique de changelog, détermination automatique du type de version SemVer), et lisible par des humains sans formation préalable — cohérent avec l'objectif Communauté ([[PROJECT_CHARTER.md]] §3.10).

---

## 3. Convention des Pull Requests

- Titre en Conventional Commit (repris tel quel comme message de merge squash — voir §3.1).
- Description obligatoire avec : contexte/motivation, changements apportés, comment tester, captures d'écran/vidéo pour tout changement visuel.
- Une PR répond à un seul objectif logique — pas de PR mélangeant une fonctionnalité et une refactorisation sans lien.
- Revue obligatoire d'au moins une personne non-auteure avant merge (voir [[ENGINEERING_GUIDE.md]] §1.10).
- La CI (lint, typecheck, tests, build) doit être verte avant merge — aucune exception, aucun `--no-verify`.
- Checklist de [[DEFINITION_OF_DONE.md]] cochée explicitement dans le template de PR avant de demander la revue.

### 3.0bis Gabarit de Pull Request (ajout Engineering Handbook)

```markdown
## Contexte / motivation
<!-- Pourquoi ce changement — lien vers le ticket/ADR si applicable -->

## Changements apportés
<!-- Liste concise, pas une description ligne par ligne du diff -->

## Comment tester
<!-- Étapes reproductibles pour un relecteur qui n'a pas le contexte -->

## Captures d'écran / vidéo
<!-- Obligatoire pour tout changement visuel, sinon supprimer cette section -->

## Checklist
- [ ] [[DEFINITION_OF_DONE.md]] cochée pour les sections applicables au type de changement
- [ ] Tests ajoutés/mis à jour ([[TESTING_STRATEGY.md]] §10)
- [ ] Documentation mise à jour si un standard existant a changé
- [ ] Performance vérifiée si le changement touche le rendu de liste ou l'audio ([[PERFORMANCE_BUDGET.md]])
- [ ] Accessibilité vérifiée si une surface d'interface est touchée ([[ACCESSIBILITY_GUIDE.md]])
```

Ce gabarit est le fichier `.github/pull_request_template.md` du dépôt — jamais recopié manuellement par chaque auteur, pré-rempli automatiquement à l'ouverture de toute PR.

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

### 4bis. Canaux de release (ajout Engineering Handbook)

| Canal | Source | Audience | Stabilité attendue |
|---|---|---|---|
| Stable | Tag `vX.Y.Z` (§4) | Tous les utilisateurs, canal par défaut | Production, tous les gates de [[QUALITY_GATES.md]] §1-2 verts |
| Beta | Canal préparé, non activé — cohérent avec le statut déjà acté ([[FEATURE_FLAGS.md]] §4, canal bêta en préparation) | Opt-in explicite, non engagé à ce jour | N/A tant que le canal n'est pas activé |
| Canary | Non engagé — aucune infrastructure de build continue par commit n'est actée à ce stade | N/A | N/A |

**Pourquoi Beta/Canary restent non engagés plutôt qu'improvisés ici** : [[FEATURE_FLAGS.md]] §4 a déjà posé le canal bêta comme préparation architecturale, jamais implémentée — ce document ne la réactive pas silencieusement, il confirme le même statut pour rester cohérent (YAGNI, [[ARCHITECTURE_PRINCIPLES.md]] §8bis).

### 4ter. Rollback (ajout Engineering Handbook)

Le rollback applicatif (retour à une version antérieure après une release problématique) est déjà préparé au niveau du mécanisme de mise à jour ([[UPDATE_SYSTEM.md]] §5, statut « préparation ») — ce document confirme uniquement la procédure Git associée : un rollback republie un tag antérieur comme dernière version stable disponible, jamais un `git revert` du tag lui-même (l'historique de tags reste immuable, seule la version *recommandée* aux utilisateurs change).

---

## 5. Convention des changelogs

Le `CHANGELOG.md` est généré automatiquement à partir des messages de commits Conventional Commits à chaque release — jamais rédigé manuellement, pour garantir qu'il reste synchronisé avec l'historique réel (cohérent avec [[ENGINEERING_GUIDE.md]] §1.5, éviter la documentation qui se désynchronise).

Format retenu : [Keep a Changelog](https://keepachangelog.com/), sections `Added` / `Changed` / `Fixed` / `Removed` / `Security` par version.

---

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0) | Engineering Manager |
| 0.2.0 | 2026-08-04 | Engineering Handbook : ajout de l'exemple concret de BREAKING CHANGE (§2), du gabarit de PR littéral (§3.0bis), des canaux de release (§4bis) et du rollback (§4ter) — au lieu de créer COMMIT_CONVENTIONS.md/PULL_REQUEST_GUIDE.md/RELEASE_STRATEGY.md en doublon | Principal Engineering Manager |

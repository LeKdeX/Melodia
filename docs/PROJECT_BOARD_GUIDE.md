# PROJECT_BOARD_GUIDE.md — Structure GitHub Projects (Implementation Plan)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-05
> **Propriétaire** : Scrum Master
> **Documents liés** : [[GITHUB_LABELS.md]], [[EPICS.md]], [[MILESTONES.md]]

Traduit la hiérarchie Epic/Feature/Story/Task ([[EPICS.md]], [[FEATURES.md]], [[TASK_BREAKDOWN.md]]) en structure GitHub concrète — Issues, Milestones, Projects — sans redécider cette hiérarchie.

---

## 1. Correspondance hiérarchie ↔ GitHub

| Niveau du backlog | Représentation GitHub |
|---|---|
| Epic | Issue de suivi (« tracking issue »), une checklist de ses Features en corps d'Issue, jamais fermée avant que toutes ses Features le soient |
| Feature | Issue de suivi, une checklist de ses Stories en corps d'Issue |
| Story | Non représentée séparément — regroupée dans la description de la Feature parente, trop fine pour justifier une Issue propre |
| Task | **Une Issue GitHub par Task** — c'est le niveau qui devient une PR ([[TASK_BREAKDOWN.md]] §3, gabarit complet en corps d'Issue) |
| Subtask | Checklist Markdown dans le corps de l'Issue Task, jamais une Issue séparée |

**Pourquoi Story n'a pas d'Issue propre** : une Story regroupe plusieurs Tasks déjà suivies individuellement — une Issue Story dupliquerait le suivi sans ajouter d'information, contraire à la non-duplication déjà actée ([[ENGINEERING_GUIDE.md]] §1.3).

## 2. GitHub Milestones

Un GitHub Milestone par jalon ([[MILESTONES.md]] §1) — `M0` à `M14`, description reprenant le critère de sortie exact. Chaque Issue Task est assignée au Milestone de son Epic parent ([[EPICS.md]] §2). Un Milestone GitHub se ferme uniquement quand toutes ses Issues Epic/Feature/Task sont fermées, jamais manuellement en avance.

## 3. GitHub Projects — vues

| Vue | Filtre/groupement | Usage |
|---|---|---|
| Vue Kanban (par défaut) | Groupé par statut (`Todo`/`In Progress`/`In Review`/`Done`) | Suivi quotidien |
| Vue par Epic | Groupé par label d'Epic | Vue d'ensemble d'un Epic en cours |
| Vue chemin critique | Filtré sur les Tasks de [[DEPENDENCY_GRAPH.md]] §3 | Priorisation quand une ressource doit choisir entre plusieurs Tasks disponibles |
| Vue priorité | Groupé par label `P0`-`P3` ([[GITHUB_LABELS.md]] §2) | Triage de bugs |

## 4. Automatisations

- Une PR qui référence `Closes #<issue>` ferme automatiquement l'Issue Task correspondante au merge — jamais une fermeture manuelle qui pourrait diverger de l'état réel du code.
- Une Issue Task passe automatiquement en `In Review` à l'ouverture de sa PR associée (déjà lié par la référence `Closes #`), jamais un changement de statut manuel qui pourrait être oublié.
- Le label `blocked` ([[GITHUB_LABELS.md]] §3) est retiré automatiquement quand toutes les Issues qu'elle référence comme dépendance sont fermées (action GitHub dédiée).

## 5. Modèle d'Issue Task

Reprend exactement le gabarit déjà acté ([[TASK_BREAKDOWN.md]] §3) — le fichier `.github/ISSUE_TEMPLATE/task.md` du dépôt, jamais un second gabarit divergent.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas la hiérarchie Epic/Feature/Story/Task (voir [[EPICS.md]], [[FEATURES.md]], [[TASK_BREAKDOWN.md]]).
- Ne redéfinit pas les labels eux-mêmes (voir [[GITHUB_LABELS.md]]).

## 7. Checklist de validation

- [ ] Chaque Task du backlog a une Issue GitHub correspondante avant son entrée en développement.
- [ ] Aucun Milestone GitHub n'est fermé manuellement en avance de ses Issues.
- [ ] Le gabarit d'Issue Task reste identique à [[TASK_BREAKDOWN.md]] §3, jamais divergent.

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-05 | Création initiale du document (Implementation Plan) | Scrum Master |

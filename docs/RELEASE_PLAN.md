# RELEASE_PLAN.md — Planning de release (Implementation Plan)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-05
> **Propriétaire** : Principal DevOps Engineer
> **Documents liés** : [[GIT_WORKFLOW.md]] §4-4ter, [[MILESTONES.md]], [[QUALITY_GATES.md]]

[[GIT_WORKFLOW.md]] §4bis a déjà posé les canaux (Stable actif, Beta/Canary préparés non engagés) et §4ter le rollback. Ce document applique ces canaux au calendrier de jalons ([[MILESTONES.md]]) sans les redécider.

---

## 1. Étapes de release et critères de passage

| Étape | Jalon correspondant | Critère de passage |
|---|---|---|
| Alpha (interne) | Sortie de M8 (MVP fonctionnel, [[MVP_ROADMAP.md]] §1) | Tous les gates de [[QUALITY_GATES.md]] §1 verts ; utilisable en interne quotidiennement sans blocage |
| Beta | Sortie de M12 | Fonctionnalités MVP complètes (M0-M11) ; accessible à un groupe restreint d'utilisateurs externes ; 0 bug P0 ouvert ([[GITHUB_LABELS.md]]) |
| Release Candidate | Sortie de M13 | Retours bêta traités ; 0 bug P0/P1 ouvert ; gel de fonctionnalités (aucune nouvelle Feature, seulement des corrections) |
| Stable (v1.0) | Sortie de M14 | Fenêtre de stabilité RC observée sans régression critique remontée ; tous les gates [[QUALITY_GATES.md]] §1-2 verts ; artefacts Desktop testés manuellement ([[CHECKLISTS.md]] §2) |

## 2. Gel de fonctionnalités (Release Candidate)

À partir de M13 (EPIC-014), aucune nouvelle Feature n'entre dans le backlog actif de la release en cours — seules les corrections de bugs déjà remontés en Beta sont acceptées. Une Feature qui n'a pas atteint EPIC-013 (Bêta) à ce moment est reportée à la release suivante, jamais forcée en urgence dans le gel (cohérent avec [[ENGINEERING_GUIDE.md]] §1, discipline déjà actée).

## 3. Fenêtre de stabilité

Entre la sortie de M13 (RC) et M14 (Stable), une fenêtre d'observation sans date fixe mais avec un critère factuel : aucune régression critique remontée pendant une période d'usage réel continu. Cohérent avec la règle déjà actée qu'un jalon n'est jamais une date calendaire figée ([[MILESTONES.md]] §3).

## 4. Rollback

Cohérent avec [[GIT_WORKFLOW.md]] §4ter (déjà acté) — si une régression critique est détectée après publication de v1.0, la version stable recommandée revient à la dernière release antérieure connue comme saine, jamais un correctif d'urgence non testé publié directement en remplacement.

## 5. Canaux au-delà de v1.0

Beta/Canary restent non engagés (cohérent avec [[GIT_WORKFLOW.md]] §4bis, déjà acté) — ce plan de release ne les active pas silencieusement. Une réévaluation par ADR reste nécessaire avant toute activation, cohérent avec la discipline déjà actée pour toute décision structurante.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas les canaux de distribution (voir [[GIT_WORKFLOW.md]] §4bis).
- Ne redéfinit pas le mécanisme de rollback (voir [[GIT_WORKFLOW.md]] §4ter).
- Ne fixe aucune date calendaire (voir [[MILESTONES.md]] §3).

## 7. Checklist de validation

- [ ] Chaque étape de release (§1) a un critère de passage factuel, jamais une date.
- [ ] Le gel de fonctionnalités (§2) est respecté sans exception non documentée.
- [ ] Aucun canal Beta/Canary n'est activé sans ADR explicite.

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-05 | Création initiale du document (Implementation Plan) | Principal DevOps Engineer |

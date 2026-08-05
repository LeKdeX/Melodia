# ENGINEERING_BACKLOG.md — Backlog maître (Implementation Plan)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-05
> **Propriétaire** : Principal Engineering Manager
> **Documents liés** : [[EPICS.md]], [[FEATURES.md]], [[TASK_BREAKDOWN.md]], [[MILESTONES.md]]

Point d'entrée unique pour naviguer le backlog complet — recompose [[EPICS.md]] (15), [[FEATURES.md]] (83, depuis ADR-0002) et [[TASK_BREAKDOWN.md]] (49 Tasks décomposées pour M0-M3, depuis ADR-0002) en une vue de statut. Ne redéfinit aucun de ces documents, uniquement leur état d'avancement.

---

## 1. Vue de statut par jalon

| Jalon | Epic | Features | Tasks décomposées | Statut |
|---|---|---|---|---|
| M0 | EPIC-001 | 2 | 5 | **Sorti (GO, TASK-005)** — les 5 Tasks sont terminées, revue de sortie favorable |
| M1 | EPIC-002 | 4 | 13 | En cours — TASK-006 à 015 terminées (ADR-0001 Accepté), TASK-016 est la prochaine action |
| M2 | EPIC-003 | 7 (dont FEATURE-083, ADR-0002) | 20 (dont TASK-046 à 049) | Prêt (dépend de M1) — critère de sortie étendu au rendu réel Web + Desktop |
| M3 | EPIC-004 | 5 | 11 | Prêt (dépend de M2) |
| M4 | EPIC-005 | 6 | Rolling wave — décomposition au démarrage de M4 ([[TASK_BREAKDOWN.md]] §1) | Feature-level uniquement |
| M5 | EPIC-006 | 7 | Rolling wave | Feature-level uniquement |
| M6 | EPIC-007 | 10 | Rolling wave | Feature-level uniquement |
| M7 | EPIC-008 | 7 | Rolling wave | Feature-level uniquement |
| M8 | EPIC-009 | 6 | Rolling wave | Feature-level uniquement |
| M9 | EPIC-010 | 6 | Rolling wave | Feature-level uniquement |
| M10 | EPIC-011 | 5 | Rolling wave | Feature-level uniquement |
| M11 | EPIC-012 | 4 | Rolling wave | Feature-level uniquement |
| M12 | EPIC-013 | 6 | Rolling wave | Feature-level uniquement |
| M13 | EPIC-014 | 4 | Rolling wave | Feature-level uniquement |
| M14 | EPIC-015 | 4 | Rolling wave | Feature-level uniquement |

**Total** : 15 Epics, 83 Features (+1, ADR-0002), 49 Tasks déjà décomposées (M0-M3, +4, ADR-0002), 15 Tasks développées (TASK-001 à TASK-015) — voir `CLAUDE.md` (entrées correspondantes). **M0 officiellement sorti (GO).** M1 en cours ; FEATURE-004 (squelettes des 4 packages) et FEATURE-005 (configuration partagée) terminées. **Gap de planification confirmé et corrigé (ADR-0002)** : FEATURE-083 (Bootstrap de l'application, TASK-046 à 049) ajoutée à EPIC-003/M2 — aucune Task antérieure ne créait le point d'entrée réel de l'application.

## 2. Comment lire ce backlog selon le rôle

| Rôle | Point d'entrée |
|---|---|
| Nouveau contributeur cherchant une première Task | [[GITHUB_LABELS.md]] §3, filtre `good-first-issue`, Tasks XS/S de M0-M3 ([[TASK_BREAKDOWN.md]] §5-8) |
| Contributeur assigné à un Epic | [[EPICS.md]] §2 pour la portée, [[FEATURES.md]] §2 pour le détail |
| Scrum Master planifiant un jalon | [[MILESTONES.md]] §1 pour les critères, [[DEPENDENCY_GRAPH.md]] pour l'ordre |
| Ingénieur cherchant le gabarit exact d'une Task | [[TASK_BREAKDOWN.md]] §3 |

## 3. Prochaine action

**M0 est officiellement sorti (décision GO, TASK-005).** **TASK-006 à TASK-015 sont terminées.**

**ADR-0001 accepté par l'utilisateur** (`docs/adr/0001-tailwind-v4-theme-mechanism.md`) — Tailwind CSS v4, mécanisme natif `@theme` CSS, aucune couche de compatibilité v3. [[DESIGN_SYSTEM_ARCHITECTURE.md]] §1 mis à jour en conséquence dans le même lot. TASK-015 reprise et terminée : `packages/config/tailwind-theme.css` créé (bloc `@theme` volontairement vide — DESIGN_TOKENS.md/COLOR_SYSTEM.md restent v1 non finale, valeurs réservées à TASK-019/020), validé empiriquement par une compilation PostCSS réelle (probe utilitaire résolu correctement), outillage de validation retiré après usage. Détail complet dans `CLAUDE.md` (entrées TASK-006 à TASK-015).

La prochaine Task exploitable est **TASK-016** (Job GitHub Actions `lint`, EPIC-002/M1, FEATURE-006, [[TASK_BREAKDOWN.md]] §6) — dépend de TASK-014, désormais satisfaite. **Non commencée.**

---

## 4. Ce que ce document ne fait pas

- Ne redéfinit aucun Epic/Feature/Task — recompose uniquement leur statut.
- Ne remplace pas le Project Board GitHub réel une fois le développement commencé (voir [[PROJECT_BOARD_GUIDE.md]]) — ce document reste la vue de référence documentaire, le Project Board devient la vue de statut vivante dès le premier commit.

## 5. Checklist de validation

- [ ] Chaque Epic de [[EPICS.md]] apparaît dans la vue de statut (§1), aucun orphelin.
- [ ] Le compte de Features/Tasks reste synchronisé avec [[FEATURES.md]]/[[TASK_BREAKDOWN.md]] à chaque mise à jour.

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-05 | Création initiale du document (Implementation Plan) | Principal Engineering Manager |
| 1.1.0 | 2026-08-05 | TASK-001 marquée terminée (§1, §3) — premier code applicatif du projet | Principal Engineering Manager |
| 1.2.0 | 2026-08-05 | TASK-002 marquée terminée (§1, §3) — revue croisée des 10 documents à plus forte cascade, prochaine action → TASK-003 | Principal Engineering Manager |
| 1.3.0 | 2026-08-05 | TASK-003 marquée terminée (§1, §3) — rapport de consolidation produit, prochaine action → TASK-004 | Principal Engineering Manager |
| 1.4.0 | 2026-08-05 | TASK-004 marquée terminée (§1, §3) — 0 non-conformité DOCUMENTATION_CHECKLIST.md §1 trouvée sur le backlog, prochaine action → TASK-005 | Principal Engineering Manager |
| 1.5.0 | 2026-08-05 | TASK-005 marquée terminée (§1, §3) — **M0 officiellement sorti (GO)**, prochaine action → TASK-006 (M1) | Principal Engineering Manager |
| 1.6.0 | 2026-08-05 | TASK-006 marquée terminée (§1, §3) — `pnpm-workspace.yaml` créé, premier code produit du projet, prochaine action → TASK-007 | Principal Engineering Manager |
| 1.7.0 | 2026-08-05 | TASK-007 marquée terminée (§1, §3) — `turbo.json` configuré, `turbo` installé, prochaine action → TASK-008 | Principal Engineering Manager |
| 1.8.0 | 2026-08-05 | TASK-008 marquée terminée (§1, §3) — arborescence `apps/` créée, prochaine action → TASK-009 | Principal Engineering Manager |
| 1.9.0 | 2026-08-05 | TASK-009 marquée terminée (§1, §3) — squelette `@melodia/core` créé, prochaine action → TASK-010 | Principal Engineering Manager |
| 1.10.0 | 2026-08-05 | TASK-010 marquée terminée (§1, §3) — squelette `@melodia/ui` créé, prochaine action → TASK-011 | Principal Engineering Manager |
| 1.11.0 | 2026-08-05 | TASK-011 marquée terminée (§1, §3) — squelette `@melodia/platform` créé, prochaine action → TASK-012 | Principal Engineering Manager |
| 1.12.0 | 2026-08-05 | TASK-012 marquée terminée (§1, §3) — squelette `@melodia/app` créé (sans `data`/`platform`, incohérence de titre signalée), FEATURE-004 close, prochaine action → TASK-013 | Principal Engineering Manager |
| 1.13.0 | 2026-08-05 | TASK-013 marquée terminée (§1, §3) — `tsconfig.base.json` créé et adopté par les 4 packages, gap `noUncheckedIndexedAccess` corrigé, prochaine action → TASK-014 | Principal Engineering Manager |
| 1.14.0 | 2026-08-05 | TASK-014 marquée terminée (§1, §3) — ESLint partagé configuré et validé empiriquement (any/import-order/jsx-a11y), conflit de versions typescript/eslint résolu, prochaine action → TASK-015 | Principal Engineering Manager |
| 1.15.0 | 2026-08-05 | TASK-015 arrêtée (§1, §3) — incohérence d'architecture Tailwind v4 détectée, ADR-0001 créé (Proposé), aucune implémentation tant que non tranché | Principal Engineering Manager |
| 1.16.0 | 2026-08-05 | ADR-0001 accepté, TASK-015 reprise et terminée (§1, §3) — `tailwind-theme.css` créé et validé, FEATURE-005 close, prochaine action → TASK-016 | Principal Engineering Manager |
| 1.17.0 | 2026-08-05 | ADR-0002 : gap de planification confirmé et corrigé — FEATURE-083 (TASK-046 à 049) ajoutée à EPIC-003/M2, compteurs mis à jour (83 Features, 49 Tasks M0-M3), critère de sortie M2 étendu | Principal Engineering Manager |

# GITHUB_LABELS.md — Labels et priorités GitHub (Implementation Plan)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-05
> **Propriétaire** : Principal DevOps Engineer
> **Documents liés** : [[PROJECT_BOARD_GUIDE.md]], [[GIT_WORKFLOW.md]] §2

Labels appliqués à chaque Issue/PR GitHub — le `type` d'un label recoupe volontairement le `type` de commit déjà acté ([[GIT_WORKFLOW.md]] §2) pour qu'une Issue et son commit associé restent cohérents visuellement, jamais un second vocabulaire.

---

## 1. Labels de type

| Label | Couleur (hex) | Description |
|---|---|---|
| `feature` | `#0E8A16` (vert) | Nouvelle fonctionnalité utilisateur |
| `bug` | `#D73A4A` (rouge) | Comportement incorrect par rapport à la spécification documentée |
| `enhancement` | `#A2EEEF` (bleu clair) | Amélioration d'une fonctionnalité existante, pas un bug ni une fonctionnalité nouvelle |
| `documentation` | `#0075CA` (bleu) | Changement dans `docs/` uniquement |
| `performance` | `#FBCA04` (jaune) | Lié à un budget de [[PERFORMANCE_BUDGET.md]] |
| `security` | `#EE0701` (rouge foncé) | Lié à [[SECURITY_GUIDE.md]]/[[SECURITY_GUIDELINES.md]] |
| `ui` | `#C5DEF5` (bleu très clair) | Composant visuel, design system |
| `ux` | `#D4C5F9` (violet clair) | Comportement d'interaction, parcours utilisateur |
| `backend` (couche Data/Domain) | `#5319E7` (violet) | Repository, Mapper, moteur (Sync/Cache/Search/Audio) |
| `frontend` | `#1D76DB` (bleu moyen) | Composant React, store, hook |
| `architecture` | `#000000` (noir) | Décision structurante, nécessite un ADR |
| `testing` | `#BFD4F2` (bleu pâle) | Ajout/modification de tests uniquement |
| `offline` | `#006B75` (sarcelle) | Lié à [[OFFLINE_SYSTEM.md]] et la Plateforme Offline |
| `audio` | `#F9A825` (orange) | Lié à [[AUDIO_ENGINE.md]] et le Moteur Audio |
| `sync` | `#0052CC` (bleu marine) | Lié à [[SYNC_ENGINE_SPECIFICATION.md]] |

## 2. Labels de priorité

| Label | Couleur (hex) | Règle d'attribution |
|---|---|---|
| `P0` | `#B60205` (rouge vif) | Bloque la release en cours, corrigé avant toute autre tâche — crash, perte de données, faille de sécurité |
| `P1` | `#D93F0B` (orange foncé) | Doit être corrigé avant le jalon suivant, jamais reporté sans justification explicite en commentaire |
| `P2` | `#FBCA04` (jaune) | Planifié dans les 2-3 prochains jalons, pas urgent |
| `P3` | `#C2E0C6` (vert pâle) | Amélioration désirable, aucune urgence — backlog long terme |

**Règle** : un bug qui viole un principe de la constitution ([[ENGINEERING_HANDBOOK.md]] §1) ou perd des données utilisateur ([[CONFLICT_RESOLUTION.md]] §1, principe 2) est **toujours** P0, indépendamment de sa fréquence d'occurrence perçue — la gravité prime sur la probabilité pour cette catégorie précise.

## 3. Labels d'état (gérés par le Project Board, pas assignés manuellement)

| Label | Couleur (hex) | Signification |
|---|---|---|
| `blocked` | `#E4E669` (jaune olive) | En attente d'une dépendance non résolue ([[DEPENDENCY_GRAPH.md]]) |
| `needs-review` | `#FEF2C0` (jaune pâle) | PR ouverte, en attente de revue ([[CODE_REVIEW_GUIDE.md]]) |
| `good-first-issue` | `#7057FF` (violet vif) | Task XS/S sans dépendance bloquante, adaptée à un nouveau contributeur ([[CHECKLISTS.md]] §1) |

---

## 4. Ce que ce document ne fait pas

- Ne redéfinit pas les types de commit (voir [[GIT_WORKFLOW.md]] §2, déjà volontairement recoupé).
- Ne redéfinit pas le workflow de PR (voir [[GIT_WORKFLOW.md]] §3).

## 5. Checklist de validation

- [ ] Chaque label de type a un équivalent direct dans les types de commit déjà actés, sauf exception justifiée (`architecture`, `offline`, `audio`, `sync` — labels transverses sans équivalent 1:1).
- [ ] Aucun label de priorité n'est attribué sans règle explicite (§2).
- [ ] Les labels d'état ne sont jamais assignés manuellement en contradiction avec l'état réel du Project Board.

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-05 | Création initiale du document (Implementation Plan) | Principal DevOps Engineer |

# IMPLEMENTATION_CHECKLISTS.md — Gabarit de checklist par tâche (Implementation Plan)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-05
> **Propriétaire** : Staff QA Engineer
> **Documents liés** : [[DEFINITION_OF_DONE.md]], [[CODE_REVIEW_GUIDE.md]], [[TASK_BREAKDOWN.md]] §3

[[DEFINITION_OF_DONE.md]] et [[CODE_REVIEW_GUIDE.md]] définissent déjà les critères complets (auteur et relecteur). Ce document est le gabarit **compact** coché littéralement sur chaque Task du backlog — une projection pratique des deux documents, jamais une redéfinition des critères eux-mêmes.

---

## 1. Gabarit — sept sections, cohérent avec le cadrage

```markdown
## Checklist d'implémentation — TASK-0NN

### Architecture
- [ ] Respecte les frontières de couche/module (ARCHITECTURE_PRINCIPLES.md §7)
- [ ] Aucune duplication d'un mécanisme déjà existant

### Tests
- [ ] Type de test conforme à TESTING_STRATEGY.md §9septies (quand écrire chaque test)
- [ ] Couverture Domain/Data ≥ 80 % si applicable, UI ≥ 60 %

### Documentation
- [ ] TSDoc sur toute surface publique nouvelle/modifiée
- [ ] Document fondateur mis à jour dans la même PR si un standard a changé

### Performance
- [ ] Aucun budget de PERFORMANCE_BUDGET.md dépassé
- [ ] Mémoïsation appliquée uniquement si justifiée (PERFORMANCE_GUIDE.md §5quater)

### Accessibilité
- [ ] Navigation clavier vérifiée si surface interactive nouvelle
- [ ] axe-core sans défaut critique/sérieux

### Sécurité
- [ ] Aucune donnée sensible journalisée ou exposée
- [ ] Toute nouvelle dépendance justifiée (ENGINEERING_GUIDE.md §2.1)

### Review
- [ ] Checklist CODE_REVIEW_GUIDE.md §2 appliquée par le relecteur
- [ ] CI verte (lint/typecheck/tests/build) avant merge
```

## 2. Quand chaque section s'applique

Cohérent avec [[DEFINITION_OF_DONE.md]] (« Niveaux de rigueur selon le type de changement ») — une Task de type `chore`/`docs` ([[GIT_WORKFLOW.md]] §2) n'active que les sections Architecture et Review ; une Task `feature` active les sept sections sans exception.

## 3. Intégration au gabarit d'Issue Task

Cette checklist est ajoutée automatiquement en pied du gabarit d'Issue Task ([[PROJECT_BOARD_GUIDE.md]] §5) — cochée progressivement pendant le développement, jamais toute cochée d'un coup juste avant la revue (un relecteur qui voit une checklist entièrement cochée sans historique de commits progressif la questionne).

---

## 4. Ce que ce document ne fait pas

- Ne redéfinit aucun critère — chaque case renvoie à son document source (§1).
- Ne remplace jamais [[DEFINITION_OF_DONE.md]] ni [[CODE_REVIEW_GUIDE.md]], qui restent les références complètes.

## 5. Checklist de validation

- [ ] Chaque case du gabarit (§1) reste un raccourci vers un critère déjà défini, jamais un nouveau critère inventé.
- [ ] La checklist n'est jamais cochée entièrement sans progression visible dans l'historique de commits.

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-05 | Création initiale du document (Implementation Plan) | Staff QA Engineer |

# ENGINEERING_HANDBOOK.md — Manuel officiel d'ingénierie (Engineering Handbook)

> **Statut** : document fondateur, vivant — capstone
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal Engineering Manager
> **Documents liés** : tous les documents listés en §3

Point d'entrée unique pour tout contributeur — ce document ne redécide rien de ce que [[ENGINEERING_GUIDE.md]] et [[ENGINEERING_MANIFESTO.md]] ont déjà posé comme principes ; il en est la constitution complète et la carte vers chaque document spécialisé qui définit comment écrire du code, tester, documenter, relire une PR, créer une fonctionnalité et publier une version.

---

## 1. Constitution

1. **Le code est lu plus souvent qu'il n'est écrit** — la lisibilité prime sur la concision quand les deux entrent en tension ([[CODING_STANDARDS.md]] §2, « explicite plutôt qu'astucieux »).
2. **La simplicité prime** — KISS déjà nommé et appliqué ([[ARCHITECTURE_PRINCIPLES.md]] §8bis).
3. **Aucune duplication** — une donnée, une règle, un mécanisme n'existe qu'à un seul endroit ([[ENGINEERING_GUIDE.md]] §1.3, [[STATE_MANAGEMENT.md]] §1 principe 2 pour son application à l'état).
4. **Documentation avant implémentation** — un ADR précède une décision structurante, jamais l'inverse ([[DEFINITION_OF_READY.md]], [[ADR_TEMPLATE.md]]).
5. **Tests avant fusion** — aucune PR ne merge sans tests couvrant le changement ([[GIT_WORKFLOW.md]] §3, [[DEFINITION_OF_DONE.md]]).
6. **Refactoring continu** — la dette technique est trackée, jamais accumulée silencieusement ([[ENGINEERING_METRICS.md]] §3).
7. **Performance par défaut** — un budget chiffré existe pour chaque surface sensible, vérifié en CI ([[PERFORMANCE_BUDGET.md]], [[QUALITY_GATES.md]]).
8. **Accessibilité par défaut** — jamais une fonctionnalité optionnelle ([[FOUNDATIONS.md]] §7, déjà acté).
9. **Security by Design** — la sécurité est vérifiée à chaque étape du cycle de vie (§2), jamais une passe finale isolée ([[SECURITY_GUIDE.md]], [[CODE_REVIEW_GUIDE.md]] §2.4).

## 2. Workflow complet (bonus du cadrage)

Étend [[DEVELOPMENT_GUIDELINES.md]] §1 (déjà acté, 9 étapes incluant Monitoring) — ce diagramme le reformule au vocabulaire du cadrage sans le redécider :

```
Idée
  ↓
Documentation (DEFINITION_OF_READY.md — critères d'entrée)
  ↓
ADR (si décision structurante — ADR_TEMPLATE.md)
  ↓
Architecture (conformité ARCHITECTURE_PRINCIPLES.md §7 vérifiée avant code)
  ↓
Développement (CODING_STANDARDS.md, TYPESCRIPT_GUIDE.md, FRONTEND_ARCHITECTURE.md)
  ↓
Tests (TESTING_STRATEGY.md §9septies — quel type, dès l'écriture)
  ↓
Review (CODE_REVIEW_GUIDE.md — checklist du relecteur)
  ↓
Merge (GIT_WORKFLOW.md §3, squash, CI verte obligatoire)
  ↓
Release (GIT_WORKFLOW.md §4, SemVer, canaux)
  ↓
Monitoring (DEVELOPMENT_GUIDELINES.md §Étape 9)
```

## 3. Carte complète du manuel

| Document | Rôle |
|---|---|
| [[ENGINEERING_GUIDE.md]] | Principes d'ingénierie, dette technique, dépendances |
| [[ENGINEERING_MANIFESTO.md]] | Anti-patterns interdits, mécanismes d'enforcement |
| [[CODING_STANDARDS.md]] | Nommage, organisation de fichiers, structure de code |
| [[TYPESCRIPT_GUIDE.md]] | Interfaces/types, generics, utility types, politique `any` |
| [[FRONTEND_ARCHITECTURE.md]] | Routing, Suspense, Error Boundaries, props, Context |
| [[GIT_WORKFLOW.md]] | Branches, commits, PR, releases, canaux, rollback |
| [[CODE_REVIEW_GUIDE.md]] | Checklist du relecteur |
| [[DEFINITION_OF_READY.md]] | Critères d'entrée en développement |
| [[DEFINITION_OF_DONE.md]] | Critères de fin de fonctionnalité |
| [[TESTING_STRATEGY.md]] | Pyramide de tests, quand écrire chaque test, Mutation Testing (préparé) |
| [[QUALITY_GATES.md]] | Gates automatisés bloquants |
| [[CI_CD_GUIDE.md]] | Pipeline concret |
| [[FEATURE_FLAGS.md]] | Cycle de vie, migration, suppression |
| [[PERFORMANCE_BUDGET.md]] | Budgets chiffrés |
| [[SECURITY_GUIDE.md]] / [[SECURITY_GUIDELINES.md]] | Sécurité opérationnelle et principes |
| [[ACCESSIBILITY_GUIDE.md]] | WCAG AA minimum, AAA visé |
| [[ENGINEERING_METRICS.md]] | Tableau de bord d'ingénierie |
| [[CHECKLISTS.md]] | Checklists opérationnelles ponctuelles |
| [[DEVELOPMENT_GUIDELINES.md]] | Cycle de vie complet d'une fonctionnalité |

**5 des 19 livrables demandés étaient réellement nouveaux** (ce document, [[TYPESCRIPT_GUIDE.md]], [[CODE_REVIEW_GUIDE.md]], [[DEFINITION_OF_READY.md]], [[ENGINEERING_METRICS.md]]) — 6 existaient déjà sous le nom exact demandé ([[CODING_STANDARDS.md]], [[GIT_WORKFLOW.md]], [[QUALITY_GATES.md]], [[CI_CD_GUIDE.md]], [[PERFORMANCE_BUDGET.md]], [[DEFINITION_OF_DONE.md]]), 8 recoupaient un document déjà profond et ont été étendus ([[FRONTEND_ARCHITECTURE.md]], [[GIT_WORKFLOW.md]] ×3, [[TESTING_STRATEGY.md]], [[FEATURE_FLAGS.md]], [[CHECKLISTS.md]], [[ACCESSIBILITY_GUIDE.md]] — sans modification, déjà complet).

## 4. Matrice reliant tous les standards (bonus du cadrage)

| Standard | S'applique à l'étape (§2) | Vérifié par |
|---|---|---|
| [[CODING_STANDARDS.md]] | Développement | Revue humaine + lint (ESLint) |
| [[TYPESCRIPT_GUIDE.md]] | Développement | Revue humaine + typecheck (tsc) |
| [[TESTING_STRATEGY.md]] | Tests | CI (Vitest/Playwright) + [[QUALITY_GATES.md]] §1 |
| [[CODE_REVIEW_GUIDE.md]] | Review | Revue humaine obligatoire ([[GIT_WORKFLOW.md]] §3) |
| [[PERFORMANCE_BUDGET.md]] | Développement, Tests, Review | CI (bundle-budget) + profilage manuel |
| [[SECURITY_GUIDE.md]] | Développement, Review | CI (scan dépendances/secrets) + [[CHECKLISTS.md]] §4 |
| [[ACCESSIBILITY_GUIDE.md]] | Développement, Review | CI (axe-core) + audit manuel avant release |
| [[GIT_WORKFLOW.md]] | Merge, Release | CI (statut de build) |
| [[DEFINITION_OF_DONE.md]] | Review (porte de sortie) | Checklist cochée dans le gabarit de PR |
| [[DEFINITION_OF_READY.md]] | Idée, Documentation (porte d'entrée) | Revue avant le premier commit |

## 5. Auto-revue comparative

> **Avertissement d'honnêteté** : connaissance générale du modèle, pas un audit de code source en direct.

| Référence | Ce qu'elle illustre | Rapprochement avec Melodia |
|---|---|---|
| React | RFC/discussion publique avant changement structurant | Confirme le principe ADR-avant-décision déjà acté ([[ADR_TEMPLATE.md]]) |
| Vite | Documentation concise, exemples avant prose | Cohérent avec [[ENGINEERING_GUIDE.md]] §1.5 (documentation qui ne se désynchronise jamais du code) |
| TypeScript | Compilateur comme premier relecteur | Valide [[QUALITY_GATES.md]] §1 (typecheck bloquant), [[TYPESCRIPT_GUIDE.md]] |
| VS Code | Changelog détaillé par release, notes structurées | Valide [[GIT_WORKFLOW.md]] §5 (changelog généré, Keep a Changelog) |
| Angular | Conventional Commits comme standard d'écosystème | Confirme le choix déjà acté ([[GIT_WORKFLOW.md]] §2) |
| Rust | `clippy`/`rustfmt` comme gates non négociables, RFC pour tout changement de langage | Valide [[QUALITY_GATES.md]] (0 tolérance lint/typecheck) et le processus ADR |
| Kubernetes | SIG (Special Interest Groups) par domaine avec propriétaire clair | Rapproche de la propriété par document déjà actée ([[DOCUMENTATION_GUIDE.md]] §2-3) |
| Flutter | Budget de performance chiffré (jank frames) suivi publiquement | Valide [[PERFORMANCE_BUDGET.md]] comme gate vérifiable, pas une aspiration |

**Conclusion** : aucune référence ne contredit un choix déjà acté — chacune valide une pratique déjà en place dans le corpus plutôt que de révéler une lacune structurelle.

---

## 6. Checklist de validation

- [ ] Les 9 principes du §1 restent vérifiables en revue de code (§4, colonne « Vérifié par »).
- [ ] Tout nouveau document du domaine ingénierie est ajouté à la carte §3 avant d'être considéré terminé.
- [ ] Aucune contradiction entre ce capstone et les documents qu'il cartographie — vérifié à chaque mise à jour de l'un des documents source.

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Engineering Handbook) | Principal Engineering Manager |

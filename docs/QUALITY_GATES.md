# QUALITY_GATES.md — Gates automatisés (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Engineering Manager / Lead DevOps Engineer
> **Documents liés** : [[DEFINITION_OF_DONE.md]], [[CI_CD_GUIDE.md]], [[PERFORMANCE_GUIDE.md]]

## Différence avec la Definition of Done

[[DEFINITION_OF_DONE.md]] est la checklist complète (humaine **et** automatisée) qu'une fonctionnalité doit satisfaire pour être considérée terminée — vérifiée en revue de PR. **Ce document est un sous-ensemble strictement automatisé** : les gates qui bloquent mécaniquement un merge ou une release, sans jugement humain, exécutés par la CI ([[CI_CD_GUIDE.md]]). Un gate ici est nécessairement aussi un item de la Definition of Done ; l'inverse n'est pas vrai (ex. « revue de design validée » est dans la DoD mais n'est pas automatisable).

---

## 1. Gates bloquants au merge (chaque PR)

| Gate | Seuil | Source de vérité |
|---|---|---|
| Lint | 0 erreur ESLint/Prettier | [[TECH_STACK.md]] §1 |
| Typecheck | 0 erreur TypeScript | [[TECH_STACK.md]] §1 |
| Tests unitaires/composants | 100 % passants | [[TESTING_STRATEGY.md]] |
| Couverture Domain/Data | ≥ 80 % | [[PROJECT_CHARTER.md]] §3.2 |
| Couverture UI | ≥ 60 % | [[PROJECT_CHARTER.md]] §3.2 |
| Poids JS initial (gzip) | < 400 Ko (seuil d'alerte) | [[PERFORMANCE_BUDGET.md]] §4 |
| Poids CSS initial (gzip) | < 100 Ko (seuil d'alerte) | [[PERFORMANCE_BUDGET.md]] §4 |
| Build (web + vérification config Tauri) | Succès sur toutes les cibles affectées | [[CI_CD_GUIDE.md]] §1 |
| Scan de dépendances | 0 CVE critique/haute non dérogée | [[SECURITY_GUIDE.md]] §2 |
| Scan de secrets | 0 détection | [[SECURITY_GUIDE.md]] §3 |
| Accessibilité automatisée (axe-core) | 0 défaut critique/sérieux | [[TESTING_STRATEGY.md]] §6 |
| Frontières de package/module | 0 import illégal entre couches | [[ARCHITECTURE.md]] §2, [[ARCHITECTURE_PRINCIPLES.md]] §7 |

## 2. Gates bloquants avant release (nightly + pré-release, non bloquants par PR)

| Gate | Seuil |
|---|---|
| Rendu sur fixture 200 000 titres | 60 FPS constant, mémoire < seuil d'alerte ([[PERFORMANCE_BUDGET.md]] §3 et §5) |
| Tests E2E Desktop (`tauri-driver`) | 100 % passants sur les parcours critiques |
| Tests de contrat Jellyfin (matrice de versions) | 100 % passants sur les versions serveur supportées |
| Checklist de release manuelle | Complétée (voir [[CHECKLISTS.md]]) |

## 3. Dérogation à un gate

Un gate ne peut être contourné qu'avec une dérogation explicite, documentée en commentaire de PR, référençant un ticket de dette technique ([[ENGINEERING_GUIDE.md]] §3) — jamais un `--no-verify` ou équivalent silencieux ([[GIT_WORKFLOW.md]] §3, « aucune exception, aucun `--no-verify` »). Une dérogation est une exception traçable, pas une désactivation permanente du gate.

## 4. Évolution des seuils

Les seuils listés ici sont des miroirs des chiffres de [[PERFORMANCE_BUDGET.md]] et [[PROJECT_CHARTER.md]] §3.2 — toute modification de seuil se fait dans le document source, jamais ici en premier (cohérent avec [[DOCUMENTATION_GUIDE.md]] §4, une seule source de vérité par sujet).

---

## 5. Checklist de validation

- [ ] Chaque gate reste un miroir d'un chiffre déjà défini ailleurs (§4) — aucun seuil inventé localement.
- [ ] La distinction avec [[DEFINITION_OF_DONE.md]] reste claire pour un nouveau contributeur (testée via la checklist d'onboarding, [[CHECKLISTS.md]] §1).
- [ ] Les gates pré-release couvrent les zones ⚠️ identifiées dans [[EXTREME_SCENARIOS.md]] (200k+ titres, multi-appareils).

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | Engineering Manager / Lead DevOps Engineer |
| 0.2.0 | 2026-08-03 | Ajout de la checklist de validation et des renvois vers les documents du complément Phase 0.5 | Engineering Manager / Lead DevOps Engineer |

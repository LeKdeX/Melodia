# CI_CD_GUIDE.md — Pipeline CI/CD concret (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Lead DevOps Engineer
> **Documents liés** : [[TECH_STACK.md]] §1, [[GIT_WORKFLOW.md]], [[QUALITY_GATES.md]], [[TESTING_STRATEGY.md]]

Pipeline concret sur GitHub Actions (déjà décidé en Phase 0, [[TECH_STACK.md]] §1), organisé en monorepo pnpm/Turborepo ([[STACK_DECISIONS.md]] §3, [[ARCHITECTURE.md]]).

---

## 1. Jobs sur chaque Pull Request

```
PR ouverte/mise à jour
 ├─ lint            (ESLint + Prettier --check, tout le monorepo via Turborepo, cache incrémental)
 ├─ typecheck        (tsc --noEmit, par package)
 ├─ test:unit         (Vitest, par package affecté — Turborepo ne relance que ce qui a changé)
 ├─ test:component    (React Testing Library)
 ├─ test:e2e:web      (Playwright, uniquement si un parcours critique est touché — voir TESTING_STRATEGY.md §10)
 ├─ build             (build de chaque app affectée : web, config Tauri desktop/mobile en mode vérification)
 ├─ bundle-budget      (échec si PERFORMANCE_BUDGET.md §4 dépassé, voir PERFORMANCE_GUIDE.md §6)
 └─ security-scan       (pnpm audit, gitleaks — voir SECURITY_GUIDE.md §2-3)
```

Tous les jobs tournent en parallèle quand leurs dépendances de build le permettent (graphe de tâches Turborepo) — pas de pipeline strictement séquentiel qui ralentirait inutilement le retour à l'auteur de la PR.

**Merge bloqué si un seul job échoue**, sans exception, cohérent avec [[GIT_WORKFLOW.md]] §3 (CI verte obligatoire avant merge).

## 2. Jobs planifiés (hors PR)

| Job | Fréquence | Rôle |
|---|---|---|
| `test:e2e:desktop` (via `tauri-driver`) | Nightly + avant release | Coût d'exécution trop élevé pour bloquer chaque PR |
| `test:fixture-200k` (rendu sur bibliothèque synthétique) | Nightly + avant release | Voir [[PERFORMANCE_GUIDE.md]] §2 et §6 |
| `test:contract-jellyfin` (matrice de versions serveur) | Hebdomadaire + avant release | Voir [[JELLYFIN_INTEGRATION.md]] §7 |
| Dependabot / mises à jour de sécurité | Continu | Voir [[SECURITY_GUIDE.md]] §2 |

## 3. Pipeline de release (déclenché par tag `vX.Y.Z`)

```
Tag vX.Y.Z poussé sur main
 ├─ Détermination automatique du type de version (Conventional Commits, voir GIT_WORKFLOW.md §4)
 ├─ Génération du CHANGELOG.md (voir GIT_WORKFLOW.md §5)
 ├─ Build matriciel :
 │    ├─ apps/web        → build statique (PWA) → artefact de déploiement
 │    ├─ apps/desktop     → bundler Tauri : .msi (Windows), .dmg (macOS), .AppImage (Linux)
 │    └─ apps/mobile      → bundler Tauri : .apk (Android), .ipa (iOS, signature requise)
 ├─ Signature des artefacts Desktop/Mobile (secrets scoping au job concerné, voir SECURITY_GUIDE.md §3)
 ├─ Publication GitHub Release (tous les artefacts attachés)
 └─ Déploiement du build Web (conteneur Docker ou hébergement statique, voir TECH_STACK.md §1)
```

## 4. Environnements

- **CI** : exécution des jobs de vérification, aucun déploiement.
- **Preview** (à partir de la Phase 1) : chaque PR touchant `apps/web` déploie une preview éphémère du build Web, pour validation visuelle avant merge — pas de preview Desktop/Mobile (coût de packaging disproportionné pour une preview).
- **Production** : uniquement déclenchée par un tag de release, jamais par un merge direct sur `main` (cohérent avec [[GIT_WORKFLOW.md]] §4).

## 5. Cache et performance du pipeline

Cache Turborepo partagé entre exécutions (remote cache GitHub Actions) : un job dont les entrées n'ont pas changé depuis la dernière exécution réussie n'est pas ré-exécuté, uniquement revalidé. Réduit le temps de retour sur une PR qui ne touche qu'un seul package du monorepo.

---

## 6. Checklist de validation

- [ ] Chaque job de PR (§1) correspond à un gate défini dans [[QUALITY_GATES.md]] §1 — aucun gate sans job, aucun job sans gate.
- [ ] Les jobs planifiés coûteux (E2E Desktop, fixture 200k, contrat Jellyfin) restent hors du chemin critique de chaque PR.
- [ ] Le risque de cache Turborepo obsolète est couvert dans [[RISK_REGISTER_TECHNICAL.md]] §1.
- [ ] Le pipeline de release couvre les trois cibles (Web/Desktop/Mobile) sans étape manuelle non documentée.

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | Lead DevOps Engineer |
| 0.2.0 | 2026-08-03 | Ajout de la checklist de validation et des renvois vers les documents du complément Phase 0.5 | Lead DevOps Engineer |

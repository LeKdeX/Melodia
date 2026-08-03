# CLAUDE.md — Melodia

Instructions pour Claude Code dans ce dépôt. Gardé volontairement court : la référence de fond vit dans `docs/`, jamais dupliquée ici (voir [[docs/DOCUMENTATION_GUIDE.md]] pour la carte complète).

## Le projet en une phrase
Melodia est un client musical premium auto-hébergé pour Jellyfin (Jellyfin = source de données, pas le produit). Vision complète : `docs/PROJECT_CHARTER.md`.

## Avant de travailler ici
1. Relire `docs/` avant toute nouvelle phase ou décision structurante — règle absolue posée dans `docs/PROJECT_CHARTER.md` §7. Une contradiction avec un document existant se signale explicitement, jamais résolue en silence (voir `docs/DOCUMENTATION_GUIDE.md` §5).
2. Décision structurante (nouvelle dépendance de catégorie, changement d'architecture/convention) → un ADR d'abord (`docs/ADR_TEMPLATE.md`), jamais de changement silencieux d'un standard déjà acté.
3. Toute fonctionnalité passe par `docs/DEFINITION_OF_DONE.md` avant d'être considérée terminée.
4. Stack, conventions Git, standards de code : ne pas réinventer — voir `docs/TECH_STACK.md`, `docs/GIT_WORKFLOW.md`, `docs/CODING_STANDARDS.md`.

## Où chercher quoi
Point d'entrée unique : `docs/TECHNICAL_BLUEPRINT.md` (synthèse, ne fait pas autorité seul). Carte complète et à jour : `docs/DOCUMENTATION_GUIDE.md` §1. En résumé : vision/objectifs/risques → `PROJECT_CHARTER.md` ; architecture système → `ARCHITECTURE_PRINCIPLES.md` / arborescence concrète → `ARCHITECTURE.md` ; stack → `TECH_STACK.md` / `STACK_DECISIONS.md` ; process de dev → `DEVELOPMENT_GUIDELINES.md` ; feuille de route → `ROADMAP.md`.

## Journal de phase
Section alimentée à la fin de chaque phase (voir `docs/ROADMAP.md` pour la définition des phases). Chaque entrée : ce qui a été livré, l'état réel du dépôt, ce qui reste ouvert — pas un résumé marketing.

### Phase 0 — Fondations (2026-08-03)
- Les 13 documents fondateurs de `docs/` rédigés et auto-revus (voir historique des révisions de chaque document).
- Décision structurante actée : Tauri 2 comme runtime unifié Desktop + Mobile (voir `docs/TECH_STACK.md` §0).
- Licence MIT retenue pour le dépôt (ADR formel encore à rédiger avant publication — voir `docs/PROJECT_CHARTER.md` §3.10).
- Aucun code applicatif écrit — normal et voulu, la Phase 0 est documentation uniquement.
- Poussé sur `origin/main` (commit `836a8cd`).
- Ouvert : ADR de licence, mise en place du squelette de dépôt (Vite/React/Tauri, CI de base) pour entrer en Phase 1.

### Phase 0.5 — Blueprint technique (2026-08-03)
- 15 documents supplémentaires rédigés dans `docs/`, élaboration concrète de la Phase 0 (aucune redécision, voir `docs/DOCUMENTATION_GUIDE.md` §1 pour la carte complète des 28 documents).
- Contradiction signalée et tranchée avec l'utilisateur avant de continuer : le cadrage demandait une « architecture Next.js », incompatible avec la décision Tauri de Phase 0 (Server Components/Actions nécessitent un serveur Node persistant) — tranché en faveur du maintien de Vite + React SPA (voir `docs/FRONTEND_ARCHITECTURE.md`, note de cadrage).
- Décisions structurantes nouvelles : monorepo pnpm + Turborepo (`docs/STACK_DECISIONS.md` §3, arborescence dans `docs/ARCHITECTURE.md`) ; moteur de recherche FlexSearch (`docs/STACK_DECISIONS.md` §2) ; SDK officiel `@jellyfin/sdk` plutôt qu'un client maison (`docs/JELLYFIN_INTEGRATION.md` §1).
- Amendement documenté : bibliothèque de référence des budgets de performance relevée de 100k à 200k titres (`docs/PERFORMANCE_BUDGET.md`, `docs/PERFORMANCE_GUIDE.md`).
- Consolidation documentaire : ADR_GUIDE et QUALITY_GATES demandés par le cadrage n'ont pas été dupliqués aveuglément — `ADR_TEMPLATE.md` existant réutilisé tel quel, `QUALITY_GATES.md` scoping restreint aux gates automatisés en CI (distinct de `DEFINITION_OF_DONE.md`).
- Aucun code applicatif écrit — voulu, cette phase reste documentaire.
- Non poussé sur `origin/main` à ce stade (à confirmer avec l'utilisateur avant push, comme pour la Phase 0).
- Ouvert : squelette effectif du monorepo (actuellement seulement décrit dans `docs/ARCHITECTURE.md`, pas encore créé sur disque), ADR de licence toujours en attente, entrée en Phase 1.

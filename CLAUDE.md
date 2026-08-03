# CLAUDE.md — Melodia

Instructions pour Claude Code dans ce dépôt. Gardé volontairement court : la référence de fond vit dans `docs/`, jamais dupliquée ici (voir [[docs/DOCUMENTATION_GUIDE.md]] pour la carte complète).

## Le projet en une phrase
Melodia est un client musical premium auto-hébergé pour Jellyfin (Jellyfin = source de données, pas le produit). Vision complète : `docs/PROJECT_CHARTER.md`.

## Avant de travailler ici
1. Relire `docs/` avant toute nouvelle phase ou décision structurante — règle absolue posée dans `docs/PROJECT_CHARTER.md` §7. Une contradiction avec un document existant se signale explicitement, jamais résolue en silence (voir `docs/DOCUMENTATION_GUIDE.md` §5).
2. Décision structurante (nouvelle dépendance de catégorie, changement d'architecture/convention) → un ADR d'abord (`docs/ADR_TEMPLATE.md`), jamais de changement silencieux d'un standard déjà acté.
3. Toute fonctionnalité passe par `docs/DEFINITION_OF_DONE.md` avant d'être considérée terminée.
4. Stack, conventions Git, standards de code : ne pas réinventer — voir `docs/TECH_STACK.md`, `docs/GIT_WORKFLOW.md`, `docs/CODING_STANDARDS.md`.

## Comment je travaille ici (accord de collaboration IA)
- Je ne suis pas un exécutant : avant de répondre, j'analyse la demande, relis mentalement les décisions déjà actées dans `docs/`, compare plusieurs approches et vérifie la cohérence avec l'architecture/le Design System/la performance/la sécurité/l'accessibilité avant de recommander — jamais la première solution venue sans comparaison.
- Je signale les meilleures alternatives même non demandées si elles apportent une vraie valeur (bénéfice, coût, risques explicités), sans jamais imposer un changement de portée sur une fondation du projet sans validation.
- Je refuse — en l'expliquant, avec une alternative — toute solution qui duplique du code, casse le Design System, viole une convention déjà actée, dégrade les performances ou complexifie inutilement l'architecture ; voir `docs/ENGINEERING_MANIFESTO.md` §2 pour la liste actionnable des anti-patterns déjà interdits, pas re-décidée à chaque tâche.
- Les responsabilités par type d'unité de code (composant/hook/service/page) sont déjà définies dans `docs/CODING_STANDARDS.md` §4 — je m'y conforme, je ne les redéfinis pas.
- Aucune décision arbitraire (couleur, durée, dépendance, architecture) sans justification — cohérent avec `docs/ENGINEERING_GUIDE.md` et `docs/ADR_TEMPLATE.md`.
- Une tâche n'est « terminée » que si elle satisfait `docs/DEFINITION_OF_DONE.md` **et** a été revue (lisibilité, duplication, perf, a11y, cohérence avec les documents fondateurs) — jamais seulement « ça fonctionne ».
- Honnêteté sans exception : je ne prétends jamais avoir vérifié ce qui ne l'a pas été, je n'invente jamais un résultat, je ne masque jamais une limite technique — si une incertitude existe, je la signale avec ce qui manque et comment la lever (cohérent avec les Honesty Rules déjà appliquées dans `docs/` — audit trail EXTRACTED/INFERRED/AMBIGUOUS, gaps signalés plutôt que masqués dans `docs/EXTREME_SCENARIOS.md`).

> **Documents référencés dans un cadrage mais absents de `docs/` à ce jour** : `PRODUCT_BIBLE`, `BRAND_BIBLE`, `UX_GUIDELINES`, `MOTION_GUIDELINES` n'existent pas comme fichiers dédiés. `DESIGN_SYSTEM` y est traité comme `docs/DESIGN_SYSTEM_ARCHITECTURE.md` (architecture technique des composants, pas une bible de marque/UX) ; ce que couvrirait `MOTION_GUIDELINES` vit déjà dans `docs/DESIGN_SYSTEM_ARCHITECTURE.md` §1 (tokens de durée/courbe d'animation) et `docs/TECH_STACK.md` §1 (choix de la bibliothèque Motion). Décision explicite avec l'utilisateur (2026-08-03) : ne pas créer PRODUCT_BIBLE/BRAND_BIBLE/UX_GUIDELINES maintenant — les documents existants (`PROJECT_CHARTER.md`, `DESIGN_SYSTEM_ARCHITECTURE.md`, `TECHNICAL_BLUEPRINT.md`) restent la source de vérité en attendant. Une Brand Bible en particulier ne doit jamais être rédigée par extrapolation seule (choix de couleurs/logo/ton de voix) — elle nécessite un retour humain explicite pour ne pas violer la règle « aucune décision arbitraire ». Ne pas supposer l'existence de ces documents tant qu'ils n'ont pas été créés et ajoutés à `docs/DOCUMENTATION_GUIDE.md` §1.

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

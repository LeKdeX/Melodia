# TECHNICAL_BLUEPRINT.md — Blueprint technique (synthèse Phase 0 + Phase 0.5)

> **Statut** : document fondateur, vivant — document de synthèse, ne fait pas autorité seul
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : CTO
> **Documents liés** : tous les documents de [[DOCUMENTATION_GUIDE.md]] §1

Ce document est le point d'entrée unique pour une personne qui rejoint le projet et doit comprendre, en une lecture, ce qui a été décidé et où trouver le détail. **Il ne fait pas autorité par lui-même** : en cas d'écart entre ce résumé et le document source qu'il synthétise, le document source gagne toujours (rappel de [[DOCUMENTATION_GUIDE.md]] §4, une seule source de vérité par sujet).

---

## 1. Ce qu'est Melodia, en une phrase

Client musical premium auto-hébergé pour Jellyfin (Jellyfin = source de données, pas le produit), livré sur Web/Desktop/Mobile depuis un cœur de code unique via Tauri 2. Détail complet : [[PROJECT_CHARTER.md]].

## 2. Les cinq décisions structurantes qui conditionnent tout le reste

1. **Tauri 2 unifie Desktop et Mobile** avec le même frontend React/Vite déployable en PWA — pas de Next.js, pas de React Native/Capacitor séparé ([[TECH_STACK.md]] §0, [[FRONTEND_ARCHITECTURE.md]]).
2. **`MusicSource` et `LocalStore` sont des interfaces**, Jellyfin/SQLite/IndexedDB n'en sont que des implémentations — aucune fuite de vocabulaire Jellyfin au-delà de la couche Data ([[ARCHITECTURE_PRINCIPLES.md]] §2-3, [[JELLYFIN_INTEGRATION.md]]).
3. **État serveur et état client sont séparés sans exception** : TanStack Query pour tout ce qui vient de Jellyfin, Zustand pour l'état applicatif local ([[ARCHITECTURE_PRINCIPLES.md]] §4, [[DATA_LAYER.md]] §1).
4. **Monorepo pnpm/Turborepo à frontières de packages réelles** (`@melodia/app`, `@melodia/core`, `@melodia/ui`, `@melodia/platform`) — les règles de dépendance entre couches sont imposées par la résolution de module, pas seulement par convention ([[ARCHITECTURE.md]]).
5. **Toute décision structurante passe par un ADR** et toute contradiction avec un document existant est signalée explicitement avant d'être tranchée — jamais résolue en silence ([[PROJECT_CHARTER.md]] §7, [[ADR_TEMPLATE.md]], [[DOCUMENTATION_GUIDE.md]] §5).

## 3. Carte de lecture par rôle

| Si vous êtes... | Commencez par |
|---|---|
| Nouveau contributeur | [[CHECKLISTS.md]] §1, puis [[PROJECT_CHARTER.md]], puis [[ARCHITECTURE.md]] |
| Ingénieur frontend/feature | [[CODING_STANDARDS.md]], [[FRONTEND_ARCHITECTURE.md]], [[DEVELOPMENT_GUIDELINES.md]] |
| Ingénieur data/domaine | [[ARCHITECTURE_PRINCIPLES.md]], [[DATA_LAYER.md]], [[JELLYFIN_INTEGRATION.md]] |
| Designer / ingénieur UX | [[DESIGN_SYSTEM_ARCHITECTURE.md]], [[PROJECT_CHARTER.md]] §3.4 et §3.6 |
| DevOps / release | [[CI_CD_GUIDE.md]], [[QUALITY_GATES.md]], [[CHECKLISTS.md]] §2 |
| Revue de sécurité | [[SECURITY_GUIDELINES.md]], [[SECURITY_GUIDE.md]], [[CHECKLISTS.md]] §4 |
| Product/roadmap | [[ROADMAP.md]], [[PROJECT_CHARTER.md]] §3 et §6 |

## 4. Chiffres qui font autorité (résumé, sources exactes en note)

| Sujet | Chiffre | Source |
|---|---|---|
| Démarrage à froid | < 2 s | [[PERFORMANCE_BUDGET.md]] §1 |
| Recherche locale perçue | < 100 ms | [[PERFORMANCE_BUDGET.md]] §2 |
| FPS liste virtualisée | 60 FPS sur 200 000+ titres | [[PERFORMANCE_BUDGET.md]] §3 (relevé de 100k en Phase 0.5, voir [[PERFORMANCE_GUIDE.md]] §1) |
| Couverture de test | ≥ 80 % Domain/Data, ≥ 60 % UI | [[PROJECT_CHARTER.md]] §3.2 |
| Accessibilité | WCAG 2.2 AA | [[PROJECT_CHARTER.md]] §3.6 |
| Licence | MIT (ADR formel à rédiger avant publication) | [[PROJECT_CHARTER.md]] §3.10 |

## 5. État du dépôt à la fin de la Phase 0.5

- Aucun code applicatif écrit — voulu, cette phase reste documentaire (rappel des règles absolues de cadrage de cette phase).
- 28 documents fondateurs au total dans `docs/` (13 Phase 0 + 15 Phase 0.5), tous cross-référencés, carte à jour dans [[DOCUMENTATION_GUIDE.md]] §1.
- Amendement notable : [[PERFORMANCE_BUDGET.md]] et [[CODING_STANDARDS.md]] ont chacun reçu un amendement documenté (bibliothèque de référence 200k, nichage monorepo) plutôt que d'être silencieusement contredits.
- Ouvert avant d'entrer en Phase 1 : ADR de licence formel, initialisation effective du monorepo (squelette `apps/`/`packages/` vide, CI de base) — voir [[ROADMAP.md]] Phase 1 et [[CHECKLISTS.md]].

## 6. Ce que ce blueprint ne remplace pas

Il ne contient aucun chiffre, aucune convention et aucune décision qui ne soit pas également présente dans son document source — le lire seul suffit pour s'orienter, mais toute implémentation doit référencer le document source correspondant, jamais ce résumé.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | CTO |

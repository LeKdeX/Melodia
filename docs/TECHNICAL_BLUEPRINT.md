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

## 5. Analyse transverse (complément Phase 0.5)

Quatre documents apportent une analyse qui traverse l'ensemble des décisions ci-dessus plutôt que d'en ajouter une nouvelle :

- [[TECHNOLOGY_COMPARISONS.md]] — pourquoi chaque technologie a été préférée à son alternative la plus crédible, sur sept axes (facilité, performance, évolutivité, communauté, maintenance, maturité, compatibilité projet). Conclusion clé : tous les écarts ne se valent pas — certains sont des seuils mesurables (FlexSearch), d'autres des contraintes de plateforme (Dexie/SQLite), d'autres de vrais arbitrages (React/Vue).
- [[RISK_REGISTER_TECHNICAL.md]] — risque, probabilité, impact, prévention, correction pour chaque décision structurante majeure, à un grain plus fin que le registre stratégique de [[PROJECT_CHARTER.md]] §5.
- [[EXTREME_SCENARIOS.md]] — validation honnête (pas seulement affirmée) de l'architecture contre l'échelle (jusqu'à 300 000 titres), la connectivité, le multi-serveurs/multi-utilisateurs et les formats d'écran. Deux gaps réels y sont signalés plutôt que masqués : la tenue au-delà de 200 000 titres n'est pas mesurée, et la synchronisation multi-appareils attend encore son ADR formel.
- [[EVOLVABILITY.md]] — évolutivité vers Android TV, Apple TV, CarPlay, Android Auto, montres connectées, API publique, SDK, plugins, marketplace et synchronisation cloud. Un seul point y est signalé comme tension réelle avec la charte plutôt que simple question technique : une synchronisation cloud centralisée opérée par le projet contredirait [[PROJECT_CHARTER.md]] §4 — voir [[EVOLVABILITY.md]] §12 pour les deux formes qui resteraient acceptables.

## 5bis. Analyse comparative de l'architecture logicielle (ajout Phase 12)

> **Avertissement d'honnêteté** : comme [[COMPETITIVE_ANALYSIS.md]] et [[COMPETITIVE_BRAND_ANALYSIS.md]], cette comparaison s'appuie sur la connaissance générale du modèle (coupure janvier 2026), pas un audit de code source en direct des projets cités — à revérifier avant toute décision d'architecture qui s'appuierait fortement dessus.

L'architecture logicielle de Melodia actée dans [[ARCHITECTURE.md]], [[ARCHITECTURE_PRINCIPLES.md]] et [[MODULES.md]] (Feature-First, monorepo à frontières de packages réelles, Ports & Adapters) est comparée à six produits desktop/hybrides reconnus pour la qualité de leur architecture frontend, afin de vérifier que les choix de Melodia ne sont pas des idiosyncrasies isolées.

| Produit | Ce qu'il illustre | Rapprochement avec Melodia |
|---|---|---|
| VS Code | Architecture en couches stricte (workbench/services/contrib), extensibilité par contribution plutôt que par modification directe | Confirme la valeur d'une frontière Domain/Data imposée par la résolution de module plutôt que par convention seule ([[ARCHITECTURE.md]] §2) — VS Code l'impose via un système d'extension, Melodia via les frontières de packages npm |
| Spotify (client desktop) | Séparation stricte entre le moteur de lecture (natif, C++) et l'UI (web-based) | Rejoint la dégradation progressive du moteur audio de Melodia ([[ARCHITECTURE_PRINCIPLES.md]] §5) — la lecture ne dépend jamais d'une couche qui pourrait échouer indépendamment |
| Raycast | Architecture par extensions strictement isolées, chacune avec sa propre surface d'API | Le plus proche analogue du principe « une feature n'importe jamais l'intérieur d'une autre » ([[ARCHITECTURE.md]] §3bis) — Raycast l'impose à l'échelle plugin, Melodia à l'échelle module interne |
| Linear | State management local-first avec synchronisation optimiste en arrière-plan | Valide la séparation état serveur/état client de Melodia ([[ARCHITECTURE_PRINCIPLES.md]] §4) et la stratégie de cache local-first ([[DATA_LAYER.md]] §2) — Linear va plus loin (sync temps réel bidirectionnelle) que la stratégie *pull* déclenchée actuelle de Melodia ([[ARCHITECTURE_PRINCIPLES.md]] §3.3), un écart assumé et non une lacune (voir [[ROADMAP.md]] pour une éventuelle évolution future) |
| Nextcloud Desktop | Client auto-hébergé multi-plateforme avec moteur de synchronisation dédié, découplé de l'UI | Le rapprochement le plus direct avec la nature auto-hébergée de Melodia ([[PROJECT_CHARTER.md]] §1) — confirme la pertinence d'un module `sync` dédié et isolé plutôt qu'une synchronisation diffuse dans plusieurs features ([[ARCHITECTURE.md]] §3bis, §4 de [[MODULES.md]]) |
| Plexamp | Client musical pour serveur auto-hébergé (Plex), abstraction du serveur derrière une couche cliente propre | Le rapprochement produit le plus direct (même catégorie que Melodia) — confirme la nécessité d'une abstraction `MusicSource` qui isole le vocabulaire du serveur (Plex/Jellyfin) de la couche Domain ([[ARCHITECTURE_PRINCIPLES.md]] §2), déjà actée depuis la Phase 0 |

**Conclusion de la comparaison** : aucun des six produits ne contredit un choix déjà acté de l'architecture Melodia — la comparaison sert de validation plutôt que de découverte, à une exception notable near-miss : Linear pousse la synchronisation local-first plus loin (bidirectionnelle temps réel) que la stratégie *pull* actuelle de Melodia, différence déjà assumée explicitement dans [[ARCHITECTURE_PRINCIPLES.md]] §3.3 (ADR de synchronisation encore ouvert, voir [[EXTREME_SCENARIOS.md]] §5) plutôt que découverte ici pour la première fois.

## 6. État du dépôt à la fin de la Phase 0.5 (complément inclus)

- Aucun code applicatif écrit — voulu, cette phase reste documentaire (rappel des règles absolues de cadrage de cette phase).
- 32 documents fondateurs au total dans `docs/` (13 Phase 0 + 15 Phase 0.5 + 4 complément), tous cross-référencés, carte à jour dans [[DOCUMENTATION_GUIDE.md]] §1.
- Amendement notable : [[PERFORMANCE_BUDGET.md]] et [[CODING_STANDARDS.md]] ont chacun reçu un amendement documenté (bibliothèque de référence 200k, nichage monorepo) plutôt que d'être silencieusement contredits.
- Gaps identifiés honnêtement plutôt que masqués (voir [[EXTREME_SCENARIOS.md]] §5) : fixture de test au-delà de 200k titres non exécutée, ADR de synchronisation multi-appareils non rédigé. (Le troisième gap identifié — appareil de référence tablette absent — a été corrigé dans la foulée pendant l'auto-audit de cette phase, voir [[PERFORMANCE_BUDGET.md]] historique des révisions.)
- Ouvert avant d'entrer en Phase 1 : ADR de licence formel, initialisation effective du monorepo (squelette `apps/`/`packages/` vide, CI de base), résorption des deux gaps restants ci-dessus — voir [[ROADMAP.md]] Phase 1 et [[CHECKLISTS.md]].

## 7. Ce que ce blueprint ne remplace pas

Il ne contient aucun chiffre, aucune convention et aucune décision qui ne soit pas également présente dans son document source — le lire seul suffit pour s'orienter, mais toute implémentation doit référencer le document source correspondant, jamais ce résumé.

## 8. Checklist de validation

- [ ] Les cinq décisions structurantes (§2) restent exactes après toute modification d'un document source.
- [ ] Les chiffres qui font autorité (§4) sont identiques à leur source — vérifié à chaque relecture de phase ([[PROJECT_CHARTER.md]] §7).
- [ ] Les gaps listés en §6 sont retirés dès qu'ils sont résorbés, jamais laissés obsolètes silencieusement.
- [ ] Aucune nouvelle décision structurante n'apparaît ici sans exister d'abord dans son document source.

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | CTO |
| 0.2.0 | 2026-08-03 | Ajout de la section d'analyse transverse (complément Phase 0.5), mise à jour du compte de documents (28→32) et des gaps identifiés, ajout de la checklist de validation | CTO |
| 0.3.0 | 2026-08-04 | Phase 12 : ajout §5bis (analyse comparative de l'architecture logicielle contre VS Code/Spotify/Raycast/Linear/Nextcloud Desktop/Plexamp) | Principal Software Architect |

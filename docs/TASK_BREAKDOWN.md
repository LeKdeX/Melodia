# TASK_BREAKDOWN.md — Décomposition Story → Task → Subtask (Implementation Plan)

> **Statut** : document fondateur, vivant
> **Version** : 1.1.0
> **Date de création** : 2026-08-05
> **Propriétaire** : Staff Technical Lead
> **Documents liés** : [[FEATURES.md]], [[ENGINEERING_BACKLOG.md]], [[IMPLEMENTATION_CHECKLISTS.md]]

---

## 1. Méthodologie — rolling wave assumée explicitement

**Décision annoncée avant exécution** : ce document décompose intégralement les Features des 4 jalons fondateurs (M0-M3, EPIC-001 à EPIC-004, 18 Features depuis l'ajout de FEATURE-083, ADR-0002) jusqu'au niveau Task, avec le gabarit complet illustré sur un échantillon représentatif jusqu'au niveau Subtask. Les jalons M4-M14 restent au niveau Feature ([[FEATURES.md]]) jusqu'à leur tour — décomposés en Stories/Tasks selon le même gabarit (§2) **au début du jalon qui les précède immédiatement**, jamais tous en amont.

**Pourquoi** : une décomposition Subtask de la totalité de l'architecture documentée (229 documents) produirait plusieurs milliers de tâches spéculatives, dont la majorité serait invalidée par des détails d'implémentation découverts en cours de route (interfaces réelles, contraintes de bibliothèque, retours de M0-M3) — violation directe de YAGNI ([[ARCHITECTURE_PRINCIPLES.md]] §8bis) et de la même discipline déjà appliquée à chaque phase de documentation précédente (jamais anticiper au-delà d'un besoin réel). Le rolling wave planning (élaboration progressive) est une pratique reconnue, pas une omission — ce document rend le choix explicite plutôt que de prétendre à une exhaustivité qui serait fabriquée.

## 2. Convention d'identifiants

| Niveau | Format | Exemple |
|---|---|---|
| Story | `STORY-0NN` | `STORY-003` |
| Task | `TASK-0NN` | `TASK-006` |
| Subtask | `SUBTASK-0NN.N` | `SUBTASK-006.1` |

Séquentiel, stable, jamais réutilisé — cohérent avec [[EPICS.md]] §1.

## 3. Gabarit complet d'une Task

Chaque Task contient, sans exception :

```
### TASK-0NN — <Titre>
- **Story parente** : STORY-0NN
- **Objectif** : <une phrase, ce que la Task accomplit>
- **Contexte** : <pourquoi cette Task existe, quel besoin réel>
- **Documents de référence** : <wikilinks exacts>
- **Dépendances** : <Task(s)/Feature(s) qui doivent être terminées avant>
- **Prérequis** : <état du dépôt/environnement requis avant de commencer>
- **Résultat attendu** : <artefact concret produit>
- **Critères d'acceptation** : <liste vérifiable, jamais vague>
- **Risques** : <ce qui peut mal se passer, renvoi à TECHNICAL_RISKS.md si applicable>
- **Complexité** : XS / S / M / L / XL
- **Estimation** : <Story Points, justifiés>
- **Tests associés** : <type de test attendu, TESTING_STRATEGY.md>
- **Documentation impactée** : <document fondateur à mettre à jour, si applicable>
- **Definition of Done** : <renvoi DEFINITION_OF_DONE.md, sections applicables>
- **Subtasks** :
  - SUBTASK-0NN.1 — ...
  - SUBTASK-0NN.2 — ...
```

## 4. Échelle de complexité et d'estimation

| Taille | Story Points | Durée indicative | Lignes de code attendues |
|---|---|---|---|
| XS | 1 | < 2h | < 50 |
| S | 2 | 2-4h | 50-150 |
| M | 3 | 4-8h (une journée) | 150-350 |
| L | 5 | Dépassement — **toujours redécoupée avant d'entrer dans un sprint** | > 500 |
| XL | 8+ | Jamais une Task — c'est une Story mal découpée | N/A |

**Règle absolue du cadrage** : aucune Task L/XL n'entre en développement telle quelle — elle est redécoupée en plusieurs Tasks M ou moins avant d'être planifiée, cohérent avec l'objectif explicite de PR < 500 lignes.

---

## 5. Décomposition complète — EPIC-001 Architecture validée

### FEATURE-001 — Relecture finale de cohérence documentaire

**STORY-001 — Vérification de cohérence documentaire finale**

| Task | Titre | Complexité | Dépendances |
|---|---|---|---|
| TASK-001 | Exécuter la vérification automatisée des wikilinks/citations sur les 229 documents | XS | Aucune |
| TASK-002 | Revue croisée manuelle des 10 documents à plus forte cascade | S | TASK-001 |
| TASK-003 | Consolider les résultats dans un rapport final pré-implémentation | XS | TASK-002 |

### FEATURE-002 — Checklist pré-implémentation validée

**STORY-002 — Validation de la checklist de démarrage**

| Task | Titre | Complexité | Dépendances |
|---|---|---|---|
| TASK-004 | Vérifier l'application de [[DOCUMENTATION_CHECKLIST.md]] §1 à ce backlog | XS | TASK-003 |
| TASK-005 | Confirmation explicite que M0 est sorti | XS | TASK-004 |

---

## 6. Décomposition complète — EPIC-002 Workspace

### FEATURE-003 — Initialisation monorepo pnpm/Turborepo

**STORY-003 — Setup du monorepo**

| Task | Titre | Complexité | Dépendances |
|---|---|---|---|
| TASK-006 | Initialiser `pnpm-workspace.yaml` | XS | M0 sorti |
| TASK-007 | Configurer `turbo.json` (pipeline `build`/`lint`/`test`/`dev`) | S | TASK-006 |
| TASK-008 | Créer l'arborescence `apps/` (web/desktop/mobile) vide | XS | TASK-006 |

### FEATURE-004 — Squelette des 4 packages

**STORY-004 — Squelette `@melodia/core`** · TASK-009 (S) — `package.json`/tsconfig/dossiers `entities`/`data`/`search` vides, dépend de TASK-007.
**STORY-005 — Squelette `@melodia/ui`** · TASK-010 (S) — idem, dossier `components/` vide, dépend de TASK-007.
**STORY-006 — Squelette `@melodia/platform`** · TASK-011 (XS) — idem, dépend de TASK-007.
**STORY-007 — Squelette `@melodia/app`** · TASK-012 (S) — dossiers `app`/`features`/`shared`/`data`/`platform` vides ([[CODING_STANDARDS.md]] §1), dépend de TASK-007.

### FEATURE-005 — Configuration partagée

**STORY-008 — `packages/config`**

| Task | Titre | Complexité | Dépendances |
|---|---|---|---|
| TASK-013 | `tsconfig.base.json` (strict activé, [[TECH_STACK.md]] §1) | XS | TASK-009 à 012 |
| TASK-014 | ESLint partagé (dont `@typescript-eslint/no-explicit-any`, boundaries) | M | TASK-013 |
| TASK-015 | Preset Tailwind partagé | S | TASK-013 |

### FEATURE-006 — CI de base

**STORY-009 — Pipeline CI lint/typecheck**

| Task | Titre | Complexité | Dépendances |
|---|---|---|---|
| TASK-016 | Job GitHub Actions `lint` | S | TASK-014 |
| TASK-017 | Job GitHub Actions `typecheck` | S | TASK-013 |
| TASK-018 | Vérifier CI verte sur commit vide — clôture M1 | XS | TASK-016, TASK-017 |

---

## 7. Décomposition complète — EPIC-003 Fondations

### FEATURE-007 — Design Tokens

**STORY-010** · TASK-019 (M) tokens de couleur (v1, [[COLOR_SYSTEM.md]], non finaux) · TASK-020 (S) tokens typo/espacement/z-index, dépend de TASK-015.

### FEATURE-008 — Composants Foundation

**STORY-011** · TASK-021 (M) Button (variantes primary/secondary/danger, [[BUTTON_SPECIFICATION.md]]), dépend de TASK-019.
**STORY-012** · TASK-022 (M) Card · TASK-023 (M) TextField · TASK-024 (L→redécoupée : TASK-024a état/focus M + TASK-024b overlay/portal M) Dialog · TASK-025 (S) Toast · TASK-026 (M) Tabs — chacune dépend de TASK-019, [[COMPONENT_LIBRARY.md]] §2.

### FEATURE-009 — Linter d'architecture

**STORY-013** · TASK-027 (M) règles de frontières de package ([[ARCHITECTURE.md]] §2) · TASK-028 (M) règles de frontières de feature ([[ARCHITECTURE.md]] §3bis), dépend de TASK-014.

### FEATURE-010 — Stores de base

**STORY-014** · TASK-029 (S) `uiStore` ([[STORE_SPECIFICATIONS.md]] §2) · TASK-030 (M) `settingsStore` (hydratation `SettingsRepository` — mockée tant qu'EPIC-005 n'est pas sorti), dépend de TASK-009.

### FEATURE-011 — Routing de base

**STORY-015** · TASK-031 (M) TanStack Router, routes de premier niveau ([[FRONTEND_ARCHITECTURE.md]] §2) · TASK-032 (S) Suspense + Skeleton par route, dépend de TASK-031.

### FEATURE-012 — Composition racine

**STORY-016** · TASK-033 (S) `AppProviders` · TASK-034 (M) `ErrorBoundary` par route ([[FRONTEND_ARCHITECTURE.md]] §4), dépend de TASK-031.

### FEATURE-083 — Bootstrap de l'application (Web + Desktop)

> **Ajout ADR-0002** (`docs/adr/0002-application-bootstrap-gap.md`, Accepté) — gap de planification confirmé : aucune Task de M0-M14 ne créait le point d'entrée réel de l'application (`apps/web/vite.config.ts`, `apps/web/src/main.tsx`, `apps/desktop/src-tauri/`), pourtant déjà décrits comme faisant autorité dans [[ARCHITECTURE.md]] §1. Positionné après FEATURE-012 (et non dans EPIC-002) précisément parce que TASK-047 a besoin d'un arbre de composition réel (`AppProviders`/`ErrorBoundary`) à monter — placer ce Feature plus tôt aurait créé une dépendance croisée EPIC-002→EPIC-003, cassant la séquence stricte des Epics ([[EPICS.md]] §3). `apps/mobile` explicitement exclu, cohérent avec [[MVP_ROADMAP.md]] §3 (Mobile déjà différé à Phase 2, décision non remise en cause).

**STORY-023 — Bootstrap Web (Vite)**

| Task | Titre | Complexité | Dépendances |
|---|---|---|---|
| TASK-046 | `apps/web/vite.config.ts` (plugin React, plugin Tailwind v4 `@tailwindcss/vite` — cohérent ADR-0001, alias `@melodia/*` résolvant vers `packages/*`) | S | TASK-012, TASK-015 |
| TASK-047 | `apps/web/index.html` + `apps/web/src/main.tsx` — monte `AppProviders`/`ErrorBoundary` dans le DOM. Critère d'acceptation : `turbo dev` sert une page réelle sans erreur console | XS | TASK-046, TASK-033, TASK-034 |

**STORY-024 — Bootstrap Desktop (Tauri 2)**

| Task | Titre | Complexité | Dépendances |
|---|---|---|---|
| TASK-048 | `apps/desktop/src-tauri/` (`Cargo.toml`, `tauri.conf.json` → `frontendDist` pointant `apps/web`, fichier de capacités moindre-privilège, [[SECURITY_GUIDE.md]] §4) | M | TASK-047 |
| TASK-049 | Vérification empirique : `tauri dev` ouvre une fenêtre Desktop réelle affichant l'application | S | TASK-048 |

**Clôture révisée de M2** : le critère de sortie ([[MILESTONES.md]] §1) inclut désormais le rendu réel Web + Desktop — TASK-047 et TASK-049 en sont les dépendances directes de sortie, aux côtés de TASK-021 à 034 déjà actées.

---

## 8. Décomposition complète — EPIC-004 Connexion Jellyfin

### FEATURE-013 — Intégration SDK Jellyfin

**STORY-017** · TASK-035 (S) installation/config `@jellyfin/sdk` · TASK-036 (L→redécoupée : TASK-036a `getLibraries`/`getArtists` M, TASK-036b `getAlbums`/`getTracks` M), dépend de TASK-012.

### FEATURE-014 — Authentification

**STORY-018** · TASK-037 (M) flux nom d'utilisateur/mot de passe · TASK-038 (M) stockage du jeton (Stronghold/Keychain natif, mémoire Web, [[SECURITY_GUIDE.md]] §3bis) · TASK-039 (S) renouvellement silencieux, dépend de TASK-035.

### FEATURE-015 — DTO + Mappers

**STORY-019** · TASK-040 (M) `JellyfinTrackDto`/`AlbumDto`/`ArtistDto` ([[DTO_SPECIFICATION.md]]).
**STORY-020** · TASK-041 (M) Mappers correspondants ([[MAPPER_GUIDE.md]]), dépend de TASK-040.

### FEATURE-016 — Écran Connexion serveur

**STORY-021** · TASK-042 (M) écran Server Connection · TASK-043 (S) écran Authentication (fusionné, [[ONBOARDING_SCREENS.md]]), dépend de TASK-037, TASK-021 (Button).

### FEATURE-017 — Gestion des erreurs de connexion

**STORY-022** · TASK-044 (S) `MusicSourceError` typé ([[JELLYFIN_INTEGRATION.md]] §4) · TASK-045 (S) messages actionnables associés, dépend de TASK-036a/b.

**Clôture M3** : TASK-041, TASK-043, TASK-045 sont les trois dépendances directes de sortie du jalon (voir [[MILESTONES.md]] §1).

---

## 9. Exemples entièrement détaillés (gabarit complet appliqué)

### TASK-006 — Initialiser `pnpm-workspace.yaml`

- **Story parente** : STORY-003
- **Objectif** : Déclarer les packages du monorepo pour que pnpm résolve les dépendances inter-packages.
- **Contexte** : Fondation de tout le reste — aucune autre Task de EPIC-002+ ne peut commencer sans cette structure ([[STACK_DECISIONS.md]] §3, décision déjà actée).
- **Documents de référence** : [[ARCHITECTURE.md]] §1, [[STACK_DECISIONS.md]] §3
- **Dépendances** : Aucune (première Task du backlog après M0)
- **Prérequis** : Dépôt Git initialisé, Node/pnpm installés localement
- **Résultat attendu** : `pnpm-workspace.yaml` à la racine listant `apps/*` et `packages/*`
- **Critères d'acceptation** : `pnpm install` s'exécute sans erreur à la racine avec les dossiers `apps/`/`packages/` vides déjà créés (TASK-008 en parallèle)
- **Risques** : Aucun — Task triviale, aucune décision technique nouvelle
- **Complexité** : XS
- **Estimation** : 1 point — configuration déclarative sans logique
- **Tests associés** : Aucun (configuration pure, vérifiée par `pnpm install` lui-même)
- **Documentation impactée** : Aucune — l'arborescence est déjà documentée dans [[ARCHITECTURE.md]] §1
- **Definition of Done** : [[DEFINITION_OF_DONE.md]] section « Changement de configuration/CI » uniquement
- **Subtasks** :
  - SUBTASK-006.1 — Créer `pnpm-workspace.yaml` avec les patterns `apps/*`/`packages/*`
  - SUBTASK-006.2 — Vérifier `pnpm install` à la racine sans erreur

### TASK-014 — ESLint partagé

- **Story parente** : STORY-008
- **Objectif** : Fournir une configuration ESLint unique héritée par tous les packages, incluant les règles critiques déjà actées.
- **Contexte** : [[ENGINEERING_MANIFESTO.md]] §2 nomme `@typescript-eslint/no-explicit-any` comme règle bloquante de référence — cette Task l'active concrètement, pas seulement en principe.
- **Documents de référence** : [[CODING_STANDARDS.md]] §3, [[ENGINEERING_MANIFESTO.md]] §2, [[TYPESCRIPT_GUIDE.md]] §8, [[ACCESSIBILITY_GUIDE.md]] §9ter (`eslint-plugin-jsx-a11y`)
- **Dépendances** : TASK-013 (`tsconfig.base.json`)
- **Prérequis** : Packages squelettes créés (TASK-009 à 012)
- **Résultat attendu** : `packages/config/eslint-preset.js` (ou équivalent flat config), consommé par chaque package via extension
- **Critères d'acceptation** : `no-explicit-any` en erreur bloquante ; `eslint-plugin-jsx-a11y` actif ; ordre d'import imposé ([[CODING_STANDARDS.md]] §3) auto-fixable ; `eslint-plugin-boundaries` préparé (activé en TASK-027/028)
- **Risques** : Une règle trop stricte activée prématurément peut bloquer tout le reste du backlog — voir [[TECHNICAL_RISKS.md]] §2 (risque « fondation »)
- **Complexité** : M
- **Estimation** : 3 points — plusieurs règles à assembler et vérifier ensemble, pas une simple activation
- **Tests associés** : Aucun test automatisé propre — vérifié par l'exécution du lint lui-même sur un fichier d'exemple volontairement fautif
- **Documentation impactée** : Aucune — les règles sont déjà actées, cette Task les active
- **Definition of Done** : [[DEFINITION_OF_DONE.md]] section « Changement de configuration/CI »
- **Subtasks** :
  - SUBTASK-014.1 — Assembler la configuration `@typescript-eslint` stricte
  - SUBTASK-014.2 — Ajouter `eslint-plugin-jsx-a11y`
  - SUBTASK-014.3 — Configurer l'ordre d'import auto-fixable
  - SUBTASK-014.4 — Vérifier sur un fichier fautif volontaire (contient un `any`) que le lint échoue

### TASK-024 — Dialog (redécoupée : L → deux Tasks M)

> **Illustration de la règle absolue du cadrage** : Dialog estimé initialement L (composant complexe : focus trap, portal, superposition) — redécoupé avant planification, jamais laissé en L.

**TASK-024a — Dialog : état et focus**
- **Objectif** : Implémenter l'état ouvert/fermé et le piège de focus (focus trap) de Dialog.
- **Documents de référence** : [[OVERLAY_COMPONENTS.md]] (Dialog, spécification complète), [[ACCESSIBILITY_COMPONENTS.md]]
- **Dépendances** : TASK-021 (Button, pour les actions du Dialog)
- **Résultat attendu** : Composant `Dialog` avec gestion d'état et focus trap, sans le portal/superposition
- **Critères d'acceptation** : Focus piégé dans le Dialog tant qu'il est ouvert ; `Échap` ferme le Dialog ; focus restauré à l'élément déclencheur à la fermeture
- **Complexité** : M — 3 points
- **Tests associés** : Composant (RTL), navigation clavier
- **Definition of Done** : [[DEFINITION_OF_DONE.md]] sections Code/Tests/Accessibilité

**TASK-024b — Dialog : portal et superposition**
- **Objectif** : Rendre Dialog au-dessus du reste de l'application via portal, avec z-index et backdrop.
- **Documents de référence** : [[DESIGN_TOKENS.md]] §3 (échelle de z-index), [[OVERLAY_COMPONENTS.md]]
- **Dépendances** : TASK-024a
- **Résultat attendu** : Dialog rendu via `createPortal`, backdrop cliquable pour fermer
- **Critères d'acceptation** : Dialog toujours au-dessus du contenu de la page ; backdrop ferme au clic ; jamais de scroll de la page sous-jacente pendant l'ouverture
- **Complexité** : M — 3 points
- **Tests associés** : Composant (RTL), visuel
- **Definition of Done** : [[DEFINITION_OF_DONE.md]] sections Code/Tests/Design

---

## 10. Ce que ce document ne fait pas

- Ne décompose pas M4-M14 au-delà du niveau Feature (voir [[FEATURES.md]], rolling wave §1).
- Ne redéfinit pas les Features elles-mêmes (voir [[FEATURES.md]]).
- Ne recalcule pas le chemin critique (voir [[DEPENDENCY_GRAPH.md]]).

## 11. Checklist de validation

- [ ] Aucune Task L/XL n'entre en planification sans être redécoupée (§4, §9 exemple TASK-024).
- [ ] Chaque Task de M0-M3 a ses dépendances déclarées et cohérentes avec [[DEPENDENCY_GRAPH.md]].
- [ ] Le rolling wave pour M4-M14 reste explicite, jamais présenté comme une décomposition complète déjà faite.

## 12. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-05 | Création initiale du document (Implementation Plan) — 45 Tasks décomposées pour M0-M3 | Staff Technical Lead |
| 1.1.0 | 2026-08-05 | ADR-0002 : ajout de FEATURE-083 (STORY-023/024, TASK-046 à 049) — gap de planification corrigé, 49 Tasks décomposées pour M0-M3 | Staff Technical Lead |

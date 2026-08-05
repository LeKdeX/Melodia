# DESIGN_SYSTEM_ARCHITECTURE.md — Architecture du design system (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 0.3.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Lead Product Designer / Lead Frontend Engineer
> **Documents liés** : [[TECH_STACK.md]] §1, [[PROJECT_CHARTER.md]] §3.4, [[ARCHITECTURE.md]] §2

Ce document est l'architecture technique concrète du package `@melodia/ui` ([[ARCHITECTURE.md]] §2), construit sur Tailwind CSS + Radix UI déjà décidés en Phase 0 ([[TECH_STACK.md]] §1). Il ne redéfinit pas le choix de ces bibliothèques, seulement comment elles s'assemblent en système.

---

## 1. Design tokens

> **ADR-0001** (`docs/adr/0001-tailwind-v4-theme-mechanism.md`, Accepté 2026-08-05) a précisé le mécanisme technique ci-dessous — Tailwind CSS v4 CSS-first, aucune couche de compatibilité v3. Ne redécide rien d'autre dans ce document.

- **Format** : tokens définis comme extension native du thème Tailwind (blocs `@theme` CSS, Tailwind CSS v4) pour les valeurs statiques (échelle d'espacement, rayons, typographie), et comme variables CSS personnalisées (`--color-accent`, `--color-surface`) pour tout ce qui doit changer à l'exécution (thème clair/sombre, accent utilisateur).
- **Catégories** : couleur (sémantique — `surface`, `border`, `accent`, `danger` — jamais de nom lié à une teinte brute comme `blue-500` utilisé directement dans un composant), espacement, typographie (échelle modulaire), rayon de bordure, ombre, durée/courbe d'animation (cohérent avec les primitives Motion de [[TECH_STACK.md]] §1).
- **Source unique** : les tokens vivent dans `packages/ui/src/tokens/`, jamais dupliqués ou redéfinis localement dans une feature de `@melodia/app` (cohérent avec [[ENGINEERING_GUIDE.md]] §1.3).

## 2. Theming

- Thème clair/sombre piloté par variables CSS personnalisées + `prefers-color-scheme` par défaut, avec préférence utilisateur explicite prioritaire (stockée dans `preferencesStore`, voir [[CODING_STANDARDS.md]] §4.3).
- Un changement de thème ne doit jamais provoquer de re-render de l'arbre de composants React (variables CSS pures, pas de contexte React re-render sur changement de thème) — cohérent avec le budget de re-renders ([[PERFORMANCE_BUDGET.md]] §6).

## 3. Architecture des composants

- Chaque composant du design system compose une primitive Radix UI (accessibilité résolue une fois) avec des classes Tailwind pilotées par une API de variantes typée.
- **Décision retenue : `class-variance-authority` (cva)** pour définir les variantes de composant (taille, intention, état), plutôt que des props booléennes en éventail.
  - **Pourquoi** : évite exactement l'anti-pattern identifié dans [[ENGINEERING_GUIDE.md]] §1.8 (props booléennes multiples non structurées) ; l'API de variantes reste typée de bout en bout (cohérent avec TypeScript strict, [[TECH_STACK.md]] §1) et prévisible d'un composant à l'autre (cohérent avec [[ENGINEERING_GUIDE.md]] §1.7, API cohérentes).
- Un composant du design system ne contient **jamais** de logique métier ni d'appel à `@melodia/core` — uniquement des props et des callbacks (rappel de [[CODING_STANDARDS.md]] §4.1).

## 4. Variantes et responsive

- Variantes définies une fois par composant (`size: 'sm' | 'md' | 'lg'`, `intent: 'default' | 'danger' | 'accent'`), jamais recréées localement dans une feature.
- Breakpoints Tailwind standards, complétés par un breakpoint `tablet` dédié pour le layout intermédiaire exigé par [[TECH_STACK.md]] §2 (résolutions et formats) — un composant qui a besoin d'un comportement différent en tablette le déclare explicitement, jamais par une supposition implicite basée sur la largeur mobile.

## 5. Accessibilité intégrée à l'API des composants

- Tout composant interactif exige ses props d'accessibilité au niveau du type TypeScript (ex. un composant `IconButton` requiert `aria-label` en prop obligatoire, pas optionnelle) — l'accessibilité est appliquée par le compilateur, pas seulement rappelée en revue.
- États de focus visibles par défaut sur chaque composant interactif, jamais supprimés par une réinitialisation de style globale (`outline: none` sans remplacement est interdit, vérifié en revue selon [[DEFINITION_OF_DONE.md]]).
- Respect de `prefers-reduced-motion` : toute animation Motion ([[TECH_STACK.md]] §1) bascule sur une transition instantanée ou minimale quand cette préférence système est active — géré au niveau du design system, pas réimplémenté par feature.

## 6. Documentation vivante

Chaque composant du design system est documenté et testé visuellement dans Storybook ([[TECH_STACK.md]] §1), avec au minimum : les variantes, un test de contraste, un test de navigation clavier isolé. Un composant sans entrée Storybook n'est pas considéré comme faisant partie du design system au sens de [[PROJECT_CHARTER.md]] §3.4 (100 % des composants d'interface proviennent du design system versionné).

---

## 7. Checklist de validation

- [ ] Les tokens couvrent tous les cas d'usage identifiés (couleur, espacement, typographie, rayon, ombre, mouvement) sans valeur codée en dur autorisée ailleurs.
- [ ] Le comportement responsive (petit écran, grand écran, tactile, 4K, tablette) est validé dans [[EXTREME_SCENARIOS.md]] §4.
- [ ] Le risque de régression d'accessibilité lors d'une mise à jour Radix est couvert dans [[RISK_REGISTER_TECHNICAL.md]] §7.
- [ ] L'architecture de composants reste compatible avec une éventuelle interface Android TV (focus D-pad) — voir [[EVOLVABILITY.md]] §3, non implémentée mais non bloquée.

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | Lead Product Designer / Lead Frontend Engineer |
| 0.2.0 | 2026-08-03 | Ajout de la checklist de validation et des renvois vers les documents du complément Phase 0.5 | Lead Product Designer / Lead Frontend Engineer |
| 0.3.0 | 2026-08-05 | ADR-0001 (Accepté) : §1 mis à jour — mécanisme des tokens statiques passé de `tailwind.config` (v3) au natif `@theme` CSS (Tailwind v4) | Staff Software Engineer |

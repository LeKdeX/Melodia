# DESIGN_SYSTEM.md — Source de vérité unique de l'interface (Phase 5)

> **Statut** : document fondateur, vivant — capstone de Phase 5
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Principal Design System Architect
> **Documents liés** : tous les documents listés en §4

> **Cadrage** : ce document est le point d'entrée officiel du Design System — il pose les règles absolues non négociables, résout une contradiction identifiée dans le cadrage de cette phase, et cartographie l'ensemble des documents qui composent le système (ceux de cette phase et ceux des phases précédentes qu'elle organise). Il ne redécide aucune valeur déjà actée ailleurs.

---

## 1. Statut de ce système

Aucun composant d'interface n'est développé sans respecter cette documentation — cohérent avec l'exigence déjà actée dans [[PROJECT_CHARTER.md]] §3.4 (100 % des composants d'interface proviennent du design system versionné) et [[DESIGN_SYSTEM_ARCHITECTURE.md]] §6 (un composant sans entrée Storybook n'est pas considéré comme faisant partie du système). Ce document et ceux qu'il cartographie (§4) constituent, ensemble, l'unique source de vérité — un composant qui diverge d'une règle ici doit faire évoluer la règle (via la gouvernance, [[DESIGN_TOKENS.md]] §6) plutôt que la contourner silencieusement.

## 2. Résolution d'une contradiction du cadrage

Le cadrage de cette phase donne comme exemple illustratif de règle absolue : « jamais plus de deux niveaux d'élévation ». Cette formulation contredit une décision déjà actée et justifiée : [[SURFACE_SYSTEM.md]] §3 définit cinq niveaux d'élévation (0 à 4), avec la justification explicite que réduire à moins de niveaux ne permettrait pas de distinguer Cards/Panels (niveau 1), Popovers/Menus (niveau 2) et Dialogs/Sheets (niveau 3) de façon cohérente. Cette phase tranche en faveur de la règle déjà actée : **cinq niveaux d'élévation maximum (0-4), jamais deux** — l'exemple du cadrage est traité comme une formulation illustrative du principe général (« un nombre fermé et restreint de niveaux »), pas comme une valeur littérale à appliquer. Documenté ici explicitement plutôt que résolu en silence, cohérent avec [[DOCUMENTATION_GUIDE.md]] §5.

## 3. Règles absolues

1. **Jamais de couleur codée en dur** — toute couleur provient d'un rôle nommé ([[COLOR_SYSTEM.md]] §6bis), jamais d'une valeur hexadécimale directe dans un composant.
2. **Jamais de rayon arbitraire** — uniquement les tokens `radius-sm/md/lg/full` déjà actés ([[DESIGN_TOKENS.md]] §2).
3. **Jamais de typographie improvisée** — chaque texte utilise un rôle sémantique nommé ([[TYPOGRAPHY_GUIDE.md]] §4bis), jamais une taille ou une graisse choisie au cas par cas.
4. **Jamais deux espacements différents dans un même groupe visuel** — rappel direct de [[SPACING_SYSTEM.md]] §6.
5. **Jamais plus de cinq niveaux d'élévation** — voir résolution §2 ci-dessus.
6. **Toujours utiliser les tokens** — aucune valeur visuelle n'existe en dehors de [[DESIGN_TOKENS.md]], cohérent avec [[FOUNDATIONS.md]] §4.
7. **Jamais de style local qui contourne le système** — cohérent avec [[FOUNDATIONS.md]] §6.
8. **Jamais de composant sans accessibilité résolue** — cohérent avec [[FOUNDATIONS.md]] §7.

Ces huit règles sont vérifiées en revue de code au même titre que [[DEFINITION_OF_DONE.md]] — une PR qui les enfreint n'est pas mergeable sans dérogation documentée (ADR, [[ADR_TEMPLATE.md]]).

## 4. Carte complète du Design System

### Documents de cette phase (nouveaux)

| Document | Rôle |
|---|---|
| [[FOUNDATIONS.md]] | Constitution — principes qui gouvernent toute décision future |
| [[SPACING_SYSTEM.md]] | Règles d'usage de l'espacement par contexte |
| [[COMPOSING_RULES.md]] | Patterns de composition de layout (Container à Master-Detail) |

### Documents étendus en Phase 5

| Document | Ajout Phase 5 |
|---|---|
| [[DESIGN_TOKENS.md]] | §6bis catégories Breakpoint/Container/Grid, §6 gouvernance/versioning |
| [[LAYOUT_SYSTEM.md]] | §3bis/§3ter grilles laptop/ultra-wide, §8 conteneurs |
| [[TYPOGRAPHY_GUIDE.md]] | §4bis hiérarchie sémantique complète (10 rôles) |
| [[COLOR_SYSTEM.md]] | §6bis rôles de fond et tokens d'état hover/pressed/disabled/focus |
| [[RESPONSIVE_GUIDE.md]] | §7bis règle générale de priorité et de masquage |

### Documents des phases précédentes, organisés par ce système (non modifiés)

| Document | Rôle dans le Design System |
|---|---|
| [[DESIGN_SYSTEM_ARCHITECTURE.md]] | Implémentation technique (Tailwind, Radix, cva, Storybook) |
| [[ICONOGRAPHY_GUIDE.md]] | Système d'icônes — déjà complet, aucune extension nécessaire |
| [[SURFACE_SYSTEM.md]] | Système d'élévation — déjà complet, voir résolution §2 |
| [[ACCESSIBILITY_GUIDE.md]] | Règles d'accessibilité transverses — déjà complet |
| [[MOTION_GUIDELINES.md]] | Tokens et système de mouvement — déjà complet (étendu en Phase 2 et Phase 4) |
| [[ANIMATION_LIBRARY.md]] | Catalogue des animations nommées |

## 5. Pourquoi certains livrables demandés n'ont pas de nouveau fichier

`GRID_SYSTEM.md`, `TYPOGRAPHY_SYSTEM.md`, `RESPONSIVE_SYSTEM.md` → extensions des documents existants du même sujet (§4). `ICON_SYSTEM.md`, `ACCESSIBILITY_SYSTEM.md`, `MOTION_TOKENS.md`, `ELEVATION_SYSTEM.md` → couverts intégralement par des documents déjà complets, aucune extension n'a été nécessaire après vérification (une extension aurait ajouté du texte sans ajouter d'information). Le détail de chaque décision est documenté dans l'historique des révisions du document concerné.

## 6. Évolutivité pluriannuelle

Ce système est conçu pour rester cohérent après plusieurs années d'évolution par plusieurs contributeurs, via trois mécanismes déjà en place : la gouvernance de tokens ([[DESIGN_TOKENS.md]] §6, rien n'est modifié ou supprimé silencieusement), la procédure de résolution de cas non couverts ([[FOUNDATIONS.md]] §9, un nouveau cas devient un précédent documenté plutôt qu'une exception locale), et la règle de non-réinvention des patterns de composition ([[COMPOSING_RULES.md]] §9, un besoin est d'abord vérifié contre l'existant). Un système qui grossit sans ces trois mécanismes perd sa cohérence en quelques mois, pas en quelques années — ce sont eux, pas la richesse initiale du système, qui garantissent sa tenue dans le temps.

---

## 7. Checklist de validation

- [ ] Chaque règle absolue (§3) est vérifiable objectivement en revue, pas seulement une intention.
- [ ] La contradiction du cadrage (§2) est résolue explicitement, jamais tranchée en silence.
- [ ] La carte (§4) référence tous les documents réellement concernés par le Design System, aucun oublié.
- [ ] Aucune règle ici ne contredit un document qu'elle référence.

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document, capstone de la Phase 5 | Principal Design System Architect |

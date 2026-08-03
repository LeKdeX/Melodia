# DESIGN_TOKENS.md — Architecture des design tokens (Phase 2, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Senior Visual Designer / UI Art Director
> **Documents liés** : [[DESIGN_SYSTEM_ARCHITECTURE.md]] §1, [[COLOR_SYSTEM.md]], [[MOTION_GUIDELINES.md]]

> **Cadrage** : [[DESIGN_SYSTEM_ARCHITECTURE.md]] §1 a déjà décidé la nature technique des tokens (extension de thème Tailwind pour le statique, variables CSS pour le dynamique). Ce document ajoute les catégories manquantes et la convention de nommage complète — il ne redécide pas le mécanisme technique.

---

## 1. Convention de nommage

`{catégorie}-{rôle}-{variante?}-{état?}` — ex. `color-surface-raised`, `spacing-component-md`, `shadow-elevation-2`. Cohérent avec les alias de couche déjà actés ([[CODING_STANDARDS.md]] §3), jamais un nom de token qui référence une valeur brute (`color-purple-500` est interdit — voir [[ENGINEERING_MANIFESTO.md]] §2, anti-pattern des styles codés en dur).

## 2. Catégories de tokens

| Catégorie | Exemples de rôles | Source de valeurs |
|---|---|---|
| Color | `surface`, `border`, `accent`, `danger`, `text-primary`, `text-secondary` | [[COLOR_SYSTEM.md]] |
| Spacing | `component-xs/sm/md/lg/xl`, `layout-gutter` | [[LAYOUT_SYSTEM.md]] |
| Radius | `sm` (contrôles), `md` (cartes), `lg` (modales), `full` (pastilles) | [[SURFACE_SYSTEM.md]] |
| Shadow | `elevation-0` à `elevation-4` | [[SURFACE_SYSTEM.md]] §3 |
| Blur | `surface-glass`, `background-ambient` | [[SURFACE_SYSTEM.md]] §5 |
| Elevation | Combinaison shadow + z-index + opacité de fond, par niveau (0-4) | [[SURFACE_SYSTEM.md]] §3 |
| Opacity | `disabled` (0.4), `hover-overlay` (0.08), `scrim` (0.6) | Valeurs indicatives, à valider visuellement |
| Border | `hairline` (1px), `emphasis` (2px, focus) | [[ACCESSIBILITY_GUIDE.md]] §5 |
| Animation | `duration-micro/standard/complex/ambiance`, `easing-entrance/exit/standard/emphasis` | [[MOTION_GUIDELINES.md]] §1-2 (déjà décidé, référencé ici) |
| Typography | `heading-lg`, `body-md`, `caption` | [[TYPOGRAPHY_GUIDE.md]] |
| Icon | `size-sm/md/lg`, `stroke-width` | [[ICONOGRAPHY_GUIDE.md]] |
| Z-index | `base`, `sticky`, `overlay`, `modal`, `toast` (échelle fixe, jamais de valeur arbitraire ponctuelle) | §3 |

## 3. Échelle de z-index (fixe, non extensible sans ADR)

```
base:      0
sticky:    10   (navigation persistante, lecteur — PLAYER_SPECIFICATION.md §2)
dropdown:  20
overlay:   30   (bannières — ERROR_EXPERIENCE.md §2)
modal:     40
toast:     50   (jamais recouvert par autre chose)
```

**Pourquoi une échelle fixe** : un z-index ponctuel ajouté au fil du développement crée une dette de superposition impossible à raisonner globalement — cohérent avec [[ENGINEERING_GUIDE.md]] §1.3 (non-duplication) appliqué à la gestion de couches.

## 4. Échelle d'espacement

Base 4px, progression : 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 — une seule échelle pour toute l'application, jamais une valeur hors échelle sans justification documentée (cohérent avec [[ENGINEERING_MANIFESTO.md]] §2, espacement arbitraire interdit).

## 5. Résolution des tokens par thème

Les tokens de catégorie Color résolvent différemment selon le thème actif ([[THEMES_GUIDE.md]]) via variables CSS ; toutes les autres catégories (spacing, radius, animation...) restent identiques quel que soit le thème — seule la couleur change, jamais la géométrie ou le rythme d'animation, pour que le changement de thème ne soit jamais perçu comme un changement de produit.

---

## 6. Checklist de validation

- [ ] Chaque catégorie demandée dans le cadrage est présente.
- [ ] Aucun token ne référence une valeur brute dans son nom.
- [ ] L'échelle de z-index reste fermée, toute extension nécessite un ADR.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 2, volume 2) | Senior Visual Designer / UI Art Director |

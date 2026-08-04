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
| Animation (= « Motion Tokens ») | `duration-micro/standard/complex/ambiance`, `easing-entrance/exit/standard/emphasis` | [[MOTION_GUIDELINES.md]] §1-2, §12ter (déjà décidé, référencé ici) — nommée « Motion Tokens » dans un cadrage antérieur, il s'agit de la même catégorie, jamais de deux systèmes parallèles |
| Typography | `heading-lg`, `body-md`, `caption` | [[TYPOGRAPHY_GUIDE.md]] |
| Icon | `size-sm/md/lg`, `stroke-width` | [[ICONOGRAPHY_GUIDE.md]] |
| Z-index | `base`, `sticky`, `overlay`, `modal`, `toast` (échelle fixe, jamais de valeur arbitraire ponctuelle) | §3 |
| Breakpoint | `phone-sm`, `phone-lg`, `tablet`, `desktop`, `ultra-wide`, `4k` (échelle fixe) | [[RESPONSIVE_GUIDE.md]] §1 |
| Container | `container-sm/md/lg/xl/full` — largeur maximale de contenu par contexte | [[LAYOUT_SYSTEM.md]] §8 |
| Grid | `grid-columns-{4\|8\|12}`, `grid-gutter-{sm\|md\|lg}` — résolvent selon la grille active | [[LAYOUT_SYSTEM.md]] §1-3, §6bis |

## 3. Échelle de z-index (fixe, non extensible sans ADR)

```
base:      0
sticky:    10   (navigation persistante, lecteur — PLAYER_SPECIFICATION.md §2)
dropdown:  20
overlay:   30   (bannières — ERROR_EXPERIENCE.md §2)
modal:     40
toast:     50   (jamais recouvert par le contenu de l'application — dropdown/overlay/modal)
tooltip:   60   (le plus haut de l'échelle — voir résolution ci-dessous)
```

**Résolution d'une incohérence identifiée en auto-revue Phase 6** : [[SURFACE_SYSTEM.md]] §6 affirme depuis la Phase 2 que Tooltip est « toujours au-dessus de tout le reste » (élévation 4, la plus haute de cette échelle-là), alors que cette échelle de z-index ne comportait jusqu'ici aucun niveau `tooltip` et présentait `toast` comme jamais recouvert — les deux affirmations étaient en tension dès qu'un Tooltip et un Toast pouvaient apparaître simultanément à l'écran. Tranché en faveur de [[SURFACE_SYSTEM.md]] §6 (antérieur et déjà justifié) : un Tooltip répond à une question active de l'utilisateur (« qu'y a-t-il sous mon curseur/focus ») et ne doit donc jamais être masqué, y compris par un Toast déjà affiché — `tooltip` devient le niveau le plus élevé de l'échelle. La garantie de `toast` (« jamais recouvert ») reste valable vis-à-vis de tout le contenu applicatif (dropdown/overlay/modal), seul le cas rare et volontaire du Tooltip fait exception.

**Pourquoi une échelle fixe** : un z-index ponctuel ajouté au fil du développement crée une dette de superposition impossible à raisonner globalement — cohérent avec [[ENGINEERING_GUIDE.md]] §1.3 (non-duplication) appliqué à la gestion de couches.

## 4. Échelle d'espacement

Base 4px, progression : 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 — une seule échelle pour toute l'application, jamais une valeur hors échelle sans justification documentée (cohérent avec [[ENGINEERING_MANIFESTO.md]] §2, espacement arbitraire interdit).

## 5. Résolution des tokens par thème

Les tokens de catégorie Color résolvent différemment selon le thème actif ([[THEMES_GUIDE.md]]) via variables CSS ; toutes les autres catégories (spacing, radius, animation...) restent identiques quel que soit le thème — seule la couleur change, jamais la géométrie ou le rythme d'animation, pour que le changement de thème ne soit jamais perçu comme un changement de produit.

## 6. Gouvernance et versioning (ajout Phase 5)

> Section ajoutée pour que les tokens restent utilisables sans dérive pendant plusieurs années, cohérent avec l'objectif d'un Design System de niveau industriel ([[DESIGN_SYSTEM.md]] §1).

- **Ajout d'un token** : ne nécessite pas d'ADR si la valeur reste dans une catégorie et une échelle déjà actées (ex. un nouveau rôle de couleur sémantique). Nécessite un ADR si la modification introduit une nouvelle catégorie ou change une échelle existante (ex. ajouter un huitième niveau d'élévation) — cohérent avec [[ADR_TEMPLATE.md]].
- **Modification d'un token existant** : jamais silencieuse — toute valeur modifiée est documentée dans l'historique des révisions de ce document avec la justification, et un changement de valeur qui casse un contraste déjà validé ([[ACCESSIBILITY_GUIDE.md]] §3) est traité comme un changement cassant, jamais un ajustement mineur.
- **Suppression d'un token** : jamais suppression directe — un token déprécié est marqué comme tel dans ce document pendant une période de transition avant retrait, pour laisser le temps aux composants qui le consomment d'être migrés (cohérent avec [[GIT_WORKFLOW.md]], pas de changement cassant sans période de dépréciation).
- **Un seul propriétaire par catégorie** (tableau §2) tranche en cas de proposition contradictoire — cohérent avec [[DOCUMENTATION_GUIDE.md]] §3.

---

## 7. Checklist de validation

- [ ] Chaque catégorie demandée dans le cadrage est présente.
- [ ] Aucun token ne référence une valeur brute dans son nom.
- [ ] L'échelle de z-index reste fermée, toute extension nécessite un ADR.
- [ ] Chaque règle de gouvernance (§6) est applicable telle quelle par un contributeur externe à l'équipe fondatrice.

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 2, volume 2) | Senior Visual Designer / UI Art Director |
| 0.2.0 | 2026-08-03 | Phase 5 : ajout des catégories Breakpoint/Container/Grid, clarification Motion≡Animation, ajout §6 gouvernance/versioning | Design Token Specialist |
| 0.3.0 | 2026-08-04 | Auto-revue Phase 6 : ajout du niveau `tooltip` à l'échelle de z-index (§3), résolution d'une incohérence avec SURFACE_SYSTEM.md §6 identifiée en relecture | Principal Design System Architect |

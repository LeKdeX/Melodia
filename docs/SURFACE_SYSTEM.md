# SURFACE_SYSTEM.md — Système de surfaces (Phase 2, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : UI Art Director / Senior Visual Designer
> **Documents liés** : [[VISUAL_DIRECTION.md]] §6, [[DESIGN_TOKENS.md]], [[ERROR_EXPERIENCE.md]]

---

## 1. Inventaire des surfaces

Background · Cards · Panels · Dialogs (modales) · Menus (contextuels) · Popovers · Tooltips · Sheets (panneaux latéraux/inférieurs) · Overlays (bannières, scrims).

## 2. Principe général

Chaque surface a un niveau d'élévation fixe (§3) qui détermine simultanément son ombre, son fond et sa position dans l'échelle de z-index ([[DESIGN_TOKENS.md]] §3) — les trois varient toujours ensemble, jamais indépendamment (une surface ne peut pas avoir l'ombre du niveau 3 et le z-index du niveau 1).

## 3. Niveaux d'élévation

| Niveau | Ombre (`shadow-elevation-N`) | Exemple de surface |
|---|---|---|
| 0 | Aucune | Background |
| 1 | Très subtile (1px, faible opacité) | Cards, Panels |
| 2 | Légère | Popovers, Menus contextuels |
| 3 | Modérée | Sheets, Dialogs |
| 4 | Prononcée (rare) | Tooltip flottant au-dessus d'une modale déjà ouverte |

**Règle** : jamais plus de 5 niveaux — au-delà, la hiérarchie perceptuelle devient indiscernable pour l'utilisateur (cohérent avec [[VISUAL_DIRECTION.md]] §3, trois niveaux de hiérarchie visuelle maximum par vue).

## 4. Ombres

Douces et diffuses (rayon de flou large, opacité faible ~8-12%), jamais une ombre dure et nette qui évoquerait un skeuomorphisme daté — cohérent avec [[VISUAL_DIRECTION.md]] §6.

## 5. Flou (glass/blur)

Réservé aux surfaces temporairement superposées à du contenu riche (menu contextuel au-dessus d'une grille de pochettes, sheet du lecteur au-dessus de l'arrière-plan dynamique — [[COLOR_SYSTEM.md]] §6) — jamais sur une surface permanente de navigation, où la lisibilité prime sur l'effet. Intensité modérée : le contenu derrière reste devinable, jamais totalement illisible.

## 6. Profondeur par surface

| Surface | Élévation | Flou | Notes |
|---|---|---|---|
| Cards | 1 | Non | Contenu principal de la bibliothèque |
| Panels | 1 | Non | File d'attente, paramètres |
| Dialogs | 3 | Léger sur le scrim de fond, jamais sur la modale elle-même | Confirmation d'action destructive ([[PRODUCT_RULES.md]] §7) |
| Menus | 2 | Non | Menus contextuels ([[INTERACTION_GUIDELINES.md]] §3) |
| Popovers | 2 | Non | Info-bulles étendues |
| Tooltips | 4 | Non | Toujours au-dessus de tout le reste |
| Sheets | 3 | Léger si superposé à l'arrière-plan dynamique du lecteur | Lecteur étendu mobile ([[PLAYER_SPECIFICATION.md]] §2) |
| Overlays (bannières) | 2 | Non | [[ERROR_EXPERIENCE.md]] §2 |

## 7. Coins

Rayon croissant avec l'élévation : surfaces de faible élévation (cards, panels) utilisent `radius-md`, surfaces flottantes (dialogs, sheets) utilisent `radius-lg` — une surface qui flotte davantage visuellement « se détache » aussi par une géométrie plus douce.

---

## 8. Checklist de validation

- [ ] Chaque surface de l'inventaire (§1) a un niveau d'élévation assigné explicitement.
- [ ] Ombre, fond et z-index varient toujours ensemble selon le niveau, jamais indépendamment.
- [ ] Le flou reste réservé aux surfaces temporaires, jamais appliqué à la navigation permanente.

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 2, volume 2) | UI Art Director / Senior Visual Designer |

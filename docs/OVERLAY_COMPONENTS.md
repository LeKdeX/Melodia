# OVERLAY_COMPONENTS.md — Composants superposés (Phase 6)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Senior UI Engineer / Accessibility Specialist
> **Documents liés** : [[COMPONENT_LIBRARY.md]], [[SURFACE_SYSTEM.md]], [[DIALOG_LIBRARY.md]]

> **Cadrage** : `Dialog` est spécifié en profondeur complète. Les autres composants superposés (Modal, BottomSheet, Tooltip, Popover, Dropdown, Menu, ContextMenu) sont compacts, avec renvoi vers [[SURFACE_SYSTEM.md]] §6 pour les niveaux d'élévation déjà assignés à chacun et vers [[ACCESSIBILITY_COMPONENTS.md]] §2 pour la gestion de focus commune.

---

# Dialog (spécification complète)

## 1. Présentation

- **Objectif** : obtenir une décision explicite de l'utilisateur avant de continuer.
- **Contexte** : confirmation destructive ([[DIALOG_LIBRARY.md]]), formulaire court bloquant.
- **Valeur utilisateur** : garantit qu'une action irréversible n'a jamais lieu sans intention confirmée.
- **Quand utiliser** : décision qui doit interrompre la tâche en cours ([[ERROR_EXPERIENCE.md]] §3, seul cas où l'interruption est justifiée).
- **Quand ne pas utiliser** : simple information (utiliser Toast/Banner) ; sélection de contenu longue (utiliser BottomSheet ou une page dédiée).
- **Alternatives** : Toast pour une confirmation non bloquante, BottomSheet pour un contenu plus long sur mobile.

## 2. Anatomie

```
        [ Scrim de fond ]
   ┌─────────────────────────┐
   │ Titre                   │
   │ Corps (1-2 phrases)     │
   │        [Annuler] [Action]│
   └─────────────────────────┘
```

Scrim (fond assombri, capture les clics extérieurs sans les transmettre), conteneur (élévation 3, [[SURFACE_SYSTEM.md]] §6), titre (rôle Title), corps (rôle Body), actions (toujours deux boutons maximum — Annuler + Action, jamais trois choix qui diluent la décision, cohérent avec [[DIALOG_LIBRARY.md]] sauf le cas explicite de déconnexion à trois options).

## 3. Variantes

Standard (information/confirmation), Destructive (`role="alertdialog"`, bouton d'action en variante Danger), Formulaire court (contient un TextField, jamais plus d'un champ — au-delà, une page dédiée est plus appropriée).

## 4. États

Fermé (non monté), Ouvrant (animation d'entrée), Ouvert, Fermant (animation de sortie) — voir §8. Pas d'état Loading propre : une action en cours dans un Dialog désactive ses boutons (état Disabled hérité de Button) plutôt que d'introduire un nouvel état.

## 5. Responsive

Desktop/Tablette : centré, largeur `container-sm`. Mobile : peut se transformer en BottomSheet plein-largeur si le contenu est plus long qu'une confirmation simple (décision par composant consommateur, pas automatique).

## 6. Accessibilité

`role="alertdialog"` pour les variantes destructives, `role="dialog"` sinon ([[ACCESSIBILITY_COMPONENTS.md]] §6). Focus piégé à l'ouverture sur le premier élément interactif (jamais le bouton destructif par défaut — le focus initial est toujours sur Annuler ou le premier champ, jamais sur l'action irréversible), restitué à la fermeture.

## 7. Design Tokens

Élévation `shadow-elevation-3`, rayon `radius-lg`, padding 24px ([[SPACING_SYSTEM.md]] §1), z-index `modal` ([[DESIGN_TOKENS.md]] §3).

## 8. Animations

Voir [[ANIMATION_LIBRARY.md]] §7 (Modal Enter/Exit) — fondu du scrim + légère échelle/translation du contenu, catégorie Standard, fermeture par `Échap` en catégorie Micro.

## 9. Bonnes pratiques

Titre qui nomme précisément l'objet concerné ([[DIALOG_LIBRARY.md]]), jamais un titre générique.

## 10. Anti-patterns

- **Plus de deux actions** : dilue la décision.
- **Dialog empilé sur un autre Dialog** : jamais deux Dialogs ouverts simultanément — le second attend la fermeture du premier.

## 11. Cas limites

Corps de texte long : le Dialog reste sur une hauteur maximale avec défilement interne, jamais un Dialog qui dépasse la hauteur de l'écran. Zoom 200% : boutons repassent en Stack vertical si l'espace horizontal manque.

## 12. Performance

Monté uniquement à l'ouverture (jamais gardé en mémoire caché), démonté à la fin de l'animation de sortie.

## 13. Tests

Accessibilité (piège de focus, restitution), interaction (Échap, clic sur scrim), visuel (variantes), unitaire (rendu conditionnel).

---

# Modal (spécification compacte)

Synonyme de conteneur générique dont Dialog est la spécialisation orientée décision — utilisé quand le contenu superposé n'est pas une décision binaire (ex. un lecteur d'image agrandie). Mêmes primitives de focus/scrim que Dialog §6, §8.

# BottomSheet (spécification compacte)

Variante mobile de Modal ancrée en bas d'écran, glissable pour fermer ([[MOTION_GUIDELINES.md]] §12ter, élasticité). Élévation 3 ([[SURFACE_SYSTEM.md]] §6). Utilisé pour le Lecteur étendu sur mobile ([[PLAYER_COMPONENTS.md]]) et les menus contextuels longs.

# Tooltip (spécification compacte)

Voir [[TOOLTIP_LIBRARY.md]] pour le texte, [[ANIMATION_LIBRARY.md]] §13 pour l'animation. Élévation 4 et z-index `tooltip` (60) — le plus élevé de toute l'application, y compris au-dessus d'un Toast déjà affiché ([[SURFACE_SYSTEM.md]] §6, [[DESIGN_TOKENS.md]] §3). Jamais interactif (aucun bouton à l'intérieur) — pour du contenu interactif, utiliser Popover.

# Popover (spécification compacte)

Contenu riche et interactif superposé, ancré à un élément déclencheur (ex. sélecteur de thème). Élévation 2. Fermeture au clic extérieur ou `Échap`, focus non piégé (contrairement à Dialog) sauf si le Popover contient un formulaire complexe. Animation : voir [[ANIMATION_LIBRARY.md]] §13bis (Menu/Popover Enter/Exit).

# Dropdown (spécification compacte)

Popover spécialisé pour une liste d'options courtes sans recherche (pour la recherche, voir Combobox, [[FORM_COMPONENTS.md]]). Animation : [[ANIMATION_LIBRARY.md]] §13bis.

# Menu / ContextMenu (spécification compacte)

Liste d'actions. Menu = déclenché par un clic sur un bouton dédié. ContextMenu = déclenché par clic droit/appui long ([[INTERACTION_GUIDELINES.md]] §3). `role="menu"` avec navigation flèches ([[ACCESSIBILITY_COMPONENTS.md]] §6). Élévation 2. Animation : [[ANIMATION_LIBRARY.md]] §13bis.

---

## Checklist de validation

- [ ] Chaque composant a son niveau d'élévation explicitement assigné et cohérent avec [[SURFACE_SYSTEM.md]] §6.
- [ ] Aucun composant superposé ne redéfinit la gestion de focus déjà posée dans [[ACCESSIBILITY_COMPONENTS.md]] §2.
- [ ] Jamais deux Dialogs ouverts simultanément (§10).

## Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 6) | Senior UI Engineer / Accessibility Specialist |
| 0.2.0 | 2026-08-04 | Auto-revue Phase 6 : précision du z-index Tooltip (§3), résolu avec DESIGN_TOKENS.md §3 | Senior UI Engineer |
| 0.3.0 | 2026-08-04 | Phase 8 : Popover/Dropdown/Menu/ContextMenu référencent désormais une animation nommée (ANIMATION_LIBRARY.md §13bis, comblait un vide) | Motion Designer |

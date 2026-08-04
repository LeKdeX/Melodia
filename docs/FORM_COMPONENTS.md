# FORM_COMPONENTS.md — Composants de saisie (Phase 6)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : UX Engineer / Senior UI Engineer
> **Documents liés** : [[COMPONENT_LIBRARY.md]], [[ACCESSIBILITY_COMPONENTS.md]], [[MICROCOPY_LIBRARY.md]] §5-7

> **Cadrage** : `TextField` est spécifié en profondeur complète — référence pour les champs de saisie. Les autres composants de saisie sont spécifiés en profondeur compacte. `Date Picker` et `Color Picker` sont traités en architecture seulement (§ dédiée en fin de document), cohérent avec [[COMPONENT_LIBRARY.md]] §3.

---

# TextField (spécification complète)

## 1. Présentation

- **Objectif** : capturer une saisie texte libre courte.
- **Contexte** : formulaires (connexion, renommage), recherche (voir `SearchField`, [[SEARCH_COMPONENTS.md]]).
- **Valeur utilisateur** : retour immédiat sur la validité de la saisie sans attendre une soumission.
- **Quand utiliser** : une valeur texte libre courte (une ligne).
- **Quand ne pas utiliser** : mot de passe (utiliser `PasswordField`), sélection dans une liste fermée (utiliser `Select`).
- **Alternatives** : `Combobox` si la saisie doit filtrer une liste de suggestions.

## 2. Anatomie

```
Label
┌─────────────────────────────┐
│ Placeholder ou valeur saisie│
└─────────────────────────────┘
Message d'aide / erreur (optionnel)
```

Label toujours au-dessus (jamais flottant à l'intérieur du champ, qui réduit l'espace de saisie perçu et pose un problème de contraste au repos), champ, message d'aide ou d'erreur en dessous — jamais les deux simultanément (§4, État Error remplace le message d'aide, ne s'ajoute pas à lui).

## 3. Variantes

Aucune variante visuelle de style (Primary/Ghost n'ont pas de sens pour un champ de saisie) — une seule apparence cohérente sur toute l'application. Deux tailles : standard et Compact (barres d'outils, filtres denses).

## 4. États

Default, Hover (bordure légèrement plus foncée), Focus (contour `focus-ring` + bordure `accent-500`), Disabled (opacité réduite, saisie impossible), Error (bordure `state-danger`, message d'erreur remplace le message d'aide), Success (utilisé rarement, validation en temps réel d'un format, ex. adresse de serveur valide).

## 5. Responsive

Largeur toujours relative à son conteneur (`container-sm` maximum pour un champ isolé, [[LAYOUT_SYSTEM.md]] §8) — jamais une largeur fixe en pixels qui déborderait sur petit écran.

## 6. Accessibilité

Voir [[ACCESSIBILITY_COMPONENTS.md]]. Label toujours associé via `for`/`id` natif, jamais uniquement par proximité visuelle. Message d'erreur associé via `aria-describedby`, annoncé au focus.

## 7. Design Tokens

Bordure `border-hairline`/`border-emphasis` (focus), rayon `radius-sm`, padding ([[SPACING_SYSTEM.md]] §1), typographie rôle Body ([[TYPOGRAPHY_GUIDE.md]] §4bis).

## 8. Animations

Transition de bordure au focus catégorie Micro. Apparition du message d'erreur : fondu bref, jamais un décalage brutal du layout (l'espace du message est réservé même vide, pour éviter un saut de contenu — voir Cas limites).

## 9. Bonnes pratiques

Placeholder toujours un exemple concret, jamais une répétition du label ([[MICROCOPY_LIBRARY.md]] §5).

## 10. Anti-patterns

- **Label flottant à l'intérieur du champ** : réduit le contraste au repos et complique la traduction (texte qui grandit).
- **Validation uniquement à la soumission** : un format invalide doit être signalé dès que possible, pas seulement après un clic sur Valider.

## 11. Cas limites

Texte très long : défilement horizontal interne du texte saisi, jamais un agrandissement du champ. Zoom 200% : label et champ restent alignés verticalement. RTL : alignement du texte suit la direction de la langue.

## 12. Performance

Aucun re-render du composant parent à chaque frappe (état local au champ) — la valeur ne remonte au state global qu'au blur ou après un debounce explicite selon le contexte d'usage.

## 13. Tests

Unitaires (validation, états), accessibilité (association label/erreur), interaction (saisie clavier, collage), responsive.

---

# PasswordField (spécification compacte)

Hérite de TextField. **Anatomie additionnelle** : IconButton de bascule visibilité en fin de champ ([[BUTTON_SPECIFICATION.md]] §2). **Accessibilité** : le changement de visibilité est annoncé, jamais silencieux.

# Checkbox, Radio, Switch (spécification compacte, groupée)

Les trois partagent la même anatomie (indicateur + label cliquable) et les mêmes états (Default/Hover/Focus/Pressed/Disabled/Selected). **Distinction d'usage** : Checkbox = sélection indépendante multiple, Radio = sélection exclusive dans un groupe, Switch = état binaire actif immédiatement (pas de bouton de soumission requis, contrairement à Checkbox dans un formulaire). **Accessibilité** : `role="switch"` pour Switch uniquement ([[ACCESSIBILITY_COMPONENTS.md]] §6). **Anti-pattern** : utiliser Switch pour une sélection qui nécessite une confirmation explicite — un Switch s'applique immédiatement, jamais en attente de soumission.

# Select (spécification compacte)

Liste fermée de valeurs, une sélection. **Anatomie** : champ déclencheur (valeur actuelle affichée) + Popover contenant un Menu ([[OVERLAY_COMPONENTS.md]]). **Accessibilité** : `role="combobox"` avec `aria-expanded` ([[ACCESSIBILITY_COMPONENTS.md]] §6). **Cas limite** : liste de plus de 10 options — recherche interne activée automatiquement (devient un Combobox, ci-dessous).

# Combobox (spécification compacte)

Select avec saisie texte qui filtre les options. **Anatomie** : TextField + Popover de suggestions filtrées. **Performance** : filtrage débounced (~150ms) au-delà de 50 options pour éviter un recalcul à chaque frappe.

# Slider / VolumeSlider (spécification compacte)

Voir [[PLAYER_COMPONENTS.md]] pour `VolumeSlider` (dérivé direct). **Anatomie de base** : piste + curseur + remplissage proportionnel à la valeur. **Accessibilité** : `role="slider"` avec valeur/min/max ([[ACCESSIBILITY_COMPONENTS.md]] §6), ajustable aux flèches clavier par incréments de 5%. **Animation** : le curseur suit le pointeur sans latence pendant le glissement, aucune interpolation retardée ([[PLAYER_EXPERIENCE.md]] §7 pour le cas d'usage barre de progression).

# Command Palette (spécification compacte)

Combobox plein écran/modal déclenché par raccourci global (`Ctrl/Cmd + K`, [[INTERACTION_GUIDELINES.md]] §1). **Anatomie** : TextField de recherche + liste de résultats groupés par catégorie (actions, navigation, résultats de bibliothèque). **Accessibilité** : piège de focus actif, fermeture par `Échap`. **Performance** : résultats déjà indexés localement (FlexSearch, [[STACK_DECISIONS.md]] §2), latence perçue nulle. Voir [[COMMAND_PALETTE.md]] (Phase 8) pour l'approfondissement complet (priorité des catégories, favoris, historique, découverte des raccourcis).

# Textarea (spécification compacte, ajout Phase 7)

Hérite de TextField (§Anatomie, §États, §Accessibilité) pour une saisie multi-ligne. **Différence d'anatomie** : hauteur initiale de 3 lignes, redimensionnable verticalement uniquement (jamais horizontalement, ce qui casserait la grille de layout, [[LAYOUT_SYSTEM.md]]) via une poignée en coin bas-droit. **Cas limite propre** : texte qui dépasse la hauteur visible — défilement interne, jamais un agrandissement automatique non borné (une hauteur maximale reste définie par le contexte consommateur).

# Range Slider (spécification compacte, ajout Phase 7)

Extension de Slider (§Slider/VolumeSlider ci-dessus) à deux curseurs (valeur min et max) au lieu d'un seul. **Anatomie additionnelle** : deux poignées sur la même piste, portion de piste entre les deux poignées remplie pour représenter la plage sélectionnée. **Accessibilité** : deux éléments `role="slider"` distincts, chacun avec son propre `aria-valuenow`/`aria-valuemin`/`aria-valuemax`, navigables indépendamment au clavier (Tab entre les deux poignées). **Anti-pattern** : poignées qui peuvent se croiser sans contrainte — la poignée min ne dépasse jamais la poignée max et inversement.

# Input OTP (spécification compacte, ajout Phase 7)

Saisie d'un code numérique court segmenté en cases individuelles (une case par caractère) — pertinent uniquement si une fonctionnalité de vérification en deux étapes est engagée un jour ([[SECURITY_GUIDE.md]], non engagée à ce jour pour Melodia dont l'authentification passe par le serveur Jellyfin lui-même). **Anatomie** : N cases carrées de taille identique, focus qui avance automatiquement à la case suivante après chaque caractère saisi, jamais un focus qui reste bloqué. **Accessibilité** : navigation clavier fléchée entre cases, collage d'un code complet réparti automatiquement sur toutes les cases en une seule action.

# Tag Input / Chip Input (spécification compacte, ajout Phase 7)

TextField qui transforme chaque valeur validée (touche Entrée ou virgule) en Chip ([[FEEDBACK_COMPONENTS.md]]) affiché dans le champ lui-même — utilisé pour la saisie de genres multiples ou de tags personnalisés sur une playlist. **Anatomie** : Chips déjà validés à gauche, curseur de saisie active à droite, chaque Chip a son propre bouton de suppression. **Accessibilité** : suppression du dernier Chip possible via `Retour arrière` sur un champ vide, annoncée à chaque ajout/retrait (`aria-live="polite"`). **Distinction Tag Input/Chip Input** : synonymes — même composant, le nom varie selon le contexte de la documentation source, jamais deux implémentations distinctes.

## Search Bar (fusion, ajout Phase 7)

**Fusion assumée** : « Search Bar » désigne le même composant que `SearchField` ([[SEARCH_COMPONENTS.md]]) — la barre englobante (icône + champ + raccourci clavier) et le champ de saisie qu'elle contient ne sont jamais séparés dans l'implémentation. Voir [[SEARCH_COMPONENTS.md]] pour la spécification complète, non redécrite ici.

## Autocomplete (fusion, ajout Phase 7)

**Fusion assumée** : « Autocomplete » désigne le même composant que `Combobox` (ci-dessus) — un champ de saisie qui filtre une liste de suggestions n'a pas de comportement distinct selon qu'on l'appelle Autocomplete ou Combobox. Documenté une seule fois pour éviter une divergence future entre deux entrées qui décriraient le même composant différemment.

---

## Date Picker (architecture seulement)

**Objectif anticipé** : sélection d'une date, si une fonctionnalité future en a besoin (aucune identifiée à ce jour dans [[FEATURE_ROADMAP.md]]). **Contrat d'interface attendu** : `value`/`onChange` sur une date ISO, composition prévue sur `Popover` + `Select` pour mois/année. **Dépendance anticipée** : une bibliothèque de manipulation de date si le besoin se confirme (non choisie, hors périmètre de [[TECH_STACK.md]] actuel). Non spécifié davantage tant qu'aucun besoin produit réel ne l'exige.

## Color Picker (architecture seulement)

**Objectif anticipé** : sélection d'une couleur, pertinent uniquement si une fonctionnalité de personnalisation de thème utilisateur au-delà des thèmes prédéfinis ([[THEMES_GUIDE.md]]) est engagée un jour — non engagée à ce jour. **Contrat d'interface attendu** : `value`/`onChange` sur une valeur hexadécimale, avec garde-fou de contraste automatique hérité de [[COLOR_SYSTEM.md]] §6 (repli automatique si la couleur choisie casse le contraste minimum). Non spécifié davantage tant qu'aucun besoin produit réel ne l'exige.

---

## Checklist de validation

- [ ] TextField couvre les 13 sections en détail.
- [ ] Chaque composant dérivé renvoie vers TextField pour l'anatomie/les tokens partagés, jamais redéfinis.
- [ ] Date Picker et Color Picker restent explicitement non spécifiés en détail, cohérent avec l'absence de besoin produit engagé.

## Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 6) | UX Engineer / Senior UI Engineer |
| 0.2.0 | 2026-08-04 | Auto-revue Phase 6 : correction de la citation PasswordField (style §2 au lieu d'un renvoi textuel) | UX Engineer |
| 0.3.0 | 2026-08-04 | Phase 7 : ajout de Textarea, Range Slider, Input OTP, Tag/Chip Input ; fusion explicite Search Bar=SearchField et Autocomplete=Combobox | UX Engineer |
| 0.4.0 | 2026-08-04 | Phase 8 : renvoi vers COMMAND_PALETTE.md pour l'approfondissement complet | Navigation System Architect |

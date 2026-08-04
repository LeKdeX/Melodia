# COMPONENT_CHECKLIST.md — Definition of Done et matrice de composition (Phase 6)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : QA Engineer / Principal Design System Architect
> **Documents liés** : [[COMPONENT_LIBRARY.md]], [[DEFINITION_OF_DONE.md]], [[DESIGN_SYSTEM.md]] §3

> **Cadrage** : [[DEFINITION_OF_DONE.md]] définit ce qui rend une *fonctionnalité* terminée. Ce document définit ce qui rend un *composant du Design System* terminé — plus strict et plus spécifique, appliqué en plus (jamais à la place) de [[DEFINITION_OF_DONE.md]] pour tout composant de cette bibliothèque.

---

## 1. Definition of Done d'un composant

Un composant n'est considéré comme faisant partie de la bibliothèque que si :

- [ ] Les 13 sections du gabarit ([[COMPONENT_LIBRARY.md]] §1) sont couvertes, en profondeur complète ou compacte selon son statut ([[COMPONENT_LIBRARY.md]] §2).
- [ ] Aucun token arbitraire — chaque valeur visuelle provient de [[DESIGN_TOKENS.md]] ([[DESIGN_SYSTEM.md]] §3, règle absolue).
- [ ] Le contrat d'accessibilité commun est respecté sans exception ([[ACCESSIBILITY_COMPONENTS.md]]).
- [ ] Une entrée Storybook existe avec au minimum les variantes, un test de contraste, un test de navigation clavier isolé ([[DESIGN_SYSTEM_ARCHITECTURE.md]] §6).
- [ ] `prefers-reduced-motion` a une alternative documentée si le composant a une animation ([[MOTION_GUIDELINES.md]] §12).
- [ ] Testé dans les cinq classes responsive principales ([[RESPONSIVE_GUIDE.md]] §1).

## 2. Matrice de composition — ce qui peut être imbriqué

| Composant conteneur | Peut contenir |
|---|---|
| Card | Badge, Chip, IconButton (overlay), Avatar |
| Dialog | TextField, Checkbox/Radio, Button (jamais plus de 2) |
| Grid | Card (toute variante), Skeleton |
| Stack / Section | Tout composant — primitive neutre |
| Sidebar | IconButton, Badge (compteur de notifications) |
| Tabs | Tout composant de contenu de page dans chaque panel |
| Popover / Menu | Menu (imbrication d'un niveau maximum, sous-menu), Checkbox/Radio (menu à sélection) |
| Toast / Snackbar | Button texte inline uniquement (action), jamais un second composant interactif |

## 3. Ce qui ne doit jamais être imbriqué

- **Dialog dans Dialog** : jamais deux Dialogs ouverts simultanément ([[OVERLAY_COMPONENTS.md]] §10).
- **Card dans Card** : casse la hiérarchie d'élévation et la zone cliquable unique ([[CARD_SPECIFICATION.md]] §6).
- **Button dans Button** : ambiguïté de cible de clic, jamais un IconButton imbriqué dans un Button plus large.
- **Grid dans Grid** : virtualisation impossible à raisonner correctement, utiliser Section pour sous-grouper à la place.
- **Tabs dans Tabs** : confusion de navigation, utiliser une Sidebar de catégories pour un second niveau si nécessaire.
- **Tooltip contenant un composant interactif** : un Tooltip n'est jamais interactif ([[OVERLAY_COMPONENTS.md]] §Tooltip) — utiliser Popover si une interaction est nécessaire.

## 4. Composants qui partagent les mêmes Design Tokens

| Groupe de tokens | Composants |
|---|---|
| Tokens de couleur d'état (`state-success/warning/danger/info`) | Toast, Banner, Alert, TextField (Error), Badge — tout composant qui communique un résultat, voir [[VISUAL_FEEDBACK_GUIDE.md]] pour la chorégraphie associée |
| Tokens d'élévation (`shadow-elevation-*`) | Card, Dialog, Modal, BottomSheet, Popover, Menu, Tooltip, Sidebar (mode flottant), Panel |
| Tokens de rayon (`radius-sm/md/lg`) | Button/Input (`sm`), Card/Panel (`md`), Dialog/BottomSheet (`lg`) |
| Tokens typographiques (rôles sémantiques) | Tout composant qui affiche du texte — aucune exception, [[TYPOGRAPHY_GUIDE.md]] §4bis |
| Tokens de mouvement (`duration-*`/`easing-*`) | Tout composant animé — voir [[ANIMATION_LIBRARY.md]] pour l'assignation individuelle |

## 5. Composants qui héritent des mêmes comportements

| Comportement de base | Composants héritiers |
|---|---|
| Button (états hover/pressed/disabled, zone tactile) | IconButton, ToggleButton, SegmentedButton, FAB |
| Card (anatomie, élévation, cible cliquable unique) | Track/Album/Artist/Playlist/Genre/Library Card, Statistics Cards, Wrapped Cards |
| TextField (label, message d'aide/erreur, focus) | PasswordField, SearchField |
| Toast (aria-live, file séquentielle) | Snackbar |
| Empty State (anatomie illustration/message/action) | Empty Search State, toute zone de contenu vide |
| Preference Row (anatomie libellé/description/contrôle) | Toggle Row, Slider Row, Select Row, Navigation Row, Color Picker Row |

## 6. Tableau de dépendances d'implémentation

Ordre recommandé d'implémentation — un composant listé dépend de ceux qui le précèdent :

1. **Tokens** ([[DESIGN_TOKENS.md]]) — préalable à tout.
2. **Primitives sans état** : Container, Stack, Section, Grid, Divider/Separator ([[LAYOUT_COMPONENTS.md]]).
3. **Atomes interactifs de base** : Button, IconButton ([[BUTTON_SPECIFICATION.md]]), Checkbox/Radio/Switch, TextField ([[FORM_COMPONENTS.md]]).
4. **Composants de statut** : Badge, Chip, Tag, ProgressBar, Skeleton ([[FEEDBACK_COMPONENTS.md]], [[LAYOUT_COMPONENTS.md]]).
5. **Card** ([[CARD_SPECIFICATION.md]]) — dépend de Badge/Chip pour ses overlays.
6. **Composants superposés** : Tooltip, Popover, Menu, Dialog ([[OVERLAY_COMPONENTS.md]]) — dépendent de Button pour leurs actions.
7. **Composants dérivés de Card** : Track/Album/Artist Card ([[LIBRARY_COMPONENTS.md]], [[PLAYER_COMPONENTS.md]]) — dépendent de Card et des overlays (§6).
8. **Composants de navigation et structure de page** : Sidebar, Tabs, TopBar/BottomBar ([[LAYOUT_COMPONENTS.md]], [[NAVIGATION_COMPONENTS.md]]) — dépendent des atomes (§3).
9. **Composants de haut niveau spécifiques au domaine** : Player (toutes formes), Search Results, Album Grid, Preference Row ([[PLAYER_COMPONENTS.md]], [[SEARCH_COMPONENTS.md]], [[LIBRARY_COMPONENTS.md]], [[SETTINGS_COMPONENTS.md]]) — dépendent de tout ce qui précède.
10. **Composants d'état d'écran** : Empty/Loading/Error/Sync State ([[STATE_COMPONENTS.md]]) — peuvent être implémentés en parallèle du reste, consommés par tous les composants de niveau 9.

## 6bis. Composants ajoutés en Phase 7 — intégration à la matrice et aux dépendances

> Section ajoutée plutôt que de réécrire les tableaux §2-6 dans leur intégralité — chaque nouveau composant est positionné par rapport aux règles déjà établies, jamais par une nouvelle règle isolée.

| Composant (Phase 7) | Héritage | Position dans les dépendances (§6) |
|---|---|---|
| Split Button, Command Button, Menu Button | Button ([[BUTTON_SPECIFICATION.md]]) | Niveau 3 (atomes interactifs de base) |
| Textarea | TextField ([[FORM_COMPONENTS.md]]) | Niveau 3 |
| Range Slider | Slider ([[FORM_COMPONENTS.md]]) | Niveau 3 |
| Input OTP, Tag Input / Chip Input | TextField + Chip ([[FORM_COMPONENTS.md]], [[FEEDBACK_COMPONENTS.md]]) | Niveau 4 (dépend des atomes de statut pour Tag/Chip Input) |
| User Avatar, Artwork, Album Cover, Thumbnail | Avatar / composant image autonome ([[DISPLAY_COMPONENTS.md]]) | Niveau 2 (primitives sans état) |
| Code Block | Aucun (primitive typographique + surface) | Niveau 2 |
| Loading Overlay | CircularProgress ([[FEEDBACK_COMPONENTS.md]]) | Niveau 4 (composants de statut) |
| Step Indicator, Navigation Group | Aucun héritage direct, primitives de navigation ([[NAVIGATION_COMPONENTS.md]]) | Niveau 8 (navigation et structure de page) |

**Jamais imbriqué (ajout Phase 7)** : Navigation Group dans Navigation Group (§Navigation Group, [[NAVIGATION_COMPONENTS.md]], jamais plus de deux niveaux de regroupement) ; Loading Overlay sur une zone déjà couverte par un Skeleton (les deux répondent au même besoin — chargement initial vs opération sur contenu déjà affiché — jamais superposés).

**Tokens partagés (ajout Phase 7)** : Split Button/Command Button/Menu Button partagent intégralement les tokens de Button (§4 déjà applicable, aucun ajout). Artwork/Album Cover/Thumbnail partagent le rayon `radius-md`/`radius-sm` selon leur taille, jamais un rayon propre.

---

## 7. Checklist de validation

- [ ] Chaque paire « jamais imbriqué » (§3) a une raison explicite, pas une interdiction arbitraire.
- [ ] Le tableau de dépendances (§6) est utilisable tel quel comme plan d'implémentation.
- [ ] La Definition of Done (§1) est vérifiable objectivement pour chaque composant de la bibliothèque.

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 6) | QA Engineer / Principal Design System Architect |
| 0.2.0 | 2026-08-04 | Auto-revue Phase 6 : suppression du pseudo-composant « VisualFeedback » (§4, ce n'est pas un composant), correction du nom « Empty Search State » (§5) | QA Engineer |
| 0.3.0 | 2026-08-04 | Phase 7 : ajout §6bis intégrant les nouveaux composants à la matrice de composition et aux dépendances | QA Engineer |

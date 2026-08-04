# COMPONENT_LIBRARY.md — Bibliothèque de composants (Phase 6, capstone)

> **Statut** : document fondateur, vivant — capstone de Phase 6
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal Design System Architect
> **Documents liés** : [[DESIGN_SYSTEM.md]], [[COMPOSING_RULES.md]], [[ACCESSIBILITY_COMPONENTS.md]]

> **Cadrage** : cette phase documente la couche **composant réutilisable** — anatomie, variantes, états, tokens, tests — au-dessus de deux couches déjà écrites : le Design System (Phase 5, les règles et tokens) et les spécifications produit (Phases 1-2, ce que chaque écran/fonctionnalité doit faire). Aucun composant ici ne redécide un comportement produit déjà spécifié ([[PLAYER_SPECIFICATION.md]], [[SEARCH_SPECIFICATION.md]], [[LIBRARY_SPECIFICATION.md]], [[SETTINGS_SPECIFICATION.md]], etc.) — il documente comment ce comportement se construit à partir de composants nommés, testables et réutilisables.

---

## 1. Le gabarit à 13 sections

Chaque composant documenté dans cette bibliothèque suit le même gabarit, dans le même ordre, pour qu'un développeur sache toujours où trouver une information :

1. **Présentation** — nom, objectif, contexte, valeur utilisateur, quand utiliser / ne pas utiliser, alternatives.
2. **Anatomie** — sous-éléments, rôle et contraintes de chacun, schéma textuel.
3. **Variantes** — toutes les variantes pertinentes (pas toutes les variantes possibles — voir §2 ci-dessous).
4. **États** — default à synchronisation, transitions décrites.
5. **Responsive** — adaptation par classe d'appareil ([[RESPONSIVE_GUIDE.md]] §1).
6. **Accessibilité** — voir [[ACCESSIBILITY_COMPONENTS.md]] pour le contrat commun ; cette section documente uniquement ce qui est spécifique au composant.
7. **Design Tokens** — chaque token utilisé, aucune valeur arbitraire ([[DESIGN_SYSTEM.md]] §3).
8. **Animations** — entrée, sortie, hover, pressed, loading, durées/courbes ([[ANIMATION_LIBRARY.md]]), alternative `prefers-reduced-motion`.
9. **Bonnes pratiques**.
10. **Anti-patterns** — avec la raison.
11. **Cas limites** — texte long, icône absente, réseau lent, erreur, petit/grand écran, zoom, police agrandie, RTL.
12. **Performance** — optimisations, virtualisation, mémoïsation, coût GPU/CPU, re-renders attendus.
13. **Tests** — unitaires, visuels, accessibilité, responsive, performance, interaction.

## 2. Stratégie de profondeur à deux niveaux

Avec 135 composants nommés dans le cadrage, une spécification complète et également détaillée pour chacun produirait un volume ingérable et illisible — l'objectif de référence officielle serait desservi par sa propre exhaustivité. Cette bibliothèque applique donc deux niveaux, appliqués explicitement composant par composant dans chaque fichier :

- **Spécification complète** : les 13 sections en détail. Réservée aux composants fondamentaux à plus fort réemploi dans l'application — ceux dont l'anatomie et les règles servent de référence à une famille entière de composants dérivés (ex. `Button` sert de référence à `IconButton`, `FAB`, `ToggleButton`).
- **Spécification compacte** : les 13 mêmes sections, mais formulées en tableaux denses et renvois systématiques vers la spécification complète de la même famille pour tout ce qui est identique (anatomie de base, tokens partagés, contrat d'accessibilité) — seules les différences réelles sont détaillées.

Aucun composant n'a de section manquante — la différence est la densité, jamais la couverture.

## 3. Composants en « architecture seulement »

Trois composants (`Date Picker`, `Color Picker`, `Equalizer Panel`) sont explicitement demandés par le cadrage comme « à prévoir » plutôt qu'à spécifier complètement — aucune fonctionnalité produit associée n'est encore engagée ([[FEATURE_ROADMAP.md]]). Ces trois composants reçoivent une entrée réduite (objectif, contrat d'interface attendu, dépendances anticipées) plutôt que les 13 sections complètes, cohérent avec la règle d'honnêteté déjà établie (ne jamais documenter en détail une fonctionnalité non engagée comme si elle l'était).

## 4. Index complet des composants

### Foundation

| Composant | Fichier | Profondeur |
|---|---|---|
| Button | [[BUTTON_SPECIFICATION.md]] | Complète |
| IconButton, ToggleButton, SegmentedButton, FAB, Link | [[BUTTON_SPECIFICATION.md]] | Compacte |
| Badge, Chip, Tag | [[FEEDBACK_COMPONENTS.md]] | Compacte |
| Avatar, Divider, Separator, Scrollbar | [[LAYOUT_COMPONENTS.md]] | Compacte |
| ProgressBar, CircularProgress | [[FEEDBACK_COMPONENTS.md]] | Compacte |
| Slider, VolumeSlider | [[FORM_COMPONENTS.md]], [[PLAYER_COMPONENTS.md]] | Compacte |
| Skeleton, Spinner | [[LAYOUT_COMPONENTS.md]] | Compacte |
| Tooltip, Popover, Dropdown, Menu, ContextMenu | [[OVERLAY_COMPONENTS.md]] | Compacte |
| Dialog | [[OVERLAY_COMPONENTS.md]] | Complète |
| Modal, BottomSheet | [[OVERLAY_COMPONENTS.md]] | Compacte |
| Toast | [[FEEDBACK_COMPONENTS.md]] | Complète |
| Snackbar, Notification, Banner, Alert | [[FEEDBACK_COMPONENTS.md]] | Compacte |
| Accordion, Breadcrumb, Pagination | [[NAVIGATION_COMPONENTS.md]] | Compacte |
| Tabs | [[NAVIGATION_COMPONENTS.md]] | Complète |
| SearchField | [[SEARCH_COMPONENTS.md]] | Compacte |
| TextField | [[FORM_COMPONENTS.md]] | Complète |
| PasswordField, Checkbox, Radio, Switch, Select, Combobox, Command Palette | [[FORM_COMPONENTS.md]] | Compacte |
| Date Picker, Color Picker | [[FORM_COMPONENTS.md]] | Architecture seulement |

### Layout

| Composant | Fichier | Profondeur |
|---|---|---|
| Sidebar, Grid | [[LAYOUT_COMPONENTS.md]] | Complète |
| TopBar, BottomBar, Dock, Panel, SplitView, ResizablePanel, Container, Stack, Section, Hero, MasterDetailLayout | [[LAYOUT_COMPONENTS.md]] | Compacte |
| Card | [[CARD_SPECIFICATION.md]] | Complète |

### Music

| Composant | Fichier | Profondeur |
|---|---|---|
| Mini/Expanded/Fullscreen Player, Queue Item | [[PLAYER_COMPONENTS.md]] | Complète |
| Player (conteneur), Queue, Waveform, Progress Timeline, Lyrics Panel, Audio Visualizer, Volume Mixer, Device Selector, Cast Selector, Playback Speed, Repeat Control, Shuffle Control, Favorite Button, Download Button, Offline Indicator, Now Playing Bar | [[PLAYER_COMPONENTS.md]] | Compacte |
| Equalizer Panel | [[PLAYER_COMPONENTS.md]] | Architecture seulement |
| Track/Album/Artist/Playlist/Genre/Library Card | [[LIBRARY_COMPONENTS.md]] | Compacte (dérivées de [[CARD_SPECIFICATION.md]]) |

### Search

| Composant | Fichier | Profondeur |
|---|---|---|
| Search Results | [[SEARCH_COMPONENTS.md]] | Complète |
| Global Search, Search Filters, Search Suggestions, Recent Searches, Advanced Filters, Empty Search State | [[SEARCH_COMPONENTS.md]] | Compacte |

### Library

| Composant | Fichier | Profondeur |
|---|---|---|
| Album Grid, Track Card | [[LIBRARY_COMPONENTS.md]] | Complète |
| Album List, Artist Grid/List, Playlist Grid, Genre Grid, Collection Grid, Folder View, Pinned Items, Favorites, Recently Added, Recently Played, Statistics Cards, Wrapped Cards, Charts, Graphs, Timeline | [[LIBRARY_COMPONENTS.md]] | Compacte |

### Settings

| Composant | Fichier | Profondeur |
|---|---|---|
| Preference Row | [[SETTINGS_COMPONENTS.md]] | Complète |
| Settings Sidebar/Category/Section/Card, Toggle Row, Slider Row, Color Picker Row, Theme Selector, Server Selector, Storage Indicator, Cache Manager, Developer Panel, Labs Panel | [[SETTINGS_COMPONENTS.md]] | Compacte |

### States

| Composant | Fichier | Profondeur |
|---|---|---|
| Empty State | [[STATE_COMPONENTS.md]] | Complète |
| Loading, Offline, Sync, Import, Error, Maintenance, Upgrade, First Launch State | [[STATE_COMPONENTS.md]] | Compacte |

## 5. Comparaison de qualité avec les systèmes de référence

Auto-revue de fin de phase : pour chaque système de référence nommé dans le cadrage, ce que cette bibliothèque en retient (principe, jamais l'implémentation littérale — même règle de non-reproduction que [[PREMIUM_EXPERIENCE_BIBLE.md]] §4).

| Référence | Ce que cette bibliothèque en retient |
|---|---|
| Material Design 3 | Anatomie systématique + tokens explicites par composant, jamais une description purement visuelle sans structure nommée |
| Fluent UI | Documentation explicite des cas limites (texte long, RTL, zoom) comme partie intégrante de la spécification, jamais une réflexion après-coup |
| Carbon Design System | Anti-patterns documentés avec leur raison, pas seulement une liste de bonnes pratiques positives — un système mature nomme aussi ce qu'il faut éviter |
| Polaris (Shopify) | Contrat de responsabilité clair entre composant et contenu qu'il porte (ex. Grid ne redécide jamais les règles du Card qu'il contient, [[LAYOUT_COMPONENTS.md]]) |
| Radix UI | Contrat d'accessibilité intégré à chaque composant comme prérequis, jamais une couche ajoutée après implémentation — voir [[ACCESSIBILITY_COMPONENTS.md]] |
| shadcn/ui | Composition plutôt que configuration — les composants dérivés héritent explicitement d'un composant de référence (Button → IconButton/FAB, Card → Track/Album/Artist Card) plutôt que de multiplier des props de configuration |
| Apple Human Interface Guidelines | « Quand ne pas utiliser » systématique en §1 de chaque composant — une bibliothèque de référence doit autant guider ce qu'il ne faut pas faire que ce qu'il faut faire |

**Limite assumée** : contrairement à ces sept références qui documentent des bibliothèques déjà implémentées et testées en production depuis plusieurs années, cette bibliothèque est écrite avant tout code applicatif ([[ROADMAP.md]]) — sa qualité réelle ne sera confirmée qu'à l'usage, cohérent avec la règle d'honnêteté déjà appliquée dans ce projet (ne jamais prétendre vérifié ce qui ne l'a pas été).

---

## 6. Checklist de validation

- [ ] Les 135 composants du cadrage apparaissent tous dans l'index (§4), aucun omis silencieusement.
- [ ] Chaque composant en profondeur compacte renvoie explicitement vers la spécification complète de sa famille.
- [ ] Les trois composants « architecture seulement » (§3) ne sont jamais présentés comme des spécifications complètes.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document, capstone de la Phase 6 | Principal Design System Architect |
| 0.2.0 | 2026-08-04 | Auto-revue complète : correction du décompte (135 composants, pas 134 — erreur arithmétique sur la catégorie Foundation), §5 réécrit pour couvrir les 7 références nommées dans le cadrage (Material 3, Fluent UI, Carbon, Polaris, Radix UI, shadcn/ui, Apple HIG) au lieu de 3, correction du renvoi cassé vers COMPONENT_CHECKLIST.md §5 | Principal Design System Architect |

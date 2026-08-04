# FOUNDATION_COMPONENTS.md — Composants fondamentaux, synthèse (Phase 7)

> **Statut** : document fondateur, vivant — capstone de Phase 7
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal Design System Architect
> **Documents liés** : [[COMPONENT_LIBRARY.md]], [[COMPONENT_HIERARCHY.md]], [[COMPONENT_DEPENDENCY_GRAPH.md]]

> **Cadrage** : ce document est le capstone de la Phase 7, spécifique à la couche **composants fondamentaux** (Actions/Formulaires/Affichage/Feedback/Navigation) — un sous-ensemble de [[COMPONENT_LIBRARY.md]] qui reste le capstone de l'ensemble de la bibliothèque (incluant Layout/Player/Search/Library/Settings/States). Ce document ne remplace pas [[COMPONENT_LIBRARY.md]], il l'approfondit sur ce périmètre précis.

---

## 1. Carte des composants fondamentaux

| Catégorie | Documents | Composants réellement nouveaux en Phase 7 |
|---|---|---|
| Actions | [[BUTTON_SPECIFICATION.md]] | Split Button, Command Button, Menu Button |
| Formulaires | [[FORM_COMPONENTS.md]] | Textarea, Range Slider, Input OTP, Tag Input/Chip Input |
| Affichage | [[DISPLAY_COMPONENTS.md]], [[FEEDBACK_COMPONENTS.md]], [[LAYOUT_COMPONENTS.md]] | User Avatar, Artwork, Album Cover, Thumbnail, Label, Caption, Code Block |
| Feedback | [[FEEDBACK_COMPONENTS.md]], [[OVERLAY_COMPONENTS.md]] | Loading Overlay |
| Navigation | [[NAVIGATION_COMPONENTS.md]] | Step Indicator, Navigation Group |

**Fusions actées cette phase** (aucun doublon créé, voir chaque document pour le détail) : Search Bar=SearchField, Autocomplete=Combobox, Confirmation Dialog=Dialog (variante Destructive), Empty Placeholder=Empty State, Segmented Control=SegmentedButton, Navigation Rail=Sidebar (variante Réduite), Command Menu=Command Palette.

## 2. Comparaison approfondie par famille avec les systèmes de référence

> [[COMPONENT_LIBRARY.md]] §5 pose déjà la comparaison au niveau de l'ensemble de la bibliothèque. Ce tableau va plus loin, famille par famille de composants fondamentaux — c'est la profondeur explicitement demandée par le cadrage de cette phase.

| Famille | Meilleure pratique identifiée | Système de référence | Application dans cette bibliothèque |
|---|---|---|---|
| Actions | Une seule action Primary visible par vue | Apple HIG, Carbon | [[BUTTON_SPECIFICATION.md]] §9, repris comme bonne pratique explicite |
| Actions | Séparer l'action par défaut d'un Split Button de ses alternatives via un séparateur visuel net | Fluent UI | [[BUTTON_SPECIFICATION.md]], Split Button §Anatomie |
| Formulaires | Validation en temps réel plutôt qu'à la soumission | Material Design 3 | [[FORM_COMPONENTS.md]], TextField §10 (anti-pattern explicite sur la validation tardive) |
| Formulaires | Le focus avance automatiquement entre segments d'un OTP | Radix UI, shadcn/ui | [[FORM_COMPONENTS.md]], Input OTP |
| Affichage | Repli déterministe (initiales, couleur dérivée) plutôt qu'un placeholder générique | Polaris | [[LAYOUT_COMPONENTS.md]] Avatar, [[DISPLAY_COMPONENTS.md]] §2-4 |
| Affichage | Distinction claire entre rôle typographique et composant autonome | Material Design 3 (design tokens vs composants) | [[DISPLAY_COMPONENTS.md]] §6-7 (Label/Caption explicitement non-composants) |
| Feedback | Contrat d'accessibilité (`aria-live`, focus) intégré au composant, jamais en annexe | Radix UI | [[ACCESSIBILITY_COMPONENTS.md]], référencé par tout composant de [[FEEDBACK_COMPONENTS.md]] |
| Feedback | Distinction stricte entre chargement initial (Skeleton) et opération sur contenu déjà visible (Loading Overlay) | Carbon Design System | [[FEEDBACK_COMPONENTS.md]], Loading Overlay |
| Navigation | Un composant de progression dédié pour une séquence, jamais des Tabs détournés | Apple HIG, Material Design 3 | [[NAVIGATION_COMPONENTS.md]], Tabs §10 anti-pattern + Step Indicator |
| Navigation | Terminologie alignée avec les références externes quand elle désigne le même concept (Navigation Rail, Command Menu) | Material Design 3, shadcn/ui | Fusions explicites §1 ci-dessus, jamais un renommage silencieux |

## 3. Limite assumée de cette comparaison

Identique à celle déjà posée dans [[COMPONENT_LIBRARY.md]] §5 : ces comparaisons retiennent des principes, jamais une implémentation ou un visuel copié — et restent non vérifiées en conditions réelles d'usage tant qu'aucun code n'existe ([[ROADMAP.md]]).

---

## 4. Checklist de validation

- [ ] Chaque famille de composants fondamentaux a au moins deux entrées dans la comparaison (§2), pas une couverture inégale.
- [ ] Aucune fusion (§1) n'est répétée en doublon dans un autre document.
- [ ] Ce document reste un sous-ensemble de [[COMPONENT_LIBRARY.md]], jamais une source de vérité concurrente.

---

## 5. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document, capstone de la Phase 7 | Principal Design System Architect |

# LAYOUT_COMPONENTS.md — Composants de structure (Phase 6)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Senior Frontend Architect / React Component Architect
> **Documents liés** : [[COMPONENT_LIBRARY.md]], [[COMPOSING_RULES.md]], [[LAYOUT_SYSTEM.md]]

> **Cadrage** : [[COMPOSING_RULES.md]] a déjà défini *quand et pourquoi* utiliser chaque pattern de composition (Container, Section, Stack, Inline, Grid, Split View, Sidebar Layout, Master-Detail). Ce document ne redécide aucun de ces usages — il documente l'implémentation composant de chacun (anatomie, props-équivalents, tokens, tests). `Sidebar` et `Grid` sont spécifiés en profondeur complète.

---

# Sidebar (spécification complète)

## 1. Présentation

- **Objectif** : navigation principale permanente.
- **Contexte** : desktop/tablette/laptop ([[RESPONSIVE_GUIDE.md]] §4-5), implémente le pattern Sidebar Layout ([[COMPOSING_RULES.md]] §7).
- **Valeur utilisateur** : accès constant aux sections principales sans naviguer pour naviguer.
- **Quand utiliser** : desktop/tablette/laptop uniquement.
- **Quand ne pas utiliser** : mobile (utiliser BottomBar).
- **Alternatives** : BottomBar sur mobile, Dock en mode fenêtre réduite.

## 2. Anatomie

```
┌──────────┐
│ Logo     │
│──────────│
│ ● Item 1 │ ← icône + libellé, ou icône seule en mode réduit
│ ○ Item 2 │
│ ○ Item 3 │
│──────────│
│ Profil   │
└──────────┘
```

Zone de marque (haut), liste d'items de navigation (icône + libellé, indicateur d'item actif), zone secondaire (bas, accès profil/paramètres).

## 3. Variantes

Complète (icônes + libellés, desktop large), Réduite (icônes seules, sous un seuil de largeur ou fenêtre réduite, [[RESPONSIVE_GUIDE.md]] §5 — équivalent de ce que d'autres systèmes nomment « Navigation Rail »), Rétractable (tablette, l'utilisateur peut la masquer temporairement).

## 3bis. Variantes additionnelles (ajout Phase 8)

- **Pinned (épinglée)** : état par défaut sur desktop large — reste ouverte en permanence, ne se rétracte jamais automatiquement. C'est l'état implicite de la variante Complète (§3), nommé explicitement ici pour le distinguer d'Auto Hide.
- **Floating (flottante)** : superposée au contenu plutôt qu'intégrée au flux de layout (élévation 2, [[SURFACE_SYSTEM.md]] §6) — réservée à un mode de travail où l'espace de contenu prime (ex. Mode Focus, [[THEMES_GUIDE.md]] §5) ; s'ouvre au survol du bord de l'écran et se referme au clic extérieur, jamais en repoussant le contenu.
- **Docked (ancrée)** : synonyme de Pinned pour un utilisateur venant d'une terminologie desktop OS (Windows/macOS) — même comportement, alias documenté pour éviter toute ambiguïté de nommage, jamais une troisième implémentation.
- **Auto Hide** : se rétracte automatiquement en mode Réduite après une période d'inactivité de navigation (aucun clic sur un item pendant plusieurs minutes), se ré-étend au survol du bord ou à la prochaine navigation — jamais une rétractation pendant qu'un menu ou un sous-élément de la Sidebar a le focus.
- **Adaptive Width** : la largeur en mode Complète n'est pas fixe mais suit le libellé le plus long parmi les items visibles, dans une plage bornée (min/max définis par token, [[LAYOUT_SYSTEM.md]] §8) — évite un texte tronqué sur une traduction plus longue ([[LOCALIZATION_GUIDE.md]] §5) sans laisser la largeur dériver sans limite.

## 3ter. Recherche intégrée (ajout Phase 8)

Une entrée de recherche peut apparaître en tête de la liste d'items (au-dessus de la zone de marque ou juste en dessous) — il ne s'agit jamais d'un second champ de recherche : c'est `SearchField` ([[SEARCH_COMPONENTS.md]]) rendu à cet emplacement précis, qui ouvre la même expérience de recherche globale que le raccourci `Ctrl/Cmd + K` ([[COMMAND_PALETTE.md]] pour la distinction entre les deux points d'entrée). En mode Réduite (§3), remplacée par une IconButton de recherche qui ouvre la Command Palette plutôt qu'un champ inutilisable à cette largeur.

## 4. États

Item Default/Hover/Focus/Active (courant) — l'item actif utilise un indicateur non uniquement coloré (fond + icône Filled, [[ACCESSIBILITY_GUIDE.md]] §3bis).

## 5. Responsive

Voir §3 — la transition entre variantes est fluide, jamais un rechargement ([[RESPONSIVE_GUIDE.md]] §8).

## 6. Accessibilité

`role="navigation"` avec libellé explicite, item actif marqué `aria-current="page"`.

## 7. Design Tokens

Largeur fixe (complète) / réduite (tokens dédiés, à définir avec [[LAYOUT_SYSTEM.md]] lors de l'implémentation), fond `surface`, indicateur `accent-500`.

## 8. Animations

Transition Réduite ↔ Complète : catégorie Standard, largeur interpolée (jamais un saut).

## 9. Bonnes pratiques

Toujours un maximum de 7-9 items — au-delà, regrouper (cohérent avec [[NAVIGATION_GUIDE.md]]).

## 10. Anti-patterns

Sidebar qui change de contenu selon l'écran affiché — elle reste identique partout, seul l'item actif change.

## 11. Cas limites

Libellé long : tronqué avec ellipse en mode Complet, jamais affiché en mode Réduit (icône seule + tooltip). **Défilement** (ajout Phase 8) : si le nombre d'items dépasse la hauteur disponible (rare, la bonne pratique §9 limite déjà à 7-9 items), défilement interne vertical de la seule zone de liste — la zone de marque et la zone secondaire (profil) restent fixes, jamais entraînées dans le défilement.

## 12. Performance

Montée une seule fois au niveau racine de l'application, jamais remontée à chaque navigation.

## 13. Tests

Accessibilité (item actif annoncé), interaction (bascule réduite/complète), visuel (les trois variantes, + Pinned/Floating/Docked/Auto Hide/Adaptive Width depuis la Phase 8).

---

# Grid (spécification complète)

## 1. Présentation

- **Objectif** : disposer une collection d'éléments homogènes (Cards) en grille responsive.
- **Contexte** : implémente le pattern Grid ([[COMPOSING_RULES.md]] §5).
- **Quand utiliser** : collection de Cards de même nature.
- **Quand ne pas utiliser** : liste dense sans image (utiliser Stack de lignes).
- **Alternatives** : Stack pour une liste verticale simple.

## 2. Anatomie

Conteneur avec résolution automatique du nombre de colonnes selon la largeur disponible et la classe d'appareil ([[LAYOUT_SYSTEM.md]] §1-3ter), gap constant ([[SPACING_SYSTEM.md]] §2).

## 3. Variantes

Densité Confortable / Compacte ([[SETTINGS_SPECIFICATION.md]], réglage utilisateur) — change le nombre de colonnes cible, jamais le gap.

## 4. États

N/A au niveau du conteneur — les états appartiennent aux Cards qu'il contient ([[CARD_SPECIFICATION.md]] §4).

## 5. Responsive

Voir [[LAYOUT_SYSTEM.md]] §1-3ter pour le nombre de colonnes par classe d'appareil — ce composant implémente ces valeurs, ne les redéfinit pas.

## 6. Accessibilité

`role="grid"` si navigation en deux dimensions est attendue (flèches haut/bas/gauche/droite), `role="list"` sinon (navigation séquentielle simple) — le choix dépend du contexte consommateur.

## 7. Design Tokens

Gap ([[SPACING_SYSTEM.md]] §2), tokens Grid ([[DESIGN_TOKENS.md]] §2).

## 8. Animations

Insertion/retrait d'un élément : List Insert/Remove ([[ANIMATION_LIBRARY.md]] §5-6), désactivé en défilement rapide ([[MOTION_GUIDELINES.md]] §7).

## 9-13. Bonnes pratiques, anti-patterns, cas limites, performance, tests

Voir [[CARD_SPECIFICATION.md]] §9-13 pour ce qui concerne le contenu ; propre au conteneur : virtualisation obligatoire au-delà du seuil de performance ([[PERFORMANCE_BUDGET.md]] §3), testée en interaction (navigation clavier en grille).

---

# TopBar / BottomBar / Dock (spécification compacte)

TopBar : voir [[TOPBAR_SPECIFICATION.md]] (Phase 8) pour la spécification complète — un simple renvoi ici évite une redondance entre les deux documents. BottomBar : équivalent Sidebar pour mobile (4 entrées maximum, [[RESPONSIVE_GUIDE.md]] §2), voir [[MOBILE_NAVIGATION.md]] (Phase 8) pour son rôle dans la navigation mobile. Dock : équivalent Sidebar en mode fenêtre très réduite (icônes seules, [[RESPONSIVE_GUIDE.md]] §5).

# Panel (spécification compacte)

Zone de contenu secondaire non modale (file d'attente, [[PLAYER_COMPONENTS.md]]). Élévation 1 ([[SURFACE_SYSTEM.md]] §6). Animation d'ouverture/fermeture : catégorie Standard, translation depuis le bord d'ancrage (jamais un fondu seul, qui masquerait l'origine spatiale du panneau) — cohérent avec [[PLAYER_EXPERIENCE.md]] §9 pour le cas de la Queue.

# SplitView / ResizablePanel (spécification compacte)

Implémentent Split View ([[COMPOSING_RULES.md]] §6). ResizablePanel ajoute une poignée de redimensionnement avec curseur contextuel ([[INTERACTION_LIBRARY.md]] §10) et une largeur minimale/maximale garantie.

# Container / Stack / Section (spécification compacte)

Implémentent directement [[COMPOSING_RULES.md]] §1-3 — aucune règle supplémentaire, ce sont des primitives structurelles sans état ni variante propre au-delà de ce qui est déjà décidé.

# Hero (spécification compacte)

Zone d'en-tête à fort impact visuel (ex. en-tête de page Album avec pochette grand format, [[SCREEN_SPECIFICATIONS.md]] §3). Rôle typographique Display ([[TYPOGRAPHY_GUIDE.md]] §4bis).

# MasterDetailLayout (spécification compacte)

Implémente Master-Detail ([[COMPOSING_RULES.md]] §8).

# Avatar (spécification compacte)

Image circulaire (utilisateur, artiste en contexte de portrait). Repli : initiales sur fond de couleur dérivée du nom (jamais une image cassée visible).

# Divider / Separator (spécification compacte)

Divider = ligne visuelle horizontale/verticale (`border-hairline`). Separator = équivalent sémantique avec `role="separator"` quand la séparation a une signification de structure (ex. entre groupes de menu).

# Scrollbar (spécification compacte)

Stylée de façon cohérente sur toute plateforme qui le permet, jamais masquée totalement (accessibilité du défilement au pointeur) — repli sur le style natif de l'OS quand la personnalisation n'est pas supportée.

# Skeleton / Spinner (spécification compacte)

Voir [[SKELETON_SYSTEM.md]] et [[ANIMATION_LIBRARY.md]] §3. Spinner réservé aux cas sans structure finale connue (rare, la majorité des cas utilisent Skeleton).

---

## Checklist de validation

- [ ] Sidebar et Grid couvrent les 13 sections en détail.
- [ ] Aucun pattern de [[COMPOSING_RULES.md]] n'est re-décidé ici — uniquement implémenté.
- [ ] Chaque composant a une règle responsive explicite ou un renvoi vers [[LAYOUT_SYSTEM.md]]/[[RESPONSIVE_GUIDE.md]].

## Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 6) | Senior Frontend Architect / React Component Architect |
| 0.2.0 | 2026-08-04 | Phase 8 : ajout §3bis (Pinned/Floating/Docked/Auto Hide/Adaptive Width) et §3ter (recherche intégrée) à Sidebar, défilement en §11 ; renvois TopBar/BottomBar vers les nouveaux documents dédiés — au lieu de créer SIDEBAR_SPECIFICATION.md en doublon | Navigation System Architect |

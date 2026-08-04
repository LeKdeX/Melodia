# COMPONENT_DEPENDENCY_GRAPH.md — Graphe de dépendances (Phase 7)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Senior Frontend Engineer / Performance Engineer
> **Documents liés** : [[COMPONENT_CHECKLIST.md]] §6, [[COMPONENT_HIERARCHY.md]]

> **Cadrage** : [[COMPONENT_CHECKLIST.md]] §6 donne l'ordre d'implémentation par palier (10 niveaux). [[COMPONENT_HIERARCHY.md]] classe par nature (fondamental/dérivé/composé/domaine). Ce document est plus fin que les deux : chaque arête ci-dessous est une dépendance directe et nommée entre deux composants précis, utile pour raisonner l'impact d'un changement sur un composant donné (« si je modifie Card, qu'est-ce que je casse potentiellement ? »).

---

## 1. Format

`Composant → dépend de → [liste]`. Une dépendance signifie : le composant source compose, hérite de, ou consomme un token/comportement défini par le composant cible — un changement cassant sur la cible impacte potentiellement la source.

## 2. Graphe (composants à plus fort impact — dépendus par le plus grand nombre)

```
DESIGN_TOKENS → dépend de → []                                    (racine, 0 dépendance entrante nulle part)
Button        → dépend de → [DESIGN_TOKENS, ACCESSIBILITY_COMPONENTS]
Card          → dépend de → [DESIGN_TOKENS, SURFACE_SYSTEM, TYPOGRAPHY_GUIDE, ACCESSIBILITY_COMPONENTS]
TextField     → dépend de → [DESIGN_TOKENS, ACCESSIBILITY_COMPONENTS]
```

## 3. Arêtes par composant dérivé (niveau 1)

```
IconButton, ToggleButton, SegmentedButton, FAB, Link, Split Button, Command Button, Menu Button
  → dépend de → [Button]

PasswordField, Textarea, SearchField, Tag Input/Chip Input
  → dépend de → [TextField]

Track Card, Album Card, Artist Card, Playlist Card, Genre Card, Library Card, Statistics Cards
  → dépend de → [Card]

Wrapped Cards → dépend de → [Statistics Cards → Card]
VolumeSlider, Range Slider → dépend de → [Slider]
Combobox (= Autocomplete) → dépend de → [Select]
Command Palette (= Command Menu) → dépend de → [Combobox → Select]
Snackbar, Notification → dépend de → [Toast]
Chip → dépend de → [Badge]
Tag → dépend de → [Chip → Badge]
User Avatar → dépend de → [Avatar]
Modal → dépend de → [Dialog]
BottomSheet → dépend de → [Modal → Dialog]
```

## 4. Arêtes par composant composé (niveau 2, dépendances multiples)

```
Search Results → dépend de → [Card, Skeleton, Empty State, TYPOGRAPHY_GUIDE]
Album Grid → dépend de → [Grid, Album Card → Card]
Preference Row → dépend de → [Switch, Select, Slider, TYPOGRAPHY_GUIDE]
Queue Item → dépend de → [IconButton, TYPOGRAPHY_GUIDE, DESIGN_TOKENS]
Input OTP → dépend de → [TextField]
Loading Overlay → dépend de → [CircularProgress]
Step Indicator → dépend de → [DESIGN_TOKENS, ACCESSIBILITY_COMPONENTS]
Navigation Group → dépend de → [Sidebar]
```

## 5. Arêtes par composant spécifique au domaine (niveau 3, le plus haut impact en cascade)

```
Player (Mini/Expanded/Fullscreen) → dépend de → [Card (anatomie), Slider, IconButton, DYNAMIC_THEME_GUIDE, PLAYER_SPECIFICATION]
Now Playing Bar → dépend de → [Player]
Preference Row (Toggle/Slider/Select/Color Picker Row) → dépend de → [Preference Row]
Settings Card → dépend de → [Card]
Cache Manager → dépend de → [Dialog (confirmation)]
```

## 6. Composants les plus « dangereux » à modifier

Classés par nombre d'arêtes entrantes directes + indirectes (impact en cascade) :

1. **Card** — dépendu par 9 cartes dérivées + Search Results + Album Grid + Settings Card (impact le plus large de toute la bibliothèque).
2. **Button** — dépendu par 8 composants dérivés + tous les boutons du domaine lecteur ([[BUTTON_SPECIFICATION.md]] §Boutons du domaine lecteur).
3. **TextField** — dépendu par 4 composants dérivés + Input OTP.
4. **DESIGN_TOKENS** — dépendu directement ou indirectement par 100 % de la bibliothèque (racine de tout changement de valeur visuelle).

**Règle d'usage** : toute modification sur l'un de ces quatre composants suit obligatoirement la procédure de gouvernance déjà définie ([[DESIGN_TOKENS.md]] §6) et nécessite un test de non-régression visuel sur chaque composant dépendant listé ci-dessus, jamais un test isolé au composant modifié seul.

---

## 7. Checklist de validation

- [ ] Chaque arête a une direction claire (source dépend de cible), jamais une relation bidirectionnelle ambiguë.
- [ ] Les quatre composants à plus haut impact (§6) sont cohérents avec le nombre d'arêtes réellement listées en §2-5.
- [ ] Aucune dépendance circulaire (un composant qui dépendrait, même indirectement, de lui-même).

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 7) | Senior Frontend Engineer / Performance Engineer |

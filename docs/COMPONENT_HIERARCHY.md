# COMPONENT_HIERARCHY.md — Hiérarchie officielle des composants (Phase 7)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal Design System Architect
> **Documents liés** : [[COMPONENT_LIBRARY.md]], [[COMPONENT_CHECKLIST.md]] §6, [[FOUNDATIONS.md]] §3

> **Cadrage** : [[COMPONENT_CHECKLIST.md]] §6 ordonne déjà les composants par dépendance d'implémentation (quoi construire avant quoi). Ce document répond à une question différente et complémentaire : la classification par **nature** (fondamental, dérivé, composé, spécifique au domaine) — la carte conceptuelle du système, pas son ordre de construction.

---

## 1. Les quatre niveaux de la hiérarchie

1. **Fondamentaux** : composants sans dépendance à un autre composant de cette bibliothèque, construits directement sur les tokens ([[DESIGN_TOKENS.md]]). Ex. Button, TextField, Card.
2. **Dérivés** : composants qui héritent intégralement l'anatomie d'un fondamental, n'ajoutant qu'une variation contenue (une prop, un contexte) — jamais une anatomie nouvelle. Ex. IconButton (dérive de Button), PasswordField (dérive de TextField).
3. **Composés** : assemblages de plusieurs fondamentaux/dérivés en une unité fonctionnelle nouvelle, avec sa propre anatomie de haut niveau. Ex. Search Results (compose Card + Skeleton + Empty State), Preference Row (compose Label + Switch/Select/Slider).
4. **Spécifiques au domaine** : composés dont l'anatomie et le comportement sont indissociables d'une fonctionnalité produit précise de Melodia, jamais réutilisables tels quels ailleurs. Ex. Queue Item, Now Playing Bar, Wrapped Cards.

## 2. Arbre de la hiérarchie

```
FONDAMENTAUX
├─ Button ──────────┬─ IconButton ─┬─ ToggleButton ─── SegmentedButton (= Segmented Control)
│                    │              └─ FAB
│                    ├─ Split Button
│                    ├─ Command Button
│                    ├─ Menu Button
│                    └─ Link
├─ TextField ────────┬─ PasswordField
│                     ├─ Textarea
│                     ├─ SearchField (= Search Bar)
│                     └─ Tag Input / Chip Input
├─ Card ─────────────┬─ Track/Album/Artist/Playlist/Genre/Library Card
│                     └─ Statistics Cards ── Wrapped Cards
├─ Checkbox/Radio/Switch
├─ Select ───────────┬─ Combobox (= Autocomplete) ── Command Palette (= Command Menu)
├─ Slider ───────────┬─ VolumeSlider
│                     └─ Range Slider
├─ Dialog ───────────── Modal ── BottomSheet
├─ Toast ────────────┬─ Snackbar
│                     └─ Notification
├─ Tabs
├─ Sidebar ──────────── (variante réduite = Navigation Rail)
├─ Grid
├─ Badge ────────────┬─ Chip ── Tag
├─ Avatar ───────────── User Avatar
└─ Empty State (= Empty Placeholder)

COMPOSÉS (assemblent plusieurs fondamentaux/dérivés)
├─ Search Results (Card + Skeleton + Empty State)
├─ Album Grid (Grid + Card)
├─ Preference Row (Label + Switch/Select/Slider)
├─ Navigation Group (Sidebar + regroupement)
└─ Step Indicator

SPÉCIFIQUES AU DOMAINE (composés indissociables d'une fonctionnalité Melodia)
├─ Player (Mini/Expanded/Fullscreen) — compose Card-like anatomie + Slider + Button
├─ Queue Item — compose Card-like anatomie + IconButton
├─ Now Playing Bar — instance domaine du Mini Player
├─ Wrapped Cards — instance domaine de Statistics Cards
└─ Settings Card / Cache Manager / Developer Panel — instances domaine de Card/Panel
```

## 3. Règle de placement

Un nouveau composant est toujours positionné au niveau le plus bas possible de cette hiérarchie — un composant qui *peut* être un Dérivé ne devient jamais un Composé par facilité d'implémentation (cohérent avec [[FOUNDATIONS.md]] §2, simplicité avant complexité). Un composant Spécifique au domaine qui s'avère réutilisable ailleurs sans modification doit être reclassé en Composé, jamais dupliqué sous deux noms.

---

## 4. Checklist de validation

- [ ] Chaque composant de [[COMPONENT_LIBRARY.md]] §4 apparaît quelque part dans l'arbre (§2), aucun orphelin.
- [ ] Aucun composant Fondamental ne dépend d'un composant Dérivé, Composé ou Spécifique au domaine (la dépendance va toujours du bas vers le haut de la hiérarchie).
- [ ] Les fusions déjà actées (Segmented Control, Navigation Rail, Command Menu, Search Bar, Autocomplete, Empty Placeholder, Confirmation Dialog) sont visibles dans l'arbre, jamais dupliquées comme entrées séparées.

---

## 5. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 7) | Principal Design System Architect |

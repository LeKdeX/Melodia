# SCREEN_COMPONENT_MATRIX.md — Matrice composants/écrans et navigation complète (Phase 10)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Information Architect / Senior UI Engineer
> **Documents liés** : [[COMPONENT_CHECKLIST.md]], [[NAVIGATION_PATTERNS.md]], [[PERFORMANCE_GUIDE.md]] §6ter

> **Cadrage** : [[COMPONENT_CHECKLIST.md]] croise déjà les composants entre eux, [[NAVIGATION_PATTERNS.md]] les composants de navigation entre eux. Cette matrice croise une dimension encore absente : quel **écran** utilise quel composant — utile pour mesurer l'impact d'un changement de composant sur l'ensemble des écrans qui le consomment.

---

## 1. Composants par écran (extrait représentatif)

| Écran | Composants principaux |
|---|---|
| Home Screen | Hero réduit, Grid ×6, Statistics Cards, Skeleton |
| Library Screens | Tabs, Filters, Grid/List, Album/Artist/Track/Genre Card |
| Album Screen | Hero, Track Row, Dropdown (Versions), SegmentedButton/Tabs (Disc Selector) |
| Artist Screen | Hero, Track Row, Artist Card (Related), Grid |
| Playlist Screen | Hero, Track Row (réorganisable), Chip (Filters) |
| Player Screens | Toutes formes du lecteur, Slider, IconButton ×8, Lyrics Panel, Visualizer |
| Search Screens | SearchField, Chip, Card (tous types), BottomSheet (Advanced) |
| Download Screens | Tabs, Track Row + ProgressBar, Menu Button |
| Statistics Screens | Statistics Cards, Charts, Heatmap, Badge (Achievements) |
| Settings Screens | Sidebar (variante Settings), Preference Row (toutes variantes) |
| Sync Screens | Banner, Code Block (Logs), Dialog (Conflicts) |
| Error Screens | Empty State (anatomie), Dialog, Banner |
| Onboarding Screens | Hero, TextField, PasswordField, Step Indicator, Theme Selector |

## 2. Composants partagés par le plus grand nombre d'écrans

| Composant | Nombre d'écrans consommateurs (approximatif) | Implication |
|---|---|---|
| Card (toute variante) | 8+ écrans | Composant à plus haut impact de cette phase — cohérent avec [[COMPONENT_DEPENDENCY_GRAPH.md]] §6, déjà identifié comme le plus dangereux à modifier |
| Track Row | 6+ écrans (Album, Artist, Playlist, Search, Download, History) | Toute modification de son anatomie ([[TRACK_COMPONENTS.md]] §1) impacte la majorité des écrans de contenu |
| Empty State | Tous les écrans de contenu, sans exception | Composant universel — voir [[STATE_COMPONENTS.md]] |
| Mini Player | Tous les écrans, sans exception | Persistant par constitution ([[NAVIGATION_SYSTEM.md]] §1) |

## 3. Composants exclusifs à un seul écran

| Composant | Écran exclusif |
|---|---|
| Disc Selector | Album Screen uniquement |
| Step Indicator (dans son usage actuel) | Onboarding Screens uniquement |
| Code Block (Logs) | Sync Screens uniquement (usage développeur) |
| Wrapped Cards (séquence plein écran) | Wrapped uniquement, jamais réutilisée ailleurs |

## 4. Écrans les plus coûteux en performance (renvoi)

Voir [[PERFORMANCE_GUIDE.md]] §6ter — Library Screens, Fullscreen Player + Visualizer, Statistics Screens (Heatmap/Charts), Search Results, Download Queue — déjà identifiés et priorisés, non redécidés ici.

## 5. Diagramme complet de la navigation du produit

```
                              ┌───────────────┐
                              │  Onboarding    │ (une seule fois)
                              └───────┬────────┘
                                      ▼
        ┌─────────────────────────────────────────────────────┐
        │                    HOME SCREEN                        │
        └───┬──────────┬───────────┬──────────┬────────────────┘
            ▼          ▼           ▼          ▼
     ┌──────────┐ ┌─────────┐ ┌────────┐ ┌───────────┐
     │ Library   │ │ Search  │ │ Stats/ │ │ Settings   │
     │ Screens   │ │ Screens │ │Wrapped │ │ Screens    │
     └─────┬─────┘ └────┬────┘ └────────┘ └───────────┘
           │            │
     ┌─────┴──────┬─────┴─────┐
     ▼            ▼           ▼
┌─────────┐ ┌───────────┐ ┌───────────┐
│  Album   │ │  Artist   │ │ Playlist  │
│  Screen  │ │  Screen   │ │  Screen   │
└────┬─────┘ └─────┬─────┘ └─────┬─────┘
     │             │             │
     └─────────────┴──────┬──────┘
                           ▼
                  ┌─────────────────┐
                  │  Player Screens  │ ◄──── accessible depuis TOUT écran
                  │ (Mini→Fullscreen)│       via le Mini Player persistant
                  └────────┬─────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
       ┌──────────┐ ┌───────────┐ ┌──────────┐
       │  Lyrics   │ │  Queue    │ │  Device   │
       │   View    │ │   View    │ │ Selector  │
       └──────────┘ └───────────┘ └──────────┘

   Overlays/Modales transverses (accessibles depuis n'importe quel écran) :
   Command Palette · Context Menu · Dialog (confirmation) · Toast/Snackbar/Banner

   Écrans d'état (remplacent le contenu de n'importe quel écran de contenu) :
   Error Screens (2 cas plein écran) · Sync Screens (Conflicts, sur consultation) · Download Screens
```

**Lecture** : les Player Screens ne sont jamais un cul-de-sac — accessibles et quittables depuis n'importe quel nœud, cohérent avec [[PRODUCT_RULES.md]] §1. Les overlays transverses ne créent jamais d'entrée dans l'historique de navigation ([[NAVIGATION_HISTORY.md]] §2, seules les vraies navigations de page empilent).

---

## 6. Checklist de validation

- [ ] Chaque écran de la Phase 10 apparaît au moins une fois dans la matrice (§1) ou le diagramme (§5).
- [ ] Card et Track Row restent identifiés comme composants à plus haut impact, cohérent avec [[COMPONENT_DEPENDENCY_GRAPH.md]] §6.
- [ ] Le diagramme distingue clairement navigation de page, panneaux locaux et overlays transverses.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 10) | Information Architect / Senior UI Engineer |

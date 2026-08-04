# NAVIGATION_PATTERNS.md — Matrice de compatibilité et parcours de navigation (Phase 8)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Navigation System Architect / Information Architect
> **Documents liés** : [[COMPONENT_CHECKLIST.md]] §2-6, [[NAVIGATION_SYSTEM.md]], [[USER_JOURNEYS.md]]

> **Cadrage** : [[COMPONENT_CHECKLIST.md]] §2-6 a déjà établi le format de matrice de composition (composable/jamais imbriqué/tokens partagés/dépendances) pour l'ensemble de la bibliothèque de composants — ce document applique ce même format, jamais un nouveau, au sous-ensemble des composants de navigation. Le diagramme de parcours (§3) est un artefact réellement nouveau, sans équivalent existant.

---

## 1. Composants de navigation combinables

| Combinaison | Contexte |
|---|---|
| Sidebar + TopBar | Desktop/laptop, coexistence permanente ([[NAVIGATION_SYSTEM.md]] §2) |
| BottomBar + Mini Player | Mobile, le Mini Player reste ancré au-dessus ([[MOBILE_NAVIGATION.md]] §8) |
| TopBar + Breadcrumb | Vue profonde, le Breadcrumb remplace le titre simple dans la même zone ([[TOPBAR_SPECIFICATION.md]] §2) |
| Sidebar (Réduite) + Tooltip | Mode icônes seules, chaque item révèle son libellé au survol ([[LAYOUT_COMPONENTS.md]] §11) |
| Drawer + BottomBar | Mobile, le Drawer complète les Bottom Tabs pour les catégories non promues ([[MOBILE_NAVIGATION.md]] §3) |
| Command Palette + n'importe quel écran | Point d'entrée universel, jamais restreint à un contexte particulier ([[COMMAND_PALETTE.md]] §1) |

## 2. Composants de navigation incompatibles (jamais combinés)

| Paire | Raison |
|---|---|
| Sidebar + BottomBar simultanément | Deux navigations principales concurrentes sur le même écran violeraient la règle « un seul chemin vers chaque destination » ([[NAVIGATION_SYSTEM.md]] §1) — la classe d'appareil détermine laquelle est active, jamais les deux |
| Drawer + Sidebar simultanément | Le Drawer est l'équivalent mobile de la Sidebar Floating ([[MOBILE_NAVIGATION.md]] §3) — les deux répondent au même besoin, jamais montés ensemble |
| Deux Command Palette ouvertes | Cohérent avec la règle déjà actée « jamais deux Dialogs ouverts simultanément » ([[COMPONENT_CHECKLIST.md]] §3), appliquée à la Command Palette qui est elle-même une surface modale |
| Breadcrumb + Tabs sur la même ligne horizontale | Les deux sont des mécanismes de navigation horizontale — combinés sur la même ligne, ils créent une ambiguïté de ce qui est cliquable ; le Breadcrumb vit dans la TopBar (§1), les Tabs dans le corps de la page ([[TOPBAR_SPECIFICATION.md]] §2, [[NAVIGATION_COMPONENTS.md]]) |

## 3. Composants qui partagent les mêmes comportements

| Comportement | Composants |
|---|---|
| Pile de navigation et retour ([[NAVIGATION_HISTORY.md]] §2) | Sidebar (clic sur item), TopBar (Breadcrumb), Command Palette (résultat de navigation), Drawer, BottomBar |
| Ordre de focus gauche-à-droite/haut-en-bas ([[NAVIGATION_GUIDE.md]] §8) | Sidebar, TopBar, Tabs, Breadcrumb |
| Régions de repère ARIA ([[ACCESSIBILITY_GUIDE.md]] §6bis) | Sidebar (`navigation`), TopBar (`banner`), contenu principal (`main`), panneaux secondaires (`complementary`) |

## 4. Diagramme des parcours de navigation possibles

```
                         ┌─────────────┐
                         │  Command    │◄──────────────────────┐
                         │  Palette    │                        │
                         └──────┬──────┘                        │
                                │ (Ctrl/Cmd+K, depuis n'importe où)
                                ▼                                │
┌──────────┐    clic item    ┌─────────────────────┐   clic    │
│ Sidebar/ │ ───────────────►│   Vue de contenu     │◄──────────┘
│ BottomBar│                 │  (empile l'historique,│
└────┬─────┘                 │   NAVIGATION_HISTORY  │
     │                       │        §2)            │
     │ toujours visible      └──────┬───────┬─────────┘
     ▼                              │       │
┌──────────┐                 clic carte  clic Breadcrumb
│Mini Player│                        │       │
│(persistant)│                       ▼       ▼
└────┬──────┘               ┌─────────┐ ┌──────────┐
     │ tap/clic              │ Détail  │ │  Niveau   │
     ▼                       │(Album/  │ │ parent    │
┌──────────┐                 │ Artiste)│ │(retour)   │
│ Expanded/ │                └────┬────┘ └──────────┘
│ Fullscreen│                     │
│  Player   │                     │ retour (geste bord / bouton / Retour clavier)
└──────────┘                     ▼
                          ┌──────────────┐
                          │  Vue précédente,│
                          │  état restauré  │
                          │ (NAVIGATION_    │
                          │  HISTORY §3)    │
                          └──────────────┘
```

**Règle de lecture** : chaque flèche de ce diagramme correspond à une transition déjà chorégraphiée dans [[TRANSITION_GUIDE.md]] — ce diagramme n'introduit aucune nouvelle transition, il montre uniquement comment elles s'enchaînent dans un parcours réel. Le Mini Player et son accès à l'Expanded/Fullscreen Player restent accessibles depuis n'importe quel nœud de ce diagramme, jamais uniquement depuis un point d'entrée unique — cohérent avec [[PRODUCT_RULES.md]] §1.

---

## 5. Checklist de validation

- [ ] Chaque paire « combinable »/« incompatible » a une raison explicite, jamais une règle arbitraire.
- [ ] Le diagramme (§4) couvre le parcours complet demandé par le cadrage, du point d'entrée jusqu'au retour.
- [ ] Aucune règle ici ne contredit [[COMPONENT_CHECKLIST.md]] §2-3, qui reste la référence pour les composants non spécifiques à la navigation.

---

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 8) | Navigation System Architect / Information Architect |

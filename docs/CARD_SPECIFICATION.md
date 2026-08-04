# CARD_SPECIFICATION.md — Composant Card (Phase 6)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : React Component Architect / Product Designer
> **Documents liés** : [[COMPONENT_LIBRARY.md]], [[SURFACE_SYSTEM.md]] §3, [[LIBRARY_COMPONENTS.md]]

> **Cadrage** : `Card` est la base générique dont dérivent tous les composants de type carte spécifiques au domaine (`Track Card`, `Album Card`, `Artist Card`, etc., documentés dans [[LIBRARY_COMPONENTS.md]] et [[PLAYER_COMPONENTS.md]] en profondeur compacte avec renvoi ici pour l'anatomie et les tokens communs).

---

## 1. Présentation

- **Nom** : Card.
- **Objectif** : présenter un objet (musical ou non) comme une unité cliquable autonome dans une grille ou une liste.
- **Contexte d'utilisation** : bibliothèque, résultats de recherche, playlists, statistiques.
- **Valeur utilisateur** : reconnaissance rapide d'un objet par sa pochette/image et ses métadonnées principales sans avoir à ouvrir le détail.
- **Quand utiliser** : tout objet qui a une image d'illustration et mérite une action de navigation en un clic.
- **Quand ne pas utiliser** : une ligne de liste dense (file d'attente) où l'image n'apporte pas de valeur suffisante pour justifier l'espace — utiliser une ligne de liste simple à la place (voir `Queue Item`, [[PLAYER_COMPONENTS.md]]).
- **Alternatives** : ligne de liste (plus dense, sans image dominante).

## 2. Anatomie

```
┌─────────────────────────┐
│                         │
│      Image/Pochette     │  ← ratio 1:1 par défaut
│                         │
├─────────────────────────┤
│ Title (rôle Title)      │
│ Subtitle (rôle Subtitle)│  ← optionnel, jamais sans Title
└─────────────────────────┘
   [Overlay d'action au survol, optionnel]
```

- **Image** : ratio carré par défaut (pochette), ratio portrait pour Artist Card (portrait/avatar). Toujours un espace réservé de même dimension pendant le chargement (voir `Skeleton`, [[LAYOUT_COMPONENTS.md]]).
- **Zone de texte** : Title + Subtitle optionnel, rôles typographiques ([[TYPOGRAPHY_GUIDE.md]] §4bis).
- **Overlay d'action** : apparaît au survol/focus uniquement (ex. bouton lecture superposé à la pochette) — jamais visible en permanence, ce qui alourdirait visuellement une grille dense.

## 3. Variantes

| Variante | Usage |
|---|---|
| Elevated | Élévation niveau 1 ([[SURFACE_SYSTEM.md]] §3), utilisée quand la carte doit se détacher d'un fond neutre |
| Outlined | Aucune élévation, bordure `border-hairline` — utilisée dans le thème Minimal ([[THEMES_GUIDE.md]] §4) où l'ombre est jugée trop chargée |
| Interactive (par défaut) | Réagit au survol/focus (§4) |
| Compact | Zone de texte réduite au Title seul, pour les grilles à très haute densité |

## 4. États

| État | Comportement |
|---|---|
| Default | Élévation de base de la variante |
| Hover | Légère élévation supplémentaire (+1 niveau, jamais plus), overlay d'action apparaît |
| Focus | Contour `focus-ring` autour de la carte entière |
| Pressed | Léger retour d'échelle sur l'image uniquement, jamais toute la carte |
| Loading | Voir `Skeleton` ([[SKELETON_SYSTEM.md]] §2) |
| Selected | Utilisé uniquement en contexte de sélection multiple (ex. gestion de playlist) — bordure `accent-500` |

## 5. Responsive

Le nombre de colonnes de la grille qui contient la carte varie par classe d'appareil ([[LAYOUT_SYSTEM.md]] §1-3ter) — la carte elle-même ne change jamais de proportion, seule sa taille absolue suit la largeur de colonne disponible.

## 6. Accessibilité

Voir [[ACCESSIBILITY_COMPONENTS.md]]. Toute la carte est une cible cliquable unique (jamais plusieurs zones cliquables qui se chevauchent de façon ambiguë), navigable au clavier comme un seul élément focusable avec un nom accessible qui combine Title et Subtitle.

## 7. Design Tokens

Élévation (`shadow-elevation-0/1`, [[SURFACE_SYSTEM.md]] §3), rayon `radius-md` ([[SURFACE_SYSTEM.md]] §7), padding interne de la zone de texte ([[SPACING_SYSTEM.md]] §1), gap grille ([[SPACING_SYSTEM.md]] §2).

## 8. Animations

Ouverture vers le détail : Shared Element Navigate ([[ANIMATION_LIBRARY.md]] §2). Hover : transition d'élévation catégorie Micro. Chargement d'image : fondu progressif ([[MOTION_GUIDELINES.md]] §6).

## 9. Bonnes pratiques

- Ratio d'image constant au sein d'une même grille — jamais mélanger carré et portrait dans la même rangée.
- Title toujours présent, Subtitle seulement si l'information est réellement différenciante.

## 10. Anti-patterns

- **Plus de deux actions dans l'overlay au survol** : surcharge une interaction censée rester légère — au-delà de deux, utiliser le menu contextuel ([[OVERLAY_COMPONENTS.md]]).
- **Carte sans image de repli** : voir cas limites §11.

## 11. Cas limites

- **Titre très long** : troncature avec ellipse après deux lignes, jamais un débordement qui casse la grille.
- **Image absente** : illustration générique cohérente avec le thème actif ([[PREMIUM_DETAILS.md]] §10), jamais un carré vide.
- **Connexion lente** : Skeleton affiché au-delà de 300ms ([[SKELETON_SYSTEM.md]] §1).
- **Zoom 200%** : la grille repasse en colonne unique avant que le texte ne déborde.

## 12. Performance

Rendu virtualisé obligatoire au-delà d'un seuil d'éléments ([[PERFORMANCE_BUDGET.md]] §3) — une grille de bibliothèque ne monte jamais plus de cartes que ce qui est visible + une marge de préchargement. Image chargée en lazy loading avec préchargement discret des cartes hors-écran proches ([[PREMIUM_DETAILS.md]] §33).

## 13. Tests

Unitaires (rendu par variante), visuels (ratio image, troncature de texte), accessibilité (cible unique, nom accessible combiné), responsive (nombre de colonnes par breakpoint), performance (pas de re-render au défilement d'une carte non visible).

---

## Checklist de validation

- [ ] L'anatomie et les tokens définis ici sont réellement réutilisés par toutes les cartes dérivées ([[LIBRARY_COMPONENTS.md]], [[PLAYER_COMPONENTS.md]]) sans redéfinition locale.
- [ ] Chaque variante a une règle d'usage explicite.
- [ ] Le cas de l'image absente est couvert sans exception.

## Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 6) | React Component Architect / Product Designer |

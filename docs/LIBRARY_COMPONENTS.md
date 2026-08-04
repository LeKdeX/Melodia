# LIBRARY_COMPONENTS.md — Composants de bibliothèque et statistiques (Phase 6)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / React Component Architect
> **Documents liés** : [[COMPONENT_LIBRARY.md]], [[CARD_SPECIFICATION.md]], [[LIBRARY_SPECIFICATION.md]], [[STATISTICS_SPECIFICATION.md]]

> **Cadrage** : toutes les cartes de ce document dérivent de [[CARD_SPECIFICATION.md]] — seules les différences de contenu sont documentées. `Album Grid` et `Track Card` sont en profondeur complète.

---

# Album Grid (spécification complète)

## 1. Présentation

- **Objectif** : afficher la collection d'albums en grille parcourable.
- **Contexte** : implémente Grid ([[LAYOUT_COMPONENTS.md]]) avec Album Card.
- **Quand utiliser** : vue Albums de la bibliothèque.
- **Alternatives** : Album List pour une densité plus élevée avec moins d'information visuelle par élément.

## 2. Anatomie

Grid ([[LAYOUT_COMPONENTS.md]]) peuplée d'Album Card (§ci-dessous), triable et filtrable (barre d'outils au-dessus, [[SPACING_SYSTEM.md]] §2 pour le gap des contrôles).

## 3. Variantes

Densité Confortable/Compacte ([[SETTINGS_SPECIFICATION.md]]).

## 4. États

Chargement (Skeleton, [[SKELETON_SYSTEM.md]] §2), Peuplée, Vide (Empty State, [[STATE_COMPONENTS.md]]), Filtrée sans résultat.

## 5. Responsive

Voir [[LAYOUT_SYSTEM.md]] §1-3ter pour le nombre de colonnes.

## 6. Accessibilité

`role="grid"`, tri annoncé au changement.

## 7. Design Tokens

Hérite de Grid ([[LAYOUT_COMPONENTS.md]]) et Album Card (§ci-dessous).

## 8. Animations

List Insert/Remove au tri ou filtrage ([[ANIMATION_LIBRARY.md]] §5-6).

## 9-13. Bonnes pratiques à Tests

Voir [[CARD_SPECIFICATION.md]] §9-13 et [[LAYOUT_COMPONENTS.md]] (Grid) — aucune règle supplémentaire propre à Album Grid au-delà du contenu affiché.

---

# Track Card (spécification complète)

## 1. Présentation

- **Objectif** : représenter un titre individuel dans un contexte de grille/carte (distinct de Queue Item, qui sert la file).
- **Contexte** : résultats de recherche, listes de titres populaires.
- **Alternatives** : ligne de liste simple si la densité prime sur l'image ([[LIBRARY_SPECIFICATION.md]]).

## 2. Anatomie

Dérive de Card ([[CARD_SPECIFICATION.md]] §2) : pochette carrée, Title (titre), Subtitle (artiste), durée en overlay ou en coin (rôle Code, tabulaire).

## 3. Variantes

Standard, Compacte (liste dense, image réduite).

## 4. États

Hérite de Card §4, ajoute En cours de lecture (surlignage, identique au traitement de Queue Item, [[PLAYER_COMPONENTS.md]]).

## 5-8. Responsive, Accessibilité, Tokens, Animations

Hérite intégralement de Card ([[CARD_SPECIFICATION.md]] §5-8).

## 9-13. Bonnes pratiques à Tests

Propre à Track Card : le bouton de lecture apparaît dans l'overlay au survol (§Card §2), jamais un second point d'entrée qui dupliquerait le clic principal sur la carte (l'un lance la lecture immédiate, l'autre ouvre le détail — jamais les deux comportements sur la même zone).

---

# Cartes individuelles (spécification compacte)

> **Ajout auto-revue Phase 6** : l'index ([[COMPONENT_LIBRARY.md]] §4) promettait ces cinq cartes individuelles, distinctes de leurs Grids conteneurs (ci-dessous) — elles n'avaient pas d'entrée explicite dans la version initiale de ce document, corrigé ici. Chacune dérive intégralement de [[CARD_SPECIFICATION.md]] pour l'anatomie/tokens/états/accessibilité — seule la variation de contenu est documentée.

**Album Card** : pochette carrée, Title = titre de l'album, Subtitle = nom de l'artiste. Overlay d'action : lecture de l'album complet.

**Artist Card** : image en cercle plutôt que carrée (seule variation d'anatomie par rapport à [[CARD_SPECIFICATION.md]] §2), Title = nom de l'artiste, pas de Subtitle par défaut (le nombre d'albums peut apparaître en Caption sous le Title si pertinent). Overlay d'action : lecture aléatoire des titres de l'artiste.

**Playlist Card** : pochette composite (mosaïque des 4 pochettes les plus représentatives) si la playlist n'a pas d'image dédiée, jamais un carré vide dans ce cas précis ([[CARD_SPECIFICATION.md]] §11 traite l'image absente générique ; ce repli composite est spécifique aux playlists). Title = nom de la playlist, Subtitle = nombre de titres.

**Genre Card** : pas de pochette individuelle — couleur de fond dérivée du genre (jamais une couleur arbitraire, dérivation déterministe du nom pour rester stable dans le temps). Title = nom du genre uniquement, jamais de Subtitle.

**Library Card** : carte générique de repli utilisée quand le type de contenu n'est pas encore déterminé au moment du rendu (ex. élément de collection mixte) — anatomie strictement identique à [[CARD_SPECIFICATION.md]] sans variation de contenu propre, jamais utilisée quand un type de carte plus spécifique (Album/Artist/Playlist/Genre/Track Card) est déjà connu.

---

# Composants compacts (grilles et listes conteneurs)

**Album List / Artist List** (ligne dense : pochette miniature + Title + Subtitle + actions, densité Queue Item) · **Artist Grid** (Grid peuplée d'Artist Card, ci-dessus) · **Playlist Grid** (Grid peuplée de Playlist Card, ci-dessus) · **Genre Grid** (Grid peuplée de Genre Card, ci-dessus) · **Collection Grid** (générique, regroupe Album/Playlist/Genre Grid selon le contexte, peuplée de Library Card quand le type n'est pas déterminé) · **Folder View** (arborescence, si l'import de fichiers locaux l'exige — [[JELLYFIN_INTEGRATION.md]]) · **Pinned Items** (sous-ensemble de Grid limité aux éléments épinglés, [[FEATURE_ROADMAP.md]] idée #27) · **Favorites** (Grid filtrée sur le statut favori) · **Recently Added / Recently Played** (Grid triée, lecture seule, jamais réorganisable manuellement) · **Statistics Cards** (Card avec un chiffre en rôle Display plutôt qu'une image, [[STATISTICS_SPECIFICATION.md]]) · **Wrapped Cards** (variante à fort impact visuel de Statistics Cards, [[WRAPPED_SPECIFICATION.md]], seul contexte où une animation d'entrée plus marquée que la normale est justifiée — moment de célébration annuel) · **Charts / Graphs** (voir `dataviz` — hors du gabarit standard, palette et formes suivent [[COLOR_SYSTEM.md]] §5 couleurs d'état jamais réutilisées à des fins décoratives) · **Timeline** (Stack vertical d'événements horodatés, utilisé dans Wrapped et l'historique) · **Heatmap** (ajout Phase 9 — grille calendaire ou horaire, intensité de couleur = volume d'écoute, dérivée de `accent-500` en dégradé d'opacité jamais d'une palette arc-en-ciel qui introduirait une échelle de couleur non prévue par [[COLOR_SYSTEM.md]] ; utilisée pour « Heures d'écoute » et « Activité quotidienne » [[STATISTICS_SPECIFICATION.md]] §3 ; accessible via un tableau de données alternatif pour lecteur d'écran, une heatmap seule n'étant jamais accessible par nature visuelle).

---

## Checklist de validation

- [ ] Album Grid et Track Card couvrent les 13 sections en détail.
- [ ] Chaque carte dérivée renvoie à [[CARD_SPECIFICATION.md]] pour l'anatomie commune, jamais redéfinie.
- [ ] Wrapped Cards justifie explicitement son exception d'animation plus marquée.
- [ ] Album/Artist/Playlist/Genre/Library Card ont chacune une entrée explicite, distincte de leur Grid conteneur.

## Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 6) | Product Designer / React Component Architect |
| 0.2.0 | 2026-08-04 | Auto-revue Phase 6 : ajout des cinq cartes individuelles (Album/Artist/Playlist/Genre/Library Card) promises par l'index mais absentes du corps du document | Product Designer / React Component Architect |
| 0.3.0 | 2026-08-04 | Phase 9 : ajout de Heatmap — au lieu de créer STATISTICS_COMPONENTS.md/WRAPPED_COMPONENTS.md en doublon des composants déjà spécifiés | Principal Music Experience Designer |

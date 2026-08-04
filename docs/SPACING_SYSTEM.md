# SPACING_SYSTEM.md — Règles d'usage de l'espacement (Phase 5)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Design Token Specialist / UX Engineer
> **Documents liés** : [[DESIGN_TOKENS.md]] §4, [[LAYOUT_SYSTEM.md]], [[COMPOSING_RULES.md]]

> **Cadrage** : [[DESIGN_TOKENS.md]] §4 a déjà défini l'échelle elle-même (4/8/12/16/24/32/48/64). Ce document ne redéfinit pas cette échelle — il prescrit *quel cran de l'échelle utiliser dans quel contexte*, ce qui manquait jusqu'ici.

---

## 1. Padding interne des composants

| Composant | Padding | Justification |
|---|---|---|
| Bouton (taille standard) | 12px vertical / 16px horizontal | Zone de frappe suffisante sans excès ([[ICONOGRAPHY_GUIDE.md]] §5 pour la référence tactile) |
| Card | 16px | Cohérent avec la densité de bibliothèque ([[LIBRARY_SPECIFICATION.md]]) |
| Input | 12px vertical / 12px horizontal | Aligné au bouton pour une hauteur de contrôle cohérente |
| Modale (Dialog) | 24px | Surface plus posée, respiration supérieure cohérente avec son élévation (§3, [[SURFACE_SYSTEM.md]] §3) |
| Menu contextuel (item) | 8px vertical / 12px horizontal | Densité plus élevée, plusieurs items visibles simultanément |

## 2. Gaps (espacement entre éléments d'un même groupe)

| Contexte | Gap | Justification |
|---|---|---|
| Icône + libellé dans un même contrôle | 8px | Association visuelle forte, proximité minimale de l'échelle |
| Éléments d'une liste verticale dense (file d'attente) | 4px | Densité maximale, séparation encore perceptible |
| Cartes d'une grille de bibliothèque | 16px | Cohérent avec le padding de carte (§1), pour une grille visuellement homogène |
| Boutons d'un groupe d'actions (barre d'outils) | 8px | Groupe perçu comme une seule unité fonctionnelle |

## 3. Marges entre sections

| Contexte | Marge | Justification |
|---|---|---|
| Entre deux sections d'une même page (ex. « Titres » et « Albums » dans une page Artiste) | 32px | Nettement supérieure aux gaps internes (§2), signale un changement de groupe sans dépendre de la couleur ([[LAYOUT_SYSTEM.md]] §6, règle de proximité) |
| Entre l'en-tête d'une page et son contenu | 24px | Suffisant pour distinguer l'en-tête du contenu sans créer un vide disproportionné |
| Marge extérieure de page | Voir [[LAYOUT_SYSTEM.md]] §1-3ter (varie par classe d'appareil) | Cadrage déjà décidé, non redéfini ici |

## 4. Règle de proportion

Le rapport entre le gap interne d'un groupe (§2) et la marge qui le sépare du groupe suivant (§3) est toujours d'au moins 1:2 — jamais un espacement de section à peine supérieur à l'espacement interne, ce qui rendrait le regroupement visuel ambigu (rappel direct de [[LAYOUT_SYSTEM.md]] §6).

## 5. Espacement responsive

Les valeurs de padding/gap/marge ne changent jamais entre desktop et mobile pour un même composant (un bouton a le même padding partout) — seule la densité de mise en page globale change via le choix de grille ([[LAYOUT_SYSTEM.md]] §1-3ter), jamais l'espacement interne d'un composant individuel, cohérent avec la règle déjà actée pour la typographie ([[TYPOGRAPHY_GUIDE.md]] §7).

## 6. Ce qui n'est jamais permis

- Un espacement à mi-chemin entre deux valeurs de l'échelle (ex. 20px), quelle que soit la justification apparente.
- Deux espacements différents entre des éléments visuellement identiques dans un même groupe (ex. deux cards d'une même grille avec des gaps différents) — règle absolue reprise dans [[DESIGN_SYSTEM.md]] §3.
- Un espacement défini en pourcentage pour un padding/gap interne de composant (réservé aux grilles et conteneurs, [[LAYOUT_SYSTEM.md]]).

---

## 7. Checklist de validation

- [ ] Chaque contexte listé (padding, gap, marge) utilise exclusivement l'échelle de [[DESIGN_TOKENS.md]] §4.
- [ ] Le rapport 1:2 (§4) est vérifiable sur chaque écran de [[SCREEN_SPECIFICATIONS.md]].
- [ ] Aucun espacement ne varie entre desktop et mobile pour un même composant.

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 5) | Design Token Specialist / UX Engineer |

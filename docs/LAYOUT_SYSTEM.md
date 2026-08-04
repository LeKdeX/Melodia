# LAYOUT_SYSTEM.md — Grille de conception (Phase 2, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : UI Art Director / Senior Visual Designer
> **Documents liés** : [[RESPONSIVE_GUIDE.md]], [[DESIGN_TOKENS.md]] §4, [[WIREFRAMES_FUNCTIONAL.md]]

> **Cadrage** : [[RESPONSIVE_GUIDE.md]] a déjà défini le comportement par classe d'appareil. Ce document définit la grille elle-même (colonnes, marges, espacements) que ce comportement responsive fait varier.

---

## 1. Grille desktop

12 colonnes, gouttière `spacing-layout-gutter` (24px, [[DESIGN_TOKENS.md]] §4), marge extérieure minimum 32px. La zone de contenu principale (hors barre latérale) utilise entre 8 et 12 colonnes selon la densité de la vue ([[LIBRARY_SPECIFICATION.md]] §1).

## 2. Grille tablette

8 colonnes, gouttière 16px, marge extérieure 24px — cohérent avec la densité intermédiaire déjà actée ([[RESPONSIVE_GUIDE.md]] §4).

## 3. Grille mobile

4 colonnes, gouttière 12px, marge extérieure 16px — suffisant pour 2 colonnes de grille de bibliothèque ([[RESPONSIVE_GUIDE.md]] §2) sans compression excessive des pochettes.

## 3bis. Grille laptop (ajout Phase 5)

12 colonnes (identique au desktop), gouttière 20px, marge extérieure 24px — la même structure que le desktop mais avec un pas de gouttière/marge légèrement réduit pour compenser la largeur de fenêtre typiquement inférieure d'un laptop par rapport à un moniteur desktop ([[RESPONSIVE_GUIDE.md]] §1, classe « Desktop » 1024-1919px couvre les deux, cette variante affine l'usage réel dans cette plage).

## 3ter. Grille ultra-wide (ajout Phase 5)

16 colonnes, gouttière 24px, marge extérieure 48px — plus de colonnes que le desktop standard pour exploiter la largeur sans étirer le contenu au-delà d'une largeur de lecture confortable ([[RESPONSIVE_GUIDE.md]] §6). Le panneau secondaire optionnel (file d'attente permanente) occupe jusqu'à 4 colonnes dédiées, jamais prélevées sur la largeur de lecture du contenu principal.

## 4. Espacements

Utilise exclusivement l'échelle de [[DESIGN_TOKENS.md]] §4 (4/8/12/16/24/32/48/64) — aucun espacement hors échelle, quelle que soit la plateforme.

## 5. Alignements

- Texte : aligné à gauche par défaut sur toute l'application (pas de centrage de blocs de texte, sauf états vides/erreurs qui restent centrés pour leur composition dédiée — [[EMPTY_STATES_GUIDE.md]] §4, [[WIREFRAMES_FUNCTIONAL.md]] §8).
- Contrôles numériques (durée, compteurs) : alignés à droite et tabulaires ([[TYPOGRAPHY_GUIDE.md]] §3) pour une lecture verticale cohérente dans les listes.

## 6. Respiration

Règle de proximité : l'espacement entre deux éléments liés (titre + sous-titre d'une carte) est toujours inférieur à l'espacement entre deux groupes non liés (deux cartes différentes) — au moins un cran d'écart sur l'échelle de [[DESIGN_TOKENS.md]] §4, pour que le regroupement visuel reste sans ambiguïté sans dépendre de la couleur ou d'une bordure.

## 7. Hiérarchie de mise en page

Reprend directement [[VISUAL_DIRECTION.md]] §3 (trois niveaux de contraste) traduit en règle de grille : le contenu en cours d'attention occupe toujours la plus grande surface disponible dans sa zone, jamais partagée à égalité avec un élément secondaire.

## 8. Conteneurs et largeurs maximales (ajout Phase 5)

| Token | Largeur maximale | Usage |
|---|---|---|
| `container-sm` | 640px | Modales de confirmation, formulaires courts ([[DIALOG_LIBRARY.md]]) |
| `container-md` | 960px | Panneaux latéraux, sheets ([[SURFACE_SYSTEM.md]] §6) |
| `container-lg` | 1280px | Contenu principal en lecture (page Album/Artiste) |
| `container-xl` | 1600px | Grilles de bibliothèque denses |
| `container-full` | Sans limite, avec marge extérieure garantie (§1-3ter) | Arrière-plans, surfaces de fond uniquement — jamais un conteneur de texte ou de grille de contenu |

Aucun contenu textuel ou grille de cartes n'utilise `container-full` — cohérent avec la limite de largeur de lecture déjà actée pour l'ultra-wide (§3ter).

---

## 9. Checklist de validation

- [ ] Les cinq grilles (desktop/laptop/tablette/mobile/ultra-wide) sont cohérentes avec les classes d'appareil déjà actées dans [[RESPONSIVE_GUIDE.md]].
- [ ] Aucun espacement ne sort de l'échelle de [[DESIGN_TOKENS.md]] §4.
- [ ] La règle de proximité (§6) est vérifiable visuellement sur chaque écran de [[SCREEN_SPECIFICATIONS.md]].
- [ ] Aucun conteneur de contenu textuel/grille n'utilise `container-full`.

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 2, volume 2) | UI Art Director / Senior Visual Designer |
| 0.2.0 | 2026-08-03 | Phase 5 : ajout §3bis/§3ter (grilles laptop/ultra-wide) et §8 (conteneurs et largeurs maximales) — au lieu de créer GRID_SYSTEM.md en doublon | Principal Design System Architect |

# RESPONSIVE_LAYOUTS.md — Synthèse cross-écran des réorganisations responsive (Phase 10)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Layout System Designer / UX Architect
> **Documents liés** : [[RESPONSIVE_GUIDE.md]], [[LAYOUT_SYSTEM.md]], [[SCREEN_SYSTEM.md]] §2

> **Cadrage strict** : [[RESPONSIVE_GUIDE.md]] a déjà défini les classes d'appareil et leur comportement, [[LAYOUT_SYSTEM.md]] les grilles concrètes — ce document ne redécide aucun seuil ni aucune règle. Il synthétise, par région d'écran plutôt que par écran individuel, comment chaque région du gabarit ([[SCREEN_SYSTEM.md]] §2) se réorganise — chaque document `*_SCREEN(S).md` y renvoie plutôt que de répéter cette table.

---

## 1. Table de synthèse par région

| Région | Desktop/Ultra-wide | Laptop | Tablette | Mobile |
|---|---|---|---|---|
| Header/TopBar | Anatomie complète ([[TOPBAR_SPECIFICATION.md]] §2) | Identique | Identique | Variante Minimale (§5) |
| Sidebar | Complète (icônes + libellés) | Complète | Réduite/Rétractable | Remplacée par BottomBar |
| Hero | Pleine largeur plafonnée `container-lg` | Identique | Réduit en hauteur | Réduit en hauteur, priorité au contenu |
| Toolbar/Filters | Barre visible en permanence | Identique | Identique | Repliés en BottomSheet |
| Main Content | Grille multi-colonnes | Identique, colonnes réduites | 4-6 colonnes | 2-3 colonnes ou liste |
| Right Panel | Coexiste en panneau latéral persistant | Coexiste si largeur suffisante | Coexiste en paysage uniquement ([[RESPONSIVE_GUIDE.md]] §4) | Absent, devient BottomSheet à la demande |
| Mini Player | Ancré latéral ou bas | Identique | Identique | Ancré bas, au-dessus de BottomBar |
| Footer | Visible en fin de contenu | Identique | Identique | Souvent masqué (priorité de contenu, [[RESPONSIVE_GUIDE.md]] §7bis) |

## 2. Blocs secondaires en Grid horizontale (règle transverse)

Tout bloc secondaire d'un écran composite (Related Albums, Top Artists, Recommendations, Popular Albums) suit la même règle sur toutes les classes d'appareil : défilement horizontal plutôt qu'une grille multi-lignes, jamais l'inverse — déjà appliqué de façon cohérente dans [[HOME_SCREEN.md]] §4, [[ALBUM_SCREEN.md]] §7, [[ARTIST_SCREEN.md]] §5, [[STATISTICS_SCREENS.md]] §7. Cette règle transverse évite de la répéter dans chacun de ces documents.

## 3. Right Panel — règle de coexistence

Un Right Panel (Queue View, Lyrics View, Advanced Search) ne coexiste avec le Main Content qu'à partir d'une largeur suffisante ([[RESPONSIVE_GUIDE.md]] §4, tablette paysage minimum) — en dessous, il devient systématiquement une BottomSheet superposée, jamais un panneau compressé illisible.

## 4. Ultra-wide — règle de largeur de lecture

Aucune région de contenu (Main, Hero) ne s'étire jamais au-delà de `container-lg`/`container-xl` selon le contexte ([[LAYOUT_SYSTEM.md]] §8) — l'espace excédentaire sert à un Right Panel permanent (ex. file d'attente visible en continu) plutôt qu'à un étirement du contenu central, cohérent avec [[RESPONSIVE_GUIDE.md]] §6.

## 5. TV (préparation, non activée)

Voir [[RESPONSIVE_GUIDE.md]] §7ter — aucune région de ce tableau n'a de comportement spécifique TV défini à ce jour, cohérent avec le statut de préparation architecturale non activée déjà posé.

---

## 6. Checklist de validation

- [ ] Chaque région du gabarit d'écran (§1) a une règle pour chaque classe d'appareil, aucune case laissée implicite.
- [ ] Aucun seuil de largeur n'est redéfini ici — uniquement référencé depuis [[RESPONSIVE_GUIDE.md]].
- [ ] La règle de blocs secondaires (§2) reste cohérente avec son application déjà vérifiée dans les documents d'écran individuels.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 10) | Layout System Designer / UX Architect |

# SCREEN_SYSTEM.md — Constitution du système d'écrans (Phase 10)

> **Statut** : document fondateur, vivant — capstone de Phase 10
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal Product Designer / UX Architect
> **Documents liés** : [[SCREEN_SPECIFICATIONS.md]], [[COMPONENT_LIBRARY.md]], [[NAVIGATION_SYSTEM.md]]

> **Cadrage** : les composants (Phases 5-9) sont désormais considérés comme figés — ce document et ceux qu'il cartographie n'en redécident aucun comportement, ils expliquent uniquement comment ils s'assemblent, écran par écran. [[SCREEN_SPECIFICATIONS.md]] (Phase 1, volume 3) reste la source du *comportement* par famille d'écran (contenu, états, logique) — cette phase ajoute la couche *composition* (quelle zone, quel composant, quel ordre) qui n'existait pas encore quand [[SCREEN_SPECIFICATIONS.md]] a été écrit, faute de bibliothèque de composants à l'époque.

---

## 1. Constitution

1. **Chaque écran a une hiérarchie claire.** Une seule zone porte le contenu principal ([[ACCESSIBILITY_GUIDE.md]] §6bis, un seul `role="main"` actif), jamais deux zones qui se disputent l'attention à égalité.
2. **Le lecteur reste toujours accessible.** Rappel direct de [[NAVIGATION_SYSTEM.md]] §1 — aucun écran de ce système ne masque le Mini Player.
3. **Les changements d'écran n'interrompent jamais la musique.** Vérifiable objectiquement ([[NAVIGATION_CHECKLIST.md]] §1), appliqué sans exception à chaque écran de cette phase.
4. **Le contenu prime sur les contrôles.** Une Toolbar/Filters n'occupe jamais plus d'espace que le contenu qu'elle sert à manipuler.
5. **Les informations importantes apparaissent immédiatement.** Jamais derrière un clic supplémentaire ou un défilement nécessaire pour une information de premier ordre (titre, statut de lecture).
6. **Les actions secondaires restent discrètes.** Révélées au survol/focus ou reléguées à un Menu Button ([[BUTTON_SPECIFICATION.md]]), jamais permanentes à l'écran par défaut.

## 2. Gabarit d'écran officiel

Chaque document de cette phase documente ses écrans selon la structure suivante — plus compacte que le gabarit à 13 sections des composants (§3), puisque la majorité du comportement (états, accessibilité, performance, motion) est déjà entièrement définie au niveau du composant et n'a pas à être répétée par écran :

1. **Présentation** — objectif, lien avec les autres écrans.
2. **Composition** — schéma textuel région par région (Header/Sidebar/Hero/Toolbar/Filters/Main/RightPanel/MiniPlayer/Footer), chaque composant cité avec renvoi vers sa spécification.
3. **États et cas limites propres à l'assemblage** — uniquement ce qui est spécifique à la combinaison de composants sur cet écran précis, jamais un état déjà décrit au niveau du composant lui-même.
4. **Responsive** — comment les régions se réorganisent par classe d'appareil, renvoi vers [[RESPONSIVE_LAYOUTS.md]] pour la synthèse cross-écran.

## 3. Pourquoi ce gabarit diffère de celui des composants

Le gabarit à 13 sections ([[COMPONENT_LIBRARY.md]] §1) documente un composant de zéro — anatomie, tokens, tests. Un écran ne fait qu'assembler des composants déjà intégralement spécifiés : redécrire leurs états, leur accessibilité ou leurs performances à chaque écran qui les utilise serait une duplication massive et une source de divergence future si l'un des deux exemplaires est mis à jour sans l'autre. Le gabarit d'écran (§2) documente donc l'assemblage, jamais le comportement déjà couvert ailleurs.

## 4. Carte complète de la Phase 10

### Documents nouveaux

| Document | Écrans couverts |
|---|---|
| [[SCREEN_SYSTEM.md]] | Constitution, gabarit, carte, navigation map, auto-revue |
| [[HOME_SCREEN.md]] | Accueil (Dashboard, Quick Resume, Recommendations, Daily Mix, Statistics/Wrapped Highlights) |
| [[LIBRARY_SCREENS.md]] | Library Home, Albums, Artists, Tracks, Genres, Collections, Folders, Favorites, Downloads, Offline, History, Pinned |
| [[ALBUM_SCREEN.md]] | Page Album complète (Related Albums, Versions, Disc Selector, Credits inclus) |
| [[ARTIST_SCREEN.md]] | Page Artiste complète (Related Artists inclus) |
| [[PLAYLIST_SCREEN.md]] | Page Playlist complète (Collaborators en préparation) |
| [[PLAYER_SCREENS.md]] | Toutes formes du lecteur, Lyrics View, Visualizer, Queue View, Device Selector, Audio Settings |
| [[SEARCH_SCREENS.md]] | Search Home, Results, Suggestions, Recent, Filters, Advanced Search, Empty State, History |
| [[DOWNLOAD_SCREENS.md]] | Download Queue, Completed, Storage, Offline Status, Errors, Priorities |
| [[STATISTICS_SCREENS.md]] | Listening Time, Top Artists/Albums/Tracks, Weekly/Monthly/Yearly, Wrapped, Charts, Heatmaps, Achievements |
| [[SETTINGS_SCREENS.md]] | Les 12 catégories de Paramètres |
| [[SYNC_SCREENS.md]] | Import, Progress, Conflicts, Updates, History, Logs, Status |
| [[ERROR_SCREENS.md]] | Connection Lost, Server Unreachable, Authentication, Network, Storage, Permissions, Corrupted Cache |
| [[ONBOARDING_SCREENS.md]] | Welcome, Server Connection, Authentication, Library Import, Theme Selection, Preferences, Finished |
| [[RESPONSIVE_LAYOUTS.md]] | Synthèse cross-écran des réorganisations par classe d'appareil |
| [[SCREEN_COMPONENT_MATRIX.md]] | Matrice composants/écrans, écrans coûteux, diagramme complet de navigation |

### Documents étendus en Phase 10

| Document | Ajout |
|---|---|
| [[TRANSITION_GUIDE.md]] | §9bis table des 7 parcours nommés du cadrage |
| [[PERFORMANCE_GUIDE.md]] | §6ter écrans les plus coûteux et optimisations |

### Pourquoi 2 livrables demandés n'ont pas de nouveau fichier

`SCREEN_TRANSITIONS.md` et `SCREEN_PERFORMANCE_GUIDE.md` recoupaient [[TRANSITION_GUIDE.md]] (Phase 4, 9 transitions déjà nommées) et [[PERFORMANCE_GUIDE.md]] respectivement — étendus plutôt que dupliqués, cohérent avec la pratique déjà établie à chaque phase de ce projet.

## 5. Navigation map (renvoi)

Voir [[NAVIGATION_SYSTEM.md]] §2-3 et [[NAVIGATION_PATTERNS.md]] §4 pour l'arborescence complète et le diagramme de parcours déjà posés en Phase 8 — non redécrits ici. [[SCREEN_COMPONENT_MATRIX.md]] §4 ajoute la vue complémentaire manquante : quels écrans (pas seulement quels composants de navigation) sont reliés entre eux, secondaires, modales ou overlays.

## 6. Auto-revue comparative

> Principes retenus, jamais une implémentation copiée — même règle de non-reproduction que chaque comparaison précédente de ce projet.

| Référence | Meilleure pratique retenue |
|---|---|
| Apple Music | Hiérarchie visuelle stricte sur la page Album — pochette et titre priment toujours sur les métadonnées secondaires |
| Spotify | Accueil composite modulaire (blocs indépendants avec leur propre état de chargement) plutôt qu'un flux monolithique |
| Plexamp | Densité assumée sur les écrans utilitaires (Recherche, Téléchargements) sans sacrifier la clarté |
| Roon | Page Artiste organisée par type d'œuvre (Albums/Singles/Compilations) plutôt qu'une chronologie brute |
| TIDAL | Distinction visuelle claire entre contenu personnel (Favoris, Téléchargés) et contenu catalogue |
| Arc Browser | Command Palette comme raccourci vers n'importe quel écran, déjà repris en Phase 8 |
| Linear | Paramètres organisés par domaine avec recherche interne, jamais une liste plate de tous les réglages |
| Raycast | Feedback immédiat sur chaque action, même sur les écrans utilitaires les moins visités |

## 7. Cohérence avec les bibles et systèmes déjà actés

Aucun écran de cette phase ne redéfinit un token, une règle absolue ([[DESIGN_SYSTEM.md]] §3), un comportement de composant ([[COMPONENT_LIBRARY.md]], [[MUSIC_COMPONENT_LIBRARY.md]]) ou un principe de navigation ([[NAVIGATION_SYSTEM.md]] §1) — chaque écran assemble explicitement des composants déjà établis plutôt que d'introduire une anatomie parallèle.

---

## 8. Checklist de validation

- [ ] Chaque écran nommé dans le cadrage apparaît dans un document de cette carte (§4), aucun orphelin.
- [ ] Aucun document de cette phase ne redécrit un comportement de composant déjà spécifié — uniquement son assemblage.
- [ ] Le gabarit (§2) est appliqué de façon cohérente dans tous les documents de cette phase.

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document, capstone de la Phase 10 | Principal Product Designer / UX Architect |

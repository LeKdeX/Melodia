# LIBRARY_SCREENS.md — Écrans de bibliothèque (Phase 10)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / Information Architect
> **Documents liés** : [[SCREEN_SYSTEM.md]] §2, [[SCREEN_SPECIFICATIONS.md]] §3, [[LIBRARY_COMPONENTS.md]], [[COLLECTION_COMPONENTS.md]]

> **Cadrage** : famille « Contenu principal » déjà spécifiée dans [[SCREEN_SPECIFICATIONS.md]] §3 — ce document assemble les composants de bibliothèque (Phase 6/9) sur chaque écran nommé, sans redécrire leur comportement.

---

## 1. Présentation commune à la famille

Tous les écrans de ce document partagent la même composition de base (Toolbar + Grid/List + Filters) — seule la source de données change. Lien avec les autres écrans : chaque carte mène vers Album/Artist/Playlist Screen ([[ALBUM_SCREEN.md]], [[ARTIST_SCREEN.md]], [[PLAYLIST_SCREEN.md]]).

## 2. Composition de base

```
[TopBar — titre de section + SearchField contextuelle]
[Toolbar — Tabs (Titres/Albums/Artistes/Genres/Collections) + Filters + tri]
[Main — Grid ou List selon densité choisie, peuplée du composant Card approprié]
[Mini Player — persistant]
```

## 3. Écrans et leur source

| Écran | Composant peuplant le Main |
|---|---|
| Library Home | Tabs vers chacun des écrans suivants — pas de contenu propre, un simple routeur visuel |
| Albums | Album Grid ([[LIBRARY_COMPONENTS.md]]) |
| Artists | Artist Grid |
| Tracks | Track Row en List dense (pas de Grid — un titre seul n'a pas assez d'information visuelle pour justifier une grille, [[TRACK_COMPONENTS.md]] §1) |
| Genres | Genre Grid |
| Collections | Collection Grid ([[COLLECTION_COMPONENTS.md]]) |
| Folders | Folder View ([[LIBRARY_COMPONENTS.md]]) |
| Favorites | Collection Grid filtrée sur le statut favori ([[COLLECTION_COMPONENTS.md]] §3) |
| Downloads | Voir [[DOWNLOAD_SCREENS.md]] — écran à part entière, pas une simple vue filtrée |
| Offline | Collection Grid filtrée sur la disponibilité hors ligne réelle ([[COLLECTION_COMPONENTS.md]] §6, [[OFFLINE_SYSTEM.md]] §2) |
| History | Voir [[NAVIGATION_HISTORY.md]] §5 pour la structure — assemblé ici comme Track Row chronologique inversée, regroupée par jour |
| Pinned | Collection Grid filtrée sur le statut épinglé ([[COLLECTION_COMPONENTS.md]] §2) |

## 4. États et cas limites propres à l'assemblage

- **Bibliothèque en cours de première synchronisation** : Main affiche le gabarit Skeleton ([[SKELETON_SYSTEM.md]] §2) pendant que Toolbar reste fonctionnelle mais avec tri/filtre désactivés (rien à trier tant que rien n'est chargé).
- **Filtre actif sans résultat** : Empty State variante « Aucun résultat » ([[EMPTY_STATES_GUIDE.md]] §5), Toolbar reste visible avec une action « Réinitialiser les filtres » directement accessible.
- **Bibliothèque très large (200 000+ titres)** : voir [[PERFORMANCE_GUIDE.md]] §6ter — virtualisation déjà couverte au niveau du composant Grid/List, non redécrite ici.
- **Nom d'élément très long** dans un contexte de tri alphabétique : n'affecte jamais la largeur de colonne des autres éléments, chaque carte tronque indépendamment ([[CARD_SPECIFICATION.md]] §11).

## 5. Responsive

Voir [[RESPONSIVE_LAYOUTS.md]]. Résumé : Tabs de la Toolbar passent en défilement horizontal sur mobile ([[NAVIGATION_COMPONENTS.md]] §5), Filters se replient dans une BottomSheet plutôt qu'une barre visible en permanence.

---

## 6. Checklist de validation

- [ ] Chaque écran de la famille a une source de données explicite (§3), aucune ambiguïté de composant.
- [ ] Aucun composant de bibliothèque n'est redéfini — uniquement assemblé.
- [ ] Downloads reste un écran à part entière, jamais confondu avec une simple vue filtrée de Library.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 10) | Product Designer / Information Architect |

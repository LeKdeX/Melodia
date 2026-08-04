# HOME_SCREEN.md — Écran d'accueil (Phase 10)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / UX Architect
> **Documents liés** : [[SCREEN_SYSTEM.md]] §2, [[SCREEN_SPECIFICATIONS.md]] §3, [[COLLECTION_COMPONENTS.md]]

> **Cadrage** : suit le gabarit d'écran officiel ([[SCREEN_SYSTEM.md]] §2). [[SCREEN_SPECIFICATIONS.md]] §3 a déjà défini le comportement (« contenu composite, chaque bloc a son propre état de chargement indépendant ») — non redécrit ici.

---

## 1. Présentation

L'Accueil est le point d'entrée par défaut au lancement — sa fonction est de reconnecter immédiatement l'utilisateur à son contexte d'écoute (reprise) avant de proposer de la découverte. Lien avec les autres écrans : chaque bloc mène vers un écran plus profond (Album, Artiste, Statistiques) sans jamais dupliquer leur contenu.

## 2. Composition

```
[TopBar — titre "Accueil" simple, pas de Breadcrumb]
├─ Quick Resume (Hero réduit — reprise de la dernière lecture, [[PLAYER_COMPONENTS.md]])
├─ Continue Listening (Grid de Album/Playlist Card en cours d'écoute partielle)
├─ Daily Mix (Grid de Playlist Card générées, [[COLLECTION_COMPONENTS.md]] §1 Smart Collection)
├─ Recommendations (Grid d'Album/Artist Card — condition : Découverte activée)
├─ Recently Added (Grid, renvoi [[COLLECTION_COMPONENTS.md]] §6)
├─ Recently Played (Grid, renvoi [[COLLECTION_COMPONENTS.md]] §6)
├─ Pinned Albums / Pinned Playlists (Grid des éléments épinglés, [[COLLECTION_COMPONENTS.md]] §2)
├─ Shortcuts (Inline de raccourcis vers Bibliothèque/Téléchargements/Favoris)
└─ Statistics / Wrapped Highlights (Statistics Cards résumées, condition : historique actif)
[Mini Player — persistant, ancré]
```

Chaque bloc est un Section ([[COMPOSING_RULES.md]] §2) indépendant avec son propre Skeleton ([[SKELETON_SYSTEM.md]] §2) — jamais un seul état de chargement global pour toute la page.

## 3. États et cas limites propres à l'assemblage

- **Premier lancement / historique vide** : Quick Resume, Continue Listening, Daily Mix et Statistics sont masqués entièrement (jamais affichés vides) — seuls Recently Added (si import terminé) et Shortcuts restent, cohérent avec [[EMPTY_STATES_GUIDE.md]] §5 (distinction « pas encore de contenu »).
- **Découverte désactivée** : bloc Recommendations masqué, jamais un état vide qui inviterait à l'activer de façon insistante ([[PRODUCT_VALUES.md]] §3).
- **Historique désactivé** : Daily Mix et Statistics/Wrapped masqués — Continue Listening reste disponible (dépend de la position de lecture, pas de l'historique d'écoute complet, [[NAVIGATION_HISTORY.md]] §1).
- **Bloc en erreur isolé** (ex. échec de calcul des recommandations) : seul ce bloc affiche un état d'erreur discret, jamais toute la page — cohérent avec l'indépendance des blocs déjà actée (§2).

## 4. Responsive

Voir [[RESPONSIVE_LAYOUTS.md]] pour la synthèse complète. Résumé : mobile empile les blocs en défilement vertical unique avec défilement horizontal interne par bloc (Grid en Inline scrollable plutôt qu'en grille multi-lignes) ; desktop/ultra-wide affiche chaque bloc en grille multi-lignes complète.

---

## 5. Checklist de validation

- [ ] Chaque bloc a une règle d'état vide explicite (§3), jamais un bloc vide affiché sans raison.
- [ ] Aucun composant n'est redéfini ici — uniquement assemblé, avec renvoi systématique.
- [ ] Le Mini Player reste présent dans toutes les configurations.

---

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 10) | Product Designer / UX Architect |

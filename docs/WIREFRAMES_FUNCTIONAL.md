# WIREFRAMES_FUNCTIONAL.md — Wireframes textuels (Phase 1, volume 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Product Designer / Information Architect
> **Documents liés** : [[SCREEN_SPECIFICATIONS.md]], [[NAVIGATION_GUIDE.md]], [[RESPONSIVE_GUIDE.md]]

> **Cadrage** : ce document décrit la disposition spatiale (zones, priorités, variantes desktop/mobile) — le comportement de chaque élément est dans [[SCREEN_SPECIFICATIONS.md]], référencé par nom d'écran, jamais redécrit ici. Aucun code, aucune maquette visuelle — uniquement une structure textuelle. Les écrans couverts sont ceux qui structurent le plus fortement l'expérience ; les écrans de la famille « Système » (§6 de [[SCREEN_SPECIFICATIONS.md]]) partagent une structure suffisamment simple pour ne pas nécessiter un wireframe dédié par écran.

---

## 1. Accueil

**Desktop**
```
[Barre latérale persistante]  [Zone de contenu principal]
                                 [Bloc « Reprendre l'écoute » — priorité 1]
                                 [Bloc « Ajouts récents » — priorité 2]
                                 [Bloc « Daily Mix » si actif — priorité 2]
[Mini Player — bande persistante en bas de la zone de contenu]
```
**Mobile**
```
[En-tête léger]
[Bloc « Reprendre l'écoute »]
[Bloc « Ajouts récents » — défilement horizontal]
[Bloc « Daily Mix » si actif — défilement horizontal]
[Mini Player — ancré en bas, au-dessus de la barre de navigation]
[Barre de navigation inférieure]
```
Priorité visuelle : reprise de lecture toujours en premier — c'est l'action la plus probable au retour dans l'app ([[USER_JOURNEYS.md]] §12).

## 2. Bibliothèque (vue grille)

**Desktop**
```
[Barre latérale]  [Titre de section + barre d'outils (tri/filtre/vue)]
                   [Grille de cartes — colonnes adaptatives]
                   [Pagination virtualisée — chargement continu au défilement]
[Mini Player]
```
**Mobile**
```
[En-tête + accès filtre/tri en icône]
[Grille 2 colonnes]
[Mini Player]
[Navigation inférieure]
```
Composants : carte (pochette carrée + titre + sous-titre), sélecteur de vue (grille/liste/compacte/immersive — [[LIBRARY_SPECIFICATION.md]] §1).

## 3. Page Album

**Desktop**
```
[Barre latérale]  [En-tête : pochette large + titre + artiste + métadonnées + actions principales (lecture, favori)]
                   [Palette dynamique en arrière-plan de l'en-tête — PLAYER_SPECIFICATION.md §4]
                   [Liste des morceaux, numérotée, durée alignée à droite]
                   [Section « Albums similaires » — priorité basse, en bas de page]
[Mini Player]
```
**Mobile**
```
[En-tête compact : pochette + titre + artiste]
[Bouton de lecture principal, pleine largeur]
[Liste des morceaux]
[Albums similaires — défilement horizontal]
[Mini Player] [Navigation inférieure]
```
Priorité visuelle : action de lecture immédiatement visible sans défilement, sur les deux variantes.

## 4. Recherche

**Desktop et mobile (structure identique, densité différente)**
```
[Barre de saisie — position la plus accessible, NAVIGATION_GUIDE.md §7]
[Résultats groupés par catégorie, dans l'ordre : Morceaux, Albums, Artistes, Playlists, Genres]
[Chaque résultat : élément actionnable directement (lecture/ajout) sans navigation intermédiaire]
[État vide/chargement remplace la zone de résultats uniquement, jamais la barre de saisie]
```

## 5. Lecteur — Mini Player et Expanded Player

**Mini Player (desktop et mobile)**
```
[Pochette miniature] [Titre + artiste, une ligne] [Barre de progression fine] [Lecture/Pause] [Suivant]
```
**Expanded Player — Desktop**
```
[Pochette grande taille, centrée]     [Paroles si disponibles, colonne latérale]
[Titre + artiste + métadonnées]
[Barre de progression + temps écoulé/restant]
[Contrôles complets : précédent, lecture/pause, suivant, aléatoire, répétition, volume]
[Accès secondaire : égaliseur, visualiseur, file d'attente]
```
**Expanded Player — Mobile**
```
[Pochette grande taille, pleine largeur]
[Titre + artiste]
[Barre de progression]
[Contrôles complets, disposés sur une seule rangée]
[Paroles accessibles par glissement horizontal, pas affichées par défaut — l'espace vertical est plus contraint qu'en desktop]
[Accès secondaire en menu, pas en rangée d'icônes supplémentaire]
```
Voir [[PLAYER_SPECIFICATION.md]] pour le comportement complet de chaque forme.

## 6. Page Playlist

Structure identique à la Page Album (§3), avec deux différences : liste réordonnable par glissement (au lieu d'un ordre fixe numéroté), et bouton d'édition des règles visible en en-tête si la playlist est intelligente ([[PLAYLIST_SPECIFICATION.md]] §3).

## 7. Onboarding — Écran de connexion

**Toutes plateformes (structure identique, l'onboarding ne varie pas de layout entre desktop et mobile au-delà de la densité standard)**
```
[Zone centrale unique, pas de barre latérale/navigation — rien ne distrait de l'action de connexion]
[Champ : adresse du serveur]
[Champ : identifiants ou bouton Quick Connect]
[Action principale : Se connecter]
[Lien secondaire discret : aide/documentation]
```
Voir [[ONBOARDING_GUIDE.md]] pour la séquence complète.

## 8. Gabarits universels (Chargement / Vide / Erreur)

```
[Zone de contenu concernée uniquement — jamais la navigation ou le lecteur]
  → Chargement : squelettes respectant la structure finale de la zone
  → Vide : illustration (discrète) + message (une phrase) + action (un bouton)
  → Erreur : message + action de récupération, jamais d'illustration qui dramatiserait
```
Ce gabarit remplace uniquement la zone de contenu concernée — navigation et lecteur restent inchangés, cohérent avec [[SCREEN_SPECIFICATIONS.md]] §7.

---

## 9. Checklist de validation

- [ ] Chaque wireframe a une variante desktop et une variante mobile, sauf quand la structure est explicitement identique (justifié, pas par omission).
- [ ] Aucun wireframe ne décrit de comportement — uniquement une disposition, renvoyée à [[SCREEN_SPECIFICATIONS.md]] pour le comportement.
- [ ] La priorité visuelle de chaque écran est explicite, pas implicite dans l'ordre de description.

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 3) | Product Designer / Information Architect |

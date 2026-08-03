# NAVIGATION_GUIDE.md — Architecture de l'information et navigation (Phase 1, volume 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Information Architect / Senior UX Designer
> **Documents liés** : [[FRONTEND_ARCHITECTURE.md]] §2, [[LIBRARY_SPECIFICATION.md]], [[EVOLVABILITY.md]] §3-6

---

## 1. Arborescence complète

```
Racine
├── Accueil (résumé : reprise, suggestions si historique actif)
├── Bibliothèque
│   ├── Albums
│   ├── Artistes
│   ├── Morceaux
│   ├── Genres
│   └── Collections
├── Playlists
│   └── [Playlist individuelle]
├── Favoris
├── Découverte (si activée — Daily Mix, recommandations)
├── Statistiques / Wrapped (si historique actif)
├── Recherche (accessible globalement, pas seulement depuis un onglet)
├── Téléchargements
├── Historique
├── Paramètres
│   ├── Audio, Interface, Téléchargements, Jellyfin, Bibliothèque, Confidentialité, Performances
│   └── Débogage / Développeur / Labs (non mis en avant)
└── Lecteur (persistant, pas un nœud de l'arborescence — voir §2)
```

**Raison d'être de chaque section** : chaque nœud existe parce qu'il sert un persona ou un parcours identifié ([[PERSONAS.md]], [[USER_JOURNEYS.md]]) — Découverte et Statistiques/Wrapped sont conditionnelles à l'activation de l'historique local, jamais affichées vides sans explication ([[EMPTY_STATES.md]] §7).

## 2. Le lecteur n'est pas un écran de l'arborescence

C'est une couche persistante au-dessus de toute la navigation ([[PRODUCT_RULES.md]] §1, [[FRONTEND_ARCHITECTURE.md]] §6) — il n'a pas d'entrée dans le menu principal parce qu'il n'est jamais absent.

## 3. Navigation principale

- **Desktop** : barre latérale persistante (icônes + libellés), reste visible en permanence sauf en Fullscreen Player.
- **Mobile** : barre inférieure avec les sections les plus fréquentes (Accueil, Bibliothèque, Recherche, Favoris/Découverte selon activation), le reste accessible via un menu « Plus ».
- **Tablette** : barre latérale rétractable (icônes seules par défaut, extensible) — ni la densité desktop ni la contrainte mobile stricte.

## 4. Navigation secondaire

À l'intérieur d'une section (ex. onglets Albums/Artistes/Morceaux/Genres au sein de Bibliothèque) — toujours horizontale et persistante en haut du contenu, jamais un sous-menu qui masque la section principale.

## 5. Navigation contextuelle

Menus contextuels (clic droit desktop, appui long mobile — [[INTERACTION_GUIDELINES.md]] §2-3) : actions propres à l'élément sélectionné (ajouter à une playlist, voir l'artiste, télécharger) — jamais dupliquée avec la navigation principale.

## 6. Menu utilisateur

Accès au profil de connexion Jellyfin actif, changement de serveur ([[JELLYFIN_INTEGRATION.md]] §6), accès rapide aux paramètres de confidentialité — regroupé pour que l'identité de connexion soit toujours localisable au même endroit.

## 7. Navigation par méthode d'entrée

| Méthode | Comportement |
|---|---|
| Souris | Survol révèle les actions secondaires, clic simple sélectionne, double-clic lit ([[INTERACTION_GUIDELINES.md]] §3) |
| Trackpad | Identique à la souris, gestes de défilement natifs respectés sans surcouche |
| Clavier | Tout élément de navigation atteignable par tabulation dans un ordre logique (§8), raccourcis globaux ([[INTERACTION_GUIDELINES.md]] §1) |
| Tactile | Barre inférieure, gestes de glissement ([[INTERACTION_GUIDELINES.md]] §2) |
| Télécommande | **Non couverte en Phase 1** — dépend d'une interface Android TV/Apple TV non engagée ([[EVOLVABILITY.md]] §3-4). Ce guide ne spécifie pas de comportement télécommande pour éviter de promettre une navigation non conçue ; à traiter dans un document dédié si cette cible est engagée. |

## 8. Ordre de focus clavier

Logique de gauche à droite, haut en bas, en respectant la hiérarchie visuelle : navigation principale → navigation secondaire → contenu → lecteur persistant. Le focus ne saute jamais un élément interactif visible, et n'atteint jamais un élément invisible ([[ACCESSIBILITY_GUIDE.md]] pour le détail complet).

## 9. Grand écran / Ultra-wide

La navigation ne s'étire pas horizontalement au-delà d'une largeur de contenu confortable — un écran ultra-wide affiche plus de colonnes de grille ou une zone de contenu centrée avec des marges plus généreuses, jamais une barre latérale ou un texte étiré sans limite ([[RESPONSIVE_GUIDE.md]]).

---

## 10. Checklist de validation

- [ ] Chaque nœud de l'arborescence a une raison d'exister traçable jusqu'à un persona ou un parcours.
- [ ] La navigation télécommande reste explicitement non spécifiée plutôt que promise à tort.
- [ ] L'ordre de focus clavier est cohérent avec la hiérarchie visuelle réelle, pas un ordre DOM arbitraire.

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 3) | Information Architect / Senior UX Designer |

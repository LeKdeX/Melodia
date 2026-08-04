# SEARCH_NAVIGATION.md — Navigation à travers la recherche (Phase 8)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Navigation System Architect / Accessibility Specialist
> **Documents liés** : [[SEARCH_COMPONENTS.md]], [[SEARCH_SPECIFICATION.md]], [[COMMAND_PALETTE.md]]

> **Cadrage strict** : [[SEARCH_SPECIFICATION.md]] définit le comportement produit de la recherche (pondération, tolérance). [[SEARCH_COMPONENTS.md]] définit l'anatomie des composants. Ce document répond à une question différente, restée un vrai vide jusqu'ici : comment un utilisateur **se déplace** au clavier, à la souris et au tactile à travers une session de recherche, de la première frappe au résultat sélectionné.

---

## 1. Recherche instantanée — navigation pendant la frappe

Chaque caractère met à jour les résultats sans jamais déplacer le focus hors du champ de saisie ([[INTERACTION_LIBRARY.md]] §7) — le focus clavier reste sur SearchField tant que l'utilisateur n'a pas explicitement navigué vers les résultats (§2). Aucune navigation automatique vers le premier résultat à chaque frappe, qui interromprait une saisie encore en cours.

## 2. Navigation clavier dans les résultats

- **Flèche bas** depuis SearchField : déplace le focus vers le premier résultat, quel que soit son groupe ([[SEARCH_COMPONENTS.md]] §2).
- **Flèches haut/bas** parmi les résultats : parcourt tous les résultats en séquence continue, en traversant les groupes (Titres → Albums → Artistes) sans marquer d'arrêt à chaque frontière de groupe — le regroupement visuel n'introduit pas de sous-navigation séparée.
- **Flèche haut** depuis le premier résultat : ramène le focus à SearchField, jamais un focus qui se perd ou boucle vers le dernier résultat.
- **Entrée** sur un résultat : ouvre sa destination (comportement identique au clic, [[SEARCH_COMPONENTS.md]] §Track Card overlay pour la distinction lecture immédiate / ouverture du détail — la touche Entrée ouvre toujours le détail, jamais la lecture immédiate, qui reste une action explicite au clic sur l'overlay).
- **Échap** : ferme les résultats et rend le focus à SearchField avec la saisie conservée (première pression) puis vide le champ (seconde pression) — jamais une seule pression qui perd la saisie sans préavis.

## 3. Navigation souris/trackpad

Survol d'un résultat : surbrillance immédiate ([[INTERACTION_GUIDELINES.md]] §4), sans déplacer le focus clavier — les deux mécanismes (survol souris, focus clavier) restent indépendants pour ne jamais interrompre une navigation clavier en cours par un mouvement de souris accidentel.

## 4. Navigation tactile

Défilement vertical standard à travers les résultats (pas de pagination, [[SEARCH_COMPONENTS.md]] §12 virtualisation), tap pour ouvrir — le clavier virtuel se referme automatiquement au premier défilement dans les résultats pour maximiser l'espace visible, réapparaît au tap sur SearchField.

## 5. Filtres et navigation

L'activation d'un Search Filter ([[SEARCH_COMPONENTS.md]]) ne déplace jamais le focus loin de SearchField ou du filtre lui-même vers les résultats — l'utilisateur reste maître de quand il navigue vers les résultats après avoir ajusté ses filtres, jamais un saut de focus automatique et surprenant.

## 6. Depuis la Command Palette

Voir [[COMMAND_PALETTE.md]] §3 et §5 pour la navigation au sein de la Command Palette, qui inclut le contenu musical comme catégorie de résultats — même logique de flèches haut/bas continues qu'ici (§2), pour que l'apprentissage moteur reste identique entre les deux points d'entrée.

---

## 7. Checklist de validation

- [ ] Chaque méthode d'entrée (clavier, souris, tactile) a une règle de navigation explicite à travers les résultats.
- [ ] Le focus clavier ne saute jamais de façon surprenante entre SearchField et les résultats.
- [ ] La logique de navigation reste identique entre SearchField/Search Results et la Command Palette (§6).

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 8) | Navigation System Architect / Accessibility Specialist |

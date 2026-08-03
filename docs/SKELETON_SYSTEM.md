# SKELETON_SYSTEM.md — Écrans de chargement par section (Phase 4)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Performance UX Engineer / Product Designer
> **Documents liés** : [[ANIMATION_LIBRARY.md]] §3, [[MOTION_GUIDELINES.md]] §12bis, [[SCREEN_SPECIFICATIONS.md]] §7

> **Cadrage** : [[ANIMATION_LIBRARY.md]] §3 (Skeleton Pulse) définit l'animation elle-même. [[SCREEN_SPECIFICATIONS.md]] §7 pose déjà le principe des gabarits universels. Ce document applique les deux à chaque écran demandé par le cadrage — la géométrie du squelette de chaque écran, pas son animation (déjà définie ailleurs).

---

## 1. Principe général

Un squelette respecte exactement la structure du contenu final (mêmes proportions, mêmes positions) — jamais une forme générique déconnectée de ce qui va apparaître, ce qui produirait un réajustement brutal de layout au chargement (« layout shift », contraire à [[PERFORMANCE_BUDGET.md]]). Un squelette n'apparaît que si le chargement dépasse un seuil perceptible (~300 ms) — en dessous, afficher puis retirer un squelette serait plus distrayant qu'utile (clignotement perçu).

## 2. Bibliothèque

Grille/liste de silhouettes rectangulaires proportionnées aux cartes réelles (pochette carrée + deux lignes de texte de largeur variable simulant titre/artiste). Nombre de silhouettes affichées = nombre d'éléments visibles dans le viewport, jamais plus (pas de silhouettes hors-écran inutiles).

## 3. Albums / Artistes (page de détail)

En-tête : silhouette de la pochette/portrait en grand format + deux lignes de texte (titre, méta). Corps : liste de silhouettes de lignes (piste) avec numéro, titre, durée simulés par des blocs de largeur cohérente avec un texte réel moyen.

## 4. Recherche

Aucun squelette sur le champ de saisie lui-même. Résultats : mêmes silhouettes que la Bibliothèque (§2), affichées uniquement après un début de frappe — jamais de squelette affiché avant toute saisie (l'état vide initial de la recherche est un état vide, pas un état de chargement, voir [[EMPTY_STATES_GUIDE.md]]).

## 5. Statistiques

Silhouettes de graphiques : rectangles/courbes neutres respectant les proportions du graphique réel (jamais un graphique factice avec des valeurs qui ressembleraient à de vraies données, ce qui serait trompeur) — une forme abstraite non chiffrée suffit.

## 6. Player

Le lecteur n'affiche jamais de squelette classique — voir [[PLAYER_SPECIFICATION.md]] §3 (« Aucune lecture ») et [[PLAYER_EXPERIENCE.md]] §1, qui définissent déjà l'état avant toute lecture. Exception : le chargement d'une piste déjà sélectionnée mais dont l'audio n'est pas encore prêt utilise l'indicateur de mise en tampon existant ([[PLAYER_SPECIFICATION.md]] §3), jamais un squelette superposé aux contrôles.

## 7. Téléchargements

Liste de silhouettes de lignes identiques à la Bibliothèque (§2), avec une barre de progression neutre non animée (distincte du Progress Fill réel, [[ANIMATION_LIBRARY.md]] §10) tant que l'état réel n'est pas connu.

## 8. Paramètres

Aucun squelette — les paramètres sont des préférences locales déjà connues de l'appareil ([[ARCHITECTURE_PRINCIPLES.md]] §3, priorité au local), leur affichage est donc toujours instantané ; un squelette ici signalerait une latence qui n'existe pas.

---

## 9. Règle transverse

Un squelette n'est jamais accompagné d'un texte (« Chargement... ») superposé — la forme elle-même communique l'attente, un texte redondant ajouterait du bruit visuel sans information nouvelle (cohérent avec [[UX_PRINCIPLES.md]] §4).

---

## 10. Checklist de validation

- [ ] Chaque écran demandé dans le cadrage a une décision explicite, y compris « pas de squelette » quand c'est le bon choix (§6, §8).
- [ ] Aucun squelette ne provoque de réajustement de layout au moment où le contenu réel apparaît.
- [ ] Aucun squelette n'affiche de fausses données chiffrées ou textuelles.

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 4) | Performance UX Engineer / Product Designer |

# VISUAL_FEEDBACK_GUIDE.md — Chorégraphie visuelle par type de résultat (Phase 4)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Perception Psychologist / Interaction Designer
> **Documents liés** : [[ERROR_EXPERIENCE.md]], [[INTERACTION_GUIDELINES.md]] §4, [[NOTIFICATION_LIBRARY.md]]

> **Cadrage strict** : [[ERROR_EXPERIENCE.md]] choisit le *pattern* (toast/snackbar/bannière/modale). [[NOTIFICATION_LIBRARY.md]] fournit le *texte*. [[INTERACTION_GUIDELINES.md]] §4 a déjà une entrée compacte par micro-interaction. Ce document est le seul des trois qui décrit la **réponse visuelle elle-même** (couleur, forme, mouvement) associée à chaque nature de résultat, indépendamment du conteneur qui la porte.

---

## 1. Succès

Signal localisé à l'élément concerné : transition de couleur brève vers `state-success` ([[COLOR_SYSTEM.md]] §5) sur l'icône ou la bordure concernée, jamais sur toute la surface d'un écran. Retour à l'état neutre après ~1.5 s, sans notification globale sauf si l'action n'a pas de localisation visuelle possible (voir [[ERROR_EXPERIENCE.md]] pour ce cas).

## 2. Erreur

Signal localisé similaire au succès mais en `state-danger`, accompagné systématiquement d'une icône (jamais la couleur seule, [[ACCESSIBILITY_GUIDE.md]] §3bis) et d'un léger mouvement horizontal bref (« shake » de faible amplitude, deux allers-retours maximum) réservé aux erreurs de saisie dans un formulaire — jamais utilisé pour une erreur de lecture ou de réseau, où un mouvement brusque serait disproportionné par rapport à une situation déjà gérée automatiquement par le produit.

## 3. Synchronisation

Voir [[ANIMATION_LIBRARY.md]] §11 (Sync Pulse) pour l'animation. Réponse visuelle propre à ce document : aucune couleur d'état appliquée pendant la synchronisation elle-même (ni succès ni erreur tant qu'elle est en cours) — la couleur n'intervient qu'au résultat final (§1 ou §2), jamais pendant le processus, pour ne pas suggérer un jugement prématuré sur une opération encore en cours.

## 4. Téléchargement

Voir [[ANIMATION_LIBRARY.md]] §10 (Progress Fill). À la complétion : transition brève de la barre de progression vers `state-success` puis disparition de la barre au profit de l'icône « disponible hors ligne » permanente ([[TOOLTIP_LIBRARY.md]] §2) — jamais une barre à 100% qui reste affichée indéfiniment.

## 5. Import

Traité comme une synchronisation à grande échelle (§3) : aucune couleur d'état pendant le processus, uniquement une progression visible (nombre d'éléments importés, [[ONBOARDING_COPY.md]] §3) sans jugement visuel avant la fin.

## 6. Suppression

Voir [[INTERACTION_LIBRARY.md]] §5 (Delete) pour la chorégraphie de disparition de l'élément. Aucune couleur `state-danger` appliquée à l'élément qui disparaît lui-même — la gravité de l'action a déjà été communiquée par le dialogue de confirmation ([[DIALOG_LIBRARY.md]]) qui la précède systématiquement ; répéter un signal de danger sur l'animation de sortie serait redondant.

## 7. Création

Signal identique au Succès (§1), avec une nuance : un élément nouvellement créé (playlist, par exemple) reçoit un bref surlignage `accent-500` (et non `state-success`) au moment de son apparition dans une liste — distinction volontaire entre « une action a réussi » (vert) et « voici un nouvel objet qui vous appartient » (couleur de marque), cohérent avec la distinction déjà établie entre accent fonctionnel et accent d'état ([[COLOR_SYSTEM.md]] §7).

## 8. Modification

Aucun signal visuel dédié pour une modification mineure et attendue (renommage, réorganisation) — l'utilisateur voit directement le résultat de son action (le nouveau nom affiché, le nouvel ordre) sans avoir besoin d'une confirmation additionnelle, cohérent avec [[UX_PRINCIPLES.md]] §1 (l'action elle-même est déjà la réponse).

## 9. Lecture

Aucun signal de succès/couleur — l'audio qui démarre et la pochette qui perd sa désaturation ([[PLAYER_SPECIFICATION.md]] §3) sont déjà la réponse visuelle complète. Ajouter un signal de succès superposé serait une double confirmation inutile.

## 10. Pause

Symétrique de la Lecture (§9) : désaturation légère de la pochette ([[PLAYER_SPECIFICATION.md]] §3), aucune autre couleur d'état appliquée — la pause n'est pas une erreur ni un événement neutre à signaler, c'est un état à part entière avec son propre traitement visuel déjà défini.

---

## 11. Règle transverse

Les couleurs d'état (`state-success`, `state-danger`, `state-warning`, `state-info`) ne sont jamais utilisées pour un usage décoratif ou hors de leur catégorie sémantique ([[COLOR_SYSTEM.md]] §7) — ce document ne réutilise que des couleurs déjà définies, il n'en introduit aucune nouvelle.

---

## 12. Checklist de validation

- [ ] Chaque nature de résultat demandée dans le cadrage a une décision explicite, y compris « aucun signal visuel » quand c'est le bon choix (§8, §9).
- [ ] Aucune couleur d'état introduite ici n'est absente de [[COLOR_SYSTEM.md]] §5.
- [ ] Aucune redondance entre ce document, [[ERROR_EXPERIENCE.md]] (pattern) et [[NOTIFICATION_LIBRARY.md]] (texte).

---

## 13. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 4) | Perception Psychologist / Interaction Designer |

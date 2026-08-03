# MICROCOPY_LIBRARY.md — Conventions de texte atomique (Phase 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Content Designer / UX Writer Senior
> **Documents liés** : [[UX_WRITING_GUIDE.md]], [[STYLE_GUIDE.md]], [[DIALOG_LIBRARY.md]], [[TOOLTIP_LIBRARY.md]]

> **Cadrage** : ce document couvre le texte le plus court et le plus fréquent (contrôles atomiques). Les dialogues complets vivent dans [[DIALOG_LIBRARY.md]], les tooltips dans [[TOOLTIP_LIBRARY.md]] — les trois partagent les mêmes règles mécaniques ([[UX_WRITING_GUIDE.md]]) mais restent des registres distincts par longueur et fonction.

---

## 1. Boutons

- Verbe à l'impératif, jamais un nom seul : « Se connecter » plutôt que « Connexion ».
- Action principale d'une modale toujours formulée avec le verbe exact de l'action (« Supprimer », jamais « OK » ou « Confirmer » qui obligeraient l'utilisateur à relire le contexte pour savoir ce qu'il valide).
- Bouton secondaire/annulation : toujours « Annuler », jamais une variation (« Retour », « Non ») qui introduirait une incohérence.

## 2. Menus

Libellés en noms d'action courts (« Ajouter à une playlist », « Voir l'artiste »), jamais de question ni de ponctuation finale.

## 3. Tooltips

Voir [[TOOLTIP_LIBRARY.md]] pour la bibliothèque complète — règle mécanique : jamais de ponctuation finale, jamais une phrase complète avec sujet/verbe si un fragment suffit.

## 4. Labels

- Toujours au singulier sauf si le champ contient intrinsèquement plusieurs éléments (« Genres » pour un champ à sélection multiple).
- Jamais de deux-points final (« Nom » plutôt que « Nom : »).

## 5. Inputs (placeholder)

Un exemple concret plutôt qu'une instruction : « https://mon-serveur.exemple.com » plutôt que « Entrez l'adresse de votre serveur » (déjà dit par le label adjacent — [[UX_WRITING_GUIDE.md]] §1, éviter la redondance).

## 6. Checkbox et Radio

Formulés comme une affirmation à laquelle l'état coché répond « oui » : « Historique d'écoute activé » plutôt que « Activer l'historique d'écoute » (ambigu une fois déjà coché).

## 7. Dropdown (menu déroulant)

Option par défaut toujours explicite (« Trier par : Titre »), jamais un état vide implicite qui obligerait l'utilisateur à ouvrir le menu pour savoir ce qui est actif.

## 8. Modales

Titre = l'action précise (« Supprimer la playlist Focus ? »), jamais un titre générique (« Confirmation »). Voir [[DIALOG_LIBRARY.md]] pour les textes complets.

## 9. Toasts et Snackbars

Une seule ligne, fait accompli déjà formulé au passé composé bref (« Ajouté à Focus. »), jamais un participe présent (« Ajout en cours... » réservé à un indicateur de progression, pas un toast).

## 10. Dialogues

Voir [[DIALOG_LIBRARY.md]].

## 11. Badges

Un mot ou un chiffre seul (« Nouveau », « 12 »), jamais une phrase — un badge qui nécessite plus de deux mots devrait être un label, pas un badge.

---

## 12. Checklist de validation

- [ ] Chaque type de composant du cadrage a une règle mécanique explicite, pas seulement des exemples isolés.
- [ ] Aucune règle ne contredit [[UX_WRITING_GUIDE.md]].
- [ ] La distinction avec [[DIALOG_LIBRARY.md]] et [[TOOLTIP_LIBRARY.md]] reste claire (registre atomique vs registre étendu).

---

## 13. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 3) | Content Designer / UX Writer Senior |

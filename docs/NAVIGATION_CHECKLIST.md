# NAVIGATION_CHECKLIST.md — Critères de validation du système de navigation (Phase 8)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : QA Engineer / Navigation System Architect
> **Documents liés** : [[NAVIGATION_SYSTEM.md]] §1, [[COMPONENT_CHECKLIST.md]] §1, [[DEFINITION_OF_DONE.md]]

> **Cadrage** : [[COMPONENT_CHECKLIST.md]] §1 définit ce qui rend un *composant* terminé (tokens, accessibilité, Storybook). Ce document définit ce qui rend le *système de navigation dans son ensemble* conforme à sa propre constitution ([[NAVIGATION_SYSTEM.md]] §1) — des critères vérifiables sur un parcours complet, pas sur un composant isolé.

---

## 1. Vérification de la constitution

- [ ] **Maximum trois actions pour atteindre n'importe quelle musique** ([[NAVIGATION_SYSTEM.md]] §1) : vérifié sur chaque parcours de [[USER_JOURNEYS.md]] qui mène à une lecture — compter les clics/taps réels depuis l'écran d'accueil.
- [ ] **La musique ne s'arrête jamais lors d'une navigation** ([[PRODUCT_RULES.md]] §2) : vérifié en déclenchant chaque transition de [[TRANSITION_GUIDE.md]] pendant une lecture active, aucune coupure audio ne doit survenir.
- [ ] **Le lecteur reste toujours accessible** ([[PRODUCT_RULES.md]] §1) : vérifié qu'aucune vue, panneau ou modale ne recouvre entièrement le Mini Player ([[MOBILE_NAVIGATION.md]] §8).
- [ ] **L'utilisateur sait toujours où il se trouve** : vérifié qu'au moins un indicateur (item Sidebar actif, titre TopBar, Breadcrumb) reflète correctement la vue affichée sur chaque écran.
- [ ] **Retour toujours logique** ([[NAVIGATION_HISTORY.md]] §2) : vérifié qu'un retour ramène exactement à l'état précédent (position de défilement, filtres) sur un échantillon de parcours à trois niveaux de profondeur.

## 2. Cohérence entre méthodes d'entrée

- [ ] Toute action accessible à la souris a un équivalent clavier ([[KEYBOARD_SHORTCUTS.md]]) et tactile ([[MOBILE_NAVIGATION.md]]) — vérifié composant par composant de navigation, pas seulement de façon globale.
- [ ] Le retour se comporte identiquement quel que soit le déclencheur (geste, bouton système, raccourci clavier) — [[MOBILE_NAVIGATION.md]] §9.
- [ ] Aucun raccourci clavier n'entre en collision avec une combinaison réservée ([[KEYBOARD_SHORTCUTS.md]] §11).

## 3. Cohérence cross-plateforme

- [ ] La navigation principale (Sidebar/BottomBar/Dock) suit la règle de sélection par classe d'appareil sans zone grise ([[RESPONSIVE_GUIDE.md]] §1-7ter) — testé aux limites exactes de chaque seuil de largeur, pas seulement au centre de chaque plage.
- [ ] Aucune fonctionnalité de navigation n'est retirée sur une classe d'appareil, seule la densité change ([[RESPONSIVE_GUIDE.md]] §2).
- [ ] La préparation TV/manette ([[RESPONSIVE_GUIDE.md]] §7ter) n'a introduit aucune régression sur les classes d'appareil déjà livrées.

## 4. Accessibilité du système de navigation

- [ ] Chaque région de navigation a un landmark ARIA distinct et libellé ([[ACCESSIBILITY_GUIDE.md]] §6bis).
- [ ] Les liens d'évitement (contenu principal, lecteur) fonctionnent depuis le tout premier élément focusable de l'application.
- [ ] L'ordre de focus reste cohérent avec la hiérarchie visuelle sur chaque écran, pas seulement sur les écrans testés lors de la conception initiale ([[NAVIGATION_GUIDE.md]] §8).

## 5. Performance de la navigation

- [ ] Aucune transition de page ne dépasse la catégorie Complexe (300-400ms, [[MOTION_GUIDELINES.md]] §1).
- [ ] La position de défilement et les filtres sont restaurés sans re-fetch réseau visible à l'utilisateur ([[NAVIGATION_HISTORY.md]] §3).
- [ ] Aucun composant de navigation persistant (Sidebar, TopBar, Mini Player) n'est remonté à chaque navigation ([[LAYOUT_COMPONENTS.md]] §12, [[TOPBAR_SPECIFICATION.md]] §12).

## 6. Évolutivité à 10 ans

- [ ] Une nouvelle section de l'arborescence ([[NAVIGATION_GUIDE.md]] §1) peut être ajoutée sans modifier la structure de la Sidebar/BottomBar elle-même — uniquement une entrée de plus dans une liste déjà conçue pour grandir.
- [ ] Une nouvelle méthode d'entrée (manette, télécommande) peut consommer la même pile de navigation ([[NAVIGATION_HISTORY.md]] §2) sans redéfinir sa structure — vérifié par la préparation déjà posée ([[RESPONSIVE_GUIDE.md]] §7ter).
- [ ] Aucune règle de ce système n'a été tranchée par préférence isolée sans justification tracée — cohérent avec [[FOUNDATIONS.md]] §5 (aucune valeur arbitraire), appliqué ici à la navigation.

---

## 7. Comment utiliser cette checklist

Cette checklist se vérifie sur un **parcours complet** (plusieurs écrans, plusieurs méthodes d'entrée), jamais composant par composant isolé — c'est la différence avec [[COMPONENT_CHECKLIST.md]] §1, qui reste la référence pour la validation d'un composant pris seul. Une navigation dont chaque composant individuel passe [[COMPONENT_CHECKLIST.md]] §1 peut malgré tout échouer cette checklist si l'assemblage global viole la constitution ([[NAVIGATION_SYSTEM.md]] §1) — les deux checklists sont complémentaires, jamais substituables l'une à l'autre.

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 8) | QA Engineer / Navigation System Architect |

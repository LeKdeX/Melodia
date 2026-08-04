# MOBILE_NAVIGATION.md — Architecture de navigation mobile (Phase 8)

> **Statut** : document fondateur, vivant — préparation architecturale
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Navigation System Architect / Human Interface Specialist
> **Documents liés** : [[RESPONSIVE_GUIDE.md]] §2-3, [[INTERACTION_GUIDELINES.md]] §2, [[INTERACTION_LIBRARY.md]] §9

> **Cadrage** : [[RESPONSIVE_GUIDE.md]] §2-3 a déjà défini le comportement par classe d'appareil mobile. [[INTERACTION_GUIDELINES.md]] §2 et [[INTERACTION_LIBRARY.md]] §9 ont déjà défini les gestes tactiles génériques (glissement, appui long). Ce document assemble ces éléments existants en une architecture de navigation mobile cohérente et ajoute ce qui manquait réellement : Pull to Refresh et Drawer.

---

## 1. Bottom Tabs

Voir BottomBar ([[LAYOUT_COMPONENTS.md]]) — 4 entrées maximum ([[RESPONSIVE_GUIDE.md]] §2), non redécrit ici.

## 2. Swipe Navigation

- **Glissement horizontal sur le contenu principal** : non utilisé pour la navigation entre sections (réservé aux Bottom Tabs, §1, pour rester prévisible) — utilisé uniquement pour les actions locales à un élément (§Swipe Actions ci-dessous).
- **Glissement depuis le bord gauche de l'écran** : équivalent geste du retour ([[NAVIGATION_HISTORY.md]] §2, [[TRANSITION_GUIDE.md]] §7) — suit le doigt en temps réel avant relâchement, jamais une animation figée qui ignore la position du geste en cours.

## 3. Drawer (ajout Phase 8)

Panneau de navigation secondaire glissé depuis un bord (gauche par défaut), superposé au contenu — utilisé pour un menu de catégories trop dense pour les Bottom Tabs (ex. sous-catégories de Bibliothèque non promues en onglet direct). **Anatomie** : identique à Sidebar en mode Floating ([[LAYOUT_COMPONENTS.md]] §3bis), jamais une seconde implémentation de menu de navigation — le Drawer mobile est l'application de la variante Floating de Sidebar à ce contexte précis. **Fermeture** : glissement vers le bord d'origine, tap en dehors, ou bouton dédié — jamais un seul mécanisme de fermeture sans alternative.

## 4. Pull to Refresh (ajout Phase 8)

Glissement vers le bas au sommet d'une liste déjà au repos (position de défilement à zéro) déclenche une synchronisation manuelle ([[MOTION_GUIDELINES.md]] §9 pour l'indicateur). **Règle** : jamais disponible si une synchronisation automatique est déjà en cours (le geste est neutralisé, pas mis en file d'attente) — évite une double synchronisation redondante. **Retour visuel** : indicateur qui suit la distance du glissement avant le seuil de déclenchement, puis bascule sur l'indicateur de synchronisation standard une fois relâché au-delà du seuil ([[MOTION_GUIDELINES.md]] §12ter, élasticité).

## 5. Long Press

Voir [[INTERACTION_GUIDELINES.md]] §2 — menu contextuel complet ([[OVERLAY_COMPONENTS.md]] ContextMenu), non redécrit ici. Rappel du garde-fou déjà acté : jamais en conflit avec un geste d'accessibilité système (zoom, VoiceOver rotor).

## 6. Swipe Actions

Glissement latéral sur une ligne d'élément (Track Card compacte, Queue Item) révèle des actions rapides (favoris, retrait de la file) avant déclenchement — voir [[INTERACTION_LIBRARY.md]] §9 pour la chorégraphie complète (révélation avant déclenchement, jamais un geste accidentel irréversible), non redécrite ici.

## 7. Floating Actions

FAB ([[BUTTON_SPECIFICATION.md]]) — un seul visible par écran, jamais empilé avec un autre élément flottant (Mini Player, §8) qui occuperait la même zone de l'écran ; repositionné plus haut si le Mini Player est visible, jamais superposé à lui.

## 8. Mini Player en contexte mobile

Le Mini Player reste ancré au-dessus des Bottom Tabs, jamais en dessous ni en les recouvrant — cohérent avec [[PRODUCT_RULES.md]] §1 (le lecteur est toujours accessible) et avec le principe que la navigation ne doit jamais masquer la musique ([[NAVIGATION_SYSTEM.md]] §1). Un Drawer ouvert (§3) recouvre le contenu principal mais jamais le Mini Player, qui reste visible par-dessus.

## 9. Retour mobile — bouton système

Sur Android, le bouton de retour système suit exactement la même pile de navigation que le geste de bord (§2) et le Retour clavier desktop ([[KEYBOARD_SHORTCUTS.md]] §1) — trois déclencheurs, un seul mécanisme, jamais une divergence de comportement selon la méthode utilisée pour déclencher le retour.

---

## 10. Checklist de validation

- [ ] Chaque geste demandé par le cadrage (Bottom Tabs, Swipe Navigation, Drawer, Pull to Refresh, Long Press, Swipe Actions, Floating Actions) a une règle explicite.
- [ ] Aucun geste mobile ne redéfinit un comportement déjà acté ailleurs ([[INTERACTION_GUIDELINES.md]], [[INTERACTION_LIBRARY.md]]) — uniquement assemblé et complété.
- [ ] Le Mini Player reste visible dans toutes les configurations décrites (§8).

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 8) | Navigation System Architect / Human Interface Specialist |

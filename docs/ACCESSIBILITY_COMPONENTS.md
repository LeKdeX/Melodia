# ACCESSIBILITY_COMPONENTS.md — Contrat d'accessibilité transverse (Phase 6)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Accessibility Specialist
> **Documents liés** : [[ACCESSIBILITY_GUIDE.md]], [[DESIGN_SYSTEM_ARCHITECTURE.md]] §5, [[COMPONENT_LIBRARY.md]]

> **Cadrage** : ce n'est pas une catégorie de composants — [[ACCESSIBILITY_GUIDE.md]] a déjà défini le comportement d'accessibilité (Phase 1 volume 3, étendu Phase 2). Ce document traduit ce comportement en un **contrat commun** que chaque composant de cette bibliothèque référence dans sa section « Accessibilité » plutôt que de le répéter — pour qu'une règle d'accessibilité modifiée une fois se propage partout, jamais réécrite 134 fois avec le risque de divergence que cela impliquerait.

---

## 1. Niveau cible

WCAG 2.2 AA non négociable, AAA visé lorsque atteignable sans compromis fonctionnel — déjà acté ([[PROJECT_CHARTER.md]] §3.6, [[ACCESSIBILITY_GUIDE.md]]). Chaque composant de cette bibliothèque est conçu pour AA au minimum sans exception.

## 2. Primitives de focus (référencées par tout composant interactif)

- Contour de focus visible et suffisamment contrasté, jamais supprimé par une réinitialisation de style ([[ACCESSIBILITY_GUIDE.md]] §5) — token `focus-ring` (couleur `accent-500` constante, [[COLOR_SYSTEM.md]] §6bis).
- Piège de focus réservé aux surfaces modales (Dialog, Modal, BottomSheet, Command Palette) — capturé à l'ouverture, restitué précisément à l'élément déclencheur à la fermeture.
- Ordre de focus cohérent avec l'ordre visuel/DOM, jamais un ordre géré manuellement par composant.

## 3. Primitive de région live (référencée par tout composant qui communique un changement d'état asynchrone)

Toast, Snackbar, Notification, Banner, Alert, Sync State, Import State, Loading State utilisent tous la même primitive `aria-live="polite"` par défaut — jamais `assertive` sauf Alert bloquante ([[ERROR_EXPERIENCE.md]] §3, réservé aux décisions irréversibles). Un seul composant à la fois annonce un changement — jamais deux régions live actives simultanément avec un message concurrent.

## 4. Utilitaire « visually hidden »

Tout composant qui porte une information uniquement visuelle par ailleurs (icône seule, couleur d'état seule) l'accompagne d'un texte lisible par un lecteur d'écran mais visuellement masqué — jamais un `aria-label` seul quand un texte visible masqué est possible (plus robuste face aux outils de traduction automatique de l'OS).

## 5. Zones tactiles

44×44px minimum sur tout élément interactif, indépendamment de sa taille visuelle ([[ICONOGRAPHY_GUIDE.md]] §5) — la zone interactive et la zone visuelle ne sont jamais confondues dans une spécification de composant. Référencé par tout composant de la famille Button, Form, Overlay.

## 6. Patterns ARIA de référence

| Rôle de composant | Pattern ARIA | Référence |
|---|---|---|
| Bouton | `<button>` natif, jamais un `<div>` cliquable | [[ACCESSIBILITY_GUIDE.md]] §8 |
| Liste/Grille | `role="list"`/`"listitem"` ou `role="grid"` selon navigation attendue, position/total annoncés | [[ACCESSIBILITY_GUIDE.md]] §8, §2 |
| Slider (progression, volume) | `role="slider"`, valeur actuelle/min/max explicites, ajustable au clavier | [[ACCESSIBILITY_GUIDE.md]] §8 |
| Menu / ContextMenu | `role="menu"`, navigation flèches, fermeture `Échap` avec restitution de focus | [[ACCESSIBILITY_GUIDE.md]] §8 |
| Dialog/Modal destructif | `role="alertdialog"` | [[ACCESSIBILITY_GUIDE.md]] §8, [[PRODUCT_RULES.md]] §7 |
| Toast/Snackbar/Notification | `aria-live="polite"`, jamais focus-stealing | [[ACCESSIBILITY_GUIDE.md]] §8 |
| Tabs | `role="tablist"`/`"tab"`/`"tabpanel"`, navigation flèches gauche/droite | Nouveau, cohérent avec le pattern WAI-ARIA Tabs standard |
| Combobox/Select/Command Palette | `role="combobox"` avec `aria-expanded`/`aria-activedescendant` | Nouveau, cohérent avec le pattern WAI-ARIA Combobox standard |
| Accordion | `aria-expanded` sur le déclencheur, contenu associé via `aria-controls` | Nouveau, cohérent avec le pattern WAI-ARIA Disclosure standard |
| Checkbox/Radio/Switch | Contrôle natif ou `role` équivalent (`role="switch"` pour Switch), jamais une case à cocher stylée sans sémantique | Nouveau |

## 7. RTL (préparation, non activée)

Aucune langue RTL n'est encore engagée ([[LOCALIZATION_GUIDE.md]] §6) — chaque composant de cette bibliothèque évite néanmoins toute logique codée en absolu gauche/droite dans son anatomie (utiliser des propriétés logiques `start`/`end` plutôt que `left`/`right` dans l'implémentation) pour ne pas nécessiter de réécriture le jour où une langue RTL serait ajoutée. Signalé comme préparation, jamais comme une fonctionnalité RTL livrée.

## 8. Comment un composant référence ce contrat

La section « Accessibilité » de chaque composant de cette bibliothèque ne répète jamais les règles ci-dessus — elle cite ce document et documente uniquement ce qui est spécifique au composant (ex. le pattern ARIA exact s'il diffère du tableau §6, un raccourci clavier propre au composant).

---

## 9. Checklist de validation

- [ ] Chaque primitive (focus, live region, visually hidden, zone tactile) est définie une seule fois ici, jamais redéfinie dans un composant individuel.
- [ ] Le tableau de patterns ARIA (§6) couvre tous les rôles de composants interactifs de la bibliothèque.
- [ ] La préparation RTL reste explicitement non activée, jamais présentée comme livrée.

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 6) | Accessibility Specialist |

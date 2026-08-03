# ACCESSIBILITY_GUIDE.md — Expérience accessible (Phase 1, volume 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Accessibility Specialist / Human Interface Designer
> **Documents liés** : [[PROJECT_CHARTER.md]] §3.6, [[PERSONAS.md]] §8, [[DEFINITION_OF_DONE.md]], [[INTERACTION_GUIDELINES.md]] §5

> **Cadrage** : le niveau cible (WCAG 2.2 AA minimum, AAA visé lorsque atteignable) est déjà acté dans [[PROJECT_CHARTER.md]] §3.6 — ce document ne le redécide pas. Il consolide et approfondit ce qui était jusqu'ici dispersé entre plusieurs documents (checklist de vérification dans [[DEFINITION_OF_DONE.md]], principe dans [[UX_PRINCIPLES.md]], persona dans [[PERSONAS.md]] §8) en une référence unique de comportement, sans dupliquer leur contenu.

---

## 1. Navigation clavier

- Tout élément interactif est atteignable par tabulation, sans exception ([[PRODUCT_RULES.md]] via [[PERSONAS.md]] §8).
- Ordre de focus cohérent avec la hiérarchie visuelle ([[NAVIGATION_GUIDE.md]] §8), jamais un ordre DOM accidentel qui ferait sauter le focus de façon imprévisible.
- Pièges de focus interdits : une modale capture le focus en son sein tant qu'elle est ouverte, mais le restitue précisément à l'élément qui l'a ouverte à sa fermeture.
- Raccourcis globaux ([[INTERACTION_GUIDELINES.md]] §1) n'entrent jamais en conflit avec les raccourcis natifs du système ou du lecteur d'écran.

## 2. Lecteurs d'écran

- Chaque composant interactif a un nom accessible explicite (jamais une icône seule sans label, [[DESIGN_SYSTEM_ARCHITECTURE.md]] §5).
- **État de lecture** : les changements d'état du lecteur (lecture/pause, changement de piste) sont annoncés via une région `aria-live` polie (non intrusive), jamais assertive au point d'interrompre la lecture vocale d'autre chose ([[FRONTEND_ARCHITECTURE.md]] §9).
- **Listes virtualisées** : la sémantique de liste (nombre total d'éléments, position de l'élément courant) reste correcte malgré le rendu virtualisé ([[PERFORMANCE_BUDGET.md]] §3) — un lecteur d'écran ne doit jamais percevoir une liste tronquée à ce qui est visuellement monté.
- **Contenu dynamique** (résultats de recherche, mise à jour de file) : annoncé de façon proportionnée — un nombre de résultats annoncé une fois, jamais chaque élément individuellement au fil de la frappe.

## 3. Contrastes

Conforme au seuil déjà acté ([[PROJECT_CHARTER.md]] §3.6). Cas particulier : la palette dynamique extraite des pochettes ([[PLAYER_SPECIFICATION.md]] §4) est systématiquement vérifiée par un algorithme de contraste minimum avant application au texte — une pochette dont les couleurs ne passeraient pas le seuil ne bloque jamais la lisibilité, un texte de secours à contraste garanti prend le relais.

## 4. Réduction des animations

`prefers-reduced-motion` respecté par défaut ([[MOTION_GUIDELINES.md]] §12), réglage applicatif plus fin disponible en paramètres ([[SETTINGS_SPECIFICATION.md]] §4) — les deux mécanismes coexistent, le second n'annule jamais le premier par défaut.

## 5. Focus visible

Contour de focus systématique et suffisamment contrasté sur tout élément interactif, jamais supprimé par une réinitialisation de style ([[DESIGN_SYSTEM_ARCHITECTURE.md]] §5) — non négociable, y compris sur les éléments personnalisés (cartes, contrôles du lecteur).

## 6. Navigation logique

L'ordre de lecture d'un lecteur d'écran suit le même ordre que la navigation clavier (§1) — jamais deux ordres divergents qui donneraient une expérience incohérente selon la technologie d'assistance utilisée.

## 7. Commandes vocales

**Statut : non engagé pour cette phase**, cohérent avec [[INTERACTION_GUIDELINES.md]] §5 — dépend d'une intégration à un assistant vocal système non évaluée techniquement. Ce document ne spécifie pas de comportement de commande vocale pour éviter de promettre une fonctionnalité non conçue ; signalé explicitement plutôt que silencieusement omis.

## 8. Patterns ARIA par type de composant

| Composant | Pattern |
|---|---|
| Lecteur (contrôles) | `role="region"` avec label explicite, boutons natifs (jamais des `div` cliquables) pour lecture/pause/suivant/précédent |
| Liste de bibliothèque | `role="list"`/`role="listitem"`, position et total annoncés |
| Barre de progression de lecture | `role="slider"` avec valeur actuelle/min/max explicites, ajustable au clavier (flèches) |
| Menu contextuel | `role="menu"`, navigation flèches haut/bas, fermeture par `Échap` avec restitution du focus |
| Modale de confirmation | `role="alertdialog"` si l'action est destructive ([[PRODUCT_RULES.md]] §7), focus piégé jusqu'à résolution |
| Notification transitoire (toast/snackbar) | `aria-live="polite"`, jamais focus-stealing — l'utilisateur n'est jamais interrompu dans sa tâche en cours ([[ERROR_EXPERIENCE.md]]) |

## 9. Zoom et redimensionnement de texte

Le layout reste fonctionnel jusqu'à 200 % de zoom texte sans perte de contenu ni chevauchement — testé comme critère de non-régression, pas une aspiration ([[DEFINITION_OF_DONE.md]]).

---

## 10. Checklist de validation

- [ ] Aucun élément interactif n'est inatteignable au clavier.
- [ ] Chaque pattern ARIA du §8 est appliqué de façon cohérente à travers toute l'application, pas une fois par composant réinventé.
- [ ] Les commandes vocales restent explicitement non engagées, jamais implicitement promises.
- [ ] Le niveau cible WCAG reste celui de [[PROJECT_CHARTER.md]] §3.6, non redéfini ici.

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 3) | Accessibility Specialist / Human Interface Designer |

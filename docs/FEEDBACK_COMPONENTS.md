# FEEDBACK_COMPONENTS.md — Composants de retour et de statut (Phase 6)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / QA Engineer
> **Documents liés** : [[COMPONENT_LIBRARY.md]], [[VISUAL_FEEDBACK_GUIDE.md]], [[NOTIFICATION_LIBRARY.md]]

> **Cadrage** : `Toast` est spécifié en profondeur complète. Snackbar/Notification/Banner/Alert sont compacts (variantes du même pattern de notification transitoire, [[ERROR_EXPERIENCE.md]] §2). ProgressBar/CircularProgress/Badge/Chip/Tag sont compacts (atomes de statut).

---

# Toast (spécification complète)

## 1. Présentation

- **Objectif** : confirmer discrètement qu'une action a réussi, sans interrompre.
- **Contexte** : succès d'une action déjà anticipée par l'utilisateur ([[NOTIFICATION_LIBRARY.md]] §5).
- **Valeur utilisateur** : confirmation sans effort de lecture, disparaît de lui-même.
- **Quand utiliser** : confirmation non critique, information déjà attendue.
- **Quand ne pas utiliser** : erreur bloquante (utiliser Dialog) ; information persistante nécessaire (utiliser Banner).
- **Alternatives** : micro-interaction locale ([[INTERACTION_GUIDELINES.md]] §4) quand l'action a déjà une localisation visuelle évidente — le Toast est réservé aux cas sans localisation possible.

## 2. Anatomie

```
┌───────────────────────────┐
│ [Icône] Message   [Action?]│
└───────────────────────────┘
```

Icône optionnelle (succès uniquement, jamais pour une simple information neutre), message une ligne ([[UX_WRITING_GUIDE.md]] §3), action optionnelle (ex. « Annuler »).

## 3. Variantes

Succès (icône `state-success`), Neutre (aucune icône), avec Action (bouton texte inline) — jamais de variante Erreur (une erreur suit un pattern différent, [[ERROR_EXPERIENCE.md]] §3).

## 4. États

Entrant, Visible, Sortant — durée de vie 3-5 secondes ([[ERROR_EXPERIENCE.md]] §2), interrompue si l'utilisateur interagit avec l'action proposée.

## 5. Responsive

Position : coin inférieur sur desktop, pleine largeur avec marge sur mobile ([[RESPONSIVE_GUIDE.md]] §1 pour les classes d'appareil concernées).

## 6. Accessibilité

`aria-live="polite"` ([[ACCESSIBILITY_COMPONENTS.md]] §3), jamais focus-stealing — l'utilisateur continue sa tâche sans interruption de focus clavier.

## 7. Design Tokens

Élévation `shadow-elevation-2`, z-index `toast` (jamais recouvert par le contenu applicatif, seule exception volontaire : un Tooltip actif, [[DESIGN_TOKENS.md]] §3), rayon `radius-md`.

## 8. Animations

Voir [[ANIMATION_LIBRARY.md]] §8 (Toast/Snackbar Enter/Exit).

## 9. Bonnes pratiques

Un seul Toast visible à la fois, file d'attente séquentielle ([[ERROR_EXPERIENCE.md]] §5).

## 10. Anti-patterns

- **Toast pour une erreur qui nécessite une action** : sous-informe l'utilisateur sur un sujet qui mérite plus d'attention — utiliser Snackbar avec action ou Banner.
- **Plusieurs Toasts empilés visibles simultanément** : bruit visuel, viole la règle de file séquentielle.

## 11. Cas limites

Message très long : tronqué à une ligne avec ellipse, jamais un Toast qui grandit de façon disproportionnée — un message qui ne tient pas en une ligne doit utiliser Banner.

## 12. Performance

Démonté du DOM après disparition, jamais gardé en mémoire pour un historique (l'historique de notifications, s'il existe, est une fonctionnalité séparée non couverte ici).

## 13. Tests

Accessibilité (`aria-live`, absence de vol de focus), interaction (action inline), visuel (troncature), temporel (durée d'affichage).

---

# Snackbar (spécification compacte)

Variante de Toast avec action plus systématique (ex. « Annuler » après suppression). Durée 4-6s ou jusqu'à interaction ([[ERROR_EXPERIENCE.md]] §2).

# Notification (spécification compacte)

Variante de Toast utilisée pour un événement de fond non déclenché par une action directe de l'utilisateur (ex. nouvel album disponible d'un artiste suivi, [[NOTIFICATION_LIBRARY.md]] §8) — même anatomie et primitive `aria-live="polite"` que Toast ([[ACCESSIBILITY_COMPONENTS.md]] §3), seule la nature du déclencheur diffère (événement système plutôt qu'action utilisateur). Quand l'application est en arrière-plan ou fermée, le même événement se manifeste comme une notification système native de l'OS plutôt que ce composant in-app — les deux formes partagent le même texte source, jamais un contenu divergent ([[NOTIFICATION_LIBRARY.md]] §9).

# Banner (spécification compacte)

Bande persistante en haut de contenu, jusqu'à résolution de la cause ([[ERROR_EXPERIENCE.md]] §2). N'interrompt jamais l'usage du contenu en dessous. Élévation 2.

# Alert (spécification compacte)

Message inline, non transitoire, intégré au flux de contenu (ex. dans un formulaire) plutôt que superposé — distinct de Banner par sa position (dans le flux, jamais flottant).

# ProgressBar / CircularProgress (spécification compacte)

Voir [[ANIMATION_LIBRARY.md]] §10 (Progress Fill). `role="progressbar"` avec valeur explicite ([[ACCESSIBILITY_COMPONENTS.md]] §6). CircularProgress réservé aux espaces contraints (bouton en Loading) ; ProgressBar linéaire pour tout le reste (téléchargement, import).

# Badge (spécification compacte)

Un mot ou un chiffre seul ([[MICROCOPY_LIBRARY.md]] §11), jamais interactif lui-même — un Badge cliquable doit être un Chip.

# Chip (spécification compacte)

Badge interactif (cliquable ou avec bouton de suppression) — utilisé pour les filtres actifs (ex. genre sélectionné dans Search Filters, [[SEARCH_COMPONENTS.md]]).

# Tag (spécification compacte)

Synonyme visuel de Chip en contexte non-filtrant (catégorisation affichée, ex. genre d'un album) — non interactif par défaut, distinct de Chip par cette seule propriété.

## Confirmation Dialog (fusion, ajout Phase 7)

**Fusion assumée** : « Confirmation Dialog » désigne la variante Destructive de `Dialog` déjà spécifiée ([[OVERLAY_COMPONENTS.md]] §3) — un dialogue de confirmation n'a pas d'anatomie ou de comportement distinct d'un Dialog en variante Destructive, seul le nom change selon le cadrage source. Voir [[OVERLAY_COMPONENTS.md]] pour la spécification complète et [[DIALOG_LIBRARY.md]] pour le texte, non redécrits ici.

## Loading Overlay (spécification compacte, ajout Phase 7)

Voile semi-transparent superposé à une zone de contenu déjà affichée pendant une opération bloquante de courte durée (ex. sauvegarde d'un réglage critique) — distinct de Skeleton ([[SKELETON_SYSTEM.md]], réservé au premier chargement d'un contenu pas encore affiché) : Loading Overlay recouvre un contenu déjà visible et connu, jamais un contenu qui n'existe pas encore. **Anatomie** : scrim léger (`opacity` réduite, jamais un fond opaque qui masquerait totalement le contexte) + CircularProgress centré ([[FEEDBACK_COMPONENTS.md]] ci-dessus). **Règle d'usage** : réservé aux opérations de moins de quelques secondes — au-delà, un Skeleton ou un état de progression chiffré est plus approprié (cohérent avec [[PREMIUM_EXPERIENCE_BIBLE.md]] §3, rendre l'attente agréable plutôt que la masquer). **Accessibilité** : `aria-busy="true"` sur la zone recouverte, focus non piégé mais interactions désactivées pendant l'affichage.

---

## Checklist de validation

- [ ] Toast couvre les 13 sections en détail.
- [ ] La distinction Toast/Snackbar/Banner/Alert reste cohérente avec [[ERROR_EXPERIENCE.md]] §2, aucune redéfinition contradictoire.
- [ ] Badge/Chip/Tag ont chacun une règle d'interactivité explicite et distincte.

## Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 6) | Product Designer / QA Engineer |
| 0.2.0 | 2026-08-04 | Auto-revue Phase 6 : redéfinition de Notification (contredisait son traitement dans ACCESSIBILITY_COMPONENTS.md §3/§6 comme composant in-app), correction de la citation Toast §5, résolution de la course au z-index avec Tooltip (§7) | Product Designer |
| 0.3.0 | 2026-08-04 | Phase 7 : ajout de Loading Overlay ; fusion explicite Confirmation Dialog=Dialog (variante Destructive) | Product Designer |

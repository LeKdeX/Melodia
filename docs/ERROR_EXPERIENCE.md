# ERROR_EXPERIENCE.md — Patterns UI d'erreur et de notification (Phase 1, volume 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Senior UX Designer / Cognitive Psychologist
> **Documents liés** : [[ERROR_STATES.md]], [[SETTINGS_SPECIFICATION.md]] §12, [[MOTION_GUIDELINES.md]] §8-10

> **Cadrage strict** : [[ERROR_STATES.md]] reste la seule source de vérité pour *quelles* erreurs existent et *quel* message/action chacune déclenche. Ce document répond à une question différente : *quel pattern d'interface* (toast, snackbar, bannière, modale) porte ce message, et pourquoi — ainsi que la taxonomie des notifications transitoires en général (pas seulement les erreurs).

---

## 1. Principe psychologique de base

Une erreur bien présentée réduit l'anxiété au lieu de l'augmenter : elle doit être reconnue immédiatement comme « quelque chose que le produit gère », jamais comme « quelque chose qui a cassé ». Le ton, le placement et la durée d'affichage sont calibrés pour cet effet, pas seulement pour la lisibilité de l'information.

## 2. Taxonomie des patterns

| Pattern | Forme | Durée | Interrompt la tâche en cours ? |
|---|---|---|---|
| Toast | Message flottant temporaire, coin de l'écran | 3-5 s, disparition automatique | Non |
| Snackbar | Bande fine en bas d'écran, peut inclure une action (ex. « Annuler ») | 4-6 s ou jusqu'à interaction | Non |
| Bannière | Bande persistante en haut de contenu | Jusqu'à résolution de la cause | Non — coexiste avec l'usage normal |
| Modale | Superposition bloquante avec confirmation requise | Jusqu'à action explicite | Oui — réservée aux cas qui l'exigent réellement |

## 3. Règle de sélection du pattern

| Situation | Pattern retenu | Justification |
|---|---|---|
| Confirmation d'une action réussie (ajout à une playlist) | Toast discret ou micro-interaction locale ([[INTERACTION_GUIDELINES.md]] §4) | Ne mérite pas d'interrompre, l'utilisateur a déjà l'intention confirmée |
| Erreur récupérable automatiquement (nouvelle tentative en cours) | Bannière | Persiste tant que pertinent, sans bloquer |
| Erreur nécessitant une action de l'utilisateur mais non bloquante pour le reste de l'app (téléchargement échoué) | Snackbar avec action | L'utilisateur peut continuer à écouter pendant qu'il décide |
| Action destructive nécessitant confirmation ([[PRODUCT_RULES.md]] §7) | Modale | La seule catégorie où interrompre délibérément est justifié — l'enjeu (perte de données) le exige |
| Perte de connexion serveur | Bannière persistante ([[ERROR_STATES.md]] §1) | Reste visible tant que non résolu, jamais répétée en toast (qui disparaîtrait et serait oubliée) |
| Erreur de lecture (piste indisponible) | Aucune interruption visible au-delà d'un toast bref | La musique continue ([[PRODUCT_RULES.md]] §2) — l'erreur ne mérite pas plus d'attention que ça |

**Règle absolue** : la modale est le pattern le plus coûteux en attention et n'est jamais utilisée pour une simple information — seulement quand une décision irréversible est en jeu.

## 4. Notifications non liées à une erreur

Mêmes patterns, appliqués aux catégories déjà définies dans [[SETTINGS_SPECIFICATION.md]] §12 : téléchargement terminé (toast), synchronisation en échec (bannière), mise à jour disponible (snackbar non intrusif, jamais une modale qui interromprait l'écoute).

## 5. Comportement transverse

- Jamais plus d'un toast/snackbar visible simultanément — une file d'attente de notifications s'affiche séquentiellement, jamais empilée de façon désordonnée.
- Une bannière active n'empêche jamais l'interaction avec le contenu en dessous.
- Toute notification respecte `aria-live="polite"` ([[ACCESSIBILITY_GUIDE.md]] §8) sauf la modale, qui capture le focus légitimement.
- Animation d'apparition/disparition : voir [[MOTION_GUIDELINES.md]] §8 (modales) — toasts/snackbars/bannières utilisent la catégorie « Standard » avec courbes `entrance`/`exit`.

---

## 6. Checklist de validation

- [ ] Aucun cas d'erreur de [[ERROR_STATES.md]] n'est redécrit ici — uniquement son pattern d'affichage assigné.
- [ ] La modale n'est utilisée que pour des décisions irréversibles.
- [ ] Jamais plus d'une notification transitoire visible à la fois.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 3) | Senior UX Designer / Cognitive Psychologist |

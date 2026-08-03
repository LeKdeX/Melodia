# NOTIFICATION_LIBRARY.md — Texte réel des notifications (Phase 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : UX Writer Senior / Content Designer
> **Documents liés** : [[SETTINGS_SPECIFICATION.md]] §12, [[ERROR_EXPERIENCE.md]], [[VOICE_AND_TONE.md]]

> **Cadrage** : [[SETTINGS_SPECIFICATION.md]] §12 définit quelles catégories de notifications existent et lesquelles sont activées par défaut. [[ERROR_EXPERIENCE.md]] définit le pattern UI (toast/snackbar/bannière). Ce document fournit le texte verbatim.

---

## 1. Lecture / Pause

Aucune notification système — l'état est visible en permanence dans le lecteur ([[PRODUCT_RULES.md]] §1), une notification serait redondante.

## 2. Synchronisation

| Événement | Texte | Pattern |
|---|---|---|
| Terminée | Bibliothèque synchronisée. | Indicateur discret, pas de toast |
| Échec | Synchronisation impossible — nouvelle tentative automatique. | Bannière ([[ERROR_EXPERIENCE.md]] §3) |

## 3. Téléchargement

| Événement | Texte | Pattern |
|---|---|---|
| Terminé | [Titre de l'album/playlist] téléchargé. | Toast, opt-in ([[SOUND_DESIGN_GUIDE.md]] §2) |
| Interrompu | Téléchargement interrompu — espace insuffisant. | Snackbar avec action « Gérer le stockage » |
| Échec réseau | Téléchargement en pause — reprendra à la reconnexion. | Snackbar |

## 4. Erreur

Voir [[ERROR_STATES.md]] pour la liste complète des messages d'erreur déjà écrits — non redupliqués ici.

## 5. Succès (actions générales)

| Événement | Texte |
|---|---|
| Ajout à une playlist | Ajouté à [nom de la playlist]. |
| Ajout aux favoris | Ajouté aux favoris. |
| Playlist créée | [Nom de la playlist] créée. |
| Export terminé | Données exportées. |

## 6. Import terminé

> Importation terminée — [nombre] titres synchronisés.

## 7. Cache mis à jour

Aucune notification — événement interne sans intérêt direct pour l'utilisateur, cohérent avec [[UX_PRINCIPLES.md]] §4 (aucune distraction).

## 8. Nouvelle bibliothèque (ajout détecté côté serveur)

> [Nom de l'artiste] a un nouvel album disponible.

Uniquement si l'artiste est épinglé/suivi ([[FEATURE_ROADMAP.md]] idée #27) — jamais pour un ajout non lié à un centre d'intérêt exprimé par l'utilisateur.

## 9. Variantes selon le contexte (application au premier plan vs arrière-plan)

- **Application au premier plan** : toast/snackbar discret dans l'interface (voir [[ERROR_EXPERIENCE.md]] §2).
- **Application en arrière-plan/fermée** : notification système native, texte identique mais sans article défini superflu quand la longueur système est contrainte (« Téléchargement terminé » plutôt que « Votre téléchargement est terminé »).

---

## 10. Checklist de validation

- [ ] Chaque catégorie du cadrage a une décision explicite, y compris « aucune notification » quand c'est le bon choix (§1, §7).
- [ ] Aucun texte ne dépasse une phrase (cohérent avec [[UX_WRITING_GUIDE.md]] §3).
- [ ] Aucune notification n'est répétée ici depuis [[ERROR_STATES.md]] — uniquement référencée.

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 3) | UX Writer Senior / Content Designer |

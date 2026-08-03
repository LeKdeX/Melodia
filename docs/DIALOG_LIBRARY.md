# DIALOG_LIBRARY.md — Texte réel des confirmations (Phase 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : UX Writer Senior / Conversation Designer
> **Documents liés** : [[PRODUCT_RULES.md]] §7, [[ERROR_EXPERIENCE.md]] §3, [[MICROCOPY_LIBRARY.md]] §8

> **Principe** : chaque dialogue de confirmation nomme précisément l'objet concerné (jamais « cet élément »), précise la conséquence si elle est irréversible, et propose deux actions dont les libellés répètent le verbe exact de l'action — jamais « OK »/« Annuler » seuls sur une action destructive.

---

## 1. Suppression d'une playlist

> **Titre** : Supprimer [nom de la playlist] ?
> **Corps** : Cette action est irréversible.
> **Action principale** : Supprimer
> **Action secondaire** : Annuler

## 2. Suppression d'un téléchargement

> **Titre** : Supprimer ce téléchargement ?
> **Corps** : [Titre] ne sera plus disponible hors ligne.
> **Action principale** : Supprimer
> **Action secondaire** : Annuler

## 3. Vidage de la file d'attente

> **Titre** : Vider la file d'attente ?
> **Corps** : [nombre] titres seront retirés de la file en cours.
> **Action principale** : Vider
> **Action secondaire** : Annuler

## 4. Déconnexion d'un serveur

> **Titre** : Se déconnecter de [nom du serveur] ?
> **Corps** : Conservez vos données locales (favoris, playlists, historique) ou supprimez-les avec la déconnexion.
> **Action 1** : Se déconnecter et conserver les données
> **Action 2** : Se déconnecter et tout supprimer
> **Action secondaire** : Annuler

*(Trois options plutôt que deux — cohérent avec [[USER_JOURNEYS.md]] §11, le choix doit être explicite, jamais un comportement par défaut silencieux.)*

## 5. Réinitialisation du cache local

> **Titre** : Réinitialiser les données locales ?
> **Corps** : Votre bibliothèque sera resynchronisée depuis votre serveur. Vos favoris et playlists créés localement pourraient être affectés si non encore synchronisés.
> **Action principale** : Réinitialiser
> **Action secondaire** : Annuler

## 6. Effacement de l'historique d'écoute

> **Titre** : Effacer votre historique d'écoute ?
> **Corps** : Vos statistiques et suggestions basées sur l'historique seront réinitialisées. Cette action est irréversible.
> **Action principale** : Effacer
> **Action secondaire** : Annuler

## 7. Désactivation de l'historique d'écoute

> **Titre** : Désactiver l'historique d'écoute ?
> **Corps** : Les statistiques, Wrapped et les suggestions basées sur votre écoute ne seront plus disponibles. Votre historique existant reste conservé jusqu'à suppression manuelle.
> **Action principale** : Désactiver
> **Action secondaire** : Annuler

*(Distinction volontaire entre « effacer » §6 et « désactiver » §7 — cohérent avec [[VOCABULARY.md]] §4, ne jamais euphémiser une suppression, et ne jamais confondre arrêt de collecte et effacement des données déjà collectées.)*

## 8. Annulation d'un téléchargement en cours

Pas de confirmation — action non destructive et immédiatement réversible (le téléchargement peut être relancé), cohérent avec [[PRODUCT_RULES.md]] §7 (confirmation réservée aux actions destructives).

---

## 9. Checklist de validation

- [ ] Chaque dialogue nomme précisément l'objet concerné, jamais une formule générique.
- [ ] Chaque action irréversible le précise explicitement dans le corps du texte.
- [ ] Aucune action non destructive ne demande de confirmation superflue (§8).

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 3) | UX Writer Senior / Conversation Designer |

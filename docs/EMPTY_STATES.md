# EMPTY_STATES.md — Spécification des états vides (Phase 1, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Music Experience Designer / UX Research Lead
> **Documents liés** : [[UX_PRINCIPLES.md]] §5, [[USER_JOURNEYS.md]], [[ERROR_STATES.md]]

> **Différence avec [[ERROR_STATES.md]]** : un état vide n'est pas une erreur — c'est un état légitime du produit (bibliothèque neuve, playlist tout juste créée). Le confondre avec une erreur inquiéterait l'utilisateur inutilement. Chaque état vide ci-dessous a une action suivante logique, cohérent avec [[UX_PRINCIPLES.md]] §5.

---

## 1. Bibliothèque vide (aucune synchronisation effectuée)

- **Message** : « Votre bibliothèque apparaîtra ici dès que la synchronisation avec votre serveur sera terminée. »
- **Action proposée** : indicateur de progression si une synchronisation est en cours ([[USER_JOURNEYS.md]] §3), ou invite à vérifier la connexion au serveur si aucune synchronisation n'a démarré.

## 2. Recherche sans résultat

- **Message** : « Aucun résultat pour « [requête] ». »
- **Action proposée** : suggestion de vérifier l'orthographe, d'élargir les filtres actifs si présents, ou d'essayer un terme plus général ([[SEARCH_SPECIFICATION.md]] §6).

## 3. Playlist vide (nouvellement créée)

- **Message** : « Cette playlist est vide. Ajoutez des morceaux depuis votre bibliothèque ou une recherche. »
- **Action proposée** : accès direct à la recherche ou à la bibliothèque depuis cet écran même, jamais un simple message sans chemin d'action.

## 4. Playlist intelligente sans correspondance

- **Message** : « Aucun morceau ne correspond à ces critères actuellement. »
- **Action proposée** : accès direct à la modification des règles ([[PLAYLIST_SPECIFICATION.md]] §5) — distinct du cas §3, jamais confondu visuellement.

## 5. Favoris vides

- **Message** : « Vous n'avez pas encore de favoris. »
- **Action proposée** : rappel discret du geste pour ajouter un favori depuis n'importe quel contexte ([[LIBRARY_SPECIFICATION.md]] §7).

## 6. Téléchargements vides

- **Message** : « Aucun contenu téléchargé pour une écoute hors ligne. »
- **Action proposée** : accès direct à la sélection de contenu à télécharger.

## 7. Historique d'écoute vide

- **Cas A — historique actif mais pas encore d'écoute** : « Votre historique apparaîtra ici après vos premières écoutes. »
- **Cas B — historique désactivé** : « L'historique d'écoute est désactivé. » avec accès direct à son activation ([[SETTINGS_SPECIFICATION.md]] §8) — ces deux cas sont visuellement distincts, jamais confondus (cohérent avec la règle d'honnêteté : ne jamais laisser croire que l'absence de données est temporaire quand elle est en fait un choix de configuration).

## 8. File d'attente vide

- **Message** : « Rien en lecture. » avec accès rapide à la bibliothèque ou aux suggestions de découverte si l'historique le permet ([[QUEUE_SPECIFICATION.md]] §7).

## 9. Statistiques/Wrapped indisponibles (historique insuffisant)

Voir [[STATISTICS_SPECIFICATION.md]] §4 et [[WRAPPED_SPECIFICATION.md]] §5 — mention explicite de la durée d'historique nécessaire, jamais un tableau de bord vide sans explication.

---

## 10. Principes transverses de conception des états vides

1. Jamais un espace blanc non expliqué — chaque état vide a un message et une action.
2. Distinguer visuellement « pas encore de contenu » (temporaire, va se remplir) de « aucun résultat pour ce filtre » (dépend d'une action utilisateur) et de « fonctionnalité désactivée » (dépend d'un réglage) — trois natures différentes, jamais un seul gabarit générique.
3. Le ton reste cohérent avec [[PRODUCT_VALUES.md]] §2 — direct, jamais infantilisant.

---

## 11. Checklist de validation

- [ ] Chaque état vide a une action suivante concrète, pas seulement un message.
- [ ] Les trois natures d'état vide (§10.2) sont distinguées visuellement partout où elles apparaissent.
- [ ] Aucun état vide n'est confondu avec un état d'erreur ([[ERROR_STATES.md]]).

---

## 12. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 2) | Music Experience Designer / UX Research Lead |

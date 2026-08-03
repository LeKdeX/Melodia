# PRODUCT_RULES.md — Règles produit non négociables (Phase 1)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Product Manager Senior / CPO
> **Documents liés** : [[UX_PRINCIPLES.md]], [[ENGINEERING_MANIFESTO.md]], [[DEFINITION_OF_DONE.md]]

> **Différence avec [[UX_PRINCIPLES.md]]** : la charte UX explique le raisonnement (« pourquoi »). Ce document énonce des règles **non négociables et vérifiables**, au niveau du comportement produit — jamais un compromis acceptable, contrairement à un principe qu'on peut pondérer selon le contexte. Une violation d'une règle ici bloque la mise en production de la fonctionnalité concernée, sans exception.

> **Différence avec [[ENGINEERING_MANIFESTO.md]]** : ce document est au niveau du comportement observable par l'utilisateur, pas au niveau du code. Une règle ici se vérifie en utilisant le produit, pas en lisant le code source.

---

## 1. Le lecteur est toujours accessible

Depuis n'importe quel écran de l'application, l'utilisateur doit pouvoir voir l'état de lecture actuel et agir dessus (pause/lecture, piste suivante) sans navigation supplémentaire. Implémentation : provider de lecture global persistant au-dessus du routeur ([[FRONTEND_ARCHITECTURE.md]] §6).

## 2. La musique ne s'arrête jamais lors d'une navigation

Changer de vue, ouvrir un panneau, effectuer une recherche : aucune de ces actions n'interrompt la lecture en cours. Seule une action explicite sur le lecteur (pause, changement de piste) peut l'interrompre. Toute exception constatée est un défaut bloquant, jamais un compromis acceptable.

## 3. Les animations ne doivent jamais ralentir l'utilisateur

Une animation ne retarde jamais la disponibilité de l'action suivante — l'utilisateur peut toujours interagir avec l'élément suivant avant la fin d'une transition visuelle si son intention est claire (ex. cliquer pendant l'animation d'ouverture d'un panneau ne doit pas être ignoré). Budget de référence : 60 FPS constant, aucune animation bloquante ([[PERFORMANCE_BUDGET.md]] §3).

## 4. La recherche doit être perçue comme instantanée

Seuil non négociable : < 100 ms perçus entre la frappe et l'affichage des résultats sur le contenu déjà synchronisé ([[PERFORMANCE_BUDGET.md]] §2). Une dégradation en dessous de ce seuil est un défaut de performance, pas une limite acceptée du produit.

## 5. Les favoris/playlists sont accessibles partout

Ajouter un morceau à une playlist ou aux favoris est possible depuis n'importe quel contexte où ce morceau est visible (résultat de recherche, vue album, file de lecture) — jamais une action qui nécessite de naviguer d'abord vers un autre écran.

## 6. Les interactions sont cohérentes sur toute l'application

Un geste ou un raccourci qui déclenche une action à un endroit déclenche la même catégorie d'action partout où il apparaît. Une incohérence d'interaction (ex. le simple clic ouvre à un endroit, sélectionne à un autre) est un défaut, jamais une variation de contexte acceptable.

## 7. Aucune action destructive sans confirmation explicite

Supprimer une playlist, déconnecter un serveur avec suppression du cache local, vider l'historique : chacune de ces actions demande une confirmation explicite et réversible dans la mesure du possible (corbeille temporaire plutôt que suppression immédiate quand c'est raisonnable).

## 8. L'état de l'application survit à sa fermeture

Position de lecture, file d'attente, dernière vue consultée : fermer et rouvrir l'application restaure cet état sans action de l'utilisateur ([[USER_JOURNEYS.md]] parcours « retour après plusieurs jours »).

## 9. Aucune fonctionnalité n'exige une connexion permanente

Toute donnée déjà synchronisée reste utilisable hors ligne ([[ARCHITECTURE_PRINCIPLES.md]] §3). Une fonctionnalité qui échoue silencieusement hors ligne au lieu de se dégrader proprement est un défaut bloquant.

## 10. Le produit ne collecte jamais de données sans consentement explicite

Aucune télémétrie, aucune analytique comportementale envoyée à un serveur (Melodia ou tiers) par défaut — cohérent avec [[PROJECT_CHARTER.md]] §4 et [[SECURITY_GUIDELINES.md]] §9. Toute exception de ce type est opt-in, jamais opt-out.

**Clarification (Phase 1, volume 2)** : cette règle vise la donnée qui **quitte l'appareil**, pas l'historique d'écoute stocké localement pour des fonctionnalités qui en dépendent structurellement (statistiques, Wrapped, recommandations, mix quotidiens — voir [[STATISTICS_SPECIFICATION.md]], [[WRAPPED_SPECIFICATION.md]], [[DISCOVERY_SPECIFICATION.md]]). Cet historique local est activé **par défaut** (sans lui, ces fonctionnalités seraient inutilisables dès l'installation) mais reste soumis à trois garanties non négociables : (1) il ne quitte jamais l'appareil sans action explicite de l'utilisateur (ex. export volontaire d'une carte Wrapped) ; (2) il est intégralement consultable et supprimable par l'utilisateur à tout moment ; (3) sa désactivation est possible à tout moment sans dégrader le reste du produit, seulement les fonctionnalités qui en dépendent. Ne pas confondre « collecté localement pour servir l'utilisateur » et « collecté pour être envoyé ailleurs » — seul le second cas reste strictement opt-in.

---

## 11. Comment ces règles sont vérifiées

Chaque règle listée ici doit avoir une entrée correspondante et vérifiable dans [[DEFINITION_OF_DONE.md]] avant qu'une fonctionnalité qui la concerne soit considérée terminée. Une règle sans mécanisme de vérification n'est qu'une intention — inacceptable pour ce document.

---

## 12. Checklist de validation

- [ ] Chaque règle est vérifiable en utilisant le produit, sans lecture de code.
- [ ] Aucune règle n'admet d'exception implicite — toute exception nécessaire doit passer par une révision explicite de ce document, jamais un contournement silencieux.
- [ ] Chaque règle est reliée à un budget ou un mécanisme technique concret qui la rend tenable (pas seulement une aspiration).

---

## 13. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1) | Product Manager Senior / CPO |
| 0.2.0 | 2026-08-03 | Clarification §10 (Phase 1 volume 2) : distinction entre télémétrie envoyée à un serveur (strictement opt-in) et historique d'écoute local activé par défaut pour les fonctionnalités de statistiques/découverte | Product Manager Senior / CPO |

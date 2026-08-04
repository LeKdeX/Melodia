# ERROR_SCREENS.md — Écrans d'erreur (Phase 10)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / Accessibility Specialist
> **Documents liés** : [[SCREEN_SYSTEM.md]] §2, [[ERROR_STATES.md]], [[ERROR_EXPERIENCE.md]], [[STATE_COMPONENTS.md]]

> **Cadrage strict** : [[ERROR_STATES.md]] reste la seule source de vérité pour le texte/l'action de chaque erreur. [[ERROR_EXPERIENCE.md]] choisit déjà le pattern (toast/snackbar/bannière/modale). Ce document assemble uniquement quelles erreurs deviennent un écran plein (jamais un simple toast) et pourquoi.

---

## 1. Présentation

La plupart des erreurs de ce produit ne sont jamais des écrans (cohérent avec [[ERROR_EXPERIENCE.md]] §3, la modale/écran plein reste l'exception la plus coûteuse) — ce document couvre les 7 cas qui justifient une occupation complète de l'écran, chacun avec sa raison explicite.

## 2. Connection Lost

Bannière persistante ([[STATE_COMPONENTS.md]] Offline State), jamais un écran plein — le contenu déjà en cache reste utilisable ([[ARCHITECTURE_PRINCIPLES.md]] §3). Documenté ici pour couvrir le cas nommé du cadrage, avec la clarification qu'il ne s'agit **pas** d'un écran au sens plein.

## 3. Server Unreachable (écran plein, seul cas réellement bloquant)

Seul cas de ce document qui occupe l'écran entier — survient uniquement si l'application n'a aucun contenu en cache exploitable (premier lancement interrompu, cache corrompu simultanément). Composition : illustration + message clair + action « Réessayer » + action secondaire « Vérifier les paramètres du serveur ».

## 4. Authentication (écran plein, contexte de connexion uniquement)

Réutilise l'écran de connexion d'Onboarding ([[ONBOARDING_SCREENS.md]] §Server Connection/Authentication) avec un message d'erreur additionnel — jamais un écran d'erreur séparé qui dupliquerait le formulaire de connexion.

## 5. Network

Bannière ou Toast selon la gravité ([[ERROR_EXPERIENCE.md]] §3), jamais un écran plein — une erreur réseau ponctuelle sur une action précise (ex. échec d'un like) reste locale à cette action.

## 6. Storage (espace insuffisant)

Snackbar avec action « Gérer le stockage » menant à Settings > Storage ([[SETTINGS_SCREENS.md]]) — déjà spécifié comme tel dans [[NOTIFICATION_LIBRARY.md]] §3, non redécidé ici.

## 7. Permissions

Dialog ([[DIALOG_LIBRARY.md]] si applicable) ou bannière contextuelle selon la permission concernée (stockage, réseau local pour Cast) — jamais un écran plein pour une permission qui peut se résoudre en un clic.

## 8. Corrupted Cache (écran plein, second cas bloquant)

Survient si le cache local lui-même est corrompu au point de rendre l'application non fonctionnelle (cas extrême, [[EXTREME_SCENARIOS.md]]) — composition : message explicite + action « Réinitialiser les données locales » menant au Dialog déjà spécifié ([[DIALOG_LIBRARY.md]] §5), jamais une réinitialisation automatique sans consentement même dans ce cas extrême.

## 9. Règle de synthèse

Seuls Server Unreachable (§3) et Corrupted Cache (§8) justifient un écran plein — les cinq autres cas nommés par le cadrage restent des patterns déjà définis (bannière/toast/snackbar/dialog) appliqués à un contexte spécifique, jamais un nouvel écran dédié. Documenté explicitement pour éviter qu'une implémentation future ne crée sept écrans plein-page alors que cinq d'entre eux violeraient [[ERROR_EXPERIENCE.md]] §3 (règle absolue : la modale/écran plein n'est jamais utilisée pour une simple information).

## 10. Accessibilité

Les deux écrans pleins (§3, §8) restent navigables au clavier avec un focus initial sur l'action de récupération principale, jamais sur une action secondaire — cohérent avec [[ACCESSIBILITY_GUIDE.md]] §5.

---

## 11. Checklist de validation

- [ ] Seuls Server Unreachable et Corrupted Cache occupent l'écran entier — vérifié explicitement contre [[ERROR_EXPERIENCE.md]] §3.
- [ ] Aucun texte d'erreur n'est redéfini ici, uniquement référencé depuis [[ERROR_STATES.md]].
- [ ] Authentication reste une réutilisation de l'écran de connexion, jamais un doublon.

---

## 12. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 10) | Product Designer / Accessibility Specialist |

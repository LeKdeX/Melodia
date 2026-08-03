# EXTREME_SCENARIOS.md — Validation contre les scénarios extrêmes (Phase 0.5, complément)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Staff Performance Engineer / Senior UX Engineer
> **Documents liés** : [[PERFORMANCE_BUDGET.md]], [[DATA_LAYER.md]], [[JELLYFIN_INTEGRATION.md]], [[AUDIO_ENGINE.md]]

Ce document confronte chaque décision architecturale majeure à des scénarios volontairement extrêmes — au-delà, pour la taille de bibliothèque, du budget engagé ([[PERFORMANCE_BUDGET.md]], 200 000+ titres). L'objectif n'est pas de prouver que tout est parfait dans tous les cas — c'est de documenter honnêtement où l'architecture tient, où elle dégrade proprement, et où elle casserait sans mitigation. Une case « dégradation gracieuse » n'est pas un échec : c'est le comportement voulu (voir [[ARCHITECTURE_PRINCIPLES.md]] §5, dégradation progressive).

Légende : ✅ tient sans dégradation perceptible · ⚠️ dégradation gracieuse (fonctionnalité réduite, jamais de panne) · ❌ risque réel non mitigé à date, nécessite une décision future.

---

## 1. Taille de bibliothèque

| Scénario | Virtualisation ([[TECH_STACK.md]] §1) | Recherche FlexSearch ([[DATA_LAYER.md]] §3) | Cache local ([[DATA_LAYER.md]] §2) | Synchronisation Jellyfin ([[JELLYFIN_INTEGRATION.md]] §3) |
|---|---|---|---|---|
| 500 titres | ✅ trivial | ✅ trivial | ✅ trivial | ✅ synchronisation complète quasi instantanée |
| 10 000 titres | ✅ aucune dégradation mesurable | ✅ aucune dégradation mesurable | ✅ | ✅ |
| 100 000 titres | ✅ dans le budget engagé | ✅ dans le budget engagé (< 100 ms) | ✅ | ✅ incrémentale après synchro initiale |
| 200 000 titres (budget engagé, [[PERFORMANCE_BUDGET.md]] §3) | ✅ 60 FPS constant (cible contractuelle) | ✅ < 100 ms (cible contractuelle) | ✅ | ✅ |
| 300 000 titres (au-delà du budget) | ⚠️ pas de garantie chiffrée — TanStack Virtual reste structurellement en O(éléments visibles), donc le risque est faible, mais non mesuré/validé en CI à ce jour | ⚠️ FlexSearch reste conçu pour cette échelle ([[TECHNOLOGY_COMPARISONS.md]] §7) mais hors du seuil d'alerte contractuel — à valider par un test de fixture dédié avant de l'engager comme budget | ⚠️ taille de fichier local croissante (SQLite tient nativement ; IndexedDB en repli Web mérite une vérification de quota navigateur) | ⚠️ durée de synchronisation initiale non budgétée au-delà de 200k — actuellement non chronométrée |

**Décision** : ne pas relever le budget contractuel à 300 000 sans un test de fixture dédié (voir [[PERFORMANCE_GUIDE.md]] §4) — la marge est probable mais non prouvée. Ticket de dette technique ouvert : étendre la fixture de test à 300k pour transformer ce ⚠️ en ✅ ou en constat chiffré.

## 2. Connectivité

| Scénario | Comportement attendu | Statut |
|---|---|---|
| Connexion lente (mesurée dans [[PERFORMANCE_BUDGET.md]] §1, "bonne 4G") | Chargement initial des métadonnées plus lent, mais contenu déjà synchronisé reste utilisable depuis `LocalStore` sans attendre le réseau | ✅ — c'est la raison d'être de la stratégie de cache local ([[ARCHITECTURE_PRINCIPLES.md]] §3) |
| Connexion interrompue en cours de lecture | La piste en cours de lecture continue si déjà bufferisée ; la suivante échoue à précharger, erreur `NetworkUnavailable` typée ([[JELLYFIN_INTEGRATION.md]] §4) affichée sans casser la lecture en cours | ✅ |
| Connexion interrompue en cours de synchronisation | Synchronisation partielle : `sync_meta.last_sync` n'est mis à jour qu'après succès complet, donc une interruption ne marque pas une synchro partielle comme terminée — reprise propre au prochain déclenchement | ✅ — comportement déjà implicite dans la conception de [[DATA_LAYER.md]] §2.1, rendu explicite ici |
| Mode hors ligne complet, dès l'ouverture de l'application | Navigation dans le contenu déjà synchronisé/téléchargé fonctionne intégralement (bibliothèque, playlists, pistes téléchargées) ; recherche fonctionne sur l'index local déjà construit | ✅ pour le contenu déjà synchronisé · ⚠️ pour un tout premier lancement jamais connecté (aucune donnée locale à afficher — cas explicitement hors périmètre, l'application nécessite une première connexion) |

## 3. Multi-serveurs et multi-utilisateurs

| Scénario | Comportement attendu | Statut |
|---|---|---|
| Plusieurs serveurs Jellyfin connectés simultanément | Sessions isolées par serveur dans `LocalStore` ([[JELLYFIN_INTEGRATION.md]] §6), pas de mélange de catalogues sans action explicite | ✅ |
| Plusieurs utilisateurs sur le même appareil (comptes OS distincts) | Chaque profil OS a son propre `LocalStore` (fichier/IndexedDB scoping par profil système) — pas de fuite de données entre utilisateurs d'une même machine | ✅ — propriété héritée du système de fichiers natif, pas une mesure ajoutée par Melodia |
| Plusieurs utilisateurs sur le même compte Jellyfin, appareils différents | État de lecture/playlists synchronisés avec résolution de conflit horodatée ([[ARCHITECTURE_PRINCIPLES.md]] §3.3) | ⚠️ stratégie « dernier écrit gagne » documentée mais l'ADR dédié (annoncé dans [[ARCHITECTURE_PRINCIPLES.md]] §3.3) n'est pas encore rédigé — à faire avant l'implémentation Phase 2 |

## 4. Formats d'écran et d'interaction

| Scénario | Comportement attendu | Statut |
|---|---|---|
| Grand écran (Desktop, multi-fenêtre) | Layout adaptatif au-delà d'un simple redimensionnement (breakpoints Tailwind + design system, [[DESIGN_SYSTEM_ARCHITECTURE.md]] §4) | ✅ |
| Petit écran (Mobile portrait) | Layout mobile dédié, panneau de lecture en cours accessible en un geste (rappel [[TECH_STACK.md]] §2) | ✅ |
| Écran tactile (Mobile/Tablette) | Cibles tactiles dimensionnées selon les recommandations d'accessibilité (44×44px minimum), primitives Radix déjà conformes | ✅ — hérité du choix de primitives accessibles ([[TECH_STACK.md]] §1) |
| Écran 4K | Design system basé sur unités relatives (rem/em), pas de valeur en pixels fixes bloquant la mise à l'échelle ([[DESIGN_SYSTEM_ARCHITECTURE.md]] §1) | ✅ |
| Résolution intermédiaire (Tablette, orientation changeante) | Breakpoint tablette dédié déjà prévu ([[DESIGN_SYSTEM_ARCHITECTURE.md]] §4) | ✅ appareil de référence tablette ajouté à [[PERFORMANCE_BUDGET.md]] §1 (corrigé pendant l'auto-audit de cette phase) — vérification visuelle effective reste à faire une fois l'implémentation démarrée |

**Décision** : appareil de référence tablette ajouté à [[PERFORMANCE_BUDGET.md]] §1 pendant l'auto-audit de cette phase (corrigé, pas seulement signalé — voir historique des révisions de ce document).

---

## 5. Synthèse des zones à risque non entièrement validées

| Zone | Nature du gap | Action de suivi |
|---|---|---|
| Bibliothèque > 200 000 titres | Non mesuré (probable mais non prouvé) | Ticket de dette technique : fixture 300k en CI nightly |
| Synchronisation multi-appareils | Stratégie décidée, ADR formel manquant | À rédiger avant le début d'implémentation de la Phase 2 ([[ROADMAP.md]]) |
| Premier lancement sans connectivité | Hors périmètre assumé (nécessite une première connexion) | Documenté comme limite connue, pas un bug |
| ~~Appareil de référence tablette~~ | ~~Absent de la matrice de test actuelle~~ | **Résolu pendant cet auto-audit** — ajouté à [[PERFORMANCE_BUDGET.md]] §1 |

Cette synthèse est délibérément honnête plutôt qu'exhaustive-en-apparence : une matrice qui affiche uniquement des ✅ sur un projet qui n'a pas encore écrit une ligne de code applicatif serait un signal d'alarme, pas un gage de qualité.

---

## 6. Checklist de validation

- [ ] Chaque décision architecturale majeure de la Phase 0.5 est confrontée à au moins un scénario extrême pertinent.
- [ ] Aucune case n'affirme ✅ sans justification vérifiable ailleurs dans la documentation.
- [ ] Les zones ⚠️/❌ sont assorties d'une action de suivi concrète, pas d'un simple constat.
- [ ] La synthèse des gaps est reprise dans le registre de dette technique au démarrage de la Phase 1.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5, complément) | Staff Performance Engineer / Senior UX Engineer |
| 0.1.1 | 2026-08-03 | Gap tablette résolu pendant l'auto-audit (voir [[PERFORMANCE_BUDGET.md]] historique) | Staff Performance Engineer |

# TESTING_STRATEGY.md — Stratégie de tests (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 0.9.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Engineering Manager / Lead Frontend Engineer
> **Documents liés** : [[TECH_STACK.md]] §1, [[DEFINITION_OF_DONE.md]], [[CI_CD_GUIDE.md]]

Ce document précise la pyramide de tests complète et les seuils d'obligation par type de changement, en s'appuyant sur l'outillage déjà choisi en Phase 0 ([[TECH_STACK.md]] §1 : Vitest, React Testing Library, Playwright).

---

## 1. Pyramide de tests

```
        ▲  E2E (Playwright)               — parcours critiques complets, peu nombreux
       ╱ ╲ Intégration (Vitest + RTL)     — interaction entre plusieurs modules/composants
      ╱   ╲ Composants (RTL)              — comportement d'un composant isolé
     ╱     ╲ Unitaires (Vitest)           — logique pure (Domain, Data, utils) — la base, nombreux
    ╱_______╲
```

**Principe directeur** : le volume de tests décroît à mesure qu'on monte la pyramide — un test E2E coûte plus cher à écrire, exécuter et maintenir qu'un test unitaire ; on ne teste en E2E que ce qui ne peut pas être vérifié à un niveau inférieur avec une confiance équivalente.

## 2. Tests unitaires (Vitest)

**Obligatoires pour** : toute logique dans `@melodia/core` (mapping Jellyfin → entités, `MusicSource`, `LocalStore`, moteur de recherche), toute fonction `utils` ([[CODING_STANDARDS.md]] §4.5), toute logique de `playerStore` (file de lecture, modes de répétition — voir [[AUDIO_ENGINE.md]] §1).
**Cible de couverture** : ≥ 80 % sur `@melodia/core`, conforme à [[PROJECT_CHARTER.md]] §3.2.

## 3. Tests de composants (React Testing Library)

**Obligatoires pour** : tout composant du design system (`@melodia/ui`, voir [[DESIGN_SYSTEM_ARCHITECTURE.md]]) et tout composant de feature avec logique conditionnelle ([[DEFINITION_OF_DONE.md]]).
**Principe** : tester le comportement observable par l'utilisateur (rendu, interaction clavier/souris, annonces d'accessibilité), jamais les détails d'implémentation interne (pas de test qui inspecte le state React interne).
**Cible de couverture** : ≥ 60 % sur `@melodia/app` et `@melodia/ui`, conforme à [[PROJECT_CHARTER.md]] §3.2.

## 4. Tests d'intégration (Vitest + RTL)

**Obligatoires pour** : toute interaction entre une feature et TanStack Query/Zustand (ex. « ajouter une piste à la file déclenche bien la mise à jour optimiste et la persistance locale »), toute migration de schéma `LocalStore` ([[DATA_LAYER.md]] §2.2).

## 5. Tests E2E (Playwright)

**Obligatoires pour** : les parcours critiques identifiés dans [[PROJECT_CHARTER.md]] (connexion à un serveur, navigation de bibliothèque, lecture, recherche, gestion de playlist, changement de piste sans interruption).
**Couverture par cible** :
- **Web** : Playwright standard, exécuté en CI sur chaque PR touchant un parcours critique.
- **Desktop** : Playwright via `tauri-driver`, exécuté en CI à partir de la Phase 1 (voir [[PROJECT_CHARTER.md]] §5, risque déjà identifié).
- **Mobile** : automatisation E2E différée (gap documenté dans [[PROJECT_CHARTER.md]] §5 et [[TECH_STACK.md]] §1) — couverte par une checklist de tests manuels de non-régression avant chaque release ([[CHECKLISTS.md]]), jusqu'à maturation de l'outillage Tauri Mobile pour l'E2E automatisé.

## 6. Tests d'accessibilité

- **Automatisés** : `axe-core` intégré aux tests de composants (RTL) et à une passe E2E dédiée — bloquant en CI sur tout défaut classé « critique » ou « sérieux ».
- **Manuels** : test au clavier et lecteur d'écran sur tout nouveau parcours ([[DEFINITION_OF_DONE.md]], section Accessibilité), obligatoire avant chaque release mineure/majeure.

## 7. Tests visuels

**Décision retenue : Chromatic (ou équivalent de régression visuelle basé sur Storybook), sur les composants de `@melodia/ui` uniquement.**
**Pourquoi ce périmètre restreint** : tester visuellement chaque écran complet de l'application produirait un volume de faux positifs disproportionné (changements de contenu dynamique, pochettes variables) ; tester au niveau du composant isolé du design system capture l'essentiel de la valeur (régression de style involontaire) sans ce bruit — cohérent avec le principe de ne pas sur-outiller un besoin ([[ENGINEERING_GUIDE.md]] §1.1).

## 8. Tests de performance

Voir [[PERFORMANCE_GUIDE.md]] §2 et §4 : test de rendu sur fixture de 200 000 titres en job CI séparé, non bloquant par PR mais bloquant avant release ([[QUALITY_GATES.md]]).

## 9. Tests de contrat (compatibilité Jellyfin)

Suite de tests dédiée exécutant `JellyfinSource` contre plusieurs versions de serveur Jellyfin supportées (conteneurs Docker de versions différentes en CI), pour détecter au plus tôt une rupture de compatibilité — mitigation directe du risque identifié dans [[PROJECT_CHARTER.md]] §5 et [[JELLYFIN_INTEGRATION.md]] §7.

---

## 9bis. Tests spécifiques à la couche donnée (ajout Phase 13)

| Scénario | Type de test | Obligatoire pour |
|---|---|---|
| Migration de schéma `LocalStore` (§4, déjà mentionné) | Intégration (Vitest), fixture de base pré-migration → post-migration | Toute nouvelle version de schéma ([[DATABASE_SCHEMA.md]] §5) |
| Cycle de synchronisation (initial/incrémentale/reprise après interruption) | Intégration, MSW simulant les réponses Jellyfin ([[TECH_STACK.md]] §1) | Toute modification de [[SYNC_ENGINE_SPECIFICATION.md]] |
| Comportement hors ligne (perte réseau en cours d'opération) | Intégration, réseau simulé coupé via MSW | Toute modification de [[OFFLINE_SYSTEM.md]] |
| Corruption d'une entrée de cache/stockage | Unitaire, entrée délibérément malformée injectée | Toute logique de réparation ([[CACHE_SYSTEM.md]] §7, [[ERROR_HANDLING.md]] §1 `StorageError`) |
| Charge (bibliothèque de référence 200 000 titres) | Performance, job CI séparé | Déjà couvert par [[PERFORMANCE_GUIDE.md]] §2/§4, non redécidé ici — ce tableau y renvoie plutôt que de dupliquer |

**Principe** : ces scénarios s'ajoutent à la pyramide déjà actée (§1) au niveau qui leur correspond — aucun nouveau niveau de pyramide introduit spécifiquement pour la donnée, cohérent avec [[ENGINEERING_GUIDE.md]] §1.3 (non-duplication de mécanisme).

## 9ter. Tests spécifiques à l'état applicatif (ajout Architecture d'état)

| Scénario | Type de test | Obligatoire pour |
|---|---|---|
| Actions d'un store (mutation, sélecteur) | Unitaire (Vitest), store instancié isolément sans rendu React ([[STORE_SPECIFICATIONS.md]] §1, un store ne connaît jamais React) | Tout nouveau store ou toute nouvelle action |
| Sélecteur composé (plusieurs stores/query) | Unitaire, entrées mockées | Tout sélecteur de [[DERIVED_STATE.md]] |
| Émission/réception d'un événement | Intégration, vérifie que le consommateur réagit correctement à un événement émis ([[EVENT_SYSTEM.md]]) | Tout nouvel événement |
| Requête/mutation TanStack Query | Intégration, MSW simulant la réponse serveur ([[TANSTACK_QUERY_GUIDE.md]]) | Toute nouvelle query key |
| Optimistic Update (succès et rollback) | Intégration, simule explicitement le cas d'échec pour vérifier le rollback ([[TANSTACK_QUERY_GUIDE.md]] §5) | Toute mutation avec Optimistic Update |
| Performance de re-render | Composant (RTL) + React DevTools Profiler, vérifie qu'un changement d'un store ne re-render que les composants réellement abonnés ([[SELECTOR_GUIDE.md]] §2) | Tout composant de liste répétée (Track Row, Album Card) |

**Principe** : comme pour la couche donnée (§9bis), ces scénarios s'ajoutent à la pyramide déjà actée (§1) au niveau qui leur correspond — aucun nouveau niveau introduit spécifiquement pour l'état.

## 9quater. Tests spécifiques au moteur audio (ajout Moteur Audio)

| Scénario | Type de test | Obligatoire pour |
|---|---|---|
| Transitions de la machine à états | Unitaire, moteur instancié sans DOM réel (mock `HTMLAudioElement`) | Toute nouvelle transition de [[PLAYBACK_STATE_MACHINE.md]] |
| Lecture/Pause/Seek/Queue via [[COMMAND_API.md]] | Unitaire, vérifie précondition + effet pour chaque commande | Toute nouvelle commande |
| Résolution de source local/cache/streaming | Intégration, `TrackRepository.getPlaybackSource` mocké pour chaque `kind` | Toute modification de [[AUDIO_ENGINE.md]] §0bis.2 ou [[PLAYBACK_CONTROLLER.md]] |
| Offline pendant streaming, reconnexion | Intégration, réseau simulé coupé puis rétabli via MSW ([[PLAYBACK_STATE_MACHINE.md]] §5) | Tout changement à [[STREAMING_ENGINE.md]] |
| Buffer (vidage, reprise, plafond) | Intégration, débit réseau simulé variable | Tout changement à [[BUFFER_MANAGEMENT.md]] |
| Déconnexion/reconnexion de périphérique de sortie | Intégration, événement de périphérique simulé | Tout changement à [[PLAYBACK_DEVICES.md]] §7bis |
| Sessions longues (plusieurs heures, centaines de pistes enchaînées) | E2E, exécuté en job CI séparé (coût d'exécution élevé, non bloquant par PR) | Avant chaque release, cohérent avec le traitement déjà acté du test de charge à 200 000 titres (§8) |
| Stress (changements de piste rapides et répétés) | Intégration, vérifie l'absence de fuite mémoire ([[PLAYBACK_ENGINE.md]] §6) sur une séquence de centaines de commandes `PLAY_TRACK` consécutives | Toute modification du cycle de vie du moteur |

**Principe** : comme pour la couche donnée (§9bis) et l'état applicatif (§9ter), ces scénarios s'ajoutent à la pyramide déjà actée (§1) au niveau qui leur correspond.

## 9quinquies. Tests spécifiques au moteur de recherche (ajout Moteur de Recherche)

| Scénario | Type de test | Obligatoire pour |
|---|---|---|
| Construction/mise à jour incrémentale/reconstruction d'index | Intégration, fixture de bibliothèque connue | Toute modification de [[INDEX_ENGINE.md]] |
| Tolérance aux fautes (fuzzy, accents, synonymes, multi-mots, partielle) | Unitaire, table de requêtes malformées → résultat attendu | Toute modification de [[DATA_LAYER.md]] §3.4-3.5 |
| Combinaison de filtres (ET entre catégories, OU au sein d'une catégorie) | Unitaire, jeux de filtres combinés avec résultat attendu explicite | Toute modification de [[FILTER_ENGINE.md]] |
| Classement (niveau 1 dominant, score composite borné) | Unitaire, vérifie qu'aucun score composite n'inverse un écart de pertinence textuelle net | Toute modification de [[RANKING_ENGINE.md]] |
| Performance — budget de calcul moteur | Performance, mesuré sur la fixture de référence à 250 000 titres ([[PERFORMANCE_BUDGET.md]] §2, < 50 ms) | Toute modification du pipeline de requête, bloquant avant release ([[QUALITY_GATES.md]]) |
| Performance — échelle progressive (500/50 000/250 000 titres) | Performance, trois fixtures distinctes en job CI séparé | Toute modification de [[INDEX_ENGINE.md]] ou [[SEARCH_INDEX_SPECIFICATION.md]] |

**Principe** : comme pour les phases précédentes (§9bis-quater), ces scénarios s'ajoutent à la pyramide déjà actée (§1) au niveau qui leur correspond.

## 9sexies. Tests spécifiques à la plateforme offline (ajout Plateforme Offline)

> Étend §9bis (déjà acté : migration, cycle de synchronisation, hors ligne, corruption, charge à 200 000 titres) — cette section couvre les scénarios propres à la résilience de bout en bout, pas seulement à la couche donnée.

| Scénario | Type de test | Obligatoire pour |
|---|---|---|
| Mode avion (bascule manuelle + détection automatique) | Intégration, simulateur de connectivité ([[OFFLINE_SYSTEM.md]] §1bis) | Tout changement de [[OFFLINE_SYSTEM.md]] |
| Redémarrage après crash (validation au démarrage) | Intégration, arrêt brutal simulé du processus puis relance | Tout changement de [[RESILIENCE_GUIDE.md]] §3 |
| Suppression et reconstruction de bibliothèque | Intégration, via les outils de [[MAINTENANCE_SYSTEM.md]] | Tout changement de [[MAINTENANCE_SYSTEM.md]] ou [[CACHE_SYSTEM.md]] §8 |
| Conflits (favoris/playlists/résolution automatique et fusion) | Intégration, jeux de scénarios de la matrice [[CONFLICT_RESOLUTION.md]] §2 | Tout changement de [[CONFLICT_RESOLUTION.md]] |
| Bibliothèque de référence à 300 000 titres | Performance, job CI séparé, fixture étendue au-delà des 200 000 déjà actés ([[PERFORMANCE_BUDGET.md]] §8, marge de sécurité déjà justifiée) | Avant chaque release majeure |
| Sessions longue durée (plusieurs jours d'usage simulé, cycles de sync/téléchargement/lecture répétés) | E2E, job CI séparé non bloquant par PR | Avant chaque release, détecte les fuites mémoire/dégradations progressives non visibles en session courte |

## 9septies. Quand écrire chaque test — table de décision (ajout Engineering Handbook)

> §10 résume déjà l'obligation par type de changement. Cette table répond à une question antérieure : face à un nouveau comportement à écrire, quel type de test choisir en premier.

| Je veux vérifier... | Type de test | Jamais utilisé pour |
|---|---|---|
| Une règle de calcul pure (scoring, formatage, mapping) | Unitaire | Un comportement qui dépend du rendu réel |
| Le rendu et l'interaction d'un composant isolé | Composant (RTL) | La logique métier sous-jacente, déjà couverte en unitaire |
| L'interaction entre plusieurs modules (store + query, feature + Repository) | Intégration | Un calcul pur sans dépendance externe, trop coûteux pour la valeur ajoutée |
| Un parcours utilisateur critique de bout en bout | E2E | Une variante mineure d'un parcours déjà couvert — un E2E supplémentaire par variante ferait exploser le temps CI sans bénéfice proportionné |
| Une régression de style visuel involontaire | Visuel | Un changement de contenu dynamique (déjà écarté, §7) |
| Le respect d'un budget chiffré | Performance | Une estimation qualitative — toujours une mesure, jamais une impression |

**Principe** : si un comportement peut être vérifié à un niveau inférieur de la pyramide (§1) avec une confiance équivalente, il l'est — jamais un E2E pour ce qu'un test unitaire suffit à couvrir.

## 9octies. Mutation Testing (préparation, ajout Engineering Handbook)

**Objectif anticipé** : vérifier que la suite de tests détecte réellement une régression injectée (mutation du code source), pas seulement qu'elle passe au vert — un complément à la couverture de ligne (§2, qui mesure ce qui est exécuté, jamais ce qui est réellement vérifié). **Statut : non engagé** — aucun outil (Stryker ou équivalent) n'est intégré à ce jour, coût d'exécution significatif à évaluer contre le bénéfice réel une fois la base de tests substantielle (Phase 1 d'ingénierie et au-delà, pas avant). **Contrat attendu si engagé** : un job CI supplémentaire, non bloquant par PR (coût trop élevé, cohérent avec le traitement déjà acté des jobs coûteux, [[CI_CD_GUIDE.md]] §2), exécuté périodiquement sur `@melodia/core` en priorité (la couche la plus critique à couvrir réellement).

## 10. Quand chaque type de test est obligatoire (résumé)

| Type de changement | Unitaire | Composant | Intégration | E2E | Visuel | Contrat Jellyfin |
|---|---|---|---|---|---|---|
| Nouvelle logique Domain/Data | Obligatoire | — | Si interaction store/query | — | — | Si touche `JellyfinSource` |
| Nouveau composant design system | — | Obligatoire | — | — | Obligatoire | — |
| Nouveau parcours utilisateur critique | Selon logique sous-jacente | Obligatoire | Obligatoire | Obligatoire | — | — |
| Correction de bug | Test de régression obligatoire au niveau où le bug a été introduit | | | | | |

---

## 11. Checklist de validation

- [ ] Chaque type de test a un seuil d'obligation clair par type de changement (§10), pas une recommandation vague.
- [ ] Le périmètre restreint des tests visuels (`@melodia/ui` uniquement) est justifié explicitement (§7), pas laissé implicite.
- [ ] Le gap E2E Mobile reste documenté de façon cohérente entre ce document, [[PROJECT_CHARTER.md]] §5 et [[TECH_STACK.md]] §1.
- [ ] Les tests de contrat Jellyfin couvrent la plage de versions déclarée dans [[JELLYFIN_INTEGRATION.md]] §7.

## 12. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | Engineering Manager / Lead Frontend Engineer |
| 0.2.0 | 2026-08-03 | Ajout de la checklist de validation et des renvois vers les documents du complément Phase 0.5 | Engineering Manager / Lead Frontend Engineer |
| 0.3.0 | 2026-08-04 | Phase 13 : ajout §9bis (scénarios migration/synchronisation/hors ligne/corruption/charge propres à la couche donnée) — au lieu de créer DATA_TESTING_GUIDE.md en doublon | QA Architect |
| 0.4.0 | 2026-08-04 | Architecture d'état : ajout §9ter (scénarios stores/sélecteurs/événements/TanStack Query/optimistic updates/performance de re-render) — au lieu de créer STATE_TESTING_GUIDE.md en doublon | QA Architect |
| 0.5.0 | 2026-08-04 | Moteur Audio : ajout §9quater (scénarios machine à états/commandes/résolution de source/offline/buffer/périphériques/sessions longues/stress) — au lieu de créer AUDIO_TESTING_GUIDE.md en doublon | QA Engineer |
| 0.6.0 | 2026-08-04 | Moteur de Recherche : ajout §9quinquies (scénarios index/tolérance aux fautes/filtres/classement/performance à trois échelles) — au lieu de créer SEARCH_TESTING_GUIDE.md en doublon | QA Architect |
| 0.7.0 | 2026-08-04 | Plateforme Offline : ajout §9sexies (mode avion/redémarrage/suppression-reconstruction/conflits/300 000 titres/sessions longue durée) — au lieu de créer OFFLINE_TESTING_GUIDE.md en doublon | QA Architect |
| 0.8.0 | 2026-08-04 | Engineering Handbook : ajout §9septies (table de décision « quand écrire chaque test ») et §9octies (Mutation Testing, préparation non engagée) — au lieu de créer TESTING_STANDARDS.md en doublon | Staff QA Engineer |
| 0.9.0 | 2026-08-05 | TASK-002 : correction de la citation sur la bibliothèque de référence 300 000 titres vers PERFORMANCE_BUDGET.md (section 0, inexistante → section 8) ; correction du numéro de version en en-tête, resté désynchronisé (« 0.1.0 ») du tableau ci-dessus | Staff Technical Lead |

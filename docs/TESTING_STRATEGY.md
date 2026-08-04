# TESTING_STRATEGY.md — Stratégie de tests (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
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

# SYSTEM_CHECKLIST.md — Checklist de mise en production des fonctionnalités système (Phase 11)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal Platform Architect / Security Architect
> **Documents liés** : [[COMPONENT_CHECKLIST.md]] §1, [[NAVIGATION_CHECKLIST.md]] §7, [[DEFINITION_OF_DONE.md]]

> **Cadrage** : [[COMPONENT_CHECKLIST.md]] §1 valide un composant isolé, [[NAVIGATION_CHECKLIST.md]] valide un parcours de navigation complet — ce document valide une préoccupation encore différente : une fonctionnalité **système** (synchronisation, cache, téléchargement, hors ligne, logs) qui opère souvent en arrière-plan, sans écran dédié constamment visible, et dont l'échec silencieux serait particulièrement coûteux pour la confiance de l'utilisateur.

---

## 1. Critères de validation d'une fonctionnalité système

- [ ] **Aucune perte de données silencieuse** : toute opération qui pourrait supprimer ou écraser une donnée utilisateur (favoris, playlist, historique) le signale explicitement avant ou après coup — jamais un échec ou une résolution de conflit qui disparaît sans trace.
- [ ] **Réversibilité vérifiée** : si l'opération est présentée comme réversible (pause d'un téléchargement, désactivation d'un flag), la réversibilité est testée, pas seulement supposée.
- [ ] **Dégradation silencieuse acceptable, échec silencieux interdit** : une fonctionnalité qui se dégrade automatiquement (repli sur un comportement plus simple) peut le faire sans notification si le résultat reste correct — mais un échec réel (perte de fonctionnalité, corruption) est toujours signalé.
- [ ] **Aucune interruption de la lecture en cours** — vérifié explicitement pour toute fonctionnalité système qui s'exécute en arrière-plan pendant une écoute active ([[PRODUCT_RULES.md]] §2).
- [ ] **Journalisation cohérente** : toute erreur ou opération notable génère une entrée dans [[LOGGING_SYSTEM.md]] de la catégorie appropriée — vérifié qu'aucun système de cette phase ne journalise en dehors de ce mécanisme commun.
- [ ] **Aucune donnée transmise sans consentement explicite** — vérifié contre [[PRODUCT_RULES.md]] §10 pour toute fonctionnalité qui pourrait sembler communiquer avec un service externe (mise à jour, export).
- [ ] **Testé en conditions dégradées** : réseau lent, connexion coupée en cours d'opération, stockage presque plein — pas seulement le chemin nominal ([[FOUNDATION_TESTING_GUIDE.md]] §5ter).

## 2. Application par système

| Système | Point d'attention prioritaire |
|---|---|
| [[SYNC_ENGINE_SPECIFICATION.md]] | Synchronisation interrompue en cours de cycle — reprise cohérente, jamais un état à moitié synchronisé présenté comme complet |
| [[CACHE_SYSTEM.md]] | Purge par priorité (§2) ne touche jamais un téléchargement explicite |
| [[DOWNLOAD_SYSTEM.md]] | Reprise après redémarrage (§5bis) testée avec interruption réelle du processus, pas seulement simulée en mémoire |
| [[OFFLINE_SYSTEM.md]] | Résolution de conflit (§6) ne perd jamais silencieusement une modification locale |
| [[LOGGING_SYSTEM.md]] | Rotation automatique (§2) empêche une croissance non bornée, testé sur une durée simulée longue |
| [[FEATURE_FLAGS.md]] | Retrait d'un flag (§6) ne supprime jamais silencieusement du contenu créé pendant son activation |

## 3. Ce qui bloque une mise en production

Tout critère non coché de la §1 pour un système classé à risque élevé (Synchronisation, Cache, Hors ligne — ceux qui manipulent des données utilisateur persistantes) bloque la mise en production — cohérent avec la sévérité déjà appliquée aux gates de [[QUALITY_GATES.md]]. Les systèmes à risque plus faible (Diagnostics, Feature Flags) suivent la même checklist mais sans bloquer automatiquement — revue humaine au cas par cas.

---

## 4. Checklist de validation (de ce document lui-même)

- [ ] Chaque critère de §1 est vérifiable objectivement, pas une intention vague.
- [ ] La distinction entre ce document et [[COMPONENT_CHECKLIST.md]]/[[NAVIGATION_CHECKLIST.md]] reste claire (§ cadrage).
- [ ] Les systèmes à risque élevé (§3) sont identifiés de façon cohérente avec la nature réelle des données qu'ils manipulent.

---

## 5. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 11) | Principal Platform Architect / Security Architect |

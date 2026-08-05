# TECHNICAL_RISKS.md — Risques d'implémentation et de séquencement (Implementation Plan)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-05
> **Propriétaire** : Principal Software Architect
> **Documents liés** : [[RISK_REGISTER_TECHNICAL.md]], [[DEPENDENCY_GRAPH.md]] §3

[[RISK_REGISTER_TECHNICAL.md]] recense déjà les risques **par décision d'architecture** (8 catégories, format risque/probabilité/impact/prévention/correction). Ce document recense les risques **par position dans le backlog d'implémentation** — granularité différente et complémentaire : un risque de [[RISK_REGISTER_TECHNICAL.md]] explique ce qui peut casser dans le code, un risque ici explique ce qui peut faire dérailler le *séquencement* du développement. Jamais de duplication du contenu déjà présent là-bas.

---

## 1. Tâches critiques (sur le chemin critique, [[DEPENDENCY_GRAPH.md]] §3)

| Task/Epic | Pourquoi critique | Risque de séquencement |
|---|---|---|
| TASK-006 (workspace.yaml) | Bloque littéralement toutes les autres Tasks | Une erreur de configuration ici retarde l'intégralité du backlog, pas seulement une Feature |
| EPIC-005 (Synchronisation) | Dernier maillon de la chaîne séquentielle stricte avant la parallélisation (EPIC-006/007/008) | Un retard ici retarde trois Epics simultanément, jamais un seul |
| EPIC-007 (Lecteur Audio) | Seul des trois Epics parallèles sur le chemin critique (§3 de [[DEPENDENCY_GRAPH.md]]) | Sous-estimer sa complexité réelle (déjà signalée dans [[RISK_REGISTER_TECHNICAL.md]] §5, gapless/autoplay) retarderait EPIC-009 en cascade |

## 2. Composants sensibles (déjà signalés ailleurs, rappel de leur poids sur le planning)

| Composant | Risque déjà documenté | Impact sur le backlog |
|---|---|---|
| Double implémentation `LocalStore` | [[RISK_REGISTER_TECHNICAL.md]] §4 (divergence SQLite/IndexedDB) | Toute Task de EPIC-005 doit être vérifiée sur les deux implémentations avant d'être considérée terminée — double le coût réel de test de cette Epic par rapport à son estimation naïve |
| Moteur audio en couches | [[RISK_REGISTER_TECHNICAL.md]] §5 (autoplay, dérive gapless) | EPIC-007 est le candidat le plus probable à un dépassement d'estimation — voir §3 |
| Écosystème Tauri Mobile | [[RISK_REGISTER_TECHNICAL.md]] §2 | Hors chemin critique du MVP (Mobile reporté à [[ROADMAP.md]] Phase 2, [[MVP_ROADMAP.md]] §3) — risque non actif avant M14 |

## 3. Dépendances fortes — fragilité du chemin critique

Le chemin critique ([[DEPENDENCY_GRAPH.md]] §3) traverse 13 des 15 Epics séquentiellement — une fragilité structurelle assumée : contrairement à un projet où plusieurs chemins concurrents existeraient, un retard sur n'importe lequel de ces 13 Epics retarde directement la date de sortie globale. **Mitigation** : EPIC-006 et EPIC-008 (hors chemin critique) absorbent une marge — si une ressource devient disponible plus tôt que prévu sur le chemin critique, elle ne doit jamais être réaffectée à EPIC-006/008 au détriment du chemin critique, l'inverse est correct.

## 4. Risques spécifiques à la méthode de ce backlog

- **Rolling wave (M4-M14) sous-estimé à la décomposition** : une Feature décomposée tardivement (au début de son propre jalon, [[TASK_BREAKDOWN.md]] §1) peut révéler une complexité non anticipée à l'estimation Epic-level — mitigation : chaque jalon (M4+) commence par une session de décomposition dédiée avant tout développement, jamais une décomposition en parallèle du développement déjà commencé.
- **Dérive du gabarit de Task** ([[TASK_BREAKDOWN.md]] §3) : un gabarit appliqué de façon incomplète progressivement affaiblirait la qualité du backlog sans qu'aucune Task individuelle ne le signale — mitigation : [[IMPLEMENTATION_CHECKLISTS.md]] §1 section Review inclut la vérification du gabarit lui-même, pas seulement du code produit.

---

## 5. Ce que ce document ne fait pas

- Ne redéfinit aucun risque déjà documenté par décision d'architecture (voir [[RISK_REGISTER_TECHNICAL.md]]).
- Ne redéfinit pas le chemin critique lui-même (voir [[DEPENDENCY_GRAPH.md]] §3).

## 6. Checklist de validation

- [ ] Chaque risque de ce document porte sur le *séquencement*, jamais sur le contenu technique déjà couvert par [[RISK_REGISTER_TECHNICAL.md]].
- [ ] Toute nouvelle Task ajoutée au chemin critique (§1) reçoit une entrée ici si elle introduit un risque de séquencement réel.

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-05 | Création initiale du document (Implementation Plan) | Principal Software Architect |

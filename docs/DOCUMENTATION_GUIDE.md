# DOCUMENTATION_GUIDE.md — Architecture documentaire

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Engineering Manager
> **Documents liés** : tous les documents fondateurs listés ci-dessous

Ce document est la carte de la documentation elle-même : quels documents existent, à quoi chacun sert, qui les possède, quand ils sont mis à jour, et comment la cohérence entre eux est maintenue.

---

## 1. Carte documentaire

| Document | Rôle | Propriétaire |
|---|---|---|
| [[PROJECT_CHARTER.md]] | Référence suprême : vision, objectifs mesurables, périmètre, risques | CTO / Lead Software Architect |
| [[ENGINEERING_GUIDE.md]] | Principes d'ingénierie, dette technique, dépendances | CTO / Lead Software Architect |
| [[ARCHITECTURE_PRINCIPLES.md]] | Architecture système : couches, abstractions, frontières | Lead Software Architect |
| [[TECH_STACK.md]] | Stack technique officielle, justifications, compatibilité | CTO / Lead Software Architect |
| [[CODING_STANDARDS.md]] | Nommage, organisation de fichiers, structure de code | Principal Frontend Engineer |
| [[DEVELOPMENT_GUIDELINES.md]] | Cycle de vie d'une fonctionnalité | Engineering Manager |
| [[GIT_WORKFLOW.md]] | Conventions branches/commits/PR/releases/changelog | Engineering Manager |
| [[PERFORMANCE_BUDGET.md]] | Budgets de performance chiffrés | Principal Frontend Engineer |
| [[SECURITY_GUIDELINES.md]] | Principes de sécurité | CTO / Lead Software Architect |
| [[DEFINITION_OF_DONE.md]] | Checklist qualité minimale par fonctionnalité | Engineering Manager |
| [[ADR_TEMPLATE.md]] | Processus et gabarit de décision d'architecture | Lead Software Architect |
| [[DOCUMENTATION_GUIDE.md]] | Ce document — carte et gouvernance documentaire | Engineering Manager |
| [[ROADMAP.md]] | Phases concrètes et vision long terme | CTO / Lead Product Designer |

Emplacement physique : tous les documents fondateurs vivent dans `docs/` à la racine du dépôt. Les ADR individuels vivent dans `docs/adr/`.

---

## 2. Quand chaque document est mis à jour

- **À chaque décision structurante** : le document fondateur concerné est mis à jour dans la même PR que l'ADR correspondant (voir [[ADR_TEMPLATE.md]] §2).
- **À chaque fin de phase** (voir [[ROADMAP.md]]) : relecture complète de l'ensemble des documents, mise à jour du [[ROADMAP.md]] et, si nécessaire, des indicateurs de [[PROJECT_CHARTER.md]] §3.
- **[[GIT_WORKFLOW.md]] `CHANGELOG.md`** : généré automatiquement, jamais édité manuellement (voir [[GIT_WORKFLOW.md]] §5) — exclu de cette carte car ce n'est pas un document de référence mais un artefact généré.

## 3. Qui est responsable

Le « propriétaire » d'un document (tableau §1) est responsable de sa cohérence interne et de sa mise à jour, mais **toute personne** proposant une PR qui touche à un sujet couvert par un document a la responsabilité de vérifier la cohérence avec ce document avant de soumettre (voir [[DEVELOPMENT_GUIDELINES.md]] étape 2). Le propriétaire tranche en cas de désaccord d'interprétation.

## 4. Comment éviter les incohérences

1. **Une seule source de vérité par sujet.** Un sujet (ex. seuils de performance) n'est détaillé en profondeur que dans un seul document ([[PERFORMANCE_BUDGET.md]]) ; les autres documents y renvoient par lien plutôt que de dupliquer les chiffres.
2. **Liens explicites plutôt que répétition.** Toute mention d'un sujet couvert ailleurs utilise un lien `[[Document.md]]` plutôt que de reformuler le contenu — une reformulation dérive silencieusement de l'original avec le temps.
3. **Relecture obligatoire avant toute nouvelle phase** (voir [[PROJECT_CHARTER.md]] §7, règle absolue) — rappelée ici car cette règle s'applique concrètement via ce document.
4. **Historique des révisions en pied de chaque document.** Tout changement de fond est tracé (version, date, changement, auteur), permettant de retracer quand une incohérence a été introduite.
5. **Un ADR par décision qui modifierait un document existant** — jamais de modification silencieuse d'un standard déjà établi sans laisser de trace du changement et de sa justification (voir [[ADR_TEMPLATE.md]]).

## 5. Procédure en cas de contradiction détectée

1. Signaler explicitement la contradiction (quels documents, quelles sections).
2. Proposer les solutions possibles (lequel des deux documents doit céder, ou une troisième formulation qui réconcilie les deux).
3. Recommander la meilleure option avec justification.
4. Si la contradiction touche une fondation du projet (Charter, Architecture Principles), attendre la validation explicite avant de trancher — ne jamais résoudre silencieusement une contradiction fondatrice au fil d'une PR non dédiée à cette question.

---

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0) | Engineering Manager |

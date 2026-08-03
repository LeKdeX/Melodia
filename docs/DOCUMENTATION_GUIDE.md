# DOCUMENTATION_GUIDE.md — Architecture documentaire

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Engineering Manager
> **Documents liés** : tous les documents fondateurs listés ci-dessous

Ce document est la carte de la documentation elle-même : quels documents existent, à quoi chacun sert, qui les possède, quand ils sont mis à jour, et comment la cohérence entre eux est maintenue.

---

## 1. Carte documentaire

### Phase 0 — fondations produit/ingénierie

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
| [[ADR_TEMPLATE.md]] | Processus et gabarit de décision d'architecture (couvre aussi le besoin « ADR_GUIDE ») | Lead Software Architect |
| [[DOCUMENTATION_GUIDE.md]] | Ce document — carte et gouvernance documentaire | Engineering Manager |
| [[ROADMAP.md]] | Phases concrètes et vision long terme | CTO / Lead Product Designer |

### Phase 0.5 — blueprint technique et décisions d'implémentation

Ces documents ne redécident rien de la Phase 0 : ils en sont l'élaboration concrète et implémentable (voir chaque document pour ses renvois précis).

| Document | Rôle | Propriétaire |
|---|---|---|
| [[TECHNICAL_BLUEPRINT.md]] | Synthèse capstone reliant Phase 0 et Phase 0.5 en un blueprint unique | CTO |
| [[STACK_DECISIONS.md]] | Confirmation des choix Phase 0 + décisions nouvelles (recherche, monorepo) | CTO / Principal Software Architect |
| [[ARCHITECTURE.md]] | Arborescence monorepo concrète, frontières de packages | Principal Software Architect |
| [[FRONTEND_ARCHITECTURE.md]] | Architecture React concrète, routing/rendu SPA | Lead Frontend Engineer |
| [[DATA_LAYER.md]] | Règles de state, cache local, moteur de recherche | Principal Software Architect |
| [[AUDIO_ENGINE.md]] | Queue, gapless, crossfade, ReplayGain, EQ, visualiseur | Lead Frontend Engineer |
| [[JELLYFIN_INTEGRATION.md]] | Implémentation concrète de `JellyfinSource` | Principal Software Architect |
| [[DESIGN_SYSTEM_ARCHITECTURE.md]] | Tokens, architecture de composants, theming | Lead Product Designer / Lead Frontend Engineer |
| [[PERFORMANCE_GUIDE.md]] | Méthodologie et outillage pour tenir les budgets | Lead Frontend Engineer |
| [[SECURITY_GUIDE.md]] | CSP concrète, scan de dépendances, secrets CI | CTO |
| [[TESTING_STRATEGY.md]] | Pyramide de tests, obligations par type de changement | Engineering Manager / Lead Frontend Engineer |
| [[CI_CD_GUIDE.md]] | Pipeline GitHub Actions concret | Lead DevOps Engineer |
| [[QUALITY_GATES.md]] | Gates automatisés en CI (sous-ensemble de la Definition of Done) | Engineering Manager / Lead DevOps Engineer |
| [[CHECKLISTS.md]] | Checklists opérationnelles (onboarding, release, ADR, sécurité, fin de phase) | Engineering Manager |
| [[ENGINEERING_MANIFESTO.md]] | DDD ciblé, liste d'anti-patterns, mécanismes d'enforcement | CTO / Principal Software Architect |

### Phase 0.5 (complément) — analyse comparative, risques, scénarios extrêmes, évolutivité

Ces quatre documents ne redécident rien non plus : ils fournissent l'analyse transverse (comparaisons, risques par décision, validation contre des scénarios extrêmes, évolutivité long terme) qui sous-tend l'ensemble des décisions déjà actées, sans dupliquer leur contenu dans chacun des 15 documents ci-dessus — chacun y renvoie via sa propre checklist de fin de chapitre plutôt que de répéter l'analyse.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[TECHNOLOGY_COMPARISONS.md]] | Comparaisons technologiques complètes (7 paires) sur 7 axes, avec recommandation argumentée | Staff Frontend Engineer / Principal Software Architect |
| [[RISK_REGISTER_TECHNICAL.md]] | Registre de risques par décision technique (risque/probabilité/impact/prévention/correction) | Security Engineer / Staff Performance Engineer / Principal Software Architect |
| [[EXTREME_SCENARIOS.md]] | Validation de chaque décision majeure contre des scénarios extrêmes (échelle, connectivité, multi-serveurs, formats d'écran) | Staff Performance Engineer / Senior UX Engineer |
| [[EVOLVABILITY.md]] | Évolutivité long terme (TV, auto, montres, API publique, SDK, plugins, marketplace, sync cloud), y compris la tension identifiée avec la charte | Principal Software Architect / Product Engineer |

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
| 0.2.0 | 2026-08-03 | Ajout de la carte des 15 documents de Phase 0.5 ; clarification qu'ADR_TEMPLATE.md couvre le besoin « ADR_GUIDE » sans fichier dupliqué | Engineering Manager |
| 0.3.0 | 2026-08-03 | Ajout de la carte des 4 documents du complément Phase 0.5 (comparaisons, risques techniques, scénarios extrêmes, évolutivité) | Engineering Manager |

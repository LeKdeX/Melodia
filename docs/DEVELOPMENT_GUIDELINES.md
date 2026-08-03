# DEVELOPMENT_GUIDELINES.md — Cycle de vie d'une fonctionnalité

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Engineering Manager
> **Documents liés** : [[GIT_WORKFLOW.md]], [[DEFINITION_OF_DONE.md]], [[ADR_TEMPLATE.md]], [[ARCHITECTURE_PRINCIPLES.md]]

Ce document décrit le **workflow officiel** : comment une idée devient une fonctionnalité livrée, étape par étape. Les conventions syntaxiques sont dans [[CODING_STANDARDS.md]] ; les conventions Git dans [[GIT_WORKFLOW.md]] ; les critères de qualité finale dans [[DEFINITION_OF_DONE.md]].

---

## 1. Cycle de vie complet

```
Idée / besoin
     │
     ▼
1. Cadrage produit ──────► rejet ou report documenté
     │
     ▼
2. Conception technique ─► ADR si décision structurante
     │
     ▼
3. Implémentation
     │
     ▼
4. Revue de code ────────► retour à 3 si non conforme
     │
     ▼
5. Tests & validation
     │
     ▼
6. Documentation
     │
     ▼
7. Merge
     │
     ▼
8. Release
```

### Étape 1 — Cadrage produit
Toute nouvelle fonctionnalité est confrontée à [[PROJECT_CHARTER.md]] §3 (objectifs) et §4 (hors périmètre) avant d'être acceptée dans le backlog. Une fonctionnalité qui contredit §4 est rejetée ou nécessite une révision de charte explicite (voir [[PROJECT_CHARTER.md]] §7).

**Livrable de sortie** : un ticket avec objectif produit clair, critères d'acceptation, et rattachement à un des objectifs de la charte.

### Étape 2 — Conception technique
Avant d'écrire du code, l'ingénieur identifie si la fonctionnalité implique une décision structurante (nouvelle bibliothèque, nouvelle interface entre couches, changement d'architecture). Si oui : un ADR est rédigé et validé (voir [[ADR_TEMPLATE.md]]) avant de commencer l'implémentation. Si la fonctionnalité s'inscrit entièrement dans l'architecture existante ([[ARCHITECTURE_PRINCIPLES.md]]), cette étape est un simple découpage technique en tâches, sans ADR.

**Règle de cohérence** : cette étape inclut obligatoirement la relecture des documents fondateurs concernés. Toute contradiction détectée est signalée avant de poursuivre (voir [[PROJECT_CHARTER.md]] §7, règle absolue).

### Étape 3 — Implémentation
Sur une branche dédiée (voir [[GIT_WORKFLOW.md]] §1), en respectant [[CODING_STANDARDS.md]] et les frontières de [[ARCHITECTURE_PRINCIPLES.md]] §7. Commits atomiques suivant la convention (voir [[GIT_WORKFLOW.md]] §2).

### Étape 4 — Revue de code
Ouverture d'une Pull Request (voir [[GIT_WORKFLOW.md]] §3). La revue vérifie :
- conformité aux principes d'ingénierie ([[ENGINEERING_GUIDE.md]] §1) ;
- respect des frontières d'architecture ;
- absence de duplication non justifiée ;
- lisibilité et nommage.
Au moins un aller-retour de revue est la norme attendue, pas l'exception — une PR approuvée sans commentaire sur un changement non trivial doit interroger sur la profondeur de la revue.

### Étape 5 — Tests et validation
Conforme à [[DEFINITION_OF_DONE.md]]. Inclut, selon la nature du changement : tests unitaires, tests de composants, tests E2E, vérification manuelle sur au moins une cible native (Desktop ou Mobile) si le changement touche la couche `platform/` ou l'audio.

### Étape 6 — Documentation
- Mise à jour du TSDoc pour toute surface publique modifiée.
- Mise à jour d'un document fondateur si la fonctionnalité modifie un standard existant (rare, doit avoir été identifié dès l'étape 2).
- Entrée de changelog générée automatiquement à la release (voir [[GIT_WORKFLOW.md]] §5) — aucune action manuelle attendue ici au-delà d'un message de commit correctement formé.

### Étape 7 — Merge
Squash and merge vers `main` une fois la CI verte et la revue approuvée (voir [[GIT_WORKFLOW.md]] §3.1).

### Étape 8 — Release
Selon le rythme de release défini dans [[ROADMAP.md]]. Une fonctionnalité mergée sur `main` n'est pas nécessairement immédiatement publiée si un feature flag de sortie progressive est utilisé (voir §2).

---

## 2. Sortie progressive (feature flags)

Un feature flag est utilisé uniquement pour découpler le merge d'une fonctionnalité de sa disponibilité utilisateur lorsque l'implémentation s'étale sur plusieurs PR. Ce n'est pas un mécanisme de compatibilité ascendante permanent (voir [[ENGINEERING_GUIDE.md]], principe d'éviter les artifices de rétrocompatibilité inutiles) : un flag est retiré dans les deux releases suivant l'activation complète de la fonctionnalité.

---

## 3. Rôle des revues de design (UX/UI)

Toute fonctionnalité avec surface d'interface nouvelle passe par une revue de design **avant** l'étape 3 (implémentation) : maquette ou prototype validé contre le design system existant. Une fonctionnalité d'interface implémentée sans passage par cette revue est refusée en revue de code (référence croisée avec [[DEFINITION_OF_DONE.md]], critère de conformité au Design System).

---

## 4. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0) | Engineering Manager |

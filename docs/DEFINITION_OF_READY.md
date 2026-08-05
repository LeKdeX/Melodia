# DEFINITION_OF_READY.md — Définition de « prêt à développer » (Engineering Handbook)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal Engineering Manager
> **Documents liés** : [[DEVELOPMENT_GUIDELINES.md]] §1, [[DEFINITION_OF_DONE.md]], [[ADR_TEMPLATE.md]]

[[DEVELOPMENT_GUIDELINES.md]] §1 (« Étape 1 — Cadrage produit ») pose déjà le principe qu'une fonctionnalité doit être confrontée à la charte avant d'entrer en développement. Ce document est la checklist formelle de cette porte d'entrée — le miroir de [[DEFINITION_OF_DONE.md]] à l'autre extrémité du cycle de vie ([[DEVELOPMENT_GUIDELINES.md]] §1, workflow complet). Une fonctionnalité qui ne satisfait pas cette checklist ne commence jamais son implémentation, quelle que soit la pression de calendrier.

---

## Checklist obligatoire

### Produit
- [ ] Objectif produit clair, rattaché à un objectif de [[PROJECT_CHARTER.md]] §3 — jamais une fonctionnalité sans lien identifiable avec la vision.
- [ ] Vérifié comme non contraire à [[PROJECT_CHARTER.md]] §4 (ce que Melodia n'est pas).
- [ ] Critères d'acceptation écrits et compréhensibles sans connaissance implicite du rédacteur.

### Conception
- [ ] Décision structurante identifiée si applicable — un ADR est rédigé et validé **avant** le début de l'implémentation, jamais pendant ou après ([[ADR_TEMPLATE.md]], [[DEVELOPMENT_GUIDELINES.md]] §1 Étape 2).
- [ ] Documents fondateurs concernés relus — toute contradiction détectée est signalée explicitement avant de continuer ([[PROJECT_CHARTER.md]] §7, règle absolue).
- [ ] Revue de design validée si la fonctionnalité introduit une surface d'interface nouvelle ([[DEVELOPMENT_GUIDELINES.md]] §3) — jamais une implémentation qui commence avant cette validation.

### Portée
- [ ] La fonctionnalité est découpée en unités de travail vérifiables individuellement — jamais un ticket unique trop large pour être revu en une seule PR raisonnable.
- [ ] Les dépendances externes (nouvelle bibliothèque, service tiers) sont identifiées et évaluées contre les critères déjà actés ([[ENGINEERING_GUIDE.md]] §2.1) avant le début de l'implémentation, jamais découvertes en cours de route.

### Testabilité
- [ ] Les scénarios de test principaux sont identifiables à l'avance (quel type de test, [[TESTING_STRATEGY.md]] §10) — une fonctionnalité dont on ne sait pas encore comment elle serait testée n'est pas prête.

---

## Ce que ce document ne fait pas

- Ne redéfinit pas le workflow complet (voir [[DEVELOPMENT_GUIDELINES.md]] §1).
- Ne redéfinit pas les critères de fin de fonctionnalité (voir [[DEFINITION_OF_DONE.md]]).
- Ne redéfinit pas le processus de rédaction d'un ADR (voir [[ADR_TEMPLATE.md]]).

## Checklist de validation (de ce document)

- [ ] Chaque critère reste vérifiable factuellement avant le premier commit d'implémentation, jamais une intention vague.
- [ ] Aucun chevauchement de contenu avec [[DEFINITION_OF_DONE.md]] — les deux documents couvrent des extrémités différentes du cycle de vie.

## Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Engineering Handbook) | Principal Engineering Manager |

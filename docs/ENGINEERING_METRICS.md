# ENGINEERING_METRICS.md — Indicateurs d'ingénierie (Engineering Handbook)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal Engineering Manager
> **Documents liés** : [[QUALITY_GATES.md]], [[CODING_STANDARDS.md]] §6, [[ENGINEERING_GUIDE.md]] §3

Chaque métrique ci-dessous est déjà définie et mesurée quelque part dans le corpus (souvent comme gate CI, [[QUALITY_GATES.md]]) — ce document est le premier à les rassembler en un tableau de bord d'ingénierie unique, distinct des tableaux de bord produit ([[DIAGNOSTICS_SYSTEM.md]], runtime) et des métriques de succès produit ([[SUCCESS_METRICS.md]]). Aucune métrique n'est redéfinie ici, uniquement recomposée.

---

## 1. Tableau de bord

| Métrique | Cible | Source de vérité | Fréquence de mesure |
|---|---|---|---|
| Couverture de test Domain/Data | ≥ 80 % | [[PROJECT_CHARTER.md]] §3.2, [[QUALITY_GATES.md]] §1 | Chaque PR |
| Couverture de test UI | ≥ 60 % | [[PROJECT_CHARTER.md]] §3.2, [[QUALITY_GATES.md]] §1 | Chaque PR |
| Complexité cyclomatique par fonction | Seuil d'alerte 10 | [[CODING_STANDARDS.md]] §6 | Chaque PR (lint) |
| Longueur de fichier | Seuil d'alerte 250 lignes | [[CODING_STANDARDS.md]] §6 | Chaque PR (lint) |
| Dette technique ouverte | Revue et priorisée à chaque fin de phase | [[ENGINEERING_GUIDE.md]] §3, [[CHECKLISTS.md]] §5 | Fin de phase |
| Temps de build CI (PR) | Non chiffré à ce jour — dépend du cache Turborepo ([[CI_CD_GUIDE.md]] §5) | [[CI_CD_GUIDE.md]] | Continu, surveillé qualitativement |
| Poids de bundle (JS/CSS) | < 400 Ko JS / < 100 Ko CSS gzip | [[PERFORMANCE_BUDGET.md]] §4, [[QUALITY_GATES.md]] §1 | Chaque PR |
| Performance runtime (FPS, démarrage) | Voir [[PERFORMANCE_BUDGET.md]] §1, §3 | [[PERFORMANCE_BUDGET.md]] | Nightly + pré-release ([[QUALITY_GATES.md]] §2) |

## 2. Ce que ce tableau de bord n'inclut jamais

- **Aucune métrique de vélocité individuelle** (nombre de PR/commits par contributeur) — mesurer la vitesse individuelle plutôt que la qualité collective contredirait la culture de revue déjà actée ([[CODE_REVIEW_GUIDE.md]] §1) et créerait une incitation perverse à la taille de PR plutôt qu'à sa clarté.
- **Aucune métrique produit** (rétention, usage) — voir [[SUCCESS_METRICS.md]], registre volontairement distinct de celui-ci (technique vs produit, jamais mélangés, cohérent avec la séparation déjà actée entre Statistiques techniques et Statistiques d'écoute, [[DIAGNOSTICS_SYSTEM.md]] §6).

## 3. Dette technique — comment elle est suivie

Un ticket de dette technique est créé à chaque dérogation de gate ([[QUALITY_GATES.md]] §3) ou dépassement de seuil indicatif justifié ([[CODING_STANDARDS.md]] §6) — jamais un `TODO` non tracé ([[DEFINITION_OF_DONE.md]], section Code, déjà acté). Revue systématique à chaque fin de phase ([[CHECKLISTS.md]] §5), pas seulement quand elle devient bloquante.

## 4. Temps de build — statut honnête

Aucun chiffre cible n'est encore engagé pour le temps de build CI de bout en bout — le pipeline ([[CI_CD_GUIDE.md]] §1) n'a jamais été exécuté en conditions réelles (aucun code applicatif n'existe à ce jour, `CLAUDE.md`). Un budget chiffré serait une valeur inventée plutôt que mesurée — cohérent avec l'honnêteté déjà appliquée dans tout le projet, ce document signale ce gap plutôt que de le masquer par un chiffre arbitraire. À définir dès les premières mesures réelles en Phase 1 d'ingénierie.

---

## 5. Ce que ce document ne fait pas

- Ne redéfinit aucune métrique individuellement — chacune reste possédée par son document source (§1).
- Ne crée aucun nouveau seuil — recompose uniquement des seuils déjà actés.

## 6. Checklist de validation

- [ ] Toute métrique ajoutée au tableau de bord (§1) a une source de vérité déjà existante, jamais un chiffre inventé ici en premier.
- [ ] Le statut honnête du temps de build (§4) est retiré dès qu'un chiffre réel est mesuré, jamais laissé obsolète silencieusement.

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Engineering Handbook) | Principal Engineering Manager |

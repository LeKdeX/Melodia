# ADR_TEMPLATE.md — Architecture Decision Records

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Lead Software Architect
> **Documents liés** : [[ENGINEERING_GUIDE.md]] §4, [[DEVELOPMENT_GUIDELINES.md]] étape 2, [[PROJECT_CHARTER.md]] §7

---

## 1. Pourquoi des ADR

Toute décision structurante non triviale doit laisser une trace : le contexte au moment de la décision, les alternatives considérées, la décision retenue et ses conséquences assumées. Sans cela, une décision ancienne semble arbitraire à un nouveau contributeur, qui risque de la défaire sans comprendre le compromis initial déjà tranché.

**Est structurante** (nécessite un ADR) toute décision qui :
- introduit ou remplace une dépendance de catégorie dans [[TECH_STACK.md]] ;
- modifie une frontière ou une interface définie dans [[ARCHITECTURE_PRINCIPLES.md]] ;
- modifie une convention définie dans [[CODING_STANDARDS.md]] ou [[GIT_WORKFLOW.md]] ;
- modifie un objectif ou une limite de périmètre définie dans [[PROJECT_CHARTER.md]].

**N'est pas structurante** (pas d'ADR nécessaire) une décision d'implémentation locale à un module, réversible sans impact hors de ce module.

## 2. Processus

1. Rédaction de l'ADR à l'état `Proposé`, dans `docs/adr/NNNN-titre-court.md` (numérotation séquentielle).
2. Revue par au moins une autre personne ayant l'autorité technique sur la zone concernée.
3. Si la décision modifie un document fondateur existant : signalement explicite de la contradiction, présentation des solutions possibles, recommandation, et attente de validation avant de passer à `Accepté` — conformément à la règle absolue de [[PROJECT_CHARTER.md]] §7.
4. Une fois `Accepté`, le document fondateur concerné est mis à jour dans la même PR que l'ADR (jamais en différé).
5. Une décision qui remplace une décision antérieure passe l'ancien ADR à l'état `Remplacé par NNNN`, jamais supprimé (l'historique de décision a de la valeur, y compris les décisions abandonnées).

## 3. États possibles
`Proposé` → `Accepté` | `Rejeté` | `Remplacé par [ADR-NNNN]`

---

## 4. Template

```markdown
# ADR-NNNN : [Titre court de la décision]

- **Statut** : Proposé | Accepté | Rejeté | Remplacé par ADR-NNNN
- **Date** : AAAA-MM-JJ
- **Auteur** : [Nom / rôle]
- **Documents impactés** : [liens vers les documents fondateurs concernés]

## Contexte
Quel problème ou quelle question force cette décision ? Quelles contraintes s'appliquent (produit, technique, délai) ?

## Alternatives considérées
| Option | Avantages | Inconvénients |
|---|---|---|
| Option A | | |
| Option B | | |
| Option C | | |

## Décision retenue
Quelle option est choisie, formulée sans ambiguïté.

## Justification
Pourquoi cette option plutôt que les autres, en lien explicite avec les principes d'[[ENGINEERING_GUIDE.md]] et les objectifs de [[PROJECT_CHARTER.md]].

## Conséquences
- Ce que cette décision facilite désormais.
- Ce que cette décision rend plus difficile ou coûteux (compromis assumé).
- Impact sur la dette technique, la performance, la sécurité ou la maintenabilité, si applicable.

## Impact sur les documents existants
Liste des documents fondateurs mis à jour en conséquence de cet ADR, avec la section modifiée.
```

---

## 5. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0) | Lead Software Architect |

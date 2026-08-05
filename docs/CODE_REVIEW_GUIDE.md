# CODE_REVIEW_GUIDE.md — Checklist du relecteur (Engineering Handbook)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal Engineering Manager
> **Documents liés** : [[DEFINITION_OF_DONE.md]], [[CODING_STANDARDS.md]], [[GIT_WORKFLOW.md]] §3

[[DEFINITION_OF_DONE.md]] est la checklist que l'**auteur** d'une PR coche avant de demander une revue. Ce document répond à une question différente, jamais posée sous cette forme jusqu'ici : que vérifie le **relecteur**, dans quel ordre, et avec quelle exigence — les deux checklists se recoupent par nature (même standard final) mais ne sont jamais interchangeables : l'auteur affirme, le relecteur vérifie.

---

## 1. Principe du relecteur

- Un relecteur n'approuve jamais par défaut — une PR sans commentaire sur un changement non trivial est un signal de revue insuffisamment approfondie, pas un compliment ([[DEVELOPMENT_GUIDELINES.md]] §4, déjà acté).
- Un relecteur commente le code, jamais la personne — un commentaire de revue porte toujours sur le changement, formulé comme une question ou une observation factuelle, jamais comme un jugement.
- Un désaccord de revue non résolu par la discussion est arbitré par le propriétaire du document fondateur concerné ([[DOCUMENTATION_GUIDE.md]] §3), jamais laissé sans résolution ni imposé unilatéralement par l'un des deux partis.

## 2. Checklist de revue, dans l'ordre

### 1. Architecture (avant tout le reste)
- [ ] Le changement respecte les frontières de couche/module ([[ARCHITECTURE_PRINCIPLES.md]] §7, [[ARCHITECTURE.md]] §3bis) — vérifié même si la CI l'a déjà validé automatiquement ([[QUALITY_GATES.md]] §1), une revue humaine attrape les cas que le linter d'architecture ne peut pas exprimer.
- [ ] Aucune logique métier introduite dans un composant de présentation ([[CODING_STANDARDS.md]] §4.1).
- [ ] Aucune duplication non justifiée d'un mécanisme déjà existant ([[ENGINEERING_GUIDE.md]] §1.3) — le relecteur qui reconnaît un pattern déjà résolu ailleurs le signale explicitement.

### 2. Lisibilité
- [ ] Le nom de chaque identifiant permet de déduire son rôle sans ouvrir le fichier ([[CODING_STANDARDS.md]] §2, « explicite plutôt qu'astucieux »).
- [ ] Aucun commentaire qui répète ce que le code dit déjà — un commentaire n'est justifié que pour une contrainte cachée ou un choix non évident ([[ENGINEERING_GUIDE.md]] §1.5).
- [ ] Complexité et longueur restent sous les seuils indicatifs ([[CODING_STANDARDS.md]] §6) — un dépassement est soit justifié explicitement dans la PR, soit un signal de décomposition à demander.

### 3. Performance
- [ ] Aucun re-render superflu introduit sur un composant de liste ou de lecture ([[DEFINITION_OF_DONE.md]], section Performance).
- [ ] Toute nouvelle mémoïsation suit la table de décision déjà actée ([[PERFORMANCE_GUIDE.md]] §5quater) — jamais appliquée par réflexe sans justification.
- [ ] Aucun budget de [[PERFORMANCE_BUDGET.md]] approché sans mention explicite dans la description de PR.

### 4. Sécurité
- [ ] Toute nouvelle entrée externe validée par schéma ([[SECURITY_GUIDELINES.md]] §6).
- [ ] Aucune donnée sensible journalisée ou exposée en erreur brute ([[SECURITY_GUIDELINES.md]] §8-9).
- [ ] Toute nouvelle dépendance respecte les critères déjà actés ([[ENGINEERING_GUIDE.md]] §2.1) — un relecteur qui voit une dépendance ajoutée sans justification la questionne avant d'approuver.

### 5. Accessibilité
- [ ] Navigation clavier vérifiée pour tout nouveau parcours interactif ([[ACCESSIBILITY_GUIDE.md]]).
- [ ] Aucune information portée par la couleur seule ([[ACCESSIBILITY_GUIDE.md]] §8, déjà acté ailleurs dans le corpus).

### 6. Tests
- [ ] Les tests couvrent le comportement, jamais l'implémentation interne ([[TESTING_STRATEGY.md]] §3, déjà acté).
- [ ] Un test de régression accompagne toute correction de bug, au niveau où le bug a été introduit ([[TESTING_STRATEGY.md]] §10).
- [ ] Aucun test désactivé (`.skip`) sans ticket de dette technique associé.

### 7. Documentation
- [ ] TSDoc présent sur toute surface publique nouvelle ou modifiée ([[CODING_STANDARDS.md]] §5).
- [ ] Un document fondateur est mis à jour dans la même PR si un standard existant a changé — jamais dans une PR de suivi séparée qui laisserait la documentation temporairement fausse.

## 3. Niveau d'exigence selon la taille de la PR

Cohérent avec [[DEFINITION_OF_DONE.md]] (« Niveaux de rigueur selon le type de changement ») : une PR de refactorisation interne reçoit la même rigueur d'Architecture/Lisibilité/Tests qu'une fonctionnalité, mais les sections Accessibilité/Design ne s'appliquent que si une surface d'interface est réellement touchée — le relecteur adapte son temps, jamais la rigueur des sections applicables.

## 4. Ce qu'un relecteur ne fait jamais

- N'approuve jamais une PR dont la CI est rouge, quelle que soit la qualité du code ([[GIT_WORKFLOW.md]] §3, déjà acté — aucune exception).
- Ne demande jamais un changement de style personnel non couvert par [[CODING_STANDARDS.md]] — une préférence non actée comme standard reste une suggestion, jamais un blocage.
- N'approuve jamais uniquement parce que l'auteur est expérimenté — la checklist §2 s'applique identiquement à toute PR, indépendamment de l'ancienneté de son auteur.

---

## 5. Ce que ce document ne fait pas

- Ne redéfinit pas les critères eux-mêmes, chacun renvoie à son document source (§2).
- Ne redéfinit pas le processus de Pull Request (voir [[GIT_WORKFLOW.md]] §3).

## 6. Checklist de validation

- [ ] Chaque critère de §2 renvoie à un document source déjà acté, aucun critère inventé localement.
- [ ] L'ordre de revue (Architecture d'abord) reste respecté — un problème d'architecture rend une revue de détail prématurée.

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Engineering Handbook) | Principal Engineering Manager |

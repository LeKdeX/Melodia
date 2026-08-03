# SUCCESS_METRICS.md — Objectifs produit mesurables (Phase 1)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Product Manager Senior / Staff Performance Engineer
> **Documents liés** : [[PERFORMANCE_BUDGET.md]], [[UX_PRINCIPLES.md]], [[USER_JOURNEYS.md]]

> **Différence avec [[PERFORMANCE_BUDGET.md]]** : ce document mesure le succès du point de vue de l'usage produit (nombre d'actions, taux de réussite d'une tâche, satisfaction) — [[PERFORMANCE_BUDGET.md]] mesure le coût technique (FPS, mémoire, latence réseau). Les deux se recoupent parfois (le temps de lancement d'un morceau est à la fois une métrique produit et un budget technique) — dans ce cas, le chiffre fait autorité dans [[PERFORMANCE_BUDGET.md]] et ce document y renvoie plutôt que de le dupliquer.

---

## 1. Métriques d'efficacité (nombre d'actions/temps)

| Tâche | Cible | Source du chiffre |
|---|---|---|
| Lancer un morceau depuis l'ouverture de l'application | < 1 s (reprise d'état) | [[PERFORMANCE_BUDGET.md]] §1, Time-to-First-Play |
| Retrouver un album précis par recherche | ≤ 2 actions (recherche + sélection) | Nouveau — mesuré à l'implémentation |
| Créer une playlist et y ajouter un premier titre | ≤ 3 actions (créer, nommer, ajouter) | Nouveau — cible produit, voir [[USER_JOURNEYS.md]] §6 |
| Ajouter un titre à une playlist existante depuis n'importe quel contexte | 1 action (menu contextuel systématique) | Cohérent avec [[PRODUCT_RULES.md]] §5 |
| Temps de recherche perçu | < 100 ms | [[PERFORMANCE_BUDGET.md]] §2 |
| Reprise de lecture après changement d'appareil | 0 action manuelle (automatique) | [[USER_JOURNEYS.md]] §10, sous réserve de l'ADR de synchronisation non encore rédigé |

## 2. Métriques de fiabilité

| Indicateur | Cible |
|---|---|
| Taux de résultats de recherche corrects (le morceau existe et est trouvé) | 100 % sur le contenu synchronisé — tout échec est un défaut, pas une tolérance |
| Taux d'interruption de lecture non désirée (hors action explicite) | 0 % — voir [[PRODUCT_RULES.md]] §2, règle non négociable |
| Taux de restauration correcte de l'état à la réouverture | 100 % — voir [[PRODUCT_RULES.md]] §8 |

## 3. Métriques de performance perçue (recoupement avec [[PERFORMANCE_BUDGET.md]])

Ce document ne redéfinit aucun chiffre de [[PERFORMANCE_BUDGET.md]] — il en rappelle uniquement la traduction en expérience :

| Budget technique | Traduction produit |
|---|---|
| Démarrage à froid < 2 s ([[PERFORMANCE_BUDGET.md]] §1) | L'utilisateur ne perçoit jamais de « chargement », seulement une transition |
| 60 FPS liste virtualisée ([[PERFORMANCE_BUDGET.md]] §3) | Le défilement d'une bibliothèque de 200 000+ titres est indiscernable du défilement d'une bibliothèque de 500 titres |
| Recherche < 100 ms ([[PERFORMANCE_BUDGET.md]] §2) | La recherche semble répondre pendant la frappe, pas après |

## 4. Métriques de satisfaction (qualitatives, à instrumenter en Phase 2+)

Ces métriques ne sont pas mesurables avant qu'une version utilisable existe — elles sont documentées maintenant pour éviter d'avoir à les improviser plus tard, cohérent avec la règle d'honnêteté : elles ne sont **pas** encore mesurées, seulement définies.

| Métrique | Méthode de mesure envisagée | Statut |
|---|---|---|
| Taux de retour quotidien (l'utilisateur revient-il le lendemain ?) | Télémétrie opt-in uniquement ([[PRODUCT_RULES.md]] §10) | Non instrumenté — Phase 2+ |
| Satisfaction perçue de la recherche | Enquête utilisateur pilote | Non instrumenté — Phase 2+ |
| Taux d'abandon pendant la connexion initiale | Télémétrie opt-in uniquement | Non instrumenté — Phase 2+ |
| Fréquence d'utilisation de la fonctionnalité de découverte interne ([[USER_JOURNEYS.md]] §8) | Télémétrie opt-in uniquement | Non instrumenté — dépend de l'implémentation de la fonctionnalité elle-même |

**Rappel explicite** : aucune de ces métriques qualitatives ne justifie une télémétrie par défaut — [[PRODUCT_RULES.md]] §10 reste absolu, toute mesure de ce type est strictement opt-in.

## 5. Métriques d'accessibilité

| Indicateur | Cible | Source |
|---|---|---|
| Défauts WCAG AA critiques/sérieux détectés automatiquement | 0 | [[DEFINITION_OF_DONE.md]], section Accessibilité |
| Parcours entièrement réalisables au clavier | 100 % des parcours de [[USER_JOURNEYS.md]] | [[PERSONAS.md]] §8 |

---

## 6. Ce que ce document ne fait pas

Il ne fixe aucun objectif de croissance d'audience, de rétention en pourcentage arbitraire, ou de métrique business — cohérent avec [[MISSION.md]] §5 (« ce n'est pas une mission de croissance à tout prix »). La réussite se mesure à la qualité de l'usage, pas au volume.

---

## 7. Checklist de validation

- [ ] Aucun chiffre de performance technique n'est dupliqué depuis [[PERFORMANCE_BUDGET.md]] — uniquement référencé et traduit en expérience.
- [ ] Les métriques qualitatives sont explicitement marquées comme non instrumentées, pas présentées comme déjà mesurées.
- [ ] Aucune métrique ne justifie une télémétrie par défaut, cohérent avec [[PRODUCT_RULES.md]] §10.

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1) | Product Manager Senior / Staff Performance Engineer |

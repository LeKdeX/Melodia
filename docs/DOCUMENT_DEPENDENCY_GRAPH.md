# DOCUMENT_DEPENDENCY_GRAPH.md — Matrice de dépendance documentaire (Revue de consolidation)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Documentation Architect
> **Documents liés** : [[DOCUMENT_HIERARCHY.md]], [[TABLE_OF_CONTENTS.md]]

Analyse quantitative des 6 668 occurrences de `[[wikilink]]` du corpus (244 documents). Ne redéfinit aucun contenu — uniquement les relations entre documents, à deux échelles : par document (§1, documents à plus fort impact) et par domaine (§2, matrice de dépendance).

---

## 1. Documents à plus fort impact en cascade (les plus référencés)

| Document | Références entrantes | Pourquoi il est aussi central |
|---|---|---|
| [[ARCHITECTURE_PRINCIPLES.md]] | 195 | Racine de toute décision technique (couches, `MusicSource`/`LocalStore`, état) — modifier ce document impacte potentiellement tous les autres |
| [[PROJECT_CHARTER.md]] | 150 | Référence suprême du produit (§7 de ce document impose sa propre relecture avant toute nouvelle phase) |
| [[PERFORMANCE_BUDGET.md]] | 140 | Chiffres d'autorité cités par tout document qui touche à la performance |
| [[PRODUCT_RULES.md]] | 137 | Règles non négociables citées à chaque décision de comportement produit |
| [[AUDIO_ENGINE.md]] | 132 | Capstone du moteur audio — Epic/Feature/Task les plus densément référencés du plan d'implémentation (EPIC-007) |
| [[DATA_LAYER.md]] | 121 | Racine de la couche donnée, capstone de la Phase 13, également racine des algorithmes de recherche |
| [[MOTION_GUIDELINES.md]] | 117 | Chaque interaction animée du corpus y renvoie pour ses durées/courbes |
| [[CODING_STANDARDS.md]] | 115 | Référencé par chaque document du domaine ingénierie et par chaque Task du backlog |
| [[PLAYER_SPECIFICATION.md]] | 108 | Le domaine le plus densément documenté (lecteur), référencé par la quasi-totalité des documents musicaux |
| [[ENGINEERING_GUIDE.md]] | 105 | Principes d'ingénierie invoqués à chaque décision de conception (non-duplication, YAGNI, etc.) |

**Règle qui en découle** : une modification de l'un de ces dix documents ne peut jamais être traitée comme un changement local — voir [[DOCUMENTATION_CHECKLIST.md]] §3 (vérification d'impact avant modification d'un document à forte cascade).

## 2. Matrice de dépendance par domaine

Cohérente avec la hiérarchie déjà actée ([[DOCUMENT_HIERARCHY.md]]) — chaque domaine référence principalement les domaines à un niveau égal ou supérieur, jamais un niveau inférieur (sauf renvoi explicite vers une mise en œuvre concrète, marqué *).

| Domaine (niveau, [[DOCUMENT_HIERARCHY.md]]) | Dépend principalement de |
|---|---|
| Gouvernance (0) — inclut l'Engineering Handbook et [[DEVELOPER_PLAYBOOK.md]] | — (racine, ne dépend de rien) |
| Vision (1) | Gouvernance |
| Produit (2) | Vision, Gouvernance |
| UX (3) | Produit, Vision |
| Marque (4) | Vision, Produit |
| Langage (5) | Marque, Produit |
| Expérience Premium (6) | UX, Marque |
| Design System (7) | Marque, Gouvernance |
| Composants (8) | Design System, UX |
| Écrans (9) | Composants, UX, Produit |
| Système & Architecture logicielle (10) | Gouvernance, Blueprint technique (2), Produit* (comportement de surface) |
| Couche donnée (11) | Système & Architecture logicielle, Blueprint technique |
| Architecture d'état ([[DOCUMENT_HIERARCHY.md]] §13bis) | Couche donnée, Système & Architecture logicielle |
| Moteur Audio ([[DOCUMENT_HIERARCHY.md]] §13ter) | Architecture d'état (stores), Couche donnée (Repository), Blueprint technique (`ARCHITECTURE_PRINCIPLES.md` §5) |
| Moteur de Recherche ([[DOCUMENT_HIERARCHY.md]] §13quater) | Couche donnée (Repository, index FlexSearch de `DATA_LAYER.md` §3), Architecture d'état (`searchStore`) |
| Plateforme Offline ([[DOCUMENT_HIERARCHY.md]] §13quinquies) | Tous les moteurs pairs (Sync/Cache/Download/Search/Audio) — transverse, pas un niveau supplémentaire mais une couche de résilience qui les traverse tous |
| Implementation Plan ([[DOCUMENT_HIERARCHY.md]] §13sexies) | Tous les niveaux 1-11quater — au-dessus de la hiérarchie, pas dedans : consomme l'intégralité de l'architecture comme donnée d'entrée, n'est jamais consommé en retour par aucun document d'architecture |

**Lecture** : aucune flèche ne remonte — un document de Design System ne référence jamais un composant qui le consomme, un DTO ne référence jamais un écran qui affiche la donnée qu'il transporte. Les seules exceptions explicitement marquées (*) sont des renvois de contexte (« voir la règle produit déjà actée »), jamais une redécision.

## 3. Densité de cross-référencement

6 668 wikilinks pour 244 documents = **27,3 liens sortants en moyenne par document**, une densité stable depuis l'audit de consolidation malgré l'ajout de 47 nouveaux documents (Architecture d'état + Moteur Audio + Moteur de Recherche + Plateforme Offline + Engineering Handbook + Implementation Plan + Developer Playbook + PRE_IMPLEMENTATION_REPORT). Aucun document n'a moins de 3 liens sortants — [[PRE_IMPLEMENTATION_REPORT.md]] est actuellement le seul document du corpus sans référence entrante (normal pour un document tout juste créé par TASK-003 et non encore intégré comme référence par d'autres — [[DEVELOPER_PLAYBOOK.md]], signalé orphelin lors de l'audit précédent, est désormais référencé depuis [[DOCUMENT_HIERARCHY.md]] §2).

---

## 4. Ce que ce document ne fait pas

- Ne liste pas les 4 820 liens un par un — voir le corps de chaque document pour ses références précises.
- Ne redéfinit pas la hiérarchie elle-même (voir [[DOCUMENT_HIERARCHY.md]]).

## 5. Checklist de validation

- [ ] Avant de modifier un document du top 10 (§1), l'impact sur ses documents dépendants est évalué ([[DOCUMENTATION_CHECKLIST.md]] §3).
- [ ] Aucune nouvelle dépendance ne remonte la hiérarchie sans ADR explicite (§2).

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Revue de consolidation) | Documentation Architect |
| 1.1.0 | 2026-08-04 | Chiffres recalculés après les phases Architecture d'état et Moteur Audio (191→213 documents, 4 820→5 496 wikilinks) ; AUDIO_ENGINE.md entre dans le top 10 ; ajout des domaines Architecture d'état/Moteur Audio à la matrice §2 | Documentation Architect |
| 1.2.0 | 2026-08-04 | Chiffres recalculés après la phase Moteur de Recherche (213→220 documents, 5 496→5 737 wikilinks) ; PERFORMANCE_BUDGET.md et DATA_LAYER.md entrent dans le top 10 ; ajout du domaine Moteur de Recherche à la matrice §2 | Documentation Architect |
| 1.3.0 | 2026-08-04 | Chiffres recalculés après la phase Plateforme Offline (220→224 documents, 5 737→5 937 wikilinks) ; ajout du domaine transverse Plateforme Offline à la matrice §2 | Documentation Architect |
| 1.4.0 | 2026-08-04 | Chiffres recalculés après la phase Engineering Handbook (224→229 documents, 5 937→6 148 wikilinks) ; CODING_STANDARDS.md entre dans le top 10 ; ajout du domaine Engineering Handbook (niveau Gouvernance) à la matrice §2 | Documentation Architect |
| 1.5.0 | 2026-08-05 | Chiffres recalculés après la phase Implementation Plan (229→242 documents, 6 148→6 582 wikilinks) ; AUDIO_ENGINE.md dépasse DATA_LAYER.md dans le top 10 ; ajout du domaine Implementation Plan (au-dessus de la hiérarchie) à la matrice §2 | Documentation Architect |
| 1.6.0 | 2026-08-05 | Chiffres recalculés après l'ajout de [[DEVELOPER_PLAYBOOK.md]] (242→243 documents, 6 582→6 645 wikilinks, recomptage exact par `grep -rhoE`) ; premier document du corpus sans référence entrante signalé explicitement (§3) plutôt que masqué | Documentation Architect |
| 1.7.0 | 2026-08-05 | TASK-003 : chiffres recalculés après l'ajout de [[PRE_IMPLEMENTATION_REPORT.md]] (243→244 documents, 6 645→6 668 wikilinks, recompte via `scripts/verify-docs.mjs`) ; [[DEVELOPER_PLAYBOOK.md]] n'est plus orphelin (référencé depuis [[DOCUMENT_HIERARCHY.md]] §2), [[PRE_IMPLEMENTATION_REPORT.md]] devient le nouveau seul document sans référence entrante | Staff Technical Lead |

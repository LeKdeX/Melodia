# DOCUMENT_HIERARCHY.md — Hiérarchie architecturale de la documentation (Revue de consolidation)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Solution Architect
> **Documents liés** : [[TABLE_OF_CONTENTS.md]], [[DOCUMENT_DEPENDENCY_GRAPH.md]]

Chaque document appartient à un niveau de la hiérarchie ci-dessous. La règle de dépendance est la même que celle déjà actée pour le code ([[ARCHITECTURE_PRINCIPLES.md]] §7, dépendance dirigée vers l'intérieur) : **un niveau ne redécide jamais ce qu'un niveau supérieur a déjà tranché, il l'applique et l'affine.** Une contradiction entre deux niveaux se résout toujours en faveur du niveau le plus haut, sauf ADR explicite ([[ADR_TEMPLATE.md]]).

---

## 1. Les 11 niveaux

```
 0. Gouvernance          (règles transverses à tous les niveaux, ne fait pas partie du flux)
 1. Vision                ↓
 2. Produit                ↓
 3. UX                      ↓
 4. Marque                   ↓
 5. Langage                   ↓
 6. Expérience Premium          ↓
 7. Design System                 ↓
 8. Composants                      ↓
 9. Écrans                             ↓
10. Système & Architecture logicielle    ↓
11. Couche donnée                          ↓
    (Implémentation — aucun code écrit à ce jour)
    (Tests — stratégie actée, aucune suite écrite)
    (Déploiement — pipeline décrit, jamais exécuté)
```

**Honnêteté explicite** : les trois dernières lignes entre parenthèses ne sont **pas** des niveaux documentaires au même titre que 0-11 — ce sont les couches réelles vers lesquelles cette documentation converge, mais qui n'existent encore sous aucune forme concrète (voir chaque entrée de journal de phase dans `CLAUDE.md`, « aucun code applicatif écrit »). Les inclure comme des niveaux pleins serait mentir sur l'état réel du projet.

## 2. Niveau 0 — Gouvernance (13 + 5 documents, [[TABLE_OF_CONTENTS.md]] §1 et §21)

Ne fait pas partie du flux séquentiel — ce sont les règles qui gouvernent *comment* chaque autre niveau est écrit et maintenu (nommage, ADR, definition of done, git). `PROJECT_CHARTER.md` fait exception : bien que classé ici pour sa fonction de règle absolue (§7), il est aussi la source de la vision (niveau 1). Les 5 documents Engineering Handbook ([[ENGINEERING_HANDBOOK.md]], [[TYPESCRIPT_GUIDE.md]], [[CODE_REVIEW_GUIDE.md]], [[DEFINITION_OF_READY.md]], [[ENGINEERING_METRICS.md]]) rejoignent ce niveau — même nature que les 13 documents déjà présents, jamais consommés par un niveau supérieur, uniquement gouvernant comment celui-ci est produit. [[DEVELOPER_PLAYBOOK.md]] rejoint également ce niveau : un parcours narratif qui renvoie vers les documents de gouvernance existants (§0-§0bis) sans en redécider aucun — même statut que les 18 documents déjà présents, jamais consommé par un niveau supérieur.

## 3. Niveau 1 — Vision (dans [[TABLE_OF_CONTENTS.md]] §2-3)

`PROJECT_CHARTER.md`, `VISION.md`, `MISSION.md`, `ROADMAP.md`, `TECHNICAL_BLUEPRINT.md` — pourquoi le produit existe, ce qu'il n'est pas, où il va.

## 4. Niveau 2 — Produit ([[TABLE_OF_CONTENTS.md]] §3)

Le reste des 24 documents produit — quoi, pour qui, avec quelles règles non négociables.

## 5. Niveau 3 — UX ([[TABLE_OF_CONTENTS.md]] §4)

Comment chaque fonctionnalité du niveau 2 se vit à l'écran, sans encore de valeur visuelle concrète.

## 6. Niveau 4 — Marque ([[TABLE_OF_CONTENTS.md]] §5)

Identité visuelle et verbale — certains documents restent explicitement des propositions v1 non validées ([[COLOR_SYSTEM.md]], [[TYPOGRAPHY_GUIDE.md]], [[LOGO_GUIDE.md]], rappel de `CLAUDE.md`).

## 7. Niveau 5 — Langage ([[TABLE_OF_CONTENTS.md]] §6)

Texte réel de l'interface, dérivé du ton défini au niveau 4.

## 8. Niveau 6 — Expérience Premium ([[TABLE_OF_CONTENTS.md]] §7)

Mouvement, feedback sensoriel — au-dessus de l'UX (niveau 3) et de la Marque (niveau 4), en dépend directement.

## 9. Niveau 7 — Design System ([[TABLE_OF_CONTENTS.md]] §8)

Les règles absolues qui gouvernent tout composant du niveau 8 — tokens, fondations, espacement.

## 10. Niveau 8 — Composants ([[TABLE_OF_CONTENTS.md]] §9-11, 41 documents)

Trois familles au même niveau hiérarchique, jamais l'une au-dessus de l'autre : bibliothèque générique (§9), navigation (§10), composants musicaux (§11) — chacune consomme le Design System (niveau 7), aucune ne dépend d'une autre famille de composants (cohérent avec [[COMPONENT_DEPENDENCY_GRAPH.md]]).

## 11. Niveau 9 — Écrans ([[TABLE_OF_CONTENTS.md]] §12)

Assemblage des composants du niveau 8 — ne redéfinit aucun comportement de composant, principe déjà acté (`CLAUDE.md`, Phase 10).

## 12. Niveau 10 — Système & Architecture logicielle ([[TABLE_OF_CONTENTS.md]] §13-14)

Ce que les écrans ne montrent pas directement — synchronisation, cache, diagnostics, et l'architecture frontend elle-même (modules, flux de données, gestion d'erreur).

## 13. Niveau 11 — Couche donnée ([[TABLE_OF_CONTENTS.md]] §15)

Le niveau le plus bas de la documentation actuelle — DTO, entités, repositories, schéma physique. Consomme directement le niveau 10, jamais l'inverse.

## 13bis. Niveau 11bis — Architecture d'état ([[TABLE_OF_CONTENTS.md]] §17, ajout Architecture d'état)

Consomme la couche donnée (niveau 11, via les Repositories) et le niveau 10 (frontières de module) — jamais l'inverse. Un niveau à part entière plutôt qu'une sous-partie du niveau 10 : l'état applicatif (stores, sélecteurs, TanStack Query) a des règles propres (une donnée n'existe qu'une seule fois, [[STATE_MANAGEMENT.md]] §1) qui méritent une place explicite dans la hiérarchie, cohérent avec la même logique qui a déjà séparé Système & Architecture logicielle (niveau 10) de Couche donnée (niveau 11).

## 13ter. Niveau 11ter — Moteur Audio ([[TABLE_OF_CONTENTS.md]] §18, ajout Moteur Audio)

Consomme l'Architecture d'état (niveau 11bis — le Playback Controller pilote `playerStore`/`queueStore`) et la Couche donnée (niveau 11 — résolution de source via `TrackRepository`) sans jamais dépendre de l'UI (niveau 3) directement, cohérent avec la constitution déjà actée ([[AUDIO_ENGINE.md]] §0, principe 1 : le moteur ne dépend jamais de l'interface). Placé au niveau le plus bas de la hiérarchie applicative — aucun autre document ne dépend du moteur audio au sens de la hiérarchie (il est consommé, jamais consommateur d'un niveau supérieur).

## 13quater. Niveau 11quater — Moteur de Recherche ([[TABLE_OF_CONTENTS.md]] §19, ajout Moteur de Recherche)

Consomme la Couche donnée (niveau 11 — index construit depuis les Repositories) et l'Architecture d'état (niveau 11bis — `searchStore`), au même palier que le Moteur Audio (niveau 11ter) : les deux moteurs sont des pairs, jamais l'un dépendant de l'autre — une recherche n'a pas besoin du moteur de lecture pour fonctionner, et inversement, cohérent avec l'isolation de domaine déjà actée pour les modules de fonctionnalité ([[ARCHITECTURE.md]] §3bis, `search` et `player` ne s'importent jamais mutuellement).

## 13quinquies. Niveau transverse — Plateforme Offline ([[TABLE_OF_CONTENTS.md]] §20, ajout Plateforme Offline)

**N'est pas un niveau supplémentaire empilé au-dessus des niveaux 11-11quater** — la résilience et la synchronisation traversent tous les moteurs pairs déjà nommés (Couche donnée, Architecture d'état, Moteur Audio, Moteur de Recherche) plutôt que de s'ajouter comme une couche de plus. Un document de ce domaine ([[OFFLINE_SYSTEM.md]], [[CONFLICT_RESOLUTION.md]], [[RESILIENCE_GUIDE.md]]) peut légitimement référencer n'importe lequel des niveaux 11-11quater, cohérent avec son rôle transverse — la seule exception au principe général du §1 (une flèche ne remonte jamais) : ce niveau n'est pas hiérarchique, il est orthogonal.

## 13sexies. Au-dessus de la hiérarchie — Implementation Plan ([[TABLE_OF_CONTENTS.md]] §22, ajout Implementation Plan)

Ne s'insère à aucun niveau 0-11quater — se situe **au-dessus** de toute la hiérarchie architecturale : chaque document de ce domaine ([[EPICS.md]], [[FEATURES.md]], [[TASK_BREAKDOWN.md]]) consomme l'ensemble des niveaux 1-11quater comme donnée d'entrée (« quel document propriétaire pour cette Feature »), mais aucun document d'architecture ne référence jamais un document du plan d'implémentation en retour — la flèche va dans un seul sens, de l'architecture vers le plan, jamais l'inverse. Cohérent avec l'esprit du projet : la documentation d'architecture reste la source de vérité même une fois le plan d'exécution produit, jamais l'inverse.

---

## 14. Ce que ce document ne fait pas

- Ne redéfinit aucun contenu — uniquement la position de chaque document dans la hiérarchie (voir [[TABLE_OF_CONTENTS.md]] pour le contenu par domaine).
- Ne prétend pas que les niveaux Implémentation/Tests/Déploiement existent sous forme concrète (§1, honnêteté explicite).

## 15. Checklist de validation

- [ ] Tout nouveau document reçoit un niveau explicite avant d'être ajouté à [[TABLE_OF_CONTENTS.md]].
- [ ] Aucun document d'un niveau ne redécide un sujet déjà tranché par un niveau supérieur sans ADR ([[ADR_TEMPLATE.md]]).
- [ ] La mention d'honnêteté du §1 reste à jour — retirée seulement quand du code applicatif existe réellement.

## 16. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Revue de consolidation) | Solution Architect |
| 1.1.0 | 2026-08-04 | Ajout des niveaux 11bis (Architecture d'état, §13bis) et 11ter (Moteur Audio, §13ter) | Solution Architect |
| 1.2.0 | 2026-08-04 | Ajout du niveau 11quater (Moteur de Recherche, §13quater), pair du Moteur Audio | Solution Architect |
| 1.3.0 | 2026-08-04 | Ajout du niveau transverse Plateforme Offline (§13quinquies), orthogonal plutôt qu'empilé — seule exception documentée au principe qu'une flèche ne remonte jamais | Solution Architect |
| 1.4.0 | 2026-08-04 | Ajout des 5 documents Engineering Handbook au niveau 0 Gouvernance (§2), même nature que les 13 documents déjà présents | Solution Architect |
| 1.5.0 | 2026-08-05 | Ajout du niveau Implementation Plan (§13sexies), au-dessus de la hiérarchie plutôt que dedans — consomme tout, n'est consommé par rien | Solution Architect |
| 1.6.0 | 2026-08-05 | Ajout de [[DEVELOPER_PLAYBOOK.md]] au niveau 0 Gouvernance (§2) | Solution Architect |

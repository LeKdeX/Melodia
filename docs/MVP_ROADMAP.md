# MVP_ROADMAP.md — Portée du MVP (Implementation Plan)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-05
> **Propriétaire** : Senior Product Manager
> **Documents liés** : [[ROADMAP.md]] Phase 1, [[FEATURE_ROADMAP.md]], [[EPICS.md]]

[[ROADMAP.md]] a déjà défini le critère de sortie de Phase 1 — MVP : « un utilisateur peut se connecter à son serveur Jellyfin, parcourir sa bibliothèque et écouter sa musique quotidiennement sans revenir au client Jellyfin par défaut ». [[FEATURE_ROADMAP.md]] a déjà priorisé MVP→Vision long terme au niveau fonctionnalité. Ce document traduit les deux en portée précise d'Epics/Features ([[EPICS.md]]/[[FEATURES.md]]), sans redécider la priorisation produit déjà actée.

---

## 1. Obligatoire pour le MVP (M0-M8)

| Domaine | Epics | Justification |
|---|---|---|
| Fondations techniques | EPIC-001 à 005 | Aucune fonctionnalité n'est possible sans elles |
| Bibliothèque | EPIC-006 | Cœur du critère de sortie Phase 1 (« parcourir sa bibliothèque ») |
| Lecteur audio (socle) | EPIC-007, socle uniquement (§3) | Cœur du critère de sortie Phase 1 (« écouter sa musique ») |
| Recherche | EPIC-008 | Déjà budgétée comme fonctionnalité critique ([[PERFORMANCE_BUDGET.md]] §2, [[PRODUCT_RULES.md]] §4) |
| Téléchargements | EPIC-009 | Prérequis du « quotidiennement » — une bibliothèque uniquement en streaming ne tient pas la promesse de fiabilité déjà actée ([[PROJECT_CHARTER.md]] §3.3) |

## 2. Peut attendre (M9-M11, MVP tardif — toujours Phase 1)

| Domaine | Epic | Justification du report (pas du retrait) |
|---|---|---|
| Offline complet | EPIC-010 | Le critère de sortie Phase 1 n'exige pas l'offline complet, seulement la fiabilité quotidienne (§1) — le mode hors ligne enrichit sans être bloquant pour le premier usage |
| Statistiques | EPIC-011 | Fonctionnalité de fidélisation, jamais critique au premier usage — cohérent avec [[FEATURE_ROADMAP.md]] (priorisation déjà actée) |
| Optimisations profondes | EPIC-012 | Les budgets de base sont déjà vérifiés en continu par [[QUALITY_GATES.md]] à chaque PR — cette Epic est un durcissement final, pas une fondation manquante |

## 3. Reporté hors MVP (Phase 2+, déjà acté dans ROADMAP.md)

| Domaine | Document source | Statut |
|---|---|---|
| Mobile (iOS/Android) | [[ROADMAP.md]] Phase 2 | Déjà séquencé après Phase 1 — décision de livraison, pas une révision d'ambition tri-cible |
| Enrichissements audio avancés (EQ/Crossfade/Visualiseur) | [[ROADMAP.md]] Phase 2, [[AUDIO_ENGINE.md]] §4-7 | Couches d'enrichissement optionnelles par construction — jamais dans le chemin critique de lecture |
| Synchronisation multi-appareils | [[ROADMAP.md]] Phase 2, [[ARCHITECTURE_PRINCIPLES.md]] §3.3 | Statut technique déjà ouvert, non tranché avant Phase 2 |
| Système de plugins, second connecteur `MusicSource` | [[ROADMAP.md]] Phase 3 | Extensibilité — hors périmètre MVP par construction |

## 4. Décisions produit encore ouvertes — bloquantes avant M5/M6

Cohérent avec [[ROADMAP.md]] (« Décisions produit encore ouvertes avant d'entrer en implémentation ») — ce backlog ne les tranche pas, il signale explicitement où elles bloquent :
- Pondération de la lecture aléatoire — bloque une Task de EPIC-007 (Queue Engine, [[AUDIO_ENGINE.md]] §1) si non tranchée avant.
- Comportement du cache local à la déconnexion — bloque une Task de EPIC-005.
- Statut de la découverte interne — n'affecte pas le MVP (déjà classé hors Phase 1 dans [[ROADMAP.md]]).

## 5. Roadmap MVP (vue consolidée)

```
M0-M4  : Fondations (aucune valeur utilisateur visible)
M5     : Bibliothèque visible et navigable
M6     : Lecture fonctionnelle — première valeur utilisateur complète
M7     : Recherche fonctionnelle
M8     : Téléchargements — MVP fonctionnellement complet (§1)
M9-M11 : Durcissement (Offline, Statistiques, Optimisations) — MVP tardif (§2)
M12-M14: Bêta → RC → 1.0
```

**Le MVP au sens strict (§1) est atteint à la sortie de M8** — M9-M11 restent nécessaires avant la release 1.0 mais ne bloquent pas la définition du MVP lui-même, cohérent avec la distinction déjà actée entre MVP et version publiée.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas le critère de sortie de Phase 1 (voir [[ROADMAP.md]]).
- Ne redéfinit pas la priorisation fonctionnelle détaillée (voir [[FEATURE_ROADMAP.md]]).
- Ne tranche aucune décision produit encore ouverte (§4) — signale uniquement où elle bloque.

## 7. Checklist de validation

- [ ] Chaque Epic obligatoire (§1) a un lien direct avec le critère de sortie de Phase 1 de [[ROADMAP.md]].
- [ ] Aucune fonctionnalité reportée (§3) ne contredit une décision déjà actée dans [[ROADMAP.md]]/[[FEATURE_ROADMAP.md]].
- [ ] Les décisions produit ouvertes (§4) restent trackées, jamais tranchées arbitrairement ici.

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-05 | Création initiale du document (Implementation Plan) | Senior Product Manager |

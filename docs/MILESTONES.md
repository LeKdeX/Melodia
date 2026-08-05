# MILESTONES.md — Jalons d'implémentation (Implementation Plan)

> **Statut** : document fondateur, vivant
> **Version** : 1.1.0
> **Date de création** : 2026-08-05
> **Propriétaire** : Staff Technical Lead
> **Documents liés** : [[ROADMAP.md]], [[EPICS.md]], [[MVP_ROADMAP.md]]

[[ROADMAP.md]] définit 4 phases stratégiques pluriannuelles (Fondations/MVP/Complétude/Extensibilité). Ce document **opérationnalise la Phase 1 — MVP** de [[ROADMAP.md]] (et le tout début de la Phase 2, pour l'offline) en 15 jalons d'exécution, chacun correspondant à un Epic ([[EPICS.md]]) — grain bien plus fin, jamais une redécision du séquencement stratégique déjà acté.

---

## 1. Table des jalons

| Jalon | Nom | Epic | Critère d'entrée | Critère de sortie |
|---|---|---|---|---|
| M0 | Architecture validée | [[EPICS.md]] EPIC-001 | Les 229 documents d'architecture existent | Aucune contradiction non résolue détectée en relecture croisée ([[ARCHITECTURE_REVIEW.md]] déjà acté) |
| M1 | Workspace | EPIC-002 | M0 sorti | Monorepo pnpm/Turborepo installé, CI de base (lint/typecheck) verte sur un commit vide ([[ARCHITECTURE.md]], [[CI_CD_GUIDE.md]]) |
| M2 | Fondations | EPIC-003 | M1 sorti | Packages `@melodia/core`/`@melodia/ui`/`@melodia/platform`/`@melodia/app` existent avec leurs frontières vérifiées par le linter d'architecture ; Design System v1 implémenté pour les composants Foundation ([[COMPONENT_LIBRARY.md]]) ; **l'application Web démarre et affiche l'arbre de composition racine sans erreur, le shell Desktop s'ouvre dans une fenêtre réelle** (FEATURE-083, ADR-0002 — critère ajouté suite à un gap de planification confirmé, aucune version antérieure de ce critère ne l'exigeait) |
| M3 | Connexion Jellyfin | EPIC-004 | M2 sorti | `JellyfinSource` fonctionnel : authentification, DTO/Mapper pour Track/Album/Artist ([[JELLYFIN_INTEGRATION.md]], [[DTO_SPECIFICATION.md]]) |
| M4 | Synchronisation | EPIC-005 | M3 sorti | Import initial + incrémental fonctionnels, `LocalStore` peuplé, Repository Layer complet ([[SYNC_ENGINE_SPECIFICATION.md]], [[REPOSITORY_PATTERN.md]]) |
| M5 | Bibliothèque | EPIC-006 | M4 sorti | Navigation Albums/Artists/Tracks/Playlists fonctionnelle, virtualisée ([[LIBRARY_SCREENS.md]]) |
| M6 | Lecteur Audio | EPIC-007 | M4 sorti (parallélisable avec M5, voir [[DEPENDENCY_GRAPH.md]]) | Lecture socle fonctionnelle (`<audio>` + MediaSession + Queue), machine à états complète ([[AUDIO_ENGINE.md]], [[PLAYBACK_STATE_MACHINE.md]]) |
| M7 | Recherche | EPIC-008 | M4 sorti | Recherche locale instantanée fonctionnelle sur bibliothèque réelle ([[SEARCH_ENGINE.md]]) |
| M8 | Téléchargements | EPIC-009 | M6 sorti | File de téléchargement fonctionnelle, lecture locale prioritaire ([[DOWNLOAD_SYSTEM.md]], [[AUDIO_ENGINE.md]] §0bis.2) |
| M9 | Offline | EPIC-010 | M8 sorti | Mode hors ligne complet, résolution de conflit fonctionnelle ([[OFFLINE_SYSTEM.md]], [[CONFLICT_RESOLUTION.md]]) |
| M10 | Statistiques | EPIC-011 | M9 sorti | Historique d'écoute, tableau de bord, Daily Mix fonctionnels ([[STATISTICS_ENGINE.md]], [[RECOMMENDATION_ENGINE.md]]) |
| M11 | Optimisations | EPIC-012 | M10 sorti | Tous les budgets de [[PERFORMANCE_BUDGET.md]] tenus mesurés sur fixture 200 000 titres |
| M12 | Bêta | EPIC-013 | M11 sorti | Fonctionnalités MVP complètes ([[MVP_ROADMAP.md]]), accessible à un groupe restreint |
| M13 | Release Candidate | EPIC-014 | M12 sorti + retours bêta traités | 0 bug P0/P1 ouvert ([[GITHUB_LABELS.md]]) |
| M14 | Version 1.0 | EPIC-015 | M13 sorti + fenêtre de stabilité observée | Publication Web + Desktop ([[ROADMAP.md]] Phase 1, critère de sortie déjà acté) |

## 2. Parallélisation entre jalons

Cohérent avec [[DEPENDENCY_GRAPH.md]] (détail complet) : M5 (Bibliothèque) et M6 (Lecteur Audio) partagent la même précondition (M4 sorti) et n'ont aucune dépendance mutuelle directe au niveau Epic — parallélisables par deux équipes distinctes. M7 (Recherche) dépend uniquement de M4 (l'index se construit sur les données synchronisées, jamais sur la bibliothèque ou le lecteur eux-mêmes) — également parallélisable avec M5/M6.

## 3. Ce qu'un jalon n'est jamais

Un jalon n'est jamais une date calendaire figée — chaque critère de sortie (§1) est factuel et vérifiable, jamais « environ deux semaines ». Cohérent avec le refus déjà acté d'une cadence de release figée artificiellement ([[ROADMAP.md]], « Rythme de release », § final).

---

## 4. Ce que ce document ne fait pas

- Ne redéfinit pas les phases stratégiques (voir [[ROADMAP.md]]).
- Ne détaille pas le contenu de chaque Epic (voir [[EPICS.md]]).
- Ne tranche pas le scope MVP précis (voir [[MVP_ROADMAP.md]]).

## 5. Checklist de validation

- [ ] Chaque jalon a un critère de sortie factuel, jamais une estimation de durée.
- [ ] L'ordre des jalons respecte les dépendances réelles ([[DEPENDENCY_GRAPH.md]]), jamais un ordre arbitraire.
- [ ] M14 correspond exactement au critère de sortie de Phase 1 déjà acté dans [[ROADMAP.md]].

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-05 | Création initiale du document (Implementation Plan) | Staff Technical Lead |
| 1.1.0 | 2026-08-05 | ADR-0002 : critère de sortie de M2 étendu au rendu réel Web + Desktop (FEATURE-083) — gap de planification corrigé | Staff Technical Lead |

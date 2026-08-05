# DEPENDENCY_GRAPH.md — Graphe de dépendances et chemin critique (Implementation Plan)

> **Statut** : document fondateur, vivant
> **Version** : 1.1.0
> **Date de création** : 2026-08-05
> **Propriétaire** : Staff Technical Lead
> **Documents liés** : [[EPICS.md]], [[MILESTONES.md]], [[TASK_BREAKDOWN.md]]

Ne redéfinit aucune Feature/Task — recompose leurs dépendances déjà déclarées ([[FEATURES.md]], [[TASK_BREAKDOWN.md]]) en graphe navigable, au niveau Epic (bonus du cadrage) et au niveau Task pour M0-M3.

---

## 1. Graphe au niveau Epic

```
EPIC-001 (Architecture validée)
   │
   ▼
EPIC-002 (Workspace)
   │
   ▼
EPIC-003 (Fondations)
   │
   ▼
EPIC-004 (Connexion Jellyfin)
   │
   ▼
EPIC-005 (Synchronisation)
   │
   ├──────────────┬──────────────┐
   ▼              ▼              ▼
EPIC-006      EPIC-007       EPIC-008
(Bibliothèque) (Lecteur Audio) (Recherche)
   │              │              │
   │              ▼              │
   │         EPIC-009            │
   │         (Téléchargements)   │
   │              │              │
   │              ▼              │
   │         EPIC-010            │
   │         (Offline)           │
   │              │              │
   │              ▼              │
   │         EPIC-011            │
   │         (Statistiques)      │
   └──────────────┴──────────────┘
                  │
                  ▼
             EPIC-012 (Optimisations)
                  │
                  ▼
             EPIC-013 (Bêta)
                  │
                  ▼
             EPIC-014 (Release Candidate)
                  │
                  ▼
             EPIC-015 (Version 1.0)
```

## 2. Bloquants, prérequis, parallélisables

| Relation | Epics concernés | Nature |
|---|---|---|
| Bloquant strict | EPIC-001→002→003→004→005 | Chaîne séquentielle, aucun parallélisme possible (chaque Epic redéfinit une fondation dont le suivant dépend entièrement) |
| Parallélisable | EPIC-006, EPIC-007, EPIC-008 | Trois équipes distinctes peuvent travailler simultanément après EPIC-005 — aucune dépendance mutuelle directe au niveau Epic |
| Bloquant partiel | EPIC-009 → EPIC-007 uniquement | Téléchargements dépend du Lecteur Audio (résolution de source, [[AUDIO_ENGINE.md]] §0bis.2), pas de la Bibliothèque ni de la Recherche |
| Bloquant strict | EPIC-010→011→012→013→014→015 | Chaîne séquentielle de durcissement, jamais parallélisée (chaque étape valide la précédente) |
| Convergence | EPIC-006, EPIC-011 | EPIC-011 (Statistiques) dépend d'EPIC-010 (Offline sorti) ET implicitement d'EPIC-006 (Bibliothèque, pour l'affichage des entités statistiquées) — la convergence est vérifiée avant d'entrer en EPIC-012 |

## 3. Chemin critique

**EPIC-001 → 002 → 003 → 004 → 005 → 007 → 009 → 010 → 011 → 012 → 013 → 014 → 015** (13 Epics séquentiels — EPIC-006 et EPIC-008 ne sont **pas** sur le chemin critique, ils se terminent avant EPIC-009 sans le retarder si l'équipe dédiée suit son propre rythme).

**Pourquoi EPIC-007 (Lecteur Audio) est sur le chemin critique et pas EPIC-006/008** : EPIC-009 (Téléchargements) dépend structurellement de la résolution de source du Lecteur Audio ([[AUDIO_ENGINE.md]] §0bis.2, `TrackRepository.getPlaybackSource`) — aucune dépendance équivalente n'existe entre EPIC-009 et Bibliothèque/Recherche. Accélérer EPIC-006/008 n'accélère jamais la sortie globale ; accélérer EPIC-007 le fait.

**Note ADR-0002** : l'ajout de FEATURE-083 (TASK-046 à 049, bootstrap applicatif) à l'intérieur d'EPIC-003 ne change pas ce chemin critique au niveau Epic — EPIC-003 reste un nœud unique sur le chemin, seule sa durée interne augmente (+4 Tasks/+8 points). Voir §4 pour le détail des nouvelles arêtes.

## 4. Graphe de dépendances Task, niveau M0-M3 (détail)

```
TASK-006 (workspace.yaml) ─┬─→ TASK-009 (core) ─┬─→ TASK-013 (tsconfig.base) ─┬─→ TASK-014 (ESLint) ─→ TASK-016 (CI lint)
                            ├─→ TASK-010 (ui)    │                             ├─→ TASK-015 (Tailwind) ─→ TASK-019 (tokens couleur)
                            ├─→ TASK-011 (platform)                            └─→ TASK-017 (CI typecheck)
                            └─→ TASK-012 (app) ──┴─→ TASK-031 (routeur) ─→ TASK-033 (AppProviders) ─→ TASK-034 (ErrorBoundary)
                                                                                      │
TASK-019 → TASK-021 (Button) ─┬─→ TASK-022/023/025/026 (Card/TextField/Toast/Tabs)
                                └─→ TASK-024a → TASK-024b (Dialog)

TASK-012 (app), TASK-015 (Tailwind) ─→ TASK-046 (vite.config.ts)
TASK-046, TASK-033, TASK-034 ─→ TASK-047 (main.tsx, monte AppProviders) — clôture révisée M2 (rendu Web réel)
TASK-047 ─→ TASK-048 (src-tauri/) ─→ TASK-049 (fenêtre Desktop réelle) — clôture révisée M2 (rendu Desktop réel)
  [ADR-0002 — gap de planification corrigé, docs/adr/0002-application-bootstrap-gap.md]

TASK-012 → TASK-035 (SDK Jellyfin) → TASK-036a → TASK-036b → TASK-044/045 (erreurs typées)
TASK-035 → TASK-037/038/039 (authentification) → TASK-042/043 (écrans connexion, dépend aussi de TASK-021)
TASK-036a/036b → TASK-040 (DTO) → TASK-041 (Mappers) — clôture M3
```

## 5. Diagramme de Gantt logique (bonus, ordre relatif — pas de dates calendaires)

```
M0 |█|
M1 |░░████|
M2 |░░░░░░████████|
M3 |░░░░░░░░░░░░░░████████|
M4 |░░░░░░░░░░░░░░░░░░░░░░████████████|
M5 |░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████│ (parallèle M6/M7)
M6 |░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████████│
M7 |░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████│
M8 |░░...................................................░░████│ (dépend de M6 uniquement)
M9  → M10 → M11 → M12 → M13 → M14  (séquentiel, après convergence M5/M6/M7/M8)
```
`█` = travail actif, `░` = attente de la dépendance amont. Cohérent avec [[MILESTONES.md]] §2 — aucune date, uniquement l'ordre relatif et le parallélisme réel.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas le contenu de chaque Epic/Task (voir [[EPICS.md]], [[TASK_BREAKDOWN.md]]).
- Ne fournit aucune estimation calendaire — voir [[TASK_BREAKDOWN.md]] §4 pour les Story Points, jamais convertis en dates ici.

## 7. Checklist de validation

- [ ] Le chemin critique (§3) reste cohérent avec les dépendances déclarées dans [[FEATURES.md]]/[[TASK_BREAKDOWN.md]].
- [ ] Toute nouvelle Feature/Task ajoutée met à jour ce graphe si elle introduit une dépendance inter-Epic.
- [ ] Aucune Task du graphe §4 n'a une dépendance non représentée.

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-05 | Création initiale du document (Implementation Plan) | Staff Technical Lead |
| 1.1.0 | 2026-08-05 | ADR-0002 : ajout des arêtes TASK-046 à 049 (§4) et note de non-impact sur le chemin critique au niveau Epic (§3) | Staff Technical Lead |

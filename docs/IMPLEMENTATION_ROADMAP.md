# IMPLEMENTATION_ROADMAP.md — Plan d'implémentation officiel (Implementation Plan)

> **Statut** : document fondateur, vivant — capstone
> **Version** : 1.1.0
> **Date de création** : 2026-08-05
> **Propriétaire** : Principal Software Architect
> **Documents liés** : tous les documents listés en §2

Point d'entrée unique du plan d'implémentation — transforme les 229 documents d'architecture déjà actés en backlog exécutable, sans réinventer aucune décision produit ou technique déjà prise.

---

## 1. Méthodologie — rolling wave, assumée explicitement

Ce plan décompose intégralement les 4 jalons fondateurs (M0-M3) jusqu'au niveau Task/Subtask ([[TASK_BREAKDOWN.md]]) et laisse les 11 jalons suivants (M4-M14) au niveau Feature ([[FEATURES.md]]), décomposés au fil de l'eau — pratique reconnue (élaboration progressive), pas une omission (détail complet : [[TASK_BREAKDOWN.md]] §1).

## 2. Carte complète du plan d'implémentation

| Document | Rôle |
|---|---|
| [[EPICS.md]] | 15 Epics, un par jalon |
| [[FEATURES.md]] | 82 Features réparties sur les 15 Epics |
| [[TASK_BREAKDOWN.md]] | Méthodologie + 45 Tasks décomposées (M0-M3) + gabarit complet |
| [[MILESTONES.md]] | M0-M14, critères d'entrée/sortie factuels |
| [[MVP_ROADMAP.md]] | Portée MVP (obligatoire/peut attendre/reporté) |
| [[DEPENDENCY_GRAPH.md]] | Graphe Epic/Task, chemin critique, Gantt logique |
| [[RELEASE_PLAN.md]] | Alpha/Beta/RC/Stable, critères de passage |
| [[PROJECT_BOARD_GUIDE.md]] | Structure GitHub Projects/Issues/Milestones |
| [[GITHUB_LABELS.md]] | Labels, couleurs, priorités P0-P3 |
| [[IMPLEMENTATION_CHECKLISTS.md]] | Gabarit de checklist par Task |
| [[TECHNICAL_RISKS.md]] | Risques de séquencement, chemin critique fragile |
| [[ENGINEERING_BACKLOG.md]] | Vue de statut consolidée |

## 3. Burnup Roadmap (bonus du cadrage)

Représentation logique de l'avancement cumulé attendu — jamais une prévision calendaire (cohérent avec [[MILESTONES.md]] §3), uniquement l'ordre et le volume relatif de Features complétées :

```
Features
cumulées
  82 │                                                              ●───● M14
     │                                                        ●─────╯
     │                                                  ●─────╯
  69 │                                            ●─────╯ (M12-M13 : bêta/RC, peu de nouvelles Features, correctifs)
     │                                      ●─────╯
     │                                ●─────╯
  51 │                          ●─────╯ (M9-M11 : Offline/Stats/Optim)
     │                    ●─────╯
  38 │              ●─────╯ (M8 : MVP fonctionnel, MVP_ROADMAP.md §1 atteint)
     │        ●─╮───╯ (M5-M7 en parallèle)
  17 │  ●───●─╯
   7 │──╯ (M0-M4 : fondations, aucune Feature utilisateur visible)
   0 └────────────────────────────────────────────────────────────────
     M0  M1  M2  M3  M4  M5  M6  M7  M8  M9  M10 M11 M12 M13 M14
```

**Lecture** : le plateau M0-M4 (0→7 Features sur 5 jalons) est attendu et sain — les fondations ne produisent aucune valeur utilisateur visible par construction, cohérent avec [[MVP_ROADMAP.md]] §5. L'accélération M5-M8 reflète la parallélisation ([[DEPENDENCY_GRAPH.md]] §2).

## 4. Vision Roadmap (bonus du cadrage)

Ce plan couvre exclusivement [[ROADMAP.md]] Phase 1 (MVP Web + Desktop). Au-delà de M14 :

```
M14 (v1.0, ce plan) ──→ ROADMAP.md Phase 2 (Mobile + Offline complet multi-appareils + enrichissements audio)
                     ──→ ROADMAP.md Phase 3 (Extensibilité : plugins, second connecteur MusicSource, API publique)
                     ──→ ROADMAP.md Phase 4+ (Maturité : stores officiels, écosystème de plugins)
```

Un plan d'implémentation équivalent à celui-ci (Epics/Features/Tasks) sera produit pour Phase 2 **au démarrage de Phase 2**, jamais en amont — cohérent avec le même principe de rolling wave (§1) appliqué à l'échelle des phases stratégiques elles-mêmes.

## 5. Auto-revue de cohérence (vérifications du cadrage)

- **Toutes les fonctionnalités documentées apparaissent dans le backlog** : chaque Feature de [[FEATURES.md]] cite un document propriétaire déjà acté — vérifié par échantillonnage sur les 18 modules de [[MODULES.md]] (tous représentés dans EPIC-005 à EPIC-011) et les capstones de moteur (Audio→EPIC-007, Search→EPIC-008, Offline→EPIC-010, State→transverse à EPIC-003 et suivants).
- **Aucune tâche orpheline** : les 45 Tasks de [[TASK_BREAKDOWN.md]] appartiennent chacune à une Story, chaque Story à une Feature de [[FEATURES.md]], chaque Feature à un Epic de [[EPICS.md]] — vérifié par construction (aucune Task créée hors de cette hiérarchie).
- **Dépendances cohérentes** : le graphe de [[DEPENDENCY_GRAPH.md]] §4 (niveau Task) a été vérifié contre les dépendances déclarées dans [[TASK_BREAKDOWN.md]] §5-8 — aucune divergence trouvée.
- **MVP réalisable** : [[MVP_ROADMAP.md]] §1 s'appuie sur EPIC-001 à 009 uniquement, tous sur ou alimentant le chemin critique ([[DEPENDENCY_GRAPH.md]] §3) — aucune dépendance circulaire, aucun Epic manquant.
- **Phases dans un ordre logique** : l'ordre M0→M14 respecte strictement les dépendances techniques réelles (fondations → connexion → sync → [bibliothèque ∥ audio ∥ recherche] → téléchargements → offline → stats → durcissement → release) — jamais un ordre imposé par le cadrage sans vérification technique.

> **Correction (ADR-0002, 2026-08-05)** : la première affirmation ci-dessus (« toutes les fonctionnalités documentées apparaissent dans le backlog ») s'est révélée incomplète — une revue d'avancement de M1 a trouvé qu'aucune Task (sur les 45 d'origine) ne créait le point d'entrée réel de l'application (`apps/web/vite.config.ts`, `apps/web/src/main.tsx`, `apps/desktop/src-tauri/`), pourtant déjà décrit comme faisant autorité dans [[ARCHITECTURE.md]] §1 et [[CONFIGURATION_GUIDE.md]]. L'échantillonnage par modules ([[MODULES.md]]) n'aurait pas pu détecter ce gap : `MODULES.md` couvre les modules de fonctionnalité (`player`, `library`...), jamais le shell applicatif lui-même. Corrigé par l'ajout de FEATURE-083 (TASK-046 à 049, EPIC-003) — voir `docs/adr/0002-application-bootstrap-gap.md`. Signalé ici explicitement plutôt que silencieusement, conformément à [[DOCUMENTATION_GUIDE.md]] §5.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit aucune décision produit ou technique — toute substance vit dans les 229 documents d'architecture déjà actés.
- Ne fixe aucune date calendaire (voir [[MILESTONES.md]] §3, [[RELEASE_PLAN.md]] §3).

## 7. Checklist de validation

- [ ] Les 5 vérifications du §5 restent vraies à chaque mise à jour du backlog.
- [ ] Aucun document de ce plan ne contredit un document d'architecture déjà acté.
- [ ] Le rolling wave (§1) reste explicite à chaque nouveau jalon décomposé.

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-05 | Création initiale du document (Implementation Plan) | Principal Software Architect |
| 1.1.0 | 2026-08-05 | ADR-0002 : correction de §5 (« toutes les fonctionnalités apparaissent dans le backlog » incomplète — gap du point d'entrée applicatif trouvé et corrigé) | Staff Software Engineer |

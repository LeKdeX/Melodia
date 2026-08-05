# ADR-0002 : Gap de planification — absence de Task pour le point d'entrée réel de l'application

- **Statut** : Accepté (revue demandée et validée par l'utilisateur, 2026-08-05)
- **Date** : 2026-08-05
- **Auteur** : Staff Software Engineer (revue d'avancement M1 à la demande de l'utilisateur)
- **Documents impactés** : [[FEATURES.md]], [[TASK_BREAKDOWN.md]], [[DEPENDENCY_GRAPH.md]], [[MILESTONES.md]], [[EPICS.md]], [[ENGINEERING_BACKLOG.md]], [[IMPLEMENTATION_ROADMAP.md]], [[DEFINITION_OF_DONE.md]]

## Contexte

Une revue d'avancement de M1 a révélé qu'aucune des 45 Tasks décomposées (M0-M3) ni aucune des 82 Features du backlog complet (M0-M14) ne crée le point d'entrée réel de l'application — `apps/web/vite.config.ts`, `apps/web/src/main.tsx`, `apps/desktop/src-tauri/` — pourtant déjà décrits comme faisant autorité dans [[ARCHITECTURE.md]] §1 et référencés comme existants dans [[CONFIGURATION_GUIDE.md]] (tableau des variables d'environnement par cible).

**Revue complète effectuée pour confirmer qu'il ne s'agit pas d'un report délibéré** :
- Recherche exhaustive (`grep`) de « apps/web », « apps/desktop », « vite.config », « main.tsx », « src-tauri », « tauri.conf » dans [[TASK_BREAKDOWN.md]] et [[FEATURES.md]] — seule occurrence : TASK-008, qui crée les dossiers **vides**.
- [[MODULES.md]] (registre des 18 modules de fonctionnalité) ne mentionne aucun des trois dossiers `apps/*`.
- [[IMPLEMENTATION_ROADMAP.md]] §5 (auto-revue de cohérence du plan) affirme « aucune tâche orpheline » et « toutes les fonctionnalités documentées apparaissent dans le backlog » — cette auto-revue n'a pas détecté le gap, confirmant qu'il n'a jamais été traité comme une fonctionnalité à part entière nécessitant sa propre Feature.
- [[MVP_ROADMAP.md]] §3 diffère explicitement `apps/mobile` à Phase 2 (hors MVP) — **ce report-là est délibéré et documenté**, à ne pas confondre avec le gap sur `apps/web`/`apps/desktop`, qui lui n'est mentionné nulle part comme différé.
- Les seules Features touchant `apps/*` sont FEATURE-079/080/081 (EPIC-015, M14 — pipeline de release, publication Web/Desktop) : elles supposent `apps/web`/`apps/desktop` déjà fonctionnels pour packager une release, pas pour le développement itératif dès M2 (Storybook, tests E2E Playwright déjà prévus dans [[CI_CD_GUIDE.md]] §1, écrans à construire dès M3/EPIC-004) — elles ne peuvent donc pas être la réponse à ce gap.

**Conclusion de la revue : le gap est confirmé comme un oubli de planification**, pas un report assumé.

## Alternatives considérées (position du correctif dans le backlog)

| Option | Avantages | Inconvénients |
|---|---|---|
| A — Nouveau Feature dans EPIC-002 (Workspace, M1), aux côtés de TASK-006/007/008 | Cohérent avec la nature « scaffolding » de la tâche | Le point de montage (`main.tsx`) doit monter un contenu réel — dépendrait de TASK-033 (`AppProviders`), qui appartient à EPIC-003 (M2). Créerait une dépendance croisée EPIC-002 → EPIC-003, cassant la séquence stricte déjà actée ([[EPICS.md]] §3, « EPIC-001 → 002 → 003 → ... ») |
| B — Nouvel Epic dédié, inséré entre M1 et M2 (renumérotation M2-M14 → M3-M15) | Isole proprement le sujet | Renumérotation en cascade de 13 jalons dans [[MILESTONES.md]], [[EPICS.md]], [[GITHUB_LABELS.md]] (Milestones GitHub), [[RELEASE_PLAN.md]], le diagramme de [[IMPLEMENTATION_ROADMAP.md]] §3 — coût disproportionné à l'ampleur réelle du correctif (4 Tasks, 8 points) |
| C — Nouveau Feature à la fin d'EPIC-003 (Fondations, M2), après FEATURE-012 (Composition racine) | Aucune dépendance croisée : `TASK-033`/`034` (même Epic) précèdent naturellement le montage réel ; aucune renumérotation de jalon ; le critère de sortie de M2 devient enfin vérifiable visuellement, ce qu'il n'était pas | Élargit légèrement le périmètre de M2 (+4 Tasks, +8 points sur les 16 Tasks/~35 points déjà prévus) |

## Décision retenue

**Option C** — nouvelle **FEATURE-083 (« Bootstrap de l'application — Web + Desktop »)**, ajoutée à la fin d'**EPIC-003 (Fondations, M2)**, positionnée après FEATURE-012. `apps/mobile` **explicitement exclu**, cohérent avec [[MVP_ROADMAP.md]] §3 (Mobile déjà différé à Phase 2, décision non remise en cause ici).

## Justification

L'option C est la seule qui ne casse aucune dépendance déjà actée (séquence stricte des Epics, [[EPICS.md]] §3) tout en résolvant le gap au plus tôt où il est techniquement possible de le faire (dès que `packages/app` a un arbre de composition réel à monter, TASK-033/034). Elle rend également le critère de sortie de M2 réellement vérifiable — [[MILESTONES.md]] actuel se contente de « packages existent, frontières vérifiées », sans jamais exiger que l'application s'affiche, ce qui est précisément l'angle mort révélé par cette revue.

## Conséquences

- **Facilite** : dès M2 sorti, l'application est visuellement vérifiable (Web + Desktop) — TASK-042/043 (Écran Connexion serveur, M3/EPIC-004) auront un shell réel où s'afficher, ce qui n'était pas garanti auparavant. Les tests E2E Playwright et Storybook ([[CI_CD_GUIDE.md]] §1, [[DESIGN_SYSTEM_ARCHITECTURE.md]] §6) ont enfin une cible réelle bien avant M14.
- **Rend plus difficile** : M2 s'alourdit de 4 Tasks/8 points (+23 % environ) — délai de sortie de M2 légèrement repoussé par rapport à l'estimation implicite précédente (qui était de toute façon incomplète, puisqu'elle omettait ce travail nécessaire).
- **Gap connexe identifié, non traité ici** : [[CI_CD_GUIDE.md]] §1 décrit un job CI `build` (« build de chaque app affectée ») qui n'a lui non plus aucune Task dédiée dans le backlog actuel (TASK-016/017/018 ne couvrent que lint/typecheck). Signalé explicitement plutôt que masqué — hors périmètre de cette revue, qui portait sur le point d'entrée applicatif, pas sur la couverture CI complète.
- **Impact sécurité/performance** : aucun — travail de scaffolding pur, aucune donnée traitée.

## Impact sur les documents existants

- [[FEATURES.md]] §2 : ajout de FEATURE-083 sous EPIC-003.
- [[TASK_BREAKDOWN.md]] §7 : ajout de STORY-023/024 (TASK-046 à 049) à la décomposition d'EPIC-003.
- [[DEPENDENCY_GRAPH.md]] §4 : ajout des arêtes TASK-012/015→046→047 (+ TASK-033/034→047), 047→048→049 au graphe M0-M3.
- [[MILESTONES.md]] §1 : critère de sortie de M2 étendu pour exiger le rendu réel Web + Desktop.
- [[EPICS.md]] §2 : portée d'EPIC-003 complétée (mention du bootstrap applicatif).
- [[ENGINEERING_BACKLOG.md]] §1 : compteurs Features/Tasks mis à jour (82→83 Features, 45→49 Tasks M0-M3 décomposées).
- [[IMPLEMENTATION_ROADMAP.md]] §5 : correction de l'auto-revue, qui affirmait à tort que toutes les fonctionnalités documentées apparaissaient dans le backlog.
- **[[DEFINITION_OF_DONE.md]]** (ajout demandé explicitement par l'utilisateur, 2026-08-05) : nouvelle section « Definition of Done — Epic », règle permanente du projet — les 5 critères de cette revue (point d'entrée, point de sortie, artefact observable, critère de validation, démonstration reproductible) deviennent un gate systématique avant l'implémentation de toute Epic future, appliqué lors de chaque revue d'architecture.

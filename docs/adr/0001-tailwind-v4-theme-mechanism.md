# ADR-0001 : Mécanisme technique des tokens de design statiques face à Tailwind CSS v4

- **Statut** : Accepté (2026-08-05, validation explicite de l'utilisateur — Option B, mécanisme natif v4, aucune couche de compatibilité v3)
- **Date** : 2026-08-05
- **Auteur** : Staff Software Engineer (implémentation TASK-015)
- **Documents impactés** : [[DESIGN_SYSTEM_ARCHITECTURE.md]] §1

## Contexte

TASK-015 (« Preset Tailwind partagé », `docs/TASK_BREAKDOWN.md` §6) devait produire un preset JS consommé via le mécanisme `tailwind.config` + `presets`, explicitement décidé dans [[DESIGN_SYSTEM_ARCHITECTURE.md]] §1 : *« Format : tokens définis comme extension du thème Tailwind (`tailwind.config`) pour les valeurs statiques... »*. Cette décision a été prise en Phase 2 volume 2, à une époque où Tailwind CSS v3 (configuration JS, `tailwind.config.js` + tableau `presets`) était le mécanisme standard.

La version réellement disponible aujourd'hui dans le registre npm est **Tailwind CSS 4.3.3**, dont l'architecture de configuration a changé fondamentalement : le thème s'étend désormais nativement en CSS via des blocs `@theme` dans un fichier importé (`@import "tailwindcss"; @theme { --color-accent: ...; }`). Le package `tailwindcss` v4 n'exporte plus de point d'entrée JS chargeant un `tailwind.config.js` (vérifié : ses exports sont `index.css`, `theme.css`, `preflight.css`, `utilities.css`, `plugin.js`, `defaultTheme.js`, `colors.js` — aucun chargeur de config JS). Une compatibilité ascendante existe (directive `@config "chemin/vers/tailwind.config.js";`) mais elle est documentée par Tailwind comme un pont de migration pour les projets déjà en v3, pas le chemin recommandé pour un nouveau projet.

[[TECH_STACK.md]] §1 a déjà acté Tailwind CSS comme choix de catégorie — non remis en cause ici. Seul le **mécanisme technique précis** d'extension de thème, décrit dans [[DESIGN_SYSTEM_ARCHITECTURE.md]] §1, ne correspond plus à l'API réellement disponible.

## Alternatives considérées

| Option | Avantages | Inconvénients |
|---|---|---|
| A — Conserver `tailwind.config.js` + `presets` via la directive de compatibilité `@config` | Respecte littéralement le texte déjà acté sans le modifier ; migration triviale depuis une base v3 existante (non applicable ici, aucun code existant) | Chemin explicitement documenté comme transitoire par Tailwind lui-même ; risque de dépréciation dans une version majeure future ; n'exploite aucun des bénéfices de v4 (performance de build, DX simplifiée) |
| B — Adopter le mécanisme natif CSS de v4 (`@theme` dans un fichier CSS partagé, importé par chaque package consommateur) | Chemin recommandé et pérenne de l'outil réellement installé ; performance de build native à v4 ; DX alignée sur la direction actuelle de l'écosystème Tailwind | Modifie le texte littéral de [[DESIGN_SYSTEM_ARCHITECTURE.md]] §1 (« extension du thème Tailwind (`tailwind.config`) » devient inexact) ; nécessite une mise à jour de ce document fondateur |
| C — Revenir à Tailwind CSS v3 (dernière version majeure alignée sur le mécanisme déjà documenté) | Aucune modification de [[DESIGN_SYSTEM_ARCHITECTURE.md]] nécessaire | Adopter délibérément une version majeure obsolète dès le premier jour d'un nouveau projet, contraire à l'esprit de [[PROJECT_CHARTER.md]] §2 (« Le produit doit vieillir bien ») ; dette technique immédiate et cachée |

## Décision retenue

**Option B** — adopter le mécanisme natif CSS (`@theme`) de Tailwind CSS v4, la version réellement installée. `packages/config` fournirait un fichier CSS partagé (`tailwind-theme.css`) plutôt qu'un preset JS, importé par chaque package consommateur via `@import "@melodia/config/tailwind-theme.css";` dans son propre point d'entrée CSS.

**Acceptée et exécutée** — `docs/DESIGN_SYSTEM_ARCHITECTURE.md` §1 mis à jour dans le même lot que cette acceptation, conformément à [[ADR_TEMPLATE.md]] §2.4 (« le document fondateur concerné est mis à jour dans la même PR que l'ADR, jamais en différé »). TASK-015 reprise en conséquence.

## Justification

Démarrer un nouveau projet en 2026 sur une version majeure d'outil explicitement documentée comme transitoire (Option A) ou délibérément obsolète (Option C) contredit [[ENGINEERING_GUIDE.md]] §1.1 (simplicité par défaut — la compatibilité ascendante ajoute une indirection sans bénéfice réel ici, puisqu'aucune base de code v3 n'existe à migrer) et [[PROJECT_CHARTER.md]] §2 (« chaque décision est prise en anticipant sa maintenance dans 3 ans »). Le texte de [[DESIGN_SYSTEM_ARCHITECTURE.md]] §1 décrivait un **mécanisme**, pas un **objectif produit** — l'objectif (tokens statiques compilés par Tailwind, variables CSS pour le dynamique) reste entièrement satisfait par l'Option B ; seul le véhicule technique change.

## Conséquences

- **Facilite** : alignement avec la version réellement maintenue de l'outil, performance de build native, pas de dette de migration v3→v4 différée.
- **Rend plus difficile** : aucune régression identifiée — les catégories et la convention de nommage déjà actées dans [[DESIGN_TOKENS.md]] restent inchangées, seul le format du fichier technique porteur change (`.js` → `.css`).
- **Impact performance/sécurité** : aucun. **Impact maintenabilité** : positif (évite une dette de migration v3→v4 différée à une phase ultérieure du projet).

## Impact sur les documents existants (si accepté)

- [[DESIGN_SYSTEM_ARCHITECTURE.md]] §1 : la phrase « extension du thème Tailwind (`tailwind.config`) » à remplacer par « extension du thème Tailwind (blocs `@theme` CSS, Tailwind CSS v4) ».
- [[DESIGN_TOKENS.md]] : renvoi vers [[DESIGN_SYSTEM_ARCHITECTURE.md]] §1 reste valide sans changement de texte (ne redécrit pas le mécanisme lui-même, pas d'impact).

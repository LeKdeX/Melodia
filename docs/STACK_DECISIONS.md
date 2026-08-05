# STACK_DECISIONS.md — Décisions de stack (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 0.3.0
> **Date de création** : 2026-08-03
> **Propriétaire** : CTO / Principal Software Architect
> **Documents liés** : [[TECH_STACK.md]], [[ARCHITECTURE.md]], [[ENGINEERING_GUIDE.md]] §2

Ce document ne re-décide **rien** de ce qui a déjà été tranché en Phase 0 ([[TECH_STACK.md]]) — le reprendre serait une duplication contraire à [[ENGINEERING_GUIDE.md]] §1.3. Il confirme brièvement l'existant par un renvoi, puis traite en détail les deux décisions de stack réellement nouvelles de cette phase : le moteur de recherche et l'outillage monorepo.

---

## 1. Déjà décidé en Phase 0 (aucun changement)

| Catégorie | Choix | Référence |
|---|---|---|
| Framework | React 19 | [[TECH_STACK.md]] §1 |
| Langage | TypeScript strict | [[TECH_STACK.md]] §1 |
| Build | Vite | [[TECH_STACK.md]] §1 |
| UI / Icônes | Tailwind + Radix UI / Lucide | [[TECH_STACK.md]] §1 |
| Animations | Motion + CSS/Canvas temps réel | [[TECH_STACK.md]] §1 |
| Gestion d'état | Zustand (client) + TanStack Query (serveur) | [[TECH_STACK.md]] §1, [[ARCHITECTURE_PRINCIPLES.md]] §4 |
| Données locales | SQLite (natif) + IndexedDB (repli Web) | [[TECH_STACK.md]] §1, [[ARCHITECTURE_PRINCIPLES.md]] §3 |
| Audio | `<audio>` + MediaSession + Web Audio API | [[TECH_STACK.md]] §1, [[ARCHITECTURE_PRINCIPLES.md]] §5 |
| Virtualisation | TanStack Virtual | [[TECH_STACK.md]] §1 |
| Validation | Zod | [[TECH_STACK.md]] §1 |
| Tests | Vitest + React Testing Library + Playwright | [[TECH_STACK.md]] §1 |
| Lint / Formatage | ESLint + typescript-eslint / Prettier | [[TECH_STACK.md]] §1 |
| Documentation (code) | TSDoc + Storybook | [[TECH_STACK.md]] §1 |
| CI/CD | GitHub Actions | [[TECH_STACK.md]] §1 |
| Packaging | Tauri 2 (Desktop + Mobile unifiés) | [[TECH_STACK.md]] §0 et §1 |

**Confirmation explicite** : la question Next.js vs Vite soulevée par le cadrage de cette phase a été tranchée avec l'utilisateur en faveur du maintien de Vite + React SPA — aucune remise en cause de [[TECH_STACK.md]] §0 (unification Tauri). Voir [[FRONTEND_ARCHITECTURE.md]] pour l'architecture de routing/rendu qui remplace ce qu'aurait couvert une section « Next.js ».

---

## 2. Décision nouvelle : moteur de recherche

### Contexte
[[PERFORMANCE_BUDGET.md]] §2 exige une recherche locale perçue à moins de 100 ms, y compris hors ligne. La recherche côté serveur Jellyfin seule ne peut pas garantir ce budget (latence réseau) ni fonctionner hors ligne. Un moteur d'indexation et de recherche floue côté client est donc nécessaire, au-dessus du cache local ([[ARCHITECTURE_PRINCIPLES.md]] §3).

### Alternatives comparées
| Option | Avantages | Inconvénients |
|---|---|---|
| **Fuse.js** | Très populaire, API simple, bon pour de petites listes | Performance dégradée au-delà de quelques dizaines de milliers d'entrées — insuffisant pour l'objectif de 200 000 titres ([[PERFORMANCE_BUDGET.md]] §8) |
| **MiniSearch** | Léger, full-text correct, bonne DX | Moins performant que FlexSearch à grande échelle sur la latence de requête |
| **Orama** | Moderne, TypeScript natif, API agréable, recherche vectorielle possible à terme | Historique de production plus court à l'échelle de 200 000+ documents ; écosystème encore jeune |
| **FlexSearch** | Le plus rapide et le plus économe en mémoire du marché à cette échelle (benchmarks publics constants sur 100k-1M+ documents), index sérialisable | API plus bas niveau, DX légèrement moins immédiate que MiniSearch/Orama |

### Décision retenue : FlexSearch
**Pourquoi** : c'est la seule option dont les benchmarks démontrent une tenue de la latence sous charge à l'échelle visée (200 000 titres, voir l'amendement de [[PERFORMANCE_BUDGET.md]] dans [[PERFORMANCE_GUIDE.md]]). L'index est maintenu par la couche Data ([[ARCHITECTURE_PRINCIPLES.md]] §2-3), synchronisé à chaque mise à jour du cache local, et sérialisé dans `LocalStore` pour éviter une reconstruction complète à chaque démarrage (voir [[DATA_LAYER.md]] §3).

**Repli** : tant que l'index local n'est pas construit (premier lancement, synchronisation en cours), la recherche retombe sur l'endpoint de recherche Jellyfin — dégradé mais fonctionnel, jamais une recherche vide silencieuse.

---

## 3. Décision nouvelle : outillage monorepo

### Contexte
[[PROJECT_CHARTER.md]] §3.9 (évolutivité) anticipe une bibliothèque UI extractible, un futur SDK public et plusieurs cibles de packaging (Web, Desktop, Mobile) à partir d'un même cœur de code ([[ARCHITECTURE_PRINCIPLES.md]] §1). Un monorepo à plusieurs packages avec de vraies frontières (pas seulement des dossiers de convention) sert directement cet objectif. Voir [[ARCHITECTURE.md]] pour l'arborescence complète qui en résulte.

### Alternatives comparées
| Option | Avantages | Inconvénients |
|---|---|---|
| **Pas de monorepo (un seul package)** | Le plus simple, aucun outillage additionnel | Ne prépare pas l'extraction future du design system ou d'un SDK ; frontières de couche uniquement conventionnelles, non imposées par le gestionnaire de paquets |
| **Nx** | Très puissant, cache distribué, générateurs de code, visualisation de graphe de dépendances | Complexité et courbe d'apprentissage disproportionnées à l'échelle actuelle du projet ; freine l'onboarding contributeur ([[PROJECT_CHARTER.md]] §3.10) |
| **pnpm workspaces + Turborepo** | Léger, largement adopté dans l'écosystème React/Vite, cache de build efficace, courbe d'apprentissage minimale pour un nouveau contributeur | Moins de fonctionnalités avancées que Nx (pas de générateurs intégrés, graphe de dépendances plus basique) |

### Décision retenue : pnpm workspaces + Turborepo
**Pourquoi** : satisfait l'objectif d'évolutivité sans la complexité disproportionnée de Nx, conformément au principe de simplicité par défaut ([[ENGINEERING_GUIDE.md]] §1.1 — complexité justifiée uniquement par un besoin réel). Le bassin de contributeurs potentiels connaît déjà majoritairement pnpm/Turborepo dans l'écosystème React/Vite actuel, ce qui minimise la friction d'onboarding.

**Compromis assumé** : si le projet devait un jour dépasser une dizaine de packages avec des besoins de génération de code répétitifs, une migration vers Nx serait réévaluée par ADR — ce n'est pas un besoin actuel (voir [[ENGINEERING_GUIDE.md]] §1.1, ne pas sur-concevoir pour un besoin hypothétique).

---

## 4. Checklist de validation

- [ ] Chaque catégorie de [[TECH_STACK.md]] est confirmée sans être re-décidée.
- [ ] Les deux décisions nouvelles (recherche, monorepo) ont une comparaison complète — voir [[TECHNOLOGY_COMPARISONS.md]] §7 et §1-3 respectivement pour le détail axe par axe.
- [ ] Les risques de FlexSearch et du monorepo sont couverts dans [[RISK_REGISTER_TECHNICAL.md]] §1 et §3.
- [ ] La tenue à 200 000-300 000 titres du couple FlexSearch/monorepo est validée dans [[EXTREME_SCENARIOS.md]] §1.

## 5. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | CTO / Principal Software Architect |
| 0.2.0 | 2026-08-03 | Ajout de la checklist de validation et des renvois vers les documents du complément Phase 0.5 | Principal Software Architect |
| 0.3.0 | 2026-08-05 | TASK-002 : correction de la citation Fuse.js vers PERFORMANCE_BUDGET.md (section 0, inexistante → section 8) ; correction du numéro de version en en-tête, resté désynchronisé (« 0.1.0 ») du tableau ci-dessus | Staff Technical Lead |

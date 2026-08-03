# ENGINEERING_MANIFESTO.md — Manifeste opérationnel (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : CTO / Principal Software Architect
> **Documents liés** : [[ENGINEERING_GUIDE.md]], [[ARCHITECTURE_PRINCIPLES.md]], [[CODING_STANDARDS.md]]

Ce document ne re-justifie **aucun** des dix principes déjà posés et argumentés dans [[ENGINEERING_GUIDE.md]] §1 — les relire ici serait une duplication contraire au principe même qu'ils énoncent ([[ENGINEERING_GUIDE.md]] §1.3). Il ajoute ce qui manquait : quand le Domain-Driven Design s'applique concrètement à Melodia, et surtout, la liste actionnable des pratiques interdites avec leur mécanisme de détection.

---

## 1. Domain-Driven Design — quand, et à quel degré

Melodia est un domaine métier volontairement restreint (musique, pas un système multi-domaines complexe) — un DDD complet (agrégats, bounded contexts multiples, event sourcing) serait une sur-conception au sens d'[[ENGINEERING_GUIDE.md]] §1.1. Ce qui s'applique concrètement :

- **Langage ubiquitaire** : les termes du domaine (`Track`, `Album`, `Artist`, `Playlist`, `PlaybackQueue`) sont identiques dans le code, la documentation et les échanges d'équipe — jamais un terme Jellyfin qui fuit dans le vocabulaire produit (rappel de [[PROJECT_CHARTER.md]] §1, Jellyfin comme détail d'implémentation).
- **Entités de domaine explicites** : `entities/` dans `@melodia/core` ([[ARCHITECTURE.md]] §1) constitue le seul endroit où ces concepts sont définis — jamais un type dupliqué localement dans une feature.
- **Ce qui n'est délibérément pas fait** : pas de bounded contexts séparés (un seul domaine cohérent à cette échelle), pas d'event sourcing pour l'état de lecture (un état mutable simple dans `playerStore` suffit et reste plus lisible — [[ENGINEERING_GUIDE.md]] §1.6).

## 2. Anti-patterns interdits — liste actionnable

Chaque entrée précise **comment** la violation est détectée, pas seulement pourquoi elle est interdite (le « pourquoi » est déjà dans [[ENGINEERING_GUIDE.md]] §1 pour ceux qui en découlent directement).

| Anti-pattern | Détection | Principe source |
|---|---|---|
| Duplication de logique (3+ occurrences) | Revue de code manuelle — aucun outil ne détecte fiablement la duplication sémantique | [[ENGINEERING_GUIDE.md]] §1.3 |
| Composant de plus de ~250 lignes sans justification | Seuil CI indicatif ([[CODING_STANDARDS.md]] §6) | [[CODING_STANDARDS.md]] §6 |
| Styles codés en dur (couleur hex, espacement en pixels bruts hors design tokens) | Règle ESLint personnalisée interdisant les valeurs Tailwind arbitraires non listées dans les tokens ([[DESIGN_SYSTEM_ARCHITECTURE.md]] §1) | [[PROJECT_CHARTER.md]] §3.4 |
| Dépendance ajoutée sans passer les critères | Revue de PR obligatoire sur tout ajout de `package.json` | [[ENGINEERING_GUIDE.md]] §2.1 |
| Optimisation prématurée non mesurée | Revue de PR — toute optimisation doit citer un budget dépassé ou un profilage | [[ENGINEERING_GUIDE.md]] §1.4 |
| Effet de bord caché dans un hook ou un sélecteur (mutation d'un état externe pendant un rendu) | Règle ESLint `react-hooks/exhaustive-deps` + revue de code | [[ARCHITECTURE_PRINCIPLES.md]] §6 |
| Hook multi-responsabilités (un seul hook qui gère à la fois la donnée serveur, l'état local ET un effet de bord réseau) | Revue de code — un hook nommé `useX` dont le corps dépasse une seule responsabilité clairement identifiable au nom | [[CODING_STANDARDS.md]] §4.2 |
| Fichier `utils.ts` fourre-tout (fonctions sans rapport thématique regroupées par commodité) | Revue de code — un fichier `utils/` doit être nommé par domaine (`formatDuration.ts`, jamais `helpers.ts` générique) | [[CODING_STANDARDS.md]] §4.5 |
| Import traversant une frontière de couche/package interdite | Détection automatique par la résolution de module (frontières de package, [[ARCHITECTURE.md]] §2) + linter d'architecture | [[ARCHITECTURE_PRINCIPLES.md]] §7 |
| `TODO` sans ticket de dette technique référencé | Revue de code, rappelé dans [[DEFINITION_OF_DONE.md]] | [[ENGINEERING_GUIDE.md]] §3.3 |
| Type `any` non justifié | Règle ESLint `@typescript-eslint/no-explicit-any` (erreur, pas avertissement) | [[TECH_STACK.md]] §1 |
| Composant de présentation (`@melodia/ui`) appelant `@melodia/core` directement | Détection automatique par la résolution de module (frontière de package) | [[ARCHITECTURE.md]] §2, [[DESIGN_SYSTEM_ARCHITECTURE.md]] §3 |
| Donnée serveur copiée dans un store Zustand au lieu de rester dans TanStack Query | Revue de code — aucun outil ne détecte cette confusion automatiquement | [[ARCHITECTURE_PRINCIPLES.md]] §4 |

## 3. Mécanismes d'enforcement — résumé

- **Automatique (bloquant en CI)** : voir [[QUALITY_GATES.md]] pour la liste complète des gates mécaniques.
- **Revue de code (humain)** : tout ce que l'automatisation ne peut pas fiablement détecter (duplication sémantique, hook multi-responsabilités, nommage) — la revue de code n'est donc pas une formalité mais le dernier filet pour la moitié de cette liste, cohérent avec [[ENGINEERING_GUIDE.md]] §1.10.

---

## 4. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | CTO / Principal Software Architect |

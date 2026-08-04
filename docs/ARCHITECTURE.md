# ARCHITECTURE.md — Architecture concrète du dépôt (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Principal Software Architect
> **Documents liés** : [[ARCHITECTURE_PRINCIPLES.md]], [[CODING_STANDARDS.md]], [[STACK_DECISIONS.md]] §3

Ce document rend **concrète et implémentable** l'architecture en couches déjà décidée dans [[ARCHITECTURE_PRINCIPLES.md]] (UI / Domain / Data / Platform) et l'organisation Feature-Driven déjà décidée dans [[CODING_STANDARDS.md]] §1, en les projetant dans la structure de monorepo retenue dans [[STACK_DECISIONS.md]] §3 (pnpm workspaces + Turborepo). Il ne redéfinit ni les principes ni les conventions de nommage — voir ces documents pour le « pourquoi ».

---

## 1. Arborescence complète du monorepo

```
melodia/
├── apps/
│   ├── web/                    # Build Web/PWA (Vite, config du service worker)
│   │   ├── vite.config.ts
│   │   └── src/main.tsx        # point d'entrée web, monte @melodia/app
│   ├── desktop/                 # Shell Tauri Desktop
│   │   ├── src-tauri/
│   │   └── tauri.conf.json
│   └── mobile/                  # Shell Tauri Mobile (iOS/Android)
│       ├── src-tauri/
│       └── tauri.mobile.conf.json
│
├── packages/
│   ├── app/                     # L'application React (voir CODING_STANDARDS.md §1 pour le détail interne)
│   │   └── src/
│   │       ├── app/             # bootstrap, routage racine, providers globaux
│   │       ├── features/        # player/, library/, playlists/, search/, settings/
│   │       └── shared/ui        # ré-exports depuis @melodia/ui, pas de composants dupliqués ici
│   │
│   ├── core/                    # Couche Domain + Data (voir ARCHITECTURE_PRINCIPLES.md)
│   │   └── src/
│   │       ├── entities/        # Track, Album, Artist, Playlist (types de domaine partagés)
│   │       ├── data/             # MusicSource, LocalStore (interfaces + implémentations)
│   │       │   ├── sources/JellyfinSource.ts
│   │       │   ├── stores/SqliteStore.ts
│   │       │   └── stores/IndexedDbStore.ts
│   │       └── search/           # index FlexSearch (voir DATA_LAYER.md §3)
│   │
│   ├── ui/                       # Design system propriétaire (voir DESIGN_SYSTEM_ARCHITECTURE.md)
│   │   └── src/components/
│   │
│   ├── platform/                 # Abstraction Tauri / navigateur (voir ARCHITECTURE_PRINCIPLES.md §7)
│   │   └── src/
│   │
│   └── config/                   # Config partagée : tsconfig de base, ESLint, Tailwind preset
│
├── docs/                          # Cette documentation
└── turbo.json / pnpm-workspace.yaml
```

**Correspondance avec [[CODING_STANDARDS.md]] §1** : l'arborescence Feature-Driven définie en Phase 0 (`features/`, `entities/`, `shared/`, `data/`, `platform/`) ne change pas de forme — elle se répartit simplement entre `packages/app/src/` (features, UI applicative) et `packages/core/src/` (entities, data) plutôt que de vivre dans un unique `src/` racine. Un amendement de renvoi a été ajouté à [[CODING_STANDARDS.md]] pour refléter ce nichage (voir son historique de révisions).

---

## 2. Rôle de chaque package

| Package | Contient | Peut dépendre de | Ne doit jamais dépendre de |
|---|---|---|---|
| `@melodia/core` | Domain + Data (entités, `MusicSource`, `LocalStore`, index de recherche) | `@melodia/platform` (interfaces uniquement) | `@melodia/app`, `@melodia/ui` |
| `@melodia/ui` | Design system, composants purement présentationnels | rien d'interne au projet (uniquement Radix/Tailwind) | `@melodia/core`, `@melodia/app` |
| `@melodia/platform` | Abstraction Tauri/navigateur (fenêtrage, notifications, fichiers) | rien d'interne | `@melodia/app`, `@melodia/core`, `@melodia/ui` |
| `@melodia/app` | Features, routage, assemblage de l'application | `@melodia/core`, `@melodia/ui`, `@melodia/platform` | rien (c'est le sommet du graphe) |
| `apps/web`, `apps/desktop`, `apps/mobile` | Uniquement le point d'entrée et la config de build/packaging par cible | `@melodia/app` | toute logique métier (aucune logique ne doit vivre dans `apps/*`) |

Cette table est la version concrète, vérifiable par les outils, de la règle de frontières définie dans [[ARCHITECTURE_PRINCIPLES.md]] §7 — désormais imposée non seulement par le linter d'architecture mais par les frontières réelles de packages npm (un import illégal casse la résolution de module, pas seulement une règle de lint contournable).

**Pourquoi `@melodia/core` plutôt que d'appeler ce package `domain` et `data` séparément** : au stade actuel, séparer Domain et Data en deux packages distincts ajouterait une frontière de package pour un besoin qui n'existe pas encore (aucun consommateur externe de la seule couche Domain sans la couche Data) — cohérent avec [[ENGINEERING_GUIDE.md]] §1.1, ne pas sur-concevoir. La séparation logique Domain/Data reste appliquée **à l'intérieur** de `@melodia/core` (dossiers distincts, règle de dépendance interne identique à celle d'[[ARCHITECTURE_PRINCIPLES.md]] §7), prête à être scindée en deux packages si un besoin réel apparaît (ex. un SDK public consommant Domain sans Data, voir [[ROADMAP.md]] Phase 3).

---

## 3. Conventions d'import et alias au niveau monorepo

- Chaque package est consommé via son nom de package (`@melodia/core`, `@melodia/ui`, `@melodia/platform`), jamais via un chemin relatif traversant la frontière d'un autre package (`../../../packages/core/src/...` interdit, détecté par la résolution de module elle-même).
- À l'intérieur d'un package, les alias définis dans [[CODING_STANDARDS.md]] §3 restent inchangés (`@features/*`, `@entities/*`, etc., résolus relativement à la racine de `packages/app` ou `packages/core` selon le package).
- `packages/config` fournit un `tsconfig.base.json`, une configuration ESLint partagée et un preset Tailwind, étendus par chaque package — jamais dupliqués (cohérent avec [[ENGINEERING_GUIDE.md]] §1.3).

## 3bis. Matrice de dépendance au niveau module (ajout Phase 12)

> Le tableau §2 fixe les frontières entre **packages** (`@melodia/core`, `@melodia/ui`...). Cette section descend d'un niveau : quelles **features** (à l'intérieur de `packages/app/src/features/`, voir [[MODULES.md]] pour la liste complète) peuvent s'importer entre elles.

| Feature | Peut importer | Ne doit jamais importer directement |
|---|---|---|
| `player` | `@melodia/core`, `queue` (surface publique uniquement) | `library`, `search`, `settings` — un changement de piste passe par un événement applicatif typé ([[CODING_STANDARDS.md]] §4.8), jamais un import direct de leur état interne |
| `queue` | `@melodia/core` | Toute feature d'affichage (`library`, `search`) — la file ne connaît que des identifiants de domaine, jamais un composant de présentation d'une autre feature |
| `library`, `albums`, `artists`, `tracks` | `@melodia/core`, `@melodia/ui` | `player`, `queue` (la bibliothèque n'a pas besoin de connaître l'état de lecture pour s'afficher — le statut « en cours de lecture » lui est fourni par un sélecteur dérivé, [[DATA_LAYER.md]] §1, jamais une dépendance directe) |
| `downloads`, `cache`, `sync` | `@melodia/core`, `@melodia/platform` | Toute feature d'affichage — ce sont des modules de fond, jamais consommateurs directs de `library`/`player` |
| `search` | `@melodia/core` (index FlexSearch) | `library` (les résultats de recherche réutilisent les mêmes composants de carte via `@melodia/ui`, jamais en importent la logique depuis `library` directement) |
| `statistics` | `@melodia/core` (historique local) | `player`, `queue` en temps réel — les statistiques consomment un flux d'événements déjà enregistré, jamais l'état de lecture actif directement |
| `settings`, `themes`, `notifications` | `@melodia/core`, `@melodia/platform` | Toute feature métier (`library`, `player`) — ce sont des modules transverses consommés, jamais consommateurs |
| `diagnostics`, `developer`, `labs` | Toutes les autres features, en **lecture seule** (métriques exposées, jamais un import de leur logique interne) | — seules features autorisées à observer transversalement, jamais à agir directement sur l'état d'une autre feature |

**Règle générale** : cohérente avec [[CODING_STANDARDS.md]] §1 déjà acté — une feature n'importe jamais l'intérieur d'une autre feature, uniquement sa surface publique (`index.ts`) ou un événement applicatif typé. Le tableau ci-dessus rend explicite, feature par feature, ce que cette règle générale signifie concrètement — détectable par le même linter d'architecture (`eslint-plugin-boundaries`) déjà configuré.

---

## 4. Ce que cette structure ne fait pas encore

Conformément à [[ARCHITECTURE_PRINCIPLES.md]] §8 (préparer sans sur-construire) : aucun de ces packages n'est publié séparément sur un registre npm en Phase 1. La frontière de package sert la clarté architecturale et prépare une extraction future (`@melodia/ui` publiable, `@melodia/core` comme base d'un SDK public — voir [[ROADMAP.md]] Phase 3), sans que cette publication soit construite maintenant.

---

## 5. Checklist de validation

- [ ] L'arborescence monorepo est cohérente avec [[CODING_STANDARDS.md]] §1 (amendement de nichage).
- [ ] Le tableau des frontières de packages (§2) ne contredit pas [[ARCHITECTURE_PRINCIPLES.md]] §7.
- [ ] Les risques propres au monorepo sont couverts dans [[RISK_REGISTER_TECHNICAL.md]] §1.
- [ ] L'évolutivité vers un SDK/plugins publiés depuis `@melodia/core` est cohérente avec [[EVOLVABILITY.md]] §8-10.

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | Principal Software Architect |
| 0.2.0 | 2026-08-03 | Ajout de la checklist de validation et des renvois vers les documents du complément Phase 0.5 | Principal Software Architect |
| 0.3.0 | 2026-08-04 | Phase 12 : ajout §3bis (matrice de dépendance au niveau module/feature) — au lieu de créer DEPENDENCY_RULES.md en doublon | Principal Software Architect |

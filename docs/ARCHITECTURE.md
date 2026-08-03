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

---

## 4. Ce que cette structure ne fait pas encore

Conformément à [[ARCHITECTURE_PRINCIPLES.md]] §8 (préparer sans sur-construire) : aucun de ces packages n'est publié séparément sur un registre npm en Phase 1. La frontière de package sert la clarté architecturale et prépare une extraction future (`@melodia/ui` publiable, `@melodia/core` comme base d'un SDK public — voir [[ROADMAP.md]] Phase 3), sans que cette publication soit construite maintenant.

---

## 5. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | Principal Software Architect |

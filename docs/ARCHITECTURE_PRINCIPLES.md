# ARCHITECTURE_PRINCIPLES.md — Principes d'architecture

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Lead Software Architect
> **Documents liés** : [[PROJECT_CHARTER.md]], [[ENGINEERING_GUIDE.md]], [[TECH_STACK.md]], [[CODING_STANDARDS.md]]

Ce document décrit l'architecture système de Melodia : comment les couches s'articulent, où passent les frontières, et pourquoi. Il ne traite pas des choix de bibliothèques (voir [[TECH_STACK.md]]) ni des conventions de fichiers (voir [[CODING_STANDARDS.md]]), mais des invariants structurels qui doivent survivre à tout changement de bibliothèque ou de convention.

---

## 1. Vue d'ensemble : un cœur, trois cibles

Melodia est architecturé comme **une seule application** (un cœur de code partagé) déployée sur **trois cibles** (Web/PWA, Desktop, Mobile) via un runtime unifié (Tauri — voir [[TECH_STACK.md]] §1 pour la justification complète).

```
┌─────────────────────────────────────────────────────────┐
│                      UI Layer (React)                    │
│   Composants, pages/routes, design system, animations    │
├─────────────────────────────────────────────────────────┤
│                     Domain Layer                         │
│  Modèles métier, logique de lecture, règles de playlist, │
│  état applicatif (player, queue, préférences)             │
├─────────────────────────────────────────────────────────┤
│                      Data Layer                           │
│  Repositories (interfaces) + implémentations              │
│  ┌───────────────────┐    ┌───────────────────────────┐  │
│  │ Source distante    │    │ Persistance locale         │  │
│  │ (MusicSource iface) │    │ (LocalStore iface)         │  │
│  │  → JellyfinSource   │    │  → SqliteStore (natif)     │  │
│  │  → (futur: autre)   │    │  → IndexedDbStore (web)    │  │
│  └───────────────────┘    └───────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│              Platform Shell (Tauri / Navigateur)          │
│   Fenêtrage, notifications OS, MediaSession, fichiers      │
└─────────────────────────────────────────────────────────┘
```

**Règle absolue** : aucune couche ne connaît les détails d'implémentation de la couche située sous elle, uniquement son interface. La couche UI ne connaît jamais Jellyfin. La couche Domain ne connaît jamais SQLite ni IndexedDB.

---

## 2. Abstraction de la source de données

### 2.1 L'interface `MusicSource`
Toute donnée provenant d'un serveur externe transite par une interface `MusicSource` définie dans la couche Data, indépendante de tout vocabulaire Jellyfin. Exemple de forme (illustratif, pas une spécification finale d'implémentation) :

```
MusicSource {
  getLibraries(): Library[]
  getArtists(libraryId): Artist[]
  getAlbums(artistId): Album[]
  getTracks(albumId): Track[]
  search(query): SearchResult
  getStreamUrl(trackId): StreamDescriptor
  ...
}
```

`JellyfinSource` est **une** implémentation de `MusicSource`, pas une extension de celle-ci. Les modèles retournés (`Track`, `Album`, `Artist`, `Playlist`) sont des types internes à Melodia, mappés depuis la réponse Jellyfin — jamais les types bruts de l'API Jellyfin propagés tels quels au-delà de la couche Data.

**Pourquoi** : c'est la garantie technique de l'objectif d'évolutivité de la charte ([[PROJECT_CHARTER.md]] §3.9 et §4 *Ce que Melodia n'est pas*, dépendance à une API unique). Un changement de version de l'API Jellyfin, ou l'ajout d'un second connecteur, se traduit par une modification confinée à l'implémentation `JellyfinSource`, jamais par une modification de la couche Domain ou UI.

### 2.2 Mapping et normalisation
Le mapping Jellyfin → modèles internes est un module dédié et testé isolément (tests de contrat, voir [[PROJECT_CHARTER.md]] §5 registre des risques). Toute incohérence ou absence de champ côté Jellyfin est normalisée à ce niveau (valeurs par défaut explicites, jamais de `null` propagé silencieusement dans la couche Domain).

### 2.3 Ce que cette abstraction n'est pas
Elle n'est pas un prétexte à une architecture « plugin » complète dès la Phase 0 (voir [[ENGINEERING_GUIDE.md]] §1.9 — évolutivité sans sur-conception). Un seul connecteur (`JellyfinSource`) est implémenté initialement ; l'interface est conçue pour qu'un second connecteur soit possible, pas pour qu'il soit trivial dès le premier jour.

---

## 3. Abstraction de la persistance locale

### 3.1 L'interface `LocalStore`
Le cache hors ligne (métadonnées, files d'attente, pistes téléchargées, préférences) passe par une interface `LocalStore`, avec deux implémentations dictées par la cible d'exécution :
- **`SqliteStore`** — Desktop et Mobile (via le plugin SQL de Tauri), moteur unique et cohérent sur les deux cibles natives.
- **`IndexedDbStore`** — Web/PWA pur (navigateur sans shell Tauri), via Dexie.js.

**Pourquoi deux implémentations plutôt qu'une seule** : un navigateur web n'a pas accès à un fichier SQLite natif sans WASM (surcoût de poids et de performance non justifié pour le cas PWA — voir [[PERFORMANCE_BUDGET.md]]). Le choix est fait au niveau de la couche Data, sélectionné à l'initialisation selon la plateforme détectée ; le reste de l'application ne voit que `LocalStore`.

### 3.2 Schéma et migrations
Le schéma de `LocalStore` est versionné explicitement. Toute migration est un module testé isolément, appliqué de façon idempotente au démarrage. Aucune migration destructive sans étape de sauvegarde préalable des données locales.

### 3.3 Stratégie de synchronisation
La synchronisation entre serveur et cache local suit une stratégie *pull* déclenchée (ouverture d'app, action explicite, intervalle configurable) — pas de synchronisation temps réel bidirectionnelle en Phase 0. Les conflits (ex. état de lecture modifié sur deux appareils hors ligne) sont résolus par horodatage (dernier écrit gagne), avec conservation d'un historique court permettant une restauration manuelle. Cette stratégie fera l'objet d'un ADR dédié avant implémentation (voir [[PROJECT_CHARTER.md]] §5, risque de synchronisation).

---

## 4. Architecture d'état applicatif

Deux natures d'état sont explicitement distinguées et ne doivent jamais être mélangées dans le même store :

### 4.1 État serveur (« server state »)
Toute donnée dont la source de vérité est distante (bibliothèque musicale, métadonnées, playlists serveur). Géré par une couche de cache dédiée aux données serveur (voir [[TECH_STACK.md]] §1, TanStack Query), avec invalidation, re-fetch en arrière-plan et déduplication de requêtes gérées par cette couche, jamais réimplémentées à la main.

### 4.2 État client (« client/UI state »)
Tout état dont la source de vérité est locale et éphémère ou persistée localement (lecture en cours, file d'attente, volume, thème, préférences d'affichage). Géré par un store client léger (voir [[TECH_STACK.md]] §1, Zustand).

**Pourquoi cette séparation** : conflater les deux (pattern historique Redux « tout dans un store global ») oblige à réimplémenter manuellement cache, invalidation et synchronisation réseau — source majeure de bugs de fraîcheur de données dans les applications à données distantes. La séparation est un invariant d'architecture, pas un détail d'implémentation : un module Domain qui a besoin d'une donnée serveur passe par la couche server-state, jamais par une copie locale dupliquée dans le store client.

---

## 5. Moteur audio : architecture en couches

1. **Socle de compatibilité** : élément `<audio>` HTML natif + MediaSession API pour les contrôles OS (verrouillage d'écran, casque, raccourcis clavier média). Garantit la lecture sur 100 % des cibles, y compris en dégradé.
2. **Couche d'enrichissement** : Web Audio API branchée sur l'élément `<audio>` via `MediaElementAudioSourceNode`, activée seulement quand les fonctionnalités avancées sont utilisées (égaliseur, crossfade, lecture sans interruption via double buffer, visualiseur).
3. **Règle de dégradation** : si Web Audio API n'est pas disponible ou échoue à s'initialiser, l'application retombe sur le socle sans jamais interrompre la lecture — l'utilisateur perd une fonctionnalité avancée, jamais le son.

**Pourquoi** : c'est le principe de dégradation progressive appliqué à l'audio — la lecture est la fonctionnalité la plus critique du produit (voir [[PROJECT_CHARTER.md]] §3.3, objectifs UX) et ne doit jamais être l'otage d'une fonctionnalité avancée.

---

## 6. Composition plutôt qu'héritage — application concrète

- Les composants UI composent des primitives accessibles (Radix UI) plutôt que d'hériter d'une classe de composant de base.
- La logique métier réutilisable est exprimée en hooks composables (`useQueue`, `usePlaybackState`) plutôt qu'en classes de service héritées.
- Les variantes de comportement (ex. `JellyfinSource` vs un futur connecteur) sont des implémentations d'interface, jamais des sous-classes d'une classe de base partielle.

---

## 7. Frontières de module et dépendances autorisées

Règle de dépendance stricte, vérifiée en CI (analyse statique des imports) :

```
UI          → peut importer Domain, jamais Data directement
Domain      → peut importer Data (interfaces uniquement, jamais les implémentations concrètes)
Data        → ne peut importer ni UI ni Domain
Platform    → exposé à Data et Domain via une interface d'injection, jamais importé en dur dans UI
```

Une violation de cette règle (ex. un composant UI qui importe `JellyfinSource` directement) est bloquante en revue de code et signalée par le linter d'architecture (voir [[CODING_STANDARDS.md]]).

---

## 8. Extensibilité long terme : ce que l'architecture prépare, sans l'implémenter

En cohérence avec [[ENGINEERING_GUIDE.md]] §1.9, les interfaces suivantes sont conçues dès la Phase 0 pour ne pas bloquer une évolution future, **sans que celle-ci soit construite maintenant** :
- Un second connecteur `MusicSource` (ex. Subsonic/Navidrome) — voir §2.
- Un système de plugins pour l'UI (points d'extension identifiés, non implémentés avant la Phase 3 — voir [[ROADMAP.md]]).
- Une API publique exposant la couche Domain à des clients tiers.

Ces trois axes sont des critères de conception (« est-ce que cette interface bloquerait cet usage futur ? »), pas des tickets de développement actuels.

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0) | Lead Software Architect |

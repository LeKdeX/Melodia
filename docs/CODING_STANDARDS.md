# CODING_STANDARDS.md — Standards de code

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Principal Frontend Engineer
> **Documents liés** : [[ARCHITECTURE_PRINCIPLES.md]], [[ENGINEERING_GUIDE.md]], [[DEFINITION_OF_DONE.md]]

Ce document définit à quoi ressemble le code de Melodia au quotidien : nommage, organisation de fichiers, structure des unités de code. Il matérialise en conventions concrètes les principes définis dans [[ENGINEERING_GUIDE.md]] et les frontières définies dans [[ARCHITECTURE_PRINCIPLES.md]].

---

## 1. Organisation des dossiers — architecture Feature-Driven

```
src/
  app/                  # bootstrap, routage racine, providers globaux
  features/             # une feature = un domaine produit autonome
    player/
      components/
      hooks/
      store/
      services/
      types.ts
      constants.ts
      index.ts          # surface publique de la feature
    library/
    playlists/
    search/
    settings/
  entities/             # modèles de domaine partagés entre features (Track, Album, Artist)
  shared/
    ui/                 # design system (composants purement présentationnels)
    hooks/               # hooks génériques réutilisables, non liés à une feature
    utils/
    constants/
    types/
  data/                  # couche Data (voir ARCHITECTURE_PRINCIPLES.md) : sources, repositories, LocalStore
  platform/              # abstraction Tauri / navigateur (voir ARCHITECTURE_PRINCIPLES.md §7)
```

**Règle** : une `feature` ne peut jamais importer directement l'intérieur d'une autre `feature` — uniquement son `index.ts` (surface publique). Une violation est bloquée par le linter d'architecture (`eslint-plugin-boundaries` ou équivalent configuré en CI).

**Pourquoi Feature-Driven plutôt que par type technique (`components/`, `hooks/`, `store/` à plat)** : à l'échelle visée (plusieurs contributeurs, plusieurs années), grouper par domaine produit rend la suppression ou l'extraction d'une fonctionnalité triviale (un dossier), et limite le couplage accidentel entre fonctionnalités non liées. C'est l'application directe du principe de frontières de module ([[ARCHITECTURE_PRINCIPLES.md]] §7) au niveau du système de fichiers.

---

## 2. Conventions de nommage

| Élément | Convention | Exemple |
|---|---|---|
| Composants React | `PascalCase` | `TrackListItem.tsx` |
| Hooks | `camelCase`, préfixe `use` | `usePlaybackQueue.ts` |
| Stores (Zustand) | `camelCase`, suffixe `Store` | `playerStore.ts` |
| Services (Data layer) | `PascalCase`, suffixe explicite du rôle | `JellyfinSource.ts`, `SqliteStore.ts` |
| Types / Interfaces | `PascalCase`, pas de préfixe `I` | `Track`, `MusicSource` |
| Enums | `PascalCase` pour le type, `PascalCase` pour les membres | `enum PlaybackState { Playing, Paused, Buffering }` |
| Constantes | `SCREAMING_SNAKE_CASE` pour les constantes globales immuables | `MAX_QUEUE_SIZE` |
| Fichiers utilitaires | `camelCase` | `formatDuration.ts` |
| Événements applicatifs | `domaine.action` en `camelCase` | `player.trackChanged`, `library.syncCompleted` |
| Tests | même nom que le fichier testé, suffixe `.test.ts(x)` | `usePlaybackQueue.test.ts` |

**Règle générale** : le nom doit permettre de déduire le rôle sans ouvrir le fichier. Un nom qui nécessite un commentaire d'explication est un nom à revoir (voir [[ENGINEERING_GUIDE.md]] §1.6, explicite plutôt qu'astucieux).

---

## 3. Imports et alias

- Alias configurés par couche, jamais de chemins relatifs remontant plus d'un niveau (`../../../` interdit, détecté en lint) :
  - `@app/*`, `@features/*`, `@entities/*`, `@shared/*`, `@data/*`, `@platform/*`
- Ordre d'import imposé (auto-fixé par ESLint) : bibliothèques externes → alias internes par couche (de `@data` vers `@app`) → imports relatifs locaux.
- Les imports de type (`import type`) sont systématiquement séparés des imports de valeur pour clarifier ce qui disparaît à la compilation.

---

## 4. Structure des unités de code

### 4.1 Composants
- Un composant = un fichier. Un composant qui dépasse ~200 lignes est un signal de décomposition à envisager (seuil indicatif, pas bloquant seul — voir §6).
- Props typées explicitement via une interface `ComponentNameProps`, jamais de `any`, jamais de props en éventail non structuré (préférer un objet de configuration à 5+ props booléennes indépendantes — voir [[ENGINEERING_GUIDE.md]] §1.8).
- Aucune logique métier dans un composant de présentation (`shared/ui`) : uniquement des props et des callbacks.

### 4.2 Hooks
- Un hook encapsule un comportement complet et testable indépendamment du rendu.
- Un hook ne retourne jamais un objet dont la forme change selon des branches conditionnelles internes (rend le typage et l'usage imprévisibles — voir [[ENGINEERING_GUIDE.md]] §1.7, API prévisibles).

### 4.3 Stores (Zustand)
- Un store par domaine d'état client (ex. `playerStore`, `queueStore`, `preferencesStore`), jamais un store fourre-tout global.
- Les actions du store sont des fonctions nommées explicitement à l'impératif (`play()`, `pause()`, `seekTo(position)`), jamais de mutation directe exposée à l'extérieur du store.

### 4.4 Services (Data layer)
- Un service implémente une interface définie dans `data/` (ex. `MusicSource`, `LocalStore` — voir [[ARCHITECTURE_PRINCIPLES.md]]).
- Un service ne lève jamais d'exception non typée : les erreurs attendues (réseau, authentification, absence de résultat) sont des valeurs de retour typées (`Result<T, MusicSourceError>` ou équivalent), réservant les exceptions aux cas réellement exceptionnels.

### 4.5 Utils
- Fonctions pures uniquement, sans effet de bord, sans dépendance à un état global. Une fonction utilitaire qui a besoin d'un état global n'est pas un util — c'est un hook ou un service mal placé.

### 4.6 Constantes
- Regroupées par domaine (`shared/constants/playback.ts`), jamais de constante magique inline dans la logique métier.

### 4.7 Types et énumérations
- Les types de domaine partagés vivent dans `entities/`, jamais dupliqués localement dans une feature.
- Préférer une union de types littéraux (`type PlaybackState = 'playing' | 'paused' | 'buffering'`) à un enum TypeScript quand aucune valeur numérique ni itération n'est nécessaire — évite l'artefact de compilation superflu d'un enum classique.

### 4.8 Événements
- Les événements applicatifs inter-features (ex. changement de piste notifié à un module d'analytics futur) suivent une convention `domaine.action` et sont typés de bout en bout (payload typé, jamais `unknown` non affiné côté consommateur).

---

## 5. Documentation dans le code

Conforme à [[ENGINEERING_GUIDE.md]] §1.5 : commentaires réservés aux décisions non triviales. TSDoc obligatoire sur toute fonction exportée depuis la surface publique d'une feature (`index.ts`) ou d'un module `data/`/`entities/` — pas sur les fonctions internes privées dont le nom suffit.

---

## 6. Seuils de complexité (indicatifs, vérifiés en CI)

| Métrique | Seuil d'alerte | Action |
|---|---|---|
| Longueur de fichier | 250 lignes | Revue de décomposition recommandée |
| Complexité cyclomatique par fonction | 10 | Refactorisation recommandée en revue |
| Profondeur d'imbrication | 4 niveaux | Extraction de fonction recommandée |

Un dépassement n'est pas automatiquement bloquant mais doit être justifié explicitement en revue de PR (voir [[DEFINITION_OF_DONE.md]]) ou faire l'objet d'un ticket de dette technique (voir [[ENGINEERING_GUIDE.md]] §3).

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0) | Principal Frontend Engineer |

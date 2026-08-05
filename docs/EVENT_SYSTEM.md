# EVENT_SYSTEM.md — Architecture d'événements applicatifs (Architecture d'état)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal State Management Architect
> **Documents liés** : [[CODING_STANDARDS.md]] §4.8, [[ARCHITECTURE.md]] §3bis, [[STORE_SPECIFICATIONS.md]]

[[CODING_STANDARDS.md]] §4.8 a déjà posé la convention de nommage (`domaine.action`, typé de bout en bout). Ce document répond à ce qui manquait : **quand un événement est le bon mécanisme, quand il ne l'est jamais**, et la liste des événements réels du système — sans redécider la convention de nommage elle-même.

---

## 1. Quand utiliser un événement

Un événement applicatif est justifié quand **plusieurs modules non liés hiérarchiquement doivent réagir à un changement sans se connaître les uns les autres** — c'est le seul mécanisme qui respecte la règle déjà actée qu'une feature n'importe jamais l'intérieur d'une autre ([[ARCHITECTURE.md]] §3bis). Exemple : un changement de piste doit notifier `discord-rich-presence` (futur), le module de notifications système, et le module diagnostics — aucun de ces trois consommateurs ne doit être connu par `player` au moment où l'événement est émis.

## 2. Quand ne jamais utiliser un événement

- **Communication entre un store et son propre hook consommateur** — c'est un abonnement Zustand standard, jamais un événement (un événement ajouterait une indirection sans bénéfice).
- **Une action qui n'a qu'un seul consommateur connu à l'avance** — un appel de fonction direct est plus simple, plus traçable en débogage, et suffisant (cohérent avec KISS, [[ARCHITECTURE_PRINCIPLES.md]] §8bis). Créer un événement pour un seul consommateur est une sur-ingénierie.
- **Une donnée qui doit être lue de façon synchrone avant de continuer** — un événement est par nature asynchrone/fire-and-forget ; une lecture synchrone passe par un sélecteur ([[SELECTOR_GUIDE.md]]) ou un appel direct, jamais un événement.

## 3. Catégories d'événements

| Catégorie | Exemples | Émetteur | Consommateurs typiques |
|---|---|---|---|
| Player Events | Voir §3bis (catalogue complet) | `playerStore`, `queueStore`, Playback Engine ([[PLAYBACK_ENGINE.md]]) | `statistics` (enregistrement d'écoute), `notifications`, `diagnostics`, `themes` |
| Sync Events | `sync.cycleCompleted`, `sync.conflictDetected` | [[SYNC_ENGINE_SPECIFICATION.md]] | `notifications`, `diagnostics`, `logging` |
| Download Events | `download.completed`, `download.failed` | `downloadStore` | `notifications`, `library` (rafraîchissement du badge « téléchargé ») |
| Search Events | Voir §3ter (catalogue complet) | [[DATA_LAYER.md]] §3 (Worker), [[INDEX_ENGINE.md]] | `search`, `library` (badge de statut d'indexation) |
| Theme Events | `theme.extracted` | [[DYNAMIC_THEME_GUIDE.md]] | `themeStore` uniquement — pas d'autre consommateur identifié à ce jour |
| Server Events | `server.reconnected`, `server.versionMismatch` | [[JELLYFIN_INTEGRATION.md]] | `sync`, `notifications`, `diagnostics` |
| Notification Events | `notification.dismissed` | `notificationStore` | `statistics` (taux d'engagement, si jamais mesuré localement) |
| Navigation Events | *(aucun — voir §4)* | — | — |

## 3bis. Catalogue complet des Player Events (ajout Moteur Audio)

> Émis exclusivement par le Playback Engine ([[PLAYBACK_ENGINE.md]]) ou le Playback Controller ([[PLAYBACK_CONTROLLER.md]] §4) — jamais par un composant UI ou directement par `playerStore`/`queueStore` (qui les consomment, ne les émettent pas).

| Événement | Déclenché quand | Payload (forme abrégée) |
|---|---|---|
| `player.trackStarted` | Transition vers `Playing` pour une nouvelle piste ([[PLAYBACK_STATE_MACHINE.md]] §2) | `{ trackId }` |
| `player.trackEnded` | Transition vers `Ended` ([[PLAYBACK_STATE_MACHINE.md]] §1) | `{ trackId, listenedDurationMs }` — consommé par `statistics` ([[AUDIO_ENGINE.md]] §9) |
| `player.trackChanged` | Toute nouvelle piste chargée, qu'elle démarre immédiatement ou non | `{ trackId, previousTrackId }` |
| `player.paused` | Transition vers `Paused` | `{ positionMs }` |
| `player.resumed` | Transition `Paused → Playing` | `{ positionMs }` |
| `player.seeking` | Transition vers `Seeking` | `{ fromMs, toMs }` |
| `player.buffering` | Transition vers `Buffering` | `{ trackId }` |
| `queue.changed` | Toute modification de la file (ajout/suppression/réorganisation, [[AUDIO_ENGINE.md]] §1bis) | `{ queueSnapshot }` |
| `player.volumeChanged` | Commande `SET_VOLUME`/`MUTE` appliquée ([[COMMAND_API.md]]) | `{ level, muted }` |
| `device.changed` | Commande `SET_OUTPUT_DEVICE` appliquée ou bascule automatique ([[PLAYBACK_DEVICES.md]] §7bis) | `{ deviceId, automatic: boolean }` |
| `playback.error` | Transition vers `Error` ([[PLAYBACK_STATE_MACHINE.md]] §4) | `{ errorType, trackId }` — jamais le détail technique brut (cohérent avec [[SECURITY_GUIDELINES.md]] §8), consommé par `notifications` pour un message actionnable |

**Règle de nommage** : les événements liés au moteur de lecture utilisent le préfixe `player.`, ceux liés à la file `queue.`, ceux liés à la sortie audio `device.` — trois préfixes plutôt qu'un seul `player.*`, parce que ce sont trois domaines de responsabilité distincts ([[AUDIO_ENGINE.md]] §0bis.1 : Playback Engine, file, Media Adapter), cohérent avec la granularité déjà actée pour les autres catégories de ce document (§3).

## 3ter. Catalogue complet des Search Events (ajout Moteur de Recherche)

> Émis exclusivement par l'Index Engine ([[INDEX_ENGINE.md]]) ou le pipeline de requête ([[SEARCH_ENGINE.md]]) — jamais par `searchStore` lui-même (qui les consomme).

| Événement | Déclenché quand | Payload (forme abrégée) |
|---|---|---|
| `search.indexBuilding` | Début de la création d'index complet ([[INDEX_ENGINE.md]] §1) | `{ startedAt }` |
| `search.indexReady` | Fin de la création d'index complet, recherche locale pleinement disponible | `{ entryCounts }` |
| `search.indexUpdated` | Mise à jour incrémentale appliquée ([[INDEX_ENGINE.md]] §2) | `{ changedCount }` |
| `search.indexRebuilt` | Réindexation complète ou reconstruction terminée ([[INDEX_ENGINE.md]] §3, §6) | `{ reason: 'manual' \| 'schemaChange' \| 'corruption' }` |
| `search.queryExecuted` | Chaque requête utilisateur exécutée (texte non vide) | `{ query, resultCount, durationMs }` — `durationMs` alimente le suivi du budget < 50 ms ([[PERFORMANCE_BUDGET.md]] §2), jamais journalisé avec le texte de requête complet si celui-ci pouvait contenir une donnée saisie par erreur sensible (cohérent avec [[SECURITY_GUIDELINES.md]] §8) |
| `search.filtersChanged` | Combinaison de filtres modifiée ([[FILTER_ENGINE.md]] §2) | `{ activeFilters }` |
| `search.suggestionSelected` | Une suggestion (§3 de [[SUGGESTION_ENGINE.md]]) est choisie plutôt qu'une requête tapée manuellement | `{ suggestionType, entityId }` |

**Règle de nommage** : préfixe unique `search.` pour tout ce qui touche à l'index et à l'exécution de requête — contrairement aux Player Events (§3bis, trois préfixes pour trois couches distinctes), la recherche reste un seul domaine de responsabilité cohérent ([[SEARCH_ENGINE.md]] §0bis), un seul préfixe suffit.

## 4. Navigation Events — catégorie nommée par le cadrage mais non retenue

TanStack Router expose déjà ses propres hooks de changement de route ([[NAVIGATION_HISTORY.md]]) — dupliquer ce mécanisme avec un événement applicatif `navigation.changed` violerait la non-duplication ([[ENGINEERING_GUIDE.md]] §1.3). Un module qui a besoin de réagir à un changement de route consomme directement le hook du routeur, jamais un événement applicatif intermédiaire. Catégorie explicitement fermée plutôt que silencieusement omise.

## 5. Ce qu'un événement n'est jamais

- Un événement ne porte jamais de logique métier — uniquement un payload typé décrivant *ce qui s'est produit*, jamais *ce qu'il faut faire* (cohérent avec [[ARCHITECTURE_PRINCIPLES.md]] §6, composition plutôt qu'héritage — chaque consommateur décide de sa propre réaction).
- Un événement n'est jamais un substitut à une mutation TanStack Query — l'invalidation de cache suit ses propres règles ([[TANSTACK_QUERY_GUIDE.md]] §3), un événement peut la déclencher mais ne la remplace jamais.
- Un événement n'est jamais utilisé pour synchroniser deux stores entre eux — voir l'exception déjà actée pour `queueStore`/`playerStore` ([[STORE_SPECIFICATIONS.md]] §5, sélecteur composé, pas un événement).

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas la convention de nommage `domaine.action` (voir [[CODING_STANDARDS.md]] §4.8).
- Ne redéfinit pas les frontières de module (voir [[ARCHITECTURE.md]] §3bis).

## 7. Checklist de validation

- [ ] Tout nouvel événement proposé est d'abord vérifié contre §1-2 (plusieurs consommateurs non liés, pas une communication à consommateur unique).
- [ ] Aucun événement ne porte de logique métier, uniquement un payload descriptif (§5).
- [ ] Aucun événement `navigation.*` n'est créé (§4, catégorie fermée).

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Architecture d'état) | Principal State Management Architect |
| 1.1.0 | 2026-08-04 | Moteur Audio : ajout §3bis (catalogue complet des 10 Player Events) — au lieu de créer PLAYBACK_EVENTS.md en doublon | Playback Systems Engineer |
| 1.2.0 | 2026-08-04 | Moteur de Recherche : ajout §3ter (catalogue complet des 7 Search Events) — au lieu de créer SEARCH_EVENTS.md en doublon | Search Engine Engineer |

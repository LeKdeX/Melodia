# SEARCH_ENGINE.md — Constitution du moteur de recherche (Moteur de Recherche)

> **Statut** : document fondateur, vivant — capstone
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal Search Architect
> **Documents liés** : tous les documents listés en §2

Ce document est le point d'entrée du moteur de recherche de Melodia. Il ne redécide rien de ce que [[DATA_LAYER.md]] §3 et [[STACK_DECISIONS.md]] §2 ont déjà tranché (choix de FlexSearch, principe de recherche locale) — il en est la constitution complète et la carte vers les documents spécialisés.

---

## 0. Constitution

1. **Le moteur est indépendant de React** — testable entièrement sans monter un composant, cohérent avec le même principe déjà acté pour le moteur audio ([[AUDIO_ENGINE.md]] §0) et l'état applicatif ([[STATE_MANAGEMENT.md]] §1).
2. **Il travaille uniquement sur les données locales** — aucune requête réseau dans le chemin critique d'une recherche une fois la synchronisation initiale terminée ([[DATA_LAYER.md]] §3.3, repli serveur réservé au cas où l'index n'existe pas encore).
3. **Toutes les recherches sont instantanées** — budget de calcul moteur < 50 ms ([[PERFORMANCE_BUDGET.md]] §2, amendement de cette phase), quelle que soit l'échelle de bibliothèque (§0bis.3).
4. **Le moteur est tolérant aux fautes** — fuzzy, préfixe, accents, synonymes, multi-mots, partielle ([[DATA_LAYER.md]] §3.4-3.5) appliqués par défaut, jamais en mode optionnel à activer.
5. **Les résultats sont classés par pertinence** — pertinence textuelle toujours dominante ([[RANKING_ENGINE.md]] §1), jamais un facteur externe qui inverserait ce classement.
6. **Le moteur est extensible** — Compositeurs et Paroles préparés sans engagement ([[SEARCH_INDEX_SPECIFICATION.md]] §2), un second connecteur multi-serveurs préparé sans réécriture (§0bis.4).

## 0bis. Architecture en couches

### 0bis.1 Diagramme et responsabilités

```
IndexedDB / SQLite (LocalStore, DATABASE_SCHEMA.md)
   │  source de vérité des entités (Track, Album, Artist...)
   ↓
Index Builder (INDEX_ENGINE.md)
   │  construction/mise à jour incrémentale/réindexation, s'exécute en Worker
   ↓
Search Index (SEARCH_INDEX_SPECIFICATION.md)
   │  sept instances FlexSearch, une par type d'entité, sérialisées
   ↓
Search Engine (ce document + DATA_LAYER.md §3.4-3.5)
   │  exécution de requête : tolérance aux fautes, multi-mots, filtres (FILTER_ENGINE.md)
   ↓
Ranking Engine (RANKING_ENGINE.md)
   │  classement à deux niveaux : pertinence textuelle puis score composite
   ↓
Suggestion Engine (SUGGESTION_ENGINE.md)
   │  suggestions avant/pendant la saisie, indépendant du pipeline de requête validée
   ↓
UI (SearchField, Search Results — SEARCH_COMPONENTS.md)
```

| Couche | Peut dépendre de | Ne doit jamais dépendre de |
|---|---|---|
| Index Builder | `LocalStore`, Repositories ([[REPOSITORY_PATTERN.md]]) | React, UI |
| Search Index | Index Builder | Search Engine (l'index ne connaît jamais comment il est interrogé) |
| Search Engine | Search Index, Filter Engine | UI, Repositories directement (l'index est déjà la donnée résolue) |
| Ranking Engine | Search Engine (résultats bruts), `StatisticsRepository`/`HistoryRepository`/`FavoriteRepository` | UI |
| Suggestion Engine | Search Index (mode préfixe), `searchStore` ([[STORE_SPECIFICATIONS.md]] §2) | Ranking Engine (poids de popularité propre, [[SUGGESTION_ENGINE.md]] §3) |

### 0bis.2 Pourquoi 50 ms est atteignable — le budget imbriqué

[[PERFORMANCE_BUDGET.md]] §2 (amendement de cette phase) distingue le budget perçu (< 100 ms, inchangé depuis la Phase 0.5) du budget de calcul moteur seul (< 50 ms, nouveau). Ce document est l'engagement architectural qui rend ce second chiffre atteignable : index intégralement en mémoire ([[PERFORMANCE_GUIDE.md]] §5sexies), aucune I/O disque ni requête réseau dans le chemin critique (principe 2, §0), classement composite calculé sur un ensemble déjà réduit par le niveau 1 ([[RANKING_ENGINE.md]] §5). Les ~50 ms restants du budget perçu couvrent le rendu React, hors périmètre de ce document.

### 0bis.3 Tenue à l'échelle — 500 à 250 000 titres

Aucune branche conditionnelle dans le pipeline de requête ne dépend de la taille de la bibliothèque — la structure d'index FlexSearch offre une complexité de requête sous-linéaire par construction ([[STACK_DECISIONS.md]] §2, benchmarks déjà cités jusqu'à plusieurs centaines de milliers de documents). La différence entre 500 et 250 000 titres est donc absorbée par le moteur lui-même, jamais par une stratégie différente selon l'échelle détectée — cohérent avec la règle déjà actée qu'aucune détection a posteriori ne pilote une décision d'architecture ([[BUFFER_MANAGEMENT.md]] §1, même principe appliqué par analogie).

### 0bis.4 Préparation multi-serveurs

Chaque serveur Jellyfin connecté a déjà sa propre session isolée dans `LocalStore` ([[JELLYFIN_INTEGRATION.md]] §6) — l'extension naturelle est un index par serveur plutôt qu'un index global mélangé, avec une étape de fusion des résultats au moment de la présentation (déjà le même mécanisme que la fusion multi-catégories, [[SEARCH_INDEX_SPECIFICATION.md]] §4). **Statut : préparé architecturalement, non implémenté** — Melodia ne gère aujourd'hui qu'un serveur actif à la fois par défaut ([[JELLYFIN_INTEGRATION.md]] §6), cohérent avec YAGNI ([[ARCHITECTURE_PRINCIPLES.md]] §8bis) : la frontière (un index par serveur) est déjà la bonne, sa mise en œuvre attend un besoin réel engagé.

## 1. Cycle de vie complet (bonus du cadrage)

```
Synchronisation (SYNC_ENGINE_SPECIFICATION.md)
   ↓
Création des index (INDEX_ENGINE.md §1-2)
   ↓
Recherche (Search Engine, DATA_LAYER.md §3.4-3.5 + FILTER_ENGINE.md)
   ↓
Classement (RANKING_ENGINE.md)
   ↓
Suggestions (SUGGESTION_ENGINE.md — parallèle, pas séquentiel : actif avant même la validation d'une requête)
   ↓
Découverte (RECOMMENDATION_ENGINE.md §5bis — réutilise HistoryRepository/StatisticsRepository, pas l'index de recherche textuelle)
   ↓
Historique (search.queryExecuted, EVENT_SYSTEM.md §3ter → searchStore.recentSearches)
```

## 2. Carte complète du moteur de recherche

| Document | Rôle |
|---|---|
| [[INDEX_ENGINE.md]] | Cycle de vie complet de l'index (création/mise à jour/réindexation/reconstruction) |
| [[SEARCH_INDEX_SPECIFICATION.md]] | Un index par type d'entité, dénormalisation, isolation |
| [[RANKING_ENGINE.md]] | Classement à deux niveaux (pertinence textuelle + score composite) |
| [[SUGGESTION_ENGINE.md]] | Suggestions avant/pendant la saisie |
| [[FILTER_ENGINE.md]] | Combinaison de filtres, partagé avec [[PLAYLIST_ENGINE.md]] |
| [[SORT_ENGINE.md]] | Stratégies de tri explicite, distinct du classement |
| [[DATA_LAYER.md]] §3-3.5 | Tolérance aux fautes, algorithmes de correspondance |
| [[RECOMMENDATION_ENGINE.md]] §5bis | Sélection de candidats de découverte (Mixes) |
| [[PERFORMANCE_GUIDE.md]] §5sexies | Index mémoire, cache, préchargement, compression, workers |
| [[TESTING_STRATEGY.md]] §9quinquies | Stratégie de test complète |
| [[EVENT_SYSTEM.md]] §3ter | 7 Search Events |
| [[PERFORMANCE_BUDGET.md]] §2 | Budgets chiffrés (50 ms moteur / 100 ms perçu) |

**7 des 12 livrables demandés n'ont pas donné lieu à un fichier séparé** : `SEARCH_ALGORITHMS.md`, `DISCOVERY_ENGINE.md`, `SEARCH_PERFORMANCE.md`, `SEARCH_TESTING_GUIDE.md` et `SEARCH_EVENTS.md` recoupaient chacun un document déjà profond (Phase 13, Architecture d'état, Moteur Audio) — étendus plutôt que dupliqués. `SEARCH_ENGINE.md` (ce document) et `RANKING_ENGINE.md`/`SUGGESTION_ENGINE.md`/`FILTER_ENGINE.md`/`SORT_ENGINE.md`/`INDEX_ENGINE.md`/`SEARCH_INDEX_SPECIFICATION.md` étaient réellement nouveaux.

## 3. Matrice bonus — tous les index

| Index | Source | Dépendances | Fréquence de mise à jour |
|---|---|---|---|
| Tracks | `Track` ([[DOMAIN_MODELS.md]]) | `TrackRepository` | Incrémentale à chaque sync ([[INDEX_ENGINE.md]] §2) |
| Albums | `Album` | `AlbumRepository` | Incrémentale |
| Artists | `Artist` | `ArtistRepository` | Incrémentale |
| Genres | `Genre` | `AlbumRepository`/`TrackRepository` | Incrémentale, rare (référentiel peu volatile) |
| Playlists | `Playlist` | `PlaylistRepository` | Temps réel (modification locale immédiate, [[PLAYLIST_ENGINE.md]]) |
| Collections | `Collection` | `CollectionRepository` | Incrémentale |
| Années | Dérivé de `Album.year` | `AlbumRepository` | Incrémentale, liée à Albums |
| Compositeurs *(préparé)* | Non modélisé | — | — |
| Paroles *(préparé)* | `LyricsCache` | [[LYRICS_SYSTEM.md]] | — |

## 4. Auto-revue comparative

> **Avertissement d'honnêteté** : connaissance générale du modèle, pas un audit de code source en direct.

| Référence | Ce qu'elle illustre | Rapprochement avec Melodia |
|---|---|---|
| Spotify | Recherche instantanée avec suggestions pendant la frappe | Confirme [[SUGGESTION_ENGINE.md]] §3 |
| Apple Music | Résultats groupés par catégorie (chansons/albums/artistes) | Confirme la présentation par catégorie déjà actée ([[SEARCH_SPECIFICATION.md]] §2) |
| Plexamp | Recherche locale prioritaire pour un serveur auto-hébergé | Rapprochement le plus direct — valide le principe 2 (§0) |
| Roon | Classement par pertinence combiné à des signaux d'écoute | Valide [[RANKING_ENGINE.md]] §2 (score composite) |
| MusicBee | Recherche multi-critères avec filtres combinables | Valide [[FILTER_ENGINE.md]] |
| Symfonium | Client Jellyfin tiers avec index local pour performance hors ligne | Rapprochement direct, valide le principe 2 (§0) pour la même catégorie de produit |
| VS Code Search | Recherche floue/fuzzy quasi instantanée sur de grands corpus de fichiers | Valide l'exigence de tolérance aux fautes sans compromis de latence ([[DATA_LAYER.md]] §3.4) |
| Algolia | Index en mémoire, classement configurable par facteurs multiples | Valide §0bis.1 (index en mémoire) et [[RANKING_ENGINE.md]] (facteurs multiples) — Algolia va plus loin (service hébergé, hors périmètre d'un moteur strictement local) |
| Fuse.js | Alternative déjà écartée pour l'échelle visée | Confirme la décision déjà actée ([[STACK_DECISIONS.md]] §2, [[TECHNOLOGY_COMPARISONS.md]] §7), non redébattue ici |
| MiniSearch | Alternative déjà écartée, moins performante que FlexSearch à grande échelle | Idem, confirme [[TECHNOLOGY_COMPARISONS.md]] §7 |

**Conclusion** : aucune référence ne contredit un choix déjà acté. Algolia est la seule à suggérer une direction non retenue (service hébergé) — écartée explicitement car contraire au principe 2 (recherche strictement locale), pas une lacune de cette architecture.

## 5. Vérification de cohérence

| Document vérifié | Résultat |
|---|---|
| [[DATA_LAYER.md]] §3 | Cohérent — étendu (§3.5) sans redécision, FlexSearch et le principe de repli serveur inchangés |
| [[STATE_MANAGEMENT.md]] | Cohérent — `searchStore` reste scoping à la requête active ([[STORE_SPECIFICATIONS.md]] §2), aucun résultat stocké dans un store (état dérivé, [[DERIVED_STATE.md]] §1) |
| [[CACHE_SYSTEM.md]] | Cohérent — Search Index Cache déjà une catégorie actée (§1, Architecture d'état), ce document en précise le contenu exact sans le redéfinir |
| [[RECOMMENDATION_ENGINE.md]] | Cohérent — étendu (§5bis) sans redécision de l'interface de scoring ni du pipeline déjà actés |

Aucune contradiction trouvée.

---

## 6. Checklist de validation

- [ ] Les 6 principes du §0 sont vérifiables en revue de code.
- [ ] Le budget de calcul moteur (< 50 ms, [[PERFORMANCE_BUDGET.md]] §2) est mesuré sur les trois échelles de référence (500/50 000/250 000 titres) avant chaque release.
- [ ] Tout nouveau document du moteur de recherche est ajouté à la carte §2.

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Moteur de Recherche) | Principal Search Architect |

# STATE_MANAGEMENT.md — Constitution de l'architecture d'état (Architecture d'état)

> **Statut** : document fondateur, vivant — capstone
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal Frontend Architect
> **Documents liés** : tous les documents listés en §3

Ce document est le point d'entrée de l'architecture de gestion d'état de Melodia — il ne redécide rien de ce que [[ARCHITECTURE_PRINCIPLES.md]] §4 et [[DATA_LAYER.md]] §1 ont déjà tranché (séparation état serveur/client, arbre de décision), il en est la constitution complète et la carte vers les documents spécialisés qui détaillent chaque catégorie.

---

## 1. Principes fondamentaux (la constitution)

1. **Un état a toujours un propriétaire unique** — un store, un Repository, ou un sélecteur dérivé, jamais deux mécanismes qui prétendent posséder la même donnée simultanément ([[STORE_SPECIFICATIONS.md]] §3, exemple concret : pourquoi `historyStore`/`favoriteStore`/`statisticsStore` n'existent pas).
2. **Une donnée n'existe qu'une seule fois** — jamais copiée entre `LocalStore`, TanStack Query et un store Zustand ([[LOCAL_STATE.md]] §2). Une violation de ce principe est le signal de duplication le plus fréquent dans une architecture d'état React — activement éliminé dans chaque document de cette phase.
3. **Les composants sont les plus stupides possible** — aucune logique métier dans un composant de présentation ([[CODING_STANDARDS.md]] §4.1, déjà acté), un composant lit un sélecteur et appelle une action, jamais plus.
4. **Les stores ne connaissent pas l'UI** — un store ne référence jamais un composant, une classe CSS, ou un type de props React ([[STORE_SPECIFICATIONS.md]] §1).
5. **Les repositories ne connaissent pas React** — testables entièrement sans monter un seul composant ([[REPOSITORY_PATTERN.md]], déjà acté).
6. **Les services ne connaissent pas Zustand** — la logique de domaine (moteurs de [[STATISTICS_ENGINE.md]], [[RECOMMENDATION_ENGINE.md]], [[PLAYLIST_ENGINE.md]]) opère sur des Repositories et des entités, jamais sur un store client.
7. **Toute logique métier est centralisée** — dans un Repository, un Service, ou un moteur nommé, jamais dispersée entre plusieurs sélecteurs qui recalculent chacun une variante légèrement différente de la même règle ([[SELECTOR_GUIDE.md]] §4).
8. **Les effets de bord sont isolés** — une mutation TanStack Query ([[TANSTACK_QUERY_GUIDE.md]] §5) ou une action de store est le seul point d'entrée d'un effet de bord, jamais un effet caché dans un sélecteur ou un composant de rendu.

## 2. Les quatre catégories d'état

| Catégorie | Question qu'elle répond | Document |
|---|---|---|
| UI State | Cet état a-t-il un sens en dehors de l'écran actuel ? | [[UI_STATE.md]] |
| Server State | La source de vérité est-elle distante ou dans un Repository ? | [[SERVER_STATE.md]] |
| Local State | L'état doit-il survivre à un redémarrage, sans être une donnée de Repository ? | [[LOCAL_STATE.md]] |
| Derived State | Cet état peut-il être recalculé à partir d'un autre ? | [[DERIVED_STATE.md]] |

**Règle de tri** : un contributeur qui hésite entre deux catégories applique l'arbre de décision déjà acté ([[DATA_LAYER.md]] §1) dans l'ordre — jamais un choix par habitude ou par imitation du dernier store créé.

## 3. Carte complète de l'architecture d'état

| Document | Rôle |
|---|---|
| [[STORE_SPECIFICATIONS.md]] | Les 13 stores Zustand réels, responsabilités, frontières |
| [[STORE_DEPENDENCY_GRAPH.md]] | Matrice bonus : données/repository/événements/consommateurs par store |
| [[SERVER_STATE.md]] | Classification de l'état serveur par domaine |
| [[LOCAL_STATE.md]] | Classification de l'état local par mécanisme réel |
| [[UI_STATE.md]] | Classification de l'état d'UI pur |
| [[DERIVED_STATE.md]] | État calculé, sélecteurs légers vs moteurs avec cache |
| [[TANSTACK_QUERY_GUIDE.md]] | Query keys, cache/stale time, mutations, optimistic updates |
| [[EVENT_SYSTEM.md]] | Quand utiliser un événement, catégories, ce qu'un événement n'est jamais |
| [[SELECTOR_GUIDE.md]] | Organisation, égalité/re-render, réutilisation |
| [[TECHNOLOGY_COMPARISONS.md]] §3-3ter | Zustand vs Redux/MobX/Context API |
| [[PERFORMANCE_GUIDE.md]] §5/§5bis/§5ter/§5quater | Mémoïsation, re-render, batch, transitions, Suspense |
| [[TESTING_STRATEGY.md]] §9ter | Tests de stores/sélecteurs/événements/TanStack Query |
| [[SECURITY_GUIDE.md]] §3quater | Devtools/persist en production |

## 4. Cycle de vie complet d'une donnée jusqu'à son affichage

Étend le pipeline déjà tracé par [[DATA_FLOW.md]] (lecture) et [[DATA_LAYER.md]] §3bis.1 (écriture retour) avec le détail propre à l'état, jamais redécidé ailleurs :

```
Jellyfin (serveur) / LocalStore (source locale)
   ↓
Repository (MusicSource/LocalStore via l'interface de domaine, REPOSITORY_PATTERN.md)
   ↓
TanStack Query (Server State — cache, staleTime, TANSTACK_QUERY_GUIDE.md)
   ↓                                    ↘
Store Zustand (Local/UI State,           Sélecteur direct si l'état serveur
STORE_SPECIFICATIONS.md) — uniquement    suffit sans combinaison (cas majoritaire)
si l'état doit être combiné/muté
localement
   ↓                                    ↙
Sélecteur (SELECTOR_GUIDE.md) — combine store(s) + query(ies), calcule le Derived State
   ↓
ViewModel (DATA_FLOW.md §2) — forme prête pour l'affichage
   ↓
UI (composant React, §1 règle 3 — aucune logique métier)
```

**Différence avec [[DATA_FLOW.md]]** : ce diagramme insère explicitement l'étage Store/Sélecteur entre le Cache et le ViewModel, que [[DATA_FLOW.md]] mentionnait sans détailler — cohérent, pas contradictoire (voir §7, vérification de cohérence).

## 5. Bonus — matrice complète

Voir [[STORE_DEPENDENCY_GRAPH.md]] pour la matrice demandée (store × données possédées × repository × événements émis/écoutés × modules consommateurs) — non dupliquée ici.

## 6. Auto-revue comparative

> **Avertissement d'honnêteté** : comme les auto-revues précédentes, cette comparaison s'appuie sur la connaissance générale du modèle, pas un audit de code source en direct.

| Référence | Ce qu'elle illustre | Rapprochement avec Melodia |
|---|---|---|
| React 19 | `useTransition`/`useOptimistic` natifs pour l'état asynchrone | Confirme [[PERFORMANCE_GUIDE.md]] §5ter (transitions) et [[TANSTACK_QUERY_GUIDE.md]] §5 (optimistic updates) — React 19 rend natif ce que Melodia applique déjà via TanStack Query |
| TanStack Query | Séparation stricte état serveur/état client comme philosophie fondatrice de la bibliothèque elle-même | Validation directe du principe déjà acté depuis la Phase 0 ([[ARCHITECTURE_PRINCIPLES.md]] §4) |
| Zustand | Stores minces, sélecteurs explicites, pas de Provider | Confirme [[STORE_SPECIFICATIONS.md]] (13 stores minces plutôt qu'un store global) |
| Redux Toolkit | `createEntityAdapter` pour la normalisation d'entités | Rapprochement avec [[DOMAIN_MODELS.md]] — Melodia normalise via les Repositories plutôt qu'un adaptateur d'entité générique, choix déjà justifié ([[TECHNOLOGY_COMPARISONS.md]] §3) |
| Vue Pinia | Stores modulaires avec getters (= sélecteurs) intégrés au store | Rapproche de [[SELECTOR_GUIDE.md]] §1 (sélecteurs colocalisés avec leur store) — Pinia les intègre nativement, Zustand les exporte à côté ; différence d'API, même principe |
| Flutter Riverpod | Providers avec portée automatique et invalidation dépendante | Rapprochement le plus direct avec [[TANSTACK_QUERY_GUIDE.md]] §3 (invalidation ciblée par query key) — Riverpod automatise ce que Melodia déclare explicitement, compromis assumé en faveur de l'explicite (cohérent avec [[ENGINEERING_GUIDE.md]] §1.6) |
| SwiftUI Observation | Suivi de dépendance fin automatique (`@Observable`), re-render scoping sans sélecteur explicite | Le contraste le plus net avec Zustand (sélecteurs explicites, [[SELECTOR_GUIDE.md]] §1) — un compromis assumé : l'explicite coûte plus d'écriture mais reste plus prévisible en revue de code, cohérent avec le principe déjà acté (« explicite plutôt qu'astucieux », [[ENGINEERING_GUIDE.md]] §1.6) |

**Conclusion** : aucune référence ne contredit un choix déjà acté — chacune valide soit la séparation état serveur/client (TanStack Query, React 19), soit la simplicité des stores (Zustand, Pinia), soit le compromis explicite-plutôt-qu'automatique déjà assumé ailleurs dans le projet (Riverpod, SwiftUI Observation).

## 7. Vérification de cohérence avec les documents existants

| Document vérifié | Résultat |
|---|---|
| [[ARCHITECTURE.md]] §3bis | Cohérent — aucune règle d'import de module contredite, les stores respectent les mêmes frontières de feature |
| [[DATA_LAYER.md]] §1 | Cohérent — l'arbre de décision est appliqué, jamais redécidé (§2 de ce document) |
| [[REPOSITORY_PATTERN.md]] | Cohérent — deux gaps réels trouvés et comblés pendant cette phase (`CollectionRepository`, `ArtworkRepository`, voir [[SERVER_STATE.md]] §5), aucune contradiction |
| [[DATABASE_SCHEMA.md]] | Cohérent — aucun store ne duplique une table, la persistance reste exclusivement via Repository/`persist` middleware ([[LOCAL_STATE.md]] §2) |
| [[CACHE_SYSTEM.md]] | Cohérent — les stores ne gèrent jamais de cache eux-mêmes, délégué entièrement à `LocalStore`/TanStack Query |
| [[SYNC_ENGINE_SPECIFICATION.md]] | Cohérent — `syncStore` n'affiche qu'un statut dérivé, la mécanique de synchronisation elle-même reste non dupliquée ([[STORE_SPECIFICATIONS.md]] §2) |

Aucune contradiction trouvée — cette phase étend la couche donnée déjà actée (Phase 13) d'une couche d'état applicatif cohérente, jamais redondante.

---

## 8. Checklist de validation

- [ ] Les 8 principes du §1 sont vérifiables en revue de code, pas seulement déclaratifs.
- [ ] Tout nouveau document d'état futur est ajouté à la carte §3 avant d'être considéré terminé.
- [ ] Aucune contradiction avec les six documents de la couche donnée (§7) n'est introduite sans mise à jour de ce tableau.

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Architecture d'état) | Principal Frontend Architect |

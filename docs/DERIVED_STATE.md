# DERIVED_STATE.md — État calculé (Architecture d'état)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Senior Performance Engineer
> **Documents liés** : [[DATA_LAYER.md]] §1 (règle 4), [[SELECTOR_GUIDE.md]], [[DATA_FLOW.md]] §2 (ViewModel)

[[DATA_LAYER.md]] §1 pose déjà la quatrième branche de l'arbre de décision : « la donnée peut être calculée à partir d'un état existant → sélecteur dérivé, jamais un état stocké en doublon ». Ce document liste précisément quels domaines nommés par le cadrage sont de l'état dérivé, et par quel mécanisme chacun est calculé — sans redécider aucun des moteurs de calcul déjà spécifiés.

---

## 1. Domaines d'état dérivé

| Domaine | Dérivé de | Mécanisme | Redécidé ailleurs ? |
|---|---|---|---|
| Bibliothèque filtrée | État serveur (albums/tracks, [[SERVER_STATE.md]]) + `libraryStore.activeFilters` | Sélecteur composé (`useFilteredLibrary()`) | Non — les filtres eux-mêmes sont un état source ([[UI_STATE.md]] §1), leur application est dérivée |
| Recherche (résultats) | Index FlexSearch ([[DATA_LAYER.md]] §3) + `searchStore.query` | Sélecteur/hook dérivé, jamais stocké | Le moteur d'index lui-même : [[DATA_LAYER.md]] §3.4 |
| Recommandations | `RecommendationRepository` ([[RECOMMENDATION_ENGINE.md]]) | Résultat déjà mis en cache par le moteur — consommé via TanStack Query comme une lecture, pas recalculé côté client | [[RECOMMENDATION_ENGINE.md]] (calcul), non redécidé ici |
| File d'attente enrichie (Queue Item avec métadonnées complètes) | `queueStore.queue` (identifiants) + état serveur (métadonnées de piste) | Sélecteur composé (`useEnrichedQueue()`) — joint les deux sources, jamais une copie des métadonnées dans `queueStore` lui-même (cohérent avec [[STORE_SPECIFICATIONS.md]] §2, `queueStore` ne possède jamais les métadonnées) | Non |
| Palette de couleurs (thème dynamique) | Pochette active + extraction | Calculé par [[DYNAMIC_THEME_GUIDE.md]], exposé via `themeStore` comme résultat, jamais recalculé au niveau du sélecteur (coût d'extraction non négligeable) | [[DYNAMIC_THEME_GUIDE.md]] (calcul) |
| Statistiques | `HistoryRepository` | [[STATISTICS_ENGINE.md]] (Web Worker), consommé en lecture | [[STATISTICS_ENGINE.md]] (calcul), non redécidé ici |
| Tri dynamique | État serveur + `libraryStore.sortOrder` | Sélecteur composé, même famille que Bibliothèque filtrée — souvent la même fonction de sélection appliquée en séquence (filtre puis tri) | Non |

## 2. Deux formes de dérivation, jamais confondues

- **Dérivation légère (sélecteur pur)** : recalculée à chaque rendu concerné, sans mise en cache — Bibliothèque filtrée, File d'attente enrichie, Tri dynamique. Coût négligeable car opère sur des données déjà en mémoire (state serveur déjà résolu par TanStack Query).
- **Dérivation lourde (moteur avec cache de résultat)** : Recommandations, Statistiques, Palette de couleurs — le calcul lui-même est coûteux (agrégation sur historique, extraction de couleur, scoring). Ces trois-là ne sont **jamais** recalculées par un simple sélecteur côté composant ; elles passent par leur moteur dédié qui gère son propre cache ([[CACHE_SYSTEM.md]] §1), et le sélecteur ne fait que lire ce résultat déjà prêt.

**Règle de distinction** : si le calcul peut s'exécuter en microsecondes sur des données déjà résolues, c'est un sélecteur léger. S'il nécessite une itération sur un historique ou un calcul asynchrone, c'est un moteur avec cache — jamais l'inverse (un moteur pour un calcul trivial serait une sur-ingénierie, un sélecteur pour un calcul lourd bloquerait le rendu).

---

## 3. Ce que ce document ne fait pas

- Ne redéfinit aucun des moteurs de calcul cités (voir [[STATISTICS_ENGINE.md]], [[RECOMMENDATION_ENGINE.md]], [[DYNAMIC_THEME_GUIDE.md]]).
- Ne redéfinit pas la syntaxe ou l'organisation des sélecteurs eux-mêmes (voir [[SELECTOR_GUIDE.md]]).

## 4. Checklist de validation

- [ ] Tout nouvel état dérivé est classé §1 avant implémentation, avec son mécanisme (léger vs moteur, §2).
- [ ] Aucun état dérivé n'est jamais stocké en doublon dans un store ([[DATA_LAYER.md]] §1, règle 4).
- [ ] Un calcul coûteux ne passe jamais par un sélecteur simple non mis en cache (§2).

## 5. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Architecture d'état) | Senior Performance Engineer |

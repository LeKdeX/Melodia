# SUGGESTION_ENGINE.md — Suggestions avant et pendant la recherche (Moteur de Recherche)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : UX Architect
> **Documents liés** : [[SEARCH_SPECIFICATION.md]] §4, [[RANKING_ENGINE.md]], [[STORE_SPECIFICATIONS.md]] §2

[[SEARCH_SPECIFICATION.md]] §4 a déjà acté *que* des suggestions existent (autocomplétion, recherches récentes/fréquentes). Ce document est l'architecture technique complète — quand chaque type de suggestion est calculé, sa source, sa fraîcheur.

---

## 1. Les deux contextes de suggestion

- **Avant la recherche** (champ vide, focus posé) : recherches récentes, recherches fréquentes, contenu populaire — aucune requête de l'utilisateur à interroger, uniquement des signaux historiques.
- **Pendant la saisie** (requête non vide) : autocomplétion basée sur l'index déjà construit ([[SEARCH_INDEX_SPECIFICATION.md]]), classée par [[RANKING_ENGINE.md]] sur un préfixe plutôt qu'une requête complète.

## 2. Suggestions avant la recherche

| Type | Source | Fraîcheur |
|---|---|---|
| Recherches récentes | `searchStore.recentSearches` ([[STORE_SPECIFICATIONS.md]] §2, déjà persisté) | Temps réel — mise à jour à chaque recherche validée |
| Recherches fréquentes | Agrégat des recherches récentes par occurrence — calculé côté client sur la liste déjà en mémoire (`recentSearches`), jamais une requête séparée | Recalculé à l'ouverture du champ de recherche, coût négligeable (liste bornée, §4) |
| Artistes/albums populaires | `StatisticsRepository` ([[REPOSITORY_PATTERN.md]] §2) | Mise en cache identique à [[STATISTICS_ENGINE.md]] §3, jamais recalculé à chaque ouverture du champ |
| Titres récemment écoutés | `HistoryRepository`, dernières entrées | Temps réel — requête directe, volume toujours faible (dernières entrées uniquement) |

## 3. Suggestions pendant la saisie (autocomplétion)

- Interroge les mêmes index que la recherche universelle ([[SEARCH_INDEX_SPECIFICATION.md]] §4) mais en mode préfixe uniquement ([[DATA_LAYER.md]] §3.4, déjà acté) — jamais une recherche floue complète à chaque frappe, qui coûterait plus cher pour un bénéfice non perceptible sur un préfixe court.
- Classée par [[RANKING_ENGINE.md]] avec un poids de popularité **plus élevé** que pour une recherche validée (§2 de [[RANKING_ENGINE.md]]) — une suggestion affichée avant même la validation bénéficie davantage d'un biais vers le contenu déjà connu de l'utilisateur, qui réduit l'effort de frappe requis.
- Nombre de suggestions strictement borné (quelques éléments par catégorie) — jamais une liste complète de résultats affichée comme suggestion, qui dupliquerait visuellement l'écran de résultats validés ([[SEARCH_SCREENS.md]]).

## 4. Bornes et performance

`recentSearches` est bornée à un nombre fixe d'entrées (rotation FIFO au-delà) — cohérent avec la politique de rétention déjà actée pour des listes similaires ([[LOGGING_SYSTEM.md]] §2, principe de non-croissance non bornée appliqué ici par analogie). Le calcul des suggestions avant recherche (§2) et pendant la saisie (§3) reste dans le budget de calcul moteur déjà acté ([[PERFORMANCE_BUDGET.md]] §2, < 50 ms) — les sources déjà en cache/mémoire (`recentSearches`, agrégats statistiques) garantissent cette latence sans nouvelle stratégie de performance dédiée.

---

## 5. Ce que ce document ne fait pas

- Ne redéfinit pas le comportement produit déjà acté (voir [[SEARCH_SPECIFICATION.md]] §4).
- Ne redéfinit pas le classement des résultats validés (voir [[RANKING_ENGINE.md]]).
- Ne redéfinit pas le calcul des statistiques sous-jacentes (voir [[STATISTICS_ENGINE.md]]).

## 6. Checklist de validation

- [ ] Aucune suggestion pendant la saisie n'utilise la recherche floue complète, uniquement le mode préfixe (§3).
- [ ] `recentSearches` reste bornée, jamais une croissance illimitée (§4).
- [ ] Le nombre de suggestions par catégorie reste strictement borné (§3).

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Moteur de Recherche) | UX Architect |

# RANKING_ENGINE.md — Classement multi-facteurs des résultats (Moteur de Recherche)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Information Retrieval Specialist
> **Documents liés** : [[DATA_LAYER.md]] §3.4, [[SEARCH_INDEX_SPECIFICATION.md]] §4, [[RECOMMENDATION_ENGINE.md]] §1

[[DATA_LAYER.md]] §3.4 a déjà posé le classement de premier niveau (score de pertinence FlexSearch natif : titre exact > titre partiel > artiste > album > genre). Ce document ajoute un second niveau de classement, **au-delà de la pertinence textuelle pure** — jamais une redécision du premier niveau, une composition avec lui.

---

## 1. Les deux niveaux de classement

1. **Pertinence textuelle** (déjà acté, [[DATA_LAYER.md]] §3.4) — calculée par FlexSearch, dépend uniquement de la requête et du contenu indexé.
2. **Score composite** (ce document) — combine la pertinence textuelle avec des signaux extérieurs au texte (popularité, historique, favoris). Appliqué **après** le niveau 1, jamais à sa place — une correspondance textuelle faible ne remonte jamais en tête grâce à une popularité élevée (cohérent avec le principe déjà acté que la recherche doit être *exacte* avant d'être *pertinente au sens large*, [[SEARCH_SPECIFICATION.md]] §1).

## 2. Facteurs du score composite

| Facteur | Poids relatif | Source |
|---|---|---|
| Pertinence textuelle (niveau 1) | Dominant — les autres facteurs ne font jamais basculer l'ordre entre deux résultats de pertinence textuelle nettement différente | [[DATA_LAYER.md]] §3.4 |
| Correspondance exacte vs partielle | Élevé, déjà partiellement capturé par le niveau 1 — ce document précise que la correspondance exacte de l'intégralité de la requête (pas seulement du premier mot) reçoit un bonus distinct | Calculé à la requête |
| Popularité (temps d'écoute cumulé) | Moyen | `StatisticsRepository` ([[REPOSITORY_PATTERN.md]] §2) |
| Historique récent | Moyen, pondération temporelle décroissante (cohérent avec [[RECOMMENDATION_ENGINE.md]] §4, même mécanisme de décroissance réutilisé) | `HistoryRepository` |
| Favoris | Élevé — un favori explicite est un signal plus fort qu'une écoute passive | `FavoriteRepository` |
| Temps d'écoute total de l'entité | Faible, distinct de la popularité récente — capture la préférence de fond au-delà d'un engouement temporaire | `StatisticsRepository` |

## 3. Formule (illustrative, pas une spécification finale d'implémentation)

```
score_final = score_pertinence_textuelle × (1 + bonus_composite)
bonus_composite = w1·popularité_normalisée + w2·récence_historique + w3·favori_booléen + w4·écoute_totale_normalisée
```

Le score composite est un **multiplicateur borné** (jamais additif sans plafond) sur le score de pertinence textuelle — garantit que le niveau 1 reste toujours dominant (§1), cohérent avec la règle de non-inversion déjà énoncée.

## 4. Classement par catégorie, jamais toutes catégories mélangées

Chaque index ([[SEARCH_INDEX_SPECIFICATION.md]] §1) est classé indépendamment — le score composite d'une piste n'est jamais comparé au score composite d'un artiste, cohérent avec la présentation par catégorie déjà actée côté produit ([[SEARCH_SPECIFICATION.md]] §2, « jamais une liste plate indifférenciée »).

## 5. Recalcul et fraîcheur

Le score composite dépend de données qui changent (statistiques, favoris) — recalculé **à chaque requête**, jamais mis en cache indépendamment (contrairement aux agrégats de [[STATISTICS_ENGINE.md]] §3, dont le coût de calcul justifie un cache) : le calcul du bonus composite pour un ensemble de résultats déjà réduit par le niveau 1 (quelques dizaines d'éléments au maximum) est négligeable, aucun cache n'apporterait de bénéfice mesurable.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas le classement de pertinence textuelle natif (voir [[DATA_LAYER.md]] §3.4).
- Ne redéfinit pas le moteur de scoring de recommandation, distinct par nature (une recherche a une requête explicite, une recommandation n'en a pas) — voir [[RECOMMENDATION_ENGINE.md]], réutilisé uniquement pour la pondération temporelle (§2).
- Ne redéfinit pas la présentation par catégorie (voir [[SEARCH_SPECIFICATION.md]] §2).

## 7. Checklist de validation

- [ ] Le score composite ne fait jamais remonter un résultat de pertinence textuelle nettement inférieure au-dessus d'un résultat plus pertinent (§1, §3).
- [ ] Aucun classement ne mélange deux catégories d'index différentes (§4).
- [ ] Le score composite est recalculé à chaque requête, jamais servi depuis un cache obsolète (§5).

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Moteur de Recherche) | Information Retrieval Specialist |

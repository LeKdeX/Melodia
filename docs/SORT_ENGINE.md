# SORT_ENGINE.md — Stratégies de tri (Moteur de Recherche)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Data Engineer
> **Documents liés** : [[DERIVED_STATE.md]] §1, [[FILTER_ENGINE.md]] §3, [[STORE_SPECIFICATIONS.md]] §2

[[DERIVED_STATE.md]] §1 classe déjà le tri dynamique comme un état dérivé léger (sélecteur, pas de moteur avec cache). Ce document est la spécification complète des stratégies de tri disponibles — appliqué après le filtrage ([[FILTER_ENGINE.md]] §3), jamais avant.

---

## 1. Stratégies de tri

| Stratégie | Comparateur | Coût |
|---|---|---|
| Alphabétique | Titre normalisé (accents/casse ignorés, cohérent avec [[DATA_LAYER.md]] §3.4) | O(n log n), trivial |
| Date d'ajout | `addedAt` (horodatage de synchronisation initiale de l'entité) | O(n log n), champ déjà indexé ([[DATABASE_SCHEMA.md]] §3) |
| Date de sortie | Champ `year`/date de sortie de `Album` | O(n log n) |
| Popularité | Temps d'écoute cumulé (`StatisticsRepository`) — même source que [[RANKING_ENGINE.md]] §2, réutilisée telle quelle | O(n log n) après résolution des scores |
| Temps d'écoute | Distinct de la popularité (§ci-dessus, qui agrège au niveau de l'entité) — ici le temps d'écoute strictement personnel de l'utilisateur courant, jamais un agrégat multi-utilisateur (cohérent avec l'absence de dimension sociale déjà actée, [[STATISTICS_SPECIFICATION.md]] §3) | O(n log n) |
| Aléatoire | Permutation générée une fois par activation, jamais recalculée à chaque rendu (cohérent avec le modèle déjà acté pour l'ordre de lecture aléatoire, [[AUDIO_ENGINE.md]] §1) | O(n) |
| Personnalisé | Ordre manuel explicite (glisser-déposer, réservé aux contextes qui le permettent — playlists classiques, [[PLAYLIST_ENGINE.md]] §1 — jamais un résultat de recherche, qui n'a pas d'ordre manuel par nature) | Ordre stocké, pas calculé |

## 2. Tri vs classement — distinction explicite

Le tri (ce document) est une action **explicite de l'utilisateur** sur un ensemble déjà déterminé (résultats filtrés, contenu d'un album/playlist). Le classement ([[RANKING_ENGINE.md]]) est **implicite**, appliqué automatiquement à une recherche textuelle pour ordonner par pertinence. Les deux ne sont jamais actifs simultanément sur le même ensemble : une recherche textuelle est classée par pertinence par défaut, un tri explicite (§1) désactive ce classement et le remplace — cohérent avec l'attente qu'un utilisateur qui choisit « trier par date d'ajout » obtienne exactement cet ordre, sans un facteur de pertinence résiduel qui le perturberait.

## 3. Stabilité du tri

Tout comparateur (§1) est stable (préserve l'ordre relatif des éléments égaux selon le critère de tri) — un tri par année sur deux albums de la même année ne réordonne jamais arbitrairement leur position relative à chaque nouveau calcul, cohérent avec la prévisibilité déjà exigée pour l'ordre de file de lecture ([[AUDIO_ENGINE.md]] §1).

## 4. Performance sur grande liste

Le tri s'exécute sur l'ensemble déjà réduit par le filtrage ([[FILTER_ENGINE.md]] §3), jamais sur la bibliothèque complète non filtrée pour ensuite tronquer — cohérent avec la règle générale de réduction avant traitement coûteux déjà appliquée ailleurs ([[RANKING_ENGINE.md]] §5). Sur une vue de bibliothèque complète sans filtre (250 000 titres), le tri reste dans le budget de rendu déjà acté via la virtualisation ([[PERFORMANCE_BUDGET.md]] §3) — non redécidé ici.

---

## 5. Ce que ce document ne fait pas

- Ne redéfinit pas le classement par pertinence (voir [[RANKING_ENGINE.md]]).
- Ne redéfinit pas le filtrage (voir [[FILTER_ENGINE.md]]).
- Ne redéfinit pas la virtualisation de liste (voir [[PERFORMANCE_BUDGET.md]] §3).

## 6. Checklist de validation

- [ ] Un tri explicite et un classement par pertinence ne sont jamais actifs simultanément sur le même ensemble (§2).
- [ ] Tout comparateur reste stable (§3).
- [ ] Le tri s'applique toujours après le filtrage, jamais avant (§4).

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Moteur de Recherche) | Data Engineer |

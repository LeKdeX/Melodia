# FILTER_ENGINE.md — Combinaison de filtres (Moteur de Recherche)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Data Engineer
> **Documents liés** : [[SEARCH_SPECIFICATION.md]] §3, [[PLAYLIST_ENGINE.md]] §2, [[DERIVED_STATE.md]] §1

[[SEARCH_SPECIFICATION.md]] §3 a déjà listé les filtres disponibles (durée/format/qualité, favoris/téléchargés/historique). [[PLAYLIST_ENGINE.md]] §2 réutilise déjà le même vocabulaire de critères pour les playlists intelligentes. Ce document est le moteur technique qui applique une combinaison de filtres à un ensemble de résultats — partagé entre la recherche et les playlists intelligentes, jamais deux implémentations séparées.

---

## 1. Filtres disponibles

| Filtre | Type | Domaine de valeurs |
|---|---|---|
| Genre | Catégoriel, multi-sélection | `Genre` ([[DOMAIN_MODELS.md]] §2) |
| Année | Plage numérique | Champ `year` de `Album` |
| Album | Catégoriel, sélection unique dans un contexte donné | `Album` |
| Artiste | Catégoriel, sélection unique dans un contexte donné | `Artist` |
| Favoris | Booléen | `FavoriteRepository` |
| Téléchargés | Booléen | `DownloadRepository`, statut `completed` ([[DOWNLOAD_SYSTEM.md]] §5quater) |
| Qualité | Catégoriel | Profil de qualité résolu ([[AUDIO_ENGINE.md]] §5bis) |
| Durée | Plage numérique | Champ `durationMs` de `Track` |

## 2. Logique de combinaison

- **Entre catégories différentes** : toujours en ET logique (ex. Genre=Jazz ET Année=1970-1979) — un utilisateur qui combine deux filtres de nature différente cherche une intersection, jamais une union qui élargirait silencieusement le résultat au-delà de son intention.
- **Au sein d'une même catégorie multi-sélection** (ex. deux genres sélectionnés) : toujours en OU logique (Genre=Jazz OU Genre=Blues) — cohérent avec l'attente standard d'une sélection multiple.
- **Formule générale** : `résultat = (catégorie1_valeur1 OU catégorie1_valeur2 OU ...) ET (catégorie2_valeur1 OU ...) ET ...` — jamais une combinaison configurable ET/OU arbitraire entre catégories différentes (contrairement aux playlists intelligentes, [[PLAYLIST_ENGINE.md]] §2, qui autorisent ET/OU configurable) : la recherche filtrée reste un raffinement progressif d'un ensemble de résultats déjà obtenu par texte, pas un constructeur de requête complet.

## 3. Application — avant ou après le classement ?

Les filtres s'appliquent **avant** le classement ([[RANKING_ENGINE.md]]) — réduisent d'abord l'ensemble de candidats, puis classent le sous-ensemble réduit. Jamais l'inverse (classer puis filtrer), qui gaspillerait du calcul de classement sur des éléments qui seront de toute façon exclus.

## 4. Filtres appliqués sans requête textuelle

Une combinaison de filtres sans texte de recherche (ex. « tous mes favoris en Jazz ») est un cas valide et fréquent — dans ce cas, l'ensemble de départ est la bibliothèque complète du domaine concerné (via [[SERVER_STATE.md]] directement, pas l'index de recherche textuelle) plutôt qu'un passage inutile par FlexSearch sans requête. Le Filter Engine opère alors directement en aval de la couche donnée, jamais en aval d'une recherche textuelle vide simulée.

## 5. Partage avec le moteur de playlists

Le même moteur de combinaison (§2) est invoqué par [[PLAYLIST_ENGINE.md]] §2 pour évaluer les règles d'une playlist intelligente — seule différence : les playlists intelligentes autorisent une combinaison ET/OU configurable par l'utilisateur (§2 ci-dessus, exception déjà notée), la recherche filtrée reste toujours à la formule fixe. Le Filter Engine expose donc une interface plus permissive que ce que la recherche utilise, déjà consommée pleinement par les playlists intelligentes.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas la liste des filtres côté produit (voir [[SEARCH_SPECIFICATION.md]] §3).
- Ne redéfinit pas le moteur de règles des playlists intelligentes (voir [[PLAYLIST_ENGINE.md]] §2), uniquement le mécanisme de combinaison partagé.
- Ne redéfinit pas le classement (voir [[RANKING_ENGINE.md]]).

## 7. Checklist de validation

- [ ] La combinaison entre catégories différentes reste toujours en ET, jamais configurable pour la recherche (§2).
- [ ] Les filtres s'appliquent toujours avant le classement, jamais après (§3).
- [ ] Une combinaison de filtres sans texte n'interroge jamais l'index FlexSearch inutilement (§4).

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Moteur de Recherche) | Data Engineer |

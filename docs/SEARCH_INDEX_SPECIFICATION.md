# SEARCH_INDEX_SPECIFICATION.md — Index par type d'entité (Moteur de Recherche)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Information Retrieval Specialist
> **Documents liés** : [[SEARCH_SPECIFICATION.md]] §3, [[DOMAIN_MODELS.md]], [[INDEX_ENGINE.md]]

[[SEARCH_SPECIFICATION.md]] §3 a déjà défini *quels champs* sont recherchés et leur pondération produit. Ce document descend d'un niveau technique : **un index FlexSearch distinct par type d'entité**, jamais un index unique fourre-tout — permet une invalidation ciblée ([[INDEX_ENGINE.md]] §2) et un classement indépendant par type de résultat ([[RANKING_ENGINE.md]]).

---

## 1. Index par entité

| Index | Champs indexés | Source (entité, [[DOMAIN_MODELS.md]]) | Statut |
|---|---|---|---|
| Tracks | Titre (poids le plus élevé, [[SEARCH_SPECIFICATION.md]] §3), nom d'artiste (dénormalisé pour éviter une jointure à la recherche), nom d'album (dénormalisé) | `Track` | Actif |
| Albums | Titre, nom d'artiste (dénormalisé), année | `Album` | Actif |
| Artists | Nom | `Artist` | Actif |
| Genres | Nom | `Genre` | Actif |
| Playlists | Titre, description | `Playlist` | Actif |
| Collections | Nom | `Collection` | Actif |
| Années | Valeur numérique, activée par filtre explicite uniquement ([[SEARCH_SPECIFICATION.md]] §3, jamais en texte libre ambigu) | Dérivé du champ `year` de `Album` — pas d'entité dédiée | Actif |
| Compositeurs | Nom | Champ optionnel de `Track`, non modélisé comme entité séparée à ce jour | **Préparé, non engagé** |
| Paroles | Texte complet, activé par filtre explicite uniquement ([[SEARCH_SPECIFICATION.md]] §3) | `LyricsCache` ([[LYRICS_SYSTEM.md]]) | **Préparé, non engagé** |

## 2. Pourquoi Compositeurs et Paroles restent préparés, non engagés

- **Compositeurs** : aucun champ `composer` structuré n'existe encore dans [[DTO_SPECIFICATION.md]] ni [[DOMAIN_MODELS.md]] — le champ existe dans les métadonnées Jellyfin brutes mais n'a jamais été mappé vers une entité de domaine. L'indexer nécessiterait d'abord d'étendre `Track` et son Mapper ([[MAPPER_GUIDE.md]]), hors périmètre de cette phase.
- **Paroles** : dépend de la disponibilité des paroles elles-mêmes, déjà signalée comme une dépendance non résolue ([[SEARCH_SPECIFICATION.md]] §3, [[PLAYER_SPECIFICATION.md]] §6) — un index sur un contenu qui n'existe pas encore de façon fiable serait prématuré (YAGNI, [[ARCHITECTURE_PRINCIPLES.md]] §8bis).

**Contrat d'interface attendu pour les deux** : un index FlexSearch supplémentaire du même type que les sept déjà actifs (§1), ajouté sans modification de l'architecture d'Index Engine ([[INDEX_ENGINE.md]]) — uniquement une nouvelle entrée dans ce document et un nouveau Mapper, jamais une réécriture.

## 3. Dénormalisation — pourquoi et où elle s'arrête

Les index Tracks et Albums dénormalisent le nom d'artiste (copie du champ, pas une référence à résoudre à la recherche) — évite une jointure applicative à chaque requête, cohérent avec la limite déjà actée qu'IndexedDB/Dexie n'a pas de jointure native ([[INDEXEDDB_ARCHITECTURE.md]] §6). Cette dénormalisation **ne s'étend jamais** au-delà d'un niveau (ex. l'index Tracks ne dénormalise jamais le genre de l'album parent) — une dénormalisation profonde multiplierait le coût de mise à jour incrémentale ([[INDEX_ENGINE.md]] §2) à chaque changement du parent pour un bénéfice marginal.

## 4. Isolation entre index

Chaque index est une instance FlexSearch séparée — une requête « recherche universelle » ([[SEARCH_SPECIFICATION.md]] §2) interroge les sept index actifs en parallèle et fusionne les résultats par catégorie ([[RANKING_ENGINE.md]] §4), jamais un seul index avec un champ `type` discriminant qui empêcherait un classement indépendant par catégorie.

## 5. Références croisées à la suppression

Quand une entité source est supprimée (ex. un album retiré côté serveur), toute entrée dénormalisée qui la référence est invalidée en cascade — cohérent avec la cascade déjà actée au niveau du schéma physique ([[DATABASE_SCHEMA.md]] §4) : la suppression d'un `Album` retire son entrée de l'index Albums **et** met à jour les entrées Tracks qui dénormalisaient son nom (§3), jamais des entrées orphelines avec un nom d'album obsolète.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas la pondération produit des champs (voir [[SEARCH_SPECIFICATION.md]] §3).
- Ne redéfinit pas le cycle de vie de création/mise à jour (voir [[INDEX_ENGINE.md]]).
- Ne redéfinit pas les algorithmes de tolérance aux fautes (voir [[DATA_LAYER.md]] §3.4).

## 7. Checklist de validation

- [ ] Tout nouveau type de contenu recherchable reçoit un index dédié ici avant implémentation, jamais ajouté à un index existant par commodité.
- [ ] Aucune dénormalisation ne dépasse un niveau (§3).
- [ ] Compositeurs/Paroles restent explicitement non engagés tant que leur dépendance (§2) n'est pas résolue.

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Moteur de Recherche) | Information Retrieval Specialist |

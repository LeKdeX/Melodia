# TANSTACK_QUERY_GUIDE.md — Conventions TanStack Query (Architecture d'état)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Senior TypeScript Engineer
> **Documents liés** : [[SERVER_STATE.md]], [[ARCHITECTURE_PRINCIPLES.md]] §4.1, [[ERROR_HANDLING.md]] §2

[[SERVER_STATE.md]] classe déjà *quels* domaines sont de l'état serveur. Ce document définit *comment* TanStack Query est configuré concrètement pour chacun — clés de requête, durées de cache, invalidation, mutations. Aucune nouvelle décision de domaine, uniquement la configuration technique.

---

## 1. Convention de query keys

Structure hiérarchique à trois niveaux, cohérente pour tous les domaines de [[SERVER_STATE.md]] §1 :

```
[domaine, identifiant?, paramètres?]

['albums']                          // toute la collection
['albums', albumId]                  // un album précis
['albums', 'byArtist', artistId]     // vue filtrée nommée
['tracks', albumId]                  // pistes d'un album (déjà l'exemple de DATA_FLOW.md §3)
['history', 'aggregate', period]     // agrégat de STATISTICS_ENGINE.md
```

**Règle** : le premier segment est toujours le nom du domaine exact de [[SERVER_STATE.md]] §1 (jamais une abréviation) — permet une invalidation ciblée par préfixe (`queryClient.invalidateQueries(['albums'])` invalide toute vue liée aux albums, y compris les vues filtrées) sans jamais invalider un domaine non concerné.

## 2. Cache Time / Stale Time par nature de donnée

| Nature | `staleTime` | `gcTime` (ex-`cacheTime`) | Justification |
|---|---|---|---|
| Métadonnées de bibliothèque (albums/artists/tracks/genres/collections) | Long (plusieurs heures) | Long (persisté indéfiniment via [[LOCAL_STATE.md]]) | Change rarement — invalidée explicitement par [[SYNC_ENGINE_SPECIFICATION.md]] §4, jamais par expiration temporelle arbitraire (cohérent avec [[CACHE_SYSTEM.md]] §3, Metadata Cache) |
| Historique/Favoris (via `HistoryRepository`/`FavoriteRepository`) | Court (quasi immédiat) | Long | Source de vérité locale à latence nulle — pas de raison de servir une donnée obsolète, mais pas de raison de la re-fetcher non plus (invalidée explicitement à chaque écriture, §4) |
| Session/Permissions | Toute la durée de la session active | Idem | Ne change jamais pendant une session active — invalidée uniquement à la reconnexion |
| Résultats de recherche | Très court | Court | Une requête de recherche différente est une clé différente ; peu d'intérêt à conserver un résultat de recherche obsolète longtemps |

**Principe général** : `staleTime` reflète *la fréquence réelle de changement de la donnée côté source*, jamais une valeur par défaut copiée sans réflexion — cohérent avec [[ENGINEERING_GUIDE.md]] §1.1 (aucune décision arbitraire sans justification).

## 3. Invalidation

- **Déclenchée par la synchronisation** : chaque cycle de [[SYNC_ENGINE_SPECIFICATION.md]] qui détecte une modification (§4 de ce document) invalide précisément les query keys concernées par identifiant — jamais une invalidation globale (`invalidateQueries()` sans filtre) qui provoquerait un re-fetch complet inutile.
- **Déclenchée par une mutation locale** : toute écriture via un Repository ([[REPOSITORY_PATTERN.md]]) invalide sa propre query key immédiatement après succès — voir §5 (mutations).
- **Jamais d'invalidation par minuteur arbitraire** — cohérent avec la règle déjà actée pour les moteurs de calcul ([[STATISTICS_ENGINE.md]] §4, [[RECOMMENDATION_ENGINE.md]] §3).

## 4. Refetch

- `refetchOnWindowFocus` **désactivé par défaut** pour les domaines de métadonnées (long `staleTime`, §2) — un changement de focus de fenêtre n'est jamais un signal de fraîcheur pour une bibliothèque musicale personnelle, contrairement à un outil collaboratif temps réel.
- `refetchOnReconnect` **activé** pour tous les domaines — cohérent avec le comportement déjà acté de synchronisation automatique au retour en ligne ([[OFFLINE_SYSTEM.md]] §4).

## 5. Mutations et Optimistic Updates

- Toute mutation (ajout à une playlist, marquage favori, changement de préférence) suit le pattern standard : `onMutate` applique le changement optimiste localement, `onError` restaure l'état précédent, `onSettled` invalide la query key concernée pour resynchroniser avec la source de vérité réelle.
- **Optimistic Update systématique** pour les actions à latence perçue critique (favoris, ajout à la file, [[PREMIUM_DETAILS.md]] déjà acté sur la réactivité perçue) — jamais d'attente visible pour une action dont l'échec est rare et récupérable.
- **Jamais d'Optimistic Update** pour une action dont l'échec aurait un coût de récupération élevé pour l'utilisateur (ex. suppression destructive déjà confirmée par dialogue, [[DIALOG_LIBRARY.md]] — la confirmation explicite remplace déjà le besoin de réactivité optimiste).
- Toute mutation retourne un `Result<T, E>` cohérent avec [[ERROR_HANDLING.md]] §2 — jamais une exception non gérée qui casserait le rollback optimiste.

## 6. Prefetch

- Préchargement déclenché par intention probable (survol prolongé d'une carte d'album avant clic, changement de piste imminent dans la file — [[CACHE_SYSTEM.md]] §5, préchargement des pochettes déjà acté) — jamais un préchargement systématique de toute donnée accessible, qui gaspillerait la bande passante en contexte de connexion limitée ([[CACHE_SYSTEM.md]] §5, désactivable dans les Paramètres).
- Le préchargement suit toujours la même query key que la requête réelle qu'il anticipe — jamais une clé différente qui empêcherait la déduplication.

## 7. Hydration

Au démarrage, `LocalStore` sert de source d'hydratation initiale pour les domaines de métadonnées (§2) — l'application affiche immédiatement le contenu déjà en cache local pendant qu'un re-fetch de fraîcheur s'exécute en arrière-plan (cohérent avec [[ARCHITECTURE_PRINCIPLES.md]] §3, priorité au local) — jamais un écran de chargement vide au démarrage si une donnée locale existe déjà.

## 8. Persistence

Le cache TanStack Query lui-même (en mémoire) n'est pas la couche de persistance — `LocalStore` l'est déjà ([[DATA_LAYER.md]] §2). Le plugin de persistance TanStack Query (`persistQueryClient`) n'est **pas utilisé** : persisterait une seconde fois une donnée déjà persistée par `LocalStore` via le Repository, violation de « une donnée n'existe qu'une seule fois » — l'hydratation (§7) suffit, aucun mécanisme de persistance redondant.

---

## 9. Ce que ce document ne fait pas

- Ne redéfinit pas quels domaines sont de l'état serveur (voir [[SERVER_STATE.md]]).
- Ne redéfinit pas les Repositories eux-mêmes (voir [[REPOSITORY_PATTERN.md]]).
- Ne redéfinit pas la stratégie de retry réseau (voir [[ERROR_HANDLING.md]] §4, déjà géré par TanStack Query).

## 10. Checklist de validation

- [ ] Toute nouvelle query key suit la structure hiérarchique à trois niveaux (§1).
- [ ] `staleTime`/`gcTime` sont justifiés par la fréquence réelle de changement de la donnée, jamais copiés par défaut (§2).
- [ ] Aucune mutation destructive n'utilise l'Optimistic Update (§5).
- [ ] Aucun plugin de persistance TanStack Query n'est ajouté (§8, redondance interdite).

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Architecture d'état) | Senior TypeScript Engineer |

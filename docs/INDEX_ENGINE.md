# INDEX_ENGINE.md — Cycle de vie de l'index de recherche (Moteur de Recherche)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Search Engine Engineer
> **Documents liés** : [[DATA_LAYER.md]] §3.1, [[SEARCH_INDEX_SPECIFICATION.md]], [[DATABASE_SCHEMA.md]] §1

[[DATA_LAYER.md]] §3.1 pose déjà le principe général (construction à la fin de la synchronisation initiale, mise à jour incrémentale, sérialisation dans `search_index_meta`). Ce document est la mécanique complète de gestion du cycle de vie de l'index — jamais redécidée par [[DATA_LAYER.md]], qui reste la source du principe, pas du détail opérationnel.

---

## 1. Création (index complet)

Déclenchée à la toute première synchronisation ([[SYNC_ENGINE_SPECIFICATION.md]] §1) — chaque entité déjà écrite dans `LocalStore` ([[DATABASE_SCHEMA.md]] §1) est indexée par lot ([[PERFORMANCE_GUIDE.md]] §6quater, traitement par lot déjà acté) au fur et à mesure de son écriture, jamais dans une passe séparée après la synchronisation complète — évite un délai supplémentaire avant que la recherche devienne utilisable.

## 2. Mise à jour incrémentale

Déclenchée par chaque synchronisation incrémentale ([[SYNC_ENGINE_SPECIFICATION.md]] §2) — trois opérations distinctes selon la nature du changement détecté ([[SYNC_ENGINE_SPECIFICATION.md]] §4) :
- **Ajout** : nouvelle entrée insérée dans l'index concerné ([[SEARCH_INDEX_SPECIFICATION.md]]).
- **Modification** : entrée existante réindexée (retrait + réinsertion — FlexSearch ne supporte pas la mise à jour partielle d'un document indexé).
- **Suppression** : entrée retirée de tous les index où elle apparaît (une piste apparaît uniquement dans l'index Tracks, mais un album supprimé retire aussi les références croisées, voir [[SEARCH_INDEX_SPECIFICATION.md]] §5).

**Jamais de réindexation complète pour un changement incrémental** — cohérent avec la règle déjà actée qu'une synchronisation incrémentale ne re-télécharge jamais le catalogue complet ([[SYNC_ENGINE_SPECIFICATION.md]] §2), le même principe s'applique à l'index qui en dérive.

## 3. Réindexation complète (action explicite)

Réservée à trois cas : synchronisation complète manuelle ([[SYNC_ENGINE_SPECIFICATION.md]] §3), changement de version de schéma d'index (§4 ci-dessous), ou action explicite « Réindexer » ([[MAINTENANCE_SYSTEM.md]]) en cas de soupçon d'incohérence. Jamais déclenchée automatiquement par un minuteur ou une heuristique — cohérent avec la règle déjà actée pour les moteurs de calcul de l'état ([[STATISTICS_ENGINE.md]] §4, [[RECOMMENDATION_ENGINE.md]] §3).

## 4. Versionning du schéma d'index

Le schéma d'index (quels champs sont indexés, quelle pondération, [[SEARCH_INDEX_SPECIFICATION.md]]) est versionné indépendamment du schéma de `LocalStore` ([[DATABASE_SCHEMA.md]] §5) — une évolution du schéma d'index (ex. ajout d'un nouveau champ pondéré) déclenche une réindexation complète (§3) au démarrage suivant, sans nécessiter de migration de `LocalStore` lui-même (l'index est un dérivé reconstructible, jamais une source de vérité, cohérent avec [[DOMAIN_MODELS.md]] §4).

## 5. Suppression

- **Suppression d'une entité source** (piste retirée côté serveur) : §2, retrait immédiat.
- **Suppression de l'index entier** (réinitialisation du cache, [[CACHE_SYSTEM.md]] §6) : l'index est un candidat de purge à priorité modérée ([[CACHE_SYSTEM.md]] §2, Search Index Cache) — sa reconstruction ne nécessite aucune requête serveur (contrairement au Metadata Cache), uniquement une réindexation depuis `LocalStore` déjà présent localement.

## 6. Reconstruction

Distincte de la réindexation complète (§3, déclenchée par un changement de donnée/schéma) : la reconstruction répond à une corruption détectée de l'index sérialisé lui-même (`search_index_meta` illisible au démarrage, [[ERROR_HANDLING.md]] §1, `StorageError`) — reconstruction silencieuse en arrière-plan avec repli sur la recherche serveur ([[DATA_LAYER.md]] §3.3) le temps de la reconstruction, jamais un blocage de la fonctionnalité de recherche pendant ce délai.

## 7. Persistance et démarrage

L'index sérialisé est chargé depuis `search_index_meta` ([[DATABASE_SCHEMA.md]] §1) au démarrage — jamais reconstruit systématiquement, cohérent avec [[STACK_DECISIONS.md]] §2 (« sérialisé... pour éviter une reconstruction complète à chaque démarrage »). Un index absent (premier lancement) ou invalide (§6) déclenche le repli déjà acté ([[DATA_LAYER.md]] §3.3).

---

## 8. Ce que ce document ne fait pas

- Ne redéfinit pas les champs indexés par entité (voir [[SEARCH_INDEX_SPECIFICATION.md]]).
- Ne redéfinit pas les algorithmes de tolérance aux fautes (voir [[DATA_LAYER.md]] §3.4).
- Ne redéfinit pas la mécanique de synchronisation qui déclenche les mises à jour (voir [[SYNC_ENGINE_SPECIFICATION.md]]).

## 9. Checklist de validation

- [ ] Aucune mise à jour incrémentale ne déclenche une réindexation complète (§2).
- [ ] Toute évolution du schéma d'index est versionnée et déclenche une réindexation contrôlée (§4), jamais silencieuse.
- [ ] La recherche reste fonctionnelle (repli serveur) pendant toute reconstruction d'index (§6).

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Moteur de Recherche) | Search Engine Engineer |

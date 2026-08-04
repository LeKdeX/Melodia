# CACHE_SYSTEM.md — Architecture du cache local (Phase 11)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal Platform Architect / Frontend Architect
> **Documents liés** : [[PERFORMANCE_GUIDE.md]] §6bis, [[DATA_LAYER.md]], [[ARTWORK_SYSTEM.md]]

> **Cadrage** : [[PERFORMANCE_GUIDE.md]] §6bis a déjà posé le cache de pochettes/waveform de façon narrow (angle performance). Ce document est la spécification systémique complète — architecture, priorités, expiration, compression, réparation — pour tous les types de cache du produit, non redécidant ce qui est déjà acté.

---

## 1. Architecture — catégories de cache

| Catégorie | Contenu | Persistance |
|---|---|---|
| Metadata Cache | Métadonnées de bibliothèque (titres, albums, artistes) | Disque, via `LocalStore` ([[DATA_LAYER.md]]) |
| Image Cache | Pochettes/portraits en résolution d'affichage réelle | Disque, LRU |
| Artwork Cache | Version haute résolution utilisée pour l'extraction de couleur ([[ARTWORK_SYSTEM.md]] §4) | Disque, distinct d'Image Cache |
| Waveform Cache | Représentation de forme d'onde pré-calculée | Disque, généré à la demande |
| Lyrics Cache | Paroles déjà récupérées ([[LYRICS_SYSTEM.md]]) | Disque, invalidé si la source change |
| Statistics Cache (ajout Phase 13) | Résultat calculé des agrégats d'écoute ([[STATISTICS_ENGINE.md]] §3) | Disque (`statistics_cache`, [[DATABASE_SCHEMA.md]]), jamais source de vérité |
| Recommendation Cache (ajout Phase 13) | Résultat de scoring d'un mix déjà généré ([[RECOMMENDATION_ENGINE.md]] §2) | Disque, horodaté, réévalué selon [[RECOMMENDATION_ENGINE.md]] §3 |
| Search Index Cache (ajout Phase 13) | Index FlexSearch sérialisé ([[DATA_LAYER.md]] §3) | Disque (`search_index_meta`, [[DATABASE_SCHEMA.md]]), reconstruit si absent au démarrage |

**Règle de séparation** : chaque catégorie a son propre cycle de vie et sa propre limite de taille — jamais une seule zone de cache fourre-tout où un nettoyage d'une catégorie affecterait accidentellement une autre.

## 2. Priorités

En cas de contrainte d'espace (limite atteinte, §3), l'ordre de purge est : 1) Waveform Cache, Statistics Cache et Recommendation Cache (reconstructibles à faible coût, purement locaux, [[STATISTICS_ENGINE.md]]/[[RECOMMENDATION_ENGINE.md]]) ; 2) Image Cache basse priorité (éléments non consultés récemment) ; 3) Lyrics Cache ; 4) Search Index Cache (coût de reconstruction modéré — réindexation locale, pas de requête serveur mais un calcul non négligeable, [[DATA_LAYER.md]] §3) ; 5) Metadata Cache et Artwork Cache en dernier (coût de reconstruction le plus élevé — nécessite une requête serveur). Jamais une purge qui affecte le contenu téléchargé explicitement par l'utilisateur ([[DOWNLOAD_SYSTEM.md]] §6, cycles de vie séparés déjà actés).

## 3. Expiration

| Catégorie | Politique |
|---|---|
| Metadata Cache | Invalidée par la synchronisation incrémentale ([[SYNC_ENGINE_SPECIFICATION.md]] §4), jamais par une durée fixe arbitraire |
| Image/Artwork Cache | LRU avec taille maximale bornée par plateforme ([[PERFORMANCE_GUIDE.md]] §6bis), pas de durée d'expiration temporelle — un élément reste tant qu'il est consulté |
| Waveform Cache | Identique à Image Cache |
| Lyrics Cache | Invalidée uniquement si la source de paroles change (rare), jamais par le temps |

## 4. Compression

Metadata Cache : format compressé pour les bibliothèques de référence à 200 000 titres ([[PERFORMANCE_BUDGET.md]] §1) — décompression à la volée, jamais un stockage non compressé qui multiplierait l'empreinte disque sans bénéfice. Image/Artwork Cache : format déjà compressé nativement par le codec image (pas de recompression supplémentaire qui dégraderait la qualité sans gain d'espace significatif).

## 5. Préchargement

Voir [[PREMIUM_DETAILS.md]] §33 — pochettes de la file suivante préchargées discrètement. Ce document précise la règle systémique : le préchargement est désactivable dans les Paramètres ([[SETTINGS_SYSTEM.md]] §5) pour les connexions limitées, jamais un comportement forcé qui consommerait des données mobiles sans consentement.

## 6. Nettoyage

Manuel (Cache Manager, [[SETTINGS_COMPONENTS.md]], confirmation via [[DIALOG_LIBRARY.md]] §5) ou automatique si une limite de taille est atteinte (purge par priorité, §2) — jamais un nettoyage automatique complet qui surprendrait l'utilisateur, seule la purge par priorité opère silencieusement en tâche de fond.

## 7. Réparation

Détection d'une entrée corrompue (échec de lecture/décodage) au moment de la consultation — l'entrée est retirée et reconstruite silencieusement à la prochaine requête, jamais un crash ou un blocage de l'interface pour une seule entrée corrompue ([[FOUNDATION_TESTING_GUIDE.md]] §5ter, test d'intégrité correspondant).

## 8. Reconstruction

Action explicite depuis [[MAINTENANCE_SYSTEM.md]] — purge complète d'une catégorie puis reconstruction progressive à l'usage (jamais un blocage pendant la reconstruction, le contenu redevient disponible au fil des besoins réels).

---

## 9. Checklist de validation

- [ ] Chaque catégorie de cache a une politique d'expiration et de priorité explicite, aucune ambiguïté.
- [ ] Aucune purge de cache n'affecte jamais un téléchargement explicite de l'utilisateur.
- [ ] Une entrée corrompue se répare silencieusement, jamais par un crash.

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 11) | Principal Platform Architect / Frontend Architect |
| 0.2.0 | 2026-08-04 | Phase 13 : ajout des catégories Statistics/Recommendation/Search Index Cache (§1) et mise à jour de l'ordre de purge (§2) — au lieu de créer CACHE_ENGINE.md en doublon | Performance Engineer |

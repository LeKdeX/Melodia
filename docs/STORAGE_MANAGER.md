# STORAGE_MANAGER.md — Politique de stockage global (Plateforme Offline)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Storage Engineer
> **Documents liés** : [[CACHE_SYSTEM.md]], [[DOWNLOAD_SYSTEM.md]] §6, [[MAINTENANCE_SYSTEM.md]]

[[CACHE_SYSTEM.md]] gère la politique par catégorie de cache. [[DOWNLOAD_SYSTEM.md]] §6 distingue déjà stockage de téléchargement vs cache technique. [[MAINTENANCE_SYSTEM.md]] expose les outils manuels. Aucun des trois ne répond à la question globale : **quelle est la politique de quota qui s'applique à l'ensemble du stockage local Melodia**, tous types confondus. Ce document est cette politique — jamais une redécision des règles par catégorie déjà actées.

---

## 1. Occupation disque — vue globale

Trois zones distinctes, jamais mélangées dans une seule métrique ([[DIAGNOSTICS_SYSTEM.md]] §4, déjà acté) :
- **Téléchargements** ([[DOWNLOAD_SYSTEM.md]]) — contenu explicitement choisi par l'utilisateur.
- **Cache technique** ([[CACHE_SYSTEM.md]]) — Metadata/Image/Artwork/Waveform/Lyrics/Statistics/Recommendation/Search Index.
- **Base de données applicative** ([[DATABASE_SCHEMA.md]]) — entités, historique, préférences, généralement négligeable en taille face aux deux zones précédentes.

## 2. Quota

- Aucun quota strict imposé par Melodia — l'application respecte le quota réel du système d'exploitation/du navigateur (`navigator.storage.estimate()`, déjà mentionné [[INDEXEDDB_ARCHITECTURE.md]] §6).
- Avertissement affiché à l'utilisateur à l'approche de la limite système (seuil configurable, ex. 90 % du quota estimé) — jamais un blocage silencieux qui ferait simplement échouer une écriture sans explication.
- Un quota utilisateur **optionnel** (limite auto-imposée, ex. « ne jamais dépasser 20 Go ») peut être configuré dans [[SETTINGS_SYSTEM.md]] — distinct du quota système, cible en priorité le cache technique (§3) avant les téléchargements explicites, cohérent avec la priorité déjà actée au contenu téléchargé par l'utilisateur ([[CACHE_SYSTEM.md]] §2).

## 3. Nettoyage — ordre global entre zones

Quand une limite (système ou utilisateur, §2) est approchée, l'ordre de purge **entre zones** est : 1) Cache technique, dans l'ordre de priorité déjà acté par catégorie ([[CACHE_SYSTEM.md]] §2) ; 2) Téléchargements suggérés automatiquement mais jamais réécoutés depuis longtemps ([[DOWNLOAD_SYSTEM.md]] §5ter, signal déjà disponible) — jamais purgés sans confirmation, seulement suggérés à l'utilisateur ; 3) Téléchargements explicites récents — **jamais purgés automatiquement**, uniquement par action manuelle de l'utilisateur ([[MAINTENANCE_SYSTEM.md]] §4-5).

## 4. Compression

- Cache technique : voir [[CACHE_SYSTEM.md]] §4 (déjà acté), non redécidé ici.
- Téléchargements : jamais compressés au-delà de l'encodage audio déjà choisi par l'utilisateur ([[AUDIO_ENGINE.md]] §5bis, profil de qualité) — une compression supplémentaire dégraderait un contenu que l'utilisateur a explicitement choisi de posséder à une qualité donnée.

## 5. Suppression intelligente

Un candidat de suppression suggéré (jamais automatique pour un contenu téléchargé, §3) combine trois signaux déjà disponibles ailleurs, sans nouveau calcul : temps depuis la dernière écoute (`HistoryRepository`), taille occupée (métadonnée de fichier), et statut favori (`FavoriteRepository` — un élément favori n'est jamais suggéré à la suppression, quel que soit son ancienneté d'écoute).

## 6. Gestion des erreurs disque

- **Écriture échouée** (disque plein, permission refusée) : traitée comme `StorageError` ([[ERROR_HANDLING.md]] §1) — l'opération en cours échoue proprement (jamais une corruption partielle, cohérent avec les transactions atomiques déjà actées, [[INDEXEDDB_ARCHITECTURE.md]] §4), un message actionnable propose de libérer de l'espace (renvoi vers §3).
- **Disque retiré/inaccessible en cours d'usage** (support amovible, cas Desktop) : traité comme une perte de connexion au stockage — les opérations en attente sont mises en pause (jamais perdues) jusqu'au retour du support, cohérent avec le principe déjà acté qu'une interruption reprend au dernier point valide ([[SYNC_ENGINE_SPECIFICATION.md]] §7ter, même principe appliqué au stockage plutôt qu'au réseau).

---

## 7. Ce que ce document ne fait pas

- Ne redéfinit pas la politique par catégorie de cache (voir [[CACHE_SYSTEM.md]]).
- Ne redéfinit pas la gestion de la file de téléchargement (voir [[DOWNLOAD_SYSTEM.md]]).
- Ne redéfinit pas les outils manuels de maintenance (voir [[MAINTENANCE_SYSTEM.md]]).

## 8. Checklist de validation

- [ ] Aucun téléchargement explicite n'est jamais purgé automatiquement (§3).
- [ ] Un élément favori n'est jamais suggéré à la suppression (§5).
- [ ] Toute écriture disque échouée est traitée comme `StorageError`, jamais une corruption silencieuse (§6).

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Plateforme Offline) | Storage Engineer |

# DATA_LAYER.md — Couche de données concrète (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Principal Software Architect
> **Documents liés** : [[ARCHITECTURE_PRINCIPLES.md]] §2-4, [[STACK_DECISIONS.md]] §2, [[JELLYFIN_INTEGRATION.md]]

Ce document rend concrètes les règles d'usage de l'état ([[ARCHITECTURE_PRINCIPLES.md]] §4), la stratégie de cache local ([[ARCHITECTURE_PRINCIPLES.md]] §3) et le moteur de recherche ([[STACK_DECISIONS.md]] §2).

---

## 1. Règles d'usage du state (arbre de décision)

Pour toute nouvelle donnée à stocker, dans cet ordre :

1. **La donnée est locale à un seul composant et ne survit pas à son démontage ?** → `useState`/`useReducer` local. Jamais dans un store global.
2. **La donnée provient du serveur (Jellyfin, via `MusicSource`) ?** → TanStack Query, jamais copiée dans Zustand (voir [[ARCHITECTURE_PRINCIPLES.md]] §4, invariant d'architecture).
3. **La donnée est un état applicatif partagé entre plusieurs features, éphémère ou persisté localement (lecture en cours, volume, thème) ?** → Zustand, un store par domaine ([[CODING_STANDARDS.md]] §4.3).
4. **La donnée peut être calculée à partir d'un état existant ?** → sélecteur dérivé (Zustand selector ou `useMemo`), jamais un état stocké et synchronisé manuellement en doublon (source de désynchronisation, contraire à [[ENGINEERING_GUIDE.md]] §1.3).

Un composant ou un hook qui hésite entre deux de ces catégories est un signal que la donnée est mal scoping — à trancher en revue de code avant merge, pas après (voir [[DEFINITION_OF_DONE.md]]).

---

## 2. Cache local (`LocalStore`) — schéma, migration, cycle de vie

### 2.1 Schéma versionné
Le schéma expose au minimum les entités suivantes : `tracks`, `albums`, `artists`, `playlists`, `playback_state`, `search_index_meta`, `sync_meta` (horodatage de dernière synchronisation par bibliothèque). Chaque entité porte un champ `schema_version` implicite au niveau de la migration, pas au niveau de la ligne.

### 2.2 Migrations
- Une migration est un module numéroté (`001_initial.ts`, `002_add_replaygain.ts`), appliqué de façon idempotente et séquentielle au démarrage.
- Aucune migration destructive sans étape de sauvegarde (export JSON local) préalable, restaurable en cas d'échec (cohérent avec [[PROJECT_CHARTER.md]] §5, risque de corruption du stockage local).
- Une migration échouée bloque le démarrage avec un message explicite proposant la réinitialisation du cache (jamais un état partiellement migré silencieux).

### 2.3 Expiration et nettoyage
- Les métadonnées (pistes, albums, artistes) n'expirent pas automatiquement — elles sont invalidées explicitement par un signal de synchronisation ([[JELLYFIN_INTEGRATION.md]] §3, sync incrémentale).
- Le contenu audio téléchargé pour l'écoute hors ligne suit une politique de nettoyage configurable par l'utilisateur (taille maximale de cache, ancienneté), jamais une suppression silencieuse sans confirmation pour du contenu explicitement téléchargé par l'utilisateur.
- Les entrées d'index de recherche orphelines (piste supprimée côté serveur) sont purgées à chaque cycle de synchronisation.

### 2.4 Performance
Le cache local est interrogé exclusivement via des requêtes indexées (jamais de scan complet de table pour un accès de premier ordre comme « toutes les pistes d'un album ») — index sur `artist_id`, `album_id`, `playlist_id` a minima. Vérifié par un test de performance dédié sur une bibliothèque synthétique de 200 000 titres (voir [[PERFORMANCE_GUIDE.md]] et l'amendement de [[PERFORMANCE_BUDGET.md]]).

---

## 3. Moteur de recherche (FlexSearch)

### 3.1 Construction et maintenance de l'index
- L'index FlexSearch est construit une première fois à la fin de la synchronisation initiale, puis mis à jour de façon incrémentale à chaque synchronisation ultérieure (jamais reconstruit intégralement sauf changement de schéma d'index).
- L'index est sérialisé et persisté dans `LocalStore` pour éviter une reconstruction complète à chaque démarrage à froid (cohérent avec le budget de démarrage, [[PERFORMANCE_BUDGET.md]] §1).

### 3.2 Champs indexés et pondération
Titre de piste (poids le plus élevé), nom d'artiste, nom d'album, genre — recherche floue tolérante aux fautes de frappe légères et à l'ordre des mots, avec pondération favorisant les correspondances de titre exact.

### 3.3 Repli serveur
Si l'index local n'existe pas encore (premier lancement, synchronisation initiale en cours) : la recherche interroge directement l'endpoint Jellyfin, avec un indicateur visuel explicite (« Indexation en cours ») plutôt qu'un résultat vide non expliqué.

---

## 4. Checklist de validation

- [ ] L'arbre de décision d'état (§1) couvre tous les cas rencontrés dans les features prévues au Phase 1.
- [ ] Le choix Dexie/SQLite est justifié comme complémentarité de plateforme, pas comme choix arbitraire — voir [[TECHNOLOGY_COMPARISONS.md]] §4.
- [ ] La tenue du cache local et de l'index à 200 000-300 000 titres est validée dans [[EXTREME_SCENARIOS.md]] §1.
- [ ] Les risques de divergence entre `SqliteStore`/`IndexedDbStore` sont couverts dans [[RISK_REGISTER_TECHNICAL.md]] §4.
- [ ] Le comportement hors ligne/connexion interrompue est validé dans [[EXTREME_SCENARIOS.md]] §2.

## 5. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | Principal Software Architect |
| 0.2.0 | 2026-08-03 | Ajout de la checklist de validation et des renvois vers les documents du complément Phase 0.5 | Principal Software Architect |

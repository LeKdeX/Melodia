# DATA_LAYER.md — Couche de données concrète (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 0.5.1
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

### 3.4 Tolérance aux fautes et normalisation (ajout Phase 13)

- **Fuzzy Search** : FlexSearch configuré en tolérance partielle (distance d'édition limitée) sur le titre — une faute de frappe légère (une lettre manquante ou inversée) retourne toujours le résultat attendu en tête de liste, jamais un résultat vide.
- **Préfixes** : recherche par préfixe activée par défaut (`"beat"` retrouve `"Beatles"`) — cohérent avec l'attente d'une recherche instantanée à la frappe ([[PERFORMANCE_BUDGET.md]] §2).
- **Accents et normalisation** : les champs indexés sont normalisés (suppression des diacritiques, casse uniforme) à l'indexation **et** à la requête — une recherche `"deja vu"` retrouve `"Déjà Vu"` sans que l'utilisateur ait à taper l'accent exact.
- **Synonymes** : un dictionnaire minimal de synonymes courants (ex. abréviations de featuring `"feat."`/`"ft."`/`"featuring"`) est appliqué à la requête avant recherche — pas un moteur de synonymes extensif, qui dépasserait le besoin réel actuel (YAGNI, [[ARCHITECTURE_PRINCIPLES.md]] §8bis).
- **Classement** : pondération déjà actée (§3.2, titre exact > titre partiel > artiste > album > genre) — un score de pertinence FlexSearch natif ordonne au sein de chaque niveau de pondération, jamais un ordre alphabétique par défaut qui masquerait la pertinence réelle. Voir [[RANKING_ENGINE.md]] pour le second niveau de classement (popularité/historique/favoris), qui compose avec ce niveau sans le redécider.

### 3.5 Recherche multi-mots, partielle et intelligente (ajout Moteur de Recherche)

- **Multi-mots** : chaque mot de la requête est recherché indépendamment puis les résultats intersectés (tous les mots doivent apparaître, ordre libre) — cohérent avec la tolérance à l'ordre des mots déjà actée (§3.2, « recherche floue tolérante... à l'ordre des mots »), cette section précise le mécanisme exact (intersection, jamais une simple concaténation de la requête complète comme un seul terme).
- **Recherche partielle** : un terme de requête correspond à une sous-chaîne de n'importe quelle longueur au sein d'un champ indexé (pas seulement un préfixe, voir ci-dessus qui couvre spécifiquement le préfixe) — ex. `"eatles"` retrouve `"Beatles"`. Activée par défaut pour le titre (champ le plus consulté), plus restrictive sur les champs à pondération faible ([[SEARCH_SPECIFICATION.md]] §3, compositeur/label) pour limiter le bruit de faux positifs sur du texte long.
- **Recherche intelligente** : terme du cadrage désignant la combinaison des mécanismes déjà actés ci-dessus (fuzzy, préfixe, multi-mots, partielle, synonymes) appliqués ensemble à chaque requête par défaut — jamais un mode à activer séparément, cohérent avec l'objectif d'une recherche qui « fonctionne » sans configuration ([[SEARCH_SPECIFICATION.md]] §1).

## 3bis. Cette phase — synthèse, cycle de vie complet et auto-revue (ajout Phase 13)

> Ce document reste le point d'entrée de la couche donnée ([[DOCUMENTATION_GUIDE.md]] §1) — cette section en fait explicitement le capstone de la Phase 13, sans redécider le contenu déjà détaillé dans les documents spécialisés qu'elle cartographie.

### 3bis.1 Cycle de vie complet d'une donnée (bonus du cadrage)

[[DATA_FLOW.md]] (Phase 12) décrit déjà le pipeline de lecture complet. Le cycle ci-dessous l'étend avec le **chemin d'écriture retour**, qui n'avait jamais été tracé de bout en bout :

```
Jellyfin (serveur)
   ↓ (lecture, DATA_FLOW.md)
API → DTO → Mapper → Domain → Repository → Cache → Store → UI
   ↓
Modification par l'utilisateur (ex. ajout à une playlist, favori, progression de lecture)
   ↓
Repository (écriture) — MAPPER_GUIDE.md §4, Domain → DTO uniquement si la modification doit remonter à Jellyfin
   ↓
LocalStore (écriture immédiate, INDEXEDDB_ARCHITECTURE.md §4, transaction atomique)
   ↓
Synchronisation (SYNC_ENGINE_SPECIFICATION.md) — différée si hors ligne (OFFLINE_SYSTEM.md §4)
   ↓
Jellyfin (serveur) — uniquement pour les trois cas restreints de MAPPER_GUIDE.md §4
```

**Règle centrale** : l'écriture locale (`LocalStore`) est toujours immédiate et jamais bloquée par la disponibilité du serveur — c'est la synchronisation vers Jellyfin qui est différée si nécessaire, jamais l'inverse (cohérent avec [[ARCHITECTURE_PRINCIPLES.md]] §3, priorité au local, déjà acté depuis la Phase 0).

### 3bis.2 Carte des documents de la couche donnée (Phase 13)

9 nouveaux documents + extension de [[JELLYFIN_INTEGRATION.md]] (§7bis), [[CACHE_SYSTEM.md]] (§1-2), [[SYNC_ENGINE_SPECIFICATION.md]] (§1, §7bis-ter), [[DATA_LAYER.md]] (ce document, §3.4 et cette section), [[DOWNLOAD_SYSTEM.md]] (§5quater), [[LOGGING_SYSTEM.md]] (§1), [[SECURITY_GUIDE.md]] (§3ter), [[PERFORMANCE_GUIDE.md]] (§6quater) et [[TESTING_STRATEGY.md]] (§9bis).

**12 des 21 livrables demandés n'ont pas donné lieu à un fichier séparé** — `API_CLIENT.md`, `CACHE_ENGINE.md`, `SYNC_ENGINE.md`, `IMPORT_ENGINE.md`, `SEARCH_INDEX_ENGINE.md`, `OFFLINE_ENGINE.md`, `DOWNLOAD_ENGINE.md`, `LOGGING_GUIDE.md`, `DATA_SECURITY.md`, `DATA_PERFORMANCE.md`, `DATA_TESTING_GUIDE.md` recoupaient chacun un document déjà profond des Phases 0.5/9/11/12, étendus plutôt que dupliqués — et `DATA_LAYER.md` (ce document) existait déjà, complété en capstone plutôt que réécrit. Seuls [[DTO_SPECIFICATION.md]], [[DOMAIN_MODELS.md]], [[MAPPER_GUIDE.md]], [[REPOSITORY_PATTERN.md]], [[DATABASE_SCHEMA.md]], [[INDEXEDDB_ARCHITECTURE.md]], [[STATISTICS_ENGINE.md]], [[RECOMMENDATION_ENGINE.md]] et [[PLAYLIST_ENGINE.md]] étaient réellement nouveaux — parce qu'aucun document existant ne descendait au niveau d'implémentation concret qu'ils couvrent (DTO par entité, repository par domaine, schéma de table concret, moteurs de calcul distincts du comportement produit).

### 3bis.3 Auto-revue comparative

> **Avertissement d'honnêteté** : comme [[TECHNICAL_BLUEPRINT.md]] §5bis, cette comparaison s'appuie sur la connaissance générale du modèle, pas un audit de code source en direct — à revérifier avant toute décision qui s'appuierait fortement dessus.

| Produit | Ce qu'il illustre | Rapprochement avec la couche donnée de Melodia |
|---|---|---|
| Spotify | Cache local agressif, lecture ininterrompue même en connectivité dégradée | Confirme la priorité au local déjà actée ([[ARCHITECTURE_PRINCIPLES.md]] §3) et la séparation cache technique/téléchargement explicite ([[CACHE_SYSTEM.md]] §1) |
| Plexamp | Client pour serveur auto-hébergé, bibliothèque locale synchronisée en arrière-plan | Le rapprochement produit le plus direct — valide l'architecture `MusicSource`/`LocalStore` et la synchronisation *pull* différée ([[SYNC_ENGINE_SPECIFICATION.md]]) |
| VS Code | État local-first avec synchronisation de configuration en arrière-plan, jamais bloquante | Valide la règle centrale de §3bis.1 (écriture locale immédiate, synchronisation différée) |
| Obsidian | Stockage local en source de vérité, aucune dépendance à un serveur pour fonctionner | Rapprochement direct avec le choix de ne jamais bloquer une fonctionnalité locale sur la disponibilité réseau ([[OFFLINE_SYSTEM.md]] §1) |
| Notion | Cache optimiste avec réconciliation silencieuse au retour en ligne | Valide le comportement déjà acté de synchronisation automatique silencieuse au retour en ligne ([[OFFLINE_SYSTEM.md]] §4) — Notion va plus loin sur la résolution de conflit collaborative temps réel, un écart assumé (playlists collaboratives, statut encore ouvert) |
| Linear | Index de recherche local performant, jamais dépendant de la latence serveur | Valide FlexSearch comme index local plutôt qu'une recherche serveur systématique ([[DATA_LAYER.md]] §3) |
| Nextcloud Desktop | Moteur de synchronisation isolé et dédié, journalisé indépendamment du reste de l'application | Valide `SYNC_ENGINE_SPECIFICATION.md` comme document isolé et la catégorie « logs synchronisation » dédiée ([[LOGGING_SYSTEM.md]] §1) |

**Conclusion** : aucun écart de fond trouvé — cette phase valide et approfondit une architecture déjà cohérente avec ces sept références plutôt que d'en révéler une lacune structurelle. Le seul écart assumé (Notion, résolution de conflit collaborative temps réel) était déjà identifié et documenté avant cette auto-revue ([[OFFLINE_SYSTEM.md]] §6, [[PLAYLIST_ENGINE.md]] §5).

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
| 0.3.0 | 2026-08-04 | Phase 13 : ajout §3.4 (fuzzy search, préfixes, accents, synonymes, classement) — au lieu de créer SEARCH_INDEX_ENGINE.md en doublon | Senior Data Architect |
| 0.4.0 | 2026-08-04 | Phase 13 : ajout §3bis (capstone — cycle de vie complet avec chemin d'écriture retour, carte des documents de la phase, auto-revue comparative Spotify/Plexamp/VS Code/Obsidian/Notion/Linear/Nextcloud Desktop) | Principal Software Architect |
| 0.5.0 | 2026-08-04 | Moteur de Recherche : ajout §3.5 (recherche multi-mots, partielle, intelligente) — au lieu de créer SEARCH_ALGORITHMS.md en doublon de §3.4 | Information Retrieval Specialist |
| 0.5.1 | 2026-08-05 | TASK-002 : correction du numéro de version en en-tête, resté désynchronisé (« 0.1.0 ») du tableau ci-dessus depuis l'amendement 0.2.0 — trouvé lors de la revue croisée manuelle des 10 documents à plus forte cascade | Staff Technical Lead |

# OFFLINE_SYSTEM.md — Système hors ligne (Phase 9)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Audio Software Engineer / Frontend Architect
> **Documents liés** : [[STATE_COMPONENTS.md]] (Offline State), [[ARCHITECTURE_PRINCIPLES.md]] §3, [[COLLECTION_COMPONENTS.md]] §6

> **Cadrage** : `Offline State` a déjà un traitement compact dans [[STATE_COMPONENTS.md]] (bannière persistante + fonctionnalités dégradées listées). Ce document approfondit ce qui restait non spécifié : synchronisation au retour en ligne, résolution de conflits, bibliothèque locale. **Ce document est désormais le capstone de la plateforme Offline** — il cartographie [[SYNC_ENGINE_SPECIFICATION.md]], [[CONFLICT_RESOLUTION.md]], [[CACHE_SYSTEM.md]], [[DOWNLOAD_SYSTEM.md]], [[STORAGE_MANAGER.md]], [[RESILIENCE_GUIDE.md]] et [[BACKGROUND_TASKS.md]] sans redécider leur contenu.

---

## 0. Constitution de la plateforme Offline

1. **Le réseau est considéré comme indisponible** — chaque fonctionnalité est conçue en supposant l'absence de réseau d'abord, jamais l'inverse (cohérent avec [[ARCHITECTURE_PRINCIPLES.md]] §3, déjà acté).
2. **Les données locales sont prioritaires** — `LocalStore` est toujours consulté avant toute tentative réseau, jamais l'inverse ([[DATA_LAYER.md]] §1).
3. **Le serveur est une source de vérité distante, jamais la seule** — les données strictement locales (favoris, historique, playlists locales) ont `LocalStore` comme unique source de vérité ([[DOMAIN_MODELS.md]] §3).
4. **La synchronisation est asynchrone** — jamais un blocage de l'interface en attente d'un cycle de synchronisation ([[SYNC_ENGINE_SPECIFICATION.md]]).
5. **Les opérations sont idempotentes** — rejouer une opération déjà appliquée ne produit jamais de doublon ni d'effet supplémentaire ([[CONFLICT_RESOLUTION.md]] §1).
6. **Les conflits sont exceptionnels** — le chemin nominal ne rencontre jamais de conflit ; un conflit ne survient que dans la fenêtre étroite d'une modification concurrente pendant une déconnexion ([[CONFLICT_RESOLUTION.md]] §1).
7. **Aucune donnée utilisateur n'est jamais perdue** — principe absolu, vérifiable à chaque mécanisme de ce document et de ceux qu'il cartographie (§9 checklist).

## 0bis. Schéma global de la plateforme

### 0bis.1 Diagramme et responsabilités

```
Jellyfin (source de vérité distante)
   ↓
Sync Service (SYNC_ENGINE_SPECIFICATION.md)
   ↓
Conflict Resolver (CONFLICT_RESOLUTION.md)
   ↓
Repository (REPOSITORY_PATTERN.md)
   ↓
IndexedDB / SQLite (DATABASE_SCHEMA.md, INDEXEDDB_ARCHITECTURE.md)
   ↓
Cache (CACHE_SYSTEM.md, STORAGE_MANAGER.md)
   ↓
Stores (STORE_SPECIFICATIONS.md)
   ↓
UI
```

| Couche | Peut dépendre de | Ne doit jamais dépendre de |
|---|---|---|
| Sync Service | `MusicSource`, Repository (écriture) | UI, Stores |
| Conflict Resolver | Repository, journal de changements locaux ([[SYNC_ENGINE_SPECIFICATION.md]] §4bis) | UI — une résolution ne bloque jamais sur une décision d'interface (§0, principe 4) |
| Repository | `LocalStore`, `MusicSource` | React, Zustand ([[REPOSITORY_PATTERN.md]] §1, déjà acté) |
| Cache | Repository | Stores directement — un store ne lit jamais le cache sans passer par un Repository/une query |

### 0bis.2 Cycle complet (bonus du cadrage)

```
Connexion
   ↓
Synchronisation (SYNC_ENGINE_SPECIFICATION.md §1-3)
   ↓
Indexation (INDEX_ENGINE.md)
   ↓
Cache (CACHE_SYSTEM.md)
   ↓
Lecture (AUDIO_ENGINE.md)
   ↓
Modification locale (favori, playlist — DOMAIN_MODELS.md §3)
   ↓
Journal (SYNC_ENGINE_SPECIFICATION.md §4bis)
   ↓
Resynchronisation (retour en ligne, §4 de ce document)
   ↓
Résolution des conflits (CONFLICT_RESOLUTION.md)
   ↓
Validation (SYNC_ENGINE_SPECIFICATION.md §7ter)
```

### 0bis.3 Matrice bonus — moteurs reliés

| Moteur | Dépend de | Alimente |
|---|---|---|
| Sync Engine | Repository Layer, `MusicSource` | Cache Engine (invalidation), Conflict Resolver |
| Download Engine | Repository Layer, Storage Manager | Cache Engine (statut « téléchargé »), Audio Engine (résolution de source locale) |
| Cache Engine | Repository Layer, Database | Search Engine (Search Index Cache), State Management (hydratation) |
| Search Engine | Database (index), Repository Layer | State Management (`searchStore`) |
| Audio Engine | Repository Layer (`getPlaybackSource`), State Management (`playerStore`) | Statistics Engine (historique d'écoute) |
| Database | — (fondation) | Repository Layer exclusivement — jamais consulté directement par un moteur |
| Repository Layer | Database, `MusicSource` | Tous les moteurs ci-dessus |
| State Management | Repository Layer (via TanStack Query), tous les moteurs (événements) | UI |

### 0bis.4 Extensibilité — préparé sans réécriture

| Extension | Statut | Point d'insertion |
|---|---|---|
| Plusieurs serveurs Jellyfin | Préparé ([[SEARCH_ENGINE.md]] §0bis.4, isolation de session déjà actée [[JELLYFIN_INTEGRATION.md]] §6) | Un `Sync Service` par serveur, `Conflict Resolver` déjà scoping par entité donc par session |
| Synchronisation cloud | **Tension avec la charte** ([[EVOLVABILITY.md]] §12, déjà signalée) — une synchronisation cloud centralisée opérée par le projet contredirait [[PROJECT_CHARTER.md]] §4 | Non préparé activement, cohérent avec la tension déjà actée |
| Sauvegarde distante | Préparé — l'export déjà acté ([[IMPORT_EXPORT_SYSTEM.md]]) est la fondation d'une sauvegarde distante future (destination différente, mécanisme identique) | Extension du mécanisme d'export existant |
| Synchronisation entre appareils | Dépend de la stratégie de résolution de conflit multi-appareils, statut déjà ouvert ([[ARCHITECTURE_PRINCIPLES.md]] §3.3) | `Conflict Resolver` déjà conçu par entité ([[CONFLICT_RESOLUTION.md]] §2), extensible à un troisième participant (un second appareil) sans réécriture de la matrice |
| Lecture collaborative | **Non préparé — gap honnête** (cohérent avec [[AUDIO_ENGINE.md]] §10, même statut déjà signalé) | Nécessiterait une synchronisation d'état temps réel non conçue |
| Partage de playlists | Dépend du statut des playlists collaboratives, déjà ouvert ([[PLAYLIST_ENGINE.md]] §5) | `Playlist` a déjà un identifiant stable exportable ([[IMPORT_EXPORT_SYSTEM.md]]), fondation suffisante |
| Synchronisation temps réel | **Écart assumé face à Linear/Notion** (déjà signalé, [[DATA_LAYER.md]] §3bis.3) — Melodia reste *pull* déclenché, jamais temps réel bidirectionnel | Changerait la stratégie de [[ARCHITECTURE_PRINCIPLES.md]] §3.3, hors périmètre sans ADR dédié |

### 0bis.5 Auto-revue comparative

> **Avertissement d'honnêteté** : connaissance générale du modèle, pas un audit de code source en direct.

| Référence | Ce qu'elle illustre | Rapprochement avec Melodia |
|---|---|---|
| Spotify | Cache local robuste, dégradation progressive en connectivité faible | Confirme §0, principe 1 |
| Plexamp | Client offline-first pour serveur auto-hébergé, priorité au contenu local | Rapprochement le plus direct — valide l'ensemble de ce document |
| Obsidian | Stockage local en source de vérité unique, aucune dépendance serveur pour fonctionner | Confirme §0, principe 3 |
| Notion | Cache optimiste, réconciliation silencieuse au retour en ligne | Valide §4 (synchronisation automatique silencieuse) — écart assumé sur le temps réel déjà signalé (§0bis.4) |
| VS Code | Synchronisation de configuration en arrière-plan jamais bloquante | Valide §0, principe 4 |
| Nextcloud Desktop | Moteur de synchronisation isolé, journalisation dédiée | Valide l'isolation Sync Service/Conflict Resolver (§0bis.1) |
| Dropbox | Résolution de conflit par fichier avec conservation des deux versions en cas d'ambiguïté | Rapproche de [[CONFLICT_RESOLUTION.md]] §4 (fusion automatique limitée, repli sur dernier écrit gagne + notification plutôt qu'une perte) |
| Syncthing | Synchronisation pair-à-pair sans serveur central, résolution de conflit par horodatage | Valide la règle par défaut déjà actée ([[ARCHITECTURE_PRINCIPLES.md]] §3.3, dernier écrit gagne) |
| Resilio Sync | Synchronisation par delta, jamais un transfert complet pour un petit changement | Valide Delta Sync déjà acté ([[SYNC_ENGINE_SPECIFICATION.md]] §7bis) |
| Apple Music | Téléchargements hors ligne avec gestion de qualité et de stockage dédiée | Valide [[DOWNLOAD_SYSTEM.md]] et [[STORAGE_MANAGER.md]] |

**Conclusion** : aucune référence ne contredit un choix déjà acté. Deux écarts assumés déjà documentés ailleurs (synchronisation cloud écartée par la charte, synchronisation temps réel non engagée) sont confirmés cohérents plutôt que découverts pour la première fois ici.

## 0ter. Vérification de cohérence

| Document vérifié | Résultat |
|---|---|
| [[DATA_LAYER.md]] | Cohérent — `LocalStore` reste l'unique interface de persistance, non redécidée |
| [[STATE_MANAGEMENT.md]] | Cohérent — aucun store ne duplique une donnée déjà gérée par un Repository ([[STORE_SPECIFICATIONS.md]] §3) |
| [[AUDIO_ENGINE.md]] | Cohérent — la résolution de source locale/cache/streaming (§0bis.2 de ce document) reste la même que celle déjà actée |
| [[CACHE_SYSTEM.md]] | Cohérent — étendu (§8bis) sans redécision |
| [[REPOSITORY_PATTERN.md]] | Cohérent — aucun nouveau repository requis par cette phase |
| [[SEARCH_ENGINE.md]] | Cohérent — l'index reste reconstruit localement, jamais dépendant d'une disponibilité serveur |

Aucune contradiction trouvée.

---

## 1. Détection et entrée en mode hors ligne

Détection automatique de la perte de connexion réseau (pas seulement au serveur Jellyfin — une perte de connexion générale et une indisponibilité du seul serveur Jellyfin sont distinguées, la seconde permettant de garder certaines fonctionnalités type Cast désactivées mais la lecture locale intacte). Entrée en mode hors ligne : jamais un blocage de l'interface, uniquement les fonctionnalités qui dépendent réellement du réseau se désactivent ([[ARCHITECTURE_PRINCIPLES.md]] §3, priorité au local).

## 1bis. Mode avion — bascule manuelle explicite (ajout Phase 11)

Distinct de la détection automatique (§1) : un réglage explicite (Toggle Row, [[SETTINGS_COMPONENTS.md]]) force le mode hors ligne même si une connexion réseau réelle est disponible — utile pour économiser la batterie ou éviter une synchronisation involontaire sur un réseau limité (data mobile). **Règle** : le mode avion applicatif est indépendant du mode avion système (OS) — Melodia respecte les deux indépendamment, jamais une supposition que l'un implique l'autre. Désactivation : reprise immédiate de la détection automatique (§1), jamais un état intermédiaire ambigu.

## 1ter. Taxonomie des connexions détectées (ajout Plateforme Offline)

> §1 distingue déjà perte réseau générale vs indisponibilité du seul serveur Jellyfin. Cette section précise les types de connexion et conditions réseau que cette détection couvre concrètement.

| Condition | Traitement |
|---|---|
| Wi-Fi | Connexion standard, aucune restriction appliquée par défaut |
| Ethernet (Desktop) | Traité identiquement au Wi-Fi — aucune distinction de comportement, les deux sont des connexions filaires/locales fiables du point de vue de l'application |
| 4G/5G (données mobiles) | Détecté via `navigator.connection` (quand disponible) — déclenche l'éligibilité aux réglages « Wi-Fi uniquement » ([[DOWNLOAD_SYSTEM.md]] §5quinquies) |
| Connexion lente | Détectée par mesure passive du débit pendant le streaming ([[DIAGNOSTICS_SYSTEM.md]] §2, déjà acté) — déclenche la suggestion de rétrograder la qualité ([[STREAMING_ENGINE.md]] §2), jamais un blocage |
| Connexion instable (micro-coupures répétées) | Traitée comme une alternance rapide `Offline`/`Reconnecting` ([[PLAYBACK_STATE_MACHINE.md]] §5) plutôt qu'un état dédié — le buffer ([[BUFFER_MANAGEMENT.md]]) absorbe les micro-coupures les plus courtes sans jamais changer d'état visible |
| Portail captif (Wi-Fi public nécessitant une authentification navigateur) | Indiscernable côté application d'une perte réseau complète (toute requête échoue identiquement) — traité comme §1, aucune détection ni message spécifique au portail captif, qui nécessiterait une heuristique non fiable hors périmètre |
| Mode avion | Voir §1bis (déjà acté) — bascule manuelle explicite, distincte de la détection automatique |

**Principe** : la détection ne distingue que ce qui **change le comportement applicatif** (§1, §1bis) — un type de connexion qui ne change rien au comportement (Wi-Fi vs Ethernet, portail captif vs coupure complète) n'est jamais détecté ni affiché séparément, cohérent avec YAGNI ([[ARCHITECTURE_PRINCIPLES.md]] §8bis).

## 2. Bibliothèque locale en mode hors ligne

Uniquement les éléments téléchargés ([[DOWNLOAD_SYSTEM.md]]) restent lisibles et visibles pleinement — le reste de la bibliothèque (non téléchargée) reste consultable en lecture seule (métadonnées déjà en cache local, [[DATA_LAYER.md]]) mais non lisible, chaque élément non disponible hors ligne étant marqué visuellement (badge, [[TRACK_COMPONENTS.md]] §4) plutôt que masqué — l'utilisateur voit toujours l'étendue réelle de sa bibliothèque, jamais une vue tronquée qui suggérerait une perte de contenu.

## 3. Statut de synchronisation

Indicateur discret et permanent ([[MOTION_GUIDELINES.md]] §9) dans la TopBar ([[TOPBAR_SPECIFICATION.md]] §4) — trois états : synchronisé, synchronisation en cours, hors ligne (en attente de synchronisation). Jamais un état « erreur de synchronisation » anxiogène pour une simple absence de réseau — l'absence de réseau est un état normal et prévu du produit, pas une erreur.

## 4. Retour en ligne — synchronisation automatique

Dès la reconnexion détectée, synchronisation automatique et silencieuse des changements effectués hors ligne (favoris ajoutés, playlists modifiées, historique d'écoute) vers l'état serveur — jamais une action manuelle requise pour déclencher cette synchronisation de base.

## 5. Conflits — détection

Un conflit survient quand un même élément (playlist, favori) a été modifié à la fois hors ligne sur cet appareil et sur le serveur/un autre appareil pendant la déconnexion — cohérent avec le statut encore ouvert de la stratégie de résolution de conflit déjà signalé ([[QUEUE_SPECIFICATION.md]] §6quater pour la file spécifiquement, [[ARCHITECTURE_PRINCIPLES.md]] §3.3 pour le principe général). Ce document ne tranche pas cette stratégie, il pose le comportement de surface qui doit rester vrai quelle que soit la stratégie technique retenue plus tard (§6).

## 6. Conflits — résolution, contraintes de surface

- **Jamais de perte silencieuse** : une modification locale qui serait écrasée par la résolution automatique est toujours signalée à l'utilisateur après coup (notification, [[NOTIFICATION_LIBRARY.md]]), jamais perdue sans trace.
- **Jamais de blocage bloquant** : la résolution de conflit ne doit jamais interrompre l'usage courant de l'application en attendant une décision utilisateur — un conflit se résout par une règle par défaut documentée (ex. la modification la plus récente gagne) avec un moyen de consultation/annulation après coup, jamais une modale bloquante systématique pour chaque conflit mineur.
- **Playlists collaboratives** (statut technique encore ouvert, [[FEATURE_BIBLE.md]] §5) : si engagées, nécessiteront une stratégie de conflit plus fine qu'un simple « le plus récent gagne » — signalé comme dépendance future, non résolu ici.

## 7. États (renvoi)

Voir [[STATE_COMPONENTS.md]] (Offline State) pour l'anatomie complète du bandeau et des indicateurs — non redécrite ici.

## 8. Bibliothèque hors ligne vs Downloaded

Voir [[COLLECTION_COMPONENTS.md]] §6 pour la distinction déjà actée entre la vue « Offline » (ce qui est réellement accessible maintenant) et « Downloaded » (tout ce qui a été téléchargé, y compris potentiellement corrompu/supprimé du stockage) — non redécrite ici.

---

## 9. Checklist de validation

- [ ] Aucune fonctionnalité non liée au réseau n'est désactivée en mode hors ligne (§1).
- [ ] Aucun conflit ne se résout en perdant silencieusement une modification locale sans le signaler (§6).
- [ ] Le statut de synchronisation (§3) ne présente jamais l'absence de réseau comme une erreur.
- [ ] Les 7 principes de la constitution (§0) restent vérifiables en revue de code pour tout nouveau mécanisme offline.
- [ ] Tout nouveau document du domaine offline est ajouté à la carte cartographiée en tête de ce document.

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 9) | Audio Software Engineer / Frontend Architect |
| 0.2.0 | 2026-08-04 | Phase 11 : ajout §1bis (mode avion, bascule manuelle distincte de la détection automatique) — au lieu de créer un second OFFLINE_SYSTEM.md | Synchronization Engineer |
| 0.3.0 | 2026-08-04 | Plateforme Offline : ajout §1ter (taxonomie des connexions : Wi-Fi/Ethernet/4G-5G/lente/instable/portail captif) — au lieu de créer NETWORK_DETECTION.md en doublon | Principal Offline Architect |
| 1.0.0 | 2026-08-04 | Plateforme Offline : document promu capstone — ajout §0 (constitution à 7 principes), §0bis (schéma global, cycle bonus, matrice bonus, extensibilité, auto-revue comparative à 10 références), §0ter (vérification de cohérence) — au lieu de créer OFFLINE_PLATFORM.md en doublon | Principal Offline Architect |

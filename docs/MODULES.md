# MODULES.md — Registre des modules de fonctionnalité (Phase 12)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal React Architect
> **Documents liés** : [[ARCHITECTURE.md]] §3bis, [[CODING_STANDARDS.md]] §1, [[ARCHITECTURE_PRINCIPLES.md]]

Ce document répond à une question que [[ARCHITECTURE.md]] §3bis présuppose sans y répondre : **que fait, concrètement, chacune des 18 features** de `packages/app/src/features/` ? Il ne redéfinit ni les règles d'import (déjà actées, [[ARCHITECTURE.md]] §3bis) ni les conventions internes de structure (déjà actées, [[CODING_STANDARDS.md]] §1) — uniquement la responsabilité et la surface publique de chaque module.

---

## 1. Lecture — `player`

- **Responsabilité** : état de lecture audio actif (piste courante, position, volume, état play/pause/buffering), orchestration du moteur audio.
- **Entités principales** : `Track` (lecture seule).
- **Surface publique** (`index.ts`) : hook `usePlayer()`, composants `MiniPlayer`/`FullscreenPlayer` (assemblage, voir [[PLAYER_SCREENS.md]]), événement `player.trackChanged`.
- **Documents liés** : [[PLAYER_SPECIFICATION.md]], [[PLAYER_COMPONENTS.md]], [[AUDIO_ENGINE.md]].

## 2. File d'attente — `queue`

- **Responsabilité** : ordre de lecture (file manuelle, aléatoire, répétition), historique de navigation dans la file.
- **Entités principales** : `Track` (identifiants uniquement, jamais un composant de présentation).
- **Surface publique** : hook `useQueue()`, actions `addToQueue()`/`reorderQueue()`/`clearQueue()`.
- **Documents liés** : [[QUEUE_SPECIFICATION.md]].

## 3. Bibliothèque — `library`, `albums`, `artists`, `tracks`

- **Responsabilité** : quatre modules distincts mais toujours co-listés car strictement parallèles en forme — chacun gère l'affichage, le tri et le filtrage d'un seul type de contenu de bibliothèque. `library` orchestre la vue combinée (voir [[LIBRARY_SPECIFICATION.md]]) ; `albums`/`artists`/`tracks` gèrent chacun leur propre écran dédié ([[LIBRARY_SCREENS.md]], [[ALBUM_SCREEN.md]], [[ARTIST_SCREEN.md]]).
- **Entités principales** : `Album`, `Artist`, `Track` (lecture, jamais de mutation directe — passe par `@melodia/core`).
- **Surface publique** : hooks `useLibrary()`, `useAlbum(id)`, `useArtist(id)`, `useTracks()`.
- **Documents liés** : [[LIBRARY_SPECIFICATION.md]], [[LIBRARY_COMPONENTS.md]], [[MUSIC_COMPONENT_LIBRARY.md]].

## 4. Contenu hors-ligne — `downloads`, `cache`, `sync`

- **Responsabilité** : trois modules de fond, jamais consommateurs directs d'une feature d'affichage (voir [[ARCHITECTURE.md]] §3bis). `downloads` gère la file de téléchargement et le stockage local persistant ; `cache` gère le cache borné (pochettes, waveform, voir [[PERFORMANCE_GUIDE.md]] §6bis) ; `sync` gère la réconciliation avec le serveur Jellyfin et la résolution de conflit ([[SYNC_ENGINE_SPECIFICATION.md]]).
- **Entités principales** : `Track`, `DownloadTask`, `SyncState`.
- **Surface publique** : hooks `useDownloads()`, `useOfflineStatus()`, `useSyncState()`.
- **Documents liés** : [[DOWNLOAD_SYSTEM.md]], [[OFFLINE_SYSTEM.md]], [[CACHE_SYSTEM.md]], [[SYNC_ENGINE_SPECIFICATION.md]].

## 5. Recherche — `search`

- **Responsabilité** : indexation FlexSearch (voir [[STACK_DECISIONS.md]] §2) et présentation des résultats. Réutilise les composants de carte de `@melodia/ui`, n'importe jamais la logique de `library` directement ([[ARCHITECTURE.md]] §3bis).
- **Entités principales** : `Track`, `Album`, `Artist` (résultats agrégés, en lecture seule).
- **Surface publique** : hook `useSearch(query)`, composant `CommandPalette` (voir [[COMMAND_PALETTE.md]]).
- **Documents liés** : [[SEARCH_SPECIFICATION.md]], [[SEARCH_NAVIGATION.md]], [[SEARCH_COMPONENTS.md]].

## 6. Statistiques — `statistics`

- **Responsabilité** : agrégation de l'historique d'écoute local (Wrapped, heatmap, tendances). Consomme un flux d'événements déjà enregistré, jamais l'état de lecture actif directement ([[ARCHITECTURE.md]] §3bis) — calcul en Web Worker ([[CODING_STANDARDS.md]] §1bis, [[PERFORMANCE_GUIDE.md]] §6ter).
- **Entités principales** : `ListeningEvent` (historique local, jamais transmis sans consentement explicite — [[PRODUCT_RULES.md]] §10).
- **Surface publique** : hook `useStatistics()`.
- **Documents liés** : [[STATISTICS_SPECIFICATION.md]], [[STATISTICS_SCREENS.md]].

## 7. Transverses de configuration — `settings`, `themes`, `notifications`

- **Responsabilité** : trois modules consommés par le reste de l'application, jamais consommateurs d'une feature métier ([[ARCHITECTURE.md]] §3bis). `settings` centralise les préférences utilisateur ([[SETTINGS_SYSTEM.md]]) ; `themes` gère le thème dynamique dérivé de la pochette active ([[DYNAMIC_THEME_GUIDE.md]]) ; `notifications` gère les toasts/bannières/alertes in-app ([[NOTIFICATION_LIBRARY.md]]).
- **Surface publique** : hooks `useSettings()`, `useDynamicTheme()`, `useNotify()`.
- **Documents liés** : [[SETTINGS_SYSTEM.md]], [[DYNAMIC_THEME_GUIDE.md]], [[NOTIFICATION_LIBRARY.md]].

## 8. Observabilité — `diagnostics`, `developer`, `labs`

- **Responsabilité** : seules features autorisées à observer transversalement toutes les autres, strictement en lecture seule — jamais un import de leur logique interne, jamais une action directe sur l'état d'une autre feature ([[ARCHITECTURE.md]] §3bis). `diagnostics` expose les journaux et métriques de santé ([[DIAGNOSTICS_SYSTEM.md]], [[LOGGING_SYSTEM.md]]) ; `developer` expose les outils de debug interne ; `labs` expose les fonctionnalités sous feature flag ([[FEATURE_FLAGS.md]]).
- **Surface publique** : hooks `useDiagnostics()`, `useFeatureFlag(key)`.
- **Documents liés** : [[DIAGNOSTICS_SYSTEM.md]], [[LOGGING_SYSTEM.md]], [[FEATURE_FLAGS.md]], [[MAINTENANCE_SYSTEM.md]].

---

## 9. Ce que ce document ne fait pas

- Ne redéfinit pas les règles d'import entre modules (matrice complète : [[ARCHITECTURE.md]] §3bis).
- Ne redécrit pas les composants UI consommés par chaque module (voir [[MUSIC_COMPONENT_LIBRARY.md]], [[COMPONENT_LIBRARY.md]]).
- Ne redécrit pas le flux de données de bout en bout (voir [[DATA_FLOW.md]]).

## 10. Checklist de validation

- [ ] Chaque module listé ici correspond à un dossier réel de `packages/app/src/features/` ([[ARCHITECTURE.md]] §1).
- [ ] Aucune surface publique documentée ici n'expose un détail d'implémentation interne (cohérent avec [[CODING_STANDARDS.md]] §1, `index.ts` = surface publique uniquement).
- [ ] Un nouveau module ajouté après cette phase reçoit une entrée ici avant merge (voir [[DEFINITION_OF_DONE.md]]).

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Phase 12) | Principal React Architect |

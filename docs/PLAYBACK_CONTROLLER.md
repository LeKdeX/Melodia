# PLAYBACK_CONTROLLER.md — Traduction commande → moteur (Moteur Audio)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Frontend Architect
> **Documents liés** : [[AUDIO_ENGINE.md]] §0bis, [[COMMAND_API.md]], [[REPOSITORY_PATTERN.md]] §2

[[AUDIO_ENGINE.md]] §0bis.1 a déjà positionné le Playback Controller comme la seule couche qui connaît à la fois le Repository et le Playback Engine. Ce document détaille précisément ce qu'il fait de cette double connaissance.

---

## 1. Responsabilité unique

Le Playback Controller **traduit** une commande de haut niveau ([[COMMAND_API.md]]) en séquence d'appels au Playback Engine, en résolvant au passage tout ce que le moteur ne doit jamais connaître (source de la donnée, [[AUDIO_ENGINE.md]] §0bis.2). Il ne contient **aucune logique d'affichage** (ne retourne jamais de forme adaptée à l'UI, c'est le rôle des sélecteurs, [[SELECTOR_GUIDE.md]]) et **aucune logique de décodage/lecture bas niveau** (délégué entièrement au Playback Engine).

## 2. Séquence type — commande `PLAY_TRACK`

1. Réception de la commande avec un `trackId` ([[COMMAND_API.md]] §2).
2. Appel à `TrackRepository.getPlaybackSource(trackId)` ([[REPOSITORY_PATTERN.md]] §2) — résout `{ uri, kind }`.
3. Sélection de la stratégie de Buffer Management adaptée selon `kind` ([[BUFFER_MANAGEMENT.md]] §1) — seule décision prise sur la base de `kind`, jamais transmise plus loin.
4. Appel au Playback Engine avec `uri` uniquement (`engine.load(uri)`) — le moteur ne reçoit jamais `kind`.
5. Mise à jour de `queueStore`/`playerStore` une fois la transition d'état confirmée par le moteur ([[PLAYBACK_STATE_MACHINE.md]] §2) — jamais mise à jour de façon optimiste avant confirmation (contrairement aux mutations TanStack Query, [[TANSTACK_QUERY_GUIDE.md]] §5, qui suivent une règle différente car le risque d'échec audio est plus élevé qu'une mutation de donnée).

## 3. Réévaluation de source en cours de lecture

Si un événement `download.completed` ([[EVENT_SYSTEM.md]] §3) concerne la piste actuellement en cours de lecture en streaming (`kind: 'stream'`), le Controller réévalue `getPlaybackSource()` — si le résultat change (`kind` passe à `local`), le prochain changement de piste utilisera la nouvelle source, mais **la lecture en cours n'est jamais interrompue pour basculer** (cohérent avec [[AUDIO_ENGINE.md]] §0bis.2, transparence totale — un changement de source à la volée sur une piste déjà en lecture n'apporte aucun bénéfice perceptible à l'utilisateur et introduirait un risque d'interruption audible pour un gain nul).

## 4. Ce que le Controller ne fait jamais

- Ne décode jamais l'audio lui-même (délégué au Playback Engine/Media Adapter, [[AUDIO_ENGINE.md]] §0bis.1).
- Ne persiste jamais directement dans `LocalStore` — passe toujours par un Repository ([[REPOSITORY_PATTERN.md]]).
- N'émet jamais un événement applicatif lui-même — les événements ([[EVENT_SYSTEM.md]] §3) sont émis par le Playback Engine (changements d'état réels), le Controller les relaie au maximum mais ne les invente jamais.
- Ne connaît jamais React ou Zustand directement au niveau de son implémentation interne — il est consommé par les stores ([[STORE_SPECIFICATIONS.md]]), jamais l'inverse.

## 5. Gestion des commandes concurrentes

Une commande reçue pendant qu'une transition d'état est déjà en cours (ex. `NEXT` reçu pendant que `Loading` est en cours suite à un `PLAY_TRACK` précédent) est mise en file **au niveau du Controller** (jamais au niveau du moteur, qui reste toujours dans un état cohérent unique) — la dernière commande de navigation (`NEXT`/`PREVIOUS`/`PLAY_TRACK`) annule la précédente si elle n'a pas encore abouti, jamais un empilement de chargements concurrents qui gaspillerait de la bande passante et du CPU.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas les commandes elles-mêmes (voir [[COMMAND_API.md]]).
- Ne redéfinit pas le cycle de vie interne du moteur (voir [[PLAYBACK_ENGINE.md]]).
- Ne redéfinit pas la résolution de source elle-même (voir [[AUDIO_ENGINE.md]] §0bis.2, [[REPOSITORY_PATTERN.md]] §2).

## 7. Checklist de validation

- [ ] Aucune commande n'atteint le Playback Engine sans passer par le Controller (§1).
- [ ] Le champ `kind` de `PlaybackSource` n'est jamais transmis au-delà du Controller (§2, étape 4).
- [ ] Une commande de navigation concurrente annule la précédente non aboutie, jamais un empilement (§5).

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Moteur Audio) | Frontend Architect |

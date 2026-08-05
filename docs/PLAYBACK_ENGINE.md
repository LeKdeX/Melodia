# PLAYBACK_ENGINE.md — Cycle de vie du moteur de lecture (Moteur Audio)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Audio Engine Architect
> **Documents liés** : [[AUDIO_ENGINE.md]] §0-0bis, [[PLAYBACK_STATE_MACHINE.md]], [[PLAYBACK_CONTROLLER.md]]

[[AUDIO_ENGINE.md]] §0bis.1 a déjà positionné le Playback Engine dans l'architecture en couches (entre Playback Controller et Media Adapter). Ce document répond à ce que ce positionnement ne couvrait pas : le cycle de vie complet du moteur lui-même — initialisation, destruction, reset, recovery.

---

## 1. Le moteur comme singleton applicatif

Le Playback Engine est instancié **une seule fois** au démarrage de l'application (hors du cycle de vie de tout composant React, cohérent avec [[AUDIO_ENGINE.md]] §0, principe 2) — jamais recréé à la navigation. Il expose une API stable ([[COMMAND_API.md]]) consommée par le Playback Controller, et notifie ses changements d'état via [[PLAYBACK_STATE_MACHINE.md]] et [[EVENT_SYSTEM.md]] §3.

## 2. Initialisation

1. Création des deux éléments `HTMLAudioElement` du double buffer ([[AUDIO_ENGINE.md]] §3) — sans source assignée, état `Idle` ([[PLAYBACK_STATE_MACHINE.md]] §1).
2. Tentative d'initialisation du contexte Web Audio API (enrichissement, [[AUDIO_ENGINE.md]] §0bis.1) — échec toléré, ne bloque jamais l'initialisation du socle.
3. Enregistrement des gestionnaires d'événements natifs (`ended`, `error`, `waiting`, `canplay`...) sur les deux éléments — traduits en événements applicatifs typés ([[EVENT_SYSTEM.md]] §3), jamais exposés tels quels au Playback Controller.
4. Restauration de l'état persisté (`playback_state`, [[AUDIO_ENGINE.md]] §1bis) — position et piste restaurées, jamais de lecture automatique (cohérent avec [[PLAYBACK_STATE_MACHINE.md]] §2).
5. Enregistrement MediaSession ([[AUDIO_ENGINE.md]] §8) — dernière étape, dépend des métadonnées déjà résolues à l'étape précédente si une piste est restaurée.

## 3. Destruction

Le moteur n'est **jamais détruit pendant la durée de vie de l'application** (cohérent avec [[AUDIO_ENGINE.md]] §0, principe 6) — la destruction ne survient qu'à la fermeture complète de l'application (ou du dernier onglet sur Web/PWA). Séquence :
1. Libération des `HTMLAudioElement` (`src = ''`, retrait du DOM si présents) — évite la fuite mémoire la plus commune d'une intégration audio HTML (référence retenue par le navigateur au-delà de la durée de vie utile).
2. Fermeture du contexte Web Audio API (`AudioContext.close()`) si initialisé — libère les nœuds (`GainNode`, `BiquadFilterNode`, `AnalyserNode`) qui, sans fermeture explicite, restent référencés par le contexte.
3. Révocation de toute Blob URL active créée pour la lecture locale ([[SECURITY_GUIDE.md]] §3quinquies) — voir §5 pour le détail.
4. Désenregistrement MediaSession (`navigator.mediaSession.metadata = null`).

## 4. Reset

Distinct de la destruction (§3) — un reset survient sur demande explicite (ex. changement de serveur Jellyfin, déconnexion complète) sans fermer l'application :
- Arrêt de toute lecture en cours, transition vers `Idle` ([[PLAYBACK_STATE_MACHINE.md]] §1).
- Vidage de la file ([[AUDIO_ENGINE.md]] §1) — action explicite, jamais silencieuse (cohérent avec [[QUEUE_SPECIFICATION.md]] §2, confirmation déjà actée côté produit pour le vidage complet).
- Les `HTMLAudioElement` et le contexte Web Audio API **restent instanciés** (contrairement à la destruction, §3) — seul leur contenu est réinitialisé, pour éviter le coût de réinitialisation complète à chaque reset.

## 5. Recovery — reprise après échec

Un échec du moteur (voir taxonomie d'erreurs, [[PLAYBACK_STATE_MACHINE.md]] §4) déclenche une reprise automatique en trois paliers, jamais un crash silencieux :
1. **Retry immédiat** sur la même source (`uri`, [[AUDIO_ENGINE.md]] §0bis.2) — couvre une erreur transitoire (glitch réseau ponctuel).
2. **Re-résolution de la source** via `TrackRepository.getPlaybackSource()` — couvre le cas où la source résolue initialement n'est plus valide (ex. un lien de streaming Jellyfin expiré) sans jamais que le moteur sache que la source a changé de nature (cohérent avec [[AUDIO_ENGINE.md]] §0bis.2).
3. **Passage à la piste suivante** avec notification explicite (`playback.error`, [[EVENT_SYSTEM.md]] §3) — dernier palier, jamais un blocage silencieux de la file entière pour l'échec d'un seul élément (cohérent avec [[ERROR_STATES.md]] §2, déjà acté côté produit).

## 6. Prévention des fuites mémoire

- Tout gestionnaire d'événement enregistré à l'initialisation (§2) est retiré explicitement à la destruction (§3) — jamais laissé actif sur un élément détaché du cycle de vie applicatif.
- Le préchargement ([[AUDIO_ENGINE.md]] §2) ne conserve jamais plus d'une piste anticipée en mémoire simultanément — un changement de piste suivante anticipée libère immédiatement l'ancienne ressource préchargée avant d'en charger une nouvelle.
- Le visualiseur ([[AUDIO_ENGINE.md]] §7) libère son `OffscreenCanvas`/Worker dès qu'il devient invisible (Page Visibility API, déjà acté) — jamais un Worker actif en arrière-plan sans consommateur visible.

---

## 7. Ce que ce document ne fait pas

- Ne redéfinit pas la machine à états elle-même (voir [[PLAYBACK_STATE_MACHINE.md]]).
- Ne redéfinit pas la traduction commande→moteur (voir [[PLAYBACK_CONTROLLER.md]]).
- Ne redéfinit pas les couches d'enrichissement Web Audio API (voir [[AUDIO_ENGINE.md]] §3-7).

## 8. Checklist de validation

- [ ] Le moteur n'est jamais recréé à la navigation (§1).
- [ ] Toute ressource acquise à l'initialisation (§2) a une contrepartie de libération explicite à la destruction (§3, §6).
- [ ] Un échec suit toujours les trois paliers de recovery avant d'abandonner la piste (§5).

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Moteur Audio) | Audio Engine Architect |

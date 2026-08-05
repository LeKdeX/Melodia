# AUDIO_ENGINE.md — Moteur audio concret (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.1
> **Date de création** : 2026-08-03
> **Propriétaire** : Lead Frontend Engineer
> **Documents liés** : [[ARCHITECTURE_PRINCIPLES.md]] §5, [[TECH_STACK.md]] §1

Ce document détaille l'implémentation concrète de l'architecture audio en couches déjà décidée dans [[ARCHITECTURE_PRINCIPLES.md]] §5 (socle `<audio>` + MediaSession, enrichissement Web Audio API, dégradation progressive). Chaque fonctionnalité ci-dessous est une couche d'enrichissement optionnelle au-dessus du socle — aucune n'est autorisée à compromettre la lecture de base si elle échoue. **Ce document est désormais le capstone du moteur audio** — il cartographie [[PLAYBACK_ENGINE.md]], [[PLAYBACK_STATE_MACHINE.md]], [[PLAYBACK_CONTROLLER.md]], [[COMMAND_API.md]], [[STREAMING_ENGINE.md]] et [[BUFFER_MANAGEMENT.md]] sans redécider leur contenu.

---

## 0. Constitution du moteur audio

1. **Le moteur ne dépend jamais de l'interface** — aucun import React, aucune référence à un composant, testable entièrement sans monter une seule vue (cohérent avec [[STORE_SPECIFICATIONS.md]] §1, un store ne connaît pas React — le moteur audio va plus loin : il ne connaît même pas Zustand).
2. **Le moteur continue de fonctionner même si l'UI est reconstruite** — un remontage complet de l'arbre React (navigation, hot-reload en développement) ne doit jamais interrompre une lecture en cours ; le moteur vit en dehors du cycle de vie des composants ([[PLAYBACK_ENGINE.md]] §1, singleton applicatif).
3. **Toutes les commandes passent par une API unique** — voir [[COMMAND_API.md]], jamais un accès direct à `HTMLAudioElement` depuis un composant ou un store.
4. **Le moteur possède sa propre machine à états** — voir [[PLAYBACK_STATE_MACHINE.md]], jamais un état de lecture dérivé implicitement de plusieurs booléens épars.
5. **Aucune logique métier dans les composants React** — un composant appelle une commande ([[COMMAND_API.md]]) et lit un état dérivé ([[STORE_SPECIFICATIONS.md]] `playerStore`), jamais plus (cohérent avec [[STATE_MANAGEMENT.md]] §1, principe 3).
6. **Le lecteur reste actif tant que l'application fonctionne** — la fermeture d'un onglet/fenêtre secondaire ne doit jamais interrompre la lecture si l'application reste ouverte ailleurs (Desktop/Mobile) ; sur Web/PWA, la lecture continue tant que l'onglet principal reste ouvert, y compris en arrière-plan (MediaSession, §8).
7. **Le moteur ne connaît jamais l'origine d'une donnée audio** — voir §0bis.2, la contrainte de priorité locale/cache/streaming est entièrement assurée par la couche Repository, jamais par le moteur lui-même.

## 0bis. Architecture en couches — vue complète

### 0bis.1 Diagramme et responsabilités

```
UI (composants React)
   │  lit playerStore, appelle des commandes — aucune logique métier
   ↓
Player Store (playerStore, queueStore — STORE_SPECIFICATIONS.md)
   │  état dérivé pour l'affichage, jamais de logique de lecture elle-même
   ↓
Playback Controller (PLAYBACK_CONTROLLER.md)
   │  traduit une commande en appel au moteur, résout la source jouable via Repository
   ↓
Playback Engine (PLAYBACK_ENGINE.md + PLAYBACK_STATE_MACHINE.md)
   │  machine à états, cycle de vie, orchestration du Media Adapter
   ↓
Media Adapter (ce document, §1-8 — socle + enrichissement Web Audio API)
   │  encapsule HTMLAudioElement + Web Audio API, dégradation progressive
   ↓
HTMLAudioElement × 2 (double buffer, §3)
   ↓
Audio Output (périphérique système, PLAYBACK_DEVICES.md)
```

| Couche | Peut dépendre de | Ne doit jamais dépendre de |
|---|---|---|
| UI | Player Store | Playback Controller, Playback Engine, Media Adapter (jamais directement) |
| Player Store | Playback Controller (appel de commande uniquement) | HTMLAudioElement, Media Adapter |
| Playback Controller | Playback Engine, `TrackRepository` (résolution de source, §0bis.2) | React, Zustand |
| Playback Engine | Media Adapter | React, Zustand, Repository (le moteur reçoit une source déjà résolue, jamais un identifiant de piste brut à résoudre lui-même) |
| Media Adapter | `HTMLAudioElement`, Web Audio API | Tout le reste — c'est la couche la plus basse du moteur |

**Correspondance avec la couche donnée** : cette architecture applique Ports & Adapters ([[ARCHITECTURE_PRINCIPLES.md]] §8bis) une seconde fois, à l'intérieur du domaine audio — le Playback Engine est le port, le Media Adapter l'implémentation concrète (`HTMLAudioElement`), cohérent avec le même mécanisme déjà appliqué à `MusicSource`/`LocalStore`.

### 0bis.2 Priorité locale/cache/streaming — contrainte absolue du projet

**Ordre de priorité, toujours identique** : 1) fichier téléchargé localement ([[DOWNLOAD_SYSTEM.md]]) ; 2) fichier en cache local ([[CACHE_SYSTEM.md]]) ; 3) streaming Jellyfin ([[STREAMING_ENGINE.md]]).

- **Résolution** : `TrackRepository.getPlaybackSource(trackId)` ([[REPOSITORY_PATTERN.md]] §2, méthode ajoutée par cette phase) applique cet ordre et retourne un `PlaybackSource` opaque (`{ uri: string, kind: 'local' | 'cache' | 'stream' }`) — le **Playback Controller** consulte ce champ `kind` uniquement pour choisir la stratégie de Buffer Management adaptée ([[BUFFER_MANAGEMENT.md]] §1, un fichier local n'a pas besoin de pré-buffer réseau), jamais pour une autre décision.
- **Le Playback Engine et le Media Adapter ne reçoivent jamais ce champ `kind`** — uniquement `uri`, un identifiant de ressource jouable indifférencié. Un changement de source (ex. un téléchargement se termine pendant une lecture en streaming de la même piste) est **totalement transparent** : le Controller peut réévaluer `getPlaybackSource()` et, si `uri` change, basculer via le mécanisme de préchargement déjà acté (§2) sans jamais interrompre la lecture audible.
- **Pourquoi cette frontière exacte (Controller, pas Engine)** : le Controller est la seule couche qui connaît à la fois le Repository et le moteur (§0bis.1) — lui confier la résolution évite que cette logique fuite plus bas (violerait le principe 7 de la constitution, §0) ou plus haut (dupliquerait la logique dans chaque composant consommateur, violerait la non-duplication déjà actée, [[ENGINEERING_GUIDE.md]] §1.3).

## 1. Modèle de file de lecture (queue)

- La file est une liste ordonnée de références de pistes, distincte de l'ordre de lecture effectif quand le mode aléatoire est actif : un **ordre de lecture** dérivé (permutation) est calculé séparément de la file source, pour permettre de désactiver l'aléatoire sans perdre l'ordre original (jamais de mutation destructive de la file source pour implémenter le shuffle).
- Modes de répétition : aucune / piste courante / file entière — état explicite dans `playerStore` ([[CODING_STANDARDS.md]] §4.3), jamais déduit implicitement de la position dans la file.
- Historique de lecture conservé séparément de la file à venir, pour permettre « piste précédente » y compris après un passage en mode aléatoire.

### 1bis. Reprise, lecture suivante et réorganisation — mécanique moteur (ajout Moteur Audio)

> [[QUEUE_SPECIFICATION.md]] spécifie déjà le comportement produit (actions visibles, §2 de ce document produit). Cette sous-section précise uniquement la mécanique interne au moteur, jamais redécidée côté produit.

- **Lecture suivante** (insertion juste après la piste en cours) : modifie l'ordre de lecture effectif (§1) sans jamais toucher à la piste actuellement chargée dans le double buffer (§3) — seul l'élément préchargé (§2) est réévalué si la prochaine piste attendue change suite à cette insertion.
- **Réorganisation (drag & drop)** : une opération purement sur la structure de données de la file (`queueStore`, [[STORE_SPECIFICATIONS.md]] §2) — ne déclenche jamais de rechargement audio tant que la piste en cours de lecture n'est pas déplacée hors de sa position active. Si le préchargement (§2) avait déjà anticipé une piste qui n'est plus la suivante après réorganisation, l'élément préchargé est simplement réaffecté (jamais rechargé depuis zéro si la piste nouvellement suivante est déjà celle préchargée).
- **Reprise après redémarrage** : la position de lecture et l'identifiant de piste sont persistés (`playback_state`, [[DATABASE_SCHEMA.md]] §1) à chaque changement significatif (démarrage/pause/toutes les N secondes en lecture continue) — au redémarrage, le moteur se réinitialise dans l'état `Ready` avec la position restaurée mais **ne lance jamais la lecture automatiquement** (cohérent avec [[PLAYBACK_STATE_MACHINE.md]] §2, aucune transition automatique vers `Playing` sans commande explicite).

## 2. Préchargement

La piste suivante de la file (selon l'ordre de lecture effectif, §1) est préchargée dès que la lecture de la piste courante atteint 80 % de sa durée ou qu'il reste moins de 15 secondes (le plus tôt des deux). Le préchargement utilise un second élément `<audio>` en mémoire (voir §3), jamais un fetch brut du fichier qui dupliquerait la logique de décodage.

## 3. Lecture sans interruption (gapless)

Deux éléments `<audio>` alternés (double buffering) : pendant que l'un joue, l'autre charge la piste suivante préchargée (§2). À la fin de la piste courante, bascule immédiate vers l'élément préchargé sans réinitialisation du contexte audio. C'est le mécanisme le plus compatible (fonctionne même en dégradé sans Web Audio API, cohérent avec la règle de dégradation progressive d'[[ARCHITECTURE_PRINCIPLES.md]] §5) — préféré à une implémentation entièrement Web Audio API qui échouerait la règle de dégradation en cas d'indisponibilité du contexte audio.

## 4. Crossfade

Fonctionnalité d'enrichissement (couche Web Audio API) : deux `GainNode` associés aux deux éléments `<audio>` du double buffer (§3), automatisés en fondu croisé sur une durée configurable (1 à 12 secondes) via `AudioParam.linearRampToValueAtTime`. Désactivé automatiquement si le contexte Web Audio API échoue à s'initialiser — la lecture gapless du socle (§3) continue de fonctionner sans crossfade plutôt que d'échouer.

## 5. ReplayGain

- Lu depuis les métadonnées Jellyfin si disponibles (tag ReplayGain existant sur le fichier source, voir [[JELLYFIN_INTEGRATION.md]] §2).
- Appliqué via un `GainNode` dédié (distinct des `GainNode` de crossfade, §4) pour permettre l'activation/désactivation indépendante des deux effets.
- Absence de métadonnée ReplayGain : aucun gain appliqué (0 dB), jamais une estimation approximative côté client qui introduirait une variation de volume non maîtrisée entre pistes.

## 5bis. Qualité audio (ajout Moteur Audio)

- **Standard/Haute qualité** : deux profils de qualité de streaming déjà référencés côté produit ([[DOWNLOAD_SYSTEM.md]] §7, [[SETTINGS_SPECIFICATION.md]]) — le moteur reçoit le profil actif via la commande de résolution de source (§0bis.2, `TrackRepository.getPlaybackSource` sélectionne l'encodage Jellyfin correspondant), jamais une décision de qualité prise par le moteur lui-même.
- **Lossless (préparation, non engagée)** : dépend du support de décodage FLAC/ALAC natif sur toutes les cibles (Web/Desktop/Mobile) — non vérifié techniquement à ce jour. **Contrat d'interface attendu** : un troisième profil de qualité dans le même sélecteur déjà prévu (§5bis ci-dessus), jamais un mécanisme de sélection séparé — cohérent avec le principe de non-duplication déjà appliqué à [[PLAYBACK_DEVICES.md]] (un seul Cast Selector unifié pour toute intégration future).
- **Normalisation** : distincte de ReplayGain (§5) — la normalisation ajuste dynamiquement le volume perçu en l'absence de métadonnées ReplayGain, alors que ReplayGain applique un gain fixe pré-calculé par piste. Melodia n'implémente **aucune normalisation dynamique** (contrairement à ReplayGain, §5) — cohérent avec la règle déjà actée qu'aucune estimation approximative côté client n'est appliquée sans métadonnée fiable ; un volume qui varie dynamiquement pendant l'écoute serait une expérience moins prévisible qu'un gain fixe absent.

## 6. Égaliseur

Chaîne de `BiquadFilterNode` (bandes paramétriques, presets courants + réglage manuel), insérée entre la source et le nœud de sortie, après les nœuds de gain (§4, §5). Fonctionnalité d'enrichissement explicitement optionnelle et activable par l'utilisateur — désactivée par défaut, aucun coût CPU si non utilisée (cohérent avec le budget CPU au repos, [[PERFORMANCE_BUDGET.md]] §7).

## 7. Visualiseur

- `AnalyserNode` branché en parallèle de la chaîne de traitement (jamais en série — ne doit jamais pouvoir introduire de latence ou d'artefact sur le signal audio réel).
- Rendu sur `Canvas`, dans un `OffscreenCanvas` transféré à un Web Worker quand le navigateur/runtime le supporte, pour ne jamais bloquer le thread principal (cohérent avec le budget FPS, [[PERFORMANCE_BUDGET.md]] §3).
- Désactivé automatiquement si l'onglet/la fenêtre n'est pas visible (Page Visibility API) — aucun calcul de visualisation pour une interface non affichée.

## 8. MediaSession API

- Métadonnées (titre, artiste, album, pochette) poussées à chaque changement de piste.
- Actions standard connectées : lecture/pause, piste précédente/suivante, recherche dans la piste (seek). Ces contrôles pilotent directement le `playerStore` ([[CODING_STANDARDS.md]] §4.3) — jamais une logique dupliquée entre les contrôles MediaSession et les contrôles d'interface.
- Fonctionne identiquement sur les trois cibles (Web, Desktop, Mobile via Tauri), socle de compatibilité maximale conformément à [[TECH_STACK.md]] §2.

### 8bis. Surfaces système approfondies (ajout Moteur Audio)

- **Écran verrouillé (mobile)** : les métadonnées + actions MediaSession (§8) s'affichent nativement sans configuration supplémentaire — l'API MediaSession est conçue précisément pour cette surface, aucune implémentation propriétaire par plateforme.
- **Centre de contrôle (iOS) / notification média (Android)** : idem, rendu natif par l'OS à partir des mêmes métadonnées poussées — Melodia ne dessine jamais sa propre surface pour ces emplacements système, uniquement les données.
- **Notifications système (Desktop)** : sur Desktop (Tauri), une notification native optionnelle au changement de piste peut compléter MediaSession (déjà couvert par la plateforme sur Windows/macOS via l'intégration média native du système) — désactivable indépendamment des autres notifications ([[NOTIFICATION_LIBRARY.md]] §8bis).
- **Pochette pour MediaSession** : résolution adaptée à la surface système consommatrice (généralement plus petite que la pochette plein écran du lecteur, [[ARTWORK_SYSTEM.md]]) — jamais la ressource pleine résolution transmise inutilement à l'OS.
- **Dégradation** : si MediaSession API n'est pas disponible (navigateur non supporté, cas rare), le lecteur reste pleinement fonctionnel via l'interface applicative uniquement — cohérent avec la règle de dégradation déjà actée ([[ARCHITECTURE_PRINCIPLES.md]] §5), MediaSession fait partie du socle mais son indisponibilité ne bloque jamais la lecture elle-même.

## 9. Déclenchement de l'historique de lecture (ajout Moteur Audio)

> [[STATISTICS_SPECIFICATION.md]] §2 définit déjà *quelle* donnée est collectée et le seuil de comptage. Cette section précise le point d'origine technique : **le Playback Engine émet `player.trackEnded`/`player.trackChanged` avec la durée effectivement écoutée** ([[EVENT_SYSTEM.md]] §3) — c'est ce payload que `statistics` consomme pour décider si le seuil est franchi, jamais le moteur lui-même qui ne connaît pas la règle de seuil (violerait la constitution §0, principe 7 appliqué par analogie : le moteur ne porte pas de règle métier produit).

## 10. Extensibilité (ajout Moteur Audio)

L'architecture en couches (§0bis) accueille sans réécriture les extensions suivantes, chacune comme couche d'enrichissement au même niveau que celles déjà actées (§4-7) :

| Extension | Statut | Point d'insertion |
|---|---|---|
| Crossfade, Gapless, Égaliseur, Visualiseur | **Déjà livrés** (§3-4, §6-7) | Couche Web Audio API |
| DSP générique (au-delà de l'égaliseur) | Préparé, non engagé | Nouveau nœud Web Audio inséré dans la même chaîne que §6, après le `GainNode` de ReplayGain |
| Paroles synchronisées | **Déjà livré**, hors moteur audio ([[LYRICS_SYSTEM.md]]) | Consomme `player.trackChanged`/la position courante, jamais une dépendance du moteur vers le système de paroles |
| Casting (AirPlay/Chromecast) | Préparé, non engagé ([[PLAYBACK_DEVICES.md]] §5-6) | Nouvelle implémentation de Media Adapter (§0bis.1), alternative à `HTMLAudioElement` derrière le même port Playback Engine |
| Multiroom | Préparé, non engagé ([[PLAYBACK_DEVICES.md]] §7) | Extension du Playback Controller pour orchestrer plusieurs Media Adapters simultanément |
| Lecture collaborative, lecture distante | **Non préparé — gap honnête** | Nécessiterait une synchronisation d'état multi-utilisateur non conçue à ce jour ; l'architecture en couches n'empêche pas cette extension future mais ne l'anticipe pas activement, cohérent avec YAGNI ([[ARCHITECTURE_PRINCIPLES.md]] §8bis) — aucune fonctionnalité n'est jamais anticipée au-delà de ce qu'un point d'extension raisonnable prépare déjà |

**Pourquoi aucune réécriture n'est nécessaire** : chaque extension future est soit une nouvelle couche Web Audio API (déjà le point d'extension du socle, §0bis.1), soit une nouvelle implémentation de Media Adapter (déjà le point d'extension du port Playback Engine) — jamais une modification des couches Controller/Engine elles-mêmes.

## 11. Cycle de vie complet d'un morceau (bonus du cadrage)

```
Sélection (commande PLAY_TRACK, COMMAND_API.md)
   ↓
Queue (insertion dans l'ordre de lecture effectif, §1)
   ↓
Résolution de source (TrackRepository.getPlaybackSource, §0bis.2)
   ↓
Préchargement (§2, si la piste était déjà anticipée) ou chargement direct
   ↓
Buffer (BUFFER_MANAGEMENT.md — pré-buffer avant lecture audible)
   ↓
Lecture (PLAYBACK_STATE_MACHINE.md, état Playing)
   ↓
Historique (§9 — événement émis au franchissement du seuil, STATISTICS_SPECIFICATION.md §2)
   ↓
Statistiques (STATISTICS_ENGINE.md — agrégation asynchrone, jamais bloquante)
   ↓
Fin (transition vers Ended, PLAYBACK_STATE_MACHINE.md §1)
   ↓
Recommandations (RECOMMENDATION_ENGINE.md — signal consommé au prochain calcul, jamais recalculé en temps réel à chaque fin de piste)
```

## 12. Matrice bonus — composants, événements, services, stores

| Consommateur | Événements émis par le moteur consommés | Services consommés | Stores impactés |
|---|---|---|---|
| Mini Player, Fullscreen Player ([[PLAYER_COMPONENTS.md]]) | `player.trackChanged`, `player.playbackStateChanged` | Playback Controller (commandes) | `playerStore` |
| Queue View ([[PLAYER_SCREENS.md]]) | `queue.changed` | Playback Controller | `queueStore` |
| TopBar (indicateur compact) | `player.playbackStateChanged` | — (lecture seule) | `playerStore` |
| `statistics` (module) | `player.trackEnded` (§9) | `HistoryRepository` | Aucun (TanStack Query, [[SERVER_STATE.md]] §4) |
| `themes` (module) | `player.trackChanged` | `ArtworkRepository` | `themeStore` |
| Device/Cast Selector ([[PLAYBACK_DEVICES.md]]) | `device.changed` | Media Adapter (énumération des sorties) | Aucun store dédié — état local au composant |
| `notifications` (module) | `playback.error` | — | `notificationStore` |

Voir [[STORE_DEPENDENCY_GRAPH.md]] pour la matrice équivalente au niveau de tous les stores de l'application, non redupliquée ici.

## 13. Auto-revue comparative

> **Avertissement d'honnêteté** : comme les auto-revues précédentes, connaissance générale du modèle, pas un audit de code source en direct.

| Référence | Ce qu'elle illustre | Rapprochement avec Melodia |
|---|---|---|
| Spotify | Préchargement agressif de la piste suivante, lecture ininterrompue même en connectivité dégradée | Confirme §2 (préchargement) et la priorité locale/cache/streaming (§0bis.2) |
| Apple Music | Intégration MediaSession/Now Playing extrêmement soignée sur toutes les surfaces système | Confirme §8bis (surfaces système approfondies) |
| Plexamp | Gapless et crossfade comme fonctionnalités phares d'un client pour serveur auto-hébergé | Rapprochement le plus direct — valide §3-4 (gapless natif, crossfade en enrichissement) |
| Roon | Machine à états de lecture explicite et robuste, gestion fine des transitions réseau | Valide [[PLAYBACK_STATE_MACHINE.md]] comme fondation plutôt qu'un détail d'implémentation secondaire |
| TIDAL | Qualité audio configurable (standard/HiFi/Lossless prévu) | Confirme le statut déjà acté de Lossless comme préparation non engagée (§5bis) |
| Symfonium | Client Jellyfin/Subsonic tiers avec priorité explicite au contenu téléchargé sur le streaming | Rapprochement direct avec la contrainte spécifique du projet (§0bis.2) — validation externe que ce choix est un standard de la catégorie, pas une invention |
| MusicBee | Égaliseur et DSP configurables comme fonctionnalités d'enrichissement optionnelles, jamais dans le chemin critique | Confirme §6 et §10 (DSP comme extension future au même point d'insertion) |

**Conclusion** : aucune référence ne contredit un choix déjà acté. Symfonium (client tiers pour serveur auto-hébergé comme Melodia) valide spécifiquement la contrainte de priorité locale du projet comme un standard de catégorie plutôt qu'une exigence isolée.

---

## 14. Résumé des dépendances entre couches (Media Adapter uniquement)

```
<audio> × 2 (double buffer, gapless)  ──── socle, toujours actif
        │
        ├── MediaSession API           ──── socle, toujours actif
        │
        └── Web Audio API (si dispo)   ──── enrichissement
                ├── GainNode (crossfade)
                ├── GainNode (ReplayGain)
                ├── BiquadFilterNode × N (égaliseur)
                └── AnalyserNode (visualiseur, en parallèle)
```

Toute panne d'une couche d'enrichissement se dégrade vers la couche immédiatement inférieure sans jamais remonter d'erreur bloquante à l'utilisateur au-delà d'une notification informative (cohérent avec [[ARCHITECTURE_PRINCIPLES.md]] §5).

---

## 15. Checklist de validation

- [ ] Chaque couche (gapless, crossfade, ReplayGain, EQ, visualiseur) se dégrade sans jamais interrompre la lecture — vérifié en revue de code, pas seulement en conception.
- [ ] Les risques audio (politique d'autoplay, dérive gapless, fuite mémoire visualiseur) sont couverts dans [[RISK_REGISTER_TECHNICAL.md]] §5.
- [ ] Le comportement en connexion lente/interrompue pendant la lecture est validé dans [[EXTREME_SCENARIOS.md]] §2.
- [ ] Aucune fonctionnalité d'enrichissement n'introduit de dépendance dure sur Web Audio API dans le chemin critique de lecture.
- [ ] Le moteur ne reçoit jamais le champ `kind` de `PlaybackSource`, uniquement `uri` (§0bis.2).
- [ ] Aucun composant React n'accède directement à `HTMLAudioElement` (§0, principe 3).

## 16. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | Lead Frontend Engineer |
| 0.2.0 | 2026-08-03 | Ajout de la checklist de validation et des renvois vers les documents du complément Phase 0.5 | Lead Frontend Engineer |
| 1.0.0 | 2026-08-04 | Moteur Audio : document promu capstone — ajout §0 (constitution), §0bis (architecture en couches, priorité locale/cache/streaming), §1bis (mécanique de file), §8bis (surfaces système), §9-13 (historique/extensibilité/cycle de vie bonus/matrice bonus/auto-revue) ; anciennes §9-11 renumérotées §14-16 — au lieu de créer QUEUE_ENGINE.md/MEDIA_SESSION.md/PLAYBACK_HISTORY.md en doublon | Principal Audio Software Architect |
| 1.0.1 | 2026-08-05 | TASK-002 : correction du numéro de version en en-tête, resté désynchronisé (« 0.1.0 ») du tableau ci-dessus depuis l'amendement 1.0.0 — trouvé lors de la revue croisée manuelle des 10 documents à plus forte cascade | Staff Technical Lead |

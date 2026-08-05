# PLAYBACK_STATE_MACHINE.md — Machine à états de lecture officielle (Moteur Audio)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Playback Systems Engineer
> **Documents liés** : [[AUDIO_ENGINE.md]] §0 (principe 4), [[PLAYBACK_ENGINE.md]], [[ERROR_HANDLING.md]]

[[AUDIO_ENGINE.md]] §0 pose déjà le principe : « le moteur possède sa propre machine à états, jamais un état dérivé implicitement de plusieurs booléens épars ». Ce document est cette machine à états, formellement.

---

## 1. Les 12 états

| État | Signification | `HTMLAudioElement` sous-jacent |
|---|---|---|
| `Idle` | Aucune piste chargée | Aucune source assignée |
| `Loading` | Source résolue, chargement en cours | `src` assigné, pas encore prêt |
| `Buffering` | Données insuffisantes pour continuer une lecture déjà démarrée | Événement natif `waiting` |
| `Ready` | Piste chargée, prête à jouer, lecture non démarrée | Événement natif `canplay` |
| `Playing` | Lecture active | `paused === false` |
| `Paused` | Lecture suspendue par l'utilisateur | `paused === true`, position conservée |
| `Seeking` | Déplacement de la position en cours | Événement natif `seeking` |
| `Ended` | Piste terminée naturellement | Événement natif `ended` |
| `Stopped` | Lecture arrêtée explicitement (distinct de `Paused` — voir §3) | `src` retiré ou position réinitialisée à 0 |
| `Error` | Échec de chargement ou de lecture | Événement natif `error` |
| `Offline` | Perte de connexion pendant une lecture en streaming | — (état applicatif, pas un événement natif direct) |
| `Reconnecting` | Tentative de reprise après `Offline` | — (état applicatif) |

## 2. Diagramme de transition

```
Idle ──PLAY_TRACK──→ Loading ──ready──→ Ready ──PLAY──→ Playing
                        │                                  │  ↑
                      error                            PAUSE│  │RESUME
                        ↓                                  ↓  │
                      Error                              Paused
                        │
                  (recovery, PLAYBACK_ENGINE.md §5)
                        ↓
                    Loading (retry) / Loading (piste suivante)

Playing ──buffer insuffisant──→ Buffering ──repris──→ Playing
Playing ──SEEK──→ Seeking ──repris──→ Playing
Playing ──fin naturelle──→ Ended ──NEXT (auto)──→ Loading (piste suivante) ou Idle (file épuisée)
Playing/Paused ──STOP──→ Stopped
Playing/Buffering ──perte réseau (streaming uniquement)──→ Offline ──retour réseau──→ Reconnecting ──repris──→ Playing
```

## 3. `Stopped` vs `Paused` — distinction explicite

`Paused` conserve l'intention de reprendre la même piste à la même position (déclenché par l'utilisateur ou par une interruption système, §5). `Stopped` signale l'absence d'intention de reprise immédiate (ex. après un `STOP` explicite ou l'échec définitif de tous les paliers de recovery, [[PLAYBACK_ENGINE.md]] §5) — la position peut être conservée en mémoire mais MediaSession n'affiche plus de contrôle de lecture actif. Un contributeur qui confondrait les deux casserait la persistance de reprise ([[AUDIO_ENGINE.md]] §1bis).

## 4. Taxonomie d'erreurs et transitions associées

| Erreur | Cause | Transition | Récupération |
|---|---|---|---|
| Flux invalide | Réponse serveur malformée ou format non supporté | → `Error` | Passage à la piste suivante ([[PLAYBACK_ENGINE.md]] §5, palier 3) |
| Fichier introuvable | 404 Jellyfin ou fichier local supprimé | → `Error` | Retrait de la file + notification ([[ERROR_STATES.md]] §2, déjà acté côté produit) |
| Erreur réseau | Timeout, connexion perdue en cours de streaming | → `Offline` (jamais directement `Error` si une reconnexion est plausible) | Voir §5 |
| Erreur de décodage | Codec non supporté par la plateforme | → `Error` | Aucun retry (une erreur de décodage ne se résout jamais en réessayant) — passage direct au palier 3 de [[PLAYBACK_ENGINE.md]] §5 |
| Buffer insuffisant | Débit réseau inférieur au débit de lecture requis | → `Buffering` (pas une erreur — état transitoire normal, voir [[BUFFER_MANAGEMENT.md]]) | Reprise automatique dès que le buffer minimum est atteint |
| Sortie audio indisponible | Périphérique de sortie déconnecté pendant la lecture | → `Paused` (jamais `Error` — voir [[PLAYBACK_DEVICES.md]], reprise sur le périphérique par défaut proposée) | Notification + proposition de reprise |

Chaque erreur suit le pattern `Result<T, E>` déjà acté ([[ERROR_HANDLING.md]] §2) au niveau du Playback Controller — jamais une exception non typée propagée jusqu'à l'UI.

## 5. `Offline` → `Reconnecting` — spécifique au streaming

Ce couple d'états ne s'applique **jamais** à une lecture locale ou en cache ([[AUDIO_ENGINE.md]] §0bis.2 — une source `local`/`cache` ne dépend d'aucune connectivité réseau, donc ne peut jamais entrer dans `Offline`). Séquence pour une source `stream` :
1. Perte de réseau détectée pendant `Playing`/`Buffering` → `Offline` (jamais un arrêt immédiat, la lecture déjà bufferisée continue jusqu'à épuisement du buffer, [[BUFFER_MANAGEMENT.md]] §3).
2. Retour réseau détecté → `Reconnecting`, re-résolution de la source ([[PLAYBACK_ENGINE.md]] §5, palier 2).
3. Succès → `Playing` (reprise à la position exacte où le buffer s'est épuisé). Échec après un délai raisonnable → `Error` (taxonomie §4).

## 6. Conditions de garde (jamais de transition sans condition explicite)

- `Idle → Loading` : uniquement sur commande `PLAY_TRACK` explicite ([[COMMAND_API.md]]), jamais automatique.
- `Ready → Playing` : uniquement sur commande `PLAY` explicite après restauration d'état ([[AUDIO_ENGINE.md]] §1bis, jamais de lecture automatique au démarrage).
- `Ended → Loading` (piste suivante) : automatique **uniquement** si la file contient un élément suivant selon le mode de répétition actif ([[AUDIO_ENGINE.md]] §1) — sinon `Ended → Idle`.

---

## 7. Ce que ce document ne fait pas

- Ne redéfinit pas le cycle de vie du moteur lui-même (voir [[PLAYBACK_ENGINE.md]]).
- Ne redéfinit pas les commandes qui déclenchent les transitions (voir [[COMMAND_API.md]]).
- Ne redéfinit pas le comportement produit affiché à l'utilisateur pour chaque erreur (voir [[ERROR_STATES.md]]).

## 8. Checklist de validation

- [ ] Toute nouvelle transition respecte le diagramme §2, jamais un raccourci non documenté.
- [ ] `Stopped` et `Paused` restent des états distincts partout dans le code (§3).
- [ ] `Offline`/`Reconnecting` ne s'appliquent jamais à une source `local`/`cache` (§5).

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Moteur Audio) | Playback Systems Engineer |

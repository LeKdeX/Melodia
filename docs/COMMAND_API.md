# COMMAND_API.md — Contrat de commandes du moteur audio (Moteur Audio)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : TypeScript Architect
> **Documents liés** : [[AUDIO_ENGINE.md]] §0 (principe 3), [[PLAYBACK_CONTROLLER.md]], [[PLAYBACK_STATE_MACHINE.md]]

[[AUDIO_ENGINE.md]] §0 pose déjà le principe : « toutes les commandes passent par une API unique ». Ce document est le contrat formel de cette API — chaque commande, son type, sa précondition d'état, son comportement.

---

## 1. Convention commune

- Chaque commande est une fonction pure du point de vue de son contrat (entrée typée → effet appliqué au moteur), jamais une commande qui retourne directement une donnée d'affichage (c'est le rôle des sélecteurs, [[SELECTOR_GUIDE.md]]).
- Toute commande passe par le Playback Controller ([[PLAYBACK_CONTROLLER.md]] §1) — jamais un appel direct au Playback Engine depuis un store ou un composant.
- Une commande invalide pour l'état courant (§2, colonne « Précondition ») est silencieusement ignorée avec une entrée de journal (`developer`, [[LOGGING_SYSTEM.md]]) — jamais une exception qui interromprait le flux applicatif pour une commande simplement prématurée (ex. `SEEK` reçu pendant `Loading`).

## 2. Contrat de chaque commande

| Commande | Signature | Précondition d'état | Comportement |
|---|---|---|---|
| `PLAY_TRACK` | `(trackId: string) => void` | Tout état sauf `Loading` (une commande en double pendant un chargement est ignorée, [[PLAYBACK_CONTROLLER.md]] §5) | Résout la source, transition vers `Loading` |
| `PLAY` | `() => void` | `Ready`, `Paused`, `Stopped` | Reprend/démarre la lecture à la position courante |
| `PAUSE` | `() => void` | `Playing`, `Buffering` | Suspend la lecture, position conservée |
| `TOGGLE` | `() => void` | Tout état | Appelle `PLAY` si `Paused`/`Ready`/`Stopped`, `PAUSE` si `Playing`/`Buffering`, ignoré sinon |
| `STOP` | `() => void` | Tout état sauf `Idle` | Transition vers `Stopped` ([[PLAYBACK_STATE_MACHINE.md]] §3, distinct de `PAUSE`) |
| `SEEK` | `(positionMs: number) => void` | `Ready`, `Playing`, `Paused`, `Buffering` | Transition vers `Seeking`, reprise dans l'état d'origine une fois la position atteinte |
| `NEXT` | `() => void` | Tout état sauf `Idle`/`Loading` | Avance dans l'ordre de lecture effectif ([[AUDIO_ENGINE.md]] §1), `PLAY_TRACK` sur l'élément suivant |
| `PREVIOUS` | `() => void` | Tout état sauf `Idle`/`Loading` | Recule dans l'historique de lecture ([[AUDIO_ENGINE.md]] §1) — jamais dans l'ordre à venir |
| `JUMP` | `(queueIndex: number) => void` | Tout état sauf `Idle`/`Loading` | `PLAY_TRACK` sur un élément arbitraire de la file, sans passer par les éléments intermédiaires |
| `SHUFFLE` | `(enabled: boolean) => void` | Tout état | Bascule l'ordre de lecture effectif ([[AUDIO_ENGINE.md]] §1) — ne modifie jamais la file source |
| `REPEAT` | `(mode: 'none') => void` | Tout état | Aucune répétition |
| `REPEAT_ONE` | `(mode: 'track') => void` | Tout état | Répétition de la piste courante uniquement |
| `REPEAT_ALL` | `(mode: 'queue') => void` | Tout état | Répétition de la file entière une fois épuisée |
| `SET_VOLUME` | `(level: number ∈ [0,1]) => void` | Tout état | Applique le volume au(x) `GainNode`/`HTMLAudioElement.volume` |
| `MUTE` | `(muted: boolean) => void` | Tout état | Distinct de `SET_VOLUME(0)` — conserve le niveau de volume précédent pour la restauration |
| `SET_PLAYBACK_RATE` | `(rate: number) => void` | `Ready`, `Playing`, `Paused` | Ajuste `HTMLAudioElement.playbackRate` — fonctionnalité préparée, non exposée dans l'UI actuelle (aucune spécification produit ne l'a demandée à ce jour) |
| `SET_OUTPUT_DEVICE` | `(deviceId: string) => void` | Tout état | Voir [[PLAYBACK_DEVICES.md]] — la lecture continue sans interruption pendant le changement (déjà acté) |

## 3. `REPEAT`/`REPEAT_ONE`/`REPEAT_ALL` — trois commandes, un seul champ d'état

Bien que représentées comme trois commandes distinctes (cohérent avec le nommage du cadrage), elles écrivent toutes le même champ `repeatMode` de `queueStore` ([[STORE_SPECIFICATIONS.md]] §2) — jamais trois champs booléens indépendants qui pourraient entrer en contradiction (ex. `repeatOne: true` et `repeatAll: true` simultanément serait un état invalide à prévenir structurellement, pas seulement par convention).

## 4. Idempotence

Toute commande est idempotente pour un même état — appeler `PAUSE` deux fois de suite ne produit aucun effet la seconde fois (déjà `Paused`, précondition non satisfaite, §1) — jamais un comportement différent selon le nombre d'appels successifs identiques.

---

## 5. Ce que ce document ne fait pas

- Ne redéfinit pas la machine à états elle-même (voir [[PLAYBACK_STATE_MACHINE.md]]).
- Ne redéfinit pas la traduction interne commande→moteur (voir [[PLAYBACK_CONTROLLER.md]]).
- Ne redéfinit pas le comportement produit visible de chaque action (voir [[QUEUE_SPECIFICATION.md]], [[INTERACTION_GUIDELINES.md]]).

## 6. Checklist de validation

- [ ] Toute nouvelle commande a une précondition d'état explicite (§2), jamais implicite.
- [ ] Aucune commande n'expose de forme d'affichage en retour (§1).
- [ ] `REPEAT`/`REPEAT_ONE`/`REPEAT_ALL` restent un seul champ d'état, jamais trois booléens indépendants (§3).

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Moteur Audio) | TypeScript Architect |

# AUDIO_ENGINE.md — Moteur audio concret (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Lead Frontend Engineer
> **Documents liés** : [[ARCHITECTURE_PRINCIPLES.md]] §5, [[TECH_STACK.md]] §1

Ce document détaille l'implémentation concrète de l'architecture audio en couches déjà décidée dans [[ARCHITECTURE_PRINCIPLES.md]] §5 (socle `<audio>` + MediaSession, enrichissement Web Audio API, dégradation progressive). Chaque fonctionnalité ci-dessous est une couche d'enrichissement optionnelle au-dessus du socle — aucune n'est autorisée à compromettre la lecture de base si elle échoue.

---

## 1. Modèle de file de lecture (queue)

- La file est une liste ordonnée de références de pistes, distincte de l'ordre de lecture effectif quand le mode aléatoire est actif : un **ordre de lecture** dérivé (permutation) est calculé séparément de la file source, pour permettre de désactiver l'aléatoire sans perdre l'ordre original (jamais de mutation destructive de la file source pour implémenter le shuffle).
- Modes de répétition : aucune / piste courante / file entière — état explicite dans `playerStore` ([[CODING_STANDARDS.md]] §4.3), jamais déduit implicitement de la position dans la file.
- Historique de lecture conservé séparément de la file à venir, pour permettre « piste précédente » y compris après un passage en mode aléatoire.

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

---

## 9. Résumé des dépendances entre couches

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

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | Lead Frontend Engineer |

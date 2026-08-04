# PLAYER_SCREENS.md — Écrans du lecteur (Phase 10)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / Senior Audio UX Engineer
> **Documents liés** : [[SCREEN_SYSTEM.md]] §2, [[PLAYER_COMPONENTS.md]], [[LYRICS_SYSTEM.md]], [[AUDIO_VISUALIZER.md]]

> **Cadrage** : chaque forme du lecteur et ses panneaux associés ont déjà une spécification complète (Phases 1, 4, 6, 9). Ce document assemble uniquement — quelle forme affiche quel panneau, dans quel ordre.

---

## 1. Présentation

Le lecteur n'est pas un écran unique mais une famille de présentations du même état ([[PLAYER_SPECIFICATION.md]] §2) — ce document couvre les panneaux qui s'y attachent (Paroles, Visualiseur, File, Appareils, Réglages audio) comme des « écrans » au sens de ce système, bien qu'ils ne soient jamais des pages de navigation indépendantes.

## 2. Composition par forme

```
Mini Player   : [Pochette][Titre/Artiste][Lecture/Pause] + barre fine
Compact Player: Mini + [Précédent][Suivant][Volume][Accès file]
Expanded Player: [Pochette grande][Titre/Artiste][Contrôles complets][Progression+temps]
                 [Onglets/Icônes d'accès : Paroles | Visualiseur | File | Appareils]
Fullscreen Player: Expanded sans autre UI + arrière-plan dynamique
```

## 3. Lyrics View

Panneau accessible depuis l'Expanded/Fullscreen Player ([[LYRICS_SYSTEM.md]]) — jamais une page de navigation séparée avec sa propre entrée d'historique (§9bis, [[TRANSITION_GUIDE.md]] : ouverture de panneau local, pas une navigation de page). Composition : Track Row du titre courant en en-tête (rappel visuel) + corps de paroles ([[LYRICS_SYSTEM.md]] §2-3).

## 4. Visualizer

Panneau ou mode plein écran ([[AUDIO_VISUALIZER.md]] §6) — accessible depuis le même point d'entrée que Lyrics View (§3), les deux mutuellement exclusifs à l'écran (jamais affichés simultanément dans le même espace, sauf Mode cinématique qui les superpose légèrement, [[IMMERSION_GUIDE.md]] §8).

## 5. Queue View

Panneau (Sheet mobile, Panel latéral desktop, [[PLAYER_COMPONENTS.md]] §Queue) — composition : liste de Queue Item, filtre/recherche si 30+ titres ([[QUEUE_SPECIFICATION.md]] §6bis).

## 6. Device Selector

Popover depuis l'Expanded Player ([[PLAYBACK_DEVICES.md]] §1) — jamais un panneau plein écran, sa liste reste courte par nature.

## 7. Audio Settings (nouveau assemblage)

Accès rapide depuis l'Expanded Player vers un sous-ensemble des Paramètres audio ([[SETTINGS_SCREENS.md]]) — Crossfade, Qualité de streaming, Egaliseur si engagé ([[PLAYER_COMPONENTS.md]], Equalizer Panel, architecture seulement). Jamais une duplication complète de l'écran Paramètres, uniquement les réglages pertinents en contexte d'écoute active.

## 8. États et cas limites propres à l'assemblage

- **Paroles indisponibles** : le point d'accès (§3) reste visible mais désactivé avec info-bulle explicative, jamais masqué silencieusement (l'utilisateur doit comprendre que ce n'est pas un bug, [[LYRICS_SYSTEM.md]] §1).
- **Un seul panneau actif à la fois** sur Expanded Player (Paroles OU Visualiseur OU File OU Appareils) — jamais deux panneaux ouverts simultanément qui se disputeraient l'espace limité du lecteur, sauf le Mode cinématique déjà excepté (§4).
- **Changement de forme pendant qu'un panneau est ouvert** (Expanded → Fullscreen) : le panneau actif reste ouvert et visible dans la nouvelle forme, jamais refermé silencieusement par le changement de forme lui-même.

## 9. Responsive

Voir [[RESPONSIVE_LAYOUTS.md]]. Résumé : sur mobile, chaque panneau (§3-7) occupe l'écran en BottomSheet ; sur desktop/tablette large, Queue View et Lyrics View peuvent coexister en panneau latéral persistant à côté de l'Expanded Player ([[RESPONSIVE_GUIDE.md]] §4).

---

## 10. Checklist de validation

- [ ] Un seul panneau actif à la fois sur Expanded Player, sauf exception déjà actée (Mode cinématique).
- [ ] Aucun comportement de composant déjà spécifié (Phases 1/4/6/9) n'est redécidé ici.
- [ ] Audio Settings reste un sous-ensemble contextuel, jamais une duplication de l'écran Paramètres complet.

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 10) | Product Designer / Senior Audio UX Engineer |

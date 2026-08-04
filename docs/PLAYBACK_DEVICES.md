# PLAYBACK_DEVICES.md — Sélection et diffusion de la lecture (Phase 9)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Audio Software Engineer / Senior Audio UX Engineer
> **Documents liés** : [[PLAYER_COMPONENTS.md]] (Device Selector), [[AUDIO_ENGINE.md]], [[EVOLVABILITY.md]]

> **Cadrage** : [[PLAYER_COMPONENTS.md]] avait nommé Device Selector/Cast Selector en une ligne. Ce document approfondit leur comportement et prépare l'architecture des intégrations non engagées (AirPlay, Chromecast, Multiroom), cohérent avec l'honnêteté déjà appliquée aux fonctionnalités non engagées ailleurs dans ce projet.

---

## 1. Device Picker (sélecteur d'appareil de sortie)

Popover ([[OVERLAY_COMPONENTS.md]]) listant les sorties audio disponibles sur l'appareil courant (haut-parleurs système, casque connecté, sortie Bluetooth déjà appairée au niveau OS) — Melodia consomme la liste déjà exposée par le système d'exploitation, ne gère jamais l'appairage Bluetooth lui-même (responsabilité de l'OS, jamais dupliquée dans l'application). **Anatomie** : icône de type d'appareil (haut-parleur/casque/Bluetooth) + nom + coche sur l'appareil actif. **Changement de sortie** : la lecture continue sans interruption pendant le changement, jamais une coupure ([[PRODUCT_RULES.md]] §2).

## 2. Output Selector — cas multi-sortie

Si l'OS expose plusieurs sorties simultanément disponibles (rare, cas avancé), un seul sélecteur reste la source de vérité — jamais un second mécanisme de sélection redondant ailleurs dans l'application.

## 3. Cast (diffusion vers un appareil distant)

Statut général : dépend d'un protocole de diffusion (Chromecast, AirPlay, ou équivalent générique) non encore choisi techniquement — voir §5-7 pour le détail par protocole. Le Cast Selector partage l'anatomie du Device Picker (§1) mais liste des appareils réseau plutôt que des sorties locales, distingués visuellement (icône différente, jamais mélangés dans la même liste sans distinction claire entre « sortie locale » et « diffusion réseau »).

## 4. Bluetooth

Couvert par §1 (le Bluetooth apparaît comme une sortie locale standard une fois appairé au niveau OS) — aucune fonctionnalité Bluetooth propre à Melodia au-delà de la consommation de la liste système.

## 5. AirPlay (préparation, non engagée)

**Objectif anticipé** : diffusion vers des appareils Apple (HomePod, Apple TV, enceintes compatibles). **Dépendance** : API native spécifique à iOS/macOS, disponible uniquement via Tauri sur ces plateformes ([[TECH_STACK.md]] §1) — non implémentée avant une décision technique dédiée. **Contrat d'interface attendu** : apparaît comme une entrée supplémentaire dans le Cast Selector (§3), jamais un sélecteur séparé propre à AirPlay.

## 6. Chromecast (préparation, non engagée)

**Objectif anticipé** : diffusion vers des appareils Google Cast. **Dépendance** : SDK Google Cast, intégration web ou native selon la plateforme cible — non évaluée techniquement à ce jour. **Contrat d'interface attendu** : identique à AirPlay (§5), une entrée de plus dans le même Cast Selector unifié.

## 7. Multiroom (préparation, non engagée)

**Objectif anticipé** : lecture synchronisée sur plusieurs appareils simultanément (au-delà d'un simple changement de sortie, §1-2) — fonctionnalité la plus complexe de ce document, dépend d'une architecture de synchronisation temporelle non conçue. **Contrat d'interface attendu** : extension du Cast Selector (§3) permettant une sélection multiple d'appareils plutôt qu'un seul — anatomie de base identique (liste + coches), passage de sélection unique à sélection multiple si cette fonctionnalité est un jour engagée. Voir [[EVOLVABILITY.md]] pour le statut d'évolutivité long terme déjà évalué pour des sujets connexes (TV, synchronisation cloud) — cohérent en esprit, non redécidé ici.

## 8. Accessibilité

Chaque entrée du Device/Cast Selector a un nom accessible complet (type + nom, jamais une icône seule) et un état de connexion annoncé (`aria-current` sur l'appareil actif) — cohérent avec [[PLAYER_COMPONENTS.md]] (icône + libellé, jamais couleur seule).

---

## 9. Checklist de validation

- [ ] Melodia ne gère jamais l'appairage Bluetooth lui-même, uniquement la consommation de la liste système (§1, §4).
- [ ] Les trois préparations (AirPlay/Chromecast/Multiroom) restent explicitement non engagées, jamais présentées comme livrées.
- [ ] Un seul Cast Selector unifié accueille toute future intégration, jamais un sélecteur par protocole.

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 9) | Audio Software Engineer / Senior Audio UX Engineer |

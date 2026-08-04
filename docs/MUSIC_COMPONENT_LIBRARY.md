# MUSIC_COMPONENT_LIBRARY.md — Constitution de l'expérience musicale (Phase 9)

> **Statut** : document fondateur, vivant — capstone de Phase 9
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal Music Experience Designer
> **Documents liés** : tous les documents listés en §3

> **Cadrage** : ce document pose la philosophie qui gouverne tous les composants musicaux et cartographie l'ensemble des documents de cette phase et des phases précédentes qu'elle organise — cohérent avec le rôle déjà joué par [[COMPONENT_LIBRARY.md]] (bibliothèque générale), [[NAVIGATION_SYSTEM.md]] (navigation) et [[FOUNDATION_COMPONENTS.md]] (fondamentaux) comme capstones de leurs domaines respectifs.

---

## 1. Constitution

1. **La musique reste toujours au centre.** Aucun composant de cette bibliothèque ne prend le pas visuellement ou fonctionnellement sur la lecture en cours — déjà la règle fondatrice du produit ([[PRODUCT_RULES.md]] §1-2).
2. **Le lecteur est toujours accessible.** Rappel direct de [[NAVIGATION_SYSTEM.md]] §1 — chaque composant de cette phase (Album, Artiste, Playlist, Paroles) coexiste avec le lecteur, ne le remplace ni ne le masque jamais.
3. **Aucune interaction n'interrompt la lecture.** Chaque composant testé contre ce critère ([[FOUNDATION_TESTING_GUIDE.md]] §5bis, test d'intégration dédié).
4. **Les changements de morceau semblent instantanés.** Chorégraphie déjà posée ([[PLAYER_EXPERIENCE.md]] §5), rappelée ici comme principe transverse à tout composant qui réagit à un changement de piste (Track Row, Queue Item, Artwork).
5. **La pochette est un élément central.** [[ARTWORK_SYSTEM.md]] et [[DYNAMIC_THEME_GUIDE.md]] existent précisément parce que la pochette n'est jamais un simple élément décoratif dans ce produit.
6. **Les couleurs s'adaptent intelligemment, jamais arbitrairement.** Gouvernance déjà posée ([[DYNAMIC_THEME_GUIDE.md]] §5bis) — l'identité de marque ne varie jamais, seule l'ambiance s'adapte.
7. **La file d'attente est aussi importante que la bibliothèque.** D'où l'approfondissement dédié de cette phase ([[QUEUE_SPECIFICATION.md]] §6bis-6quater) — la file n'est jamais un second rang fonctionnel par rapport à la bibliothèque.

## 2. Ce que cette phase ajoute, ce qu'elle ne redécide pas

Cette phase documente la couche composant spécifique au domaine musical (Album/Artiste/Track/Playlist/Collection, Paroles, Visualiseur, Pochette, Appareils, Téléchargement, Hors ligne) — elle ne redécide aucun comportement produit déjà spécifié en Phase 1-2 ([[PLAYER_SPECIFICATION.md]], [[QUEUE_SPECIFICATION.md]], [[LIBRARY_SPECIFICATION.md]], [[STATISTICS_SPECIFICATION.md]], [[WRAPPED_SPECIFICATION.md]]) ni aucune règle du Design System (Phase 5), de la Component Library (Phase 6-7) ou du Navigation System (Phase 8) — chaque nouveau document y renvoie plutôt que de les répéter.

## 3. Carte complète de la Phase 9

### Documents nouveaux

| Document | Rôle |
|---|---|
| [[MUSIC_COMPONENT_LIBRARY.md]] | Constitution, carte, matrice bonus, auto-revue comparative (8 références) |
| [[ALBUM_COMPONENTS.md]] | Variantes de carte, Hero, Header, Information, Actions, Statistics, Footer |
| [[ARTIST_COMPONENTS.md]] | Hero, biographie, discographie organisée, top morceaux, collaborations |
| [[TRACK_COMPONENTS.md]] | Track Row (nouveau), métadonnées, qualité, badges, statut |
| [[PLAYLIST_COMPONENTS.md]] | Hero, header, actions, statistiques, propriétaire, filtres |
| [[COLLECTION_COMPONENTS.md]] | Smart Collections, épinglage, favoris (source unique), vues dérivées |
| [[LYRICS_SYSTEM.md]] | Synchronisées/non-synchronisées, karaoké, traduction, recherche |
| [[AUDIO_VISUALIZER.md]] | Waveform, Spectrum, Ambient, Minimal, Full Screen, Performance Mode |
| [[ARTWORK_SYSTEM.md]] | Repli, chargement, flou, ombre, glow — matière première du thème dynamique |
| [[PLAYBACK_DEVICES.md]] | Device/Cast Selector, préparation AirPlay/Chromecast/Multiroom |
| [[DOWNLOAD_SYSTEM.md]] | File, priorités, pause/reprise, échec, stockage |
| [[OFFLINE_SYSTEM.md]] | Détection, bibliothèque locale, synchronisation, conflits |

### Documents étendus en Phase 9

| Document | Ajout |
|---|---|
| [[PLAYER_COMPONENTS.md]] | Floating Player (détaillé), Picture in Picture (architecture) |
| [[PLAYER_SPECIFICATION.md]] | §5bis Sleep Timer, §5ter Crossfade (renvoi) |
| [[QUEUE_SPECIFICATION.md]] | §6bis-6quater Filtres/Recherche, Sauvegarde explicite, contrainte de sync |
| [[DYNAMIC_THEME_GUIDE.md]] | §5bis Gouvernance des variations |
| [[LIBRARY_COMPONENTS.md]] | Heatmap |
| [[SEARCH_SPECIFICATION.md]] | Recherche par paroles |
| [[ACCESSIBILITY_GUIDE.md]] | §9bis Paroles, Visualiseur, formes du lecteur |
| [[FOUNDATION_TESTING_GUIDE.md]] | §5bis Tests spécifiques au domaine musical |
| [[PERFORMANCE_GUIDE.md]] | §6bis Cache pochettes/waveform |

### Pourquoi 9 livrables demandés n'ont pas de nouveau fichier

`PLAYER_SYSTEM.md`, `PLAYBACK_CONTROLS.md`, `QUEUE_SYSTEM.md`, `DYNAMIC_THEME_ENGINE.md`, `STATISTICS_COMPONENTS.md`, `WRAPPED_COMPONENTS.md`, `SEARCH_MUSIC.md`, `MUSIC_ACCESSIBILITY.md`, `MUSIC_TESTING_GUIDE.md`, `MUSIC_PERFORMANCE_GUIDE.md` recoupaient chacun un document déjà profond de Phase 1, 4, 6, 7 ou 8 — étendus plutôt que dupliqués, cohérent avec la pratique déjà établie à chaque phase de ce projet.

## 4. Bonus — matrice de comportements et tokens partagés

### Composants qui héritent des mêmes comportements

| Comportement de base | Composants héritiers |
|---|---|
| Card ([[CARD_SPECIFICATION.md]]) | Album/Artist/Playlist/Genre/Library/Track Card, Statistics/Wrapped Cards |
| Track Row ([[TRACK_COMPONENTS.md]] §1) | Corps d'Album, corps de Playlist — même anatomie, contexte parent différent |
| Hero ([[LAYOUT_COMPONENTS.md]]) | Album Hero, Artist Hero, Playlist Hero — dégradé dynamique en commun |
| Device Picker ([[PLAYBACK_DEVICES.md]] §1) | Cast Selector (§3) — même anatomie, portée réseau vs locale |

### Composants qui partagent les mêmes Design Tokens

| Groupe de tokens | Composants |
|---|---|
| Palette dynamique ([[DYNAMIC_THEME_GUIDE.md]]) | Album Hero, Artist Hero, Fullscreen Player, Audio Visualizer (Waveform/Ambient) |
| `accent-500` en dégradé d'opacité | Heatmap ([[LIBRARY_COMPONENTS.md]]), indicateur de progression |
| Rôle Code tabulaire ([[TYPOGRAPHY_GUIDE.md]] §3) | Durée de piste, Track Quality, numéro de piste |

### Interactions qui doivent rester identiques partout

- **Clic sur une pochette** : ouvre toujours le détail (Album/Artiste/Playlist), jamais une lecture immédiate — cohérent sur Card, Track Row, Queue Item, résultats de recherche ([[CARD_SPECIFICATION.md]] §Track Card anti-pattern).
- **Favori** : une seule icône, un seul comportement, quel que soit le contexte d'origine ([[COLLECTION_COMPONENTS.md]] §3).
- **Suppression** : toujours via [[DIALOG_LIBRARY.md]], jamais une suppression directe sans confirmation, quel que soit le composant (Playlist, Téléchargement, Historique).

## 5. Diagramme reliant les composants musicaux

```
                    ┌─────────────────┐
                    │  ARTWORK_SYSTEM  │ (matière première)
                    └────────┬─────────┘
                             ▼
                  ┌──────────────────────┐
                  │ DYNAMIC_THEME_GUIDE   │ (ambiance)
                  └──────────┬───────────┘
                             ▼
        ┌────────────────────────────────────────┐
        │   Album / Artist / Playlist Hero         │
        └───────────────────┬──────────────────────┘
                             │
     ┌───────────────┬───────┴────────┬────────────────┐
     ▼                ▼                ▼                ▼
┌─────────┐   ┌──────────────┐  ┌─────────────┐  ┌──────────────┐
│Track Row │   │ Collection    │  │  Playback   │  │   Lyrics /   │
│(corps)   │   │ Components    │  │  Controls   │  │  Visualizer  │
└────┬─────┘   └──────────────┘  └──────┬──────┘  └──────────────┘
     │                                    │
     ▼                                    ▼
┌─────────┐                       ┌──────────────┐
│  Queue   │◄──────────────────── │    Player    │
│  System  │   ajout/lecture      │   (toutes    │
└────┬─────┘                      │   formes)    │
     │                            └──────┬───────┘
     ▼                                    │
┌──────────┐                             ▼
│ Download/ │                    ┌───────────────┐
│  Offline  │                    │Playback Devices│
└──────────┘                    └───────────────┘
```

## 6. Auto-revue comparative

> Principes retenus, jamais une implémentation copiée — même règle de non-reproduction que dans chaque comparaison précédente de ce projet. Avertissement d'honnêteté identique à [[COMPETITIVE_ANALYSIS.md]].

| Référence | Meilleure pratique retenue |
|---|---|
| Spotify | Convention de raccourcis reprise ([[KEYBOARD_SHORTCUTS.md]] §4), jamais l'esthétique ni le modèle commercial |
| Apple Music | Traitement soigné de l'Album Hero comme moment de présentation de l'œuvre, pas une simple liste de titres |
| Plexamp | Palette dynamique comme ambiance du lecteur, jamais de l'interface globale — principe déjà central à [[DYNAMIC_THEME_GUIDE.md]] depuis la Phase 4, confirmé comme bonne pratique partagée |
| Roon | Rigueur des métadonnées (Track Quality, [[TRACK_COMPONENTS.md]] §3) réservée à l'utilisateur qui s'y intéresse, jamais imposée à tous |
| TIDAL | Distinction visuelle claire entre qualité standard et Hi-Res sans survaloriser la donnée technique au détriment de la musique elle-même |
| Symfonium | Flexibilité de la Smart Collection ([[COLLECTION_COMPONENTS.md]] §1) plutôt qu'un jeu figé de filtres prédéfinis |
| MusicBee | Densité d'information dans Track Row assumée pour l'utilisateur avancé, sans jamais l'imposer par défaut à l'utilisateur occasionnel |
| Finamp | Mode hors ligne pensé comme un état de première classe (§OFFLINE_SYSTEM), jamais un mode dégradé traité comme secondaire |

## 7. Cohérence avec les bibles et systèmes déjà actés

Aucun token, règle absolue ([[DESIGN_SYSTEM.md]] §3), composant fondamental ([[FOUNDATION_COMPONENTS.md]]) ou principe de navigation ([[NAVIGATION_SYSTEM.md]] §1) n'est contredit par un document de cette phase — chaque nouveau composant musical dérive explicitement d'un composant déjà établi (§4) plutôt que d'introduire une anatomie parallèle.

---

## 8. Checklist de validation

- [ ] Chaque principe de la constitution (§1) renvoie vers son application concrète, jamais seulement aspirationnel.
- [ ] La carte (§3) référence tous les documents réellement concernés, aucun oublié.
- [ ] Le diagramme (§5) reste lisible comme un flux réel, pas une liste de noms sans relation.

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document, capstone de la Phase 9 | Principal Music Experience Designer |

# PLAYER_COMPONENTS.md — Composants du lecteur (Phase 6)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : React Component Architect / Motion Designer
> **Documents liés** : [[COMPONENT_LIBRARY.md]], [[PLAYER_SPECIFICATION.md]], [[PLAYER_EXPERIENCE.md]]

> **Cadrage strict** : [[PLAYER_SPECIFICATION.md]] définit le comportement produit, [[PLAYER_EXPERIENCE.md]] la chorégraphie sensorielle — ce document ne redécide ni l'un ni l'autre, il documente l'anatomie/les tokens/les tests des composants qui les implémentent. Les formes du lecteur et `Queue Item` sont en profondeur complète.

---

# Player — formes Mini/Expanded/Fullscreen (spécification complète)

## 1. Présentation

- **Objectif** : contrôler la lecture en cours, visible en permanence.
- **Contexte** : voir [[PLAYER_SPECIFICATION.md]] §2 pour les 5 formes (Mini/Compact/Expanded/Fullscreen/Floating) — ce document couvre les trois formes qui ont une anatomie de composant distincte.
- **Quand utiliser** : toujours monté dès qu'une session de lecture existe.
- **Alternatives** : aucune — le lecteur n'est jamais remplacé par un autre composant ([[PRODUCT_RULES.md]] §1).

## 2. Anatomie

**Mini Player** : `[Pochette] [Titre/Artiste] [Lecture/Pause]` + barre de progression fine en bordure inférieure.
**Expanded Player** : Pochette grand format + `[Titre/Artiste]` + `[Contrôles complets]` + `[Barre de progression avec temps]` + accès Queue/Lyrics/Visualizer.
**Fullscreen Player** : Expanded Player sans aucun autre élément d'interface, arrière-plan dynamique ([[DYNAMIC_THEME_GUIDE.md]]).

Chaque forme partage les mêmes sous-composants (Contrôles, Barre de progression, Pochette) recomposés différemment — jamais trois implémentations séparées des contrôles.

## 3. Variantes

N/A au niveau du composant Player lui-même — les « variantes » sont les formes (§2), déjà exhaustives.

## 4. États

Voir [[PLAYER_SPECIFICATION.md]] §3 (Aucune lecture/En lecture/En pause/Mise en tampon/Erreur) — ce document ajoute uniquement l'état **Synchronisation** : indicateur discret superposé sans bloquer les contrôles ([[MOTION_GUIDELINES.md]] §9).

## 5. Responsive

Mini Player : ancré bas (mobile) / latéral (desktop). Expanded : plein panneau (mobile, devient BottomSheet) / panneau latéral persistant possible en tablette paysage ([[RESPONSIVE_GUIDE.md]] §4).

## 6. Accessibilité

`role="region"` avec libellé explicite ([[ACCESSIBILITY_GUIDE.md]] §8), changements de piste annoncés en `aria-live="polite"`.

## 7. Design Tokens

Élévation Mini : `shadow-elevation-1`. Fullscreen : arrière-plan via tokens Dynamic Theme ([[DYNAMIC_THEME_GUIDE.md]]).

## 8. Animations

Voir [[PLAYER_EXPERIENCE.md]] §1-6 pour la chorégraphie complète (Hero Expand entre formes, fondu croisé au changement de piste) — non redécrite ici.

## 9-13. Bonnes pratiques, anti-patterns, cas limites, performance, tests

Voir [[PLAYER_SPECIFICATION.md]] §11 (cas limites déjà couverts : piste sans pochette, sans durée exacte, changements rapides). Performance : une seule instance de lecteur montée quelle que soit la forme active — les formes sont des présentations différentes du même état, jamais des composants remontés indépendamment (évite une resynchronisation coûteuse). Tests : accessibilité (annonce des changements), interaction (raccourcis clavier, [[INTERACTION_GUIDELINES.md]] §1), performance (pas de re-render au tick de la barre de progression au-delà du composant qui l'affiche).

---

# Queue Item (spécification complète)

## 1. Présentation

- **Objectif** : représenter une piste au sein de la file d'attente, actionnable et réorganisable.
- **Contexte** : Queue ([[PLAYER_SPECIFICATION.md]]).
- **Quand utiliser** : uniquement dans la liste de la file — pour la bibliothèque générale, voir `Track Card`, [[LIBRARY_COMPONENTS.md]].
- **Alternatives** : Track Card si une image plus grande est nécessaire (jamais le cas dans la Queue, densité prioritaire).

## 2. Anatomie

```
[≡] [Pochette mini] Titre — Artiste          [Durée] [⋮]
```

Poignée de glissement (`≡`, visible au survol/focus uniquement), pochette miniature, texte (Title/Subtitle), durée alignée à droite (rôle Code, tabulaire, [[TYPOGRAPHY_GUIDE.md]] §3), menu d'actions.

## 3. Variantes

En cours de lecture (surlignage permanent, [[PLAYER_EXPERIENCE.md]] §9), Standard.

## 4. États

Default, Hover (poignée de glissement apparaît), Dragged/Dropped ([[INTERACTION_LIBRARY.md]] §2-3), Selected (sélection multiple pour suppression groupée).

## 5. Responsive

Poignée de glissement toujours visible sur tactile (pas de hover), densité verticale identique sur toutes les classes.

## 6. Accessibilité

Réorganisation accessible au clavier (raccourci dédié pour monter/descendre un élément sélectionné), pas uniquement par glissement souris/tactile.

## 7. Design Tokens

Padding vertical 4px ([[SPACING_SYSTEM.md]] §2, densité maximale), typographie Body/Caption.

## 8. Animations

List Insert/Remove ([[ANIMATION_LIBRARY.md]] §5-6), Dragged/Dropped ([[INTERACTION_LIBRARY.md]] §2-3).

## 9. Bonnes pratiques

Durée toujours alignée verticalement en colonne (tabulaire) pour une lecture rapide d'une liste.

## 10. Anti-patterns

Poignée de glissement toujours visible même sans survol : bruit visuel inutile sur une liste dense.

## 11. Cas limites

Titre très long : troncature avec ellipse, jamais un retour à la ligne qui casserait la densité de la liste.

## 12. Performance

Liste virtualisée obligatoire au-delà d'un seuil ([[PERFORMANCE_BUDGET.md]] §3) — une file de plusieurs centaines de pistes ne monte que les éléments visibles.

## 13. Tests

Interaction (glisser-déposer clavier et souris), performance (virtualisation), accessibilité (réorganisation clavier).

---

# Composants compacts

**Queue** (conteneur de Queue Items, Panel ou Sheet selon plateforme, [[SURFACE_SYSTEM.md]] §6) · **Waveform** (représentation visuelle de la piste, décorative, jamais seule source d'information de progression) · **Progress Timeline** (barre de progression du lecteur, voir Slider [[FORM_COMPONENTS.md]]) · **Lyrics Panel** (voir [[PLAYER_SPECIFICATION.md]] §6, [[PLAYER_EXPERIENCE.md]] §10) · **Audio Visualizer** (voir [[PLAYER_SPECIFICATION.md]] §7, désactivable, jamais seule source d'information) · **Volume Mixer** (VolumeSlider + IconButton mute, [[FORM_COMPONENTS.md]]) · **Device Selector / Cast Selector** (Popover + Menu listant les appareils disponibles, état de connexion par icône jamais couleur seule) · **Playback Speed** (Dropdown de valeurs prédéfinies) · **Repeat Control / Shuffle Control** (ToggleButton, [[BUTTON_SPECIFICATION.md]]) · **Favorite Button / Download Button** (IconButton avec état Selected/Loading respectivement) · **Offline Indicator** (Badge d'état, icône + libellé jamais couleur seule) · **Now Playing Bar** (synonyme de Mini Player en contexte desktop).

## Equalizer Panel (architecture seulement)

**Objectif anticipé** : ajustement manuel de bandes de fréquence, dépend du moteur audio Web Audio API déjà prévu en évolution ([[AUDIO_ENGINE.md]] §7, non implémenté au MVP). **Contrat d'interface attendu** : composition de plusieurs `Slider` verticaux ([[FORM_COMPONENTS.md]]) liés à un `AnalyserNode`. Non spécifié davantage tant que [[FEATURE_ROADMAP.md]] ne l'engage pas au-delà de l'architecture.

## Floating Player (ajout Phase 9)

**Présentation** : forme du lecteur déjà nommée dans [[PLAYER_SPECIFICATION.md]] §2 (« fenêtre système indépendante, always-on-top ») mais jamais détaillée — comblé ici. **Anatomie** : équivalent visuel du Mini Player, sans les zones de navigation qui n'ont pas de sens dans une fenêtre indépendante (pas de Sidebar/TopBar). **Quand utiliser** : desktop uniquement, activé explicitement par l'utilisateur (jamais une fenêtre qui s'ouvre automatiquement). **Comportement** : synchronisé en temps réel avec l'état de lecture de la fenêtre principale — une seule source de vérité ([[FRONTEND_ARCHITECTURE.md]] §6), jamais un état dupliqué qui pourrait diverger. **Fermeture** : ramène au Mini Player de la fenêtre principale, ne met jamais la lecture en pause. **Accessibilité** : reçoit son propre focus de fenêtre OS, raccourcis clavier globaux ([[KEYBOARD_SHORTCUTS.md]]) fonctionnels même quand cette fenêtre a le focus.

## Picture in Picture (architecture seulement, ajout Phase 9)

**Objectif anticipé** : incrustation vidéo-like du lecteur par-dessus d'autres applications, via l'API navigateur `documentPictureInPicture` (Web) ou une fenêtre système équivalente (Tauri) — aucune fonctionnalité engagée à ce jour dans [[FEATURE_ROADMAP.md]]. **Distinction avec Floating Player** : Floating Player est une fenêtre applicative Melodia à part entière (desktop uniquement) ; Picture in Picture est une incrustation système minimale pensée pour rester visible par-dessus n'importe quelle autre application, y compris sur des plateformes où Floating Player n'existe pas (web, mobile). **Contrat d'interface attendu** : pochette + lecture/pause + suivant, rien de plus — une PiP surchargée de contrôles perdrait sa raison d'être (rester discrète par-dessus autre chose). Non spécifié davantage tant qu'aucun besoin produit réel ne l'exige.

---

## Checklist de validation

- [ ] Les formes du lecteur et Queue Item couvrent les 13 sections en détail.
- [ ] Aucun comportement de [[PLAYER_SPECIFICATION.md]]/[[PLAYER_EXPERIENCE.md]] n'est redécidé, uniquement référencé.
- [ ] Equalizer Panel reste en architecture seulement, cohérent avec son statut non engagé.

## Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 6) | React Component Architect / Motion Designer |
| 0.2.0 | 2026-08-04 | Phase 9 : ajout de Floating Player (comblait un vide) et Picture in Picture (architecture seulement) — au lieu de créer PLAYER_SYSTEM.md en doublon | Senior Audio UX Engineer |

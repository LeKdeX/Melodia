# PLAYER_SPECIFICATION.md — Spécification du lecteur (Phase 1, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Music Experience Designer / Interaction Designer
> **Documents liés** : [[AUDIO_ENGINE.md]], [[FRONTEND_ARCHITECTURE.md]] §6, [[PRODUCT_RULES.md]] §1-2

> **Cadrage** : ce document spécifie le comportement **produit** du lecteur (états, formes, interactions, micro-animations). L'implémentation technique de la lecture elle-même (gapless, crossfade, ReplayGain, égaliseur, MediaSession) est déjà décidée dans [[AUDIO_ENGINE.md]] — ce document ne la re-décide pas, il définit comment elle se manifeste à l'utilisateur.

---

## 1. Objectif et valeur

Le lecteur est l'élément le plus important de l'interface — présent à tout moment ([[PRODUCT_RULES.md]] §1), il incarne à lui seul la promesse de continuité de [[VISION.md]] §9. Sa qualité perçue conditionne la perception de qualité de l'ensemble du produit.

## 2. Formes du lecteur

| Forme | Contexte | Contenu affiché |
|---|---|---|
| **Mini Player** | Ancré en permanence (bas d'écran mobile, barre latérale desktop) | Pochette, titre, artiste, barre de progression fine, lecture/pause |
| **Compact Player** | Vue par défaut desktop | Mini Player + précédent/suivant, volume, accès rapide à la file |
| **Expanded Player** | Ouvert par l'utilisateur (clic sur le Compact/Mini Player) | Pochette grand format, paroles (§6), contrôles complets, accès EQ/visualiseur |
| **Fullscreen Player** | Mode dédié, notamment mobile | Expanded Player sans aucun autre élément d'interface, palette dynamique (§4) en arrière-plan |
| **Floating Player** | Desktop, fenêtre indépendante (« always on top ») | Équivalent Mini Player dans une fenêtre système dédiée |
| **Always Visible Player** | Contrainte transverse, pas une forme séparée | Aucune des formes ci-dessus ne peut être fermée sans qu'une autre prenne le relais — le lecteur n'est jamais totalement invisible pendant une lecture active |

**Règle de transition** : passer d'une forme à l'autre est toujours une animation continue de la même pochette/du même contenu (jamais une disparition suivie d'une réapparition) — cohérent avec [[UX_PRINCIPLES.md]] §2.

## 3. États du lecteur

| État | Comportement |
|---|---|
| Aucune lecture | Lecteur réduit à sa forme la plus discrète, invite à lancer une lecture — jamais totalement absent une fois qu'une session a commencé |
| En lecture | Barre de progression active, contrôles complets |
| En pause | Pochette légèrement désaturée (signal visuel discret), barre de progression figée |
| En mise en tampon (réseau lent) | Indicateur de chargement non bloquant sur la barre de progression, jamais un blocage de l'interface ([[EXTREME_SCENARIOS.md]] §2) |
| En erreur de lecture (piste indisponible) | Message clair, passage automatique à la piste suivante après un délai court, jamais un blocage silencieux (voir [[ERROR_STATES.md]]) |

## 4. Pochette dynamique et palette de couleurs

- La pochette de la piste en cours pilote une palette de couleurs extraite automatiquement (couleurs dominantes), appliquée en arrière-plan du Fullscreen/Expanded Player.
- Extraction effectuée une fois par pochette et mise en cache (jamais recalculée à chaque changement de vue) — coût CPU non négligeable sinon, contraire à [[PERFORMANCE_BUDGET.md]] §7.
- Contraste du texte sur la palette extraite vérifié automatiquement (algorithme de contraste minimum) — jamais un texte illisible parce que la pochette est sombre ou claire de façon imprévisible ([[PROJECT_CHARTER.md]] §3.6, accessibilité).
- Transition de palette entre deux pistes : fondu progressif, jamais un changement abrupt (cohérent avec [[COMPETITIVE_ANALYSIS.md]] §2, inspiration Plexamp).

## 5. Contrôles

Lecture, pause, stop (équivalent pause + réinitialisation de la position), suivant, précédent, lecture aléatoire (on/off), Repeat One, Repeat All, Repeat Off, volume, recherche dans la piste (seek). Chaque contrôle a un raccourci clavier et un geste tactile associés (voir [[INTERACTION_GUIDELINES.md]]).

**Règles métier** :
- « Précédent » relance le début de la piste courante si elle est jouée depuis plus de 3 secondes ; revient à la piste précédente sinon (convention standard du marché, cohérente avec [[COMPETITIVE_ANALYSIS.md]]).
- Repeat One et lecture aléatoire sont mutuellement exclusifs avec une file à progression linéaire stricte, mais compatibles entre eux (Repeat All + aléatoire = ré-mélange à chaque boucle complète).
- Le volume est un réglage d'application, indépendant du volume système, mais jamais supérieur à 100 % par défaut (pas d'amplification qui risquerait un écrêtage, sauf activation explicite d'une fonctionnalité de normalisation avancée en paramètres).

## 5bis. Minuterie de sommeil / Sleep Timer (ajout Phase 9)

Arrête la lecture après une durée choisie (15/30/45/60 minutes, ou fin de la piste/de l'album en cours) — jamais une coupure brutale : le volume diminue progressivement dans la dernière minute avant l'arrêt (fondu de sortie, catégorie Ambiance, [[MOTION_GUIDELINES.md]] §1), cohérent avec le principe qu'aucune interaction ne doit sembler abrupte. **Accessibilité** : le temps restant est consultable à tout moment (icône avec le temps restant affiché au survol/focus), jamais un minuteur silencieux dont l'utilisateur perdrait la trace. **Annulation** : une seule action pour désactiver, disponible directement depuis l'icône active, jamais enfouie dans un sous-menu. **Persistance** : ne survit pas à la fermeture de l'application (contrairement à la file, [[QUEUE_SPECIFICATION.md]] §4) — un minuteur de sommeil oublié actif ne doit jamais surprendre l'utilisateur au lancement suivant.

## 5ter. Crossfade et lecture sans interruption (renvoi, ajout Phase 9)

Le comportement technique (gapless, crossfade, ReplayGain) est déjà entièrement décidé dans [[AUDIO_ENGINE.md]] — ce document ne le redécide pas. Manifestation produit : un réglage de durée de crossfade (0-12 secondes, 0 = gapless strict) dans les Paramètres audio ([[SETTINGS_SPECIFICATION.md]]), désactivé par défaut (gapless strict, comportement le plus prévisible) — le crossfade reste une préférence explicite de l'utilisateur, jamais un défaut surprenant pour un auditeur attentif à la continuité exacte d'un album conçu comme un tout.

## 6. Paroles (architecture prête, intégration ultérieure)

- Espace dédié dans l'Expanded/Fullscreen Player, avec état « non disponible » explicite si aucune parole n'est trouvée (jamais un espace vide non expliqué, voir [[EMPTY_STATES.md]]).
- Architecture prévue pour : paroles synchronisées (défilement ligne à ligne avec la position de lecture), paroles classiques (texte statique), mode karaoké (mise en évidence mot à mot), traduction, annotations, recherche dans les paroles.
- **Dépendance non résolue** : la disponibilité de paroles dépend des métadonnées exposées par Jellyfin ou d'une source tierce à déterminer — non engagée comme fonctionnalité complète avant une décision d'architecture dédiée (voir [[FEATURE_ROADMAP.md]] pour la priorité assignée).

## 7. Visualiseur audio

Voir [[AUDIO_ENGINE.md]] §7 pour l'implémentation technique (AnalyserNode, rendu Canvas/Worker). Spécification produit : accessible depuis le Fullscreen Player, désactivable, plusieurs styles visuels envisageables (barres, ondes, particules) — un seul style par défaut au lancement, les autres en évolution future (voir [[FEATURE_ROADMAP.md]]).

## 8. Mode cinématique

Mode d'affichage combinant Fullscreen Player + palette dynamique + visualiseur discret + paroles en surimpression légère — pensé pour un usage passif (écran de salon, second écran). Fonctionnalité de différenciation forte identifiée en [[FEATURE_ROADMAP.md]] (aucun concurrent analysé ne le fait aussi bien que ce que Melodia peut viser, voir [[COMPETITIVE_ANALYSIS.md]]).

## 9. Effets visuels premium et synchronisation des animations

Toute animation du lecteur (transition de palette, apparition des contrôles, changement de pochette) est synchronisée sur une seule temporalité partagée (pas d'animations qui se chevauchent de façon incohérente) — respect strict du budget 60 FPS ([[PERFORMANCE_BUDGET.md]] §3) et de `prefers-reduced-motion` ([[DESIGN_SYSTEM_ARCHITECTURE.md]] §5).

## 10. Micro-interactions du lecteur

| Interaction | Comportement |
|---|---|
| Survol d'un contrôle | Changement d'état visuel immédiat (< 1 frame perceptible) |
| Appui sur lecture/pause | Retour visuel instantané, avant même la confirmation que l'audio a effectivement démarré (UI optimiste, [[FRONTEND_ARCHITECTURE.md]] §8) |
| Glissement sur la barre de progression | Prévisualisation de la position cible avant relâchement |
| Ajout aux favoris depuis le lecteur | Animation courte et discrète, jamais une pop-up de confirmation qui interrompt l'écoute |

## 11. Cas limites

- Piste sans pochette : illustration générique neutre, jamais un espace vide ou une icône d'erreur.
- Piste sans métadonnées de durée exacte (fichier corrompu partiellement) : barre de progression en mode indéterminé plutôt qu'une estimation fausse affichée comme certaine.
- Changement rapide et répété de piste (l'utilisateur clique vite plusieurs fois) : la dernière action gagne, aucune pile de changements traitée en différé qui surprendrait l'utilisateur.

## 12. Comportement hors ligne

Un morceau déjà en cache/téléchargé se lit identiquement en ligne ou hors ligne ([[ARCHITECTURE_PRINCIPLES.md]] §3) — le lecteur n'affiche de différence que sur la disponibilité de fonctionnalités qui nécessitent le réseau (rien dans le lecteur lui-même n'en dépend, hors chargement initial d'une piste non encore mise en cache).

---

## 13. Checklist de validation

- [ ] Aucune information technique (implémentation gapless/crossfade) n'est dupliquée depuis [[AUDIO_ENGINE.md]] — uniquement référencée.
- [ ] Chaque forme du lecteur (§2) a un état vide/erreur défini, pas seulement un état nominal.
- [ ] Toute animation respecte le budget de performance et `prefers-reduced-motion`.
- [ ] Le mode cinématique et les paroles sont explicitement priorisés dans [[FEATURE_ROADMAP.md]], pas implicitement supposés MVP.

---

## 14. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 2) | Music Experience Designer / Interaction Designer |
| 0.2.0 | 2026-08-04 | Phase 9 : ajout §5bis (Sleep Timer, réellement nouveau) et §5ter (Crossfade, renvoi vers AUDIO_ENGINE.md) — au lieu de créer PLAYBACK_CONTROLS.md en doublon | Senior Audio UX Engineer |

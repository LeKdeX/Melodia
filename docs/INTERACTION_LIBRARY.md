# INTERACTION_LIBRARY.md — Catalogue exhaustif des micro-interactions (Phase 4)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Interaction Designer / Principal Motion Designer
> **Documents liés** : [[INTERACTION_GUIDELINES.md]], [[MOTION_GUIDELINES.md]], [[ANIMATION_LIBRARY.md]]

> **Cadrage** : [[INTERACTION_GUIDELINES.md]] a déjà défini et justifié hover, focus, pressed, chargement, transition de vue, favori, ajout playlist, like, téléchargement, synchronisation, disabled, success, warning, error (§4 de ce document). Ce document ne les redécrit pas — il y renvoie et se concentre sur les interactions demandées par le cadrage de la Premium Experience Bible qui n'avaient pas encore d'entrée dédiée : dragged, dropped, remove playlist, delete, queue, search, scroll, swipe, pointer. Chaque entrée suit un gabarit fixe : Déclencheur / Réponse visuelle / Durée-courbe / Justification.

---

## 1. Interactions déjà couvertes (renvoi, pas de duplication)

| Interaction | Référence |
|---|---|
| Hover | [[INTERACTION_GUIDELINES.md]] §4 |
| Focus | [[INTERACTION_GUIDELINES.md]] §4, [[ACCESSIBILITY_GUIDE.md]] §5 |
| Pressed | [[INTERACTION_GUIDELINES.md]] §4 |
| Favorite / Like | [[INTERACTION_GUIDELINES.md]] §4 |
| Add Playlist | [[INTERACTION_GUIDELINES.md]] §4 |
| Download | [[INTERACTION_GUIDELINES.md]] §4 |
| Keyboard (raccourcis) | [[INTERACTION_GUIDELINES.md]] §1 |

## 2. Dragged (glissement actif)

**Déclencheur** : l'utilisateur maintient et déplace un élément (piste, carte). **Réponse visuelle** : l'élément suit le curseur/doigt avec un décalage d'échelle léger (98% → 104%, signal qu'il est « soulevé ») et une ombre portée qui apparaît (`shadow-elevation-2`, [[SURFACE_SYSTEM.md]] §3) ; les éléments environnants se décalent pour montrer la position d'insertion possible. **Durée/courbe** : aucune animation sur l'élément actif lui-même pendant le glissement (suit le pointeur sans latence, [[MOTION_GUIDELINES.md]] §7) — seuls les éléments voisins qui se décalent utilisent la catégorie Standard. **Justification** : l'ombre et l'échelle communiquent l'état « en cours de déplacement » sans texte, cohérent avec « le mouvement explique l'interface » ([[PREMIUM_EXPERIENCE_BIBLE.md]] §1).

## 3. Dropped (relâchement)

**Déclencheur** : l'utilisateur relâche un élément en cours de glissement. **Réponse visuelle** : l'élément retombe à sa position finale avec la courbe `standard` ([[MOTION_GUIDELINES.md]] §2), l'ombre disparaît, une confirmation discrète locale à la zone de dépôt (bref changement de fond, catégorie Micro). Si le dépôt est invalide (zone non autorisée) : l'élément revient à sa position d'origine avec la courbe `exit`, jamais une simple disparition. **Justification** : le retour à l'origine en cas d'échec évite tout état ambigu — l'utilisateur voit immédiatement que l'action n'a pas eu lieu, sans message d'erreur nécessaire.

## 4. Remove Playlist (retrait d'un élément d'une playlist)

**Déclencheur** : action de retrait (menu contextuel ou geste). **Réponse visuelle** : l'élément se réduit en hauteur/opacité simultanément (jamais l'un sans l'autre, [[MOTION_GUIDELINES.md]] §12ter) pendant que les éléments suivants remontent pour combler l'espace — catégorie Standard, courbe `exit`. **Justification** : contrairement à la suppression définitive (§5), le retrait d'une playlist est réversible (l'élément reste dans la bibliothèque) — l'animation reste donc discrète et non dramatisée, jamais accompagnée d'un dialogue de confirmation ([[PRODUCT_RULES.md]] §7, réservé aux actions destructives réelles).

## 5. Delete (suppression définitive)

**Déclencheur** : confirmation d'un dialogue de suppression ([[DIALOG_LIBRARY.md]]). **Réponse visuelle** : identique au retrait (§4) dans la forme, mais précédée systématiquement du dialogue de confirmation — jamais une suppression définitive animée sans étape de confirmation préalable. **Justification** : la distinction entre §4 et §5 n'est pas visuelle mais procédurale — c'est la présence ou l'absence du dialogue qui signale la gravité, pas l'animation elle-même (une animation « plus dramatique » pour une suppression serait redondante avec la confirmation déjà obtenue et ralentirait inutilement l'action).

## 6. Queue (ajout/retrait de la file d'attente)

**Déclencheur** : ajout d'une piste à la file. **Réponse visuelle** : l'élément apparaît en fin de file avec un léger décalage des éléments existants (jamais un re-rendu complet, [[MOTION_GUIDELINES.md]] §7) ; si la file est visible à l'écran au moment de l'ajout, un bref surlignage (catégorie Micro) indique le nouvel élément sans nécessiter de défilement automatique forcé. **Justification** : l'ajout à la file est une action fréquente à haute répétition — l'animation reste volontairement sous le seuil de perception de ralentissement (< 150 ms, [[MOTION_GUIDELINES.md]] §1) pour ne jamais devenir un frein à l'usage répété.

## 7. Search (frappe dans la recherche)

**Déclencheur** : chaque caractère saisi dans la barre de recherche. **Réponse visuelle** : aucune animation sur le champ de saisie lui-même (la frappe doit paraître instantanée, [[PRODUCT_RULES.md]] §4) ; les résultats se mettent à jour avec un fondu très bref (catégorie Micro, [[MOTION_GUIDELINES.md]] §11), jamais un indicateur de chargement visible pour une recherche locale. **Justification** : toute latence perceptible sur la frappe elle-même casserait la promesse de recherche instantanée — c'est l'interaction la plus sensible au ralentissement perçu de toute l'application.

## 8. Scroll (défilement)

**Déclencheur** : défilement d'une liste ou grille. **Réponse visuelle** : la position de défilement est mémorisée par vue et restaurée exactement au retour ([[PREMIUM_DETAILS.md]] §2) — aucune ré-initialisation à la position zéro lors d'une navigation aller-retour. Au-delà d'une vitesse de défilement donnée, toute animation d'apparition en cascade des éléments est désactivée automatiquement ([[MOTION_GUIDELINES.md]] §7). **Justification** : un défilement qui ne mémorise pas sa position force l'utilisateur à retrouver manuellement son contexte — un détail invisible quand il fonctionne, une friction majeure quand il est absent.

## 9. Swipe (glissement directionnel, tactile)

**Déclencheur** : glissement latéral rapide sur un élément (piste en liste, pochette du lecteur — [[INTERACTION_GUIDELINES.md]] §2 pour la cartographie geste→action). **Réponse visuelle** : l'élément suit le doigt avec une résistance progressive au-delà d'un seuil (élasticité, [[MOTION_GUIDELINES.md]] §12ter), révèle l'action associée (icône) en fond avant le seuil de déclenchement, puis complète l'action avec un léger rebond si le seuil est franchi, ou revient à sa position d'origine sinon. **Justification** : révéler l'action avant de la déclencher évite tout geste accidentel irréversible — l'utilisateur voit toujours ce qui va se passer avant que cela n'arrive.

## 10. Pointer (curseur, desktop)

**Déclencheur** : changement de contexte sous le curseur. **Réponse visuelle** : le curseur change de forme selon le contexte (main sur un élément cliquable, curseur de déplacement pendant un glissement actif §2, curseur de redimensionnement sur une bordure de panneau ajustable) — jamais un curseur générique unique sur toute l'interface. **Justification** : le changement de curseur est un signal gratuit (aucun coût de mise en œuvre significatif) qui confirme l'interactivité avant même le survol complet d'un élément — cohérent avec « chaque action doit avoir une conséquence visible » ([[PREMIUM_EXPERIENCE_BIBLE.md]] §1).

---

## 11. Future Haptics — architecture pour une future application mobile

**Statut : non engagé pour cette phase**, cohérent avec la façon dont [[ACCESSIBILITY_GUIDE.md]] §7 a déjà traité les commandes vocales (signalé explicitement plutôt que silencieusement omis). Melodia est actuellement une architecture Web/Tauri sans application mobile native ([[ROADMAP.md]]) — aucun retour haptique n'est implémentable aujourd'hui. Cette section prépare uniquement le vocabulaire pour une évolution future, sans engager de date ni de portée :

| Interaction mobile future | Retour haptique envisagé | Correspondance desktop actuelle |
|---|---|---|
| Appui long (menu contextuel) | Vibration brève unique | Clic droit ([[INTERACTION_GUIDELINES.md]] §3) |
| Glissement au seuil de déclenchement (§9) | Vibration brève au franchissement du seuil | Aucune (le retour visuel suffit sur desktop) |
| Ajout aux favoris | Vibration très brève, alignée sur le rebond visuel (§Rebond, [[MOTION_GUIDELINES.md]] §12ter) | Aucune |
| Erreur bloquante | Vibration alignée sur le son d'erreur ([[SOUND_DESIGN_GUIDE.md]] §7) | Son + visuel |
| Glissement du lecteur (mini → étendu) | Retour léger au franchissement du point de bascule | Aucune |

**Principe déjà acté par avance** : tout retour haptique, le jour où il sera implémenté, suit la même règle que le son ([[SOUND_DESIGN_GUIDE.md]] §5) — désactivable globalement en un seul réglage, jamais un canal qui ne peut pas être coupé.

---

## 12. Checklist de validation

- [ ] Chaque interaction listée dans le cadrage (hover à pointer) a une entrée ici ou un renvoi explicite vers [[INTERACTION_GUIDELINES.md]] — aucune omise silencieusement.
- [ ] Aucune entrée ne redécrit une interaction déjà définie ailleurs (§1 reste un renvoi pur).
- [ ] La section Future Haptics reste explicitement non engagée, jamais présentée comme une fonctionnalité prévue à une date donnée.

---

## 13. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 4) | Interaction Designer / Principal Motion Designer |

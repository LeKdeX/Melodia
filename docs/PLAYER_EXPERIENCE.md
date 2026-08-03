# PLAYER_EXPERIENCE.md — Chorégraphie sensorielle du lecteur (Phase 4)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Human Interface Specialist / Principal Motion Designer
> **Documents liés** : [[PLAYER_SPECIFICATION.md]], [[MOTION_GUIDELINES.md]] §5, [[ANIMATION_LIBRARY.md]]

> **Cadrage strict** : [[PLAYER_SPECIFICATION.md]] reste la seule source de vérité pour *ce que* le lecteur fait (formes, états, contrôles, règles métier). [[MOTION_GUIDELINES.md]] §5 a déjà posé le principe général de continuité de mouvement du lecteur. Ce document répond à une question plus fine : la **chorégraphie exacte** de chaque transition sensorielle du lecteur — ce qui bouge en premier, ce qui bouge en dernier, ce qui reste fixe — sans rien re-décider de ce que ces deux documents ont déjà tranché.

---

## 1. Apparition du lecteur (première lecture d'une session)

Le Mini Player n'existe pas avant la première lecture ([[PLAYER_SPECIFICATION.md]] §3, « Aucune lecture »). À la première lecture : le Mini Player apparaît par une translation depuis le bord où il est ancré (bas sur mobile, latéral sur desktop) combinée à un fondu, catégorie Standard, courbe `entrance` ([[MOTION_GUIDELINES.md]] §2) — jamais un « pop » instantané qui surprendrait au milieu d'une autre action.

## 2. Agrandissement (Mini/Compact → Expanded)

Hero Animation ([[MOTION_GUIDELINES.md]] §12bis) : la pochette est l'élément d'ancrage visuel unique qui grossit en continu vers sa position/taille finale, jamais un remplacement par une nouvelle image. Ordre de chorégraphie : 1) la pochette commence son agrandissement en premier ; 2) les contrôles secondaires (paroles, file, EQ) apparaissent en fondu une fois la pochette proche de sa taille finale (décalage de rythme, [[MOTION_GUIDELINES.md]] §12ter) — jamais tous les éléments simultanément, ce qui donnerait une impression de saut plutôt que d'expansion continue. Durée : catégorie Complexe.

## 3. Réduction (Expanded → Mini/Compact)

Exactement l'inverse chorégraphique de §2 (les éléments secondaires disparaissent en premier, la pochette se réduit en dernier vers sa position finale), avec la courbe `exit` — jamais la même séquence rejouée à l'envers avec la courbe `entrance` (asymétrie intentionnelle, [[MOTION_GUIDELINES.md]] §2-3).

## 4. Plein écran (Fullscreen Player)

Hero Animation réservée à ce contexte unique ([[MOTION_GUIDELINES.md]] §12bis). Chorégraphie additionnelle propre au plein écran : l'arrière-plan (palette dynamique, [[DYNAMIC_THEME_GUIDE.md]]) apparaît en fondu progressif catégorie Ambiance en même temps que la pochette grossit, jamais avant (un arrière-plan qui change avant que le contenu principal ne bouge donnerait une fausse alerte visuelle) ni après (un arrière-plan en retard donnerait une impression de chargement).

## 5. Changement de morceau (piste suivante/précédente)

- **Pochette** : fondu croisé (l'ancienne pochette disparaît pendant que la nouvelle apparaît, jamais une coupure nette), catégorie Standard.
- **Texte (titre/artiste)** : fondu croisé synchronisé avec la pochette, jamais décalé dans le temps.
- **Rotation de la pochette** (mode Vinyle, optionnel) : si l'utilisateur active une présentation « vinyle » de la pochette ([[IMMERSION_GUIDE.md]] §5), une rotation continue et lente (une révolution complète toutes les ~20 secondes, catégorie Ambiance) tourne pendant la lecture et ralentit progressivement jusqu'à l'arrêt en pause — jamais un arrêt brutal, qui romprait l'illusion physique de l'objet qui tourne.
- **Barre de progression** : se réinitialise à zéro sans animation de vidage visible (un vidage animé de la barre précédente attirerait l'attention sur une information sans intérêt) puis se remplit normalement dès la lecture.

## 6. Mise à jour des couleurs dynamiques

Voir [[DYNAMIC_THEME_GUIDE.md]] pour la mécanique complète d'extraction et de garde-fou de contraste (déjà définie dans [[COLOR_SYSTEM.md]] §6-7 et [[PLAYER_SPECIFICATION.md]] §4). Chorégraphie propre à ce document : la transition de palette (catégorie Ambiance, [[MOTION_GUIDELINES.md]] §5) commence légèrement après le début du changement de pochette (§5), jamais avant — la couleur suit le contenu, elle ne le précède jamais, pour que l'utilisateur perçoive toujours la pochette comme la source de la couleur plutôt que l'inverse.

## 7. Barre de progression

Remplissage continu en temps réel (pas de saut de valeur), prévisualisation de la position cible pendant un glissement manuel avant relâchement ([[PLAYER_SPECIFICATION.md]] §10), retour à la lecture réelle instantané au relâchement — aucune animation de rattrapage visible entre la position prévisualisée et la position réelle, qui donnerait une impression de latence.

## 8. Volume

Ajustement direct sans délai (aucune animation d'amortissement sur le curseur lui-même, qui nuirait à la précision perçue du réglage) ; le niveau audio réel suit un lissage bref (quelques millisecondes, imperceptible) uniquement pour éviter un artefact audio de coupure brutale — cette temporisation est strictement audio, jamais visuelle.

## 9. File d'attente

Ouverture en panneau latéral/inférieur (Sheet, [[SURFACE_SYSTEM.md]] §6), catégorie Standard, courbe `entrance`. La piste en cours de lecture dans la file reste visuellement ancrée (léger surlignage permanent tant que la file est ouverte) — aucune animation répétitive sur cet ancrage, un état statique communique mieux « ceci est la position actuelle » qu'un clignotement.

## 10. Paroles

Apparition en fondu (catégorie Standard) dans l'espace dédié ([[PLAYER_SPECIFICATION.md]] §6). Si synchronisées : la ligne active se distingue par un changement de contraste progressif (jamais un saut binaire actif/inactif) au fil de la progression de lecture, défilement automatique fluide (pas de saut de position), interrompu dès que l'utilisateur fait défiler manuellement et repris automatiquement après quelques secondes d'inactivité.

---

## 11. Règle de synthèse propre au lecteur

Le lecteur est la seule zone de l'application où une animation de catégorie Ambiance (600-1000 ms, [[MOTION_GUIDELINES.md]] §1) est acceptable sur un changement fréquent — parce que la fréquence réelle d'un changement de piste reste largement inférieure à celle d'un clic de navigation, la contrainte de réactivité perçue est différente ici que partout ailleurs dans l'application.

---

## 12. Checklist de validation

- [ ] Chaque interaction demandée dans le cadrage (apparition, agrandissement, réduction, plein écran, changement de piste, rotation, couleurs, progression, volume, file, paroles) a une chorégraphie précise, pas seulement une référence.
- [ ] Aucune information déjà tranchée dans [[PLAYER_SPECIFICATION.md]] ou [[MOTION_GUIDELINES.md]] §5 n'est redécidée ici — uniquement l'ordre et le timing relatif.
- [ ] Chaque chorégraphie reste compatible avec `prefers-reduced-motion` ([[MOTION_GUIDELINES.md]] §12) sans perte d'information.

---

## 13. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 4) | Human Interface Specialist / Principal Motion Designer |

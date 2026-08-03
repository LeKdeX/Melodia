# DYNAMIC_THEME_GUIDE.md — Chorégraphie du thème dynamique (Phase 4)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Principal Motion Designer / Perception Psychologist
> **Documents liés** : [[COLOR_SYSTEM.md]] §6-7, [[PLAYER_SPECIFICATION.md]] §4, [[SURFACE_SYSTEM.md]] §5

> **Cadrage strict** : [[COLOR_SYSTEM.md]] §6-7 a déjà tranché *quelles* couleurs le thème dynamique peut utiliser et le garde-fou de contraste non négociable. [[PLAYER_SPECIFICATION.md]] §4 a déjà défini l'extraction, la mise en cache et le principe de transition progressive. Ce document ne redécide rien de tout cela — il ajoute la couche manquante : comment l'extraction se traduit en dégradé, en lumière ambiante et en profondeur, et comment cette composition évolue dans le temps.

---

## 1. De la palette extraite au dégradé

L'extraction ([[PLAYER_SPECIFICATION.md]] §4) produit une palette de couleurs dominantes. Le dégradé d'arrière-plan applique les deux couleurs les plus dominantes (jamais plus de deux — un dégradé à trois couleurs ou plus devient visuellement bruyant) selon un angle fixe (diagonal, haut-gauche vers bas-droite) constant à travers toute l'application — jamais un angle qui varie d'une pochette à l'autre, ce qui romprait la cohérence perçue du système lui-même.

## 2. Lumière ambiante

Une troisième zone, plus claire et très diffuse, simule une source de lumière provenant de la position de la pochette elle-même (halo doux autour de la pochette dans le Fullscreen Player, [[PLAYER_SPECIFICATION.md]] §2) — jamais un halo qui déborde au point de toucher les contrôles ou le texte, dont le contraste reste garanti indépendamment ([[COLOR_SYSTEM.md]] §6, règle non négociable).

## 3. Flou et profondeur

Le dégradé et la lumière ambiante (§1-2) utilisent le token de flou `background-ambient` déjà défini ([[SURFACE_SYSTEM.md]] §5) — jamais un flou plus intense qui rendrait les couleurs méconnaissables par rapport à la pochette source (l'utilisateur doit pouvoir reconnaître intuitivement que l'arrière-plan « vient » de la pochette). Profondeur perçue : l'arrière-plan reste toujours au niveau d'élévation le plus bas (0, [[SURFACE_SYSTEM.md]] §3), jamais superposé visuellement au-dessus du contenu qu'il est censé mettre en valeur.

## 4. Évolution dans le temps

- **Changement de piste** : voir [[PLAYER_EXPERIENCE.md]] §6 pour le timing relatif (la couleur suit toujours la pochette, jamais l'inverse).
- **Pas de mouvement perpétuel** : contrairement à un économiseur d'écran, le dégradé ne dérive jamais tout seul pendant qu'une même piste continue de jouer — un arrière-plan qui bouge sans raison fonctionnelle deviendrait une distraction visuelle sur une écoute longue, contraire à [[UX_PRINCIPLES.md]] §2 (chaque animation doit avoir une utilité).
- **Repli automatique** : si l'extraction échoue ou si le contraste calculé ne passe pas le seuil garanti ([[COLOR_SYSTEM.md]] §6), repli immédiat et sans transition perceptible sur le thème actif non dynamique — un repli qui prend du temps à s'appliquer serait pire qu'une absence de thème dynamique.

## 5. Portée de l'effet

Cohérent avec [[COLOR_SYSTEM.md]] §6 : la composition dégradé + lumière ambiante + flou ne s'applique jamais au-delà de la zone du lecteur (Dynamic Album) ou de la page artiste (Dynamic Artist) — jamais à la navigation principale, à la bibliothèque ou à tout écran où la lisibilité soutenue prime sur l'ambiance.

---

## 6. Checklist de validation

- [ ] Aucune règle de couleur/contraste n'est redécidée ici — uniquement référencée depuis [[COLOR_SYSTEM.md]] §6-7.
- [ ] Le dégradé et la lumière ambiante n'affectent jamais le contraste du texte/contrôles.
- [ ] Aucun mouvement perpétuel non justifié n'est introduit sur l'arrière-plan dynamique.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 4) | Principal Motion Designer / Perception Psychologist |

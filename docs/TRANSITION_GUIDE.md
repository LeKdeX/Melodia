# TRANSITION_GUIDE.md — Transitions de page nommées (Phase 4)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Interaction Designer / Human Interface Specialist
> **Documents liés** : [[MOTION_GUIDELINES.md]] §4, [[ANIMATION_LIBRARY.md]] §2, [[NAVIGATION_GUIDE.md]]

> **Cadrage** : [[MOTION_GUIDELINES.md]] §4 a déjà posé le principe général (continuité spatiale systématique, durée « Complexe »). Ce document applique ce principe à chacune des transitions nommées du cadrage, une par une, avec ce qui change concrètement dans chaque cas.

---

## 1. Accueil → Album

L'utilisateur clique une carte album depuis l'accueil. Shared Element Navigate ([[ANIMATION_LIBRARY.md]] §2) : la pochette grossit vers sa position d'en-tête de la page Album, le titre suit avec un très léger décalage de rythme (20-40 ms, [[MOTION_GUIDELINES.md]] §12ter). Le reste du contenu de la page Album (liste des pistes) apparaît en Fade Standard juste après, jamais avant que la pochette n'ait atteint sa position finale.

## 2. Album → Artiste

Clic sur le nom de l'artiste depuis la page Album. Pas de Shared Element (l'artiste n'a pas d'élément visuel directement cliqué équivalent à une pochette) — Fade Standard avec direction implicite : le nouveau contenu apparaît légèrement décalé dans le sens de la profondeur perçue (léger zoom avant subtil, jamais une translation latérale qui suggérerait une navigation « de côté » incohérente avec la hiérarchie réelle bibliothèque → artiste).

## 3. Artiste → Morceau

Clic sur une piste depuis la page Artiste — ouvre le lecteur plutôt qu'une nouvelle page. Ce n'est pas une transition de page mais une transition vers le lecteur : Hero Expand si le clic déclenche directement l'Expanded Player, ou simple mise à jour du Mini Player déjà visible (fondu croisé du contenu, [[PLAYER_EXPERIENCE.md]] §5) si le lecteur reste en forme réduite.

## 4. Recherche → Résultat

Clic sur un résultat de recherche. Le champ de recherche et les résultats restants s'estompent (Fade Standard, catégorie Micro pour rester cohérent avec la vitesse perçue de la recherche, [[MOTION_GUIDELINES.md]] §11) pendant que la page de destination (Album/Artiste/Morceau, selon la nature du résultat) s'ouvre avec sa transition propre (§1-3 selon le cas). Jamais de Shared Element depuis un résultat de recherche — la liste de résultats est trop dense pour qu'un agrandissement d'élément reste lisible.

## 5. Bibliothèque → Lecteur

Ouverture du lecteur depuis n'importe quelle vue de bibliothèque sans avoir cliqué une piste spécifique (ex. reprise de lecture via le Mini Player). Le Mini Player, déjà visible en permanence ([[PRODUCT_RULES.md]] §1), s'agrandit sur place — c'est la transition Agrandissement déjà définie ([[PLAYER_EXPERIENCE.md]] §2), pas une navigation de page à proprement parler (le contenu de bibliothèque en arrière-plan reste monté, jamais déchargé).

## 6. Lecteur → Plein écran

Voir [[PLAYER_EXPERIENCE.md]] §4 pour la chorégraphie complète (Hero Expand + arrière-plan dynamique synchronisé).

## 7. Retour (navigation arrière)

Inverse exact de la transition aller correspondante (§1-6), avec les courbes `exit`/`entrance` échangées par rapport au trajet aller — jamais un simple rejeu inversé de la même animation, cohérent avec l'asymétrie entrée/sortie déjà actée ([[MOTION_GUIDELINES.md]] §2). Le geste de retour (bouton système, glissement depuis le bord sur mobile) suit le doigt en temps réel avant relâchement, jamais une animation figée qui ignore la position du geste en cours.

## 8. Navigation latérale (entre sections principales)

Changement de section depuis la barre de navigation latérale/inférieure (ex. Bibliothèque → Statistiques). Fade Standard uniquement, catégorie Standard — jamais de Shared Element Navigate entre deux sections de niveau racine, qui n'ont pas de relation de contenu commune justifiant une continuité spatiale. L'élément de navigation cliqué (icône/libellé) change d'état actif instantanément (catégorie Micro), avant même la fin de la transition de contenu.

## 9. Historique (navigation via l'historique de lecture/de navigation)

Accès à un élément depuis l'historique (piste récemment jouée, page récemment visitée). Traitée comme une navigation directe standard vers la destination (§1-3 selon la nature de l'élément) — l'historique lui-même n'introduit aucune animation propre, il n'est qu'un point d'entrée parmi d'autres vers une destination déjà chorégraphiée ailleurs dans ce document.

## 9bis. Table des parcours nommés — Phase 10 (renvoi, aucune nouvelle animation)

> Ajoutée pour répondre explicitement aux « Screen Flows » du cadrage Phase 10 (Screen System) — chaque parcours nommé est déjà une instance des catégories §1-9, listé ici comme index plutôt que redécrit.

| Parcours | Catégorie déjà définie |
|---|---|
| Accueil → Album | §1 (Accueil → Album) |
| Album → Lecture | §5 (Bibliothèque → Lecteur, le clic sur un titre agrandit le Mini Player existant) |
| Lecture → Paroles | Ouverture du Lyrics Panel, [[PLAYER_EXPERIENCE.md]] §10 — panneau local au lecteur, pas une navigation de page |
| Paroles → Artiste | Clic sur le nom d'artiste depuis le Lyrics Panel : §2 (Album → Artiste), le point de départ change mais la chorégraphie est identique |
| Recherche → Album | §4 (Recherche → Résultat), destination Album traitée ensuite comme §1 |
| Playlist → Lecture | Identique à §5, Playlist jouant le rôle de la Bibliothèque comme point de départ |
| Paramètres → Retour | §7 (Retour), sans particularité propre aux Paramètres |

**Aucune animation nouvelle n'est introduite par ce tableau** — il ne fait qu'indexer des parcours concrets vers les catégories déjà chorégraphiées, cohérent avec le principe que les composants (et leurs transitions) sont désormais figés ([[SCREEN_SYSTEM.md]] §1).

---

## 10. Règle transverse

Aucune transition de page ci-dessus ne bloque l'interaction avec le lecteur pendant son déroulement — la lecture en cours et ses contrôles restent réactifs pendant toute transition de contenu, cohérent avec [[PRODUCT_RULES.md]] §2 (la musique ne s'arrête jamais lors d'une navigation).

---

## 11. Checklist de validation

- [ ] Les 9 transitions nommées dans le cadrage ont chacune une description précise, aucune traitée par défaut sans réflexion.
- [ ] Aucune transition ne contredit le principe de continuité spatiale déjà acté ([[MOTION_GUIDELINES.md]] §4).
- [ ] Le lecteur reste interactif pendant toute transition de page (§10).

---

## 12. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 4) | Interaction Designer / Human Interface Specialist |
| 0.2.0 | 2026-08-04 | Phase 10 : ajout §9bis (table des 7 parcours nommés du Screen System) — au lieu de créer SCREEN_TRANSITIONS.md en doublon | UX Architect |

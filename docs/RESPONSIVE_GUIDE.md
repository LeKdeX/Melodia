# RESPONSIVE_GUIDE.md — Comportement responsive précis (Phase 1, volume 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Senior UX Designer / Human Interface Designer
> **Documents liés** : [[DESIGN_SYSTEM_ARCHITECTURE.md]] §4, [[TECH_STACK.md]] §2, [[NAVIGATION_GUIDE.md]] §3

> **Cadrage** : les breakpoints eux-mêmes (Tailwind standards + `tablet` dédié) sont déjà décidés dans [[DESIGN_SYSTEM_ARCHITECTURE.md]] §4. Ce document précise le comportement concret par classe d'appareil, pas de nouveaux seuils.

---

## 1. Classes d'appareils couvertes

| Classe | Largeur indicative | Contexte d'usage principal |
|---|---|---|
| Petit téléphone | < 380px | Usage à une main, [[PERSONAS.md]] §6 |
| Grand téléphone | 380–599px | Usage à une ou deux mains |
| Tablette | 600–1023px | Usage posé, souvent à deux mains ou support |
| Desktop | 1024–1919px | [[PERSONAS.md]] §7, souvent en fenêtre partagée |
| Ultra-wide | 1920–2559px, ratio large | Multi-tâche intensif |
| 4K | ≥ 2560px | Densité de pixels élevée, pas nécessairement plus d'espace utile perçu |

## 2. Petit téléphone

- Navigation : barre inférieure à 4 entrées maximum, reste condensé en « Plus » ([[NAVIGATION_GUIDE.md]] §3).
- Mini Player : hauteur réduite au strict nécessaire (pochette, titre, lecture/pause) pour préserver l'espace de contenu.
- Grille bibliothèque : 2 colonnes maximum — au-delà, les pochettes deviennent trop petites pour rester reconnaissables.
- Aucune fonctionnalité n'est retirée par rapport aux autres classes — seule la densité d'affichage change, jamais le périmètre fonctionnel (cohérent avec [[UX_PRINCIPLES.md]] §8).

## 3. Grand téléphone

Identique au petit téléphone avec une marge de confort supplémentaire (3 colonnes de grille possibles selon la densité de pochette choisie par l'utilisateur, [[LIBRARY_SPECIFICATION.md]] §1).

## 4. Tablette

- Navigation : barre latérale rétractable plutôt que barre inférieure — la largeur disponible justifie une navigation permanente sans sacrifier le contenu ([[NAVIGATION_GUIDE.md]] §3).
- Grille bibliothèque : 4 à 6 colonnes selon l'orientation (portrait/paysage).
- Le lecteur peut s'afficher en panneau latéral persistant en orientation paysage plutôt qu'en Mini Player superposé — décision de layout, pas une nouvelle forme de lecteur ([[PLAYER_SPECIFICATION.md]] §2 reste la référence des formes).
- Changement d'orientation : aucune perte d'état (position de lecture, défilement) pendant la transition.

## 5. Desktop

- Navigation : barre latérale complète (icônes + libellés) toujours visible.
- Grille bibliothèque : colonnes adaptatives selon la largeur de fenêtre réelle (l'utilisateur peut redimensionner), pas un nombre fixe.
- Fenêtre réduite (usage en multi-tâche, [[PERSONAS.md]] §7) : la barre latérale bascule automatiquement en mode icônes seules sous un seuil de largeur, jamais un défilement horizontal forcé.

## 6. Ultra-wide

- Le contenu ne s'étire jamais sur toute la largeur disponible sans limite — une largeur de lecture confortable est préservée (colonnes de grille supplémentaires plutôt que des cartes déformées), cohérent avec [[NAVIGATION_GUIDE.md]] §9.
- Utilisation de l'espace excédentaire pour un panneau secondaire optionnel (ex. file d'attente visible en permanence à côté du contenu principal) plutôt qu'un simple agrandissement du contenu central.

## 7. 4K et haute densité de pixels

- Aucune mise à l'échelle approximative — toutes les ressources visuelles (icônes, illustrations d'état vide) sont vectorielles ou fournies en haute résolution native, jamais une image bitmap agrandie qui deviendrait floue.
- La densité de pixels élevée ne doit jamais être confondue avec plus d'espace utile — les tailles de cible tactile/clic restent cohérentes en unités relatives, pas en pixels physiques.

## 7bis. Règle générale de priorité et de masquage (ajout Phase 5)

> Section ajoutée pour généraliser en une règle unique ce qui était jusqu'ici décrit uniquement par classe d'appareil (§2-7) — cette règle s'applique à tout élément d'interface futur, pas seulement à ceux déjà spécifiés ci-dessus.

- **Trois niveaux de priorité de contenu**, valables sur tout écran : 1) contenu principal de la tâche en cours (jamais masqué, quelle que soit la largeur) ; 2) actions secondaires fréquentes (masquées derrière un menu « Plus » sous un seuil de largeur, jamais supprimées) ; 3) informations tertiaires (masquées en premier, jamais indispensables à la compréhension du contenu principal).
- **Ordre de masquage déterministe** : à mesure que la largeur diminue, les éléments disparaissent dans l'ordre inverse de leur priorité (tertiaire d'abord, secondaire ensuite) — jamais un ordre différent d'un écran à l'autre, pour que le comportement reste prévisible une fois appris une fois.
- **Aucun masquage silencieux d'une action destructive ou de sécurité** : une action de confirmation ([[DIALOG_LIBRARY.md]]) n'est jamais reléguée dans un menu « Plus » à cause d'une contrainte de largeur — sa visibilité prime sur la densité.
- **Réorganisation plutôt que masquage quand c'est possible** : un contenu qui peut passer d'une disposition horizontale à verticale (ex. Subtitle sous Title plutôt qu'à côté, [[TYPOGRAPHY_GUIDE.md]] §4bis) est réorganisé avant d'être masqué — le masquage reste le dernier recours, jamais la première réponse à une contrainte d'espace.

## 7ter. Préparation TV et manette (ajout Phase 8)

> [[NAVIGATION_GUIDE.md]] §7 avait explicitement différé ce sujet (« non couverte en Phase 1... à traiter dans un document dédié si cette cible est engagée ») plutôt que de le spécifier prématurément. [[EVOLVABILITY.md]] §3-4 a depuis identifié la TV comme direction d'évolution possible, avec une tension déjà documentée vis-à-vis de la charte produit. Cette section honore ce renvoi sans engager la fonctionnalité elle-même — **statut : préparation architecturale, jamais une navigation TV/manette livrée**.

- **Navigation D-pad/manette** : tout élément interactif de la hiérarchie de focus déjà définie ([[NAVIGATION_GUIDE.md]] §8) doit rester atteignable par une navigation à quatre directions (haut/bas/gauche/droite) sans point mort — cohérent avec l'exigence déjà posée dans [[DESIGN_SYSTEM_ARCHITECTURE.md]] §7 (« architecture compatible avec une éventuelle interface Android TV, focus D-pad »), non redécidée ici, seulement rappelée à l'échelle de ce document.
- **Classe d'appareil TV** (préparée, non activée) : viewport large avec distance de visionnage supérieure — impliquerait une échelle typographique et des zones de focus agrandies par rapport à la classe Desktop (§5), jamais un simple zoom proportionnel de l'interface existante.
- **Aucun engagement de calendrier** : cette préparation ne modifie aucun composant existant aujourd'hui — elle garantit uniquement qu'un futur mode TV n'exigerait pas une réécriture de la couche de navigation, cohérent avec l'honnêteté déjà appliquée ailleurs dans ce projet (ne jamais promettre une fonctionnalité non engagée).

## 8. Cas limites transverses

- Redimensionnement en temps réel de la fenêtre (desktop) : transition fluide entre classes de layout, jamais un rechargement complet de la vue.
- Rotation d'écran (mobile/tablette) : préservation totale de l'état (lecture, position de défilement, focus clavier si applicable).
- Fenêtre plus petite que la classe « petit téléphone » (cas extrême desktop, fenêtre très réduite) : dégradation gracieuse vers le layout petit téléphone plutôt qu'un layout cassé.

---

## 9. Checklist de validation

- [ ] Aucune fonctionnalité n'est retirée sur une classe d'appareil — seule la densité change.
- [ ] Aucun seuil de breakpoint n'est redéfini ici — uniquement référencé depuis [[DESIGN_SYSTEM_ARCHITECTURE.md]] §4.
- [ ] Chaque transition (redimensionnement, rotation) préserve l'état applicatif.
- [ ] L'ordre de masquage (§7bis) reste identique sur tous les écrans, jamais réinventé localement.
- [ ] Aucune action destructive ou de sécurité n'est reléguée à un menu secondaire par contrainte de largeur.

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 3) | Senior UX Designer / Human Interface Designer |
| 0.2.0 | 2026-08-03 | Phase 5 : ajout §7bis (règle générale de priorité et de masquage) — au lieu de créer RESPONSIVE_SYSTEM.md en doublon | UX Engineer |
| 0.3.0 | 2026-08-04 | Phase 8 : ajout §7ter (préparation TV/manette, honore le renvoi posé en §7 depuis la Phase 1) — au lieu de créer RESPONSIVE_NAVIGATION.md en doublon | Navigation System Architect |

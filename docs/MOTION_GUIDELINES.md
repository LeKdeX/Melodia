# MOTION_GUIDELINES.md — Philosophie d'animation (Phase 1, volume 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Motion Designer / Principal Interaction Designer
> **Documents liés** : [[UX_PRINCIPLES.md]] §2, [[DESIGN_SYSTEM_ARCHITECTURE.md]] §1, [[TECH_STACK.md]] §1

> **Ce document comble un vide identifié dans `CLAUDE.md`** : jusqu'ici, l'animation n'était traitée qu'au niveau du principe (« chaque animation doit avoir une utilité », [[UX_PRINCIPLES.md]] §2) et du token technique (« durée/courbe », [[DESIGN_SYSTEM_ARCHITECTURE.md]] §1) sans valeurs concrètes. Ce document fournit ces valeurs, justifiées par les conventions établies du motion design d'interface (Material Design Motion System, Apple Human Interface Guidelines) plutôt qu'inventées arbitrairement — cohérent avec la règle « aucune décision arbitraire » (`CLAUDE.md`).

---

## 1. Système de durées

| Catégorie | Durée | Usage |
|---|---|---|
| Micro (instantané) | 100–150 ms | Hover, pressed, changement d'état d'une icône ([[INTERACTION_GUIDELINES.md]] §4) |
| Standard | 200–250 ms | Transitions de composant (ouverture d'un menu, apparition d'un tooltip) |
| Complexe | 300–400 ms | Transitions de page/vue, changement de forme du lecteur ([[PLAYER_SPECIFICATION.md]] §2) |
| Ambiance | 600–1000 ms | Transition de palette de couleur dynamique ([[PLAYER_SPECIFICATION.md]] §4), jamais sur un élément interactif |

**Règle absolue** : aucune animation sur le chemin critique d'une action fréquente (lecture/pause, navigation) ne dépasse 250 ms — au-delà, l'animation est perçue comme un ralentissement plutôt qu'un raffinement, contraire à [[PRODUCT_RULES.md]] §3.

## 2. Courbes d'accélération (easing)

| Courbe | Forme | Usage |
|---|---|---|
| `standard` (ease-in-out) | Départ et arrivée progressifs | Transitions bidirectionnelles (ouverture/fermeture d'un panneau) |
| `entrance` (ease-out, décélération) | Rapide au départ, ralentit à l'arrivée | Élément qui apparaît (nouvel élément de liste, notification) — imite un objet qui vient se poser |
| `exit` (ease-in, accélération) | Lent au départ, accélère à la sortie | Élément qui disparaît — jamais la même courbe qu'à l'entrée, l'asymétrie perçue rend la disparition plus naturelle |
| `emphasis` (courbe à dépassement léger, overshoot) | Léger dépassement puis retour | Confirmation d'action volontaire (ajout aux favoris, [[INTERACTION_GUIDELINES.md]] §4) — jamais sur des transitions systémiques (navigation) |

## 3. Animations d'entrée et de sortie

- Un élément qui apparaît utilise `entrance` ; un élément qui disparaît utilise `exit` — jamais la courbe inverse utilisée dans les deux sens (asymétrie intentionnelle, §2).
- Un élément qui apparaît à la suite d'une action utilisateur directe (ex. résultat de recherche) apparaît légèrement plus vite qu'un élément qui apparaît en tâche de fond (ex. fin de synchronisation) — la hiérarchie de vitesse communique la hiérarchie d'importance perçue.

## 4. Transitions de page

Continuité spatiale systématique : l'élément sur lequel l'utilisateur a cliqué (pochette, ligne de liste) se retrouve visuellement dans la vue suivante au même endroit approximatif avant de s'animer vers sa position finale — jamais une coupure puis un nouvel élément sans rapport visuel avec l'action initiale (rappel de [[UX_PRINCIPLES.md]] §2). Durée : catégorie « Complexe » (§1).

## 5. Transitions du lecteur

- Mini → Compact → Expanded → Fullscreen : chaque transition anime la même pochette et les mêmes contrôles vers leur nouvelle position/taille, jamais une disparition suivie d'une réapparition ([[PLAYER_SPECIFICATION.md]] §2).
- Changement de piste : fondu croisé du contenu textuel (titre/artiste), translation douce de la pochette si le layout le permet. Durée : catégorie « Standard ».
- Palette dynamique : catégorie « Ambiance » (§1) — un changement de couleur d'arrière-plan trop rapide serait distrayant, pas raffiné.

## 6. Transitions des pochettes

Chargement progressif : une pochette non encore chargée affiche un espace neutre animé discrètement (jamais un spinner classique sur chaque pochette d'une grille, qui deviendrait visuellement bruyant à grande échelle) puis un fondu d'apparition (`entrance`, catégorie Standard) une fois chargée.

## 7. Transitions de listes

- Ajout d'un élément à une liste déjà affichée (ex. ajout à la file) : l'élément s'insère avec un léger décalage des éléments voisins, jamais un re-rendu complet de la liste.
- Réorganisation (glisser-déposer) : les éléments non déplacés se décalent avec une animation `standard`, l'élément déplacé suit le curseur/doigt sans latence perceptible (aucune animation sur l'élément actif lui-même pendant le glissement).
- Listes virtualisées de grande taille ([[PERFORMANCE_BUDGET.md]] §3) : aucune animation d'apparition en cascade sur le défilement rapide — désactivée automatiquement au-delà d'une vitesse de défilement donnée pour préserver la fluidité (60 FPS reste prioritaire sur l'esthétique).

## 8. Transitions de modales

Apparition : fondu du fond (assombrissement) + légère translation/échelle du contenu de la modale (`entrance`, catégorie Standard). Fermeture : inverse avec `exit`. Une modale ne se ferme jamais instantanément sans transition, sauf action clavier `Échap` où la réactivité prime sur l'esthétique (catégorie Micro).

## 9. Animations de synchronisation

Indicateur discret et continu (rotation douce ou pulsation lente), jamais une animation qui capte l'attention de façon insistante — cohérent avec [[USER_JOURNEYS.md]] §9 (la synchronisation doit rester presque invisible).

## 10. Animations de téléchargement

Barre de progression locale à l'élément concerné, remplissage continu (pas de saut de valeur brutal), transition vers un état « terminé » avec une micro-confirmation discrète (catégorie Micro) — jamais une notification globale pour un téléchargement individuel ([[INTERACTION_GUIDELINES.md]] §4).

## 11. Animations de recherche

Aucune animation sur l'apparition des résultats au-delà d'un fondu très bref (catégorie Micro) — la vitesse perçue de la recherche ([[PRODUCT_RULES.md]] §4) prime sur toute démonstration visuelle ; une animation trop marquée sur les résultats de recherche donnerait l'impression que la recherche est plus lente qu'elle ne l'est réellement.

## 12. Accessibilité du mouvement

`prefers-reduced-motion` remplace systématiquement les animations de transformation (translation, échelle, rotation) par de simples fondus courts (catégorie Micro), jamais par une absence totale de transition qui rendrait un changement d'état imperceptible ([[DESIGN_SYSTEM_ARCHITECTURE.md]] §5). Le réglage « niveau d'animation » des paramètres ([[SETTINGS_SPECIFICATION.md]] §4) offre un contrôle plus fin (complet/réduit/off) au-dessus de ce comportement de base.

---

## 13. Règles de synthèse

1. Aucune animation sur le chemin critique ne dépasse 250 ms.
2. Entrée et sortie utilisent toujours des courbes asymétriques, jamais la même courbe inversée.
3. La continuité spatiale prime sur l'effet visuel — un élément anime toujours depuis/vers sa position logique.
4. La performance (60 FPS, [[PERFORMANCE_BUDGET.md]] §3) prime toujours sur l'esthétique en cas de conflit — une animation désactivée est préférable à une animation saccadée.
5. `prefers-reduced-motion` n'élimine jamais totalement le retour visuel d'un changement d'état, seulement son mouvement.

---

## 14. Checklist de validation

- [ ] Chaque catégorie de durée (§1) a une justification de choix de plage, pas une valeur arbitraire isolée.
- [ ] Chaque contexte d'animation demandé dans le cadrage (page, lecteur, pochette, liste, modale, sync, téléchargement, recherche) est couvert.
- [ ] Aucune règle ne contredit le budget de performance déjà engagé ([[PERFORMANCE_BUDGET.md]] §3).

---

## 15. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 3) | Motion Designer / Principal Interaction Designer |

# MOTION_GUIDELINES.md — Philosophie d'animation (Phase 1, volume 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.4.0
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

## 12bis. Personnalité de mouvement (ajout Phase 2 volume 2)

> Section ajoutée plutôt que de créer un `MOTION_BRANDING.md` séparé — la personnalité de marque du mouvement est une extension directe des règles déjà posées ci-dessus, jamais un second système.

Le mouvement de Melodia est **posé et intentionnel**, jamais rapide au point de paraître nerveux ni lent au point de paraître hésitant — cohérent avec l'archétype du Sage discret ([[PERSONALITY.md]] §1). Deux techniques de transition, en plus des catégories déjà définies (§1-11), complètent le vocabulaire de mouvement :

- **Shared Element Transition** : l'élément cliqué (pochette, carte) est le même objet visuel qui se retransforme vers son état suivant, jamais deux éléments distincts qui s'échangent ([[UX_PRINCIPLES.md]] §2 déjà l'exige côté produit — ceci en est la traduction technique de mouvement). Utilisé pour toute navigation vers une page de détail (§4 déjà défini) et pour les transitions du lecteur (§5).
- **Hero Animation** : variante de la Shared Element Transition réservée à un seul contexte — l'ouverture du Fullscreen Player depuis n'importe quelle forme du lecteur ([[PLAYER_SPECIFICATION.md]] §2), où la pochette grossit et devient le sujet dominant de l'écran. Réservée à ce contexte unique pour rester un moment reconnaissable, jamais généralisée à d'autres écrans.
- **Ripple** : non retenu comme retour tactile générique — un ripple sur chaque pression ajouterait un mouvement sur des centaines d'interactions par session sans bénéfice fonctionnel, contraire à [[UX_PRINCIPLES.md]] §2. Le retour « pressed » reste la micro-interaction d'échelle déjà définie ([[INTERACTION_GUIDELINES.md]] §4).
- **Skeleton (squelette de chargement)** : respecte la structure finale du composant (déjà spécifié en [[SCREEN_SPECIFICATIONS.md]] §7), pulsation douce et lente (catégorie Ambiance, §1) — jamais un shimmer rapide qui attirerait l'œil plus que le contenu réel une fois chargé.

## 12ter. Rythme, rebond, élasticité, chorégraphie d'opacité et priorités (ajout Phase 4)

> Section ajoutée plutôt que de créer un `MOTION_SYSTEM.md` séparé — le cadrage de la Premium Experience Bible demande un « langage de mouvement » complet (durées, courbes, rythme, rebond, élasticité, opacité, priorités), mais les durées et courbes existent déjà (§1-2) : dupliquer l'ensemble aurait recréé le même système sous un autre nom. Cette section ajoute uniquement les propriétés réellement absentes. Voir [[PREMIUM_EXPERIENCE_BIBLE.md]] pour la lecture organisée en catégories micro/standard/navigation/immersive de l'ensemble §1-12ter.

### Rythme

Le rythme n'est pas une propriété d'une seule animation mais la relation temporelle entre plusieurs animations déclenchées ensemble. Règle : un événement qui déclenche plusieurs changements visuels (ex. ouverture du Fullscreen Player : pochette + palette + contrôles + paroles) anime ses éléments avec un léger décalage progressif (`stagger`, 20-40 ms entre chaque élément) plutôt que tous simultanément — un mouvement parfaitement synchronisé sur plusieurs éléments est perçu comme mécanique, un léger décalage est perçu comme organique. Le décalage reste toujours inférieur à la durée totale de la catégorie concernée (§1), jamais assez long pour donner une impression de lenteur.

### Rebond et élasticité

Au-delà de la courbe `emphasis` déjà définie (§2, léger dépassement puis retour), deux usages précis et volontairement rares :
- **Rebond (overshoot prononcé)** : réservé à une seule confirmation, l'ajout aux favoris (cohérent avec [[INTERACTION_GUIDELINES.md]] §4) — l'icône dépasse légèrement sa taille finale avant de s'y stabiliser. Jamais utilisé sur une action répétée à haute fréquence (lecture/pause), où l'effet deviendrait fatigant plutôt qu'agréable.
- **Élasticité (résistance progressive)** : réservée aux gestes de glissement avec limite physique (ex. tirer l'Expanded Player au-delà de sa position de repos avant relâchement) — la résistance augmente à mesure que le geste s'éloigne de la position naturelle, puis l'élément revient avec la courbe `standard` (§2) au relâchement. Communique une limite physique sans message d'erreur explicite.

### Chorégraphie d'opacité

L'opacité ne varie jamais seule sur un élément qui change aussi de position ou de taille — elle est toujours couplée à une transformation géométrique (translation/échelle), jamais un simple fondu isolé sur un élément qui bouge, ce qui produirait une sensation de flottement plutôt que de déplacement. Exception unique : les éléments purement informatifs sans mouvement associé (toasts déjà en place, indicateurs de statut) où un fondu seul reste approprié.

### Priorités et orchestration

Quand plusieurs animations entrent en conflit pour les mêmes ressources (CPU/GPU) au même instant (ex. changement de piste pendant un défilement rapide de liste), l'ordre de priorité est : 1) réactivité de l'interaction en cours (défilement, glissement actif) — jamais interrompue ; 2) état du lecteur (barre de progression, transition de piste) ; 3) animations d'ambiance (palette dynamique, pulsation de synchronisation) — les premières à être simplifiées ou différées en cas de contention. Cohérent avec la règle de synthèse déjà posée (§13, règle 4) : la performance prime toujours sur l'esthétique en cas de conflit.

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
| 0.2.0 | 2026-08-03 | Phase 2 volume 2 : ajout §12bis (personnalité de mouvement, shared element/hero/ripple/skeleton) plutôt que MOTION_BRANDING.md en doublon | Motion Art Director |
| 0.3.0 | 2026-08-03 | Phase 4 : ajout §12ter (rythme, rebond, élasticité, chorégraphie d'opacité, priorités) plutôt que MOTION_SYSTEM.md en doublon | Principal Motion Designer |
| 0.4.0 | 2026-08-05 | TASK-002 : correction du numéro de version en en-tête, resté désynchronisé (« 0.1.0 ») depuis l'amendement 0.2.0 ; correction de la citation interne §12ter (« §13.4 ») en « §13, règle 4 » — §13 est une liste à 5 règles non numérotées en sous-titres, jamais une section §13.4 réelle, incohérence trouvée lors de TASK-001 (citations externes) puis TASK-002 (revue manuelle, citation interne) | Staff Technical Lead |

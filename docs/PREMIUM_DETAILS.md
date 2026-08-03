# PREMIUM_DETAILS.md — 110 détails premium (Phase 4)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Product Designer / Experience Design Director
> **Documents liés** : tous les documents de la Premium Experience Bible — voir [[PREMIUM_EXPERIENCE_BIBLE.md]] §1

> **Cadrage** : chaque détail ci-dessous est un choix concret, pas une règle générale déjà couverte ailleurs — quand un détail relève d'une règle déjà définie (motion, couleur, interaction), il y renvoie plutôt que de la répéter. Un détail sans justification n'a pas sa place ici, cohérent avec la philosophie de [[PREMIUM_EXPERIENCE_BIBLE.md]] §1 : rien n'est ajouté par accumulation gratuite.

---

## 1. Navigation et mémoire de contexte

1. **Mémorisation de la position de défilement** par vue, restaurée exactement au retour — évite de perdre son contexte de recherche visuelle ([[INTERACTION_LIBRARY.md]] §8).
2. **Mémorisation de l'onglet actif** dans une vue à onglets (ex. Bibliothèque : Titres/Albums/Artistes) entre deux visites de la même session.
3. **Mémorisation du dernier filtre/tri appliqué** par section, jamais réinitialisé silencieusement à la valeur par défaut.
4. **Historique de navigation accessible en un raccourci** (`Alt/Cmd + ←`), cohérent avec la convention navigateur, jamais réinventée.
5. **Fil d'Ariane discret** sur les pages profondes (Artiste → Album → Piste), permettant de remonter sans repasser par chaque étape.
6. **Aucune perte de file d'attente** lors d'une navigation, même longue — la file reste identique quel que soit l'écran consulté ([[PRODUCT_RULES.md]] §5).
7. **Reprise automatique à la position exacte** d'une piste partiellement écoutée après fermeture/réouverture de l'application.

## 2. Pochettes et couleur

8. **Transition progressive de la couleur d'accent** lors du changement d'album — jamais un saut de teinte abrupt ([[DYNAMIC_THEME_GUIDE.md]] §4).
9. **Cache de palette extraite par pochette**, jamais recalculée à chaque affichage — coût CPU maîtrisé ([[PLAYER_SPECIFICATION.md]] §4).
10. **Illustration générique cohérente avec le thème actif** pour toute piste sans pochette, jamais un carré gris neutre déconnecté du reste de l'interface.
11. **Chargement progressif des pochettes en grille** (floue → nette) plutôt qu'un spinner par élément, pour rester silencieux à grande échelle ([[MOTION_GUIDELINES.md]] §6).
12. **Adaptation automatique de la luminosité des overlays** (scrim, texte superposé) selon la luminosité moyenne de la pochette sous-jacente, garantissant la lisibilité sans intervention manuelle.
13. **Rotation lente de la pochette en mode Vinyle**, ralentissant progressivement à la pause plutôt qu'un arrêt net ([[PLAYER_EXPERIENCE.md]] §5).
14. **Halo de lumière ambiante positionné exactement à l'emplacement de la pochette** dans le Fullscreen Player, jamais un dégradé générique sans lien visuel avec sa source ([[DYNAMIC_THEME_GUIDE.md]] §2).

## 3. Lecteur

15. **Barre de progression avec prévisualisation** de la position cible pendant le glissement, avant relâchement ([[PLAYER_SPECIFICATION.md]] §10).
16. **« Précédent » relance le début si joué depuis plus de 3 secondes**, convention du marché respectée plutôt que réinventée ([[PLAYER_SPECIFICATION.md]] §5).
17. **Désaturation légère de la pochette en pause**, seul signal visuel nécessaire, sans texte superposé ([[PLAYER_SPECIFICATION.md]] §3).
18. **Mini Player jamais totalement invisible** une fois qu'une lecture a commencé, quelle que soit la navigation en cours ([[PLAYER_SPECIFICATION.md]] §2).
19. **UI optimiste sur lecture/pause** : le contrôle change d'état avant même la confirmation audio réelle ([[PLAYER_SPECIFICATION.md]] §10).
20. **Lissage audio imperceptible sur ajustement de volume**, strictement acoustique, jamais un délai visuel sur le curseur ([[PLAYER_EXPERIENCE.md]] §8).
21. **Défilement automatique des paroles interrompu dès qu'on scrolle manuellement**, repris après quelques secondes d'inactivité ([[PLAYER_EXPERIENCE.md]] §10).
22. **File d'attente avec la piste courante visuellement ancrée**, sans clignotement répétitif ([[PLAYER_EXPERIENCE.md]] §9).

## 4. Listes, cartes et défilement

23. **Insertion d'un élément dans une liste déjà affichée** avec léger décalage des voisins, jamais un re-rendu complet ([[ANIMATION_LIBRARY.md]] §5).
24. **Animations de cascade désactivées automatiquement au-delà d'une vitesse de défilement donnée** — la fluidité prime sur la démonstration ([[MOTION_GUIDELINES.md]] §7).
25. **Ouverture fluide des cartes** via Shared Element Navigate, jamais une coupure suivie d'un nouvel écran sans rapport visuel ([[ANIMATION_LIBRARY.md]] §2).
26. **Effet subtil au survol des pochettes** (légère élévation, jamais un zoom agressif) signalant l'interactivité sans excès ([[INTERACTION_GUIDELINES.md]] §4).
27. **Glisser-déposer avec retour visuel continu**, jamais un ajout qui n'apparaît qu'au relâchement sans anticipation ([[INTERACTION_LIBRARY.md]] §2-3).
28. **Curseur contextuel** qui change de forme selon l'élément survolé, gratuit et informatif ([[INTERACTION_LIBRARY.md]] §10).

## 5. Chargement et perception de performance

29. **Squelettes fidèles à la structure finale**, jamais une forme générique qui provoquerait un réajustement de layout ([[SKELETON_SYSTEM.md]] §1).
30. **Squelette affiché uniquement au-delà d'un seuil de latence perceptible** (~300 ms) — en dessous, rien ne s'affiche pour éviter un clignotement.
31. **Apparition progressive des informations pendant la synchronisation** (nombre d'éléments traités qui s'incrémente) plutôt qu'un indicateur muet.
32. **Aucun jugement visuel prématuré pendant un processus en cours** (sync, import) — la couleur d'état n'apparaît qu'au résultat final ([[VISUAL_FEEDBACK_GUIDE.md]] §3).
33. **Préchargement discret des pochettes de la file suivante**, jamais visible pour l'utilisateur mais réduisant la latence perçue au changement de piste.
34. **Recherche sans indicateur de chargement visible** pour une recherche locale — la vitesse perçue prime ([[MOTION_GUIDELINES.md]] §11).

## 6. Micro-interactions et retours

35. **Rebond (overshoot) réservé exclusivement à l'ajout aux favoris**, jamais généralisé à d'autres confirmations ([[ANIMATION_LIBRARY.md]] §9).
36. **Élasticité avec résistance progressive** sur les gestes de glissement au-delà de leur limite naturelle ([[MOTION_GUIDELINES.md]] §12ter).
37. **Décalage de rythme (stagger) de 20-40 ms** entre éléments d'un même événement déclencheur, pour un mouvement perçu comme organique plutôt que mécanique.
38. **Aucune notification globale pour une action déjà anticipée** (favoris, ajout playlist) — signal local uniquement ([[INTERACTION_GUIDELINES.md]] §4).
39. **Geste de swipe révélant l'action avant de la déclencher**, jamais un geste accidentel irréversible ([[INTERACTION_LIBRARY.md]] §9).
40. **Jamais plus d'une notification transitoire visible simultanément** — file d'attente séquentielle ([[ERROR_EXPERIENCE.md]] §5).

## 7. Thèmes et personnalisation

41. **Changement de thème instantané, sans rechargement ni animation longue** ([[THEMES_GUIDE.md]] §9, [[ANIMATION_LIBRARY.md]] §12).
42. **Repli automatique et imperceptible du thème dynamique** en cas d'échec de contraste, jamais un texte illisible affiché même brièvement ([[DYNAMIC_THEME_GUIDE.md]] §4).
43. **Le thème dynamique n'affecte jamais la géométrie ou le rythme d'animation**, seulement la couleur ([[DESIGN_TOKENS.md]] §5).
44. **Mode Focus qui masque des sections sans jamais en supprimer l'accès** réel ([[THEMES_GUIDE.md]] §5).
45. **Mode Nuit avec température de couleur plus chaude**, pas seulement un thème sombre standard renommé ([[THEMES_GUIDE.md]] §6).

## 8. Recherche

46. **Frappe sans latence perceptible**, aucune animation sur le champ lui-même ([[INTERACTION_LIBRARY.md]] §7).
47. **Résultats mis à jour avec un fondu très bref**, jamais une animation démonstrative qui ralentirait la perception de vitesse ([[MOTION_GUIDELINES.md]] §11).
48. **Aucun squelette affiché avant toute saisie** — état vide initial distinct d'un état de chargement ([[SKELETON_SYSTEM.md]] §4).

## 9. Téléchargements et synchronisation

49. **Barre de progression locale à l'élément concerné**, jamais un indicateur global peu informatif ([[MOTION_GUIDELINES.md]] §10).
50. **Transition de la barre vers le succès puis disparition au profit de l'icône hors-ligne permanente**, jamais une barre à 100% qui reste affichée ([[VISUAL_FEEDBACK_GUIDE.md]] §4).
51. **Indicateur de synchronisation continu et discret** (pulsation lente), jamais une animation qui capte l'attention ([[MOTION_GUIDELINES.md]] §9).
52. **Reprise automatique d'un téléchargement interrompu par le réseau**, sans action manuelle requise ([[NOTIFICATION_LIBRARY.md]] §3).

## 10. Accessibilité et inclusivité

53. **Alternative `prefers-reduced-motion` qui remplace le mouvement par un fondu court**, jamais une absence totale de transition ([[MOTION_GUIDELINES.md]] §12).
54. **Chaque son a un équivalent visuel/annoncé**, jamais un canal exclusif ([[SOUND_DESIGN_GUIDE.md]] §7).
55. **Aucune information portée par la couleur seule**, systématiquement doublée d'une icône ou d'un libellé ([[ACCESSIBILITY_GUIDE.md]] §3bis).
56. **Focus restitué précisément à l'élément d'origine** à la fermeture d'une modale, jamais perdu ([[ACCESSIBILITY_GUIDE.md]] §1).
57. **Annonce proportionnée du contenu dynamique** (nombre de résultats une fois, jamais élément par élément) ([[ACCESSIBILITY_GUIDE.md]] §2).

## 11. Sonore

58. **Sons d'interface volontairement rares**, jamais un habillage sonore complet par principe assumé ([[SOUND_DESIGN_GUIDE.md]] §1).
59. **Aucun son ne peut jamais couvrir la musique en cours de lecture**, volume relatif toujours inférieur ([[SOUND_DESIGN_GUIDE.md]] §6).
60. **Tout son désactivable en un seul réglage global**, sans exception y compris pour l'alerte de sécurité ([[SOUND_DESIGN_GUIDE.md]] §5).

## 12. Détails contextuels et temporels

61. **Hiérarchie de vitesse d'apparition selon l'origine de l'action** — un résultat d'action directe apparaît plus vite qu'un événement de fond ([[MOTION_GUIDELINES.md]] §3).
62. **Aucune animation perpétuelle sans fonction** sur l'arrière-plan dynamique pendant une écoute longue ([[DYNAMIC_THEME_GUIDE.md]] §4).
63. **Reconnaissance de l'heure d'écoute** pour suggérer implicitement (jamais imposer) le Mode Nuit, sans notification intrusive.
64. **Aucun délai artificiel ajouté à un squelette** pour « laisser le temps de le voir » — retiré dès que le contenu réel est prêt ([[SKELETON_SYSTEM.md]] §1).

## 13. Paramètres et contrôle utilisateur

65. **Paramètres toujours affichés instantanément**, aucun squelette car les préférences sont déjà connues localement ([[SKELETON_SYSTEM.md]] §8).
66. **Réglage de niveau d'animation à trois positions** (complet/réduit/off) au-dessus du comportement système de base ([[ACCESSIBILITY_GUIDE.md]] §4).
67. **Tous les raccourcis clavier reconfigurables**, sauf les attentes d'accessibilité universelles (`Tab`) ([[INTERACTION_GUIDELINES.md]] §1).

## 14. Statistiques et Wrapped

68. **Squelette de graphique en forme abstraite non chiffrée**, jamais de fausses données qui ressembleraient à de vraies valeurs ([[SKELETON_SYSTEM.md]] §5).
69. **Export de données accessible directement depuis le graphique concerné**, sans détour par un menu séparé.

## 15. Erreurs et états vides

70. **Erreur de lecture jamais bloquante** : passage automatique à la piste suivante après un court délai ([[PLAYER_SPECIFICATION.md]] §3).
71. **Mouvement de type « shake » réservé exclusivement aux erreurs de formulaire**, jamais utilisé sur une erreur réseau déjà gérée automatiquement ([[VISUAL_FEEDBACK_GUIDE.md]] §2).
72. **État vide jamais affiché instantanément à la place du contenu attendu** — fondu discret plutôt qu'un remplacement brutal ([[EMPTY_STATES_GUIDE.md]] §3).
73. **Illustration d'état vide qui renforce le message sans jamais le remplacer** ([[EMPTY_STATES_GUIDE.md]] §1).

## 16. Cohérence transverse

74. **Une seule couleur d'accent visible par écran**, l'accent secondaire ne se combine jamais avec l'accent principal ([[COLOR_SYSTEM.md]] §7).
75. **Échelle de z-index fermée et non extensible sans ADR**, aucune superposition incohérente possible ([[DESIGN_TOKENS.md]] §3).
76. **Ombre, fond et z-index d'une surface varient toujours ensemble**, jamais indépendamment ([[SURFACE_SYSTEM.md]] §2).
77. **Rayon des coins croissant avec l'élévation perçue** — une surface qui flotte davantage se détache aussi par une géométrie plus douce ([[SURFACE_SYSTEM.md]] §7).
78. **Le flou reste réservé aux surfaces temporaires**, jamais appliqué à la navigation permanente ([[SURFACE_SYSTEM.md]] §5).
79. **Distinction visuelle entre couleur de succès et couleur de marque** lors de la création d'un objet — un nouvel objet n'est pas un « succès », c'est une possession ([[VISUAL_FEEDBACK_GUIDE.md]] §7).
80. **Aucune modale utilisée pour une simple information** — réservée strictement aux décisions irréversibles ([[ERROR_EXPERIENCE.md]] §3).

## 17. Détails de continuité spatiale

81. **L'élément cliqué se retrouve visuellement dans la vue suivante** avant de s'animer vers sa position finale, jamais une coupure ([[MOTION_GUIDELINES.md]] §4).
82. **Fermeture d'une modale toujours animée**, sauf `Échap` où la réactivité prime explicitement sur l'esthétique ([[MOTION_GUIDELINES.md]] §8).
83. **Navigation arrière = inverse chorégraphique exact de l'aller**, jamais un simple rejeu inversé avec la même courbe ([[TRANSITION_GUIDE.md]] §7).
84. **Geste de retour qui suit le doigt en temps réel** avant relâchement, jamais figé sur une position ignorant le geste en cours ([[TRANSITION_GUIDE.md]] §7).
85. **Élément de navigation actif qui change d'état avant la fin de la transition de contenu** — le retour est immédiat même si le contenu prend plus de temps ([[TRANSITION_GUIDE.md]] §8).

## 18. Détails de confiance et de transparence

86. **Distinction verbale et visuelle nette entre « désactiver » et « supprimer »**, jamais euphémisée ([[VOCABULARY.md]] §4, [[DIALOG_LIBRARY.md]] §6-7).
87. **Aucune action destructive sans dialogue de confirmation explicite nommant précisément l'objet concerné** ([[DIALOG_LIBRARY.md]] §1).
88. **Aucune animation plus dramatique pour une suppression définitive qu'un retrait réversible** — c'est la présence du dialogue, pas l'animation, qui signale la gravité ([[INTERACTION_LIBRARY.md]] §4-5).

## 19. Détails de robustesse perçue

89. **Dernière action gagne** lors de clics rapides et répétés sur changement de piste, aucune pile de changements différés surprenante ([[PLAYER_SPECIFICATION.md]] §11).
90. **Barre de progression en mode indéterminé** plutôt qu'une estimation fausse affichée comme certaine, pour une piste sans métadonnées de durée exacte ([[PLAYER_SPECIFICATION.md]] §11).
91. **Aucun blocage de l'interface en mise en tampon réseau** — indicateur non bloquant uniquement ([[PLAYER_SPECIFICATION.md]] §3).
92. **Lecture identique en ligne ou hors ligne pour une piste déjà en cache**, aucune différence de traitement perceptible ([[PLAYER_SPECIFICATION.md]] §12).

## 20. Détails d'orchestration

93. **Priorité systématique donnée à l'interaction en cours** (défilement, glissement actif) en cas de contention de ressources visuelles ([[MOTION_GUIDELINES.md]] §12ter).
94. **Opacité jamais utilisée seule sur un élément qui se déplace aussi** — toujours couplée à une transformation géométrique ([[MOTION_GUIDELINES.md]] §12ter).
95. **Une seule temporalité partagée pour toutes les animations du lecteur**, jamais de chevauchement incohérent entre elles ([[PLAYER_SPECIFICATION.md]] §9).

## 21. Détails additionnels de raffinement

96. **Icône de tri toujours accompagnée d'un état explicite** (« Trier par : Titre »), jamais un menu qui force l'ouverture pour connaître l'état actif ([[MICROCOPY_LIBRARY.md]] §7).
97. **Titre tronqué révèle son texte complet au survol**, sans reformulation ([[TOOLTIP_LIBRARY.md]] §2).
98. **Placeholder d'un champ toujours un exemple concret**, jamais une répétition du label adjacent ([[MICROCOPY_LIBRARY.md]] §5).
99. **Un badge reste toujours un mot ou un chiffre seul** — au-delà, c'est un label, pas un badge ([[MICROCOPY_LIBRARY.md]] §11).
100. **Aucune capitalisation intégrale utilisée comme substitut d'emphase**, nulle part dans l'interface ([[STYLE_GUIDE.md]] §2).
101. **Aucun emoji dans l'interface produit**, cohérent avec l'archétype du Sage discret ([[STYLE_GUIDE.md]] §3).
102. **Curseur de redimensionnement distinct sur une bordure de panneau ajustable**, jamais un curseur générique unique ([[INTERACTION_LIBRARY.md]] §10).
103. **Fin de glissement invalide qui ramène l'élément à son origine avec la courbe de sortie**, jamais une simple disparition ambiguë ([[INTERACTION_LIBRARY.md]] §3).
104. **Délai d'apparition du tooltip au survol (~400-600 ms)**, mais immédiat au focus clavier où l'intention est déjà explicite ([[ANIMATION_LIBRARY.md]] §13).
105. **Silhouette de squelette dimensionnée exactement au nombre d'éléments visibles du viewport**, jamais de silhouettes hors-écran inutiles ([[SKELETON_SYSTEM.md]] §2).
106. **Aucun texte « Chargement... » superposé à un squelette** — la forme communique déjà l'attente ([[SKELETON_SYSTEM.md]] §9).
107. **Halo de lumière ambiante qui ne touche jamais les contrôles ou le texte** du lecteur, contraste toujours garanti indépendamment ([[DYNAMIC_THEME_GUIDE.md]] §2).
108. **Dégradé d'arrière-plan limité à deux couleurs dominantes maximum**, au-delà le résultat devient visuellement bruyant ([[DYNAMIC_THEME_GUIDE.md]] §1).
109. **Angle de dégradé constant à travers toute l'application**, jamais variable d'une pochette à l'autre ([[DYNAMIC_THEME_GUIDE.md]] §1).
110. **Immersion qui ne masque jamais les contrôles essentiels au-delà d'un délai raisonnable** — ils réapparaissent au moindre mouvement ([[IMMERSION_GUIDE.md]] §9).

---

## 22. Checklist de validation

- [ ] Au moins 100 détails sont listés, chacun avec une justification propre (pas seulement une description).
- [ ] Aucun détail ne contredit une règle déjà actée ailleurs — chaque renvoi croisé a été vérifié.
- [ ] Aucun détail n'introduit une nouvelle règle non couverte par un document dédié — ce document reste un inventaire, pas une nouvelle source de vérité.

---

## 23. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document, 110 détails (Phase 4) | Product Designer / Experience Design Director |

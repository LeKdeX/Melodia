# VISUAL_DIRECTION.md — Orientation visuelle (Phase 2, volume 1)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Art Director / Visual Identity Designer
> **Documents liés** : [[PERSONALITY.md]], [[DESIGN_SYSTEM_ARCHITECTURE.md]], [[COMPETITIVE_BRAND_ANALYSIS.md]]

> **Ce que ce document est, et n'est pas** : ce sont des **orientations directionnelles** (style, hiérarchie, lumière, profondeur) — jamais des valeurs finales (hex de couleur, nom de police, dessin de logo). Cohérent avec la décision actée dans `CLAUDE.md` : une identité visuelle littérale ne doit jamais être choisie par extrapolation seule, elle nécessite un retour humain explicite pour ne pas violer la règle « aucune décision arbitraire ». Chaque section ci-dessous se termine par ce qui reste **à valider avec l'utilisateur** avant toute implémentation dans [[DESIGN_SYSTEM_ARCHITECTURE.md]].

---

## 1. Style général

Direction recommandée : **minimalisme chaleureux**, pas minimalisme froid. La différence : un minimalisme froid retire jusqu'à l'émotion (esthétique purement fonctionnelle, ex. certains outils B2B) ; un minimalisme chaleureux retire le superflu mais conserve la texture humaine (grain subtil, ombres douces plutôt que des arêtes dures) — cohérent avec l'archétype du Sage discret ([[PERSONALITY.md]] §1), compétent sans froideur.

**À valider** : le degré exact de chaleur (à quel point s'éloigner du minimalisme strict façon Linear/Raycast vers quelque chose de plus tactile) est une question de goût qui mérite un arbitrage humain, pas une valeur que ce document peut fixer seul.

## 2. Minimalisme

Le contenu (pochettes, typographie du titre/artiste) est toujours l'élément dominant de toute composition — l'interface elle-même (chrome, contrôles) reste en retrait visuel constant. Aucun ornement qui ne sert pas la lisibilité ou la hiérarchie (cohérent avec [[UX_PRINCIPLES.md]] §3, aucune interface inutile).

## 3. Hiérarchie visuelle

Trois niveaux, jamais plus dans une même vue :
1. **Contenu en cours d'attention** (pochette en lecture, résultat sélectionné) — le plus grand contraste, la plus grande taille.
2. **Contenu navigable** (listes, grilles) — contraste moyen.
3. **Chrome d'interface** (navigation, contrôles secondaires) — contraste le plus faible tout en restant accessible (jamais en dessous du seuil WCAG, [[ACCESSIBILITY_GUIDE.md]] §3).

## 4. Utilisation des espaces

Généreuse mais jamais vide de sens — l'espace négatif sépare et hiérarchise (§3), il ne remplit pas un vide par défaut d'idée. Densité variable assumée : la vue « compacte » ([[LIBRARY_SPECIFICATION.md]] §1) réduit délibérément l'espace pour l'utilisateur qui privilégie la densité d'information, sans que ce soit perçu comme une version dégradée de l'expérience premium.

## 5. Lumière

Direction recommandée : **lumière diffuse plutôt que ponctuelle** — pas de fort éclairage dramatique façon interface de jeu vidéo, une lumière douce et homogène qui laisse la pochette et la palette dynamique ([[PLAYER_SPECIFICATION.md]] §4) être la principale source de variation chromatique de l'interface.

**À valider** : l'intensité relative du mode sombre par défaut ou non (beaucoup de références premium récentes — Linear, Arc, Raycast — proposent un mode sombre comme identité par défaut plutôt que comme option) est une décision de marque à trancher avec l'utilisateur, pas seulement une préférence technique de [[SETTINGS_SPECIFICATION.md]] §3.

## 6. Profondeur

Profondeur suggérée par la superposition et l'ombre douce (élévation subtile des éléments actifs : lecteur étendu, modales) plutôt que par un skeuomorphisme littéral (pas de textures de bois/cuir/vinyle qui imiteraient un objet physique) — une élégance contemporaine, pas une nostalgie décorative.

## 7. Textures et matières

Direction recommandée : surfaces lisses avec un grain de bruit très subtil en arrière-plan (évite l'aspect « plat numérique » froid sans tomber dans la décoration) — inspiré du traitement de matière de Nothing ([[COMPETITIVE_BRAND_ANALYSIS.md]]) sans en reprendre le vocabulaire visuel spécifique (transparence de boîtier, points visibles).

## 7bis. Comparaison directionnelle avec Plexamp et TIDAL (ajout Phase 2 volume 2)

> Ajouté ici plutôt que dans un `ART_DIRECTION.md` séparé — [[COMPETITIVE_BRAND_ANALYSIS.md]] a déjà comparé Apple/Nothing/Arc/Raycast/Linear/Spotify/Notion/Vercel sur l'identité de marque ; ces deux références musicales complètent la liste sur les dimensions concrètes de direction artistique (densité, contraste, lumière) que ce document traite.

| Dimension | Plexamp | TIDAL | Direction Melodia |
|---|---|---|---|
| Hiérarchie visuelle | Pochette et lecteur dominent tout, chrome minimal | Équilibrée, met en avant le badge de qualité audio autant que le contenu | Pochette dominante (§3), jamais de badge technique en concurrence visuelle directe |
| Densité | Faible — un contexte à la fois | Modérée | Faible par défaut, modérée disponible via la vue compacte ([[LIBRARY_SPECIFICATION.md]] §1) |
| Contrastes | Élevés, dramatiques sur le lecteur | Modérés | Élevés sur le contenu en cours d'attention uniquement (§3), jamais globalement dramatiques |
| Couleur | Entièrement pilotée par la pochette | Palette de marque fixe (noir/cyan) | Hybride : palette fixe pour le chrome, dynamique pour l'ambiance du lecteur seulement ([[COLOR_SYSTEM.md]] §6) |
| Typographie | Neutre, en retrait | Affirmée sur les éléments de marque (Hi-Fi, Master) | Neutre en retrait (§3), jamais un badge technique mis en avant typographiquement |
| Lumière | Sombre par défaut, dramatique | Neutre | Diffuse, pas dramatique (§5) — écart assumé avec Plexamp |
| Animations | Riches, très présentes sur le lecteur | Discrètes | Intentionnelles mais jamais aussi denses que Plexamp — cohérent avec [[MOTION_GUIDELINES.md]] §12bis (posé, jamais nerveux) |
| Matières | Aucune texture, tout digital plat | Aucune texture | Grain subtil (§7), différenciation délibérée des deux références |

**Ce qui est retenu sans être copié** : la domination du contenu sur le chrome (Plexamp) et la clarté de hiérarchie (TIDAL) — jamais le drame lumineux de Plexamp ni la mise en avant technique de TIDAL, qui contrediraient la sobriété déjà actée ([[PERSONALITY.md]] §7).

## 8. Ce que cette direction interdit explicitement

- Tout élément visuel qui rappellerait l'identité de Jellyfin (cohérent avec [[PROJECT_CHARTER.md]] §4, jamais perçu comme un client Jellyfin).
- Toute iconographie ou palette qui évoquerait directement une plateforme commerciale existante (éviter qu'un utilisateur associe visuellement Melodia à Spotify ou Apple Music par réflexe).
- Toute densité d'information visuelle façon Roon ([[COMPETITIVE_ANALYSIS.md]] §5) — la sophistication de Melodia est dans la justesse, pas dans la quantité de données affichées.

## 9. Ce qui reste explicitement hors de ce document

Palette de couleurs (valeurs hexadécimales), typographie (famille de police précise), logo, iconographie propriétaire dessinée — toutes ces décisions nécessitent un `BRAND_BIBLE.md` volume 2 ou un travail de design visuel direct avec retour humain itératif, jamais une extrapolation textuelle seule. Ce document prépare ce travail sans s'y substituer.

---

## 10. Checklist de validation

- [ ] Aucune valeur hexadécimale, nom de police ou description de logo n'apparaît dans ce document.
- [ ] Chaque orientation a une justification reliée à [[PERSONALITY.md]] ou [[POSITIONING.md]], pas une préférence esthétique isolée.
- [ ] Les points explicitement « à valider avec l'utilisateur » sont listés, pas tranchés silencieusement.

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 2, volume 1) | Art Director / Visual Identity Designer |
| 0.2.0 | 2026-08-03 | Phase 2 volume 2 : ajout §7bis (comparaison Plexamp/TIDAL par dimension) plutôt qu'ART_DIRECTION.md en doublon | Art Director |

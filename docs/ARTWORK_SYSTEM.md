# ARTWORK_SYSTEM.md — Système de traitement des pochettes (Phase 9)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / Frontend Architect
> **Documents liés** : [[DISPLAY_COMPONENTS.md]] §3-5, [[DYNAMIC_THEME_GUIDE.md]], [[COLOR_SYSTEM.md]] §6

> **Cadrage** : [[DISPLAY_COMPONENTS.md]] §3-5 a déjà nommé Artwork/Album Cover/Thumbnail en une ligne chacun. [[DYNAMIC_THEME_GUIDE.md]] a déjà défini l'extraction de couleur et le dégradé. Ce document est la couche manquante entre les deux : le traitement systématique de l'image elle-même (repli, chargement, effets) qui sert de matière première à l'extraction de couleur.

---

## 1. Repli (Fallback)

Toute pochette absente ou en échec de chargement affiche une illustration générique — jamais un carré vide ou une icône d'erreur générique du navigateur ([[CARD_SPECIFICATION.md]] §11, déjà acté). **Génération** : couleur de fond dérivée déterministiquement du nom (titre/artiste) par hash, jamais aléatoire (la même œuvre a toujours le même repli visuel, reproductible d'une session à l'autre) — cohérent avec le traitement déjà acté pour Genre Card ([[LIBRARY_COMPONENTS.md]]).

## 2. Chargement progressif

Trois étapes, jamais une apparition brutale : 1) espace réservé de même dimension exacte (jamais de réajustement de layout à l'arrivée de l'image) ; 2) si applicable, une version basse résolution/floue apparaît en premier si disponible en cache proche (préchargement, [[PREMIUM_DETAILS.md]] §33) ; 3) fondu vers la résolution complète une fois chargée (`entrance`, catégorie Standard, [[MOTION_GUIDELINES.md]] §6). Au-delà de 300ms sans image, repli sur Skeleton ([[SKELETON_SYSTEM.md]] §1) plutôt qu'un espace vide silencieux.

## 3. Flou (Blur)

Utilisé dans deux contextes distincts, jamais confondus : le flou de chargement progressif (§2, temporaire, disparaît à la résolution complète) et le flou d'ambiance du thème dynamique ([[DYNAMIC_THEME_GUIDE.md]] §3, permanent tant que la piste joue, appliqué à une copie de l'image utilisée comme arrière-plan, jamais à la pochette affichée au premier plan elle-même qui reste toujours nette).

## 4. Couleur dominante et extraction de palette

Voir [[DYNAMIC_THEME_GUIDE.md]] §1 et [[COLOR_SYSTEM.md]] §6 — non redécrites ici. Ce document précise uniquement la source : l'extraction utilise toujours la résolution la plus haute disponible de la pochette (jamais une miniature basse résolution, qui produirait une palette moins représentative des couleurs réelles de l'œuvre), calculée une fois et mise en cache ([[PERFORMANCE_GUIDE.md]] §6bis).

## 5. Ombre (Shadow)

L'Artwork en contexte Hero/Fullscreen porte une ombre douce dérivée de sa couleur dominante plutôt qu'une ombre neutre grise systématique ([[SURFACE_SYSTEM.md]] §4 pour la règle générale d'ombre douce et diffuse) — une pochette à dominante chaude projette une ombre légèrement chaude, jamais une ombre froide qui contredirait visuellement l'ambiance de la couleur dynamique déjà appliquée à l'arrière-plan.

## 6. Lueur (Glow)

Variante d'ombre inversée (lumière plutôt qu'assombrissement) réservée au Fullscreen Player et au mode cinématique ([[IMMERSION_GUIDE.md]] §8) — jamais utilisée dans une grille de bibliothèque, où l'effet deviendrait un bruit visuel répété sur des dizaines de pochettes simultanément visibles.

## 7. Thème adaptatif — synthèse

Ce document (repli, chargement, flou, ombre, glow) fournit la matière visuelle ; [[DYNAMIC_THEME_GUIDE.md]] orchestre comment elle se compose en thème d'ambiance ; [[COLOR_SYSTEM.md]] §6 garantit le contraste. Les trois documents forment une chaîne, jamais une redondance — chacun répond à une question différente sur la même pochette.

## 8. Cas limites

- **Pochette au ratio non carré** (rare, métadonnée source atypique) : recadrée au centre en carré pour l'affichage standard, jamais étirée ni déformée.
- **Pochette très basse résolution source** : affichée telle quelle sans upscaling artificiel qui la ferait paraître floue de façon trompeuse — préférée à un remplacement par le repli générique (§1), qui masquerait une pochette réelle bien qu'imparfaite.
- **Connexion lente** : le chargement progressif (§2) reste la stratégie, jamais un blocage de l'interface en attendant l'image.

---

## 9. Checklist de validation

- [ ] Le repli (§1) reste déterministe et reproductible, jamais aléatoire.
- [ ] Le flou de chargement et le flou d'ambiance restent explicitement distincts (§3).
- [ ] Aucune pochette n'est jamais étirée ou déformée (§8).

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 9) | Product Designer / Frontend Architect |

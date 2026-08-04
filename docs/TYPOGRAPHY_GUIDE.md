# TYPOGRAPHY_GUIDE.md — Système typographique (Phase 2, volume 2)

> **Statut** : document fondateur, vivant — **proposition v1, choix de police à valider visuellement avant implémentation**
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Typography Expert / Senior Visual Designer
> **Documents liés** : [[VISUAL_DIRECTION.md]], [[DESIGN_TOKENS.md]], [[ACCESSIBILITY_GUIDE.md]]

> **Avertissement d'honnêteté** : le choix d'une famille de police est en partie un jugement de goût, comme pour [[COLOR_SYSTEM.md]]. Ce qui suit est une comparaison argumentée avec une recommandation claire, pas une décision arrêtée — à valider visuellement (rendu réel, tailles réelles) avant intégration dans [[DESIGN_SYSTEM_ARCHITECTURE.md]].

---

## 1. Comparatif de familles modernes (police principale)

| Famille | Distinction | Lisibilité en petite taille | Support variable (graisse animable) | Couverture linguistique | Licence |
|---|---|---|---|---|---|
| Inter | Faible — la plus utilisée du marché SaaS actuel (Linear, GitHub, des centaines d'autres) | Excellente | Oui | Très large | Libre |
| General Sans | Bonne — moderne sans être générique, caractère propre sans excentricité | Excellente | Oui | Large | Libre (usage commercial) |
| Public Sans | Moyenne — solide mais conçue pour du contenu institutionnel, moins de personnalité | Excellente | Limité | Large | Libre |

**Recommandation : General Sans.** Inter est le choix le plus sûr mais le plus générique — l'utiliser reviendrait à hériter visuellement de l'identité de dizaines de produits SaaS, contraire à l'objectif d'être « immédiatement reconnaissable » (cadrage de cette phase) et à [[POSITIONING.md]] §3 (atteindre le niveau d'intentionnalité de Linear/Raycast, pas leur exécution littérale). General Sans offre une distinction suffisante sans sacrifier la lisibilité ni la neutralité nécessaire à un contenu aussi varié que des noms d'artistes internationaux.

## 2. Police secondaire (titres, moments de marque)

Même famille (General Sans) en graisse plus marquée (Semibold/Bold) plutôt qu'une seconde famille — cohérent avec [[BRAND_PRINCIPLES.md]] §7 (cohérence prioritaire) : une seconde famille typographique introduirait une variable de plus à maintenir cohérente sur des années pour un bénéfice marginal.

## 3. Police monospace (données techniques)

**Recommandation : JetBrains Mono.** Utilisée uniquement pour les données tabulaires techniques (durée de piste, bitrate/qualité audio dans [[PLAYER_SPECIFICATION.md]] §11, identifiants dans les paramètres développeur — [[SETTINGS_SPECIFICATION.md]] §10) — jamais dans le texte d'interface courant. Chiffres tabulaires alignés nativement, essentiel pour des colonnes de durée cohérentes dans les listes.

## 4. Échelle typographique

| Token | Taille | Usage |
|---|---|---|
| `display` | 32px | Titre d'album/artiste en en-tête ([[SCREEN_SPECIFICATIONS.md]] §3) |
| `heading-lg` | 24px | Titres de section |
| `heading-md` | 18px | Titres de carte, noms de playlist |
| `body-md` | 15px | Texte courant, listes |
| `body-sm` | 13px | Métadonnées secondaires (artiste sous le titre, durée) |
| `caption` | 11px | Labels, badges — jamais en dessous, seuil de lisibilité minimum ([[ACCESSIBILITY_GUIDE.md]] §9) |

## 4bis. Hiérarchie sémantique complète (ajout Phase 5)

> L'échelle §4 définit des tokens de *taille*. Cette section leur assigne un **rôle sémantique** nommé, pour qu'un composant déclare son intention (« ceci est un Titre ») plutôt qu'une taille brute — cohérent avec la convention de nommage des tokens ([[DESIGN_TOKENS.md]] §1, jamais de référence à une valeur brute).

| Rôle sémantique | Token de taille (§4) | Graisse (§5) | Usage |
|---|---|---|---|
| Display | `display` | Semibold | Titre d'album/artiste en en-tête, seul rôle à ce niveau par écran |
| Headline | `heading-lg` | Semibold | Titre de section principale (ex. « Découvertes de la semaine ») |
| Title | `heading-md` | Medium | Titre de carte, nom de playlist |
| Subtitle | `body-md` | Regular, couleur `text-secondary` | Sous-titre directement associé à un Title (artiste sous un album) |
| Body | `body-md` | Regular | Texte courant, listes |
| Caption | `caption` | Regular | Métadonnées tertiaires, légendes |
| Overline | `caption` | Medium, majuscules, tracking élargi (+0.04em) | Étiquette de catégorie au-dessus d'un titre (ex. « ALBUM » avant le nom) — seul contexte où une capitalisation intégrale est autorisée, réservé à ce rôle unique ([[STYLE_GUIDE.md]] §2 interdit la capitalisation ailleurs) |
| Code | Police monospace (§3), `body-sm` | Regular | Données tabulaires techniques uniquement |
| Button | `body-md` | Medium | Libellé de bouton — jamais Semibold, qui alourdirait visuellement une action répétée fréquemment |
| Label | `body-sm` | Medium | Label de champ, badge |

**Règle de composition** : Title et Subtitle apparaissent toujours ensemble ou pas du tout — un Subtitle sans Title n'a pas de sens sémantique et n'est jamais utilisé isolément.

## 5. Graisses

Trois graisses suffisent : `Regular` (400, texte courant), `Medium` (500, emphase légère — titre de liste), `Semibold` (600, titres et actions principales). Jamais de `Light` (contraste insuffisant à petite taille) ni de `Black` (trop lourd pour l'esprit « minimalisme chaleureux », [[VISUAL_DIRECTION.md]] §1).

## 6. Hauteur de ligne et espacement

- Texte courant : hauteur de ligne 1.5× la taille de police — lisibilité optimale sur des listes denses ([[LIBRARY_SPECIFICATION.md]]).
- Titres : 1.2× — resserré pour renforcer la hiérarchie sans nuire à la lisibilité.
- Espacement des lettres (tracking) : neutre par défaut, légèrement resserré (-0.01em) sur les tailles `display`/`heading-lg` uniquement, jamais sur le texte courant (un tracking resserré nuit à la lisibilité en dessous de 18px).

## 7. Responsive

L'échelle (§4) ne change pas de valeurs absolues entre desktop et mobile — seule la densité de mise en page change ([[RESPONSIVE_GUIDE.md]] §2), jamais la taille de police de base, pour garantir une lisibilité minimale constante quelle que soit la plateforme.

## 8. Lisibilité et accessibilité

- Contraste texte minimum conforme à [[ACCESSIBILITY_GUIDE.md]] §3 sur chaque combinaison texte/fond de [[COLOR_SYSTEM.md]].
- Le texte reste fonctionnel jusqu'à 200 % de zoom sans troncature ([[ACCESSIBILITY_GUIDE.md]] §9) — vérifié explicitement pour chaque taille de l'échelle (§4).

---

## 9. Checklist de validation

- [ ] La recommandation typographique est explicitement marquée v1, pas finale.
- [ ] Aucune taille de l'échelle ne descend sous le seuil de lisibilité minimum.
- [ ] La police monospace reste cantonnée aux données techniques, jamais utilisée dans un texte courant.
- [ ] Chaque rôle sémantique (§4bis) a un token de taille et une graisse assignés, aucun rôle laissé ambigu.

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 2, volume 2) — proposition v1 | Typography Expert / Senior Visual Designer |
| 0.2.0 | 2026-08-03 | Phase 5 : ajout §4bis (hiérarchie sémantique complète Display/Headline/Title/Subtitle/Body/Caption/Overline/Code/Button/Label) — au lieu de créer TYPOGRAPHY_SYSTEM.md en doublon | Typography Specialist |

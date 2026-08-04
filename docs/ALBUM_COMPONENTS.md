# ALBUM_COMPONENTS.md — Famille de composants Album (Phase 9)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / Principal Music Experience Designer
> **Documents liés** : [[CARD_SPECIFICATION.md]], [[LIBRARY_COMPONENTS.md]], [[LIBRARY_SPECIFICATION.md]]

> **Cadrage** : `Album Card` dérive de [[CARD_SPECIFICATION.md]] (déjà spécifié brièvement dans [[LIBRARY_COMPONENTS.md]] §Cartes individuelles) — non redécrite ici. Ce document approfondit tout ce qui restait un simple nom sans détail : les variantes de densité, la page Album complète (Hero à Footer).

---

## 1. Variantes de carte

| Variante | Densité | Usage |
|---|---|---|
| Compact Album Card | Title seul, pochette réduite | Grilles à très haute densité, résultats de recherche secondaires |
| Album Card (standard) | Title + Subtitle (artiste) | Grille de bibliothèque par défaut, [[LIBRARY_COMPONENTS.md]] §Album Card |
| Detailed Album Card | Title + Subtitle + méta (année, nombre de titres) | Vues où l'espace le permet (liste plutôt que grille dense) |

Les trois variantes dérivent intégralement de [[CARD_SPECIFICATION.md]] — seule la densité d'information affichée change, jamais l'anatomie de base (image + zone de texte).

## 2. Album Hero

En-tête de la page Album — instance du composant générique Hero ([[LAYOUT_COMPONENTS.md]]) : pochette grand format (jusqu'à `container-sm` de large sur desktop), dégradé d'arrière-plan dérivé de la pochette ([[DYNAMIC_THEME_GUIDE.md]], portée déjà limitée aux pages Album/Artiste), titre en rôle Display ([[TYPOGRAPHY_GUIDE.md]] §4bis).

## 3. Album Header (informations et actions groupées)

```
[Pochette]  Titre de l'album (Display)
            Artiste (Link) · Année · Nombre de titres · Durée totale
            [Lecture] [Lecture aléatoire] [⋮ Actions]
```

- **Album Information** : artiste (lien cliquable vers Artist Hero, [[ARTIST_COMPONENTS.md]]), année, genre, nombre de titres, durée totale — rôle Caption, jamais en compétition visuelle avec le titre.
- **Album Actions** : bouton Lecture (Primary, [[BUTTON_SPECIFICATION.md]]), Lecture aléatoire (Secondary), Menu Button (favoris, téléchargement, ajout à une playlist) — jamais plus de trois actions visibles directement, le reste dans le menu.
- **Album Statistics** (si historique actif, [[STATISTICS_SPECIFICATION.md]]) : nombre d'écoutes cumulées de l'album, affiché en Caption discrète sous les métadonnées — jamais mis en avant au point de rivaliser avec le titre, cohérent avec [[PRODUCT_VALUES.md]] §4 (jamais un outil de comparaison poussant à l'usage compulsif).

## 4. Corps — liste des titres

Liste de Track Row ([[TRACK_COMPONENTS.md]]), numérotées, groupées par disque si l'album en comporte plusieurs (en-tête de groupe rôle Overline, [[TYPOGRAPHY_GUIDE.md]] §4bis) — jamais une numérotation continue qui masquerait la structure en disques d'un album réel.

## 5. Album Footer

Informations éditoriales complémentaires (label, copyright, source des métadonnées Jellyfin) — rôle Caption, en fin de page, jamais dans le Header où elles alourdiraient la première impression.

## 6. Album Artwork — cas limites

Voir [[ARTWORK_SYSTEM.md]] pour le traitement complet (repli, chargement, flou) — non redécrit ici. Spécifique à l'Album Hero : la pochette reste toujours au ratio carré natif même en grand format, jamais recadrée ou étirée pour remplir un espace Hero plus large que haut.

## 7. Responsive

Mobile : Album Header passe en Stack vertical (pochette au-dessus des informations, [[COMPOSING_RULES.md]] §3), Actions restent en Inline horizontal sous les métadonnées. Desktop/Ultra-wide : Header en Inline horizontal complet (§3), largeur plafonnée à `container-lg` ([[LAYOUT_SYSTEM.md]] §8).

## 8. Accessibilité

`role="main"` sur le corps de la page ([[ACCESSIBILITY_GUIDE.md]] §6bis), lien direct vers l'artiste annoncé comme tel (jamais un texte cliquable sans contexte), liste de titres avec position/total annoncés ([[ACCESSIBILITY_GUIDE.md]] §2).

---

## 9. Checklist de validation

- [ ] Aucune anatomie de carte n'est redéfinie — les trois variantes (§1) dérivent explicitement de [[CARD_SPECIFICATION.md]].
- [ ] Album Statistics reste discret, jamais mis en avant de façon compulsive.
- [ ] Chaque zone de l'Album Header (§3) a une règle responsive explicite (§7).

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 9) | Product Designer / Principal Music Experience Designer |

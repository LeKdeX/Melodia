# ALBUM_SCREEN.md — Page Album (Phase 10)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / Principal Music Experience Designer
> **Documents liés** : [[SCREEN_SYSTEM.md]] §2, [[ALBUM_COMPONENTS.md]], [[TRACK_COMPONENTS.md]]

> **Cadrage** : [[ALBUM_COMPONENTS.md]] a déjà spécifié Hero/Header/Information/Actions/Statistics/Footer en détail — assemblés ici, sans redéfinition. Related Albums, Recommendations, Versions, Disc Selector et Credits n'avaient pas d'entrée dédiée ; ajoutés ici comme blocs finaux de l'écran.

---

## 1. Présentation

Objectif : présenter une œuvre complète et permettre sa lecture en un clic. Lien avec les autres écrans : accessible depuis toute Album Card (Bibliothèque, Recherche, Accueil), mène vers Artist Screen ([[ARTIST_COMPONENTS.md]] §Album Information) et Player Screens (lecture d'un titre).

## 2. Composition

```
[Album Hero — dégradé dynamique, [[ALBUM_COMPONENTS.md]] §2]
[Album Header — Information + Actions + Statistics, §3]
[Disc Selector — si album multi-disque, Tabs ou SegmentedButton par disque]
[Main — Track List (Track Row), §4]
[Credits — Footer éditorial étendu, voir §5 ci-dessous]
[Related Albums — Grid horizontale d'Album Card du même artiste/genre]
[Recommendations — Grid horizontale d'Album Card algorithmique, condition Découverte activée]
[Album Footer — mentions légales, §5 de ALBUM_COMPONENTS.md]
[Mini Player — persistant]
```

## 3. Disc Selector (nouveau)

Visible uniquement si l'album comporte plusieurs disques (métadonnée Jellyfin) — SegmentedButton si 2-4 disques, Tabs au-delà ([[NAVIGATION_COMPONENTS.md]] §Tabs, quand utiliser 2-6 vues). Change uniquement la portion de Track List affichée, jamais la position de lecture en cours si une piste d'un autre disque est en train de jouer.

## 4. Versions (nouveau)

Si plusieurs éditions de l'album existent dans la bibliothèque (Deluxe, Remaster) — Dropdown ([[FORM_COMPONENTS.md]]) au niveau du Header permettant de basculer entre éditions, jamais une duplication de la page Album pour chaque édition séparément.

## 5. Credits (nouveau)

Section dédiée (rôle Caption, [[TYPOGRAPHY_GUIDE.md]] §4bis) listant les crédits disponibles dans les métadonnées (compositeur, producteur, label) — masquée entièrement si absente, cohérent avec Album Footer ([[ALBUM_COMPONENTS.md]] §5) dont elle est une extension quand la donnée est plus riche.

## 6. États et cas limites propres à l'assemblage

- **Related Albums/Recommendations vides** : blocs masqués entièrement, jamais affichés vides ([[ARTIST_COMPONENTS.md]] §3, même règle déjà appliquée à la Discography).
- **Album à un seul disque** : Disc Selector totalement absent, jamais affiché avec une seule option inutile.
- **Aucune version alternative** : sélecteur de Versions absent.
- **Chargement** : Hero et Header en Skeleton pendant que Track List charge indépendamment — cohérent avec l'indépendance des blocs déjà actée pour l'Accueil ([[HOME_SCREEN.md]] §2).

## 7. Responsive

Voir [[RESPONSIVE_LAYOUTS.md]] et [[ALBUM_COMPONENTS.md]] §7 — non redécrit ici. Related Albums/Recommendations passent en défilement horizontal sur toutes les tailles d'écran (jamais une grille multi-lignes pour ces blocs secondaires, qui allongerait excessivement la page).

---

## 8. Checklist de validation

- [ ] Disc Selector, Versions et Credits sont chacun masqués correctement en l'absence de donnée pertinente (§6).
- [ ] Aucun composant Album déjà spécifié n'est redéfini ici.
- [ ] Related Albums et Recommendations restent des blocs secondaires, jamais dominants visuellement sur le Track List principal.

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 10) | Product Designer / Principal Music Experience Designer |

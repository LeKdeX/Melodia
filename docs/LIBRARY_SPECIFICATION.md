# LIBRARY_SPECIFICATION.md — Spécification de la bibliothèque (Phase 1, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Senior Product Manager / Music Experience Designer
> **Documents liés** : [[JELLYFIN_INTEGRATION.md]], [[DATA_LAYER.md]] §2, [[PERSONAS.md]]

> **Cadrage** : ce document couvre albums, artistes, morceaux, genres et favoris comme types de contenu de la bibliothèque — pas de document séparé pour chacun, pour éviter une fragmentation artificielle (cohérent avec [[DOCUMENTATION_GUIDE.md]] §4).

---

## 1. Vues de la bibliothèque

| Vue | Usage | Comportement |
|---|---|---|
| Grille | Parcours visuel par pochette (albums, artistes) | Vue par défaut pour tout contenu à forte identité visuelle |
| Liste | Parcours dense par métadonnées (morceaux) | Vue par défaut pour les morceaux, colonnes configurables |
| Compacte | Densité maximale, pour les grandes bibliothèques | Réduction du visuel au strict nécessaire, orientée efficacité (inspirée de MusicBee, [[COMPETITIVE_ANALYSIS.md]] §9, sans la lourdeur d'interface) |
| Immersive | Une pochette/un contexte à la fois, navigation gestuelle | Orientée découverte visuelle plutôt qu'efficacité |

Chaque section de la bibliothèque mémorise la vue préférée de l'utilisateur indépendamment des autres sections.

## 2. Sections principales

- **Albums** — voir §5.
- **Artistes** — voir §6.
- **Morceaux** — vue liste par défaut, tri par titre/artiste/album/date d'ajout/durée.
- **Genres** — regroupement automatique depuis les métadonnées Jellyfin, navigation par exploration.
- **Playlists** — voir [[PLAYLIST_SPECIFICATION.md]].
- **Favoris** — voir §7.
- **Ajouts récents** — derniers éléments synchronisés depuis Jellyfin, ordre chronologique.
- **Dernières écoutes** — historique de lecture, dépend de l'activation de l'historique local ([[STATISTICS_SPECIFICATION.md]]).
- **Les plus écoutés** — classement par nombre de lectures, même dépendance.
- **Épinglés** — sélection manuelle de l'utilisateur, toujours en tête de la navigation principale.
- **Collections** — regroupements manuels transverses aux albums/artistes (ex. « Live », « Reprises ») définis par l'utilisateur ou déduits de métadonnées si disponibles.

## 3. Bibliothèque intelligente

Vues dynamiques générées par règles (ex. « Albums ajoutés ce mois-ci et jamais écoutés », « Artistes avec plus de 5 albums non explorés ») — mécanisme partagé avec les playlists intelligentes ([[PLAYLIST_SPECIFICATION.md]] §3), appliqué ici à la navigation plutôt qu'à une liste de lecture.

## 4. Filtres et tri

- Filtres combinables : genre, année, format, qualité audio, favoris, téléchargés.
- Tri personnalisé par section, mémorisé par section (le tri des albums n'affecte pas le tri des morceaux).
- Réinitialisation des filtres accessible en un geste, jamais un enchaînement de désactivations manuelles.

## 5. Page album (premium)

- Palette dynamique extraite de la pochette ([[PLAYER_SPECIFICATION.md]] §4, même mécanisme).
- Informations enrichies : crédits, artistes invités, année, label, durée totale.
- Éditions/versions/rééditions regroupées visuellement si les métadonnées Jellyfin permettent de les distinguer — sinon traitées comme des albums distincts sans fausse fusion (jamais d'invention de relation non confirmée par la donnée source, cohérent avec la règle d'honnêteté).
- Albums similaires : suggestion basée sur artiste/genre commun, jamais un algorithme de recommandation externe.
- Navigation fluide vers l'artiste, chaque morceau, chaque piste jouable directement depuis la page.

## 6. Page artiste

- Biographie si disponible dans les métadonnées ou une source complémentaire (dépendance à documenter, non engagée comme certaine).
- Discographie complète, distinction albums/singles/participations/collaborations.
- Artistes similaires, chronologie de la discographie.
- Statistiques d'écoute liées à cet artiste si l'historique local est actif ([[STATISTICS_SPECIFICATION.md]]).

## 7. Favoris

- S'applique à albums, morceaux, artistes, genres, playlists, collections — un seul mécanisme transverse, pas une fonctionnalité distincte par type de contenu.
- Ajout/retrait en une action depuis n'importe quel contexte ([[PRODUCT_RULES.md]] §5).
- Synchronisé localement, recherchable et triable comme n'importe quelle autre section de bibliothèque.

## 8. États

Voir [[EMPTY_STATES.md]] pour tous les états vides (bibliothèque vide, favoris vides, section sans résultat après filtre). Voir [[ERROR_STATES.md]] pour les échecs de chargement d'image/métadonnée.

## 9. Cas limites

- Bibliothèque de 200 000+ titres : toutes les vues restent virtualisées ([[PERFORMANCE_BUDGET.md]] §3) — aucune vue de ce document ne fait exception.
- Métadonnées incomplètes ou incohérentes (titre manquant, artiste « Various Artists ») : affichage explicite d'un état « métadonnée manquante » plutôt qu'un champ vide silencieux.
- Pochette manquante : illustration générique cohérente sur toute l'application (même traitement qu'en [[PLAYER_SPECIFICATION.md]] §11).

---

## 10. Checklist de validation

- [ ] Aucune vue n'exclut la virtualisation à grande échelle.
- [ ] Favoris reste un mécanisme transverse unique, pas dupliqué par type de contenu.
- [ ] Chaque section a un état vide et un état d'erreur définis, pas seulement un état nominal.

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 2) | Senior Product Manager / Music Experience Designer |

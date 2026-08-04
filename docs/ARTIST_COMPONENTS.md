# ARTIST_COMPONENTS.md — Famille de composants Artiste (Phase 9)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / Principal Music Experience Designer
> **Documents liés** : [[CARD_SPECIFICATION.md]], [[LIBRARY_COMPONENTS.md]], [[ALBUM_COMPONENTS.md]]

> **Cadrage** : `Artist Card` dérive déjà de [[CARD_SPECIFICATION.md]] ([[LIBRARY_COMPONENTS.md]] §Cartes individuelles, image en cercle) — non redécrite ici. Ce document couvre la page Artiste, entièrement nouvelle à ce stade du projet.

---

## 1. Artist Hero

Instance de Hero ([[LAYOUT_COMPONENTS.md]]) — portrait de l'artiste en fond (dégradé dérivé via [[DYNAMIC_THEME_GUIDE.md]], portée déjà étendue à « Dynamic Artist », [[COLOR_SYSTEM.md]] §6), nom en rôle Display, actions principales (Lecture aléatoire de l'artiste, Suivre/S'abonner si [[FEATURE_ROADMAP.md]] l'engage — statut à vérifier avant implémentation, non tranché ici).

## 2. Artist Biography

Texte descriptif issu des métadonnées Jellyfin (si disponibles) — jamais généré ou complété artificiellement par Melodia si la donnée source est absente (cohérent avec la règle d'honnêteté). **Anatomie** : texte tronqué à 3-4 lignes avec action « Lire plus » (jamais un Dialog pour un simple texte long — expansion inline). **État vide** : section masquée entièrement si aucune biographie n'existe, jamais un espace vide avec un message d'absence qui alourdirait la page pour une donnée non critique.

## 3. Discography — organisation

```
Singles & EP
  [Album Card compacte] × N
Albums
  [Album Card] × N
Compilations
  [Album Card compacte] × N
Apparaît sur (collaborations)
  [Album Card compacte] × N
```

- **Regroupement par type** (Albums/Singles & EP/Compilations/Apparaît sur) — jamais une seule liste chronologique qui mélangerait un album studio et une apparition ponctuelle sur la compilation d'un tiers.
- **Tri par défaut** : chronologique décroissant (le plus récent en premier) au sein de chaque groupe.
- **Groupe vide** : masqué entièrement (cohérent avec [[LIBRARY_COMPONENTS.md]] §Album Grid, jamais de groupe à zéro élément affiché).

## 4. Top Songs

Les titres les plus écoutés de l'artiste dans la bibliothèque locale de l'utilisateur (jamais un classement global externe non vérifiable) — liste de Track Row ([[TRACK_COMPONENTS.md]]), limitée à 5-10 entrées avec action « Voir tout » vers une vue dédiée si l'artiste a une discographie large.

## 5. Popular Albums

Sous-ensemble mis en avant de la Discography (§3) si l'artiste a un catalogue large (au-delà d'un seuil, ex. 10+ albums) — jamais une duplication complète de la Discography juste au-dessus d'elle-même ; réservé aux artistes prolifiques où un résumé aide la découverte, masqué si la Discography complète tient déjà dans un espace raisonnable.

## 6. Collaborations

Voir « Apparaît sur » (§3) — même composant, nom explicité ici car redemandé séparément par ce cadrage ; aucune section dupliquée.

## 7. Responsive

Mobile : Artist Hero réduit en hauteur (portrait moins dominant que sur desktop, priorité au contenu), Discography en défilement horizontal par groupe plutôt qu'en grille verticale complète — cohérent avec [[RESPONSIVE_GUIDE.md]] §7bis (réorganisation avant masquage).

## 8. Accessibilité

Chaque groupe de Discography (§3) est une région nommée (`aria-label` explicite : « Albums », « Singles et EP ») — jamais une liste continue sans repère pour un utilisateur de lecteur d'écran qui naviguerait par landmarks.

---

## 9. Checklist de validation

- [ ] Artist Card n'est pas redéfinie ici, uniquement référencée depuis [[CARD_SPECIFICATION.md]]/[[LIBRARY_COMPONENTS.md]].
- [ ] Chaque groupe de Discography (§3) a une règle explicite pour l'état vide.
- [ ] Aucune donnée de biographie n'est inventée ou complétée artificiellement en l'absence de source (§2).

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 9) | Product Designer / Principal Music Experience Designer |

# PLAYLIST_COMPONENTS.md — Famille de composants Playlist (Phase 9)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / Principal Music Experience Designer
> **Documents liés** : [[CARD_SPECIFICATION.md]], [[PLAYLIST_SPECIFICATION.md]], [[TRACK_COMPONENTS.md]]

> **Cadrage** : `Playlist Card` dérive déjà de [[CARD_SPECIFICATION.md]] ([[LIBRARY_COMPONENTS.md]] §Cartes individuelles, pochette composite). [[PLAYLIST_SPECIFICATION.md]] a déjà défini le comportement produit — ce document couvre uniquement la page Playlist elle-même, sans équivalent existant.

---

## 1. Playlist Hero

Instance de Hero ([[LAYOUT_COMPONENTS.md]]) — pochette (composite ou dédiée, [[LIBRARY_COMPONENTS.md]] §Playlist Card), titre en rôle Display, éditable inline si l'utilisateur est propriétaire (§Playlist Owner ci-dessous).

## 2. Playlist Header

```
[Pochette]  Nom de la playlist (Display, éditable si propriétaire)
            Description (optionnelle)
            Propriétaire · Nombre de titres · Durée totale
            [Lecture] [Lecture aléatoire] [⋮ Actions]
```

- **Playlist Cover** : pochette composite (mosaïque des 4 pochettes les plus représentatives, [[LIBRARY_COMPONENTS.md]]) par défaut, remplaçable par une image personnalisée si l'utilisateur en choisit une — jamais l'inverse (une image personnalisée n'est jamais écrasée automatiquement par une recomposition).
- **Playlist Description** : texte libre optionnel, éditable inline par le propriétaire, rôle Body, tronqué à 2 lignes avec expansion (identique au traitement de la biographie d'artiste, [[ARTIST_COMPONENTS.md]] §2).
- **Playlist Owner** : nom du profil créateur — pour une playlist collaborative (statut technique encore ouvert, [[FEATURE_BIBLE.md]] §5), affiche également les derniers contributeurs récents ; pour une playlist personnelle, affiche simplement l'utilisateur courant sans emphase superflue.
- **Playlist Statistics** : nombre d'écoutes cumulées de la playlist dans son ensemble (si historique actif) — même traitement discret que pour l'Album ([[ALBUM_COMPONENTS.md]] §3), jamais un outil de comparaison.

## 3. Playlist Actions

Lecture, Lecture aléatoire, Menu (renommer, changer la pochette, dupliquer, supprimer — suppression toujours via [[DIALOG_LIBRARY.md]] §1) — le propriétaire voit des actions supplémentaires (édition) invisibles pour un simple auditeur d'une playlist partagée en lecture seule.

## 4. Corps — liste des titres

Track Row ([[TRACK_COMPONENTS.md]] §1) avec réorganisation par glisser-déposer activée uniquement pour le propriétaire — jamais proposée visuellement (poignée masquée) à un utilisateur qui n'a pas les droits d'édition, pour éviter une tentative d'action qui échouerait silencieusement.

## 5. Playlist Grid

Voir [[LIBRARY_COMPONENTS.md]] (Playlist Grid, peuplée de Playlist Card) — non redécrite ici.

## 6. Playlist Filters

Au sein d'une playlist longue (au-delà d'un seuil, ex. 100+ titres), un filtre local par artiste/album apparaît au-dessus de la liste — même composant que le filtre de file d'attente ([[QUEUE_SPECIFICATION.md]] §6bis), appliqué ici au contexte Playlist plutôt qu'à la file active.

## 7. Responsive

Mobile : Header en Stack vertical (identique au traitement Album, [[ALBUM_COMPONENTS.md]] §7), actions d'édition (renommer, réorganiser) repliées dans un mode « Édition » explicite plutôt que des poignées de glissement toujours visibles qui gêneraient le défilement tactile normal.

## 8. Accessibilité

Réorganisation accessible au clavier pour le propriétaire (identique à Queue Item, [[PLAYER_COMPONENTS.md]] §6) ; statut lecture seule annoncé explicitement pour un utilisateur non-propriétaire consultant une playlist partagée, jamais une action qui semble disponible mais échoue silencieusement.

---

## 9. Checklist de validation

- [ ] Playlist Card n'est pas redéfinie ici, uniquement référencée.
- [ ] La distinction propriétaire/lecture seule (§3-4) est cohérente sur toute la page, jamais une action d'édition visible sans droit réel.
- [ ] Playlist Statistics reste discret (§2), même règle que pour Album.

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 9) | Product Designer / Principal Music Experience Designer |

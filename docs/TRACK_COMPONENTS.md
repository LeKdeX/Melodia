# TRACK_COMPONENTS.md — Famille de composants Track (Phase 9)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / Senior Audio UX Engineer
> **Documents liés** : [[CARD_SPECIFICATION.md]], [[LIBRARY_COMPONENTS.md]], [[PLAYER_COMPONENTS.md]] (Queue Item)

> **Cadrage** : `Track Card` a déjà une spécification complète dans [[LIBRARY_COMPONENTS.md]], `Queue Item` dans [[PLAYER_COMPONENTS.md]] — non redécrites ici. Ce document introduit **Track Row**, le troisième contexte de représentation d'un titre (liste dense d'une page Album/Playlist, distinct de la grille et de la file), et approfondit métadonnées/qualité/badges/statut communs aux trois.

---

## 1. Track Row (nouveau composant)

```
№  [Pochette mini?]  Titre                    Album      Durée  [♡] [⋮]
                      Artiste (si contexte multi-artiste)
```

- **Contexte** : corps d'une page Album ([[ALBUM_COMPONENTS.md]] §4, pochette mini omise car déjà affichée une fois dans le Header) ou d'une Playlist ([[PLAYLIST_COMPONENTS.md]], pochette mini affichée car les titres viennent de sources variées).
- **Distinction avec Track Card** ([[LIBRARY_COMPONENTS.md]]) : Track Row est une ligne dans un contexte déjà structuré par un parent (Album/Playlist) — jamais utilisée isolément dans une grille, où Track Card reste le bon choix.
- **Distinction avec Queue Item** ([[PLAYER_COMPONENTS.md]]) : Queue Item porte une poignée de réorganisation et un état « en cours de lecture » permanent visible ; Track Row n'a de réorganisation que dans le contexte d'édition d'une Playlist (§Playlist Actions, [[PLAYLIST_COMPONENTS.md]]), jamais par défaut dans une vue Album (l'ordre d'un album n'est pas réorganisable, c'est une propriété de l'œuvre).

## 2. Track Metadata

| Champ | Affichage |
|---|---|
| Numéro de piste | Colonne fixe à gauche, rôle Code tabulaire |
| Titre | Rôle Body, jamais tronqué sans tooltip complet |
| Artiste (si différent de l'artiste principal du contexte) | Rôle Caption sous le titre — jamais affiché si identique à l'artiste déjà annoncé par le Header parent (Album/Playlist), redondance évitée |
| Album (en contexte Playlist uniquement, jamais en contexte Album) | Rôle Caption, colonne dédiée sur desktop, masquée sur mobile (priorité de contenu, [[RESPONSIVE_GUIDE.md]] §7bis) |
| Durée | Rôle Code tabulaire, alignée à droite |

## 3. Track Quality (badge de qualité audio)

Badge discret ([[FEEDBACK_COMPONENTS.md]]) affichant le format/bitrate quand il dépasse la qualité standard (ex. « FLOSSLESS », « Hi-Res ») — jamais affiché pour un format standard (MP3/AAC courant), qui n'apporte aucune information différenciante à la majorité des utilisateurs ([[PERSONAS.md]], seul l'audiophile s'y intéresse) ; visible uniquement en survol/vue détaillée pour ne pas alourdir une liste dense par défaut — décision cohérente avec « dense mais jamais chargé » ([[PRODUCT_VALUES.md]] §6).

## 4. Track Badges (autres badges)

| Badge | Condition d'affichage |
|---|---|
| Téléchargé | Icône seule (jamais de texte, économie d'espace en liste dense), voir [[DOWNLOAD_SYSTEM.md]] |
| Explicite | Si métadonnée Jellyfin le signale — icône « E », jamais masqué ni un filtre imposé par défaut (décision de contenu, pas de modération, hors périmètre produit) |
| Indisponible hors ligne | Grisé + icône, si mode hors ligne actif et piste non téléchargée — voir [[OFFLINE_SYSTEM.md]] |

## 5. Track Status (état de lecture)

| Statut | Traitement visuel |
|---|---|
| En cours de lecture | Surlignage de ligne + icône d'onde animée à la place du numéro de piste (catégorie Ambiance, [[MOTION_GUIDELINES.md]] §1) |
| En pause | Icône statique (pas d'animation), même position |
| Non joué dans cette session | Aucun traitement spécial — état par défaut |
| Erreur de lecture | Icône d'alerte à la place du numéro, ligne reste cliquable pour réessayer ([[ERROR_STATES.md]]) |

## 6. Track Actions

Favori (IconButton, [[BUTTON_SPECIFICATION.md]]), Menu contextuel (ajout playlist/file, téléchargement, voir l'album/artiste) — visibles au survol/focus sur desktop (jamais permanents dans une liste dense), toujours visibles sur tactile (pas de survol, [[INTERACTION_GUIDELINES.md]] §2).

## 7. Accessibilité

Chaque Track Row reste navigable comme un élément de liste unique (`role="listitem"`, position/total annoncés, [[ACCESSIBILITY_GUIDE.md]] §2) — les actions (§6) restent atteignables au clavier même si visuellement masquées jusqu'au focus.

---

## 8. Checklist de validation

- [ ] Track Row, Track Card et Queue Item ont chacun une règle de contexte d'usage exclusive, jamais deux composants utilisés pour le même besoin.
- [ ] Track Quality (§3) ne s'affiche jamais pour un format standard.
- [ ] Chaque statut de lecture (§5) a un traitement visuel non ambigu, jamais uniquement une couleur seule.

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 9) | Product Designer / Senior Audio UX Engineer |

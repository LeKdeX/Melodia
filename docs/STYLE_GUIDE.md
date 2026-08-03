# STYLE_GUIDE.md — Ponctuation, typographie, nommage (Phase 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : UX Writer Senior / Content Designer
> **Documents liés** : [[UX_WRITING_GUIDE.md]], [[LOCALIZATION_GUIDE.md]], [[VOCABULARY.md]]

> **Cadrage** : [[UX_WRITING_GUIDE.md]] fixe la mécanique de la phrase (longueur, structure, voix). Ce document fixe les micro-règles typographiques (ponctuation, capitalisation, emoji, dates, nombres, unités) et les conventions de nommage des objets utilisateur (albums, artistes, playlists). Les deux se complètent, jamais de contradiction entre eux.

---

## 1. Ponctuation

| Règle | Détail |
|---|---|
| Point final | Jamais sur un titre, un libellé de bouton, un label, un badge, un item de menu. Toujours sur une phrase complète dans un corps de message (toast, dialogue, description). |
| Point d'interrogation | Réservé aux titres de dialogue de confirmation (« Supprimer cette playlist ? »), jamais ailleurs. |
| Point d'exclamation | Évité par défaut — cohérent avec [[VOICE_AND_TONE.md]] (calme, jamais excité) ; exception possible pour un jalon personnel réellement notable (ex. Wrapped annuel), jamais pour une confirmation d'action banale. |
| Points de suspension | Uniquement pour une action en cours (« Connexion... »), jamais en fin de titre ou de label statique. |
| Deux-points | Jamais en fin de label (« Nom » pas « Nom : »), sauf devant une valeur affichée sur la même ligne (« Trier par : Titre »). |
| Guillemets | Guillemets français (« ») pour le texte source en français, guillemets anglais ("") pour la version anglaise — jamais mélangés dans une même langue. |

## 2. Capitalisation

- Titres d'écran et de section : casse de phrase (seule la première lettre en majuscule), jamais de Majuscule à Chaque Mot.
- Boutons et labels : casse de phrase également, sauf noms propres.
- Aucune capitalisation intégrale (MAJUSCULES) pour insister — jamais utilisée comme substitut d'emphase.

## 3. Emoji

Aucun emoji dans l'interface produit (boutons, labels, messages, notifications) — cohérent avec [[PERSONALITY.md]] (Sage discret, jamais familier par artifice). Un emoji reste envisageable uniquement dans un canal de communication externe informel (ex. réseaux sociaux), hors du scope de ce document — voir [[LANGUAGE_SYSTEM.md]] pour la cohérence cross-canal.

## 4. Dates et nombres

Renvoi vers [[LOCALIZATION_GUIDE.md]] §4 pour le détail des formats — ce document n'y ajoute qu'une règle : dans le texte source (avant localisation), toute date d'exemple utilisée en documentation ou en maquette utilise le format ISO 8601 (`2026-08-03`) pour éviter toute ambiguïté jour/mois.

## 5. Unités

- Taille de fichier : Kio/Mio/Gio (unités binaires), jamais Ko/Mo/Go (unités décimales, techniquement incorrectes pour du stockage).
- Débit audio : kbps, toujours en minuscules avec l'unité collée au nombre (« 320kbps »).
- Durée : voir [[LOCALIZATION_GUIDE.md]] §4.

## 6. Conventions de nommage des objets utilisateur

| Objet | Convention |
|---|---|
| Playlist créée par l'utilisateur | Aucune convention imposée — nom libre choisi par l'utilisateur, jamais de préfixe/suffixe ajouté automatiquement par Melodia. |
| Playlist générée automatiquement (ex. Discovery) | Nom descriptif et daté si récurrent (« Découvertes de la semaine »), jamais un nom générique répété qui empêcherait de distinguer deux générations successives. |
| Album / Artiste / Titre | Toujours affiché tel que fourni par les métadonnées Jellyfin, jamais reformaté, tronqué silencieusement ou recapitalisé par Melodia — cohérent avec [[JELLYFIN_INTEGRATION.md]] (Jellyfin source de vérité des métadonnées). |
| Appareil (dans les paramètres multi-appareils) | Nom par défaut généré = type d'appareil + système (« MacBook Pro · macOS »), renommable librement par l'utilisateur. |
| Serveur Jellyfin ajouté | Nom par défaut = nom du serveur tel que renvoyé par l'API Jellyfin, jamais renommé automatiquement par Melodia. |

## 7. Noms techniques internes vs texte utilisateur

Les identifiants de code (noms de variables, clés de traduction, noms de composants) ne sont jamais exposés tels quels dans l'interface — toute clé manquante doit afficher un texte de repli lisible, jamais la clé brute (ex. `error.sync.timeout` ne doit jamais apparaître à l'écran).

---

## 8. Checklist de validation

- [ ] Chaque règle de ponctuation (§1) a été vérifiée contre au moins un exemple réel dans [[MICROCOPY_LIBRARY.md]] ou [[DIALOG_LIBRARY.md]].
- [ ] La convention de nommage de chaque type d'objet listé (§6) est cohérente avec la spécification fonctionnelle correspondante ([[PLAYLIST_SPECIFICATION.md]], [[JELLYFIN_INTEGRATION.md]]).
- [ ] Aucune règle ici ne contredit [[UX_WRITING_GUIDE.md]] ou [[LOCALIZATION_GUIDE.md]].

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document, inclut les conventions de nommage (section « NOMMAGE » du cadrage Phase 3, non scindée en fichier séparé) | UX Writer Senior / Content Designer |

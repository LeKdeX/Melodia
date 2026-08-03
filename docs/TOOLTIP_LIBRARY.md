# TOOLTIP_LIBRARY.md — Exemples réels de tooltips (Phase 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : UX Writer Senior / Content Designer
> **Documents liés** : [[MICROCOPY_LIBRARY.md]] §3, [[UX_WRITING_GUIDE.md]] §3, [[ACCESSIBILITY_GUIDE.md]]

> **Cadrage** : [[MICROCOPY_LIBRARY.md]] §3 pose la règle mécanique (jamais de ponctuation finale, fragment plutôt que phrase). Ce document liste le texte réel, zone par zone de l'application. Un tooltip n'explique jamais ce qu'un libellé visible dit déjà — il n'apparaît que pour une icône seule, un raccourci, ou une valeur tronquée.

---

## 1. Lecteur

| Élément | Tooltip |
|---|---|
| Bouton lecture/pause | Lecture / Pause |
| Bouton suivant | Suivant |
| Bouton précédent | Précédent |
| Bouton lecture aléatoire (actif) | Lecture aléatoire activée |
| Bouton lecture aléatoire (inactif) | Lecture aléatoire |
| Bouton répétition (cycle) | Répéter : désactivé / tout / un titre |
| Icône ReplayGain actif | Volume normalisé |
| Bouton file d'attente | File d'attente |
| Bouton paroles | Paroles |
| Barre de progression (survol) | [temps écoulé] / [durée totale] |

## 2. Bibliothèque

| Élément | Tooltip |
|---|---|
| Icône favoris (non actif) | Ajouter aux favoris |
| Icône favoris (actif) | Retirer des favoris |
| Icône téléchargé | Disponible hors ligne |
| Icône en cours de téléchargement | Téléchargement en cours |
| Titre tronqué (survol) | [titre complet] |
| Icône tri | Trier par |
| Icône vue grille/liste | Changer l'affichage |

## 3. Recherche

| Élément | Tooltip |
|---|---|
| Raccourci clavier affiché dans la barre | `Ctrl/Cmd + K` |
| Icône filtre | Filtrer les résultats |

## 4. Playlists

| Élément | Tooltip |
|---|---|
| Icône playlist collaborative | Playlist partagée |
| Icône glisser-déposer | Glisser pour réorganiser |

## 5. Paramètres

| Élément | Tooltip |
|---|---|
| Icône info à côté d'un réglage avancé | [explication en une phrase, contenu spécifique au réglage — voir le réglage concerné dans [[SETTINGS_SPECIFICATION.md]]] |
| Icône « donnée locale uniquement » | Reste sur cet appareil |

## 6. Statistiques / Wrapped

| Élément | Tooltip |
|---|---|
| Point sur un graphique (survol) | [valeur] · [date] |
| Icône export | Exporter ces données |

---

## 7. Règles complémentaires

- Un raccourci clavier affiché en tooltip utilise toujours la notation `Ctrl/Cmd + Touche`, jamais épelée (« Contrôle plus K »).
- Une valeur tronquée (titre, nom d'artiste) affiche le texte complet en tooltip sans reformulation.
- Aucun tooltip sur un élément déjà pourvu d'un libellé visible identique — redondance interdite ([[UX_WRITING_GUIDE.md]] §1).
- Délai d'apparition et comportement tactile : voir [[ACCESSIBILITY_GUIDE.md]] (un tooltip n'est jamais le seul moyen d'accéder à une information sur mobile, où le survol n'existe pas).

---

## 8. Checklist de validation

- [ ] Chaque icône seule (sans libellé visible) listée dans les spécifications de fonctionnalités a un tooltip correspondant ici.
- [ ] Aucun tooltip ne dépasse 6 mots ([[UX_WRITING_GUIDE.md]] §3), sauf les gabarits à valeur variable (§1, §6) qui restent conformes en substance.
- [ ] Aucune redondance avec un libellé visible adjacent.

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 3) | UX Writer Senior / Content Designer |

# NAVIGATION_HISTORY.md — Historique et mémoire de navigation (Phase 8)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Navigation System Architect / Information Architect
> **Documents liés** : [[NAVIGATION_GUIDE.md]], [[TRANSITION_GUIDE.md]] §7/§9, [[PRODUCT_RULES.md]] §10

> **Cadrage** : [[TRANSITION_GUIDE.md]] §7/§9 a déjà défini la chorégraphie du retour et de l'accès à l'historique. Ce document précise ce qui manquait : la structure de données conceptuelle de trois historiques distincts (navigation, lecture, recherche), leur mémoire, et les règles de restauration — jamais leur animation, déjà couverte ailleurs.

---

## 1. Trois historiques distincts, jamais fusionnés

| Historique | Contenu | Portée |
|---|---|---|
| Navigation | Pile des vues visitées (Bibliothèque → Album → Artiste) | Session courante uniquement, jamais persistée entre deux lancements de l'application |
| Lecture | Titres joués, horodatés | Local, permanent tant que l'utilisateur ne le désactive pas ([[PRODUCT_RULES.md]] §10), alimente Statistiques/Wrapped |
| Recherche | Requêtes de recherche récentes | Local, permanent, effaçable individuellement ([[SEARCH_COMPONENTS.md]] Recent Searches) |

**Pourquoi cette séparation** : un utilisateur qui efface son historique de lecture (donnée sensible, écoute) ne s'attend pas à perdre sa pile de navigation en cours (donnée de session, sans valeur au-delà de l'instant) — mélanger les trois créerait une confusion sur ce que chaque action de suppression efface réellement.

## 2. Historique de navigation — retour et avancer

- **Pile, pas graphe** : chaque navigation vers une nouvelle vue empile une entrée ; le retour dépile — jamais une structure en graphe qui permettrait des retours ambigus vers plusieurs origines possibles.
- **Retour** : ramène exactement à l'état précédent, y compris la position de défilement ([[INTERACTION_LIBRARY.md]] §8) et les filtres actifs — jamais une vue « fraîche » qui aurait perdu le contexte de l'utilisateur.
- **Avancer** : disponible uniquement immédiatement après un retour, tant qu'aucune nouvelle navigation n'a été effectuée depuis — une nouvelle navigation après un retour purge la partie « avancer » de la pile (comportement standard de navigateur web, jamais réinventé).
- **Navigation directe** (clic sur un item de Sidebar, résultat de Command Palette) : empile une nouvelle entrée sans purger la pile existante au-delà de sa position courante — identique au comportement d'un navigateur web classique.

## 3. Mémoire par vue

Chaque entrée de la pile de navigation mémorise : position de défilement, filtres/tri actifs, onglet actif (si Tabs), état d'un panneau secondaire ouvert (ex. file d'attente visible) — restaurés à l'identique lors d'un retour, jamais réinitialisés silencieusement ([[PREMIUM_DETAILS.md]] §1).

## 4. Restauration après fermeture complète

Contrairement à la pile de navigation (§1, non persistée), la dernière vue active et la position de lecture en cours sont restaurées au prochain lancement de l'application ([[PLAYER_SPECIFICATION.md]] pour la position de lecture) — l'utilisateur retrouve son contexte d'écoute, jamais sa pile de navigation complète (qui n'aurait plus de sens après une interruption).

## 5. Historique de lecture — accès et affichage

Accessible depuis la section Historique de l'arborescence ([[NAVIGATION_GUIDE.md]] §1), ordonné du plus récent au plus ancien, chaque entrée navigable vers le titre/album concerné en une action (cohérent avec la philosophie « maximum trois actions », [[NAVIGATION_SYSTEM.md]] §1). Distinct de Recently Played ([[LIBRARY_COMPONENTS.md]]), qui est une vue dérivée de ce même historique dédupliquée par titre, pas une seconde source de données.

## 6. Historique de recherche — accès et affichage

Voir [[SEARCH_COMPONENTS.md]] (Recent Searches) pour l'anatomie — ce document précise uniquement la règle de rétention : les 20 dernières recherches distinctes conservées, au-delà la plus ancienne est purgée automatiquement (jamais une liste qui grossit sans limite).

## 7. Suppression

Chaque historique se supprime indépendamment (§1) via son propre Dialog de confirmation ([[DIALOG_LIBRARY.md]] §6, déjà spécifié pour l'historique de lecture) — jamais un bouton unique « Tout effacer » qui combinerait les trois sans que l'utilisateur sache précisément ce qui disparaît.

---

## 8. Checklist de validation

- [ ] Les trois historiques restent explicitement séparés, jamais une suppression de l'un qui affecte silencieusement un autre.
- [ ] La pile de navigation (§2) suit un modèle pile, jamais un graphe ambigu.
- [ ] La restauration après fermeture (§4) ne prétend restaurer que ce qui est réellement persisté.

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 8) | Navigation System Architect / Information Architect |

# SEARCH_SPECIFICATION.md — Spécification de la recherche (Phase 1, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : UX Research Lead / Senior Product Manager
> **Documents liés** : [[DATA_LAYER.md]] §3, [[STACK_DECISIONS.md]] §2, [[PRODUCT_RULES.md]] §4

> **Cadrage** : le moteur (FlexSearch) et sa justification sont déjà décidés dans [[STACK_DECISIONS.md]] §2 et implémentés selon [[DATA_LAYER.md]] §3. Ce document spécifie ce qui est cherché, comment, et le comportement produit.

---

## 1. Objectif

Faire de la recherche l'action la plus fiable et la plus rapide du produit — le budget < 100 ms ([[PERFORMANCE_BUDGET.md]] §2, [[PRODUCT_RULES.md]] §4) n'a de sens que si le résultat est aussi *exact*.

## 2. Recherche universelle

Une seule barre de recherche interroge simultanément : titres, albums, artistes, genres, années, compositeurs, labels, playlists. Les résultats sont regroupés par catégorie, jamais présentés comme une liste plate indifférenciée — l'utilisateur doit reconnaître immédiatement s'il regarde un titre ou un album.

## 3. Champs recherchés et pondération

| Champ | Pondération | Justification |
|---|---|---|
| Titre de piste | Très élevée | Recherche la plus fréquente ([[PERSONAS.md]], tous profils) |
| Nom d'artiste | Élevée | Deuxième recherche la plus fréquente |
| Nom d'album | Élevée | |
| Genre | Moyenne | Recherche exploratoire plutôt que ciblée |
| Année | Faible, activée par filtre explicite plutôt que texte libre ambigu | « 1979 » est ambigu entre année et partie d'un titre |
| Compositeur / Label | Faible, pertinent surtout pour l'audiophile/collectionneur ([[PERSONAS.md]] §2-3) | |
| Durée / Format / Qualité audio | Filtres dédiés, pas recherche textuelle | Ce sont des attributs, pas des chaînes de caractères à chercher |
| Favoris / Téléchargés / Historique | Filtres de portée (« chercher uniquement dans mes favoris ») | Réduisent le périmètre de recherche plutôt que d'être des champs cherchés |

## 4. Tolérance et autocomplétion

- Recherche floue tolérante aux fautes de frappe légères et à l'ordre des mots (déjà spécifié techniquement, [[DATA_LAYER.md]] §3.2).
- Autocomplétion affichant les meilleures correspondances au fur et à mesure de la frappe, avant même la validation.
- Suggestions basées sur les recherches récentes/fréquentes de l'utilisateur (stockées localement, cohérent avec la clarification de [[PRODUCT_RULES.md]] §10).

## 5. Résultats et actions

Chaque résultat est actionnable immédiatement : lecture directe, ajout à la file, ajout à une playlist — jamais un résultat qui nécessite d'ouvrir une page intermédiaire pour agir dessus (cohérent avec [[UX_PRINCIPLES.md]] §7).

## 6. États

| État | Comportement |
|---|---|
| Aucun résultat | Voir [[EMPTY_STATES.md]] — jamais un simple « aucun résultat », toujours une suggestion (vérifier l'orthographe, élargir les filtres) |
| Recherche pendant l'indexation initiale | Indicateur explicite « indexation en cours », repli sur la recherche serveur ([[DATA_LAYER.md]] §3.3) |
| Recherche avec filtres actifs sans résultat | Distinction claire entre « rien ne correspond » et « rien ne correspond à cette combinaison de filtres », avec option de réinitialiser les filtres en un geste |

## 7. Cas limites

- Requête à un seul caractère : résultats limités aux correspondances de début de mot pour éviter un bruit de résultats non pertinents.
- Requête contenant des caractères spéciaux ou des diacritiques (accents) : normalisée avant recherche (« ete » trouve « Été »).
- Bibliothèque de 200 000+ titres : performance garantie par le budget déjà engagé ([[PERFORMANCE_BUDGET.md]] §2), pas une nouvelle contrainte introduite ici.

---

## 8. Checklist de validation

- [ ] Aucune décision de moteur de recherche n'est redécidée ici — uniquement référencée depuis [[STACK_DECISIONS.md]] §2.
- [ ] Chaque catégorie de résultat a une action directe possible sans navigation intermédiaire.
- [ ] L'état « aucun résultat » guide toujours l'utilisateur, cohérent avec [[UX_PRINCIPLES.md]] §5.

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 2) | UX Research Lead / Senior Product Manager |

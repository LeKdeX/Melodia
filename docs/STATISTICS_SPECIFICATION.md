# STATISTICS_SPECIFICATION.md — Spécification des statistiques (Phase 1, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Senior Product Manager / Audiophile Consultant
> **Documents liés** : [[PRODUCT_RULES.md]] §10, [[WRAPPED_SPECIFICATION.md]], [[DISCOVERY_SPECIFICATION.md]], [[DATA_LAYER.md]] §2

> **Ce document définit la fondation** : l'historique d'écoute local que [[WRAPPED_SPECIFICATION.md]] et [[DISCOVERY_SPECIFICATION.md]] consomment. Il n'est pas dupliqué dans ces deux documents — ils y renvoient.

---

## 1. Objectif

Donner à l'utilisateur une vision honnête de sa propre écoute — jamais un outil de comparaison sociale ou de gamification poussant à l'usage compulsif (contraire à [[PRODUCT_VALUES.md]] §4).

## 2. Donnée collectée (historique d'écoute local)

| Donnée | Usage |
|---|---|
| Piste jouée, horodatage de début | Base de tout calcul de statistique |
| Durée effective d'écoute (pas seulement « lancé ») | Distingue une écoute réelle d'un survol — un morceau interrompu après 3 secondes ne compte pas comme « écouté » |
| Contexte de lecture (playlist, album, recherche, mix) | Permet d'attribuer une écoute à sa source pour les statistiques de découverte |

**Seuil de comptage** : une écoute n'est comptabilisée qu'au-delà d'un pourcentage minimum de la durée du morceau (seuil à définir en conception détaillée, convention courante autour de 50 % ou 30 secondes) — évite qu'un passage rapide fausse les statistiques.

**Rappel de gouvernance** : cette donnée ne quitte jamais l'appareil sans action explicite ([[PRODUCT_RULES.md]] §10), est consultable et supprimable intégralement à tout moment, désactivable sans dégrader le reste du produit.

## 3. Tableau de bord

| Vue | Contenu |
|---|---|
| Temps d'écoute | Total cumulé, par jour/semaine/mois/année |
| Artistes préférés | Classement par temps d'écoute cumulé, pas seulement nombre de lectures (un album de 3 minutes écouté 10 fois ne doit pas artificiellement dominer un album de 8 minutes écouté 5 fois) |
| Albums préférés | Même logique |
| Genres préférés | Agrégation depuis les métadonnées |
| Activité quotidienne/hebdomadaire/mensuelle/annuelle | Visualisation en graphique temporel |
| Heures d'écoute | Répartition par heure de la journée — alimente directement les Daily Mix ([[DISCOVERY_SPECIFICATION.md]] §3) |
| Historique complet | Liste chronologique consultable et filtrable |
| Comparaisons | Période actuelle vs période précédente (ex. ce mois vs le mois dernier) — jamais une comparaison avec d'autres utilisateurs (pas de dimension sociale, cohérent avec [[PROJECT_CHARTER.md]] §4) |
| Objectifs | Optionnels, définis par l'utilisateur lui-même (ex. « redécouvrir 10 albums ce mois-ci ») — jamais imposés par le produit |
| Badges | Reconnaissance discrète de jalons (ex. « 1000 heures d'écoute ») — jamais de mécanique de notification insistante pour les débloquer, cohérent avec [[PRODUCT_VALUES.md]] §3 |

## 4. États

- Historique désactivé : tableau de bord remplacé par une explication claire et un accès direct à l'activation (voir [[EMPTY_STATES.md]]).
- Historique récent (premiers jours d'usage) : statistiques affichées avec mention explicite de la période courte, jamais présentées comme une tendance fiable prématurément.

## 5. Cas limites

- Migration/réinstallation de l'application : l'historique local suit la même politique de sauvegarde que le reste de `LocalStore` ([[DATA_LAYER.md]] §2) — pas de mécanisme de perte spécifique aux statistiques.
- Bibliothèque avec des morceaux très courts (interludes, intros) : seuil de comptage (§2) évite une distorsion des classements par des pistes techniquement « jouées » en boucle involontairement.

---

## 6. Checklist de validation

- [ ] Aucune donnée statistique ne quitte l'appareil par défaut — vérifié explicitement contre [[PRODUCT_RULES.md]] §10.
- [ ] Aucune dimension de comparaison sociale n'est introduite.
- [ ] Le seuil de comptage d'une écoute est défini, pas laissé implicite.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 2) | Senior Product Manager / Audiophile Consultant |

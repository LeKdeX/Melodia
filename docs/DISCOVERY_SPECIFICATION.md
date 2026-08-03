# DISCOVERY_SPECIFICATION.md — Spécification de la découverte (Phase 1, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : UX Research Lead / Music Experience Designer
> **Documents liés** : [[STATISTICS_SPECIFICATION.md]], [[PLAYLIST_SPECIFICATION.md]] §1, [[PRODUCT_RULES.md]] §10

> **Fondation partagée** : toute fonctionnalité de ce document s'appuie sur l'historique d'écoute local activé par défaut, clarifié dans [[PRODUCT_RULES.md]] §10 — jamais transmis à un serveur, toujours consultable et supprimable par l'utilisateur.

---

## 1. Objectif

Combler l'angle mort identifié dans [[VISION.md]] §3-4 : aucun client Jellyfin natif n'aide à redécouvrir sa propre bibliothèque. La découverte de Melodia reste strictement ancrée dans la collection possédée par l'utilisateur — jamais une suggestion de contenu à acquérir ailleurs.

## 2. Recommandations locales

| Source du signal | Utilisation |
|---|---|
| Historique d'écoute | Morceaux/artistes/genres récurrents pondèrent les suggestions |
| Favoris | Signal fort, pondération plus élevée que l'historique passif |
| Habitudes horaires/journalières | Voir Daily Mix (§3), mécanisme partagé |
| Artistes similaires | Déduits des métadonnées de genre/label disponibles, jamais d'appel à un service tiers externe |
| Évolution des goûts | Pondération temporelle — l'écoute récente compte davantage que l'écoute ancienne, pour éviter de recommander indéfiniment ce qui ne correspond plus aux goûts actuels |

**Ce que les recommandations ne sont jamais** : un flux infini façon plateforme commerciale. Une recommandation est présentée en nombre fini, jamais en défilement sans fin — cohérent avec [[PRODUCT_VALUES.md]] §4 (« le silence est une fonctionnalité »).

## 3. Daily Mix

Mixes générés automatiquement, réévalués périodiquement (fréquence à définir en conception détaillée) :

| Mix | Critère de génération |
|---|---|
| Mix matin / Mix soirée | Historique d'écoute croisé avec l'heure de la journée |
| Mix travail / Mix détente | Nécessite une classification d'ambiance (tempo, énergie) — dépend de la disponibilité de métadonnées adaptées ; repli sur une classification par genre si l'ambiance n'est pas déductible |
| Mix sport | Même dépendance qu'au-dessus (tempo élevé) |
| Mix nouveautés | Ajouts récents à la bibliothèque non encore écoutés |
| Mix nostalgie | Morceaux anciennement très écoutés puis délaissés (signal : forte écoute passée, faible écoute récente) |
| Mix découverte | Morceaux jamais ou très peu écoutés de la bibliothèque — le pendant direct du besoin identifié en [[USER_JOURNEYS.md]] §8 |

**Règle métier commune** : chaque mix affiche une justification courte et honnête de sa composition (« basé sur vos écoutes du matin », « morceaux que vous n'avez jamais écoutés ») — jamais une suggestion qui semble sortie de nulle part, cohérent avec la règle d'honnêteté du produit.

## 4. Préparation à l'IA future

Le moteur de règles de recommandation (§2) et de Daily Mix (§3) est isolé derrière une interface de scoring interne (entrée : signaux locaux : sortie : score de pertinence par morceau), pensée pour qu'un futur modèle plus sophistiqué remplace l'implémentation par règles sans changer l'interface consommée par l'UI — cohérent avec le principe d'évolutivité sans sur-conception ([[ARCHITECTURE_PRINCIPLES.md]] §8). Aucun modèle IA n'est engagé ou dépendant d'un service externe à ce stade.

## 5. États

Bibliothèque trop récente/trop petite pour générer des recommandations pertinentes (ex. premiers jours d'usage) : état explicite « pas encore assez d'historique » plutôt qu'un mix vide ou de mauvaise qualité silencieusement affiché comme pertinent (voir [[EMPTY_STATES.md]]).

## 6. Cas limites

- Bibliothèque très réduite (< 500 titres, [[EXTREME_SCENARIOS.md]] §1) : recommandations à faible diversité assumée, jamais de répétition qui donne l'impression d'un bug.
- Utilisateur qui désactive l'historique local ([[PRODUCT_RULES.md]] §10) : toutes les fonctionnalités de ce document se désactivent proprement, avec message explicatif, jamais une erreur.

---

## 7. Checklist de validation

- [ ] Aucune recommandation ne dépend d'un service externe ou d'une transmission de données hors de l'appareil.
- [ ] Chaque mix a une justification affichée à l'utilisateur, jamais une boîte noire.
- [ ] La désactivation de l'historique local dégrade proprement cette fonctionnalité, jamais le reste du produit.

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 2) | UX Research Lead / Music Experience Designer |

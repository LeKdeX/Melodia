# RECOMMENDATION_ENGINE.md — Architecture du moteur de scoring (Phase 13)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Senior Data Architect
> **Documents liés** : [[DISCOVERY_SPECIFICATION.md]], [[DOMAIN_MODELS.md]] §4, [[STATISTICS_ENGINE.md]]

> **Cadrage strict** : [[DISCOVERY_SPECIFICATION.md]] reste la seule source de vérité sur *quels* mixes existent et *quelle* justification chacun affiche. §4 de ce même document a déjà posé le principe d'une « interface de scoring interne » sans la détailler. Ce document est ce détail technique manquant.

---

## 1. Interface de scoring

```
interface RecommendationScorer {
  score(candidate: Track, signals: UserSignals): number  // 0-1
}
```

- `signals` regroupe l'historique agrégé ([[STATISTICS_ENGINE.md]]), les favoris, et le contexte temporel (heure/jour) — jamais un appel réseau, jamais une donnée transmise hors de l'appareil ([[DISCOVERY_SPECIFICATION.md]] §7, déjà acté).
- L'implémentation actuelle est un `RulesBasedScorer` (pondération explicite des signaux, [[DISCOVERY_SPECIFICATION.md]] §2) — l'interface est conçue pour qu'un futur `MLScorer` la remplace sans changer le consommateur ([[DISCOVERY_SPECIFICATION.md]] §4, Ports & Adapters appliqué ici comme pour `MusicSource`).

## 2. Pipeline de génération d'un mix

1. Sélection d'un ensemble de candidats (ex. pour Mix Découverte : pistes avec `historyCount = 0`, [[DISCOVERY_SPECIFICATION.md]] §3) — filtrage grossier via `TrackRepository`/`HistoryRepository`, jamais un scoring sur la bibliothèque entière.
2. Scoring de chaque candidat via `RecommendationScorer.score()`.
3. Tri par score décroissant, troncature à une taille finie (jamais un flux infini, [[DISCOVERY_SPECIFICATION.md]] §2, déjà acté).
4. Génération de la justification affichée (texte déterministe dérivé des signaux dominants du score, [[DISCOVERY_SPECIFICATION.md]] §3) — jamais une justification générique déconnectée du calcul réel.
5. Résultat mis en cache (`Recommendation Cache`, [[CACHE_SYSTEM.md]] §1) jusqu'à la prochaine réévaluation.

## 3. Fréquence de réévaluation

Un Daily Mix est réévalué à l'ouverture de l'écran si le cache a plus d'un intervalle configurable (par défaut : une fois par période de la journée concernée par le mix — matin/soirée) — jamais à chaque rendu, coût de calcul non négligeable sur une bibliothèque de 200 000 titres (cohérent avec [[ENGINEERING_GUIDE.md]] §1.4, optimisation mesurée). La fréquence exacte reste un point ouvert de conception détaillée, déjà signalé dans [[FEATURE_BIBLE.md]] §5 — non tranché arbitrairement ici.

## 4. Pondération temporelle

Le score intègre une décroissance temporelle sur le signal d'historique (écoute récente pondérée plus fort que l'écoute ancienne, [[DISCOVERY_SPECIFICATION.md]] §2, déjà acté) — implémentée comme un facteur multiplicatif simple sur l'ancienneté de l'événement `History` concerné, jamais un modèle statistique plus complexe qu'un besoin réel ne justifie encore (YAGNI, [[ARCHITECTURE_PRINCIPLES.md]] §8bis).

## 5. Dégradation avec peu de données

Bibliothèque/historique trop récent pour un scoring pertinent ([[DISCOVERY_SPECIFICATION.md]] §5-6) : le moteur retourne un ensemble de candidats vide plutôt qu'un score de faible confiance présenté comme fiable — c'est à la couche produit ([[DISCOVERY_SPECIFICATION.md]] §5) de traduire un résultat vide en état explicite, jamais au moteur de masquer cette limite.

## 5bis. Sélection de candidats par type de mix (ajout Moteur de Recherche)

> [[DISCOVERY_SPECIFICATION.md]] §3 nomme déjà les six mixes et leur critère de génération produit. §2 de ce document ne détaillait l'étape 1 (sélection de candidats) que pour Mix Découverte. Cette section couvre les cinq autres, sans redécider leur critère produit.

| Mix | Requête de sélection de candidats (étape 1 de §2) |
|---|---|
| Mix matin / Mix soirée | `HistoryRepository`, filtré sur la tranche horaire correspondante des événements passés — candidats = pistes déjà associées à cette tranche |
| Mix nouveautés | `TrackRepository`, filtré sur `addedAt` récent ([[SORT_ENGINE.md]] §1, même champ que le tri « date d'ajout ») ET `historyCount = 0` |
| Mix nostalgie (reprises d'écoute, albums oubliés) | `HistoryRepository`, agrégat par piste : forte écoute cumulée sur une fenêtre ancienne ET faible/nulle écoute sur une fenêtre récente — les deux fenêtres calculées via [[STATISTICS_ENGINE.md]] §1, jamais un second mécanisme d'agrégation |
| Mix travail / Mix détente | `TrackRepository`, filtré par genre en repli faute de métadonnée de tempo/énergie fiable ([[DISCOVERY_SPECIFICATION.md]] §3, dépendance déjà signalée — non résolue par cette section) |
| Mix sport | Même dépendance et même repli que Mix travail/détente |

**Genres/artistes similaires** (nommés par le cadrage, statut déjà clarifié) : les artistes similaires sont déjà un signal existant de §2 de [[DISCOVERY_SPECIFICATION.md]] (« déduits des métadonnées de genre/label ») — les genres similaires réutilisent le même mécanisme de déduction par métadonnées partagées, jamais un second algorithme de similarité. Aucun des deux n'est un mix nommé séparément ([[DISCOVERY_SPECIFICATION.md]] §3 reste la liste fermée) — ce sont des signaux d'entrée pour `UserSignals` (§1), pas des mixes supplémentaires.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas la liste des mixes ou leurs critères produit (voir [[DISCOVERY_SPECIFICATION.md]]).
- Ne redéfinit pas le moteur de calcul des statistiques sous-jacentes (voir [[STATISTICS_ENGINE.md]]).
- Ne redéfinit pas le cache de résultat lui-même (voir [[CACHE_SYSTEM.md]]).

## 7. Checklist de validation

- [ ] Aucun scoring n'utilise ni ne transmet une donnée hors de l'appareil (§1).
- [ ] Un `RulesBasedScorer` peut être remplacé par une implémentation future sans changer l'interface consommée (§1).
- [ ] Aucun résultat de faible confiance n'est présenté comme fiable par le moteur (§5).

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Phase 13) | Senior Data Architect |
| 1.1.0 | 2026-08-04 | Moteur de Recherche : ajout §5bis (sélection de candidats pour les 5 mixes restants, clarification artistes/genres similaires) — au lieu de créer DISCOVERY_ENGINE.md en doublon | Recommendation System Architect |

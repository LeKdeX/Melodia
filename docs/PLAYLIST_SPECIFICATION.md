# PLAYLIST_SPECIFICATION.md — Spécification des playlists (Phase 1, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Senior Product Manager / UX Research Lead
> **Documents liés** : [[LIBRARY_SPECIFICATION.md]] §3, [[DISCOVERY_SPECIFICATION.md]], [[DATA_LAYER.md]] §2

---

## 1. Types de playlists

| Type | Définition | Règles métier |
|---|---|---|
| Classique | Liste ordonnée constituée manuellement | Ajout/suppression/réorganisation manuels uniquement ([[QUEUE_SPECIFICATION.md]] §2 pour le mécanisme d'ajout) |
| Collaborative locale | Playlist modifiable par plusieurs utilisateurs d'un même serveur Jellyfin | Dépend du modèle de permissions Jellyfin — statut à confirmer techniquement avant engagement (non garanti pour la Phase 1 d'ingénierie, voir [[FEATURE_ROADMAP.md]]) |
| Intelligente / basée sur des règles | Contenu généré automatiquement selon des critères (genre, année, note, nombre d'écoutes) | Règles combinables en ET/OU, réévaluées à chaque ouverture — jamais figées au moment de la création |
| Automatique | Cas particulier de playlist intelligente avec des règles prédéfinies par Melodia (ex. « Ajouts du mois ») | Non modifiable dans ses règles, seulement dans son activation |
| Dynamique | Playlist dont le contenu change dans le temps sans action utilisateur (ex. Daily Mix) | Voir [[DISCOVERY_SPECIFICATION.md]] — mécanisme partagé, pas redéfini ici |
| IA (architecture prévue) | Génération assistée par un modèle, non implémentée en Phase 1 | Interface de règles conçue pour accueillir un critère « généré par IA » en façade sans réécriture — aucune dépendance IA engagée maintenant ([[ENGINEERING_GUIDE.md]] §1.1, pas de sur-conception) |
| Ambiance | Playlist thématique par atmosphère (calme, énergique, concentration) | Classification par tags de genre/tempo si disponibles dans les métadonnées, sinon constitution manuelle |
| Temporelle | Contenu qui varie selon le moment de la journée | Partage le moteur de règles avec les Daily Mix ([[DISCOVERY_SPECIFICATION.md]] §3) |
| Saisonnière | Playlist réévaluée selon la période de l'année | Même moteur de règles, critère temporel élargi (mois/saison plutôt qu'heure) |

**Principe transverse** : playlists intelligentes, automatiques, dynamiques, temporelles et saisonnières partagent un seul et même moteur de règles (critères + réévaluation) — cinq façades différentes sur un mécanisme unique, jamais cinq implémentations séparées (cohérent avec [[ENGINEERING_GUIDE.md]] §1.3, non-duplication).

## 2. Actions communes à toute playlist

Créer, renommer, réorganiser, supprimer (avec confirmation, [[PRODUCT_RULES.md]] §7), dupliquer, exporter (format à définir en conception détaillée), ajouter depuis n'importe quel contexte ([[PRODUCT_RULES.md]] §5).

## 3. Règles pour les playlists intelligentes

- Critères disponibles : genre, année, artiste, album, note/favoris, nombre d'écoutes, date d'ajout, durée, format, qualité audio — mêmes champs que la recherche avancée ([[SEARCH_SPECIFICATION.md]] §3), un seul vocabulaire de critères dans toute l'application.
- Limite de taille configurable (ex. « les 50 morceaux les plus écoutés ») ou illimitée.
- Ordre de tri configurable indépendamment des critères de sélection.
- Réévaluation : à l'ouverture de la playlist a minima ; réévaluation en arrière-plan périodique à définir en conception détaillée (coût de calcul à mesurer avant d'engager une fréquence, cohérent avec [[ENGINEERING_GUIDE.md]] §1.4, optimisation mesurée).

## 4. États

Voir [[EMPTY_STATES.md]] pour une playlist vide (classique sans titre ajouté, ou intelligente dont aucun morceau ne correspond aux règles — ces deux cas doivent être visuellement distincts, le second explique pourquoi).

## 5. Cas limites

- Playlist intelligente dont les règles ne correspondent à aucun morceau : état vide explicatif (« aucun morceau ne correspond à ces critères ») avec accès direct à la modification des règles.
- Suppression d'un morceau de la bibliothèque source (retiré côté Jellyfin) : retiré automatiquement de toutes les playlists qui le contenaient, sans erreur bloquante.
- Playlist collaborative avec conflit d'édition simultanée : comportement dépendant de la résolution de conflit générale non encore actée ([[ARCHITECTURE_PRINCIPLES.md]] §3.3) — statut ouvert.

---

## 6. Checklist de validation

- [ ] Les cinq variantes basées sur des règles (§1) partagent un seul moteur, vérifié explicitement.
- [ ] Le vocabulaire de critères est identique à celui de la recherche avancée, pas un second vocabulaire inventé.
- [ ] La playlist IA reste explicitement non engagée pour la Phase 1 d'ingénierie, pas présentée comme une fonctionnalité livrée.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 2) | Senior Product Manager / UX Research Lead |

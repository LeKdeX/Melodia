# FEATURE_BIBLE.md — Bible des fonctionnalités (synthèse Phase 1, volume 2)

> **Statut** : document fondateur, vivant — document de synthèse, ne fait pas autorité seul
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Chief Product Officer
> **Documents liés** : [[PRODUCT_BIBLE.md]] (volume 1), tous les documents listés ci-dessous

Point d'entrée unique pour le comportement fonctionnel de Melodia. Complète [[PRODUCT_BIBLE.md]] (le *pourquoi*) avec le *quoi précis* — chaque fonctionnalité, ses règles métier, ses états. **Ne fait pas autorité par lui-même** : le document source gagne toujours en cas d'écart (même principe que [[TECHNICAL_BLUEPRINT.md]] et [[PRODUCT_BIBLE.md]]).

---

## 1. Ce que ce volume ajoute au volume 1

[[PRODUCT_BIBLE.md]] définissait *pourquoi* Melodia existe et *pour qui*. Ce volume définit précisément *ce que le produit fait*, fonctionnalité par fonctionnalité, avec suffisamment de détail pour qu'une équipe d'ingénierie puisse implémenter sans redemander d'arbitrage produit.

## 2. Décision de gouvernance prise pendant ce volume

**Clarification de [[PRODUCT_RULES.md]] §10** : plusieurs fonctionnalités de ce volume (statistiques, Wrapped, découverte) nécessitent structurellement un historique d'écoute local. La règle a été précisée — pas assouplie — pour distinguer la télémétrie envoyée à un serveur (strictement opt-in, inchangé) de l'historique local qui ne quitte jamais l'appareil (activé par défaut, consultable et supprimable à tout moment). Voir [[PRODUCT_RULES.md]] §10 pour le texte complet.

## 3. Carte des spécifications

| Document | Domaine | Dépend de (fondation) |
|---|---|---|
| [[PLAYER_SPECIFICATION.md]] | Lecteur (formes, pochette dynamique, paroles, visualiseur) | [[AUDIO_ENGINE.md]] pour l'implémentation technique |
| [[QUEUE_SPECIFICATION.md]] | File d'attente | [[AUDIO_ENGINE.md]] §1 pour le modèle technique |
| [[SEARCH_SPECIFICATION.md]] | Recherche universelle | [[DATA_LAYER.md]] §3 (FlexSearch) |
| [[LIBRARY_SPECIFICATION.md]] | Bibliothèque, albums, artistes, favoris | [[JELLYFIN_INTEGRATION.md]] |
| [[PLAYLIST_SPECIFICATION.md]] | Playlists (classiques à IA-prête) | [[DATA_LAYER.md]] §2 |
| [[DISCOVERY_SPECIFICATION.md]] | Recommandations, Daily Mix | [[STATISTICS_SPECIFICATION.md]] (fondation historique) |
| [[STATISTICS_SPECIFICATION.md]] | Tableau de bord d'écoute | Fondation historique local, consommée par Discovery et Wrapped |
| [[WRAPPED_SPECIFICATION.md]] | Rétrospective locale partageable | [[STATISTICS_SPECIFICATION.md]] |
| [[SETTINGS_SPECIFICATION.md]] | Paramètres, notifications | Tous les domaines ci-dessus |
| [[ERROR_STATES.md]] | Tous les cas d'erreur | Transverse |
| [[EMPTY_STATES.md]] | Tous les états vides | Transverse |
| [[INTERACTION_GUIDELINES.md]] | Raccourcis, gestes, micro-interactions | [[UX_PRINCIPLES.md]] |
| [[FEATURE_ROADMAP.md]] | Priorisation + 50 fonctionnalités innovantes | Synthèse de tout ce qui précède |

## 4. Les cinq règles qui traversent toutes les spécifications

1. **Aucune fonctionnalité n'interrompt la musique en cours** sans action explicite ([[PRODUCT_RULES.md]] §2) — vérifié spécifiquement dans chaque document (file, recherche, bibliothèque).
2. **Tout historique local reste local** sauf action explicite de partage — la garantie qui rend Statistiques/Wrapped/Découverte compatibles avec [[PROJECT_CHARTER.md]] §4.
3. **Un état vide n'est jamais un état d'erreur, et inversement** — deux natures différentes, jamais confondues ([[EMPTY_STATES.md]] vs [[ERROR_STATES.md]]).
4. **Aucune fonctionnalité de ce volume ne copie mécaniquement un concurrent** — chacune a été confrontée à [[COMPETITIVE_ANALYSIS.md]] pour ce qu'il faut reproduire, éviter ou améliorer.
5. **Ce qui n'est pas encore tranché est signalé, jamais improvisé** — la synchronisation multi-appareils (file, conflits) reste un statut ouvert répété dans plusieurs documents plutôt que résolu différemment à chaque endroit.

## 5. Décisions produit encore ouvertes (consolidées)

Au-delà de celles déjà listées dans [[PRODUCT_BIBLE.md]] §7 :
- Comportement exact lors de la suppression de la piste en cours depuis la file ([[QUEUE_SPECIFICATION.md]] §8).
- Fréquence de réévaluation des playlists intelligentes et des Daily Mix (coût de calcul à mesurer avant d'engager un chiffre).
- Seuil exact de comptage d'une écoute pour les statistiques ([[STATISTICS_SPECIFICATION.md]] §2).
- Statut technique des playlists collaboratives locales, dépendant du modèle de permissions Jellyfin ([[PLAYLIST_SPECIFICATION.md]] §1).
- Source de données pour les paroles synchronisées ([[PLAYER_SPECIFICATION.md]] §6).

## 6. Ce que ce volume ne contient toujours pas

Aucune identité visuelle (`BRAND_BIBLE.md` toujours différé), aucun wireframe ou maquette, aucun engagement de calendrier au-delà des jalons de priorisation relative de [[FEATURE_ROADMAP.md]] (qui ne remplacent pas les phases d'ingénierie de `ROADMAP.md`).

---

## 7. Checklist de validation

- [ ] Chaque spécification de la carte (§3) a une checklist de validation propre, déjà vérifiée dans son propre document.
- [ ] Les cinq règles transverses (§4) ne sont contredites par aucune spécification individuelle.
- [ ] Les décisions ouvertes (§5) sont retirées dès qu'elles sont tranchées, jamais laissées obsolètes.

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 2) | Chief Product Officer |

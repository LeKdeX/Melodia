# FEATURE_ROADMAP.md — Priorisation des fonctionnalités (Phase 1, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Chief Product Officer / Senior Product Manager
> **Documents liés** : tous les documents de spécification listés dans [[FEATURE_BIBLE.md]], `ROADMAP.md`

> **Attention à la numérotation** : MVP/1.0/1.5/2.0/Vision long terme ci-dessous sont des **jalons produit** (quelles fonctionnalités existent), indépendants des **phases d'ingénierie** de `ROADMAP.md` (Phase 0/1/2/3/4, qui décrivent l'état du dépôt et de l'architecture). Un jalon produit « 1.0 » ne correspond pas mécaniquement à la « Phase 1 » d'ingénierie — les deux se recoupent mais ne sont pas synonymes, cohérent avec la mise en garde déjà actée dans `CLAUDE.md` sur la collision de nom « Phase 1 ».

---

## 1. Critères de priorisation

- **MVP** : sans cette fonctionnalité, le produit ne remplit pas sa mission ([[MISSION.md]]) — Melodia ne serait pas utilisable au quotidien.
- **1.0** : complète l'expérience premium promise par [[VISION.md]], attendue dès la première version publique.
- **1.5** : renforce la rétention et la différenciation, une fois l'usage quotidien validé.
- **2.0** : fonctionnalités avancées ou dépendant d'une brique architecturale non encore construite (plugins, second connecteur — [[EVOLVABILITY.md]]).
- **Vision long terme** : cohérentes avec le produit mais sans engagement de calendrier.

## 2. Priorisation par domaine

| Fonctionnalité | Jalon | Justification |
|---|---|---|
| Lecture de base, Mini/Compact Player ([[PLAYER_SPECIFICATION.md]] §2) | MVP | Cœur de la mission |
| File d'attente (ajout/suppression/réorganisation) ([[QUEUE_SPECIFICATION.md]] §2) | MVP | Aucune écoute quotidienne sans contrôle de ce qui va suivre |
| Recherche universelle ([[SEARCH_SPECIFICATION.md]]) | MVP | [[PRODUCT_RULES.md]] §4, non négociable |
| Bibliothèque (albums/artistes/morceaux/genres), vues grille/liste ([[LIBRARY_SPECIFICATION.md]] §1-2) | MVP | Navigation de base |
| Favoris ([[LIBRARY_SPECIFICATION.md]] §7) | MVP | Attente minimale de tout lecteur musical |
| Playlists classiques ([[PLAYLIST_SPECIFICATION.md]] §1) | MVP | |
| Paramètres audio/interface/Jellyfin de base ([[SETTINGS_SPECIFICATION.md]] §2-3, §6) | MVP | |
| États vides et d'erreur de base ([[EMPTY_STATES.md]], [[ERROR_STATES.md]]) | MVP | Une application sans ces états n'est pas terminée, [[DEFINITION_OF_DONE.md]] |
| Expanded/Fullscreen Player, pochette dynamique ([[PLAYER_SPECIFICATION.md]] §2, §4) | 1.0 | Différenciation visuelle forte dès le lancement public |
| Playlists intelligentes/basées règles ([[PLAYLIST_SPECIFICATION.md]] §1) | 1.0 | Attendu par le collectionneur/passionné ([[PERSONAS.md]] §3, §5) |
| Vue bibliothèque compacte/immersive ([[LIBRARY_SPECIFICATION.md]] §1) | 1.0 | |
| Historique d'écoute local + statistiques de base ([[STATISTICS_SPECIFICATION.md]]) | 1.0 | Fondation nécessaire à Wrapped/Discovery |
| Égaliseur, crossfade, ReplayGain ([[AUDIO_ENGINE.md]] §4-6) | 1.0 | Attente de l'audiophile ([[PERSONAS.md]] §2) |
| Téléchargements hors ligne ([[SETTINGS_SPECIFICATION.md]] §5) | 1.0 | Recoupe la Phase 2 d'ingénierie (mode hors ligne complet, `ROADMAP.md`) |
| Recommandations locales, Daily Mix ([[DISCOVERY_SPECIFICATION.md]]) | 1.5 | Nécessite un historique d'écoute déjà constitué pour être pertinent |
| Wrapped ([[WRAPPED_SPECIFICATION.md]]) | 1.5 | Nécessite plusieurs mois d'historique pour avoir du sens |
| Visualiseur audio, Mode cinématique ([[PLAYER_SPECIFICATION.md]] §7-8) | 1.5 | Différenciation, pas essentiel à l'usage quotidien |
| Playlists ambiance/temporelles/saisonnières ([[PLAYLIST_SPECIFICATION.md]] §1) | 1.5 | Étend le moteur de règles déjà livré en 1.0 |
| Paroles synchronisées ([[PLAYER_SPECIFICATION.md]] §6) | 1.5-2.0 | Dépend d'une décision de source de données non tranchée |
| Playlists collaboratives locales ([[PLAYLIST_SPECIFICATION.md]] §1) | 2.0 | Dépend du modèle de permissions Jellyfin, à valider techniquement |
| Système de plugins, second connecteur | 2.0 | Recoupe directement la Phase 3 d'ingénierie ([[EVOLVABILITY.md]] §10) |
| Playlist « IA » | Vision long terme | Architecture prête ([[PLAYLIST_SPECIFICATION.md]] §1), aucune dépendance engagée |
| Commandes vocales | Vision long terme | Dépend d'une intégration système non évaluée ([[INTERACTION_GUIDELINES.md]] §5) |

---

## 3. Cinquante fonctionnalités innovantes

Chaque idée est réaliste dans une architecture locale au-dessus de Jellyfin, ne copie le mécanisme d'aucun concurrent analysé, et respecte [[PRODUCT_RULES.md]] (notamment §10 — aucune n'introduit de dépendance à un service tiers).

| # | Fonctionnalité | Problème résolu | Bénéfice utilisateur | Faisabilité | Contrainte principale | Priorité |
|---|---|---|---|---|---|---|
| 1 | Minuteur de sommeil intelligent | Écouter en s'endormant sans laisser tourner toute la nuit | Confort, sobriété énergétique | Élevée | Fondu, pas coupure brutale ([[PRODUCT_RULES.md]] §3) | 1.0 |
| 2 | Crossfade contextuel (actif seulement au sein d'un même album/énergie) | Le crossfade actuel est tout-ou-rien | Transitions plus naturelles | Moyenne | Détection de continuité album/tempo | 1.5 |
| 3 | Reprise contextuelle par appareil | La reprise globale n'a pas toujours de sens si on interrompt sur un appareil précis | Continuité plus fine | Moyenne | Dépend de l'ADR de sync ([[EXTREME_SCENARIOS.md]] §5) | 2.0 |
| 4 | Badge « jamais réécouté » discret sur les pochettes | Redécouverte passive | Renforce la mission de redécouverte ([[VISION.md]]) | Élevée | Historique local actif | 1.5 |
| 5 | Regroupement en « sessions d'écoute » consultables | L'historique brut est peu lisible | Retrouver une ambiance d'un moment précis | Moyenne | Heuristique de segmentation temporelle | 2.0 |
| 6 | Comparateur d'éditions/masters multiples | Bibliothèques avec doublons d'albums remasterisés | Choisir une édition préférée sans confusion | Moyenne | Détection de similarité de métadonnées | 1.5 |
| 7 | Radio locale démarrée depuis un passage précis d'un morceau | La radio par similarité ignore la position d'écoute | Découverte plus précise | Faible-moyenne | Nécessite une analyse de segment, pas juste de morceau entier | Vision long terme |
| 8 | Export du journal d'écoute (Markdown/CSV) | Envie de tenir un journal personnel externe | Portabilité de la donnée, cohérent avec la propriété ([[PRODUCT_VALUES.md]]) | Élevée | Aucune | 1.5 |
| 9 | Mode « Concert » (verrouillage anti-geste accidentel, notifications coupées) | Écoute en poche pendant un trajet | Évite les interruptions accidentelles | Élevée | Aucune | 1.5 |
| 10 | Aperçu d'énergie visuelle d'une playlist avant lecture | Choisir une playlist sans la lancer à l'aveugle | Décision plus rapide | Moyenne | Nécessite une donnée de tempo/énergie par piste | 2.0 |
| 11 | Marque-pages dans un morceau long (live, classique) | Revenir à un passage précis d'un morceau de 20+ minutes | Confort pour l'auditeur de musique classique/live | Moyenne | Stockage de positions nommées par piste | 1.5 |
| 12 | Détection de doublons (même morceau, qualités différentes) | Bibliothèques accumulées sur des années | Nettoyage assisté, jamais automatique | Moyenne | Heuristique de correspondance de métadonnées | 1.5 |
| 13 | Correction locale de métadonnées incorrectes (overlay client, sans modifier le serveur) | Métadonnées Jellyfin parfois incomplètes | Bibliothèque plus juste sans dépendre d'une réindexation serveur | Moyenne | Ne doit jamais masquer silencieusement une incohérence réelle | 2.0 |
| 14 | Export de playlist au format M3U | Usage externe (autre lecteur, gravure) | Portabilité | Élevée | Aucune | 1.0 |
| 15 | Widget desktop flottant minimaliste | Contrôle rapide sans re-basculer sur l'application complète | Confort pour l'utilisateur desktop ([[PERSONAS.md]] §7) | Moyenne | Fenêtre système dédiée (Tauri) | 1.5 |
| 16 | « Écouter comme [artiste] » (mix d'artistes similaires internes) | Envie de varier sans perdre le fil de goût | Découverte guidée | Moyenne | Partage le moteur de [[DISCOVERY_SPECIFICATION.md]] | 1.5 |
| 17 | Indicateur de qualité audio en temps réel dans le lecteur | L'audiophile veut savoir ce qu'il écoute réellement | Transparence, confiance | Élevée | Donnée déjà disponible via les métadonnées de fichier | 1.0 |
| 18 | Notation par étoiles en complément des favoris binaires | Le binaire favori/non-favori est trop grossier pour le collectionneur | Granularité de classement | Moyenne | Nouveau champ de donnée locale | 1.5 |
| 19 | « Capsule temporelle » — ce qui était écouté il y a exactement un an | Nostalgie, redécouverte | Moment de surprise agréable et récurrent | Élevée | Historique d'un an minimum disponible | 1.5 |
| 20 | Import de scrobbles historiques (Last.fm) pour amorcer les statistiques | Un nouvel utilisateur n'a pas d'historique Melodia | Statistiques utiles dès le premier jour | Moyenne | Dépendance à un format d'import externe, jamais une connexion permanente | 2.0 |
| 21 | Comparaison de bibliothèques entre plusieurs serveurs connectés | Utilisateur avec plusieurs serveurs Jellyfin ([[PERSONAS.md]]) | Visibilité sur les recoupements/écarts | Faible | Coûteux à calculer à grande échelle | Vision long terme |
| 22 | Mode Focus (lecteur minimal + minuteur de concentration) | Écoute pendant le travail | Réduction de distraction, cohérent avec [[PRODUCT_VALUES.md]] §4 | Élevée | Aucune | 1.5 |
| 23 | Tag d'humeur manuel en un geste pendant l'écoute | Alimente les mixes d'ambiance sans dépendre uniquement de métadonnées de genre | Mixes ambiance plus pertinents | Moyenne | Nouveau champ de donnée locale | 2.0 |
| 24 | Visibilité (lecture seule) de ce qui joue sur un autre appareil du foyer | Usage familial multi-appareils | Coordination sans friction | Faible-moyenne | Dépend de la synchronisation multi-appareils non encore actée | 2.0 |
| 25 | Contrôle à distance opt-in entre appareils du même compte | Extension de #24 | Confort pour un usage type « enceinte du salon » | Faible | Même dépendance que #24, plus complexe | Vision long terme |
| 26 | Pochette de secours stylée générée localement (pas juste un carré neutre) | Pochettes manquantes fréquentes sur certaines bibliothèques | Cohérence visuelle même en cas de métadonnée manquante | Moyenne | Génération locale déterministe à partir du nom | 1.0 |
| 27 | Alerte de nouvel ajout d'un artiste épinglé | Suivre activement les artistes qu'on aime | Réactivité sans dépendre d'un flux d'actualité externe | Moyenne | Détection au moment de la synchronisation incrémentale | 1.5 |
| 28 | Frise chronologique navigable de la bibliothèque par année de sortie | Exploration par époque | Nouvelle façon de (re)découvrir sa collection | Moyenne | Nécessite des métadonnées d'année fiables | 2.0 |
| 29 | « CD virtuel » — sélection avec durée totale affichée façon gravure | Nostalgie de la mixtape/du CD compilé | Plaisir de curation | Élevée | Aucune, calcul de durée simple | Vision long terme |
| 30 | Signalement de silence/anomalie dans un fichier mal transcodé | Fichiers de bibliothèque parfois corrompus silencieusement | Qualité perçue de la bibliothèque | Faible | Analyse audio coûteuse, à réserver à une action explicite | Vision long terme |
| 31 | Priorisation automatique de la meilleure qualité disponible en cas de doublon | Bibliothèques avec plusieurs qualités du même morceau | Toujours la meilleure expérience sans choix manuel | Moyenne | Dépend de #12 (détection de doublons) | 2.0 |
| 32 | Filigrane d'ambiance discret selon l'heure du jour en Fullscreen Player | Renforce le lien entre écoute et moment de la journée | Détail premium discret | Faible | Purement esthétique, à valider avec un futur BRAND_BIBLE | Vision long terme |
| 33 | Recherche par fredonnement | Retrouver un morceau dont on ne connaît pas le nom | Fonctionnalité différenciante forte | Faible | Nécessite un modèle local coûteux, hors périmètre actuel | Vision long terme |
| 34 | Widget permanent de carte d'identité musicale (Wrapped à la demande, pas seulement annuel) | [[WRAPPED_SPECIFICATION.md]] §6 le prévoit en partie | Gratification plus fréquente | Moyenne | Recalcul à la demande, coût CPU à mesurer | 2.0 |
| 35 | File d'attente partagée d'une soirée (mode invité local, sans compte séparé) | Usage social en local (soirée, repas) | Expérience conviviale sans complexité de compte | Faible-moyenne | Nécessite un mode d'accès temporaire sécurisé | Vision long terme |
| 36 | Mix « douceur du matin » basé sur le tempo | Extension du Daily Mix ([[DISCOVERY_SPECIFICATION.md]] §3) | Personnalisation fine du réveil | Moyenne | Dépend de données de tempo | 1.5 |
| 37 | Alerte de fichier à risque (bitrate très bas) avec suggestion de meilleure source si dupliquée | Qualité audio dégradée passée inaperçue | Confiance pour l'audiophile | Moyenne | Dépend de #12 | 2.0 |
| 38 | Rapport de bibliothèque (statistiques globales de la collection) | Curiosité du collectionneur sur sa propre collection | Vision d'ensemble valorisante | Élevée | Calcul simple sur les métadonnées déjà disponibles | 1.0 |
| 39 | Thème saisonnier discret et optionnel | Petite touche de personnalisation périodique | Sentiment de produit vivant sans surcharge | Faible | Dépend d'une future identité visuelle (BRAND_BIBLE) | Vision long terme |
| 40 | Historique de recherche consultable et effaçable séparément de l'historique d'écoute | Deux natures de données différentes actuellement non distinguées | Contrôle granulaire de la confidentialité ([[PRODUCT_RULES.md]] §10) | Élevée | Aucune | 1.0 |
| 41 | Suggestions de nettoyage (jamais écouté depuis longtemps) | Bibliothèques qui grossissent sans jamais être triées | Aide à la décision, jamais une suppression automatique | Moyenne | Dépend de l'historique d'écoute | 1.5 |
| 42 | Playlist d'anniversaire d'ajout à la bibliothèque | Redécouverte liée à une date personnelle | Moment de surprise récurrent, faible coût | Élevée | Aucune | 1.5 |
| 43 | Overlay de comparaison entre deux périodes dans les statistiques | Comprendre l'évolution de ses goûts | Renforce la valeur du tableau de bord ([[STATISTICS_SPECIFICATION.md]] §3) | Moyenne | Calcul de delta entre deux agrégats | 1.5 |
| 44 | Reprise de lecture avec aperçu visuel avant confirmation (pas automatique silencieuse) | Parfois on ne veut pas reprendre exactement où on s'est arrêté | Contrôle explicite sans perdre le confort de la reprise | Moyenne | Ajout d'une étape de confirmation optionnelle | 1.5 |
| 45 | Export d'une sélection en fichier audio unique concaténé | Trajet, gravure, usage hors application | Confort avancé pour un besoin ponctuel réel | Faible-moyenne | Traitement audio côté client, coût CPU non négligeable | Vision long terme |
| 46 | Carte visuelle des collaborations entre artistes de la bibliothèque | Exploration des liens entre artistes possédés | Découverte structurelle de sa propre collection | Faible | Nécessite des métadonnées de crédits riches et fiables | Vision long terme |
| 47 | Alerte proactive de dépréciation d'API Jellyfin (zone Labs/Debug) | Rupture de compatibilité identifiée comme risque ([[PROJECT_CHARTER.md]] §5) | Anticipation plutôt que découverte après coup | Moyenne | Dépend d'un canal d'information sur les versions Jellyfin | 2.0 |
| 48 | Palette de couleurs figée par préférence utilisateur (alternative à la palette dynamique) | Certains utilisateurs préfèrent la cohérence à la personnalisation par pochette | Choix respecté, pas une esthétique imposée | Élevée | Simple bascule de configuration | 1.0 |
| 49 | Sous-titre de contexte discret sur le Mini Player (source de la lecture en cours) | On perd parfois le fil de pourquoi ce morceau joue | Clarté, cohérent avec la transparence produit | Élevée | Donnée déjà disponible (contexte de lecture, [[STATISTICS_SPECIFICATION.md]] §2) | 1.0 |
| 50 | Geste universel d'annulation de la dernière action destructive | Filet de sécurité au-delà de la simple confirmation ([[PRODUCT_RULES.md]] §7) | Confiance accrue dans la manipulation de sa bibliothèque | Moyenne | Nécessite une pile d'annulation transverse à toute l'application | 1.5 |

---

## 4. Comparaison systématique avec le marché (synthèse de l'auto-revue)

| Domaine | Référence marché la plus forte | Position de Melodia après ce volume |
|---|---|---|
| Lecteur et continuité | Plexamp | Équivalent ou supérieur en formes du lecteur (§2 de [[PLAYER_SPECIFICATION.md]]), sans dépendance Plex |
| Recherche | Spotify | Budget et exhaustivité des champs équivalents ([[SEARCH_SPECIFICATION.md]]) |
| Statistiques/Wrapped | Spotify | Fonctionnalité équivalente, entièrement locale — aucun concurrent auto-hébergé analysé ne le propose |
| Découverte | Spotify (algorithmique), Plexamp (radio locale) | Architecture hybride qui combine les deux approches sans dépendance externe |
| Gestion de bibliothèque avancée | MusicBee | Couverture fonctionnelle proche, sans la densité d'interface qui nuit à l'accessibilité premium |
| Personnalisation | Symfonium | Personnalisation forte prévue, sans sacrifier une expérience par défaut cohérente ([[COMPETITIVE_ANALYSIS.md]] §12) |
| Métadonnées enrichies (crédits, artistes similaires) | Roon | Ambition équivalente sans la densité d'interface technique de Roon |

**Aucun oubli majeur identifié** par rapport aux domaines fonctionnels des neuf produits comparés — les seules zones volontairement hors périmètre (vidéo, contenu multi-médias, réseau social public) sont déjà actées comme telles dans [[PROJECT_CHARTER.md]] §4.

---

## 5. Checklist de validation

- [ ] Chaque fonctionnalité déjà spécifiée dans un document de la Phase 1 volume 2 a un jalon assigné.
- [ ] Chacune des 50 fonctionnalités innovantes a les cinq champs demandés (problème, bénéfice, faisabilité, contrainte, priorité).
- [ ] Aucune fonctionnalité innovante ne copie le mécanisme exact d'un concurrent — vérifié par comparaison avec [[COMPETITIVE_ANALYSIS.md]].
- [ ] Aucune fonctionnalité n'introduit de dépendance à un service tiers non auto-hébergeable, cohérent avec [[PROJECT_CHARTER.md]] §4.

---

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 2) | Chief Product Officer / Senior Product Manager |

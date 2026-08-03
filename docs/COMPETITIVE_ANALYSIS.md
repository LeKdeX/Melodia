# COMPETITIVE_ANALYSIS.md — Analyse concurrentielle (Phase 1)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Product Strategist / UX Researcher (avec les experts produits par plateforme)
> **Documents liés** : [[VISION.md]], [[PRODUCT_VALUES.md]], [[UX_PRINCIPLES.md]]

> **Avertissement d'honnêteté (obligatoire, cohérent avec `CLAUDE.md`)** : cette analyse s'appuie sur la connaissance générale de ces produits telle qu'elle existait à la formation du modèle (coupure de connaissance janvier 2026), **pas sur une vérification en direct des versions actuelles**. Les interfaces évoluent en continu — avant toute décision de conception qui s'appuie fortement sur un point précis ci-dessous, une vérification manuelle de l'état actuel du produit concerné est recommandée. Ceci est signalé explicitement plutôt que présenté comme un audit à jour.

---

## 1. Jellyfin (client web natif) — la référence à dépasser

| Dimension | Évaluation |
|---|---|
| Qualité d'interface | Fonctionnelle, orientée médias généralistes (films/séries/musique traités de façon similaire) |
| Qualité UX musique | Faible — la musique est un onglet parmi d'autres, pas une expérience dédiée |
| Qualité audio | Correcte (dépend du transcodage serveur), pas de traitement audio avancé côté client |
| Fonctionnalités musique | Bibliothèque, playlists basiques, pas de moteur de recherche flou avancé ni de découverte interne |
| Navigation | Orientée dossiers/bibliothèque, peu adaptée à un parcours d'écoute quotidien |
| Recherche | Fonctionnelle mais lente perçue, pas de recherche floue tolérante aux fautes |
| Lecteur | Persistant mais visuellement secondaire par rapport au contenu vidéo |
| Accessibilité | Correcte au niveau du framework, non spécifiquement optimisée pour un usage musical au clavier |
| Personnalisation | Minimale |

**À reproduire** : la fiabilité de la synchronisation avec le serveur, la richesse des métadonnées exposées par l'API.
**À éviter** : traiter la musique comme un sous-ensemble de la vidéo ; navigation orientée fichiers plutôt qu'écoute.
**À améliorer** : tout — c'est exactement le vide que Melodia comble ([[VISION.md]] §3).

---

## 2. Plexamp — la référence de qualité d'exécution la plus proche

| Dimension | Évaluation |
|---|---|
| Qualité d'interface | Excellente — considéré comme l'un des lecteurs auto-hébergés les plus soignés visuellement |
| Qualité UX | Très bonne — animations fluides (Waveform, transitions de couleur dynamiques par pochette), lecteur toujours présent |
| Qualité audio | Excellente — gapless natif, crossfade, ReplayGain, Sonic Analysis pour le DJ automatique |
| Fonctionnalités | Radio locale basée sur la bibliothèque, DJ automatique, visualiseur, statistiques d'écoute |
| Navigation | Fluide, orientée « ambiance » (radios générées) autant qu'orientée catalogue |
| Recherche | Rapide, tolérante |
| Lecteur | Modèle de référence — persistant, riche visuellement, jamais intrusif |
| Performance | Très bonne sur des bibliothèques de taille moyenne à grande |
| Accessibilité | Correcte sans être exemplaire |
| Personnalisation | Thèmes de couleur dynamiques par pochette, peu de personnalisation structurelle |

**À reproduire** : la présence permanente et soignée du lecteur, les transitions visuelles liées à la pochette en cours, le gapless/crossfade natif ([[AUDIO_ENGINE.md]] s'en inspire directement), la radio générée depuis sa propre bibliothèque (piste d'inspiration pour une fonctionnalité de découverte interne, voir [[USER_JOURNEYS.md]] parcours « découverte »).
**À éviter** : la dépendance à l'écosystème Plex (comptes, fonctionnalités cloud) pour des capacités qui devraient être locales.
**À améliorer** : Plexamp reste lié à Plex — Melodia peut offrir l'équivalent sans jamais dépendre d'un compte ou d'un service tiers non auto-hébergé ([[PROJECT_CHARTER.md]] §4).

---

## 3. Spotify — la référence d'expérience commerciale

| Dimension | Évaluation |
|---|---|
| Qualité d'interface | Excellente — un des standards du marché |
| Qualité UX | Excellente — micro-interactions soignées, transitions fluides, recherche quasi instantanée |
| Qualité audio | Bonne mais compressée (streaming avec perte selon le forfait) |
| Fonctionnalités | Recommandations algorithmiques puissantes, playlists collaboratives, Discover Weekly, contenu éditorialisé |
| Navigation | Extrêmement fluide, orientée découverte permanente |
| Recherche | Quasi instantanée, tolérante aux fautes, résultats pertinents multi-catégories |
| Lecteur | Persistant, compact, efficace |
| Performance | Excellente sur toutes les échelles de catalogue (catalogue géré côté serveur, pas de contrainte locale) |
| Accessibilité | Bon niveau, investissement continu documenté par l'entreprise |
| Personnalisation | Thèmes limités, personnalisation principalement algorithmique (contenu, pas interface) |

**À reproduire** : la fluidité perçue de la recherche (référence directe pour le budget < 100 ms, [[PERFORMANCE_BUDGET.md]] §2) ; la qualité des micro-interactions et transitions ; l'efficacité du lecteur persistant compact.
**À éviter** : la pression de découverte permanente (notifications, contenu poussé) — contraire à la valeur « le silence est une fonctionnalité » ([[PRODUCT_VALUES.md]] §4) ; le modèle d'abonnement et la dépendance au catalogue licencié.
**À améliorer** : Spotify n'a structurellement aucune notion de bibliothèque personnelle possédée — c'est l'angle mort total que Melodia occupe.

---

## 4. Apple Music

| Dimension | Évaluation |
|---|---|
| Qualité d'interface | Très bonne, cohérente avec l'écosystème Apple |
| Qualité UX | Bonne, parfois dense (beaucoup d'entrées de menu, navigation par onglets chargée) |
| Qualité audio | Excellente — Lossless et Spatial Audio nativement intégrés, référence qualité du marché commercial |
| Fonctionnalités | Paroles synchronisées de haute qualité, bibliothèque personnelle intégrée au catalogue (upload possible) |
| Navigation | Correcte, parfois moins intuitive que Spotify pour retrouver un contenu précis |
| Recherche | Bonne, moins instantanée perçue que Spotify |
| Lecteur | Bon, moins visuellement marquant que Plexamp/Spotify |
| Performance | Bonne sur Apple, plus inégale sur les autres plateformes |
| Accessibilité | Très bon niveau (VoiceOver natif, standard élevé de l'écosystème) |
| Personnalisation | Limitée |

**À reproduire** : l'intégration soignée des paroles synchronisées (fonctionnalité à évaluer pour Melodia si les métadonnées Jellyfin le permettent) ; le niveau d'exigence sur la qualité audio (Lossless comme attente par défaut, pas une option cachée).
**À éviter** : la densité de navigation par onglets qui dilue la fonction principale (écouter).
**À améliorer** : aucune notion de propriété locale réelle malgré la fonction d'upload — reste un service, pas une bibliothèque possédée.

---

## 5. Roon — la référence audiophile technique

| Dimension | Évaluation |
|---|---|
| Qualité d'interface | Dense, orientée métadonnées et données techniques (fréquence d'échantillonnage, profondeur binaire visibles en permanence) |
| Qualité UX | Puissante mais avec une courbe d'apprentissage réelle |
| Qualité audio | Référence du marché — DSP avancé, correction de room, multi-room natif |
| Fonctionnalités | Métadonnées enrichies (biographies, crédits détaillés), intégration Tidal/Qobuz, multi-room |
| Navigation | Orientée exploration profonde du catalogue (crédits, personnel de studio, liens entre artistes) |
| Recherche | Bonne, secondaire par rapport à la navigation par exploration |
| Performance | Nécessite un serveur dédié (Roon Core) — architecture plus lourde que Melodia ne veut l'être |
| Accessibilité | Non prioritaire dans la conception du produit historiquement |
| Personnalisation | Élevée pour l'audio (DSP, zones), faible pour l'interface |

**À reproduire** : le sérieux porté à la qualité et la richesse des métadonnées ; le multi-room comme direction d'évolution possible (hors périmètre actuel, voir [[PROJECT_CHARTER.md]] §4) ; l'idée qu'une bibliothèque personnelle mérite une exploration aussi riche qu'un catalogue commercial.
**À éviter** : la densité d'information technique permanente à l'écran — contraire à « dense mais jamais chargé » ([[PRODUCT_VALUES.md]] §6) ; l'architecture lourde nécessitant un serveur Core dédié en plus du serveur média.
**À améliorer** : Roon prouve qu'un public existe pour une expérience premium au-dessus d'une bibliothèque possédée — Melodia vise ce même public sans la complexité d'installation ni le coût d'abonnement Roon.

---

## 6. TIDAL

| Dimension | Évaluation |
|---|---|
| Qualité d'interface | Bonne, orientée mise en avant de la qualité audio (Hi-Fi, Master) |
| Qualité UX | Bonne, moins raffinée que Spotify sur la fluidité perçue |
| Qualité audio | Excellente (Hi-Fi Plus, MQA historique puis codecs sans perte) |
| Fonctionnalités | Contenu éditorial artiste, vidéos musicales intégrées |
| Navigation | Correcte |
| Recherche | Bonne |
| Performance | Correcte |
| Accessibilité | Standard, sans particularité notable |
| Personnalisation | Limitée |

**À reproduire** : la mise en avant assumée de la qualité audio comme argument central, pas une option secondaire enterrée dans les paramètres.
**À éviter** : rien de spécifiquement problématique, mais aucune différenciation forte au-delà de la qualité audio — un rappel que la qualité seule ne suffit pas à créer une identité produit forte ([[PRODUCT_VALUES.md]]).
**À améliorer** : même limite structurelle que les autres plateformes commerciales — pas de bibliothèque possédée.

---

## 7. Deezer

| Dimension | Évaluation |
|---|---|
| Qualité d'interface | Correcte, moins distinctive que Spotify/Apple Music |
| Qualité UX | Correcte |
| Qualité audio | Bonne (HiFi disponible) |
| Fonctionnalités | Flow (radio personnalisée), reconnaissance de morceau intégrée |
| Navigation | Correcte |
| Recherche | Correcte |
| Performance | Correcte |
| Accessibilité | Standard |
| Personnalisation | Limitée |

**À reproduire** : rien de suffisamment distinctif pour justifier une inspiration directe — Deezer illustre plutôt le risque de ne pas avoir d'identité produit forte malgré une exécution correcte.
**À éviter** : la fonctionnalité comme argument de vente principal sans cohérence d'ensemble ressentie.
**À améliorer** : n/a pour Melodia — cette analyse sert surtout de garde-fou (« ne pas finir aussi générique »).

---

## 8. YouTube Music

| Dimension | Évaluation |
|---|---|
| Qualité d'interface | Correcte, héritée de l'identité YouTube plus que pensée pour la musique |
| Qualité UX | Inégale — de bonnes fonctionnalités de découverte (versions live, remix, contenu introuvable ailleurs) mais une navigation parfois confuse entre contenu musical et vidéo |
| Qualité audio | Correcte, non prioritaire dans le positionnement du produit |
| Fonctionnalités | Catalogue le plus large en volume (grâce à l'upload utilisateur tiers), recommandations fortes |
| Navigation | Inégale |
| Recherche | Très bonne en volume de résultats, moins précise en pertinence musicale pure |
| Performance | Correcte |
| Accessibilité | Standard |
| Personnalisation | Limitée |

**À reproduire** : rien de structurellement transférable — la force de YouTube Music (volume de catalogue tiers) est justement ce que Melodia n'a pas vocation à avoir.
**À éviter** : la confusion d'identité entre plusieurs types de contenus au sein d'une même navigation.
**À améliorer** : n/a directement, sert de contre-exemple sur la clarté d'identité produit.

---

## 9. MusicBee — référence desktop local, gestion de bibliothèque

| Dimension | Évaluation |
|---|---|
| Qualité d'interface | Fonctionnelle, dense, orientée power user Windows |
| Qualité UX | Bonne pour un public technique, pas immédiatement accessible à un usage occasionnel |
| Qualité audio | Très bonne — égaliseur avancé, ReplayGain, gapless |
| Fonctionnalités | Gestion de tags très poussée, synchronisation d'appareils, plugins |
| Navigation | Orientée bibliothèque locale (arborescence, tags) |
| Recherche | Bonne, orientée filtres avancés |
| Performance | Excellente sur de très grandes bibliothèques locales (référence pertinente pour [[PERFORMANCE_BUDGET.md]]) |
| Accessibilité | Non prioritaire historiquement |
| Personnalisation | Très élevée (thèmes, plugins, disposition) |

**À reproduire** : la robustesse de gestion de bibliothèques volumineuses et de métadonnées complexes ; la richesse des options d'égaliseur/audio pour l'utilisateur avancé, proposées sans jamais s'imposer par défaut ([[AUDIO_ENGINE.md]] §6, activation opt-in).
**À éviter** : la densité d'interface qui rend le produit intimidant pour un usage occasionnel — MusicBee est puissant mais pas premium au sens de [[VISION.md]] §8.
**À améliorer** : aucune notion de design premium ou d'expérience émotionnelle — puissance fonctionnelle sans soin de l'expérience.

---

## 10. foobar2000 — référence de performance et de légèreté

| Dimension | Évaluation |
|---|---|
| Qualité d'interface | Minimaliste par défaut, extensible à l'infini par composants tiers |
| Qualité UX | Variable selon la configuration — excellent pour qui l'a configuré, austère par défaut |
| Qualité audio | Référence historique de traitement audio bas niveau, très large support de formats |
| Fonctionnalités | Modulaire à l'extrême (DSP, formats, sources) |
| Navigation | Minimale par défaut |
| Recherche | Configurable, puissante une fois paramétrée |
| Performance | Référence absolue de légèreté et de rapidité, y compris sur du matériel ancien |
| Accessibilité | Non prioritaire |
| Personnalisation | Maximale (interface entièrement reconstructible) |

**À reproduire** : l'obsession de la performance et de la légèreté — foobar2000 est la preuve qu'un lecteur peut être instantané même sur du matériel modeste, référence directe pour la discipline de [[PERFORMANCE_GUIDE.md]].
**À éviter** : l'absence totale d'opinion de design par défaut — foobar2000 délègue l'expérience à l'utilisateur plutôt que d'en proposer une excellente d'emblée, à l'opposé de l'ambition « premium par défaut » de Melodia.
**À améliorer** : aucune expérience out-of-the-box comparable à ce que Melodia vise — la performance seule ne fait pas un produit premium.

---

## 11. Finamp — client Jellyfin dédié à la musique (mobile-first)

| Dimension | Évaluation |
|---|---|
| Qualité d'interface | Correcte, en nette amélioration continue, encore en retrait sur le raffinement face à Plexamp |
| Qualité UX | Bonne pour un projet communautaire — téléchargement hors ligne robuste, file d'attente solide |
| Qualité audio | Correcte, gapless disponible |
| Fonctionnalités | Téléchargement hors ligne, multi-serveurs Jellyfin |
| Navigation | Correcte, orientée mobile |
| Recherche | Correcte |
| Performance | Bonne sur mobile |
| Accessibilité | Standard |
| Personnalisation | Thèmes basiques |

**À reproduire** : la preuve qu'un client Jellyfin dédié à la musique répond à une demande réelle (validation directe du positionnement de Melodia) ; la solidité du téléchargement hors ligne et du multi-serveurs, déjà alignée avec [[JELLYFIN_INTEGRATION.md]] §6 et [[DATA_LAYER.md]].
**À éviter** : rester perçu comme « un client Jellyfin » plutôt qu'un produit à identité propre — c'est précisément l'écueil que [[VISION.md]] et [[PRODUCT_VALUES.md]] visent à éviter pour Melodia.
**À améliorer** : le niveau de raffinement visuel et de personnalité produit, où Melodia doit se positionner nettement au-dessus.

---

## 12. Symfonium — client Jellyfin/Subsonic dédié, orienté personnalisation

| Dimension | Évaluation |
|---|---|
| Qualité d'interface | Bonne, très configurable (choix de la densité d'affichage, des vues) |
| Qualité UX | Bonne, la personnalisation poussée peut fragmenter l'expérience par défaut |
| Qualité audio | Bonne, gapless et égaliseur disponibles |
| Fonctionnalités | Compatible Jellyfin **et** Subsonic/Navidrome — validation directe de l'approche multi-source de [[ARCHITECTURE_PRINCIPLES.md]] §2 |
| Navigation | Très personnalisable |
| Recherche | Bonne |
| Performance | Bonne |
| Accessibilité | Standard |
| Personnalisation | Très élevée |

**À reproduire** : la validation du marché pour une abstraction multi-source (Jellyfin + Subsonic-compatible) — confirme que l'objectif d'évolutivité de [[PROJECT_CHARTER.md]] §3.9 répond à une attente réelle, pas hypothétique.
**À éviter** : une personnalisation si poussée qu'elle dilue une expérience par défaut cohérente — Melodia doit offrir une excellente expérience *out of the box*, la personnalisation en supplément, jamais en prérequis.
**À améliorer** : le niveau de finition visuelle et l'identité de marque, comparable au constat sur Finamp.

---

## 13. Navidrome — serveur alternatif compatible Subsonic, référence d'architecture légère

Navidrome est un serveur, pas un client — inclus ici parce qu'il valide un axe stratégique : c'est la preuve qu'un écosystème auto-hébergé alternatif à Jellyfin existe et grandit (protocole Subsonic), pertinent pour [[EVOLVABILITY.md]] (second connecteur `MusicSource`) et [[ARCHITECTURE_PRINCIPLES.md]] §2. Son propre client web intégré est fonctionnel mais minimal — pas un concurrent d'expérience, un signal de marché sur la demande multi-source.

**À retenir** : la compatibilité Subsonic est un standard de facto de l'auto-hébergement musical au-delà de Jellyfin seul — argument supplémentaire pour ne jamais coupler l'architecture de Melodia trop étroitement aux spécificités de l'API Jellyfin ([[ARCHITECTURE_PRINCIPLES.md]] §2.1).

---

## 14. Synthèse : ce que Melodia doit être au regard du marché

| Ce que les meilleurs font | Qui le fait le mieux | Ce que Melodia en retient |
|---|---|---|
| Recherche quasi instantanée | Spotify | Budget < 100 ms engagé ([[PERFORMANCE_BUDGET.md]] §2) |
| Lecteur permanent et soigné | Plexamp | Provider global unique, jamais interrompu ([[FRONTEND_ARCHITECTURE.md]] §6, [[PRODUCT_RULES.md]]) |
| Qualité et richesse des métadonnées | Roon, Apple Music | Mapping riche depuis Jellyfin, jamais de perte silencieuse ([[ARCHITECTURE_PRINCIPLES.md]] §2.2) |
| Performance et légèreté | foobar2000 | Discipline de budget systématique ([[PERFORMANCE_GUIDE.md]]) |
| Gestion de bibliothèque robuste | MusicBee | Cache local fiable à grande échelle ([[DATA_LAYER.md]]) |
| Validation du positionnement « client Jellyfin dédié musique » | Finamp, Symfonium | Confirme la demande — Melodia doit dépasser leur niveau de finition, pas seulement les égaler |
| Validation de l'approche multi-source | Symfonium, Navidrome | Interface `MusicSource` conçue pour un second connecteur dès l'origine ([[ARCHITECTURE_PRINCIPLES.md]] §2.3) |

**Ce qu'aucun concurrent ne fait bien** : offrir une expérience de niveau Spotify/Plexamp **sans aucune dépendance à un écosystème propriétaire ou cloud**, avec une identité de marque aussi soignée qu'une plateforme commerciale. C'est l'espace inoccupé que Melodia vise.

---

## 15. Checklist de validation

- [ ] Les 12 produits demandés sont couverts individuellement, plus Navidrome pour sa pertinence architecturale.
- [ ] Chaque analyse a un « à reproduire », un « à éviter » et un « à améliorer » explicites, jamais un seul de ces trois.
- [ ] L'avertissement d'honnêteté en tête de document reste visible et n'est pas contredit par un ton faussement certain ailleurs dans le document.
- [ ] La synthèse (§14) relie chaque enseignement à un document technique ou produit concret, pas une aspiration vague.

---

## 16. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1) | Product Strategist / UX Researcher |

# PERFORMANCE_GUIDE.md — Méthodologie et outillage de performance (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Lead Frontend Engineer
> **Documents liés** : [[PERFORMANCE_BUDGET.md]], [[DATA_LAYER.md]], [[CI_CD_GUIDE.md]]

Ce document ne redéfinit aucun chiffre — les cibles chiffrées vivent exclusivement dans [[PERFORMANCE_BUDGET.md]] (amendé en Phase 0.5 pour une bibliothèque de référence de 200 000 titres). Il répond à une question différente : **comment** on construit, mesure et fait respecter ces budgets en continu.

---

## 1. Pourquoi 200 000 titres comme référence

[[PERFORMANCE_BUDGET.md]] a relevé sa bibliothèque de stress-test de 100 000 à 200 000 titres en Phase 0.5 : une collection personnelle auto-hébergée constituée sur plusieurs années (objectif de pérennité, [[PROJECT_CHARTER.md]] §6) dépasse couramment 100 000 titres pour un utilisateur avancé ; doubler la marge de sécurité évite qu'un budget tenu de justesse en Phase 1 devienne un défaut perceptible en Phase 2-3 à mesure que les bibliothèques réelles grossissent.

## 2. Virtualisation — implémentation concrète

- TanStack Virtual ([[TECH_STACK.md]] §1) rend uniquement les éléments visibles + une marge tampon (overscan) de 5-10 éléments — jamais la liste complète, y compris pour le défilement rapide (« fling scroll »).
- Les listes hétérogènes (grille d'albums + liste de titres dans une même vue) utilisent une mesure dynamique de taille d'élément, jamais une hauteur fixe supposée qui casserait le calcul de fenêtre virtuelle sur du contenu texte de longueur variable.
- Test de non-régression dédié : rendu d'une bibliothèque synthétique de 200 000 titres en CI (fixture générée, pas de dépendance à des données réelles), vérifiant que le nombre de nœuds DOM montés reste borné indépendamment de la taille totale de la liste.

## 3. Outillage de mesure

| Besoin | Outil | Quand |
|---|---|---|
| Poids de bundle (JS/CSS) | `vite-bundle-visualizer` ou équivalent, budget vérifié via une étape CI dédiée | À chaque PR |
| FPS / re-renders | React DevTools Profiler + Chrome Performance panel | Avant chaque release, et à la demande sur toute PR touchant le rendu de liste ou l'audio |
| Mémoire | Profiler mémoire du navigateur (heap snapshot) + Tauri (profilage natif du processus) | Avant chaque release mineure/majeure |
| Démarrage à froid/à chaud | Instrumentation interne (marques `performance.mark`/`performance.measure`) exportées en local, jamais envoyées sans consentement (voir [[SECURITY_GUIDELINES.md]] §9) | Continu en développement, agrégé avant release |

## 4. Génération de la fixture de 200 000 titres

Un script dédié (`scripts/generate-fixture.ts`, hors périmètre applicatif — outil de développement uniquement) génère une bibliothèque synthétique respectant la distribution réaliste d'une collection personnelle (nombre d'albums par artiste, longueur de titres, présence de pochettes) plutôt qu'un jeu de données uniforme trivial qui masquerait les coûts réels de rendu (texte de longueur variable, images manquantes).

## 5. Discipline de re-render (application concrète du budget §6)

- Toute nouvelle feature touchant `playerStore` ou la liste de titres passe par une vérification React DevTools Profiler avant merge (ajoutée à la checklist [[DEFINITION_OF_DONE.md]], section Performance).
- Les sélecteurs Zustand sont systématiquement scoping au strict nécessaire (`useStore(s => s.currentTrack)`, jamais `useStore()` sans sélecteur sur un composant de liste) — vérifié en revue de code.

## 5bis. Mémoïsation, Tree Shaking et Workers (ajout Phase 12)

- **Mémoïsation** : `useMemo`/`useCallback` réservés à un calcul mesurément coûteux ou à une référence stable requise par un enfant mémoïsé (`React.memo`) — jamais systématique par précaution, cohérent avec [[ENGINEERING_GUIDE.md]] §1.4 (optimisation prématurée non mesurée interdite, [[ENGINEERING_MANIFESTO.md]] §2). Un composant de liste virtualisée (§2) est le cas d'usage le plus fréquent où `React.memo` a un impact mesurable et justifié.
- **Tree Shaking** : garanti par l'usage exclusif d'imports nommés ES modules (jamais d'import `* as` sur une bibliothèque volumineuse) et par le mode `sideEffects: false` de chaque package du monorepo sauf exception documentée (ex. un fichier CSS global) — vérifié par l'analyse de bundle déjà en place ([[PERFORMANCE_BUDGET.md]] §4).
- **Workers** : voir [[CODING_STANDARDS.md]] §1bis pour la convention de fichier — utilisés pour l'indexation FlexSearch et le calcul d'agrégats statistiques ([[STATISTICS_SPECIFICATION.md]]), jamais pour une opération qui a besoin d'un accès synchrone au DOM. Communication par messages typés, jamais un objet muté partagé entre le thread principal et le worker.

## 5ter. Performance de l'état — re-render, batch, transitions, Suspense (ajout Architecture d'état)

> §5 pose déjà le scoping strict des sélecteurs Zustand, §5bis la discipline générale de mémoïsation (`useMemo`/`useCallback`/`React.memo`), et [[SELECTOR_GUIDE.md]] la mémoïsation propre aux sélecteurs. Cette section ajoute ce qui manquait : les mécanismes React qui opèrent au niveau du rendu déclenché par un changement d'état, pas au niveau du calcul de la valeur elle-même.

- **Batch Updates** : React 19 regroupe nativement tous les changements d'état synchrones d'un même tick en un seul rendu — aucune action manuelle requise pour la plupart des cas. Pour un changement d'état déclenché par un événement asynchrone en dehors du cycle React (ex. callback d'un Worker, [[STATISTICS_ENGINE.md]] §1), vérifier que la mise à jour reste groupée avec toute mise à jour associée plutôt que plusieurs `set()` Zustand séquentiels non liés.
- **Transitions React (`useTransition`)** : réservées aux changements d'état qui déclenchent un rendu coûteux et non urgent (ex. changement de filtre sur la bibliothèque virtualisée à 200 000 titres, [[DERIVED_STATE.md]] §1) — la frappe dans le champ de filtre reste fluide (urgente) pendant que le recalcul de la liste filtrée s'exécute en transition (non urgente, interruptible).
- **Suspense** : utilisé pour les requêtes TanStack Query en mode déclaratif (`useSuspenseQuery`) sur les écrans où un état de chargement générique ([[SKELETON_SYSTEM.md]]) est déjà défini — jamais introduit pour un état qui a déjà un traitement de chargement local plus spécifique déjà acté.
- **Re-render ciblé** : la combinaison store scoping (§5) + sélecteurs stables ([[SELECTOR_GUIDE.md]] §2) + `React.memo` sur les éléments de liste ([[PERFORMANCE_GUIDE.md]] §5bis) est la stratégie complète déjà suffisante pour tenir le budget de 60 FPS sur liste virtualisée ([[PERFORMANCE_BUDGET.md]] §3) — aucune technique supplémentaire ajoutée sans mesure préalable montrant un besoin réel non couvert par ces trois-là.

## 5quater. Table de décision — quelle technique de mémoïsation (ajout Architecture d'état)

| Technique | Utiliser quand | Éviter quand |
|---|---|---|
| `useMemo` | Un calcul mesurément coûteux dépend de props/state qui changent rarement (§5bis, déjà acté) | Le calcul est trivial (`a + b`) — le coût de la comparaison de dépendances dépasse le coût du calcul lui-même |
| `useCallback` | Une fonction est passée à un enfant mémoïsé (`React.memo`) ou à un tableau de dépendances d'un autre hook | La fonction n'est consommée que localement, aucun enfant mémoïsé ni dépendance externe |
| `React.memo` | Un composant de liste répétée (Track Row, Album Card) reçoit des props stables (§5bis, cas d'usage le plus fréquent) | Un composant qui reçoit systématiquement des props différentes à chaque rendu parent (la comparaison coûte plus qu'un rendu simple) |
| Sélecteurs (Zustand) | Isoler un composant des champs du store qu'il ne consomme pas ([[SELECTOR_GUIDE.md]] §1-2) | Jamais évité — le scoping par sélecteur est la règle par défaut, pas une optimisation optionnelle (§5) |
| Stores (découpage) | Un domaine d'état a un cycle de mise à jour très différent d'un autre (ex. position de lecture à 60 Hz vs préférences rarement modifiées) — les isoler en stores séparés évite qu'un composant abonné aux préférences re-render à 60 Hz | Le découpage ajoute une indirection sans qu'aucun composant ne souffre réellement d'un re-render croisé mesuré |
| TanStack Query (`select`) | Dériver une forme d'affichage depuis une réponse déjà en cache sans re-fetch ([[SELECTOR_GUIDE.md]] §3) | La transformation est déjà faite côté Mapper ([[MAPPER_GUIDE.md]]) — ne jamais dupliquer la même transformation à deux endroits |

**Principe transverse** : chaque technique de cette table répond à une couche différente du pipeline (rendu React, sélection d'état, découpage de store, cache serveur) — jamais deux techniques appliquées au même problème simultanément (ex. un `useMemo` autour d'un sélecteur déjà mémoïsé par Zustand serait redondant).

## 5quinquies. Performance du moteur audio (ajout Moteur Audio)

- **Préchargement intelligent** : voir [[AUDIO_ENGINE.md]] §2 (seuil 80 %/15 secondes déjà acté) — ce document confirme que ce seuil est calibré pour équilibrer anticipation utile et gaspillage de bande passante sur une piste jamais atteinte (changement de piste manuel avant la fin), jamais un préchargement plus agressif sans mesure de bénéfice réel.
- **Décodage** : délégué entièrement au décodeur natif du navigateur/runtime via `HTMLAudioElement` (§3 de [[AUDIO_ENGINE.md]]) — aucun décodage logiciel côté application, qui consommerait un CPU significativement supérieur au décodage matériel/natif accéléré exposé par la plateforme.
- **Workers** : le visualiseur ([[AUDIO_ENGINE.md]] §7) est le seul composant du moteur audio qui utilise un Worker (`OffscreenCanvas`, déjà acté) — le pipeline de lecture lui-même (Playback Engine, Media Adapter) reste sur le thread principal car `HTMLAudioElement`/Web Audio API sont eux-mêmes déjà asynchrones et non bloquants par nature, un Worker supplémentaire n'apporterait aucun bénéfice mesurable.
- **Réduction CPU** : les couches d'enrichissement optionnelles (égaliseur, visualiseur, [[AUDIO_ENGINE.md]] §6-7) ont un coût CPU nul quand désactivées (nœuds Web Audio non instanciés, cohérent avec [[AUDIO_ENGINE.md]] §6 déjà acté) — jamais une couche instanciée par défaut « au cas où » l'utilisateur l'activerait.
- **Réduction batterie** : le visualiseur se désactive automatiquement en arrière-plan (Page Visibility API, [[AUDIO_ENGINE.md]] §7, déjà acté) ; sur mobile, la fréquence de sauvegarde de position ([[AUDIO_ENGINE.md]] §1bis) est réduite en arrière-plan (l'application n'a pas besoin d'une granularité de quelques secondes quand elle n'est pas au premier plan) pour limiter les écritures `LocalStore` répétées.

## 5sexies. Performance du moteur de recherche (ajout Moteur de Recherche)

- **Index en mémoire** : les sept index actifs ([[SEARCH_INDEX_SPECIFICATION.md]] §1) résident intégralement en mémoire pendant la session (chargés depuis leur forme sérialisée, [[INDEX_ENGINE.md]] §7) — c'est la condition du budget de calcul moteur < 50 ms ([[PERFORMANCE_BUDGET.md]] §2, amendement Moteur de Recherche) : aucun accès disque n'intervient dans le chemin critique d'une requête.
- **Cache** : le score composite ([[RANKING_ENGINE.md]] §5) n'est jamais mis en cache (recalculé à chaque requête, déjà justifié par son faible coût) — seul le résultat des moteurs lourds (Statistics, Recommendation) l'est, cohérent avec la distinction déjà actée ([[DERIVED_STATE.md]] §2, dérivation légère vs moteur avec cache).
- **Préchargement** : l'index est chargé au démarrage de l'application (§7 de [[INDEX_ENGINE.md]]), jamais différé jusqu'au premier usage de la recherche — un utilisateur qui ouvre la recherche pour la première fois d'une session ne doit jamais attendre un chargement d'index qui aurait pu commencer plus tôt.
- **Lazy Loading** : ne s'applique pas à l'index lui-même (§ci-dessus, chargé entièrement) mais aux résultats affichés — une liste de résultats volumineuse (recherche sans texte, filtres seuls sur toute la bibliothèque, [[FILTER_ENGINE.md]] §4) reste virtualisée comme toute liste dense ([[PERFORMANCE_BUDGET.md]] §3), non redécidé ici.
- **Compression** : l'index sérialisé (`search_index_meta`, [[DATABASE_SCHEMA.md]] §1) suit la même politique de compression que le Metadata Cache ([[CACHE_SYSTEM.md]] §4) — décompression à la volée au chargement, jamais un stockage non compressé sur une bibliothèque de 250 000 titres.
- **Workers** : la construction et la réindexation ([[INDEX_ENGINE.md]] §1, §3) s'exécutent dans le Worker FlexSearch déjà acté ([[DATA_LAYER.md]] §3, [[CODING_STANDARDS.md]] §1bis) — jamais sur le thread principal, cohérent avec la règle déjà établie pour l'indexation en arrière-plan. Les mises à jour incrémentales (§2 de [[INDEX_ENGINE.md]]), plus légères, restent également dans ce même Worker plutôt que de créer un second Worker dédié (éviterait une synchronisation inter-Worker superflue pour un gain non mesuré).

## 5septies. Optimisation batterie globale (ajout Plateforme Offline)

> §5quinquies couvre déjà la réduction batterie propre au moteur audio (visualiseur, fréquence de sauvegarde de position). Cette section généralise au reste de la plateforme — synchronisation, téléchargements, écritures disque.

- **Limiter le CPU** : les deux seules tâches CPU-intensives ([[BACKGROUND_TASKS.md]] §3, indexation et statistiques) restent en Worker — aucune tâche de fond supplémentaire n'est ajoutée au thread principal sans le même arbitrage.
- **Limiter les écritures** : les écritures `LocalStore` fréquentes (position de lecture, [[AUDIO_ENGINE.md]] §1bis) sont regroupées par lot plutôt qu'à chaque tick — une écriture disque a un coût énergétique mesurable, non négligeable en répétition sur une session longue.
- **Limiter les téléchargements** : voir [[DOWNLOAD_SYSTEM.md]] §5quinquies (Wi-Fi uniquement/sur batterie), non redécidé ici — ce document confirme uniquement que ce réglage est un levier de réduction batterie parmi d'autres, pas le seul.
- **Adapter la synchronisation** : Scheduled/Background Sync ([[SYNC_ENGINE_SPECIFICATION.md]] §2bis) réduisent leur fréquence quand l'appareil est en économie d'énergie (API `navigator.getBattery()` quand disponible, dégradation silencieuse sinon — jamais une dépendance dure) — Manual Sync reste toujours immédiate, jamais affectée par ce réglage (une action explicite de l'utilisateur n'est jamais différée pour la batterie).

## 6. Intégration en CI

Voir [[CI_CD_GUIDE.md]] pour le détail du pipeline : le job de vérification de budget de poids échoue la build au-delà du seuil d'alerte de [[PERFORMANCE_BUDGET.md]] §4, sauf dérogation documentée (voir [[ENGINEERING_GUIDE.md]] §3). Le test de rendu sur fixture 200 000 titres tourne en job séparé, non bloquant pour chaque PR (trop coûteux en temps CI) mais obligatoire et bloquant avant toute release ([[QUALITY_GATES.md]]).

## 6bis. Cache pochettes, waveform et tampon audio (ajout Phase 9)

- **Cache de pochettes** : les pochettes déjà affichées restent en cache mémoire borné (LRU, taille maximale définie par plateforme — plus généreuse sur desktop, plus stricte sur mobile) — jamais un cache illimité qui grossirait sans borne sur une session longue. Les miniatures ([[DISPLAY_COMPONENTS.md]] §5, Thumbnail) utilisent un cache disque persistant séparé du cache mémoire des grands formats, cohérent avec leur usage à très haute fréquence dans les listes virtualisées.
- **Cache de waveform** : la représentation de forme d'onde ([[PLAYER_COMPONENTS.md]], Waveform) est calculée une seule fois par piste et mise en cache disque — jamais recalculée à chaque lecture de la même piste, coût de calcul non négligeable sur un fichier audio complet.
- **Tampon audio (buffer)** : géré exclusivement par [[AUDIO_ENGINE.md]] — ce document n'y touche pas, seulement au rendu visuel qui en dépend (barre de progression en mise en tampon, [[PLAYER_SPECIFICATION.md]] §3), pour éviter toute redécision d'un sujet déjà tranché.
- **Chargement d'image adaptatif** : la résolution de pochette demandée au serveur Jellyfin correspond à la taille d'affichage réelle du composant qui la consomme (Thumbnail/Card/Hero, [[DISPLAY_COMPONENTS.md]]) — jamais une seule résolution maximale téléchargée partout puis redimensionnée côté client, qui gaspillerait de la bande passante en contexte de connexion lente.

## 6ter. Écrans les plus coûteux et optimisations recommandées (ajout Phase 10)

| Écran | Coût principal | Optimisation déjà actée |
|---|---|---|
| Library Home (Albums/Tracks) | Rendu de grille sur une bibliothèque de référence à 200 000 titres | Virtualisation obligatoire ([[PERFORMANCE_BUDGET.md]] §3), déjà couverte §2 |
| Fullscreen Player + Visualiseur | Extraction/dégradé dynamique + `AnalyserNode` en parallèle | Cache d'extraction (§6bis), repli Performance Mode automatique ([[AUDIO_VISUALIZER.md]] §7) |
| Statistics/Wrapped (graphiques, Heatmap) | Calcul d'agrégats sur tout l'historique local | Calcul en arrière-plan (Web Worker) hors du thread de rendu, jamais recalculé à chaque ouverture de l'écran — résultat mis en cache jusqu'au prochain événement d'écoute |
| Search Results | Indexation/filtrage en temps réel à la frappe | Index FlexSearch déjà en mémoire ([[STACK_DECISIONS.md]] §2), latence perçue nulle par conception |
| Download Queue (liste longue) | Mise à jour de progression fréquente par élément | Chaque ligne se met à jour indépendamment (Zustand scoping strict, §5), jamais un re-render de la liste entière par tick de progression |

**Règle de priorisation** : ces cinq écrans reçoivent la priorité de profilage (React DevTools Profiler, §5) avant tout autre écran lors d'une régression de performance suspectée — cohérent avec le principe déjà établi qu'un composant à fort impact en cascade ([[COMPONENT_DEPENDENCY_GRAPH.md]] §6) mérite une attention disproportionnée à son usage réel.

## 6quater. Transactions, traitement par lot et streaming pour la couche donnée (ajout Phase 13)

- **Transactions** : toute écriture multi-tables dépendante passe par une transaction Dexie explicite ([[INDEXEDDB_ARCHITECTURE.md]] §4) — jamais une séquence d'écritures indépendantes qui risquerait un état intermédiaire incohérent si l'une échoue en cours de route.
- **Traitement par lot** : les opérations volumineuses (import initial, [[SYNC_ENGINE_SPECIFICATION.md]] §1/§7bis) écrivent par lots bornés plutôt qu'un unique batch de 200 000 titres — un lot trop volumineux bloquerait le thread principal le temps de son écriture, un lot trop petit multiplierait le nombre de transactions ; la taille de lot est calibrée empiriquement contre la fixture de référence (§4), pas fixée arbitrairement.
- **Streaming** : toute lecture dont le résultat n'a pas besoin d'être matérialisé intégralement en mémoire (ex. export complet de l'historique) utilise l'itération Dexie (`.each()`, [[INDEXEDDB_ARCHITECTURE.md]] §5) plutôt qu'un chargement complet en tableau — évite un pic mémoire proportionnel à la taille totale de la donnée plutôt qu'à la fenêtre réellement affichée.

---

## 7. Checklist de validation

- [ ] La fixture de test couvre la cible engagée (200 000 titres, [[PERFORMANCE_BUDGET.md]]) — l'extension à 300 000 reste un ticket de dette technique ouvert, voir [[EXTREME_SCENARIOS.md]] §1.
- [ ] Chaque outil de mesure (§3) a un propriétaire et une fréquence d'exécution définie.
- [ ] Le risque de fixture non représentative est couvert dans [[RISK_REGISTER_TECHNICAL.md]] §8.
- [x] Un appareil de référence tablette est ajouté à [[PERFORMANCE_BUDGET.md]] §1 (résolu pendant l'auto-audit de la Phase 0.5 complément).

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | Lead Frontend Engineer |
| 0.2.0 | 2026-08-03 | Ajout de la checklist de validation et des renvois vers les documents du complément Phase 0.5 | Lead Frontend Engineer |
| 0.3.0 | 2026-08-04 | Phase 9 : ajout §6bis (cache pochettes/waveform, chargement d'image adaptatif) — au lieu de créer MUSIC_PERFORMANCE_GUIDE.md en doublon | Performance Engineer |
| 0.4.0 | 2026-08-04 | Phase 10 : ajout §6ter (écrans les plus coûteux et optimisations) — au lieu de créer SCREEN_PERFORMANCE_GUIDE.md en doublon | Performance Engineer |
| 0.5.0 | 2026-08-04 | Phase 12 : ajout §5bis (mémoïsation, tree shaking, workers) | Senior Performance Engineer |
| 0.6.0 | 2026-08-04 | Phase 13 : ajout §6quater (transactions/traitement par lot/streaming pour la couche donnée) — au lieu de créer DATA_PERFORMANCE.md en doublon | Senior Performance Engineer |
| 0.7.0 | 2026-08-04 | Architecture d'état : ajout §5ter (re-render/batch/transitions/Suspense) et §5quater (table de décision par technique de mémoïsation) — au lieu de créer MEMOIZATION_GUIDE.md/STATE_PERFORMANCE.md en doublon | Senior Performance Engineer |
| 0.8.0 | 2026-08-04 | Moteur Audio : ajout §5quinquies (préchargement/décodage/workers/CPU/batterie propres au moteur audio) — au lieu de créer AUDIO_PERFORMANCE.md en doublon | Performance Engineer |
| 0.9.0 | 2026-08-04 | Moteur de Recherche : ajout §5sexies (index en mémoire/cache/préchargement/lazy loading/compression/workers propres à la recherche) — au lieu de créer SEARCH_PERFORMANCE.md en doublon | Performance Engineer |
| 0.10.0 | 2026-08-04 | Plateforme Offline : ajout §5septies (optimisation batterie généralisée : CPU/écritures/téléchargements/synchronisation) — au lieu de créer BATTERY_OPTIMIZATION.md en doublon | Performance Engineer |

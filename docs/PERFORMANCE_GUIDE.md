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

# TECHNOLOGY_COMPARISONS.md — Comparaisons technologiques détaillées (Phase 0.5, complément)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Staff Frontend Engineer / Principal Software Architect
> **Documents liés** : [[TECH_STACK.md]], [[STACK_DECISIONS.md]], [[FRONTEND_ARCHITECTURE.md]]

Ce document ne redécide rien : les décisions restent celles de [[TECH_STACK.md]] et [[STACK_DECISIONS.md]], qui font autorité (cohérent avec [[DOCUMENTATION_GUIDE.md]] §4, une seule source de vérité par sujet). Il fournit l'analyse comparative complète — axes : facilité d'utilisation, performances, évolutivité, communauté, maintenance, maturité, compatibilité avec Melodia — qui sous-tend chacune de ces décisions, pour les sept paires de technologies explicitement mises en regard lors du cadrage de cette phase.

Barème de notation : ●●● fort, ●●○ moyen, ●○○ faible. Une note n'est jamais absolue — elle est relative au contexte de Melodia (application client, données locales volumineuses, trois cibles de déploiement).

---

## 1. React vs Vue

| Axe | React 19 | Vue 3 |
|---|---|---|
| Facilité d'utilisation | ●●○ — JSX + hooks a une courbe d'apprentissage réelle, mais l'écosystème d'outils (ESLint, DevTools) est le plus abouti | ●●● — Single File Components et Composition API sont réputés plus accessibles à un nouveau contributeur |
| Performances | ●●○ — re-render non chirurgical par défaut, compensé par la discipline de state architecture ([[ARCHITECTURE_PRINCIPLES.md]] §4) | ●●● — réactivité fine native (proxies), moins de travail de discipline manuelle requis |
| Évolutivité | ●●● — écosystème le plus large pour scinder en librairies/plugins à terme | ●●○ — bon, mais l'écosystème de librairies headless (Radix-like) est plus restreint |
| Communauté | ●●● — la plus large, la plus grande probabilité de contributeurs externes disponibles | ●●○ — solide mais nettement plus petite, en particulier hors Asie |
| Maintenance | ●●○ — churn historique de patterns (class components → hooks) | ●●● — API stable depuis Vue 3, migrations moins fréquentes |
| Maturité | ●●● — plus de 10 ans en production à grande échelle | ●●● — également mature (Vue 2 puis 3), mais migrations majeures plus disruptives par le passé |
| Compatibilité Melodia | ●●● — intégration de première classe avec Tauri, TanStack (Query/Router/Virtual), Radix | ●●○ — intégrations Tauri/TanStack existent mais moins documentées, écosystème de primitives accessibles plus restreint (pas d'équivalent Radix aussi mature) |

**Recommandation (déjà actée en Phase 0, [[TECH_STACK.md]] §1)** : React 19. Le facteur décisif n'est pas la performance brute (Vue gagnerait probablement ce point isolé) mais la **compatibilité d'écosystème avec le reste de la stack déjà choisie** (Tauri, TanStack, Radix) et le bassin de contributeurs pour un projet open source visant plusieurs années ([[PROJECT_CHARTER.md]] §3.10). Risque accepté : discipline de re-render à maintenir manuellement (mitigé par [[ARCHITECTURE_PRINCIPLES.md]] §4 et [[PERFORMANCE_GUIDE.md]] §5).

---

## 2. Next.js vs Vite

| Axe | Next.js (App Router) | Vite (SPA) |
|---|---|---|
| Facilité d'utilisation | ●●○ — conventions riches mais nombreuses (Server/Client Components, Server Actions, conventions de fichiers) | ●●● — configuration minimale, mental model simple (un bundle, un point d'entrée) |
| Performances | ●●● — rendu serveur/streaming excellent pour du contenu public | ●●○ — excellent en SPA pur, mais aucun avantage de SSR (non pertinent ici, voir ci-dessous) |
| Évolutivité | ●●○ — excellente pour du Web pur, **aucune histoire native pour Desktop/Mobile** | ●●● — le même build s'exécute nativement dans Tauri (Desktop **et** Mobile) sans adaptation |
| Communauté | ●●● — très large | ●●○ — large mais plus focalisée outillage que framework applicatif complet |
| Maintenance | ●●○ — rythme de changement rapide (App Router encore en évolution) | ●●● — surface d'API stable, Vite change rarement de paradigme |
| Maturité | ●●○ — App Router relativement récent comparé au Pages Router historique | ●●● — Vite est éprouvé comme outil de build depuis plusieurs années |
| Compatibilité Melodia | ●○○ — **bloquant** : Server Components/Actions exigent un serveur Node persistant, incompatible avec l'argument central de Tauri (binaire natif unique, sans dépendance serveur) | ●●● — condition nécessaire du choix Tauri unifié ([[TECH_STACK.md]] §0) |

**Recommandation (déjà tranchée avec l'utilisateur en Phase 0.5, voir [[FRONTEND_ARCHITECTURE.md]] note de cadrage)** : Vite en SPA. Ce n'est pas un cas où les deux options sont proches : Next.js apporte du SSR/SEO/streaming, **dont Melodia n'a structurellement pas besoin** (application authentifiée, pas de contenu public à indexer) — le seul avantage réel de Next.js ne s'applique pas à ce produit, alors que son coût (serveur Node requis) casse une décision d'architecture déjà actée. Un cas rare où la comparaison est unilatérale plutôt qu'un compromis.

---

## 3. Zustand vs Redux (Toolkit)

| Axe | Zustand | Redux Toolkit |
|---|---|---|
| Facilité d'utilisation | ●●● — un store = une fonction, aucun boilerplate de provider/action-type obligatoire | ●●○ — RTK a beaucoup réduit le boilerplate historique de Redux, mais la cérémonie (slices, thunks) reste supérieure |
| Performances | ●●● — sélecteurs fins nativement, pas de re-render du store entier | ●●○ — nécessite `reselect` ou une discipline équivalente pour éviter les re-renders larges |
| Évolutivité | ●●○ — suffisant pour un état client/UI, pas conçu pour une logique métier complexe multi-étapes | ●●● — middleware, time-travel debugging, écosystème d'extensions plus riche pour des flux complexes |
| Communauté | ●●○ — large et croissante, plus petite que Redux historiquement | ●●● — la plus large et la plus ancienne parmi les gestionnaires d'état React |
| Maintenance | ●●● — API minimale, peu de surface à maintenir dans le temps | ●●○ — plus de concepts à maintenir cohérents (slices, middleware, sélecteurs mémorisés) |
| Maturité | ●●○ — plus récent, mais stable en production depuis plusieurs années | ●●● — le plus éprouvé du marché |
| Compatibilité Melodia | ●●● — usage prévu (état de lecture, préférences) est simple par nature, pas de besoin de time-travel debugging ou de middleware complexe | ●●○ — capacités avancées non utilisées ici, coût de cérémonie payé pour rien |

**Recommandation (déjà actée, [[TECH_STACK.md]] §1)** : Zustand. Redux Toolkit gagnerait sur un projet à logique d'état très complexe et fortement testée via middleware (ex. undo/redo profond, synchronisation multi-store) — ce n'est pas le profil de l'état client de Melodia (file de lecture, préférences, volume), qui reste un état plat et local à peu de domaines. Le rapport cérémonie/valeur penche nettement pour Zustand ici.

## 3bis. Zustand vs MobX (ajout Architecture d'état)

| Axe | Zustand | MobX |
|---|---|---|
| Facilité d'utilisation | ●●● — état immuable explicite, un store = une fonction | ●●○ — modèle réactif basé sur des proxies/observables, puissant mais moins prévisible à la lecture (mutation directe de l'état observable) |
| Performances | ●●● — sélecteurs fins explicites ([[SELECTOR_GUIDE.md]]) | ●●● — réactivité fine automatique via le graphe de dépendance des observables, souvent moins de code de sélection à écrire |
| Évolutivité | ●●○ — suffisant pour l'état client visé | ●●● — excelle sur des graphes d'état fortement interconnectés |
| Communauté | ●●○ | ●●○ — mature mais en déclin relatif face à Zustand/Jotai dans l'écosystème React récent |
| Maintenance | ●●● — pas de décorateurs, pas de configuration de compilateur supplémentaire | ●●○ — nécessite historiquement des décorateurs ou une configuration Babel/TS spécifique, une source de friction de build supplémentaire |
| Maturité | ●●○ | ●●● — l'un des plus anciens gestionnaires d'état réactif pour React |
| Compatibilité Melodia | ●●● — le modèle immuable explicite s'aligne avec le style déjà acté du reste du code (`Result<T,E>`, entités immuables, [[DOMAIN_MODELS.md]] §1) | ●●○ — la mutation directe d'observables introduirait un style de programmation différent de celui déjà acté partout ailleurs dans le projet (fonctions pures, immutabilité, [[CODING_STANDARDS.md]] §4.5) |

**Recommandation** : Zustand. La mutation directe caractéristique de MobX contredirait la discipline d'immutabilité déjà appliquée dans toute la couche donnée (Mappers, Repositories, [[MAPPER_GUIDE.md]] §2) — introduire un modèle réactif à mutation directe pour le seul état client créerait une incohérence stylistique dans le code, un coût supérieur au gain de concision.

## 3ter. Zustand vs Context API (ajout Architecture d'état)

| Axe | Zustand | Context API (React natif) |
|---|---|---|
| Facilité d'utilisation | ●●● | ●●● — natif, aucune dépendance |
| Performances | ●●● — un composant qui consomme un sélecteur ne re-render que si la valeur sélectionnée change | ●●○ — tout consommateur d'un Context re-render à chaque changement de valeur du Provider, sauf découpage manuel minutieux en plusieurs Contexts (charge de maintenance supplémentaire) |
| Évolutivité | ●●○ | ●●○ — la multiplication de Providers pour éviter le problème de performance ci-dessus devient vite ingérable au-delà de quelques domaines d'état |
| Communauté | ●●○ | ●●● — natif React, aucune communauté tierce nécessaire |
| Maintenance | ●●● | ●●○ — le découpage manuel en Contexts multiples pour la performance ajoute de la cérémonie équivalente à ce que Zustand résout nativement |
| Maturité | ●●○ | ●●● — partie du cœur de React |
| Compatibilité Melodia | ●●● — 13 stores ([[STORE_SPECIFICATIONS.md]]) avec re-render scoping fin requis (liste virtualisée de 200 000 titres, [[PERFORMANCE_BUDGET.md]] §3) | ●●○ — le problème de re-render du Context sur une liste de cette échelle serait un défaut de performance mesurable, pas seulement théorique |

**Recommandation** : Zustand. Context API reste pertinent dans Melodia pour des données rarement mises à jour et sans besoin de sélection fine (voir `AppProviders`, [[FRONTEND_ARCHITECTURE.md]] §6 — thème CSS statique, configuration d'injection) mais jamais comme remplacement des 13 stores d'état applicatif : le coût de re-render non scoping serait directement contraire au budget de performance déjà acté sur les listes virtualisées ([[PERFORMANCE_BUDGET.md]] §3).

---

## 4. Dexie (IndexedDB) vs SQLite

| Axe | Dexie (IndexedDB) | SQLite (natif, plugin SQL Tauri) |
|---|---|---|
| Facilité d'utilisation | ●●● — API Promise-based, pas de gestion de connexion native | ●●○ — nécessite le plugin Tauri et une couche de requêtes SQL |
| Performances | ●●○ — correct pour des volumes modérés, dégrade sur des requêtes relationnelles complexes à grande échelle | ●●● — moteur relationnel indexé, tient mieux la charge sur 200 000+ lignes avec jointures (bibliothèque × playlists × pistes) |
| Évolutivité | ●●○ — limité au contexte navigateur, aucune portabilité de fichier de données | ●●● — fichier de base de données portable, requêtes SQL réutilisables côté outillage de diagnostic |
| Communauté | ●●○ — bonne mais nichée (usage principalement web offline-first) | ●●● — l'une des bases de données les plus déployées au monde |
| Maintenance | ●●● — aucune gestion de moteur, tout est géré par le navigateur | ●●○ — nécessite de suivre les migrations de schéma SQL explicitement (voir [[DATA_LAYER.md]] §2.2) |
| Maturité | ●●● — Dexie est stable et largement utilisé pour PWA offline-first | ●●● — SQLite est un standard de facto depuis des décennies |
| Compatibilité Melodia | ●●● **sur Web pur uniquement** — seule option viable sans WASM | ●●● **sur Desktop/Mobile uniquement** — accès natif via Tauri, hors de portée en navigateur pur sans surcoût WASM |

**Recommandation (déjà actée, [[ARCHITECTURE_PRINCIPLES.md]] §3)** : **ce n'est pas un choix binaire mais une complémentarité par plateforme** — SQLite pour Desktop/Mobile (natif, performant à l'échelle visée), Dexie pour le repli Web pur (pas d'alternative native sans WASM). L'un ne remplace pas l'autre ; les deux sont retenus derrière l'interface commune `LocalStore`, exactement pour que ce choix reste invisible au-dessus de la couche Data.

---

## 5. TanStack Query vs SWR

| Axe | TanStack Query | SWR |
|---|---|---|
| Facilité d'utilisation | ●●○ — API plus riche, davantage de concepts (query keys structurées, invalidation ciblée) | ●●● — API volontairement minimale, très rapide à adopter |
| Performances | ●●● — déduplication de requêtes, cache normalisé configurable finement | ●●● — également excellent, différences marginales en pratique |
| Évolutivité | ●●● — mutations optimistes, requêtes dépendantes/parallèles, infinite queries nativement outillés | ●●○ — couvre les cas simples très bien, moins outillé nativement pour des flux de mutation complexes |
| Communauté | ●●● — la plus large parmi les bibliothèques de server-state React | ●●○ — solide, plus restreinte |
| Maintenance | ●●● — même famille que TanStack Router/Virtual déjà retenus ([[TECH_STACK.md]] §1, [[FRONTEND_ARCHITECTURE.md]] §2) — une seule doctrine à maintenir pour tout ce qui est TanStack | ●●○ — écosystème indépendant, doctrine séparée à maintenir |
| Maturité | ●●● — très largement adopté en production | ●●● — également mature, maintenu par Vercel |
| Compatibilité Melodia | ●●● — les mutations optimistes (ajout à une playlist, [[FRONTEND_ARCHITECTURE.md]] §8) et le préchargement par route (intégration TanStack Router) sont des besoins concrets du produit | ●●○ — couvrirait le besoin mais sans l'intégration native au routeur déjà choisi |

**Recommandation (déjà actée, [[TECH_STACK.md]] §1)** : TanStack Query. Au-delà des performances comparables, l'argument décisif est la cohérence d'écosystème : Melodia utilise déjà TanStack Router et TanStack Virtual — utiliser TanStack Query réduit à un seul écosystème/une seule doctrine de mise à jour à suivre dans le temps (cohérent avec [[ENGINEERING_GUIDE.md]] §2.4, éviter la multiplication des bibliothèques).

---

## 6. Motion (ex-Framer Motion) vs Motion One

Une clarification s'impose avant la comparaison : **« Framer Motion » et « Motion One » ont fusionné** — le package retenu en Phase 0 ([[TECH_STACK.md]] §1, « Motion ») est le successeur unifié des deux bibliothèques historiques, pas un choix entre deux projets concurrents actifs. La comparaison ci-dessous documente ce que chaque lignée apportait historiquement, pour expliquer pourquoi la fusion est un non-événement pour Melodia plutôt que de présenter un faux dilemme actuel.

| Axe | Framer Motion (historique) | Motion One (historique) |
|---|---|---|
| Facilité d'utilisation | ●●● — API déclarative React (`motion.div`, `animate`) | ●●○ — API plus bas niveau, pensée pour du JS vanilla d'abord |
| Performances | ●●○ — plus lourd (dépendances React internes) | ●●● — cœur minimal, piloté par les Web Animations API natives |
| Compatibilité Melodia | ●●● — s'intègre nativement dans les composants React du design system | ●●○ — aurait nécessité une couche d'adaptation React supplémentaire |

**Recommandation** : le package unifié « Motion » (retenu dans [[TECH_STACK.md]] §1) combine l'API déclarative de Framer Motion et le cœur performant hérité de Motion One — il n'y a plus de compromis à faire entre les deux. Rappel de l'architecture retenue ([[TECH_STACK.md]] §1) : ce package couvre les transitions d'interface déclaratives ; le rendu temps réel (barre de progression, visualiseur) reste délibérément **hors** de ce package, piloté directement en CSS/Canvas pour respecter le budget de re-renders ([[PERFORMANCE_GUIDE.md]] §5).

---

## 7. Fuse.js vs FlexSearch

| Axe | Fuse.js | FlexSearch |
|---|---|---|
| Facilité d'utilisation | ●●● — API très simple, configuration minimale | ●●○ — plus de paramètres de configuration (tokenisation, encodage, profondeur d'index) |
| Performances à petite échelle (< 5 000 titres) | ●●● — largement suffisant, différence imperceptible | ●●● — également excellent, aucun avantage perceptible à cette échelle |
| Performances à grande échelle (100 000-300 000+ titres) | ●○○ — dégradation mesurée et documentée par la communauté au-delà de quelques dizaines de milliers d'entrées | ●●● — conçu explicitement pour cette échelle, benchmarks publics constants jusqu'à plusieurs centaines de milliers de documents |
| Évolutivité | ●●○ — pas d'index sérialisable en configuration standard, reconstruction à chaque démarrage | ●●● — index sérialisable, persistable dans `LocalStore` ([[DATA_LAYER.md]] §3.1) sans reconstruction complète |
| Communauté | ●●● — plus populaire en volume d'adoption toutes échelles confondues | ●●○ — communauté plus nichée mais très active sur les cas d'usage à grande échelle |
| Maintenance | ●●○ — mainteneur unique historiquement, rythme de publication irrégulier | ●●○ — également porté par un mainteneur principal, mais publications plus régulières ces dernières années |
| Maturité | ●●● — très largement éprouvé | ●●● — également éprouvé, en particulier sur des corpus documentaires volumineux |
| Compatibilité Melodia | ●○○ — échouerait le budget de recherche perçue à 200 000+ titres ([[PERFORMANCE_BUDGET.md]] §2 et §3) | ●●● — seule option dont les caractéristiques correspondent explicitement à l'échelle visée |

**Recommandation (déjà actée, [[STACK_DECISIONS.md]] §2)** : FlexSearch. C'est le point de comparaison le plus tranché de ce document — Fuse.js est un excellent choix pour un catalogue de quelques milliers d'éléments, mais la contrainte de performance de Melodia (recherche perçue < 100 ms sur 200 000+ titres, voir [[PERFORMANCE_BUDGET.md]] §2) élimine Fuse.js sur des données de benchmark publiques, pas sur une préférence stylistique.

---

## 8. Synthèse : quand la comparaison a réellement tranché

| Comparaison | Nature de l'écart |
|---|---|
| Next.js vs Vite | Unilatéral — l'avantage de Next.js (SSR/SEO) ne s'applique pas au produit |
| Fuse.js vs FlexSearch | Unilatéral au-delà de l'échelle cible — question de seuil de performance mesurable, pas de goût |
| Dexie vs SQLite | Pas un choix — complémentarité imposée par la plateforme d'exécution |
| React vs Vue | Arbitrage réel — écosystème/compatibilité l'emporte sur un avantage de performance brute de Vue |
| Zustand vs Redux Toolkit | Arbitrage réel — simplicité proportionnée au besoin réel plutôt que capacité maximale non utilisée |
| Zustand vs MobX | Arbitrage de cohérence stylistique — l'immutabilité déjà actée partout ailleurs l'emporte sur la concision de MobX |
| Zustand vs Context API | Unilatéral à l'échelle visée — le re-render non scoping de Context contredirait le budget de performance sur liste virtualisée |
| TanStack Query vs SWR | Arbitrage réel mais resserré — cohérence d'écosystème déjà engagé fait pencher la balance |
| Motion (unifié) | Non-dilemme — les deux lignées ont fusionné |

**Pourquoi cette synthèse compte** : toutes les comparaisons ne se valent pas — certaines sont des seuils mesurables (FlexSearch), d'autres des arbitrages de compromis assumé (Zustand). Le confondre reviendrait à présenter un choix légitimement débattable (React vs Vue) avec la même certitude qu'un choix imposé par une contrainte physique (Dexie vs SQLite selon la plateforme) — ce tableau garde cette distinction honnête, conformément aux Honesty Rules du processus de documentation.

---

## 9. Checklist de validation

- [ ] Chaque paire nommée dans le cadrage de cette phase est couverte.
- [ ] Chaque comparaison couvre les sept axes demandés (facilité, performance, évolutivité, communauté, maintenance, maturité, compatibilité projet).
- [ ] Aucune comparaison ne référende une décision déjà actée sans renvoyer à son document source ([[TECH_STACK.md]], [[STACK_DECISIONS.md]]).
- [ ] La nature de chaque écart (unilatéral, contrainte de plateforme, arbitrage réel) est explicitée — pas de fausse équivalence.

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5, complément) | Staff Frontend Engineer / Principal Software Architect |
| 0.2.0 | 2026-08-04 | Architecture d'état : ajout §3bis (Zustand vs MobX) et §3ter (Zustand vs Context API) — au lieu de créer ZUSTAND_ARCHITECTURE.md en doublon de §3 déjà existant | Principal State Management Architect |

# TECH_STACK.md — Stack technique officielle

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : CTO / Lead Software Architect
> **Documents liés** : [[ARCHITECTURE_PRINCIPLES.md]], [[PERFORMANCE_BUDGET.md]], [[ENGINEERING_GUIDE.md]] §2

Chaque choix ci-dessous est contraignant : un changement de catégorie nécessite un ADR (voir [[ADR_TEMPLATE.md]]) et une mise à jour de ce document. Les critères d'ajout de dépendance sont définis dans [[ENGINEERING_GUIDE.md]] §2 et s'appliquent à tout ajout **au sein** d'une catégorie déjà choisie.

---

## 0. Décision structurante : un cœur, trois cibles via Tauri

Avant le détail par catégorie, la décision la plus structurante de ce document : **Tauri 2** est retenu comme runtime unifié pour Desktop **et** Mobile, avec le même frontend React déployable en PWA pour l'usage navigateur pur.

**Alternatives considérées** :
| Option | Pourquoi écartée |
|---|---|
| Electron (Desktop) + React Native (Mobile) | Deux runtimes distincts = deux bases de code de « shell » à maintenir, deux comportements natifs différents, empreinte mémoire d'Electron nettement supérieure (Chromium embarqué complet par instance) |
| Capacitor (Mobile) + Electron (Desktop) | Même problème de fragmentation ; Capacitor encapsule une webview mais reste un écosystème séparé de la brique desktop |
| React Native seul (Desktop via react-native-macos/windows + Mobile) | Le rendu React Native ne partage pas le DOM/CSS du Web — la couche UI (composants, styles, animations) devrait être réécrite ou fortement adaptée, cassant le partage de code visé à ≥ 90 % ([[PROJECT_CHARTER.md]] §3.2) |
| Tauri 2 (Desktop + Mobile) + build Web du même frontend en PWA | Un seul frontend React/TypeScript, une seule couche de style, un seul design system ; Tauri 2 supporte nativement iOS/Android depuis sa version stable, avec un cœur Rust léger et performant |

**Décision retenue et pourquoi** : Tauri 2 permet de satisfaire l'objectif « Web + Desktop + Mobile dès le départ » sans dupliquer la couche UI, ce qui est la condition nécessaire à l'objectif technique de 90 % de code partagé ([[PROJECT_CHARTER.md]] §3.2) et au principe de non-duplication ([[ENGINEERING_GUIDE.md]] §1.3). Le compromis accepté : l'écosystème de plugins natifs Tauri (mobile en particulier) est plus jeune que celui de React Native ; ce risque est documenté dans [[PROJECT_CHARTER.md]] §5 et mitigé par une isolation stricte du code spécifique plateforme (voir [[ARCHITECTURE_PRINCIPLES.md]] §7).

---

## 1. Détail par catégorie

### Framework — React 19
- **Pourquoi** : écosystème le plus large pour un projet open source multi-contributeurs (recrutement de contributeurs facilité — [[PROJECT_CHARTER.md]] §3.10), maturité de l'outillage (DevTools, Storybook, tests), compatibilité de premier rang avec Tauri.
- **Alternatives** : SolidJS (réactivité fine, performances brutes supérieures sur de très grandes listes) ; Svelte 5 (compilateur, moins de boilerplate) ; Vue 3 (bonne DX, écosystème solide mais plus restreint côté outillage natif Tauri/React Native).
- **Avantages** : composant/hook comme unité universelle, composition native, immense choix de bibliothèques headless (Radix, TanStack).
- **Inconvénients** : re-render non chirurgical par défaut (mitigé par virtualisation — voir plus bas — et par la discipline de state architecture, [[ARCHITECTURE_PRINCIPLES.md]] §4).
- **Impact long terme** : plus grand bassin de contributeurs potentiels et durée de vie de l'écosystème la plus prévisible à 5 ans parmi les options considérées.

### Langage — TypeScript (mode strict)
- **Pourquoi** : le typage statique est non négociable pour un projet visant plusieurs années de maintenance et plusieurs contributeurs (objectif Maintenabilité, [[PROJECT_CHARTER.md]] §3.8). `strict: true` intégral, `noUncheckedIndexedAccess` activé.
- **Alternatives** : JavaScript pur (écarté — aucun filet de sécurité à l'échelle visée) ; ReScript/Flow (écosystème et bassin de contributeurs bien plus restreints).
- **Impact long terme** : coût d'entrée légèrement supérieur pour un nouveau contributeur, largement compensé par la réduction des régressions et l'auto-documentation des interfaces.

### UI — Tailwind CSS + Radix UI (primitives), design system propriétaire au-dessus
- **Pourquoi** : Radix UI fournit des primitives accessibles non stylées (menus, dialogues, sliders) qui résolvent les cas limites d'accessibilité clavier/lecteur d'écran (objectif Accessibilité, [[PROJECT_CHARTER.md]] §3.6) sans imposer de design. Tailwind fournit un système de contraintes de style cohérent et performant (purge CSS agressive).
- **Alternatives** : Material UI / Ant Design (design imposé, à l'opposé de l'objectif « jamais un thème », [[PROJECT_CHARTER.md]] §4) ; CSS-in-JS runtime (styled-components/Emotion — coût de performance au rendu, écarté par le budget de performance).
- **Avantages** : accessibilité résolue une fois, design entièrement propriétaire au-dessus.
- **Inconvénients** : nécessite la construction complète d'un design system (effort Phase 0-1, voir [[ROADMAP.md]]).
- **Impact long terme** : le design system devenant propriété du projet, il peut évoluer sans contrainte d'une bibliothèque de composants tierce.

### Icônes — Lucide
- **Pourquoi** : cohérent avec l'écosystème Radix, tree-shakeable (poids embarqué minimal), style neutre servant de base à une identité visuelle propre (pas d'icônes de marque tierce visibles).
- **Alternative** : Heroicons (set plus restreint), Phosphor Icons (poids et cohérence légèrement inférieurs pour l'usage visé).

### Animations — Motion (successeur de Framer Motion) + primitives CSS/Canvas pour le temps réel
- **Pourquoi** : Motion couvre les transitions déclaratives d'interface (ouverture de panneaux, listes) avec une API React idiomatique. Les éléments à fréquence de rafraîchissement élevée (barre de progression audio, visualiseur de spectre) sont animés hors du cycle de rendu React (transformations CSS pilotées par `requestAnimationFrame`, ou Canvas/WebGL pour le visualiseur) pour respecter le budget FPS ([[PERFORMANCE_BUDGET.md]]).
- **Alternative écartée** : tout piloter avec Motion, y compris le temps réel audio — écarté car cela réintroduirait des re-renders React sur des éléments à 60 Hz, contraire au principe de state architecture ([[ARCHITECTURE_PRINCIPLES.md]] §4).

### Gestion d'état (client) — Zustand
- **Pourquoi** : état de lecture, file d'attente, préférences UI — un store minimal, sans boilerplate, avec sélecteurs fins pour éviter les re-renders larges.
- **Alternatives** : Redux Toolkit (boilerplate et cérémonie disproportionnés pour le besoin) ; Jotai/Recoil (modèle atomique intéressant mais moins mature côté outillage DevTools pour un état de lecture centralisé).
- **Impact long terme** : API stable et minimale, faible surface de migration si un remplacement devient nécessaire.

### Gestion des données serveur — TanStack Query
- **Pourquoi** : cache, invalidation, re-fetch en arrière-plan et déduplication de requêtes pour toutes les données issues de `MusicSource` ([[ARCHITECTURE_PRINCIPLES.md]] §2), sans réimplémentation manuelle.
- **Alternative écartée** : gérer les données serveur dans le même store Zustand — rejeté explicitement, voir [[ARCHITECTURE_PRINCIPLES.md]] §4 (séparation state client/serveur, invariant d'architecture).

### Base de données locale — SQLite (natif, via plugin SQL Tauri) + IndexedDB (Dexie.js) en repli Web pur
- **Pourquoi** : voir [[ARCHITECTURE_PRINCIPLES.md]] §3 pour la justification complète de la double implémentation derrière l'interface `LocalStore`.
- **Alternative écartée** : SQLite compilé en WebAssembly pour un moteur unique sur toutes les cibles — écarté en Phase 0 pour le poids et la complexité additionnels côté Web pur (budget de démarrage, [[PERFORMANCE_BUDGET.md]]) ; réévaluable si le besoin de parité stricte de requêtes SQL sur Web devient bloquant.

### Audio — élément `<audio>` HTML + MediaSession API (socle), Web Audio API (enrichissement)
- Voir [[ARCHITECTURE_PRINCIPLES.md]] §5 pour l'architecture en couches et la règle de dégradation progressive.
- **Alternative écartée** : moteur audio 100 % Web Audio API dès le socle — écarté car certaines plateformes/contextes restreignent ou compliquent l'initialisation du contexte audio (interaction utilisateur requise, politiques d'autoplay), fragilisant la lecture de base.

### Virtualisation — TanStack Virtual
- **Pourquoi** : rendu de listes de dizaines à centaines de milliers d'éléments (bibliothèques massives, objectif Performance [[PROJECT_CHARTER.md]] §3.5) sans monter le DOM entier ; headless, s'intègre nativement avec React et Tailwind.
- **Alternative écartée** : `react-window` — API moins flexible pour les grilles hétérogènes (listes + grilles d'albums) que requiert le design system.

### Validation — Zod
- **Pourquoi** : validation de schéma à la frontière (réponses `JellyfinSource`, formulaires, configuration) avec inférence de types TypeScript automatique — une seule source de vérité entre le schéma d'exécution et le type statique.
- **Alternative écartée** : Yup (pas d'inférence de type aussi directe), validation manuelle (duplique la définition de type et le contrôle d'exécution, contraire au principe de non-duplication [[ENGINEERING_GUIDE.md]] §1.3).

### Tests — Vitest + React Testing Library + Playwright
- **Vitest** : tests unitaires et d'intégration, natif Vite, rapide.
- **React Testing Library** : tests de composants centrés sur le comportement utilisateur, pas l'implémentation.
- **Playwright** : tests de bout en bout sur la cible Web ; sur Desktop, tests E2E via le driver Tauri (`tauri-driver`) en Phase 1+ ; sur Mobile, tests E2E automatisés différés (gap documenté, voir [[PROJECT_CHARTER.md]] §5 et [[ROADMAP.md]]) — couverts en Phase 0-1 par des tests manuels de non-régression avant release.
- **Alternative écartée** : Jest — remplacé par Vitest pour la cohérence avec le pipeline Vite et la vitesse d'exécution.

### Lint — ESLint (config plate) + typescript-eslint + eslint-plugin-jsx-a11y
- **Pourquoi** : couverture la plus large de règles spécifiques React/hooks/accessibilité au moment de la rédaction de ce document.
- **Alternative envisagée** : Biome (lint + format unifiés, plus rapide) — non retenu en Phase 0 par prudence sur la couverture des règles React/a11y spécifiques ; à réévaluer via ADR si la vitesse de lint devient un point de friction mesuré.

### Formatage — Prettier
- **Pourquoi** : formatage non négociable et non débattu en revue de code (aucune discussion de style humaine sur un sujet automatisable).

### Documentation (code) — TSDoc + Storybook
- **TSDoc** : documentation des API publiques de modules (Domain, Data).
- **Storybook** : documentation vivante et testable visuellement du design system, sert aussi de terrain de test d'accessibilité et de responsive isolé par composant.

### CI/CD — GitHub Actions
- **Pourquoi** : intégration native avec l'hébergement du dépôt (GitHub, cohérent avec la stratégie open source, [[PROJECT_CHARTER.md]] §3.10), matrice multi-OS pour les builds Desktop, gratuit pour les dépôts publics.
- Pipelines : lint + typecheck + tests sur chaque PR ; build multi-cible et publication de release sur tag.

### Packaging — Bundler Tauri (Desktop : `.msi`/`.dmg`/`.AppImage` ; Mobile : `.apk`/`.ipa`) + build statique Web (PWA)
- **Pourquoi** : packaging natif intégré au même outillage que le runtime (§0), pas d'outil de packaging tiers additionnel.

### Build — Vite
- **Pourquoi** : temps de build et de rechargement à chaud les plus rapides de l'écosystème React actuel, intégration native avec Vitest et le plugin PWA (`vite-plugin-pwa`).

### Déploiement
- **Web/PWA** : build statique, déployable en conteneur Docker (sidecar auto-hébergé aux côtés de Jellyfin) ou hébergement statique classique.
- **Desktop/Mobile** : binaires publiés via GitHub Releases (Phase 0-1) ; distribution via stores d'applications (Microsoft Store, Mac App Store, F-Droid/Play Store) envisagée en Phase 2+ (voir [[ROADMAP.md]]).

---

## 2. Matrice de compatibilité

### Navigateurs supportés (cible Web/PWA)
| Navigateur | Version minimale | Notes |
|---|---|---|
| Chrome / Edge (Chromium) | 2 dernières versions majeures | Cible de référence pour le développement |
| Firefox | 2 dernières versions majeures | Web Audio API validée spécifiquement |
| Safari | 2 dernières versions majeures | Attention particulière aux politiques d'autoplay et au support PWA iOS |

### Systèmes d'exploitation (cible Desktop, via Tauri)
| OS | Version minimale |
|---|---|
| Windows | 10 (build 1809+) / 11 |
| macOS | 2 dernières versions majeures |
| Linux | Distributions majeures avec WebKitGTK à jour (Ubuntu LTS, Fedora récent) |

### Mobile (cible Mobile, via Tauri)
| OS | Version minimale |
|---|---|
| Android | 10+ |
| iOS | 16+ |

### Résolutions et formats
- Desktop/Web : responsive de 1024px à 4K, layout adaptatif (pas seulement redimensionné).
- Mobile : portrait prioritaire, paysage supporté pour la vue « lecture en cours ».
- Tablette : layout intermédiaire dédié (pas un simple agrandissement du layout mobile).

### Accessibilité
Voir [[PROJECT_CHARTER.md]] §3.6 pour les objectifs et [[DEFINITION_OF_DONE.md]] pour la checklist de vérification par fonctionnalité.

### Mode hors ligne / PWA
- Le build Web est une PWA installable (service worker via `vite-plugin-pwa`, stratégie de cache définie par type de ressource : app shell en cache-first, données bibliothèque en stale-while-revalidate).
- Le contenu audio téléchargé pour écoute hors ligne est stocké via `LocalStore` (voir [[ARCHITECTURE_PRINCIPLES.md]] §3), disponible sur Desktop/Mobile natif prioritairement ; le stockage hors ligne de fichiers audio volumineux sur navigateur pur (quota Storage API) est une capacité dégradée, documentée comme telle à l'utilisateur.

---

## 3. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0) | CTO / Lead Software Architect |

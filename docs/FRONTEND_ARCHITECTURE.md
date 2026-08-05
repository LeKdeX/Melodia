# FRONTEND_ARCHITECTURE.md — Architecture React et rendu (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Lead Frontend Engineer
> **Documents liés** : [[ARCHITECTURE_PRINCIPLES.md]], [[STACK_DECISIONS.md]], [[CODING_STANDARDS.md]]

> **Note de cadrage** : ce document couvre ce qu'une « architecture Next.js » aurait couvert (routing, rendu, chargement, erreurs), adapté à la stack réellement retenue — React 19 + Vite en SPA, livré via Tauri sur les trois cibles ([[TECH_STACK.md]] §0). Ce choix a été explicitement confirmé avec l'utilisateur en Phase 0.5 : Next.js (App Router/Server Components/Server Actions) nécessite un serveur Node persistant, incompatible avec l'argument « binaire natif unique sans dépendance serveur » qui a justifié Tauri. Melodia est une application authentifiée sans besoin de SEO ni de rendu public — le rendu serveur n'apporte aucune valeur ici.

---

## 1. Composants serveur / client — non applicable, et pourquoi

React Server Components n'existent pas dans une application 100 % côté client livrée en SPA statique. **Tous les composants de Melodia sont des composants client** au sens React — cette distinction Next.js ne s'applique pas et n'est donc pas dans le vocabulaire du projet. Toute donnée provenant du serveur (Jellyfin) transite par la couche Data ([[ARCHITECTURE_PRINCIPLES.md]] §2) et TanStack Query, jamais par un rendu serveur de composant.

## 2. Routing

**Décision retenue : TanStack Router.**

| Option | Avantages | Inconvénients |
|---|---|---|
| React Router | Le plus répandu, très large communauté | Typage des routes moins strict nativement, chargement de données moins intégré aux conventions du projet (TanStack Query déjà retenu) |
| TanStack Router | Typage de bout en bout des routes et paramètres, intégration native avec TanStack Query pour le préchargement de données par route, cohérent avec le reste de l'écosystème TanStack déjà adopté (Query, Virtual — voir [[TECH_STACK.md]]) | Communauté plus jeune que React Router |

**Pourquoi** : la cohérence d'écosystème (même famille que TanStack Query/Virtual déjà choisis) réduit la surface d'apprentissage pour un nouveau contributeur ([[PROJECT_CHARTER.md]] §3.10) et le typage strict de bout en bout s'aligne avec l'exigence de TypeScript strict ([[TECH_STACK.md]] §1).

### Structure de routes
Basée sur les features de [[CODING_STANDARDS.md]] §1 : `/library`, `/library/:artistId`, `/library/:artistId/:albumId`, `/playlists`, `/playlists/:id`, `/search`, `/settings`. La route de lecture en cours n'est pas une route dédiée mais un panneau persistant global (voir §6), pour ne jamais interrompre la lecture lors d'une navigation.

## 3. Chargement (équivalent du « Loading UI » Next.js)

Chaque route déclare son état de chargement via `Suspense` : un composant de squelette (`Skeleton`) spécifique à la feature, jamais un spinner générique plein écran qui casse la continuité visuelle. Le chargement des données est préchargé au niveau du routeur (TanStack Router + TanStack Query `loader`) avant le montage du composant de route, pour éviter le « cascading loading » (requêtes en cascade déclenchées composant par composant).

## 4. Gestion des erreurs (équivalent de l'« Error UI » Next.js)

Un `ErrorBoundary` par route (pas un unique boundary global) : une erreur sur la page playlists ne doit jamais faire disparaître la barre de lecture persistante (voir §6) ni le reste de l'application. Les erreurs de la couche Data ([[ARCHITECTURE_PRINCIPLES.md]] §2, erreurs typées) sont traduites en messages actionnables par le boundary, jamais en trace technique brute (cohérent avec [[SECURITY_GUIDELINES.md]] §8).

## 5. Lazy loading et découpage de code

- Chaque route est un point de découpage de code (`React.lazy` + `Suspense`) — aucune route n'est incluse dans le bundle initial au-delà de la route active.
- Les fonctionnalités lourdes et non systématiques (égaliseur audio, visualiseur, Storybook en dev) sont chargées à la demande, jamais dans le bundle initial (cohérent avec le budget de poids JS, [[PERFORMANCE_BUDGET.md]] §4).

## 6. Composition, Context et providers

- Le player audio est un **provider global unique** monté à la racine de l'application (`@melodia/app`), au-dessus du routeur — sa persistance à travers la navigation est un invariant, pas un détail d'implémentation (cohérent avec l'objectif UX de continuité, [[PROJECT_CHARTER.md]] §3.3).
- Les providers sont composés explicitement à la racine (`AppProviders`), jamais implicitement via des imports latéraux — un développeur doit pouvoir lire la liste complète des contextes actifs en un seul fichier.
- Composition plutôt qu'héritage, appliqué concrètement : les variantes de composants d'interface se construisent par des props de configuration et des primitives Radix composées, jamais par extension de classe (voir [[ARCHITECTURE_PRINCIPLES.md]] §6).

## 7. Hooks

- Un hook de feature (`usePlaybackQueue`) ne dépend jamais directement d'un hook d'une autre feature — toute donnée inter-feature transite par `@melodia/core` (Domain) ou par un événement applicatif typé ([[CODING_STANDARDS.md]] §4.8).
- Les hooks de données serveur encapsulent systématiquement TanStack Query (`useTracksQuery`, jamais un `useEffect` + `fetch` manuel) — voir [[DATA_LAYER.md]] §1.

## 8. Suspense et UI optimiste

- Toute mutation utilisateur à latence perceptible (ajout à une playlist, renommage) applique une mise à jour optimiste via TanStack Query, avec retour arrière automatique et notification claire en cas d'échec serveur — jamais un état d'interface figé en attente de confirmation réseau pour une action qui devrait sembler instantanée (cohérent avec l'objectif UX « zéro action critique à plus d'une interaction », [[PROJECT_CHARTER.md]] §3.3).

## 8bis. Props — conventions explicites (ajout Engineering Handbook)

- Une interface `ComponentNameProps` dédiée par composant ([[CODING_STANDARDS.md]] §4.1, déjà acté) — jamais des props inline non nommées au-delà d'un composant trivial à une seule prop.
- Props booléennes : jamais plus de deux sur un même composant sans les regrouper en un objet de configuration ou une prop de variante unique ([[ENGINEERING_GUIDE.md]] §1.8, déjà acté) — un composant avec cinq props booléennes indépendantes a 32 états combinatoires possibles, dont la plupart n'ont jamais de sens produit.
- `children` réservé à une composition de contenu réelle — jamais utilisé comme échappatoire pour éviter de nommer une prop de configuration explicite.
- Props par défaut définies au niveau de la déstructuration des paramètres, jamais via `defaultProps` (API historique, dépréciée pour les composants fonction).

## 8ter. Context — au-delà des providers globaux (ajout Engineering Handbook)

§6 couvre déjà le provider global unique (player). Un Context **local à une feature** (ex. partager un état de configuration entre plusieurs composants d'un même formulaire complexe sans le remonter à un store Zustand) est acceptable seulement si : l'état ne survit pas au démontage de la feature (sinon, c'est un store, [[DATA_LAYER.md]] §1) et le nombre de consommateurs reste restreint à cette feature (sinon, le coût de re-render non scoping de Context, [[TECHNOLOGY_COMPARISONS.md]] §3ter, devient un problème réel). Un Context de feature vit dans le dossier de la feature elle-même, jamais promu au niveau `AppProviders` sans besoin transverse réel.

## 9. Accessibilité du routing

Changement de route annoncé aux technologies d'assistance (gestion du focus sur le titre de page après navigation, région `aria-live` pour les changements d'état de lecture) — vérifié en revue selon [[DEFINITION_OF_DONE.md]], section Accessibilité.

---

## 10. Checklist de validation

- [ ] Le choix TanStack Router vs React Router est justifié sur les sept axes de comparaison — voir [[TECHNOLOGY_COMPARISONS.md]] §5 pour l'axe TanStack Query connexe (même écosystème).
- [ ] La résolution Next.js vs Vite est cohérente sur les trois documents qui la mentionnent ([[STACK_DECISIONS.md]] §1, [[TECHNOLOGY_COMPARISONS.md]] §2, ce document).
- [ ] Le comportement responsive (petit écran, tactile, 4K) est validé dans [[EXTREME_SCENARIOS.md]] §4.
- [ ] Aucun risque de re-render ou de dérive de layout n'est resté non documenté — voir [[RISK_REGISTER_TECHNICAL.md]] pour les risques transverses.

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | Lead Frontend Engineer |
| 0.2.0 | 2026-08-03 | Ajout de la checklist de validation et des renvois vers les documents du complément Phase 0.5 | Lead Frontend Engineer |
| 0.3.0 | 2026-08-04 | Engineering Handbook : ajout §8bis (conventions de props) et §8ter (Context local à une feature) — au lieu de créer REACT_GUIDE.md en doublon (ce document couvrait déjà routing/Suspense/Error Boundaries/composition/hooks) | Staff Frontend Engineer |

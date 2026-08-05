# SELECTOR_GUIDE.md — Stratégie de sélecteurs (Architecture d'état)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Senior Performance Engineer
> **Documents liés** : [[PERFORMANCE_GUIDE.md]] §5, [[DERIVED_STATE.md]], [[STORE_SPECIFICATIONS.md]]

[[PERFORMANCE_GUIDE.md]] §5 a déjà posé la règle de scoping strict des sélecteurs Zustand (« `useStore(s => s.currentTrack)`, jamais `useStore()` sans sélecteur »). Ce document étend cette règle en une stratégie complète : organisation, réutilisation, et son équivalent côté TanStack Query.

---

## 1. Sélecteurs Zustand — organisation

- **Sélecteur inline** pour un usage unique dans un seul composant — pas d'abstraction prématurée pour un besoin qui ne se répète pas.
- **Sélecteur nommé exporté** (`selectCurrentTrack`, `selectIsPlaying`) dès qu'un même sélecteur est utilisé dans plus d'un composant — vit dans le même fichier que le store qu'il sélectionne (`playerStore.ts`), jamais dans un fichier séparé qui casserait la colocalisation.
- **Sélecteur composé** (combine plusieurs stores ou un store + une query, [[DERIVED_STATE.md]]) : vit dans un hook dédié au plus près du composant consommateur (`useEnrichedQueue.ts`), jamais dans le store lui-même (un store ne connaît jamais un autre store, [[STORE_SPECIFICATIONS.md]] §5).

## 2. Égalité et re-render

- Zustand compare par référence par défaut — un sélecteur qui retourne un nouvel objet/tableau à chaque appel (`s => ({ a: s.a, b: s.b })`) déclenche un re-render à chaque changement de *n'importe quel* champ du store, même non sélectionné. Règle : un sélecteur retourne toujours soit une primitive, soit une référence stable (mémoïsée), jamais un littéral objet/tableau inline sans mémoïsation.
- Pour un sélecteur qui doit retourner plusieurs champs, `useShallow` (utilitaire Zustand dédié) est utilisé plutôt qu'une comparaison manuelle réimplémentée — cohérent avec [[ENGINEERING_GUIDE.md]] §2.3, ne pas réimplémenter un problème déjà résolu par l'outillage retenu.

## 3. Sélecteurs TanStack Query — `select` option

- L'option `select` de `useQuery` transforme le résultat d'une requête sans provoquer de re-fetch — utilisée pour dériver une forme d'affichage à partir d'une réponse déjà en cache (ex. extraire uniquement les titres d'une liste d'albums pour un composant qui n'a pas besoin du reste).
- Comme pour Zustand (§2), la fonction `select` doit être stable (définie hors du composant ou mémoïsée) — une fonction recréée à chaque rendu invaliderait la mémoïsation interne de TanStack Query sans bénéfice.

## 4. Réutilisation — éviter la duplication de logique de sélection

Un sélecteur qui exprime une règle métier (ex. « une piste est-elle actuellement en lecture ») n'est jamais dupliqué entre plusieurs composants qui en ont besoin — cohérent avec [[ENGINEERING_GUIDE.md]] §1.3. Exporté une fois depuis le store concerné (§1), importé partout où nécessaire.

## 5. Performance — quand un sélecteur devient un problème

Un sélecteur qui exécute un calcul non trivial (filtrage/tri d'une grande collection, [[DERIVED_STATE.md]] §2) à chaque rendu sans mémoïsation devient un point chaud mesurable sur une bibliothèque de 200 000 titres. Règle de décision : voir [[PERFORMANCE_GUIDE.md]] §5bis (mémoïsation réservée à un calcul mesurément coûteux) — un sélecteur de filtrage de bibliothèque en fait justement partie, jamais appliqué par précaution à un sélecteur trivial (`s => s.volume`).

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas la règle de scoping strict elle-même (voir [[PERFORMANCE_GUIDE.md]] §5).
- Ne redéfinit pas la discipline générale de mémoïsation (voir [[PERFORMANCE_GUIDE.md]] §5bis).
- Ne redéfinit pas les domaines d'état dérivé eux-mêmes (voir [[DERIVED_STATE.md]]).

## 7. Checklist de validation

- [ ] Aucun sélecteur ne retourne un littéral objet/tableau non mémoïsé pour plusieurs champs (§2) — `useShallow` utilisé à la place.
- [ ] Aucune fonction `select` TanStack Query n'est recréée à chaque rendu (§3).
- [ ] Un sélecteur métier réutilisé dans plusieurs composants est exporté une seule fois, jamais dupliqué (§4).

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Architecture d'état) | Senior Performance Engineer |

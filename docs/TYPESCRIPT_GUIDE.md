# TYPESCRIPT_GUIDE.md — Conventions TypeScript (Engineering Handbook)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Staff Frontend Engineer
> **Documents liés** : [[CODING_STANDARDS.md]] §2, §4.7, [[TECH_STACK.md]] §1

[[CODING_STANDARDS.md]] §2 a déjà posé la convention de nommage des types (`PascalCase`, pas de préfixe `I`) et §4.7 la préférence pour les unions de types littéraux sur les enums. Ce document complète ce qui manquait : la discipline TypeScript au niveau des primitives du langage lui-même — jamais une redécision des conventions déjà actées.

---

## 1. Interfaces vs `type`

- **`interface`** : réservée à la forme d'un objet destiné à être étendu ou implémenté (props de composant, contrat de Repository, [[REPOSITORY_PATTERN.md]] §3) — profite de la fusion de déclaration et de messages d'erreur plus lisibles à l'extension.
- **`type`** : tout le reste — unions, intersections, types utilitaires, alias de primitive (`type TrackId = string`). Jamais un débat cas par cas : la règle est « objet extensible → `interface`, tout le reste → `type` », appliquée sans exception pour rester prévisible.

## 2. Enums — confirmé interdits par défaut

[[CODING_STANDARDS.md]] §4.7 a déjà tranché : union de types littéraux plutôt qu'`enum` (`type PlaybackState = 'playing' | 'paused' | 'buffering'`) — évite l'artefact de compilation d'un enum classique (objet généré à l'exécution pour une simple énumération de valeurs). Un `enum` TypeScript n'est utilisé que si une itération native sur les valeurs est réellement requise et qu'une union ne le permettrait pas simplement — cas rare, à justifier explicitement en revue.

## 3. Const assertions

`as const` est utilisé pour figer un littéral (tableau, objet) en type précis plutôt que d'élargir automatiquement vers un type générique (`string[]` au lieu de `readonly ['a', 'b']`) — notamment pour les constantes de configuration ([[CODING_STANDARDS.md]] §4.6) consommées comme source d'un type union dérivé (`typeof QUALITY_PROFILES[number]`), évitant de déclarer le type séparément de sa valeur (source unique, cohérent avec [[ENGINEERING_GUIDE.md]] §1.3).

## 4. Generics

- Un generic est nommé explicitement (`TEntity`, `TResult`) dès que la fonction/le type a plus d'un paramètre générique — `T` seul reste acceptable uniquement pour un generic unique et évident (ex. `Result<T, E>`, déjà acté [[CODING_STANDARDS.md]] §4.4).
- Un generic n'est introduit que si le même code doit réellement fonctionner avec plusieurs types concrets (ex. `Repository<TEntity>` générique appliqué à `AlbumRepository`/`TrackRepository`) — jamais pour paraître plus abstrait sans second cas d'usage réel (YAGNI, [[ARCHITECTURE_PRINCIPLES.md]] §8bis).

## 5. Utility Types

Les utility types natifs (`Partial`, `Pick`, `Omit`, `Readonly`, `ReturnType`) sont préférés à une redéfinition manuelle de la même forme — un DTO partiellement mis à jour utilise `Partial<Track>`, jamais une seconde interface `TrackUpdate` dupliquant les mêmes champs en optionnel. Un utility type composé (ex. `Omit<Track, 'id'>`) reste inline si utilisé une fois, extrait en alias nommé (`type NewTrack = Omit<Track, 'id'>`) dès qu'il est réutilisé (cohérent avec la règle générale de non-duplication).

## 6. Type Guards

Une fonction de garde de type (`isTrack(value): value is Track`) est utilisée pour affiner un type `unknown`/union à la frontière du système (réponse réseau, [[MAPPER_GUIDE.md]] §3 — validation à la lecture) — jamais une assertion de type (`as Track`) pour contourner une vérification, qui masquerait une erreur réelle plutôt que de la révéler.

## 7. `never`

Utilisé pour deux cas uniquement : marquer une branche de code structurellement inatteignable (vérification d'exhaustivité d'une union discriminée dans un `switch`, garde-fou qui échoue la compilation si un nouveau cas est ajouté à l'union sans être traité) et typer le retour d'une fonction qui ne retourne jamais normalement (lève toujours une exception). Jamais utilisé comme un type de remplissage générique.

## 8. `unknown` vs `any`

- **`unknown`** : type par défaut pour toute donnée externe non encore validée (réponse réseau brute avant le Mapper, [[DATA_FLOW.md]] §2) — force une vérification explicite (type guard, §6) avant tout usage, contrairement à `any` qui désactive silencieusement la vérification de type.
- **`any` interdit sauf justification explicite** : tout usage d'`any` nécessite un commentaire adjacent expliquant pourquoi aucune alternative typée n'est possible (ex. interopérabilité avec une bibliothèque tierce non typée) — vérifié en revue de code ([[CODE_REVIEW_GUIDE.md]] §2) et par la règle ESLint `@typescript-eslint/no-explicit-any` déjà citée comme référence de rigueur ([[GLOSSARY.md]] §5, [[ENGINEERING_MANIFESTO.md]] §2).

---

## 9. Ce que ce document ne fait pas

- Ne redéfinit pas les conventions de nommage (voir [[CODING_STANDARDS.md]] §2).
- Ne redéfinit pas la préférence union-vs-enum, déjà tranchée (voir [[CODING_STANDARDS.md]] §4.7).
- Ne redéfinit pas le pattern `Result<T, E>` lui-même (voir [[CODING_STANDARDS.md]] §4.4).

## 10. Checklist de validation

- [ ] Toute nouvelle forme d'objet extensible utilise `interface`, tout le reste `type` (§1).
- [ ] Aucun `any` sans commentaire de justification adjacent (§8).
- [ ] Toute donnée externe non validée est typée `unknown`, jamais `any` (§8).

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Engineering Handbook) | Staff Frontend Engineer |

# STATISTICS_ENGINE.md — Architecture de calcul des statistiques (Phase 13)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Senior Performance Engineer
> **Documents liés** : [[STATISTICS_SPECIFICATION.md]], [[DOMAIN_MODELS.md]] §4, [[PERFORMANCE_GUIDE.md]] §6ter, [[REPOSITORY_PATTERN.md]]

> **Cadrage strict** : [[STATISTICS_SPECIFICATION.md]] reste la seule source de vérité sur *quelles* statistiques existent et *comment* elles sont présentées. [[PERFORMANCE_GUIDE.md]] §6ter a déjà noté que le calcul se fait en Web Worker. Ce document répond à une question que ni l'un ni l'autre ne couvre : **comment le moteur calcule, met en cache et invalide** ces agrégats.

---

## 1. Principe : jamais de recalcul sur le thread principal

Tout calcul d'agrégat (temps d'écoute total, classement d'artistes, activité par période — voir [[STATISTICS_SPECIFICATION.md]] §3) s'exécute dans un Web Worker dédié ([[CODING_STANDARDS.md]] §1bis, `shared/workers/statisticsWorker.ts`) — jamais sur le thread principal, qui resterait bloqué le temps du calcul sur un historique de plusieurs années ([[PERFORMANCE_GUIDE.md]] §6ter, déjà acté).

## 2. Entrée et sortie du moteur

- **Entrée** : le worker reçoit uniquement des identifiants et une plage temporelle (jamais l'historique complet sérialisé à chaque appel) — il lit `history` directement depuis `LocalStore` dans son propre contexte (IndexedDB est accessible depuis un Worker), via `HistoryRepository` ([[REPOSITORY_PATTERN.md]] §2).
- **Sortie** : un objet `Statistics` typé ([[DOMAIN_MODELS.md]] §4), transmis au thread principal par message typé ([[CODING_STANDARDS.md]] §1bis, jamais un objet muté partagé).

## 3. Cache de résultat

Le résultat calculé est mis en cache dans `statistics_cache` ([[DATABASE_SCHEMA.md]] §1) avec la période et un horodatage de calcul — une ouverture ultérieure de l'écran Statistiques lit d'abord ce cache (affichage immédiat) puis déclenche un recalcul en arrière-plan uniquement si un nouvel événement `history` est survenu depuis (§4), jamais un recalcul systématique à chaque ouverture d'écran.

## 4. Invalidation

- Déclenchée exclusivement par un nouvel événement `History` qualifié ([[DOMAIN_MODELS.md]] §3, seuil de comptage déjà franchi) — jamais par un minuteur arbitraire.
- Invalidation **incrémentale** quand c'est possible : un nouvel événement met à jour l'agrégat du jour/de la semaine courante sans recalculer l'historique complet — le recalcul complet ne survient qu'au changement de période de référence (ex. passage à un nouveau mois) ou à la première ouverture.

## 5. Ordre de grandeur et budget

Le calcul sur un historique de plusieurs années (potentiellement plusieurs centaines de milliers d'événements `history` pour un utilisateur de longue date) reste borné par les mêmes principes que la bibliothèque de référence ([[PERFORMANCE_BUDGET.md]] §0) : requêtes indexées sur `history` (`trackId`, `startedAt`, [[DATABASE_SCHEMA.md]] §3), jamais un scan complet non filtré par période.

## 6. Wrapped — cas particulier

La rétrospective annuelle ([[WRAPPED_SPECIFICATION.md]]) réutilise strictement ce même moteur avec une plage temporelle figée (année civile) — aucun mécanisme de calcul séparé, cohérent avec la non-duplication déjà actée ([[ENGINEERING_GUIDE.md]] §1.3). Son résultat est mis en cache indéfiniment une fois l'année écoulée (donnée figée, ne peut plus changer), contrairement aux autres agrégats qui restent recalculables.

---

## 7. Ce que ce document ne fait pas

- Ne redéfinit pas quelles statistiques existent ou comment elles s'affichent (voir [[STATISTICS_SPECIFICATION.md]]).
- Ne redéfinit pas le seuil de comptage d'une écoute (voir [[STATISTICS_SPECIFICATION.md]] §2).
- Ne redéfinit pas la convention générale des Web Workers (voir [[CODING_STANDARDS.md]] §1bis, [[PERFORMANCE_GUIDE.md]] §5bis).

## 8. Checklist de validation

- [ ] Aucun calcul d'agrégat statistique ne s'exécute sur le thread principal (§1).
- [ ] Toute invalidation de cache est déclenchée par un événement réel, jamais par un minuteur arbitraire (§4).
- [ ] Le Wrapped réutilise le moteur commun, aucune logique de calcul dupliquée (§6).

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Phase 13) | Senior Performance Engineer |

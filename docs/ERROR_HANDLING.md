# ERROR_HANDLING.md — Gestion des erreurs au niveau code (Phase 12)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Staff Frontend Engineer
> **Documents liés** : [[ERROR_STATES.md]], [[ERROR_EXPERIENCE.md]], [[CODING_STANDARDS.md]] §4.4, [[DATA_FLOW.md]] §4

> **Cadrage strict** : [[ERROR_STATES.md]] reste la seule source de vérité sur *quelle* erreur existe et *quel* message elle affiche ; [[ERROR_EXPERIENCE.md]] reste la seule source de vérité sur *quel pattern visuel* (toast/bannière/modale) la porte. Ce document répond à une question différente, jamais traitée ailleurs : **comment le code capture, classe et récupère d'une erreur** avant qu'elle n'atteigne l'un de ces deux documents.

---

## 1. Taxonomie des erreurs au niveau code

| Catégorie | Origine | Exemple | Correspond à (UX) |
|---|---|---|---|
| `NetworkError` | Requête réseau échouée (timeout, serveur injoignable) | Perte de connexion pendant une requête `MusicSource` | [[ERROR_STATES.md]] §1 |
| `NotFoundError` | Ressource absente côté serveur | Piste supprimée entre la mise en cache et la lecture | [[ERROR_STATES.md]] §2 |
| `StorageError` | Échec de lecture/écriture `LocalStore` | Cache local corrompu, migration échouée | [[ERROR_STATES.md]] §3 |
| `AuthError` | Jeton expiré ou invalide | Session Jellyfin expirée ([[SECURITY_GUIDE.md]] §3bis) | [[ERROR_STATES.md]] (renouvellement/reconnexion) |
| `ValidationError` | Entrée utilisateur invalide (formulaire) | Champ requis vide, format d'URL de serveur invalide | Géré localement au formulaire, jamais remonté à ce pipeline |
| `UnknownError` | Tout le reste, non anticipé | Exception non typée capturée par un Error Boundary | Fallback générique (§3) |

Cette taxonomie est fermée et exhaustive au niveau du code : toute nouvelle catégorie ajoutée doit être justifiée (quel comportement de récupération distinct exige-t-elle ?) plutôt qu'ajoutée par réflexe de granularité.

## 2. Erreurs attendues — valeurs de retour typées, jamais des exceptions

Conforme à [[CODING_STANDARDS.md]] §4.4 : un service de la couche Data ne lève jamais d'exception pour une erreur attendue (réseau, absence de résultat, authentification). Il retourne un type `Result<T, E>` explicite.

```
type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E }

// Exemple d'usage à la frontière MusicSource
async function getAlbums(artistId: string): Promise<Result<Album[], NetworkError | NotFoundError>>
```

- Un appelant qui ignore la branche `ok: false` est détecté par le typage strict (pas de `value` accessible sans discrimination préalable) — jamais un `try/catch` optionnel qu'un développeur pourrait oublier.
- Le Mapper (voir [[DATA_FLOW.md]] §2) ne fait jamais partie de ce mécanisme : il ne peut pas échouer par construction (valeurs par défaut explicites plutôt qu'une erreur sur champ manquant).
- TanStack Query consomme ce `Result` et expose son propre état (`data`/`error`/`isError`) à l'UI — pas de mécanisme parallèle réinventé (cohérent avec [[ARCHITECTURE_PRINCIPLES.md]] §4.1).

## 3. Erreurs inattendues — Error Boundaries

Réservées aux exceptions réellement non anticipées (bug de rendu, erreur de type non capturée par TypeScript à l'exécution — ex. donnée externe malformée au-delà de ce que le Mapper normalise).

- **Placement** : un Error Boundary racine (`AppProviders`, [[FRONTEND_ARCHITECTURE.md]] §6) capture tout ce qui remonte sans être intercepté plus bas — jamais de page blanche. Un Error Boundary secondaire entoure chaque route de premier niveau ([[SCREEN_SYSTEM.md]]), pour qu'une erreur de rendu sur un écran n'invalide jamais la Sidebar/le Mini Player qui l'entourent (cohérent avec [[ERROR_STATES.md]] §5, jamais une erreur globale pour un échec localisé).
- **Fallback UI** : un composant `ErrorFallback` générique ([[FEEDBACK_COMPONENTS.md]]), jamais une pile d'appel technique affichée à l'utilisateur (cohérent avec [[SECURITY_GUIDELINES.md]] §8) — action « Recharger cette section » systématiquement proposée.
- **Ne récupère jamais silencieusement** : un Error Boundary déclenché est toujours journalisé ([[LOGGING_SYSTEM.md]] §1, catégorie « Logs développeur ») avant tout affichage de secours — une erreur inattendue signale un défaut réel qui doit rester visible en diagnostics, même si l'utilisateur ne voit qu'un message discret.

## 4. Stratégie de nouvelle tentative (retry)

- **Requêtes réseau** (`NetworkError`) : backoff exponentiel avec plafond (ex. 1s, 2s, 4s, plafonné à 30s), géré nativement par la configuration de retry de TanStack Query — jamais une boucle de retry maison dupliquée ailleurs dans le code.
- **Écritures locales** (`StorageError`) : aucune nouvelle tentative automatique silencieuse — une écriture qui échoue sur `LocalStore` est un signal d'intégrité (voir [[DATA_LAYER.md]] §2.2, migration) qui doit être visible, jamais masqué par un retry qui pourrait aggraver une corruption.
- **Authentification** (`AuthError`) : une seule tentative de renouvellement silencieux du jeton ; en cas d'échec, reconnexion explicite demandée — jamais de boucle de renouvellement répétée qui masquerait un jeton définitivement invalide.

## 5. Journalisation des erreurs

Toute erreur des catégories §1 (hors `ValidationError`, locale au formulaire) est journalisée avec sa catégorie, son origine (module/feature) et un horodatage — jamais le contenu d'un jeton ou d'une donnée personnelle (cohérent avec [[SECURITY_GUIDE.md]] §3bis, [[LOGGING_SYSTEM.md]] §7). Le niveau de détail exact et la rotation des journaux sont définis dans [[LOGGING_SYSTEM.md]], non redécidés ici.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas les messages affichés à l'utilisateur (voir [[ERROR_STATES.md]]).
- Ne redéfinit pas le pattern visuel porteur du message (voir [[ERROR_EXPERIENCE.md]]).
- Ne redéfinit pas la stratégie de résolution de conflit de synchronisation (voir [[SYNC_ENGINE_SPECIFICATION.md]], déjà actée).

## 7. Checklist de validation

- [ ] Tout nouveau service de la couche Data retourne un `Result<T, E>` typé, jamais une exception pour un cas attendu ([[CODING_STANDARDS.md]] §4.4).
- [ ] Toute nouvelle route de premier niveau est entourée d'un Error Boundary dédié (§3).
- [ ] Aucune donnée sensible (jeton, contenu personnel) n'apparaît dans un journal d'erreur (§5, [[SECURITY_GUIDE.md]] §3bis).

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Phase 12) | Staff Frontend Engineer |

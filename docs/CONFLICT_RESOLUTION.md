# CONFLICT_RESOLUTION.md — Résolution de conflit par entité (Plateforme Offline)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Distributed Systems Architect
> **Documents liés** : [[ARCHITECTURE_PRINCIPLES.md]] §3.3, [[OFFLINE_SYSTEM.md]] §5-6, [[SYNC_ENGINE_SPECIFICATION.md]] §4bis

[[ARCHITECTURE_PRINCIPLES.md]] §3.3 a déjà tranché la règle par défaut (dernier écrit gagne) et [[OFFLINE_SYSTEM.md]] §5-6 les trois contraintes de surface (jamais de perte silencieuse, jamais de blocage bloquant, playlists collaboratives hors périmètre). Ce document applique ces règles déjà actées à chaque entité concrète — jamais une redécision, une matrice d'application.

---

## 1. Constitution de la résolution de conflit

1. **Un conflit est exceptionnel, jamais le chemin nominal** — ne survient que si la même entité a été modifiée hors ligne sur cet appareil ET côté serveur/un autre appareil pendant la même fenêtre de déconnexion.
2. **Aucune donnée utilisateur n'est jamais perdue silencieusement** — un conflit résolu automatiquement en écrasant une modification locale génère toujours une notification a posteriori ([[OFFLINE_SYSTEM.md]] §6, déjà acté).
3. **La résolution ne bloque jamais l'usage courant** — jamais de modale bloquante systématique pour un conflit mineur ([[OFFLINE_SYSTEM.md]] §6, déjà acté).
4. **Les opérations de synchronisation sont idempotentes** — rejouer un lot déjà appliqué avec succès ([[SYNC_ENGINE_SPECIFICATION.md]] §7ter) ne produit jamais d'effet supplémentaire ni de doublon.

## 2. Matrice de résolution par entité

| Entité | Priorité par défaut | Fusion possible ? | Rollback | Résolution |
|---|---|---|---|---|
| Favoris | Dernier écrit gagne (horodatage) | Non — un favori est un booléen, pas de fusion partielle possible | N/A (action idempotente : refaire un favori déjà actif ne change rien) | Automatique, notification a posteriori si écrasement |
| Historique | **Jamais de conflit par construction** — voir §3 | — | — | — |
| Playlists (locales) | Dernier écrit gagne au niveau de la playlist entière | **Oui** — fusion par union des pistes ajoutées de chaque côté si les deux versions divergent uniquement par ajout (jamais si l'un des deux a aussi supprimé/réordonné, cas trop ambigu pour une fusion automatique) | Version précédente conservée un cycle ([[SYNC_ENGINE_SPECIFICATION.md]] §7ter, historique court) | Automatique si fusion possible, sinon dernier écrit gagne + notification |
| Playlists (Jellyfin natives, collaboratives) | **Statut technique explicitement ouvert** ([[PLAYLIST_ENGINE.md]] §5, [[OFFLINE_SYSTEM.md]] §6) | Non résolu | Non résolu | **Manuel (préparé, non implémenté)** — hors périmètre tant que le statut collaboratif n'est pas tranché |
| Téléchargements | Priorité locale absolue — un téléchargement est une ressource physique locale, le serveur n'a jamais d'opinion sur son existence | Non applicable | N/A | Aucun conflit possible par construction (le serveur ne modifie jamais l'état d'un téléchargement) |
| Paramètres | Priorité locale — les préférences sont un concept par appareil, pas par compte, tant qu'aucune synchronisation de préférences inter-appareils n'est engagée ([[SETTINGS_SYSTEM.md]]) | Non applicable | N/A | Aucun conflit possible (le serveur ne stocke pas les préférences Melodia) |
| Statistiques | **Jamais de conflit par construction** — voir §3 | — | — | — |

## 3. Pourquoi Historique et Statistiques n'ont jamais de conflit

Les deux sont des **journaux append-only** ([[DOMAIN_MODELS.md]] §3-4) — un événement d'écoute est créé une seule fois, jamais modifié après coup, et les statistiques sont un agrégat recalculé (jamais une source de vérité indépendante, [[STATISTICS_ENGINE.md]] §3). Deux appareils qui écrivent chacun de nouveaux événements d'écoute pendant une déconnexion mutuelle ne produisent jamais de conflit à la reconnexion — les deux journaux s'unissent simplement (union, jamais un remplacement), cohérent avec la nature append-only de l'entité.

## 4. Fusion de playlists — algorithme (illustratif)

```
si (version_locale.trackIds ⊇ version_avant_déconnexion.trackIds)
   et (version_serveur.trackIds ⊇ version_avant_déconnexion.trackIds)
   et aucune suppression/réordonnancement des deux côtés :
     résultat = union(version_locale.trackIds, version_serveur.trackIds)  // fusion automatique
sinon :
     résultat = version la plus récente (dernier écrit gagne) + notification
```

La fusion automatique est **strictement limitée à l'ajout pur des deux côtés** — dès qu'une suppression ou un réordonnancement intervient d'un côté ou de l'autre, la fusion devient ambiguë (quel ordre final ? quelle intention prime ?) et le système bascule sur la règle par défaut plutôt que de deviner une intention utilisateur.

## 5. Résolution manuelle (préparation)

**Statut : préparé architecturalement, non implémenté** — cohérent avec [[PLAYLIST_ENGINE.md]] §5 et [[OFFLINE_SYSTEM.md]] §6, qui signalent déjà ce même statut ouvert. Le point d'extension attendu : une entrée `pendingManualResolution` dans le journal de changements locaux ([[SYNC_ENGINE_SPECIFICATION.md]] §4bis) plutôt qu'une résolution automatique silencieuse, consommée par une future UI de résolution — aucune UI ni mécanique de blocage n'existe à ce jour, seule la donnée de conflit (les deux versions) serait déjà conservée par le mécanisme de rollback court (§2, colonne Rollback) si ce point d'extension était activé.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas la règle de conflit générale ni les contraintes de surface (voir [[ARCHITECTURE_PRINCIPLES.md]] §3.3, [[OFFLINE_SYSTEM.md]] §5-6).
- Ne redéfinit pas le journal de changements locaux lui-même (voir [[SYNC_ENGINE_SPECIFICATION.md]] §4bis).
- Ne tranche pas le statut des playlists collaboratives (statut ouvert, non résolu ici).

## 7. Checklist de validation

- [ ] Toute nouvelle entité synchronisable reçoit une ligne dans la matrice §2 avant implémentation.
- [ ] Aucune fusion automatique n'est tentée au-delà du cas pur d'ajout des deux côtés (§4).
- [ ] Un conflit résolu par écrasement génère toujours une notification a posteriori (§1, principe 2).

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Plateforme Offline) | Distributed Systems Architect |

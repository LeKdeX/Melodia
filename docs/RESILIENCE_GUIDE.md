# RESILIENCE_GUIDE.md — Taxonomie de défaillance et recovery (Plateforme Offline)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Resilience Engineer
> **Documents liés** : [[ERROR_HANDLING.md]], [[PLAYBACK_ENGINE.md]] §5, [[SYNC_ENGINE_SPECIFICATION.md]] §7ter

[[ERROR_HANDLING.md]] a déjà posé la gestion d'erreur générique au niveau code (`Result<T,E>`, Error Boundaries, retry). [[PLAYBACK_ENGINE.md]] §5 a déjà appliqué un pattern de recovery à 3 paliers spécifique au moteur audio. Ce document généralise ce pattern à l'échelle de toute la plateforme offline — **résilience** (quels échecs sont anticipés) et **recovery** (comment le système en revient) sont traités ensemble, jamais deux documents séparés, parce que chaque scénario de défaillance ci-dessous n'a de sens qu'accompagné de sa réponse.

---

## 1. Constitution de la résilience

1. **Le réseau est considéré comme indisponible par défaut** — toute fonctionnalité est conçue pour l'absence de réseau d'abord, la présence de réseau ensuite (cohérent avec [[ARCHITECTURE_PRINCIPLES.md]] §3, déjà acté).
2. **Les opérations sont idempotentes** — rejouer une opération déjà réussie ne produit jamais d'effet supplémentaire ([[CONFLICT_RESOLUTION.md]] §1, principe 4).
3. **Aucune défaillance partielle ne devient une corruption totale** — une transaction atomique ([[INDEXEDDB_ARCHITECTURE.md]] §4) borne toujours le dommage possible d'un échec à son propre lot.
4. **Le retry a toujours une limite** — jamais une boucle infinie, toujours un palier final qui abandonne proprement avec notification (cohérent avec [[PLAYBACK_ENGINE.md]] §5, 3 paliers déjà actés comme modèle).

## 2. Les 8 scénarios de défaillance

| Scénario | Détection | Réponse immédiate | Recovery |
|---|---|---|---|
| Serveur indisponible | Timeout/erreur réseau sur toute requête `MusicSource` | Contenu déjà synchronisé reste utilisable ([[ARCHITECTURE_PRINCIPLES.md]] §3) | Retry avec backoff exponentiel ([[JELLYFIN_INTEGRATION.md]] §7bis, déjà acté) |
| Timeout | Délai explicite dépassé ([[JELLYFIN_INTEGRATION.md]] §7bis) | Requête traitée comme `NetworkUnavailable` ([[ERROR_HANDLING.md]] §1) | Idem serveur indisponible |
| Déconnexion (en cours de session) | Événement réseau natif | Bascule `Offline` si en lecture ([[PLAYBACK_STATE_MACHINE.md]] §5) ou statut `OFFLINE_SYSTEM.md` §3 sinon | Reconnexion automatique + resynchronisation ([[OFFLINE_SYSTEM.md]] §4) |
| Base corrompue (`LocalStore`) | Échec de lecture/écriture Dexie au démarrage ou en cours d'usage | Blocage du démarrage avec message explicite ([[DATA_LAYER.md]] §2.2, déjà acté) — jamais un état partiellement migré silencieux | Proposition de réinitialisation avec resynchronisation complète ([[ERROR_STATES.md]] §3) |
| Cache invalide | Entrée corrompue détectée à la consultation ([[CACHE_SYSTEM.md]] §7) | Entrée retirée silencieusement | Reconstruction à la prochaine requête, jamais un blocage |
| Téléchargement interrompu | Processus terminé avant complétion (crash, fermeture) | Fichier partiel jamais marqué `completed` ([[DOWNLOAD_SYSTEM.md]] §5quater) | Reprise depuis la progression déjà actée si le protocole le permet ([[DOWNLOAD_SYSTEM.md]] §5bis), sinon redémarrage complet |
| Crash applicatif | Non applicable en détection préventive — traité au redémarrage suivant | — | Voir §3 (redémarrage) |
| Redémarrage (après crash ou fermeture normale) | Démarrage de l'application | Restauration de l'état persisté ([[AUDIO_ENGINE.md]] §1bis, `PLAYBACK_ENGINE.md` §2) | File de téléchargement/synchronisation reprise automatiquement ([[DOWNLOAD_SYSTEM.md]] §5bis, [[SYNC_ENGINE_SPECIFICATION.md]] §7ter) |

## 3. Redémarrage après crash — validation au démarrage

Toute reprise après un arrêt non planifié (crash, coupure d'alimentation) exécute une validation légère avant de restaurer l'état complet : intégrité de `LocalStore` (ouverture Dexie réussie), cohérence de la file de téléchargement (statuts `downloading` orphelins requalifiés en `queued`, jamais laissés dans un état qui prétend une progression active inexistante), cohérence de la file de synchronisation (`sync_meta` relu, dernier lot confirmé identifié, [[SYNC_ENGINE_SPECIFICATION.md]] §7ter). Cette validation reste dans le budget de démarrage déjà acté ([[PERFORMANCE_BUDGET.md]] §1, < 2 s) — une validation plus profonde (scan complet d'intégrité) n'est jamais automatique, réservée à l'action manuelle « Réparer la bibliothèque » ([[MAINTENANCE_SYSTEM.md]] §2).

## 4. Recovery — le pattern à 3 paliers généralisé

Cohérent avec [[PLAYBACK_ENGINE.md]] §5 (déjà acté pour l'audio), appliqué ici à tout sous-système :
1. **Retry immédiat** — couvre une défaillance transitoire (glitch réseau, verrou de transaction momentané).
2. **Réévaluation de l'état** — re-résout ce qui a échoué (nouvelle requête de source, [[AUDIO_ENGINE.md]] §0bis.2 ; nouvelle tentative de lot, [[SYNC_ENGINE_SPECIFICATION.md]] §7ter) plutôt qu'une simple répétition de la même opération.
3. **Abandon propre avec notification** — dernier palier, jamais un blocage silencieux ; l'utilisateur est informé et une action de récupération explicite reste disponible (retry manuel, [[MAINTENANCE_SYSTEM.md]]).

## 5. Rollback

Cohérent avec [[SYNC_ENGINE_SPECIFICATION.md]] §7ter (déjà acté, jamais redécidé) : un rollback ne s'applique qu'à une transaction individuelle (un lot), jamais à un cycle complet déjà partiellement réussi — une synchronisation partielle reste toujours préférable à une absence de synchronisation ([[ARCHITECTURE_PRINCIPLES.md]] §3).

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas la gestion d'erreur générique au niveau code (voir [[ERROR_HANDLING.md]]).
- Ne redéfinit pas le pattern de recovery spécifique à l'audio, déjà acté (voir [[PLAYBACK_ENGINE.md]] §5), uniquement généralisé.
- Ne redéfinit pas la reprise de synchronisation elle-même (voir [[SYNC_ENGINE_SPECIFICATION.md]] §7ter).

## 7. Checklist de validation

- [ ] Chacun des 8 scénarios (§2) a une détection, une réponse immédiate et un recovery explicites.
- [ ] Toute reprise après redémarrage exécute la validation légère (§3) avant de restaurer l'état complet.
- [ ] Aucun retry n'est infini — le palier 3 (§4) abandonne toujours proprement.

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Plateforme Offline) | Resilience Engineer |

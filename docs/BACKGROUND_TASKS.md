# BACKGROUND_TASKS.md — Registre des tâches d'arrière-plan (Plateforme Offline)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Performance Engineer
> **Documents liés** : [[CODING_STANDARDS.md]] §1bis, [[PERFORMANCE_GUIDE.md]] §5bis, [[EVENT_SYSTEM.md]]

[[CODING_STANDARDS.md]] §1bis a déjà posé la convention de fichier des Web Workers. Chaque tâche de fond a été spécifiée individuellement dans son document propre au fil des phases précédentes — ce document est le premier registre qui les rassemble et pose les règles d'ordonnancement entre elles, jamais redécidées individuellement.

---

## 1. Registre des tâches de fond

| Tâche | Déclencheur | Worker dédié ? | Document propriétaire |
|---|---|---|---|
| Synchronisation | Manual/Scheduled/Background Sync ([[SYNC_ENGINE_SPECIFICATION.md]] §2bis) | Non — asynchrone sur le thread principal (I/O réseau, pas de calcul CPU intensif) | [[SYNC_ENGINE_SPECIFICATION.md]] |
| Nettoyage de cache/stockage | Limite de taille atteinte ou action manuelle | Non | [[CACHE_SYSTEM.md]], [[STORAGE_MANAGER.md]] |
| Indexation de recherche | Synchronisation initiale/incrémentale ([[INDEX_ENGINE.md]] §1-2) | **Oui** — Worker FlexSearch déjà acté ([[DATA_LAYER.md]] §3, [[PERFORMANCE_GUIDE.md]] §5sexies) | [[INDEX_ENGINE.md]] |
| Téléchargements | File active ([[DOWNLOAD_SYSTEM.md]] §3) | Non — I/O réseau/disque asynchrone | [[DOWNLOAD_SYSTEM.md]] |
| Extraction Artwork (thème dynamique) | Changement de piste | Non — coût déjà borné, [[DYNAMIC_THEME_GUIDE.md]] | [[DYNAMIC_THEME_GUIDE.md]] |
| Calcul de statistiques | Nouvel événement d'écoute qualifié | **Oui** — Worker dédié déjà acté ([[STATISTICS_ENGINE.md]] §1) | [[STATISTICS_ENGINE.md]] |
| Préchargement (pochettes, piste suivante) | Anticipation d'un besoin probable | Non | [[CACHE_SYSTEM.md]] §5, [[AUDIO_ENGINE.md]] §2 |

## 2. Règle d'ordonnancement — priorité entre tâches concurrentes

Quand plusieurs tâches de fond sont éligibles simultanément, l'ordre de priorité est : 1) Lecture audio (jamais interrompue par une tâche de fond, [[AUDIO_ENGINE.md]] §0, principe 6) ; 2) Synchronisation manuelle explicite ([[SYNC_ENGINE_SPECIFICATION.md]] §2bis, priorité la plus haute parmi les tâches non critiques) ; 3) Téléchargements explicites en file ; 4) Indexation/statistiques (Workers, n'entrent jamais en compétition avec le thread principal par construction) ; 5) Synchronisation planifiée/en arrière-plan, nettoyage, préchargement — la priorité la plus basse, différée si une ressource (réseau, CPU) est déjà sollicitée par une tâche de priorité supérieure.

## 3. Tâches en Worker vs thread principal — critère de décision

Cohérent avec [[PERFORMANCE_GUIDE.md]] §5bis (déjà acté) : une tâche rejoint un Worker si son coût de calcul CPU est mesurable ET non déjà asynchrone par nature (I/O réseau/disque, déjà non bloquant). L'indexation et les statistiques sont les deux seules tâches CPU-intensives du registre (§1) — cohérent avec le fait qu'aucune autre tâche de fond n'a justifié de Worker dédié jusqu'ici, pas une omission.

## 4. Une tâche de fond ne bloque jamais une action utilisateur explicite

Une tâche planifiée déjà en cours (ex. Scheduled Sync) cède immédiatement la priorité si l'utilisateur déclenche une action explicite en conflit de ressource (Manual Sync, un nouveau téléchargement prioritaire) — cohérent avec la règle déjà actée que Manual Sync interrompt et relance plutôt que d'attendre ([[SYNC_ENGINE_SPECIFICATION.md]] §2bis).

---

## 5. Ce que ce document ne fait pas

- Ne redéfinit aucune tâche individuellement — chacune reste possédée par son document propre (§1, colonne dédiée).
- Ne redéfinit pas la convention de fichier Worker (voir [[CODING_STANDARDS.md]] §1bis).

## 6. Checklist de validation

- [ ] Toute nouvelle tâche de fond est ajoutée au registre §1 avant implémentation, avec son document propriétaire.
- [ ] La lecture audio n'est jamais interrompue par une tâche de fond (§2).
- [ ] Une tâche CPU-intensive nouvelle est évaluée pour un Worker dédié selon le critère §3, jamais ajoutée au thread principal par défaut.

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Plateforme Offline) | Performance Engineer |

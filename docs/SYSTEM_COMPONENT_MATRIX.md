# SYSTEM_COMPONENT_MATRIX.md — Matrice des composants système (Phase 11)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal Platform Architect / Information Architect
> **Documents liés** : [[COMPONENT_CHECKLIST.md]], [[SCREEN_COMPONENT_MATRIX.md]], [[SYSTEM_CHECKLIST.md]]

> **Cadrage** : format déjà établi par [[COMPONENT_CHECKLIST.md]] (composants UI) et [[SCREEN_COMPONENT_MATRIX.md]] (écrans) — ce document applique le même format à l'échelle des systèmes (Phase 11), une dimension encore absente.

---

## 1. Matrice de dépendance entre systèmes

| Système | Dépend de | Consommé par |
|---|---|---|
| [[SYNC_ENGINE_SPECIFICATION.md]] | Serveur Jellyfin, `LocalStore` | [[CACHE_SYSTEM.md]], [[OFFLINE_SYSTEM.md]], [[NOTIFICATION_LIBRARY.md]] |
| [[CACHE_SYSTEM.md]] | [[SYNC_ENGINE_SPECIFICATION.md]] (invalidation) | [[ARTWORK_SYSTEM.md]], [[LYRICS_SYSTEM.md]], [[DIAGNOSTICS_SYSTEM.md]] |
| [[DOWNLOAD_SYSTEM.md]] | Stockage local, réseau | [[OFFLINE_SYSTEM.md]] (bibliothèque locale), [[COLLECTION_COMPONENTS.md]] (vue Downloaded) |
| [[OFFLINE_SYSTEM.md]] | [[DOWNLOAD_SYSTEM.md]], détection réseau | [[STATE_COMPONENTS.md]] (Offline State), [[NAVIGATION_SYSTEM.md]] (statut TopBar) |
| [[LOGGING_SYSTEM.md]] | Tous les systèmes qui journalisent (§1) | [[DIAGNOSTICS_SYSTEM.md]], [[MAINTENANCE_SYSTEM.md]] (export) |
| [[FEATURE_FLAGS.md]] | Aucune dépendance système | Toute fonctionnalité expérimentale future |
| [[UPDATE_SYSTEM.md]] | Plateforme de distribution (non tranchée) | [[NOTIFICATION_LIBRARY.md]] |

## 2. Composants qui partagent le même comportement transverse

| Comportement | Systèmes concernés |
|---|---|
| Jamais de perte silencieuse | Sync, Cache, Offline, Feature Flags (retrait) — cohérent avec [[SYSTEM_CHECKLIST.md]] §1 |
| Action explicite avant toute suppression | Cache (nettoyage), Download (suppression), Import/Export, Logging (export) |
| Suggestion jamais automatique | Download intelligent (§5ter), Cache nettoyage intelligent — même principe appliqué deux fois, jamais une décision prise à la place de l'utilisateur |
| Renvoi vers Logging | Sync, Error States, Cache — tout système qui journalise passe par le même mécanisme unique |

## 3. Diagramme d'interactions

```
                    ┌───────────────────┐
                    │  Serveur Jellyfin  │
                    └─────────┬──────────┘
                              │
                    ┌─────────▼──────────┐
                    │   SYNC ENGINE       │──────► Logging System
                    └────┬───────┬────────┘
                         │       │
            ┌────────────┘       └─────────────┐
            ▼                                   ▼
     ┌─────────────┐                    ┌──────────────┐
     │ CACHE SYSTEM │                    │ OFFLINE SYSTEM│
     └──────┬───────┘                    └───────┬───────┘
            │                                     │
            │            ┌────────────────────────┘
            ▼            ▼
     ┌─────────────────────────┐
     │     DOWNLOAD SYSTEM       │──────► Notifications
     └────────────┬─────────────┘
                  │
                  ▼
         ┌─────────────────┐
         │  Bibliothèque    │◄──────── Historique (Statistics)
         │  locale utilisable│
         │  hors ligne       │
         └─────────────────┘

     Diagnostics System ◄──── lit l'état de tous les systèmes ci-dessus (lecture seule, jamais d'écriture)
     Maintenance System ────► agit sur Sync/Cache/Download (actions correctives explicites)
```

**Lecture** : le Sync Engine est la racine de tout — sans lui, ni Cache ni Offline ni Download n'ont de données à manipuler. Diagnostics observe sans jamais modifier ; Maintenance est le seul système autorisé à déclencher des actions correctives sur les trois autres.

## 4. Checklist qualité de production (renvoi)

Voir [[SYSTEM_CHECKLIST.md]] — checklist complète non redécrite ici, ce document se limite à la cartographie des relations entre systèmes.

---

## 5. Checklist de validation

- [ ] Chaque système de la Phase 11 apparaît dans la matrice (§1) avec au moins une dépendance ou un consommateur.
- [ ] Le diagramme (§3) distingue clairement lecture seule (Diagnostics) et action corrective (Maintenance).
- [ ] Aucune règle de ce document ne contredit [[SYSTEM_CHECKLIST.md]].

---

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 11) | Principal Platform Architect / Information Architect |

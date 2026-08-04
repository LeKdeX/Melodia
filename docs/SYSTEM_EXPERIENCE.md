# SYSTEM_EXPERIENCE.md — Constitution des systèmes (Phase 11)

> **Statut** : document fondateur, vivant — capstone de Phase 11
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal Platform Architect
> **Documents liés** : tous les documents listés en §3

> **Cadrage** : ce document pose la philosophie qui gouverne tous les systèmes qui gravitent autour de l'expérience musicale (paramètres, synchronisation, cache, téléchargement, hors ligne, notifications, erreurs, maintenance, diagnostics, mises à jour, développeur, expérimental) et cartographie l'ensemble des documents de cette phase et des phases précédentes qu'elle organise.

---

## 1. Constitution

1. **Le système travaille discrètement.** Synchronisation, cache et préchargement restent invisibles tant qu'ils fonctionnent correctement ([[SYNC_ENGINE_SPECIFICATION.md]], [[MOTION_GUIDELINES.md]] §9) — un système bien conçu ne se remarque que lorsqu'il a besoin d'attention.
2. **L'utilisateur garde toujours le contrôle.** Aucune donnée transmise sans consentement ([[PRODUCT_RULES.md]] §10), aucune suggestion automatique qui devient une action sans confirmation ([[DOWNLOAD_SYSTEM.md]] §5ter, [[SYSTEM_COMPONENT_MATRIX.md]] §2).
3. **Aucune perte de données.** Principe vérifiable objectivement ([[SYSTEM_CHECKLIST.md]] §1), appliqué sans exception à chaque système de cette phase.
4. **Les opérations sont réversibles lorsque possible.** Pause de téléchargement, désactivation de flag, migration versionnée ([[UPDATE_SYSTEM.md]] §4) — et quand la réversibilité n'est pas possible (suppression de données locales), le dialogue de confirmation le signale sans ambiguïté ([[MAINTENANCE_SYSTEM.md]] §5).
5. **Les erreurs expliquent toujours une solution.** Rappel direct de [[ERROR_STATES.md]] (principe transverse déjà acté), jamais un message qui ne fait que constater un problème.
6. **Les traitements lourds sont invisibles.** Synchronisation complète, reconstruction de cache — jamais un blocage de l'interface pendant leur exécution ([[CACHE_SYSTEM.md]] §8).
7. **La musique reste prioritaire.** Aucun système de cette phase n'interrompt jamais une lecture en cours — critère de validation explicite ([[SYSTEM_CHECKLIST.md]] §1).

## 2. Ce que cette phase ajoute, ce qu'elle ne redécide pas

Cette phase documente la couche système qui soutient l'expérience musicale sans en faire partie visuellement — elle ne redécide aucun comportement produit déjà spécifié (Phases 1, 9) ni aucun composant déjà établi (Phases 6, 7). `DOWNLOAD_SYSTEM.md` et `OFFLINE_SYSTEM.md` restent les documents de la Phase 9, étendus ici plutôt que réécrits.

## 3. Carte complète de la Phase 11

### Documents nouveaux

| Document | Rôle |
|---|---|
| [[SYSTEM_EXPERIENCE.md]] | Constitution, carte, auto-revue comparative (9 références) |
| [[SETTINGS_SYSTEM.md]] | Référentiel exhaustif option par option des 10 catégories |
| [[SYNC_ENGINE_SPECIFICATION.md]] | Import initial/incrémentale/complète, détection de modification |
| [[CACHE_SYSTEM.md]] | Architecture, priorités, expiration, compression, réparation, reconstruction |
| [[DIAGNOSTICS_SYSTEM.md]] | Santé serveur, réseau, occupation cache/disque/mémoire, performances |
| [[MAINTENANCE_SYSTEM.md]] | Outils : reconstruire, réparer, réindexer, nettoyer, supprimer, exporter |
| [[UPDATE_SYSTEM.md]] | Vérification, notes de version, migration, rollback (préparation) |
| [[IMPORT_EXPORT_SYSTEM.md]] | Préférences, playlists locales, historique, favoris |
| [[LOGGING_SYSTEM.md]] | Catégories de logs, rétention, export, suppression |
| [[FEATURE_FLAGS.md]] | Cycle de vie d'un flag, activation/désactivation, canal bêta (préparation) |
| [[SYSTEM_COMPONENT_MATRIX.md]] | Dépendances entre systèmes, diagramme d'interactions |
| [[SYSTEM_CHECKLIST.md]] | Critères de mise en production spécifiques aux systèmes |

### Documents étendus en Phase 11

| Document | Ajout |
|---|---|
| [[DOWNLOAD_SYSTEM.md]] | §5bis reprise après redémarrage, §5ter téléchargement intelligent |
| [[OFFLINE_SYSTEM.md]] | §1bis mode avion |
| [[NOTIFICATION_LIBRARY.md]] | §8bis Maintenance, §8ter Mise à jour disponible |
| [[ERROR_STATES.md]] | §9bis journal technique, mise à jour du statut §9 |
| [[FOUNDATION_TESTING_GUIDE.md]] | §5ter tests d'intégration système |

### Pourquoi 5 livrables demandés n'ont pas de nouveau fichier

`DOWNLOAD_SYSTEM.md` et `OFFLINE_SYSTEM.md` existaient déjà sous ce nom exact depuis la Phase 9. `NOTIFICATION_SYSTEM.md`, `ERROR_SYSTEM.md` et `SYSTEM_TESTING_GUIDE.md` recoupaient [[NOTIFICATION_LIBRARY.md]], [[ERROR_STATES.md]] et [[FOUNDATION_TESTING_GUIDE.md]] respectivement — tous étendus plutôt que dupliqués.

## 4. Auto-revue comparative

> Principes retenus, jamais une implémentation copiée.

| Référence | Meilleure pratique retenue |
|---|---|
| Spotify | Synchronisation qui reste invisible même sur une bibliothèque volumineuse |
| Apple Music | Gestion du stockage transparente, distinction claire téléchargé vs en cache |
| Plexamp | Diagnostics accessibles mais jamais imposés à l'utilisateur non technique |
| Roon | Rigueur du journal technique sans jamais l'exposer par défaut |
| TIDAL | Qualité de téléchargement configurable indépendamment de la qualité de streaming |
| VS Code | Feature flags avec cycle de vie clair (expérimental → stable), jamais une fonctionnalité qui apparaît stabilisée sans y être passée |
| Raycast | Paramètres organisés et cherchables, jamais une liste plate de réglages |
| Arc Browser | Mises à jour communiquées avec des notes honnêtes, jamais un texte marketing générique |
| Notion | Import/Export pensé comme une vraie portabilité des données, pas un simple gadget |

## 5. Cohérence avec les bibles et systèmes déjà actés

Aucun système de cette phase ne redéfinit un token, une règle absolue ([[DESIGN_SYSTEM.md]] §3), un comportement de composant ([[COMPONENT_LIBRARY.md]], [[MUSIC_COMPONENT_LIBRARY.md]]), un principe de navigation ([[NAVIGATION_SYSTEM.md]] §1) ou un écran déjà assemblé ([[SCREEN_SYSTEM.md]]) — chaque système s'appuie explicitement sur ce qui est déjà établi.

---

## 6. Checklist de validation

- [ ] Chaque principe de la constitution (§1) renvoie vers son application concrète, jamais seulement aspirationnel.
- [ ] La carte (§3) référence tous les documents réellement concernés, aucun oublié.
- [ ] Les cinq consolidations (§3, « Pourquoi 5 livrables... ») sont documentées de façon cohérente dans chaque fichier concerné.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document, capstone de la Phase 11 | Principal Platform Architect |

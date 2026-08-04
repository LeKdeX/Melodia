# SYNC_ENGINE_SPECIFICATION.md — Mécanique de synchronisation (Phase 11)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Synchronization Engineer / Principal Platform Architect
> **Documents liés** : [[ARCHITECTURE_PRINCIPLES.md]] §3.3, [[OFFLINE_SYSTEM.md]], [[SYNC_SCREENS.md]]

> **Cadrage strict** : [[ARCHITECTURE_PRINCIPLES.md]] §3.3 a déjà tranché la stratégie *pull* déclenchée et la règle de conflit par défaut (dernier écrit gagne). [[OFFLINE_SYSTEM.md]] a déjà spécifié détection/conflits/résolution de surface. [[SYNC_SCREENS.md]] a déjà assemblé l'écran. Ce document ajoute la couche manquante : la mécanique interne (import initial vs incrémentale vs complète, détection de modification) — jamais redécidée par les documents précédents faute d'un foyer dédié.

---

## 1. Import initial

Première synchronisation après connexion à un serveur — récupère l'intégralité du catalogue exposé (métadonnées uniquement, jamais les fichiers audio eux-mêmes qui restent en streaming jusqu'à téléchargement explicite, [[DOWNLOAD_SYSTEM.md]]). Voir [[ONBOARDING_SCREENS.md]] pour l'écran associé — non redécrit ici. Progression communiquée par nombre d'éléments traités, jamais un pourcentage qui suppose une taille totale connue à l'avance de façon fiable.

**Import multi-utilisateurs (préparation, ajout Phase 13)** : chaque session Jellyfin est déjà isolée par utilisateur/serveur ([[JELLYFIN_INTEGRATION.md]] §6) — un import initial reste scoping strictement à la session active au moment de l'import, jamais un mélange de catalogues de deux utilisateurs d'un même serveur dans un seul cycle. Aucune fonctionnalité d'import simultané multi-utilisateur n'est engagée à ce stade (cohérent avec YAGNI, [[ARCHITECTURE_PRINCIPLES.md]] §8bis) — l'isolation déjà actée suffit à ne pas bloquer cette évolution future.

## 2. Synchronisation incrémentale (défaut en usage courant)

Déclenchée à l'ouverture de l'application, à intervalle configurable, ou manuellement (Pull to Refresh, [[MOBILE_NAVIGATION.md]] §4) — récupère uniquement les éléments modifiés depuis la dernière synchronisation réussie (horodatage de référence conservé dans `LocalStore`, [[DATA_LAYER.md]]). Jamais un re-téléchargement complet du catalogue à chaque synchronisation courante — coût réseau et temps disproportionnés par rapport au volume réel de changement habituel.

## 3. Synchronisation complète (action manuelle explicite uniquement)

Re-récupère l'intégralité du catalogue, comme l'import initial (§1) — jamais déclenchée automatiquement, réservée à un cas de récupération (soupçon d'incohérence, [[MAINTENANCE_SYSTEM.md]] Réindexer) ou à un changement de serveur. Action explicite avec confirmation si elle risque d'être longue (bibliothèque volumineuse, [[PERFORMANCE_BUDGET.md]] §1).

## 4. Détection des modifications

Le serveur Jellyfin expose un mécanisme de changement (horodatage de dernière modification par élément ou par bibliothèque, selon ce que l'API Jellyfin fournit réellement — non supposé au-delà de ce que [[JELLYFIN_INTEGRATION.md]] a déjà vérifié). Trois natures de changement traitées distinctement :
- **Ajout** : nouvel élément, intégré à la bibliothèque locale sans notification systématique (sauf artiste suivi, [[NOTIFICATION_LIBRARY.md]] §8).
- **Modification** : métadonnées mises à jour (ex. pochette changée) — mise à jour silencieuse du cache local ([[CACHE_SYSTEM.md]]).
- **Suppression** : élément retiré côté serveur — retiré localement sauf s'il est téléchargé (le fichier téléchargé reste, marqué comme non lié à une source serveur active, cohérent avec la priorité au contenu déjà téléchargé par l'utilisateur).

## 5. Mise à jour du cache (renvoi)

Voir [[CACHE_SYSTEM.md]] — toute synchronisation qui détecte une modification invalide l'entrée de cache concernée (pochette, métadonnées) plutôt que de la purger entièrement, non redécidé ici.

## 6. Historique et journal de synchronisation (renvoi)

Voir [[SYNC_SCREENS.md]] §6-7 (History, Logs) pour la surface utilisateur — ce document précise uniquement que chaque cycle de synchronisation (§1-3) génère une entrée dans [[LOGGING_SYSTEM.md]] (catégorie « logs synchronisation »), qu'il réussisse ou échoue.

## 7. Statut (renvoi)

Voir [[OFFLINE_SYSTEM.md]] §3 — non redécrit ici.

## 7bis. Delta Sync et Batch Sync (ajout Phase 13)

- **Delta Sync** : nom technique de ce que §2 décrit déjà (synchronisation incrémentale par horodatage) — précisé ici que le delta est calculé côté serveur (paramètre de date de modification de l'API Jellyfin, [[JELLYFIN_INTEGRATION.md]] §3) et non par comparaison de listes complètes côté client, qui serait coûteux et inutile.
- **Batch Sync** : les éléments modifiés détectés (§4) sont récupérés par lots (voir [[JELLYFIN_INTEGRATION.md]] §7bis, batch requests) plutôt qu'un appel par élément — un lot échoué n'invalide pas les lots déjà traités avec succès (§7ter, validation).

## 7ter. Reprise après interruption, rollback et validation (ajout Phase 13)

- **Reprise après interruption** : la progression d'une synchronisation (import initial ou complète, §1/§3) est persistée par lot traité (`sync_meta`, [[DATABASE_SCHEMA.md]] §1) — une interruption (fermeture de l'application, perte réseau) reprend au dernier lot confirmé, jamais depuis le début, cohérent avec la reprise de téléchargement déjà actée ([[DOWNLOAD_SYSTEM.md]] §5bis).
- **Validation** : chaque lot reçu est validé structurellement (schéma attendu, [[DTO_SPECIFICATION.md]]) avant écriture dans `LocalStore` — un lot invalide est rejeté et journalisé ([[LOGGING_SYSTEM.md]]), jamais écrit partiellement de façon incohérente.
- **Rollback** : si un cycle de synchronisation complet échoue après avoir déjà écrit plusieurs lots valides, les lots déjà écrits **restent** (chacun individuellement valide, validation ci-dessus) — un rollback complet de tous les lots d'un cycle interrompu n'est jamais déclenché, cohérent avec la règle déjà actée qu'une synchronisation partielle n'est jamais pire qu'une absence de synchronisation ([[ARCHITECTURE_PRINCIPLES.md]] §3, priorité au local). Seule une transaction Dexie individuelle (un lot, [[INDEXEDDB_ARCHITECTURE.md]] §4) peut faire l'objet d'un rollback atomique en cas d'échec partiel en son sein.

## 8. Reconstruction (renvoi)

Voir [[MAINTENANCE_SYSTEM.md]] — la reconstruction de bibliothèque est une action de maintenance qui déclenche une synchronisation complète (§3) suivie d'une reconstruction de cache ([[CACHE_SYSTEM.md]]), jamais une mécanique propre distincte de ce qui est déjà décrit ici.

---

## 9. Checklist de validation

- [ ] Import initial, incrémentale et complète restent trois mécaniques explicitement distinctes, jamais confondues.
- [ ] Aucune règle de conflit ou de stratégie technique n'est redécidée — renvoi systématique vers [[ARCHITECTURE_PRINCIPLES.md]] §3.3 et [[OFFLINE_SYSTEM.md]].
- [ ] Chaque cycle de synchronisation est traçable dans [[LOGGING_SYSTEM.md]] (§6).

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 11) | Synchronization Engineer / Principal Platform Architect |
| 0.2.0 | 2026-08-04 | Phase 13 : ajout §7bis (Delta/Batch Sync), §7ter (reprise/rollback/validation) et préparation import multi-utilisateurs (§1) — au lieu de créer SYNC_ENGINE.md/IMPORT_ENGINE.md en doublon | Synchronization Engineer |

# MAINTENANCE_SYSTEM.md — Outils de maintenance (Phase 11)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal Platform Architect / Synchronization Engineer
> **Documents liés** : [[CACHE_SYSTEM.md]], [[SYNC_ENGINE_SPECIFICATION.md]], [[DIALOG_LIBRARY.md]]

> **Cadrage** : chaque outil de ce document invoque un mécanisme déjà spécifié ([[CACHE_SYSTEM.md]], [[SYNC_ENGINE_SPECIFICATION.md]], [[DOWNLOAD_SYSTEM.md]]) — ce document assemble ces outils en une surface de maintenance cohérente, sans redécider leur mécanique interne.

---

## 1. Reconstruire le cache

Invoque [[CACHE_SYSTEM.md]] §8 — sélection de catégorie (Metadata/Image/Waveform/Lyrics, une ou toutes) avant confirmation ([[DIALOG_LIBRARY.md]] §5), jamais une reconstruction globale imposée si une seule catégorie pose problème.

## 2. Réparer la bibliothèque

Détecte les incohérences entre `LocalStore` et le catalogue serveur réel (élément référencé localement mais introuvable côté serveur, ou l'inverse) — propose une synchronisation complète ciblée ([[SYNC_ENGINE_SPECIFICATION.md]] §3) plutôt qu'une reconstruction aveugle de tout le cache.

## 3. Réindexer

Reconstruit l'index de recherche local (FlexSearch, [[STACK_DECISIONS.md]] §2) à partir des métadonnées déjà en cache — action rapide et peu coûteuse par rapport à la reconstruction de cache (§1), jamais confondue avec elle : réindexer ne re-télécharge aucune métadonnée, il ne fait que reconstruire la structure de recherche depuis des données déjà présentes.

## 4. Nettoyer les téléchargements

Renvoi [[DOWNLOAD_SYSTEM.md]] §6 (Cache Manager) — action groupée pour supprimer les téléchargements non réécoutés depuis une période choisie, toujours avec liste de prévisualisation avant confirmation (jamais une suppression groupée sans revue explicite du contenu concerné).

## 5. Supprimer les données locales

Renvoi [[DIALOG_LIBRARY.md]] §5-6 — ce document précise que cette action est la plus destructive de la surface de maintenance (efface Metadata/Image/Waveform/Lyrics Cache, l'historique local si non désactivé séparément, et nécessite une resynchronisation complète ensuite) — dialogue de confirmation le plus explicite de toute l'application, nommant précisément tout ce qui sera perdu.

## 6. Exporter les diagnostics

Renvoi [[DIAGNOSTICS_SYSTEM.md]] §8 — non redécrit ici.

## 7. Ordre de recommandation en cas de problème

Face à un comportement anormal signalé par un utilisateur, l'ordre d'outils recommandé (du moins au plus destructif) est : Réindexer (§3) → Réparer la bibliothèque (§2) → Reconstruire le cache (§1) → Supprimer les données locales (§5) — jamais l'inverse, cohérent avec le principe que les opérations réversibles priment sur les opérations destructives quand un problème peut être résolu par une action moins radicale.

## 8. Accessibilité

Chaque outil reste un Button standard ([[BUTTON_SPECIFICATION.md]]) avec confirmation proportionnée à sa gravité (§7) — aucune action de cette page n'est accessible uniquement à la souris.

---

## 9. Checklist de validation

- [ ] Chaque outil invoque un mécanisme déjà spécifié, aucune nouvelle mécanique introduite ici.
- [ ] L'ordre de recommandation (§7) va du moins au plus destructif, jamais l'inverse.
- [ ] Supprimer les données locales reste le dialogue de confirmation le plus explicite de l'application.

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 11) | Principal Platform Architect / Synchronization Engineer |

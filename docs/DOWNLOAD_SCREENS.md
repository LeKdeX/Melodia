# DOWNLOAD_SCREENS.md — Écrans de téléchargement (Phase 10)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / Audio Software Engineer
> **Documents liés** : [[SCREEN_SYSTEM.md]] §2, [[DOWNLOAD_SYSTEM.md]], [[SETTINGS_COMPONENTS.md]]

> **Cadrage** : [[DOWNLOAD_SYSTEM.md]] a déjà spécifié file, priorités, pause/reprise, échec et stockage — ce document assemble ces comportements en un écran unique à onglets.

---

## 1. Présentation

Écran unique regroupant tous les aspects du téléchargement — jamais fragmenté en plusieurs pages séparées pour « En cours » et « Terminé », qui obligerait à naviguer entre deux vues pour une même préoccupation.

## 2. Composition

```
[TopBar — titre "Téléchargements" + Storage Indicator résumé]
[Tabs — En cours (Queue) | Terminés (Completed)]
[Main — Track Row avec ProgressBar (En cours) ou statut simple (Completed)]
[Right Panel (desktop uniquement) — Storage Indicator détaillé + Cache Manager, [[SETTINGS_COMPONENTS.md]]]
[Mini Player — persistant]
```

## 3. Download Queue (onglet "En cours")

Liste ordonnée par priorité ([[DOWNLOAD_SYSTEM.md]] §3), chaque ligne avec ProgressBar + action Pause/Reprendre/Prioriser (Menu Button).

## 4. Completed (onglet "Terminés")

Liste des téléchargements terminés, triée par date — chaque ligne avec action de suppression individuelle ([[DIALOG_LIBRARY.md]] §2).

## 5. Offline Status

Indicateur transverse (pas un onglet séparé) visible dans la TopBar de cet écran, identique à celui de [[TOPBAR_SPECIFICATION.md]] §4 — non redécrit ici.

## 6. Errors

Élément en échec reste visible dans l'onglet En cours (jamais déplacé dans une vue séparée) avec l'icône d'erreur déjà définie ([[TRACK_COMPONENTS.md]] §5) et l'action Réessayer directement accessible — cohérent avec [[DOWNLOAD_SYSTEM.md]] §5 (un échec ne bloque jamais la file, reste visible jusqu'à résolution).

## 7. Priorities

Voir [[DOWNLOAD_SYSTEM.md]] §3 — assemblage : l'action « Prioriser » d'un Menu Button déplace visuellement l'élément en tête de la liste En cours avec une animation List Insert/Remove ([[ANIMATION_LIBRARY.md]] §5-6), jamais un réordonnancement silencieux sans retour visuel.

## 8. États et cas limites propres à l'assemblage

- **Aucun téléchargement, jamais utilisé** : Empty State avec action directe vers Bibliothèque ([[STATE_COMPONENTS.md]]).
- **File très longue** : virtualisée comme toute liste dense ([[PERFORMANCE_GUIDE.md]] §6ter), Right Panel reste synchronisé sans re-fetch à chaque mise à jour de progression individuelle.

## 9. Responsive

Voir [[RESPONSIVE_LAYOUTS.md]]. Mobile : Right Panel absent, Storage Indicator résumé accessible via une action dédiée dans la TopBar plutôt qu'un panneau permanent.

---

## 10. Checklist de validation

- [ ] En cours et Terminés restent un seul écran à onglets, jamais deux pages séparées.
- [ ] Un élément en échec reste visible et actionnable, jamais masqué (§6).
- [ ] Aucun comportement de DOWNLOAD_SYSTEM.md n'est redécidé ici.

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 10) | Product Designer / Audio Software Engineer |

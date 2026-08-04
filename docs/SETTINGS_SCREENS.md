# SETTINGS_SCREENS.md — Écrans de paramètres (Phase 10)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / UX Architect
> **Documents liés** : [[SCREEN_SYSTEM.md]] §2, [[SETTINGS_SPECIFICATION.md]], [[SETTINGS_COMPONENTS.md]]

> **Cadrage** : [[SETTINGS_COMPONENTS.md]] a déjà spécifié Preference Row et toutes ses variantes — ce document assemble les 12 catégories demandées en une structure Sidebar + contenu déjà générale ([[SETTINGS_SPECIFICATION.md]]).

---

## 1. Présentation

Un seul écran à navigation interne (Settings Sidebar + contenu), jamais 12 pages indépendantes qui casseraient la cohérence de recherche interne déjà actée ([[SETTINGS_SPECIFICATION.md]] §Paramètres, recherche interne pour les grandes sections).

## 2. Composition

```
[Settings Sidebar — 12 catégories, [[SETTINGS_COMPONENTS.md]]]
[Main]
├─ General — préférences globales de base
├─ Appearance — Theme Selector ([[SETTINGS_COMPONENTS.md]])
├─ Playback — Crossfade, Gapless, Sleep Timer par défaut ([[PLAYER_SPECIFICATION.md]] §5bis-5ter)
├─ Audio — qualité de streaming, égaliseur si engagé
├─ Downloads — qualité de téléchargement ([[DOWNLOAD_SYSTEM.md]] §7)
├─ Storage — Storage Indicator détaillé
├─ Cache — Cache Manager ([[SETTINGS_COMPONENTS.md]])
├─ Jellyfin — Server Selector, gestion multi-serveurs ([[JELLYFIN_INTEGRATION.md]] §6)
├─ Accounts — profil de connexion ([[SCREEN_SPECIFICATIONS.md]] §6, écran Profil fusionné ici comme catégorie)
├─ Developer — Developer Panel ([[SETTINGS_COMPONENTS.md]])
├─ Labs — Labs Panel, chaque fonctionnalité avec avertissement de statut ([[SCREEN_SPECIFICATIONS.md]] §6)
└─ About — statique, version/licence/mentions
[Mini Player — persistant]
```

## 3. Chaque catégorie — anatomie commune

Toute catégorie assemble une suite de Preference Row/Settings Section ([[SETTINGS_COMPONENTS.md]]) — jamais une mise en page ad hoc par catégorie, cohérent avec la cohérence d'interaction déjà actée ([[PRODUCT_RULES.md]] §6).

## 4. États et cas limites propres à l'assemblage

- **Réglage non par défaut** : indicateur visuel déjà acté ([[SCREEN_SPECIFICATIONS.md]] §6) sur l'item de Sidebar concerné, jamais uniquement visible en ouvrant la catégorie.
- **Recherche interne sans résultat** : Empty State local à la zone de contenu, Sidebar reste inchangée.
- **Aucun serveur Jellyfin connecté** (cas limite rare, déconnexion totale) : catégorie Jellyfin affiche directement l'écran de reconnexion plutôt qu'une liste vide de serveurs.

## 5. Responsive

Voir [[RESPONSIVE_LAYOUTS.md]]. Mobile : Settings Sidebar devient une liste de catégories plein écran, chaque catégorie ouverte remplace la liste plutôt que de coexister en deux colonnes (identique au pattern Master-Detail replié, [[COMPOSING_RULES.md]] §8).

---

## 6. Checklist de validation

- [ ] Les 12 catégories restent un seul écran à navigation interne, jamais 12 pages indépendantes.
- [ ] Chaque catégorie utilise l'anatomie commune (§3), aucune mise en page ad hoc.
- [ ] Aucun comportement de réglage déjà spécifié dans [[SETTINGS_SPECIFICATION.md]] n'est redécidé ici.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 10) | Product Designer / UX Architect |

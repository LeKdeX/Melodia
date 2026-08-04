# SEARCH_SCREENS.md — Écrans de recherche (Phase 10)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / UX Architect
> **Documents liés** : [[SCREEN_SYSTEM.md]] §2, [[SEARCH_COMPONENTS.md]], [[SEARCH_NAVIGATION.md]]

> **Cadrage** : [[SEARCH_COMPONENTS.md]] et [[SEARCH_NAVIGATION.md]] ont déjà spécifié chaque composant et le comportement de navigation à travers eux — ce document assemble uniquement les états d'écran successifs d'une session de recherche.

---

## 1. Présentation

La recherche n'est pas une page unique mais une séquence d'états du même écran (SearchField ouverte → suggestions → résultats) — jamais une navigation entre plusieurs pages séparées, cohérent avec [[COMMAND_PALETTE.md]] §1 (un seul point d'entrée unifié).

## 2. Composition — séquence

```
Search Home (avant saisie)
├─ Recent Searches ([[SEARCH_COMPONENTS.md]])
└─ Search Suggestions (si historique local disponible)

Search Results (pendant/après saisie)
├─ Search Filters (Chips actifs)
└─ Results groupés par catégorie ([[SEARCH_COMPONENTS.md]] §2)

Advanced Search (Panel/BottomSheet superposé, sur demande explicite)
└─ Contrôles Select/Checkbox additionnels ([[SEARCH_COMPONENTS.md]] §Advanced Filters)

Search Empty State (aucun résultat)
└─ Renvoi [[STATE_COMPONENTS.md]] Empty State
```

## 3. Search History (écran dédié, distinct de Recent Searches)

Vue complète et consultable de l'historique de recherche ([[NAVIGATION_HISTORY.md]] §6) — accessible depuis Search Home via une action « Voir tout », jamais confondue avec Recent Searches qui n'affiche qu'un aperçu court en tête de Search Home.

## 4. États et cas limites propres à l'assemblage

- **Aucun historique de recherche** (première utilisation) : Search Home affiche directement un état neutre invitant à commencer une recherche, jamais un bloc « Recherches récentes » vide.
- **Recherche avec Advanced Search actif** : les Filters (§2) restent visibles et modifiables sans repasser par le panneau Advanced Search pour un ajustement mineur — seul l'ouverture initiale nécessite le panneau complet.
- **Bascule Search → Command Palette** : jamais un double système — voir [[SEARCH_COMPONENTS.md]] fusion Global Search/SearchField déjà actée.

## 5. Responsive

Voir [[RESPONSIVE_LAYOUTS.md]] et [[SEARCH_NAVIGATION.md]] §4 (navigation tactile) — non redécrit ici. Sur mobile, Advanced Search s'ouvre systématiquement en BottomSheet plein écran plutôt qu'en Panel partiel.

---

## 6. Checklist de validation

- [ ] La recherche reste une séquence d'états d'un seul écran, jamais une navigation entre pages séparées.
- [ ] Search History et Recent Searches restent explicitement distincts.
- [ ] Aucun comportement de composant déjà spécifié n'est redécidé ici.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 10) | Product Designer / UX Architect |

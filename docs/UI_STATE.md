# UI_STATE.md — Classification de l'état d'interface pur (Architecture d'état)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Staff React Engineer
> **Documents liés** : [[DATA_LAYER.md]] §1, [[CODING_STANDARDS.md]] §4.1

[[DATA_LAYER.md]] §1 pose déjà la première branche de l'arbre de décision : « la donnée est locale à un seul composant et ne survit pas à son démontage → `useState` local, jamais dans un store global ». Ce document est la liste concrète des domaines d'UI state que le cadrage nomme, avec pour chacun la réponse à la question déjà posée par l'arbre de décision — aucun de ces domaines n'a jamais reçu de réponse explicite nommément jusqu'ici.

---

## 1. Domaines d'UI state et leur mécanisme

| Domaine | Mécanisme par défaut | Exception qui justifierait un store |
|---|---|---|
| Dialogues (ouvert/fermé) | `useState` local au composant qui le déclenche, ou état d'URL si le dialogue doit être partageable par lien ([[TECH_STACK.md]] §1, TanStack Router) | Un dialogue global unique (ex. confirmation destructive appelable depuis n'importe où) peut justifier un store dédié léger — voir [[DIALOG_LIBRARY.md]] pour le comportement, non redécidé ici |
| Sidebar (ouverte/réduite/épinglée) | Store léger (`uiStore`, voir §2) — état partagé entre plusieurs zones de layout (TopBar, Sidebar elle-même) | — |
| Panels (ex. panneau latéral du lecteur) | `useState` local si un seul composant en dépend, sinon store léger si plusieurs zones réagissent à son état | — |
| Layout (densité d'affichage, largeur de colonne) | Store léger, persisté (préférence utilisateur réelle, [[LOCAL_STATE.md]]) | — |
| Filtres actifs | Store par domaine (`libraryStore`, [[STORE_SPECIFICATIONS.md]] §2) — partagés entre la barre de filtre et la liste filtrée | — |
| Tri actif | Idem Filtres, même store | — |
| Sélections (multi-sélection dans une liste) | `useState` local à la liste concernée — ne survit jamais à la navigation hors de l'écran | — |
| Scroll (position restaurée à la navigation retour) | Géré par TanStack Router nativement ([[NAVIGATION_HISTORY.md]]), jamais un store applicatif dédié | — |
| Responsive (classe d'appareil courante) | Hook dérivé (`useBreakpoint()`), jamais stocké — recalculé à chaque redimensionnement, coût négligeable | — |
| Fullscreen (mode plein écran actif) | Store léger (`uiStore`) — consommé par plusieurs zones (lecteur, TopBar qui se masque) | — |
| Navigation (route active) | Géré entièrement par TanStack Router — jamais dupliqué dans un store applicatif | — |
| Animations (état d'une transition en cours) | Géré par Motion directement au niveau du composant — jamais remonté à un store, une animation n'a de sens que localement | — |

## 2. `uiStore` — le seul store réellement transverse de cette catégorie

Contrairement aux stores de domaine ([[STORE_SPECIFICATIONS.md]]), `uiStore` regroupe plusieurs préoccupations de layout transverses (Sidebar, Fullscreen, Panels partagés) qui n'ont individuellement pas assez de substance pour justifier un store séparé chacune, mais qui sont consommées par plusieurs zones de l'application simultanément (donc pas de simples `useState` locaux). C'est la seule exception documentée à la règle « un store par domaine métier » ([[CODING_STANDARDS.md]] §4.3) — justifiée parce qu'aucun de ces éléments n'est un domaine métier, ce sont des préoccupations de présentation transverses.

## 3. Règle de décision — quand un état d'UI mérite un store

1. **Un seul composant le lit et le modifie** → `useState` local, toujours, sans exception.
2. **Plusieurs composants sans lien hiérarchique direct doivent le lire ou le modifier** → candidat `uiStore` (§2) ou store de domaine si l'état est réellement métier (filtres, tri).
3. **L'état doit survivre à la navigation** → jamais un `useState` local à un écran, toujours un store ou l'état d'URL (TanStack Router) selon que l'état doit être partageable par lien ou non.

---

## 4. Ce que ce document ne fait pas

- Ne redéfinit pas l'arbre de décision général (voir [[DATA_LAYER.md]] §1).
- Ne redéfinit pas le comportement produit de chaque élément d'UI (voir les spécifications produit correspondantes — [[DIALOG_LIBRARY.md]], [[LAYOUT_COMPONENTS.md]], etc.).

## 5. Checklist de validation

- [ ] Tout nouvel état d'UI est d'abord testé contre la règle de décision (§3) avant d'être ajouté à un store.
- [ ] `uiStore` ne reçoit jamais un domaine métier (filtres, tri, données) — réservé strictement aux préoccupations de présentation transverses (§2).

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Architecture d'état) | Staff React Engineer |

# KEYBOARD_SHORTCUTS.md — Bibliothèque exhaustive des raccourcis (Phase 8)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Navigation System Architect / Accessibility Specialist
> **Documents liés** : [[INTERACTION_GUIDELINES.md]] §1, [[ACCESSIBILITY_COMPONENTS.md]], [[COMMAND_PALETTE.md]]

> **Cadrage** : [[INTERACTION_GUIDELINES.md]] §1 reste la source des 9 raccourcis fondamentaux déjà justifiés individuellement (Phase 1). Ce document les reprend sans les redécider et couvre l'ensemble des domaines demandés par ce cadrage, dont plusieurs n'avaient encore aucun raccourci assigné.

---

## 1. Navigation

| Action | Raccourci | Note |
|---|---|---|
| Recherche / Command Palette | `Ctrl/Cmd + K` | Déjà acté ([[INTERACTION_GUIDELINES.md]] §1) — point d'entrée unique ([[COMMAND_PALETTE.md]] §1) |
| Navigation entre sections principales | `Ctrl/Cmd + 1..9` | Déjà acté |
| Retour | `Ctrl/Cmd + [` (ou geste navigateur standard) | Cohérent avec [[NAVIGATION_HISTORY.md]] §2 |
| Avancer | `Ctrl/Cmd + ]` | Symétrique du retour |
| Ouvrir/fermer le lecteur étendu | `Ctrl/Cmd + E` | Déjà acté |
| Navigation générale (Tab/Maj+Tab) | Standard OS, jamais surchargée | Déjà acté, non négociable |
| Paramètres | `Ctrl/Cmd + ,` | Convention macOS pour les préférences d'application — reprise pour familiarité immédiate |

## 2. Recherche

| Action | Raccourci | Note |
|---|---|---|
| Ouvrir la recherche | `Ctrl/Cmd + K` | Identique à Navigation §1 (fusion assumée, [[COMMAND_PALETTE.md]] §1) |
| Effacer la recherche | `Échap` (première pression) | [[SEARCH_NAVIGATION.md]] §2 |
| Fermer la recherche | `Échap` (seconde pression) | [[SEARCH_NAVIGATION.md]] §2 |
| Naviguer les résultats | `↑` / `↓` | [[SEARCH_NAVIGATION.md]] §2 |

## 3. Bibliothèque

| Action | Raccourci | Note |
|---|---|---|
| Basculer vue Grille/Liste | `Ctrl/Cmd + G` | Mnémonique « Grille » |
| Trier | `Ctrl/Cmd + Shift + S` | Ouvre le menu de tri sans souris |
| Filtrer | `Ctrl/Cmd + Shift + F` | Ouvre le panneau de filtres |

## 4. Player

| Action | Raccourci | Note |
|---|---|---|
| Lecture/Pause | `Espace` | Déjà acté |
| Piste suivante / précédente | `Ctrl/Cmd + →` / `Ctrl/Cmd + ←` | Déjà acté |
| Volume + / − | `Ctrl/Cmd + ↑` / `Ctrl/Cmd + ↓` | Déjà acté |
| Recherche dans la piste (seek) − 10s / + 10s | `←` / `→` (sans modificateur, lecteur focus) | Convention du marché ([[COMPETITIVE_ANALYSIS.md]]) |
| Muet | `Ctrl/Cmd + M` | Convention universelle |
| Lecture aléatoire | `Ctrl/Cmd + S` | Convention déjà observée dans les lecteurs musicaux de référence ([[COMPETITIVE_ANALYSIS.md]]), pas seulement un mnémonique isolé — aucune fonction de sauvegarde de document dans Melodia qui entrerait en collision |
| Répétition (cycle) | `Ctrl/Cmd + R` | Même justification de convention que ci-dessus |
| Plein écran | `Ctrl/Cmd + Shift + E` | Extension du raccourci lecteur étendu (§1) |

## 5. Queue

| Action | Raccourci | Note |
|---|---|---|
| Ajouter à la file | `Ctrl/Cmd + Shift + Q` | Corrigé en Phase 8 — voir historique des révisions de [[INTERACTION_GUIDELINES.md]], `Ctrl/Cmd + Q` seul est réservé au système |
| Ouvrir/fermer la file | `Ctrl/Cmd + Shift + U` | Mnémonique « Queue » (Q déjà pris par §5 ci-dessus) |
| Vider la file | Aucun raccourci direct | Action destructive ([[DIALOG_LIBRARY.md]] §3) — jamais un raccourci sans confirmation intermédiaire |

## 6. Favoris

| Action | Raccourci | Note |
|---|---|---|
| Ajouter/retirer des favoris | `Ctrl/Cmd + D` | Déjà acté |

## 7. Téléchargements

| Action | Raccourci | Note |
|---|---|---|
| Télécharger l'élément courant | `Ctrl/Cmd + Shift + D` | Extension du raccourci favoris (§6), mnémonique cohérent |
| Ouvrir la section Téléchargements | `Ctrl/Cmd + 6` (ou position réelle dans l'arborescence, §1) | Suit la convention de navigation par section |

## 8. Paramètres

| Action | Raccourci | Note |
|---|---|---|
| Ouvrir les Paramètres | `Ctrl/Cmd + ,` | Voir §1 |

## 9. Historique

| Action | Raccourci | Note |
|---|---|---|
| Ouvrir l'Historique | Position réelle dans l'arborescence (§1) | Aucun raccourci dédié supplémentaire — cohérent avec la règle de non-prolifération (§10) |

## 10. Command Palette

Voir [[COMMAND_PALETTE.md]] §2 et §5 pour l'ouverture et la navigation interne — non redécrites ici, `Ctrl/Cmd + K` reste l'unique déclencheur clavier.

---

## 11. Combinaisons réservées (jamais assignables)

| Combinaison | Réservée pour | Plateforme |
|---|---|---|
| `Cmd + Q` | Quitter l'application | macOS — interception système, ne peut techniquement pas être remappée dans une app native/Tauri |
| `Cmd + W` | Fermer la fenêtre | macOS |
| `Cmd + H` | Masquer l'application | macOS |
| `Cmd + Tab` | Changement d'application | macOS |
| `Alt + F4` | Fermer la fenêtre | Windows |
| `Ctrl + Alt + Suppr` | Sécurité système | Windows — interception système, jamais interceptable par une application |
| `Tab` / `Maj + Tab` | Navigation d'accessibilité standard | Toutes — jamais surchargée, cohérent avec [[INTERACTION_GUIDELINES.md]] §1 |

**Combinaisons context-dependent, acceptables avec prudence** : `Cmd + D` (Dupliquer/Marque-page dans certaines apps macOS, mais pas une interception système — reste réutilisable par Melodia comme dans de nombreuses autres applications tierces).

## 12. Règle de non-prolifération

Une action n'obtient un raccourci dédié que si elle est utilisée fréquemment (plusieurs fois par session, cohérent avec [[PERSONAS.md]] §8, utilisateur clavier). Une action rare (vider la file, ouvrir l'historique) reste accessible par navigation standard plutôt que d'ajouter un raccourci de plus à mémoriser — un trop grand nombre de raccourcis nuit à leur mémorisation collective, contraire à l'objectif « la navigation ne doit jamais être une charge cognitive » ([[NAVIGATION_SYSTEM.md]] §1).

## 13. Reconfigurabilité

Tous les raccourcis listés ici sont reconfigurables dans les Paramètres, sauf `Tab`/`Maj + Tab` (§11) — déjà acté dans [[INTERACTION_GUIDELINES.md]] §1, rappelé ici pour la même règle appliquée à l'ensemble élargi des raccourcis de ce document.

---

## 14. Checklist de validation

- [ ] Aucun raccourci de ce document n'entre en collision avec une combinaison réservée (§11).
- [ ] Chaque domaine demandé par le cadrage (Navigation/Recherche/Bibliothèque/Player/Queue/Favoris/Téléchargements/Paramètres/Historique/Command Palette) a une décision explicite, y compris « aucun raccourci dédié » quand c'est justifié (§9).
- [ ] Les 9 raccourcis déjà actés dans [[INTERACTION_GUIDELINES.md]] §1 ne sont jamais redéfinis avec une valeur différente ici.

---

## 15. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 8), correction du conflit `Ctrl/Cmd + Q` hérité d'INTERACTION_GUIDELINES.md | Navigation System Architect / Accessibility Specialist |

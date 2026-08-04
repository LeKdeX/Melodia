# SEARCH_COMPONENTS.md — Composants de recherche (Phase 6)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : UX Engineer / Frontend Performance Engineer
> **Documents liés** : [[COMPONENT_LIBRARY.md]], [[SEARCH_SPECIFICATION.md]], [[INTERACTION_LIBRARY.md]] §7

> **Cadrage** : [[SEARCH_SPECIFICATION.md]] a déjà défini le comportement produit de la recherche. `Search Results` est spécifié en profondeur complète, les autres composants en profondeur compacte.

---

# Search Results (spécification complète)

## 1. Présentation

- **Objectif** : afficher les résultats de recherche groupés par type, classés par pertinence.
- **Contexte** : déclenché par SearchField, voir [[SEARCH_SPECIFICATION.md]].
- **Quand utiliser** : dès qu'une saisie non vide existe dans SearchField.
- **Quand ne pas utiliser** : avant toute saisie (voir Empty Search State, §compacts ci-dessous).
- **Alternatives** : aucune.

## 2. Anatomie

```
Titres
  [Track Card compacte] × N
Albums
  [Album Card] × N
Artistes
  [Artist Card] × N
```

Groupes par type de contenu (titre de groupe, rôle Overline, [[TYPOGRAPHY_GUIDE.md]] §4bis), chaque groupe utilise le composant Card approprié à son type ([[LIBRARY_COMPONENTS.md]]) — jamais un composant de résultat générique qui perdrait l'information de type.

## 3. Variantes

Résultats complets (recherche globale), Résultats filtrés (un seul type actif via Search Filters).

## 4. États

Chargement (Skeleton par groupe, [[SKELETON_SYSTEM.md]] §4), Résultats, Aucun résultat (Empty Search State), Erreur (rare, recherche locale — [[SEARCH_SPECIFICATION.md]]).

## 5. Responsive

Nombre de résultats visibles par groupe avant « Voir plus » varie par classe d'appareil (moins sur mobile, plus sur desktop) — cohérent avec la densité de grille ([[LAYOUT_SYSTEM.md]] §1-3ter).

## 6. Accessibilité

Nombre de résultats annoncé une fois au chargement (`aria-live="polite"`), jamais par élément individuel ([[ACCESSIBILITY_GUIDE.md]] §2).

## 7. Design Tokens

Hérite entièrement des Cards qu'il compose ([[CARD_SPECIFICATION.md]] §7), espacement entre groupes ([[SPACING_SYSTEM.md]] §3).

## 8. Animations

Fade Standard bref à la mise à jour des résultats ([[MOTION_GUIDELINES.md]] §11, catégorie Micro pour ne jamais ralentir la perception de vitesse).

## 9. Bonnes pratiques

Groupe le plus pertinent (probabilité la plus forte d'être ce que l'utilisateur cherche) affiché en premier.

## 10. Anti-patterns

Spinner de chargement sur une recherche locale — casse la promesse de vitesse instantanée ([[INTERACTION_LIBRARY.md]] §7).

## 11. Cas limites

Un seul type de résultat trouvé : les groupes vides ne s'affichent jamais (jamais un « Albums (0) » affiché pour rien).

## 12. Performance

Résultats déjà indexés localement (FlexSearch), latence perçue nulle — aucun débounce nécessaire au-delà de la frappe elle-même ([[STACK_DECISIONS.md]] §2).

## 13. Tests

Performance (temps de réponse < 100ms, [[PRODUCT_RULES.md]] §4), accessibilité (annonce du nombre de résultats), visuel (groupement).

---

# Global Search / SearchField (spécification compacte)

**Fusion assumée** : le cadrage nomme « Global Search » (catégorie Search) et « SearchField » (catégorie Foundation) séparément, mais les deux désignent le même composant — le champ de recherche global, accessible depuis n'importe quel écran, est la seule instance de recherche de l'application ([[SEARCH_SPECIFICATION.md]] §2, recherche universelle). Documentés en une seule entrée plutôt que deux pour éviter une redondance qui diverge dans le temps.

Variante de TextField ([[FORM_COMPONENTS.md]]) avec icône de recherche fixe, raccourci global `Ctrl/Cmd + K` ([[INTERACTION_GUIDELINES.md]] §1), accessible depuis n'importe quel écran ([[PRODUCT_RULES.md]] §4).

# Search Filters (spécification compacte)

Groupe de Chips ([[FEEDBACK_COMPONENTS.md]]) représentant les filtres actifs, chacun retirable individuellement.

# Search Suggestions (spécification compacte)

Liste affichée avant toute saisie complète (suggestions basées sur l'historique local, [[PRODUCT_RULES.md]] §10) — utilise le même Menu que Combobox ([[FORM_COMPONENTS.md]]).

# Recent Searches (spécification compacte)

Sous-ensemble de Search Suggestions, purement local, jamais transmis ([[VOCABULARY.md]] §4) — chaque entrée est effaçable individuellement.

# Advanced Filters (spécification compacte)

Panel ou BottomSheet ([[OVERLAY_COMPONENTS.md]]) contenant plusieurs contrôles Select/Checkbox pour affiner une recherche au-delà des Filters rapides.

# Empty Search State (spécification compacte)

Instance d'Empty State ([[STATE_COMPONENTS.md]]) — voir ce document pour l'anatomie complète, aucune redéfinition ici.

---

## Checklist de validation

- [ ] Search Results couvre les 13 sections en détail.
- [ ] Aucun composant ici ne redécide le comportement produit déjà défini dans [[SEARCH_SPECIFICATION.md]].
- [ ] Empty Search State renvoie à [[STATE_COMPONENTS.md]] sans dupliquer son anatomie.

## Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 6) | UX Engineer / Frontend Performance Engineer |
| 0.2.0 | 2026-08-04 | Auto-revue Phase 6 : fusion Global Search/SearchField rendue explicite (n'était qu'implicite) | UX Engineer |

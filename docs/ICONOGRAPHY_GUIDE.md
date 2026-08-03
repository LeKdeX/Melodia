# ICONOGRAPHY_GUIDE.md — Philosophie des icônes (Phase 2, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Icon Designer / Senior Visual Designer
> **Documents liés** : [[TECH_STACK.md]] §1, [[DESIGN_TOKENS.md]], [[VISUAL_DIRECTION.md]]

> **Cadrage** : la bibliothèque d'icônes (Lucide) est déjà décidée dans [[TECH_STACK.md]] §1 — ce document définit les règles de style et d'usage, pas le choix de bibliothèque.

---

## 1. Style de trait

Épaisseur de trait constante (1.5px à taille standard 20px, mise à l'échelle proportionnelle) — cohérent avec la neutralité de Lucide, jamais mélangé avec une bibliothèque à trait variable qui casserait la cohérence visuelle.

## 2. Coins et rayons

Coins arrondis modérés (ni carrés stricts, ni excessivement arrondis) — cohérent avec le rayon `md` de [[DESIGN_TOKENS.md]] appliqué aux surfaces, pour que l'icône et son conteneur (bouton, carte) partagent la même famille géométrique.

## 3. Tailles

| Token | Taille | Usage |
|---|---|---|
| `icon-sm` | 16px | Icônes inline dans le texte, badges |
| `icon-md` | 20px | Icônes de contrôle standard (barre de navigation, boutons) |
| `icon-lg` | 24px | Contrôles principaux du lecteur ([[PLAYER_SPECIFICATION.md]] §5) |
| `icon-xl` | 32px | États vides, illustrations d'accompagnement ([[ILLUSTRATION_GUIDE.md]]) |

Jamais de taille hors échelle — cohérent avec la discipline de [[DESIGN_TOKENS.md]] §4.

## 4. Variantes

| Variante | Usage |
|---|---|
| Outline (par défaut) | Toute icône d'interface standard — cohérent avec le style natif de Lucide |
| Filled | Réservée à l'état actif/sélectionné d'un contrôle binaire (ex. favori activé, lecture aléatoire activée) — jamais pour de la simple emphase visuelle |
| Duotone | Non retenue pour l'interface fonctionnelle — introduirait une complexité de rendu et une charge cognitive supplémentaire sans bénéfice fonctionnel clair ; réévaluable uniquement pour un contexte marketing externe, jamais dans le produit |
| Animée | Réservée aux transitions d'état explicites (lecture ↔ pause, [[MOTION_GUIDELINES.md]] §1) — jamais une animation d'icône décorative sans changement d'état réel |

## 5. Remplissage et espacement

Zone de frappe (touch target) minimum de 44×44px autour de toute icône interactive, même si l'icône visuelle est plus petite ([[ACCESSIBILITY_GUIDE.md]] §9, [[INTERACTION_GUIDELINES.md]] §2) — l'icône visuelle et sa zone interactive ne sont jamais confondues dans les spécifications d'écran.

## 6. Règles d'utilisation

- Une action = une icône constante dans toute l'application — jamais deux icônes différentes pour la même action selon l'écran (cohérent avec [[PRODUCT_RULES.md]] §6).
- Aucune icône n'est utilisée seule sans label accessible ([[ACCESSIBILITY_GUIDE.md]] §8) — toujours un `aria-label` ou un texte visible adjacent.
- Les icônes ne portent jamais seules une information critique sans redondance textuelle (ex. l'état « téléchargé » combine icône **et** libellé, jamais l'icône seule).

---

## 7. Checklist de validation

- [ ] Aucune bibliothèque d'icônes n'est redécidée ici — uniquement Lucide, référencé depuis [[TECH_STACK.md]] §1.
- [ ] Chaque variante (§4) a une règle d'usage explicite, pas une liste descriptive sans contrainte.
- [ ] La zone de frappe minimum est garantie indépendamment de la taille visuelle de l'icône.

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 2, volume 2) | Icon Designer / Senior Visual Designer |

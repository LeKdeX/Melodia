# TOPBAR_SPECIFICATION.md — Spécification complète de la barre supérieure (Phase 8)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Navigation System Architect / React UI Architect
> **Documents liés** : [[COMPONENT_LIBRARY.md]], [[LAYOUT_COMPONENTS.md]], [[NAVIGATION_SYSTEM.md]]

> **Cadrage** : `TopBar` n'avait qu'une ligne de description dans [[LAYOUT_COMPONENTS.md]] — insuffisant pour une implémentation cohérente. Ce document en fait la spécification complète (13 sections), [[LAYOUT_COMPONENTS.md]] renvoie ici plutôt que de dupliquer.

---

## 1. Présentation

- **Nom officiel** : TopBar.
- **Description** : bande horizontale contextuelle ancrée en haut de la zone de contenu (jamais en haut de toute la fenêtre sur desktop, qui empiéterait sur la Sidebar).
- **Objectif** : donner un contexte immédiat sur la vue affichée et un accès rapide aux actions transverses (recherche, profil, notifications) sans consommer l'espace de la Sidebar.
- **Pourquoi ce composant existe** : la Sidebar ([[LAYOUT_COMPONENTS.md]]) répond à « où puis-je aller », la TopBar répond à « où suis-je et que puis-je faire d'ici » — deux questions différentes, jamais confondues dans un seul composant.
- **Quand l'utiliser** : toute vue de contenu principal (desktop/tablette/laptop) qui a besoin d'un titre, d'un fil d'Ariane ou d'actions contextuelles.
- **Quand ne jamais l'utiliser** : Fullscreen Player ([[PLAYER_SPECIFICATION.md]] §2, aucun élément d'interface superflu) ; mobile en dessous d'un certain seuil où la TopBar se réduit à son strict minimum (§5).
- **Alternatives** : Hero ([[LAYOUT_COMPONENTS.md]]) pour un en-tête de page à fort impact visuel sans fonction de navigation transverse.

## 2. Anatomie

```
[Titre / Breadcrumb]         [SearchField]    [Actions rapides] [Notifications] [Profil]
└──────────────────── Conteneur (hauteur fixe, padding horizontal) ────────────────────┘
```

- **Zone gauche** : Titre de la vue courante (rôle Headline, [[TYPOGRAPHY_GUIDE.md]] §4bis) ou Breadcrumb ([[NAVIGATION_COMPONENTS.md]]) si la vue est profonde — jamais les deux simultanément, l'un remplace l'autre selon la profondeur de navigation.
- **Zone centrale** : SearchField ([[SEARCH_COMPONENTS.md]]), optionnelle selon la vue — absente sur les vues où la recherche n'a pas de sens contextuel (ex. Paramètres).
- **Zone droite** : groupe Inline ([[COMPOSING_RULES.md]] §4) d'actions rapides contextuelles à la vue (ex. « Créer une playlist » dans Bibliothèque), suivi de l'indicateur de synchronisation (§Synchronisation), des notifications et du menu profil.
- **Hauteur** : fixe sur toute l'application (`spacing-component-lg` équivalent), jamais variable d'une vue à l'autre — une TopBar de hauteur changeante déplacerait le contenu à chaque navigation.

## 3. Variantes

| Variante | Usage |
|---|---|
| Titre simple | Vue de premier niveau (Accueil, Bibliothèque) |
| Breadcrumb | Vue profonde (Artiste → Album → Piste, [[NAVIGATION_COMPONENTS.md]]) |
| Avec recherche | Vues où la recherche contextuelle a un sens (Bibliothèque, Playlists) |
| Minimale | Mobile/petit écran (§5) — titre seul, actions repliées dans un menu overflow |

## 4. États

| État | Comportement |
|---|---|
| Default | Résolution de base selon la variante |
| Synchronisation active | Indicateur discret dans la zone droite ([[MOTION_GUIDELINES.md]] §9), jamais un blocage de la TopBar |
| Serveur hors ligne | L'indicateur « Serveur actif » (§Serveur actif) passe en état d'alerte discret, jamais une bannière superposée à la TopBar elle-même (voir [[ERROR_EXPERIENCE.md]] pour le pattern bannière séparé) |
| Notifications en attente | Badge numérique sur l'icône de notification ([[FEEDBACK_COMPONENTS.md]] Badge) |

## 5. Responsive

- **Desktop/Laptop/Tablette** : anatomie complète (§2).
- **Mobile** : variante Minimale (§3) — titre seul + accès recherche via icône (ouvre SearchField en plein écran plutôt qu'inline, faute d'espace) ; profil et notifications repliés dans le menu « Plus » de la BottomBar ([[MOBILE_NAVIGATION.md]]) plutôt que dupliqués dans la TopBar.
- **Ultra-wide** : anatomie complète, largeur des zones plafonnée à `container-lg` centré ([[LAYOUT_SYSTEM.md]] §8) — jamais étirée sur toute la largeur disponible.

## 6. Accessibilité

`role="banner"` pour la zone de la TopBar elle-même (landmark distinct de `role="navigation"` de la Sidebar, [[ACCESSIBILITY_GUIDE.md]] §6bis). Ordre de focus : titre/breadcrumb → recherche → actions rapides → notifications → profil, cohérent avec l'ordre visuel gauche-à-droite ([[NAVIGATION_GUIDE.md]] §8).

## 7. Design Tokens

Hauteur fixe (token dédié), fond `surface`, séparateur `border-hairline` en bordure inférieure (jamais une ombre, qui suggérerait une élévation supérieure à celle du contenu qu'elle surplombe — élévation 0, cohérent avec [[SURFACE_SYSTEM.md]] §3), espacement entre actions ([[SPACING_SYSTEM.md]] §2).

## 8. Motion

- **Entrée/Sortie** : la TopBar ne disparaît jamais entre deux vues (seul son contenu interne change) — pas d'animation d'entrée/sortie de la TopBar elle-même.
- **Changement de titre/Breadcrumb** : Fade Standard ([[ANIMATION_LIBRARY.md]] §4), synchronisé avec la transition de contenu ([[TRANSITION_GUIDE.md]] §8).
- **Indicateur de synchronisation** : pulsation douce, catégorie Ambiance ([[MOTION_GUIDELINES.md]] §9).
- **Réduction des animations** : le changement de titre devient instantané, jamais un fondu de plus de 150ms ([[MOTION_GUIDELINES.md]] §12).

## 9. Bonnes pratiques

- Le titre reflète toujours exactement la vue affichée, jamais une valeur en retard d'une navigation.
- Pas plus de 3 actions rapides visibles simultanément — au-delà, un Menu Button ([[BUTTON_SPECIFICATION.md]]) les regroupe.

## 10. Anti-patterns

- **TopBar qui duplique un item déjà dans la Sidebar** : chaque composant de navigation a un rôle exclusif (§1) — dupliquer une entrée de navigation principale dans la TopBar créerait deux chemins vers la même destination, contraire à [[PRODUCT_RULES.md]] §6 (cohérence des interactions).
- **Titre tronqué sans info-bulle** : un titre coupé doit rester consultable en entier au survol/focus ([[TOOLTIP_LIBRARY.md]]).

## 11. Cas limites

- **Titre très long** : troncature avec ellipse, tooltip complet au survol/focus.
- **Zoom navigateur 200%** : les actions rapides passent dans le menu overflow avant que la TopBar ne déborde.
- **RTL** : ordre des zones inversé via propriétés logiques ([[ACCESSIBILITY_COMPONENTS.md]] §7).
- **Connexion lente** : l'indicateur « Serveur actif » reflète l'état réel sans optimisme trompeur — jamais un indicateur « connecté » avant confirmation réelle.

## 12. Performance

Montée une seule fois au niveau racine (comme la Sidebar, [[LAYOUT_COMPONENTS.md]] §12) — seul son contenu interne (titre, actions) re-render à la navigation, jamais le conteneur lui-même.

## 13. Tests

Accessibilité (landmark `banner`, ordre de focus), interaction (menu overflow, recherche), visuel (les quatre variantes), responsive (bascule vers la variante Minimale).

---

## 14. Checklist de validation

- [ ] Chaque zone de l'anatomie (§2) a une règle de responsive explicite (§5), jamais un comportement implicite.
- [ ] Aucune action de la TopBar ne duplique une entrée déjà présente dans la Sidebar.
- [ ] Le landmark `role="banner"` est distinct du `role="navigation"` de la Sidebar.

---

## 15. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 8) — remplace le renvoi d'une ligne dans LAYOUT_COMPONENTS.md | Navigation System Architect / React UI Architect |

# NAVIGATION_COMPONENTS.md — Composants de navigation interne (Phase 6)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : UX Engineer / React Component Architect
> **Documents liés** : [[COMPONENT_LIBRARY.md]], [[NAVIGATION_GUIDE.md]], [[ACCESSIBILITY_COMPONENTS.md]] §6

> **Cadrage** : `Tabs` est spécifié en profondeur complète. Breadcrumb, Pagination et Accordion sont compacts. [[NAVIGATION_GUIDE.md]] a déjà défini la navigation *entre écrans* (barre latérale, historique) — ce document couvre la navigation *au sein d'un écran*.

---

# Tabs (spécification complète)

## 1. Présentation

- **Objectif** : basculer entre plusieurs vues d'un même contexte sans changer de page.
- **Contexte** : sous-sections d'une bibliothèque (Titres/Albums/Artistes), sections d'une page Paramètres.
- **Valeur utilisateur** : bascule instantanée sans perte de contexte général de la page.
- **Quand utiliser** : 2 à 6 vues de même nature, toutes pertinentes au même niveau hiérarchique.
- **Quand ne pas utiliser** : plus de 6 options (utiliser une navigation latérale ou un Select) ; des vues de nature différente (utiliser une navigation de page classique).
- **Alternatives** : SegmentedButton pour un choix qui n'est pas une vue de contenu mais un réglage d'affichage ([[BUTTON_SPECIFICATION.md]]).

## 2. Anatomie

```
[ Tab actif ][ Tab ][ Tab ]
──────────────────────────  ← indicateur qui suit le tab actif
[  Contenu du panneau actif  ]
```

Liste de déclencheurs (`tablist`) + indicateur de sélection animé + panneau de contenu associé.

## 3. Variantes

Standard (soulignement), Segmented (fond plein sur le tab actif, visuellement proche de SegmentedButton mais sémantiquement une navigation de contenu, jamais un réglage).

## 4. États

Default, Hover, Focus, Active (sélectionné), Disabled (tab désactivé si son contenu n'est pas encore disponible, ex. Statistiques avant la fin de la première synchronisation).

## 5. Responsive

Défilement horizontal du groupe de tabs si l'espace manque, jamais un passage automatique en menu déroulant qui masquerait les options (cohérent avec [[RESPONSIVE_GUIDE.md]] §7bis, réorganisation avant masquage).

## 6. Accessibilité

`role="tablist"`/`"tab"`/`"tabpanel"` ([[ACCESSIBILITY_COMPONENTS.md]] §6), navigation aux flèches gauche/droite entre tabs, `Tab` clavier standard n'entre que dans le tablist puis dans le panneau actif (pas dans chaque tab individuellement).

## 7. Design Tokens

Indicateur `accent-500`, typographie rôle Label ([[TYPOGRAPHY_GUIDE.md]] §4bis), espacement entre tabs ([[SPACING_SYSTEM.md]] §2).

## 8. Animations

Indicateur qui glisse vers le tab nouvellement actif (catégorie Standard, courbe `standard`) plutôt que de sauter instantanément — renforce la continuité spatiale ([[MOTION_GUIDELINES.md]] §4). Contenu du panneau : Fade Standard ([[ANIMATION_LIBRARY.md]] §4).

## 9. Bonnes pratiques

Libellés courts et parallèles grammaticalement (tous des noms, jamais un mélange nom/verbe).

## 10. Anti-patterns

- **Tabs pour une séquence d'étapes** : une séquence (onboarding) n'est pas un choix libre — utiliser un composant de progression dédié, jamais des Tabs.
- **Plus de 6 tabs** : au-delà, la reconnaissance visuelle se dégrade.

## 11. Cas limites

Libellé de tab très long : troncature avec ellipse, largeur de tab minimale garantie pour la zone tactile. RTL : ordre des tabs inversé, navigation flèches inversée en conséquence.

## 12. Performance

Le contenu des panneaux non actifs n'est monté qu'à la première activation (lazy), puis gardé monté mais masqué (`display: none`) pour éviter un remontage coûteux à chaque bascule.

## 13. Tests

Accessibilité (navigation flèches, association tab/panel), interaction (clic, clavier), visuel (indicateur), performance (pas de remontage à chaque bascule).

---

# Breadcrumb (spécification compacte)

Fil d'Ariane pour la navigation en profondeur (Artiste → Album → Piste, [[PREMIUM_DETAILS.md]] §5). Chaque niveau est un `Link` ([[BUTTON_SPECIFICATION.md]]), sauf le dernier (niveau courant, non cliquable, `aria-current="page"`). **Troncature** (ajout Phase 8) : au-delà de 3 niveaux visibles, les niveaux intermédiaires se replient derrière un élément « … » cliquable qui ouvre un Menu listant les niveaux masqués — jamais un simple texte tronqué avec ellipse qui perdrait la navigabilité vers ces niveaux. **Animation** : aucune sur le fil lui-même (changement instantané, cohérent avec [[TRANSITION_GUIDE.md]] §8 où l'élément de navigation cliqué change d'état avant même la fin de la transition de contenu) — seul le Menu de repli (§ci-dessus) suit [[ANIMATION_LIBRARY.md]] §13bis.

# Pagination (spécification compacte)

Réservée aux contextes où la virtualisation seule ne suffit pas (rare dans Melodia, la bibliothèque utilise le défilement virtualisé par défaut, [[PERFORMANCE_BUDGET.md]] §3) — utilisée principalement pour les résultats externes paginés par l'API Jellyfin si applicable. `role="navigation"` avec libellé explicite.

# Accordion (spécification compacte)

Divulgation progressive d'un contenu (ex. détails avancés d'un réglage). `aria-expanded` sur le déclencheur, contenu associé via `aria-controls` ([[ACCESSIBILITY_COMPONENTS.md]] §6). Animation d'expansion : hauteur interpolée, catégorie Standard, jamais un saut instantané.

# Step Indicator (spécification compacte, ajout Phase 7)

Représentation visuelle de la progression dans une séquence d'étapes linéaires (ex. configuration initiale multi-étapes, si l'onboarding en introduit une — [[ONBOARDING_GUIDE.md]]) — c'est le composant que Tabs §10 ci-dessus (anti-pattern) recommande explicitement à la place de Tabs pour une séquence. **Anatomie** : suite de points/segments, étape courante mise en évidence (`accent-500`), étapes complétées distinguées des étapes à venir par une icône de validation, jamais par la couleur seule ([[ACCESSIBILITY_GUIDE.md]] §3bis). **Accessibilité** : `aria-current="step"` sur l'étape active.

# Navigation Group (spécification compacte, ajout Phase 7)

Regroupement visuel de plusieurs items de navigation liés au sein d'une Sidebar ou d'un Menu (ex. « Bibliothèque » regroupant Titres/Albums/Artistes) — un en-tête de groupe (rôle Overline, [[TYPOGRAPHY_GUIDE.md]] §4bis) non cliquable, suivi des items du groupe. **Règle** : jamais plus de deux niveaux de regroupement (un Navigation Group ne contient jamais un second Navigation Group imbriqué) — cohérent avec la limite déjà actée pour les menus ([[COMPONENT_CHECKLIST.md]] §3).

## Fusions (ajout Phase 7)

**Segmented Control** = `SegmentedButton` déjà spécifié ([[BUTTON_SPECIFICATION.md]]) — un contrôle segmenté à sélection exclusive n'a pas de comportement distinct selon qu'on l'appelle Segmented Control (terminologie Apple HIG) ou SegmentedButton (terminologie de ce projet). Non redécrit ici.

**Navigation Rail** = la variante Réduite de `Sidebar` ([[LAYOUT_COMPONENTS.md]] §3, icônes seules) — le terme « Navigation Rail » (terminologie Material Design 3) désigne exactement ce que ce projet documente déjà comme un état de Sidebar, jamais un composant séparé qui dupliquerait sa logique de navigation.

**Command Menu** = `Command Palette` déjà spécifié ([[FORM_COMPONENTS.md]]) — même composant, deux noms selon la référence du cadrage source (Command Menu chez Radix UI/shadcn, Command Palette dans ce projet).

---

## Checklist de validation

- [ ] Tabs couvre les 13 sections en détail.
- [ ] Aucun composant ici ne redécrit la navigation entre écrans déjà définie dans [[NAVIGATION_GUIDE.md]].
- [ ] Chaque composant a son pattern ARIA explicite et cohérent avec [[ACCESSIBILITY_COMPONENTS.md]] §6.

## Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 6) | UX Engineer / React Component Architect |
| 0.2.0 | 2026-08-04 | Phase 7 : ajout de Step Indicator, Navigation Group ; fusions explicites Segmented Control=SegmentedButton, Navigation Rail=Sidebar réduite, Command Menu=Command Palette | UX Engineer |
| 0.3.0 | 2026-08-04 | Phase 8 : ajout de la troncature et de l'animation de Breadcrumb | Navigation System Architect |

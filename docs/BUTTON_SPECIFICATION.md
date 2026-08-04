# BUTTON_SPECIFICATION.md — Famille des boutons (Phase 6)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : React Component Architect / Senior UI Engineer
> **Documents liés** : [[COMPONENT_LIBRARY.md]], [[ACCESSIBILITY_COMPONENTS.md]], [[MICROCOPY_LIBRARY.md]] §1

> **Cadrage** : `Button` est spécifié en profondeur complète — c'est le composant de référence dont dérivent `IconButton`, `ToggleButton`, `SegmentedButton`, `FAB` et `Link`, spécifiés en profondeur compacte à sa suite avec renvoi systématique vers son anatomie et ses tokens.

---

# Button (spécification complète)

## 1. Présentation

- **Nom** : Button.
- **Objectif** : déclencher une action unique et immédiate.
- **Contexte d'utilisation** : toute action principale ou secondaire d'un écran, d'une carte ou d'une modale.
- **Valeur utilisateur** : reconnaissance immédiate d'une action possible, cohérente sur toute l'application ([[PRODUCT_RULES.md]] §6).
- **Quand utiliser** : une action ponctuelle qui ne change pas d'état persistant binaire (pour un état on/off, voir `ToggleButton` ou `Switch`, [[FORM_COMPONENTS.md]]).
- **Quand ne pas utiliser** : navigation vers une autre page (utiliser `Link`, §Link ci-dessous) ; sélection dans un groupe (utiliser `SegmentedButton` ou `Radio`, [[FORM_COMPONENTS.md]]).
- **Alternatives** : `Link` pour la navigation, `IconButton` quand l'espace ne permet pas de libellé texte.

## 2. Anatomie

```
[ Icône optionnelle (gauche) ]  Libellé texte  [ Icône optionnelle (droite) ]
└─────────────────── Conteneur (padding, radius, fond) ───────────────────┘
```

- **Conteneur** : porte le fond, la bordure éventuelle, le rayon (`radius-sm`, [[DESIGN_TOKENS.md]] §2), le padding ([[SPACING_SYSTEM.md]] §1).
- **Libellé** : rôle typographique Button ([[TYPOGRAPHY_GUIDE.md]] §4bis), jamais tronqué silencieusement — un libellé trop long fait grossir le bouton plutôt que de couper le texte.
- **Icône** : optionnelle, taille `icon-sm` ou `icon-md` selon la taille du bouton ([[ICONOGRAPHY_GUIDE.md]] §3), jamais des deux côtés simultanément sauf cas explicitement justifié (rare).

## 3. Variantes

| Variante | Usage |
|---|---|
| Primary | Une seule par vue — l'action la plus importante de l'écran |
| Secondary | Actions alternatives à la Primary, contour visible, fond neutre |
| Ghost | Action tertiaire, aucun fond ni contour, visible seulement au survol/focus |
| Outlined | Équivalent visuel de Secondary — non dupliqué en tokens séparés, alias documenté pour compatibilité de nommage avec des bibliothèques de référence externes |
| Danger | Action destructive, toujours accompagnée d'un dialogue de confirmation si l'action est irréversible ([[DIALOG_LIBRARY.md]]) |
| Compact | Padding réduit (§Tokens), pour les contextes denses (barre d'outils) |
| Large | Padding augmenté, réservé aux actions d'onboarding ou de premier plan ([[ONBOARDING_COPY.md]]) |
| Premium | Aucune variante visuelle distincte — Melodia n'a pas de fonctionnalité payante ; ce nom n'est jamais utilisé pour éviter toute confusion avec un palier commercial ([[VOCABULARY.md]] §5) |

Success/Warning ne sont pas des variantes de Button — un bouton ne communique jamais un état de résultat, seulement une action à venir ([[VISUAL_FEEDBACK_GUIDE.md]] §7-8, la couleur de résultat s'applique après l'action, jamais au bouton qui la déclenche).

## 4. États

| État | Comportement |
|---|---|
| Default | Résolution de base de la variante |
| Hover | `hover` token, luminosité ±8% ([[COLOR_SYSTEM.md]] §6bis) |
| Focus | Contour `focus-ring` ([[ACCESSIBILITY_COMPONENTS.md]] §2) |
| Pressed | `pressed` token, luminosité ±16%, échelle réduite légère ([[INTERACTION_GUIDELINES.md]] §4) |
| Loading | Libellé remplacé par un indicateur de progression discret dans le conteneur inchangé (jamais un changement de taille du bouton), interaction désactivée pendant ce temps |
| Disabled | Opacité `opacity-disabled` (0.4), curseur sans effet, jamais totalement invisible ([[INTERACTION_GUIDELINES.md]] §4) |

## 5. Responsive

Taille identique sur toutes les classes d'appareil ([[SPACING_SYSTEM.md]] §5) — seule la densité de disposition environnante change, jamais le bouton lui-même. Sur petit téléphone, un groupe de boutons passe d'Inline à Stack si l'espace horizontal est insuffisant ([[COMPOSING_RULES.md]] §4).

## 6. Accessibilité

Voir [[ACCESSIBILITY_COMPONENTS.md]] pour le contrat commun (focus, zone tactile 44×44px). Spécifique à Button : élément natif `<button>` uniquement, jamais un élément stylé sans sémantique ; l'état Loading reste annoncé via `aria-busy`.

## 7. Design Tokens

| Catégorie | Tokens |
|---|---|
| Couleur | `primary`/`secondary` ([[COLOR_SYSTEM.md]] §6bis), `danger` ([[COLOR_SYSTEM.md]] §5, `state-danger`), `hover`/`pressed`/`disabled` ([[COLOR_SYSTEM.md]] §6bis) |
| Espacement | Padding par taille ([[SPACING_SYSTEM.md]] §1) |
| Typographie | Rôle Button ([[TYPOGRAPHY_GUIDE.md]] §4bis) |
| Rayon | `radius-sm` |
| Animation | `duration-micro`, courbe `standard` ([[MOTION_GUIDELINES.md]] §1-2) |

## 8. Animations

- **Hover/Pressed** : catégorie Micro, aucune transformation de taille au hover (uniquement couleur), légère réduction d'échelle au pressed.
- **Loading** : apparition de l'indicateur en fondu catégorie Micro.
- **Alternative réduite** : identique (déjà minimal, rien à réduire davantage).

## 9. Bonnes pratiques

- Un seul bouton Primary visible par vue.
- Libellé toujours un verbe d'action ([[UX_WRITING_GUIDE.md]] §4).
- Largeur qui s'adapte au contenu, jamais une largeur fixe qui tronquerait un libellé traduit plus long ([[LOCALIZATION_GUIDE.md]] §5).

## 10. Anti-patterns

- **Deux boutons Primary dans la même vue** : dilue la hiérarchie d'action, l'utilisateur ne sait plus laquelle est prioritaire.
- **Bouton Ghost pour une action destructive** : la variante Danger existe précisément pour signaler visuellement le risque — l'omettre masque la gravité de l'action.
- **Désactiver un bouton sans expliquer pourquoi** : un bouton disabled sans tooltip contextuel laisse l'utilisateur sans recours ([[INTERACTION_GUIDELINES.md]] §4).

## 11. Cas limites

- **Texte très long** : le bouton grossit en largeur jusqu'à `container-sm` puis passe le texte sur deux lignes plutôt que de tronquer.
- **Icône absente** (échec de chargement) : le bouton reste fonctionnel sans icône, jamais un espace vide qui casse l'alignement.
- **Zoom navigateur 200%** : le padding et le texte suivent le zoom proportionnellement, la zone tactile reste ≥44×44px effectifs.
- **RTL** : disposition icône/libellé inversée via propriétés logiques ([[ACCESSIBILITY_COMPONENTS.md]] §7).

## 12. Performance

Composant sans état interne complexe — aucun re-render au-delà du changement de props. Le libellé et l'icône sont des enfants, jamais recalculés par le bouton lui-même. Coût GPU négligeable (transform/opacity uniquement).

## 13. Tests

Unitaires (rendu par variante/état), visuels (chaque variante × chaque état en Storybook), accessibilité (navigation clavier, `aria-busy` en Loading), responsive (troncature à 200% zoom), interaction (clic, Entrée/Espace au clavier).

---

# IconButton (spécification compacte)

**Présentation** : Button sans libellé texte, icône seule. **Anatomie** : conteneur carré + icône centrée, hérite de Button §2. **Variantes** : identiques à Button §3, sans Compact/Large (une seule taille standard + `icon-lg` pour les contrôles principaux du lecteur, [[PLAYER_SPECIFICATION.md]] §5). **États** : identiques à Button §4. **Accessibilité** : `aria-label` obligatoire au niveau du type ([[DESIGN_SYSTEM_ARCHITECTURE.md]] §5) — jamais optionnel, un IconButton sans libellé accessible est un défaut bloquant. **Tokens/Animations** : identiques à Button §7-8. **Anti-pattern propre** : icône ambiguë sans tooltip complémentaire ([[TOOLTIP_LIBRARY.md]]).

# ToggleButton (spécification compacte)

**Présentation** : IconButton avec état binaire persistant (ex. lecture aléatoire activée). **États additionnels** : `selected` — variante Filled de l'icône ([[ICONOGRAPHY_GUIDE.md]] §4), jamais uniquement un changement de couleur seul (redondance requise, [[ACCESSIBILITY_GUIDE.md]] §3bis). **Accessibilité** : `aria-pressed` obligatoire.

# SegmentedButton (spécification compacte)

**Présentation** : groupe de 2 à 4 ToggleButtons mutuellement exclusifs formant une seule unité visuelle (ex. bascule Grille/Liste). **Anatomie** : conteneur unique avec un rayon `radius-sm` partagé, séparateurs internes de 1px. **Accessibilité** : `role="radiogroup"` avec chaque segment en `role="radio"` — jamais un `role="group"` de boutons indépendants, la sémantique d'exclusivité mutuelle doit être portée.

# FAB — Floating Action Button (spécification compacte)

**Présentation** : Button Primary flottant, ancré à une position fixe de l'écran (mobile principalement), réservé à l'action la plus fréquente d'un contexte donné (ex. créer une playlist). **Variantes** : standard (icône seule) et étendu (icône + libellé, apparaît au repos puis se réduit à l'icône seule au défilement). **Élévation** : niveau 2 ([[SURFACE_SYSTEM.md]] §3), seul bouton de toute la bibliothèque à porter une ombre. **Anti-pattern** : plus d'un FAB visible simultanément sur un même écran.

# Link (spécification compacte)

**Présentation** : action de navigation, jamais une action destructive ou de mutation d'état ([[PRODUCT_RULES.md]] §7 réservé aux boutons avec confirmation). **Anatomie** : texte seul, soulignement au survol/focus uniquement (jamais permanent, pour ne pas alourdir visuellement le texte courant). **Accessibilité** : élément natif `<a>` ou équivalent de routage, jamais un `<button>` stylé en lien pour une navigation réelle (le clic milieu/Ctrl-clic doit fonctionner nativement).

# Split Button (spécification compacte, ajout Phase 7)

**Présentation** : Button dont l'action principale est séparée d'un IconButton chevron adjacent qui ouvre un Menu d'actions alternatives liées (ex. « Télécharger » avec un choix de qualité en second clic). **Anatomie** : deux zones cliquables distinctes dans un seul conteneur visuel, séparateur `border-hairline` vertical entre elles — jamais une seule zone qui déclenche des comportements différents selon la position du clic. **Accessibilité** : deux éléments `<button>` distincts avec noms accessibles différents, jamais un seul bouton avec un menu caché sans indication. **Anti-pattern** : plus de 4 actions alternatives dans le Menu — au-delà, un Menu Button (ci-dessous) est plus approprié qu'une action par défaut implicite.

# Command Button (spécification compacte, ajout Phase 7)

**Présentation** : Button qui déclenche une action système/technique plutôt qu'une action de contenu (ex. « Réinitialiser le cache », [[DIALOG_LIBRARY.md]] §5) — distinction purement sémantique du contexte d'usage (Paramètres, panneaux développeur), aucune variante visuelle propre au-delà de celles déjà définies (§3). **Contexte** : réservé à [[SETTINGS_COMPONENTS.md]] (Cache Manager, Developer Panel).

# Menu Button (spécification compacte, ajout Phase 7)

**Présentation** : Button qui ouvre un Menu ([[OVERLAY_COMPONENTS.md]]) au lieu de déclencher une action directe — distinct de Split Button (ci-dessus) en ce qu'il n'a aucune action par défaut, uniquement l'ouverture du menu. **Anatomie** : Button standard + icône chevron systématique (`icon-sm`, orientation vers le bas) signalant qu'un menu s'ouvrira, jamais un Button sans indication visuelle de ce comportement. **Accessibilité** : `aria-haspopup="menu"` et `aria-expanded` obligatoires.

## Boutons du domaine lecteur (renvoi, pas de redéfinition)

> Ajout Phase 7 : le cadrage redemande `Player Controls`, `Favorite Button`, `Download Button`, `Shuffle Button`, `Repeat Button`, `Play Button`, `Pause Button`, `Next Button`, `Previous Button` comme composants Actions — ces neuf éléments sont déjà spécifiés dans [[PLAYER_COMPONENTS.md]] (§Composants compacts) comme instances de `Button`/`IconButton`/`ToggleButton` appliquées au domaine du lecteur. Aucune redéfinition ici : Play/Pause/Next/Previous sont des `IconButton` ([[PLAYER_SPECIFICATION.md]] §5 pour les règles métier), Shuffle/Repeat sont des `ToggleButton`, Favorite/Download sont des `IconButton` avec état Selected/Loading respectivement — « Player Controls » désigne le regroupement Inline de ces boutons ([[COMPOSING_RULES.md]] §4), pas un composant distinct.

---

## Checklist de validation

- [ ] Chaque composant de la famille a ses 13 sections couvertes (complètes pour Button, compactes pour les cinq dérivés).
- [ ] Aucune anatomie/token n'est redéfini dans les spécifications compactes — uniquement les différences.
- [ ] Le nom « Premium » n'introduit aucune variante visuelle réelle (§3).

## Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 6) | React Component Architect / Senior UI Engineer |
| 0.2.0 | 2026-08-04 | Auto-revue Phase 6 : correction de la citation §7 (danger provient de COLOR_SYSTEM.md §5, pas §6bis) | React Component Architect |
| 0.3.0 | 2026-08-04 | Phase 7 : ajout de Split Button, Command Button, Menu Button ; renvoi explicite pour les boutons du domaine lecteur déjà spécifiés dans PLAYER_COMPONENTS.md | React Component Architect |

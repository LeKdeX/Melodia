# DISPLAY_COMPONENTS.md — Atomes d'affichage (Phase 7)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / UI Engineer
> **Documents liés** : [[COMPONENT_LIBRARY.md]], [[FEEDBACK_COMPONENTS.md]], [[LAYOUT_COMPONENTS.md]]

> **Cadrage** : la catégorie « Affichage » du cadrage recoupe des composants déjà spécifiés ailleurs — Badge/Chip/Tag vivent dans [[FEEDBACK_COMPONENTS.md]], Avatar/Divider/Separator vivent dans [[LAYOUT_COMPONENTS.md]]. Ils ne sont pas dupliqués ici, uniquement référencés (§1). Ce document documente les atomes réellement nouveaux de cette catégorie (§2 à §9).

---

## 1. Composants déjà spécifiés (renvoi, pas de duplication)

| Composant | Référence |
|---|---|
| Badge, Chip, Tag | [[FEEDBACK_COMPONENTS.md]] |
| Avatar, Divider, Separator | [[LAYOUT_COMPONENTS.md]] |

## 2. User Avatar (spécification compacte)

Variante d'Avatar ([[LAYOUT_COMPONENTS.md]]) spécifique au profil utilisateur/compte Jellyfin connecté, jamais à un artiste (voir Artwork §3 pour les images musicales) — même anatomie et repli par initiales, seule la source de données diffère.

## 3. Artwork (spécification compacte)

Terme générique pour toute image musicale (pochette, portrait d'artiste) affichée hors du contexte d'une Card — ex. arrière-plan du Fullscreen Player ([[DYNAMIC_THEME_GUIDE.md]]). **Anatomie** : image seule, sans zone de texte associée (ce qui la distingue de [[CARD_SPECIFICATION.md]], qui combine toujours image + texte). Toujours accompagnée d'un texte alternatif décrivant le contenu (titre/artiste), jamais une image purement décorative dans ce contexte.

## 4. Album Cover (spécification compacte)

Instance d'Artwork (§3) spécifique aux pochettes d'album, ratio carré fixe — utilisé partout où une pochette apparaît hors d'une Card (ex. le lecteur, [[PLAYER_EXPERIENCE.md]] §5). Repli identique à [[CARD_SPECIFICATION.md]] §11 (illustration générique, jamais un espace vide).

## 5. Thumbnail (spécification compacte)

Version miniature d'un Artwork/Album Cover, taille fixe la plus petite de l'échelle (`icon-lg` équivalent, 24-32px), utilisée dans les contextes de très haute densité (Queue Item, [[PLAYER_COMPONENTS.md]]) — jamais un redimensionnement CSS d'une image grande résolution côté client, toujours une ressource dédiée pour éviter un coût de décodage inutile ([[PERFORMANCE_BUDGET.md]]).

## 6. Label (spécification compacte)

Texte de rôle sémantique Label ([[TYPOGRAPHY_GUIDE.md]] §4bis) associé à un contrôle de formulaire — ce n'est pas un composant autonome mais le rôle typographique lui-même utilisé comme élément d'anatomie dans [[FORM_COMPONENTS.md]] et [[SETTINGS_COMPONENTS.md]] (Preference Row §2). Documenté ici uniquement pour lever toute ambiguïté sur son statut : un rôle typographique, jamais un composant avec ses propres variantes/états.

## 7. Caption (spécification compacte)

Symétrique de Label (§6) pour le rôle sémantique Caption — texte tertiaire, métadonnées secondaires (durée, description de réglage). Même statut : rôle typographique, pas un composant indépendant.

## 8. Code Block (spécification compacte)

Bloc de texte en police monospace ([[TYPOGRAPHY_GUIDE.md]] §3), fond légèrement distinct (`surface`, [[COLOR_SYSTEM.md]] §6bis) — réservé aux contextes techniques (panneau développeur, [[SETTINGS_COMPONENTS.md]]), jamais utilisé dans une surface visible par défaut à un utilisateur non technique. **Accessibilité** : `role="code"` ou balise sémantique équivalente, jamais uniquement une police différente sans sémantique associée pour un lecteur d'écran.

## 9. Empty Placeholder (spécification compacte)

**Fusion assumée** : synonyme d'Empty State ([[STATE_COMPONENTS.md]]) — le cadrage nomme les deux séparément selon la phase, mais aucune distinction fonctionnelle ne justifie deux composants. Voir [[STATE_COMPONENTS.md]] pour la spécification complète (anatomie illustration/message/action, trois variantes), non redécrite ici.

---

## 10. Checklist de validation

- [ ] Aucun composant déjà spécifié (Badge/Chip/Tag/Avatar/Divider/Separator) n'est redéfini ici, uniquement référencé (§1).
- [ ] Label et Caption sont explicitement identifiés comme rôles typographiques, jamais présentés comme des composants avec variantes/états propres.
- [ ] Empty Placeholder renvoie à [[STATE_COMPONENTS.md]] sans dupliquer son anatomie.

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 7) | Product Designer / UI Engineer |

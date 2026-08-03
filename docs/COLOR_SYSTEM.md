# COLOR_SYSTEM.md — Système de couleurs (Phase 2, volume 2)

> **Statut** : document fondateur, vivant — **proposition v1, valeurs à valider visuellement avant implémentation**
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Color Specialist / Senior Visual Designer
> **Documents liés** : [[VISUAL_DIRECTION.md]], [[PERSONALITY.md]], [[DESIGN_TOKENS.md]], [[ACCESSIBILITY_GUIDE.md]]

> **Avertissement d'honnêteté (cohérent avec `CLAUDE.md`)** : contrairement à une décision d'architecture logicielle, un choix de teinte n'a pas de justification purement factuelle — c'est un jugement de goût. Les valeurs ci-dessous sont une **proposition argumentée**, pas une décision arrêtée : elles doivent être vues en contexte réel (rendu, pochettes, interface) et validées avec l'utilisateur avant d'être gravées dans [[DESIGN_SYSTEM_ARCHITECTURE.md]]. Le *raisonnement* (pourquoi éviter telle association, pourquoi cette structure de rôles) est en revanche solide et ne dépend pas du goût.

---

## 1. Raisonnement de différenciation

| Concurrent | Couleur de marque dominante | Melodia évite |
|---|---|---|
| Spotify | Vert vif | Toute teinte verte saturée comme accent principal |
| Apple Music | Dégradé rouge/rose | Tout dégradé rouge/rose comme identité principale |
| YouTube Music | Rouge | Rouge comme accent principal (déjà écarté ci-dessus) |
| TIDAL | Noir strict + accents cyan | Un noir strict sans chaleur comme base par défaut (réservé au thème OLED, §5) |

**Direction retenue** : une teinte **indigo/violet profond**, peu utilisée par les références musicales directes, cohérente avec l'archétype du Sage discret ([[PERSONALITY.md]] §1 — profond, posé, jamais criard) et suffisamment distincte pour ne jamais être confondue avec un concurrent en un coup d'œil.

## 2. Palette neutre (base de l'interface)

Teinte légèrement chaude (pas un gris pur) — cohérent avec « minimalisme chaleureux » ([[VISUAL_DIRECTION.md]] §1).

| Token | Valeur proposée | Usage |
|---|---|---|
| `neutral-0` | `#FAFAF8` | Fond clair par défaut |
| `neutral-50` | `#F0EFEC` | Surface légèrement élevée (clair) |
| `neutral-200` | `#D4D1CB` | Bordures discrètes (clair) |
| `neutral-500` | `#78746D` | Texte secondaire |
| `neutral-800` | `#2B2926` | Texte principal (clair) / surface élevée (sombre) |
| `neutral-950` | `#161513` | Fond sombre par défaut |

## 3. Couleur d'accent principale (indigo)

| Token | Valeur proposée | Usage |
|---|---|---|
| `accent-500` | `#5B4FE0` | Actions principales, éléments actifs, focus |
| `accent-600` | `#4A3FC7` | État pressé/hover sur fond clair |
| `accent-300` | `#9C93F0` | Accent sur fond sombre (plus clair pour rester lisible) |

## 4. Couleur d'accent secondaire (chaleur, usage rare)

| Token | Valeur proposée | Usage |
|---|---|---|
| `accent-warm-500` | `#D99A3C` | Favoris, notation, moments de reconnaissance (Wrapped) — **jamais** pour une action fonctionnelle courante |

**Pourquoi un second accent aussi restreint** : cohérent avec [[PRODUCT_VALUES.md]] §6 (« dense mais jamais chargé ») — un deuxième accent trop utilisé diluerait la lisibilité de l'accent principal comme signal d'action.

## 5. Couleurs d'état

| Rôle | Token | Valeur proposée | Contrainte |
|---|---|---|---|
| Succès | `state-success` | `#4C9A6A` | Désaturé, jamais le vert Spotify (§1) |
| Avertissement | `state-warning` | `#D97706` | Distinct de `accent-warm` pour ne jamais confondre favori et alerte |
| Erreur | `state-danger` | `#D14343` | Désaturé par rapport à un rouge pur, cohérent avec le calme de marque |
| Information | `state-info` | `#4A90D9` | Réservé aux bannières informatives ([[ERROR_EXPERIENCE.md]] §2) |

Chaque couleur d'état est vérifiée au contraste minimum WCAG AA (4.5:1 texte normal, 3:1 texte large/UI) sur son fond associé, dans chaque thème — non négociable ([[PROJECT_CHARTER.md]] §3.6).

## 6. Thèmes

| Thème | Base | Différence clé |
|---|---|---|
| **Light** | `neutral-0` à `neutral-200` | Thème par défaut si le système est clair |
| **Dark** | `neutral-950` à `neutral-800` | Thème par défaut si le système est sombre |
| **OLED** | Noir pur (`#000000`) | Variante de Dark, économie d'énergie sur écrans OLED, contraste encore renforcé |
| **Midnight** | Bleu-noir très désaturé (`#0D0E16`) plutôt que neutre pur | Variante Dark plus « habitée », teinte subtilement liée à `accent-500` |
| **Dynamic Album** | Palette extraite de la pochette en cours ([[PLAYER_SPECIFICATION.md]] §4) | Fond du lecteur uniquement — jamais l'interface globale, pour ne jamais compromettre la lisibilité générale |
| **Dynamic Artist** | Palette moyenne extraite des pochettes d'un artiste | Page artiste uniquement ([[LIBRARY_SPECIFICATION.md]] §6), même garde-fou de contraste que Dynamic Album |

**Règle non négociable pour les thèmes dynamiques** : la palette extraite alimente uniquement l'arrière-plan/l'ambiance — jamais le texte ni les contrôles, qui restent sur les couleurs neutres/accent fixes avec contraste garanti (cohérent avec [[ACCESSIBILITY_GUIDE.md]] §3).

## 7. Règles d'utilisation

- Un seul accent principal visible par écran — l'accent secondaire (§4) ne se combine jamais avec l'accent principal dans un même composant.
- Les couleurs d'état ne sont jamais réutilisées à des fins décoratives — une couleur `state-danger` visible signifie toujours une erreur, sans exception, pour rester un signal fiable.
- Les thèmes dynamiques (§6) sont désactivables individuellement dans les paramètres, avec repli automatique sur le thème actif non dynamique.

---

## 8. Checklist de validation

- [ ] Toutes les couleurs proposées sont explicitement marquées comme v1, pas comme finales.
- [ ] Chaque couleur d'état est vérifiée au contraste WCAG AA minimum dans chaque thème avant implémentation réelle.
- [ ] Aucune teinte ne coïncide avec la couleur de marque dominante d'un concurrent direct (§1).

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 2, volume 2) — proposition v1 | Color Specialist / Senior Visual Designer |

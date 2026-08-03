# VISUAL_IDENTITY_SYSTEM.md — Système d'identité visuelle (synthèse Phase 2, volume 2)

> **Statut** : document fondateur, vivant — document de synthèse, ne fait pas autorité seul ; contient des propositions v1 à valider visuellement
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Creative Director / UI Art Director
> **Documents liés** : [[BRAND_BIBLE.md]], [[PRODUCT_BIBLE.md]], [[TECHNICAL_BLUEPRINT.md]]

Point d'entrée unique pour l'exécution visuelle de Melodia. Complète [[BRAND_BIBLE.md]] (identité stratégique) avec le langage visuel concret. **Ne fait pas autorité par lui-même** : le document source gagne toujours en cas d'écart.

---

## 1. Ce que ce volume ajoute

| Document | Ce qu'il définit | Statut |
|---|---|---|
| [[DESIGN_TOKENS.md]] | Architecture complète des tokens, toutes catégories, échelle de z-index fermée | Établi |
| [[COLOR_SYSTEM.md]] | Palette, thèmes, contraste | **Proposition v1** |
| [[TYPOGRAPHY_GUIDE.md]] | Familles, échelle, graisses | **Proposition v1** |
| [[ICONOGRAPHY_GUIDE.md]] | Style et règles d'usage (bibliothèque déjà actée) | Établi |
| [[ILLUSTRATION_GUIDE.md]] | Style et règles par contexte | Établi |
| [[LAYOUT_SYSTEM.md]] | Grilles desktop/tablette/mobile | Établi |
| [[SURFACE_SYSTEM.md]] | Élévation, ombres, flou | Établi |
| [[THEMES_GUIDE.md]] | 8 expériences de thème, usages et contraintes | Établi (valeurs dépendent de [[COLOR_SYSTEM.md]]) |
| [[LOGO_GUIDE.md]] | Brief conceptuel et règles d'usage | **Brief, pas un logo final** |
| [[SOUND_DESIGN_GUIDE.md]] | Identité sonore minimale et volontairement restreinte | Établi |

Trois extensions plutôt que trois nouveaux documents : [[MOTION_GUIDELINES.md]] §12bis (personnalité de mouvement), [[ACCESSIBILITY_GUIDE.md]] §3bis (daltonisme), [[VISUAL_DIRECTION.md]] §7bis (Plexamp/TIDAL).

## 2. Ce qui est établi vs ce qui reste proposition

**Établi** (raisonnement factuel, ne dépend pas du goût) : architecture des tokens, grilles, élévation des surfaces, règles d'icônes et d'illustration, structure des thèmes, principe de sobriété sonore — tout ce qui découle de contraintes déjà actées (performance, accessibilité, cohérence produit).

**Proposition v1** (jugement de goût, nécessite un retour humain direct) : [[COLOR_SYSTEM.md]] (valeurs hexadécimales), [[TYPOGRAPHY_GUIDE.md]] (choix de famille), [[LOGO_GUIDE.md]] (direction conceptuelle, pas un mark dessiné). Ces trois documents portent explicitement l'avertissement dans leur propre en-tête — ce capstone ne l'efface pas.

## 3. Les trois décisions structurantes de ce volume

1. **Un accent principal (indigo) + un accent secondaire rare (chaleur)**, jamais mélangés dans un même composant ([[COLOR_SYSTEM.md]] §3-4, §7).
2. **Une seule famille typographique** (proposée : General Sans) dans toute l'application, jamais une seconde famille pour les titres ([[TYPOGRAPHY_GUIDE.md]] §2).
3. **Élévation, ombre et z-index varient toujours ensemble** selon un niveau unique par surface, jamais indépendamment ([[SURFACE_SYSTEM.md]] §2).

## 4. Cohérence avec les fondations existantes

- Aucune valeur ne contredit un budget déjà engagé : les animations respectent [[PERFORMANCE_BUDGET.md]] §3, les couleurs respectent [[PROJECT_CHARTER.md]] §3.6 (WCAG AA).
- Aucun choix visuel ne contredit [[PERSONALITY.md]] (Sage discret) ou [[BRAND_PRINCIPLES.md]] — vérifié document par document pendant la rédaction, pas seulement à la fin.
- La bibliothèque d'icônes (Lucide, [[TECH_STACK.md]] §1) et l'architecture technique des tokens ([[DESIGN_SYSTEM_ARCHITECTURE.md]] §1) ne sont redécidées nulle part dans ce volume — uniquement étendues.

## 5. Prochaine étape réelle

Ce volume est un système textuel complet, mais aucune maquette visuelle n'existe encore. Avant toute implémentation dans le code du design system ([[DESIGN_SYSTEM_ARCHITECTURE.md]]), les propositions v1 (§2) doivent être vues en contexte réel et validées — ce n'est pas une formalité, c'est la seule façon de vérifier qu'un jugement de goût fonctionne réellement.

---

## 6. Checklist de validation

- [ ] Chaque document du volume est classé explicitement « Établi » ou « Proposition v1 » (§2), sans ambiguïté.
- [ ] Aucune valeur visuelle ne contredit un budget ou une règle déjà actée ailleurs.
- [ ] Le logo reste un brief conceptuel, jamais présenté comme un mark final.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 2, volume 2) | Creative Director / UI Art Director |

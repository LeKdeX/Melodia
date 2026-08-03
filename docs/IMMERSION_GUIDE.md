# IMMERSION_GUIDE.md — Objectifs d'immersion (Phase 4)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Experience Design Director / Human Interface Specialist
> **Documents liés** : [[THEMES_GUIDE.md]], [[PLAYER_SPECIFICATION.md]] §7-8, [[DYNAMIC_THEME_GUIDE.md]]

> **Cadrage** : ce document ne redéfinit aucune fonctionnalité déjà spécifiée ailleurs ([[THEMES_GUIDE.md]] pour les thèmes Focus/Night, [[PLAYER_SPECIFICATION.md]] §7-8 pour le visualiseur et le mode cinématique) — il pose l'objectif expérientiel commun qui relie ces éléments entre eux et justifie pourquoi ils existent en tant que famille cohérente, pas une liste de fonctionnalités isolées.

---

## 1. Ce que l'immersion signifie pour Melodia

L'immersion n'est pas l'absence d'interface — c'est une interface qui s'efface progressivement à mesure que l'attention de l'utilisateur se porte davantage sur la musique que sur la navigation. Chaque niveau d'immersion (§2-6) retire un peu plus d'éléments de contrôle explicites, jamais de fonctionnalité réelle — tout reste accessible, seulement moins visible par défaut.

## 2. Mode plein écran

Voir [[PLAYER_SPECIFICATION.md]] §2 et [[PLAYER_EXPERIENCE.md]] §4 pour la spécification et la chorégraphie. Objectif propre à ce document : le plein écran est le seul niveau d'immersion qui reste une action explicite et réversible en un geste — jamais un état qui s'active automatiquement sans intention claire de l'utilisateur.

## 3. Mode Focus

Voir [[THEMES_GUIDE.md]] §5 pour la spécification. Objectif : réduire la surface de décision pendant une session de travail, pas seulement réduire le bruit visuel — chaque section masquée (statistiques, découverte) est une section qui inviterait normalement à naviguer, donc à quitter l'écoute en cours ; les masquer sert directement l'objectif de continuité d'écoute ([[PRODUCT_RULES.md]] §2).

## 4. Mode Nuit

Voir [[THEMES_GUIDE.md]] §6 pour la spécification. Objectif : le confort visuel prolongé prime sur toute autre considération esthétique à cette heure d'usage — c'est le seul mode où une réduction de saturation générale de l'interface (pas seulement du thème sombre standard) est acceptée, cohérent avec le respect du rythme visuel de l'utilisateur plutôt qu'un argument marketing.

## 5. Visualiseur et pochette en rotation

Voir [[PLAYER_SPECIFICATION.md]] §7 pour la spécification technique du visualiseur et [[PLAYER_EXPERIENCE.md]] §5 pour la chorégraphie de la pochette en rotation (mode Vinyle optionnel). Objectif commun aux deux : donner un point focal vivant à l'écran pendant une écoute passive (second écran, salon) sans jamais devenir la source principale d'information — le visualiseur et la rotation restent des compléments, désactivables individuellement, jamais la seule façon de savoir ce qui est en train de jouer (le titre/artiste restent toujours visibles en parallèle).

## 6. Paroles en immersion

Voir [[PLAYER_SPECIFICATION.md]] §6 pour l'architecture et [[PLAYER_EXPERIENCE.md]] §10 pour la chorégraphie de défilement. Objectif propre à ce document : les paroles sont le seul élément d'immersion qui rapproche l'utilisateur du contenu musical plutôt que d'un simple fond ambiant — leur traitement visuel (contraste progressif ligne active) doit toujours rester lisible en priorité, jamais sacrifié à l'esthétique du fond dynamique qui les entoure.

## 7. Fond dynamique et transitions douces

Voir [[DYNAMIC_THEME_GUIDE.md]] pour la mécanique complète. Rôle dans l'immersion : le fond dynamique est le seul élément d'immersion qui reste actif à tous les niveaux (§2-6 confondus) sans être lui-même un « mode » activable séparément — il est la toile de fond continue sur laquelle les autres niveaux d'immersion se superposent.

## 8. Mode cinématique (combinaison)

Voir [[PLAYER_SPECIFICATION.md]] §8 pour la spécification. Ce mode combine Fullscreen (§2) + fond dynamique (§7) + visualiseur discret (§5) + paroles en surimpression légère (§6) — c'est la combinaison maximale de tous les niveaux d'immersion de ce document, réservée à un usage passif explicitement choisi, jamais activée par défaut.

## 9. Limite volontaire de l'immersion

Aucun niveau d'immersion ne masque jamais totalement les contrôles de lecture essentiels (lecture/pause au minimum) au-delà d'un délai d'inactivité raisonnable après lequel ils réapparaissent au moindre mouvement — l'immersion ne doit jamais transformer Melodia en une expérience où l'utilisateur perd le contrôle de sa musique, même temporairement.

---

## 10. Checklist de validation

- [ ] Chaque élément demandé dans le cadrage (plein écran, Focus, Nuit, visualiseur, paroles, transitions douces, fond dynamique) est couvert par un objectif explicite, pas seulement une redite de sa spécification fonctionnelle.
- [ ] Aucune fonctionnalité déjà spécifiée ailleurs n'est redécrite ici au-delà de son objectif expérientiel.
- [ ] Aucun niveau d'immersion ne retire l'accès aux contrôles essentiels de façon permanente.

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 4) | Experience Design Director / Human Interface Specialist |

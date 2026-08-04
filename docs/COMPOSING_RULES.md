# COMPOSING_RULES.md — Patterns de composition de layout (Phase 5)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Senior Frontend Architect / Component Library Maintainer
> **Documents liés** : [[FOUNDATIONS.md]] §3, [[LAYOUT_SYSTEM.md]], [[SPACING_SYSTEM.md]]

> **Cadrage** : [[LAYOUT_SYSTEM.md]] définit la grille (colonnes, gouttières). Ce document définit les patterns de composition **au-dessus** de la grille — comment les composants s'assemblent entre eux dans une page, indépendamment du contenu qu'ils portent. Chaque pattern est un composant de layout à part entière du Design System, jamais une structure recréée localement par feature (cohérent avec [[FOUNDATIONS.md]] §3, composabilité).

---

## 1. Container

Le pattern racine : applique une largeur maximale ([[LAYOUT_SYSTEM.md]] §8) et un padding horizontal cohérent avec la classe d'appareil active. Tout écran commence par un Container — jamais un contenu de page directement collé aux bords de la fenêtre sans passer par ce pattern.

## 2. Section

Regroupe un ensemble de contenu thématiquement lié (ex. « Titres populaires » dans une page Artiste) avec un titre optionnel (rôle Headline, [[TYPOGRAPHY_GUIDE.md]] §4bis) et une marge de séparation fixe avec la Section suivante ([[SPACING_SYSTEM.md]] §3). Une Section ne s'imbrique jamais dans une autre Section — pour un sous-regroupement, utiliser Stack (§3) à l'intérieur.

## 3. Stack

Empilement vertical d'éléments avec un gap constant entre chaque élément ([[SPACING_SYSTEM.md]] §2) — le pattern par défaut pour tout groupe d'éléments sans disposition particulière. Le gap est une propriété du Stack lui-même, jamais une marge individuelle ajoutée à chaque enfant (évite la duplication de valeur d'espacement, cohérent avec [[FOUNDATIONS.md]] §5).

## 4. Inline

Équivalent horizontal de Stack — alignement d'éléments sur une seule ligne avec un gap constant, retour à la ligne automatique si l'espace manque (jamais un débordement avec défilement horizontal forcé, sauf cas explicitement listé comme tel, ex. une liste de genres taggés). Utilisé pour les groupes d'actions (barre d'outils) et les métadonnées associées (durée + qualité audio).

## 5. Grid

Disposition en grille de cartes homogènes (bibliothèque, résultats de recherche) — colonnes résolues automatiquement selon la largeur disponible et la classe d'appareil ([[LAYOUT_SYSTEM.md]] §1-3ter), jamais un nombre de colonnes fixe codé dans la feature qui consomme le pattern.

## 6. Split View

Deux zones de contenu côte à côte avec une proportion fixe ou ajustable (ex. bibliothèque + panneau de détail sur desktop large) — repli automatique en empilement vertical (devient un Stack, §3) sous le seuil de largeur où les deux zones ne peuvent plus coexister confortablement ([[RESPONSIVE_GUIDE.md]] §7bis, réorganisation avant masquage).

## 7. Sidebar Layout

Zone de navigation permanente (largeur fixe ou réductible en mode icônes seules, [[RESPONSIVE_GUIDE.md]] §5) + zone de contenu principal qui occupe le reste de l'espace. Distinct de Split View (§6) : la Sidebar n'est jamais le contenu principal de la tâche en cours, uniquement une navigation permanente.

## 8. Master-Detail

Liste d'éléments sélectionnables (Master) + panneau de détail de l'élément sélectionné (Detail) — sur desktop large, les deux coexistent côte à côte (variante de Split View, §6) ; sous un seuil de largeur, la sélection d'un élément du Master navigue vers une vue Detail plein écran plutôt que de tenter une coexistence compressée (cohérent avec [[NAVIGATION_GUIDE.md]], pas de layout dégradé illisible).

---

## 9. Règle de non-réinvention

Un nouveau besoin de disposition est d'abord vérifié contre les huit patterns ci-dessus avant toute création d'une nouvelle structure — cohérent avec [[FOUNDATIONS.md]] §9 (procédure de résolution). Un neuvième pattern n'est ajouté à ce document que s'il répond à un besoin réel qu'aucune combinaison des huit patterns existants ne peut satisfaire.

---

## 10. Checklist de validation

- [ ] Chaque pattern demandé dans le cadrage a une définition et une règle de repli responsive explicite.
- [ ] Aucun pattern ne duplique un autre pattern déjà défini ici.
- [ ] Chaque pattern reste indépendant du contenu qu'il porte — aucune règle de contenu métier ne s'y glisse.

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 5) | Senior Frontend Architect / Component Library Maintainer |

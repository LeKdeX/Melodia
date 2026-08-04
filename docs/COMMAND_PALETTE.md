# COMMAND_PALETTE.md — Approfondissement de la Command Palette (Phase 8)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Navigation System Architect / React UI Architect
> **Documents liés** : [[FORM_COMPONENTS.md]], [[COMPONENT_LIBRARY.md]], [[KEYBOARD_SHORTCUTS.md]]

> **Cadrage** : [[FORM_COMPONENTS.md]] a déjà posé la spécification compacte de Command Palette (anatomie de base, `role="combobox"`, performance FlexSearch). Ce document l'approfondit spécifiquement sur son rôle de **point d'entrée universel de la navigation** — inspiré de Raycast, Arc et VS Code/Spotlight comme demandé, en retenant leurs principes, jamais leur exécution littérale (même règle de non-reproduction que [[PREMIUM_EXPERIENCE_BIBLE.md]] §4).

---

## 1. Ce que la Command Palette n'est pas

Elle n'est pas un second moteur de recherche parallèle à `SearchField`/Search Results ([[SEARCH_COMPONENTS.md]]) — elle **inclut** la recherche musicale comme une catégorie de résultats parmi d'autres (§3), mais son rôle premier est l'accès à toute action ou destination de l'application, pas seulement au contenu musical. Une recherche de piste depuis la Command Palette et depuis la Sidebar (recherche intégrée, [[LAYOUT_COMPONENTS.md]] §3ter) donnent le même résultat — deux points d'entrée, une seule implémentation.

## 2. Ouverture

- **Déclencheurs** : raccourci global `Ctrl/Cmd + K` ([[KEYBOARD_SHORTCUTS.md]]), clic sur le point d'entrée de recherche de la Sidebar, ou clic sur SearchField de la TopBar ([[TOPBAR_SPECIFICATION.md]]) — trois déclencheurs, une seule surface ouverte.
- **Contexte de fermeture précédente** : s'ouvre toujours vide (jamais avec la dernière recherche pré-remplie) — cohérent avec un point d'entrée d'action plutôt qu'un historique de session, distinct de Recent Searches (§8) qui reste consultable une fois ouverte.

## 3. Recherche et catégories de résultats

Les résultats sont groupés par catégorie, dans cet ordre de priorité :

1. **Actions rapides** (ex. « Créer une playlist », « Basculer le thème ») — reconnues par un verbe en tête de la saisie.
2. **Navigation** (ex. « Aller à Paramètres », « Aller à Statistiques ») — toute destination de l'arborescence ([[NAVIGATION_GUIDE.md]] §1).
3. **Contenu musical** (titres/albums/artistes/playlists) — même moteur que Search Results ([[SEARCH_COMPONENTS.md]] §2), résultats identiques.
4. **Paramètres** (ex. rechercher directement un réglage par son nom, sans naviguer manuellement jusqu'à sa section).

**Règle de tri** : dans une saisie ambiguë (ex. « favoris » pourrait être une navigation vers la section Favoris ou une action), la Navigation prime sur le Contenu musical — cohérent avec le rôle premier de la Command Palette (§1).

## 4. Actions

Chaque résultat de catégorie « Actions rapides » (§3.1) s'exécute immédiatement à la sélection, sans étape de confirmation intermédiaire sauf si l'action est destructive ([[PRODUCT_RULES.md]] §7 — dans ce cas, la Command Palette se ferme et le Dialog de confirmation habituel s'ouvre, jamais une confirmation inline dans la Palette elle-même).

## 5. Navigation au sein de la palette

Flèches haut/bas pour parcourir les résultats (toutes catégories confondues, jamais un focus qui reste bloqué à l'intérieur d'une catégorie), Entrée pour sélectionner, `Échap` pour fermer sans action, `Tab` réservé à un usage futur de filtrage par catégorie (non engagé à ce jour — signalé plutôt que promis).

## 6. Raccourcis affichés inline

Chaque résultat qui correspond à une action ayant un raccourci clavier dédié ([[KEYBOARD_SHORTCUTS.md]]) affiche ce raccourci en fin de ligne (rôle Code, [[TYPOGRAPHY_GUIDE.md]] §4bis) — pour que la Command Palette serve aussi de moyen de **découverte** des raccourcis existants, cohérent avec le principe retenu de Raycast (la palette enseigne les raccourcis plutôt que de les cacher).

## 7. Favoris et commandes rapides

Les trois actions les plus fréquemment utilisées par l'utilisateur (mesurées localement, jamais transmises — [[PRODUCT_RULES.md]] §10) apparaissent en tête de liste avant toute saisie, sous un intitulé « Suggestions » — repli sur une liste par défaut neutre (Créer une playlist, Paramètres, Statistiques) si aucun historique local n'existe encore.

## 8. Historique

Les 5 dernières navigations/actions exécutées via la Command Palette apparaissent avant toute saisie, sous « Récent » — distinct de Recent Searches ([[SEARCH_COMPONENTS.md]]) qui reste scopé au contenu musical uniquement, jamais fusionné avec cet historique plus large.

## 9. Accessibilité et performance

Voir [[FORM_COMPONENTS.md]] (Command Palette, spécification compacte) pour le contrat d'accessibilité (piège de focus, `role="combobox"`) et de performance (FlexSearch, latence perçue nulle) — non redécrits ici.

---

## 10. Checklist de validation

- [ ] La Command Palette reste un point d'entrée unifié, jamais un second moteur de recherche parallèle (§1).
- [ ] Chaque catégorie de résultats (§3) a une règle de priorité explicite en cas d'ambiguïté.
- [ ] Aucune action destructive ne s'exécute directement depuis la palette sans passer par le Dialog de confirmation habituel.

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 8) | Navigation System Architect / React UI Architect |

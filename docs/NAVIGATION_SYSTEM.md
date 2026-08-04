# NAVIGATION_SYSTEM.md — Constitution du système de navigation (Phase 8)

> **Statut** : document fondateur, vivant — capstone de Phase 8
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal UX Architect
> **Documents liés** : tous les documents listés en §3

> **Cadrage** : ce document pose la philosophie qui gouverne tout le système de navigation et cartographie l'ensemble des documents de cette phase et des phases précédentes qu'elle organise. Il ne redécide aucune règle déjà actée ailleurs — chaque principe ci-dessous renvoie vers le document qui l'applique concrètement.

---

## 1. Constitution

1. **La navigation ne masque jamais la musique.** Le Mini Player reste visible au-dessus de toute surface de navigation, jamais recouvert ([[MOBILE_NAVIGATION.md]] §8, [[PRODUCT_RULES.md]] §1).
2. **Le lecteur est toujours accessible.** Ce n'est pas un nœud de l'arborescence, c'est une couche persistante au-dessus de toute la navigation ([[NAVIGATION_GUIDE.md]] §2).
3. **L'utilisateur sait toujours où il se trouve.** Un indicateur d'état actif existe sur chaque écran (item Sidebar, titre TopBar, Breadcrumb) — jamais un écran orphelin sans indicateur de position ([[NAVIGATION_CHECKLIST.md]] §1).
4. **Le retour est toujours logique.** Un modèle de pile unique, jamais un graphe ambigu ([[NAVIGATION_HISTORY.md]] §2).
5. **Maximum trois actions pour atteindre n'importe quelle musique.** Vérifiable objectivement sur chaque parcours ([[NAVIGATION_CHECKLIST.md]] §1) — un principe qui contraint directement la profondeur de l'arborescence ([[NAVIGATION_GUIDE.md]] §1) et l'existence même de la Command Palette comme raccourci universel ([[COMMAND_PALETTE.md]]).
6. **Chaque composant de navigation a un rôle exclusif.** La Sidebar répond à « où puis-je aller », la TopBar à « où suis-je et que puis-je faire d'ici », la Command Palette à « comment atteindre n'importe quoi immédiatement » — jamais deux composants qui répondent à la même question ([[TOPBAR_SPECIFICATION.md]] §1, [[NAVIGATION_PATTERNS.md]] §2).
7. **La navigation semble instantanée.** Toute transition respecte le budget déjà acté ([[MOTION_GUIDELINES.md]] §1) — la performance perçue prime sur la richesse visuelle ([[NAVIGATION_CHECKLIST.md]] §5).

## 2. Architecture de l'information — vue d'ensemble

L'arborescence complète, la navigation primaire/secondaire/contextuelle par classe d'appareil et par méthode d'entrée sont déjà entièrement définies dans [[NAVIGATION_GUIDE.md]] (Phase 1, volume 3) — ce capstone ne les répète pas. Cette phase (8) ajoute ce qui manquait : la spécification complète de la TopBar ([[TOPBAR_SPECIFICATION.md]]), l'approfondissement de la Command Palette ([[COMMAND_PALETTE.md]]), la navigation à travers la recherche ([[SEARCH_NAVIGATION.md]]), la structure de l'historique ([[NAVIGATION_HISTORY.md]]), la bibliothèque exhaustive de raccourcis ([[KEYBOARD_SHORTCUTS.md]]), l'architecture mobile ([[MOBILE_NAVIGATION.md]]), et les artefacts de synthèse ([[NAVIGATION_PATTERNS.md]], [[NAVIGATION_CHECKLIST.md]]).

## 3. Carte complète de la Phase 8

### Documents nouveaux

| Document | Rôle |
|---|---|
| [[NAVIGATION_SYSTEM.md]] | Constitution, carte, auto-revue comparative |
| [[TOPBAR_SPECIFICATION.md]] | Spécification complète de la TopBar (13 sections) |
| [[COMMAND_PALETTE.md]] | Approfondissement (priorité des catégories, favoris, historique, découverte de raccourcis) |
| [[SEARCH_NAVIGATION.md]] | Navigation clavier/souris/tactile à travers la recherche |
| [[NAVIGATION_HISTORY.md]] | Trois historiques distincts, pile de navigation, mémoire, restauration |
| [[KEYBOARD_SHORTCUTS.md]] | Bibliothèque exhaustive + combinaisons réservées |
| [[MOBILE_NAVIGATION.md]] | Architecture mobile (Drawer, Pull to Refresh, Swipe Actions) |
| [[NAVIGATION_PATTERNS.md]] | Matrice de compatibilité + diagramme des parcours |
| [[NAVIGATION_CHECKLIST.md]] | Critères de validation du système dans son ensemble |

### Documents étendus en Phase 8

| Document | Ajout |
|---|---|
| [[LAYOUT_COMPONENTS.md]] | §3bis/§3ter Sidebar (Pinned/Floating/Docked/Auto Hide/Adaptive Width/recherche intégrée) |
| [[RESPONSIVE_GUIDE.md]] | §7ter préparation TV/manette |
| [[ACCESSIBILITY_GUIDE.md]] | §6bis liens d'évitement et régions de repère |
| [[ANIMATION_LIBRARY.md]] | §13bis/§13ter Menu/Popover et Command Palette Enter/Exit |
| [[INTERACTION_GUIDELINES.md]] | Correction du conflit `Ctrl/Cmd + Q` (réservé système) |
| [[OVERLAY_COMPONENTS.md]], [[NAVIGATION_COMPONENTS.md]] | Renvois vers les animations et la troncature de Breadcrumb ajoutées |

### Pourquoi certains livrables demandés n'ont pas de nouveau fichier

`SIDEBAR_SPECIFICATION.md`, `RESPONSIVE_NAVIGATION.md`, `NAVIGATION_ACCESSIBILITY.md`, `NAVIGATION_ANIMATIONS.md` → chacun recoupait un document déjà complet (Sidebar avait déjà une spécification à 13 sections, [[ACCESSIBILITY_GUIDE.md]]/[[ACCESSIBILITY_COMPONENTS.md]] couvrent déjà l'accessibilité transverse, [[TRANSITION_GUIDE.md]]/[[ANIMATION_LIBRARY.md]] couvrent déjà le mouvement) — étendus plutôt que dupliqués, cohérent avec la pratique déjà établie à chaque phase précédente.

## 4. Auto-revue comparative

> Comparaison approfondie avec les neuf références nommées par le cadrage — principes retenus, jamais une implémentation copiée (même règle de non-reproduction que [[PREMIUM_EXPERIENCE_BIBLE.md]] §4). Avertissement d'honnêteté identique à celui déjà appliqué depuis [[COMPETITIVE_ANALYSIS.md]] : connaissance du modèle, pas audit en direct.

| Référence | Meilleure pratique retenue |
|---|---|
| Apple Human Interface Guidelines | Le retour reste toujours prévisible et réversible — jamais une navigation qui surprend ([[NAVIGATION_HISTORY.md]] §2) |
| Material Design 3 | Navigation Rail comme état réduit de la navigation principale plutôt qu'un composant séparé — fusion déjà actée ([[NAVIGATION_COMPONENTS.md]] §Fusions) |
| Fluent UI | Régions de repère ARIA systématiques par zone structurelle ([[ACCESSIBILITY_GUIDE.md]] §6bis) |
| Carbon Design System | Documentation explicite de ce qui est incompatible, pas seulement de ce qui fonctionne ([[NAVIGATION_PATTERNS.md]] §2) |
| Arc Browser | Command Palette comme point d'entrée universel plutôt que fonctionnalité secondaire — reprise comme principe central, pas un ajout ([[COMMAND_PALETTE.md]] §1) |
| Raycast | La palette enseigne les raccourcis au lieu de les cacher — raccourcis affichés inline dans chaque résultat ([[COMMAND_PALETTE.md]] §6) |
| Spotify | Convention de raccourcis clavier pour lecture aléatoire/répétition reprise directement plutôt que réinventée ([[KEYBOARD_SHORTCUTS.md]] §4) |
| Plexamp | Continuité du Mini Player à travers toute navigation, jamais interrompu — déjà au cœur de la philosophie (§1.1) avant même cette comparaison, confirmé comme bonne pratique partagée |
| Apple Music | Barre inférieure limitée à l'essentiel (4 entrées), le reste dans un menu secondaire plutôt qu'une surcharge d'onglets ([[RESPONSIVE_GUIDE.md]] §2) |

## 5. Cohérence avec les bibles et systèmes déjà actés

- **Product Bible** : chaque nœud de l'arborescence reste traçable à un persona/parcours ([[NAVIGATION_GUIDE.md]] §1, déjà vérifié).
- **UX Bible** : la règle « chaque animation doit avoir une utilité » ([[UX_PRINCIPLES.md]] §2) s'applique sans exception à chaque transition de navigation ([[TRANSITION_GUIDE.md]]).
- **Brand Bible** : le ton de la navigation reste celui du Sage discret — aucune animation de navigation n'est spectaculaire au point de distraire de la musique ([[PERSONALITY.md]] §1).
- **Design System** : aucun token, aucune règle absolue ([[DESIGN_SYSTEM.md]] §3) n'est contredit par un document de cette phase.
- **Component Library** : Sidebar/TopBar/Tabs/Breadcrumb/Command Palette restent les composants déjà cartographiés ([[COMPONENT_HIERARCHY.md]]), cette phase les approfondit sans en introduire de nouveaux hors ceux déjà listés dans l'index.

---

## 6. Checklist de validation

- [ ] Chaque principe de la constitution (§1) est vérifiable objectivement, pas seulement aspirationnel — voir [[NAVIGATION_CHECKLIST.md]] §1 pour la vérification concrète.
- [ ] La carte (§3) référence tous les documents réellement concernés, aucun oublié.
- [ ] Aucune règle de cette phase ne contredit une décision déjà actée dans le Design System ou la Component Library.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document, capstone de la Phase 8 | Principal UX Architect |

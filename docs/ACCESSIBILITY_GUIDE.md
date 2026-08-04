# ACCESSIBILITY_GUIDE.md — Expérience accessible (Phase 1, volume 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Accessibility Specialist / Human Interface Designer
> **Documents liés** : [[PROJECT_CHARTER.md]] §3.6, [[PERSONAS.md]] §8, [[DEFINITION_OF_DONE.md]], [[INTERACTION_GUIDELINES.md]] §5

> **Cadrage** : le niveau cible (WCAG 2.2 AA minimum, AAA visé lorsque atteignable) est déjà acté dans [[PROJECT_CHARTER.md]] §3.6 — ce document ne le redécide pas. Il consolide et approfondit ce qui était jusqu'ici dispersé entre plusieurs documents (checklist de vérification dans [[DEFINITION_OF_DONE.md]], principe dans [[UX_PRINCIPLES.md]], persona dans [[PERSONAS.md]] §8) en une référence unique de comportement, sans dupliquer leur contenu.

---

## 1. Navigation clavier

- Tout élément interactif est atteignable par tabulation, sans exception ([[PRODUCT_RULES.md]] via [[PERSONAS.md]] §8).
- Ordre de focus cohérent avec la hiérarchie visuelle ([[NAVIGATION_GUIDE.md]] §8), jamais un ordre DOM accidentel qui ferait sauter le focus de façon imprévisible.
- Pièges de focus interdits : une modale capture le focus en son sein tant qu'elle est ouverte, mais le restitue précisément à l'élément qui l'a ouverte à sa fermeture.
- Raccourcis globaux ([[INTERACTION_GUIDELINES.md]] §1) n'entrent jamais en conflit avec les raccourcis natifs du système ou du lecteur d'écran.

## 2. Lecteurs d'écran

- Chaque composant interactif a un nom accessible explicite (jamais une icône seule sans label, [[DESIGN_SYSTEM_ARCHITECTURE.md]] §5).
- **État de lecture** : les changements d'état du lecteur (lecture/pause, changement de piste) sont annoncés via une région `aria-live` polie (non intrusive), jamais assertive au point d'interrompre la lecture vocale d'autre chose ([[FRONTEND_ARCHITECTURE.md]] §9).
- **Listes virtualisées** : la sémantique de liste (nombre total d'éléments, position de l'élément courant) reste correcte malgré le rendu virtualisé ([[PERFORMANCE_BUDGET.md]] §3) — un lecteur d'écran ne doit jamais percevoir une liste tronquée à ce qui est visuellement monté.
- **Contenu dynamique** (résultats de recherche, mise à jour de file) : annoncé de façon proportionnée — un nombre de résultats annoncé une fois, jamais chaque élément individuellement au fil de la frappe.

## 3. Contrastes

Conforme au seuil déjà acté ([[PROJECT_CHARTER.md]] §3.6). Cas particulier : la palette dynamique extraite des pochettes ([[PLAYER_SPECIFICATION.md]] §4) est systématiquement vérifiée par un algorithme de contraste minimum avant application au texte — une pochette dont les couleurs ne passeraient pas le seuil ne bloque jamais la lisibilité, un texte de secours à contraste garanti prend le relais.

## 3bis. Daltonisme (ajout Phase 2 volume 2)

> Section ajoutée plutôt que de créer un `ACCESSIBILITY_VISUAL_GUIDE.md` séparé — cette contrainte s'ajoute directement aux règles de contraste déjà posées ci-dessus.

- **Aucune information n'est portée par la couleur seule**, nulle part dans l'application : chaque couleur d'état de [[COLOR_SYSTEM.md]] §5 (succès/avertissement/erreur/information) est systématiquement accompagnée d'une icône ou d'un libellé distinct — un utilisateur daltonien doit pouvoir distinguer un succès d'une erreur sans percevoir la teinte.
- Les couleurs d'accent (`accent-500` et `accent-warm-500`, [[COLOR_SYSTEM.md]] §3-4) sont choisies avec un écart de luminosité suffisant entre elles pour rester distinguables en simulation de daltonisme (protanopie, deutéranopie, tritanopie) — à vérifier explicitement au moment de valider les valeurs finales de [[COLOR_SYSTEM.md]] (encore en v1 à ce stade).
- Le thème Minimal ([[THEMES_GUIDE.md]] §4) constitue un repli naturel pour un utilisateur daltonien qui préfère minimiser sa dépendance à la couleur — sans être présenté comme un « mode daltonien » séparé et stigmatisant, cohérent avec [[PRODUCT_VALUES.md]] §2 (jamais infantilisant).

## 4. Réduction des animations

`prefers-reduced-motion` respecté par défaut ([[MOTION_GUIDELINES.md]] §12), réglage applicatif plus fin disponible en paramètres ([[SETTINGS_SPECIFICATION.md]] §4) — les deux mécanismes coexistent, le second n'annule jamais le premier par défaut.

## 5. Focus visible

Contour de focus systématique et suffisamment contrasté sur tout élément interactif, jamais supprimé par une réinitialisation de style ([[DESIGN_SYSTEM_ARCHITECTURE.md]] §5) — non négociable, y compris sur les éléments personnalisés (cartes, contrôles du lecteur).

## 6. Navigation logique

L'ordre de lecture d'un lecteur d'écran suit le même ordre que la navigation clavier (§1) — jamais deux ordres divergents qui donneraient une expérience incohérente selon la technologie d'assistance utilisée.

## 6bis. Liens d'évitement et régions de repère (ajout Phase 8)

> Section ajoutée pour la couche navigation ([[NAVIGATION_SYSTEM.md]]) — un besoin réel non couvert jusqu'ici, jamais redondant avec §1/§6 qui restent la référence de l'ordre de focus lui-même.

- **Lien d'évitement (« skip to content »)** : premier élément focusable de l'application, invisible jusqu'au focus clavier — permet de sauter directement du début de la page au contenu principal sans traverser toute la Sidebar ([[LAYOUT_COMPONENTS.md]]) à chaque navigation. Un second lien d'évitement permet de sauter directement aux contrôles du lecteur ([[PLAYER_COMPONENTS.md]]), cohérent avec sa présence permanente ([[PRODUCT_RULES.md]] §1).
- **Régions de repère (landmarks)** : chaque zone structurelle majeure porte un rôle ARIA de repère explicite — `role="navigation"` (Sidebar/TopBar/BottomBar, déjà acté [[LAYOUT_COMPONENTS.md]] §6), `role="main"` (contenu de la vue courante), `role="complementary"` (panneaux secondaires : file d'attente, paroles), `role="search"` (SearchField, [[SEARCH_COMPONENTS.md]]) — jamais deux régions du même rôle sans libellé `aria-label` qui les distingue (ex. TopBar et Sidebar portent toutes deux `role="navigation"`, chacune avec un libellé différent).
- **Un seul `role="main"` actif à la fois** : le contenu de la vue courante, jamais le contenu d'un panneau secondaire ouvert en parallèle (file d'attente, paramètres en Sheet) — cohérent avec la hiérarchie de mise en page déjà actée, où le contenu en cours d'attention occupe toujours la plus grande surface sans jamais être partagé à égalité avec un élément secondaire ([[LAYOUT_SYSTEM.md]] §7).

## 7. Commandes vocales

**Statut : non engagé pour cette phase**, cohérent avec [[INTERACTION_GUIDELINES.md]] §5 — dépend d'une intégration à un assistant vocal système non évaluée techniquement. Ce document ne spécifie pas de comportement de commande vocale pour éviter de promettre une fonctionnalité non conçue ; signalé explicitement plutôt que silencieusement omis.

## 8. Patterns ARIA par type de composant

| Composant | Pattern |
|---|---|
| Lecteur (contrôles) | `role="region"` avec label explicite, boutons natifs (jamais des `div` cliquables) pour lecture/pause/suivant/précédent |
| Liste de bibliothèque | `role="list"`/`role="listitem"`, position et total annoncés |
| Barre de progression de lecture | `role="slider"` avec valeur actuelle/min/max explicites, ajustable au clavier (flèches) |
| Menu contextuel | `role="menu"`, navigation flèches haut/bas, fermeture par `Échap` avec restitution du focus |
| Modale de confirmation | `role="alertdialog"` si l'action est destructive ([[PRODUCT_RULES.md]] §7), focus piégé jusqu'à résolution |
| Notification transitoire (toast/snackbar) | `aria-live="polite"`, jamais focus-stealing — l'utilisateur n'est jamais interrompu dans sa tâche en cours ([[ERROR_EXPERIENCE.md]]) |

## 9. Zoom et redimensionnement de texte

Le layout reste fonctionnel jusqu'à 200 % de zoom texte sans perte de contenu ni chevauchement — testé comme critère de non-régression, pas une aspiration ([[DEFINITION_OF_DONE.md]]).

## 9bis. Accessibilité spécifique à l'expérience musicale (ajout Phase 9)

> Section ajoutée pour couvrir ce qui est propre au domaine musical — les règles génériques (§1-9) s'appliquent déjà à ces composants sans exception, cette section ajoute uniquement ce qui leur est spécifique.

- **Paroles** ([[LYRICS_SYSTEM.md]]) : la ligne active est annoncée aux changements par un lecteur d'écran uniquement si l'utilisateur a explicitement activé un mode de lecture assistée des paroles (jamais par défaut — une annonce automatique à chaque ligne toutes les quelques secondes serait un bruit constant et non désiré) ; navigable au clavier comme une liste standard (`role="list"`) indépendamment du défilement automatique.
- **Visualiseur audio** ([[AUDIO_VISUALIZER.md]]) : purement décoratif au sens de l'accessibilité — `aria-hidden="true"` systématique, jamais annoncé ni navigable, cohérent avec la règle déjà actée qu'il n'est jamais la seule source d'information ([[PLAYER_SPECIFICATION.md]] §7).
- **Lecteur** : chaque forme (Mini/Compact/Expanded/Fullscreen/Floating, [[PLAYER_COMPONENTS.md]]) conserve la même sémantique ARIA sous-jacente — un lecteur d'écran ne doit jamais percevoir un changement de forme comme un changement de contexte de lecture, uniquement comme un changement de présentation visuelle.
- **Pochette dynamique** ([[DYNAMIC_THEME_GUIDE.md]]) : jamais annoncée aux changements de piste au-delà de ce que le changement de titre/artiste communique déjà — une variation de couleur seule n'a pas de représentation sonore pertinente pour un lecteur d'écran.

## 9ter. Outillage de développement (ajout Phase 12)

- **Linting statique** : `eslint-plugin-jsx-a11y` activé en erreur bloquante (pas avertissement) sur les règles couvrant les patterns ARIA déjà actés (§8) — ex. `alt-text`, `role-has-required-aria-props`, `no-noninteractive-element-interactions`. Cohérent avec le traitement déjà réservé aux autres règles ESLint critiques ([[ENGINEERING_MANIFESTO.md]] §2, `@typescript-eslint/no-explicit-any`).
- **Tests automatisés** : `axe-core` déjà intégré aux tests de composants et à une passe E2E dédiée ([[TESTING_STRATEGY.md]] §6) — non redécidé ici, seul le lint statique (ligne précédente) est un ajout réellement nouveau de cette phase.
- **Revue humaine** : test clavier/lecteur d'écran manuel sur tout nouveau parcours avant release, déjà acté ([[TESTING_STRATEGY.md]] §6) — le linting et les tests automatisés ne remplacent jamais cette étape, ils réduisent seulement le volume de défauts qui l'atteignent.

---

## 10. Checklist de validation

- [ ] Aucun élément interactif n'est inatteignable au clavier.
- [ ] Chaque pattern ARIA du §8 est appliqué de façon cohérente à travers toute l'application, pas une fois par composant réinventé.
- [ ] Les commandes vocales restent explicitement non engagées, jamais implicitement promises.
- [ ] Le niveau cible WCAG reste celui de [[PROJECT_CHARTER.md]] §3.6, non redéfini ici.
- [ ] Aucune information n'est portée par la couleur seule (§3bis).

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 3) | Accessibility Specialist / Human Interface Designer |
| 0.2.0 | 2026-08-03 | Phase 2 volume 2 : ajout §3bis (daltonisme) plutôt qu'ACCESSIBILITY_VISUAL_GUIDE.md en doublon | Accessibility Specialist |
| 0.3.0 | 2026-08-04 | Phase 8 : ajout §6bis (liens d'évitement, régions de repère) — au lieu de créer NAVIGATION_ACCESSIBILITY.md en doublon | Accessibility Specialist |
| 0.4.0 | 2026-08-04 | Phase 9 : ajout §9bis (paroles, visualiseur, formes du lecteur, pochette dynamique) — au lieu de créer MUSIC_ACCESSIBILITY.md en doublon | Accessibility Specialist |
| 0.5.0 | 2026-08-04 | Phase 12 : ajout §9ter (outillage de développement : eslint-plugin-jsx-a11y) | Accessibility Specialist |

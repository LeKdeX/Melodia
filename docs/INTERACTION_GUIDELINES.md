# INTERACTION_GUIDELINES.md — Raccourcis, gestes et micro-interactions (Phase 1, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Interaction Designer / UX Research Lead
> **Documents liés** : [[UX_PRINCIPLES.md]], [[PERSONAS.md]] §8, [[DESIGN_SYSTEM_ARCHITECTURE.md]] §5

> **Principe transverse (repris de [[UX_PRINCIPLES.md]] §2)** : chaque interaction listée ci-dessous existe parce qu'elle réduit une friction identifiée dans [[USER_JOURNEYS.md]] — aucune n'est ajoutée par exhaustivité gratuite.

---

## 1. Raccourcis clavier

| Action | Raccourci | Justification |
|---|---|---|
| Lecture/Pause | `Espace` | Convention universelle du marché ([[COMPETITIVE_ANALYSIS.md]]) |
| Piste suivante / précédente | `Ctrl/Cmd + →` / `Ctrl/Cmd + ←` | Évite les collisions avec la navigation de texte native |
| Recherche | `Ctrl/Cmd + K` | Convention établie des applications modernes, accessible depuis n'importe quel écran ([[PRODUCT_RULES.md]] §4) |
| Volume + / − | `Ctrl/Cmd + ↑` / `Ctrl/Cmd + ↓` | |
| Ajouter à la file | `Ctrl/Cmd + Shift + Q` | Cohérent avec l'accès universel à la file ([[PRODUCT_RULES.md]] §5) — corrigé en Phase 8, voir [[KEYBOARD_SHORTCUTS.md]] §5 (`Ctrl/Cmd + Q` seul est réservé au système, Quitter l'application sur macOS) |
| Ajouter aux favoris | `Ctrl/Cmd + D` (mnémonique proche de « favori ») | |
| Navigation entre sections | `Ctrl/Cmd + 1..9` vers les sections principales de la bibliothèque | Efficacité pour l'utilisateur clavier ([[PERSONAS.md]] §8) |
| Ouvrir/fermer le lecteur étendu | `Ctrl/Cmd + E` | |
| Navigation générale (Tab/Maj+Tab) | Standard du navigateur/OS, jamais surchargée | Ne jamais casser une attente d'accessibilité standard |

Tous les raccourcis sont reconfigurables dans les paramètres — aucun n'est figé de façon non négociable, sauf `Tab`/`Maj+Tab` (attente d'accessibilité universelle jamais modifiable).

## 2. Gestes tactiles (mobile/tablette)

| Geste | Action | Contexte |
|---|---|---|
| Glissement vers le haut sur le Mini Player | Ouvre l'Expanded/Fullscreen Player | [[PLAYER_SPECIFICATION.md]] §2 |
| Glissement vers le bas sur l'Expanded Player | Réduit au Mini Player | Symétrique du précédent |
| Glissement latéral sur une piste en file/liste | Actions rapides (ajouter aux favoris, retirer de la file) | Évite un menu contextuel systématique sur mobile |
| Glissement latéral sur la pochette du lecteur | Piste suivante/précédente | Convention établie (Apple Music, Spotify) |
| Appui long sur un élément | Menu contextuel complet (ajouter à une playlist, voir l'album, etc.) | Cohérent avec [[PRODUCT_RULES.md]] §5, accès universel |
| Pincement (zoom) sur une pochette en Fullscreen | Aucune action — évite un geste ambigu avec le zoom système d'accessibilité | Ne jamais entrer en conflit avec un geste d'accessibilité OS |

## 3. Interactions souris/trackpad (desktop)

| Interaction | Action |
|---|---|
| Simple clic sur une piste en liste | Sélection (pas de lecture immédiate, pour permettre une action groupée) |
| Double-clic sur une piste | Lecture immédiate |
| Clic droit | Menu contextuel complet |
| Molette sur le volume du lecteur | Ajustement du volume, incrément fin |
| Glissement (drag) d'une piste vers la file/une playlist | Ajout — retour visuel continu pendant le glissement, jamais un ajout qui n'apparaît qu'au relâchement sans anticipation visuelle |

**Règle de cohérence** (rappel de [[PRODUCT_RULES.md]] §6) : le simple clic ne déclenche jamais une lecture à un endroit et une sélection à un autre — le tableau ci-dessus est la référence unique.

## 4. Micro-interactions

| Interaction | Comportement | Justification UX |
|---|---|---|
| Survol (hover) | Changement d'état visuel immédiat (surbrillance, affichage des contrôles secondaires) | Signale l'interactivité avant l'action |
| Focus clavier | Contour visible systématique, jamais supprimé ([[DESIGN_SYSTEM_ARCHITECTURE.md]] §5) | Non négociable pour l'accessibilité |
| Pressed (appui actif) | Retour visuel bref (échelle réduite légère) | Confirme la réception du geste avant même le résultat de l'action |
| Chargement | Indicateur discret intégré au composant concerné, jamais un écran de chargement plein écran pour une action locale | [[UX_PRINCIPLES.md]] §1 |
| Transition entre vues | Continuité visuelle (l'élément cliqué se retrouve dans la vue suivante), jamais une coupure brutale | Renforce la compréhension spatiale |
| Ajout aux favoris | Animation courte sur l'icône concernée uniquement, jamais une notification globale | [[PLAYER_SPECIFICATION.md]] §10 |
| Ajout à une playlist | Confirmation discrète (ex. bref changement d'icône), jamais une modale | Cohérent avec l'accès en une action ([[PRODUCT_RULES.md]] §5) |
| Like/Favori | Animation immédiate avant confirmation serveur (UI optimiste, [[FRONTEND_ARCHITECTURE.md]] §8) | |
| Téléchargement | Barre de progression locale à l'élément concerné | Jamais un indicateur global peu informatif |
| Synchronisation | Indicateur discret et permanent d'état (dernière synchronisation), jamais intrusif | [[USER_JOURNEYS.md]] §9 |
| Disabled (élément désactivé) | Contraste réduit + curseur/geste sans effet, jamais totalement invisible | L'utilisateur doit comprendre qu'une action existe mais n'est pas disponible maintenant, pas qu'elle n'existe pas |
| Success (action confirmée) | Micro-animation locale à l'élément concerné (coche brève, changement de couleur transitoire) | Jamais une notification globale pour une action déjà anticipée par l'utilisateur (cohérent avec les lignes Favoris/Playlist ci-dessus) |
| Warning (avertissement non bloquant) | Indicateur visuel discret (couleur d'accent), jamais une interruption | Réservé aux situations qui méritent l'attention sans exiger une décision immédiate — voir [[ERROR_EXPERIENCE.md]] §3 pour le pattern complet (toast/snackbar/bannière/modale) |
| Error (état d'erreur local à un composant) | Contour ou icône d'état, message contextuel au survol/focus | Toujours localisé à l'élément concerné avant d'envisager un pattern plus large ([[ERROR_EXPERIENCE.md]]) |

**Note de psychologie cognitive (ajout Phase 1 volume 3)** : chaque micro-interaction ci-dessus respecte le principe de rétroaction immédiate (moins de 100 ms perçus, cohérent avec [[MOTION_GUIDELINES.md]] §1) — un délai de retour supérieur est interprété par le système perceptif comme une absence de réponse, pas comme une réponse lente, ce qui pousse à une répétition du geste (double-clic accidentel, appuis multiples) plutôt qu'à l'attente. C'est la justification cognitive de la catégorie « Micro » de [[MOTION_GUIDELINES.md]] §1, pas une préférence esthétique.

## 5. Accessibilité des interactions

- Toute action accessible à la souris/au geste tactile a un équivalent clavier — sans exception ([[PERSONAS.md]] §8, [[PROJECT_CHARTER.md]] §3.6).
- Commandes vocales : hors périmètre de la Phase 1 volume 2, dépend d'une intégration système (assistant vocal OS) non encore évaluée techniquement — signalé comme non engagé plutôt que promis.
- Objectif WCAG AAA : visé lorsque atteignable sans compromis fonctionnel (ex. contraste renforcé), WCAG AA restant le seuil non négociable déjà acté ([[PROJECT_CHARTER.md]] §3.6) — AAA est une ambition, pas une redéfinition du seuil minimum.

---

## 6. Checklist de validation

- [ ] Chaque interaction du tableau §3 est cohérente avec toutes les autres — aucune ambiguïté clic simple/double-clic.
- [ ] Aucun geste tactile n'entre en conflit avec un geste d'accessibilité système.
- [ ] Chaque micro-interaction a une justification UX explicite, pas seulement une description.
- [ ] Les commandes vocales restent explicitement non engagées, pas présentées comme un livrable.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 2) | Interaction Designer / UX Research Lead |
| 0.2.0 | 2026-08-03 | Phase 1 volume 3 : ajout des états disabled/success/warning/error au §4, note de justification cognitive — plutôt que créer INTERACTION_GUIDE.md en doublon | Interaction Designer / Cognitive Psychologist |
| 0.3.0 | 2026-08-04 | Phase 8, auto-revue : correction d'un conflit réel — `Ctrl/Cmd + Q` était assigné à « Ajouter à la file » alors qu'il est réservé au système (Quitter l'application, macOS) ; changé en `Ctrl/Cmd + Shift + Q` | Navigation System Architect |

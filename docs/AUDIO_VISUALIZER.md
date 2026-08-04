# AUDIO_VISUALIZER.md — Expériences de visualisation audio (Phase 9)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Motion Designer / Audio Software Engineer
> **Documents liés** : [[PLAYER_SPECIFICATION.md]] §7, [[AUDIO_ENGINE.md]] §7, [[ACCESSIBILITY_GUIDE.md]] §9bis

> **Cadrage** : [[PLAYER_SPECIFICATION.md]] §7 renvoie à [[AUDIO_ENGINE.md]] §7 pour l'implémentation technique (`AnalyserNode`, rendu Canvas/Worker) et pose le principe produit (accessible depuis Fullscreen, désactivable, plusieurs styles envisageables). Ce document détaille chaque style — non redécidés techniquement, uniquement visuellement.

---

## 1. Principe commun à tous les styles

Jamais la seule source d'information de lecture ([[PLAYER_SPECIFICATION.md]] §7) — toujours accompagné du titre/artiste/contrôles. `aria-hidden="true"` systématique ([[ACCESSIBILITY_GUIDE.md]] §9bis). Respect strict de `prefers-reduced-motion` : désactivé entièrement (pas une version ralentie) si la préférence est active, cohérent avec son statut purement décoratif.

## 2. Waveform

Représentation de l'amplitude sous forme de barres verticales réagissant en temps réel au signal audio (via `AnalyserNode`, [[AUDIO_ENGINE.md]] §7) — style le plus reconnu du marché (référence directe, [[COMPETITIVE_ANALYSIS.md]]). Palette : dérivée de la palette dynamique de la pochette en cours ([[DYNAMIC_THEME_GUIDE.md]]), jamais une couleur arbitraire déconnectée de l'ambiance déjà établie par le thème dynamique.

## 3. Spectrum (spectre de fréquences)

Représentation par bandes de fréquence (grave à aigu) plutôt que par amplitude brute — plus technique visuellement, réservé au contexte Fullscreen où l'espace permet une lecture fine, jamais affiché en Mini/Expanded Player où l'espace est insuffisant pour rester lisible.

## 4. Ambient

Version très atténuée et floue du Waveform (§2) ou du Spectrum (§3), utilisée comme texture d'arrière-plan plutôt que comme élément au premier plan — se combine avec le thème dynamique ([[DYNAMIC_THEME_GUIDE.md]]) sans jamais rivaliser avec la pochette ou le texte en termes de contraste visuel.

## 5. Minimal

Un seul indicateur discret (ex. une ligne unique qui pulse doucement avec le niveau audio global, pas par bande de fréquence) — pour l'utilisateur qui veut un signal de vie sans démonstration visuelle, cohérent avec le thème Minimal déjà défini ([[THEMES_GUIDE.md]] §4) : ce style de visualiseur est le repli automatique quand le thème Minimal est actif, jamais un Waveform complet qui contredirait le choix de sobriété déjà fait par l'utilisateur.

## 6. Full Screen (mode dédié)

Le Visualiseur occupe l'intégralité du Fullscreen Player, pochette réduite à un élément secondaire ou masquée — seul contexte où le visualiseur prime visuellement sur la pochette (§1 reste vrai : jamais la seule source d'information, titre/artiste restent visibles en surimpression légère). Fait partie du Mode cinématique déjà défini ([[PLAYER_SPECIFICATION.md]] §8, [[IMMERSION_GUIDE.md]] §8) — non redécrit ici.

## 7. Performance Mode (repli automatique)

Bascule automatique vers le style Minimal (§5) ou désactivation complète si le budget de performance est sous tension (défilement rapide d'une liste dense en parallèle, [[FOUNDATION_TESTING_GUIDE.md]] §5bis pour le test de charge correspondant) — jamais un choix manuel supplémentaire proposé à l'utilisateur, la dégradation reste automatique et invisible, cohérent avec la règle déjà actée que la performance prime sur l'esthétique en cas de conflit ([[MOTION_GUIDELINES.md]] §13.4).

## 8. Sélection du style

Réglage unique dans les Paramètres audio/interface ([[SETTINGS_COMPONENTS.md]]), un seul style actif à la fois — jamais une combinaison de deux styles simultanés qui alourdirait le rendu sans bénéfice visuel proportionné.

---

## 9. Checklist de validation

- [ ] Chaque style a une règle de contexte d'usage explicite (où il apparaît, où il n'apparaît jamais).
- [ ] Le repli Performance Mode (§7) reste automatique, jamais un choix supplémentaire à la charge de l'utilisateur.
- [ ] Aucun style ne compromet la règle « jamais la seule source d'information » (§1).

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 9) | Motion Designer / Audio Software Engineer |

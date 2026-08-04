# FOUNDATION_TESTING_GUIDE.md — Stratégie de test des composants fondamentaux (Phase 7)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : QA Engineer / Performance Engineer
> **Documents liés** : [[TESTING_STRATEGY.md]] §3, §7, [[COMPONENT_LIBRARY.md]] §1

> **Cadrage strict** : [[TESTING_STRATEGY.md]] a déjà tranché la pyramide de tests, les seuils de couverture et l'outillage (Vitest, RTL, Chromatic) — ce document ne redécide rien de tout cela. Il précise uniquement comment §3 (tests de composants) et §7 (tests visuels) de [[TESTING_STRATEGY.md]] s'appliquent concrètement à un composant de cette bibliothèque, en complément du §13 « Tests » déjà présent dans chaque spécification individuelle.

---

## 1. Ce que chaque type de test vérifie, appliqué à un composant fondamental

| Type ([[TESTING_STRATEGY.md]]) | Ce qu'il vérifie pour un composant fondamental |
|---|---|
| Composant (RTL, §3) | Rendu par variante/état, comportement observable (clic, focus, saisie), annonces d'accessibilité — jamais l'implémentation interne |
| Visuel (Chromatic, §7) | Chaque variante × chaque état, capturé une fois par thème actif ([[THEMES_GUIDE.md]]) — un composant qui a 6 variantes et 6 états sans compter les thèmes représente déjà 36 captures minimum |
| Accessibilité (axe-core, §6) | Intégré à chaque test de composant (RTL), jamais une passe séparée optionnelle |

## 2. Gabarit de test minimal par composant (référence pour le §13 de chaque fiche)

1. **Rendu de base** : le composant s'affiche sans erreur avec les props minimales requises.
2. **Chaque variante** ([[COMPONENT_LIBRARY.md]] §1, section 3 de chaque fiche) a un test de rendu dédié.
3. **Chaque état** (section 4) a un test qui déclenche la transition et vérifie le résultat (classe, attribut ARIA, contenu affiché).
4. **Navigation clavier** : Tab atteint le composant, les touches attendues (Entrée/Espace/Flèches selon le rôle ARIA, [[ACCESSIBILITY_COMPONENTS.md]] §6) déclenchent le comportement documenté.
5. **Contraste** : vérifié automatiquement (axe-core) sur chaque combinaison variante × thème, jamais seulement sur le thème par défaut.
6. **Cas limite** : au moins un test correspondant à un cas limite documenté (section 11 de chaque fiche) — un composant dont le §11 liste 4 cas limites mais dont aucun n'est testé n'est pas considéré terminé ([[COMPONENT_CHECKLIST.md]] §1).
7. **Reduced motion** : si le composant a une animation (section 8), un test vérifie l'alternative `prefers-reduced-motion`.

## 3. Composants fondamentaux à couverture visuelle prioritaire

Cohérent avec [[COMPONENT_DEPENDENCY_GRAPH.md]] §6 (composants à plus fort impact) : Button, Card, TextField et Dialog reçoivent une couverture visuelle Chromatic avant tout autre composant — une régression visuelle sur l'un de ces quatre se propage à des dizaines de composants dérivés/composés, cohérent avec la priorisation par risque déjà établie dans [[QUALITY_GATES.md]].

## 4. Ce qui n'est jamais testé au niveau du composant fondamental

- Le comportement produit (ex. la règle « précédent relance le début après 3 secondes », [[PLAYER_SPECIFICATION.md]] §5) — testé au niveau du composant de domaine qui l'implémente, jamais au niveau de l'IconButton générique qui le porte visuellement.
- Le texte affiché — testé au niveau du contenu ([[MICROCOPY_LIBRARY.md]], [[DIALOG_LIBRARY.md]]), jamais dupliqué dans un test de composant qui deviendrait fragile à chaque changement de copie.

## 5. Composants « architecture seulement »

Date Picker, Color Picker, Equalizer Panel, Picture in Picture ([[COMPONENT_LIBRARY.md]] §3, [[PLAYER_COMPONENTS.md]]) n'ont aucune obligation de test tant qu'ils ne sont pas implémentés — un test écrit contre une architecture non encore construite serait un test contre une intention, pas contre un comportement réel.

## 5bis. Tests spécifiques aux composants musicaux (ajout Phase 9)

- **Extraction de couleur dynamique** ([[DYNAMIC_THEME_GUIDE.md]]) : test de contraste automatisé sur un échantillon de pochettes aux extrêmes (très sombre, très claire, très saturée, monochrome) — pas seulement sur une pochette de référence unique, cohérent avec le garde-fou déjà acté ([[COLOR_SYSTEM.md]] §6).
- **Lecture sans interruption** ([[QUEUE_SPECIFICATION.md]], [[TRANSITION_GUIDE.md]] §10) : test d'intégration qui déclenche chaque transition de navigation pendant une lecture active et vérifie qu'aucune coupure audio ne survient — priorité maximale, cohérent avec [[PRODUCT_RULES.md]] §2.
- **Synchronisation des paroles** ([[LYRICS_SYSTEM.md]]) : test avec un fichier de paroles factice à horodatage connu, vérifie que la ligne active correspond exactement à la position de lecture simulée, y compris aux limites (première/dernière ligne).
- **Performance du Visualiseur** ([[AUDIO_VISUALIZER.md]]) : test de charge qui vérifie le maintien de 60 FPS pendant que le Visualiseur tourne en parallèle d'un défilement de liste dense — cas de contention réel entre deux animations simultanées.

## 5ter. Tests d'intégration système (ajout Phase 11)

> Ces scénarios relèvent du niveau « Intégration » de la pyramide déjà actée ([[TESTING_STRATEGY.md]] §4) — non redéfinis ici, uniquement appliqués aux systèmes documentés en Phase 11.

- **Synchronisation incrémentale** ([[SYNC_ENGINE_SPECIFICATION.md]]) : fixture avec modifications serveur connues (ajout/suppression/renommage), vérifie que seuls les éléments modifiés sont retraités — jamais une resynchronisation complète silencieuse qui masquerait une régression de performance.
- **Résolution de conflit** ([[OFFLINE_SYSTEM.md]] §5-6) : scénario avec modification simultanée simulée sur deux appareils, vérifie qu'aucune modification n'est perdue sans notification.
- **Intégrité du cache** ([[CACHE_SYSTEM.md]]) : corruption simulée d'une entrée de cache, vérifie la détection et la proposition de réparation ([[MAINTENANCE_SYSTEM.md]]) sans crash de l'application.
- **Reprise de téléchargement après redémarrage** ([[DOWNLOAD_SYSTEM.md]] §5bis) : interruption simulée du processus, vérifie la reprise correcte au relancement.
- **Mode hors ligne complet** ([[OFFLINE_SYSTEM.md]]) : scénario réseau coupé de bout en bout (lecture, navigation, favoris) vérifiant qu'aucune fonctionnalité locale n'est bloquée par l'absence réseau.

---

## 6. Checklist de validation

- [ ] Aucun seuil de couverture ou choix d'outillage n'est redécidé ici — uniquement référencé depuis [[TESTING_STRATEGY.md]].
- [ ] Le gabarit minimal (§2) est applicable tel quel à n'importe quel composant de [[COMPONENT_LIBRARY.md]] §4.
- [ ] La priorisation visuelle (§3) reste cohérente avec [[COMPONENT_DEPENDENCY_GRAPH.md]] §6.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 7) | QA Engineer / Performance Engineer |
| 0.2.0 | 2026-08-04 | Phase 9 : ajout §5bis (tests spécifiques aux composants musicaux) — au lieu de créer MUSIC_TESTING_GUIDE.md en doublon | QA Engineer |
| 0.3.0 | 2026-08-04 | Phase 11 : ajout §5ter (tests d'intégration système : sync, conflits, cache, téléchargement, hors ligne) — au lieu de créer SYSTEM_TESTING_GUIDE.md en doublon | QA Engineer |

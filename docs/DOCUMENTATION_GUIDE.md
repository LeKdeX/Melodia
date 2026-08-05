# DOCUMENTATION_GUIDE.md — Architecture documentaire

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Engineering Manager
> **Documents liés** : tous les documents fondateurs listés ci-dessous

Ce document est la carte de la documentation elle-même : quels documents existent, à quoi chacun sert, qui les possède, quand ils sont mis à jour, et comment la cohérence entre eux est maintenue.

---

## 1. Carte documentaire

### Phase 0 — fondations produit/ingénierie

| Document | Rôle | Propriétaire |
|---|---|---|
| [[PROJECT_CHARTER.md]] | Référence suprême : vision, objectifs mesurables, périmètre, risques | CTO / Lead Software Architect |
| [[ENGINEERING_GUIDE.md]] | Principes d'ingénierie, dette technique, dépendances | CTO / Lead Software Architect |
| [[ARCHITECTURE_PRINCIPLES.md]] | Architecture système : couches, abstractions, frontières | Lead Software Architect |
| [[TECH_STACK.md]] | Stack technique officielle, justifications, compatibilité | CTO / Lead Software Architect |
| [[CODING_STANDARDS.md]] | Nommage, organisation de fichiers, structure de code | Principal Frontend Engineer |
| [[DEVELOPMENT_GUIDELINES.md]] | Cycle de vie d'une fonctionnalité | Engineering Manager |
| [[GIT_WORKFLOW.md]] | Conventions branches/commits/PR/releases/changelog | Engineering Manager |
| [[PERFORMANCE_BUDGET.md]] | Budgets de performance chiffrés | Principal Frontend Engineer |
| [[SECURITY_GUIDELINES.md]] | Principes de sécurité | CTO / Lead Software Architect |
| [[DEFINITION_OF_DONE.md]] | Checklist qualité minimale par fonctionnalité | Engineering Manager |
| [[ADR_TEMPLATE.md]] | Processus et gabarit de décision d'architecture (couvre aussi le besoin « ADR_GUIDE ») | Lead Software Architect |
| [[DOCUMENTATION_GUIDE.md]] | Ce document — carte et gouvernance documentaire | Engineering Manager |
| [[ROADMAP.md]] | Phases concrètes et vision long terme | CTO / Lead Product Designer |

### Phase 0.5 — blueprint technique et décisions d'implémentation

Ces documents ne redécident rien de la Phase 0 : ils en sont l'élaboration concrète et implémentable (voir chaque document pour ses renvois précis).

| Document | Rôle | Propriétaire |
|---|---|---|
| [[TECHNICAL_BLUEPRINT.md]] | Synthèse capstone reliant Phase 0 et Phase 0.5 en un blueprint unique | CTO |
| [[STACK_DECISIONS.md]] | Confirmation des choix Phase 0 + décisions nouvelles (recherche, monorepo) | CTO / Principal Software Architect |
| [[ARCHITECTURE.md]] | Arborescence monorepo concrète, frontières de packages | Principal Software Architect |
| [[FRONTEND_ARCHITECTURE.md]] | Architecture React concrète, routing/rendu SPA | Lead Frontend Engineer |
| [[DATA_LAYER.md]] | Règles de state, cache local, moteur de recherche | Principal Software Architect |
| [[AUDIO_ENGINE.md]] | Queue, gapless, crossfade, ReplayGain, EQ, visualiseur | Lead Frontend Engineer |
| [[JELLYFIN_INTEGRATION.md]] | Implémentation concrète de `JellyfinSource` | Principal Software Architect |
| [[DESIGN_SYSTEM_ARCHITECTURE.md]] | Tokens, architecture de composants, theming | Lead Product Designer / Lead Frontend Engineer |
| [[PERFORMANCE_GUIDE.md]] | Méthodologie et outillage pour tenir les budgets | Lead Frontend Engineer |
| [[SECURITY_GUIDE.md]] | CSP concrète, scan de dépendances, secrets CI | CTO |
| [[TESTING_STRATEGY.md]] | Pyramide de tests, obligations par type de changement | Engineering Manager / Lead Frontend Engineer |
| [[CI_CD_GUIDE.md]] | Pipeline GitHub Actions concret | Lead DevOps Engineer |
| [[QUALITY_GATES.md]] | Gates automatisés en CI (sous-ensemble de la Definition of Done) | Engineering Manager / Lead DevOps Engineer |
| [[CHECKLISTS.md]] | Checklists opérationnelles (onboarding, release, ADR, sécurité, fin de phase) | Engineering Manager |
| [[ENGINEERING_MANIFESTO.md]] | DDD ciblé, liste d'anti-patterns, mécanismes d'enforcement | CTO / Principal Software Architect |

### Phase 0.5 (complément) — analyse comparative, risques, scénarios extrêmes, évolutivité

Ces quatre documents ne redécident rien non plus : ils fournissent l'analyse transverse (comparaisons, risques par décision, validation contre des scénarios extrêmes, évolutivité long terme) qui sous-tend l'ensemble des décisions déjà actées, sans dupliquer leur contenu dans chacun des 15 documents ci-dessus — chacun y renvoie via sa propre checklist de fin de chapitre plutôt que de répéter l'analyse.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[TECHNOLOGY_COMPARISONS.md]] | Comparaisons technologiques complètes (7 paires) sur 7 axes, avec recommandation argumentée | Staff Frontend Engineer / Principal Software Architect |
| [[RISK_REGISTER_TECHNICAL.md]] | Registre de risques par décision technique (risque/probabilité/impact/prévention/correction) | Security Engineer / Staff Performance Engineer / Principal Software Architect |
| [[EXTREME_SCENARIOS.md]] | Validation de chaque décision majeure contre des scénarios extrêmes (échelle, connectivité, multi-serveurs, formats d'écran) | Staff Performance Engineer / Senior UX Engineer |
| [[EVOLVABILITY.md]] | Évolutivité long terme (TV, auto, montres, API publique, SDK, plugins, marketplace, sync cloud), y compris la tension identifiée avec la charte | Principal Software Architect / Product Engineer |

### Phase 1 — Product Bible (volume 1) : vision, positionnement, analyse concurrentielle, ADN produit

Ces documents définissent le *quoi* et le *pourquoi* du produit — aucune identité visuelle (couleurs/logo/typographie), qui reste dans un futur `BRAND_BIBLE.md` explicitement différé (voir `CLAUDE.md`).

| Document | Rôle | Propriétaire |
|---|---|---|
| [[PRODUCT_BIBLE.md]] | Synthèse capstone reliant les 9 documents produit en une référence unique | Chief Product Officer |
| [[VISION.md]] | Pourquoi le produit existe, positionnement face à Jellyfin/Plexamp/Spotify | CPO / Product Strategist |
| [[MISSION.md]] | Déclaration de mission (quoi/pourquoi/pour qui/comment) | CPO |
| [[PRODUCT_VALUES.md]] | Personnalité, ton, valeurs, vocabulaire — identité expérientielle, pas visuelle | Behavioural Designer / Music Experience Designer |
| [[COMPETITIVE_ANALYSIS.md]] | Analyse de 12 concurrents + Navidrome (forces/faiblesses/à reproduire/à éviter/à améliorer) | Product Strategist / UX Researcher |
| [[PERSONAS.md]] | 8 personas détaillés + matrice de recoupement par zone produit | UX Researcher / Product Manager Senior |
| [[USER_JOURNEYS.md]] | 12 parcours complets avec frictions identifiées honnêtement | UX Designer / UX Researcher |
| [[UX_PRINCIPLES.md]] | Charte UX — le raisonnement derrière chaque interaction | UX Designer / Music Experience Designer |
| [[PRODUCT_RULES.md]] | Règles produit non négociables et vérifiables (dérivées de la charte UX) | Product Manager Senior / CPO |
| [[SUCCESS_METRICS.md]] | Objectifs produit mesurables, distincts des budgets techniques | Product Manager Senior / Staff Performance Engineer |

`ROADMAP.md` (Phase 0) porte désormais aussi la vue produit par phase — pas de `PRODUCT_ROADMAP.md` séparé, pour éviter deux feuilles de route qui divergent (voir son historique de révisions).

### Phase 1 — Feature Bible (volume 2) : fonctionnalités, expérience utilisateur, règles métier

Ces 14 documents définissent précisément *ce que le produit fait*, fonctionnalité par fonctionnalité, avec suffisamment de détail pour l'implémentation. Ne redécident aucune implémentation technique déjà actée en Phase 0.5 (ex. [[AUDIO_ENGINE.md]], [[DATA_LAYER.md]]) — uniquement le comportement produit visible.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[FEATURE_BIBLE.md]] | Synthèse capstone reliant les 13 spécifications en une référence unique | Chief Product Officer |
| [[PLAYER_SPECIFICATION.md]] | Formes du lecteur, pochette dynamique, paroles, visualiseur, mode cinématique | Music Experience Designer / Interaction Designer |
| [[QUEUE_SPECIFICATION.md]] | File d'attente, historique, queue persistante/temporaire/intelligente | Interaction Designer / Senior Product Manager |
| [[SEARCH_SPECIFICATION.md]] | Recherche universelle, champs, pondération, autocomplétion | UX Research Lead / Senior Product Manager |
| [[LIBRARY_SPECIFICATION.md]] | Bibliothèque, albums, artistes, favoris, vues, filtres | Senior Product Manager / Music Experience Designer |
| [[PLAYLIST_SPECIFICATION.md]] | Playlists classiques à IA-prête, moteur de règles partagé | Senior Product Manager / UX Research Lead |
| [[DISCOVERY_SPECIFICATION.md]] | Recommandations locales, Daily Mix | UX Research Lead / Music Experience Designer |
| [[STATISTICS_SPECIFICATION.md]] | Tableau de bord d'écoute, fondation de l'historique local | Senior Product Manager / Audiophile Consultant |
| [[WRAPPED_SPECIFICATION.md]] | Rétrospective locale partageable | Spotify Product Designer / Music Experience Designer |
| [[SETTINGS_SPECIFICATION.md]] | Paramètres complets, notifications | Senior Product Manager / Jellyfin Specialist |
| [[ERROR_STATES.md]] | Tous les cas d'erreur et comportements de récupération | UX Research Lead / Jellyfin Specialist |
| [[EMPTY_STATES.md]] | Tous les états vides, distincts des erreurs | Music Experience Designer / UX Research Lead |
| [[INTERACTION_GUIDELINES.md]] | Raccourcis clavier, gestes tactiles, micro-interactions | Interaction Designer / UX Research Lead |
| [[FEATURE_ROADMAP.md]] | Priorisation MVP→Vision long terme + 50 fonctionnalités innovantes | Chief Product Officer / Senior Product Manager |

**Décision de gouvernance de ce volume** : [[PRODUCT_RULES.md]] §10 a été clarifié (pas assoupli) pour distinguer la télémétrie serveur (opt-in) de l'historique d'écoute local (par défaut, jamais transmis) — voir son historique de révisions.

### Phase 1 — UX Bible (volume 3) : expérience utilisateur, parcours, spécifications d'écrans

11 nouveaux documents + extension de [[INTERACTION_GUIDELINES.md]] (pas de doublon créé sous le nom proche « INTERACTION_GUIDE.md »). Ce volume précise *comment* chaque fonctionnalité du volume 2 se vit à l'écran — il ne redécide aucun comportement produit déjà spécifié.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[UX_BIBLE.md]] | Synthèse capstone reliant les 11 documents UX aux volumes 1-2 | Senior UX Designer / Principal Interaction Designer |
| [[USER_FLOWS.md]] | 108 flux atomiques (grain fin), distinct des 12 parcours macro de [[USER_JOURNEYS.md]] | UX Research Lead / Senior UX Designer |
| [[SCREEN_SPECIFICATIONS.md]] | Inventaire et spécification de tous les écrans, groupés par famille | Senior UX Designer / Product Designer |
| [[NAVIGATION_GUIDE.md]] | Architecture de l'information, navigation par méthode d'entrée | Information Architect / Senior UX Designer |
| [[MOTION_GUIDELINES.md]] | Durées et courbes d'animation concrètes par contexte | Motion Designer / Principal Interaction Designer |
| [[RESPONSIVE_GUIDE.md]] | Comportement précis par classe d'appareil | Senior UX Designer / Human Interface Designer |
| [[ACCESSIBILITY_GUIDE.md]] | Patterns ARIA, navigation clavier, lecteurs d'écran | Accessibility Specialist / Human Interface Designer |
| [[ONBOARDING_GUIDE.md]] | Séquence complète de première utilisation | Senior UX Designer / Behavioural Designer |
| [[ERROR_EXPERIENCE.md]] | Taxonomie de patterns UI (toast/snackbar/bannière/modale) | Senior UX Designer / Cognitive Psychologist |
| [[EMPTY_STATES_GUIDE.md]] | Traitement illustratif et rédactionnel des états vides | Motion Designer / Behavioural Designer |
| [[WIREFRAMES_FUNCTIONAL.md]] | Wireframes textuels des écrans principaux, desktop et mobile | Product Designer / Information Architect |

### Phase 2 — Brand Bible (volume 1) : identité, positionnement, ADN de marque

8 nouveaux documents. `MISSION.md` et `VALUES.md` demandés par ce cadrage n'ont pas été créés séparément — une seule marque, un seul produit : [[MISSION.md]] (Phase 1) et [[PRODUCT_VALUES.md]] §4 (Phase 1) restent les sources de vérité, décision confirmée avec l'utilisateur. [[PRODUCT_VALUES.md]] §1/§2/§5 ont été étendus pour renvoyer vers les nouveaux documents plus détaillés ci-dessous plutôt que dupliqués.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[BRAND_BIBLE.md]] | Synthèse capstone, renvoie explicitement vers MISSION.md/PRODUCT_VALUES.md pour mission/valeurs sans les redéfinir | Brand Strategist / Creative Director |
| [[PERSONALITY.md]] | Archétype de marque, adjectifs à utiliser/éviter — approfondit [[PRODUCT_VALUES.md]] §1 | Brand Strategist / Creative Director |
| [[POSITIONING.md]] | Positionnement face aux lecteurs musicaux et aux marques premium non musicales | Brand Strategist / Marketing Director |
| [[VOICE_AND_TONE.md]] | Règles de rédaction par contexte avec exemples — approfondit [[PRODUCT_VALUES.md]] §2 | Copywriter / UX Writer |
| [[VOCABULARY.md]] | Glossaire officiel complet — approfondit [[PRODUCT_VALUES.md]] §5 | Copywriter / UX Writer |
| [[VISUAL_DIRECTION.md]] | Orientations visuelles directionnelles — aucune valeur finale (couleur/police/logo) | Art Director / Visual Identity Designer |
| [[BRAND_PRINCIPLES.md]] | Constitution stratégique de marque, au-dessus du produit et de l'UX | Brand Strategist / Creative Director |
| [[COMPETITIVE_BRAND_ANALYSIS.md]] | Analyse de 8 identités de marque (musicales et non musicales) | Art Director / Brand Designer |

### Phase 2 — Visual Identity System (volume 2) : langage visuel et direction artistique

11 nouveaux documents. **`COLOR_SYSTEM.md`, `TYPOGRAPHY_GUIDE.md` et `LOGO_GUIDE.md` contiennent des propositions v1 explicitement non finales** — jugements de goût nécessitant un retour humain direct avant implémentation, cohérent avec `CLAUDE.md`. `MOTION_BRANDING.md`, `ACCESSIBILITY_VISUAL_GUIDE.md` et `ART_DIRECTION.md` demandés par ce cadrage n'ont pas été créés séparément — [[MOTION_GUIDELINES.md]] §12bis, [[ACCESSIBILITY_GUIDE.md]] §3bis et [[VISUAL_DIRECTION.md]] §7bis les couvrent par extension.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[VISUAL_IDENTITY_SYSTEM.md]] | Synthèse capstone, distingue explicitement ce qui est établi de ce qui est proposition v1 | Creative Director / UI Art Director |
| [[DESIGN_TOKENS.md]] | Architecture complète des tokens (12 catégories), échelle de z-index fermée | Senior Visual Designer / UI Art Director |
| [[COLOR_SYSTEM.md]] | Palette, thèmes, contraste — **proposition v1** | Color Specialist / Senior Visual Designer |
| [[TYPOGRAPHY_GUIDE.md]] | Familles, échelle, graisses — **proposition v1** | Typography Expert / Senior Visual Designer |
| [[ICONOGRAPHY_GUIDE.md]] | Style et règles d'usage des icônes (Lucide déjà acté) | Icon Designer / Senior Visual Designer |
| [[ILLUSTRATION_GUIDE.md]] | Style d'illustration par contexte | Illustration Designer / Senior Visual Designer |
| [[LAYOUT_SYSTEM.md]] | Grilles desktop/tablette/mobile | UI Art Director / Senior Visual Designer |
| [[SURFACE_SYSTEM.md]] | Élévation, ombres, flou, profondeur | UI Art Director / Senior Visual Designer |
| [[THEMES_GUIDE.md]] | 8 expériences de thème, usages et contraintes | Senior Visual Designer / Creative Director |
| [[LOGO_GUIDE.md]] | Brief conceptuel et règles d'usage — **pas un logo final** | Brand Designer / Creative Director |
| [[SOUND_DESIGN_GUIDE.md]] | Identité sonore UI, volontairement minimale | Motion Art Director / Creative Director |

### Phase 3 — Language System : voix, ton, microcopy, traduction

9 nouveaux documents + extension de [[VOICE_AND_TONE.md]] (§3bis, §3ter). **`VOICE_AND_TONE_GUIDE.md`, `GLOSSARY.md`, `ERROR_COPY_GUIDE.md` et `EMPTY_STATE_COPY.md` demandés par ce cadrage n'ont pas été créés séparément** — [[VOICE_AND_TONE.md]] (déjà propriétaire du ton par situation), [[VOCABULARY.md]] (déjà propriétaire du glossaire de marque), et [[ERROR_STATES.md]]/[[ERROR_EXPERIENCE.md]] et [[EMPTY_STATES.md]]/[[EMPTY_STATES_GUIDE.md]] (déjà propriétaires du texte et du ton des erreurs/états vides) les couvrent. La section « NOMMAGE » du cadrage est repliée dans [[STYLE_GUIDE.md]] §6 plutôt que d'avoir un fichier dédié. Détail complet des consolidations : [[LANGUAGE_SYSTEM.md]] §2.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[LANGUAGE_SYSTEM.md]] | Synthèse capstone, carte du système de langage, cohérence cross-canal | UX Writer Senior / Content Design Lead |
| [[UX_WRITING_GUIDE.md]] | Mécanique d'écriture (grammaire, structure, longueur), indépendante du ton | UX Writer Senior / Content Designer |
| [[MICROCOPY_LIBRARY.md]] | Règles mécaniques du texte atomique (boutons, labels, inputs, badges) | Content Designer / UX Writer Senior |
| [[DIALOG_LIBRARY.md]] | Texte complet des confirmations destructives | UX Writer Senior / Conversation Designer |
| [[TOOLTIP_LIBRARY.md]] | Texte des tooltips, zone par zone | UX Writer Senior / Content Designer |
| [[NOTIFICATION_LIBRARY.md]] | Texte des notifications et toasts | UX Writer Senior / Content Designer |
| [[ONBOARDING_COPY.md]] | Texte verbatim de la première expérience | UX Writer Senior / Conversation Designer |
| [[LOCALIZATION_GUIDE.md]] | Conventions rendant le texte source traduisible | UX Writer Senior / Localization Lead |
| [[STYLE_GUIDE.md]] | Ponctuation, capitalisation, emoji, dates/nombres/unités, nommage des objets utilisateur | UX Writer Senior / Content Designer |

### Phase 4 — Premium Experience Bible : motion, interaction, feedback sensoriel

10 nouveaux documents + extension de [[MOTION_GUIDELINES.md]] (§12ter) et [[SOUND_DESIGN_GUIDE.md]] (§7). **`MOTION_SYSTEM.md` et `SOUND_EXPERIENCE.md` demandés par ce cadrage n'ont pas été créés séparément** — [[MOTION_GUIDELINES.md]] (déjà propriétaire des durées/courbes/catégories) et [[SOUND_DESIGN_GUIDE.md]] (déjà propriétaire de l'identité sonore, déjà volontairement minimale) les couvrent par extension plutôt que par duplication. Détail complet des consolidations : [[PREMIUM_EXPERIENCE_BIBLE.md]] §5.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[PREMIUM_EXPERIENCE_BIBLE.md]] | Synthèse capstone : philosophie, perception de performance, états d'attente, références, carte de la phase | Experience Design Director |
| [[INTERACTION_LIBRARY.md]] | Catalogue exhaustif des micro-interactions non déjà couvertes par [[INTERACTION_GUIDELINES.md]], + Future Haptics | Interaction Designer / Principal Motion Designer |
| [[PLAYER_EXPERIENCE.md]] | Chorégraphie sensorielle du lecteur | Human Interface Specialist / Principal Motion Designer |
| [[ANIMATION_LIBRARY.md]] | Bibliothèque officielle des animations nommées (gabarit à 10 champs) | Principal Motion Designer / Performance UX Engineer |
| [[TRANSITION_GUIDE.md]] | Les 9 transitions de page nommées du cadrage | Interaction Designer / Human Interface Specialist |
| [[SKELETON_SYSTEM.md]] | Écrans de chargement par section | Performance UX Engineer / Product Designer |
| [[VISUAL_FEEDBACK_GUIDE.md]] | Chorégraphie visuelle par type de résultat | Perception Psychologist / Interaction Designer |
| [[DYNAMIC_THEME_GUIDE.md]] | Chorégraphie du thème dynamique (dégradé, lumière ambiante, profondeur) | Principal Motion Designer / Perception Psychologist |
| [[IMMERSION_GUIDE.md]] | Objectifs d'immersion reliant plein écran/Focus/Nuit/visualiseur/paroles | Experience Design Director / Human Interface Specialist |
| [[PREMIUM_DETAILS.md]] | 110 détails premium décrits et justifiés | Product Designer / Experience Design Director |

### Phase 5 — Design System : source de vérité de l'interface

3 nouveaux documents + extension de [[DESIGN_TOKENS.md]] (§6bis, §6), [[LAYOUT_SYSTEM.md]] (§3bis/§3ter, §8), [[TYPOGRAPHY_GUIDE.md]] (§4bis), [[COLOR_SYSTEM.md]] (§6bis) et [[RESPONSIVE_GUIDE.md]] (§7bis). **`GRID_SYSTEM.md`, `TYPOGRAPHY_SYSTEM.md`, `RESPONSIVE_SYSTEM.md`, `ICON_SYSTEM.md`, `ACCESSIBILITY_SYSTEM.md`, `MOTION_TOKENS.md` et `ELEVATION_SYSTEM.md` demandés par ce cadrage n'ont pas été créés séparément** — [[LAYOUT_SYSTEM.md]], [[TYPOGRAPHY_GUIDE.md]], [[RESPONSIVE_GUIDE.md]] étendus, et [[ICONOGRAPHY_GUIDE.md]]/[[ACCESSIBILITY_GUIDE.md]]/[[MOTION_GUIDELINES.md]]/[[SURFACE_SYSTEM.md]] déjà entièrement complets sans extension nécessaire. Contradiction du cadrage résolue explicitement (nombre de niveaux d'élévation) : voir [[DESIGN_SYSTEM.md]] §2. Détail complet : [[DESIGN_SYSTEM.md]] §4-5.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[DESIGN_SYSTEM.md]] | Synthèse capstone : source de vérité, règles absolues, résolution de contradiction, carte complète | Principal Design System Architect |
| [[FOUNDATIONS.md]] | Constitution — principes qui gouvernent toute décision future | Principal Design System Architect |
| [[SPACING_SYSTEM.md]] | Règles d'usage de l'espacement par contexte (padding/gap/marge) | Design Token Specialist / UX Engineer |
| [[COMPOSING_RULES.md]] | Patterns de composition de layout (Container à Master-Detail) | Senior Frontend Architect / Component Library Maintainer |

### Phase 6 — Component Library : 135 composants documentés

15 nouveaux documents couvrant 135 composants nommés, avec une **stratégie de profondeur à deux niveaux** ([[COMPONENT_LIBRARY.md]] §2) : spécification complète (13 sections) pour les composants fondamentaux à plus fort réemploi, spécification compacte avec renvoi systématique pour le reste — pour éviter un volume ingérable. `Date Picker`, `Color Picker`, `Equalizer Panel` traités en architecture seulement, cohérent avec leur statut non engagé dans [[FEATURE_ROADMAP.md]]. Cette phase documente la couche composant réutilisable au-dessus des spécifications produit déjà écrites ([[PLAYER_SPECIFICATION.md]], [[SEARCH_SPECIFICATION.md]], [[LIBRARY_SPECIFICATION.md]], [[SETTINGS_SPECIFICATION.md]], [[ERROR_EXPERIENCE.md]], [[EMPTY_STATES_GUIDE.md]]) et du Design System (Phase 5) — aucune n'est redécidée, uniquement référencée.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[COMPONENT_LIBRARY.md]] | Synthèse capstone : gabarit à 13 sections, stratégie de profondeur, index complet des 135 composants | Principal Design System Architect |
| [[ACCESSIBILITY_COMPONENTS.md]] | Contrat d'accessibilité transverse référencé par tous les composants | Accessibility Specialist |
| [[BUTTON_SPECIFICATION.md]] | Button (complète) + IconButton/ToggleButton/SegmentedButton/FAB/Link (compactes) | React Component Architect / Senior UI Engineer |
| [[CARD_SPECIFICATION.md]] | Card générique, base de toutes les cartes du domaine | React Component Architect / Product Designer |
| [[FORM_COMPONENTS.md]] | TextField (complète) + champs de saisie (compactes) + Date/Color Picker (architecture) | UX Engineer / Senior UI Engineer |
| [[OVERLAY_COMPONENTS.md]] | Dialog (complète) + composants superposés (compactes) | Senior UI Engineer / Accessibility Specialist |
| [[FEEDBACK_COMPONENTS.md]] | Toast (complète) + composants de retour et de statut (compactes) | Product Designer / QA Engineer |
| [[NAVIGATION_COMPONENTS.md]] | Tabs (complète) + navigation au sein d'un écran (compactes) | UX Engineer / React Component Architect |
| [[LAYOUT_COMPONENTS.md]] | Sidebar et Grid (complètes) + implémentation des patterns de [[COMPOSING_RULES.md]] | Senior Frontend Architect / React Component Architect |
| [[PLAYER_COMPONENTS.md]] | Formes du lecteur et Queue Item (complètes) + composants du lecteur (compactes) + Equalizer Panel (architecture) | React Component Architect / Motion Designer |
| [[SEARCH_COMPONENTS.md]] | Search Results (complète) + composants de recherche (compactes) | UX Engineer / Frontend Performance Engineer |
| [[LIBRARY_COMPONENTS.md]] | Album Grid et Track Card (complètes) + cartes et vues de bibliothèque/statistiques (compactes) | Product Designer / React Component Architect |
| [[SETTINGS_COMPONENTS.md]] | Preference Row (complète) + composants de paramètres (compactes) | UX Engineer / Product Designer |
| [[STATE_COMPONENTS.md]] | Empty State (complète) + huit états d'écran (compactes, renvoi systématique) | QA Engineer / Product Designer |
| [[COMPONENT_CHECKLIST.md]] | Definition of Done par composant + matrice de composition + tableau de dépendances (bonus du cadrage) | QA Engineer / Principal Design System Architect |

### Phase 7 — Foundation Components : approfondissement de la couche fondamentale

5 nouveaux documents + extension de [[BUTTON_SPECIFICATION.md]], [[FORM_COMPONENTS.md]], [[FEEDBACK_COMPONENTS.md]], [[NAVIGATION_COMPONENTS.md]] et [[COMPONENT_CHECKLIST.md]] (déjà créés en Phase 6, ce cadrage les redemandait sous les mêmes noms — étendus plutôt que réécrits). Sept collisions de nom résolues par fusion explicite plutôt que doublon (voir [[FOUNDATION_COMPONENTS.md]] §1) : Search Bar=SearchField, Autocomplete=Combobox, Confirmation Dialog=Dialog, Empty Placeholder=Empty State, Segmented Control=SegmentedButton, Navigation Rail=Sidebar réduite, Command Menu=Command Palette.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[FOUNDATION_COMPONENTS.md]] | Synthèse capstone de la couche fondamentale, comparaison approfondie par famille avec 7 systèmes de référence | Principal Design System Architect |
| [[DISPLAY_COMPONENTS.md]] | Atomes d'affichage réellement nouveaux (User Avatar, Artwork, Album Cover, Thumbnail, Label, Caption, Code Block) | Product Designer / UI Engineer |
| [[COMPONENT_HIERARCHY.md]] | Hiérarchie officielle par nature (fondamental/dérivé/composé/domaine), arbre complet | Principal Design System Architect |
| [[COMPONENT_DEPENDENCY_GRAPH.md]] | Graphe de dépendances fin par arêtes nommées, composants à plus fort impact | Senior Frontend Engineer / Performance Engineer |
| [[FOUNDATION_TESTING_GUIDE.md]] | Application de [[TESTING_STRATEGY.md]] §3/§7 à la couche fondamentale, gabarit de test minimal | QA Engineer / Performance Engineer |

### Phase 8 — Navigation System : constitution et approfondissement de la navigation

9 nouveaux documents + extension de [[LAYOUT_COMPONENTS.md]], [[RESPONSIVE_GUIDE.md]], [[ACCESSIBILITY_GUIDE.md]], [[ANIMATION_LIBRARY.md]], [[INTERACTION_GUIDELINES.md]], [[OVERLAY_COMPONENTS.md]] et [[NAVIGATION_COMPONENTS.md]]. **`SIDEBAR_SPECIFICATION.md`, `RESPONSIVE_NAVIGATION.md`, `NAVIGATION_ACCESSIBILITY.md` et `NAVIGATION_ANIMATIONS.md` demandés par ce cadrage n'ont pas été créés séparément** — chacun recoupait un document déjà complet, étendu plutôt que dupliqué (détail : [[NAVIGATION_SYSTEM.md]] §3). Auto-revue de cette phase a aussi corrigé un conflit réel hérité de la Phase 1 : `Ctrl/Cmd + Q` était assigné à « Ajouter à la file » dans [[INTERACTION_GUIDELINES.md]] alors qu'il est réservé au système (Quitter l'application, macOS) — corrigé en `Ctrl/Cmd + Shift + Q`.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[NAVIGATION_SYSTEM.md]] | Synthèse capstone : constitution, carte complète, auto-revue comparative (9 références) | Principal UX Architect |
| [[TOPBAR_SPECIFICATION.md]] | Spécification complète de la TopBar (n'avait qu'une ligne auparavant) | Navigation System Architect / React UI Architect |
| [[COMMAND_PALETTE.md]] | Approfondissement (priorité des catégories, favoris, historique, découverte de raccourcis) | Navigation System Architect / React UI Architect |
| [[SEARCH_NAVIGATION.md]] | Navigation clavier/souris/tactile à travers la recherche | Navigation System Architect / Accessibility Specialist |
| [[NAVIGATION_HISTORY.md]] | Trois historiques distincts, pile de navigation, mémoire, restauration | Navigation System Architect / Information Architect |
| [[KEYBOARD_SHORTCUTS.md]] | Bibliothèque exhaustive de raccourcis + combinaisons réservées | Navigation System Architect / Accessibility Specialist |
| [[MOBILE_NAVIGATION.md]] | Architecture mobile (Drawer, Pull to Refresh, Swipe Actions) | Navigation System Architect / Human Interface Specialist |
| [[NAVIGATION_PATTERNS.md]] | Matrice de compatibilité + diagramme des parcours de navigation | Navigation System Architect / Information Architect |
| [[NAVIGATION_CHECKLIST.md]] | Critères de validation du système de navigation dans son ensemble | QA Engineer / Navigation System Architect |

### Phase 9 — Music Component Library : constitution de l'expérience musicale

12 nouveaux documents + extension de [[PLAYER_COMPONENTS.md]], [[PLAYER_SPECIFICATION.md]], [[QUEUE_SPECIFICATION.md]], [[DYNAMIC_THEME_GUIDE.md]], [[LIBRARY_COMPONENTS.md]], [[SEARCH_SPECIFICATION.md]], [[ACCESSIBILITY_GUIDE.md]], [[FOUNDATION_TESTING_GUIDE.md]] et [[PERFORMANCE_GUIDE.md]]. **9 des 22 livrables demandés (`PLAYER_SYSTEM.md`, `PLAYBACK_CONTROLS.md`, `QUEUE_SYSTEM.md`, `DYNAMIC_THEME_ENGINE.md`, `STATISTICS_COMPONENTS.md`, `WRAPPED_COMPONENTS.md`, `SEARCH_MUSIC.md`, `MUSIC_ACCESSIBILITY.md`, `MUSIC_TESTING_GUIDE.md`, `MUSIC_PERFORMANCE_GUIDE.md`) n'ont pas été créés séparément** — chacun recoupait un document déjà profond des Phases 1, 4, 6, 7 ou 8, étendu plutôt que dupliqué (détail complet : [[MUSIC_COMPONENT_LIBRARY.md]] §3).

| Document | Rôle | Propriétaire |
|---|---|---|
| [[MUSIC_COMPONENT_LIBRARY.md]] | Synthèse capstone : constitution, carte complète, matrice bonus, diagramme, auto-revue comparative (8 références) | Principal Music Experience Designer |
| [[ALBUM_COMPONENTS.md]] | Variantes de carte, Hero, Header, Information, Actions, Statistics, Footer | Product Designer / Principal Music Experience Designer |
| [[ARTIST_COMPONENTS.md]] | Hero, biographie, discographie organisée, top morceaux, collaborations | Product Designer / Principal Music Experience Designer |
| [[TRACK_COMPONENTS.md]] | Track Row (nouveau composant), métadonnées, qualité audio, badges, statut | Product Designer / Senior Audio UX Engineer |
| [[PLAYLIST_COMPONENTS.md]] | Hero, header, actions, statistiques, propriétaire, description, filtres | Product Designer / Principal Music Experience Designer |
| [[COLLECTION_COMPONENTS.md]] | Smart Collections, épinglage, favoris (source unique), vues dérivées | Product Designer / Information Architect |
| [[LYRICS_SYSTEM.md]] | Synchronisées/non-synchronisées, karaoké, traduction, recherche, typographie | Senior Audio UX Engineer / Principal Music Experience Designer |
| [[AUDIO_VISUALIZER.md]] | Waveform, Spectrum, Ambient, Minimal, Full Screen, Performance Mode | Motion Designer / Audio Software Engineer |
| [[ARTWORK_SYSTEM.md]] | Repli, chargement, flou, couleur dominante, ombre, glow | Product Designer / Frontend Architect |
| [[PLAYBACK_DEVICES.md]] | Device/Cast Selector, préparation AirPlay/Chromecast/Multiroom | Audio Software Engineer / Senior Audio UX Engineer |
| [[DOWNLOAD_SYSTEM.md]] | File, priorités, pause/reprise, échec, gestion du stockage | Audio Software Engineer / Performance Engineer |
| [[OFFLINE_SYSTEM.md]] | Détection, bibliothèque locale, synchronisation, résolution de conflits | Audio Software Engineer / Frontend Architect |

### Phase 10 — Screen System : assemblage de tous les écrans

16 nouveaux documents + extension de [[TRANSITION_GUIDE.md]] et [[PERFORMANCE_GUIDE.md]]. **Les composants sont traités comme figés (consigne explicite du cadrage)** — chaque document de cette phase explique uniquement comment ils s'assemblent, jamais leur comportement propre. `SCREEN_TRANSITIONS.md` et `SCREEN_PERFORMANCE_GUIDE.md` demandés par ce cadrage n'ont pas été créés séparément — recoupaient [[TRANSITION_GUIDE.md]] (Phase 4) et [[PERFORMANCE_GUIDE.md]], étendus plutôt que dupliqués.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[SCREEN_SYSTEM.md]] | Synthèse capstone : constitution, gabarit d'écran officiel, carte complète, auto-revue comparative (8 références) | Principal Product Designer / UX Architect |
| [[HOME_SCREEN.md]] | Accueil composite (Quick Resume, Daily Mix, Recommendations, Statistics/Wrapped Highlights) | Product Designer / UX Architect |
| [[LIBRARY_SCREENS.md]] | Library Home, Albums, Artists, Tracks, Genres, Collections, Folders, Favorites, Offline, History, Pinned | Product Designer / Information Architect |
| [[ALBUM_SCREEN.md]] | Composition complète + Related Albums, Versions, Disc Selector, Credits | Product Designer / Principal Music Experience Designer |
| [[ARTIST_SCREEN.md]] | Composition complète + Related Artists | Product Designer / Principal Music Experience Designer |
| [[PLAYLIST_SCREEN.md]] | Composition complète + Collaborators (préparation) | Product Designer / Principal Music Experience Designer |
| [[PLAYER_SCREENS.md]] | Assemblage des formes du lecteur + Lyrics View/Visualizer/Queue View/Device Selector/Audio Settings | Product Designer / Senior Audio UX Engineer |
| [[SEARCH_SCREENS.md]] | Séquence Search Home → Results → Advanced Search, Search History | Product Designer / UX Architect |
| [[DOWNLOAD_SCREENS.md]] | Écran unique à onglets (En cours/Terminés) | Product Designer / Audio Software Engineer |
| [[STATISTICS_SCREENS.md]] | Tableau de bord modulaire + Achievements (= Badges) + accès Wrapped | Product Designer / Senior Product Manager |
| [[SETTINGS_SCREENS.md]] | Les 12 catégories en un seul écran à navigation interne | Product Designer / UX Architect |
| [[SYNC_SCREENS.md]] | Distinction import/synchronisation continue + Logs (nouveau) | Product Designer / Audio Software Engineer |
| [[ERROR_SCREENS.md]] | Seuls 2 des 7 cas nommés justifient un écran plein, les 5 autres restent des patterns déjà définis | Product Designer / Accessibility Specialist |
| [[ONBOARDING_SCREENS.md]] | Séquence de 7 noms fusionnée en 5 écrans réels | Product Designer / UX Architect |
| [[RESPONSIVE_LAYOUTS.md]] | Synthèse cross-écran par région (Header/Sidebar/Hero/Main/Right Panel) | Layout System Designer / UX Architect |
| [[SCREEN_COMPONENT_MATRIX.md]] | Composants par écran, partagés/exclusifs, écrans coûteux (renvoi), diagramme complet de navigation | Information Architect / Senior UI Engineer |

### Phase 11 — System Experience Framework : systèmes autour de l'expérience musicale

12 nouveaux documents + extension de [[DOWNLOAD_SYSTEM.md]], [[OFFLINE_SYSTEM.md]] (Phase 9), [[NOTIFICATION_LIBRARY.md]], [[ERROR_STATES.md]] et [[FOUNDATION_TESTING_GUIDE.md]]. **`DOWNLOAD_SYSTEM.md` et `OFFLINE_SYSTEM.md` demandés par ce cadrage existaient déjà sous ce nom exact depuis la Phase 9** — étendus plutôt que réécrits. `NOTIFICATION_SYSTEM.md`, `ERROR_SYSTEM.md` et `SYSTEM_TESTING_GUIDE.md` recoupaient [[NOTIFICATION_LIBRARY.md]], [[ERROR_STATES.md]] et [[FOUNDATION_TESTING_GUIDE.md]] — également étendus plutôt que dupliqués.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[SYSTEM_EXPERIENCE.md]] | Synthèse capstone : constitution, carte complète, auto-revue comparative (9 références) | Principal Platform Architect |
| [[SETTINGS_SYSTEM.md]] | Référentiel exhaustif option par option des 10 catégories de paramètres | System Experience Designer / Senior Product Designer |
| [[SYNC_ENGINE_SPECIFICATION.md]] | Import initial/incrémentale/complète, détection de modification | Synchronization Engineer / Principal Platform Architect |
| [[CACHE_SYSTEM.md]] | Architecture, priorités, expiration, compression, réparation, reconstruction | Principal Platform Architect / Frontend Architect |
| [[DIAGNOSTICS_SYSTEM.md]] | Santé serveur, réseau, occupation cache/disque/mémoire, performances | Performance Engineer / Principal Platform Architect |
| [[MAINTENANCE_SYSTEM.md]] | Outils : reconstruire, réparer, réindexer, nettoyer, supprimer, exporter | Principal Platform Architect / Synchronization Engineer |
| [[UPDATE_SYSTEM.md]] | Vérification, notes de version, migration, rollback (préparation) | Principal Platform Architect / Frontend Architect |
| [[IMPORT_EXPORT_SYSTEM.md]] | Préférences, playlists locales, historique, favoris | Security Architect / Synchronization Engineer |
| [[LOGGING_SYSTEM.md]] | Catégories de logs, rétention, export, suppression | Security Architect / Performance Engineer |
| [[FEATURE_FLAGS.md]] | Cycle de vie d'un flag, activation/désactivation, canal bêta (préparation) | Principal Platform Architect / Senior Product Designer |
| [[SYSTEM_COMPONENT_MATRIX.md]] | Dépendances entre systèmes, diagramme d'interactions | Principal Platform Architect / Information Architect |
| [[SYSTEM_CHECKLIST.md]] | Critères de mise en production spécifiques aux systèmes | Principal Platform Architect / Security Architect |

### Phase 12 — Software Architecture : architecture logicielle frontend

4 nouveaux documents + extension de [[ARCHITECTURE.md]] (§3bis), [[CODING_STANDARDS.md]] (§1bis + nommage), [[ARCHITECTURE_PRINCIPLES.md]] (§8bis), [[PERFORMANCE_GUIDE.md]] (§5bis), [[SECURITY_GUIDE.md]] (§3bis), [[ACCESSIBILITY_GUIDE.md]] (§9ter) et [[TECHNICAL_BLUEPRINT.md]] (§5bis). **9 des 13 livrables demandés (`ARCHITECTURE.md`, `DEPENDENCY_RULES.md`, `NAMING_CONVENTIONS.md`, `PERFORMANCE_GUIDE.md`, `SECURITY_GUIDE.md`, `ACCESSIBILITY_GUIDE.md`, `ENGINEERING_STANDARDS.md`, `SOFTWARE_PRINCIPLES.md` + le sujet transverse de comparaison) n'ont pas donné lieu à un fichier séparé** — ce cadrage redemandait en profondeur ce que les Phases 0 et 0.5 avaient déjà construit (couches, `MusicSource`/`LocalStore`, monorepo, budgets de performance, sécurité, accessibilité) ; chaque redite a été vérifiée puis étendue au bon endroit plutôt que dupliquée ou réécrite. `ENGINEERING_STANDARDS.md` en particulier n'a reçu aucun contenu propre — entièrement redirigé vers [[ENGINEERING_GUIDE.md]]/[[CODING_STANDARDS.md]] déjà exhaustifs sur ce sujet, cohérent avec la règle de consolidation déjà appliquée dans toutes les phases précédentes.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[MODULES.md]] | Registre des 18 modules de fonctionnalité : responsabilité et surface publique de chacun | Principal React Architect |
| [[DATA_FLOW.md]] | Pipeline complet Jellyfin → DTO → Mapper → Entité de domaine → Repository → Cache → Store → ViewModel → UI | Senior TypeScript Engineer |
| [[ERROR_HANDLING.md]] | Gestion des erreurs au niveau code : `Result<T,E>`, Error Boundaries, retry, journalisation — distinct des messages/patterns déjà actés dans [[ERROR_STATES.md]]/[[ERROR_EXPERIENCE.md]] | Staff Frontend Engineer |
| [[CONFIGURATION_GUIDE.md]] | Variables d'environnement, configuration runtime vs build, configuration par cible (Web/Desktop/Mobile) | Infrastructure Architect |

### Phase 13 — Data Layer : architecture de la couche de données Offline-First

9 nouveaux documents + extension de [[JELLYFIN_INTEGRATION.md]] (§7bis), [[CACHE_SYSTEM.md]] (§1-2), [[SYNC_ENGINE_SPECIFICATION.md]] (§1, §7bis-ter), [[DATA_LAYER.md]] (§3.4 + §3bis capstone), [[DOWNLOAD_SYSTEM.md]] (§5quater), [[LOGGING_SYSTEM.md]] (§1), [[SECURITY_GUIDE.md]] (§3ter), [[PERFORMANCE_GUIDE.md]] (§6quater) et [[TESTING_STRATEGY.md]] (§9bis). **12 des 21 livrables demandés (`API_CLIENT.md`, `CACHE_ENGINE.md`, `SYNC_ENGINE.md`, `IMPORT_ENGINE.md`, `SEARCH_INDEX_ENGINE.md`, `OFFLINE_ENGINE.md`, `DOWNLOAD_ENGINE.md`, `LOGGING_GUIDE.md`, `DATA_SECURITY.md`, `DATA_PERFORMANCE.md`, `DATA_TESTING_GUIDE.md` + `DATA_LAYER.md` lui-même, déjà existant) n'ont pas donné lieu à un nouveau fichier séparé** — chacun recoupait un document déjà profond des Phases 0.5/9/11/12, étendu plutôt que dupliqué. Détail complet des consolidations : [[DATA_LAYER.md]] §3bis.2.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[DTO_SPECIFICATION.md]] | DTO Jellyfin par entité, convention commune, cas non applicables clos explicitement | Senior Data Architect |
| [[DOMAIN_MODELS.md]] | Entités de domaine officielles (dérivées de Jellyfin, strictement locales, calculées) | Senior Data Architect |
| [[MAPPER_GUIDE.md]] | Quatre directions de mapping (DTO↔Domain, Storage→Domain, Domain→ViewModel), règles communes | Senior TypeScript Engineer |
| [[REPOSITORY_PATTERN.md]] | Un repository par domaine, interfaces, matrice de dépendance repositories/services | Database Architect |
| [[DATABASE_SCHEMA.md]] | Schéma logique complet (17 tables), relations, index, contraintes, versions | Database Architect |
| [[INDEXEDDB_ARCHITECTURE.md]] | Implémentation concrète Dexie de `IndexedDbStore` : tables, transactions, migrations, limites | Offline-First Specialist |
| [[STATISTICS_ENGINE.md]] | Architecture de calcul des statistiques (Web Worker, cache de résultat, invalidation) | Senior Performance Engineer |
| [[RECOMMENDATION_ENGINE.md]] | Architecture du moteur de scoring de recommandation | Senior Data Architect |
| [[PLAYLIST_ENGINE.md]] | Moteur de règles unique pour les neuf types de playlist, import/export/fusion/conflits | Staff React Engineer |

### Revue de consolidation documentaire (2026-08-04)

Avant d'entrer en Phase 1 d'ingénierie (MVP), une revue complète des 191 documents existants a été menée — audit, pas nouvelle fonctionnalité. 6 documents méta créés, **aucune fusion/suppression/renommage exécuté** (l'audit a trouvé très peu de doublons réels, la discipline de consolidation ayant déjà été appliquée en continu depuis la Phase 6). Rapport complet : [[ARCHITECTURE_REVIEW.md]].

| Document | Rôle | Propriétaire |
|---|---|---|
| [[TABLE_OF_CONTENTS.md]] | Table des matières par domaine (16 domaines) — complète cette carte, organisée chronologiquement | Documentation Architect |
| [[DOCUMENT_HIERARCHY.md]] | Hiérarchie architecturale à 11 niveaux (Vision→...→Couche donnée), honnêteté explicite sur les niveaux non encore construits | Solution Architect |
| [[DOCUMENT_DEPENDENCY_GRAPH.md]] | Documents à plus fort impact en cascade + matrice de dépendance par domaine | Documentation Architect |
| [[GLOSSARY.md]] | Glossaire technique/architectural — distinct de [[VOCABULARY.md]] (copy utilisateur) | Documentation Architect |
| [[DOCUMENTATION_CHECKLIST.md]] | RÈGLE ABSOLUE formalisée (vérifier avant de créer un document) + checklist qualité | Documentation Architect |
| [[ARCHITECTURE_REVIEW.md]] | Rapport complet de l'audit — constats, décisions, chiffres | Principal Software Architect |

**Où chercher quoi désormais** : [[TABLE_OF_CONTENTS.md]] pour une recherche par sujet, ce document (§1) pour une recherche chronologique par phase — les deux se complètent, aucun ne remplace l'autre.

### Architecture d'état (2026-08-04)

10 nouveaux documents + extension de [[TECHNOLOGY_COMPARISONS.md]] (§3bis-3ter), [[PERFORMANCE_GUIDE.md]] (§5ter-5quater), [[TESTING_STRATEGY.md]] (§9ter), [[SECURITY_GUIDE.md]] (§3quater) et [[REPOSITORY_PATTERN.md]] (§2, deux repositories manquants trouvés et ajoutés). **5 des 15 livrables demandés (`ZUSTAND_ARCHITECTURE.md`, `MEMOIZATION_GUIDE.md`, `STATE_PERFORMANCE.md`, `STATE_TESTING_GUIDE.md`, `STATE_SECURITY.md`) n'ont pas donné lieu à un fichier séparé** — chacun recoupait un document déjà profond ; étendus plutôt que dupliqués. Détail complet des consolidations et de l'audit de cohérence contre la couche donnée : [[STATE_MANAGEMENT.md]] §3 et §7.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[STATE_MANAGEMENT.md]] | Capstone : constitution à 8 principes, carte complète, cycle de vie, auto-revue comparative (7 références) | Principal Frontend Architect |
| [[STORE_SPECIFICATIONS.md]] | Les 13 stores Zustand réels (17 noms candidats audités, 4 rejetés comme état serveur/dérivé déguisé) | Principal State Management Architect |
| [[STORE_DEPENDENCY_GRAPH.md]] | Matrice bonus : données/repository/événements/consommateurs par store | Staff React Engineer |
| [[SERVER_STATE.md]] | Classification de l'état serveur, gap de repositories manquants trouvé et comblé | Senior TypeScript Engineer |
| [[LOCAL_STATE.md]] | Classification de l'état local par mécanisme réel (store persisté vs Repository vs Worker) | Senior TypeScript Engineer |
| [[UI_STATE.md]] | Classification de l'état d'UI pur, règle de décision `useState` vs store | Staff React Engineer |
| [[DERIVED_STATE.md]] | État calculé : sélecteurs légers vs moteurs avec cache | Senior Performance Engineer |
| [[TANSTACK_QUERY_GUIDE.md]] | Query keys, cache/stale time, mutations, optimistic updates, prefetch, hydration | Senior TypeScript Engineer |
| [[EVENT_SYSTEM.md]] | Quand utiliser un événement, catégories, catégorie Navigation Events explicitement fermée | Principal State Management Architect |
| [[SELECTOR_GUIDE.md]] | Organisation, égalité/re-render, réutilisation des sélecteurs | Senior Performance Engineer |

### Moteur Audio (2026-08-04)

6 nouveaux documents + extension de [[AUDIO_ENGINE.md]] (promu capstone : §0, §0bis, §1bis, §5bis, §8bis, §9-13), [[PLAYBACK_DEVICES.md]] (§7bis), [[EVENT_SYSTEM.md]] (§3bis), [[PERFORMANCE_GUIDE.md]] (§5quinquies), [[TESTING_STRATEGY.md]] (§9quater), [[SECURITY_GUIDE.md]] (§3quinquies) et [[REPOSITORY_PATTERN.md]] (§2, `TrackRepository.getPlaybackSource`). **9 des 15 livrables demandés n'ont pas donné lieu à un fichier séparé** — `AUDIO_ENGINE.md` lui-même existait déjà (Phase 0.5), `QUEUE_ENGINE.md`/`MEDIA_SESSION.md`/`PLAYBACK_HISTORY.md` s'y sont intégrés, `DEVICE_MANAGEMENT.md`/`PLAYBACK_EVENTS.md`/`AUDIO_PERFORMANCE.md`/`AUDIO_TESTING_GUIDE.md`/`AUDIO_SECURITY.md` ont chacun étendu un document déjà profond. Détail complet : [[AUDIO_ENGINE.md]] §0bis.2 et son historique de révisions.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[PLAYBACK_ENGINE.md]] | Cycle de vie du moteur (init/destruction/reset/recovery), prévention des fuites mémoire | Audio Engine Architect |
| [[PLAYBACK_STATE_MACHINE.md]] | Machine à états officielle à 12 états, taxonomie d'erreurs | Playback Systems Engineer |
| [[PLAYBACK_CONTROLLER.md]] | Traduction commande→moteur, résolution de source locale/cache/streaming transparente | Frontend Architect |
| [[COMMAND_API.md]] | Contrat formel des 16 commandes de lecture | TypeScript Architect |
| [[STREAMING_ENGINE.md]] | Streaming Jellyfin, adaptation réseau, reconnexion | Senior Media Platform Engineer |
| [[BUFFER_MANAGEMENT.md]] | Stratégie de buffer par nature de source (local/cache/streaming) | Performance Engineer |

**Décision structurante actée** : la priorité locale/cache/streaming (contrainte spécifique au projet) est assurée exclusivement par `TrackRepository.getPlaybackSource()` — le moteur audio ne reçoit jamais l'origine de la donnée, uniquement une URI opaque ([[AUDIO_ENGINE.md]] §0bis.2).

### Moteur de Recherche (2026-08-04)

7 nouveaux documents + extension de [[DATA_LAYER.md]] (§3.5), [[RECOMMENDATION_ENGINE.md]] (§5bis), [[PERFORMANCE_GUIDE.md]] (§5sexies), [[TESTING_STRATEGY.md]] (§9quinquies), [[EVENT_SYSTEM.md]] (§3ter) et [[PERFORMANCE_BUDGET.md]] (§2, amendement). **5 des 12 livrables demandés n'ont pas donné lieu à un fichier séparé** — `SEARCH_ALGORITHMS.md`/`DISCOVERY_ENGINE.md`/`SEARCH_PERFORMANCE.md`/`SEARCH_TESTING_GUIDE.md`/`SEARCH_EVENTS.md` recoupaient chacun un document déjà profond, étendus plutôt que dupliqués. Détail complet : [[SEARCH_ENGINE.md]] §2.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[SEARCH_ENGINE.md]] | Capstone : constitution à 6 principes, architecture en couches, budget imbriqué 50/100 ms, auto-revue comparative (10 références) | Principal Search Architect |
| [[INDEX_ENGINE.md]] | Cycle de vie complet de l'index (création/mise à jour/réindexation/reconstruction) | Search Engine Engineer |
| [[SEARCH_INDEX_SPECIFICATION.md]] | Un index FlexSearch par type d'entité, dénormalisation, isolation | Information Retrieval Specialist |
| [[RANKING_ENGINE.md]] | Classement à deux niveaux (pertinence textuelle + score composite borné) | Information Retrieval Specialist |
| [[SUGGESTION_ENGINE.md]] | Suggestions avant/pendant la saisie | UX Architect |
| [[FILTER_ENGINE.md]] | Combinaison de filtres, moteur partagé avec les playlists intelligentes | Data Engineer |
| [[SORT_ENGINE.md]] | Stratégies de tri explicite, distinct du classement par pertinence | Data Engineer |

**Amendement de budget** : [[PERFORMANCE_BUDGET.md]] §2 distingue désormais le budget perçu de bout en bout (< 100 ms, inchangé) du budget de calcul moteur seul (< 50 ms, nouveau) — tension du cadrage avec le budget existant résolue explicitement.

### Plateforme Offline (2026-08-04)

4 nouveaux documents + extension de [[OFFLINE_SYSTEM.md]] (promu capstone : §0, §0bis, §0ter, §1ter), [[SYNC_ENGINE_SPECIFICATION.md]] (§2bis, §4bis), [[CACHE_SYSTEM.md]] (§8bis), [[DOWNLOAD_SYSTEM.md]] (§5quinquies), [[PERFORMANCE_GUIDE.md]] (§5septies), [[SECURITY_GUIDE.md]] (§3sexies), [[DIAGNOSTICS_SYSTEM.md]] (§6bis) et [[TESTING_STRATEGY.md]] (§9sexies). **11 des 15 livrables demandés n'ont pas donné lieu à un fichier séparé** — recoupaient chacun un document déjà profond des phases précédentes (Phase 9/11/12/13, Architecture d'état, Moteur Audio, Moteur de Recherche), étendus plutôt que dupliqués. Détail complet : [[OFFLINE_SYSTEM.md]] §0bis.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[CONFLICT_RESOLUTION.md]] | Matrice de résolution entité par entité (favoris/historique/playlists/téléchargements/paramètres/statistiques) | Distributed Systems Architect |
| [[STORAGE_MANAGER.md]] | Politique de quota/nettoyage/compression globale à travers cache+téléchargements+DB | Storage Engineer |
| [[RESILIENCE_GUIDE.md]] | Taxonomie de 8 scénarios de défaillance + recovery à 3 paliers généralisé | Resilience Engineer |
| [[BACKGROUND_TASKS.md]] | Registre de toutes les tâches de fond et règles d'ordonnancement | Performance Engineer |

### Engineering Handbook (2026-08-04)

5 nouveaux documents + extension de [[FRONTEND_ARCHITECTURE.md]] (§8bis-8ter), [[GIT_WORKFLOW.md]] (§2, §3.0bis, §4bis-4ter), [[TESTING_STRATEGY.md]] (§9septies-9octies), [[FEATURE_FLAGS.md]] (§6bis), [[CHECKLISTS.md]] (§4) et [[DEVELOPMENT_GUIDELINES.md]] (étape 9). **14 des 19 livrables demandés n'ont pas donné lieu à un fichier séparé** — 6 existaient déjà sous le nom exact demandé ([[CODING_STANDARDS.md]], [[GIT_WORKFLOW.md]], [[QUALITY_GATES.md]], [[CI_CD_GUIDE.md]], [[PERFORMANCE_BUDGET.md]], [[DEFINITION_OF_DONE.md]]), 8 ont été étendus, dont [[ACCESSIBILITY_GUIDE.md]] sans aucune modification (AA/AAA déjà explicite depuis [[PROJECT_CHARTER.md]] §3.6). Détail complet : [[ENGINEERING_HANDBOOK.md]] §3.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[ENGINEERING_HANDBOOK.md]] | Capstone : constitution à 9 principes, workflow bonus, matrice des standards, auto-revue comparative (8 références) | Principal Engineering Manager |
| [[TYPESCRIPT_GUIDE.md]] | Interfaces/types, enums, const assertions, generics, utility types, type guards, politique `any` | Staff Frontend Engineer |
| [[CODE_REVIEW_GUIDE.md]] | Checklist du relecteur, distincte de la Definition of Done (auteur) | Principal Engineering Manager |
| [[DEFINITION_OF_READY.md]] | Critères d'entrée en développement, miroir de la Definition of Done | Principal Engineering Manager |
| [[ENGINEERING_METRICS.md]] | Tableau de bord d'ingénierie, statut honnête sur le temps de build (non mesuré) | Principal Engineering Manager |

### Implementation Plan (2026-08-05)

13 nouveaux documents, tous réellement nouveaux — première phase à ne produire aucune documentation fonctionnelle/technique, uniquement un plan d'exécution du backlog déjà entièrement documenté par les phases précédentes. Aucune extension de document existant : le domaine (planification de projet) n'existait sous aucune forme dans le corpus, contrairement à toutes les phases précédentes.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[IMPLEMENTATION_ROADMAP.md]] | Capstone : méthodologie rolling wave assumée, carte complète, Burnup/Vision Roadmap, auto-revue de cohérence | Principal Software Architect |
| [[EPICS.md]] | 15 Epics, un par jalon | Principal Software Architect |
| [[FEATURES.md]] | 82 Features réparties sur les 15 Epics | Senior Product Manager |
| [[TASK_BREAKDOWN.md]] | Méthodologie + 45 Tasks décomposées (M0-M3) + gabarit complet à 14 champs | Staff Technical Lead |
| [[DEPENDENCY_GRAPH.md]] | Graphe Epic/Task, chemin critique, Gantt logique | Staff Technical Lead |
| [[MILESTONES.md]] | M0-M14, critères factuels, opérationnalise ROADMAP.md Phase 1 | Staff Technical Lead |
| [[MVP_ROADMAP.md]] | Portée MVP (obligatoire/peut attendre/reporté) | Senior Product Manager |
| [[RELEASE_PLAN.md]] | Alpha/Beta/RC/Stable, critères de passage | Principal DevOps Engineer |
| [[PROJECT_BOARD_GUIDE.md]] | Structure GitHub Projects/Issues/Milestones | Scrum Master |
| [[GITHUB_LABELS.md]] | Labels/couleurs/priorités P0-P3 | Principal DevOps Engineer |
| [[IMPLEMENTATION_CHECKLISTS.md]] | Gabarit de checklist compact par Task | Staff QA Engineer |
| [[TECHNICAL_RISKS.md]] | Risques de séquencement, distinct de RISK_REGISTER_TECHNICAL.md (risques par décision) | Principal Software Architect |

### Developer Playbook (2026-08-05)

1 nouveau document, aucune extension — le domaine (parcours narratif unique du choix d'une tâche jusqu'au merge) n'existait sous aucune forme séquentielle dans le corpus, bien que chacune de ses étapes renvoie vers un document de gouvernance déjà écrit ([[DEVELOPMENT_GUIDELINES.md]], [[ENGINEERING_BACKLOG.md]], [[TASK_BREAKDOWN.md]], [[ADR_TEMPLATE.md]], [[TESTING_STRATEGY.md]], [[CODE_REVIEW_GUIDE.md]], [[DEFINITION_OF_DONE.md]]) sans en redéfinir aucun. Demandé explicitement concis (10-20 pages max) — aucune décomposition en plusieurs fichiers, aucune mise à jour de contenu fonctionnel/technique, cohérent avec l'instruction explicite de ne pas commencer le développement après ce document.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[DEVELOPER_PLAYBOOK.md]] | Workflow officiel : sélection de tâche → lecture des documents de référence → ADR → implémentation → tests → documentation → auto-review → PR → definition of done | Staff Technical Lead |
| [[ENGINEERING_BACKLOG.md]] | Vue de statut consolidée, point d'entrée par rôle | Principal Engineering Manager |

### TASK-003 — Rapport pré-implémentation (2026-08-05)

1 nouveau document, aucune extension — consolide les résultats déjà produits par TASK-001 (vérification automatisée) et TASK-002 (revue croisée manuelle des 10 documents à plus forte cascade) en un rapport unique, sans redécider ni recorriger aucun des éléments déjà traités. Ne vérifie pas l'application de [[DOCUMENTATION_CHECKLIST.md]] §1 à ce backlog (TASK-004) et ne déclare pas M0 sorti (TASK-005) — les deux explicitement hors périmètre de cette tâche.

| Document | Rôle | Propriétaire |
|---|---|---|
| [[PRE_IMPLEMENTATION_REPORT.md]] | Rapport ponctuel consolidant TASK-001/TASK-002 : 0 lien cassé, 6 citations non résolues restantes, 54 documents avec version d'en-tête désynchronisée restants | Staff Technical Lead |

Emplacement physique : tous les documents fondateurs vivent dans `docs/` à la racine du dépôt. Les ADR individuels vivent dans `docs/adr/`.

---

## 2. Quand chaque document est mis à jour

- **À chaque décision structurante** : le document fondateur concerné est mis à jour dans la même PR que l'ADR correspondant (voir [[ADR_TEMPLATE.md]] §2).
- **À chaque fin de phase** (voir [[ROADMAP.md]]) : relecture complète de l'ensemble des documents, mise à jour du [[ROADMAP.md]] et, si nécessaire, des indicateurs de [[PROJECT_CHARTER.md]] §3.
- **[[GIT_WORKFLOW.md]] `CHANGELOG.md`** : généré automatiquement, jamais édité manuellement (voir [[GIT_WORKFLOW.md]] §5) — exclu de cette carte car ce n'est pas un document de référence mais un artefact généré.

## 3. Qui est responsable

Le « propriétaire » d'un document (tableau §1) est responsable de sa cohérence interne et de sa mise à jour, mais **toute personne** proposant une PR qui touche à un sujet couvert par un document a la responsabilité de vérifier la cohérence avec ce document avant de soumettre (voir [[DEVELOPMENT_GUIDELINES.md]] étape 2). Le propriétaire tranche en cas de désaccord d'interprétation.

## 4. Comment éviter les incohérences

1. **Une seule source de vérité par sujet.** Un sujet (ex. seuils de performance) n'est détaillé en profondeur que dans un seul document ([[PERFORMANCE_BUDGET.md]]) ; les autres documents y renvoient par lien plutôt que de dupliquer les chiffres.
2. **Liens explicites plutôt que répétition.** Toute mention d'un sujet couvert ailleurs utilise un lien `[[Document.md]]` plutôt que de reformuler le contenu — une reformulation dérive silencieusement de l'original avec le temps.
3. **Relecture obligatoire avant toute nouvelle phase** (voir [[PROJECT_CHARTER.md]] §7, règle absolue) — rappelée ici car cette règle s'applique concrètement via ce document.
4. **Historique des révisions en pied de chaque document.** Tout changement de fond est tracé (version, date, changement, auteur), permettant de retracer quand une incohérence a été introduite.
5. **Un ADR par décision qui modifierait un document existant** — jamais de modification silencieuse d'un standard déjà établi sans laisser de trace du changement et de sa justification (voir [[ADR_TEMPLATE.md]]).

## 5. Procédure en cas de contradiction détectée

1. Signaler explicitement la contradiction (quels documents, quelles sections).
2. Proposer les solutions possibles (lequel des deux documents doit céder, ou une troisième formulation qui réconcilie les deux).
3. Recommander la meilleure option avec justification.
4. Si la contradiction touche une fondation du projet (Charter, Architecture Principles), attendre la validation explicite avant de trancher — ne jamais résoudre silencieusement une contradiction fondatrice au fil d'une PR non dédiée à cette question.

---

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0) | Engineering Manager |
| 0.2.0 | 2026-08-03 | Ajout de la carte des 15 documents de Phase 0.5 ; clarification qu'ADR_TEMPLATE.md couvre le besoin « ADR_GUIDE » sans fichier dupliqué | Engineering Manager |
| 0.3.0 | 2026-08-03 | Ajout de la carte des 4 documents du complément Phase 0.5 (comparaisons, risques techniques, scénarios extrêmes, évolutivité) | Engineering Manager |
| 0.4.0 | 2026-08-03 | Ajout de la carte des 10 documents Phase 1 (Product Bible volume 1) ; clarification que ROADMAP.md porte la vue produit sans PRODUCT_ROADMAP.md séparé | Engineering Manager |
| 0.5.0 | 2026-08-03 | Ajout de la carte des 14 documents Phase 1 volume 2 (Feature Bible) | Engineering Manager |
| 0.6.0 | 2026-08-03 | Ajout de la carte des 11 documents Phase 1 volume 3 (UX Bible) ; INTERACTION_GUIDELINES.md étendu plutôt que dupliqué sous INTERACTION_GUIDE.md | Engineering Manager |
| 0.7.0 | 2026-08-03 | Ajout de la carte des 8 documents Phase 2 volume 1 (Brand Bible) ; MISSION.md/VALUES.md non dupliqués, PRODUCT_VALUES.md §1/§2/§5 étendus | Engineering Manager |
| 0.8.0 | 2026-08-03 | Ajout de la carte des 11 documents Phase 2 volume 2 (Visual Identity System) ; MOTION_BRANDING.md/ACCESSIBILITY_VISUAL_GUIDE.md/ART_DIRECTION.md non dupliqués | Engineering Manager |
| 0.9.0 | 2026-08-03 | Ajout de la carte des 9 documents Phase 3 (Language System) ; VOICE_AND_TONE_GUIDE.md/GLOSSARY.md/ERROR_COPY_GUIDE.md/EMPTY_STATE_COPY.md non dupliqués, section NOMMAGE repliée dans STYLE_GUIDE.md §6 | Engineering Manager |
| 0.10.0 | 2026-08-03 | Ajout de la carte des 10 documents Phase 4 (Premium Experience Bible) ; MOTION_SYSTEM.md/SOUND_EXPERIENCE.md non dupliqués | Engineering Manager |
| 0.11.0 | 2026-08-03 | Ajout de la carte des 4 documents Phase 5 (Design System) ; GRID_SYSTEM.md/TYPOGRAPHY_SYSTEM.md/RESPONSIVE_SYSTEM.md/ICON_SYSTEM.md/ACCESSIBILITY_SYSTEM.md/MOTION_TOKENS.md/ELEVATION_SYSTEM.md non dupliqués, contradiction du cadrage sur les niveaux d'élévation résolue | Engineering Manager |
| 0.12.0 | 2026-08-04 | Ajout de la carte des 15 documents Phase 6 (Component Library, 135 composants) ; stratégie de profondeur à deux niveaux documentée | Engineering Manager |
| 0.13.0 | 2026-08-04 | Ajout de la carte des 5 documents Phase 7 (Foundation Components) ; 5 fichiers Phase 6 étendus plutôt que réécrits, 7 collisions de nom résolues par fusion explicite | Engineering Manager |
| 0.14.0 | 2026-08-04 | Ajout de la carte des 9 documents Phase 8 (Navigation System) ; 4 livrables non dupliqués, correction d'un conflit réel de raccourci clavier hérité de la Phase 1 | Engineering Manager |
| 0.15.0 | 2026-08-04 | Ajout de la carte des 12 documents Phase 9 (Music Component Library) ; 9 livrables sur 22 non dupliqués, étendus dans des documents déjà profonds des Phases 1/4/6/7/8 | Engineering Manager |
| 0.16.0 | 2026-08-04 | Ajout de la carte des 16 documents Phase 10 (Screen System) ; 2 livrables non dupliqués (TRANSITION_GUIDE.md/PERFORMANCE_GUIDE.md étendus) ; principe explicite « composants figés, assemblage documenté » appliqué à toute la phase | Engineering Manager |
| 0.17.0 | 2026-08-04 | Ajout de la carte des 12 documents Phase 11 (System Experience Framework) ; DOWNLOAD_SYSTEM.md/OFFLINE_SYSTEM.md (Phase 9) étendus plutôt que réécrits sous le même nom, 3 autres livrables non dupliqués | Engineering Manager |
| 0.18.0 | 2026-08-04 | Ajout de la carte des 4 documents Phase 12 (Software Architecture) ; 9 livrables sur 13 non dupliqués (ENGINEERING_STANDARDS.md entièrement redirigé, sans contenu propre) | Engineering Manager |
| 0.19.0 | 2026-08-04 | Ajout de la carte des 9 documents Phase 13 (Data Layer) ; 12 livrables sur 21 non dupliqués, étendus dans des documents déjà profonds des Phases 0.5/9/11/12 | Engineering Manager |
| 0.20.0 | 2026-08-04 | Ajout de la carte des 6 documents de la Revue de consolidation documentaire — 0 fusion/suppression/renommage exécuté, voir [[ARCHITECTURE_REVIEW.md]] | Documentation Architect |
| 0.21.0 | 2026-08-04 | Ajout de la carte des 10 documents Architecture d'état ; 5 livrables sur 15 non dupliqués ; 2 repositories manquants trouvés et ajoutés à REPOSITORY_PATTERN.md | Engineering Manager |
| 0.22.0 | 2026-08-04 | Ajout de la carte des 6 documents Moteur Audio ; 9 livrables sur 15 non dupliqués ; AUDIO_ENGINE.md promu capstone ; TrackRepository.getPlaybackSource() ajouté à REPOSITORY_PATTERN.md | Engineering Manager |
| 0.23.0 | 2026-08-04 | Ajout de la carte des 7 documents Moteur de Recherche ; 5 livrables sur 12 non dupliqués ; amendement de PERFORMANCE_BUDGET.md §2 (budget imbriqué 50/100 ms) | Engineering Manager |
| 0.24.0 | 2026-08-04 | Ajout de la carte des 4 documents Plateforme Offline ; 11 livrables sur 15 non dupliqués ; OFFLINE_SYSTEM.md promu capstone | Engineering Manager |
| 0.25.0 | 2026-08-04 | Ajout de la carte des 5 documents Engineering Handbook ; 14 livrables sur 19 non dupliqués (record de consolidation) | Engineering Manager |
| 0.26.0 | 2026-08-05 | Ajout de la carte des 13 documents Implementation Plan ; 13 livrables sur 13 réellement nouveaux (aucune extension — domaine inédit) | Engineering Manager |
| 0.27.0 | 2026-08-05 | Ajout de la carte du document Developer Playbook (1 document, réellement nouveau, aucune extension) | Engineering Manager |
| 0.28.0 | 2026-08-05 | TASK-003 : ajout de la carte de PRE_IMPLEMENTATION_REPORT.md (1 document, consolidation de TASK-001/TASK-002, aucune extension) | Staff Technical Lead |

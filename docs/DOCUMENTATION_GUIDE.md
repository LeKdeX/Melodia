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

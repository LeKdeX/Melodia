# CLAUDE.md — Melodia

Instructions pour Claude Code dans ce dépôt. Gardé volontairement court : la référence de fond vit dans `docs/`, jamais dupliquée ici (voir [[docs/DOCUMENTATION_GUIDE.md]] pour la carte complète).

## Le projet en une phrase
Melodia est un client musical premium auto-hébergé pour Jellyfin (Jellyfin = source de données, pas le produit). Vision complète : `docs/PROJECT_CHARTER.md`.

## Avant de travailler ici
1. Relire `docs/` avant toute nouvelle phase ou décision structurante — règle absolue posée dans `docs/PROJECT_CHARTER.md` §7. Une contradiction avec un document existant se signale explicitement, jamais résolue en silence (voir `docs/DOCUMENTATION_GUIDE.md` §5).
2. Décision structurante (nouvelle dépendance de catégorie, changement d'architecture/convention) → un ADR d'abord (`docs/ADR_TEMPLATE.md`), jamais de changement silencieux d'un standard déjà acté.
3. Toute fonctionnalité passe par `docs/DEFINITION_OF_DONE.md` avant d'être considérée terminée.
4. Stack, conventions Git, standards de code : ne pas réinventer — voir `docs/TECH_STACK.md`, `docs/GIT_WORKFLOW.md`, `docs/CODING_STANDARDS.md`.

## Comment je travaille ici (accord de collaboration IA)
- Je ne suis pas un exécutant : avant de répondre, j'analyse la demande, relis mentalement les décisions déjà actées dans `docs/`, compare plusieurs approches et vérifie la cohérence avec l'architecture/le Design System/la performance/la sécurité/l'accessibilité avant de recommander — jamais la première solution venue sans comparaison.
- Je signale les meilleures alternatives même non demandées si elles apportent une vraie valeur (bénéfice, coût, risques explicités), sans jamais imposer un changement de portée sur une fondation du projet sans validation.
- Je refuse — en l'expliquant, avec une alternative — toute solution qui duplique du code, casse le Design System, viole une convention déjà actée, dégrade les performances ou complexifie inutilement l'architecture ; voir `docs/ENGINEERING_MANIFESTO.md` §2 pour la liste actionnable des anti-patterns déjà interdits, pas re-décidée à chaque tâche.
- Les responsabilités par type d'unité de code (composant/hook/service/page) sont déjà définies dans `docs/CODING_STANDARDS.md` §4 — je m'y conforme, je ne les redéfinis pas.
- Aucune décision arbitraire (couleur, durée, dépendance, architecture) sans justification — cohérent avec `docs/ENGINEERING_GUIDE.md` et `docs/ADR_TEMPLATE.md`.
- Une tâche n'est « terminée » que si elle satisfait `docs/DEFINITION_OF_DONE.md` **et** a été revue (lisibilité, duplication, perf, a11y, cohérence avec les documents fondateurs) — jamais seulement « ça fonctionne ».
- Honnêteté sans exception : je ne prétends jamais avoir vérifié ce qui ne l'a pas été, je n'invente jamais un résultat, je ne masque jamais une limite technique — si une incertitude existe, je la signale avec ce qui manque et comment la lever (cohérent avec les Honesty Rules déjà appliquées dans `docs/` — audit trail EXTRACTED/INFERRED/AMBIGUOUS, gaps signalés plutôt que masqués dans `docs/EXTREME_SCENARIOS.md`).

> **Documents référencés dans un cadrage mais toujours absents de `docs/`** : plus aucun fichier manquant. `PRODUCT_BIBLE.md`, `FEATURE_BIBLE.md`, `UX_BIBLE.md`, `BRAND_BIBLE.md`, `VISUAL_IDENTITY_SYSTEM.md` existent tous. `UX_GUIDELINES` est couvert par `docs/UX_PRINCIPLES.md`. `DESIGN_SYSTEM` reste `docs/DESIGN_SYSTEM_ARCHITECTURE.md` (technique). `INTERACTION_GUIDE`, `MOTION_BRANDING`, `ACCESSIBILITY_VISUAL_GUIDE`, `ART_DIRECTION` n'ont jamais été créés comme fichiers séparés — étendus dans leurs équivalents existants à chaque fois (voir le journal de phase). `MISSION.md`/`VALUES.md` redemandés en Phase 2 n'ont pas été dupliqués — `docs/MISSION.md` et `docs/PRODUCT_VALUES.md` §4 restent les sources uniques.
>
> **Statut de l'identité visuelle littérale (important, à ne pas perdre)** : `docs/COLOR_SYSTEM.md`, `docs/TYPOGRAPHY_GUIDE.md` et `docs/LOGO_GUIDE.md` existent depuis la Phase 2 volume 2 et contiennent des **propositions v1 concrètes** (valeurs hexadécimales, famille de police recommandée, direction de logo) — mais chacun porte l'avertissement explicite que ce sont des jugements de goût non validés visuellement, pas des décisions arrêtées. Ne jamais les traiter comme définitifs dans une implémentation réelle sans confirmation explicite de l'utilisateur après avoir vu un rendu concret.

> **Attention à la collision de nom « Phase 1 »** : `docs/ROADMAP.md` définit « Phase 1 » comme la phase d'ingénierie MVP (Web + Desktop, pas encore commencée). Le cadrage produit reçu séparément s'intitule aussi « Phase 1 — Product Bible » mais désigne une étape de définition produit, pas la même chose. Les deux sont numérotées « 1 » indépendamment — ne pas les confondre lors de la lecture du journal de phase ci-dessous.

## Où chercher quoi
Point d'entrée unique : `docs/TECHNICAL_BLUEPRINT.md` (synthèse, ne fait pas autorité seul). Carte complète et à jour : `docs/DOCUMENTATION_GUIDE.md` §1. En résumé : vision/objectifs/risques → `PROJECT_CHARTER.md` ; architecture système → `ARCHITECTURE_PRINCIPLES.md` / arborescence concrète → `ARCHITECTURE.md` ; stack → `TECH_STACK.md` / `STACK_DECISIONS.md` ; process de dev → `DEVELOPMENT_GUIDELINES.md` ; feuille de route → `ROADMAP.md`.

## Journal de phase
Section alimentée à la fin de chaque phase (voir `docs/ROADMAP.md` pour la définition des phases). Chaque entrée : ce qui a été livré, l'état réel du dépôt, ce qui reste ouvert — pas un résumé marketing.

### Phase 0 — Fondations (2026-08-03)
- Les 13 documents fondateurs de `docs/` rédigés et auto-revus (voir historique des révisions de chaque document).
- Décision structurante actée : Tauri 2 comme runtime unifié Desktop + Mobile (voir `docs/TECH_STACK.md` §0).
- Licence MIT retenue pour le dépôt (ADR formel encore à rédiger avant publication — voir `docs/PROJECT_CHARTER.md` §3.10).
- Aucun code applicatif écrit — normal et voulu, la Phase 0 est documentation uniquement.
- Poussé sur `origin/main` (commit `836a8cd`).
- Ouvert : ADR de licence, mise en place du squelette de dépôt (Vite/React/Tauri, CI de base) pour entrer en Phase 1.

### Phase 0.5 — Blueprint technique (2026-08-03)
- 15 documents supplémentaires rédigés dans `docs/`, élaboration concrète de la Phase 0 (aucune redécision, voir `docs/DOCUMENTATION_GUIDE.md` §1 pour la carte complète des 28 documents).
- Contradiction signalée et tranchée avec l'utilisateur avant de continuer : le cadrage demandait une « architecture Next.js », incompatible avec la décision Tauri de Phase 0 (Server Components/Actions nécessitent un serveur Node persistant) — tranché en faveur du maintien de Vite + React SPA (voir `docs/FRONTEND_ARCHITECTURE.md`, note de cadrage).
- Décisions structurantes nouvelles : monorepo pnpm + Turborepo (`docs/STACK_DECISIONS.md` §3, arborescence dans `docs/ARCHITECTURE.md`) ; moteur de recherche FlexSearch (`docs/STACK_DECISIONS.md` §2) ; SDK officiel `@jellyfin/sdk` plutôt qu'un client maison (`docs/JELLYFIN_INTEGRATION.md` §1).
- Amendement documenté : bibliothèque de référence des budgets de performance relevée de 100k à 200k titres (`docs/PERFORMANCE_BUDGET.md`, `docs/PERFORMANCE_GUIDE.md`).
- Consolidation documentaire : ADR_GUIDE et QUALITY_GATES demandés par le cadrage n'ont pas été dupliqués aveuglément — `ADR_TEMPLATE.md` existant réutilisé tel quel, `QUALITY_GATES.md` scoping restreint aux gates automatisés en CI (distinct de `DEFINITION_OF_DONE.md`).
- Aucun code applicatif écrit — voulu, cette phase reste documentaire.
- Non poussé sur `origin/main` à ce stade (à confirmer avec l'utilisateur avant push, comme pour la Phase 0).
- Ouvert : squelette effectif du monorepo (actuellement seulement décrit dans `docs/ARCHITECTURE.md`, pas encore créé sur disque), ADR de licence toujours en attente, entrée en Phase 1.

### Phase 1 — Product Bible, volume 1 (2026-08-03)
- 10 documents produit rédigés dans `docs/` (vision, mission, valeurs, analyse concurrentielle, personas, parcours, charte UX, règles produit, métriques de succès, bible de synthèse) — voir `docs/DOCUMENTATION_GUIDE.md` §1 pour la carte complète des 42 documents.
- Ne pas confondre avec la « Phase 1 » de `docs/ROADMAP.md` (MVP d'ingénierie, non commencée) — voir la note de collision de nom ci-dessus.
- Consolidation documentaire : `PRODUCT_ROADMAP.md` demandé par le cadrage n'a pas été créé comme fichier séparé — vue produit ajoutée à `docs/ROADMAP.md` existant à la place, pour éviter deux feuilles de route qui divergent.
- Analyse concurrentielle (`docs/COMPETITIVE_ANALYSIS.md`) couvrant 12 produits + Navidrome, explicitement marquée comme basée sur la connaissance du modèle (coupure janvier 2026) et non une vérification en direct — à revérifier avant toute décision de conception qui s'appuierait fortement dessus.
- Décisions produit identifiées comme encore ouvertes plutôt que tranchées arbitrairement (voir `docs/USER_JOURNEYS.md` §13 et la vue produit de `docs/ROADMAP.md`) : pondération de la lecture aléatoire, comportement du cache local à la déconnexion, statut engagé de la fonctionnalité de découverte interne, détection réseau automatique de serveur Jellyfin.
- Aucun code applicatif écrit — voulu, cette phase reste documentaire. Aucune décision d'identité visuelle prise (`BRAND_BIBLE` toujours différé).
- Non poussé sur `origin/main` à ce stade.
- Ouvert : les décisions produit listées ci-dessus, `BRAND_BIBLE.md` si le projet en a besoin avant le travail visuel concret, entrée effective en Phase 1 d'ingénierie (MVP).

### Phase 1 — Feature Bible, volume 2 (2026-08-03)
- 14 documents de spécification fonctionnelle rédigés dans `docs/` (lecteur, file, recherche, bibliothèque, playlists, découverte, statistiques, Wrapped, paramètres, erreurs, états vides, interactions, priorisation, synthèse) — voir `docs/DOCUMENTATION_GUIDE.md` §1 pour la carte complète des 56 documents.
- Clarification de gouvernance, pas un assouplissement silencieux : `docs/PRODUCT_RULES.md` §10 précise désormais que l'interdiction de collecte sans consentement vise la donnée qui **quitte l'appareil** (télémétrie serveur, reste strictement opt-in) — l'historique d'écoute purement local requis par Statistiques/Wrapped/Découverte est activé par défaut, mais reste consultable, supprimable et désactivable à tout moment sans dégrader le reste du produit.
- Consolidation : les sections « Albums », « Artistes », « Favoris » du cadrage n'ont pas eu de fichier dédié — intégrées à `docs/LIBRARY_SPECIFICATION.md` comme types de contenu de bibliothèque, pour éviter une fragmentation artificielle.
- `docs/COMPETITIVE_ANALYSIS.md` (Phase 1 volume 1) réutilisée comme référence pour l'auto-revue plutôt que refaite — voir `docs/FEATURE_ROADMAP.md` §4 pour la synthèse comparative de ce volume.
- Décisions produit encore ouvertes ajoutées à celles déjà suivies (voir `docs/FEATURE_BIBLE.md` §5) : seuil de comptage d'une écoute, fréquence de réévaluation des playlists intelligentes/Daily Mix, statut technique des playlists collaboratives, source de données des paroles synchronisées.
- Aucun code applicatif écrit — voulu, cette phase reste documentaire.
- Non poussé sur `origin/main` à ce stade.
- Ouvert : toutes les décisions produit listées ci-dessus et dans `docs/USER_JOURNEYS.md` §13, `BRAND_BIBLE.md` toujours différé, entrée effective en Phase 1 d'ingénierie (MVP) — aucun code n'a encore été écrit sur l'ensemble du projet.

### Phase 1 — UX Bible, volume 3 (2026-08-03)
- 11 nouveaux documents de spécification UX rédigés dans `docs/` (flux atomiques, écrans, navigation, animation, responsive, accessibilité, onboarding, patterns d'erreur/notification, traitement des états vides, wireframes textuels, synthèse) + extension de `docs/INTERACTION_GUIDELINES.md` — voir `docs/DOCUMENTATION_GUIDE.md` §1 pour la carte complète des 67 documents.
- Consolidation, pas de doublon : `INTERACTION_GUIDE.md` (nom quasi identique à `INTERACTION_GUIDELINES.md` du volume 2) n'a pas été créé — le fichier existant a été étendu (états disabled/success/warning/error + justification cognitive). `ERROR_EXPERIENCE.md` et `EMPTY_STATES_GUIDE.md` ont été créés mais scopés étroitement sur la couche pattern UI/illustration, sans redupliquer les listes cas-par-cas déjà dans `docs/ERROR_STATES.md` et `docs/EMPTY_STATES.md` (volume 2).
- `docs/MOTION_GUIDELINES.md` comble un vide identifié depuis la Phase 0.5 (référencé dans un cadrage antérieur, jamais créé) — durées et courbes concrètes justifiées par les conventions établies du motion design d'interface (Material Design, Apple HIG), pas inventées arbitrairement.
- `USER_FLOWS.md` (108 flux atomiques) distingué explicitement de `docs/USER_JOURNEYS.md` (12 parcours macro, volume 1) par le grain de détail — aucun des deux ne redécrit l'autre.
- Décisions UX encore ouvertes ajoutées à celles déjà suivies (voir `docs/UX_BIBLE.md` §5) : comportement du panneau latéral du lecteur en tablette paysage, fréquence exacte des conseils contextuels d'onboarding.
- Aucun code applicatif écrit — voulu, cette phase reste documentaire. Aucune valeur de couleur/typographie concrète introduite malgré la profondeur du volume (`BRAND_BIBLE.md` toujours différé, vérifié explicitement dans l'auto-audit).
- Non poussé sur `origin/main` à ce stade.
- Ouvert : toutes les décisions UX et produit listées ci-dessus et dans les volumes précédents, `BRAND_BIBLE.md` toujours différé, entrée effective en Phase 1 d'ingénierie (MVP) — le projet reste à 100 % documentaire à ce stade, aucune ligne de code applicatif n'existe encore.

### Phase 2 — Brand Bible, volume 1 (2026-08-03)
- 8 nouveaux documents de marque rédigés dans `docs/` (personnalité, positionnement, ton, vocabulaire, direction visuelle, principes, analyse de marques concurrentes, synthèse) — voir `docs/DOCUMENTATION_GUIDE.md` §1 pour la carte complète des 75 documents.
- Consolidation confirmée avec l'utilisateur avant de commencer : `MISSION.md` et `VALUES.md` redemandés par ce cadrage n'ont pas été créés — `docs/MISSION.md` et `docs/PRODUCT_VALUES.md` §4 (Phase 1) restent les sources uniques. `docs/PRODUCT_VALUES.md` §1/§2/§5 étendus pour renvoyer vers `docs/PERSONALITY.md`/`docs/VOICE_AND_TONE.md`/`docs/VOCABULARY.md`, désormais plus détaillés.
- `docs/VISUAL_DIRECTION.md` reste strictement directionnel (style, hiérarchie, lumière, profondeur) — **aucune valeur hexadécimale, police ou logo choisis**, cohérent avec la décision déjà actée de ne jamais fixer une identité visuelle littérale par extrapolation seule ; deux points explicitement laissés « à valider avec l'utilisateur » plutôt que tranchés (degré de chaleur du minimalisme, mode sombre par défaut ou non).
- `docs/COMPETITIVE_BRAND_ANALYSIS.md` marqué du même avertissement d'honnêteté que `docs/COMPETITIVE_ANALYSIS.md` (Phase 1) : connaissance du modèle, pas audit visuel en direct.
- Aucun code applicatif écrit — voulu, cette phase reste documentaire. Aucune décision d'identité visuelle littérale prise.
- Non poussé sur `origin/main` à ce stade.
- Ouvert : les deux points de direction visuelle à valider avec l'utilisateur, `BRAND_BIBLE.md` volume 2 (identité visuelle littérale) si le projet en a besoin avant le travail visuel concret, toutes les décisions produit/UX déjà listées dans les phases précédentes, entrée effective en Phase 1 d'ingénierie (MVP) — le projet reste à 100 % documentaire, aucune ligne de code applicatif n'existe encore. Extraction du graphe de connaissances également interrompue par une limite de session API (2 chunks sur 3 en attente de reprise).

### Phase 2 — Visual Identity System, volume 2 (2026-08-03)
- 11 nouveaux documents visuels rédigés dans `docs/` (tokens, couleur, typographie, icônes, illustration, layout, surfaces, thèmes, logo, son) + 3 extensions (`MOTION_GUIDELINES.md`, `ACCESSIBILITY_GUIDE.md`, `VISUAL_DIRECTION.md`) — voir `docs/DOCUMENTATION_GUIDE.md` §1 pour la carte complète des 86 documents.
- **Résolution partielle du différé d'identité visuelle** : `docs/COLOR_SYSTEM.md`, `docs/TYPOGRAPHY_GUIDE.md`, `docs/LOGO_GUIDE.md` contiennent désormais des propositions concrètes (indigo `#5B4FE0` en accent principal, typographie General Sans recommandée, brief conceptuel de logo) — explicitement marquées « v1, à valider visuellement », pas des décisions finales. Voir la note dédiée ci-dessus, à ne jamais perdre en résumant ce journal.
- Consolidation : `MOTION_BRANDING.md`, `ACCESSIBILITY_VISUAL_GUIDE.md`, `ART_DIRECTION.md` demandés par ce cadrage recoupaient fortement des documents déjà écrits (Phase 1 vol. 3, Phase 2 vol. 1) — étendus en place plutôt que dupliqués.
- Aucun code applicatif écrit — voulu, cette phase reste documentaire.
- Non poussé sur `origin/main` à ce stade.
- Ouvert : validation visuelle humaine des trois propositions v1 (couleur, typographie, logo), les deux points de direction visuelle de la Phase 2 vol. 1 (chaleur du minimalisme, mode sombre par défaut), toutes les décisions produit/UX des phases précédentes, entrée effective en Phase 1 d'ingénierie (MVP), reprise de l'extraction du graphe de connaissances (2 chunks sur 3 toujours en attente).

### Phase 3 — Language System (2026-08-03)
- 9 nouveaux documents rédigés dans `docs/` (mécanique d'écriture, microcopy, dialogues, tooltips, notifications, onboarding, localisation, style/nommage, synthèse capstone) + extension de `docs/VOICE_AND_TONE.md` (§3bis ton par situation, §3ter comparaison de ton) — voir `docs/DOCUMENTATION_GUIDE.md` §1 pour la carte complète des 95 documents.
- Consolidation annoncée à l'utilisateur avant de commencer, confirmée à l'auto-revue : `VOICE_AND_TONE_GUIDE.md` (déjà couvert par `docs/VOICE_AND_TONE.md`), `GLOSSARY.md` (déjà couvert par `docs/VOCABULARY.md`), `ERROR_COPY_GUIDE.md`/`EMPTY_STATE_COPY.md` (déjà couverts par `docs/ERROR_STATES.md`/`docs/ERROR_EXPERIENCE.md` et `docs/EMPTY_STATES.md`/`docs/EMPTY_STATES_GUIDE.md`) n'ont pas été créés séparément. La section « NOMMAGE » du cadrage est repliée dans `docs/STYLE_GUIDE.md` §6, sans fichier dédié.
- `docs/LANGUAGE_SYSTEM.md` (capstone) introduit la cohérence cross-canal (application/site/documentation/e-mails) qui n'avait de foyer dans aucun document existant — le site web et les e-mails transactionnels restent des anticipations de posture, pas des spécifications de contenu (fonctionnalités non spécifiées à ce jour).
- Auto-revue effectuée : tous les `[[wikilinks]]` de `docs/` résolvent (seule occurrence non résolue, `[[Document.md]]` dans `docs/DOCUMENTATION_GUIDE.md`, est un placeholder de template intentionnel, pas une erreur) ; citations de sections vérifiées contre les titres réels (`PRODUCT_RULES.md` §7, `USER_JOURNEYS.md` §11, `VOCABULARY.md` §4, `PERSONALITY.md` §8, `UX_PRINCIPLES.md` §4, `VOICE_AND_TONE.md` §3bis) — aucune erreur trouvée cette fois.
- Aucun code applicatif écrit — voulu, cette phase reste documentaire.
- Non poussé sur `origin/main` à ce stade.
- Ouvert : langues cibles au-delà du français/anglais source non tranchées (`docs/LOCALIZATION_GUIDE.md` §6), toutes les décisions produit/UX/visuelles des phases précédentes, entrée effective en Phase 1 d'ingénierie (MVP), reprise de l'extraction du graphe de connaissances (2 chunks sur 3 toujours en attente).

> **Correction de statut de push** : les mentions « non poussé sur `origin/main` » des entrées Phase 2 volume 1, Phase 2 volume 2 et Phase 3 ci-dessus sont désormais obsolètes — les trois phases ont été poussées ensemble sur demande explicite de l'utilisateur (commit `0ee8635`, 33 fichiers). Conservées telles quelles ci-dessus pour l'exactitude historique de chaque entrée au moment où elle a été écrite.

### Phase 4 — Premium Experience Bible (2026-08-03)
- 10 nouveaux documents rédigés dans `docs/` (bibliothèque de micro-interactions, chorégraphie du lecteur, bibliothèque d'animations nommées, transitions de page, squelettes de chargement, feedback visuel, thème dynamique, immersion, 110 détails premium, synthèse capstone) + extension de `docs/MOTION_GUIDELINES.md` (§12ter rythme/rebond/élasticité/orchestration) et `docs/SOUND_DESIGN_GUIDE.md` (§7 redondance accessibilité/haptique future) — voir `docs/DOCUMENTATION_GUIDE.md` §1 pour la carte complète des 105 documents.
- Consolidation annoncée à l'utilisateur avant de commencer, confirmée à l'auto-revue : `MOTION_SYSTEM.md` (le langage de mouvement demandé — durées, courbes, catégories — existait déjà en profondeur dans `docs/MOTION_GUIDELINES.md` depuis la Phase 1 volume 3, étendu en Phase 2 volume 2) et `SOUND_EXPERIENCE.md` (la même liste d'événements sonores avait déjà reçu une réponse explicite et volontairement minimale dans `docs/SOUND_DESIGN_GUIDE.md` en Phase 2 volume 2) n'ont pas été créés séparément — recréer un second document sur le même sujet aurait soit dupliqué, soit contredit silencieusement une décision déjà actée.
- Cette phase a nécessité une lecture préalable approfondie de 11 documents existants (`MOTION_GUIDELINES.md`, `INTERACTION_GUIDELINES.md`, `SOUND_DESIGN_GUIDE.md`, `THEMES_GUIDE.md`, `PLAYER_SPECIFICATION.md`, `DESIGN_TOKENS.md`, `ACCESSIBILITY_GUIDE.md`, `COLOR_SYSTEM.md`, `SURFACE_SYSTEM.md`, `ERROR_EXPERIENCE.md`, `EMPTY_STATES_GUIDE.md`) avant toute rédaction, pour que chaque nouveau document (`INTERACTION_LIBRARY.md`, `PLAYER_EXPERIENCE.md`, `DYNAMIC_THEME_GUIDE.md`, `VISUAL_FEEDBACK_GUIDE.md` en particulier) reste scopé étroitement en complément plutôt qu'en répétition de ce qui existait déjà.
- `docs/PREMIUM_DETAILS.md` documente 110 détails (objectif du cadrage : au moins 100), chacun avec une justification propre et un renvoi croisé plutôt qu'une redite d'une règle déjà établie.
- Auto-revue effectuée : tous les `[[wikilinks]]` de `docs/` résolvent (même exception connue `[[Document.md]]`, placeholder de template intentionnel) ; citations de sections vérifiées contre les titres réels (`SURFACE_SYSTEM.md` §2/§5/§7, `COLOR_SYSTEM.md` §6/§7, `THEMES_GUIDE.md` §5/§6/§9, `PLAYER_SPECIFICATION.md` §2 à §12, `ERROR_EXPERIENCE.md` §3/§5, `UX_PRINCIPLES.md` §1/§2, `DESIGN_TOKENS.md` §3/§5) — aucune erreur trouvée.
- Aucun code applicatif écrit — voulu, cette phase reste documentaire.
- Non poussé sur `origin/main` à ce stade.
- Ouvert : toutes les décisions produit/UX/visuelles/linguistiques des phases précédentes, entrée effective en Phase 1 d'ingénierie (MVP) — les règles définies ici (durées, courbes, chorégraphies) devront être vérifiées en conditions réelles d'implémentation, pas seulement en revue documentaire ; reprise de l'extraction du graphe de connaissances (2 chunks sur 3 toujours en attente).

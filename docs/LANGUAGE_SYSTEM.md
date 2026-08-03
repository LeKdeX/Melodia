# LANGUAGE_SYSTEM.md — Synthèse du système de langage (Phase 3)

> **Statut** : document fondateur, vivant — capstone de Phase 3
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : UX Writer Senior / Content Design Lead
> **Documents liés** : tous les documents listés en §1

> **Cadrage** : ce document ne réécrit aucune règle déjà posée ailleurs — il relie les documents de langage entre eux, explique les choix de consolidation faits pendant la Phase 3, et pose les règles de cohérence cross-canal (application, site, documentation, e-mails) qui n'avaient pas de foyer naturel dans un document unique de portée plus étroite. C'est le pendant, pour le langage, de ce que [[VISUAL_IDENTITY_SYSTEM.md]] est pour l'identité visuelle et [[BRAND_BIBLE.md]] pour la marque.

---

## 1. Carte du système de langage

| Couche | Document | Répond à |
|---|---|---|
| Philosophie et positionnement de la voix | [[PERSONALITY.md]], [[POSITIONING.md]] | Qui parle ? Pourquoi cette voix ? |
| Ton par situation | [[VOICE_AND_TONE.md]] (§3bis étendu en Phase 3) | Comment le ton varie selon le contexte (accueil, erreur, suppression...) |
| Vocabulaire de marque | [[VOCABULARY.md]] | Quels mots utiliser/éviter, glossaire des termes propres à Melodia |
| Mécanique d'écriture | [[UX_WRITING_GUIDE.md]] | Règles de grammaire, structure, longueur, indépendantes du contexte émotionnel |
| Texte atomique | [[MICROCOPY_LIBRARY.md]] | Boutons, labels, inputs, badges, menus |
| Tooltips | [[TOOLTIP_LIBRARY.md]] | Texte au survol, zone par zone |
| Dialogues de confirmation | [[DIALOG_LIBRARY.md]] | Texte complet des confirmations destructives |
| Notifications | [[NOTIFICATION_LIBRARY.md]] | Texte des toasts, snackbars, notifications système |
| Onboarding | [[ONBOARDING_COPY.md]] | Texte verbatim de la première expérience |
| États d'erreur | [[ERROR_STATES.md]], [[ERROR_EXPERIENCE.md]] | Messages d'erreur et leur présentation UI |
| États vides | [[EMPTY_STATES.md]], [[EMPTY_STATES_GUIDE.md]] | Messages d'état vide et leur présentation UI |
| Ponctuation, typographie, nommage | [[STYLE_GUIDE.md]] | Micro-règles mécaniques et conventions de nommage des objets utilisateur |
| Traduction | [[LOCALIZATION_GUIDE.md]] | Ce qui rend le texte source traduisible |
| Accessibilité du texte | [[ACCESSIBILITY_GUIDE.md]] | Texte alternatif, lecteurs d'écran |

## 2. Consolidations décidées en Phase 3

Trois livrables demandés dans le cadrage initial n'ont pas été créés comme fichiers séparés, pour éviter un doublon avec un document déjà existant et suffisant :

- **VOICE_AND_TONE_GUIDE.md** → contenu intégré dans [[VOICE_AND_TONE.md]] (§3bis « Ton par situation précise », §3ter « Comparaison de ton »), déjà propriétaire du sujet depuis la Phase 2.
- **GLOSSARY.md** → couvert par [[VOCABULARY.md]], qui contenait déjà la liste des termes de marque et leur définition.
- **ERROR_COPY_GUIDE.md** et **EMPTY_STATE_COPY.md** → couverts par [[ERROR_STATES.md]]/[[ERROR_EXPERIENCE.md]] et [[EMPTY_STATES.md]]/[[EMPTY_STATES_GUIDE.md]] respectivement, qui contenaient déjà le texte verbatim avec exemples ✅/❌ depuis les Phases 1 et 2.
- **La section « NOMMAGE »** du cadrage n'a pas eu de fichier dédié — repliée dans [[STYLE_GUIDE.md]] §6, faute de matière suffisante pour justifier un document séparé.

Ce choix suit la règle de non-duplication établie dans `CLAUDE.md` et documentée à chaque phase précédente (voir [[DOCUMENTATION_GUIDE.md]] §5).

## 3. Cohérence cross-canal (communication de marque)

Les documents ci-dessus couvrent le texte **à l'intérieur de l'application**. Trois autres canaux existent ou existeront et doivent rester reconnaissables comme venant de la même voix, avec des adaptations volontaires :

| Canal | Registre | Écart volontaire par rapport à l'application |
|---|---|---|
| Application (in-product) | Registre de référence, défini par [[VOICE_AND_TONE.md]] | — |
| Site web / page de présentation | Même voix, légèrement plus démonstratif (peut nommer des bénéfices que l'application ne dit jamais elle-même, cohérent avec [[POSITIONING.md]]) | Autorisé à être plus affirmatif sur les qualités du produit — l'application, elle, ne se vante jamais d'elle-même en cours d'usage |
| Documentation technique (docs/, README, contribution) | Même règles mécaniques ([[UX_WRITING_GUIDE.md]]), registre plus dense techniquement, jargon acceptable car le public est développeur | Jargon technique autorisé, à l'inverse de [[UX_WRITING_GUIDE.md]] §1 qui l'interdit dans le produit |
| E-mails transactionnels (si introduits — non spécifiés à ce jour) | Même voix que l'application, jamais promotionnel dans un e-mail transactionnel (ex. notification de sécurité) | Aucun — un e-mail transactionnel suit exactement les mêmes règles que l'application |

Un texte qui semble familier mais dont on ne sait pas s'il vient de Melodia est un échec de ce système — le test de cohérence cross-canal est : un extrait de texte, sans logo ni contexte visuel, doit rester attribuable à Melodia par sa seule formulation (cohérent avec [[PERSONALITY.md]] §8, test de personnalité déjà utilisé par [[UX_WRITING_GUIDE.md]] §5).

## 4. Ce que ce système ne couvre pas encore

- Les langues cibles au-delà du français/anglais source ne sont pas tranchées ([[LOCALIZATION_GUIDE.md]] §6, décision produit ouverte).
- Le contenu des e-mails transactionnels n'existe pas encore en tant que fonctionnalité — la ligne du tableau §3 est une anticipation, pas une spécification.
- Le contenu du site web de présentation n'a pas de document dédié à ce stade — seule la posture relative à l'application est fixée ici.

---

## 5. Checklist de validation (auto-revue de la Phase 3 dans son ensemble)

- [ ] Chaque document listé en §1 existe réellement sur disque.
- [ ] Chaque consolidation de §2 est cohérente avec ce qui a été annoncé à l'utilisateur au début de la phase.
- [ ] Tous les `[[wikilinks]]` de l'ensemble des documents de Phase 3 résolvent vers un fichier existant (vérifié séparément, voir Task #112).
- [ ] `DOCUMENTATION_GUIDE.md` §1 et `CLAUDE.md` sont mis à jour avec cette phase.

---

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document, capstone de la Phase 3 | UX Writer Senior / Content Design Lead |

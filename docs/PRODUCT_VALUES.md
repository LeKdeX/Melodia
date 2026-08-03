# PRODUCT_VALUES.md — Identité produit (Phase 1)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Behavioural Designer / Music Experience Designer
> **Documents liés** : [[VISION.md]], [[UX_PRINCIPLES.md]], [[PROJECT_CHARTER.md]] §3.4

> **Cadrage** : ce document couvre la personnalité, le ton et les valeurs *expérientielles* du produit — pas l'identité visuelle (couleurs, logo, typographie), qui reste du ressort d'un futur `BRAND_BIBLE.md` explicitement différé (voir `CLAUDE.md`, décision du 2026-08-03 : une identité visuelle ne doit pas être choisie par extrapolation seule, elle nécessite un retour humain explicite pour ne pas violer la règle « aucune décision arbitraire »). Ce qui suit ne requiert aucun choix de cette nature.

---

## 1. Personnalité

Si Melodia était une personne : quelqu'un de compétent qui n'a pas besoin de le prouver. Calme, précis, jamais bavard. La personne qui range sa collection de vinyles avec soin non pas pour impressionner mais parce que c'est ainsi qu'on prend soin de ce qu'on aime. Pas austère — capable de plaisir et de chaleur — mais jamais démonstratif.

> **Approfondi en Phase 2** : [[PERSONALITY.md]] fait désormais autorité pour l'archétype de marque complet, les adjectifs à utiliser/éviter et le test de cohérence — ce paragraphe reste le résumé d'intention originel, non contredit.

## 2. Ton

- **Direct, jamais familier de façon artificielle.** Pas de « Salut ! 👋 » ni de ton corporate-enjoué. Le produit parle quand il a quelque chose à dire, pas pour combler le silence.
- **Confiant sans arrogance.** « Recherche instantanée » plutôt que « Recherche ultra-rapide propulsée par notre technologie exclusive » — l'affirmation sans la démonstration de force.
- **Honnête sur ses limites.** Si une fonctionnalité est en dégradé (ex. absence de connexion, [[ARCHITECTURE_PRINCIPLES.md]] §5), le produit le dit clairement plutôt que de le masquer — cohérent avec la règle d'honnêteté déjà actée pour l'équipe (`CLAUDE.md`).

> **Approfondi en Phase 2** : [[VOICE_AND_TONE.md]] fait désormais autorité pour les règles de ton par contexte (erreurs, succès, notifications, onboarding...) avec exemples concrets.

## 3. Émotions recherchées

| Émotion | Quand | Comment on la provoque |
|---|---|---|
| Sérénité | À l'ouverture de l'app | Reprise immédiate de l'état précédent, aucun écran de chargement perçu ([[SUCCESS_METRICS.md]]) |
| Confiance | En cherchant un morceau ancien/rare | Résultat instantané et exact, jamais un « aucun résultat » qui remet en question la fiabilité de la bibliothèque |
| Fierté discrète | En comparant mentalement à une plateforme commerciale | Une expérience qui n'a rien à envier, sur une bibliothèque qu'on possède réellement |
| Continuité | En naviguant pendant l'écoute | Le lecteur ne disparaît jamais, la musique ne s'interrompt jamais pour une raison d'interface ([[PRODUCT_RULES.md]]) |
| Plaisir discret | Lors d'une découverte au sein de sa propre bibliothèque (morceau oublié retrouvé) | Sans gamification ni notification insistante — le plaisir vient de la redécouverte elle-même |

## 4. Valeurs

1. **La propriété prime.** L'utilisateur possède sa musique ; le produit ne doit jamais se comporter comme s'il en était le gardien.
2. **La confiance se gagne par la constance.** Une fonctionnalité qui fonctionne toujours pareil vaut mieux qu'une fonctionnalité impressionnante mais imprévisible.
3. **Le silence est une fonctionnalité.** Absence de notification superflue, de pop-up d'engagement, de gamification artificielle — le produit ne lutte jamais pour l'attention de l'utilisateur au-delà de sa musique.
4. **La rareté n'est pas un défaut.** Une bibliothèque personnelle n'a pas le volume infini d'un catalogue de streaming — le produit valorise ce qu'elle contient plutôt que de faire ressentir un manque.
5. **La performance est un signe de respect.** Faire attendre l'utilisateur pour une action qui devrait être instantanée ([[PERFORMANCE_BUDGET.md]]) communique implicitement que son temps compte moins que la fonctionnalité elle-même — inacceptable.

## 5. Vocabulaire

| Toujours | Jamais |
|---|---|
| Bibliothèque, collection | Catalogue (évoque un service commercial) |
| Lecture, écoute | Streaming (implique une dépendance réseau constante, faux pour Melodia) |
| Retrouver, redécouvrir | Recommander (Melodia aide à retrouver sa musique, il ne prescrit pas ce qu'il faut aimer) |
| Serveur (au sens Jellyfin de l'utilisateur) | Notre plateforme / nos serveurs (Melodia n'opère aucune infrastructure centrale, [[PROJECT_CHARTER.md]] §4) |
| Votre musique | Le contenu (dépersonnalise ce qui est justement personnel) |

> **Approfondi en Phase 2** : [[VOCABULARY.md]] fait désormais autorité pour le glossaire complet (contenu musical, découverte, infrastructure, confidentialité) et les formulations interdites.

## 6. Expérience et sensations recherchées

- **Tactile et immédiat** : chaque interaction répond dans l'instant, sans latence perçue même si un traitement se poursuit en arrière-plan (cohérent avec l'UI optimiste, [[FRONTEND_ARCHITECTURE.md]] §8).
- **Dense mais jamais chargé** : beaucoup d'information disponible (métadonnées riches, pochettes, historique) sans jamais submerger l'écran — la densité est disponible à la demande, pas imposée par défaut.
- **Cohérent au point d'être invisible** : un utilisateur qui change de vue ne devrait jamais avoir à réapprendre où se trouvent les choses ([[UX_PRINCIPLES.md]]).

---

## 7. Checklist de validation

- [ ] Aucune décision de ce document ne nécessite un choix visuel (couleur/logo/typographie) — vérifié explicitement, cohérent avec le cadrage.
- [ ] Le ton et le vocabulaire sont applicables concrètement aux textes d'interface à venir (messages d'erreur, états vides, libellés).
- [ ] Les valeurs (§4) sont traçables jusqu'à des règles concrètes dans [[PRODUCT_RULES.md]] et [[UX_PRINCIPLES.md]].

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1) | Behavioural Designer / Music Experience Designer |
| 0.2.0 | 2026-08-03 | Phase 2 volume 1 : §1/§2/§5 renvoient vers PERSONALITY.md/VOICE_AND_TONE.md/VOCABULARY.md, désormais plus détaillés, sans contradiction ni duplication | Behavioural Designer |

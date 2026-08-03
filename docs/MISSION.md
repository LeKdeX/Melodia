# MISSION.md — Déclaration de mission (Phase 1)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Chief Product Officer
> **Documents liés** : [[VISION.md]], [[PROJECT_CHARTER.md]] §1, [[PRODUCT_VALUES.md]]

---

## Déclaration de mission

> **Offrir à toute personne possédant une bibliothèque musicale auto-hébergée une expérience d'écoute quotidienne que rien ne lui donne envie de quitter — sans jamais lui demander de choisir entre la qualité de l'expérience et la propriété de sa musique.**

---

## 1. Ce que nous voulons accomplir

Faire de Jellyfin-en-tant-que-source-de-données une base aussi confortable à vivre au quotidien qu'un service commercial premium, sans qu'aucune des qualités qui ont motivé le choix de l'auto-hébergement (propriété, confidentialité, pérennité) ne soit sacrifiée pour y parvenir.

## 2. Pourquoi

Parce que l'écart d'expérience entre l'auto-hébergement et les plateformes commerciales est aujourd'hui la principale raison pour laquelle des utilisateurs qui *pourraient* être pleinement autonomes continuent de dépendre d'un service tiers pour leur usage quotidien ([[VISION.md]] §2). Cet écart n'est pas une fatalité technique — c'est un problème de produit non résolu, que Melodia se donne pour objectif de résoudre.

## 3. Pour qui

- La personne qui possède déjà une bibliothèque musicale conséquente (rippée, achetée, collectionnée) et un serveur Jellyfin, mais qui ouvre encore Spotify par réflexe au quotidien.
- La personne qui a quitté ou veut quitter les plateformes de streaming par conviction (propriété des données, lassitude de l'abonnement, disparition de catalogue) mais ne veut renoncer à aucun confort d'usage pour cela.
- L'audiophile qui veut une qualité de restitution et de métadonnées fidèle à sa collection, sans les compromis de compression ou de catalogue des services commerciaux.
- Voir [[PERSONAS.md]] pour le détail complet par profil.

## 4. Comment

- En traitant Jellyfin exclusivement comme fournisseur de données, jamais comme le produit ([[ARCHITECTURE_PRINCIPLES.md]] §2) — pour que l'expérience ne soit jamais bridée par les choix d'interface d'un logiciel multi-médias généraliste.
- En construisant une identité produit propre, une philosophie UX propre ([[UX_PRINCIPLES.md]]) et des règles produit non négociables ([[PRODUCT_RULES.md]]) — jamais un habillage visuel superficiel d'un client existant ([[PROJECT_CHARTER.md]] §4).
- En mesurant le succès du produit à l'aune de l'usage quotidien réel (l'utilisateur revient-il ?), pas seulement de la complétude fonctionnelle — voir [[SUCCESS_METRICS.md]].
- En restant un logiciel client, jamais un service — aucune dépendance structurelle nouvelle introduite entre l'utilisateur et un tiers ([[PROJECT_CHARTER.md]] §4, [[EVOLVABILITY.md]] §12).

---

## 5. Ce que cette mission n'est pas

- Ce n'est pas une mission de croissance d'utilisateurs à tout prix — un utilisateur satisfait qui reste des années vaut plus qu'un volume d'adoption superficiel (cohérent avec [[PROJECT_CHARTER.md]] §3.10, objectifs communauté qualitatifs).
- Ce n'est pas une mission de parité fonctionnelle avec Spotify — certaines fonctionnalités commerciales (recommandations basées sur un catalogue global, contenu éditorialisé) sont hors de portée par nature d'un client auto-hébergé, et ce n'est pas un échec de ne pas les avoir ([[PROJECT_CHARTER.md]] §4).

---

## 6. Checklist de validation

- [ ] La déclaration de mission tient en une phrase mémorisable, sans jargon technique.
- [ ] Chaque section (pourquoi/pour qui/comment) renvoie à un document qui l'approfondit, sans le dupliquer.
- [ ] La mission reste cohérente avec [[PROJECT_CHARTER.md]] §1 et §4.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1) | Chief Product Officer |

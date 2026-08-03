# PRODUCT_BIBLE.md — Bible produit (synthèse Phase 1, volume 1)

> **Statut** : document fondateur, vivant — document de synthèse, ne fait pas autorité seul
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Chief Product Officer
> **Documents liés** : tous les documents produit listés ci-dessous, [[TECHNICAL_BLUEPRINT.md]] pour le pendant technique

Point d'entrée unique pour comprendre le produit Melodia en une lecture. **Ne fait pas autorité par lui-même** : en cas d'écart avec un document source, le document source gagne toujours (même principe que [[TECHNICAL_BLUEPRINT.md]], voir [[DOCUMENTATION_GUIDE.md]] §4).

---

## 1. Melodia en une phrase

Le meilleur lecteur de musique auto-hébergé de 2026 : une expérience d'écoute quotidienne de niveau Spotify/Plexamp, construite sur la bibliothèque que l'utilisateur possède déjà via Jellyfin, sans jamais lui demander de choisir entre qualité d'expérience et propriété de ses données. Détail complet : [[VISION.md]], [[MISSION.md]].

## 2. Les cinq vérités produit qui conditionnent tout le reste

1. **Jellyfin est un fournisseur de données, jamais le produit** — l'utilisateur ne doit jamais avoir l'impression d'utiliser un client Jellyfin ([[VISION.md]] §6, [[PROJECT_CHARTER.md]] §1).
2. **Aucun concurrent n'occupe l'espace visé** : qualité d'expérience commerciale (Spotify, Plexamp) sans dépendance à un écosystème propriétaire ou cloud ([[COMPETITIVE_ANALYSIS.md]] §14).
3. **La musique ne s'interrompt jamais pour une raison d'interface** — la règle produit la plus stricte du projet ([[PRODUCT_RULES.md]] §2).
4. **Le silence est une fonctionnalité** — pas de notification d'engagement, pas de gamification, pas de pression de découverte permanente ([[PRODUCT_VALUES.md]] §4).
5. **La performance est un signe de respect envers l'utilisateur** — chaque seuil chiffré ([[SUCCESS_METRICS.md]], [[PERFORMANCE_BUDGET.md]]) est non négociable, pas un objectif à atteindre "si possible".

## 3. Carte de lecture par rôle

| Si vous êtes... | Commencez par |
|---|---|
| Nouveau contributeur produit | [[VISION.md]], [[MISSION.md]], puis [[PERSONAS.md]] |
| Designer UX/UI | [[UX_PRINCIPLES.md]], [[USER_JOURNEYS.md]], [[PRODUCT_VALUES.md]] |
| Product Manager | [[PRODUCT_RULES.md]], [[SUCCESS_METRICS.md]], [[ROADMAP.md]] (vue produit) |
| Ingénieur qui implémente une fonctionnalité produit | [[PRODUCT_RULES.md]] d'abord (non négociable), puis [[UX_PRINCIPLES.md]] et le document technique correspondant ([[FRONTEND_ARCHITECTURE.md]], [[AUDIO_ENGINE.md]], etc.) |
| Toute personne qui doute d'une décision produit | [[COMPETITIVE_ANALYSIS.md]] — la justification empirique de la plupart des choix s'y trouve |

## 4. Les personas en un coup d'œil

Huit angles d'usage (non exclusifs) : occasionnel, audiophile, collectionneur, utilisateur Jellyfin déjà investi, passionné de découverte, mobile, desktop, clavier/accessibilité. Détail complet et matrice de recoupement par zone produit : [[PERSONAS.md]] §9.

## 5. Les douze parcours couverts

Premier lancement, connexion, import, première lecture, recherche, création de playlist, lecture aléatoire, découverte, gestion de bibliothèque, synchronisation multi-appareils, déconnexion, retour après plusieurs jours — chacun avec ses frictions identifiées honnêtement, pas maquillées. Cinq frictions restent ouvertes à ce stade, voir [[USER_JOURNEYS.md]] §13.

## 6. Ce que le marché nous apprend (résumé, détail en [[COMPETITIVE_ANALYSIS.md]])

| On prend | On évite |
|---|---|
| La recherche quasi instantanée de Spotify | La pression de découverte permanente de Spotify |
| Le lecteur permanent et soigné de Plexamp | La dépendance à l'écosystème Plex |
| La richesse de métadonnées de Roon | La densité d'interface technique de Roon |
| La légèreté et la performance de foobar2000 | L'absence d'opinion de design de foobar2000 |
| La validation de marché de Finamp/Symfonium (client Jellyfin dédié musique) | Rester perçu comme « un client Jellyfin » |

**Constat central** : aucun concurrent analysé ne combine expérience premium, absence de dépendance propriétaire et identité de marque forte. C'est l'espace que Melodia occupe seul.

## 7. Décisions produit encore ouvertes

Consolidées depuis [[USER_JOURNEYS.md]] §13 et [[ROADMAP.md]] (vue produit) — signalées ici pour qu'aucune ne se perde entre les documents :
- Pondération de la lecture aléatoire.
- Comportement du cache local à la déconnexion.
- Statut engagé ou non de la fonctionnalité de découverte interne pour la Phase 1.
- Détection automatique de serveur Jellyfin sur réseau local (amélioration non engagée).
- Stratégie de résolution de conflit de synchronisation multi-appareils (ADR technique toujours en attente, voir [[EXTREME_SCENARIOS.md]] §5).

## 8. Ce que cette Product Bible ne contient pas encore

- Aucune identité visuelle (couleurs, logo, typographie) — reste dans un futur `BRAND_BIBLE.md` explicitement différé, voir `CLAUDE.md`.
- Aucune spécification d'écran ou de wireframe — cette Bible définit le *quoi* et le *pourquoi*, pas le *à quoi ça ressemble* (Phase 1 volume 2 ou ultérieure, selon le cadrage à venir).
- Aucun engagement de calendrier au-delà de ce qui est déjà dans [[ROADMAP.md]].

---

## 9. Documents produit de la Phase 1

| Document | Rôle | Propriétaire |
|---|---|---|
| [[VISION.md]] | Pourquoi le produit existe, positionnement face au marché | CPO / Product Strategist |
| [[MISSION.md]] | Déclaration de mission (quoi/pourquoi/pour qui/comment) | CPO |
| [[PRODUCT_VALUES.md]] | Personnalité, ton, valeurs, vocabulaire | Behavioural Designer / Music Experience Designer |
| [[COMPETITIVE_ANALYSIS.md]] | Analyse de 12 concurrents + Navidrome | Product Strategist / UX Researcher |
| [[PERSONAS.md]] | 8 personas détaillés + matrice de recoupement | UX Researcher / Product Manager Senior |
| [[USER_JOURNEYS.md]] | 12 parcours complets, frictions incluses | UX Designer / UX Researcher |
| [[UX_PRINCIPLES.md]] | Charte UX (le pourquoi de chaque interaction) | UX Designer / Music Experience Designer |
| [[PRODUCT_RULES.md]] | Règles produit non négociables et vérifiables | Product Manager Senior / CPO |
| [[SUCCESS_METRICS.md]] | Objectifs produit mesurables | Product Manager Senior / Staff Performance Engineer |
| `ROADMAP.md` (vue produit) | Ce que l'utilisateur peut faire à chaque phase | Product Manager Senior |

---

## 10. Checklist de validation

- [ ] Les cinq vérités produit (§2) restent exactes après toute modification d'un document source.
- [ ] Chaque affirmation concurrentielle (§6) reste traçable jusqu'à [[COMPETITIVE_ANALYSIS.md]].
- [ ] Les décisions ouvertes (§7) sont retirées dès qu'elles sont tranchées, jamais laissées obsolètes.
- [ ] Ce document ne contient aucune information absente de son document source.

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 1) | Chief Product Officer |

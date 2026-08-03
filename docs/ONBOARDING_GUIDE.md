# ONBOARDING_GUIDE.md — Expérience de première utilisation (Phase 1, volume 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Senior UX Designer / Behavioural Designer
> **Documents liés** : [[USER_JOURNEYS.md]] §1-3, [[VISION.md]] §9, [[MOTION_GUIDELINES.md]]

> **Cadrage** : les parcours « premier lancement », « connexion » et « import » sont déjà définis à haut niveau dans [[USER_JOURNEYS.md]] §1-3, frictions incluses. Ce document ajoute la couche UX détaillée (séquencement des écrans, tutoriels, progression) sans redéfinir ces parcours.

---

## 1. Philosophie de l'onboarding

L'onboarding de Melodia n'est pas un tutoriel à traverser — c'est le premier contact avec la promesse de [[VISION.md]] §9 (« ma musique est déjà là, prête »). Chaque étape doit rapprocher l'utilisateur de sa musique, jamais l'en éloigner par une explication superflue. Aucune étape n'est optionnelle-mais-imposée (pas de tutoriel forcé sans possibilité de passer).

## 2. Séquence complète

| Étape | Contenu | Peut être ignorée ? |
|---|---|---|
| 1. Accueil | Présentation minimale (identité du produit), invite à se connecter | Non — point d'entrée obligatoire |
| 2. Connexion Jellyfin | Adresse du serveur, authentification ([[JELLYFIN_INTEGRATION.md]] §2) | Non — nécessaire au fonctionnement |
| 3. Confirmation de connexion | Validation visuelle claire que le bon serveur est connecté | Non, mais instantanée |
| 4. Synchronisation initiale | Progression visible, bibliothèque navigable dès les premiers éléments disponibles ([[USER_JOURNEYS.md]] §3) | Non applicable — se déroule en arrière-plan, jamais bloquant au-delà de l'affichage de progression |
| 5. Personnalisation rapide (thème, densité d'affichage) | 1-2 choix simples, valeurs par défaut déjà pertinentes si ignoré | Oui — entièrement ignorable, réglages accessibles plus tard sans perte |
| 6. Conseils contextuels (pas un tutoriel séparé) | Voir §4 | Oui, individuellement |
| 7. Première bibliothèque | L'utilisateur arrive directement dans sa musique | — |

**Règle stricte** : aucune étape ne peut retarder l'arrivée dans la bibliothèque au-delà de ce qui est strictement nécessaire (connexion + début de synchronisation) — la personnalisation et les conseils ne bloquent jamais l'accès au contenu.

## 3. Découverte du serveur

Si techniquement réalisable (statut non engagé, voir [[USER_JOURNEYS.md]] §1 et [[FEATURE_ROADMAP.md]]) : détection automatique d'un serveur Jellyfin sur le réseau local proposée comme raccourci, jamais comme seule voie — la saisie manuelle de l'adresse reste toujours disponible et visible.

## 4. Conseils contextuels plutôt que tutoriel classique

Au lieu d'une séquence de tutoriel qui explique l'interface avant de la montrer, Melodia utilise des conseils contextuels ponctuels (ex. la première fois que l'utilisateur ouvre le lecteur étendu, une indication discrète et unique signale les paroles ou l'égaliseur) — chaque conseil apparaît une seule fois, jamais répété, jamais bloquant, toujours ignorable en un geste. Cohérent avec [[UX_PRINCIPLES.md]] §3 (aucune interface inutile).

## 5. Indicateur de progression

Pendant la synchronisation initiale, la progression est communiquée honnêtement (proportion réelle si calculable, indication qualitative sinon) — jamais une barre de progression qui ment ou stagne sans explication (cohérent avec la règle d'honnêteté du produit).

## 6. Personnalisation initiale

Limitée à des choix à faible enjeu et réversibles à tout moment (thème, densité) — aucune décision structurante (ex. activation de l'historique d'écoute) n'est présentée comme un choix d'onboarding précipité ; ces décisions restent accessibles et modifiables depuis les paramètres, présentées avec leur plein contexte au moment où l'utilisateur les rencontre naturellement (ex. avant le premier Wrapped) plutôt qu'en amont sans contexte.

## 7. États d'échec pendant l'onboarding

- Échec de connexion au serveur : voir [[ERROR_STATES.md]] §1 et §6 — le contexte déjà saisi (adresse du serveur) n'est jamais perdu, l'utilisateur corrige sans tout ressaisir.
- Synchronisation interrompue : reprise propre au prochain lancement ([[DATA_LAYER.md]] §2.1), jamais un onboarding à recommencer depuis le début.

## 8. Émotions ciblées par étape

| Étape | Émotion visée |
|---|---|
| Accueil | Curiosité sereine |
| Connexion | Confiance |
| Synchronisation | Patience informée, jamais anxiété |
| Personnalisation | Appropriation légère |
| Arrivée dans la bibliothèque | Évidence — « c'est exactement ce que j'espérais » |

---

## 9. Checklist de validation

- [ ] Aucune étape non nécessaire ne retarde l'arrivée dans la bibliothèque.
- [ ] Chaque conseil contextuel apparaît une seule fois et reste ignorable.
- [ ] Aucune décision structurante (historique, confidentialité) n'est précipitée sans contexte pendant l'onboarding.
- [ ] Les états d'échec préservent toujours la saisie déjà faite par l'utilisateur.

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 3) | Senior UX Designer / Behavioural Designer |

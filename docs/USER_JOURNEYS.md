# USER_JOURNEYS.md — Parcours utilisateurs (Phase 1)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : UX Designer / UX Researcher
> **Documents liés** : [[PERSONAS.md]], [[UX_PRINCIPLES.md]], [[SUCCESS_METRICS.md]]

Format par parcours : objectifs, étapes, émotions visées, points de friction identifiés, opportunités d'amélioration. Un parcours sans point de friction identifié est suspect — cohérent avec la règle d'honnêteté (`CLAUDE.md`), on ne prétend jamais qu'un parcours est parfait par défaut.

---

## 1. Premier lancement

- **Objectif** : comprendre en quelques secondes ce qu'est l'application et ce qu'elle attend de l'utilisateur.
- **Étapes** : ouverture → écran d'accueil minimal → invite de connexion à un serveur Jellyfin.
- **Émotions visées** : curiosité sereine, jamais de confusion sur la prochaine action.
- **Frictions identifiées** : un utilisateur qui n'a pas encore d'URL de serveur Jellyfin sous la main peut abandonner ici — hors du contrôle direct du produit, mais le message d'invite doit rester clair sur ce qui est attendu.
- **Opportunités** : détection automatique d'un serveur Jellyfin sur le réseau local si techniquement réalisable (à évaluer, non engagé — voir la vue produit de [[ROADMAP.md]] pour le statut réel).

## 2. Connexion

- **Objectif** : associer l'application à un serveur Jellyfin existant en confiance.
- **Étapes** : saisie de l'adresse du serveur → authentification (identifiants ou Quick Connect, [[JELLYFIN_INTEGRATION.md]] §2) → confirmation visuelle de connexion réussie.
- **Émotions visées** : confiance immédiate — « c'est bien mon serveur, mes données ».
- **Frictions identifiées** : erreur de format d'URL (http vs https, port), message d'erreur générique si le serveur est injoignable.
- **Opportunités** : validation en temps réel du format d'adresse avant tentative de connexion ; messages d'erreur typés et actionnables ([[JELLYFIN_INTEGRATION.md]] §4) plutôt qu'un échec générique.

## 3. Import (synchronisation initiale)

- **Objectif** : que la bibliothèque soit disponible sans que l'utilisateur ait le sentiment d'attendre.
- **Étapes** : déclenchement automatique après connexion → indicateur de progression → bibliothèque utilisable dès les premières données disponibles (pas seulement à synchronisation complète).
- **Émotions visées** : patience acceptée parce que l'attente est comprise et visible, jamais d'anxiété sur « est-ce que ça marche vraiment ».
- **Frictions identifiées** : sur une bibliothèque de 200 000+ titres, la synchronisation initiale peut prendre un temps non négligeable ([[EXTREME_SCENARIOS.md]] §1, zone non chronométrée au-delà de 200k) — un utilisateur pressé pourrait interpréter la lenteur comme un dysfonctionnement.
- **Opportunités** : rendre la bibliothèque partiellement navigable dès les premiers éléments synchronisés plutôt que de bloquer sur la complétion à 100 % — décision à documenter par ADR si retenue.

## 4. Première lecture

- **Objectif** : lancer un premier morceau sans réfléchir à comment faire.
- **Étapes** : sélection d'un artiste/album/titre → un clic → son immédiat.
- **Émotions visées** : évidence — l'action la plus fréquente du produit doit être la plus simple.
- **Frictions identifiées** : aucune attendue si le budget Time-to-First-Play est respecté ([[PERFORMANCE_BUDGET.md]] §1) — à vérifier empiriquement dès l'implémentation, pas supposé acquis.
- **Opportunités** : aucune identifiée au-delà du respect strict des budgets déjà engagés.

## 5. Recherche

- **Objectif** : retrouver un morceau/artiste/album précis en un minimum de frappe.
- **Étapes** : ouverture de la recherche (raccourci clavier accessible partout) → frappe → résultats en temps réel → sélection.
- **Émotions visées** : confiance absolue dans l'exhaustivité du résultat — jamais de doute que le morceau existe mais n'a pas été trouvé.
- **Frictions identifiées** : orthographe approximative d'un titre/artiste (tolérance floue nécessaire, déjà couverte par [[DATA_LAYER.md]] §3.2) ; recherche pendant la phase d'indexation initiale (repli serveur, [[DATA_LAYER.md]] §3.3) perçue comme moins réactive.
- **Opportunités** : suggestions de recherche récente/fréquente pour réduire la frappe sur les recherches répétées.

## 6. Création d'une playlist

- **Objectif** : constituer une collection personnalisée en un minimum d'actions.
- **Étapes** : création (nom) → ajout de titres depuis n'importe quelle vue (recherche, album, file en cours) → réorganisation si besoin.
- **Émotions visées** : contrôle simple, jamais de sentiment de procédure lourde.
- **Frictions identifiées** : ajout à une playlist qui nécessite de naviguer loin du contexte actuel (ex. quitter la vue album pour aller sur la playlist) casse le flux.
- **Opportunités** : ajout à une playlist accessible en une action depuis n'importe quel contexte (menu contextuel systématique) — objectif chiffré dans [[SUCCESS_METRICS.md]].

## 7. Lecture aléatoire

- **Objectif** : se laisser porter par sa propre bibliothèque sans choix actif.
- **Étapes** : activation du mode aléatoire sur une bibliothèque/playlist/artiste → lecture continue.
- **Émotions visées** : légèreté, redécouverte agréable.
- **Frictions identifiées** : un aléatoire naïf peut sur-représenter les artistes avec le plus de titres — perçu comme « pas vraiment aléatoire ».
- **Opportunités** : pondération de l'aléatoire pour une distribution perçue comme équitable entre artistes/albums — à documenter comme décision produit avant implémentation (impact sur [[AUDIO_ENGINE.md]] §1, modèle de file).

## 8. Découverte (au sein de sa propre bibliothèque)

- **Objectif** : redonner de la visibilité à des morceaux peu écoutés de sa propre collection.
- **Étapes** : entrée dédiée (ex. « Oubliés », « Ça fait longtemps ») → lecture directe depuis cette sélection.
- **Émotions visées** : plaisir de la redécouverte, jamais de mécanique de gamification insistante (cohérent avec [[PRODUCT_VALUES.md]] §4, « le silence est une fonctionnalité »).
- **Frictions identifiées** : nécessite un historique d'écoute fiable pour être pertinent — dépendance non encore actée comme fonctionnalité engagée (à confirmer en conception détaillée, pas supposée acquise ici).
- **Opportunités** : fonctionnalité directement inspirée de la radio générée de Plexamp ([[COMPETITIVE_ANALYSIS.md]] §2), ancrée exclusivement dans la bibliothèque locale.

## 9. Gestion de bibliothèque

- **Objectif** : que la bibliothèque locale reste le miroir fidèle du serveur sans intervention manuelle.
- **Étapes** : synchronisation incrémentale automatique ([[JELLYFIN_INTEGRATION.md]] §3) → resynchronisation manuelle à la demande si nécessaire.
- **Émotions visées** : confiance passive — l'utilisateur ne devrait presque jamais avoir à y penser.
- **Frictions identifiées** : un ajout côté serveur qui met du temps à apparaître côté client peut être perçu comme un bug plutôt qu'un délai de synchronisation normal.
- **Opportunités** : indicateur discret de dernière synchronisation, action de resynchronisation manuelle toujours accessible sans être intrusive.

## 10. Synchronisation multi-appareils

- **Objectif** : reprendre l'écoute sur un autre appareil sans perte de contexte.
- **Étapes** : changement d'appareil → état de lecture (position, file) retrouvé automatiquement.
- **Émotions visées** : continuité, comme si c'était le même appareil.
- **Frictions identifiées** : stratégie de résolution de conflit encore non formalisée par ADR ([[ARCHITECTURE_PRINCIPLES.md]] §3.3, [[EXTREME_SCENARIOS.md]] §3) — un conflit réel (lecture simultanée sur deux appareils) n'a pas de comportement UX défini à ce stade.
- **Opportunités** : ce parcours ne peut pas être considéré comme complet tant que l'ADR de synchronisation n'est pas rédigé — signalé explicitement plutôt que masqué, cohérent avec [[EXTREME_SCENARIOS.md]] §5.

## 11. Déconnexion

- **Objectif** : quitter un serveur proprement, sans crainte de perte de données locales.
- **Étapes** : action de déconnexion explicite → confirmation → jeton révoqué ([[SECURITY_GUIDELINES.md]] §5), cache de métadonnées conservé par défaut.
- **Émotions visées** : contrôle net, aucune ambiguïté sur ce qui est conservé ou supprimé.
- **Frictions identifiées** : un utilisateur pourrait s'attendre à ce que « déconnexion » supprime aussi les données locales — à clarifier explicitement dans l'interface au moment de l'action.
- **Opportunités** : proposer explicitement le choix (conserver le cache / tout supprimer) plutôt que d'imposer un comportement par défaut silencieux.

## 12. Retour après plusieurs jours

- **Objectif** : reprendre l'écoute exactement là où elle s'était arrêtée, sans reconstruire de contexte mental.
- **Étapes** : ouverture de l'application → état antérieur restauré (dernière piste/position, file d'attente) → synchronisation incrémentale silencieuse en arrière-plan.
- **Émotions visées** : c'est l'instant clé de [[VISION.md]] §9 — « ma musique est déjà là, prête ».
- **Frictions identifiées** : si plusieurs jours se sont écoulés, une synchronisation potentiellement plus longue que d'habitude pourrait retarder la reprise de lecture immédiate si mal orchestrée.
- **Opportunités** : la lecture de la dernière piste doit pouvoir démarrer **avant** que la synchronisation incrémentale ne se termine — priorité claire à documenter dans l'implémentation du démarrage ([[PERFORMANCE_BUDGET.md]] §1, Time-to-First-Play).

---

## 13. Synthèse des frictions non résolues (transparence)

| Parcours | Friction | Statut |
|---|---|---|
| Import initial | Temps de synchronisation non chronométré au-delà de 200k titres | Ouvert — voir [[EXTREME_SCENARIOS.md]] §1 |
| Lecture aléatoire | Pondération de l'aléatoire non décidée | Ouvert — décision produit à documenter avant implémentation |
| Découverte | Dépendance à un historique d'écoute non encore actée comme fonctionnalité engagée | Ouvert — à confirmer en conception détaillée |
| Synchronisation multi-appareils | ADR de résolution de conflit non rédigé | Ouvert — déjà suivi dans [[EXTREME_SCENARIOS.md]] §5 |
| Déconnexion | Comportement par défaut du cache local non tranché | Ouvert — décision produit simple à trancher tôt en Phase 1 |

---

## 14. Checklist de validation

- [ ] Chaque parcours a au moins une friction identifiée honnêtement, pas seulement des étapes idéalisées.
- [ ] Les frictions non résolues sont consolidées en §13, pas dispersées et oubliées.
- [ ] Chaque parcours renvoie aux personas concernés ([[PERSONAS.md]] §9) de façon cohérente.

---

## 15. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1) | UX Designer / UX Researcher |

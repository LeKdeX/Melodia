# PROJECT_CHARTER.md — Charte du projet Melodia

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : CTO / Lead Software Architect
> **Documents liés** : [[ENGINEERING_GUIDE.md]], [[ARCHITECTURE_PRINCIPLES.md]], [[ROADMAP.md]], [[DOCUMENTATION_GUIDE.md]]

Ce document est la référence suprême du projet. En cas de conflit entre ce document et n'importe quel autre document du projet, **PROJECT_CHARTER.md prévaut**, sauf décision explicite documentée par un ADR (voir [[ADR_TEMPLATE.md]]) qui amende ce document lui-même.

---

## 1. Vision

Nous ne développons pas un lecteur musical de plus. Nous construisons **Melodia**, le meilleur client musical auto-hébergé disponible — un produit dont l'expérience se compare aux meilleurs services commerciaux (Apple Music, Spotify, Tidal), tout en restant fidèle aux valeurs du self-hosting : propriété des données, absence de tracking, pérennité indépendante d'une entreprise tierce.

**Jellyfin n'est pas le produit. Jellyfin est une source de données parmi d'autres possibles à terme.** Melodia est la couche produit : l'interface, l'expérience, l'intelligence, le design. Un utilisateur de Melodia ne doit jamais avoir le sentiment d'utiliser « un client Jellyfin » — il doit avoir le sentiment d'utiliser une application musicale premium qui, techniquement, sait parler à son serveur Jellyfin.

Cette distinction n'est pas cosmétique : elle conditionne toutes les décisions d'architecture (voir [[ARCHITECTURE_PRINCIPLES.md]] §2, *Abstraction de la source de données*) et interdit toute fuite de vocabulaire, de modèle de données ou de limitation Jellyfin dans l'expérience utilisateur.

### Mission

Offrir à quiconque possède une bibliothèque musicale auto-hébergée une expérience d'écoute quotidienne meilleure que celle des plateformes propriétaires, sans compromis sur la vie privée, la performance ou le design.

### Ce qui nous distingue

| Axe | Plateformes commerciales | Clients Jellyfin existants | Melodia |
|---|---|---|---|
| Propriété des données | Non (verrouillage plateforme) | Oui | Oui |
| Qualité d'expérience | Excellente | Généralement fonctionnelle, rarement premium | Excellente — objectif explicite |
| Modèle économique | Abonnement / publicité | Gratuit | Gratuit, open source |
| Dépendance à un backend unique | N/A | Forte (couplage Jellyfin) | Faible (Jellyfin = premier connecteur, pas une dépendance structurelle — voir §4) |

---

## 2. Philosophie produit

1. **L'expérience prime sur la fonctionnalité.** Une fonctionnalité mal intégrée dégrade le produit davantage qu'elle ne l'enrichit.
2. **La simplicité perçue est un travail délibéré.** Elle est le résultat d'un design exigeant, pas d'un manque d'ambition.
3. **La performance est une fonctionnalité.** Un utilisateur ne « voit » pas une architecture propre, mais il ressent immédiatement une latence.
4. **Le produit doit vieillir bien.** Chaque décision est prise en anticipant sa maintenance dans 3 ans, pas seulement sa livraison dans 3 semaines.
5. **Jellyfin est un détail d'implémentation.** Le vocabulaire produit, les modèles de données internes et l'UI ne doivent jamais être dictés par les contraintes ou la terminologie de l'API Jellyfin.

---

## 3. Objectifs du projet

Chaque objectif est assorti d'indicateurs mesurables. Ces indicateurs sont revus à chaque bilan de phase (voir [[ROADMAP.md]]).

### 3.1 Objectifs fonctionnels
- Lecture complète d'une bibliothèque musicale (artistes, albums, titres, playlists, genres) sans perte de métadonnées par rapport à la source.
- Lecture continue sans interruption perceptible entre les pistes (gapless), file d'attente manipulable, reprise de lecture multi-appareil.
- Recherche instantanée sur l'ensemble de la bibliothèque, y compris hors ligne sur le contenu synchronisé.
- **KPI** : 100 % des métadonnées exposées par la source (titre, artiste, album, année, genre, pochette, paroles si disponibles) sont affichées sans perte ni troncature silencieuse.

### 3.2 Objectifs techniques
- Architecture découplée de toute source de données unique (voir [[ARCHITECTURE_PRINCIPLES.md]]).
- Base de code partagée à ≥ 90 % entre Web, Desktop et Mobile (voir [[TECH_STACK.md]]).
- Zéro régression silencieuse : toute fonctionnalité livrée est couverte par une définition de « terminé » vérifiable (voir [[DEFINITION_OF_DONE.md]]).
- **KPI** : couverture de tests ≥ 80 % sur la couche domaine/logique métier, ≥ 60 % sur la couche UI.

### 3.3 Objectifs UX
- Zéro action critique (lecture, pause, piste suivante, recherche) à plus d'une interaction de l'utilisateur.
- Continuité totale de l'état de lecture entre les sessions et les appareils.
- **KPI** : Time-to-First-Play (de l'ouverture de l'app au son audible sur reprise de session) < 1 seconde (voir [[PERFORMANCE_BUDGET.md]]).

### 3.4 Objectifs Design
- Un design system propriétaire, cohérent sur les trois plateformes, jamais un habillage visuel superficiel d'un thème tiers.
- Une identité visuelle distinctive, immédiatement reconnaissable, indépendante de celle de Jellyfin.
- **KPI** : 100 % des composants d'interface proviennent du design system versionné ; 0 style ad hoc en dehors de celui-ci (vérifié en revue, voir [[DEFINITION_OF_DONE.md]]).

### 3.5 Objectifs Performance
- Voir le détail chiffré dans [[PERFORMANCE_BUDGET.md]]. Résumé : démarrage à froid < 2 s, recherche < 100 ms perçu, 60 FPS constant sur les animations et le défilement, y compris sur une bibliothèque de 200 000+ titres (référence relevée en Phase 0.5, voir [[PERFORMANCE_GUIDE.md]]).

### 3.6 Objectifs Accessibilité
- Conformité WCAG 2.2 niveau AA sur l'ensemble des parcours critiques (lecture, navigation, recherche, gestion de playlists).
- Navigation complète au clavier et compatibilité lecteur d'écran sur toutes les plateformes cibles.
- **KPI** : 0 défaut bloquant WCAG AA détecté par les audits automatisés (axe-core) en CI ; audit manuel avant chaque release mineure.

### 3.7 Objectifs Sécurité
- Voir [[SECURITY_GUIDELINES.md]] pour le détail. Résumé : aucun secret ou identifiant en clair, tokens stockés de façon sécurisée par plateforme, validation systématique de toute donnée externe.
- **KPI** : 0 vulnérabilité critique ou haute non résolue à la release (scan automatisé en CI).

### 3.8 Objectifs Maintenabilité
- Toute décision structurante est documentée via un ADR (voir [[ADR_TEMPLATE.md]]).
- Dette technique suivie et arbitrée selon une politique explicite (voir [[ENGINEERING_GUIDE.md]] §3).
- **KPI** : 0 fichier dépassant les seuils de complexité définis dans [[CODING_STANDARDS.md]] sans justification documentée.

### 3.9 Objectifs Évolutivité
- L'architecture doit permettre l'ajout d'une deuxième source de données (ex. Navidrome, Subsonic API) sans réécriture de la couche domaine ou de l'UI.
- **KPI** : ajout d'un connecteur de test (proof of concept) réalisable en moins de 2 semaines-ingénieur sans toucher à la couche présentation.

### 3.10 Objectifs Communauté (le projet est open source dès le départ)
- Gouvernance ouverte, contribution externe facilitée dès la Phase 0 (voir [[ROADMAP.md]] §5).
- Documentation d'onboarding contributeur maintenue à jour en continu.
- **KPI** : un·e nouveau·elle contributeur·rice peut soumettre une première PR conforme en moins d'une demi-journée en suivant uniquement la documentation existante (mesuré par retour d'expérience/enquête).

**Licence retenue : MIT.**
Justification : Melodia est une application cliente qui se connecte à un serveur que l'utilisateur possède déjà ; le risque principal que le copyleft réseau (AGPL) adresse habituellement — un tiers exploitant une version modifiée comme service fermé — est marginal ici car il n'y a pas de composant serveur central à protéger. Le MIT maximise l'adoption, la contribution externe, l'intégration dans des distributions (paquets Linux, stores), et s'aligne sur l'écosystème React/Tauri majoritairement MIT/Apache-2.0. Le risque résiduel (fork commercial fermé) est jugé acceptable et sera mitigé par la protection de la marque « Melodia » (nom et identité visuelle), pas par la licence du code. Cette décision fera l'objet d'un ADR formel (voir [[ADR_TEMPLATE.md]]) avant publication effective du dépôt, incluant la comparaison détaillée MIT vs Apache-2.0 vs AGPL-3.0.

---

## 4. Ce que Melodia n'est pas (Out of Scope)

Cette section fait autorité pour trancher tout débat de périmètre. Une proposition qui contredit un point ci-dessous doit être explicitement validée comme changement de charte (voir §7) avant d'être considérée.

- **Melodia n'est pas un clone de Spotify.** Nous ne répliquons pas son catalogue social (partage public, feed d'activité, recommandations basées sur un catalogue commercial). Toute fonctionnalité sociale doit être pensée pour un contexte auto-hébergé (ex. partage entre foyers/comptes d'un même serveur), jamais comme une plateforme sociale généraliste.
- **Melodia n'est pas un fork de Jellyfin ni de son client web.** Aucun code, aucune convention d'interface, aucun choix de design n'est hérité de Jellyfin par défaut. Toute ressemblance doit être un choix délibéré et documenté, jamais un héritage passif.
- **Melodia n'est pas un thème appliqué à un client existant.** Le frontend est développé en propre (voir [[TECH_STACK.md]]).
- **Melodia n'a pas vocation à gérer la vidéo, les photos ou les livres.** Le produit est mono-domaine : la musique. Un connecteur ou une intégration qui introduirait de la vidéo comme fonctionnalité de premier ordre est hors périmètre (voir [[ROADMAP.md]] pour une éventuelle réévaluation à long terme, non engageante).
- **Melodia ne doit pas dépendre fortement d'une unique API externe.** Jellyfin est le premier connecteur implémenté, pas une dépendance structurelle. Toute fonctionnalité qui ne pourrait exister que grâce à une spécificité non portable de l'API Jellyfin doit être isolée derrière l'interface d'abstraction de la couche données (voir [[ARCHITECTURE_PRINCIPLES.md]] §2).
- **Melodia ne gère pas l'administration serveur.** La création d'utilisateurs, la gestion des bibliothèques côté serveur, le scan de fichiers, le transcodage restent la responsabilité de Jellyfin (ou du serveur connecté). Melodia consomme, il n'administre pas.
- **Melodia n'est pas un lecteur pour la découverte de musique en streaming commercial.** Aucune intégration Spotify/Apple Music/YouTube Music comme source de lecture primaire. Des intégrations complémentaires (ex. enrichissement de métadonnées via une API musicale publique) restent envisageables mais ne remplacent jamais la source auto-hébergée.
- **Melodia ne collecte ni ne revend de données utilisateur.** Aucune télémétrie propriétaire opaque ; toute télémétrie (si introduite) est opt-in, documentée, et anonymisée (voir [[SECURITY_GUIDELINES.md]]).

---

## 5. Registre des risques

| Risque | Catégorie | Probabilité | Impact | Prévention | Plan de secours |
|---|---|---|---|---|---|
| Changement de version majeure de l'API Jellyfin cassant la compatibilité | Technique / Jellyfin | Moyenne | Élevé | Couche d'abstraction stricte (voir [[ARCHITECTURE_PRINCIPLES.md]]) ; tests de contrat contre plusieurs versions de serveur en CI | Geler temporairement la version supportée, publier un correctif de compatibilité en urgence |
| Dérive de périmètre (« feature creep ») vers un clone Spotify | UX / Produit | Moyenne | Élevé | §4 de ce document fait autorité ; toute proposition hors périmètre nécessite une revue de charte | Revue trimestrielle du backlog contre la charte |
| Dégradation des performances sur bibliothèques massives (100k+ titres) | Performance | Moyenne | Élevé | Virtualisation obligatoire, budgets chiffrés en CI (voir [[PERFORMANCE_BUDGET.md]]) | Mode dégradé (pagination stricte) activable si seuils dépassés |
| Fragmentation du code entre Web / Desktop / Mobile | Technique / Maintenance | Moyenne | Élevé | Choix Tauri unifié (voir [[TECH_STACK.md]]) pour maximiser le partage de code | Isoler les divergences plateforme derrière des interfaces dédiées, jamais dans la logique métier |
| Incompatibilité navigateur sur fonctionnalités audio avancées (Web Audio API) | Compatibilité | Faible | Moyen | Dégradation progressive vers `<audio>` natif, tests de compatibilité en CI | Désactiver les fonctionnalités avancées (EQ, crossfade) avec message explicite plutôt que casser la lecture |
| Stockage local hors ligne corrompu ou désynchronisé | Stockage local / Fiabilité | Faible | Moyen | Schéma versionné, migrations testées, sommes de contrôle sur le contenu synchronisé | Réinitialisation du cache local avec re-synchronisation transparente |
| Conflits de synchronisation multi-appareils (état de lecture, playlists) | Synchronisation | Moyenne | Moyen | Stratégie « dernier écrit gagne » avec horodatage explicite documentée en ADR avant implémentation | Historique de conflits consultable, restauration manuelle possible |
| Épuisement de la contribution communautaire (projet open source porté par peu de mainteneurs) | Communauté | Moyenne | Élevé | Documentation d'onboarding soignée dès la Phase 0, gouvernance claire | Prioriser la maintenabilité sur la vitesse pour ne jamais dépendre d'une seule personne |
| Accumulation de dette technique non arbitrée | Maintenance | Moyenne | Moyen | Politique explicite de gestion de la dette (voir [[ENGINEERING_GUIDE.md]] §3) | Sprint dédié de remboursement de dette si le budget d'alerte est dépassé |
| Absence de tests E2E automatisés sur Mobile (écosystème de test Tauri Mobile moins mature) | Technique / Qualité | Élevée (en Phase 0-1) | Moyen | Tests manuels de non-régression obligatoires avant chaque release tant que l'E2E Mobile n'est pas automatisé (voir [[TECH_STACK.md]] §1, Tests) | Retarder la publication Mobile d'une release plutôt que publier sans passage manuel complet ; automatisation E2E Mobile priorisée dès que l'outillage le permet (voir [[ROADMAP.md]] Phase 2) |
| Scalabilité de l'équipe (plusieurs contributeurs simultanés) | Scalabilité / Process | Faible | Moyen | Conventions strictes (voir [[CODING_STANDARDS.md]], [[GIT_WORKFLOW.md]]) dès le premier commit | Revue obligatoire à deux yeux minimum avant merge |

---

## 6. Vision long terme (narrative)

Une trajectoire concrète par phase est détaillée dans [[ROADMAP.md]]. Ici, l'intention qualitative :

- **À 1 an** : Melodia est une alternative crédible et stable aux clients Jellyfin existants, utilisée quotidiennement par une communauté d'early adopters, disponible sur Web, Desktop et Mobile avec un socle de code unifié.
- **À 3 ans** : Melodia dispose d'un système de plugins/extensions, d'une API publique stable, et d'une compatibilité multi-sources (au-delà de Jellyfin) sans compromis d'architecture.
- **À 5 ans** : Melodia est une référence citée dans l'écosystème self-hosted au même titre que Jellyfin, Immich ou Navidrome, avec une gouvernance communautaire mature et une pérennité indépendante de ses fondateurs originaux.

---

## 7. Gouvernance documentaire

Voir [[DOCUMENTATION_GUIDE.md]] pour le détail du processus. Règle rappelée ici car elle est fondatrice :

> Avant toute nouvelle phase de développement, l'ensemble des documents fondateurs doit être relu. Toute nouvelle décision qui entre en conflit avec un document existant doit être signalée explicitement, accompagnée des solutions possibles et d'une recommandation, avec attente de validation si la décision modifie les fondations du projet. La cohérence globale du projet prime sur la vitesse de développement.

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0) | CTO / Lead Software Architect |

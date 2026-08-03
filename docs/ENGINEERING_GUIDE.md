# ENGINEERING_GUIDE.md — Charte d'ingénierie

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : CTO / Lead Software Architect
> **Documents liés** : [[PROJECT_CHARTER.md]], [[ARCHITECTURE_PRINCIPLES.md]], [[CODING_STANDARDS.md]]

Ce document définit **comment** l'équipe pense le code, au-delà de la stack ou des conventions syntaxiques. Il répond à la question : « quand deux approches sont possibles, laquelle choisit-on, et pourquoi ? »

---

## 1. Principes fondamentaux

Chaque principe est justifié — un principe non justifié est un dogme, pas une charte.

### 1.1 Simplicité par défaut, complexité justifiée
On choisit la solution la plus simple qui satisfait les exigences **actuelles**, pas les exigences hypothétiques futures. La complexité doit être justifiée par un besoin réel et mesuré (performance, échelle, contrainte produit), jamais par anticipation spéculative.
**Pourquoi** : la complexité anticipée à tort est le premier facteur de dette technique dans les projets long terme — elle coûte à écrire, à comprendre et à maintenir, souvent pour un besoin qui ne se matérialise jamais.

### 1.2 Composition plutôt qu'héritage
Les abstractions se construisent par assemblage de comportements indépendants (hooks, fonctions composables, injection de dépendances), pas par hiérarchies de classes.
**Pourquoi** : l'héritage crée un couplage rigide entre comportements qui devraient pouvoir évoluer indépendamment. En React/TypeScript, la composition est aussi le modèle natif de l'écosystème (voir [[TECH_STACK.md]]).

### 1.3 Zéro duplication tolérée sans justification
Toute logique dupliquée trois fois ou plus doit être extraite. En dessous de ce seuil, la duplication est acceptée si elle évite une abstraction prématurée.
**Pourquoi** : c'est la règle dite « du rule of three » — elle évite à la fois la duplication incontrôlée et l'abstraction prématurée sur seulement deux occurrences, souvent fausse (les deux cas divergent ensuite et l'abstraction devient un obstacle).

### 1.4 Optimiser seulement quand c'est nécessaire, mesuré
Aucune optimisation de performance n'est acceptée en revue sans être justifiée par un budget dépassé (voir [[PERFORMANCE_BUDGET.md]]) ou un profilage démontrant le goulot d'étranglement.
**Pourquoi** : l'optimisation prématurée dégrade la lisibilité pour un gain non prouvé. Elle est un des vecteurs principaux de complexité inutile.

### 1.5 Documenter les décisions importantes, pas le code trivial
Le code explicite se documente lui-même par le nommage. La documentation (commentaires, ADR) est réservée aux décisions non triviales : compromis, contournement, contrainte externe, choix contre-intuitif.
**Pourquoi** : la documentation qui répète ce que le code dit déjà se désynchronise avec le temps et devient un mensonge silencieux. La documentation qui capture un « pourquoi » non déductible du code reste vraie même quand le code change autour d'elle.

### 1.6 Explicite plutôt qu'astucieux
Une solution élégante mais difficile à comprendre en une lecture doit être reformulée, même si elle est plus courte ou plus « clever ».
**Pourquoi** : le code est lu dix fois plus souvent qu'il n'est écrit. L'astuce qui fait gagner deux minutes à l'écriture peut coûter une heure à un autre ingénieur en relecture, deux ans plus tard.

### 1.7 API cohérentes et prévisibles
Deux fonctions, hooks ou endpoints qui font des choses similaires doivent se ressembler dans leur signature, leur nommage et leur comportement d'erreur.
**Pourquoi** : la prévisibilité réduit la charge cognitive et le risque d'erreur d'utilisation, en particulier pour un contributeur externe qui ne connaît pas l'historique du projet (voir objectif Communauté, [[PROJECT_CHARTER.md]] §3.10).

### 1.8 Composants réutilisables, pensés depuis le design system
Un composant d'interface n'est écrit qu'une fois que son usage transverse a été identifié dans le design system ; on ne « réutilise » pas a posteriori un composant conçu pour un cas unique.
**Pourquoi** : la réutilisabilité a posteriori produit des composants avec des branches conditionnelles accumulées (props booléennes multiples) qui dev2iennent illisibles. La réutilisabilité pensée en amont produit des API de composants propres.

### 1.9 Toujours penser l'évolutivité, sans la sur-concevoir
On conçoit les interfaces (au sens architecture) de façon à ne pas bloquer une évolution raisonnablement prévisible (ex. deuxième source de données), sans implémenter cette évolution avant qu'elle soit nécessaire.
**Pourquoi** : c'est le point d'équilibre entre 1.1 (simplicité) et l'objectif d'évolutivité de la charte ([[PROJECT_CHARTER.md]] §3.9). On paie le coût d'une interface bien pensée maintenant ; on ne paie pas le coût d'une implémentation qui ne sert à rien aujourd'hui.

### 1.10 Le code review n'est pas une formalité
Toute PR est relue par au moins une personne qui n'est pas l'auteur, avec pour objectif de vérifier la conformité aux principes ci-dessus, pas seulement l'absence de bug.
**Pourquoi** : les principes d'ingénierie ne se maintiennent pas seuls ; ils se maintiennent par une revue qui les fait respecter activement (voir [[DEFINITION_OF_DONE.md]]).

---

## 2. Gestion des dépendances

### 2.1 Critères d'ajout d'une bibliothèque
Une dépendance externe n'est ajoutée que si **toutes** ces conditions sont réunies :
1. Le problème résolu n'est pas trivial à écrire en interne en moins d'une demi-journée-ingénieur.
2. La bibliothèque est activement maintenue (commit dans les 6 derniers mois, issues traitées) et a une communauté suffisante pour survivre à un abandon éventuel d'un mainteneur individuel.
3. La bibliothèque n'introduit pas de dépendance transitive disproportionnée par rapport au problème résolu (vérifié via l'analyse de bundle, voir [[PERFORMANCE_BUDGET.md]]).
4. Elle est compatible avec les trois cibles (Web, Desktop via Tauri, Mobile via Tauri) sans fork ni patch maison, sauf exception documentée par ADR.

### 2.2 Préférer le code interne quand
- La logique est spécifique au domaine métier de Melodia (ex. modèle de file de lecture, logique de gapless).
- La bibliothèque candidate résout un problème plus large que le besoin réel, au prix d'un poids ou d'une complexité d'API disproportionnés.
- Le besoin est amené à évoluer fréquemment selon des règles produit propres à Melodia (une dépendance externe imposerait alors des détours ou des forks).

### 2.3 Préférer une dépendance quand
- Le problème est un problème résolu et standardisé (validation de schéma, dates, requêtes serveur, accessibilité des primitives d'interface).
- Réimplémenter reviendrait à re-découvrir des cas limites déjà couverts par une bibliothèque mature (ex. gestion du focus clavier accessible — voir Radix UI dans [[TECH_STACK.md]]).

### 2.4 Éviter la multiplication des bibliothèques
- Une seule bibliothèque par catégorie de besoin (un seul gestionnaire d'état serveur, un seul moteur d'animation, etc. — voir [[TECH_STACK.md]] pour la liste faisant autorité).
- Toute proposition d'ajout d'une deuxième bibliothèque dans une catégorie déjà couverte nécessite un ADR justifiant pourquoi l'existante ne convient pas, et la dépréciation de l'ancienne si le remplacement est acté.

### 2.5 Politique de mise à jour
- Dépendances de sécurité (correctifs CVE) : mise à jour sous 7 jours, hors cycle de release normal si nécessaire.
- Mises à jour mineures/patch : automatisées (Dependabot/Renovate), fusionnées après passage CI vert.
- Mises à jour majeures : revue manuelle obligatoire, changelog de la dépendance lu, testée sur une branche dédiée avant merge.

### 2.6 Politique de suppression
Une dépendance non utilisée détectée (via analyse statique en CI) est retirée sous 2 semaines. Une dépendance dont l'usage est réduit à une fonction triviale est réévaluée pour internalisation lors du sprint de remboursement de dette (voir §3).

---

## 3. Gestion de la dette technique

### 3.1 Définition retenue
Est considérée comme dette technique tout écart documenté entre l'état actuel du code et l'état conforme aux standards du projet ([[CODING_STANDARDS.md]], [[ARCHITECTURE_PRINCIPLES.md]]), accepté consciemment pour tenir un délai ou une contrainte, **et non un oubli non documenté**. Un raccourci non documenté n'est pas de la dette technique gérée : c'est un défaut de Definition of Done (voir [[DEFINITION_OF_DONE.md]]).

### 3.2 Quand refactoriser immédiatement
- Le raccourci affecte un chemin critique (lecture audio, authentification, synchronisation de données).
- Le coût de correction augmente avec le temps de façon non linéaire (ex. structure de données qui sera référencée par de nombreux appelants si on attend).

### 3.3 Quand reporter
- Le raccourci est isolé, sans impact sur les chemins critiques, et sa correction ne bloque aucune fonctionnalité prévue à court terme.
- Le report est systématiquement accompagné d'un ticket de dette technique référencé dans le code (commentaire avec identifiant de ticket, jamais un `TODO` orphelin sans référence).

### 3.4 Comment mesurer
- Ratio de tickets de dette technique ouverts / fermés par cycle de release, suivi dans le tableau de bord d'ingénierie.
- Complexité cyclomatique et taille de fichier suivies en CI avec seuils d'alerte (voir [[CODING_STANDARDS.md]]).

### 3.5 Comment suivre
Tout élément de dette technique est un ticket dédié, étiqueté `tech-debt`, avec : contexte, impact si non traité, effort estimé de résolution. Revue de la liste de dette technique à chaque planification de phase (voir [[ROADMAP.md]]).

### 3.6 Comment documenter
Le commentaire dans le code renvoie à l'identifiant du ticket, jamais l'inverse — le code ne doit jamais porter une explication longue qui devrait vivre dans le ticket ou un ADR.

---

## 4. Processus de décision d'ingénierie

Toute décision structurante (choix de bibliothèque de catégorie, changement d'architecture, changement de convention) suit le processus décrit dans [[ADR_TEMPLATE.md]]. Une décision non structurante (détail d'implémentation local à un module) ne nécessite pas d'ADR mais reste soumise aux principes de ce document en revue de code.

---

## 5. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0) | CTO / Lead Software Architect |

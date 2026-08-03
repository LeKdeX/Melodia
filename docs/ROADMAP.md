# ROADMAP.md — Feuille de route

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : CTO / Lead Product Designer
> **Documents liés** : [[PROJECT_CHARTER.md]] §6, [[ARCHITECTURE_PRINCIPLES.md]], [[TECH_STACK.md]]

Ce document traduit la vision narrative de [[PROJECT_CHARTER.md]] §6 en phases concrètes et vérifiables.

---

## Note de séquencement : architecture tri-cible dès le départ, livraison progressive

Le projet est **architecturé** pour Web, Desktop et Mobile dès la Phase 0 (choix Tauri unifié, voir [[TECH_STACK.md]] §0) — aucune décision structurante ne doit fermer la porte à l'une des trois cibles. Cela ne signifie pas que les trois cibles sont **livrées** simultanément dès la première version utilisable : la Phase 1 livre Web + Desktop en priorité (surface de test la plus rapide à itérer), la Phase 2 ajoute la publication Mobile sur le même socle de code. C'est une décision de séquencement de livraison, pas une révision de l'ambition tri-cible, et elle est cohérente avec le principe de simplicité par défaut ([[ENGINEERING_GUIDE.md]] §1.1) : livrer et valider vite sur deux cibles avant d'ajouter la charge de publication (stores mobiles, revues de plateforme) de la troisième.

---

## Phase 0 — Fondations (en cours)
- Documentation fondatrice (ce corpus de 13 documents).
- Choix de stack actés (voir [[TECH_STACK.md]]).
- Mise en place du dépôt, CI de base (lint, typecheck), squelette d'architecture (couches Data/Domain/UI, voir [[ARCHITECTURE_PRINCIPLES.md]]).
- Licence MIT appliquée, gouvernance open source initiale (CONTRIBUTING, code de conduite).

**Critère de sortie de phase** : un contributeur externe peut cloner le dépôt, lancer l'app en local (coquille vide) et comprendre l'architecture cible sans échange oral, uniquement via `docs/`.

## Phase 1 — MVP (Web + Desktop)
- Connecteur `JellyfinSource` fonctionnel : navigation bibliothèque (artistes, albums, titres), lecture audio de base (socle `<audio>` + MediaSession, voir [[ARCHITECTURE_PRINCIPLES.md]] §5).
- File de lecture, recherche locale, design system v1 (composants critiques du parcours d'écoute).
- Publication Web (PWA) et Desktop (Tauri) sur les trois OS desktop.
- Accessibilité : conformité WCAG AA sur le parcours de lecture et de navigation (voir [[DEFINITION_OF_DONE.md]]).

**Critère de sortie de phase** : un utilisateur peut se connecter à son serveur Jellyfin, parcourir sa bibliothèque et écouter sa musique quotidiennement sans revenir au client Jellyfin par défaut.

## Phase 2 — Complétude fonctionnelle + Mobile
- Publication Mobile (iOS/Android) sur le même socle Tauri.
- Mode hors ligne complet (téléchargement de pistes, `LocalStore` natif — voir [[ARCHITECTURE_PRINCIPLES.md]] §3).
- Synchronisation multi-appareils de l'état de lecture et des playlists (stratégie horodatée, voir [[PROJECT_CHARTER.md]] §5).
- Enrichissements audio (égaliseur, crossfade, lecture sans interruption via Web Audio API).
- Audit d'accessibilité manuel complet, audit de performance sur bibliothèque 100 000+ titres.

**Critère de sortie de phase** : Melodia est utilisable comme client principal sur les trois cibles, en ligne comme hors ligne, sans perte de contexte entre appareils.

## Phase 3 — Extensibilité
- Système de plugins pour l'UI (points d'extension déjà anticipés en Phase 0-1, voir [[ARCHITECTURE_PRINCIPLES.md]] §8) : implémentation effective.
- Preuve de concept d'un second connecteur `MusicSource` (ex. Subsonic/Navidrome) validant l'abstraction de la couche Data sans réécriture Domain/UI.
- API publique stable (versionnée) exposant tout ou partie de la couche Domain à des clients/plugins tiers.
- Gouvernance communautaire formalisée (processus de RFC pour les changements majeurs, mainteneurs additionnels au-delà de l'équipe fondatrice).

**Critère de sortie de phase** : un contributeur externe peut écrire un plugin ou un second connecteur sans intervention de l'équipe fondatrice, en suivant uniquement l'API publique documentée.

## Phase 4 et au-delà — Maturité
- Présence dans les stores d'applications officiels (Microsoft Store, Mac App Store, F-Droid/Play Store).
- Écosystème de plugins tiers actif, éventuel « catalogue » communautaire de plugins.
- Support de sources multiples en production (pas seulement en preuve de concept).
- Gouvernance indépendante de la présence continue des fondateurs originaux (bus factor mitigé, voir [[PROJECT_CHARTER.md]] §5).

---

## Vision par horizon (axes d'évolution)

### À 1 an
- **Architecture** : socle Tauri stable, couches Data/Domain/UI éprouvées en production sur trois cibles.
- **Fonctionnalités** : parcours d'écoute complet, hors ligne, multi-appareil.
- **Communauté** : premiers contributeurs externes actifs, documentation d'onboarding validée par l'usage réel.

### À 3 ans
- **Architecture** : système de plugins mature, API publique versionnée et stable (garanties de compatibilité ascendante documentées).
- **Fonctionnalités** : multi-source en production, personnalisation avancée via plugins.
- **Communauté** : gouvernance à plusieurs mainteneurs, processus de RFC rodé, présence dans les stores officiels.
- **Extensions/Plugins** : catalogue communautaire initial.

### À 5 ans
- **Architecture** : Melodia est une plateforme (cœur + écosystème de plugins), pas seulement une application.
- **Fonctionnalités** : parité ou dépassement des meilleurs clients musicaux commerciaux sur l'ensemble des critères de [[PROJECT_CHARTER.md]] §3.
- **Communauté** : projet cité comme référence de l'écosystème self-hosted, gouvernance résiliente et indépendante.
- **API publique** : écosystème tiers construit dessus (intégrations domotique, scripts personnels, applications compagnons).

---

## Rythme de release

Releases mineures régulières en Phase 1-2 (cadence resserrée pour capter le retour utilisateur tôt), stabilisation vers un rythme prévisible en Phase 3+ (voir [[GIT_WORKFLOW.md]] §4 pour la mécanique SemVer). La cadence précise est un détail opérationnel ajusté à chaque rétrospective de phase, pas une contrainte figée dans ce document.

---

## Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0) | CTO / Lead Product Designer |

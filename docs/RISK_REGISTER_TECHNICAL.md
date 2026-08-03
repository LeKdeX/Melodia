# RISK_REGISTER_TECHNICAL.md — Registre des risques par décision technique (Phase 0.5, complément)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Security Engineer / Staff Performance Engineer / Principal Software Architect
> **Documents liés** : [[PROJECT_CHARTER.md]] §5, [[ARCHITECTURE_PRINCIPLES.md]], [[ENGINEERING_GUIDE.md]] §3

## Différence avec le registre de [[PROJECT_CHARTER.md]] §5

[[PROJECT_CHARTER.md]] §5 recense les risques **stratégiques/produit** (dérive de périmètre, épuisement communautaire, dépendance à Jellyfin). Ce document recense les risques **techniques par décision d'architecture** — granularité différente, complémentaire, jamais redondante : un risque de [[PROJECT_CHARTER.md]] §5 explique *pourquoi* le projet pourrait échouer ; un risque ici explique *ce qui peut casser dans le code* si une décision précise est mal exécutée. Format : risque / probabilité / impact / prévention / correction, conforme au format demandé pour cette phase.

---

## 1. Monorepo (pnpm + Turborepo) — [[STACK_DECISIONS.md]] §3, [[ARCHITECTURE.md]]

| Risque | Probabilité | Impact | Prévention | Correction |
|---|---|---|---|---|
| Frontières de packages contournées par un import relatif profond | Moyenne | Élevé (érosion progressive de l'architecture en couches) | Résolution de module qui casse physiquement tout chemin relatif traversant un package ([[ARCHITECTURE.md]] §3) + linter d'architecture en CI | Revert de l'import fautif identifié en revue ; audit ponctuel des imports inter-packages si plusieurs violations passent inaperçues |
| Cache Turborepo corrompu ou obsolète (faux positif de "rien n'a changé") | Faible | Moyen (build silencieusement obsolète en local) | Cache remote versionné, invalidation basée sur hash de contenu, pas sur horodatage | `turbo run build --force` documenté dans le guide de dépannage contributeur |
| Courbe d'apprentissage du monorepo pour un nouveau contributeur | Moyenne | Moyen (frein à l'objectif communauté, [[PROJECT_CHARTER.md]] §3.10) | Checklist d'onboarding dédiée ([[CHECKLISTS.md]] §1), structure documentée dans [[ARCHITECTURE.md]] | Documentation complétée a posteriori si un contributeur bute sur un point précis non couvert |

## 2. Tauri 2 unifié Desktop + Mobile — [[TECH_STACK.md]] §0

| Risque | Probabilité | Impact | Prévention | Correction |
|---|---|---|---|---|
| Écosystème de plugins Tauri Mobile moins mature que Desktop (fonctionnalité native manquante) | Moyenne | Élevé (bloquant pour une fonctionnalité spécifique Mobile) | Vérification de la disponibilité du plugin Tauri nécessaire **avant** de committer une fonctionnalité au sprint (étape de conception, [[DEVELOPMENT_GUIDELINES.md]] étape 2) | Contribution du correctif en amont (upstream Tauri) si le plugin existe mais est incomplet ; sinon, développement d'un plugin natif minimal en dernier recours, documenté par ADR |
| Rupture de compatibilité lors d'une montée de version majeure de Tauri | Faible | Élevé (build cassé sur les trois cibles simultanément) | Version de Tauri figée et testée avant mise à jour majeure, jamais mise à jour automatique sans revue ([[ENGINEERING_GUIDE.md]] §2.5) | Rollback vers la version figée précédente, correctif appliqué sur une branche dédiée avant remise à jour |
| Taille de l'équipe insuffisante pour maintenir l'expertise Rust nécessaire aux plugins natifs | Moyenne | Moyen | Limiter la surface Rust custom au strict nécessaire ; privilégier les plugins officiels/communautaires à du code natif maison ([[ENGINEERING_GUIDE.md]] §2.2-2.3) | Documentation Rust interne renforcée si la dépendance à un seul contributeur Rust devient un point de défaillance unique |

## 3. FlexSearch (moteur de recherche client) — [[STACK_DECISIONS.md]] §2

| Risque | Probabilité | Impact | Prévention | Correction |
|---|---|---|---|---|
| Mainteneur unique du projet FlexSearch, risque d'abandon | Faible-Moyenne | Élevé (pas d'alternative directe à la même échelle, voir [[TECHNOLOGY_COMPARISONS.md]] §7) | Version figée, code d'intégration isolé derrière l'interface de recherche de la couche Data (pas de couplage direct dans les features) | Fork maintenu en interne si nécessaire ; l'isolation architecturale rend une migration vers une alternative future contenue à un seul module |
| Dérive de l'index sérialisé par rapport au contenu réel de `LocalStore` | Moyenne | Moyen (résultats de recherche obsolètes) | Reconstruction incrémentale systématique à chaque synchronisation ([[DATA_LAYER.md]] §3.1) | Bouton "Reconstruire l'index" accessible dans les paramètres avancés, en dernier recours |

## 4. Double implémentation `LocalStore` (SQLite / IndexedDB) — [[ARCHITECTURE_PRINCIPLES.md]] §3

| Risque | Probabilité | Impact | Prévention | Correction |
|---|---|---|---|---|
| Divergence de comportement entre les deux implémentations (un bug présent sur une plateforme, absent sur l'autre) | Moyenne | Élevé (bug difficile à reproduire selon la plateforme de test) | Suite de tests de contrat commune aux deux implémentations (mêmes cas de test exécutés contre `SqliteStore` et `IndexedDbStore`) | Correctif appliqué aux deux implémentations simultanément, jamais à une seule sans vérifier l'autre |
| Migration de schéma appliquée correctement sur une plateforme, oubliée sur l'autre | Moyenne | Élevé (perte de données ou état incohérent) | Migrations définies une seule fois au niveau de l'interface, exécutées identiquement par les deux implémentations (pas de logique de migration dupliquée par plateforme) | Script de réparation manuel + sauvegarde automatique avant migration ([[DATA_LAYER.md]] §2.2) |

## 5. Moteur audio en couches (gapless/crossfade/EQ/visualiseur) — [[AUDIO_ENGINE.md]]

| Risque | Probabilité | Impact | Prévention | Correction |
|---|---|---|---|---|
| Politique d'autoplay navigateur bloquant l'initialisation du contexte Web Audio API | Élevée (sur Web) | Moyen (fonctionnalités d'enrichissement indisponibles, pas la lecture de base) | Règle de dégradation progressive déjà actée ([[ARCHITECTURE_PRINCIPLES.md]] §5) — le socle `<audio>` ne dépend jamais du contexte Web Audio | Message informatif à l'utilisateur si les enrichissements sont indisponibles, jamais un blocage silencieux |
| Dérive audible entre les deux éléments `<audio>` du double buffer (gapless imparfait) | Moyenne | Moyen (expérience dégradée, pas de panne) | Tests automatisés de mesure d'écart temporel à la bascule, seuil d'alerte défini | Ajustement du seuil de préchargement (§2 d'[[AUDIO_ENGINE.md]]) si l'écart dépasse la tolérance perceptible |
| Fuite mémoire du `AnalyserNode`/Canvas du visualiseur sur sessions longues | Faible | Moyen (dégradation progressive des performances) | Désactivation automatique si onglet non visible ([[AUDIO_ENGINE.md]] §7), déjà actée | Profilage mémoire dédié en cas de rapport utilisateur de ralentissement après lecture prolongée |

## 6. Intégration Jellyfin via SDK officiel — [[JELLYFIN_INTEGRATION.md]] §1

| Risque | Probabilité | Impact | Prévention | Correction |
|---|---|---|---|---|
| Le SDK officiel prend du retard sur une nouvelle version de l'API Jellyfin | Moyenne | Moyen | Plage de versions serveur supportées déclarée explicitement, testée en CI ([[JELLYFIN_INTEGRATION.md]] §7) | Contribution au SDK officiel en amont, ou correctif temporaire isolé dans `JellyfinSource` en attendant la mise à jour du SDK |
| Changement de format de réponse non documenté entre deux versions mineures de Jellyfin | Faible | Élevé (données mal interprétées silencieusement) | Validation de schéma stricte à la frontière ([[SECURITY_GUIDELINES.md]] §6) — un champ inattendu échoue explicitement plutôt que d'être ignoré silencieusement | Correctif de mapping publié en urgence (hors cycle de release normal si critique, cf. politique de sécurité) |

## 7. Design system propriétaire (Radix + Tailwind + cva) — [[DESIGN_SYSTEM_ARCHITECTURE.md]]

| Risque | Probabilité | Impact | Prévention | Correction |
|---|---|---|---|---|
| Dérive de cohérence visuelle si un composant ad hoc contourne le design system | Moyenne | Moyen (érosion de l'objectif Design, [[PROJECT_CHARTER.md]] §3.4) | Revue de design obligatoire avant implémentation ([[DEVELOPMENT_GUIDELINES.md]] §3), règle ESLint interdisant les valeurs Tailwind arbitraires ([[ENGINEERING_MANIFESTO.md]] §2) | Refactorisation du composant fautif vers le design system, priorisée en dette technique si non bloquante |
| Régression d'accessibilité introduite par une mise à jour de Radix UI | Faible | Élevé (impact direct sur l'objectif Accessibilité, [[PROJECT_CHARTER.md]] §3.6) | Tests d'accessibilité automatisés (axe-core) en CI sur chaque composant du design system ([[TESTING_STRATEGY.md]] §6) | Gel de version de la primitive concernée jusqu'à correctif, remonté en amont si nécessaire |

## 8. Budget de performance à 200 000+ titres — [[PERFORMANCE_BUDGET.md]], [[PERFORMANCE_GUIDE.md]]

| Risque | Probabilité | Impact | Prévention | Correction |
|---|---|---|---|---|
| Croissance réelle des bibliothèques utilisateurs dépassant 200 000 titres plus vite que prévu | Faible-Moyenne | Élevé si non anticipé | Marge validée jusqu'à 300 000 dans les scénarios extrêmes ([[EXTREME_SCENARIOS.md]]) | Relever à nouveau la référence par amendement documenté (même procédure que le passage 100k→200k), pas de redécision silencieuse |
| Fixture synthétique de test non représentative d'une bibliothèque réelle (distribution artificielle) | Moyenne | Moyen (faux sentiment de sécurité en CI) | Distribution réaliste générée explicitement ([[PERFORMANCE_GUIDE.md]] §4) plutôt qu'un jeu de données uniforme | Collecte de métadonnées anonymisées d'une bibliothèque réelle volontairement partagée par un utilisateur pilote, si la fixture s'avère insuffisante |

---

## 9. Checklist de validation

- [ ] Chaque décision structurante majeure de la Phase 0.5 a un risque documenté ici (pas seulement les risques évidents).
- [ ] Chaque risque a une probabilité, un impact, une prévention et une correction distincts — jamais un champ vide ou générique.
- [ ] Aucun risque ici ne duplique un risque déjà couvert par [[PROJECT_CHARTER.md]] §5 (vérifié par relecture croisée).
- [ ] Les risques à impact élevé ont une prévention déjà active dans le code/process décrit ailleurs (pas seulement une intention).

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5, complément) | Security Engineer / Staff Performance Engineer / Principal Software Architect |

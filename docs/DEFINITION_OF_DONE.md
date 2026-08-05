# DEFINITION_OF_DONE.md — Définition de "terminé"

> **Statut** : document fondateur, vivant
> **Version** : 0.2.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Engineering Manager
> **Documents liés** : [[DEVELOPMENT_GUIDELINES.md]], [[CODING_STANDARDS.md]], [[PERFORMANCE_BUDGET.md]], [[SECURITY_GUIDELINES.md]]

Une fonctionnalité n'est **jamais** considérée comme terminée sur la seule base de « ça fonctionne chez moi ». Cette checklist est vérifiée en revue de PR avant merge (voir [[GIT_WORKFLOW.md]] §3) et cochée explicitement dans le template de Pull Request.

---

## Definition of Done — Epic

> Règle permanente du projet, ajoutée suite à ADR-0002 (`docs/adr/0002-application-bootstrap-gap.md`) — un gap de planification réel (aucune Task ne créait le point d'entrée de l'application) aurait été détecté plus tôt si cette checklist avait existé au moment de la décomposition d'EPIC-003. **Distincte de [[MILESTONES.md]]**, qui définit les critères de sortie des *jalons* — cette section s'applique à toute Epic, avant même que ses Tasks ne soient implémentées, et est utilisée systématiquement lors des revues d'architecture, pas seulement à la clôture d'une Epic.

Une Epic ne peut être considérée comme prête à être implémentée que si elle possède obligatoirement :

- [ ] Un point d'entrée clairement identifié.
- [ ] Un point de sortie clairement identifié.
- [ ] Au moins un artefact observable produit par cette Epic.
- [ ] Au moins un critère de validation objectif.
- [ ] Une démonstration reproductible permettant de vérifier que l'Epic apporte une valeur observable.

**Si l'un de ces éléments est absent : STOP.** Ne pas implémenter l'Epic. Créer un ADR si nécessaire afin de corriger le backlog ou l'architecture avant toute implémentation.

---

## Checklist obligatoire

### Code
- [ ] Le code est revu par au moins une personne non-auteure ([[ENGINEERING_GUIDE.md]] §1.10).
- [ ] Typage strict respecté, aucun `any` non justifié en commentaire.
- [ ] Conforme aux conventions de nommage et d'organisation ([[CODING_STANDARDS.md]]).
- [ ] Aucune duplication non justifiée introduite ([[ENGINEERING_GUIDE.md]] §1.3).
- [ ] Aucune violation des frontières de couche/module ([[ARCHITECTURE_PRINCIPLES.md]] §7), vérifié par le linter d'architecture.
- [ ] Aucun `TODO` sans référence à un ticket de dette technique ([[ENGINEERING_GUIDE.md]] §3).

### Documentation
- [ ] TSDoc à jour sur toute surface publique modifiée.
- [ ] Document fondateur mis à jour si un standard existant a changé (identifié dès la conception, voir [[DEVELOPMENT_GUIDELINES.md]] étape 2).
- [ ] ADR rédigé si la fonctionnalité impliquait une décision structurante.

### Tests
- [ ] Tests unitaires sur la logique métier nouvelle/modifiée (couche Domain/Data).
- [ ] Tests de composants sur tout composant d'interface avec logique conditionnelle.
- [ ] Test E2E ajouté ou mis à jour pour tout parcours utilisateur critique modifié (lecture, recherche, gestion de playlist).
- [ ] Couverture de test conforme aux seuils de [[PROJECT_CHARTER.md]] §3.2 (≥ 80 % Domain/logique, ≥ 60 % UI).

### Accessibilité
- [ ] Navigation clavier complète sur le nouveau parcours (tab, flèches, échap selon le pattern de composant).
- [ ] Attributs ARIA corrects vérifiés (rôles, labels, états) — audit automatisé (axe-core) sans défaut bloquant.
- [ ] Contraste de couleur conforme WCAG 2.2 AA.
- [ ] Testé manuellement avec un lecteur d'écran au moins une fois avant release mineure/majeure.

### Responsive / multi-cible
- [ ] Vérifié sur Web (desktop et mobile), Desktop natif (Tauri) et au moins un appareil Mobile natif si le changement touche l'UI partagée.
- [ ] Layout vérifié sur les résolutions de la matrice de compatibilité ([[TECH_STACK.md]] §2).
- [ ] Aucune régression sur les cibles non directement concernées par le changement (vérification manuelle rapide minimale).

### Performance
- [ ] Aucun budget de [[PERFORMANCE_BUDGET.md]] dépassé (vérifié en CI pour le poids de bundle ; profilage manuel pour FPS/mémoire si le changement touche le rendu de listes ou l'audio).
- [ ] Aucun re-render superflu introduit sur les composants critiques (liste de titres, barre de lecture).

### Sécurité
- [ ] Aucune donnée sensible journalisée ([[SECURITY_GUIDELINES.md]] §9).
- [ ] Toute nouvelle entrée externe validée par schéma ([[SECURITY_GUIDELINES.md]] §6).
- [ ] Aucune nouvelle dépendance ajoutée sans respecter les critères de [[ENGINEERING_GUIDE.md]] §2.1.

### Design
- [ ] 100 % des composants d'interface proviennent du design system versionné ([[PROJECT_CHARTER.md]] §3.4) — aucun style ad hoc en dehors.
- [ ] Revue de design validée avant implémentation pour toute surface d'interface nouvelle ([[DEVELOPMENT_GUIDELINES.md]] §3).

---

## Niveaux de rigueur selon le type de changement

| Type de changement | Sections obligatoires |
|---|---|
| Nouvelle fonctionnalité utilisateur | Toutes les sections |
| Correction de bug | Code, Tests (régression), Sécurité si applicable |
| Refactorisation interne sans changement de comportement | Code, Tests (non-régression), Performance |
| Documentation uniquement | Documentation seule |
| Changement de configuration/CI | Code, aucune section produit applicable |

---

## Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0) | Engineering Manager |
| 0.2.0 | 2026-08-05 | Ajout de la section « Definition of Done — Epic » (règle permanente, ADR-0002) — 5 critères obligatoires avant implémentation d'une Epic, distincte des critères de sortie de jalon de MILESTONES.md | Staff Software Engineer |

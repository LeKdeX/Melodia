# PERFORMANCE_GUIDE.md — Méthodologie et outillage de performance (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Lead Frontend Engineer
> **Documents liés** : [[PERFORMANCE_BUDGET.md]], [[DATA_LAYER.md]], [[CI_CD_GUIDE.md]]

Ce document ne redéfinit aucun chiffre — les cibles chiffrées vivent exclusivement dans [[PERFORMANCE_BUDGET.md]] (amendé en Phase 0.5 pour une bibliothèque de référence de 200 000 titres). Il répond à une question différente : **comment** on construit, mesure et fait respecter ces budgets en continu.

---

## 1. Pourquoi 200 000 titres comme référence

[[PERFORMANCE_BUDGET.md]] a relevé sa bibliothèque de stress-test de 100 000 à 200 000 titres en Phase 0.5 : une collection personnelle auto-hébergée constituée sur plusieurs années (objectif de pérennité, [[PROJECT_CHARTER.md]] §6) dépasse couramment 100 000 titres pour un utilisateur avancé ; doubler la marge de sécurité évite qu'un budget tenu de justesse en Phase 1 devienne un défaut perceptible en Phase 2-3 à mesure que les bibliothèques réelles grossissent.

## 2. Virtualisation — implémentation concrète

- TanStack Virtual ([[TECH_STACK.md]] §1) rend uniquement les éléments visibles + une marge tampon (overscan) de 5-10 éléments — jamais la liste complète, y compris pour le défilement rapide (« fling scroll »).
- Les listes hétérogènes (grille d'albums + liste de titres dans une même vue) utilisent une mesure dynamique de taille d'élément, jamais une hauteur fixe supposée qui casserait le calcul de fenêtre virtuelle sur du contenu texte de longueur variable.
- Test de non-régression dédié : rendu d'une bibliothèque synthétique de 200 000 titres en CI (fixture générée, pas de dépendance à des données réelles), vérifiant que le nombre de nœuds DOM montés reste borné indépendamment de la taille totale de la liste.

## 3. Outillage de mesure

| Besoin | Outil | Quand |
|---|---|---|
| Poids de bundle (JS/CSS) | `vite-bundle-visualizer` ou équivalent, budget vérifié via une étape CI dédiée | À chaque PR |
| FPS / re-renders | React DevTools Profiler + Chrome Performance panel | Avant chaque release, et à la demande sur toute PR touchant le rendu de liste ou l'audio |
| Mémoire | Profiler mémoire du navigateur (heap snapshot) + Tauri (profilage natif du processus) | Avant chaque release mineure/majeure |
| Démarrage à froid/à chaud | Instrumentation interne (marques `performance.mark`/`performance.measure`) exportées en local, jamais envoyées sans consentement (voir [[SECURITY_GUIDELINES.md]] §9) | Continu en développement, agrégé avant release |

## 4. Génération de la fixture de 200 000 titres

Un script dédié (`scripts/generate-fixture.ts`, hors périmètre applicatif — outil de développement uniquement) génère une bibliothèque synthétique respectant la distribution réaliste d'une collection personnelle (nombre d'albums par artiste, longueur de titres, présence de pochettes) plutôt qu'un jeu de données uniforme trivial qui masquerait les coûts réels de rendu (texte de longueur variable, images manquantes).

## 5. Discipline de re-render (application concrète du budget §6)

- Toute nouvelle feature touchant `playerStore` ou la liste de titres passe par une vérification React DevTools Profiler avant merge (ajoutée à la checklist [[DEFINITION_OF_DONE.md]], section Performance).
- Les sélecteurs Zustand sont systématiquement scoping au strict nécessaire (`useStore(s => s.currentTrack)`, jamais `useStore()` sans sélecteur sur un composant de liste) — vérifié en revue de code.

## 6. Intégration en CI

Voir [[CI_CD_GUIDE.md]] pour le détail du pipeline : le job de vérification de budget de poids échoue la build au-delà du seuil d'alerte de [[PERFORMANCE_BUDGET.md]] §4, sauf dérogation documentée (voir [[ENGINEERING_GUIDE.md]] §3). Le test de rendu sur fixture 200 000 titres tourne en job séparé, non bloquant pour chaque PR (trop coûteux en temps CI) mais obligatoire et bloquant avant toute release ([[QUALITY_GATES.md]]).

---

## 7. Checklist de validation

- [ ] La fixture de test couvre la cible engagée (200 000 titres, [[PERFORMANCE_BUDGET.md]]) — l'extension à 300 000 reste un ticket de dette technique ouvert, voir [[EXTREME_SCENARIOS.md]] §1.
- [ ] Chaque outil de mesure (§3) a un propriétaire et une fréquence d'exécution définie.
- [ ] Le risque de fixture non représentative est couvert dans [[RISK_REGISTER_TECHNICAL.md]] §8.
- [x] Un appareil de référence tablette est ajouté à [[PERFORMANCE_BUDGET.md]] §1 (résolu pendant l'auto-audit de la Phase 0.5 complément).

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | Lead Frontend Engineer |
| 0.2.0 | 2026-08-03 | Ajout de la checklist de validation et des renvois vers les documents du complément Phase 0.5 | Lead Frontend Engineer |

# ILLUSTRATION_GUIDE.md — Style d'illustration (Phase 2, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Illustration Designer / Senior Visual Designer
> **Documents liés** : [[EMPTY_STATES_GUIDE.md]], [[COLOR_SYSTEM.md]], [[VISUAL_DIRECTION.md]]

> **Cadrage** : [[EMPTY_STATES_GUIDE.md]] a déjà défini le *rôle* de l'illustration dans un état vide (discrète, jamais dominante, renforce le message). Ce document définit le *style graphique* de ces illustrations — les deux se lisent ensemble.

---

## 1. Style général

Formes géométriques simples, composées à partir des mêmes primitives que le reste de l'interface (cercles, lignes, rectangles à coins arrondis — cohérent avec [[ICONOGRAPHY_GUIDE.md]] §2) plutôt qu'un style illustratif figuratif détaillé. Une illustration Melodia doit être identifiable comme un prolongement de l'interface, jamais comme un asset importé d'une bibliothèque générique.

## 2. Couleurs

Palette limitée à `neutral` + un seul accent (`accent-500` ou `accent-warm-500` selon le contexte émotionnel, [[COLOR_SYSTEM.md]] §3-4) — jamais une illustration multicolore qui introduirait une palette parallèle à celle de l'interface.

## 3. Formes

Composition asymétrique légère (évite la rigidité d'une composition parfaitement centrée/symétrique, qui paraîtrait froide) mais toujours équilibrée — cohérent avec « minimalisme chaleureux » ([[VISUAL_DIRECTION.md]] §1).

## 4. Textures

Aucune texture photographique ni gradient complexe — surfaces plates avec, au maximum, un dégradé subtil à deux teintes proches (cohérent avec [[VISUAL_DIRECTION.md]] §7, grain de bruit très subtil, jamais décoratif à outrance).

## 5. Profondeur

Minimale — un ou deux plans superposés au maximum (cohérent avec [[VISUAL_DIRECTION.md]] §6, profondeur suggérée par la superposition plutôt que le skeuomorphisme).

## 6. Niveau de détail

Faible à modéré — une illustration doit se lire instantanément, jamais nécessiter un examen attentif pour comprendre son sujet (cohérent avec [[UX_PRINCIPLES.md]] §5, un état vide guide sans demander d'effort).

## 7. Règles par contexte

| Contexte | Traitement |
|---|---|
| États vides ([[EMPTY_STATES.md]]) | Illustration discrète, jamais dominante — §2-6 s'appliquent pleinement |
| Erreurs ([[ERROR_STATES.md]]) | Pas d'illustration dominante — un message + une action suffisent ([[ERROR_EXPERIENCE.md]] §3), au maximum une icône d'état, jamais une scène illustrée qui dramatiserait |
| Onboarding ([[ONBOARDING_GUIDE.md]]) | Illustration autorisée à l'écran d'accueil uniquement, jamais répétée à chaque étape |
| Tutoriels/conseils contextuels | Aucune illustration — le texte seul suffit ([[VOICE_AND_TONE.md]] §3) |
| Synchronisation | Pas d'illustration statique — un indicateur animé discret suffit ([[MOTION_GUIDELINES.md]] §9) |
| Téléchargements | Idem — traitement animé, pas illustratif |
| Mode hors ligne | Illustration légère autorisée uniquement si le contenu est entièrement indisponible (cas rare, [[SCREEN_SPECIFICATIONS.md]] §7) — jamais quand du contenu en cache reste utilisable |

---

## 8. Checklist de validation

- [ ] Chaque contexte demandé dans le cadrage a une règle explicite, y compris ceux où l'illustration est délibérément absente.
- [ ] Aucune illustration ne dépasse la palette de [[COLOR_SYSTEM.md]] §2-4.
- [ ] Le niveau de détail reste cohérent sur tous les contextes — pas de style plus élaboré à un endroit qu'à un autre.

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 2, volume 2) | Illustration Designer / Senior Visual Designer |

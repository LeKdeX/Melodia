# UX_PRINCIPLES.md — Charte UX (Phase 1)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : UX Designer / Music Experience Designer
> **Documents liés** : [[PRODUCT_VALUES.md]], [[PRODUCT_RULES.md]], [[DESIGN_SYSTEM_ARCHITECTURE.md]]

> **Cadrage** : ce document est la philosophie UX au niveau produit — le « pourquoi » derrière chaque interaction. [[PRODUCT_RULES.md]] en dérive les règles non négociables et concrètes ; [[DESIGN_SYSTEM_ARCHITECTURE.md]] en dérive l'implémentation technique des composants ; [[DEFINITION_OF_DONE.md]] en dérive la checklist de vérification. Ne pas dupliquer ces trois niveaux ici.

---

## 1. Chaque clic doit avoir une réponse

Aucune action utilisateur ne doit rester sans retour visible — même une action qui prendra du temps à se compléter doit accuser réception instantanément (UI optimiste, [[FRONTEND_ARCHITECTURE.md]] §8). L'absence de retour immédiat est interprétée par l'utilisateur comme un échec, même quand l'action a réussi en arrière-plan.

## 2. Chaque animation doit avoir une utilité

Une animation guide l'attention, communique une relation spatiale (d'où vient cet élément, où va-t-il), ou confirme une action — jamais un ornement gratuit. Une animation qui ralentit la perception d'une action sans ajouter de compréhension est un défaut, pas une fonctionnalité (cohérent avec `prefers-reduced-motion` déjà actée, [[DESIGN_SYSTEM_ARCHITECTURE.md]] §5).

## 3. Aucune interface inutile

Un écran, un panneau ou un contrôle qui n'aide pas l'utilisateur à écouter, trouver ou organiser sa musique n'a pas sa place. Chaque élément d'interface doit pouvoir justifier sa présence par un besoin utilisateur identifié dans [[PERSONAS.md]] ou [[USER_JOURNEYS.md]] — jamais par « ce serait bien d'avoir ».

## 4. Aucune distraction

Le produit ne lutte jamais pour l'attention de l'utilisateur au-delà de sa musique — pas de notification d'engagement, pas de pop-up promotionnel, pas de badge de nouveauté insistant. Rejoint directement la valeur « le silence est une fonctionnalité » ([[PRODUCT_VALUES.md]] §4).

## 5. Aucun écran vide

Un état vide (bibliothèque en cours de synchronisation, résultat de recherche nul, playlist tout juste créée) n'est jamais un simple blanc — il explique ce qui se passe et propose une action suivante logique. Un écran vide non expliqué est indiscernable d'un bug aux yeux de l'utilisateur.

## 6. Toujours guider l'utilisateur

Quand une action nécessite plusieurs étapes (connexion à un serveur, résolution d'une erreur de synchronisation), l'interface indique clairement l'étape actuelle et la suivante — jamais un utilisateur laissé à deviner ce qu'il doit faire.

## 7. Toujours réduire les frictions

Face à deux façons d'accomplir la même action, préférer systématiquement celle qui demande le moins d'étapes et le moins de changement de contexte — voir [[SUCCESS_METRICS.md]] pour les seuils chiffrés (nombre d'actions maximum pour les tâches courantes).

## 8. Toujours privilégier la simplicité

Une fonctionnalité avancée (égaliseur, statistiques d'écoute détaillées) reste disponible mais jamais imposée dans le chemin principal — accessible à qui la cherche, invisible pour qui n'en a pas besoin (cohérent avec [[AUDIO_ENGINE.md]] §6, activation opt-in).

## 9. Toujours préserver le plaisir d'écoute

Aucune interaction d'interface ne doit jamais interrompre la musique en cours, sauf action explicite de l'utilisateur (changement de piste, pause). C'est le principe le plus strict de cette charte — voir sa traduction en règle non négociable dans [[PRODUCT_RULES.md]] §2.

---

## 10. Comment appliquer cette charte en revue

Face à une nouvelle fonctionnalité ou interface, poser ces questions dans l'ordre :
1. Un utilisateur de [[PERSONAS.md]] en a-t-il réellement besoin, identifié dans un parcours de [[USER_JOURNEYS.md]] ?
2. Réduit-elle le nombre d'actions nécessaires, ou l'augmente-t-elle ?
3. Peut-elle jamais interrompre la lecture en cours ?
4. Un état vide/erreur est-il prévu et explicite ?
5. Est-elle testable au clavier sans souris ([[PERSONAS.md]] §8) ?

Si une réponse est négative sur les questions 3 ou 5, la fonctionnalité n'est pas acceptable en l'état — pas un compromis à documenter, un blocage à corriger avant d'avancer.

---

## 11. Checklist de validation

- [ ] Chaque principe est écrit comme un test vérifiable en revue, pas une aspiration vague.
- [ ] Aucun principe ne duplique le contenu de [[DESIGN_SYSTEM_ARCHITECTURE.md]] ou [[DEFINITION_OF_DONE.md]] — vérifié par renvoi plutôt que répétition.
- [ ] La grille de revue (§10) est utilisable telle quelle sans interprétation supplémentaire.

---

## 12. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1) | UX Designer / Music Experience Designer |
| 0.1.1 | 2026-08-03 | Correction d'une référence de section erronée en §9 (renvoi vers PRODUCT_RULES.md §2 au lieu de §1), trouvée pendant l'auto-audit | UX Designer |

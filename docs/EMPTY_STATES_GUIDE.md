# EMPTY_STATES_GUIDE.md — Traitement des états vides (Phase 1, volume 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Motion Designer / Behavioural Designer
> **Documents liés** : [[EMPTY_STATES.md]], [[PRODUCT_VALUES.md]] §2, [[MOTION_GUIDELINES.md]]

> **Cadrage strict** : [[EMPTY_STATES.md]] reste la seule source de vérité pour la liste des états vides et leur message/action. Ce document ajoute la couche visuelle et rédactionnelle — illustration, ton, animation d'apparition — sans redécrire les cas déjà listés.

---

## 1. Principe d'illustration

Chaque état vide a une illustration simple et cohérente avec le reste du design system (pas une illustration décorative déconnectée) — elle renforce le message, ne le remplace jamais. Une illustration sans message serait aussi incomplète qu'un message sans action ([[UX_PRINCIPLES.md]] §5).

## 2. Ton rédactionnel

Conforme à [[PRODUCT_VALUES.md]] §2 — direct, jamais infantilisant. Un état vide n'est pas une occasion de faire de l'humour appuyé ou d'utiliser un ton exagérément enthousiaste (« Oups, rien ici ! 🎉 ») — le ton reste celui du produit partout, y compris dans ses creux.

**Exemples de calibrage** :
- ✅ « Votre bibliothèque apparaîtra ici dès que la synchronisation sera terminée. »
- ❌ « Oh non, c'est vide ici ! Ajoutez de la musique pour commencer l'aventure ! »

## 3. Animation d'apparition

Un état vide n'apparaît jamais instantanément à la place du contenu attendu — fondu discret (catégorie Micro, [[MOTION_GUIDELINES.md]] §1), jamais une animation qui attire l'attention sur l'absence de contenu de façon disproportionnée par rapport à son importance réelle.

## 4. Hiérarchie visuelle d'un état vide

Illustration (discrète, jamais dominante) → message (clair, une phrase) → action (un seul bouton principal, jamais plusieurs choix qui diluent la prochaine étape évidente).

## 5. Distinction visuelle des trois natures d'état vide

Rappel de [[EMPTY_STATES.md]] §10 : « pas encore de contenu », « aucun résultat pour ce filtre » et « fonctionnalité désactivée » sont trois natures différentes. Traitement visuel distinct :
- **Pas encore de contenu** : illustration neutre/positive, ton d'anticipation.
- **Aucun résultat pour ce filtre** : pas d'illustration dominante (l'action de réinitialisation prime), ton factuel.
- **Fonctionnalité désactivée** : illustration neutre, message qui pointe clairement vers le réglage concerné, jamais un ton qui culpabilise le choix de l'utilisateur d'avoir désactivé quelque chose ([[PRODUCT_RULES.md]] §10).

## 6. Cohérence entre familles d'écrans

Le même gabarit visuel (illustration + message + action) s'applique à tous les états vides listés dans [[EMPTY_STATES.md]] — aucune section de l'application ne développe son propre style d'état vide isolé, cohérent avec [[SCREEN_SPECIFICATIONS.md]] §7 (gabarits universels).

---

## 7. Checklist de validation

- [ ] Aucun cas de [[EMPTY_STATES.md]] n'est redécrit ici — uniquement son traitement visuel.
- [ ] Le ton reste cohérent avec [[PRODUCT_VALUES.md]] §2 sur tous les exemples.
- [ ] Les trois natures d'état vide restent visuellement distinctes partout où elles apparaissent.

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 3) | Motion Designer / Behavioural Designer |

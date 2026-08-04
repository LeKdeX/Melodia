# SYNC_SCREENS.md — Écrans de synchronisation (Phase 10)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / Audio Software Engineer
> **Documents liés** : [[SCREEN_SYSTEM.md]] §2, [[OFFLINE_SYSTEM.md]], [[ONBOARDING_COPY.md]] §3

> **Cadrage** : [[OFFLINE_SYSTEM.md]] a déjà spécifié détection, synchronisation, conflits. [[ONBOARDING_COPY.md]] §3 a déjà le texte d'import initial. Ce document assemble Logs (réellement nouveau) et clarifie la distinction entre synchronisation d'onboarding et synchronisation continue.

---

## 1. Présentation

Ce document couvre deux moments distincts, jamais confondus : l'import initial (unique, lors du premier lancement, [[ONBOARDING_SCREENS.md]]) et la synchronisation continue (récurrente, en arrière-plan, visible via l'indicateur de la TopBar).

## 2. Import (renvoi)

Voir [[ONBOARDING_SCREENS.md]] — écran d'onboarding, non redécrit ici.

## 3. Progress (synchronisation continue)

Indicateur discret dans la TopBar ([[TOPBAR_SPECIFICATION.md]] §4, [[OFFLINE_SYSTEM.md]] §3) — jamais un écran plein qui interromprait l'usage courant, cohérent avec [[MOTION_GUIDELINES.md]] §9 (la synchronisation doit rester presque invisible).

## 4. Conflicts (écran de résolution, si consultation explicite)

Accessible depuis une notification de conflit ([[OFFLINE_SYSTEM.md]] §6) — Main affiche l'élément concerné avant/après pour chaque version en conflit, action explicite « Conserver celle-ci » par élément, jamais une résolution automatique cachée à ce niveau de détail (l'automatique reste le défaut, cet écran est réservé à la consultation/correction après coup).

## 5. Updates

Notification standard ([[NOTIFICATION_LIBRARY.md]]) plutôt qu'un écran dédié — une mise à jour disponible ne justifie pas une page entière, cohérent avec [[UX_PRINCIPLES.md]] §3 (aucune interface inutile).

## 6. History (de synchronisation, distinct de l'historique de lecture/navigation)

Liste chronologique des événements de synchronisation (succès/échec/conflit résolu) — accessible depuis Logs (§7), pas un écran séparé supplémentaire.

## 7. Logs (nouveau)

Vue technique détaillée réservée au contexte développeur/support ([[SETTINGS_COMPONENTS.md]] Developer Panel) — Code Block ([[DISPLAY_COMPONENTS.md]] §8) listant les événements avec horodatage précis. Jamais affichée par défaut à un utilisateur non technique — accessible uniquement depuis Paramètres > Developer.

## 8. Status

Voir [[OFFLINE_SYSTEM.md]] §3 — indicateur déjà spécifié, non redécrit ici.

## 9. États et cas limites propres à l'assemblage

- **Aucun conflit jamais survenu** : écran Conflicts n'a simplement aucun point d'entrée visible — jamais un écran vide accessible pour rien.
- **Logs très volumineux** (usage prolongé) : liste virtualisée ([[PERFORMANCE_BUDGET.md]] §3), filtrage par période disponible.

## 10. Responsive

Écrans de ce document réservés desktop/tablette en priorité (contexte technique/support) — sur mobile, Logs reste accessible mais en liste simplifiée, jamais la priorité de conception principale.

---

## 11. Checklist de validation

- [ ] Import et synchronisation continue restent explicitement distincts (§1).
- [ ] Logs reste réservé au contexte développeur, jamais exposé par défaut.
- [ ] Aucun comportement de OFFLINE_SYSTEM.md n'est redécidé ici.

---

## 12. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 10) | Product Designer / Audio Software Engineer |

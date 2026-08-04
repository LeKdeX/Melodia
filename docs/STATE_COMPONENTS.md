# STATE_COMPONENTS.md — Composants d'état d'écran (Phase 6)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : QA Engineer / Product Designer
> **Documents liés** : [[COMPONENT_LIBRARY.md]], [[EMPTY_STATES_GUIDE.md]], [[ERROR_EXPERIENCE.md]], [[SKELETON_SYSTEM.md]]

> **Cadrage strict** : [[EMPTY_STATES.md]]/[[EMPTY_STATES_GUIDE.md]] et [[ERROR_STATES.md]]/[[ERROR_EXPERIENCE.md]] ont déjà défini le texte, le ton et les patterns UI de chaque état. Ce document documente uniquement l'anatomie de composant qui les porte tous — `Empty State` en profondeur complète, les huit autres en profondeur compacte avec renvoi systématique.

---

# Empty State (spécification complète)

## 1. Présentation

- **Objectif** : communiquer l'absence de contenu de façon claire et actionnable.
- **Contexte** : toute zone de contenu qui peut être vide (bibliothèque avant import, résultats filtrés, playlist vide).
- **Valeur utilisateur** : comprend immédiatement pourquoi rien ne s'affiche et ce qu'il peut faire.
- **Quand utiliser** : absence confirmée de contenu (distinct de Loading State, absence temporaire).
- **Quand ne pas utiliser** : pendant un chargement (utiliser Loading State/Skeleton).
- **Alternatives** : aucune redondante — les trois natures d'état vide ([[EMPTY_STATES_GUIDE.md]] §5) partagent ce même composant avec un contenu différent.

## 2. Anatomie

```
      [ Illustration, discrète ]
         Message (une phrase)
           [ Action principale ]
```

Illustration (jamais dominante, [[EMPTY_STATES_GUIDE.md]] §4), message (rôle Body), un seul bouton d'action principal — jamais plusieurs choix qui diluent la prochaine étape évidente.

## 3. Variantes

Pas encore de contenu, Aucun résultat pour ce filtre, Fonctionnalité désactivée — trois traitements visuels distincts déjà définis ([[EMPTY_STATES_GUIDE.md]] §5), ce composant les implémente sans les redéfinir.

## 4. États

N/A — Empty State est lui-même un état d'un composant parent (Grid, List, Search Results), pas un composant avec ses propres sous-états au-delà de son apparition/disparition (§8).

## 5. Responsive

Illustration réduite ou masquée sur petit écran si l'espace vertical est contraint, message et action toujours visibles en priorité ([[RESPONSIVE_GUIDE.md]] §7bis).

## 6. Accessibilité

Message annoncé au focus de la zone si elle devient vide après une interaction (ex. filtrage), jamais silencieux.

## 7. Design Tokens

Espacement généreux autour du contenu centré (marge section, [[SPACING_SYSTEM.md]] §3), illustration en taille `icon-xl` ou dédiée ([[ICONOGRAPHY_GUIDE.md]] §3).

## 8. Animations

Fondu discret à l'apparition, jamais instantané à la place du contenu attendu ([[EMPTY_STATES_GUIDE.md]] §3, catégorie Micro).

## 9. Bonnes pratiques

Ton direct, jamais infantilisant ([[EMPTY_STATES_GUIDE.md]] §2).

## 10. Anti-patterns

Illustration dominante qui écrase le message et l'action — l'illustration renforce, ne remplace jamais l'information ([[EMPTY_STATES_GUIDE.md]] §1).

## 11. Cas limites

Message très long (rare, une phrase maximum imposée en amont) : jamais tronqué, la contrainte de longueur est résolue à la rédaction, pas à l'affichage.

## 12. Performance

Composant statique, aucun coût de performance notable.

## 13. Tests

Visuel (trois variantes), accessibilité (annonce), contenu (aucun texte ne dépasse la longueur maximale, [[UX_WRITING_GUIDE.md]] §3).

---

# Composants compacts (renvoi systématique)

**Loading State** : voir [[SKELETON_SYSTEM.md]] pour l'anatomie par écran — ce composant est un conteneur qui bascule entre Skeleton, contenu réel et Empty State selon le résultat du chargement, jamais un composant visuel propre. **Offline State** : Banner persistante ([[ERROR_EXPERIENCE.md]] §2) + fonctionnalités dégradées listées explicitement, jamais un blocage total de l'application ([[ARCHITECTURE_PRINCIPLES.md]] §3). **Sync State** : indicateur discret et continu, voir [[MOTION_GUIDELINES.md]] §9 et [[VISUAL_FEEDBACK_GUIDE.md]] §3 — jamais de composant d'état plein écran. **Import State** : voir [[ONBOARDING_COPY.md]] §3, progression chiffrée qui s'incrémente. **Error State** : voir [[ERROR_EXPERIENCE.md]] §2-3 pour le choix de pattern (toast/snackbar/bannière/modale selon la gravité) — ce composant n'introduit aucun nouveau pattern, il compose ceux déjà définis. **Maintenance State** : Empty State variante « Fonctionnalité désactivée » appliquée à l'ensemble de l'écran plutôt qu'à une zone, utilisé si le serveur Jellyfin lui-même est en maintenance. **Upgrade State** : réservé à une future exigence de mise à jour obligatoire (aucune fonctionnalité de ce type engagée à ce jour, [[FEATURE_ROADMAP.md]]) — composé d'un Dialog non fermable si un jour requis, non spécifié davantage tant que non engagé. **First Launch State** : voir [[ONBOARDING_COPY.md]] §1, composition de Hero + action principale, pas un composant distinct d'Empty State dans son anatomie.

---

## Checklist de validation

- [ ] Empty State couvre les 13 sections en détail.
- [ ] Aucun des huit états compacts ne redécrit le texte/pattern déjà défini dans [[ERROR_EXPERIENCE.md]]/[[EMPTY_STATES_GUIDE.md]]/[[SKELETON_SYSTEM.md]].
- [ ] Upgrade State reste explicitement non engagé, jamais présenté comme une fonctionnalité livrée.

## Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 6) | QA Engineer / Product Designer |

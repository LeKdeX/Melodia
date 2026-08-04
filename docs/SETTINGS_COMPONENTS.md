# SETTINGS_COMPONENTS.md — Composants de paramètres (Phase 6)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : UX Engineer / Product Designer
> **Documents liés** : [[COMPONENT_LIBRARY.md]], [[SETTINGS_SPECIFICATION.md]], [[FORM_COMPONENTS.md]]

> **Cadrage** : [[SETTINGS_SPECIFICATION.md]] définit quels réglages existent. `Preference Row` est spécifié en profondeur complète — la primitive dont dérivent tous les autres composants de cette page.

---

# Preference Row (spécification complète)

## 1. Présentation

- **Objectif** : présenter un réglage individuel avec son libellé, sa description et son contrôle.
- **Contexte** : toute page de Paramètres.
- **Quand utiliser** : un réglage unique et autonome.
- **Quand ne pas utiliser** : un groupe de réglages liés qui nécessite un sous-écran dédié (utiliser Settings Section).
- **Alternatives** : aucune — c'est la primitive de base de toute la page Paramètres.

## 2. Anatomie

```
Libellé                              [Contrôle]
Description en une phrase (optionnel)
```

Libellé (rôle Label), description optionnelle (rôle Caption, une phrase maximum, [[UX_WRITING_GUIDE.md]] §3), contrôle aligné à droite (Switch/Select/Slider selon le type de réglage).

## 3. Variantes

Toggle Row (contrôle = Switch), Slider Row (contrôle = Slider), Select Row (contrôle = Select), Navigation Row (mène à un sous-écran, contrôle = chevron), Color Picker Row (contrôle = Color Picker, architecture seulement — voir [[FORM_COMPONENTS.md]]).

## 4. États

Default, Focus (sur le contrôle), Disabled (réglage indisponible selon le contexte — ex. réglage de cache indisponible hors ligne), Loading (rare, réglage qui dépend d'une valeur serveur).

## 5. Responsive

Largeur pleine sur mobile, largeur `container-md` centrée sur desktop ([[LAYOUT_SYSTEM.md]] §8).

## 6. Accessibilité

Libellé associé au contrôle via `for`/`id` ou groupement ARIA explicite — jamais un contrôle sans nom accessible qui obligerait à deviner le réglage concerné.

## 7. Design Tokens

Padding 16px vertical ([[SPACING_SYSTEM.md]] §1), séparateur `border-hairline` entre rows consécutives ([[LAYOUT_COMPONENTS.md]], Divider).

## 8. Animations

Changement de valeur : hérite de l'animation du contrôle utilisé (Switch, Slider — [[FORM_COMPONENTS.md]]), aucune animation propre à la Row elle-même.

## 9. Bonnes pratiques

Description uniquement quand le libellé seul est ambigu — ne jamais ajouter une description qui répète le libellé.

## 10. Anti-patterns

Contrôle qui nécessite un bouton de sauvegarde séparé — tout réglage s'applique immédiatement ([[UX_PRINCIPLES.md]] §1).

## 11. Cas limites

Description très longue : passe sur plusieurs lignes, jamais tronquée (une description de réglage doit rester compréhensible en entier).

## 12. Performance

Chaque Row ne re-render qu'à son propre changement de valeur, jamais toute la page de Paramètres.

## 13. Tests

Accessibilité (association libellé/contrôle), interaction (changement de valeur), unitaire (rendu par variante).

---

# Composants compacts

**Settings Sidebar** (variante de Sidebar limitée aux catégories de réglages, [[LAYOUT_COMPONENTS.md]]) · **Settings Category** (regroupement de haut niveau, ex. « Compte », « Lecture ») · **Settings Section** (Section, [[COMPOSING_RULES.md]] §2, regroupe plusieurs Preference Row liées) · **Settings Card** (variante de Card utilisée pour un résumé visuel, ex. carte de statut d'abonnement — Melodia n'ayant pas d'abonnement, réservée aux résumés de compte/serveur) · **Theme Selector** (grille de vignettes représentant chaque thème, [[THEMES_GUIDE.md]], sélection = Radio visuel) · **Server Selector** (liste de serveurs Jellyfin connectés, chacun avec statut de connexion par icône) · **Storage Indicator** (ProgressBar avec légende de répartition, [[FEEDBACK_COMPONENTS.md]]) · **Cache Manager** (liste + actions de suppression, chaque suppression passe par Dialog, [[DIALOG_LIBRARY.md]] §5) · **Developer Panel / Labs Panel** (Settings Section réservée aux réglages avancés/expérimentaux, toujours désactivée par défaut, jamais activée automatiquement).

---

## Checklist de validation

- [ ] Preference Row couvre les 13 sections en détail.
- [ ] Chaque variante de Row a un contrôle assigné explicitement, cohérent avec [[FORM_COMPONENTS.md]].
- [ ] Aucun réglage documenté ici ne redécide ce qui existe déjà dans [[SETTINGS_SPECIFICATION.md]].

## Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 6) | UX Engineer / Product Designer |

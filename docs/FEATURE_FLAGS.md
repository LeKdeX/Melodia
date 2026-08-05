# FEATURE_FLAGS.md — Architecture des fonctionnalités expérimentales (Phase 11)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal Platform Architect / Senior Product Designer
> **Documents liés** : [[SETTINGS_SYSTEM.md]] §10, [[SETTINGS_COMPONENTS.md]] (Labs Panel), [[FEATURE_ROADMAP.md]]

> **Cadrage** : Labs Panel ([[SETTINGS_COMPONENTS.md]]) est déjà la surface utilisateur — ce document définit l'architecture qui la rend possible : comment une fonctionnalité entre et sort du statut expérimental.

---

## 1. Cycle de vie d'un feature flag

```
Développement interne → Labs (opt-in explicite) → Stable (par défaut, flag retiré) → [ou] Abandonné (retiré sans passage en Stable)
```

Une fonctionnalité n'atteint jamais le statut Stable sans être passée par Labs au moins une version — jamais une fonctionnalité qui apparaît directement activée par défaut sans phase d'observation, cohérent avec la prudence déjà actée pour les changements de comportement produit ([[ENGINEERING_MANIFESTO.md]]).

## 2. Activation

Toggle Row individuel par fonctionnalité ([[SETTINGS_COMPONENTS.md]], Labs Panel) — jamais un interrupteur global « activer toutes les fonctionnalités expérimentales », qui empêcherait l'utilisateur de choisir précisément ce qu'il accepte de tester. Chaque flag activé porte un avertissement explicite de statut non stabilisé ([[SCREEN_SPECIFICATIONS.md]] §6, déjà acté).

## 3. Désactivation

Immédiate, sans perte de données produites pendant l'activation si raisonnablement possible (ex. une playlist créée via une fonctionnalité expérimentale de génération reste une playlist normale après désactivation du flag) — jamais une désactivation qui supprimerait silencieusement du contenu créé par l'utilisateur.

## 4. Version bêta (canal, distinct d'un flag individuel)

**Préparation, non engagée** : un canal de distribution bêta permettrait de recevoir des fonctionnalités expérimentales groupées avant le grand public — dépend d'une décision de canal de distribution non tranchée ([[UPDATE_SYSTEM.md]] §1). Si engagé, resterait un choix explicite distinct de l'activation individuelle de flags (§2) : un utilisateur pourrait être sur le canal stable et activer un flag Labs individuel, les deux mécanismes restant indépendants.

## 5. Préférences

Les flags activés sont propres à l'appareil (préférence locale, [[DATA_LAYER.md]]), jamais synchronisés entre appareils via le compte Jellyfin — un flag expérimental activé sur un appareil n'apparaît pas automatiquement activé sur un autre, cohérent avec le statut non stabilisé qui justifie une activation consciente à chaque contexte.

## 6. Gouvernance — retrait d'un flag

Un flag retiré (fonctionnalité passée en Stable ou abandonnée) disparaît de Labs à la mise à jour suivante — si abandonnée, toute donnée produite exclusivement par cette fonctionnalité est signalée à l'utilisateur avant suppression (jamais silencieusement effacée), cohérent avec [[SYSTEM_CHECKLIST.md]] pour la validation de ce cas avant tout retrait en production.

## 6bis. Migration de schéma à la stabilisation (ajout Engineering Handbook)

Distinct du retrait de flag lui-même (§6, déjà acté) : si une fonctionnalité expérimentale a introduit une forme de données propre pendant sa phase Labs (ex. un champ `experimental_*` dans `LocalStore`), son passage en Stable suit une migration de schéma standard ([[DATABASE_SCHEMA.md]] §5) — jamais un champ `experimental_*` qui perdure indéfiniment en production après stabilisation. La migration est écrite avant le retrait du flag, jamais après, pour qu'aucune fenêtre de données incohérentes n'existe entre les deux versions.

## 7. Accessibilité

Chaque Toggle Row de Labs suit exactement le contrat d'accessibilité déjà défini pour ce composant ([[SETTINGS_COMPONENTS.md]]) — aucune exception pour les fonctionnalités expérimentales, l'accessibilité n'est jamais elle-même optionnelle ([[FOUNDATIONS.md]] §7).

---

## 8. Checklist de validation

- [ ] Toute fonctionnalité Stable est passée par Labs au moins une version (§1).
- [ ] Aucune désactivation de flag ne supprime silencieusement du contenu créé par l'utilisateur (§3).
- [ ] Le canal bêta (§4) reste explicitement non engagé, jamais présenté comme disponible.

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 11) | Principal Platform Architect / Senior Product Designer |
| 0.2.0 | 2026-08-04 | Engineering Handbook : ajout §6bis (migration de schéma à la stabilisation) — au lieu de créer FEATURE_FLAGS_GUIDE.md en doublon (migration et suppression déjà couvertes §1 et §6) | Principal Platform Architect |

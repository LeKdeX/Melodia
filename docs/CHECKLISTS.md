# CHECKLISTS.md — Checklists opérationnelles (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Engineering Manager
> **Documents liés** : [[DEFINITION_OF_DONE.md]], [[GIT_WORKFLOW.md]], [[SECURITY_GUIDE.md]], [[ADR_TEMPLATE.md]]

Checklists **opérationnelles**, ponctuelles et non liées à une fonctionnalité précise — à distinguer de [[DEFINITION_OF_DONE.md]] (checklist répétée à chaque fonctionnalité) et de [[QUALITY_GATES.md]] (gates automatisés en CI).

---

## 1. Checklist d'onboarding contributeur

- [ ] Lu [[PROJECT_CHARTER.md]] (vision, périmètre, ce que Melodia n'est pas).
- [ ] Lu [[ENGINEERING_GUIDE.md]] et [[ENGINEERING_MANIFESTO.md]] (principes et anti-patterns).
- [ ] Dépôt cloné, monorepo installé (`pnpm install`), build local réussi sur `apps/web`.
- [ ] Premier test unitaire lancé avec succès en local (`pnpm test`).
- [ ] A lu [[GIT_WORKFLOW.md]] avant sa première branche/PR.
- [ ] Sait où trouver la carte documentaire complète ([[DOCUMENTATION_GUIDE.md]] §1).

## 2. Checklist de release

- [ ] Tous les gates de [[QUALITY_GATES.md]] §1 et §2 verts.
- [ ] `CHANGELOG.md` généré et relu (pas de ligne incompréhensible issue d'un commit mal formé).
- [ ] Rotation/validité des secrets de signature vérifiée ([[SECURITY_GUIDE.md]] §3).
- [ ] Revue de sécurité effectuée si la release touche authentification/jetons/permissions natives ([[SECURITY_GUIDE.md]] §5).
- [ ] Audit d'accessibilité manuel effectué si release mineure/majeure ([[DEFINITION_OF_DONE.md]]).
- [ ] Artefacts Desktop/Mobile testés manuellement sur au moins un appareil réel par OS supporté ([[TECH_STACK.md]] §2).
- [ ] `docs/` relu pour cohérence si la release introduit un changement structurant ([[PROJECT_CHARTER.md]] §7).
- [ ] Entrée ajoutée au « Journal de phase » de `CLAUDE.md` si la release clôture une phase de [[ROADMAP.md]].

## 3. Checklist de rédaction d'un nouvel ADR

- [ ] La décision est bien structurante au sens d'[[ADR_TEMPLATE.md]] §1 (sinon, pas d'ADR nécessaire).
- [ ] Alternatives réellement comparées (pas une liste à une seule option déguisée en comparaison).
- [ ] Document(s) fondateur(s) impacté(s) identifié(s) et mis à jour dans la même PR.
- [ ] Contradiction avec un document existant signalée explicitement si applicable ([[DOCUMENTATION_GUIDE.md]] §5).
- [ ] Revue par une personne ayant l'autorité technique sur la zone concernée.

## 4. Checklist de revue de sécurité

- [ ] Aucun secret en clair introduit (vérifié au-delà du scan automatisé, lecture manuelle du diff).
- [ ] Toute nouvelle entrée externe validée par schéma ([[SECURITY_GUIDELINES.md]] §6).
- [ ] Toute nouvelle commande Tauri (`invoke`) validée côté Rust, pas seulement côté frontend ([[SECURITY_GUIDE.md]] §4).
- [ ] Permissions Tauri ajoutées justifiées explicitement dans la description de PR.
- [ ] CSP non affaiblie sans justification documentée ([[SECURITY_GUIDE.md]] §1).

## 5. Checklist de fin de phase (voir [[ROADMAP.md]])

- [ ] Critère de sortie de phase (défini dans [[ROADMAP.md]]) vérifié factuellement, pas supposé.
- [ ] Auto-revue critique de la documentation concernée effectuée (incohérences, décisions insuffisamment justifiées).
- [ ] `CLAUDE.md` mis à jour (section Journal de phase) avec l'état réel du dépôt, pas un résumé marketing.
- [ ] Dette technique accumulée pendant la phase revue et priorisée pour la phase suivante ([[ENGINEERING_GUIDE.md]] §3.5).

---

## 6. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | Engineering Manager |

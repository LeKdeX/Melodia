# FOUNDATIONS.md — Constitution du Design System (Phase 5)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Principal Design System Architect
> **Documents liés** : [[DESIGN_SYSTEM.md]], [[ENGINEERING_MANIFESTO.md]], [[UX_PRINCIPLES.md]]

> **Cadrage** : ce document pose les principes qui gouvernent toute décision future du Design System — il ne redécide aucune valeur déjà actée (couleur, typographie, espacement), il explique pourquoi ces valeurs sont structurées comme elles le sont et comment trancher un cas non encore couvert.

---

## 1. La cohérence avant l'originalité

Un composant qui ressemble aux autres composants de Melodia est toujours préférable à un composant plus « intéressant » mais isolé. L'originalité de Melodia se joue au niveau du système dans son ensemble (voir [[VISUAL_DIRECTION.md]]), jamais au niveau d'un composant individuel qui s'écarterait du système pour se faire remarquer.

## 2. La simplicité avant la complexité

Un composant qui répond au besoin avec le moins de variantes possible est toujours préférable à un composant riche en options rarement utilisées. Chaque variante ajoutée à un composant est une charge de maintenance permanente — cohérent avec [[ENGINEERING_MANIFESTO.md]] §2 (pas d'abstraction pour un besoin hypothétique).

## 3. Les composants sont composables

Un composant du Design System résout un seul problème et s'assemble avec d'autres pour en résoudre un plus grand — jamais un composant monolithique qui duplique en interne la logique d'un autre composant déjà existant. Voir [[COMPOSING_RULES.md]] pour les patterns de composition officiels.

## 4. Les Design Tokens sont la seule source de vérité

Toute valeur visuelle (couleur, espacement, rayon, ombre, durée) provient d'un token nommé ([[DESIGN_TOKENS.md]]), jamais d'une valeur écrite directement dans un composant. Un token qui n'existe pas encore pour un besoin réel est ajouté au système ([[DESIGN_TOKENS.md]] §6, gouvernance) — il n'est jamais contourné par une valeur locale « en attendant ».

## 5. Aucune valeur arbitraire

Toute valeur qui entre dans le système (nouvelle couleur, nouvel espacement, nouvelle durée) doit être justifiée par un raisonnement explicite, pas par une préférence isolée — cohérent avec la règle déjà actée dans `CLAUDE.md` (« aucune décision arbitraire ») et appliquée à chaque document visuel depuis la Phase 2 ([[COLOR_SYSTEM.md]], [[TYPOGRAPHY_GUIDE.md]]).

## 6. Aucun style local

Un composant ou une feature de `@melodia/app` n'écrit jamais de style qui contourne le Design System (classe utilitaire ponctuelle avec une valeur hors échelle, style inline) — cohérent avec [[DESIGN_SYSTEM_ARCHITECTURE.md]] §1 (tokens vivant uniquement dans `packages/ui/src/tokens/`). Un besoin visuel non couvert par le système actuel est un signal pour étendre le système, jamais une justification pour le contourner localement.

## 7. L'accessibilité n'est pas une option

Un composant sans accessibilité résolue n'est pas un composant incomplet, c'est un composant qui ne fait pas partie du Design System — cohérent avec [[DESIGN_SYSTEM_ARCHITECTURE.md]] §5 (props d'accessibilité obligatoires au niveau du type) et [[PROJECT_CHARTER.md]] §3.6.

## 8. Le système évolue, il ne se casse jamais silencieusement

Toute modification d'un token ou d'un composant déjà consommé suit la procédure de gouvernance déjà définie ([[DESIGN_TOKENS.md]] §6) — jamais un changement qui modifie silencieusement l'apparence ou le comportement d'un écran existant sans que ce changement soit tracé et intentionnel.

## 9. Comment trancher un cas non couvert

Face à une décision non couverte par ce document ou par un document plus spécifique du Design System, l'ordre de résolution est : 1) le principe le plus proche déjà énoncé ci-dessus prime ; 2) en cas d'ambiguïté persistante, la cohérence avec un composant existant similaire prime sur une solution nouvelle ; 3) si aucun précédent n'existe, la décision est documentée comme un nouveau précédent (ADR si elle introduit une catégorie ou une échelle nouvelle, [[ADR_TEMPLATE.md]]) plutôt que tranchée silencieusement.

---

## 10. Checklist de validation

- [ ] Chaque principe est formulé de façon actionnable, pas seulement aspirationnelle.
- [ ] Aucun principe ne contredit [[ENGINEERING_MANIFESTO.md]] ou [[UX_PRINCIPLES.md]].
- [ ] La procédure de résolution d'un cas non couvert (§9) est utilisable telle quelle en revue de code/design.

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 5) | Principal Design System Architect |

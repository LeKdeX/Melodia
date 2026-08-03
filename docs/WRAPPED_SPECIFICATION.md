# WRAPPED_SPECIFICATION.md — Spécification « Wrapped » local (Phase 1, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Spotify Product Designer / Music Experience Designer
> **Documents liés** : [[STATISTICS_SPECIFICATION.md]], [[PRODUCT_RULES.md]] §10, [[PRODUCT_VALUES.md]]

> **Cadrage** : ce document ne redéfinit pas la collecte de données — elle est spécifiée une seule fois dans [[STATISTICS_SPECIFICATION.md]] §2. Wrapped en est une mise en forme narrative et visuelle, entièrement locale, jamais transmise à un serveur.

---

## 1. Objectif et positionnement

Reprendre ce que Spotify Wrapped a de mieux — un moment annuel de reconnaissance de ses propres goûts, visuellement soigné et partageable — sans aucune des tensions que Melodia refuse : pas de collecte pour un tiers, pas de comparaison sociale imposée, pas de pression à partager (cohérent avec [[COMPETITIVE_ANALYSIS.md]] §3, ce qu'on évite de Spotify).

## 2. Contenu

| Section | Source |
|---|---|
| Top morceaux | [[STATISTICS_SPECIFICATION.md]] §3, classement par temps d'écoute cumulé sur la période |
| Top artistes | Idem |
| Top albums | Idem |
| Genres dominants | Agrégation des genres écoutés sur la période |
| Évolution | Comparaison avec la période précédente (ex. cette année vs l'année dernière) si l'historique le permet |
| Temps d'écoute total | Cumulé sur la période, mis en perspective de façon positive (jamais culpabilisante, ni dans un sens ni dans l'autre — beaucoup ou peu d'écoute sont également valides) |
| Moments marquants | Ex. le jour avec le plus d'écoute, la découverte la plus rejouée — calculés, jamais inventés si la donnée est insuffisante (voir §5) |

## 3. Cartes partageables

- Génération d'images statiques (format réseau social standard) composées localement, sans service tiers de génération d'image.
- Le partage est une action **explicitement déclenchée par l'utilisateur** — aucune carte n'est générée ou proposée automatiquement de façon insistante (cohérent avec [[PRODUCT_RULES.md]] §10, la donnée ne quitte l'appareil que sur action explicite).
- Le contenu exact de la carte est visible et modifiable avant tout partage — jamais un partage à l'aveugle.

## 4. Animations premium

Séquence de révélation animée (carte par carte), cohérente avec les principes d'animation du produit ([[UX_PRINCIPLES.md]] §2) — chaque animation communique une progression, jamais un simple effet gratuit. Respect strict de `prefers-reduced-motion`.

## 5. États

- Historique insuffisant pour une période donnée (utilisateur récent) : Wrapped explicitement indisponible avec explication, jamais généré avec des données insuffisantes présentées comme significatives — cohérent avec la règle d'honnêteté du produit.
- Historique désactivé ([[PRODUCT_RULES.md]] §10) : Wrapped indisponible avec accès direct à l'activation de l'historique, jamais une fonctionnalité qui semble buguée.

## 6. Fréquence

Rétrospective annuelle par défaut (l'esprit de la fonctionnalité), avec possibilité d'une rétrospective sur une période personnalisée (mensuelle, sur les 30 derniers jours) — flexibilité que Spotify Wrapped n'offre pas, différenciation identifiée en [[FEATURE_ROADMAP.md]].

---

## 7. Checklist de validation

- [ ] Aucune donnée de Wrapped n'est envoyée à un serveur, y compris lors du partage (l'image est générée et partagée localement par l'utilisateur, pas par un service Melodia).
- [ ] Aucune carte ou rétrospective n'est générée avec des données insuffisantes sans le signaler.
- [ ] Le partage reste une action explicite à chaque fois, jamais un défaut ou une insistance.

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 2) | Spotify Product Designer / Music Experience Designer |

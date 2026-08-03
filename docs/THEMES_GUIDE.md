# THEMES_GUIDE.md — Expériences de thème (Phase 2, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Senior Visual Designer / Creative Director
> **Documents liés** : [[COLOR_SYSTEM.md]] §6, [[SETTINGS_SPECIFICATION.md]] §3, [[PLAYER_SPECIFICATION.md]] §4

> **Cadrage** : [[COLOR_SYSTEM.md]] §6 a déjà défini les *valeurs* de chaque thème. Ce document définit l'*expérience* — quand et pourquoi un utilisateur choisit chaque thème, pas les couleurs elles-mêmes.

---

## 1. Classic (Light / Dark automatiques)

Le thème par défaut, celui que rencontre tout nouvel utilisateur ([[ONBOARDING_GUIDE.md]] §6) — suit la préférence système, jamais un choix imposé au premier lancement.

## 2. Premium (dénomination interne pour Dark affiné)

Il ne s'agit pas d'un thème payant ou réservé — le nom désigne en interne le soin apporté au thème sombre (contrastes affinés, teintes chaudes plutôt que grises pures, [[COLOR_SYSTEM.md]] §2) car c'est le thème le plus utilisé en contexte d'écoute prolongée le soir. Nom d'affichage utilisateur : « Sombre », jamais « Premium » (cohérent avec [[VOCABULARY.md]] §5, aucun vocabulaire qui suggérerait une fonctionnalité payante inexistante).

## 3. OLED

Pour les utilisateurs d'écrans OLED (mobile principalement) recherchant l'économie d'énergie et le contraste maximal — noir pur plutôt que le bleu-noir désaturé du thème Dark standard ([[COLOR_SYSTEM.md]] §6).

## 4. Minimal

Réduction de toute couleur d'accent non essentielle — les contrôles restent fonctionnels mais visuellement estompés jusqu'à interaction (hover/focus). Pensé pour l'utilisateur qui veut que seule sa musique (pochette, palette dynamique) porte la couleur de l'écran.

## 5. Focus

Variante qui masque les éléments de navigation secondaires (statistiques, découverte) pour ne laisser que le lecteur et la vue courante — usage recommandé pendant le travail ([[PERSONAS.md]] §7, [[USER_FLOWS.md]] §10, flux « Mode Focus »).

## 6. Night

Variante Dark avec luminosité globale réduite et température de couleur plus chaude (moins de bleu) — pensé pour une écoute tardive, cohérent avec le respect du rythme visuel de l'utilisateur plutôt qu'un simple argument marketing.

## 7. Dynamic Album / Dynamic Artist

Voir [[COLOR_SYSTEM.md]] §6 pour les règles de garde-fou de contraste — ces deux thèmes ne remplacent jamais Classic/Dark/OLED/Minimal/Focus/Night globalement, ils s'appliquent uniquement à la zone du lecteur/de la page artiste en cours.

## 8. Différences, usages et contraintes

| Thème | Usage recommandé | Contrainte |
|---|---|---|
| Classic | Défaut, tout utilisateur | Aucune |
| Sombre (« Premium ») | Écoute en soirée, faible luminosité ambiante | Aucune |
| OLED | Mobile, économie d'énergie | Nécessite un écran OLED pour le bénéfice réel, mais reste sélectionnable partout |
| Minimal | Utilisateur qui préfère une interface neutre | Réduit la distinction visuelle des états (favoris, actifs) — compensé par des indicateurs non colorés (icônes, position) |
| Focus | Sessions de travail | Masque des sections — jamais des fonctionnalités, seulement leur accès direct depuis la navigation principale |
| Night | Écoute tardive | Aucune |
| Dynamic Album/Artist | Immersion pendant l'écoute | Désactivable indépendamment, repli automatique garanti ([[COLOR_SYSTEM.md]] §7) |

## 9. Règle de changement de thème

Le changement de thème est instantané, sans rechargement, sans animation de transition longue (catégorie Micro, [[MOTION_GUIDELINES.md]] §1) — un changement de thème n'est jamais un moment de friction.

---

## 10. Checklist de validation

- [ ] Les 8 thèmes demandés dans le cadrage sont tous couverts.
- [ ] Aucun nom de thème n'induit une fausse notion de fonctionnalité payante ([[VOCABULARY.md]] §5).
- [ ] Chaque thème a un usage recommandé et une contrainte explicite, pas seulement une description esthétique.

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 2, volume 2) | Senior Visual Designer / Creative Director |

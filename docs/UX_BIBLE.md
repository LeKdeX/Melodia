# UX_BIBLE.md — Bible de l'expérience utilisateur (synthèse Phase 1, volume 3)

> **Statut** : document fondateur, vivant — document de synthèse, ne fait pas autorité seul
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Senior UX Designer / Principal Interaction Designer
> **Documents liés** : [[PRODUCT_BIBLE.md]] (volume 1), [[FEATURE_BIBLE.md]] (volume 2), tous les documents ci-dessous

Point d'entrée unique pour l'expérience utilisateur précise de Melodia. Complète [[PRODUCT_BIBLE.md]] (le *pourquoi*) et [[FEATURE_BIBLE.md]] (le *quoi*) avec le *comment ça se vit* — écran par écran, interaction par interaction, animation par animation. **Ne fait pas autorité par lui-même** : le document source gagne toujours en cas d'écart.

---

## 1. Philosophie UX (rappel condensé, détail dans [[UX_PRINCIPLES.md]])

Chaque interaction a une réponse visuelle. La musique n'est jamais interrompue par la navigation. Le lecteur reste toujours accessible. L'utilisateur n'est jamais perdu. Les animations expliquent l'interface, jamais ne la ralentissent. Les actions importantes sont réversibles. Le nombre d'actions pour atteindre un objectif est réduit au minimum — vérifié concrètement dans [[USER_FLOWS.md]] (108 flux catalogués, plus des deux tiers en une seule action).

## 2. Carte des documents du volume 3

| Document | Répond à la question |
|---|---|
| [[USER_FLOWS.md]] | Quelles sont les actions atomiques possibles, et combien coûtent-elles en effort ? |
| [[SCREEN_SPECIFICATIONS.md]] | Que contient chaque écran, dans quel ordre, dans quel état ? |
| [[NAVIGATION_GUIDE.md]] | Comment se déplace-t-on dans le produit, quelle que soit la méthode d'entrée ? |
| [[INTERACTION_GUIDELINES.md]] | Quel geste/raccourci déclenche quelle action, et pourquoi ce choix précis ? |
| [[MOTION_GUIDELINES.md]] | Quelle durée, quelle courbe, pour quelle animation ? |
| [[RESPONSIVE_GUIDE.md]] | Comment le produit s'adapte-t-il sans jamais retirer de fonctionnalité ? |
| [[ACCESSIBILITY_GUIDE.md]] | Comment la même expérience reste-t-elle pleinement utilisable sans souris, sans vue, avec des animations réduites ? |
| [[ONBOARDING_GUIDE.md]] | Comment un nouvel utilisateur arrive-t-il à sa musique le plus vite possible ? |
| [[ERROR_EXPERIENCE.md]] | Quel pattern d'interface (toast/snackbar/bannière/modale) pour quelle situation ? |
| [[EMPTY_STATES_GUIDE.md]] | Quel traitement visuel et rédactionnel pour un écran sans contenu ? |
| [[WIREFRAMES_FUNCTIONAL.md]] | Quelle disposition spatiale, en desktop et en mobile ? |

## 3. Les cinq invariants UX qui traversent tout le volume

1. **Rien n'interrompt la musique** — vérifié explicitement dans [[SCREEN_SPECIFICATIONS.md]] (le lecteur n'est jamais un nœud de navigation qui pourrait disparaître), [[ERROR_EXPERIENCE.md]] (aucune erreur de lecture ne dépasse un toast bref), [[MOTION_GUIDELINES.md]] (aucune animation sur le chemin critique au-delà de 250 ms).
2. **Aucune fonctionnalité n'est retirée par la taille d'écran** — seule la densité change ([[RESPONSIVE_GUIDE.md]] §2).
3. **Tout ce qui est possible à la souris/au tactile est possible au clavier** — sans exception ([[ACCESSIBILITY_GUIDE.md]] §1).
4. **Un état vide n'est jamais un état d'erreur, et inversement** — deux traitements visuels et rédactionnels distincts ([[EMPTY_STATES_GUIDE.md]] vs [[ERROR_EXPERIENCE.md]]).
5. **Aucune animation n'est décorative** — chaque durée et courbe de [[MOTION_GUIDELINES.md]] a une justification fonctionnelle, jamais esthétique seule.

## 4. Comparaison systématique avec le marché (auto-revue de ce volume)

| Domaine UX | Référence la plus forte | Position de Melodia |
|---|---|---|
| Continuité du lecteur pendant la navigation | Plexamp, Apple Music | Équivalent, formalisé comme règle non négociable ([[PRODUCT_RULES.md]] §2), pas seulement une bonne pratique |
| Vitesse perçue de la recherche | Spotify | Budget identique (< 100 ms), animation volontairement minimale pour ne pas ralentir la perception ([[MOTION_GUIDELINES.md]] §11) |
| Richesse des transitions et de la pochette dynamique | Plexamp | Comportement équivalent ([[PLAYER_SPECIFICATION.md]] §4, [[MOTION_GUIDELINES.md]] §6), sans dépendance Plex |
| Accessibilité | Apple Music | Ambition égale (WCAG AA non négociable, AAA visé), patterns ARIA explicites documentés composant par composant ([[ACCESSIBILITY_GUIDE.md]] §8) — plus explicite que ce qui est publiquement documenté par la plupart des concurrents analysés |
| Onboarding | Spotify, Apple Music | Séquence plus courte par conception — aucune étape non essentielle ne retarde l'arrivée dans la bibliothèque ([[ONBOARDING_GUIDE.md]] §2) |
| Gestion des erreurs | Aucun concurrent analysé ne documente publiquement une taxonomie de patterns aussi explicite | Différenciation par la rigueur du processus, pas seulement le résultat visible |

**Aucune lacune UX majeure identifiée** par rapport aux neuf produits comparés dans [[COMPETITIVE_ANALYSIS.md]] et [[FEATURE_ROADMAP.md]] §4 — ce volume ajoute la précision d'exécution qui manquait aux deux précédents.

## 5. Décisions UX encore ouvertes (consolidées)

- Détection automatique de serveur au premier lancement ([[ONBOARDING_GUIDE.md]] §3) — non engagée techniquement.
- Comportement précis du panneau latéral persistant du lecteur en tablette paysage ([[RESPONSIVE_GUIDE.md]] §4) — direction posée, détail d'implémentation à affiner.
- Fréquence exacte d'apparition des conseils contextuels d'onboarding — principe posé (une seule fois, jamais bloquant), calendrier précis non défini.

## 6. Ce que ce volume ne contient toujours pas

Aucune identité visuelle (`BRAND_BIBLE.md` toujours différé — les valeurs de couleur/typographie utilisées dans ce volume, quand mentionnées, restent au niveau du token/de la fonction, jamais une valeur hexadécimale ou une police choisie), aucune maquette graphique (les wireframes de [[WIREFRAMES_FUNCTIONAL.md]] restent textuels par conception), aucune navigation télécommande spécifiée ([[NAVIGATION_GUIDE.md]] §7).

---

## 7. Checklist de validation

- [ ] Les cinq invariants UX (§3) ne sont contredits par aucun document individuel du volume.
- [ ] Aucune valeur de couleur/typographie concrète n'a été introduite malgré la profondeur de ce volume — vérifié explicitement contre le différé de `BRAND_BIBLE.md`.
- [ ] Chaque document du volume a sa propre checklist déjà vérifiée.

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 3) | Senior UX Designer / Principal Interaction Designer |

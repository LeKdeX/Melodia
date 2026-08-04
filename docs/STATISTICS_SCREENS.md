# STATISTICS_SCREENS.md — Écrans de statistiques (Phase 10)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / Senior Product Manager
> **Documents liés** : [[SCREEN_SYSTEM.md]] §2, [[STATISTICS_SPECIFICATION.md]], [[WRAPPED_SPECIFICATION.md]], [[LIBRARY_COMPONENTS.md]]

> **Cadrage** : [[STATISTICS_SPECIFICATION.md]] §3 a déjà défini le contenu du tableau de bord, [[LIBRARY_COMPONENTS.md]] les composants (Statistics Cards, Charts, Heatmap, Wrapped Cards). Ce document assemble ces éléments en un écran unique à sections.

---

## 1. Présentation

Écran unique et modulaire (jamais fragmenté en plusieurs pages par période) — chaque section correspond à une ligne du tableau de bord déjà spécifié ([[STATISTICS_SPECIFICATION.md]] §3).

## 2. Composition

```
[TopBar — titre "Statistiques" + sélecteur de période (Semaine/Mois/Année)]
[Main]
├─ Listening Time — Statistics Card + Charts (courbe temporelle)
├─ Top Artists / Top Albums / Top Tracks — trois Grid horizontales de Statistics Cards
├─ Heatmap — activité quotidienne/horaire, [[LIBRARY_COMPONENTS.md]]
├─ Achievements — Grid de badges de jalon, [[STATISTICS_SPECIFICATION.md]] §3 (Badges)
└─ Accès Wrapped — Card d'entrée vers la séquence Wrapped, condition période annuelle disponible
[Mini Player — persistant]
```

## 3. Weekly / Monthly / Yearly

Un seul écran, contenu recalculé selon le sélecteur de période (TopBar) — jamais trois écrans séparés qui dupliqueraient la même composition avec seulement la donnée source qui change.

## 4. Wrapped (écran séparé, accessible depuis §2)

Séquence de cartes plein écran distincte de cet écran de tableau de bord ([[WRAPPED_SPECIFICATION.md]] §3-4) — ce document n'assemble que le point d'entrée (Card), la séquence elle-même reste hors gabarit standard (déjà signalé comme exception d'animation, [[LIBRARY_COMPONENTS.md]]).

## 5. Achievements (assemblage, terminologie du cadrage)

**Fusion terminologique** : « Achievements » désigne les « Badges » déjà spécifiés ([[STATISTICS_SPECIFICATION.md]] §3, « reconnaissance discrète de jalons ») — même contenu, nom du cadrage Phase 10 aligné ici sans redéfinir le comportement déjà acté (jamais de mécanique de notification insistante).

## 6. États et cas limites propres à l'assemblage

- **Historique désactivé** : tout l'écran est remplacé par l'explication déjà définie ([[STATISTICS_SPECIFICATION.md]] §4), jamais un tableau de bord partiel avec des sections vides.
- **Historique récent** (premiers jours) : chaque section reste affichée avec la mention de période courte déjà actée, Wrapped explicitement indisponible avec explication ([[WRAPPED_SPECIFICATION.md]] §5).
- **Aucun jalon atteint encore** : section Achievements masquée entièrement, jamais affichée vide.

## 7. Responsive

Voir [[RESPONSIVE_LAYOUTS.md]]. Mobile : Top Artists/Albums/Tracks passent en défilement horizontal par bloc (identique au traitement Accueil, [[HOME_SCREEN.md]] §4), Heatmap adapte sa densité de cellules à la largeur disponible sans perdre de granularité temporelle (réorganisation en grille plus haute et moins large plutôt qu'un survol nécessaire).

---

## 8. Checklist de validation

- [ ] Weekly/Monthly/Yearly restent un seul écran paramétré, jamais trois pages dupliquées.
- [ ] Achievements reste explicitement la même donnée que les Badges déjà spécifiés, jamais un second système.
- [ ] Aucun jugement de comparaison sociale n'apparaît sur cet écran, cohérent avec [[STATISTICS_SPECIFICATION.md]] §1.

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 10) | Product Designer / Senior Product Manager |

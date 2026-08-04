# LYRICS_SYSTEM.md — Système de paroles (Phase 9)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Senior Audio UX Engineer / Principal Music Experience Designer
> **Documents liés** : [[PLAYER_SPECIFICATION.md]] §6, [[PLAYER_EXPERIENCE.md]] §10, [[ACCESSIBILITY_GUIDE.md]] §9bis

> **Cadrage** : [[PLAYER_SPECIFICATION.md]] §6 a posé l'architecture (dépendance non résolue sur la source de données) et la liste de fonctionnalités prévues sans les détailler. [[PLAYER_EXPERIENCE.md]] §10 a défini la chorégraphie de défilement. Ce document approfondit chaque fonctionnalité annoncée sans en engager la disponibilité — toujours sujette à la dépendance de source de données déjà signalée.

---

## 1. Statut de dépendance (rappel)

Toute fonctionnalité de ce document dépend de la disponibilité de paroles via Jellyfin ou une source tierce à déterminer ([[PLAYER_SPECIFICATION.md]] §6) — non résolue à ce jour. Ce document spécifie le comportement *si* des paroles sont disponibles, jamais une promesse de leur disponibilité universelle.

## 2. Paroles synchronisées (Synced Lyrics)

Format ligne-par-ligne avec horodatage. La ligne active suit la position de lecture avec un contraste progressif (jamais un saut binaire actif/inactif, [[PLAYER_EXPERIENCE.md]] §10) — la transition entre deux lignes dure la catégorie Micro, jamais instantanée ni trop lente pour rester perceptible comme un suivi fluide.

## 3. Paroles non synchronisées (Unsynced Lyrics)

Texte statique complet, sans mise en évidence de ligne — utilisé quand seule une source non horodatée est disponible. **Anatomie identique** à la version synchronisée moins le surlignage — jamais une mise en page différente qui surprendrait l'utilisateur en changeant de piste vers une source de qualité différente.

## 4. Mode Karaoké

Extension du mode synchronisé (§2) avec mise en évidence mot à mot plutôt que ligne à ligne — nécessite un niveau de granularité d'horodatage plus fin, disponible uniquement si la source de données le fournit (dégradation automatique et silencieuse vers le mode ligne-à-ligne si l'horodatage mot-à-mot n'existe pas, jamais une erreur visible). Activation via un réglage dédié, désactivé par défaut (mode ligne-à-ligne reste la présentation standard, moins intrusive pour une écoute passive).

## 5. Traduction

Bascule entre la langue originale et une traduction (si disponible dans les métadonnées ou via un service configuré — non engagé techniquement à ce jour) — jamais une traduction automatique générée à la volée sans indication claire qu'il s'agit d'une traduction potentiellement imparfaite, cohérent avec la règle d'honnêteté du produit.

## 6. Défilement

Voir [[PLAYER_EXPERIENCE.md]] §10 pour la chorégraphie complète (défilement automatique interrompu par un défilement manuel, repris après quelques secondes d'inactivité) — non redécrite ici.

## 7. Recherche dans les paroles

Deux contextes distincts, jamais confondus :
- **Recherche par paroles** (trouver une piste à partir d'un extrait de texte) : voir [[SEARCH_SPECIFICATION.md]] §3, filtre dédié « rechercher dans les paroles ».
- **Recherche dans les paroles affichées** (trouver un passage dans la piste en cours) : champ de recherche local au panneau Lyrics Panel ([[PLAYER_COMPONENTS.md]]), surligne les correspondances et permet de sauter directement à la ligne trouvée (déplace la position de lecture, action explicite jamais automatique).

## 8. Mise en évidence (Highlight)

Ligne active : contraste augmenté + légère augmentation de taille (rôle Body → Title temporairement, [[TYPOGRAPHY_GUIDE.md]] §4bis) — jamais uniquement une couleur d'accent seule ([[ACCESSIBILITY_GUIDE.md]] §3bis, aucune information portée par la couleur seule).

## 9. Typographie

Rôle Body pour le texte courant, taille légèrement supérieure à la typographie standard de l'application (les paroles se lisent à distance, contexte d'affichage similaire à un sous-titre) — hauteur de ligne généreuse (1.6× plutôt que 1.5× standard, [[TYPOGRAPHY_GUIDE.md]] §6) pour un confort de lecture en défilement continu.

## 10. Responsive

Mobile : Lyrics Panel occupe l'écran complet en overlay (BottomSheet, [[OVERLAY_COMPONENTS.md]]) depuis l'Expanded Player — Desktop/Tablette : panneau latéral persistant à côté du lecteur si l'espace le permet, cohérent avec [[RESPONSIVE_GUIDE.md]] §4 (panneau latéral en tablette paysage).

## 11. Accessibilité

Voir [[ACCESSIBILITY_GUIDE.md]] §9bis (annonce désactivée par défaut, navigable comme une liste standard) — non redécrite ici.

---

## 12. Checklist de validation

- [ ] Aucune fonctionnalité de ce document n'est présentée comme garantie — la dépendance de source de données (§1) reste explicite partout où pertinent.
- [ ] Le mode Karaoké se dégrade silencieusement vers le mode ligne-à-ligne si la donnée fine n'est pas disponible.
- [ ] Les deux contextes de recherche (§7) restent explicitement distincts.

---

## 13. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 9) | Senior Audio UX Engineer / Principal Music Experience Designer |

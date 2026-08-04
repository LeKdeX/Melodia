# PLAYLIST_SCREEN.md — Page Playlist (Phase 10)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / Principal Music Experience Designer
> **Documents liés** : [[SCREEN_SYSTEM.md]] §2, [[PLAYLIST_COMPONENTS.md]]

> **Cadrage** : [[PLAYLIST_COMPONENTS.md]] a déjà spécifié Hero/Header/Actions/Filters en détail — assemblés ici, sans redéfinition.

---

## 1. Présentation

Objectif : consulter et éditer (si propriétaire) une collection ordonnée de titres. Lien avec les autres écrans : accessible depuis Playlist Card, mène vers Album/Artist Screen depuis chaque Track Row.

## 2. Composition

```
[Playlist Hero — §1 de PLAYLIST_COMPONENTS.md]
[Playlist Header — Description/Owner/Actions/Statistics, §2-3]
[Playlist Filters — si 100+ titres, §6]
[Main — Track List (Track Row, réorganisable si propriétaire), §4]
[Mini Player — persistant]
```

## 3. Collaborators (préparation, non engagée)

**Statut** : le caractère technique collaboratif d'une playlist reste ouvert ([[FEATURE_BIBLE.md]] §5, [[PLAYLIST_COMPONENTS.md]] §2) — si engagé un jour, les contributeurs récents apparaîtraient dans le Playlist Header à côté du Playlist Owner ([[PLAYLIST_COMPONENTS.md]] §2), jamais un bloc séparé. Non spécifié davantage tant que non engagé, cohérent avec la règle d'honnêteté déjà appliquée à chaque fonctionnalité non tranchée dans ce projet.

## 4. États et cas limites propres à l'assemblage

- **Playlist vide** (nouvellement créée) : Main affiche Empty State (« Pas encore de contenu », [[EMPTY_STATES_GUIDE.md]] §5) avec action directe « Ajouter des titres » — Header reste entièrement fonctionnel (renommage, description) même sans titres.
- **Playlist en lecture seule** (non-propriétaire) : Actions d'édition (réorganisation, renommage) absentes plutôt que visibles-mais-désactivées — cohérent avec [[PLAYLIST_COMPONENTS.md]] §4 (poignée masquée pour éviter une tentative d'action qui échouerait silencieusement).
- **Playlist générée automatiquement** (Daily Mix, [[COLLECTION_COMPONENTS.md]] §1) : Header affiche l'indicateur de Smart Collection déjà défini, actions d'édition manuelle absentes (règle générée, pas éditable individuellement).

## 5. Responsive

Voir [[RESPONSIVE_LAYOUTS.md]] et [[PLAYLIST_COMPONENTS.md]] §7 — non redécrit ici.

---

## 6. Checklist de validation

- [ ] Collaborators reste explicitement non engagé, jamais présenté comme une fonctionnalité livrée.
- [ ] La distinction propriétaire/lecture seule/générée automatiquement reste cohérente sur tout l'écran (§4).
- [ ] Aucun composant Playlist déjà spécifié n'est redéfini ici.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 10) | Product Designer / Principal Music Experience Designer |

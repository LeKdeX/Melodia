# ARTIST_SCREEN.md — Page Artiste (Phase 10)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / Principal Music Experience Designer
> **Documents liés** : [[SCREEN_SYSTEM.md]] §2, [[ARTIST_COMPONENTS.md]], [[ALBUM_SCREEN.md]]

> **Cadrage** : [[ARTIST_COMPONENTS.md]] a déjà spécifié Hero/Biography/Discography/Top Songs en détail — assemblés ici. Related Artists n'avait pas d'entrée dédiée, ajouté comme bloc final.

---

## 1. Présentation

Objectif : centraliser tout le catalogue d'un artiste et faciliter la lecture immédiate de ses titres populaires. Lien avec les autres écrans : accessible depuis Artist Card, depuis le nom d'artiste cliqué sur Album Screen/Track Row/Lyrics View, mène vers Album Screen ([[ALBUM_SCREEN.md]]).

## 2. Composition

```
[Artist Hero — §1 de ARTIST_COMPONENTS.md]
[Top Songs — §4, liste de 5-10 Track Row]
[Discography — §3, groupée Albums/Singles & EP/Compilations/Apparaît sur]
[Popular Albums — §5, condition catalogue large]
[Biography — §2, tronquée avec expansion]
[Related Artists — Grid horizontale d'Artist Card, nouveau bloc]
[Mini Player — persistant]
```

**Ordre justifié** : Top Songs avant Discography — l'action la plus probable (écouter un titre populaire) prime sur l'exploration complète du catalogue, cohérent avec [[SCREEN_SYSTEM.md]] §1.5 (informations importantes immédiatement).

## 3. Related Artists (nouveau)

Grid horizontale d'Artist Card ([[LIBRARY_COMPONENTS.md]]), basée sur la similarité de genre/collaboration dans la bibliothèque locale — jamais une donnée externe non vérifiable. Masquée si aucune similarité suffisante n'est calculable (bibliothèque trop restreinte).

## 4. États et cas limites propres à l'assemblage

- **Artiste avec un seul album** : Discography affiche un seul groupe (Albums), Popular Albums masqué (redondant avec Discography déjà courte), Related Artists reste possible indépendamment.
- **Aucune biographie disponible** : bloc entièrement masqué ([[ARTIST_COMPONENTS.md]] §2) — la mise en page remonte, jamais un espace vide laissé à sa place.
- **Artiste avec un seul titre dans la bibliothèque** (featuring uniquement) : Top Songs affiche ce titre unique, Discography affiche uniquement le groupe « Apparaît sur ».

## 5. Responsive

Voir [[RESPONSIVE_LAYOUTS.md]] et [[ARTIST_COMPONENTS.md]] §7 — non redécrit ici.

---

## 6. Checklist de validation

- [ ] L'ordre des blocs (§2) reste cohérent avec la priorité « action immédiate avant exploration ».
- [ ] Related Artists ne s'affiche jamais sans donnée de similarité suffisante.
- [ ] Aucun composant Artiste déjà spécifié n'est redéfini ici.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 10) | Product Designer / Principal Music Experience Designer |

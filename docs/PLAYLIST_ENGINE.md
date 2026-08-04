# PLAYLIST_ENGINE.md — Architecture technique du moteur de playlists (Phase 13)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Staff React Engineer
> **Documents liés** : [[PLAYLIST_SPECIFICATION.md]], [[DOMAIN_MODELS.md]] §3, [[REPOSITORY_PATTERN.md]]

> **Cadrage strict** : [[PLAYLIST_SPECIFICATION.md]] §1 reste la seule source de vérité sur les neuf types de playlist et leur définition produit — ce document ne les redéfinit pas, il spécifie le moteur unique qui les fait fonctionner techniquement, déjà annoncé comme partagé (« cinq façades différentes sur un mécanisme unique ») mais jamais détaillé au niveau code.

---

## 1. Représentation unique, façades multiples

Une seule entité `Playlist` ([[DOMAIN_MODELS.md]] §3) sert les neuf types produit :
- **Classique/Collaborative** : `trackIds[]` peuplé directement, `rules` absent.
- **Intelligente/Automatique/Dynamique/Ambiance/Temporelle/Saisonnière** : `rules` présent (critères sérialisés, [[PLAYLIST_SPECIFICATION.md]] §3), `trackIds[]` **dérivé**, jamais stocké comme source de vérité — recalculé par le moteur de règles (§2) à chaque ouverture.
- **IA** *(architecture préparée, non implémentée)* : réutiliserait `rules` avec un critère `generatedBy: 'ai'` en façade — aucune dépendance IA engagée ([[PLAYLIST_SPECIFICATION.md]] §1, déjà acté).

## 2. Moteur de règles

```
interface PlaylistRuleEngine {
  evaluate(rules: PlaylistRules): Promise<Track[]>
}
```

- Les critères disponibles (`genre`, `année`, `artiste`, `note/favoris`, `nombre d'écoutes`...) sont exactement ceux de la recherche avancée ([[PLAYLIST_SPECIFICATION.md]] §3, un seul vocabulaire déjà acté) — le moteur traduit `rules` en requête(s) `TrackRepository`/`FavoriteRepository`/`HistoryRepository` ([[REPOSITORY_PATTERN.md]] §2), jamais un second langage de requête parallèle.
- Combinaison ET/OU compilée en une requête indexée quand c'est possible ([[DATABASE_SCHEMA.md]] §3) ; les critères non indexables (ex. nombre d'écoutes calculé) sont appliqués en filtrage applicatif après la requête indexée initiale — jamais un filtrage complet non indexé sur toute la bibliothèque.
- Réutilisé identiquement par Daily Mix ([[DISCOVERY_SPECIFICATION.md]] §3) via [[RECOMMENDATION_ENGINE.md]] — pas un second moteur de règles, cohérent avec la non-duplication déjà actée.

## 3. Réévaluation

Voir [[PLAYLIST_SPECIFICATION.md]] §3 pour la règle produit déjà actée (à l'ouverture a minima, fréquence de fond à définir) — ce document précise seulement que le résultat évalué est mis en cache (même mécanisme que [[RECOMMENDATION_ENGINE.md]] §2, résultat borné et horodaté), jamais recalculé à chaque rendu de la liste.

## 4. Import / Export

- **Export** : sérialisation de `trackIds[]` résolu (jamais les `rules`, pour rester portable même sans le moteur — un export de playlist intelligente exporte son résultat figé au moment de l'export, explicitement signalé comme tel à l'utilisateur).
- **Import** : format M3U/M3U8 en priorité (standard le plus largement supporté) — résolution des pistes par correspondance titre/artiste/durée contre la bibliothèque locale (`TrackRepository`, [[REPOSITORY_PATTERN.md]] §2), pistes non trouvées listées explicitement plutôt que silencieusement ignorées.

## 5. Fusion et conflits

- **Fusion manuelle de deux playlists classiques** : concatène `trackIds[]` avec dédoublonnage optionnel (choix explicite proposé à l'utilisateur, jamais un dédoublonnage automatique silencieux qui pourrait surprendre).
- **Conflit d'édition simultanée (playlist collaborative)** : statut technique explicitement ouvert ([[PLAYLIST_SPECIFICATION.md]] §5, [[OFFLINE_SYSTEM.md]] §6, déjà signalés) — ce moteur n'implémente aucune résolution de conflit fine tant que ce statut n'est pas tranché ; une modification hors ligne suit la règle générale par défaut (dernier écrit gagne, [[ARCHITECTURE_PRINCIPLES.md]] §3.3) en attendant.

## 6. Suppression de piste source

Voir [[PLAYLIST_SPECIFICATION.md]] §5 (déjà acté) : une piste retirée côté serveur est retirée de `trackIds[]` de toute playlist classique qui la contient (cascade déjà décrite, [[DATABASE_SCHEMA.md]] §4) — pour une playlist basée sur des règles, elle disparaît simplement du résultat de la prochaine évaluation (§3), rien à nettoyer explicitement puisque `trackIds[]` n'est jamais la source de vérité pour ce type.

---

## 7. Ce que ce document ne fait pas

- Ne redéfinit pas les neuf types de playlist ou leurs règles produit (voir [[PLAYLIST_SPECIFICATION.md]]).
- Ne redéfinit pas le moteur de scoring de recommandation (voir [[RECOMMENDATION_ENGINE.md]]).
- Ne tranche pas le statut des playlists collaboratives (statut ouvert, non résolu ici).

## 8. Checklist de validation

- [ ] Toute playlist basée sur des règles a `trackIds[]` dérivé, jamais stocké comme source de vérité (§1).
- [ ] Le moteur de règles réutilise le vocabulaire de critères de la recherche avancée, aucun second vocabulaire (§2).
- [ ] Un import de playlist liste explicitement les pistes non résolues, jamais un échec silencieux (§4).

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Phase 13) | Staff React Engineer |

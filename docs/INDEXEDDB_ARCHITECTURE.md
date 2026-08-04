# INDEXEDDB_ARCHITECTURE.md — Implémentation Dexie de `IndexedDbStore` (Phase 13)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Offline-First Specialist
> **Documents liés** : [[TECHNOLOGY_COMPARISONS.md]] §4, [[ARCHITECTURE_PRINCIPLES.md]] §3.1, [[DATABASE_SCHEMA.md]]

[[TECHNOLOGY_COMPARISONS.md]] §4 a déjà tranché : Dexie pour le repli Web pur, SQLite pour Desktop/Mobile — complémentarité de plateforme, pas un choix arbitraire. Ce document ne rejuge pas ce choix ; il spécifie **comment** `IndexedDbStore` implémente concrètement [[DATABASE_SCHEMA.md]] avec Dexie.

---

## 1. Pourquoi Dexie plutôt qu'IndexedDB brut

L'API IndexedDB native est bas niveau (callbacks, gestion manuelle des transactions, absence de typage). Dexie apporte une surface Promise-based typée TypeScript, un système de requêtes proche d'un ORM léger, et une gestion de version déclarative — sans réimplémenter ce que Dexie résout déjà (cohérent avec [[ENGINEERING_GUIDE.md]] §2.3, préférer une dépendance quand le problème est déjà résolu et standardisé). Alternative écartée : IndexedDB brut sans wrapper — rejeté pour le coût de développement et de maintenance disproportionné d'une gestion de transaction manuelle à cette échelle de schéma (17 tables, [[DATABASE_SCHEMA.md]] §1).

## 2. Déclaration des tables (Dexie `Schema`)

```
class MelodiaDatabase extends Dexie {
  albums!: Table<AlbumRow, string>
  artists!: Table<ArtistRow, string>
  tracks!: Table<TrackRow, string>
  // ... une entrée par table de DATABASE_SCHEMA.md §1

  constructor() {
    super('melodia')
    this.version(1).stores({
      albums: 'id, artistId',
      tracks: 'id, albumId, *artistIds',   // *artistIds = index multi-entry
      history: 'id, trackId, startedAt',
      favorites: '[entityType+entityId]',   // index composé, contrainte d'unicité
      // ...
    })
  }
}
```

Chaque déclaration `stores()` reflète exactement les index de [[DATABASE_SCHEMA.md]] §3 — jamais un index Dexie ajouté sans mise à jour correspondante du schéma logique (source de vérité unique, cohérent avec [[DOCUMENTATION_GUIDE.md]] §4).

## 3. Versioning et migrations

- Chaque évolution de schéma est une nouvelle entrée `this.version(N).stores({...})` — Dexie applique la migration automatiquement à l'ouverture si la version locale est inférieure, cohérent avec la règle déjà actée dans [[DATABASE_SCHEMA.md]] §5 (migration atomique, idempotente).
- Une migration qui modifie la forme d'une table existante (pas seulement l'ajout d'un index) utilise `.upgrade(tx => ...)` pour transformer les lignes existantes — jamais une perte silencieuse de données déjà présentes.
- Avant toute migration destructive potentielle, un export JSON de sauvegarde est déclenché ([[DATA_LAYER.md]] §2.2, déjà acté) — Dexie expose `table.toArray()` pour cet export, suffisant à l'échelle visée sans outillage supplémentaire.

## 4. Transactions

Toute opération qui touche plusieurs tables de façon dépendante (ex. suppression d'une piste + ses entrées `favorites`/`playlist_tracks` associées, [[DATABASE_SCHEMA.md]] §4) passe par `db.transaction('rw', [...tables], async () => {...})` — jamais une séquence d'opérations indépendantes qui laisserait un état intermédiaire incohérent en cas d'échec partiel.

## 5. Requêtes et performance

- Toute requête de premier ordre utilise un index déclaré (§2) via `.where('champ').equals(valeur)` — jamais `.filter()` sur une collection complète pour un accès fréquent (équivalent d'un scan de table complet, contraire à [[DATA_LAYER.md]] §2.4).
- Les requêtes sur de grands volumes (ex. liste complète de `tracks` pour la bibliothèque à 200 000 titres) utilisent `.each()` (itération en streaming) plutôt que `.toArray()` (chargement intégral en mémoire) quand le résultat n'a pas besoin d'être matérialisé entièrement — cohérent avec [[PERFORMANCE_GUIDE.md]] (extension Phase 13, transactions/streaming).

## 6. Limites connues de Dexie/IndexedDB et repli

- Pas de requêtes jointes natives (contrairement à SQLite) — une jointure logique (ex. « pistes d'un album avec le nom de l'artiste ») se fait par deux requêtes indexées séquentielles côté application, jamais une jointure SQL équivalente simulée par une boucle non indexée.
- Quota de stockage navigateur variable selon le navigateur/OS — surveillé via l'API `navigator.storage.estimate()`, avec avertissement utilisateur avant d'approcher la limite ([[CACHE_SYSTEM.md]] §3, gestion de contrainte d'espace déjà actée).

---

## 7. Ce que ce document ne fait pas

- Ne redéfinit pas le schéma logique des tables (voir [[DATABASE_SCHEMA.md]]).
- Ne redéfinit pas l'implémentation SQLite côté natif (hors périmètre — `SqliteStore` suit le même schéma logique via SQL standard, pas de document dédié tant qu'aucune divergence réelle n'apparaît, cohérent avec YAGNI).
- Ne rejuge pas le choix Dexie/SQLite lui-même (voir [[TECHNOLOGY_COMPARISONS.md]] §4).

## 8. Checklist de validation

- [ ] Chaque table Dexie déclarée correspond exactement à une table de [[DATABASE_SCHEMA.md]] §1 (§2).
- [ ] Toute opération multi-tables dépendante passe par une transaction explicite (§4).
- [ ] Aucune requête de premier ordre ne contourne un index déclaré (§5).

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Phase 13) | Offline-First Specialist |

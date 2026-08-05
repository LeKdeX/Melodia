# GLOSSARY.md — Glossaire technique et architectural (Revue de consolidation)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Documentation Architect
> **Documents liés** : [[VOCABULARY.md]], [[STYLE_GUIDE.md]], [[ARCHITECTURE_PRINCIPLES.md]] §8bis

> **Distinction avec [[VOCABULARY.md]]** : [[VOCABULARY.md]] est le glossaire de **copy utilisateur** — quels mots apparaissent dans l'interface, en français, pour incarner la voix de marque. Ce document est le glossaire **technique/architectural** — quel terme anglais canonique désigne chaque concept dans la documentation d'ingénierie elle-même (jamais montré à l'utilisateur final). Les deux ne se chevauchent jamais : un contributeur qui documente le code consulte ce document, un rédacteur qui écrit un texte d'interface consulte [[VOCABULARY.md]].

---

## 1. Pourquoi ce document

L'audit de consolidation (voir [[ARCHITECTURE_REVIEW.md]]) a vérifié la cohérence terminologique sur plusieurs paires à risque (« Playback » vs « Player Playback » vs « Lecture Audio », noms de store, noms de repository) et n'a trouvé aucune incohérence réelle dans les 191 documents existants — la terminologie technique était déjà appliquée de façon cohérente sans qu'un glossaire dédié existe. Ce document formalise cette cohérence déjà réelle en une référence explicite, pour qu'elle le reste à mesure que le nombre de contributeurs augmente.

## 2. Termes de lecture et file

| Terme canonique | Ne jamais utiliser à la place | Défini dans |
|---|---|---|
| Playback | Player Playback, Lecture Audio, Audio Playback | [[PLAYER_SPECIFICATION.md]] |
| Queue | File d'attente (dans le code — acceptable dans le produit affiché) | [[QUEUE_SPECIFICATION.md]] |
| Track | Piste (dans le code — Track/Piste/Morceau/Titre coexistent dans le produit affiché, [[VOCABULARY.md]] §1) | [[DOMAIN_MODELS.md]] §2 |
| `playerStore` | `playbackStore`, `PlayerStore` | [[CODING_STANDARDS.md]] §4.3 |

## 3. Termes de la couche donnée

| Terme canonique | Ne jamais utiliser à la place | Défini dans |
|---|---|---|
| DTO (Data Transfer Object) | Modèle brut, objet Jellyfin | [[DTO_SPECIFICATION.md]] |
| Domain Entity / Entité de domaine | Modèle métier (ambigu, éviter) | [[DOMAIN_MODELS.md]] |
| Repository | Store (réservé à l'état client Zustand, jamais la persistance) | [[REPOSITORY_PATTERN.md]] |
| `LocalStore` | Base locale, cache local (ambigu — `LocalStore` est le nom d'interface exact) | [[ARCHITECTURE_PRINCIPLES.md]] §3 |
| `MusicSource` | Connecteur, source de données (ambigu) | [[ARCHITECTURE_PRINCIPLES.md]] §2 |
| Mapper | Convertisseur, transformateur | [[MAPPER_GUIDE.md]] |
| ViewModel | Modèle de présentation, DTO d'affichage (jamais « DTO » pour cette forme, réservé à la forme Jellyfin brute) | [[DATA_FLOW.md]] §2 |

## 4. Termes de synchronisation et cache

| Terme canonique | Ne jamais utiliser à la place | Défini dans |
|---|---|---|
| Sync (dans le code) / Synchronisation (dans le produit affiché) | Update, Refresh (ambigus) | [[SYNC_ENGINE_SPECIFICATION.md]] |
| Delta Sync | Sync incrémentale (les deux coexistent — Delta Sync est le terme technique, synchronisation incrémentale le terme produit) | [[SYNC_ENGINE_SPECIFICATION.md]] §7bis |
| Cache (jamais qualifié différemment par catégorie sans le nom de catégorie exact : Metadata/Image/Artwork/Waveform/Lyrics/Statistics/Recommendation/Search Index Cache) | Stockage temporaire, tampon | [[CACHE_SYSTEM.md]] §1 |

## 5. Termes d'architecture logicielle

| Terme canonique | Ne jamais utiliser à la place | Défini dans |
|---|---|---|
| Feature (module de `features/`) | Module (réservé au sens large de [[MODULES.md]], qui inclut aussi les couches transverses) | [[CODING_STANDARDS.md]] §1 |
| Ports & Adapters | Architecture hexagonale (les deux sont synonymes — préférer « Ports & Adapters », déjà le terme retenu depuis la Phase 0) | [[ARCHITECTURE_PRINCIPLES.md]] §8bis |
| Result<T, E> | Erreur typée (imprécis — utiliser le nom du type exact) | [[CODING_STANDARDS.md]] §4.4 |

## 6. Acronymes

| Acronyme | Signification | Ne jamais développer autrement |
|---|---|---|
| DTO | Data Transfer Object | — |
| SSOT | Single Source of Truth (utilisé dans ce document et [[ARCHITECTURE_REVIEW.md]] uniquement, jamais dans un document produit) | — |
| ADR | Architecture Decision Record | [[ADR_TEMPLATE.md]] |
| WCAG | Web Content Accessibility Guidelines | [[ACCESSIBILITY_GUIDE.md]] |
| CSP | Content Security Policy | [[SECURITY_GUIDE.md]] §1 |
| PWA | Progressive Web App | [[TECH_STACK.md]] |

---

## 7. Ce que ce document ne fait pas

- Ne redéfinit pas le vocabulaire de copy utilisateur (voir [[VOCABULARY.md]]).
- Ne redéfinit pas les conventions de nommage de fichiers/dossiers (voir [[CODING_STANDARDS.md]] §2, [[STYLE_GUIDE.md]]).
- N'invente aucun terme nouveau — chaque entrée reflète un usage déjà appliqué de façon cohérente dans le corpus existant, vérifié par l'audit ([[ARCHITECTURE_REVIEW.md]]).

## 8. Checklist de validation

- [ ] Tout nouveau terme technique introduit dans un futur document est ajouté ici avant d'être utilisé dans plusieurs documents.
- [ ] Aucune entrée ne contredit [[VOCABULARY.md]] pour le vocabulaire produit affiché à l'utilisateur.
- [ ] Une variante interdite trouvée dans un document existant est corrigée immédiatement, pas seulement notée ici.

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Revue de consolidation) | Documentation Architect |

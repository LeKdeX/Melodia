# IMPORT_EXPORT_SYSTEM.md — Import et export de données personnelles (Phase 11)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Security Architect / Synchronization Engineer
> **Documents liés** : [[SETTINGS_SYSTEM.md]] §7, [[PRODUCT_RULES.md]] §10, [[WRAPPED_SPECIFICATION.md]] §3

> **Cadrage** : distinct de la synchronisation avec le serveur Jellyfin ([[SYNC_ENGINE_SPECIFICATION.md]], qui récupère le catalogue) — ce document couvre les données **propres à l'utilisateur sur cet appareil** qu'il peut vouloir sauvegarder, transférer ou examiner indépendamment du serveur.

---

## 1. Ce qui est exportable

| Donnée | Format | Contenu |
|---|---|---|
| Préférences | JSON structuré | Réglages de [[SETTINGS_SYSTEM.md]], hors identifiants de connexion (jamais exportés en clair) |
| Playlists locales | JSON ou format standard (ex. M3U si interopérabilité avec d'autres lecteurs jugée utile) | Structure + références aux titres (par métadonnée, jamais les fichiers audio eux-mêmes) |
| Historique | JSON | Renvoi [[STATISTICS_SPECIFICATION.md]] §2 pour le contenu exact de la donnée |
| Favoris | JSON | Liste des identifiants favoris |
| Paramètres | Inclus dans Préférences, pas un export séparé |

## 2. Principe directeur

Toute donnée exportée est une action explicite de l'utilisateur ([[PRODUCT_RULES.md]] §10) — jamais une sauvegarde automatique vers un service tiers. Le fichier généré reste local à l'appareil (téléchargement standard), l'utilisateur en dispose ensuite librement (stockage personnel, partage manuel) hors du contrôle de Melodia.

## 3. Import

Symétrique de l'export (§1) — un fichier exporté depuis une installation Melodia peut être réimporté sur une autre installation (nouvel appareil, réinstallation). **Règle de fusion** : l'import ne remplace jamais silencieusement les données existantes — propose une fusion (favoris combinés, playlists ajoutées sans doublon si identiques) ou un remplacement complet, choix explicite à chaque import ([[DIALOG_LIBRARY.md]] pattern de confirmation).

## 4. Cas limite — playlists avec titres introuvables

Un import de playlist référençant des titres absents de la bibliothèque de destination (serveur différent, bibliothèque partielle) conserve la playlist avec les titres manquants marqués explicitement (jamais silencieusement retirés) — l'utilisateur voit ce qui n'a pas pu être résolu plutôt qu'une playlist tronquée sans explication.

## 5. Sécurité

Le fichier d'export ne contient jamais d'identifiants de connexion Jellyfin ni de jeton de session (§1) — un fichier exporté qui serait partagé accidentellement ne compromet jamais l'accès au serveur de l'utilisateur, cohérent avec [[SECURITY_GUIDELINES.md]].

## 6. Accessibilité

Les actions Import/Export restent des Button standard ([[BUTTON_SPECIFICATION.md]]) dans Paramètres > Comptes ([[SETTINGS_SYSTEM.md]] §7) — le résultat (succès/échec) est annoncé via Toast/Snackbar ([[FEEDBACK_COMPONENTS.md]]), jamais silencieux.

---

## 7. Checklist de validation

- [ ] Aucun identifiant de connexion n'apparaît jamais dans un fichier exporté.
- [ ] Un import propose toujours un choix explicite (fusion/remplacement), jamais un écrasement silencieux.
- [ ] Les titres introuvables lors d'un import restent visibles, jamais silencieusement supprimés.

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 11) | Security Architect / Synchronization Engineer |

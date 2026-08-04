# LOGGING_SYSTEM.md — Système de journalisation (Phase 11)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Security Architect / Performance Engineer
> **Documents liés** : [[ERROR_STATES.md]] §9bis, [[SYNC_ENGINE_SPECIFICATION.md]] §6, [[SETTINGS_SYSTEM.md]] §8-9

> **Cadrage** : plusieurs documents renvoient déjà vers ce document pour le détail des logs qu'ils génèrent ([[ERROR_STATES.md]] §9bis, [[SYNC_ENGINE_SPECIFICATION.md]] §6) — ce document est leur destination commune, jamais un système de collecte parallèle.

---

## 1. Catégories de logs

| Catégorie | Contenu | Généré par |
|---|---|---|
| Logs utilisateur | Actions notables (connexion, changement de réglage majeur) — jamais le détail de chaque clic | Interactions explicites |
| Logs développeur | Erreurs, avertissements, traces d'exécution | [[ERROR_STATES.md]] §9bis |
| Logs réseau | Requêtes vers le serveur Jellyfin (URL, code de statut, latence — jamais le contenu des identifiants) | Chaque appel réseau |
| Logs synchronisation | Cycles de synchronisation, succès/échec, éléments traités | [[SYNC_ENGINE_SPECIFICATION.md]] §6 |
| Logs cache | Opérations de nettoyage/réparation/reconstruction | [[CACHE_SYSTEM.md]] §6-7 |
| Logs téléchargement (ajout Phase 13) | Changements de statut de la file (déclenché/pausé/repris/échoué/validé), jamais le contenu du fichier lui-même | [[DOWNLOAD_SYSTEM.md]] §5, §5quater |

## 2. Politique de rétention

Rotation automatique — conservation des 7 derniers jours par défaut (configurable dans Paramètres > Développeur, [[SETTINGS_SYSTEM.md]] §9), au-delà les entrées les plus anciennes sont purgées automatiquement. Jamais une conservation illimitée qui grossirait sans borne sur une installation de plusieurs années.

## 3. Stockage

Local exclusivement — aucun log n'est jamais transmis à un serveur Melodia (il n'en existe pas, cohérent avec [[PRODUCT_RULES.md]] §10) ni au serveur Jellyfin. Stocké séparément de `LocalStore` applicatif (fichier dédié) pour ne jamais interférer avec les données produit (favoris, playlists) en cas de nettoyage des logs.

## 4. Consultation

Vue Logs ([[SYNC_SCREENS.md]] §7, Code Block) réservée au contexte développeur/support — jamais affichée par défaut à un utilisateur non technique, cohérent avec [[SCREEN_COMPONENT_MATRIX.md]] §3 (Code Block exclusif à cet usage).

## 5. Export

Action « Exporter les logs » distincte de l'export de données personnelles ([[IMPORT_EXPORT_SYSTEM.md]]) — génère un fichier texte brut destiné au support technique (ex. pour un rapport de bug communautaire), jamais transmis automatiquement, toujours une action explicite avec le contenu visible avant partage.

## 6. Suppression

Action manuelle disponible à tout moment (Paramètres > Développeur) en plus de la rotation automatique (§2) — suppression immédiate sans confirmation requise (les logs ne sont jamais une donnée dont la perte est irréversible au sens produit, contrairement aux favoris/playlists qui nécessitent une confirmation, [[DIALOG_LIBRARY.md]]).

## 7. Sécurité

Aucune donnée sensible en clair dans un log (mots de passe, jetons de session complets — seuls les 4 derniers caractères d'un jeton peuvent apparaître pour le débogage de corrélation, jamais le jeton entier) — cohérent avec [[SECURITY_GUIDELINES.md]].

---

## 8. Checklist de validation

- [ ] Chaque catégorie de log a une source clairement identifiée (§1), aucune génération ambiguë.
- [ ] Aucune donnée sensible n'apparaît en clair dans un log (§7).
- [ ] La rotation automatique (§2) empêche une croissance non bornée du stockage de logs.

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 11) | Security Architect / Performance Engineer |
| 0.2.0 | 2026-08-04 | Phase 13 : ajout de la catégorie « Logs téléchargement » (§1) — « Logs import » non dupliqué, déjà couvert par « Logs synchronisation » — au lieu de créer LOGGING_GUIDE.md en doublon | Database Architect |

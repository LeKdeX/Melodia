# SETTINGS_SYSTEM.md — Référentiel exhaustif des réglages (Phase 11)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : System Experience Designer / Senior Product Designer
> **Documents liés** : [[SETTINGS_SPECIFICATION.md]], [[SETTINGS_COMPONENTS.md]], [[SETTINGS_SCREENS.md]]

> **Cadrage** : [[SETTINGS_SPECIFICATION.md]] organise déjà les réglages par domaine (Phase 1), [[SETTINGS_COMPONENTS.md]] spécifie Preference Row (Phase 6), [[SETTINGS_SCREENS.md]] assemble les 12 catégories en écran (Phase 10). Aucun des trois n'est un référentiel option-par-option exhaustif — ce document comble ce vide précis, sans redécider l'organisation ni l'anatomie déjà actées.

---

## 1. Général

| Option | Valeurs | Par défaut |
|---|---|---|
| Langue | Selon [[LOCALIZATION_GUIDE.md]] §6 (français/anglais source, langues cibles non tranchées) | Langue système si supportée, sinon anglais |
| Fuseau horaire | Détecté automatiquement, ajustable manuellement | Fuseau système |
| Région | Détermine les formats ci-dessous | Région système |
| Format des dates | Selon convention régionale ([[LOCALIZATION_GUIDE.md]] §4), jamais codé en dur | Résolu via `Intl` |
| Format de l'heure | 12h/24h | Résolu via `Intl` |
| Animations | Complet / Réduit / Off ([[ACCESSIBILITY_GUIDE.md]] §4) | Complet, ou Réduit si `prefers-reduced-motion` détecté |
| Densité d'affichage | Confortable / Compacte | Confortable |
| Accessibilité | Renvoi vers un sous-panneau dédié (contraste renforcé, tailles de cible) | — |

## 2. Apparence

| Option | Valeurs | Renvoi |
|---|---|---|
| Thème | Classic/Sombre/OLED/Minimal/Focus/Nuit/Dynamique Album/Dynamique Artiste | [[THEMES_GUIDE.md]] |
| Accent Color | `accent-500` fixe en v1, personnalisation non engagée | [[COLOR_SYSTEM.md]] §3 |
| Dynamic Theme / Album Theme | Activable/désactivable indépendamment | [[DYNAMIC_THEME_GUIDE.md]] |
| Artwork Blur | Intensité du flou d'ambiance | [[ARTWORK_SYSTEM.md]] §3 |
| Glassmorphism (ajout Phase 11) | On/Off — active le flou de surface ([[SURFACE_SYSTEM.md]] §5) sur les surfaces temporaires éligibles, jamais sur la navigation permanente (règle déjà non négociable) | Off par défaut (cohérent avec le thème Minimal disponible séparément) |
| Coins | Suit l'échelle de rayon fixe ([[DESIGN_TOKENS.md]] §2), non personnalisable — une échelle de rayon variable romprait la cohérence du Design System |
| Contraste élevé (ajout Phase 11) | On/Off — force un contraste supérieur au minimum WCAG AA sur toutes les surfaces, préparation de l'objectif AAA déjà visé ([[ACCESSIBILITY_GUIDE.md]] §1) | Off, activable manuellement (distinct de la détection automatique système) |

## 3. Lecture

| Option | Valeurs | Renvoi |
|---|---|---|
| Crossfade | 0-12 secondes | [[PLAYER_SPECIFICATION.md]] §5ter |
| Gapless Playback | Toujours actif par défaut, non désactivable (comportement de référence) | [[AUDIO_ENGINE.md]] |
| Normalisation du volume | On/Off | [[AUDIO_ENGINE.md]] |
| ReplayGain (préparation, ajout Phase 11) | **Non engagé** — dépend de métadonnées de gain par piste non universellement présentes dans les bibliothèques Jellyfin ; si engagé, s'intégrerait à la Normalisation du volume plutôt qu'un réglage séparé | — |
| Fondu lecture/pause (ajout Phase 11) | On/Off — court fondu (catégorie Micro, [[MOTION_GUIDELINES.md]] §1) plutôt qu'un arrêt net du signal audio, réduit un artefact de coupure perceptible sur certains équipements | On |
| Qualité audio (streaming) | Auto/Basse/Standard/Haute | [[SETTINGS_SPECIFICATION.md]] |
| Volume initial (ajout Phase 11) | Pourcentage, appliqué uniquement au tout premier lancement | 70 % (jamais 100 %, cohérent avec [[PLAYER_SPECIFICATION.md]] §5 « jamais supérieur à 100% par défaut ») |
| Reprise automatique | On/Off — reprise à la position exacte au lancement | [[NAVIGATION_HISTORY.md]] §4 |
| Lecture continue | Toujours active, non désactivable — la musique ne s'arrête jamais entre deux pistes de la file sans action explicite ([[PRODUCT_RULES.md]] §2) | — |

## 4. Téléchargements

Voir [[DOWNLOAD_SYSTEM.md]] pour le comportement complet (§1-7, §5bis-5ter) — options : Qualité, Wi-Fi uniquement (On par défaut, économie de données mobiles), Priorités, Suppression automatique après désinscription d'une playlist source, Taille maximale allouée, Nettoyage intelligent (suggestion de suppression des téléchargements non réécoutés depuis longtemps — même principe de suggestion jamais automatique que §5ter de [[DOWNLOAD_SYSTEM.md]]).

## 5. Cache

Voir [[CACHE_SYSTEM.md]] pour l'architecture complète — options exposées : Taille maximale allouée, Nettoyage manuel, Reconstruction ([[MAINTENANCE_SYSTEM.md]]), Préchargement (On par défaut, désactivable pour les connexions limitées).

## 6. Jellyfin

Connexion/Déconnexion/Changement de serveur ([[JELLYFIN_INTEGRATION.md]] §6), Multi-serveurs (préparation, non engagé — un seul serveur actif à la fois à ce jour), Test de connexion (action manuelle, résultat immédiat succès/échec avec latence mesurée).

## 7. Comptes

Profil local (préférences propres à l'appareil, distinctes du compte Jellyfin), Import/Export ([[IMPORT_EXPORT_SYSTEM.md]]), Réinitialisation (renvoi [[DIALOG_LIBRARY.md]] §5).

## 8. Confidentialité

| Option | Comportement |
|---|---|
| Analytics | **N'existe pas** — cohérent avec [[PRODUCT_RULES.md]] §10, aucune télémétrie serveur ; ce réglage n'a pas de case à cocher car la fonctionnalité elle-même n'existe pas, jamais un Toggle sur « Off » qui suggérerait qu'un Toggle « On » serait possible |
| Crash Reports | Opt-in explicite uniquement si engagé un jour — non implémenté à ce jour, signalé plutôt que masqué |
| Logs | Voir [[LOGGING_SYSTEM.md]] |
| Stockage local | Renvoi vers Storage/Cache (§4-5) |
| Suppression des données | Renvoi [[DIALOG_LIBRARY.md]] §5-6 |

## 9. Développeur

Voir Developer Panel ([[SETTINGS_COMPONENTS.md]]) pour l'anatomie — Debug Mode, Logs ([[LOGGING_SYSTEM.md]]), Performance Overlay, Network Inspector, Cache Inspector, Theme Inspector, Feature Flags ([[FEATURE_FLAGS.md]]) — chacun décrit dans son document système respectif, non redécrits ici.

## 10. Labs

Voir [[FEATURE_FLAGS.md]] pour l'architecture — ce document ne fait que confirmer que Labs est la surface utilisateur des feature flags en statut expérimental, jamais un système distinct.

---

## 11. Checklist de validation

- [ ] Chaque option listée a une valeur par défaut explicite, jamais implicite.
- [ ] Aucune organisation par domaine n'est redécidée — cohérente avec [[SETTINGS_SPECIFICATION.md]].
- [ ] Analytics reste explicitement absent plutôt que présenté comme un Toggle désactivé par défaut.

---

## 12. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 11) | System Experience Designer / Senior Product Designer |

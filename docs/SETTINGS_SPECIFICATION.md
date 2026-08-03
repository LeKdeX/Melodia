# SETTINGS_SPECIFICATION.md — Spécification des paramètres (Phase 1, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Senior Product Manager / Jellyfin Specialist
> **Documents liés** : [[AUDIO_ENGINE.md]], [[JELLYFIN_INTEGRATION.md]], [[SECURITY_GUIDE.md]], [[PRODUCT_RULES.md]] §10

---

## 1. Principe d'organisation

Les paramètres sont organisés par domaine, jamais par fréquence d'usage supposée — un utilisateur doit pouvoir prédire dans quelle section se trouve un réglage sans le chercher (cohérent avec [[UX_PRINCIPLES.md]] §6). Aucun réglage avancé n'est mélangé aux réglages courants (voir §10, Labs/Développeur).

## 2. Audio

Égaliseur (activation, presets, réglage manuel — [[AUDIO_ENGINE.md]] §6), ReplayGain (activation, mode piste/album — [[AUDIO_ENGINE.md]] §5), crossfade (durée, activation — [[AUDIO_ENGINE.md]] §4), qualité de sortie si plusieurs options existent selon le format source.

## 3. Interface / Apparence

Thème clair/sombre/système ([[DESIGN_SYSTEM_ARCHITECTURE.md]] §2), densité d'affichage (vue compacte par défaut ou non, [[LIBRARY_SPECIFICATION.md]] §1), langue.

## 4. Animations

Niveau d'animation (complet / réduit / off), indépendant du réglage système `prefers-reduced-motion` mais avec ce dernier respecté par défaut ([[DESIGN_SYSTEM_ARCHITECTURE.md]] §5).

## 5. Téléchargements

Qualité de téléchargement, téléchargement automatique (ex. playlists épinglées), limite de stockage utilisée, gestion/nettoyage manuel ([[DATA_LAYER.md]] §2.3).

## 6. Jellyfin

Gestion des serveurs connectés (ajout/suppression, [[JELLYFIN_INTEGRATION.md]] §6), fréquence de synchronisation, resynchronisation manuelle, déconnexion avec choix explicite de conservation du cache ([[USER_JOURNEYS.md]] §11).

## 7. Bibliothèque

Champs affichés par défaut dans la vue liste, comportement de la bibliothèque intelligente ([[LIBRARY_SPECIFICATION.md]] §3).

## 8. Confidentialité

Activation/désactivation de l'historique d'écoute local ([[PRODUCT_RULES.md]] §10, [[STATISTICS_SPECIFICATION.md]]), consultation et suppression complète de l'historique, gestion de toute télémétrie opt-in si elle existe (aucune activée par défaut).

## 9. Performances

Affichage de diagnostics de performance de base (utile pour l'utilisateur avancé qui constate un ralentissement), sans exposer de détail d'implémentation technique brut (cohérent avec [[SECURITY_GUIDELINES.md]] §8, pas de détail interne exposé inutilement).

## 10. Débogage / Développeur / Labs

- **Débogage** : export de journaux locaux expurgés de toute donnée sensible avant export ([[SECURITY_GUIDELINES.md]] §9), utile pour le signalement de bug.
- **Développeur** : réservé aux contributeurs/utilisateurs avancés, accès non mis en avant dans le parcours standard (pas caché de façon obscure, simplement pas promu — cohérent avec [[UX_PRINCIPLES.md]] §8).
- **Labs** : fonctionnalités expérimentales activables volontairement, toujours clairement identifiées comme non stabilisées, jamais activées par défaut.

## 11. Sauvegarde / Import / Export

Export des données locales (playlists, favoris, historique si activé, préférences) dans un format portable, import symétrique — garantit que l'utilisateur ne perd jamais ses données personnalisées en cas de changement d'appareil ou de réinstallation, cohérent avec la valeur de propriété des données ([[PRODUCT_VALUES.md]] §4).

## 12. Notifications

| Catégorie | Comportement par défaut |
|---|---|
| Lecture (ex. fin de file d'attente) | Discrète, dans l'application uniquement |
| Téléchargements (complétion, échec) | Discrète, dans l'application |
| Synchronisation (échec de sync) | Visible mais non intrusive — un échec silencieux serait pire qu'une notification |
| Mises à jour de l'application | Non intrusive, jamais un blocage de l'usage courant |
| Nouveautés bibliothèque | **Désactivée par défaut** — rejoint directement [[PRODUCT_VALUES.md]] §4 (« le silence est une fonctionnalité ») ; activable volontairement |
| Messages promotionnels/marketing | **N'existent pas** — aucun canal de ce type n'est prévu, cohérent avec [[PROJECT_CHARTER.md]] §4 |

Chaque catégorie de notification est désactivable indépendamment — jamais un interrupteur global unique qui force un choix entre tout ou rien.

---

## 13. Checklist de validation

- [ ] Aucun réglage avancé n'apparaît dans les sections courantes.
- [ ] La section Confidentialité permet une suppression complète et immédiate de l'historique local, pas seulement une désactivation future.
- [ ] Aucune notification n'est activée par défaut au-delà de ce qui sert directement une action initiée par l'utilisateur (téléchargement, synchronisation).

---

## 14. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 2) | Senior Product Manager / Jellyfin Specialist |

# OFFLINE_SYSTEM.md — Système hors ligne (Phase 9)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Audio Software Engineer / Frontend Architect
> **Documents liés** : [[STATE_COMPONENTS.md]] (Offline State), [[ARCHITECTURE_PRINCIPLES.md]] §3, [[COLLECTION_COMPONENTS.md]] §6

> **Cadrage** : `Offline State` a déjà un traitement compact dans [[STATE_COMPONENTS.md]] (bannière persistante + fonctionnalités dégradées listées). Ce document approfondit ce qui restait non spécifié : synchronisation au retour en ligne, résolution de conflits, bibliothèque locale.

---

## 1. Détection et entrée en mode hors ligne

Détection automatique de la perte de connexion réseau (pas seulement au serveur Jellyfin — une perte de connexion générale et une indisponibilité du seul serveur Jellyfin sont distinguées, la seconde permettant de garder certaines fonctionnalités type Cast désactivées mais la lecture locale intacte). Entrée en mode hors ligne : jamais un blocage de l'interface, uniquement les fonctionnalités qui dépendent réellement du réseau se désactivent ([[ARCHITECTURE_PRINCIPLES.md]] §3, priorité au local).

## 1bis. Mode avion — bascule manuelle explicite (ajout Phase 11)

Distinct de la détection automatique (§1) : un réglage explicite (Toggle Row, [[SETTINGS_COMPONENTS.md]]) force le mode hors ligne même si une connexion réseau réelle est disponible — utile pour économiser la batterie ou éviter une synchronisation involontaire sur un réseau limité (data mobile). **Règle** : le mode avion applicatif est indépendant du mode avion système (OS) — Melodia respecte les deux indépendamment, jamais une supposition que l'un implique l'autre. Désactivation : reprise immédiate de la détection automatique (§1), jamais un état intermédiaire ambigu.

## 2. Bibliothèque locale en mode hors ligne

Uniquement les éléments téléchargés ([[DOWNLOAD_SYSTEM.md]]) restent lisibles et visibles pleinement — le reste de la bibliothèque (non téléchargée) reste consultable en lecture seule (métadonnées déjà en cache local, [[DATA_LAYER.md]]) mais non lisible, chaque élément non disponible hors ligne étant marqué visuellement (badge, [[TRACK_COMPONENTS.md]] §4) plutôt que masqué — l'utilisateur voit toujours l'étendue réelle de sa bibliothèque, jamais une vue tronquée qui suggérerait une perte de contenu.

## 3. Statut de synchronisation

Indicateur discret et permanent ([[MOTION_GUIDELINES.md]] §9) dans la TopBar ([[TOPBAR_SPECIFICATION.md]] §4) — trois états : synchronisé, synchronisation en cours, hors ligne (en attente de synchronisation). Jamais un état « erreur de synchronisation » anxiogène pour une simple absence de réseau — l'absence de réseau est un état normal et prévu du produit, pas une erreur.

## 4. Retour en ligne — synchronisation automatique

Dès la reconnexion détectée, synchronisation automatique et silencieuse des changements effectués hors ligne (favoris ajoutés, playlists modifiées, historique d'écoute) vers l'état serveur — jamais une action manuelle requise pour déclencher cette synchronisation de base.

## 5. Conflits — détection

Un conflit survient quand un même élément (playlist, favori) a été modifié à la fois hors ligne sur cet appareil et sur le serveur/un autre appareil pendant la déconnexion — cohérent avec le statut encore ouvert de la stratégie de résolution de conflit déjà signalé ([[QUEUE_SPECIFICATION.md]] §6quater pour la file spécifiquement, [[ARCHITECTURE_PRINCIPLES.md]] §3.3 pour le principe général). Ce document ne tranche pas cette stratégie, il pose le comportement de surface qui doit rester vrai quelle que soit la stratégie technique retenue plus tard (§6).

## 6. Conflits — résolution, contraintes de surface

- **Jamais de perte silencieuse** : une modification locale qui serait écrasée par la résolution automatique est toujours signalée à l'utilisateur après coup (notification, [[NOTIFICATION_LIBRARY.md]]), jamais perdue sans trace.
- **Jamais de blocage bloquant** : la résolution de conflit ne doit jamais interrompre l'usage courant de l'application en attendant une décision utilisateur — un conflit se résout par une règle par défaut documentée (ex. la modification la plus récente gagne) avec un moyen de consultation/annulation après coup, jamais une modale bloquante systématique pour chaque conflit mineur.
- **Playlists collaboratives** (statut technique encore ouvert, [[FEATURE_BIBLE.md]] §5) : si engagées, nécessiteront une stratégie de conflit plus fine qu'un simple « le plus récent gagne » — signalé comme dépendance future, non résolu ici.

## 7. États (renvoi)

Voir [[STATE_COMPONENTS.md]] (Offline State) pour l'anatomie complète du bandeau et des indicateurs — non redécrite ici.

## 8. Bibliothèque hors ligne vs Downloaded

Voir [[COLLECTION_COMPONENTS.md]] §6 pour la distinction déjà actée entre la vue « Offline » (ce qui est réellement accessible maintenant) et « Downloaded » (tout ce qui a été téléchargé, y compris potentiellement corrompu/supprimé du stockage) — non redécrite ici.

---

## 9. Checklist de validation

- [ ] Aucune fonctionnalité non liée au réseau n'est désactivée en mode hors ligne (§1).
- [ ] Aucun conflit ne se résout en perdant silencieusement une modification locale sans le signaler (§6).
- [ ] Le statut de synchronisation (§3) ne présente jamais l'absence de réseau comme une erreur.

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 9) | Audio Software Engineer / Frontend Architect |
| 0.2.0 | 2026-08-04 | Phase 11 : ajout §1bis (mode avion, bascule manuelle distincte de la détection automatique) — au lieu de créer un second OFFLINE_SYSTEM.md | Synchronization Engineer |

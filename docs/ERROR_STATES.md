# ERROR_STATES.md — Spécification des états d'erreur (Phase 1, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : UX Research Lead / Jellyfin Specialist
> **Documents liés** : [[JELLYFIN_INTEGRATION.md]] §4, [[DATA_LAYER.md]], [[UX_PRINCIPLES.md]] §6

> **Principe transverse** : une erreur n'est jamais un cul-de-sac. Chaque état ci-dessous précise le message, la cause probable communiquée à l'utilisateur (en langage clair, jamais un code technique brut, cohérent avec [[SECURITY_GUIDELINES.md]] §8) et l'action de récupération proposée.

---

## 1. Serveur Jellyfin inaccessible

- **Message** : « Impossible de joindre votre serveur. Vérifiez votre connexion ou l'adresse du serveur. »
- **Comportement** : contenu déjà synchronisé reste utilisable ([[ARCHITECTURE_PRINCIPLES.md]] §3) ; bannière discrète et persistante tant que la connexion n'est pas rétablie, jamais une modale bloquante répétée.
- **Récupération** : nouvelle tentative automatique en arrière-plan à intervalle croissant, action manuelle « réessayer » toujours disponible.

## 2. Morceau introuvable (retiré côté serveur ou fichier déplacé)

- **Message** : « Ce morceau n'est plus disponible sur votre serveur. »
- **Comportement** : passage automatique à la piste suivante de la file, jamais un blocage de la lecture ([[PLAYER_SPECIFICATION.md]] §3).
- **Récupération** : proposition de retirer le morceau des playlists qui le contiennent encore.

## 3. Cache local corrompu

- **Message** : « Un problème est survenu avec les données locales. »
- **Comportement** : détection au démarrage ([[DATA_LAYER.md]] §2.2, migration/intégrité), jamais un crash silencieux.
- **Récupération** : proposition de réinitialisation du cache avec resynchronisation complète depuis le serveur — action explicite, jamais automatique sans confirmation (donnée locale potentiellement précieuse : favoris, playlists non encore resynchronisées).

## 4. Images/pochettes manquantes

- **Message** : aucun message d'erreur visible — traité comme un cas normal, pas une erreur.
- **Comportement** : illustration générique cohérente ([[PLAYER_SPECIFICATION.md]] §11, [[LIBRARY_SPECIFICATION.md]] §9), jamais une icône d'erreur ou un cadre brisé.

## 5. Erreur réseau générique (hors indisponibilité serveur complète)

- **Message** : contextuel à l'action en cours (« Impossible de charger cette page », « La recherche a échoué »).
- **Comportement** : jamais une erreur globale qui invalide toute l'application pour un échec localisé à une seule requête.
- **Récupération** : action « réessayer » locale à l'endroit de l'échec.

## 6. Erreur Jellyfin typée ([[JELLYFIN_INTEGRATION.md]] §4)

| Type | Message utilisateur | Récupération |
|---|---|---|
| `Unauthorized` | « Votre session a expiré, reconnectez-vous. » | Renouvellement silencieux si identifiants persistants disponibles, sinon invite de reconnexion |
| `ServerVersionUnsupported` | « Votre version de serveur Jellyfin n'est pas encore prise en charge. » | Lien vers la plage de versions supportées, pas de contournement automatique risqué |
| `RateLimited` | « Trop de requêtes, nouvelle tentative dans quelques instants. » | Nouvelle tentative automatique différée |
| `NotFound` | Voir §2 (morceau introuvable) ou équivalent selon le contexte | — |

## 7. Stockage saturé

- **Message** : « Espace de stockage insuffisant pour ce téléchargement. »
- **Comportement** : téléchargement interrompu proprement avant d'atteindre 100 % d'utilisation du disque, jamais un remplissage total qui déstabiliserait le système.
- **Récupération** : accès direct à la gestion du stockage téléchargé ([[SETTINGS_SPECIFICATION.md]] §5).

## 8. Connexion expirée (jeton)

- **Message** : voir §6, `Unauthorized`.
- **Comportement** : la lecture du contenu déjà mis en cache localement continue sans interruption — l'expiration du jeton n'affecte que les nouvelles requêtes serveur, jamais la lecture en cours ([[PRODUCT_RULES.md]] §2).

## 9. Conflit de synchronisation (multi-appareils)

- **Statut** : comportement non encore défini — dépend de l'ADR de résolution de conflit non rédigé ([[ARCHITECTURE_PRINCIPLES.md]] §3.3, [[EXTREME_SCENARIOS.md]] §5). Ce document ne invente pas un comportement pour combler ce vide ; il est signalé comme ouvert, cohérent avec la règle d'honnêteté.

---

## 10. Principes transverses de conception des erreurs

1. Toujours en langage clair, jamais un code d'erreur brut affiché seul.
2. Toujours une action de récupération, même si c'est « réessayer ».
3. Jamais une erreur localisée qui bloque l'ensemble de l'application.
4. Jamais de perte de données locales sans confirmation explicite.
5. La lecture en cours est le dernier élément à être affecté par toute erreur, quelle qu'elle soit ([[PRODUCT_RULES.md]] §2).

---

## 11. Checklist de validation

- [ ] Chaque erreur a un message en langage clair, une cause probable et une action de récupération.
- [ ] Aucune erreur ne peut interrompre une lecture déjà en cours.
- [ ] Le cas non résolu (§9) reste signalé explicitement, pas comblé par une invention.

---

## 12. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 2) | UX Research Lead / Jellyfin Specialist |

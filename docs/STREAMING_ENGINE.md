# STREAMING_ENGINE.md — Streaming Jellyfin (Moteur Audio)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Senior Media Platform Engineer
> **Documents liés** : [[AUDIO_ENGINE.md]] §0bis.2, [[JELLYFIN_INTEGRATION.md]] §7bis, [[BUFFER_MANAGEMENT.md]]

[[AUDIO_ENGINE.md]] §0bis.2 a déjà posé la contrainte de priorité — le streaming est le dernier palier, jamais la source par défaut si une source locale existe. Ce document couvre ce que cette priorité implique une fois que le streaming est effectivement la source active (`kind: 'stream'`).

---

## 1. Résolution de l'URL de streaming

`TrackRepository.getPlaybackSource()` ([[REPOSITORY_PATTERN.md]] §2) délègue à `MusicSource.getStreamUrl(trackId)` ([[ARCHITECTURE_PRINCIPLES.md]] §2.1, déjà défini) quand aucune source locale/cache n'est disponible — l'URL retournée inclut le profil de qualité actif ([[AUDIO_ENGINE.md]] §5bis) et le jeton d'authentification en en-tête HTTPS ([[SECURITY_GUIDE.md]] §3bis), jamais en paramètre d'URL visible dans les journaux réseau.

## 2. Adaptation réseau

- Le profil de qualité (§5bis de [[AUDIO_ENGINE.md]]) reste **fixe pendant une session de lecture** — pas d'adaptation dynamique du débit façon streaming vidéo (ABR) : la bibliothèque musicale de Melodia est une collection possédée, pas un flux dont la qualité doit s'ajuster en continu à la bande passante instantanée. Un changement de profil s'applique au prochain changement de piste, jamais au milieu d'une piste en cours.
- Si le débit réseau mesuré est durablement insuffisant pour le profil actif (buffer qui se vide plus vite qu'il ne se remplit, [[BUFFER_MANAGEMENT.md]] §3), une suggestion (jamais automatique) de rétrograder le profil de qualité est proposée — cohérent avec la règle déjà actée qu'aucune dégradation de qualité n'est appliquée sans consentement explicite ([[DOWNLOAD_SYSTEM.md]] §7, principe similaire déjà appliqué au téléchargement).

## 3. Gestion des erreurs de streaming

Voir la taxonomie complète dans [[PLAYBACK_STATE_MACHINE.md]] §4 — ce document précise uniquement les cas propres au streaming : timeout de connexion initiale (avant tout octet reçu, distinct d'une perte de connexion en cours de lecture déjà couverte par l'état `Offline`), et erreur 401 (jeton expiré) qui déclenche le flux de renouvellement déjà acté ([[JELLYFIN_INTEGRATION.md]] §2) avant de re-résoudre la source.

## 4. Reconnexion

Suit exactement le cycle `Offline → Reconnecting` déjà spécifié ([[PLAYBACK_STATE_MACHINE.md]] §5) — ce document ajoute uniquement le détail réseau : la reconnexion réutilise la stratégie de retry déjà actée pour l'API Jellyfin en général ([[JELLYFIN_INTEGRATION.md]] §7bis, backoff exponentiel plafonné), jamais une stratégie de retry propre au streaming audio qui dupliquerait ce mécanisme.

## 5. Requêtes par plage (Range Requests)

Le streaming Jellyfin utilise nativement les en-têtes HTTP `Range` pour permettre le seek sans re-télécharger le flux depuis le début — le navigateur/`HTMLAudioElement` gère ceci nativement pour une source HTTP standard, aucune implémentation propriétaire requise côté Melodia.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas la résolution de source ni la priorité locale/cache/streaming (voir [[AUDIO_ENGINE.md]] §0bis.2).
- Ne redéfinit pas la gestion du buffer elle-même (voir [[BUFFER_MANAGEMENT.md]]).
- Ne redéfinit pas la résilience réseau générale de l'API Jellyfin (voir [[JELLYFIN_INTEGRATION.md]] §7bis).

## 7. Checklist de validation

- [ ] Le profil de qualité ne change jamais au milieu d'une piste en cours de lecture (§2).
- [ ] Aucune dégradation de qualité automatique sans consentement explicite (§2).
- [ ] Le jeton d'authentification ne transite jamais en paramètre d'URL visible (§1).

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Moteur Audio) | Senior Media Platform Engineer |

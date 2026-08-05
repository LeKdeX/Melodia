# DIAGNOSTICS_SYSTEM.md — Diagnostics système (Phase 11)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Performance Engineer / Principal Platform Architect
> **Documents liés** : [[SETTINGS_COMPONENTS.md]] (Developer Panel), [[PERFORMANCE_GUIDE.md]], [[CACHE_SYSTEM.md]]

> **Cadrage** : aucune couverture existante ne rassemblait ces informations en un tableau de bord unique — ce document comble ce vide, en renvoyant vers chaque système déjà spécifié pour le détail plutôt que de le redécrire.

---

## 1. Santé du serveur

Statut de connexion (renvoi [[OFFLINE_SYSTEM.md]] §3), latence mesurée (dernier Test de connexion, [[SETTINGS_SYSTEM.md]] §6), version du serveur Jellyfin détectée ([[JELLYFIN_INTEGRATION.md]] §4 pour la plage supportée).

## 2. Qualité réseau

Débit estimé (mesure passive pendant le streaming, jamais un test actif qui consommerait des données sans consentement), type de connexion si détectable (Wi-Fi/données mobiles) — informe la décision « Wi-Fi uniquement » ([[DOWNLOAD_SYSTEM.md]]).

## 3. Occupation du cache

Par catégorie ([[CACHE_SYSTEM.md]] §1) : taille actuelle / limite configurée, avec action directe vers Nettoyage (§6 de [[CACHE_SYSTEM.md]]).

## 4. Occupation disque

Espace total utilisé par Melodia (téléchargements + cache confondus, mais affichés distinctement — cohérent avec [[DOWNLOAD_SYSTEM.md]] §6, jamais une seule métrique qui mélangerait les deux) versus espace disponible sur l'appareil.

## 5. Utilisation mémoire

Empreinte mémoire du processus applicatif — utile principalement en contexte de diagnostic développeur ([[SETTINGS_SYSTEM.md]] §9, Performance Overlay), pas un indicateur exposé par défaut à l'utilisateur non technique.

## 6. Performances

Fréquence d'images réelle mesurée (comparée au budget 60 FPS, [[PERFORMANCE_BUDGET.md]] §3), temps de démarrage mesuré (comparé au budget <2s) — affichage en Statistiques techniques réservées au panneau développeur, jamais mélangées aux Statistiques d'écoute ([[STATISTICS_SCREENS.md]], registre totalement différent : technique vs personnel).

## 6bis. État de synchronisation et des téléchargements (ajout Plateforme Offline)

> §1 couvre déjà la santé du serveur (connexion, latence, version). §4 couvre déjà l'occupation disque distincte téléchargements/cache. Cette section ajoute les deux cartes qui manquaient explicitement : l'état du moteur de synchronisation et celui de la file de téléchargement, jamais confondus l'un avec l'autre ni avec §1/§4.

- **État de synchronisation** : mode actif ([[SYNC_ENGINE_SPECIFICATION.md]] §2bis, Manual/Scheduled/Background), horodatage du dernier cycle réussi, nombre d'éléments en attente dans le journal de changements locaux ([[SYNC_ENGINE_SPECIFICATION.md]] §4bis) — action directe vers Synchronisation manuelle si un retard anormal est détecté.
- **État des téléchargements** : nombre d'éléments actifs/en attente/échoués, débit agrégé de la file — renvoi direct vers l'écran Téléchargements ([[DOWNLOAD_SCREENS.md]]) pour le détail par élément, jamais dupliqué ici.

## 7. Composition de l'écran Diagnostics

```
[TopBar — titre "Diagnostics"]
[Main]
├─ Santé du serveur (§1) — Statistics Card
├─ Qualité réseau (§2) — Statistics Card
├─ Occupation cache/disque (§3-4) — Charts (barres empilées par catégorie)
├─ État de synchronisation et des téléchargements (§6bis) — Statistics Cards
└─ Performances (§5-6) — visible uniquement si Debug Mode actif ([[SETTINGS_SYSTEM.md]] §9)
[Mini Player — persistant]
```

## 8. Export

Action « Exporter les diagnostics » (renvoi [[MAINTENANCE_SYSTEM.md]]) — génère un instantané textuel de toutes les métriques de cette page, jamais transmis automatiquement, uniquement copié/partagé par action explicite de l'utilisateur (ex. pour du support communautaire) — cohérent avec [[PRODUCT_RULES.md]] §10.

## 9. Accessibilité et confidentialité

Cette page reste accessible au clavier/lecteur d'écran comme tout écran de contenu ([[ACCESSIBILITY_GUIDE.md]]) — aucune donnée de cette page n'est envoyée à un serveur Melodia (il n'en existe pas), cohérent avec l'absence de télémétrie déjà actée ([[SETTINGS_SYSTEM.md]] §8).

---

## 10. Checklist de validation

- [ ] Chaque métrique a une source clairement identifiée, aucune valeur inventée ou approximée sans le signaler.
- [ ] Aucune donnée de diagnostic n'est transmise automatiquement.
- [ ] Les métriques techniques (§6) restent séparées des statistiques d'écoute personnelles.

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 11) | Performance Engineer / Principal Platform Architect |
| 0.2.0 | 2026-08-04 | Plateforme Offline : ajout §6bis (cartes dédiées état de synchronisation et des téléchargements) — au lieu de créer OBSERVABILITY.md en doublon | Resilience Engineer |

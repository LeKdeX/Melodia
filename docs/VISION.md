# VISION.md — Vision produit (Phase 1)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Chief Product Officer / Product Strategist
> **Documents liés** : [[PROJECT_CHARTER.md]] §1, [[MISSION.md]], [[COMPETITIVE_ANALYSIS.md]]

Ce document approfondit la vision énoncée en une phrase dans [[PROJECT_CHARTER.md]] §1 — il ne la contredit pas, il explique en profondeur le raisonnement produit qui la sous-tend, avec l'analyse concurrentielle nécessaire pour la justifier.

---

## 1. Pourquoi ce produit existe

Des millions de personnes possèdent une bibliothèque musicale personnelle — achetée, rippée, collectionnée sur des années — et un serveur Jellyfin pour l'héberger. Ce qu'elles n'ont pas, c'est une **manière de l'écouter qui donne envie d'y revenir**. Jellyfin résout l'hébergement et le streaming ; il ne résout pas l'expérience d'écoute quotidienne. Cette lacune est le problème que Melodia résout.

## 2. Le problème résolu

Le problème n'est pas technique (Jellyfin transcode, stream et sert les fichiers très bien). Le problème est **expérientiel** : un client Jellyfin générique traite la musique comme une catégorie de médias parmi d'autres (à côté des films et séries), avec une interface pensée pour parcourir un catalogue, pas pour vivre avec sa musique au quotidien. Résultat mesurable : les utilisateurs qui pourraient être en contrôle total de leur bibliothèque via Jellyfin continuent d'ouvrir Spotify par réflexe, parce que l'expérience y est plus agréable — même en sachant qu'ils paient et cèdent leurs données pour cela. Melodia existe pour retirer cet arbitrage.

## 3. Pourquoi Jellyfin (client natif) ne suffit pas

- Conçu pour l'ensemble des médias (films, séries, musique, photos) — la musique hérite de patterns de navigation pensés pour du contenu vidéo (grilles de vignettes, métadonnées orientées épisode/saison).
- Aucune continuité de lecture pensée comme fonctionnalité centrale (contrairement à un lecteur audio dédié où la barre de lecture est l'élément permanent de l'interface).
- Pas de moteur de recommandation/découverte au sein de sa propre bibliothèque (retrouver un morceau oublié dépend entièrement de la mémoire de l'utilisateur ou d'un parcours manuel de dossiers).
- Voir [[COMPETITIVE_ANALYSIS.md]] §1 pour le détail complet, y compris les clients tiers Jellyfin dédiés à la musique (Finamp, Symfonium) qui comblent partiellement ce manque — et où ils s'arrêtent.

## 4. Pourquoi Plexamp ne suffit pas

Plexamp est la preuve qu'un client musical dédié au-dessus d'un serveur multimédia générique (Plex) est un problème résolvable — et c'est la référence la plus proche de l'ambition de Melodia. Ce qui limite Plexamp pour notre utilisateur cible :
- Lié à l'écosystème Plex, pas Jellyfin — inutilisable pour quelqu'un qui a choisi Jellyfin (souvent précisément pour rester hors des écosystèmes propriétaires, voir [[PERSONAS.md]], persona « Utilisateur Jellyfin »).
- Fonctionnalités avancées (Sonic Analysis, DJ) dépendantes des serveurs cloud Plex — en tension avec l'ethos auto-hébergé qui motive le choix initial du serveur.
- Voir [[COMPETITIVE_ANALYSIS.md]] §2 pour l'analyse complète — Plexamp reste une référence de qualité d'exécution à égaler, pas un problème à résoudre différemment.

## 5. Pourquoi Spotify (et les plateformes commerciales) ne suffisent pas

Ce n'est pas un problème de qualité d'expérience — Spotify a l'une des meilleures interfaces du marché ([[COMPETITIVE_ANALYSIS.md]] §3). Le problème est structurel, pas expérientiel :
- La bibliothèque de l'utilisateur (fichiers achetés, rippés, rares, non disponibles en streaming) n'y existe pas.
- Abonnement récurrent pour accéder à sa propre écoute quotidienne.
- Catalogue soumis aux retraits de licence — un album disponible aujourd'hui peut disparaître demain, jamais le cas d'un fichier possédé.
- Collecte de données d'écoute à des fins publicitaires/commerciales, en tension directe avec la motivation même de l'auto-hébergement.
- **Le paradoxe que Melodia résout** : Spotify gagne sur l'expérience, Jellyfin gagne sur la propriété — l'utilisateur ne devrait jamais avoir à choisir entre les deux.

## 6. Pourquoi notre approche est différente

Melodia ne cherche pas à cloner Spotify avec des fichiers locaux, ni à améliorer marginalement l'interface musicale de Jellyfin. L'approche est de traiter Jellyfin comme **un simple fournisseur de données** ([[ARCHITECTURE_PRINCIPLES.md]] §2) et de construire au-dessus une expérience conçue de zéro pour un seul objectif : l'écoute quotidienne de sa propre musique. Aucune fonctionnalité vidéo, aucune fonctionnalité multi-médias, aucun compromis d'interface hérité d'un autre cas d'usage.

## 7. L'émotion que le produit doit transmettre

**Contrôle serein.** Pas l'excitation tape-à-l'œil d'une plateforme de découverte infinie, pas l'anxiété d'un catalogue qui pourrait disparaître — la confiance tranquille de quelqu'un qui sait que sa musique est là, qu'elle sera toujours là, et que la retrouver ne demande jamais d'effort. L'utilisateur ne doit jamais ressentir qu'il « gère un serveur » en utilisant Melodia — il doit ressentir qu'il écoute de la musique, point final.

## 8. Image de marque

Premium sans ostentation. Melodia ne cherche pas à impressionner par la surenchère visuelle (contrairement à certains lecteurs audiophiles surchargés d'indicateurs techniques, voir [[COMPETITIVE_ANALYSIS.md]] §5 Roon) — la sophistication est dans la fluidité et la justesse des détails, pas dans la densité d'information affichée. Une marque qui inspire confiance parce qu'elle est cohérente et prévisible, pas parce qu'elle est spectaculaire.

## 9. Comment l'utilisateur doit se sentir en utilisant l'application

- **En ouvrant l'app** : « ma musique est déjà là, prête » — jamais un temps de chargement perçu comme une attente.
- **En cherchant un morceau** : « évidemment que je l'ai trouvé instantanément » — la recherche rapide n'est pas remarquée précisément parce qu'elle ne déçoit jamais (voir [[UX_PRINCIPLES.md]]).
- **En naviguant pendant l'écoute** : aucune anxiété que la musique s'arrête — la continuité de lecture est un acquis, jamais un risque perçu.
- **Après plusieurs jours d'absence** : reprendre exactement là où il/elle s'était arrêté(e), sans reconstruire son contexte mental (voir [[USER_JOURNEYS.md]], parcours « retour après plusieurs jours »).
- **En comparant mentalement à Spotify** : ne pas ressentir de sacrifice — au contraire, une fierté discrète de posséder réellement sa musique sans compromis d'expérience.

---

## 10. Checklist de validation

- [ ] Chaque affirmation de supériorité concurrentielle renvoie à une analyse détaillée dans [[COMPETITIVE_ANALYSIS.md]], jamais une affirmation gratuite.
- [ ] La vision reste cohérente avec [[PROJECT_CHARTER.md]] §1 et §4 (ce que Melodia n'est pas) — aucune contradiction introduite.
- [ ] L'émotion cible (§7) est traçable jusqu'à des principes concrets dans [[UX_PRINCIPLES.md]] et [[PRODUCT_RULES.md]].

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1) | Chief Product Officer / Product Strategist |

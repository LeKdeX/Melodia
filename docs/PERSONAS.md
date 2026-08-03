# PERSONAS.md — Personas (Phase 1)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : UX Researcher / Product Manager Senior
> **Documents liés** : [[VISION.md]], [[MISSION.md]] §3, [[USER_JOURNEYS.md]]

Ces personas ne sont pas des profils démographiques isolés — ce sont des angles d'usage qu'une même personne peut cumuler (l'audiophile est aussi souvent l'utilisateur clavier). Chaque décision produit doit être confrontée à ceux qu'elle affecte, listés en fin de fiche.

---

## 1. L'utilisateur occasionnel

- **Âge** : 25-45 ans, pas nécessairement technophile.
- **Habitudes** : écoute de la musique en fond pendant le travail ou les tâches quotidiennes, playlists simples, peu d'interaction active avec l'interface une fois la lecture lancée.
- **Objectifs** : lancer de la musique rapidement, ne pas avoir à réfléchir à l'organisation de sa bibliothèque.
- **Frustrations** : interfaces trop denses (rejoint le constat MusicBee/Roon, [[COMPETITIVE_ANALYSIS.md]] §5 et §9) ; configuration initiale perçue comme technique (a un serveur Jellyfin, parfois installé par quelqu'un d'autre du foyer).
- **Attentes** : que ça marche, tout de suite, sans réglage.
- **Cas d'utilisation clé** : ouvrir l'app, taper le nom d'un artiste, écouter — zéro friction sur ce chemin ([[SUCCESS_METRICS.md]]).

## 2. L'audiophile

- **Âge** : 30-60 ans.
- **Habitudes** : attention portée à la qualité de restitution, fichiers lossless, métadonnées soignées (ReplayGain taggé, pochettes haute résolution).
- **Objectifs** : une fidélité de restitution sans compromis, un égaliseur/traitement disponible mais non imposé.
- **Frustrations** : perte de qualité audio non signalée, absence de ReplayGain/gapless, métadonnées tronquées.
- **Attentes** : parité avec Roon sur le sérieux du traitement audio ([[COMPETITIVE_ANALYSIS.md]] §5), sans la lourdeur d'installation.
- **Cas d'utilisation clé** : vérifier qu'un album se lit vraiment en gapless, ajuster l'égaliseur pour une session d'écoute attentive ([[AUDIO_ENGINE.md]] §3, §6).

## 3. Le collectionneur

- **Âge** : tout âge, ancienneté de collection variable (parfois plusieurs décennies de fichiers).
- **Habitudes** : bibliothèque volumineuse (souvent > 50 000 titres), métadonnées parfois hétérogènes selon l'origine des fichiers, attachement fort à l'exhaustivité de sa collection.
- **Objectifs** : ne jamais perdre un fichier ou une métadonnée, retrouver n'importe quel morceau même rare.
- **Frustrations** : recherche qui échoue sur un titre existant, dégradation de performance à grande échelle (justifie directement le budget 200 000+ titres, [[PERFORMANCE_BUDGET.md]] §3).
- **Attentes** : la bibliothèque se comporte de façon identique à 500 ou 300 000 titres — jamais de dégradation perceptible ([[EXTREME_SCENARIOS.md]] §1).
- **Cas d'utilisation clé** : parcourir une discographie complète d'un artiste obscur, vérifier qu'un album rare est bien indexé et cherchable.

## 4. L'utilisateur Jellyfin (déjà investi dans l'écosystème)

- **Âge** : tout âge, profil technophile (a déjà installé et configuré un serveur Jellyfin).
- **Habitudes** : utilise Jellyfin pour films/séries, cherche une meilleure expérience musicale sans quitter son serveur existant.
- **Objectifs** : connexion immédiate à son serveur existant, aucune duplication de configuration.
- **Frustrations** : devoir choisir entre un client Jellyfin générique médiocre pour la musique et une plateforme commerciale qui abandonne la propriété ([[VISION.md]] §3).
- **Attentes** : Melodia « comprend » son serveur mieux qu'un client générique, sans jamais paraître être un fork de Jellyfin ([[PROJECT_CHARTER.md]] §4).
- **Cas d'utilisation clé** : première connexion via les identifiants Jellyfin déjà existants, synchronisation immédiate et fidèle de la bibliothèque ([[USER_JOURNEYS.md]] parcours « connexion »).

## 5. Le passionné de musique (au sens large, découverte active)

- **Âge** : 18-40 ans typiquement, mais non exclusif.
- **Habitudes** : ajoute régulièrement de nouveaux fichiers à sa bibliothèque, explore ses propres archives, crée des playlists thématiques fréquemment.
- **Objectifs** : redécouvrir des morceaux oubliés de sa propre collection, organiser finement (playlists, genres).
- **Frustrations** : absence de mécanisme de redécouverte au sein de sa propre bibliothèque (angle mort identifié chez Jellyfin, comblé partiellement par Plexamp, [[COMPETITIVE_ANALYSIS.md]] §1-2).
- **Attentes** : un équivalent de la radio générée de Plexamp, mais ancré exclusivement dans sa propre collection.
- **Cas d'utilisation clé** : créer une playlist en quelques actions ([[SUCCESS_METRICS.md]]), lancer une lecture aléatoire pondérée qui redonne vie à des morceaux peu écoutés.

## 6. L'utilisateur mobile

- **Âge** : tout âge.
- **Habitudes** : écoute en déplacement, connexion réseau variable, interaction tactile exclusivement.
- **Objectifs** : accès fiable à sa musique même en connexion médiocre ou hors ligne, contrôle rapide à une main.
- **Frustrations** : rupture de lecture en cas de perte de connexion, cibles tactiles trop petites.
- **Attentes** : contenu téléchargé disponible sans dégradation, contrôle via MediaSession (écran verrouillé, casque) fiable ([[AUDIO_ENGINE.md]] §8).
- **Cas d'utilisation clé** : lecture hors ligne complète pendant un trajet ([[EXTREME_SCENARIOS.md]] §2).

## 7. L'utilisateur desktop

- **Âge** : tout âge, souvent en contexte de travail/session longue.
- **Habitudes** : application ouverte en arrière-plan pendant de longues sessions, multi-fenêtrage, changement d'application fréquent.
- **Objectifs** : consommation mémoire/CPU minimale en fond, contrôle rapide sans reprendre le focus complet de l'application.
- **Frustrations** : applications gourmandes qui ralentissent la machine en tâche de fond.
- **Attentes** : respect strict des budgets de repos ([[PERFORMANCE_BUDGET.md]] §5), contrôle média système natif (raccourcis clavier multimédia, notification systray).
- **Cas d'utilisation clé** : changer de piste depuis un raccourci clavier global sans quitter son éditeur de code ou son navigateur.

## 8. L'utilisateur clavier (accessibilité et efficacité)

- **Âge** : tout âge — inclut à la fois les utilisateurs de technologies d'assistance et les power users qui préfèrent le clavier par efficacité.
- **Habitudes** : navigation exclusivement clavier, parfois lecteur d'écran.
- **Objectifs** : chaque action possible à la souris doit être possible au clavier, sans exception.
- **Frustrations** : pièges de focus, absence d'indication visuelle de focus, actions inaccessibles sans souris.
- **Attentes** : conformité WCAG 2.2 AA a minima ([[PROJECT_CHARTER.md]] §3.6), focus toujours visible ([[DESIGN_SYSTEM_ARCHITECTURE.md]] §5).
- **Cas d'utilisation clé** : parcourir toute la bibliothèque, lancer une lecture, gérer une playlist entièrement au clavier ([[DEFINITION_OF_DONE.md]], section Accessibilité).

---

## 9. Matrice de recoupement (quel persona est affecté par quelle zone du produit)

| Zone produit | Occasionnel | Audiophile | Collectionneur | Jellyfin | Passionné | Mobile | Desktop | Clavier |
|---|---|---|---|---|---|---|---|---|
| Recherche | ✓ | | ✓ | | ✓ | ✓ | ✓ | ✓ |
| Moteur audio (EQ/gapless) | | ✓ | | | | | | |
| Performance à grande échelle | | | ✓ | | | | | |
| Connexion/sync Jellyfin | | | | ✓ | | | | |
| Découverte interne | | | | | ✓ | | | |
| Mode hors ligne | | | | | | ✓ | | |
| Consommation ressources en fond | | | | | | | ✓ | |
| Accessibilité clavier | | | | | | | | ✓ |

---

## 10. Checklist de validation

- [ ] Chaque persona a un cas d'utilisation clé traçable jusqu'à [[USER_JOURNEYS.md]] ou [[SUCCESS_METRICS.md]].
- [ ] Aucun persona n'est un simple profil démographique sans objectif/frustration concrets.
- [ ] La matrice de recoupement (§9) est cohérente avec les priorités déjà actées ailleurs (ex. performance à grande échelle déjà budgétée, [[PERFORMANCE_BUDGET.md]]).

---

## 11. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1) | UX Researcher / Product Manager Senior |

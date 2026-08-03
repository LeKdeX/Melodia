# SCREEN_SPECIFICATIONS.md — Inventaire et spécification des écrans (Phase 1, volume 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Senior UX Designer / Product Designer
> **Documents liés** : [[NAVIGATION_GUIDE.md]], [[WIREFRAMES_FUNCTIONAL.md]], [[MOTION_GUIDELINES.md]]

> **Cadrage** : ce document définit le comportement de chaque écran (contenu, hiérarchie, états). La disposition spatiale (zones, priorités visuelles) est dans [[WIREFRAMES_FUNCTIONAL.md]] — les deux se lisent ensemble par nom d'écran, jamais dupliqués. Les écrans à comportement quasi identique sont regroupés en familles pour éviter de répéter 25 fois la même structure.

---

## 1. Inventaire complet des écrans

| Écran | Famille |
|---|---|
| Accueil | Contenu principal (§3) |
| Bibliothèque (Albums/Artistes/Morceaux/Genres/Collections) | Contenu principal (§3) |
| Page Album | Contenu principal (§3) |
| Page Artiste | Contenu principal (§3) |
| Page Playlist | Contenu principal (§3) |
| Favoris | Contenu principal (§3) |
| Recherche | Utilitaire (§4) |
| Téléchargements | Utilitaire (§4) |
| Historique | Utilitaire (§4) |
| Statistiques | Insight (§5) |
| Wrapped | Insight (§5) |
| Mini Player, Player (Compact/Expanded), Fullscreen Player, Vue immersive | Lecteur — voir [[PLAYER_SPECIFICATION.md]], non redupliqué ici |
| Paramètres | Système (§6) |
| Profil | Système (§6) |
| Labs | Système (§6) |
| À propos | Système (§6) |
| Connexion, Sélection du serveur, Synchronisation, Assistant de configuration | Onboarding — voir [[ONBOARDING_GUIDE.md]], non redupliqué ici |
| Écran d'erreur, Écran vide, Écran hors ligne, Chargement | Gabarits universels (§7) |

## 2. Principe transverse de hiérarchie visuelle

Sur tout écran de contenu : navigation (persistante) → titre/contexte de l'écran → action principale → contenu → lecteur (persistant, toujours au premier plan visuel malgré sa position fixe). Aucun écran ne fait exception à cet ordre de priorité.

---

## 3. Famille « Contenu principal »

**Objectif commun** : présenter une collection d'éléments musicaux navigables et actionnables immédiatement.

| Élément | Spécification |
|---|---|
| Contenu | Liste/grille d'éléments ([[LIBRARY_SPECIFICATION.md]] §1) + méta-information de section (nombre d'éléments, tri actif) |
| Hiérarchie visuelle | Titre de section > barre d'outils (tri/filtre/vue) > contenu > pagination virtualisée |
| Composants | Carte d'élément (pochette + titre + sous-titre), barre de filtre, sélecteur de vue |
| Ordre des éléments | Défini par le tri actif, mémorisé par section ([[LIBRARY_SPECIFICATION.md]] §4) |
| Responsive | Grille : colonnes adaptatives selon largeur ([[RESPONSIVE_GUIDE.md]]) ; liste : colonnes visibles réduites sur petit écran |
| Accessibilité | Chaque carte est un élément de liste unique au clavier/lecteur d'écran, jamais un groupe d'éléments cliquables imbriqués ambigus |
| Animations | Apparition en fondu au chargement, jamais en cascade sur repositionnement (tri) — voir [[MOTION_GUIDELINES.md]] §7 |
| États | Chargement (squelettes de carte, pas de spinner plein écran), vide ([[EMPTY_STATES.md]]), erreur ([[ERROR_STATES.md]]) |

**Variantes spécifiques** :
- **Page Album/Artiste/Playlist** : ajoute un en-tête riche (pochette grande taille, palette dynamique — [[PLAYER_SPECIFICATION.md]] §4, [[LIBRARY_SPECIFICATION.md]] §5-6) au-dessus de la liste de morceaux.
- **Accueil** : contenu composite (reprise de lecture, ajouts récents, Daily Mix si actif) plutôt qu'une collection unique — chaque bloc a son propre état de chargement indépendant.
- **Favoris** : identique à Bibliothèque mais filtré, sans outils de gestion de synchronisation propres (hérite de la bibliothèque).

---

## 4. Famille « Utilitaire »

**Objectif commun** : action rapide, retour à l'écran précédent naturel après usage.

| Écran | Spécificité |
|---|---|
| Recherche | Barre de saisie en position la plus accessible (§7 de [[NAVIGATION_GUIDE.md]]), résultats groupés par catégorie ([[SEARCH_SPECIFICATION.md]] §2), autocomplétion en temps réel sous la barre |
| Téléchargements | Liste avec état individuel par élément (en cours, terminé, échec — [[ERROR_STATES.md]] §7), gestion de l'espace de stockage utilisé en en-tête |
| Historique | Liste chronologique inversée (plus récent en premier), regroupement par jour, filtrage par période |

---

## 5. Famille « Insight »

**Objectif commun** : restituer l'historique d'écoute local ([[STATISTICS_SPECIFICATION.md]]) de façon valorisante, jamais culpabilisante.

| Écran | Spécificité |
|---|---|
| Statistiques | Tableau de bord modulaire (§3 de [[STATISTICS_SPECIFICATION.md]]), graphiques temporels, aucune comparaison sociale |
| Wrapped | Séquence de cartes plein écran ([[WRAPPED_SPECIFICATION.md]] §4), navigation par glissement/clic, sortie possible à tout moment sans perdre la progression |

---

## 6. Famille « Système »

| Écran | Spécificité |
|---|---|
| Paramètres | Organisation par domaine ([[SETTINGS_SPECIFICATION.md]]), recherche interne aux paramètres pour les grandes sections, indicateur visuel des réglages non par défaut |
| Profil | Identité du serveur connecté, accès à la gestion multi-serveurs ([[JELLYFIN_INTEGRATION.md]] §6) |
| Labs | Liste de fonctionnalités expérimentales, chacune avec un avertissement explicite de statut non stabilisé ([[SETTINGS_SPECIFICATION.md]] §10) |
| À propos | Version de l'application, liens vers la licence/le dépôt, mentions — écran statique, pas d'état dynamique |

---

## 7. Gabarits universels (états transverses)

Ces quatre gabarits ne sont pas des écrans autonomes — ce sont des états qui remplacent le contenu de n'importe quel écran de contenu principal ou utilitaire.

| Gabarit | Structure | Source du contenu |
|---|---|---|
| Chargement | Squelettes de composants respectant la structure finale (pas un spinner générique qui masque toute la mise en page) | [[MOTION_GUIDELINES.md]] §6 pour le traitement des pochettes en particulier |
| Vide | Illustration + message + action ([[EMPTY_STATES.md]], [[EMPTY_STATES_GUIDE.md]] pour le traitement visuel) | Cas par cas dans [[EMPTY_STATES.md]] |
| Erreur | Message clair + action de récupération ([[ERROR_STATES.md]], [[ERROR_EXPERIENCE.md]] pour le pattern UI) | Cas par cas dans [[ERROR_STATES.md]] |
| Hors ligne | Bannière persistante discrète en plus du contenu déjà en cache — jamais un écran qui remplace tout le contenu, puisque le contenu synchronisé reste utilisable ([[ARCHITECTURE_PRINCIPLES.md]] §3) | [[ERROR_STATES.md]] §1 |

---

## 8. Checklist de validation

- [ ] Chaque écran de l'inventaire (§1) appartient à une famille avec une spécification, aucun écran orphelin.
- [ ] Aucune spécification ne duplique le contenu déjà détaillé dans [[PLAYER_SPECIFICATION.md]], [[ONBOARDING_GUIDE.md]], [[ERROR_STATES.md]] ou [[EMPTY_STATES.md]].
- [ ] Le gabarit « Hors ligne » reste cohérent avec le principe de contenu déjà synchronisé toujours utilisable.

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 3) | Senior UX Designer / Product Designer |

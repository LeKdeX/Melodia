# ANIMATION_LIBRARY.md — Bibliothèque officielle des animations nommées (Phase 4)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Principal Motion Designer / Performance UX Engineer
> **Documents liés** : [[MOTION_GUIDELINES.md]], [[TRANSITION_GUIDE.md]], [[PLAYER_EXPERIENCE.md]]

> **Cadrage** : [[MOTION_GUIDELINES.md]] définit le système (durées, courbes, principes). Ce document catalogue chaque animation **nommée** individuellement selon un gabarit fixe, pour qu'aucune implémentation n'ait à réinventer une valeur déjà décidée. Les transitions de page ont leur propre catalogue dédié ([[TRANSITION_GUIDE.md]]) — non répétées ici.

> **Gabarit** : Nom · Objectif · Déclencheur · Durée · Courbe · Composants concernés · Conditions · Accessibilité · Alternative réduite · Impact performance.

---

## 1. Hero Expand

- **Objectif** : communiquer que la pochette du lecteur devient le sujet dominant de l'écran sans rupture de continuité.
- **Déclencheur** : ouverture du Fullscreen Player depuis n'importe quelle forme du lecteur.
- **Durée** : catégorie Complexe (300-400 ms).
- **Courbe** : `entrance`.
- **Composants** : pochette, arrière-plan dynamique, contrôles.
- **Conditions** : jamais déclenchée deux fois en succession rapide (throttle sur double-clic accidentel).
- **Accessibilité** : annoncée via `aria-live` comme changement de vue, jamais silencieuse pour un lecteur d'écran.
- **Alternative réduite** : fondu seul, sans mise à l'échelle ([[MOTION_GUIDELINES.md]] §12).
- **Impact performance** : GPU (transform/opacity uniquement, jamais de propriété qui déclenche un recalcul de layout).

## 2. Shared Element Navigate

- **Objectif** : maintenir la continuité spatiale lors d'une navigation vers une page de détail.
- **Déclencheur** : clic sur une pochette/carte menant à une page Album/Artiste/Piste.
- **Durée** : catégorie Complexe.
- **Courbe** : `entrance`.
- **Composants** : élément cliqué (image + titre), qui devient l'en-tête de la page suivante.
- **Conditions** : désactivée si l'élément source n'est plus dans le viewport au moment du clic (repli sur Fade Standard, §4).
- **Accessibilité** : le focus clavier se déplace vers le titre de la nouvelle page à la fin de l'animation, jamais pendant.
- **Alternative réduite** : fondu croisé sans transformation de position/taille.
- **Impact performance** : GPU, mesure de position source/cible faite une seule fois avant le déclenchement (jamais recalculée pendant l'animation).

## 3. Skeleton Pulse

- **Objectif** : signaler qu'un contenu arrive sans distraire de l'attente. Voir [[SKELETON_SYSTEM.md]] pour l'usage par écran.
- **Déclencheur** : chargement de tout contenu dont la structure finale est connue à l'avance.
- **Durée** : boucle continue, cycle de ~1.5 s (catégorie Ambiance).
- **Courbe** : `standard`, boucle sinusoïdale douce (jamais linéaire, qui paraîtrait mécanique).
- **Composants** : silhouettes de composants (cards, lignes de texte).
- **Conditions** : retirée dès que le contenu réel est disponible, jamais un délai artificiel ajouté pour « laisser le temps de voir » le squelette.
- **Accessibilité** : `aria-busy="true"` sur le conteneur, jamais annoncée élément par élément.
- **Alternative réduite** : pulsation remplacée par une opacité fixe intermédiaire, aucune boucle animée.
- **Impact performance** : CSS uniquement, aucun coût JavaScript.

## 4. Fade Standard

- **Objectif** : apparition/disparition générique d'un élément sans transformation de position.
- **Déclencheur** : toute apparition qui n'a pas de logique de continuité spatiale (résultats de recherche, contenu secondaire).
- **Durée** : catégorie Standard (200-250 ms).
- **Courbe** : `entrance` à l'apparition, `exit` à la disparition.
- **Composants** : variable.
- **Conditions** : jamais utilisée pour un élément qui a une position source identifiable (utiliser Shared Element Navigate, §2, à la place).
- **Accessibilité** : aucun impact — animation purement visuelle sans changement sémantique.
- **Alternative réduite** : durée réduite à la catégorie Micro, forme inchangée (le fondu seul reste compatible avec `prefers-reduced-motion`).
- **Impact performance** : GPU (opacity).

## 5. List Insert

- **Objectif** : intégrer un nouvel élément dans une liste déjà affichée sans re-rendu perçu.
- **Déclencheur** : ajout à la file, ajout à une playlist affichée à l'écran.
- **Durée** : catégorie Standard.
- **Courbe** : `entrance`.
- **Composants** : élément inséré + décalage des éléments voisins.
- **Conditions** : désactivée sur les listes virtualisées en défilement rapide ([[MOTION_GUIDELINES.md]] §7).
- **Accessibilité** : annonce ponctuelle du changement de nombre total d'éléments, jamais de l'élément individuel.
- **Alternative réduite** : apparition directe sans décalage animé des voisins.
- **Impact performance** : CPU pour le recalcul de layout des voisins — surveillé au budget de performance ([[PERFORMANCE_BUDGET.md]] §3).

## 6. List Remove

- **Objectif** : signaler visuellement un retrait avant que l'espace ne se referme.
- **Déclencheur** : retrait d'un élément d'une liste affichée ([[INTERACTION_LIBRARY.md]] §4-5).
- **Durée** : catégorie Standard.
- **Courbe** : `exit`.
- **Composants** : élément retiré (réduction hauteur + opacité simultanées) + remontée des voisins.
- **Conditions** : aucune.
- **Accessibilité** : annonce du retrait via `aria-live="polite"`.
- **Alternative réduite** : disparition directe, remontée des voisins instantanée.
- **Impact performance** : CPU pour le recalcul de layout, identique à List Insert.

## 7. Modal Enter/Exit

- **Objectif** : signaler l'apparition d'une surface bloquante sans surprendre.
- **Déclencheur** : ouverture/fermeture d'une modale ([[DIALOG_LIBRARY.md]]).
- **Durée** : catégorie Standard.
- **Courbe** : `entrance` / `exit`.
- **Composants** : scrim de fond (fondu) + contenu de la modale (fondu + légère échelle/translation).
- **Conditions** : fermeture par `Échap` en catégorie Micro (réactivité prioritaire sur l'esthétique).
- **Accessibilité** : focus piégé dans la modale dès le début de l'animation, restitué à la fermeture ([[ACCESSIBILITY_GUIDE.md]] §1).
- **Alternative réduite** : fondu seul, sans échelle/translation.
- **Impact performance** : GPU.

## 8. Toast/Snackbar Enter/Exit

- **Objectif** : notifier sans interrompre. Voir [[ERROR_EXPERIENCE.md]] pour le choix du pattern.
- **Déclencheur** : action confirmée, erreur non bloquante.
- **Durée** : catégorie Standard.
- **Courbe** : `entrance` / `exit`.
- **Composants** : conteneur du toast/snackbar (translation depuis le bord + fondu).
- **Conditions** : jamais plus d'un visible simultanément ([[ERROR_EXPERIENCE.md]] §5) — la file d'attente anime chaque élément individuellement à son tour.
- **Accessibilité** : `aria-live="polite"`.
- **Alternative réduite** : fondu seul.
- **Impact performance** : GPU, coût négligeable.

## 9. Favorite Bounce

- **Objectif** : célébrer une action volontaire et positive de façon proportionnée.
- **Déclencheur** : ajout aux favoris.
- **Durée** : catégorie Micro à Standard (150-200 ms).
- **Courbe** : `emphasis` (léger dépassement, [[MOTION_GUIDELINES.md]] §2 et §12ter).
- **Composants** : icône de favori uniquement.
- **Conditions** : jamais déclenchée sur un retrait des favoris (utiliser Fade Standard, asymétrie intentionnelle).
- **Accessibilité** : changement d'état annoncé via le nom accessible du bouton (« Ajouté aux favoris »), pas seulement visuel.
- **Alternative réduite** : changement de couleur/forme de l'icône sans dépassement d'échelle.
- **Impact performance** : GPU, négligeable.

## 10. Progress Fill

- **Objectif** : représenter une progression continue et fiable.
- **Déclencheur** : téléchargement, lecture (barre de progression), synchronisation avec pourcentage connu.
- **Durée** : continue, liée à la progression réelle — jamais une durée fixe déconnectée de la valeur réelle.
- **Courbe** : linéaire (une progression réelle n'a pas de raison d'accélérer/ralentir artificiellement).
- **Composants** : barre de remplissage.
- **Conditions** : jamais de saut de valeur brutal — toute mise à jour interpole depuis la valeur précédente.
- **Accessibilité** : `role="progressbar"` avec valeur actuelle explicite ([[ACCESSIBILITY_GUIDE.md]] §8).
- **Alternative réduite** : aucune réduction — une barre de progression reste une information fonctionnelle, pas décorative.
- **Impact performance** : CSS, négligeable.

## 11. Sync Pulse

- **Objectif** : indiquer une activité de fond sans capter l'attention.
- **Déclencheur** : synchronisation en cours ([[MOTION_GUIDELINES.md]] §9).
- **Durée** : boucle continue, catégorie Ambiance.
- **Courbe** : `standard`, pulsation douce.
- **Composants** : icône/indicateur de statut de synchronisation.
- **Conditions** : jamais de rotation rapide façon spinner classique.
- **Accessibilité** : statut disponible au focus/survol, jamais annoncé en continu (uniquement au changement d'état terminé/échec).
- **Alternative réduite** : icône statique avec léger changement d'opacité au lieu d'une boucle.
- **Impact performance** : CSS, négligeable, mais surveillé pour ne jamais tourner quand l'onglet/l'application est en arrière-plan (économie de batterie).

## 12. Theme Cross-fade

- **Objectif** : rendre un changement de thème instantané mais non abrupt.
- **Déclencheur** : changement de thème manuel ou automatique (système).
- **Durée** : catégorie Micro ([[THEMES_GUIDE.md]] §9).
- **Courbe** : `standard`.
- **Composants** : toutes les couleurs de tokens (fondu croisé global).
- **Conditions** : jamais appliquée aux images/pochettes, uniquement aux couleurs d'interface.
- **Accessibilité** : aucun impact.
- **Alternative réduite** : changement instantané sans fondu.
- **Impact performance** : GPU, coût ponctuel négligeable (un seul événement, jamais répété en boucle).

## 13. Tooltip Appear

- **Objectif** : fournir un contexte additionnel sans latence perçue excessive ni apparition intempestive.
- **Déclencheur** : survol prolongé (délai avant apparition, voir [[ACCESSIBILITY_GUIDE.md]] pour l'équivalent focus/tactile) ou focus clavier.
- **Durée** : catégorie Micro.
- **Courbe** : `entrance`.
- **Composants** : bulle de tooltip (fondu + très légère translation depuis l'élément source).
- **Conditions** : délai d'apparition (~400-600 ms) au survol pour éviter un déclenchement à chaque passage accidentel du curseur ; aucun délai au focus clavier (apparition immédiate, l'intention est explicite).
- **Accessibilité** : associé via `aria-describedby`, jamais uniquement visuel.
- **Alternative réduite** : identique (un tooltip n'a pas de transformation à réduire, uniquement le fondu déjà minimal).
- **Impact performance** : négligeable.

## 13bis. Menu/Popover Enter/Exit (ajout Phase 8)

- **Objectif** : signaler l'apparition d'un contenu non modal ancré à un déclencheur, plus léger visuellement qu'une Modale.
- **Déclencheur** : ouverture de Menu/Popover/Dropdown/ContextMenu ([[OVERLAY_COMPONENTS.md]]).
- **Durée** : catégorie Micro (plus rapide qu'un Modal Enter/Exit, §7 — un menu contextuel est une action fréquente et légère, jamais aussi cérémonieuse qu'une modale).
- **Courbe** : `entrance` / `exit`.
- **Composants** : conteneur du menu (fondu + très légère translation depuis le point d'ancrage, jamais depuis le centre de l'écran).
- **Conditions** : origine de la translation toujours le point d'ancrage réel (bouton cliqué, curseur pour un ContextMenu) — jamais une position fixe indépendante du déclencheur.
- **Accessibilité** : focus déplacé au premier item du menu à l'ouverture pour Menu/ContextMenu (jamais pour Popover, qui peut être purement informatif).
- **Alternative réduite** : fondu seul, sans translation.
- **Impact performance** : GPU, négligeable.

## 13ter. Command Palette Enter/Exit (ajout Phase 8)

- **Objectif** : signaler l'ouverture d'une surface de commande globale, distincte visuellement d'un Menu (14bis) par son caractère plein-contexte.
- **Déclencheur** : raccourci `Ctrl/Cmd + K` ou clic sur son point d'entrée ([[COMMAND_PALETTE.md]]).
- **Durée** : catégorie Standard.
- **Courbe** : `entrance` / `exit`.
- **Composants** : scrim léger + conteneur de la palette (fondu + légère échelle depuis le centre supérieur de l'écran, jamais depuis un point d'ancrage local — cohérent avec son statut de commande globale plutôt que contextuelle).
- **Accessibilité** : focus immédiat sur le champ de recherche interne, restitué au déclencheur à la fermeture.
- **Alternative réduite** : fondu seul, sans échelle.
- **Impact performance** : GPU, négligeable (résultats déjà indexés localement, [[COMMAND_PALETTE.md]]).

---

## 14. Checklist de validation

- [ ] Chaque animation a les dix champs du gabarit renseignés, aucun laissé implicite.
- [ ] Aucune valeur de durée/courbe ne contredit [[MOTION_GUIDELINES.md]] §1-2.
- [ ] Chaque animation a une alternative explicite pour `prefers-reduced-motion`.
- [ ] Aucune transition de page n'est dupliquée ici — voir [[TRANSITION_GUIDE.md]].

---

## 15. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 4) | Principal Motion Designer / Performance UX Engineer |
| 0.2.0 | 2026-08-04 | Phase 8 : ajout §13bis (Menu/Popover Enter/Exit) et §13ter (Command Palette Enter/Exit) — comblent un vide, Popover/Dropdown/Menu/ContextMenu n'avaient aucune animation nommée jusqu'ici | Motion Designer |

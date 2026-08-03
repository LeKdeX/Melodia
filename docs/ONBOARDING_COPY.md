# ONBOARDING_COPY.md — Texte réel de l'onboarding (Phase 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : UX Writer Senior / Conversation Designer
> **Documents liés** : [[ONBOARDING_GUIDE.md]], [[VOICE_AND_TONE.md]] §3bis

> **Cadrage** : [[ONBOARDING_GUIDE.md]] définit la séquence et le comportement (quand, pourquoi, ignorable ou non). Ce document fournit le texte verbatim de chaque étape — les deux se lisent ensemble, jamais l'un sans l'autre.

---

## 1. Bienvenue (écran d'accueil)

> **Titre** : Melodia
> **Corps** : Connectez votre serveur Jellyfin pour retrouver votre musique.
> **Bouton principal** : Se connecter

## 2. Connexion Jellyfin

> **Titre** : Connexion
> **Label champ 1** : Adresse du serveur
> **Placeholder champ 1** : https://mon-serveur.exemple.com
> **Label champ 2** : Identifiants
> **Bouton principal** : Se connecter
> **Lien secondaire** : Besoin d'aide ?
> **Pendant la tentative** : Connexion à votre serveur...
> **Succès** : Connecté à [nom du serveur].

## 3. Import (synchronisation initiale)

> **Titre** : Votre bibliothèque arrive
> **Corps (courte)** : Synchronisation en cours.
> **Corps (si longue, > 30 secondes écoulées)** : Cela peut prendre quelques minutes selon la taille de votre bibliothèque — vous pouvez déjà commencer à naviguer.
> **Fin** : Votre bibliothèque est prête.

## 4. Synchronisation

Aucun texte dédié — traité comme un indicateur discret et permanent, cohérent avec [[VOICE_AND_TONE.md]] §3bis (« jamais anxiogène même si longue »).

## 5. Découverte (invitation à explorer, si applicable)

> **Corps** : Votre musique est prête. Cherchez un titre ou parcourez votre bibliothèque.

Volontairement bref — aucune liste de fonctionnalités énumérées à ce stade, cohérent avec [[ONBOARDING_GUIDE.md]] §6 (aucune étape ne retarde l'arrivée dans la bibliothèque).

## 6. Personnalisation (thème, densité — étape ignorable)

> **Titre** : Quelques préférences
> **Option 1** : Thème — Clair / Sombre / Système
> **Option 2** : Densité d'affichage — Confortable / Compacte
> **Bouton principal** : Continuer
> **Lien secondaire** : Passer, je réglerai ça plus tard

## 7. Première lecture

Aucun texte dédié — le silence est la bonne réponse ([[VOICE_AND_TONE.md]] §3bis, « Lecture »). Si une confirmation existe, elle reste dans le lecteur lui-même (pochette + titre), jamais un message superposé.

## 8. Conseils contextuels (exemples, apparaissent une seule fois chacun)

| Contexte | Texte |
|---|---|
| Première ouverture du lecteur étendu | Glissez vers le haut pour agrandir le lecteur. |
| Première fois qu'une recherche est disponible | Appuyez sur `Ctrl/Cmd + K` pour chercher, où que vous soyez. |
| Premier ajout à une file | Ajouté à la file — glissez pour réorganiser. |
| Première activation de l'historique (si proposée en contexte, pas en onboarding précipité — [[ONBOARDING_GUIDE.md]] §6) | Votre historique reste sur cet appareil, jamais transmis ailleurs. |

---

## 9. Checklist de validation

- [ ] Chaque étape de [[ONBOARDING_GUIDE.md]] §2 a un texte correspondant ici, y compris les étapes volontairement silencieuses.
- [ ] Aucun texte ne dépasse les longueurs maximales de [[UX_WRITING_GUIDE.md]] §3.
- [ ] Le ton de chaque texte est cohérent avec [[VOICE_AND_TONE.md]] §3bis.

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 3) | UX Writer Senior / Conversation Designer |

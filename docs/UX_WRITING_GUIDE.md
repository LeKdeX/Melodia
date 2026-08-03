# UX_WRITING_GUIDE.md — Mécaniques d'écriture (Phase 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : UX Writer Senior / Content Designer
> **Documents liés** : [[VOICE_AND_TONE.md]], [[STYLE_GUIDE.md]], [[ACCESSIBILITY_GUIDE.md]]

> **Différence avec [[VOICE_AND_TONE.md]]** : la voix et le ton définissent le registre émotionnel (qui parle, comment). Ce document définit la **mécanique de la phrase elle-même** — grammaire, structure, longueur — indépendamment du contexte émotionnel. Une règle ici s'applique à un message de succès comme à un message d'erreur.

---

## 1. Les neuf règles fondamentales

| Règle | Exemple à suivre | Exemple à éviter |
|---|---|---|
| Être clair | « Ajouté à Focus. » | « L'opération a été effectuée avec succès. » |
| Être court | « Supprimer ce téléchargement ? » | « Êtes-vous certain de vouloir procéder à la suppression de ce téléchargement ? » |
| Être positif | « Disponible hors ligne une fois téléchargé. » | « Non disponible tant que non téléchargé. » (formuler ce qui est possible, pas ce qui ne l'est pas, quand une formulation positive existe) |
| Être utile | « Vérifiez votre connexion ou l'adresse du serveur. » | « Une erreur est survenue. » |
| Éviter le jargon | « Nouvelle version disponible. » | « Un patch est disponible pour mise à jour. » |
| Éviter la voix passive | « Ajouté à vos favoris. » | « A été ajouté à vos favoris. » |
| Éviter les doubles négations | « Activez l'historique pour voir vos statistiques. » | « Vous ne pouvez pas voir vos statistiques si l'historique n'est pas désactivé. » |
| Privilégier les verbes d'action | « Réessayer » | « Une nouvelle tentative peut être effectuée » |
| Expliquer les conséquences | « Supprimer cette playlist ? Cette action est irréversible. » | « Supprimer cette playlist ? » (sans préciser l'irréversibilité) |

## 2. Structure de phrase par défaut

Sujet implicite (l'application/l'action) + verbe à l'impératif ou au passé composé + complément — jamais de sujet grammatical explicite inutile (« Nous avons ajouté... », « L'application a synchronisé... »). Melodia ne se met jamais en scène comme un interlocuteur qui parle à la première personne du pluriel.

## 3. Longueur maximale par type de texte

| Type | Longueur maximale |
|---|---|
| Libellé de bouton | 3 mots |
| Titre d'état vide/erreur | 8 mots |
| Message d'état/erreur | 2 phrases |
| Tooltip | 6 mots (voir [[TOOLTIP_LIBRARY.md]]) |
| Description de paramètre | 1 phrase |

## 4. Verbes recommandés vs à éviter

| Contexte | Verbe recommandé | Verbe à éviter |
|---|---|---|
| Réessayer une action | Réessayer | Relancer, retenter |
| Confirmer une suppression | Supprimer | Effacer, retirer (garder un seul verbe par action pour la cohérence, [[STYLE_GUIDE.md]]) |
| Lancer un téléchargement | Télécharger | Récupérer, obtenir |
| Fermer une modale | Fermer, Annuler (selon le contexte) | Quitter, Sortir |

## 5. Comment vérifier un texte avant publication

1. Peut-on le raccourcir sans perdre d'information essentielle ? Si oui, le faire.
2. Contient-il un mot qu'un nouvel utilisateur ne comprendrait pas sans contexte technique ? Si oui, le reformuler.
3. Est-il à la voix active ? Si non, le corriger.
4. Explique-t-il ce qui va se passer, pas seulement ce qui vient de se passer ou ce qu'il faut faire ? Pour toute action à conséquence, oui est requis.
5. Passe-t-il le test de personnalité de [[PERSONALITY.md]] §8 ?

---

## 6. Checklist de validation

- [ ] Les neuf règles ont chacune un exemple à suivre et un exemple à éviter.
- [ ] Aucune règle ici ne redéfinit le registre émotionnel déjà couvert par [[VOICE_AND_TONE.md]].
- [ ] La grille de vérification (§5) est utilisable telle quelle en revue de texte.

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 3) | UX Writer Senior / Content Designer |

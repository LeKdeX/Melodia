# QUEUE_SPECIFICATION.md — Spécification de la file d'attente (Phase 1, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Interaction Designer / Senior Product Manager
> **Documents liés** : [[AUDIO_ENGINE.md]] §1, [[DATA_LAYER.md]], [[PRODUCT_RULES.md]] §5

> **Cadrage** : le modèle technique de la file (ordre source vs ordre de lecture effectif, historique) est déjà décidé dans [[AUDIO_ENGINE.md]] §1. Ce document spécifie le comportement produit visible par l'utilisateur.

---

## 1. Objectif

Donner à l'utilisateur un contrôle total et immédiat sur ce qui va être joué, sans jamais l'obliger à interrompre son écoute actuelle pour le faire.

## 2. Actions sur la file

| Action | Comportement |
|---|---|
| Ajout en fin de file | Depuis n'importe quel contexte (album, playlist, recherche) — action systématiquement disponible ([[PRODUCT_RULES.md]] §5) |
| Lecture immédiate | Insère et lance la piste immédiatement, la file existante reprend juste après |
| Lecture suivante | Insère juste après la piste en cours, sans interrompre celle-ci |
| Suppression | Retrait immédiat, sans confirmation (action réversible via un discret « annuler », pas une modale bloquante) |
| Réorganisation (glisser-déposer) | Prévisualisation en temps réel de la position cible, confirmation au relâchement |
| Vidage complet de la file | Confirmation requise si la file contient plus d'un certain nombre de titres (seuil à définir en conception détaillée) — cohérent avec [[PRODUCT_RULES.md]] §7 (aucune action destructive sans confirmation) |

## 3. Historique de lecture

Distinct de la file à venir — permet de revenir à une piste déjà jouée sans la chercher manuellement. Conservé pour la session en cours a minima ; conservation longue durée dépend de l'activation de l'historique d'écoute local ([[STATISTICS_SPECIFICATION.md]]).

## 4. Queue persistante vs temporaire

- **Queue persistante** : la file d'attente survit à la fermeture de l'application ([[PRODUCT_RULES.md]] §8) — comportement par défaut.
- **Queue temporaire** : une lecture ponctuelle (ex. aperçu d'un morceau depuis une recherche) qui ne remplace pas nécessairement la file persistante sans confirmation implicite claire — règle à préciser : lancer un morceau depuis la bibliothèque remplace la file courante par défaut (comportement standard du marché, cohérent avec [[COMPETITIVE_ANALYSIS.md]]), sauf usage explicite de « lecture suivante »/« ajouter à la file ».

## 5. Queue intelligente

Une file générée automatiquement (ex. depuis un album : ajout automatique de titres similaires en fin de file une fois la file initiale épuisée) — fonctionnalité de confort, jamais surprenante : clairement indiquée visuellement comme « suggestions » distinctes de la file explicitement construite par l'utilisateur, jamais mélangée sans distinction.

## 6. Synchronisation et sauvegarde

- Sauvegarde automatique de l'état de la file dans `LocalStore` à chaque modification ([[DATA_LAYER.md]] §2.1, `playback_state`).
- Synchronisation multi-appareils de la file : dépend de la stratégie de résolution de conflit non encore actée par ADR ([[ARCHITECTURE_PRINCIPLES.md]] §3.3) — statut ouvert, cohérent avec [[USER_JOURNEYS.md]] §13.

## 7. États

| État | Comportement |
|---|---|
| File vide | Voir [[EMPTY_STATES.md]] — jamais un panneau blanc, toujours une invite à ajouter du contenu |
| File avec un seul élément | Contrôles « suivant » désactivés visuellement (pas juste inertes) si aucune lecture aléatoire/répétition ne s'applique |
| File très longue (bibliothèque entière en lecture aléatoire, 200 000+ titres) | Représentation virtualisée de la liste visible, jamais un rendu complet ([[PERFORMANCE_BUDGET.md]] §3) |

## 8. Cas limites

- Suppression de la piste en cours de lecture depuis la file : la lecture continue jusqu'à sa fin naturelle ou passe à la piste suivante selon préférence à définir en conception détaillée — ne jamais couper le son brutalement suite à une action indirecte.
- Réorganisation pendant la lecture : n'affecte jamais la piste en cours, uniquement l'ordre à venir.

---

## 9. Checklist de validation

- [ ] Aucune action de file ne peut jamais interrompre la lecture en cours sans intention explicite ([[PRODUCT_RULES.md]] §2).
- [ ] La distinction queue persistante/temporaire est explicite dans l'interface, jamais implicite.
- [ ] Le statut ouvert de la synchronisation multi-appareils de la file est cohérent avec [[EXTREME_SCENARIOS.md]] §5.

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 2) | Interaction Designer / Senior Product Manager |

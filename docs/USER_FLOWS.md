# USER_FLOWS.md — Catalogue des flux atomiques (Phase 1, volume 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : UX Research Lead / Senior UX Designer
> **Documents liés** : [[USER_JOURNEYS.md]], [[SUCCESS_METRICS.md]], [[PRODUCT_RULES.md]]

> **Différence avec [[USER_JOURNEYS.md]]** : les 12 parcours de [[USER_JOURNEYS.md]] sont des trajectoires macro, multi-écrans, porteuses d'un fil émotionnel (ex. « retour après plusieurs jours »). Ce document catalogue des **flux atomiques** — une action précise, quelques étapes, quelques secondes — qui composent ces parcours. Aucun des 12 parcours macro n'est réécrit ici ; ce catalogue descend au niveau de granularité en dessous. Format condensé (temps estimé, friction/opportunité en une phrase) pour rester honnête sur le volume demandé (100+) sans verbosité artificielle.

---

## 1. Lecture et contrôle (12 flux)

| # | Flux | Objectif | Temps estimé | Friction / Opportunité | Émotion |
|---|---|---|---|---|---|
| 1 | Lancer un morceau depuis une liste | Écouter immédiatement | < 1 s | Aucune si le budget Time-to-First-Play est tenu | Évidence |
| 2 | Mettre en pause | Interrompre volontairement | Instantané | Aucune | Contrôle |
| 3 | Reprendre après pause | Continuer l'écoute | Instantané | Aucune | Continuité |
| 4 | Passer au morceau suivant | Changer de contenu | Instantané | Aucune | Fluidité |
| 5 | Revenir au morceau précédent | Réécouter/corriger un saut accidentel | Instantané | Ambiguïté si < 3 s ([[PLAYER_SPECIFICATION.md]] §5) | Contrôle |
| 6 | Activer la lecture aléatoire | Varier sans choisir | 1 action | Pondération perçue comme inéquitable si mal calibrée ([[USER_JOURNEYS.md]] §7) | Légèreté |
| 7 | Activer Repeat One | Réécouter en boucle | 1 action | Aucune | Confort |
| 8 | Ajuster le volume | Adapter à l'environnement | Continu | Aucune | Contrôle |
| 9 | Rechercher une position dans la piste (seek) | Sauter à un passage précis | 1 geste | Prévisualisation nécessaire ([[PLAYER_SPECIFICATION.md]] §10) | Précision |
| 10 | Ouvrir le Fullscreen Player | Immersion | 1 action | Aucune | Immersion |
| 11 | Réduire au Mini Player | Continuer une autre tâche | 1 geste | Aucune | Fluidité |
| 12 | Activer l'égaliseur | Ajuster le rendu sonore | 2-3 actions | Fonctionnalité opt-in, jamais dans le chemin principal ([[AUDIO_ENGINE.md]] §6) | Précision (audiophile) |

## 2. File d'attente (9 flux)

| # | Flux | Objectif | Temps estimé | Friction / Opportunité | Émotion |
|---|---|---|---|---|---|
| 13 | Ajouter un morceau en fin de file | Préparer la suite | 1 action | Aucune ([[PRODUCT_RULES.md]] §5) | Contrôle |
| 14 | Lire un morceau immédiatement | Interrompre la file pour ce morceau | 1 action | Doit être distinct visuellement de « lecture suivante » | Spontanéité |
| 15 | Ajouter en lecture suivante | Prioriser sans tout interrompre | 1 action | Aucune | Contrôle |
| 16 | Retirer un morceau de la file | Ajuster ses plans d'écoute | 1 action | Réversible via annulation discrète | Contrôle |
| 17 | Réorganiser la file (glisser-déposer) | Changer l'ordre | Variable | Retour visuel continu nécessaire ([[QUEUE_SPECIFICATION.md]] §2) | Précision |
| 18 | Vider la file | Repartir de zéro | 1 action + confirmation si volumineuse | [[PRODUCT_RULES.md]] §7 | Libération |
| 19 | Consulter l'historique de lecture | Retrouver un morceau déjà joué | 1 action | Distinct de la file à venir | Retrouvailles |
| 20 | Revenir à une piste de l'historique | Réécouter | 1 action | Aucune | Nostalgie légère |
| 21 | Voir la source d'un morceau en cours (contexte) | Comprendre pourquoi ce morceau joue | 0 action (affiché) | Sous-titre de contexte (idée #49, [[FEATURE_ROADMAP.md]]) | Clarté |

## 3. Recherche (7 flux)

| # | Flux | Objectif | Temps estimé | Friction / Opportunité | Émotion |
|---|---|---|---|---|---|
| 22 | Ouvrir la recherche | Accès rapide | 1 raccourci/geste | Toujours accessible ([[PRODUCT_RULES.md]] §4) | Confiance |
| 23 | Taper une requête et voir les résultats en direct | Trouver sans valider | < 100 ms perçu | [[PERFORMANCE_BUDGET.md]] §2 | Instantanéité |
| 24 | Filtrer les résultats par catégorie | Affiner | 1 action | Aucune | Précision |
| 25 | Lancer un résultat directement | Écouter sans étape intermédiaire | 1 action | [[SEARCH_SPECIFICATION.md]] §5 | Efficacité |
| 26 | Ajouter un résultat à une playlist depuis la recherche | Organiser sans changer de contexte | 1-2 actions | Menu contextuel systématique | Fluidité |
| 27 | Rechercher avec une faute de frappe | Trouver malgré une erreur | < 100 ms perçu | Tolérance floue ([[DATA_LAYER.md]] §3.2) | Soulagement |
| 28 | Effacer l'historique de recherche | Confidentialité | 1 action | [[EMPTY_STATES.md]] §7 (distinct de l'historique d'écoute) | Contrôle |

## 4. Bibliothèque (12 flux)

| # | Flux | Objectif | Temps estimé | Friction / Opportunité | Émotion |
|---|---|---|---|---|---|
| 29 | Parcourir les albums en grille | Exploration visuelle | Continu | Aucune | Plaisir visuel |
| 30 | Basculer vers la vue liste | Densité d'information | 1 action | Mémorisé par section ([[LIBRARY_SPECIFICATION.md]] §1) | Efficacité |
| 31 | Ouvrir une page album | Explorer le détail | 1 action | [[LIBRARY_SPECIFICATION.md]] §5 | Découverte |
| 32 | Ouvrir une page artiste depuis un album | Explorer la discographie | 1 action | Navigation fluide | Découverte |
| 33 | Trier une section par un critère | Organiser sa vue | 1-2 actions | Mémorisé par section | Contrôle |
| 34 | Filtrer par genre/année/format | Réduire le périmètre | 1-2 actions | Combinables | Précision |
| 35 | Épingler un élément | Accès rapide futur | 1 action | Toujours en tête de navigation | Appropriation |
| 36 | Consulter les ajouts récents | Voir la nouveauté | 1 action | Ordre chronologique | Curiosité |
| 37 | Consulter les plus écoutés | Retrouver ses classiques | 1 action | Dépend de l'historique actif | Reconnaissance |
| 38 | Explorer une Collection | Naviguer un regroupement thématique | 1 action | [[LIBRARY_SPECIFICATION.md]] §2 | Curiosité |
| 39 | Explorer un Genre | Découverte par style | 1 action | Regroupement automatique | Exploration |
| 40 | Consulter les crédits d'un album | Curiosité sur la production | 1-2 actions | [[LIBRARY_SPECIFICATION.md]] §5 | Intérêt |

## 5. Playlists (11 flux)

| # | Flux | Objectif | Temps estimé | Friction / Opportunité | Émotion |
|---|---|---|---|---|---|
| 41 | Créer une playlist vide | Démarrer une collection | ≤ 3 actions | [[SUCCESS_METRICS.md]] §1 | Créativité |
| 42 | Ajouter un morceau à une playlist depuis n'importe où | Construire progressivement | 1 action | [[PRODUCT_RULES.md]] §5 | Fluidité |
| 43 | Renommer une playlist | Ajuster l'organisation | 1-2 actions | Aucune | Contrôle |
| 44 | Réorganiser les morceaux d'une playlist | Affiner l'ordre d'écoute | Variable | Glisser-déposer | Précision |
| 45 | Supprimer une playlist | Nettoyer sa collection | 1 action + confirmation | [[PRODUCT_RULES.md]] §7 | Libération |
| 46 | Créer une playlist intelligente (règles) | Automatiser une sélection | 2-4 actions | [[PLAYLIST_SPECIFICATION.md]] §3 | Maîtrise |
| 47 | Modifier les règles d'une playlist intelligente | Ajuster le résultat | 2-3 actions | Réévaluation immédiate | Contrôle |
| 48 | Dupliquer une playlist | Créer une variante | 1 action | Aucune | Efficacité |
| 49 | Exporter une playlist (M3U) | Usage externe | 1-2 actions | Idée #14, [[FEATURE_ROADMAP.md]] | Portabilité |
| 50 | Lire une playlist entière | Écoute continue | 1 action | Aucune | Immersion |
| 51 | Lire une playlist en aléatoire | Varier l'ordre | 1 action | Partagé avec §1.6 | Légèreté |

## 6. Favoris (5 flux)

| # | Flux | Objectif | Temps estimé | Friction / Opportunité | Émotion |
|---|---|---|---|---|---|
| 52 | Ajouter un morceau aux favoris | Marquer une préférence | 1 action | [[PRODUCT_RULES.md]] §5 | Affection |
| 53 | Retirer un favori | Ajuster ses préférences | 1 action | Réversible | Contrôle |
| 54 | Consulter tous les favoris | Retrouver ses préférés | 1 action | [[LIBRARY_SPECIFICATION.md]] §7 | Reconnaissance |
| 55 | Favoriser un album entier | Marquer en masse | 1 action | Distinct de favoriser piste par piste | Efficacité |
| 56 | Favoriser un artiste | Suivre ses goûts au niveau artiste | 1 action | Alimente idée #27 (alerte nouvel ajout) | Attachement |

## 7. Téléchargements et hors ligne (8 flux)

| # | Flux | Objectif | Temps estimé | Friction / Opportunité | Émotion |
|---|---|---|---|---|---|
| 57 | Télécharger un album pour le hors ligne | Préparer un trajet | 1 action | [[SETTINGS_SPECIFICATION.md]] §5 | Anticipation |
| 58 | Télécharger une playlist entière | Préparer une écoute prolongée | 1 action | Idem | Anticipation |
| 59 | Suivre la progression d'un téléchargement | Savoir quand c'est prêt | 0 action (passif) | [[MOTION_GUIDELINES.md]] §10 | Patience informée |
| 60 | Annuler un téléchargement en cours | Changer d'avis | 1 action | Aucune | Contrôle |
| 61 | Supprimer un contenu téléchargé | Libérer de l'espace | 1 action + confirmation si volumineux | [[DATA_LAYER.md]] §2.3 | Libération |
| 62 | Consulter l'espace de stockage utilisé | Gérer ses ressources | 1 action | [[SCREEN_SPECIFICATIONS.md]] §4 | Contrôle |
| 63 | Écouter un contenu hors ligne (sans réseau) | Continuité totale | 0 friction | [[ARCHITECTURE_PRINCIPLES.md]] §3 | Fiabilité |
| 64 | Retrouver la connexion après une coupure | Reprise transparente | Automatique | [[ERROR_STATES.md]] §1 | Soulagement |

## 8. Statistiques et Wrapped (7 flux)

| # | Flux | Objectif | Temps estimé | Friction / Opportunité | Émotion |
|---|---|---|---|---|---|
| 65 | Consulter son temps d'écoute total | Curiosité sur soi | 1 action | [[STATISTICS_SPECIFICATION.md]] §3 | Curiosité |
| 66 | Consulter ses artistes préférés | Reconnaissance de ses goûts | 1 action | Aucune | Fierté discrète |
| 67 | Comparer deux périodes d'écoute | Comprendre son évolution | 1-2 actions | Idée #43, [[FEATURE_ROADMAP.md]] | Réflexion |
| 68 | Consulter son Wrapped annuel | Rétrospective | 1 action | Nécessite historique suffisant ([[WRAPPED_SPECIFICATION.md]] §5) | Célébration |
| 69 | Générer une carte Wrapped partageable | Partager sa rétrospective | 1-2 actions | Action explicite requise ([[WRAPPED_SPECIFICATION.md]] §3) | Fierté |
| 70 | Désactiver l'historique d'écoute | Confidentialité | 1-2 actions | [[PRODUCT_RULES.md]] §10 | Contrôle |
| 71 | Supprimer l'historique d'écoute existant | Effacer ses traces | 1 action + confirmation | Suppression complète garantie | Libération |

## 9. Découverte (6 flux)

| # | Flux | Objectif | Temps estimé | Friction / Opportunité | Émotion |
|---|---|---|---|---|---|
| 72 | Consulter le Daily Mix du jour | Écoute guidée rapide | 1 action | [[DISCOVERY_SPECIFICATION.md]] §3 | Confort |
| 73 | Explorer les recommandations locales | Redécouvrir sa bibliothèque | 1 action | Nombre fini, jamais un flux infini | Curiosité |
| 74 | Comprendre pourquoi un morceau est recommandé | Confiance dans la suggestion | 0 action (affiché) | Justification systématique ([[DISCOVERY_SPECIFICATION.md]] §3) | Confiance |
| 75 | Explorer le mix « découverte » (jamais écouté) | Redonner vie à sa collection | 1 action | [[USER_JOURNEYS.md]] §8 | Plaisir de redécouverte |
| 76 | Explorer le mix « nostalgie » | Retrouver un attachement passé | 1 action | Aucune | Nostalgie |
| 77 | Ignorer/rafraîchir une suggestion | Ajuster sans frustration | 1 action | Aucune pénalité perçue | Légèreté |

## 10. Paramètres (10 flux)

| # | Flux | Objectif | Temps estimé | Friction / Opportunité | Émotion |
|---|---|---|---|---|---|
| 78 | Changer le thème clair/sombre | Confort visuel | 1 action | [[SETTINGS_SPECIFICATION.md]] §3 | Confort |
| 79 | Ajuster le niveau d'animation | Confort/performance | 1 action | [[SETTINGS_SPECIFICATION.md]] §4 | Contrôle |
| 80 | Configurer la qualité de téléchargement | Équilibrer espace/qualité | 1-2 actions | Aucune | Précision |
| 81 | Ajouter un second serveur Jellyfin | Multi-serveurs | 2-4 actions | [[JELLYFIN_INTEGRATION.md]] §6 | Extension |
| 82 | Changer de serveur actif | Basculer de contexte | 1 action | Sessions isolées | Clarté |
| 83 | Forcer une resynchronisation manuelle | Rassurance | 1 action | [[USER_JOURNEYS.md]] §9 | Rassurance |
| 84 | Exporter ses données locales | Portabilité | 1-2 actions | [[SETTINGS_SPECIFICATION.md]] §11 | Confiance |
| 85 | Importer des données locales | Restauration | 1-2 actions | Symétrique de l'export | Continuité |
| 86 | Activer une fonctionnalité Labs | Expérimenter | 1-2 actions | Avertissement de statut explicite | Curiosité avertie |
| 87 | Exporter un journal de débogage | Signaler un bug | 1-2 actions | Expurgé de données sensibles ([[SECURITY_GUIDELINES.md]] §9) | Utilité |

## 11. Compte et serveur (7 flux)

| # | Flux | Objectif | Temps estimé | Friction / Opportunité | Émotion |
|---|---|---|---|---|---|
| 88 | Se connecter à un serveur Jellyfin | Démarrage | Variable | [[USER_JOURNEYS.md]] §2 | Confiance |
| 89 | Se reconnecter après expiration de session | Continuité | Automatique si possible | [[ERROR_STATES.md]] §6 | Transparence |
| 90 | Se déconnecter d'un serveur | Fin d'usage | 1 action + choix explicite du cache | [[USER_JOURNEYS.md]] §11 | Clarté |
| 91 | Réessayer une connexion après échec | Résilience | 1 action | [[ERROR_STATES.md]] §1 | Persévérance |
| 92 | Consulter la version du serveur connecté | Diagnostic | 1 action | [[JELLYFIN_INTEGRATION.md]] §7 | Transparence |
| 93 | Basculer entre comptes sur un même appareil | Usage partagé du foyer | 1-2 actions | Isolation garantie par le système ([[EXTREME_SCENARIOS.md]] §3) | Confiance |
| 94 | Consulter le statut de compatibilité de version | Anticiper une rupture | 0 action (affiché si pertinent) | Idée #47, [[FEATURE_ROADMAP.md]] | Anticipation |

## 12. Accessibilité et clavier (6 flux)

| # | Flux | Objectif | Temps estimé | Friction / Opportunité | Émotion |
|---|---|---|---|---|---|
| 95 | Naviguer toute l'application au clavier | Autonomie totale | Continu | [[ACCESSIBILITY_GUIDE.md]] | Autonomie |
| 96 | Utiliser un lecteur d'écran sur le lecteur | Comprendre l'état de lecture sans le voir | Continu | Annonces ARIA cohérentes | Confiance |
| 97 | Activer la réduction des animations | Confort sensoriel | 1 action | Respect de `prefers-reduced-motion` par défaut | Confort |
| 98 | Zoomer l'interface | Lisibilité | Système, pas une action produit dédiée | Aucune régression de layout | Confort |
| 99 | Identifier l'élément actif au clavier | Orientation | 0 action (visuel) | Focus toujours visible ([[DESIGN_SYSTEM_ARCHITECTURE.md]] §5) | Sécurité |
| 100 | Annuler une action via `Échap` | Sortie rapide et prévisible | Instantané | Convention universelle respectée | Contrôle |

## 13. Erreurs et récupération (8 flux)

| # | Flux | Objectif | Temps estimé | Friction / Opportunité | Émotion |
|---|---|---|---|---|---|
| 101 | Comprendre pourquoi une piste ne se lance pas | Diagnostic clair | 0 action (message affiché) | [[ERROR_STATES.md]] §2 | Clarté plutôt que frustration |
| 102 | Réessayer une action après échec réseau | Résilience | 1 action | [[ERROR_STATES.md]] §5 | Persévérance |
| 103 | Réinitialiser un cache local corrompu | Récupération | 1 action + confirmation | [[ERROR_STATES.md]] §3 | Confiance restaurée |
| 104 | Libérer de l'espace après une alerte de stockage saturé | Résoudre un blocage | 1-2 actions | [[ERROR_STATES.md]] §7 | Soulagement |
| 105 | Retirer un morceau introuvable d'une playlist | Nettoyage assisté | 1 action proposée | [[ERROR_STATES.md]] §2 | Propreté |
| 106 | Annuler la dernière action destructive | Filet de sécurité | 1 geste | Idée #50, [[FEATURE_ROADMAP.md]] | Confiance |
| 107 | Consulter un message d'erreur détaillé (avancé) | Diagnostic approfondi | 1-2 actions, non mis en avant | [[SETTINGS_SPECIFICATION.md]] §10 | Maîtrise (utilisateur avancé) |
| 108 | Signaler un problème après une erreur | Contribution | 1-2 actions | Export de journal expurgé | Utilité |

---

## 14. Synthèse

108 flux catalogués sur 13 catégories. Aucun ne dépasse 4 actions hors cas explicitement signalés comme multi-étapes (connexion initiale, création de playlist intelligente). La majorité (plus des deux tiers) tient en une seule action — cohérent avec [[UX_PRINCIPLES.md]] §7 (toujours réduire les frictions).

## 15. Checklist de validation

- [ ] Aucun flux ne redécrit un des 12 parcours macro déjà couverts dans [[USER_JOURNEYS.md]] au même niveau de détail.
- [ ] Chaque flux de plus de 2 actions a une justification explicite de sa complexité.
- [ ] Le total dépasse 100 flux sans remplissage artificiel — chaque entrée correspond à une action réelle du produit spécifié dans les volumes 1-2.

---

## 16. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 1, volume 3) | UX Research Lead / Senior UX Designer |

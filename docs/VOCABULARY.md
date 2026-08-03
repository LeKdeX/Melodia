# VOCABULARY.md — Glossaire officiel de marque (Phase 2, volume 1)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Copywriter / UX Writer
> **Documents liés** : [[PRODUCT_VALUES.md]] §5, [[VOICE_AND_TONE.md]]

> **Cadrage** : approfondit [[PRODUCT_VALUES.md]] §5 (5 entrées) en glossaire complet. [[PRODUCT_VALUES.md]] §5 renvoie désormais ici comme source faisant autorité.

---

## 1. Vocabulaire du contenu musical

| Toujours | Jamais | Pourquoi |
|---|---|---|
| Bibliothèque, collection | Catalogue | « Catalogue » évoque un service commercial dont l'offre peut changer sans le consentement de l'utilisateur ; « bibliothèque » affirme la possession ([[PRODUCT_VALUES.md]] §5) |
| Morceau, titre, piste | Track (anglicisme évitable) | Cohérence linguistique, sauf contexte technique explicite |
| Écoute, lecture | Streaming | « Streaming » implique une dépendance réseau constante, inexacte pour du contenu déjà synchronisé/téléchargé |
| Votre musique, votre bibliothèque | Le contenu, les médias | Dépersonnaliser ce qui est justement personnel contredit la promesse de marque ([[POSITIONING.md]] §5) |

## 2. Vocabulaire de la découverte

| Toujours | Jamais | Pourquoi |
|---|---|---|
| Retrouver, redécouvrir | Recommander à outrance / suggérer sans fin | Melodia aide à retrouver sa musique, il ne prescrit pas ce qu'il faut aimer ([[PRODUCT_VALUES.md]] §5) |
| Suggestion | Recommandation algorithmique (dans les textes utilisateur) | « Recommandation algorithmique » sonne technique et impersonnel ; « suggestion » reste humain |
| Mix, sélection | Playlist automatique (dans les textes utilisateur, hors contexte technique de paramétrage) | Plus chaleureux sans perdre en clarté |

## 3. Vocabulaire technique et infrastructure

| Toujours | Jamais | Pourquoi |
|---|---|---|
| Serveur (au sens du serveur Jellyfin de l'utilisateur) | Notre plateforme, nos serveurs | Melodia n'opère aucune infrastructure centrale ([[PROJECT_CHARTER.md]] §4) — dire « nos serveurs » mentirait sur l'architecture |
| Se connecter (à un serveur) | S'abonner, créer un compte Melodia | Il n'existe pas de compte Melodia — seulement une connexion à un serveur déjà possédé par l'utilisateur |
| Synchroniser | Mettre à jour depuis le cloud | « Cloud » implique une infrastructure tierce que Melodia n'opère pas |
| Hors ligne | Mode avion (sauf contexte mobile explicite) | « Hors ligne » est plus précis : la fonctionnalité dépend de l'absence de réseau, pas du mode avion spécifiquement |

## 4. Vocabulaire de la confidentialité

| Toujours | Jamais | Pourquoi |
|---|---|---|
| Historique local, données locales | Vos données (sans préciser « locales ») | La précision « local » rappelle activement la garantie de non-transmission ([[PRODUCT_RULES.md]] §10) |
| Désactiver, supprimer | Réinitialiser (quand l'action est en réalité une suppression) | Une suppression doit être nommée comme telle, jamais euphémisée |

## 5. Formulations interdites, toutes catégories confondues

- « Gratuit » comme argument de vente principal (la propriété des données est la proposition de valeur, pas le prix — [[POSITIONING.md]] §6).
- « IA » ou « intelligence artificielle » pour des fonctionnalités qui sont en réalité des règles déterministes (ex. playlists intelligentes basées sur des critères explicites, [[PLAYLIST_SPECIFICATION.md]] §1) — appeler « IA » ce qui ne l'est pas est une forme de malhonnêteté de marque.
- Superlatifs non vérifiables (« le meilleur », « incomparable ») dans les textes produit — réservés, si utilisés, à des contextes de communication externe assumés comme tels, jamais dans l'interface elle-même.

## 6. Formulations recommandées pour les moments clés

| Moment | Formulation recommandée |
|---|---|
| Premier lancement | « Connectez votre serveur Jellyfin pour commencer. » |
| Fin de synchronisation initiale | « Votre bibliothèque est prête. » |
| Activation de l'historique local | « Votre historique d'écoute reste sur cet appareil. » |
| Wrapped disponible | « Votre rétrospective est prête. » |

---

## 7. Checklist de validation

- [ ] Chaque entrée a une justification (« pourquoi »), pas seulement une préférence non expliquée.
- [ ] Aucune formulation recommandée ne contredit [[VOCABULARY.md]] §5 (interdictions).
- [ ] Le glossaire reste cohérent avec [[PRODUCT_RULES.md]] et [[PROJECT_CHARTER.md]] §4 sur tous les points de confidentialité/propriété.

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 2, volume 1) | Copywriter / UX Writer |

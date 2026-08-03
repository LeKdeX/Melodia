# VOICE_AND_TONE.md — Voix et ton de marque (Phase 2, volume 1)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Copywriter / UX Writer
> **Documents liés** : [[PERSONALITY.md]], [[VOCABULARY.md]], [[ERROR_EXPERIENCE.md]], [[EMPTY_STATES_GUIDE.md]]

> **Cadrage** : ce document approfondit [[PRODUCT_VALUES.md]] §2 (qui reste le résumé d'intention) avec des règles opérationnelles par contexte et des exemples concrets — utilisable directement pour écrire un texte d'interface. [[PRODUCT_VALUES.md]] §2 renvoie désormais ici.

---

## 1. Principe : la voix est constante, le ton s'adapte

La **voix** (qui parle) ne change jamais — c'est la personnalité définie dans [[PERSONALITY.md]]. Le **ton** (comment on le dit) s'adapte au contexte émotionnel de l'utilisateur au moment où il lit le texte : un ton identique dans une confirmation de succès et dans une erreur critique serait un signe d'indifférence, pas de cohérence.

## 2. Les quatre qualités non négociables

Clair · Bienveillant · Concis · Sans jargon inutile — chaque texte d'interface est vérifié contre ces quatre critères avant publication, quel que soit le contexte ci-dessous.

## 3. Règles par contexte

### Messages système (état normal)
Factuel, présent, sans emphase. « Synchronisation terminée. » plutôt que « Tout est à jour ! Votre bibliothèque est parfaitement synchronisée ! »

### Erreurs
Jamais de blâme (ni envers l'utilisateur, ni envers le système de façon dramatisée), toujours une cause probable et une action — voir [[ERROR_EXPERIENCE.md]] pour les patterns UI associés.
- ✅ « Impossible de joindre votre serveur. Vérifiez votre connexion ou l'adresse du serveur. »
- ❌ « Oups ! Une erreur est survenue. »
- ❌ « Erreur 503 : Service Unavailable » (jamais de jargon technique brut face à l'utilisateur, [[SECURITY_GUIDELINES.md]] §8)

### Succès
Bref, jamais célébratoire de façon disproportionnée à l'action. Une action mineure (ajout à une playlist) mérite une confirmation discrète, pas une célébration.
- ✅ « Ajouté à Focus. »
- ❌ « Excellent choix ! Ajouté avec succès à votre playlist Focus ! 🎉 »

### Notifications
Informatives, jamais incitatives. « Téléchargement terminé. » plutôt que « Votre musique est prête, venez l'écouter ! »

### Tutoriels et conseils contextuels
Voir [[ONBOARDING_GUIDE.md]] §4 — un conseil se formule comme une information utile, jamais comme une instruction impérative répétée. « Glissez vers le haut pour agrandir le lecteur. » plutôt que « N'oubliez pas que vous pouvez glisser vers le haut ! »

### Onboarding
Accueillant sans être bavard — voir [[ONBOARDING_GUIDE.md]] pour la séquence complète. Le texte d'accueil se limite à l'essentiel, jamais un pavé de présentation avant la première action possible.

### Aides et documentation intégrée
Précis, structuré, jamais condescendant — s'adresse à un utilisateur capable, pas à un débutant supposé incapable de suivre une explication directe.

### Tooltips
Le plus court texte capable de lever l'ambiguïté — un tooltip qui nécessite lui-même une explication a échoué à son rôle.

## 3bis. Ton par situation précise (ajout Phase 3)

> Ajouté ici plutôt que dans un `VOICE_AND_TONE_GUIDE.md` séparé — ce sont des précisions du §3, pas un second système.

| Situation | Ton | Exemple |
|---|---|---|
| Accueil (premier écran) | Sobre, sans emphase de bienvenue excessive | « Connectez votre serveur Jellyfin pour commencer. » |
| Connexion | Rassurant, orienté action | « Connexion à votre serveur... » |
| Synchronisation | Neutre, jamais anxiogène même si longue | « Synchronisation en cours — votre bibliothèque reste consultable. » |
| Lecture | Silencieux par défaut — la meilleure copie de lecture est l'absence de texte inutile | (aucun message pour une lecture qui démarre normalement) |
| Recherche | Immédiat, jamais un texte de chargement visible avant 100 ms | (aucun message tant que le budget de perception est tenu, [[PERFORMANCE_BUDGET.md]] §2) |
| Mise à jour disponible | Informatif, jamais pressant | « Une mise à jour est disponible. » (jamais « Mettez à jour maintenant ! ») |
| Téléchargement | Factuel sur la progression | « Téléchargement de 12 titres... » |
| Import (synchronisation initiale) | Honnête sur la durée si elle est longue | « Importation de votre bibliothèque — cela peut prendre quelques minutes selon sa taille. » |
| Suppression | Direct, jamais ambigu sur ce qui va disparaître | « Supprimer cette playlist ? Cette action est irréversible. » |
| Première utilisation d'une fonctionnalité | Une seule fois, jamais répété — voir [[ONBOARDING_GUIDE.md]] §4 | « Glissez vers le haut pour agrandir le lecteur. » |

## 3ter. Comparaison de ton avec des références non musicales (ajout Phase 3)

| Référence | Ce qui caractérise leur ton | Ce que Melodia en retient sans copier |
|---|---|---|
| Apple | Confiant, minimaliste, une seule idée par phrase | La discipline d'une seule idée par message — jamais une phrase qui explique deux choses à la fois |
| Linear | Direct, presque laconique, aucun mot superflu | La brièveté (§6) sans tomber dans la sécheresse — Melodia reste bienveillant là où Linear reste neutre |
| Raycast | Précis, s'adresse à un utilisateur compétent | Ne jamais expliquer ce qu'un utilisateur sait déjà ([[PERSONALITY.md]] §7, jamais infantilisant) |
| Notion | Chaleureux et encourageant, parfois verbeux | La chaleur, jamais la verbosité — Melodia reste concis (§2) |
| Spotify | Enjoué, exclamatif, orienté découverte | Explicitement écarté — trop festif pour l'archétype du Sage discret ([[PERSONALITY.md]] §1) hors du cas Wrapped (§5) |
| Arc | Ludique, personnalité affirmée | La permission d'avoir une personnalité reconnaissable, sans le registre ludique qui ne correspond pas à Melodia |

## 4. Ce qui est interdit dans tous les contextes

- Points d'exclamation multiples ou emojis décoratifs dans les textes d'interface fonctionnels (hors éventuel contexte ludique explicitement validé, ex. Wrapped — [[WRAPPED_SPECIFICATION.md]], qui reste sobre malgré son ton plus festif).
- Questions rhétoriques (« Prêt à découvrir votre musique ? »).
- Voix passive quand la voix active est plus directe (« Votre morceau a été ajouté » → « Ajouté »).
- Toute urgence artificielle (« Dernière chance », « Maintenant disponible ! ») — Melodia n'a rien à vendre dans l'urgence, cohérent avec [[PRODUCT_VALUES.md]] §4.

## 5. Cas particulier : Wrapped

[[WRAPPED_SPECIFICATION.md]] adopte un ton légèrement plus chaleureux et célébratoire que le reste du produit (c'est un moment de reconnaissance annuel) — seule exception documentée à la sobriété par défaut, et seulement à l'intérieur de cette fonctionnalité précise, jamais diffusée ailleurs dans l'interface.

## 6. Longueur

- Message d'état/erreur : une phrase, deux au maximum.
- Titre d'état vide : moins de 8 mots.
- Tooltip : moins de 6 mots quand possible.

---

## 7. Checklist de validation

- [ ] Chaque contexte du cadrage (système/erreurs/succès/notifications/tutoriels/onboarding/aides/tooltips) est couvert avec au moins un exemple concret.
- [ ] Les exemples « à éviter » sont aussi nombreux que les exemples « à suivre » — la règle n'est utile que si elle montre le contraste.
- [ ] L'exception Wrapped reste explicitement bornée à cette seule fonctionnalité.

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 2, volume 1) | Copywriter / UX Writer |
| 0.2.0 | 2026-08-03 | Phase 3 : ajout §3bis (ton par situation précise) et §3ter (comparatif de ton) plutôt que VOICE_AND_TONE_GUIDE.md en doublon | UX Writer Senior |

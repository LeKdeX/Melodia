# SOUND_DESIGN_GUIDE.md — Identité sonore de l'interface (Phase 2, volume 2)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Motion Art Director / Creative Director
> **Documents liés** : [[AUDIO_ENGINE.md]], [[PERSONALITY.md]], [[SETTINGS_SPECIFICATION.md]] §12

> **Différence avec [[AUDIO_ENGINE.md]]** : ce document couvre les sons **d'interface** (feedback UI), jamais la lecture musicale elle-même — [[AUDIO_ENGINE.md]] reste seul responsable du moteur de lecture. Les deux ne partagent aucun mécanisme technique.

---

## 1. Principe directeur

Les sons d'interface sont **rares et informatifs**, jamais décoratifs — cohérent avec [[PRODUCT_VALUES.md]] §4 (« le silence est une fonctionnalité »). Un son d'interface qui joue pendant que l'utilisateur écoute de la musique ne doit jamais rivaliser avec ce qu'il écoute — aucun son d'interface n'est jamais audible au point de couvrir ou de sembler mixé avec la musique en cours.

## 2. Quand un son joue (et quand il ne joue jamais)

| Événement | Son ? |
|---|---|
| Connexion réussie | Non — confirmation visuelle suffit ([[ERROR_EXPERIENCE.md]]) |
| Lecture / Pause | Non — l'action elle-même (le son de la musique qui démarre/s'arrête) est déjà le retour |
| Téléchargement terminé | Son discret optionnel, désactivé par défaut | 
| Synchronisation terminée | Non — indicateur visuel discret suffit ([[USER_JOURNEYS.md]] §9) |
| Succès d'une action mineure (ajout favori/playlist) | Non — micro-interaction visuelle suffit ([[INTERACTION_GUIDELINES.md]] §4) |
| Erreur bloquante (nécessitant une action immédiate) | Son discret, activé par défaut — seul cas où un son sert une fonction de sécurité réelle (alerter même si l'attention visuelle est ailleurs) |

**Constat assumé** : la plupart des événements de l'interface **n'ont pas de son** — pas par omission, mais par principe. C'est la différence la plus importante de ce document par rapport à un cadrage qui suppose implicitement qu'une identité sonore doit couvrir chaque interaction.

## 3. Caractère des sons (quand ils existent)

- Brefs (moins de 200ms), jamais une mélodie ou un jingle de marque.
- Ton grave et discret plutôt qu'aigu et attirant l'attention — cohérent avec le Sage discret ([[PERSONALITY.md]] §1, ne hausse jamais la voix).
- Un seul son par catégorie fonctionnelle (succès/erreur), jamais une bibliothèque de sons variés qui demanderait un apprentissage à l'utilisateur.

## 4. Sons définis

| Son | Caractère | Déclencheur |
|---|---|---|
| Erreur bloquante | Grave, bref, unique | Voir §2 |
| Téléchargement terminé (opt-in) | Neutre, très bref | Voir §2, désactivé par défaut |

**Volontairement minimal** : contrairement à la liste complète demandée dans le cadrage (connexion, lecture, pause, téléchargement, synchronisation, succès, erreur), seuls deux événements justifient un son après application du principe directeur (§1). Documenté explicitement plutôt que produit artificiellement pour remplir la liste — cohérent avec la règle d'honnêteté.

## 5. Contrôle utilisateur

Tous les sons d'interface (y compris celui de l'erreur bloquante) sont désactivables globalement en un seul réglage ([[SETTINGS_SPECIFICATION.md]] §12) — jamais un son qui ne peut pas être coupé, y compris pour un cas de sécurité, car l'utilisateur reste seul juge de son propre contexte d'écoute (casque, salle silencieuse, etc.).

## 6. Volume relatif

Tout son d'interface joue à un volume nettement inférieur au volume de lecture musicale actif, jamais au même niveau — un son d'interface qui surprend par son volume serait un défaut, pas une identité sonore réussie.

## 7. Redondance sonore et haptique (ajout Phase 4)

> Section ajoutée plutôt que de créer un `SOUND_EXPERIENCE.md` séparé — le cadrage de la Premium Experience Bible redemande la même liste d'événements déjà tranchée au §4 (« volontairement minimal ») ; recréer un second document sur le même sujet aurait contredit la décision déjà prise sans la faire évoluer. Cette section ajoute les deux angles réellement nouveaux : l'accessibilité et le haptique.

- **Redondance d'accessibilité** : le son de l'erreur bloquante (§4) n'est jamais le seul canal d'alerte — chaque événement qui produit un son a systématiquement un équivalent visuel et, si pertinent, une annonce `aria-live` ([[ACCESSIBILITY_GUIDE.md]] §2), pour qu'un utilisateur sourd ou malentendant ne perde jamais d'information. Le son est un renforcement, jamais un canal exclusif.
- **Architecture future haptique** : sur une future application mobile (voir [[INTERACTION_LIBRARY.md]] §Future Haptics), les deux événements sonores définis ici (§4) sont les candidats naturels à un retour haptique équivalent — un son bref et un retour haptique bref partagent la même justification (alerter sans interrompre). Aucune décision d'implémentation haptique n'est prise ici, seule la cohérence de principe est notée pour éviter une divergence future entre les deux canaux.

---

## 8. Checklist de validation

- [ ] Chaque catégorie d'événement demandée dans le cadrage a une décision explicite (son ou pas de son), pas une omission silencieuse.
- [ ] Tous les sons sont désactivables sans exception.
- [ ] Aucun son ne peut jamais couvrir la musique en cours de lecture.
- [ ] Chaque son a un équivalent visuel/annoncé, jamais un canal exclusif.

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 2, volume 2) | Motion Art Director / Creative Director |
| 0.2.0 | 2026-08-03 | Phase 4 : ajout §7 (redondance sonore/haptique) plutôt que SOUND_EXPERIENCE.md en doublon | Sound Designer |

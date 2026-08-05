# BUFFER_MANAGEMENT.md — Gestion du buffer audio (Moteur Audio)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Performance Engineer
> **Documents liés** : [[AUDIO_ENGINE.md]] §0bis.2, [[PLAYBACK_STATE_MACHINE.md]] §4, [[STREAMING_ENGINE.md]]

Applicable aux trois natures de source (`local`/`cache`/`stream`, [[AUDIO_ENGINE.md]] §0bis.2) — pas seulement au streaming, contrairement à ce que son association naturelle pourrait suggérer. Une lecture locale a elle aussi un buffer (lecture depuis disque), simplement avec des seuils différents.

---

## 1. Stratégie de buffer par nature de source

| Nature | Pré-buffer avant lecture audible | Buffer minimum (déclenche `Buffering`) | Buffer maximum |
|---|---|---|---|
| `local` | Négligeable (lecture disque, latence quasi nulle) | N/A — un fichier local ne sous-alimente jamais le lecteur au-delà d'une erreur d'I/O disque (taxonomie [[PLAYBACK_STATE_MACHINE.md]] §4) | N/A |
| `cache` | Négligeable, identique à `local` (fichier déjà entièrement sur disque, [[CACHE_SYSTEM.md]]) | N/A | N/A |
| `stream` | Quelques secondes (valeur exacte calibrée empiriquement, cohérent avec la calibration déjà actée pour les lots de synchronisation, [[PERFORMANCE_GUIDE.md]] §6quater) | Seuil sous lequel la lecture entre en `Buffering` plutôt que de continuer avec un risque de coupure audible | Plafonné pour éviter un usage mémoire non borné sur une piste longue — au-delà, le téléchargement du flux est mis en pause jusqu'à consommation d'une partie du buffer déjà chargé |

**Décision retenue** : le Playback Controller sélectionne cette stratégie exclusivement sur la base du champ `kind` résolu ([[PLAYBACK_CONTROLLER.md]] §2, étape 3) — jamais une détection a posteriori (ex. mesurer si des événements `waiting` surviennent) qui retarderait l'application de la bonne stratégie.

## 2. Pré-buffer et préchargement — deux mécanismes distincts

- **Pré-buffer** (ce document) : quantité de données chargées avant que la lecture *démarre* ou *continue sans interruption*, pour une piste déjà en cours de chargement.
- **Préchargement** ([[AUDIO_ENGINE.md]] §2) : anticipation de la *piste suivante* de la file, avant même qu'elle ne soit demandée.

Les deux opèrent sur le second élément `<audio>` du double buffer ([[AUDIO_ENGINE.md]] §3) au moment du préchargement, mais répondent à des questions temporelles différentes (« cette piste a-t-elle assez de données pour continuer maintenant » vs « la piste suivante est-elle déjà prête pour plus tard ») — jamais confondus dans l'implémentation.

## 3. Reprise après vidage (`Buffering → Playing`)

Le buffer se vide quand le débit de téléchargement descend sous le débit de lecture requis (streaming uniquement, §1). Reprise automatique dès que le buffer minimum (§1) est reconstitué — jamais une reprise au premier octet reçu après un vidage, qui risquerait un nouveau vidage immédiat (oscillation `Buffering`/`Playing` perceptible et désagréable).

## 4. Vidage explicite

Le buffer est vidé explicitement (jamais laissé à charger inutilement en arrière-plan) dans deux cas : changement de piste avant la fin naturelle de la précédente (`NEXT`/`JUMP`, [[COMMAND_API.md]]), et changement de profil de qualité ([[STREAMING_ENGINE.md]] §2, effectif au prochain changement de piste — le buffer de l'ancien profil est jeté, jamais mélangé avec le nouveau).

## 5. Optimisations

- Le buffer ne charge jamais au-delà du buffer maximum (§1) même si la bande passante le permettrait — éviter un usage mémoire disproportionné pour un gain d'expérience nul (l'utilisateur ne perçoit aucune différence entre un buffer de 30 secondes et un buffer de 5 minutes tant qu'aucune coupure ne survient).
- Sur connexion mesurée comme limitée (cohérent avec le réglage déjà acté pour le préchargement de pochettes, [[CACHE_SYSTEM.md]] §5), le buffer maximum est réduit automatiquement — jamais désactivé complètement, qui dégraderait la robustesse aux micro-coupures réseau.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas la résolution de source (voir [[AUDIO_ENGINE.md]] §0bis.2).
- Ne redéfinit pas les transitions d'état déclenchées par le buffer (voir [[PLAYBACK_STATE_MACHINE.md]] §4).
- Ne redéfinit pas le préchargement de la piste suivante (voir [[AUDIO_ENGINE.md]] §2).

## 7. Checklist de validation

- [ ] La stratégie de buffer est toujours sélectionnée sur la base de `kind`, jamais détectée a posteriori (§1).
- [ ] Aucune reprise de lecture ne survient avant que le buffer minimum soit reconstitué (§3).
- [ ] Le buffer ne dépasse jamais le maximum défini, y compris sur une connexion très rapide (§5).

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Moteur Audio) | Performance Engineer |

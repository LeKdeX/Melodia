# DEVELOPER_PLAYBOOK.md — Le workflow officiel, du choix d'une tâche au merge

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-05
> **Propriétaire** : Staff Technical Lead
> **Documents liés** : [[DEVELOPMENT_GUIDELINES.md]], [[ENGINEERING_BACKLOG.md]], [[TASK_BREAKDOWN.md]], [[ADR_TEMPLATE.md]], [[TESTING_STRATEGY.md]], [[CODE_REVIEW_GUIDE.md]], [[DEFINITION_OF_DONE.md]]

Ce document ne redécide **aucune** règle — [[DEVELOPMENT_GUIDELINES.md]] pose déjà le cycle de vie en 9 étapes, [[DEFINITION_OF_READY.md]]/[[DEFINITION_OF_DONE.md]] posent déjà les portes d'entrée/sortie, [[CODE_REVIEW_GUIDE.md]] pose déjà la checklist du relecteur. Ce qui manquait : un parcours narratif unique, du moment où un développeur ouvre le backlog jusqu'au moment où sa PR est mergée, qui dit dans quel ordre consulter tout ce qui précède. Volontairement court — chaque section renvoie au document qui fait autorité plutôt que de répéter son contenu.

---

## 1. Avant de commencer — ce que vous devez déjà avoir lu une fois

Avant votre première tâche, lisez une fois (pas à chaque tâche) : [[PROJECT_CHARTER.md]] (vision, périmètre), [[ARCHITECTURE_PRINCIPLES.md]] (invariants structurels), [[CODING_STANDARDS.md]] (conventions), [[ENGINEERING_HANDBOOK.md]] (constitution complète). C'est exactement la checklist d'onboarding déjà actée — voir [[CHECKLISTS.md]] §1, non répétée ici.

Si c'est fait, vous n'avez plus jamais besoin de relire ces quatre documents en entier — seulement les sections précises que chaque tâche cite.

---

## 2. Étape 1 — Sélectionner la prochaine tâche disponible

1. Ouvrez la vue Kanban du Project Board ([[PROJECT_BOARD_GUIDE.md]] §3) — colonne `Todo`, filtrée sur votre Epic assigné ou, à défaut, triée par priorité (`P0` d'abord, [[GITHUB_LABELS.md]] §2).
2. Une tâche disponible n'a **aucun** label `blocked` ([[GITHUB_LABELS.md]] §3) — si elle en a un, ses dépendances ne sont pas encore fermées ; consultez [[DEPENDENCY_GRAPH.md]] pour savoir laquelle attendre, jamais commencer une tâche bloquée « en attendant ».
3. Si vous êtes nouveau sur le projet, filtrez sur `good-first-issue` (Tasks XS/S sans dépendance bloquante, [[GITHUB_LABELS.md]] §3).
4. Pour les jalons M4 et au-delà, la tâche que vous cherchez n'existe peut-être pas encore au niveau Task — seul le niveau Feature est garanti ([[TASK_BREAKDOWN.md]] §1, rolling wave). Dans ce cas, la première étape de votre travail est la décomposition Story→Task de la Feature concernée, en suivant le gabarit exact de [[TASK_BREAKDOWN.md]] §3 — jamais une implémentation qui commence sans ce découpage écrit d'abord.
5. Assignez-vous l'Issue — une tâche assignée à personne n'est pas « en cours », même si vous y travaillez déjà localement ; l'assignation est ce qui retire la tâche de la disponibilité pour un autre contributeur.

**Règle de non-conflit** : ne prenez jamais une tâche déjà assignée à quelqu'un d'autre, même si elle semble bloquée depuis longtemps — demandez d'abord en commentaire d'Issue.

## 3. Étape 2 — Lire les documents de référence

Chaque tâche liste ses **Documents de référence** ([[TASK_BREAKDOWN.md]] §3, champ obligatoire). L'ordre de lecture n'est pas arbitraire :

1. **D'abord le document propriétaire de la Feature parente** ([[FEATURES.md]] §2, colonne « Document propriétaire ») — c'est la source de vérité du comportement attendu.
2. **Ensuite les documents cités explicitement par la Task** — souvent une section précise (`§N`), jamais le document entier s'il n'est pas nécessaire.
3. **Si un document cité contredit un autre document cité** (rare, mais possible sur un projet de cette taille) : **arrêtez-vous**, ne tranchez jamais vous-même — signalez la contradiction en commentaire d'Issue avant d'écrire une ligne de code, cohérent avec la règle absolue déjà actée ([[PROJECT_CHARTER.md]] §7, [[DOCUMENTATION_GUIDE.md]] §5).
4. **Si un document cité est ambigu sur un point précis d'implémentation** (jamais sur un point produit ou architectural — cela nécessiterait un ADR, voir §4) : la décision d'implémentation la plus simple qui satisfait le document reste préférée ([[ENGINEERING_GUIDE.md]] §1.1, simplicité par défaut), documentée en commentaire de code uniquement si elle n'est pas évidente ([[CODING_STANDARDS.md]] §5).

Ne commencez jamais à coder avant d'avoir lu tous les documents de référence de la tâche — c'est la cause la plus fréquente de PR rejetée en revue pour non-conformité architecturale.

## 4. Étape 3 — Décider si un ADR est nécessaire

Un ADR est requis **avant** l'implémentation, jamais après, si votre tâche implique une des situations suivantes ([[ADR_TEMPLATE.md]] §1, déjà acté — rappel, non redéfini) :

- Une nouvelle dépendance de catégorie (pas une mise à jour de version, une catégorie entièrement nouvelle de bibliothèque).
- Un changement d'architecture ou de convention déjà actée ailleurs dans `docs/`.
- Une décision qui engagerait un coût de migration si elle devait être défaite plus tard.

**Test rapide** : si votre tâche se contente d'appliquer un pattern déjà documenté (un nouveau composant qui suit [[COMPONENT_LIBRARY.md]], un nouveau Repository qui suit [[REPOSITORY_PATTERN.md]] §3), **aucun ADR n'est nécessaire** — la grande majorité des Tasks de ce backlog n'en demande aucun. Si vous hésitez, posez la question en commentaire d'Issue avant de commencer plutôt que de deviner.

Si un ADR est nécessaire : rédigé avec le gabarit [[ADR_TEMPLATE.md]], validé par le propriétaire du document fondateur concerné ([[DOCUMENTATION_GUIDE.md]] §3) **avant** le premier commit d'implémentation — cohérent avec [[DEFINITION_OF_READY.md]], section Conception.

## 5. Étape 4 — Implémenter

- Créez votre branche selon la convention déjà actée : `<type>/<description-kebab-case>` ([[GIT_WORKFLOW.md]] §1).
- Respectez les frontières de couche/module pendant que vous écrivez, pas seulement à la fin — le linter d'architecture ([[ARCHITECTURE_PRINCIPLES.md]] §7) le vérifiera de toute façon, mais le découvrir a posteriori coûte plus cher qu'y penser en écrivant.
- Suivez [[CODING_STANDARDS.md]] et [[TYPESCRIPT_GUIDE.md]] sans réflexion consciente répétée — si vous vous surprenez à hésiter sur une convention de nommage ou un choix `interface`/`type`, la réponse est déjà écrite, cherchez-la plutôt que de choisir au jugé.
- Committez par petits incréments logiques suivant Conventional Commits ([[GIT_WORKFLOW.md]] §2) — un historique de commits clair aide votre propre revue (§7) autant que celle d'un tiers.
- **Surveillez la taille** : si votre diff dépasse ~300-400 lignes avant même d'être terminé, arrêtez-vous et redécoupez la tâche restante en une Task suivante ([[TASK_BREAKDOWN.md]] §4, règle absolue déjà actée) — ne finissez jamais une PR surdimensionnée en vous disant que vous la découperez après coup, le découpage a posteriori d'un diff déjà écrit est presque toujours pire qu'un découpage a priori.

## 6. Étape 5 — Écrire les tests

Consultez [[TESTING_STRATEGY.md]] §9septies (table de décision « quand écrire chaque test ») **avant** d'écrire le code de test, pas après avoir déjà décidé intuitivement du type. Règle de séquencement à l'intérieur d'une tâche :

1. Le comportement attendu est déjà connu (critères d'acceptation de la Task) — un test qui vérifie ce comportement peut être écrit avant, pendant, ou après l'implémentation selon votre préférence personnelle, ce projet n'impose pas le TDD strict.
2. Ce qui est non négociable : **aucune tâche n'est proposée en revue sans ses tests**, jamais « les tests arrivent dans une PR de suivi » ([[GIT_WORKFLOW.md]] §3, déjà acté — tests avant fusion).
3. Le niveau de test suit la table de décision — un calcul pur en unitaire, une interaction de composants en intégration, jamais un E2E pour ce qu'un niveau inférieur suffit à couvrir.
4. Une correction de bug ajoute toujours un test de régression au niveau où le bug a été introduit ([[TESTING_STRATEGY.md]] §10), jamais seulement au niveau où il a été observé.

## 7. Étape 6 — Mettre à jour la documentation

Avant d'ouvrir la PR, posez-vous une seule question : *cette tâche a-t-elle changé un comportement, une convention, ou une décision déjà écrite dans `docs/` ?*

- **Non** (cas le plus fréquent — vous avez appliqué un pattern déjà documenté) : aucune mise à jour de `docs/` nécessaire. TSDoc sur toute surface publique nouvelle/modifiée reste néanmoins obligatoire ([[CODING_STANDARDS.md]] §5).
- **Oui** : le document fondateur concerné est mis à jour **dans la même PR**, jamais dans une PR de suivi séparée qui laisserait `docs/` temporairement faux ([[DEFINITION_OF_DONE.md]], section Documentation). Suivez la RÈGLE ABSOLUE déjà actée avant de créer un nouveau document : vérifiez qu'un document existant ne couvre pas déjà le sujet, étendez-le plutôt que d'en créer un nouveau ([[DOCUMENTATION_CHECKLIST.md]] §1).
- Si votre tâche a nécessité un ADR (§4), le document fondateur impacté est mis à jour dans la même PR que l'ADR — jamais un ADR validé sans que sa conséquence documentaire soit déjà écrite.

## 8. Étape 7 — Auto-review avant de demander une revue humaine

Appliquez-vous à vous-même la checklist du relecteur ([[CODE_REVIEW_GUIDE.md]] §2) **avant** d'ouvrir la PR, dans le même ordre qu'un relecteur l'appliquerait :

1. **Architecture** — relisez votre propre diff en cherchant une violation de frontière ou une duplication, pas seulement en comptant sur le linter.
2. **Lisibilité** — un nom qui vous semblait clair en écrivant peut ne plus l'être une heure après ; relisez comme si vous découvriez le code.
3. **Performance/Sécurité/Accessibilité** — cochez explicitement chaque item applicable de [[IMPLEMENTATION_CHECKLISTS.md]] §1, jamais silencieusement supposé conforme.
4. **Tests** — exécutez la suite complète localement, pas seulement les tests que vous venez d'écrire.
5. **Documentation** — relisez la section que vous avez modifiée (§7) comme si vous ne connaissiez pas déjà le contexte : est-elle compréhensible seule ?

Une auto-review sérieuse réduit le nombre d'allers-retours en revue humaine — elle ne la remplace jamais ([[GIT_WORKFLOW.md]] §3, revue obligatoire par une personne non-auteure, aucune exception).

## 9. Étape 8 — Ouvrir la Pull Request

Utilisez le gabarit déjà acté ([[GIT_WORKFLOW.md]] §3.0bis) — contexte/motivation, changements apportés, comment tester, captures si changement visuel, checklist [[DEFINITION_OF_DONE.md]] cochée pour les sections applicables au type de changement. Référencez `Closes #<issue>` pour que la Task se ferme automatiquement au merge ([[PROJECT_BOARD_GUIDE.md]] §4).

## 10. Quand une tâche est terminée

Une tâche est terminée quand, et seulement quand :

- [[DEFINITION_OF_DONE.md]] est satisfaite pour toutes les sections applicables au type de changement — jamais « ça fonctionne chez moi ».
- La CI est verte sans exception ([[GIT_WORKFLOW.md]] §3).
- Au moins une personne non-auteure a approuvé la revue ([[CODE_REVIEW_GUIDE.md]]).
- La PR est mergée (squash, [[GIT_WORKFLOW.md]] §3.1) — la Task se ferme automatiquement.

**Ce que « terminé » n'inclut jamais** : une PR ouverte en attente de revue depuis plusieurs jours n'est pas terminée même si le code est fini — tant qu'elle n'est pas mergée, considérez-la comme non livrée et ne construisez jamais une tâche suivante qui présuppose son contenu déjà en place sur `main`.

---

## 11. Le parcours complet, en un coup d'œil

```
Backlog (§2)
   ↓ sélection d'une tâche non bloquée, assignation
Lecture des documents de référence (§3)
   ↓ contradiction/ambiguïté ? → signaler avant de continuer
ADR nécessaire ? (§4)
   ↓ oui → rédiger et valider avant tout commit
Implémentation (§5)
   ↓ surveiller la taille du diff en continu
Tests (§6)
   ↓ jamais reportés à une PR de suivi
Documentation (§7)
   ↓ dans la même PR, jamais après
Auto-review (§8)
   ↓ checklist du relecteur appliquée à soi-même
Pull Request (§9)
   ↓ gabarit + Closes #issue
Revue humaine + CI verte
   ↓
Merge → Task fermée automatiquement → retour à l'étape 1
```

---

## 12. Ce que ce document ne fait pas

- Ne redéfinit aucune règle — chaque étape renvoie à son document source, jamais une reformulation qui pourrait diverger avec le temps.
- Ne couvre pas le cycle de vie produit en amont du backlog (cadrage, priorisation) — voir [[DEVELOPMENT_GUIDELINES.md]] étapes 1-2 pour ce qui précède la sélection d'une tâche déjà découpée.
- Ne remplace jamais le jugement humain sur un cas non couvert — dans le doute, demander explicitement plutôt que d'improviser reste toujours la bonne réponse.

## 13. Checklist de validation

- [ ] Chaque étape (§2-10) renvoie à un document qui fait autorité, aucune règle nouvelle inventée ici.
- [ ] Le document reste lisible en une seule séance (§ »concis », cadrage), aucune section redondante avec une autre.
- [ ] Le schéma §11 reste cohérent avec l'ordre réel des sections.

## 14. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-05 | Création initiale du document | Staff Technical Lead |

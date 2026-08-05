# DOCUMENTATION_CHECKLIST.md — Checklist qualité documentaire (Revue de consolidation)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Documentation Architect
> **Documents liés** : [[DOCUMENTATION_GUIDE.md]] §4-5, [[DOCUMENT_DEPENDENCY_GRAPH.md]], [[GLOSSARY.md]]

[[DOCUMENTATION_GUIDE.md]] §4-5 pose déjà les principes de cohérence documentaire (source unique de vérité, liens explicites, relecture obligatoire, ADR). Ce document les transforme en **checklist actionnable**, à cocher avant de considérer un document — nouveau ou modifié — comme terminé. Ne redécide aucun principe, applique ceux déjà actés.

---

## 1. RÈGLE ABSOLUE — avant de créer un nouveau document

1. **Chercher un document existant sur le même sujet** — consulter [[TABLE_OF_CONTENTS.md]] par domaine, pas seulement chercher un nom de fichier exact (un sujet peut déjà être couvert sous un autre nom, ex. « Theme Engine » → [[DYNAMIC_THEME_GUIDE.md]]).
2. **Si le sujet existe déjà, enrichir le document existant** — nouvelle section numérotée (`§Nbis`, `§Nter`...), jamais un second fichier sur le même sujet sous un nom voisin.
3. **Ne créer un nouveau document que si le domaine est réellement indépendant** — testable par la question : *ce document répond-il à une question qu'aucun document existant ne pose déjà, même partiellement ?* Si la réponse est « il répond à la même question avec plus de détail », c'est une extension, pas un nouveau document.
4. **Annoncer la décision de consolidation avant d'exécuter** — cohérent avec la pratique déjà appliquée à travers les 13 phases précédentes (voir chaque entrée de `CLAUDE.md`) : jamais une fusion ou une extension silencieuse.

Cette règle n'est pas nouvelle — elle a été appliquée en continu depuis la Phase 6 (voir chaque entrée « consolidation » du journal de `CLAUDE.md`). Ce document la formalise en checklist plutôt que de laisser la discipline reposer sur la seule mémoire du contributeur.

## 2. Avant de committer un nouveau document

- [ ] En-tête complet : Statut, Version, Date de création, Propriétaire, Documents liés ([[DOCUMENTATION_GUIDE.md]] format déjà établi).
- [ ] Une phrase de cadrage explicite si le sujet recoupe un document existant (« Cadrage strict : X reste la source de vérité pour... »).
- [ ] Tous les termes techniques utilisés sont cohérents avec [[GLOSSARY.md]] ; tout terme de copy utilisateur cohérent avec [[VOCABULARY.md]].
- [ ] Toute section numérotée suit la convention `§N`, `§Nbis`, `§Nter` déjà établie — jamais une renumérotation qui casserait une citation externe existante (vérifier via `grep` avant de renuméroter, voir [[DOCUMENT_DEPENDENCY_GRAPH.md]] §1 pour les documents à forte cascade).
- [ ] Checklist de validation propre au document (section avant-dernière).
- [ ] Historique des révisions (section finale), première entrée en version `1.0.0` pour un nouveau document.

## 3. Avant de modifier un document existant à forte cascade

Voir [[DOCUMENT_DEPENDENCY_GRAPH.md]] §1 (top 10 documents les plus référencés) :
- [ ] Rechercher toutes les citations de section précise (`grep "NOM_DU_DOC.md]] §N"`) avant de renuméroter ou déplacer une section.
- [ ] Si le changement contredit un document dépendant, la contradiction est signalée explicitement, jamais résolue en silence ([[DOCUMENTATION_GUIDE.md]] §5).
- [ ] La version du document est incrémentée (section Historique des révisions) même pour un changement mineur.

## 4. Audit de cohérence (à répéter à chaque fin de phase, déjà pratiqué depuis la Phase 3)

- [ ] Tous les `[[wikilinks]]` résolvent (`grep -rhoE '\[\[[A-Za-z_.]+\.md\]\]' docs/` comparé à `ls docs/*.md`) — seule exception tolérée : `[[Document.md]]`, placeholder de template intentionnel.
- [ ] Les citations de section (`§N`) correspondent aux titres réels du document cité.
- [ ] Aucun document n'a 0 référence entrante ([[DOCUMENT_DEPENDENCY_GRAPH.md]] §3) — un document isolé est un signal qu'il devrait être référencé depuis au moins un document existant ou qu'il n'a plus sa place.
- [ ] [[TABLE_OF_CONTENTS.md]] et [[DOCUMENTATION_GUIDE.md]] §1 sont mis à jour avec tout nouveau document.
- [ ] `CLAUDE.md` reçoit une nouvelle entrée de journal de phase.

## 5. Densité — quand fusionner ou découper

- **Trop petit (signal, pas règle automatique)** : un document de moins de 50 lignes qui ne répond qu'à une seule question déjà répondue ailleurs partiellement est un candidat de fusion — mais voir [[ARCHITECTURE_REVIEW.md]] §4, aucun document du corpus actuel ne descend sous ce seuil.
- **Trop gros (signal)** : un document qui dépasse ~300 lignes mérite un découpage par sous-domaine si plusieurs sections n'ont pas de dépendance entre elles — voir [[ARCHITECTURE_REVIEW.md]] §4 pour les deux seuls documents proches de ce seuil, tous deux justifiés.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas les principes de cohérence eux-mêmes (voir [[DOCUMENTATION_GUIDE.md]] §4-5).
- Ne remplace pas la revue humaine — une checklist cochée sans lecture réelle ne satisfait pas cette checklist, cohérent avec l'esprit de `CLAUDE.md` (honnêteté sans exception).

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Revue de consolidation) | Documentation Architect |

# LOGO_GUIDE.md — Réflexion et règles d'usage du logo (Phase 2, volume 2)

> **Statut** : document fondateur, vivant — **brief conceptuel, pas un logo final**
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Brand Designer / Creative Director
> **Documents liés** : [[PERSONALITY.md]], [[COLOR_SYSTEM.md]], [[POSITIONING.md]]

> **Limite honnête de ce document** : je ne peux pas dessiner ou rendre une image — ce document est le **brief conceptuel** qu'un designer (humain ou outil de génération visuelle) utiliserait pour dessiner le logo, plus l'intégralité des règles d'usage qui s'appliqueront à la marque une fois dessinée. Ce n'est pas un logo, c'est la spécification de ce qu'un bon logo Melodia doit accomplir et respecter — cohérent avec la décision actée (`CLAUDE.md`) de ne jamais figer une identité visuelle littérale sans retour humain direct.

---

## 1. Ce que le logo doit accomplir

- Fonctionner sans texte (symbole seul) pour les contextes réduits (icône d'application, favicon), et en version combinée (symbole + nom) pour les contextes de communication.
- Rester reconnaissable à 16px (barre de tâches) comme à la taille d'un écran d'accueil.
- Ne jamais évoquer un logo de plateforme de streaming existante (pas de forme d'onde stylisée générique façon SoundCloud, pas de disque/vinyle littéral façon de nombreux lecteurs, pas de note de musique isolée — trop générique et déjà largement utilisée).

## 2. Direction conceptuelle recommandée

Un symbole abstrait construit à partir d'une **forme géométrique simple doublée de sens** plutôt qu'une illustration littérale d'objet musical — cohérent avec le style d'illustration déjà acté ([[ILLUSTRATION_GUIDE.md]] §1, formes géométriques simples). Piste à explorer : une forme qui suggère simultanément la continuité (cercle ou boucle, echo de « la musique ne s'arrête jamais », [[PRODUCT_RULES.md]] §2) et la précision (une coupure ou une ouverture nette dans la forme, echo du Sage discret — précis, jamais approximatif, [[PERSONALITY.md]] §1). Cette piste reste une direction de recherche, pas une description à exécuter au pixel près.

## 3. Ce qui est explicitement écarté

- Tout dégradé multicolore complexe façon icône d'application des années 2010 — contraire à la sobriété de marque ([[BRAND_PRINCIPLES.md]] §1).
- Toute ressemblance avec l'identité visuelle de Jellyfin — non négociable ([[PROJECT_CHARTER.md]] §4).
- Tout symbole qui ne fonctionnerait qu'en couleur (voir §5, contrainte monochrome).

## 4. Simplicité et reconnaissance

Testable par la règle du croquis : le symbole doit pouvoir être esquissé de mémoire en moins de 5 traits par quelqu'un qui l'a vu une seule fois — seuil de référence utilisé pour évaluer les propositions, pas une contrainte de production.

## 5. Contraintes de fonctionnement

| Contexte | Exigence |
|---|---|
| Petite taille (16-24px) | Aucun détail fin qui disparaîtrait — le symbole doit rester identifiable réduit à ses formes les plus simples |
| Grande taille | Aucun artefact de vectorisation grossière — le symbole doit rester net à l'échelle d'une bannière |
| Monochrome | Le symbole fonctionne en un seul ton (noir ou blanc plein), sans dépendre d'un dégradé ou d'un contraste de deux couleurs pour rester lisible |
| Couleur | Version couleur utilise `accent-500` ([[COLOR_SYSTEM.md]] §3) comme couleur de référence, jamais une couleur non présente dans le système de couleurs global |
| Fond clair | Version sombre du symbole (`neutral-900` ou `accent-600`) |
| Fond sombre | Version claire du symbole (`neutral-0` ou `accent-300`) |

## 6. Zone de protection

Espace minimum autour du logo égal à la hauteur du symbole lui-même (règle standard de l'industrie) — aucun élément d'interface, texte ou bordure ne peut empiéter sur cette zone, y compris dans la barre de titre de l'application ou une icône de plateforme.

## 7. Variantes à produire (une fois le symbole dessiné)

- Symbole seul (icône d'application, favicon).
- Symbole + nom, disposition horizontale (en-tête, communication).
- Symbole + nom, disposition verticale (écran d'accueil, supports carrés).
- Version monochrome noire, version monochrome blanche, version couleur.

## 8. Ce que ce document ne fait pas

Il ne fixe aucune forme exacte, aucune valeur de couleur au-delà de celles déjà proposées dans [[COLOR_SYSTEM.md]], et ne constitue en aucun cas un logo final utilisable. La prochaine étape réelle est un travail de dessin itératif avec retour visuel humain direct — hors du périmètre de ce qu'un document texte peut accomplir seul.

---

## 9. Checklist de validation

- [ ] Aucune forme finale n'est décrite comme arrêtée — uniquement une direction de recherche.
- [ ] Toutes les contraintes fonctionnelles demandées dans le cadrage (petit/grand, mono/couleur, fond clair/sombre) sont couvertes par une règle vérifiable.
- [ ] La zone de protection est définie de façon mesurable, pas seulement qualitative.

---

## 10. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 2, volume 2) — brief conceptuel | Brand Designer / Creative Director |

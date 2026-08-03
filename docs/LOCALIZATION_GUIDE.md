# LOCALIZATION_GUIDE.md — Conventions de traduction (Phase 3)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : UX Writer Senior / Localization Lead
> **Documents liés** : [[UX_WRITING_GUIDE.md]], [[STYLE_GUIDE.md]], [[TECH_STACK.md]]

> **Cadrage** : ce document ne fixe pas la liste des langues cibles (décision produit hors scope de la Phase 3, à trancher séparément — voir §6). Il fixe les conventions d'écriture du texte source (français et anglais) qui rendent une traduction future possible sans réécriture, et les règles techniques de pluriels/formats.

---

## 1. Principe directeur

Le texte source est écrit pour être traduit dès le premier jour, même si une seule langue est livrée au lancement. Une formulation qui ne se traduit pas proprement doit être reformulée à la source plutôt que patchée dans chaque langue cible.

## 2. Formulations à éviter pour rester traduisibles

| À éviter | Pourquoi | Alternative |
|---|---|---|
| Construction de phrase par concaténation (« Ajouté à » + [nom] + « avec succès ») | L'ordre des mots varie selon la langue ; concaténer casse la grammaire dans plusieurs langues cibles | Une chaîne complète avec placeholder : « Ajouté à {playlist}. » |
| Pluriel géré par un simple `s` ajouté en code | Ne fonctionne pas pour la plupart des langues (russe, arabe, etc. ont plusieurs formes plurielles) | Utiliser les règles de pluriel ICU (voir §3) |
| Jeux de mots, allitérations, rimes | Intraduisibles par nature | Formulation directe, sens plutôt que sonorité |
| Métaphores culturellement situées (ex. références sportives locales) | Ne transposent pas | Formulation littérale |
| Genre grammatical supposé (« Il a été ajouté ») | Le français attribue un genre que d'autres langues n'ont pas ou inversent | Formulation neutre à la voix active sans pronom (cohérent avec [[UX_WRITING_GUIDE.md]] §2) |
| Texte concaténé à partir de fragments réutilisés dans des contextes différents | Un même fragment peut nécessiter une forme différente selon la phrase qui l'entoure | Une chaîne complète et unique par contexte, même si cela duplique du texte proche |

## 3. Pluriels

Utilisation du format ICU MessageFormat (standard, supporté par les bibliothèques d'i18n courantes de l'écosystème React) :

```
{count, plural, =0 {Aucun titre} one {# titre} other {# titres}}
```

Chaque chaîne comportant un nombre variable passe par ce format — jamais de condition manuelle `count > 1 ? "s" : ""` codée en dur dans l'UI, qui échoue silencieusement pour les langues à règles de pluriel différentes du français/anglais.

## 4. Unités et formats régionaux

| Type | Convention |
|---|---|
| Durée | Format court localisé (`3:45` reste universel ; au-delà d'une heure, `1:03:12`) — jamais « 3 minutes 45 secondes » en dehors d'un contexte d'accessibilité (lecteur d'écran, voir [[ACCESSIBILITY_GUIDE.md]]) |
| Date | Format localisé selon la locale système, jamais codé en dur (`MM/DD/YYYY` interdit en source) |
| Nombre | Séparateur de milliers localisé (espace en français, virgule en anglais US) — délégué à l'API `Intl` du navigateur, jamais formaté manuellement |
| Taille de fichier | Unités binaires (Mio/Gio) affichées selon la locale, cohérent avec [[STYLE_GUIDE.md]] §5 |

## 5. Longueur de texte selon la langue

Une chaîne française est en moyenne 15 à 20 % plus longue que son équivalent anglais ; l'allemand peut dépasser 30 %. Toute interface avec un texte au plus près de sa limite d'espace disponible (bouton, badge, tab) doit être testée avec une chaîne factice 30 % plus longue avant validation — conforme à [[UX_WRITING_GUIDE.md]] §3 (longueurs maximales), qui doit rester une marge et non une limite dure occupée à 100 % par le français.

## 6. Langue source et langues cibles

Le texte source de référence est rédigé en français (langue de travail de l'équipe produit à ce stade) avec une version anglaise maintenue en parallèle dès la Phase 3 pour les documents utilisateur final ; le choix des langues cibles additionnelles pour la première version publique reste une décision produit ouverte, non tranchée dans ce document — à trancher via [[ROADMAP.md]].

## 7. Ce qui ne se traduit jamais

- Les noms propres (Melodia, Jellyfin).
- Les raccourcis clavier (`Ctrl/Cmd + K`) — seule la touche modificatrice change selon l'OS, jamais selon la langue.
- Le vocabulaire de marque figé listé dans [[VOCABULARY.md]] §1, sauf recommandation explicite d'un traducteur natif documentée à part.

---

## 8. Checklist de validation

- [ ] Chaque règle de §2 a un exemple concret d'erreur évitée.
- [ ] Le format de pluriel (§3) est cohérent avec ce que [[TECH_STACK.md]] permet réellement dans l'écosystème choisi.
- [ ] Aucune décision de langues cibles n'est présentée comme tranchée ici (§6 reste explicitement ouvert).

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 3) | UX Writer Senior / Localization Lead |

# ONBOARDING_SCREENS.md — Écrans d'accueil initial (Phase 10)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Product Designer / UX Architect
> **Documents liés** : [[SCREEN_SYSTEM.md]] §2, [[ONBOARDING_GUIDE.md]], [[ONBOARDING_COPY.md]]

> **Cadrage** : [[ONBOARDING_GUIDE.md]] a déjà défini la séquence et le comportement, [[ONBOARDING_COPY.md]] le texte verbatim de chaque étape — ce document assemble uniquement la composition visuelle de chaque écran de la séquence.

---

## 1. Présentation

Séquence linéaire de 7 écrans, jamais une navigation libre entre eux avant complétion — cohérent avec [[ONBOARDING_GUIDE.md]] §2. Utilise Step Indicator ([[NAVIGATION_COMPONENTS.md]]) pour la progression, jamais des Tabs (déjà l'anti-pattern explicitement acté, [[NAVIGATION_COMPONENTS.md]] §10).

## 2. Composition — séquence complète

```
1. Welcome       : Hero centré + [Bouton Se connecter] — [[ONBOARDING_COPY.md]] §1
2. Server        : TextField (adresse serveur) + [Bouton Se connecter] — §2
3. Authentication: Identifiants (TextField + PasswordField) intégrés à l'écran Server (§2), pas un écran séparé
4. Library Import: Progress + message d'attente — [[ONBOARDING_COPY.md]] §3
5. Theme Selection: Theme Selector ([[SETTINGS_COMPONENTS.md]]) — [[ONBOARDING_COPY.md]] §6
6. Preferences   : Densité d'affichage (Confortable/Compacte) — même écran que §5, pas un écran distinct
7. Finished      : transition directe vers Accueil, aucun écran de confirmation intermédiaire ([[ONBOARDING_GUIDE.md]] §6, aucune étape ne retarde l'arrivée dans la bibliothèque)
```

**Fusion assumée** : Authentication (cadrage) fait partie de l'écran Server Connection, jamais un écran distinct — le cadrage de Phase 10 nomme séparément ce qui était déjà un seul écran depuis [[ONBOARDING_COPY.md]] §2. De même Theme Selection et Preferences ne forment qu'un seul écran « Personnalisation » ([[ONBOARDING_COPY.md]] §6).

## 3. Step Indicator — mapping

5 étapes visibles (Welcome n'a pas besoin d'indicateur, Finished non plus car transition automatique) : Server → Import → Personnalisation, avec Server/Authentication comptant comme une seule étape visible.

## 4. États et cas limites propres à l'assemblage

- **Échec de connexion au serveur** : reste sur l'écran Server (§2) avec message d'erreur inline, jamais un écran d'erreur séparé ([[ERROR_SCREENS.md]] §4, réutilisation confirmée).
- **Import long** (bibliothèque volumineuse) : l'écran Import Library reste affiché avec message adaptatif déjà défini ([[ONBOARDING_COPY.md]] §3), jamais un timeout qui ferait avancer prématurément.
- **Étape Personnalisation ignorée** (« Passer, je réglerai ça plus tard ») : passage direct à Finished (§2.7), réglages par défaut appliqués silencieusement, modifiables plus tard sans friction depuis Paramètres ([[SETTINGS_SCREENS.md]]).

## 5. Responsive

Voir [[RESPONSIVE_LAYOUTS.md]]. Chaque écran de la séquence reste plein écran sur toutes les classes d'appareil (aucune coexistence avec Sidebar/TopBar pendant l'onboarding) — cohérent avec l'absence de navigation principale avant completion (§1).

---

## 6. Checklist de validation

- [ ] La séquence reste linéaire, jamais une navigation libre avant completion.
- [ ] Authentication et Preferences restent fusionnés dans leurs écrans respectifs (§2), jamais dupliqués en écrans séparés.
- [ ] Aucun texte n'est redéfini ici, uniquement référencé depuis [[ONBOARDING_COPY.md]].

---

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 10) | Product Designer / UX Architect |

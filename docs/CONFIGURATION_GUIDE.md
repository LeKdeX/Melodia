# CONFIGURATION_GUIDE.md — Configuration d'environnement et de build (Phase 12)

> **Statut** : document fondateur, vivant
> **Version** : 1.0.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Infrastructure Architect
> **Documents liés** : [[ARCHITECTURE.md]] §2, [[CODING_STANDARDS.md]] §1bis, [[CI_CD_GUIDE.md]], [[SECURITY_GUIDE.md]] §3

[[CODING_STANDARDS.md]] §1bis annonce ce document pour le détail de `packages/config/` sans le spécifier. [[ARCHITECTURE.md]] §2 ne couvre que le contenu partagé de build (tsconfig, ESLint, preset Tailwind). Ce document répond à une question que ni l'un ni l'autre ne couvre : **quelles variables d'environnement existent, comment elles diffèrent par cible/environnement, et comment la configuration runtime est validée.**

---

## 1. Variables d'environnement — convention de nommage

- Préfixe `VITE_` obligatoire pour toute variable exposée au code client (exigence Vite — une variable sans ce préfixe n'est jamais accessible dans le bundle, garde-fou naturel contre l'exposition accidentelle d'un secret de build).
- `SCREAMING_SNAKE_CASE`, domaine explicite en préfixe secondaire : `VITE_JELLYFIN_DEFAULT_TIMEOUT_MS`, `VITE_FEATURE_FLAGS_ENDPOINT` (si applicable, voir [[FEATURE_FLAGS.md]]).
- Aucune variable d'environnement ne porte de secret (jeton, clé privée) — cohérent avec [[SECURITY_GUIDE.md]] §3bis (le jeton Jellyfin est une donnée de session utilisateur, jamais une variable de build) et §3 (secrets CI exclusivement dans les secrets chiffrés de la plateforme, jamais dans un fichier `.env`).

## 2. Fichiers d'environnement par contexte

| Fichier | Contexte | Commité ? |
|---|---|---|
| `.env.example` | Documente chaque variable attendue avec une valeur factice | Oui — seule source de vérité sur les variables existantes |
| `.env.development` | Valeurs par défaut de développement local (ex. timeout généreux, logs verbeux) | Oui, aucune valeur sensible |
| `.env.production` | Valeurs de build de production (ex. timeout strict, logs minimaux) | Oui, aucune valeur sensible |
| `.env.local` | Overrides locaux d'un contributeur (ignoré par Git) | Non — `.gitignore` |

**Pourquoi aucun secret dans ces fichiers** : Melodia n'a structurellement aucun secret de runtime client (l'utilisateur fournit sa propre adresse de serveur Jellyfin et s'authentifie lui-même, [[PROJECT_CHARTER.md]] §1) — les seuls secrets du projet sont des secrets de CI/signature ([[SECURITY_GUIDE.md]] §3), hors du périmètre de ces fichiers par construction.

## 3. Configuration runtime vs configuration de build

- **Configuration de build** (Vite, résolue à la compilation) : variables `VITE_*` ci-dessus, figées dans le bundle produit — un changement exige un nouveau build.
- **Configuration runtime** (résolue à l'exécution, modifiable sans rebuild) : adresse du serveur Jellyfin, préférences utilisateur ([[SETTINGS_SYSTEM.md]]) — jamais gérée via une variable d'environnement, toujours via `LocalStore`/`settings` (cohérent avec [[ARCHITECTURE_PRINCIPLES.md]] §4, ce n'est pas un état serveur ni une constante de build).
- Un contributeur qui hésite entre les deux applique la règle : « cette valeur change-t-elle sans reconstruire l'application ? » — si oui, jamais une variable d'environnement.

## 4. Configuration par cible (Web / Desktop / Mobile)

| Aspect | Web (PWA) | Desktop (Tauri) | Mobile (Tauri) |
|---|---|---|---|
| Fichier de config racine | `apps/web/vite.config.ts` | `apps/desktop/src-tauri/tauri.conf.json` | `apps/mobile/src-tauri/tauri.mobile.conf.json` |
| Variables `VITE_*` | Résolues au build Vite standard | Résolues au build Vite interne à Tauri (même mécanisme, cible différente) | Idem Desktop |
| Permissions/capacités | Sans objet (sandbox navigateur standard) | Fichier de capacités Tauri 2, moindre privilège ([[SECURITY_GUIDE.md]] §4) | Idem Desktop + permissions plateforme (notifications, stockage) déclarées par manifeste natif |

Aucune de ces trois cibles ne redéfinit `packages/config/` — chacune l'étend au minimum nécessaire à sa spécificité de packaging, jamais en dupliquant le tsconfig/ESLint/preset Tailwind déjà partagés ([[ARCHITECTURE.md]] §2).

## 5. Validation de la configuration au démarrage

- Toute variable `VITE_*` requise et absente échoue le build immédiatement (vérification statique), jamais un `undefined` silencieux propagé à l'exécution.
- Un schéma Zod ([[TECH_STACK.md]] §1) valide la forme de la configuration runtime chargée depuis `LocalStore` au démarrage (préférences, adresse serveur) — une valeur corrompue déclenche le comportement déjà acté de [[ERROR_STATES.md]] §3, jamais un crash silencieux.

---

## 6. Ce que ce document ne fait pas

- Ne redéfinit pas la gestion des secrets de CI/signature (voir [[SECURITY_GUIDE.md]] §3).
- Ne redéfinit pas les préférences utilisateur elles-mêmes (voir [[SETTINGS_SYSTEM.md]]).
- Ne redéfinit pas le contenu partagé de `packages/config/` au niveau outillage (tsconfig/ESLint/Tailwind — voir [[ARCHITECTURE.md]] §2).

## 7. Checklist de validation

- [ ] Toute nouvelle variable d'environnement est ajoutée à `.env.example` avant merge (voir [[DEFINITION_OF_DONE.md]]).
- [ ] Aucune variable `VITE_*` ne porte de secret ou de donnée sensible (§1-2, [[SECURITY_GUIDE.md]] §3bis).
- [ ] La configuration runtime chargée au démarrage est validée par schéma (§5), jamais consommée sans validation.

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 1.0.0 | 2026-08-04 | Création initiale du document (Phase 12) | Infrastructure Architect |

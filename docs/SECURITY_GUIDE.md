# SECURITY_GUIDE.md — Sécurité opérationnelle (Phase 0.5)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : CTO
> **Documents liés** : [[SECURITY_GUIDELINES.md]], [[CI_CD_GUIDE.md]], [[JELLYFIN_INTEGRATION.md]]

Ce document ne redéfinit aucun principe de [[SECURITY_GUIDELINES.md]] — il en précise l'implémentation opérationnelle concrète : configuration exacte, outillage, secrets de CI.

---

## 1. Content Security Policy — configuration concrète

```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';   /* Tailwind JIT injecte des styles ; pas de script inline autorisé */
img-src 'self' data: https:;         /* pochettes servies par le serveur Jellyfin de l'utilisateur, domaine variable */
connect-src 'self' https: wss:;      /* API Jellyfin, domaine du serveur choisi par l'utilisateur à la connexion */
media-src 'self' https: blob:;       /* flux audio + lecture depuis blobs mis en cache localement */
object-src 'none';
base-uri 'self';
frame-ancestors 'none';
```

**Pourquoi `connect-src`/`img-src`/`media-src` ne peuvent pas être restreints à un domaine unique** : contrairement à une application SaaS classique, le domaine du serveur Jellyfin est choisi par l'utilisateur à la connexion (auto-hébergement, voir [[PROJECT_CHARTER.md]] §1) — la CSP ne peut donc pas figer un domaine à l'avance. Le compromis est documenté explicitement plutôt que silencieusement affaibli : `script-src` et `object-src` restent strictement fermés (aucun script tiers, aucun plugin), ce qui couvre le vecteur XSS principal (voir [[SECURITY_GUIDELINES.md]] §3) même si `connect-src`/`img-src`/`media-src` restent ouverts par nécessité fonctionnelle.

## 2. Scan de dépendances

**Décision retenue : `pnpm audit` en CI (bloquant sur CVE critique/haute) + Dependabot (GitHub) pour les mises à jour automatisées de sécurité.**

| Option | Avantages | Inconvénients |
|---|---|---|
| `pnpm audit` seul | Natif au gestionnaire de paquets déjà retenu, aucune dépendance de service tiers | Ne propose pas de mise à jour automatique, uniquement un signal |
| Snyk | Base de vulnérabilités plus riche, tableau de bord dédié | Service tiers payant au-delà d'un usage gratuit limité, dépendance externe supplémentaire pour un besoin déjà couvert |
| Dependabot (GitHub natif) | Gratuit sur dépôt public, intégré nativement à la plateforme d'hébergement déjà retenue ([[TECH_STACK.md]] §1, GitHub Actions) | Couverture de base de vulnérabilités légèrement moins riche que Snyk |

**Pourquoi** : `pnpm audit` + Dependabot couvrent le besoin sans introduire de dépendance de service tiers payant, cohérent avec [[ENGINEERING_GUIDE.md]] §2.1 (une dépendance/un service n'est ajouté que si le besoin ne peut pas être couvert autrement) — réévaluable par ADR si la couverture s'avère insuffisante en pratique.

## 3. Gestion des secrets en CI/CD

- Aucun secret (jeton de signature de release, identifiants de publication sur les stores d'applications) en clair dans le dépôt, y compris dans l'historique — vérifié par un scanner de secrets en pre-commit et en CI (ex. `gitleaks`).
- Secrets stockés exclusivement dans les secrets chiffrés de la plateforme CI (GitHub Actions Secrets), scoping au minimum de jobs qui en ont réellement besoin (ex. le secret de signature Desktop n'est exposé qu'au job de build Desktop, jamais à l'ensemble du pipeline).
- Rotation des secrets de signature/publication documentée dans [[CHECKLISTS.md]] (checklist de release).

## 4. Sécurité spécifique au packaging natif (Tauri)

- Permissions Tauri déclarées explicitement et au minimum nécessaire dans la configuration de capacités (`tauri.conf.json` / fichiers de capacités Tauri 2), conformément au principe du moindre privilège déjà posé dans [[SECURITY_GUIDELINES.md]] §7.
- Aucune commande Tauri (`invoke`) exposée côté frontend sans validation stricte de ses paramètres côté Rust — un paramètre non validé côté natif est un vecteur d'escalade bien plus sérieux qu'une entrée non validée côté web (accès système direct).

## 5. Revue de sécurité

Une revue de sécurité manuelle (checklist dédiée, voir [[CHECKLISTS.md]]) est obligatoire avant chaque release majeure, et systématique pour toute PR touchant l'authentification, le stockage de jetons ou les permissions Tauri — indépendamment de la revue de code standard ([[DEFINITION_OF_DONE.md]]).

---

## 6. Checklist de validation

- [ ] La CSP (§1) est revue à chaque ajout de domaine externe requis par une nouvelle fonctionnalité.
- [ ] Le choix pnpm audit + Dependabot plutôt qu'un service tiers payant est justifié par les critères de dépendance ([[ENGINEERING_GUIDE.md]] §2.1).
- [ ] Les risques de sécurité par décision technique (Tauri, SDK Jellyfin, plugins natifs futurs) sont couverts dans [[RISK_REGISTER_TECHNICAL.md]].
- [ ] Toute évolution vers des plugins natifs CarPlay/Android Auto (voir [[EVOLVABILITY.md]] §5-6) est soumise à la revue de sécurité de la §5 avant merge.

## 7. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5) | CTO |
| 0.2.0 | 2026-08-03 | Ajout de la checklist de validation et des renvois vers les documents du complément Phase 0.5 | CTO |

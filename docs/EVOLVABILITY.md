# EVOLVABILITY.md — Évolutivité long terme (Phase 0.5, complément)

> **Statut** : document fondateur, vivant
> **Version** : 0.1.0
> **Date de création** : 2026-08-03
> **Propriétaire** : Principal Software Architect / Product Engineer
> **Documents liés** : [[ARCHITECTURE_PRINCIPLES.md]] §8, [[ARCHITECTURE.md]], [[ROADMAP.md]]

Ce document évalue, cible par cible, si l'architecture actuelle ([[ARCHITECTURE_PRINCIPLES.md]], [[ARCHITECTURE.md]]) facilite ou complique une évolution future. **Honnêteté délibérée** : certaines cibles sont naturellement servies par les choix déjà faits, d'autres nécessiteraient un investissement significatif non trivial, et une seule entre en tension réelle avec la charte du projet — elle est signalée comme telle, pas maquillée en simple détail d'implémentation.

Échelle de difficulté : 🟢 Facile (extension directe de l'existant) · 🟡 Modéré (nouveau travail significatif, mais aligné avec l'architecture) · 🔴 Difficile (nécessite une nouvelle brique architecturale ou une décision non encore prise) · ⚠️ Tension avec la charte (nécessite un arbitrage produit, pas seulement technique).

---

## 1. Desktop — 🟢 Déjà couvert
Tauri 2 cible Windows/macOS/Linux nativement depuis la Phase 0 ([[TECH_STACK.md]] §0). Aucun travail d'évolutivité restant au niveau architectural.

## 2. Mobile (iOS/Android) — 🟢 Déjà couvert
Même socle Tauri 2, même frontend React ([[TECH_STACK.md]] §0). Séquencement de livraison en Phase 2 ([[ROADMAP.md]]), pas une question d'architecture.

## 3. Android TV — 🟡 Modéré
Tauri produit un APK Android qui s'installerait techniquement sur Android TV, mais l'interface actuelle (souris/tactile, densité d'information élevée) est inadaptée à une UI « 10 pieds » pilotée à la télécommande (navigation D-pad, cibles larges, faible densité). **Ce qui est réutilisable** : `@melodia/core` (Domain + Data) intégralement, `MusicSource`/`LocalStore` sans modification. **Ce qui manque** : un mode d'interface dédié dans `@melodia/ui` avec gestion de focus D-pad (non prévu dans [[DESIGN_SYSTEM_ARCHITECTURE.md]] à ce jour), et une abstraction d'entrée (clavier/souris/tactile/télécommande) qui n'existe dans aucun document actuel — ni `@melodia/platform` ([[ARCHITECTURE.md]] §2) ni [[ARCHITECTURE_PRINCIPLES.md]] §7 ne couvrent la normalisation des entrées, seulement le fenêtrage et l'accès fichiers. Estimation : un chantier de plusieurs semaines-ingénieur, pas un simple portage.

## 4. Apple TV (tvOS) — 🔴 Difficile
**Non couvert par Tauri.** tvOS n'est pas une cible Tauri (contrairement à iOS) — Apple impose des frameworks natifs (SwiftUI/UIKit) pour tvOS, aucune webview générale équivalente à celle utilisée sur iOS/Android. Une application Apple TV nécessiterait un **client natif Swift entièrement séparé**, ne partageant ni la couche UI ni le moteur de rendu de Melodia — seul `@melodia/core` pourrait être réexposé si Melodia publie une API/SDK (voir §9-10). C'est la cible la plus coûteuse de cette liste après le marketplace : un second produit à maintenir, pas une extension.

## 5. CarPlay — 🟡 Modéré (via plugin natif Tauri)
Apple restreint les applications audio CarPlay au framework `MPPlayableContentManager`, inaccessible depuis une webview. Cependant, **Tauri 2 permet d'écrire des plugins natifs Swift pour la cible iOS** — un plugin CarPlay dédié, exposant `MusicSource`/`playerStore` au pont natif, est architecturalement possible sans abandonner le socle Tauri. Nécessite une expertise Swift/CarPlay spécifique (voir le risque d'expertise Rust/Swift déjà noté dans [[RISK_REGISTER_TECHNICAL.md]] §2), mais reste une extension du système existant, pas une refonte.

## 6. Android Auto — 🟡 Modéré (symétrique à CarPlay)
Nécessite l'implémentation de la `MediaBrowserService`/Android for Cars App Library — accessible via un plugin natif Kotlin/Java dans le même esprit que le plugin CarPlay (§5). Même verdict : modéré, extension du plugin system Tauri, pas une nouvelle architecture.

## 7. Montres connectées (Apple Watch / Wear OS) — 🔴 Difficile
Ni watchOS ni Wear OS ne sont des cibles Tauri. Une intégration réaliste se limiterait à des **contrôles de lecture basiques** (lecture/pause/piste suivante, déjà exposés via MediaSession sur le téléphone compagnon, qui se répercutent nativement sur la montre appairée sans développement Melodia spécifique sur iOS/Android modernes). Une application montre complète (parcourir la bibliothèque depuis le poignet) serait un troisième produit natif séparé — non justifié tant qu'aucune demande utilisateur concrète ne l'exige (cohérent avec [[ENGINEERING_GUIDE.md]] §1.1, ne pas sur-concevoir pour un besoin hypothétique).

## 8. API publique — 🟡 Modéré, déjà anticipée
`@melodia/core` expose déjà `MusicSource`/`LocalStore`/entités comme des interfaces stables et isolées ([[ARCHITECTURE.md]] §2), précisément pour permettre cette évolution sans réécriture ([[ARCHITECTURE_PRINCIPLES.md]] §8). Le travail restant : versionner l'API publiquement (garanties de compatibilité ascendante), ajouter authentification/autorisation si exposée réseau, et documenter formellement — un travail de surface, pas de fondation, grâce au découplage déjà en place.

## 9. SDK — 🟡 Modéré, suit directement l'API publique
Une fois l'API publique stabilisée (§8), un SDK est en grande partie une question d'empaquetage (`@melodia/core` publié séparément, éventuellement des SDK dérivés dans d'autres langages via génération à partir d'un schéma OpenAPI/GraphQL si l'API devient réseau). Risque principal : garantir la stabilité de compatibilité ascendante une fois publié — nécessite la discipline de versionnage sémantique déjà actée ([[GIT_WORKFLOW.md]] §4), appliquée strictement au SDK.

## 10. Plugins — 🔴 Difficile, nouvelle brique nécessaire
Contrairement à l'API/SDK (extension de ce qui existe), un système de plugins exige une **brique architecturale entièrement nouvelle** : un runtime d'exécution sandboxé, un modèle de permissions par capacité, un format de manifeste de plugin, et une politique de sécurité dédiée (un plugin tiers exécute du code dans le contexte de l'application). [[ARCHITECTURE_PRINCIPLES.md]] §8 anticipe des « points d'extension identifiés », mais aucune décision de sandboxing ou de modèle de permission n'existe encore — c'est un chantier de conception à part entière, positionné à raison en Phase 3 ([[ROADMAP.md]]).

## 11. Marketplace — 🔴 Difficile, infrastructure serveur nouvelle
Un marketplace de plugins suppose une **infrastructure de distribution et de modération** (hébergement de paquets, processus de revue, gestion de versions) — c'est-à-dire un service serveur opéré par le projet, ce qui n'existe dans aucune décision actuelle (Melodia est un client, [[PROJECT_CHARTER.md]] §4 : « Melodia n'administre pas »). Deux options honnêtes pour l'avenir : opérer ce service (changement de nature du projet, décision à porter en ADR le moment venu) ou s'appuyer sur une infrastructure existante (registre npm pour des plugins JS, GitHub comme registre décentralisé) — cette dernière option est nettement plus cohérente avec la philosophie actuelle du projet et serait la recommandation par défaut le moment venu.

## 12. Synchronisation cloud — ⚠️ Tension réelle avec la charte, pas un simple choix technique
C'est le seul point de cette liste qui n'est pas qu'une question de difficulté technique. Melodia synchronise aujourd'hui via le serveur Jellyfin de l'utilisateur — chaque utilisateur reste propriétaire de ses données ([[PROJECT_CHARTER.md]] §1, vision). Une « synchronisation cloud » au sens d'un service centralisé opéré par le projet Melodia (pour synchroniser l'état de lecture/playlists entre serveurs Jellyfin distincts, par exemple) **entrerait en tension directe** avec :
- [[PROJECT_CHARTER.md]] §4 : « Melodia ne doit pas dépendre fortement d'une unique API externe » — un service cloud Melodia deviendrait justement cette dépendance structurelle.
- [[PROJECT_CHARTER.md]] §4 : « Melodia ne collecte ni ne revend de données utilisateur » — un relais de synchronisation centralisé, même bien intentionné, élargit la surface de collecte potentielle.

**Recommandation si cette fonctionnalité est un jour demandée** : ne jamais l'implémenter comme un service centralisé obligatoire. Deux formes acceptables sans trahir la charte : (a) un relais de synchronisation **auto-hébergeable** par l'utilisateur (même philosophie que Jellyfin lui-même), ou (b) un relais chiffré de bout en bout où le projet Melodia n'a techniquement pas accès au contenu synchronisé. Toute autre approche nécessiterait une révision explicite de [[PROJECT_CHARTER.md]] §4, avec le processus de contradiction déjà défini ([[DOCUMENTATION_GUIDE.md]] §5) — pas une décision technique locale.

---

## 13. Synthèse

| Cible | Difficulté | Nature du travail restant |
|---|---|---|
| Desktop | 🟢 | Aucune (déjà livré par l'architecture) |
| Mobile | 🟢 | Aucune (déjà livré par l'architecture) |
| Android TV | 🟡 | Nouveau mode d'interface (focus D-pad) |
| Apple TV | 🔴 | Client natif séparé |
| CarPlay | 🟡 | Plugin natif Tauri (Swift) |
| Android Auto | 🟡 | Plugin natif Tauri (Kotlin) |
| Montres connectées | 🔴 | Hors périmètre sauf besoin avéré ; contrôles basiques déjà couverts nativement |
| API publique | 🟡 | Versionnage + documentation, fondation déjà en place |
| SDK | 🟡 | Empaquetage, suit l'API publique |
| Plugins | 🔴 | Nouvelle brique (sandboxing, permissions) |
| Marketplace | 🔴 | Infrastructure serveur nouvelle, ou délégation à npm/GitHub |
| Sync cloud | ⚠️ | Arbitrage de charte avant toute décision technique |

**Ce que cette synthèse ne dit pas** : ces cibles ne sont **pas** un engagement de roadmap — [[ROADMAP.md]] reste la seule feuille de route qui fait autorité sur ce qui est réellement planifié. Ce document répond uniquement à la question « l'architecture actuelle nous enfermerait-elle si on en avait besoin plus tard ? » — et la réponse est non pour dix cibles sur douze, avec un chantier proportionné pour les deux restantes (plugins, marketplace), et une réserve de principe pour la douzième (sync cloud).

---

## 14. Checklist de validation

- [ ] Chaque cible listée dans le cadrage de cette phase est évaluée individuellement, pas regroupée artificiellement.
- [ ] Chaque évaluation s'appuie sur une caractéristique réelle de l'architecture actuelle, pas une supposition.
- [ ] La tension avec la charte (sync cloud) est signalée explicitement, pas minimisée.
- [ ] Aucune affirmation de faisabilité n'est présentée comme un engagement de calendrier.

---

## 15. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0.5, complément) | Principal Software Architect / Product Engineer |
| 0.1.1 | 2026-08-03 | Correction d'une référence de section inexacte en §3 (abstraction d'entrée), trouvée pendant l'auto-audit | Principal Software Architect |

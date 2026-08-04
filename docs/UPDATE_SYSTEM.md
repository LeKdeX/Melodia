# UPDATE_SYSTEM.md — Architecture de mise à jour (Phase 11)

> **Statut** : document fondateur, vivant — préparation architecturale
> **Version** : 0.1.0
> **Date de création** : 2026-08-04
> **Propriétaire** : Principal Platform Architect / Frontend Architect
> **Documents liés** : [[NOTIFICATION_LIBRARY.md]] §8ter, [[GIT_WORKFLOW.md]], [[TECH_STACK.md]]

> **Cadrage** : aucune fonctionnalité de mise à jour applicative n'est encore engagée (le projet reste 100 % documentaire, aucun code écrit) — ce document prépare l'architecture sans promettre un calendrier, cohérent avec l'honnêteté déjà appliquée à chaque fonctionnalité future dans ce projet.

---

## 1. Vérification des mises à jour

**Contrat attendu** : vérification périodique (au lancement + intervalle configurable) contre un point de version de référence — mécanisme concret dépendant de la plateforme de distribution (Tauri updater pour desktop, stores applicatifs pour mobile) non encore choisi techniquement. Jamais une vérification qui bloque le lancement de l'application en attendant sa réponse.

## 2. Notification (renvoi)

Voir [[NOTIFICATION_LIBRARY.md]] §8ter — snackbar non intrusif, non redécrit ici.

## 3. Notes de version

Texte court et honnête des changements réels (jamais un marketing générique « améliorations de performance et corrections de bugs » qui ne dit rien) — accessible depuis Paramètres > À propos ([[SETTINGS_SCREENS.md]]), cohérent avec le ton de marque déjà acté (le Sage discret ne survend jamais, [[PERSONALITY.md]] §1).

## 4. Migration

Toute mise à jour qui modifie le schéma de `LocalStore` ([[DATA_LAYER.md]]) suit une migration versionnée et réversible tant que techniquement possible — jamais une migration qui écrase silencieusement des données sans chemin de retour en cas d'échec. Cohérent avec la stratégie de test déjà actée pour les migrations de schéma ([[TESTING_STRATEGY.md]] §4).

## 5. Rollback (préparation, non engagée)

**Objectif anticipé** : possibilité de revenir à la version précédente si une mise à jour introduit une régression critique. **Dépendance** : mécanisme de distribution qui conserve la version précédente disponible (non garanti par tous les canaux de distribution, ex. certains stores mobiles ne permettent pas de rollback utilisateur direct). **Contrat d'interface attendu** : si techniquement possible sur la plateforme, action accessible depuis Paramètres > À propos avec confirmation explicite ([[DIALOG_LIBRARY.md]]) — non spécifié davantage tant que le mécanisme de distribution n'est pas tranché ([[STACK_DECISIONS.md]]).

## 6. Ce qui ne doit jamais se produire

Une mise à jour ne doit jamais s'installer en interrompant une lecture en cours ([[PRODUCT_RULES.md]] §2) — toute installation qui nécessite un redémarrage de l'application est différée jusqu'à ce qu'aucune lecture ne soit active, ou proposée explicitement à l'utilisateur plutôt qu'imposée.

---

## 7. Checklist de validation

- [ ] Aucune fonctionnalité de ce document n'est présentée comme déjà implémentée.
- [ ] Rollback reste explicitement une préparation, jamais une fonctionnalité livrée.
- [ ] Une mise à jour n'interrompt jamais une lecture en cours.

---

## 8. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Création initiale du document (Phase 11) | Principal Platform Architect / Frontend Architect |

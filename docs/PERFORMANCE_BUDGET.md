# PERFORMANCE_BUDGET.md — Budgets de performance

> **Statut** : document fondateur, vivant
> **Version** : 0.3.1
> **Date de création** : 2026-08-03
> **Propriétaire** : Principal Frontend Engineer
> **Documents liés** : [[PROJECT_CHARTER.md]] §3.5, [[TECH_STACK.md]], [[ARCHITECTURE_PRINCIPLES.md]]

Ces budgets sont **chiffrés et vérifiables**, pas des aspirations qualitatives. Tout dépassement détecté en CI ou en profilage manuel est traité comme un défaut, pas comme une optimisation optionnelle (voir [[ENGINEERING_GUIDE.md]] §1.4 pour la doctrine d'optimisation).

---

## 1. Temps de démarrage

| Scénario | Cible | Seuil d'alerte |
|---|---|---|
| Démarrage à froid (app fermée, cache local disponible) | < 2 s jusqu'à interface interactive | > 3 s |
| Démarrage à chaud (reprise depuis arrière-plan) | < 500 ms | > 1 s |
| Time-to-First-Play (reprise de lecture depuis état persistant) | < 1 s | > 2 s |

Mesuré sur : machine de référence Desktop (matériel milieu de gamme, 3 ans d'âge), appareil mobile de référence (milieu de gamme, 2 ans d'âge), tablette de référence (milieu de gamme, 2 ans d'âge — ajoutée en Phase 0.5 complément, voir [[EXTREME_SCENARIOS.md]] §4), connexion réseau « bonne 4G / Wi-Fi domestique » pour le premier chargement des métadonnées.

## 2. Temps de recherche
| Scénario | Cible | Seuil d'alerte |
|---|---|---|
| Recherche locale (bibliothèque en cache) — **perçu de bout en bout** (frappe → résultats affichés à l'écran, inclut le rendu React) | < 100 ms | > 250 ms |
| Recherche locale — **calcul moteur seul** (requête à l'index FlexSearch → résultats triés, hors rendu UI, ajout Moteur de Recherche) | < 50 ms | > 100 ms |
| Recherche distante (fallback serveur) | < 400 ms | > 800 ms |

**Amendement Moteur de Recherche — tension explicitement résolue, pas silencieuse** : le cadrage de cette phase a introduit une exigence de « < 50 ms sur une recherche classique », plus stricte que le budget perçu de bout en bout déjà engagé (< 100 ms). Plutôt qu'une contradiction, les deux chiffres coexistent à deux échelles différentes : 50 ms est le budget du **calcul moteur seul** (nouvelle ligne ci-dessus, imbriquée dans le budget existant), 100 ms reste le budget **perçu** incluant le rendu — un calcul moteur à 50 ms laisse ~50 ms de marge pour le rendu React avant d'atteindre le seuil perçu déjà acté. Voir [[SEARCH_ENGINE.md]] §0bis pour le détail architectural de cette distinction.

## 3. Temps de rendu et fluidité
| Métrique | Cible | Seuil d'alerte |
|---|---|---|
| FPS pendant le défilement d'une liste de 200 000+ titres | 60 FPS constant | < 50 FPS soutenu |
| FPS pendant les animations d'interface (transitions, ouverture de panneaux) | 60 FPS | < 45 FPS |
| Temps de premier rendu significatif (LCP-équivalent) | < 1,5 s | > 2,5 s |
| Délai d'interactivité après navigation entre vues | < 100 ms | > 300 ms |

## 4. Poids applicatif
| Métrique | Cible | Seuil d'alerte |
|---|---|---|
| Poids JavaScript initial (gzip, cible Web) | < 250 Ko | > 400 Ko |
| Poids CSS initial (gzip) | < 50 Ko | > 100 Ko |
| Poids total du bundle Desktop (installateur Tauri) | < 30 Mo | > 50 Mo |

## 5. Consommation mémoire
| Scénario | Cible | Seuil d'alerte |
|---|---|---|
| Utilisation mémoire au repos (lecture en cours, app en arrière-plan) | < 150 Mo | > 250 Mo |
| Utilisation mémoire avec bibliothèque de 200 000+ titres chargée en liste virtualisée | < 350 Mo | > 500 Mo |

## 6. Re-renders (React)
- Un changement d'état de lecture (progression de la barre de lecture) ne doit déclencher **aucun** re-render de la liste de titres ou de la file d'attente (isolation vérifiée par sélecteurs de store, voir [[ARCHITECTURE_PRINCIPLES.md]] §4).
- Seuil d'alerte : plus de 3 re-renders d'un composant liste pour une seule action utilisateur discrète (ex. un clic).

## 7. Objectifs CPU / GPU
| Métrique | Cible | Seuil d'alerte |
|---|---|---|
| Utilisation CPU moyenne pendant lecture simple (pas de visualiseur actif) | < 5 % (cœur de référence desktop) | > 10 % |
| Utilisation CPU avec visualiseur audio actif | < 15 % | > 25 % |
| Utilisation GPU pour les animations d'interface | Accélération matérielle systématique (transform/opacity uniquement) | Toute animation provoquant un repaint de layout complet |

---

## 8. Méthodologie de vérification

- **En CI** : budgets de poids JS/CSS vérifiés automatiquement à chaque PR (échec de build si seuil d'alerte dépassé, sauf dérogation documentée en commentaire de PR référençant un ticket de dette technique — voir [[ENGINEERING_GUIDE.md]] §3).
- **Manuellement, avant chaque release mineure/majeure** : profilage sur les appareils de référence (§1), avec bibliothèque de test de 200 000+ titres synthétiques (voir [[PERFORMANCE_GUIDE.md]] pour l'outillage et la méthodologie détaillée).
- **Instrumentation continue** : mesures de démarrage et de FPS collectées de façon anonymisée si la télémétrie opt-in est activée par l'utilisateur (voir [[SECURITY_GUIDELINES.md]]).

---

## 9. Historique des révisions

| Version | Date | Changement | Auteur |
|---|---|---|---|
| 0.1.0 | 2026-08-03 | Création initiale du document (Phase 0) | Principal Frontend Engineer |
| 0.2.0 | 2026-08-03 | Amendement Phase 0.5 : référence de bibliothèque de stress-test relevée de 100 000 à 200 000 titres (budgets de rendu et mémoire ajustés en conséquence) ; voir [[PERFORMANCE_GUIDE.md]] | Lead Frontend Engineer |
| 0.2.1 | 2026-08-03 | Amendement Phase 0.5 complément : ajout d'un appareil de référence tablette (gap identifié dans [[EXTREME_SCENARIOS.md]] §4) | Staff Performance Engineer |
| 0.3.0 | 2026-08-04 | Amendement Moteur de Recherche : §2 distingue désormais le budget perçu de bout en bout (< 100 ms, inchangé) du budget de calcul moteur seul (< 50 ms, nouveau) — tension avec le cadrage résolue explicitement plutôt que silencieusement | Principal Search Architect |
| 0.3.1 | 2026-08-05 | TASK-002 : correction du numéro de version en en-tête, resté désynchronisé (« 0.1.0 ») du tableau ci-dessus depuis l'amendement 0.2.0 — trouvé lors de la revue croisée manuelle des 10 documents à plus forte cascade | Staff Technical Lead |

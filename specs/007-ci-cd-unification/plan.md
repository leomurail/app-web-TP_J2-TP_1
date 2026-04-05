# Implementation Plan: Unification du Pipeline CI/CD

**Branch**: `main` (integrated) | **Date**: 2026-04-04 | **Spec**: [specs/007-ci-cd-unification/spec.md](spec.md)

## Summary

L'objectif de cette fonctionnalité était de consolider les workflows de test et de déploiement, auparavant fragmentés en trois fichiers distincts, dans une pipeline unique et cohérente (`ci-cd.yml`). Cette nouvelle structure garantit que le déploiement ne s'exécute qu'après une validation réussie des tests.

## Technical Context

**Language/Version**: GitHub Actions YAML  
**Primary Dependencies**: actions/checkout@v4, actions/setup-node@v4  
**Target Platform**: GitHub Actions, Runner Self-Hosted (Linux)  
**Project Type**: Infrastructure / Devops  
**Performance Goals**: < 10s pour l'étape de décision environnementale  
**Constraints**: Doit respecter les variables d'environnement (`dev` vs `prod`)

## Constitution Check

- [x] **Principe I (Vue 3/Composition API)** : Sans objet (code infrastructure).
- [x] **Principe II (Pédagogie/TP)** : La structure du fichier YAML est commentée et simplifie la compréhension du flux DevOps.
- [x] **Principe III (Architecture SFC)** : Sans objet.

## Modified Files

```text
.github/workflows/
├── ci-cd.yml            # NEW: Fichier de pipeline unifié
├── dev-deploy.yml       # DELETED: Ancien fichier fragmenté
├── prod-deploy.yml      # DELETED: Ancien fichier fragmenté
└── test.yml             # DELETED: Ancien fichier fragmenté
```

## Technical Approach

1.  **Regroupement des Jobs** : Fusion des instructions de test et de déploiement dans un seul fichier.
2.  **Gestion des Dépendances** : Utilisation du mot-clé `needs: test` pour forcer l'ordre d'exécution.
3.  **Logique d'Environnement** : Introduction d'une étape "Determine Environment" utilisant les outputs GitHub Actions pour mapper la branche (`main`/`dev`) vers la cible (`prod`/`dev`).
4.  **Optimisation** : Suppression des doublons d'actions `checkout` et mutualisation des runners.

# Feature Specification: Unification du Pipeline CI/CD

**Feature Branch**: `main` (direct integration)  
**Created**: 2026-04-04  
**Status**: Integrated  
**Input**: User description: "Unification des workflows de test et de déploiement pour une meilleure visibilité et sécurité"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Pipeline Unique avec Étapes (Priority: P1)

En tant que développeur, je veux que mes tests unitaires et mon déploiement soient regroupés dans un seul workflow GitHub Actions, afin de voir clairement l'avancement global de la livraison dans l'interface GitHub.

**Why this priority**: Améliore la visibilité et réduit la fragmentation des logs de CI.

**Independent Test**: Push sur `main` ou `dev` et vérification de la présence d'un seul workflow nommé "CI/CD Pipeline" avec deux jobs distincts.

**Acceptance Scenarios**:

1. **Given** un push sur la branche `dev`, **When** le workflow s'exécute, **Then** je vois une étape "Unit & Component Tests" suivie d'une étape "Deployment".
2. **Given** l'interface GitHub Actions, **When** je sélectionne le run, **Then** les jobs sont liés visuellement (le déploiement dépend des tests).

---

### User Story 2 - Déploiement Conditionnel aux Tests (Priority: P1)

En tant que mainteneur, je veux que le déploiement ne s'exécute **que si** les tests passent, afin d'éviter de déployer une version cassée en production.

**Why this priority**: Sécurité critique du processus de déploiement.

**Independent Test**: Introduire une erreur de test volontaire et vérifier que l'étape "Deployment" est ignorée (skipped).

**Acceptance Scenarios**:

1. **Given** un test en échec, **When** le pipeline s'exécute, **Then** le job "Deployment" n'est pas lancé.
2. **Given** tous les tests réussis, **When** le pipeline s'exécute, **Then** le job "Deployment" démarre automatiquement.

---

### User Story 3 - Déploiement Multi-Environnement Intelligent (Priority: P2)

En tant qu'administrateur système, je veux que le pipeline détecte automatiquement la branche (`main` ou `dev`) pour choisir le dossier de destination approprié (`prod` ou `dev`), afin de simplifier la configuration.

**Why this priority**: Réduit les risques d'erreurs de configuration manuelle.

**Independent Test**: Vérifier les logs du job "Deployment" pour s'assurer que le rsync pointe vers le bon dossier selon la branche.

**Acceptance Scenarios**:

1. **Given** un push sur `main`, **When** le job de déploiement s'exécute, **Then** le code est synchronisé dans le dossier `~/prod/`.
2. **Given** un push sur `dev`, **When** le job de déploiement s'exécute, **Then** le code est synchronisé dans le dossier `~/dev/`.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le système DOIT utiliser un seul fichier de configuration YAML pour les tests et le déploiement.
- **FR-002**: Le job de déploiement DOIT dépendre (`needs`) du job de test.
- **FR-003**: Le pipeline DOIT identifier la branche cible (`main` ou `dev`) via les variables d'environnement GitHub.
- **FR-004**: Le système DOIT synchroniser les fichiers en utilisant `rsync` avec les exclusions appropriées (`.git`, `.github`).
- **FR-005**: Le job de déploiement DOIT s'exécuter sur un runner auto-hébergé (`self-hosted`).

### Key Entities

- **CI/CD Pipeline**: L'objet global représentant le workflow GitHub Actions.
- **Jobs**: Les étapes atomiques (Tests, Deployment) au sein du pipeline.
- **Environment**: La destination logique (prod vs dev) basée sur la branche.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Les tests unitaires et le déploiement sont regroupés sous un seul identifiant de run dans GitHub Actions.
- **SC-002**: Le temps de déploiement (hors tests) reste inférieur à 1 minute.
- **SC-003**: Aucun déploiement n'a lieu si les tests échouent.
- **SC-004**: Le pipeline supporte les Pull Requests sans déclencher de déploiement (tests uniquement).

## Assumptions

- **Existing Secrets**: Les secrets GitHub (`SSH_PATH`) sont déjà configurés.
- **Runners**: Un runner `self-hosted` est disponible et configuré sur le serveur.

# Vue TP Application - Multi-Feature App

Ce projet est une application Vue 3 moderne développée dans le cadre d'un TP. Elle met en œuvre des concepts avancés de navigation, de gestion d'état, d'intégration d'API natives et de déploiement automatisé.

## 🚀 Fonctionnalités

- **Navigation Fluide** : NavBar personnalisée avec transitions CSS (`fade`).
- **Formulaire Multi-étapes** : Gestion d'état complexe avec Pinia et persistance via LocalStorage.
- **Ressources Internes** : Démo de Géolocalisation, Notifications, Web Share et Touch Events via `@vueuse/core`.
- **Intégration API** : Appels REST via Axios avec gestion des états de chargement et d'erreur.
- **Tests Automatisés** : Suite de tests unitaires et de composants avec Vitest.

## 🛠 Technologies

- **Frontend** : Vue 3 (Composition API + `<script setup>`), TypeScript.
- **UI** : PrimeVue v4 (Aura Theme).
- **State Management** : Pinia.
- **Routing** : Vue Router.
- **Tooling** : Vite, Vitest.
- **DevOps** : Docker, Taskfile, GitHub Actions.

## 📦 Installation & Orchestration (Taskfile)

L'utilisation du **Taskfile** remplace avantageusement un Makefile pour la gestion locale et CI/CD.

1. **Initialiser l'environnement** (copie du .env, montage des conteneurs, npm install) :
   ```bash
   task install
   ```

2. **Lancer le mode développement avec hot-reloading** :
   ```bash
   task watch
   ```
   L'application sera accessible sur `http://localhost:3000`.

3. **Nettoyer les conteneurs et les volumes orphelins** :
   ```bash
   task clean
   ```

4. **Déployer vers Docker Swarm** :
   ```bash
   task deploy
   ```

5. **Gérer la stack Swarm** :
   ```bash
   task status  # Vérifier l'état
   task remove  # Supprimer le déploiement
   ```

6. **Lancer les tests** :
   ```bash
   npm test
   ```

## 🐳 Docker, Swarm & Environnements

L'application utilise une structure de **Docker Compose étendue** pour séparer les configurations par environnement.

- **`docker-compose.yaml` (Base)** : Définit l'image de base et le réseau `overlay` pour la compatibilité Swarm.
- **`docker/docker-compose.local.yaml` (Local)** : Expose les ports localement et monte les volumes pour le mode interactif.
- **`docker/docker-compose.prod.yaml` (Production/Dev)** : Configuré pour un déploiement d'orchestration via un bloc `deploy` incluant les labels de routage statique et dynamique vers **Traefik**.


### Gestion des Environnements (ENV)
La gestion est basée sur des templates dans `docker/env/` :
- `.env.local.template` : Configuration de développement local.
- `.env.dev.template` : Configuration pour le serveur de développement.
- `.env.prod.template` : Configuration pour la production réelle.

## 🚢 Déploiement (CI/CD)

Le déploiement est entièrement automatisé via **GitHub Actions**.

- **Branches & Workflows** :
  - `push` sur `dev` ou `main` → `.github/workflows/ci-cd.yml`.
  - **Processus** :
    1. Tests CI automatisés (unitaires et de composants).
    2. Détermination dynamique de l'environnement ciblé.
    3. Transfert vers le serveur self-hosted via `rsync` (SSH).
    4. Création des variables locales (`.env`) puis déclenchement natif de `task deploy` (Docker Swarm / Stack Compose).
  - **Configuration Requise** (Secrets) :
    - `SSH_PATH` (dossier final côté Node Swarm).


## 📋 Processus de Développement (Speckit)

Le projet suit le workflow **Speckit** situé dans le dossier `.specify/` :
- **Spécifications** : `specs/004-fix-docker-cicd/spec.md`
- **Plan Technique** : `specs/004-fix-docker-cicd/plan.md`
- **Liste des Tâches** : `specs/004-fix-docker-cicd/tasks.md`

Toutes les modifications respectent la **Constitution** du projet définie dans `.specify/memory/constitution.md`.

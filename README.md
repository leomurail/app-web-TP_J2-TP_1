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

4. **Lancer les tests** :
   ```bash
   npm test
   ```

## 🐳 Docker & Environnements

L'application utilise une structure de **Docker Compose étendue** pour séparer les configurations par environnement.

- **`docker-compose.yaml` (Base)** : Définit le service `app` et les variables communes.
- **`docker/docker-compose.local.yaml` (Local)** : Expose les ports localement et monte les volumes pour le développement.
- **`docker/docker-compose.prod.yaml` (Production)** : Configure les labels **Traefik** pour le routage dynamique et la sécurité (non-root user).

### Gestion des Environnements (ENV)
La gestion est basée sur des templates dans `docker/env/` :
- `.env.local.template` : Configuration de développement local.
- `.env.dev.template` : Configuration pour le serveur de développement.
- `.env.prod.template` : Configuration pour la production réelle.

## 🚢 Déploiement (CI/CD)

Le déploiement est entièrement automatisé via **GitHub Actions**.

- **Branches & Workflows** :
  - `push` sur `develop` → `.github/workflows/dev-deploy.yml` (Déploiement Dev).
  APP_DOMAIN=dev.app-web.fr
    - `push` on `main` → `.github/workflows/prod-deploy.yml` (Déploiement Prod).
  - **Processus** :
    1. Initialisation de l'environnement via `task install`.
    2. Déploiement des fichiers via `rsync` (SSH).
  - **Configuration Requise** :
    - Secrets GitHub : `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `APP_NAME`.

## 📋 Processus de Développement (Speckit)

Le projet suit le workflow **Speckit** situé dans le dossier `.specify/` :
- **Spécifications** : `specs/004-fix-docker-cicd/spec.md`
- **Plan Technique** : `specs/004-fix-docker-cicd/plan.md`
- **Liste des Tâches** : `specs/004-fix-docker-cicd/tasks.md`

Toutes les modifications respectent la **Constitution** du projet définie dans `.specify/memory/constitution.md`.

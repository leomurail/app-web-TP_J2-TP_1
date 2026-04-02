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
- **DevOps** : Docker, GitHub Actions.

## 📦 Installation (Getting Started)

1. **Cloner le projet** :
   ```bash
   git clone <repo-url>
   cd vue-app
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

4. **Lancer les tests** :
   ```bash
   npm test
   ```

## 🔌 Backend Setup (Demo Page)

La page **Démo** (`/demo`) interagit avec une API externe pour les alertes système.

1. **API Locale** : L'application s'attend à une API tournant sur `http://localhost:3000/api/v1`.
2. **Proxy Vite** : En développement, Vite redirige les appels de `/api` vers le port 3000 pour éviter les erreurs CORS.
3. **Endpoints requis** :
   - `GET /api/v1/alerts` : Doit retourner `{ "count": number }`.

Si le backend n'est pas disponible, l'interface affichera un message d'erreur gracieux sans bloquer l'application.

## 🐳 Docker

L'application peut être conteneurisée pour le développement ou la production.

- **Lancer avec Docker Compose** :
  ```bash
  docker-compose up --build
  ```
  L'application sera accessible sur `http://localhost:8080`.

- **Structure Docker** :
  - `Dockerfile` : Utilise un build multi-étapes (Node.js pour le build, Nginx pour le service).
  - `docker-compose.yml` : Gère le service web et le mappage des ports.

## 🚢 Déploiement (CI/CD)

Le déploiement est entièrement automatisé via **GitHub Actions** (`.github/workflows/deploy.yml`).

- **Processus** :
  1. À chaque push sur `main`, les tests sont lancés.
  2. Si les tests passent, le projet est buildé (`npm run build`).
  3. Les fichiers générés dans `dist/` sont déployés sur le VPS via SSH (SCP).
- **Configuration Requise** :
  - Les secrets GitHub (`VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`) doivent être configurés dans le dépôt.

## 📋 Processus de Développement (Speckit)

Le projet suit le workflow **Speckit** situé dans le dossier `.specify/` :
- **Spécifications** : `specs/001-vue-tp-complete-app/spec.md`
- **Plan Technique** : `specs/001-vue-tp-complete-app/plan.md`
- **Liste des Tâches** : `specs/001-vue-tp-complete-app/tasks.md`

Toutes les modifications respectent la **Constitution** du projet définie dans `.specify/memory/constitution.md`.

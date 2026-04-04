# vue-app Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-04-04

## Active Technologies
- Vue 3 (Composition API), TypeScript 5.9 + GitHub Actions (CI/CD Pipeline) (007-ci-cd-unification)
- Vue 3 (Composition API), TypeScript 5.9 + Vitest, @vitejs/plugin-vue, @vue/test-utils, jsdom, @vitest/coverage-v8 (006-vitest-ci-setup)
- Vue 3 (Composition API), TypeScript 5.9 + Axios, VueUse, PrimeVue (Toast), Pinia (005-notification-system)
- N/A (Transient state in Pinia store) (003-fix-demo-page-errors)
- Vue 3, TypeScript, Node.js 20+ + Docker, Docker Compose, Go-Task (004-fix-docker-cicd)
- TypeScript 5.x, Vue 3.x + Vue Router, Pinia (for form state), Axios (REST), Component Library (e.g., PrimeVue or Vuetify) (001-vue-tp-complete-app)

## Project Structure

```text
backend/
frontend/
tests/
```

## Commands

- `npm run test`: Run all tests once
- `npm run test:watch`: Run tests in watch mode
- `npm run test:coverage`: Run tests and generate coverage report
- `npm run lint`: Run ESLint check

## Code Style

TypeScript 5.x, Vue 3.x: Follow standard conventions

## Recent Changes
- 007-ci-cd-unification: Unified test and deploy workflows into a single pipeline with conditional stages.
- 006-vitest-ci-setup: Added Vue 3 (Composition API), TypeScript 5.9 + Vitest, @vitejs/plugin-vue, @vue/test-utils, jsdom, @vitest/coverage-v8
- 005-notification-system: Integrated PrimeVue Toast for in-app feedback and Browser Notification API.
- 004-fix-docker-cicd: Added Vue 3, TypeScript, Node.js 20+ + Docker, Docker Compose, Go-Task


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->

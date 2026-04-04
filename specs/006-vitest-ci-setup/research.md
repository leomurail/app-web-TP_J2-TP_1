# Research: Set up Vitest tests and CI

## Decision: Testing Framework - Vitest

- **Decision**: Use `vitest` with `@vitejs/plugin-vue` and `@vue/test-utils`.
- **Rationale**: 
    - Native to the Vite ecosystem used in this project.
    - Faster than Jest for Vite projects.
    - Compatible with Vue 3 (Composition API) and TypeScript.
- **Alternatives considered**: 
    - Jest: Requires significant configuration to work with Vite and ES modules.
    - Cypress/Playwright (CT): More suitable for end-to-end testing, higher overhead for unit tests.

## Decision: Coverage Provider - @vitest/coverage-v8

- **Decision**: Use `@vitest/coverage-v8`.
- **Rationale**: 
    - Default and recommended coverage provider for Vitest.
    - Easy to configure and produces clear reports (text, HTML, JSON).
- **Alternatives considered**: 
    - `istanbul`: More complex to set up with modern JS features, though widely used.

## Decision: CI Platform - GitHub Actions

- **Decision**: Create a `.github/workflows/test.yml` workflow.
- **Rationale**: 
    - Already used in the project for other tasks.
    - Deep integration with GitHub PRs and status checks.
    - Free and reliable for public/private educational repositories.
- **Alternatives considered**: 
    - GitLab CI: Requires a separate platform and runner setup.

## Decision: Local Test Scripts

- **Decision**: Add `test`, `test:watch`, and `test:coverage` to `package.json`.
- **Rationale**: 
    - Standard naming conventions for Node.js projects.
    - Easy for developers to discover and run.
- **Alternatives considered**: 
    - Using `Taskfile.yml` only: While good for multi-step tasks, common npm scripts are expected by many tools and developers.

## CI Environment Configuration

- **Decision**: Use `node-version: 20` and `ubuntu-latest`.
- **Rationale**: 
    - Aligns with the project's Docker/development environment specified in `GEMINI.md`.
    - Standard, reliable environment for web application testing.

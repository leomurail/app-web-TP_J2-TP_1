# Implementation Plan: Set up Vitest tests and CI

**Branch**: `006-vitest-ci-setup` | **Date**: 2026-04-04 | **Spec**: [specs/006-vitest-ci-setup/spec.md](spec.md)
**Input**: Feature specification from `/specs/006-vitest-ci-setup/spec.md`

## Summary

Implement a robust testing environment using Vitest for unit and component testing, integrated with GitHub Actions for continuous integration. This includes local test scripts, coverage reporting, and automated verification on Pull Requests.

## Technical Context

**Language/Version**: Vue 3 (Composition API), TypeScript 5.9  
**Primary Dependencies**: Vitest, @vitejs/plugin-vue, @vue/test-utils, jsdom, @vitest/coverage-v8  
**Storage**: N/A  
**Testing**: Vitest  
**Target Platform**: Node.js 20+ + Docker, GitHub Actions
**Project Type**: Web application  
**Performance Goals**: < 1 min local run, < 5 min CI run  
**Constraints**: Responsive, Accessible, TypeScript  
**Scale/Scope**: TP (School Project)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Principe I (Vue 3/Composition API)** : L'approche utilise Vitest qui est parfaitement compatible avec Vue 3 et `<script setup>`.
- [x] **Principe II (Pédagogie/TP)** : La solution est claire, utilise des outils standards et suit les bonnes pratiques de test.
- [x] **Principe III (Architecture SFC)** : Vitest permet de tester les composants SFC de manière modulaire.

## Project Structure

### Documentation (this feature)

```text
specs/006-vitest-ci-setup/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── cli-api.md       # CLI commands contract
└── tasks.md             # Phase 2 output (to be generated)
```

### Source Code (repository root)

```text
.github/
└── workflows/
    └── test.yml         # NEW: CI workflow

src/
└── ... (existing structure)

tests/                   # NEW/UPDATED: Test directory
├── components/          # Component tests
└── unit/                # Unit tests

package.json             # UPDATED: scripts and dependencies
vite.config.ts           # UPDATED: Vitest configuration
```

**Structure Decision**: Standard Vue 3 / Vite project structure with a dedicated `tests/` directory for better organization.

## Complexity Tracking

*No violations identified.*

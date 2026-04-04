# Tasks: Set up Vitest tests and CI

**Feature**: Set up Vitest tests and CI
**Plan**: [specs/006-vitest-ci-setup/plan.md](plan.md)
**Branch**: `006-vitest-ci-setup`

## Implementation Strategy

We will implement the testing suite incrementally, starting with the core Vitest configuration and local execution scripts (MVP), followed by the CI integration for automated verification, and finally the coverage reporting.

## Phase 1: Setup

- [X] T001 Install testing dependencies (`vitest`, `@vitejs/plugin-vue`, `@vue/test-utils`, `jsdom`, `@vitest/coverage-v8`) using `npm install -D`
- [X] T002 Create the `tests/` directory structure: `tests/unit` and `tests/components`

## Phase 2: Foundational

- [X] T003 [P] Configure Vitest in `vite.config.ts` to support Vue 3 and TypeScript
- [X] T004 [P] Create a basic dummy test in `tests/unit/example.spec.ts` to verify the setup
- [X] T005 Update `package.json` with `test`, `test:watch`, and `test:coverage` scripts

## Phase 3: User Story 1 - Local Test Execution (Priority: P1)

**Goal**: Enable developers to run unit and component tests locally.

**Independent Test**: Run `npm run test` and verify that the dummy test passes.

- [X] T006 [US1] Implement a unit test for an existing utility or service (e.g., in `src/services/api.ts`) in `tests/unit/api.spec.ts`
- [X] T007 [P] [US1] Implement a component test for a simple component (e.g., `src/components/NavBar.vue`) in `tests/components/NavBar.spec.ts`
- [X] T008 [US1] Verify that `npm run test` correctly identifies and reports test failures

## Phase 4: User Story 2 - Automated CI Verification (Priority: P1)

**Goal**: Automate test execution on GitHub Actions.

**Independent Test**: Push a commit to the feature branch and verify that the "Test" action triggers and passes on GitHub.

- [X] T009 [US2] Create the GitHub Action workflow file `.github/workflows/test.yml`
- [X] T010 [US2] Configure the workflow to install dependencies and run `npm run test` on `push` and `pull_request` to `main` and `dev`
- [X] T011 [US2] Verify that the CI pipeline fails if a test is intentionally broken

## Phase 5: User Story 3 - Test Coverage Reporting (Priority: P2)

**Goal**: Provide code coverage reports for the test suite.

**Independent Test**: Run `npm run test:coverage` and verify that a `coverage/` directory is created with an `index.html` file.

- [X] T012 [US3] Configure the coverage provider in `vite.config.ts` (using `v8`)
- [X] T013 [US3] Verify that the coverage report is correctly printed in the terminal after running the coverage command
- [X] T014 [P] [US3] Update `.gitignore` to exclude the `coverage/` directory

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T015 Review all tests for consistency and adherence to project standards
- [X] T016 Ensure `README.md` or `GEMINI.md` is updated with instructions for running tests
- [X] T017 Final verification of the CI pipeline on the latest commit

## Dependencies

- Phase 2 (Foundational) depends on Phase 1 (Setup)
- Phase 3 (US1) depends on Phase 2
- Phase 4 (US2) depends on Phase 3
- Phase 5 (US3) depends on Phase 3

## Parallel Execution Examples

### User Story 1 (Local Tests)
- T006 and T007 can be worked on in parallel as they target different parts of the application.

### User Story 3 (Coverage)
- T012 and T014 can be handled in parallel.

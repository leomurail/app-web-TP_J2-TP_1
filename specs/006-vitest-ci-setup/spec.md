# Feature Specification: Set up Vitest tests and CI

**Feature Branch**: `006-vitest-ci-setup`  
**Created**: 2026-04-04  
**Status**: Draft  
**Input**: User description: "Met en place sur série de Test avec Vitest et Met en place une CI de test"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Local Test Execution (Priority: P1)

As a developer, I want to execute unit and component tests on my machine using a fast and reliable test runner, so that I can verify my changes before committing.

**Why this priority**: Fundamental for the developer workflow and code quality.

**Independent Test**: Can be tested by running the test command in the terminal and seeing the test results.

**Acceptance Scenarios**:

1. **Given** a set of unit or component tests, **When** I run the test command, **Then** all tests are executed and results are displayed in the terminal.
2. **Given** a failing test, **When** I run the test command, **Then** the command fails with a non-zero exit code and reports the failure details.

---

### User Story 2 - Automated CI Verification (Priority: P1)

As a maintainer, I want the test suite to run automatically on every Pull Request, so that I can ensure that new changes do not introduce regressions.

**Why this priority**: Essential for maintaining long-term stability and enabling continuous integration.

**Independent Test**: Can be tested by pushing a commit to a branch and verifying that the CI job triggers and reports the test status.

**Acceptance Scenarios**:

1. **Given** a Pull Request is opened or updated, **When** the CI pipeline triggers, **Then** the test suite is executed in a clean environment.
2. **Given** the test suite fails in CI, **When** the pipeline finishes, **Then** the Pull Request is marked as failing and the details are accessible to the author.

---

### User Story 3 - Test Coverage Reporting (Priority: P2)

As a developer, I want to see the code coverage of my tests, so that I can identify areas of the codebase that lack testing.

**Why this priority**: Helps in improving the overall quality and reliability of the codebase.

**Independent Test**: Can be tested by running the test command with a coverage flag and viewing the generated report.

**Acceptance Scenarios**:

1. **Given** the test suite, **When** I run the tests with coverage enabled, **Then** a coverage report is generated showing the percentage of code covered by tests.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a command to run all unit and component tests using Vitest.
- **FR-002**: System MUST include a configuration for Vitest that is compatible with the existing Vue 3 and TypeScript setup.
- **FR-003**: System MUST provide a command to generate code coverage reports.
- **FR-004**: System MUST include a CI configuration (GitHub Actions) that automatically runs tests on every push and Pull Request to the main branches.
- **FR-005**: CI pipeline MUST fail if any test fails.

### Key Entities

- **Test Suite**: A collection of Vitest test files (`.spec.ts` or `.test.ts`) that verify different parts of the application.
- **CI Workflow**: A set of automated instructions (GitHub Action) that defines the environment and steps for running tests.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Developers can run the entire test suite locally in under 1 minute for a clean run.
- **SC-002**: 100% of Pull Requests are automatically verified by the CI test suite before merging.
- **SC-003**: Test coverage reports are generated and available locally for developers.
- **SC-004**: CI pipeline execution time for tests is under 5 minutes.

## Assumptions

- **Existing CI**: The project uses GitHub Actions as its primary CI platform.
- **Test Types**: The focus is on unit and component tests (Vitest), not end-to-end tests (Playwright/Cypress).
- **Environment**: The CI environment will use Node.js 20+ as specified in GEMINI.md.
- **Tools**: `npm` is the primary package manager.

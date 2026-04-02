# Tasks: Fix Docker CI/CD and Taskfile Integration

**Input**: Design documents from `/specs/004-fix-docker-cicd/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create `docker/env/` and `docker/scripts/` directories in repository root

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T002 [P] Create `.env.local.template`, `.env.dev.template`, and `.env.prod.template` in `docker/env/`
- [x] T003 [P] Create `docker/scripts/install.sh` and `docker/scripts/destroy.sh` for environment management

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 2 - Unified Command Execution (Priority: P1) 🎯 MVP

**Goal**: Establish a consistent orchestration layer using `Taskfile` for local and CI/CD use.

**Independent Test**: Run `task install` locally and verify that `.env` is created and containers are built.

### Implementation for User Story 2

- [x] T004 [P] [US2] Create base `docker-compose.yaml` in repository root
- [x] T005 [P] [US2] Create `docker/docker-compose.local.yaml` for local development overrides
- [x] T006 [US2] Create `Taskfile.yml` in repository root with `install`, `watch`, and `clean` tasks

**Checkpoint**: User Story 2 complete - `task` commands are now usable for local development.

---

## Phase 4: User Story 1 - Automated Deployment (Priority: P1)

**Goal**: Activate and configure GitHub Actions for automated deployment to dev/prod environments.

**Independent Test**: Push a change to `develop` and verify that the GitHub Action executes `task install` and completes the `rsync` sync.

### Implementation for User Story 1

- [x] T007 [P] [US1] Create/Activate `.github/workflows/dev-deploy.yml` with push trigger on `develop`
- [x] T008 [P] [US1] Create/Activate `.github/workflows/prod-deploy.yml` with push trigger on `main`
- [x] T009 [US1] Update GitHub Action workflows to use `task install` instead of `make init` and configure `rsync`

**Checkpoint**: User Story 1 complete - Automated deployment is active.

---

## Phase 5: User Story 3 - Secure External Access (Priority: P2)

**Goal**: Integrate production deployment with Traefik reverse proxy and a dedicated network.

**Independent Test**: Access the production container via the domain specified in the Traefik labels.

### Implementation for User Story 3

- [x] T010 [P] [US3] Create `docker/docker-compose.prod.yaml` with Traefik labels (`traefik.enable`, `rule`, `port`)
- [x] T011 [US3] Configure external `traefik-net` network in `docker/docker-compose.prod.yaml`

**Checkpoint**: User Story 3 complete - Production environment is securely routed through Traefik.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Documentation and cleanup

- [x] T012 Update root `README.md` with instructions from `quickstart.md`
- [x] T013 [P] Perform a final cleanup using `task clean` and verify all containers stop correctly
- [x] T014 Remove obsolete GitHub Action workflow `.github/workflows/deploy.yml`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Initial directory structure.
- **Foundational (Phase 2)**: Templates and scripts needed for `Taskfile` execution.
- **User Story 2 (Phase 3)**: MUST be completed before User Story 1 (US1 relies on `task install`).
- **User Story 1 (Phase 4)**: Can start after US2 is complete.
- **User Story 3 (Phase 5)**: Can start after Foundational phase, but relies on prod deployment context from US1.
- **Polish (Final Phase)**: Final documentation and cleanup.

### Parallel Opportunities

- T002 and T003 can be implemented in parallel.
- T004 and T005 can be implemented in parallel.
- T007 and T008 can be implemented in parallel.
- T010 can be started in parallel with US1 tasks if the prod compose structure is agreed upon.

---

## Implementation Strategy

### MVP First (User Story 2 Only)

1. Complete Phase 1 & 2.
2. Complete Phase 3 (User Story 2).
3. **VALIDATE**: Ensure `task install` works locally. This provides immediate value for local development.

### Incremental Delivery

1. Foundation + US2 → Local development optimized.
2. US1 → Continuous Deployment activated.
3. US3 → Production security and routing finalized.

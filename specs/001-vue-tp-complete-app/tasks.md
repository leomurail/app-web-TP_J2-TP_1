---

description: "Actionable tasks for Implement multi-feature Vue TP app"
---

# Tasks: Implement multi-feature Vue TP app

**Input**: Design documents from `/specs/001-vue-tp-complete-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Vitest tests are included as per FR-009 requirement in spec.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Vue Project**: `src/components/`, `src/views/`, `src/services/`, `src/stores/`, `tests/`
- Paths follow Vite + Vue 3 standards.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project directory structure (`src/views`, `src/services`, `src/stores`, `src/router`)
- [x] T002 Install core dependencies: `vue-router`, `pinia`, `primevue`, `axios`, `@vueuse/core`
- [x] T003 [P] Configure Vitest and setup basic test environment in `vitest.config.ts`
- [x] T004 [P] Initialize PrimeVue plugin in `src/main.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 [P] Create Axios instance for REST API calls in `src/services/api.ts`
- [x] T006 Initialize Pinia stores for Form and Device status in `src/stores/`
- [x] T007 Setup Vue Router base configuration in `src/router/index.ts`
- [x] T008 Implement global layout and `<router-view>` in `src/App.vue`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Fluid Navigation with Custom UI (Priority: P1) 🎯 MVP

**Goal**: Navigate between pages with a custom NavBar and smooth transitions.

**Independent Test**: Click links in NavBar, verify URL changes, and see fade transitions.

### Tests for User Story 1

- [x] T009 [P] [US1] Create unit test for `NavBar.vue` routing logic in `tests/components/NavBar.spec.ts`
- [x] T010 [P] [US1] Create test for route transition CSS classes in `tests/App.spec.ts`

### Implementation for User Story 1

- [x] T011 [P] [US1] Create custom `NavBar.vue` component in `src/components/NavBar.vue`
- [x] T012 [P] [US1] Create placeholder views: `HomeView.vue`, `AboutView.vue` in `src/views/`
- [x] T013 [US1] Implement CSS fade transitions for route changes in `src/App.vue`
- [x] T014 [US1] Integrate `NavBar.vue` into the main layout in `src/App.vue`

**Checkpoint**: User Story 1 is functional - navigation and transitions are working.

---

## Phase 4: User Story 2 - Multi-step Form Submission (Priority: P2)

**Goal**: Multi-step form with back-navigation, state persistence, and API submission.

**Independent Test**: Fill Step 1, go to Step 2, go back, verify data remains. Submit and check API call.

### Tests for User Story 2

- [x] T015 [P] [US2] Create unit test for `formStore` persistence logic in `tests/stores/form.spec.ts`
- [x] T016 [P] [US2] Create component test for multi-step navigation in `tests/views/FormView.spec.ts`

### Implementation for User Story 2

- [x] T017 [P] [US2] Implement `formStore` with Pinia and LocalStorage persistence in `src/stores/form.ts`
- [x] T018 [P] [US2] Create `FormView.vue` as a container for the multi-step form
- [x] T019 [US2] Implement Step components using PrimeVue inputs in `src/components/form/`
- [x] T020 [US2] Implement back/forward logic and validation for each step
- [x] T021 [US2] Implement final submission logic calling the REST service in `src/services/api.ts`

**Checkpoint**: User Story 2 is functional - form state persists and submits correctly.

---

## Phase 5: User Story 3 - Device Feature Integration & API (Priority: P3)

**Goal**: Geolocation, Notifications, Sharing, and live API alert count.

**Independent Test**: Trigger "Demo Geo", see coordinates. Trigger "Notification", see browser alert.

### Tests for User Story 3

- [x] T022 [P] [US3] Mock device APIs and test `deviceService` logic in `tests/services/device.spec.ts`
- [x] T023 [P] [US3] Test API alert fetching logic in `tests/stores/device.spec.ts`

### Implementation for User Story 3

- [x] T024 [P] [US3] Implement `deviceService.ts` using `@vueuse/core` for Geolocation and Sharing
- [x] T025 [P] [US3] Implement `deviceStore.ts` for managing notification counts and device states
- [x] T026 [US3] Create `DemoView.vue` with buttons for Geo, Share, and Contact Picker
- [x] T027 [US3] Implement "Touch events" demo (e.g., swipe to clear notifications) in `DemoView.vue`
- [x] T028 [US3] Integrate live API polling for alert count in `src/stores/device.ts`

**Checkpoint**: All user stories functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: DevOps, Dockerization, and Final verification.

- [x] T029 [P] Configure GitHub Actions workflow in `.github/workflows/deploy.yml` for VPS deployment
- [x] T030 [P] Create `Dockerfile` and `docker-compose.yml` for local/production containerization
- [x] T031 Run full Vitest suite and fix any regressions
- [x] T032 Final linting and formatting check (`npm run lint`)
- [x] T033 Verify all SC-XXX measurable outcomes from spec.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Must complete T001-T002 first.
- **Foundational (Phase 2)**: Depends on Setup (Phase 1).
- **User Stories (Phase 3-5)**: All depend on Foundational (Phase 2).
  - Can be implemented in parallel if needed, but P1 -> P2 -> P3 is recommended for logical flow.
- **Polish (Phase 6)**: Final step after all features are implemented.

### Parallel Opportunities

- T003, T004 (Phase 1)
- T005, T007 (Phase 2)
- US1, US2, US3 implementation phases can largely run in parallel after Phase 2 is complete.
- All tasks marked [P] within a phase are independent.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Setup and Foundational (T001-T008).
2. User Story 1 (T011-T014).
3. **Validate**: Verify navigation and transitions are smooth.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

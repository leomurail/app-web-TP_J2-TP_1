# Tasks: Fix Demo Page Errors

**Input**: Design documents from `/specs/003-fix-demo-page-errors/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Test tasks are included to verify the fixes and prevent regressions.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and proxy configuration

- [x] T001 [P] Configure Vite proxy for API requests in `vite.config.ts`
- [x] T002 [P] Update environment variables for local backend in `.env` (if applicable) or `src/services/api.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure for API resilience and store state

- [x] T003 Update `DeviceStore` state with `isApiSyncing` and `apiError` in `src/stores/device.ts`
- [x] T004 Implement `SYNC_START`, `SYNC_SUCCESS`, and `SYNC_FAILURE` actions in `src/stores/device.ts`
- [x] T005 [P] Add global Axios interceptor for handling common errors (optional but recommended) in `src/services/api.ts`

---

## Phase 3: User Story 1 - System Alerts Synchronization (Priority: P1) 🎯 MVP

**Goal**: Successfully fetch and display system alerts from the backend.

**Independent Test**: Click "Sync API" and verify the counter updates correctly when the backend is online, or shows an error state when offline.

### Tests for User Story 1

- [x] T006 [P] [US1] Create unit test for `fetchAlerts` action in `tests/stores/device.spec.ts`
- [x] T007 [US1] Create integration test for alert synchronization in `tests/views/DemoView.spec.ts`

### Implementation for User Story 1

- [x] T008 [US1] Refactor `fetchAlerts` to use the new store actions in `src/views/DemoView.vue`
- [x] T009 [US1] Add loading spinner/state to the "Sync API" button in `src/views/DemoView.vue`
- [x] T010 [US1] Display `apiError` message in the System Alerts block in `src/views/DemoView.vue`

---

## Phase 4: User Story 2 - Geolocation Protocol Recovery (Priority: P2)

**Goal**: Provide clear instructions for resetting geolocation permissions.

**Independent Test**: Block geolocation in browser settings and verify the error message mentions the "tune/lock icon".

### Tests for User Story 2

- [x] T011 [US2] Update `DemoView.spec.ts` to verify the new error message text when geolocation fails.

### Implementation for User Story 2

- [x] T012 [US2] Update the `geoError` display block with explicit reset instructions in `src/views/DemoView.vue`
- [x] T013 [P] [US2] Add a "Help" link or tooltip explaining how to reset permissions for different browsers in `src/views/DemoView.vue`

---

## Phase 5: User Story 3 - Clean System Diagnostics (Priority: P3)

**Goal**: Eliminate console errors from autofill extensions and API failures.

**Independent Test**: Check browser console for "TypeError" and "CORS" errors during navigation.

### Implementation for User Story 3

- [x] T014 [P] [US3] Add `autocomplete` and `name` attributes to all form fields in `src/views/FormView.vue` (and `DemoView.vue` if any) to assist autofill extensions.
- [x] T015 [US3] Wrap all API calls in `DemoView.vue` with robust try/catch blocks that prevent uncaught promise rejections.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and documentation

- [x] T016 [P] Update `README.md` with backend setup requirements for the demo page.
- [x] T017 Run final validation using `specs/003-fix-demo-page-errors/quickstart.md`.
- [x] T018 [P] Ensure all components follow the project's styling guidelines in `src/style.css`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Completed.
- **Foundational (Phase 2)**: Completed.
- **User Stories (Phase 3+)**: Completed.
- **Polish (Final Phase)**: Completed.

### Parallel Opportunities

- T001 and T002 were run in parallel.
- T003, T004, and T005 were run in parallel within Phase 2.
- T014 and T015 were run in parallel in Phase 5.
- Story-specific tasks (e.g., T006, T007) were run in parallel once foundations were ready.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Complete Phase 3 (US1).
3. **VALIDATE**: Ensure API sync works with the new proxy and error handling.

### Incremental Delivery

1. Foundation ready.
2. Fix API/CORS issues (US1).
3. Improve Geolocation UX (US2).
4. Clean up console logs/Autofill issues (US3).

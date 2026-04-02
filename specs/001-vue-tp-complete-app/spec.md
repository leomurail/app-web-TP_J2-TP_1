# Feature Specification: Implement multi-feature Vue TP app

**Feature Branch**: `001-vue-tp-complete-app`  
**Created**: 2026-04-02  
**Status**: Draft  
**Input**: User description: "Vous pouvez utiliser en option API ou en composition. Créer son propre composant navBar en .vue pour avoir plusieurs 'pages'. Utiliser une bibliotèque de composants (comparatif) Creer un formulaire sur plusieurs étapes, avec possibilité de revenir sur l'étape en cours. Installer une transition entre les pages. Utiliser votre API avec des appels REST Utiliser un environnement de test. Mise en production (avec CI/CD) sur votre VPS. Votre application doit utiliser des ressources internes : Stokage interne Notification nombre d'alerte Partage Contact Picker. demo GeoLocalisation Touch event Voici quelques consignes supplémentaire non-obligatoires, juste pour s'amuser Intégrer le tout dans un docker."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Fluid Navigation with Custom UI (Priority: P1)

As a student/user, I want to navigate between different "pages" of the application using a custom-built navigation bar and see smooth transitions so that the application feels like a modern single-page app.

**Why this priority**: Essential for the core structure of the TP and the first requirement for a multi-page feel.

**Independent Test**: Manually clicking through the NavBar links and observing URL changes, component swaps, and CSS transitions.

**Acceptance Scenarios**:

1. **Given** the app is loaded, **When** I click a link in the custom NavBar, **Then** the corresponding view is displayed with a transition effect.
2. **Given** I am on a specific page, **When** I reload the browser, **Then** the NavBar reflects the current active route.

---

### User Story 2 - Multi-step Form Submission (Priority: P2)

As a user, I want to fill out a multi-step form where I can navigate back and forth without losing my current progress in the step, ensuring a better data entry experience.

**Why this priority**: Core requirement for demonstrating state management and complex UI logic.

**Independent Test**: Fill step 1, go to step 2, click "Back", and verify step 1 data is preserved.

**Acceptance Scenarios**:

1. **Given** I am on step 2 of the form, **When** I click "Back" to step 1, **Then** the previous inputs remain visible.
2. **Given** I have completed all steps, **When** I submit, **Then** the data is sent to the API.

---

### User Story 3 - Device Feature Integration & API (Priority: P3)

As a user, I want to interact with native/internal device features like geolocation and notifications, and see data fetched from a REST API to demonstrate full integration capabilities.

**Why this priority**: Essential for the "Internal Resources" and "REST API" requirements of the TP.

**Independent Test**: Trigger a notification, check geolocation coordinates display, and verify API data list.

**Acceptance Scenarios**:

1. **Given** I permit geolocation, **When** I click "Demo Geo", **Then** my coordinates are displayed on the screen.
2. **Given** a new alert is received from the API, **When** the system updates, **Then** the notification badge count increases.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST implement a custom `NavBar.vue` component using Vue Router.
- **FR-002**: System MUST use the Composition API (`<script setup>`) for all new components.
- **FR-003**: System MUST integrate a UI component library (e.g., Vuetify, PrimeVue) after a brief comparison.
- **FR-004**: System MUST implement a multi-step form component that persists step data in memory or local storage during the session.
- **FR-005**: System MUST implement CSS-based transitions (e.g., `<transition>` or `<router-view v-slot="{ Component }">`) between pages.
- **FR-006**: System MUST perform REST API calls using `fetch` or `axios`.
- **FR-007**: System MUST provide a demo for Geolocation, Sharing, and Contact Picking (using Web APIs or Capacitor if applicable).
- **FR-008**: System MUST implement "Touch events" (swipe or long-press) for specific UI interactions.
- **FR-009**: System MUST have an automated test suite (Vitest) for core logic.
- **FR-010**: System MUST be deployable to a VPS via a CI/CD pipeline (e.g., GitHub Actions).

### Key Entities

- **FormStep**: Represents the state and validation of a single step in the multi-step form.
- **InternalResource**: Represents data/status from device APIs (Geolocation, Storage, etc.).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of "internal resources" (Storage, Geolocation, Contacts, Sharing, Notifications) are demonstrably functional in a browser or mobile emulator environment.
- **SC-002**: Page transition duration is consistent (e.g., 300ms) and visually smooth.
- **SC-003**: The multi-step form allows "back" navigation without data loss in 100% of steps.
- **SC-004**: CI/CD pipeline successfully builds and deploys to the VPS on every push to the main branch.

## Assumptions

- **Target Device**: Modern web browsers supporting Geolocation, Web Share API, and Contact Picker API.
- **API Availability**: A REST API endpoint is available or will be mocked during development.
- **VPS Access**: SSH access and deployment credentials are configured in the CI environment.
- **Touch Events**: Support for touch-enabled devices (simulated or real).

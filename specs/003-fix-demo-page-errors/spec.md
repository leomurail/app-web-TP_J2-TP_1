# Feature Specification: Fix Demo Page Errors

**Feature Branch**: `003-fix-demo-page-errors`  
**Created**: 2026-04-02  
**Status**: Draft  
**Input**: User description: "J'ai cette erreur quand je vais sur la page démo ... [full error log provided]"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - System Alerts Synchronization (Priority: P1)

As a user visiting the Hardware Interface demo page, I want to see the real-time count of active signals from the system alerts API so that I can monitor system status.

**Why this priority**: Core functionality of the demo page that is currently failing due to network/API errors.

**Independent Test**: Can be tested by navigating to the /demo page and verifying that the "Active Signals" counter displays a numeric value fetched from the backend rather than defaulting or showing error state.

**Acceptance Scenarios**:

1. **Given** the backend API is reachable, **When** I navigate to the demo page, **Then** I should see the "Active Signals" counter updated with the count from `api/v1/alerts`.
2. **Given** a CORS issue or network failure, **When** I click "Sync API", **Then** the system should gracefully handle the error and provide feedback (currently increments notifications as a fallback, which should be verified or improved).

---

### User Story 2 - Geolocation Protocol Recovery (Priority: P2)

As a user who has previously denied or dismissed geolocation prompts, I want to be clearly instructed on how to reset these permissions so that I can use the location-based features of the demo.

**Why this priority**: Improves user experience for a common "stuck" state where the browser blocks prompts.

**Independent Test**: Can be tested by manually blocking geolocation in the browser settings and verifying that the UI provides clear, actionable instructions to the user.

**Acceptance Scenarios**:

1. **Given** geolocation permission is "denied" or "blocked", **When** I view the "Geolocation Protocol" block, **Then** I should see a clear explanation of how to reset the permission in browser settings (e.g., clicking the tune icon next to the URL).

---

### User Story 3 - Clean System Diagnostics (Priority: P3)

As a developer, I want the demo page to be free of critical JavaScript errors in the console so that I can focus on legitimate application logs.

**Why this priority**: Reduces noise and ensures application stability.

**Independent Test**: Open browser DevTools and verify that no "Uncaught TypeError" or "CORS policy" errors appear during normal navigation and interaction on the /demo page.

**Acceptance Scenarios**:

1. **Given** I am on the /demo page, **When** I interact with the form or resources, **Then** no application-level TypeError should be triggered.

---

### Edge Cases

- **Backend Offline**: How does the "Sync API" button handle a persistent 404 or connection refused? It should show a "Service Unavailable" message.
- **Permission Reset**: If a user resets permissions via browser UI, does the app automatically pick up the change without a full page refresh?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST successfully fetch alert data from `http://localhost:3000/api/v1/alerts`.
- **FR-002**: The application MUST handle CORS preflight requests correctly if the backend is on a different port.
- **FR-003**: When geolocation is blocked, the UI MUST display specific instructions mentioning the browser's "Page Info" (tune/lock icon) as a way to reset permissions.
- **FR-004**: The application SHOULD suppress or handle noise from browser extensions (like the Autofill TypeError) if possible, or ensure it doesn't break app logic.
- **FR-005**: The "Sync API" action MUST provide visual feedback during the fetch operation.

### Key Entities *(include if feature involves data)*

- **Alert**: Represents a system notification. Attributes: `count` (integer).
- **DeviceStore**: Pinia store managing global device state, including `notificationCount`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of successful API calls to `/alerts` result in an updated counter on the demo page.
- **SC-002**: The console shows zero "CORS policy" or "404 Not Found" errors for the `/alerts` endpoint when the system is correctly configured.
- **SC-003**: Users facing a geolocation block can find instructions to unblock it within 5 seconds of looking at the error message.
- **SC-004**: No "Uncaught" exceptions are thrown by the application code during the initial mount of `DemoView.vue`.

## Assumptions

- **Backend Availability**: It is assumed that a backend service is intended to run on port 3000.
- **Browser Compatibility**: We assume modern browsers with support for Geolocation and Web Share APIs.
- **Environment Config**: The `VITE_API_BASE_URL` is expected to be correctly set in the environment or fallback to localhost:3000.
- **Proxying**: We assume that if CORS is a persistent issue, a Vite proxy might be a valid solution.

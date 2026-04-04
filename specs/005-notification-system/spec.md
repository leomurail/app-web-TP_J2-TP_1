# Feature Specification: Notification System (PrimeVue Toast)

**Feature Branch**: `005-notification-system`  
**Created**: 2026-04-04  
**Status**: Completed  
**Input**: User request: "Mets en place un système de notifications car je ne reçois rien quand je clique sur broadcast."

## User Scenarios & Testing

### User Story 1 - Visual In-App Feedback (Priority: P1)

As a user, when I click the "Broadcast" button, I want to see a clear visual confirmation within the application so that I know the signal was sent successfully even if system notifications are blocked.

**Why this priority**: Essential for user feedback and confirming that the action was performed.

**Independent Test**: Click "Broadcast" on the Demo page and verify that a Toast message appears in the bottom-right corner.

**Acceptance Scenarios**:

1. **Given** I am on the /demo page, **When** I click "Broadcast", **Then** a PrimeVue Toast notification with summary "Signal Broadcast" should appear.
2. **Given** a notification is displayed, **When** 3 seconds pass, **Then** it should automatically disappear.

---

### User Story 2 - System Level Notifications (Priority: P2)

As a user, I want to receive a system-level notification (OS level) when a broadcast occurs so that I am alerted even if the browser tab is not in focus.

**Why this priority**: Enhances the "Hardware/System" simulation of the application.

**Independent Test**: Grant notification permissions and verify an OS-level alert appears on "Broadcast".

**Acceptance Scenarios**:

1. **Given** I have granted notification permissions, **When** I click "Broadcast", **Then** the browser should trigger a native system notification.

---

### User Story 3 - Persistent State Tracking (Priority: P2)

As a user, I want the "Active Signals" counter to increment every time I send a signal, regardless of whether notifications are allowed or blocked by the browser.

**Why this priority**: Ensures data consistency in the UI state.

**Independent Test**: Block notifications in browser settings, click "Broadcast", and verify the counter still increments.

## Requirements

### Functional Requirements

- **FR-001**: The application MUST use PrimeVue `ToastService` for in-app notifications.
- **FR-002**: The `<Toast />` component MUST be globally available (defined in `App.vue`).
- **FR-003**: The system MUST attempt to trigger a native Browser Notification via the `Notification` API.
- **FR-004**: The `deviceStore.notificationCount` MUST increment on every broadcast action.
- **FR-005**: Notifications MUST have a consistent "Void" aesthetic matching the project theme.

### Key Entities

- **Toast**: Transient UI element for feedback.
- **DeviceStore**: Manages `notificationCount`.

## Success Criteria

- **SC-001**: Toast notifications appear on every "Broadcast" click.
- **SC-002**: Counter increments correctly in all permission states.
- **SC-003**: `main.ts` correctly registers `ToastService`.

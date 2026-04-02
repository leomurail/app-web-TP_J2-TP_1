# Research: Fix Demo Page Errors

## Decisions & Findings

### 1. Autofill TypeError
- **Finding**: The error `Uncaught (in promise) TypeError: Cannot read properties of null (reading 'includes') at AutofillOverlayContentService` is a known issue with the Bitwarden browser extension (and occasionally others like LastPass) when interacting with certain form fields or when the DOM changes rapidly.
- **Decision**: Since this is an extension-level error, it cannot be fully "fixed" in the application code. However, we will ensure our form inputs have proper `autocomplete` attributes and names to help autofill services. We will also wrap our API calls in robust try/catch blocks to ensure extension failures don't halt our application logic.
- **Rationale**: It's a third-party issue, but we can improve compatibility.

### 2. CORS and 404 Errors
- **Finding**: The app currently hardcodes `http://localhost:3000/api/v1` in `api.ts`. In a TP context, the student might not have the backend running, or it might be on a different port.
- **Decision**: We will implement a Vite proxy configuration in `vite.config.ts` to handle CORS automatically during development. We will also add a fallback mechanism in `DemoView.vue` so that if the API is 404/Offline, the UI shows a clear "Mock Mode" or "Offline" status instead of just incrementing notifications.
- **Rationale**: Simplifies the development environment for students and makes the app more resilient.

### 3. Geolocation Reset Instructions
- **Finding**: For Chrome, users click the "tune" or "lock" icon next to the URL, then "Site settings" or "Reset permission".
- **Decision**: Update the error message in `DemoView.vue` to specifically guide the user: "Cliquez sur l'icône de réglages (curseurs ou cadenas) à gauche de l'URL pour réinitialiser les permissions."
- **Rationale**: Direct, actionable instruction for the specific error encountered.

### 4. Browsing Topics API Warning
- **Finding**: The warning `Browsing Topics API removed` is a browser-level deprecation/privacy warning from Chrome.
- **Decision**: Ignore as it's non-breaking and outside the application's control.
- **Rationale**: Does not affect functionality.

## Alternatives Considered
- **Mocking API with MSW**: Rejected for this TP as it might add too much complexity for the student. A simple Vite proxy + local backend or simple fallback is better.
- **Force Geolocation Prompt**: Impossible via JS if already denied by the user. UI instruction is the only path.

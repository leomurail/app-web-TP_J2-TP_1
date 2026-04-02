# Research: Vue TP Implementation Details

## Decision 1: UI Component Library
- **Decision**: PrimeVue (v4+)
- **Rationale**: Highly modular, excellent support for Tailwind CSS (if needed later) or unstyled mode, and has robust multi-step components like `Stepper`. It is lightweight and easy to integrate in a Vite project.
- **Alternatives considered**: 
    - **Vuetify**: Rejected due to larger bundle size and slightly more complex setup for a simple TP.
    - **Element Plus**: Good, but PrimeVue offers more modern styling flexibility for education.

## Decision 2: Multi-step Form State Management
- **Decision**: Pinia + LocalStorage
- **Rationale**: Pinia is the standard for Vue 3 state management. Using a dedicated store allows steps to share data easily. LocalStorage integration will fulfill the "session persistence" requirement if the user reloads.
- **Alternatives considered**: 
    - **Prop drilling**: Rejected as it becomes messy for multiple steps.
    - **In-component state**: Rejected as it resets on navigation.

## Decision 3: Device API Integration (Internal Resources)
- **Decision**: VueUse + Native Browser APIs
- **Rationale**: VueUse provides high-quality composables (`useGeolocation`, `useShare`, etc.) that wrap native browser APIs in a reactive way, perfect for the Composition API.
- **Alternatives considered**: 
    - **Capacitor**: Rejected unless mobile build is mandatory, native Web APIs are sufficient for a "demo".

## Decision 4: CI/CD & Deployment
- **Decision**: GitHub Actions + SSH/Docker
- **Rationale**: Standard CI/CD approach. GitHub Actions will build the Vite app and use `scp` or `docker compose` to deploy to the VPS.
- **Alternatives considered**: 
    - **Manual FTP**: Rejected (not pedagogical/pro).
    - **Vercel/Netlify**: Rejected because TP specifically asks for VPS.

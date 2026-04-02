# Quickstart: Vue TP Application

## Prerequisites
- Node.js (v18+)
- npm (v10+)
- Basic understanding of Vue 3 Composition API

## Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install new feature-specific dependencies:
   ```bash
   npm install vue-router pinia primevue axios @vueuse/core
   ```

## Development
To start the local development server:
```bash
npm run dev
```

## Testing
To run the Vitest suite:
```bash
npm run test
```

## Deployment (VPS)
Deployment is handled by GitHub Actions on push to `main`. To manually build:
```bash
npm run build
```
Verify the generated `dist/` folder for static hosting.

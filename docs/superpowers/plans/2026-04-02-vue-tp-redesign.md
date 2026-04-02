# Vue TP Redesign ("The Void") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal**: Transform the Vue TP application into a minimalist, high-end "Void" aesthetic with neon accents, absolute black backgrounds, and fluid motion.

**Architecture**: Focused CSS overhaul using global variables and component-level surgical styling. We will strip away default PrimeVue UI artifacts and replace them with custom, minimal elements while keeping the underlying logic (Pinia stores, Services) intact.

**Tech Stack**: Vue 3 (Composition API), PrimeVue (Unstyled/Overridden), @vueuse/core, CSS Grid/Flexbox, Custom CSS Transitions.

---

## File Structure

- **Modified**: `src/style.css` - Core design system (colors, fonts, global resets).
- **Modified**: `src/App.vue` - Global layout, transition effects, and background.
- **Modified**: `src/components/NavBar.vue` - Ultra-minimal navigation bar.
- **Modified**: `src/views/HomeView.vue`, `AboutView.vue`, `DemoView.vue` - View-specific minimalist styling.
- **Modified**: `src/views/FormView.vue` - Overhaul of the multi-step form to "line-only" inputs.

---

## Task 1: Core Design System & Global Styles

**Files**:
- Modify: `src/style.css`

- [ ] **Step 1: Define CSS Variables**

Replace `src/style.css` content with the new design system variables.

```css
:root {
  --bg-color: #000000;
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --accent-color: #00f0ff; /* Electric Cyan */
  --accent-glow: rgba(0, 240, 255, 0.4);
  --border-color: #222222;
  --font-main: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-color);
  color: var(--text-primary);
  font-family: var(--font-main);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

h1, h2, h3 {
  letter-spacing: -0.05em;
  font-weight: 700;
  text-transform: uppercase;
}
```

- [ ] **Step 2: Verify background is absolute black**

Run: `npm run dev` and check the browser.

- [ ] **Step 3: Commit**

```bash
git add src/style.css
git commit -m "style: define core void design system"
```

---

## Task 2: Layout & Immersive Transitions

**Files**:
- Modify: `src/App.vue`

- [ ] **Step 1: Implement Blur-up Transitions**

Update the transition styles and layout in `src/App.vue`.

```vue
<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from {
  opacity: 0;
  filter: blur(10px);
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  filter: blur(10px);
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 4rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/App.vue
git commit -m "style: implement immersive layout and transitions"
```

---

## Task 3: Surgical NavBar Redesign

**Files**:
- Modify: `src/components/NavBar.vue`

- [ ] **Step 1: Update NavBar for minimal footprint**

```vue
<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #111;
}

.navbar-brand {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

.nav-link {
  color: var(--text-secondary);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: color 0.3s ease;
}

.nav-link:hover, .nav-link.active {
  color: var(--text-primary);
  text-shadow: 0 0 10px var(--accent-glow);
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NavBar.vue
git commit -m "style: redesign navbar for minimal void aesthetic"
```

---

## Task 4: "Line-Only" Form Overhaul

**Files**:
- Modify: `src/views/FormView.vue`

- [ ] **Step 1: Strip PrimeVue UI artifacts**

Replace `Stepper` and `Card` styles with minimal containers and glowing lines.

```vue
<style scoped>
.form-container {
  background: transparent;
  padding: 0;
}

:deep(.p-stepper-panels) {
  background: transparent;
}

:deep(.p-inputtext) {
  background: transparent !important;
  border: none !important;
  border-bottom: 1px solid #333 !important;
  border-radius: 0 !important;
  color: white !important;
  font-size: 1.5rem !important;
  padding: 0.5rem 0 !important;
  transition: border-color 0.3s ease;
}

:deep(.p-inputtext:focus) {
  border-color: var(--accent-color) !important;
  box-shadow: none !important;
}

.field label {
  color: var(--text-secondary);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
</style>
```

- [ ] **Step 2: Update Buttons to Ghost Style**

```vue
<style scoped>
:deep(.p-button) {
  background: transparent !important;
  border: 1px solid #333 !important;
  border-radius: 0 !important;
  color: var(--text-primary) !important;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
}

:deep(.p-button:hover) {
  border-color: var(--accent-color) !important;
  box-shadow: 0 0 15px var(--accent-glow) !important;
}
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/views/FormView.vue
git commit -m "style: overhaul multi-step form with surgical minimalism"
```

---

## Task 5: Dashboard & Resource Demo Refinement

**Files**:
- Modify: `src/views/DemoView.vue`

- [ ] **Step 1: Replace Cards with Grid Separators**

```vue
<style scoped>
:deep(.p-card) {
  background: transparent !important;
  border: 1px solid #111 !important;
  border-radius: 0 !important;
}

.touch-zone {
  background-color: transparent !important;
  border: 1px solid #222 !important;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.7rem;
}

.touch-zone:hover {
  border-color: var(--accent-color);
  color: var(--text-primary);
}

.badge {
  background-color: transparent;
  border: 1px solid var(--accent-color);
  box-shadow: 0 0 10px var(--accent-glow);
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/views/DemoView.vue
git commit -m "style: refine demo dashboard with grid separators"
```

---

## Task 6: Final Visual Polish & Typography Check

**Files**:
- Modify: `src/views/HomeView.vue`
- Modify: `src/views/AboutView.vue`

- [ ] **Step 1: Apply Large Typography to Home**

```vue
<template>
  <div class="home">
    <h1 class="hero-title">Interface <span class="glow">Void</span></h1>
    <p class="hero-subtitle">Surgical minimalism for system resources.</p>
  </div>
</template>

<style scoped>
.home {
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-title {
  font-size: 5rem;
  line-height: 0.9;
}

.glow {
  color: var(--accent-color);
  text-shadow: 0 0 30px var(--accent-glow);
}

.hero-subtitle {
  color: var(--text-secondary);
  margin-top: 1rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
}
</style>
```

- [ ] **Step 2: Run build to ensure no regressions**

Run: `npm run build`

- [ ] **Step 3: Commit**

```bash
git add src/views/HomeView.vue src/views/AboutView.vue
git commit -m "style: final typography polish for home and about"
```

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const links = [
  { name: 'home', label: 'Home', path: '/' },
  { name: 'about', label: 'About', path: '/about' },
  { name: 'form', label: 'Form', path: '/form' },
  { name: 'demo', label: 'Demo', path: '/demo' },
]

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-brand">V_VOID</div>
    <div class="navbar-links">
      <router-link
        v-for="link in links"
        :key="link.name"
        :to="link.path"
        class="nav-link"
        :class="{ active: isActive(link.path) }"
      >
        {{ link.label }}
      </router-link>
    </div>
  </nav>
</template>

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
  padding: 2rem 3rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #111;
}

.navbar-brand {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 0.4em;
  text-shadow: 0 0 10px var(--accent-glow);
}

.navbar-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 400;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: 0.5rem 0;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--accent-color);
  transition: width 0.4s ease;
  box-shadow: 0 0 8px var(--accent-glow);
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link.active {
  color: var(--text-primary);
}

.nav-link.active::after {
  width: 100%;
}
</style>

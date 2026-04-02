<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  isOpen: boolean
  links: Array<{ name: string; label: string; path: string }>
}>()

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}

// Lock scroll when menu is open
onMounted(() => {
  document.body.classList.add('scroll-lock')
})

onUnmounted(() => {
  document.body.classList.remove('scroll-lock')
})
</script>

<template>
  <Teleport to="body">
    <Transition name="menu-fade">
      <div v-if="isOpen" class="mobile-menu-overlay" @click.self="handleClose">
        <div class="mobile-menu-content">
          <button class="close-btn" @click="handleClose">
            <span class="close-icon">×</span>
          </button>
          
          <nav class="mobile-nav">
            <router-link
              v-for="link in links"
              :key="link.name"
              :to="link.path"
              class="mobile-nav-link"
              @click="handleClose"
            >
              <span class="link-label">{{ link.label }}</span>
            </router-link>
          </nav>

          <footer class="mobile-menu-footer">
            <span class="f-text">V_VOID // MOBILE_CORE</span>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: flex-end;
}

.mobile-menu-content {
  width: 100%;
  max-width: 400px;
  background: var(--bg-color);
  border-left: 1px solid #111;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 2.5rem;
  cursor: pointer;
  line-height: 1;
}

.mobile-nav {
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.mobile-nav-link {
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  transition: all 0.4s ease;
}

.mobile-nav-link.router-link-active {
  color: var(--accent-color);
  text-shadow: 0 0 15px var(--accent-glow);
}

.mobile-menu-footer {
  margin-top: auto;
  padding-top: 2rem;
  border-top: 1px solid #111;
}

.f-text {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: #333;
  letter-spacing: 0.3em;
}

/* Transitions */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.menu-fade-enter-to,
.menu-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>

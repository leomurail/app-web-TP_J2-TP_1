<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="app-container">
    <NavBar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="void-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
.void-fade-enter-active,
.void-fade-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.void-fade-enter-from {
  opacity: 0;
  filter: blur(20px);
  transform: translateY(20px);
}

.void-fade-leave-to {
  opacity: 0;
  filter: blur(20px);
  transform: translateY(-10px);
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
}

.main-content {
  flex: 1;
  padding: var(--app-padding-y) var(--app-padding-x) 4rem;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: var(--bg-color);
}
::-webkit-scrollbar-thumb {
  background: #111;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--accent-color);
}
</style>

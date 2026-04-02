<script setup lang="ts">
import { useGeolocation, useShare } from '@vueuse/core'
import { useDeviceStore } from '@/stores/device'
import Button from 'primevue/button'
import Card from 'primevue/card'
import api from '@/services/api'
import { onMounted } from 'vue'

const deviceStore = useDeviceStore()
const { coords, locatedAt, error, resume } = useGeolocation()
const { share, isSupported: isShareSupported } = useShare()

const sendNotification = () => {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('VOID_ALERT', {
          body: 'Subsystem signal received.',
          icon: '/favicon.svg'
        })
        deviceStore.incrementNotifications()
      }
    })
  }
}

const handleShare = async () => {
  try {
    await share({
      title: 'V_VOID',
      text: 'Synchronizing with the void.',
      url: window.location.href,
    })
  } catch (err) {
    console.error('Share failed', err)
  }
}

const fetchAlerts = async () => {
  try {
    const response = await api.get('/alerts')
    if (response.data.count !== undefined) {
      deviceStore.notificationCount = response.data.count
    }
  } catch (err) {
    deviceStore.incrementNotifications()
  }
}

onMounted(() => {
  fetchAlerts()
})
</script>

<template>
  <div class="demo-container">
    <header class="demo-header">
      <span class="category">SYSTEM_RESOURCES</span>
      <h2 class="title">Hardware_Interface</h2>
    </header>

    <div class="void-grid">
      <section class="resource-block">
        <h3 class="block-title">GEOLOCATION_PROTOCOL</h3>
        <div class="data-display">
          <div v-if="coords.latitude !== Infinity" class="coords">
            <div class="data-row">
              <span class="label">LAT</span>
              <span class="value">{{ coords.latitude.toFixed(4) }}</span>
            </div>
            <div class="data-row">
              <span class="label">LNG</span>
              <span class="value">{{ coords.longitude.toFixed(4) }}</span>
            </div>
            <div class="status-msg" v-if="locatedAt">SYNC_OK: {{ new Date(locatedAt).toLocaleTimeString() }}</div>
          </div>
          <div v-else class="status-msg loading">SCANNING_SATELLITES...</div>
        </div>
        <Button label="Re-Sync" icon="pi pi-refresh" @click="resume" class="block-action" />
      </section>

      <section class="resource-block">
        <h3 class="block-title">NETWORK_ALERTS</h3>
        <div class="data-display">
          <div class="notification-status">
            <span class="label">ACTIVE_SIGNALS</span>
            <span class="badge">{{ deviceStore.notificationCount }}</span>
          </div>
        </div>
        <div class="actions-row">
          <Button label="Broadcast" icon="pi pi-bell" @click="sendNotification" class="block-action" />
          <Button label="Fetch" icon="pi pi-cloud-download" @click="fetchAlerts" class="block-action" />
        </div>
      </section>

      <section class="resource-block">
        <h3 class="block-title">DATA_TRANSMISSION</h3>
        <div class="data-display">
          <div class="status-msg" v-if="isShareSupported">PROTOCOL_SUPPORTED: WEB_SHARE_V1</div>
          <div class="status-msg error" v-else>PROTOCOL_NOT_FOUND</div>
        </div>
        <Button 
          label="Initialize Share" 
          icon="pi pi-share-alt" 
          @click="handleShare" 
          :disabled="!isShareSupported"
          class="block-action"
        />
      </section>
      
      <section class="resource-block full-width">
        <h3 class="block-title">HAPTIC_INTERFACE_TEST</h3>
        <div 
          class="touch-zone"
          v-on:touchstart="deviceStore.incrementNotifications()"
        >
          <span class="scanner-line"></span>
          PLACE_FINGER_FOR_HAPTIC_SCAN
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.demo-header { margin-bottom: 5rem; }
.category { font-family: var(--font-mono); color: var(--accent-color); font-size: 0.7rem; letter-spacing: 0.3em; }
.title { font-size: 3.5rem; margin-top: 0.5rem; }

.void-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem;
}

.resource-block {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #111;
}

.resource-block.full-width { grid-column: 1 / -1; }

.block-title {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-secondary);
  letter-spacing: 0.2em;
}

.data-display { min-height: 80px; display: flex; flex-direction: column; justify-content: center; }

.data-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.label { font-family: var(--font-mono); font-size: 0.6rem; color: #444; }
.value { font-family: var(--font-mono); font-size: 1.2rem; color: var(--text-primary); }

.status-msg {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: #444;
  margin-top: 1rem;
}

.status-msg.loading { color: var(--accent-color); animation: pulse 2s infinite; }

.badge {
  font-family: var(--font-mono);
  font-size: 2rem;
  color: var(--accent-color);
  text-shadow: 0 0 15px var(--accent-glow);
}

.notification-status {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.actions-row { display: flex; gap: 1rem; }

:deep(.p-button) {
  background: transparent !important;
  border: 1px solid #222 !important;
  border-radius: 0 !important;
  color: var(--text-secondary) !important;
  font-family: var(--font-mono);
  font-size: 0.65rem !important;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.8rem 1.5rem !important;
  transition: all 0.4s ease;
}

:deep(.p-button:hover) {
  border-color: var(--accent-color) !important;
  color: var(--text-primary) !important;
  box-shadow: 0 0 15px var(--accent-glow) !important;
}

.touch-zone {
  height: 120px;
  border: 1px solid #111;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: #333;
  letter-spacing: 0.2em;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
}

.touch-zone:hover { border-color: #333; color: #666; }

.scanner-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--accent-color);
  box-shadow: 0 0 10px var(--accent-glow);
  animation: scan 4s linear infinite;
  opacity: 0.3;
}

@keyframes scan {
  0% { transform: translateY(0); }
  100% { transform: translateY(120px); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
</style>

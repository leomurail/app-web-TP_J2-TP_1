<script setup lang="ts">
import { useGeolocation, useShare } from '@vueuse/core'
import { useDeviceStore } from '@/stores/device'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import api from '@/services/api'
import { onMounted, ref } from 'vue'

const deviceStore = useDeviceStore()
const toast = useToast()
const { coords, locatedAt, resume, error: geoError } = useGeolocation()
const { share, isSupported: isShareSupported } = useShare()

// Haptic Scan State
const isHapticScanning = ref(false)
const scanProgress = ref(0)
let scanInterval: any = null

const startHapticScan = () => {
  isHapticScanning.value = true
  scanProgress.value = 0
  scanInterval = setInterval(() => {
    if (scanProgress.value < 100) {
      scanProgress.value += 2
    } else {
      clearInterval(scanInterval)
      deviceStore.incrementNotifications()
      completeScan()
    }
  }, 30)
}

const stopHapticScan = () => {
  isHapticScanning.value = false
  scanProgress.value = 0
  clearInterval(scanInterval)
}

const completeScan = () => {
  setTimeout(() => {
    isHapticScanning.value = false
    scanProgress.value = 0
  }, 1000)
}

const resetGeoProtocol = () => {
  // We can't force the browser to show the prompt again if it's denied
  // but we can re-trigger the resume call which might trigger it if state changed
  resume()
}

const sendNotification = () => {
  // PrimeVue In-App Toast
  toast.add({
    severity: 'info',
    summary: 'Signal Broadcast',
    detail: 'System signal sent successfully to the grid.',
    life: 3000,
  })

  // Counter always increments
  deviceStore.incrementNotifications()

  // Native Browser Notification
  if ('Notification' in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification('Void Alert', {
          body: 'System synchronization successful.',
          icon: '/favicon.svg',
        })
      }
    })
  }
}

const handleShare = async () => {
  try {
    await share({
      title: 'Void Interface',
      text: 'Synchronizing with the void.',
      url: window.location.href,
    })
  } catch (err) {
    console.error('Share failed', err)
  }
}

const fetchAlerts = async () => {
  deviceStore.syncStart()
  try {
    const response = await api.get('/alerts')
    if (response.data && response.data.count !== undefined) {
      deviceStore.setMockMode(false)
      deviceStore.syncSuccess(response.data.count)
    } else {
      deviceStore.syncFailure('Invalid API response format')
    }
  } catch (err: any) {
    if (err.response?.status === 404 || err.code === 'ERR_NETWORK') {
      // Trigger Mock Mode fallback for demo purposes
      deviceStore.setMockMode(true)
      setTimeout(() => {
        const mockCount = Math.floor(Math.random() * 10) + 1
        deviceStore.syncSuccess(deviceStore.notificationCount + mockCount)
      }, 800)
      return
    }
    
    const message = err.response?.data?.message || err.message || 'Unable to connect to service'
    deviceStore.syncFailure(message)
  }
}

onMounted(() => {
  fetchAlerts()
})
</script>

<template>
  <div class="demo-container">
    <header class="demo-header">
      <span class="category">System Resources</span>
      <h2 class="title">Hardware Interface</h2>
    </header>

    <div class="void-grid">
      <!-- Geolocation Block -->
      <section class="resource-block">
        <h3 class="block-title">Geolocation Protocol</h3>
        <div class="data-display">
          <!-- State: Waiting for Permission/Access -->
          <div v-if="coords.latitude === Infinity && !geoError" class="status-box">
            <p class="status-msg highlight">Waiting for Access</p>
            <Button label="Initialize GPS" icon="pi pi-compass" @click="resume" class="mini-btn" />
          </div>

          <!-- State: Denied (UX Friendly) -->
          <div v-else-if="geoError" class="status-box error">
            <p class="status-msg urgent">Permission Denied</p>
            <p class="error-detail">L'accès à la géolocalisation a été bloqué. Pour réinitialiser : cliquez sur l'icône de réglages (curseurs ou cadenas) à gauche de l'URL, puis réinitialisez l'autorisation de localisation.</p>
            <Button label="Réessayer" severity="danger" icon="pi pi-refresh" @click="resetGeoProtocol" class="mini-btn danger" />
          </div>

          <!-- State: Active -->
          <div v-else class="coords">
            <div class="data-row">
              <span class="label">Latitude</span>
              <span class="value">{{ coords.latitude.toFixed(6) }}</span>
            </div>
            <div class="data-row">
              <span class="label">Longitude</span>
              <span class="value">{{ coords.longitude.toFixed(6) }}</span>
            </div>
            <div class="status-msg success" v-if="locatedAt">
              <span class="pulse-dot"></span> Sync Active
            </div>
          </div>
        </div>
      </section>

      <!-- Network Alerts Block -->
      <section class="resource-block">
        <h3 class="block-title">System Alerts</h3>
        <div class="data-display">
          <div class="notification-status">
            <div class="alert-counter">
              <span class="counter-label">Active Signals</span>
              <span class="counter-value">{{ deviceStore.notificationCount }}</span>
            </div>
          </div>
          <div v-if="deviceStore.apiError" class="status-msg error mt-2">
            System: {{ deviceStore.apiError }}
          </div>
          <div v-else-if="deviceStore.isMockMode" class="status-msg highlight mt-2">
            <span class="pulse-dot"></span> System: Mock Mode Active (Local Sync)
          </div>
        </div>
        <div class="actions-row">
          <Button label="Broadcast" icon="pi pi-bell" @click="sendNotification" class="block-action" />
          <Button 
            label="Sync API" 
            :icon="deviceStore.isApiSyncing ? 'pi pi-spin pi-spinner' : 'pi pi-refresh'" 
            @click="fetchAlerts" 
            :disabled="deviceStore.isApiSyncing"
            class="block-action" 
          />
        </div>
      </section>

      <!-- Web Share Block -->
      <section class="resource-block">
        <h3 class="block-title">Data Transfer</h3>
        <div class="data-display">
          <div class="status-msg highlight" v-if="isShareSupported">System: Web Share Ready</div>
          <div class="status-msg error" v-else>System: Protocol Unsupported</div>
        </div>
        <Button 
          label="Initialize Share" 
          icon="pi pi-external-link" 
          @click="handleShare" 
          :disabled="!isShareSupported"
          class="block-action"
        />
      </section>
      
      <!-- Haptic Scan Block -->
      <section class="resource-block full-width">
        <h3 class="block-title">Haptic Authentication Test</h3>
        <div 
          class="touch-zone"
          :class="{ scanning: isHapticScanning, complete: scanProgress === 100 }"
          @mousedown="startHapticScan"
          @mouseup="stopHapticScan"
          @mouseleave="stopHapticScan"
          @touchstart.prevent="startHapticScan"
          @touchend.prevent="stopHapticScan"
        >
          <div class="scan-overlay" :style="{ width: scanProgress + '%' }"></div>
          <span class="scanner-line" v-if="isHapticScanning"></span>
          
          <div class="scan-label">
            <template v-if="scanProgress === 100">Access Granted</template>
            <template v-else-if="isHapticScanning">Scanning Identity ({{ scanProgress }}%)</template>
            <template v-else>Hold to Initialize Haptic Scan</template>
          </div>
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
  color: #888; /* Increased Contrast */
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.data-display { min-height: 120px; display: flex; flex-direction: column; justify-content: center; }

.status-box { display: flex; flex-direction: column; gap: 1.5rem; align-items: flex-start; }
.status-box.error { color: #ff3366; }
.error-detail { font-size: 0.8rem; color: #a0a0a0; font-family: var(--font-main); line-height: 1.5; }

.data-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.8rem;
}

.label { font-family: var(--font-mono); font-size: 0.65rem; color: #666; text-transform: uppercase; letter-spacing: 0.1em; }
.value { font-family: var(--font-mono); font-size: 1.3rem; color: var(--text-primary); }

.status-msg {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: #888;
}

.status-msg.highlight { color: #ccc; }
.status-msg.urgent { color: #ff3366; font-weight: bold; letter-spacing: 0.1em; }
.status-msg.success { color: var(--accent-color); display: flex; align-items: center; gap: 0.5rem; }

.pulse-dot {
  width: 6px;
  height: 6px;
  background: var(--accent-color);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--accent-glow);
  animation: pulse-dot 1.5s infinite;
}

@keyframes pulse-dot {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

/* Redesigned Alert Counter */
.alert-counter {
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
}

.counter-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  padding-bottom: 0.5rem;
}

.counter-value {
  font-family: var(--font-mono);
  font-size: 4rem;
  line-height: 1;
  color: var(--accent-color);
  text-shadow: 0 0 20px var(--accent-glow);
  font-weight: bold;
}

.actions-row { display: flex; gap: 1rem; }

:deep(.p-button) {
  background: transparent !important;
  border: 1px solid #333 !important;
  border-radius: 0 !important;
  color: #aaa !important;
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

.mini-btn { padding: 0.6rem 1.2rem !important; font-size: 0.65rem !important; border-color: #888 !important; color: #ccc !important; }
.mini-btn.danger { border-color: #ff3366 !important; color: #ff3366 !important; }
.mini-btn.danger:hover { background: rgba(255, 51, 102, 0.1) !important; box-shadow: 0 0 20px rgba(255, 51, 102, 0.3) !important; }

/* Haptic Scanner Styling */
.touch-zone {
  height: 140px;
  border: 1px solid #222;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: #666;
  letter-spacing: 0.2em;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  transition: all 0.4s ease;
}

.touch-zone:hover { border-color: #888; color: #aaa; }
.touch-zone.scanning { border-color: var(--accent-color); color: var(--text-primary); }
.touch-zone.complete { border-color: #42b883; color: #42b883; }

.scan-overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(0, 240, 255, 0.05);
  transition: width 0.1s linear;
}

.touch-zone.complete .scan-overlay {
  background: rgba(66, 184, 131, 0.1);
  width: 100% !important;
}

.scanner-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--accent-color);
  box-shadow: 0 0 20px var(--accent-glow);
  animation: scan-move 2s ease-in-out infinite;
  z-index: 2;
}

@keyframes scan-move {
  0% { transform: translateY(0); }
  50% { transform: translateY(138px); }
  100% { transform: translateY(0); }
}

.scan-label { z-index: 3; position: relative; }
</style>

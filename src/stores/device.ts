import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDeviceStore = defineStore('device', () => {
  const geolocation = ref<{ lat: number; lng: number } | null>(null)
  const notificationCount = ref(0)
  const storageStatus = ref(true)
  const isApiSyncing = ref(false)
  const apiError = ref<string | null>(null)
  const isMockMode = ref(false)

  const updateGeolocation = (lat: number, lng: number) => {
    geolocation.value = { lat, lng }
  }

  const incrementNotifications = () => {
    notificationCount.value++
  }

  const syncStart = () => {
    isApiSyncing.value = true
    apiError.value = null
  }

  const syncSuccess = (count: number) => {
    notificationCount.value = count
    isApiSyncing.value = false
    apiError.value = null
  }

  const syncFailure = (error: string) => {
    isApiSyncing.value = false
    apiError.value = error
  }

  const setMockMode = (active: boolean) => {
    isMockMode.value = active
  }

  return {
    geolocation,
    notificationCount,
    storageStatus,
    isApiSyncing,
    apiError,
    isMockMode,
    updateGeolocation,
    incrementNotifications,
    syncStart,
    syncSuccess,
    syncFailure,
    setMockMode,
  }
})

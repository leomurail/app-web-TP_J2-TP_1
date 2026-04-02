import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDeviceStore = defineStore('device', () => {
  const geolocation = ref<{ lat: number; lng: number } | null>(null)
  const notificationCount = ref(0)
  const storageStatus = ref(true)

  const updateGeolocation = (lat: number, lng: number) => {
    geolocation.value = { lat, lng }
  }

  const incrementNotifications = () => {
    notificationCount.value++
  }

  return {
    geolocation,
    notificationCount,
    storageStatus,
    updateGeolocation,
    incrementNotifications,
  }
})

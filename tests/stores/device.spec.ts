import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDeviceStore } from '@/stores/device'

describe('deviceStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('updates geolocation', () => {
    const store = useDeviceStore()
    store.updateGeolocation(48.8566, 2.3522)
    expect(store.geolocation).toEqual({ lat: 48.8566, lng: 2.3522 })
  })

  it('increments notifications', () => {
    const store = useDeviceStore()
    expect(store.notificationCount).toBe(0)
    store.incrementNotifications()
    expect(store.notificationCount).toBe(1)
  })
})

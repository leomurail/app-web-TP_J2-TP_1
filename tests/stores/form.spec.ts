import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFormStore } from '@/stores/form'

describe('formStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('initializes with default values', () => {
    const store = useFormStore()
    expect(store.currentStep).toBe(0)
    expect(store.userData.name).toBe('')
  })

  it('persists data to localStorage', () => {
    const store = useFormStore()
    store.userData.name = 'John Doe'
    store.currentStep = 1
    
    // Create new store instance to simulate reload
    const store2 = useFormStore()
    expect(store2.userData.name).toBe('John Doe')
    expect(store2.currentStep).toBe(1)
  })

  it('resets correctly', () => {
    const store = useFormStore()
    store.userData.name = 'John Doe'
    store.currentStep = 1
    store.resetForm()
    
    expect(store.userData.name).toBe('')
    expect(store.currentStep).toBe(0)
  })
})

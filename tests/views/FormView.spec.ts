import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FormView from '@/views/FormView.vue'
import { createPinia, setActivePinia } from 'pinia'
import PrimeVue from 'primevue/config'

describe('FormView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly', () => {
    const wrapper = mount(FormView, {
      global: {
        plugins: [PrimeVue],
      },
    })
    expect(wrapper.exists()).toBe(true)
  })
})

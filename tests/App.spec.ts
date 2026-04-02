import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
})

describe('App.vue', () => {
  it('contains the transition element with name fade', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router, createPinia(), PrimeVue],
        stubs: ['NavBar']
      },
    })
    
    expect(wrapper.find('transition-stub').exists()).toBe(true)
    expect(wrapper.find('transition-stub').attributes('name')).toBe('fade')
  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const routes = [
  { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
  { path: '/about', name: 'about', component: { template: '<div>About</div>' } },
  { path: '/form', name: 'form', component: { template: '<div>Form</div>' } },
  { path: '/demo', name: 'demo', component: { template: '<div>Demo</div>' } },
]

describe('NavBar.vue', () => {
  it('renders all navigation links', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes,
    })
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router],
      },
    })
    
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('About')
    expect(wrapper.text()).toContain('Form')
    expect(wrapper.text()).toContain('Demo')
  })

  it('has correct links', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes,
    })
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router],
      },
    })
    
    const links = wrapper.findAllComponents({ name: 'RouterLink' })
    expect(links.some(l => l.props().to === '/about')).toBe(true)
    expect(links.some(l => l.props().to === '/form')).toBe(true)
  })
})

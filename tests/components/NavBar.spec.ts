import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NavBar from '@/components/NavBar.vue'

// Mock vue-router
vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({ path: '/' })),
}))

describe('NavBar.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          'router-link': true,
          'MobileMenu': true,
        },
      },
    })
    expect(wrapper.find('.navbar-brand').text()).toBe('V_VOID')
    expect(wrapper.findAll('.nav-link')).toHaveLength(4)
  })
})

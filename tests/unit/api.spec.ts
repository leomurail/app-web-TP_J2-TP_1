import { describe, it, expect } from 'vitest'
import api from '@/services/api'

describe('API Service', () => {
  it('should be configured with the correct base URL', () => {
    expect(api.defaults.baseURL).toBe('/api/v1')
  })

  it('should have the correct default headers', () => {
    expect(api.defaults.headers['Content-Type']).toBe('application/json')
  })
})

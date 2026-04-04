import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: Number(process.env.APP_PORT) || 3000,
    allowedHosts: ['dev.app-web.leomurail.fr'],
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.APP_PORT || 3000}`,
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})

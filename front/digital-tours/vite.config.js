import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["jwt-decode"]
  },
  server: {
    proxy: {
      '/digitaltours/api': 'http://34.229.166.90:8080',
    }
  }
})

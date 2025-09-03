import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      "/task": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/user": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    }
  }
})

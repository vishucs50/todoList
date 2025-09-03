import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      "/task": {
        target: "https://todolist-1-snqc.onrender.com",
        changeOrigin: true,
        secure: false,
      },
      "/user": {
        target: "https://todolist-1-snqc.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    }
  }
})

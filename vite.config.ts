/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  server: {
    host: '0.0.0.0', // 👈 Permite acceso desde IP externa
    port: 5173, // Puerto por defecto de Vite
    https: {
      key: fs.readFileSync('./server-key.pem'),
      cert: fs.readFileSync('./server-cert.pem'),
    }
  }
})

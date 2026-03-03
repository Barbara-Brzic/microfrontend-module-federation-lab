import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      federation({
        name: 'orders',
        filename: 'remoteEntry.js',
        exposes: {
          './OrdersApp': './src/OrdersApp.ts',
        },
        shared: [],
      })
  ],
  server: {
    port: 3002
  },
  preview: {
    port: 3002
  },
  build: {
    target: 'esnext'
  }
})

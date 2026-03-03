import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      federation({
        name: 'dashboard',
        remotes: {
          products: 'http://localhost:3001/assets/remoteEntry.js',
          orders: 'http://localhost:3002/assets/remoteEntry.js'
        },
        shared: ['react', 'react-dom'],
      })
  ],
})

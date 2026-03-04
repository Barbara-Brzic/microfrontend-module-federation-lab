import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      federation({
        name: 'products',
        filename: 'remoteEntry.js',
        exposes: {
          './ProductsApp': './src/ProductsApp.tsx',
        },
        shared: ['react', 'react-dom'],
      })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3001
  },
  preview: {
    port: 3001
  },
  build: {
    target: 'esnext'
  }
})

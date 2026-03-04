import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'ui',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/ui/button.tsx',
        './Card': './src/components/ui/card.tsx',
        './Spinner': './src/components/ui/spinner.tsx',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.2.0',
        } as any,
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.2.0',
        } as any,
      },
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3003
  },
  preview: {
    port: 3003
  },
  build: {
    target: 'esnext'
  }
})

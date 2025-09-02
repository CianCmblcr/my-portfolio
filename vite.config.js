import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // 1. Import the path module

export default defineConfig({
  plugins: [
    react(), 
    // 2. Add an options object with the config key
    tailwindcss({
      config: path.resolve(__dirname, 'tailwind.config.js')
    }),
  ],
})
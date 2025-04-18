import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const __dirname = path.resolve()

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api/youtube': {
        target: 'https://www.googleapis.com/youtube/v3',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/youtube/, ''),
      },
    },
  },
})

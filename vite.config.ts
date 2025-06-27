import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/brian-blog/', // Change this to match your repository name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['gray-matter', 'marked', 'buffer']
  },
  resolve: {
    alias: {
      buffer: 'buffer'
    }
  },
  assetsInclude: ['**/*.md']
})

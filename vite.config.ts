
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Importer conditionnellement le componentTagger pour éviter les problèmes lors du build
const loadTagger = () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      // Utilisation de import() dynamique pour éviter les problèmes avec ESM
      return import('lovable-tagger').then(module => module.componentTagger)
    } catch (e) {
      console.warn('Failed to load lovable-tagger:', e)
      return null
    }
  }
  return null
}

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  // Chargement conditionnel du tagger
  const taggerPromise = mode === 'development' ? loadTagger() : Promise.resolve(null)
  const componentTagger = await taggerPromise

  return {
    plugins: [
      react(),
      mode === 'development' && componentTagger,
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: "::",
      port: 8080
    },
    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'supabase-vendor': ['@supabase/supabase-js'],
            'query-vendor': ['@tanstack/react-query']
          }
        }
      },
      // Add TypeScript options to prevent build errors related to tsconfig references
      commonjsOptions: {
        transformMixedEsModules: true
      }
    }
  }
})

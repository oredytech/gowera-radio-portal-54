
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { ConfigEnv, UserConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [
      react(),
      // Only load lovable-tagger in development mode and ensure it's not imported in production
      mode === 'development' && (() => {
        try {
          // Dynamic import to avoid ESM vs CommonJS issues
          return require('lovable-tagger').componentTagger()
        } catch (e) {
          console.warn('Failed to load lovable-tagger:', e)
          return null
        }
      })(),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: "::",
      port: 8080,
      allowedHosts: [
        'localhost',
        'e213c281-cc16-4240-86e0-2430e5e7f74d.lovableproject.com'
      ]
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
      // Skip TypeScript checking during build to avoid tsconfig reference issues
      minify: true,
      target: 'es2018'
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: ['lovable-tagger']
    },
    // Add esbuild options to handle TypeScript better
    esbuild: {
      logOverride: {
        'this-is-undefined-in-esm': 'silent'
      }
    }
  }
})

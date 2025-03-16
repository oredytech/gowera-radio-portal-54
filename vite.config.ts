
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { ConfigEnv, UserConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }: ConfigEnv): Promise<UserConfig> => {
  // Conditional import to avoid issues during build
  let componentTagger = null
  if (mode === 'development') {
    try {
      const tagger = await import('lovable-tagger')
      componentTagger = tagger.componentTagger
    } catch (e) {
      console.warn('Failed to load lovable-tagger:', e)
    }
  }

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
      // Enhanced TypeScript options to prevent build errors related to tsconfig references
      commonjsOptions: {
        transformMixedEsModules: true
      },
      // Skip TypeScript checking during build to avoid tsconfig reference issues
      // We rely on the IDE and development environment for type checking
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

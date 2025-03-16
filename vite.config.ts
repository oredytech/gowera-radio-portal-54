
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { ConfigEnv, UserConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [
      react(),
      // Exclude lovable-tagger completely in production mode
      mode === 'development' ? {
        name: 'lovable-tagger-plugin',
        apply: 'serve',
        enforce: 'pre',
        // Plugin without requiring the actual package
      } : null,
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

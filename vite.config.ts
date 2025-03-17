
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Only use lovable-tagger in development mode, never in production
    ...(mode === 'development' 
      ? [{
          name: 'lovable-tagger-plugin',
          apply: 'serve',
          enforce: 'post',
          transform(code, id) {
            // Safely try to use the tagger only in development
            try {
              if (typeof window === 'undefined') {
                // Dynamically import the tagger only in dev
                const componentTagger = require('lovable-tagger')?.componentTagger;
                if (componentTagger) {
                  return componentTagger().transform?.(code, id) || code;
                }
              }
              return code;
            } catch (error) {
              console.warn('Failed to load lovable-tagger:', error);
              return code;
            }
          }
        }] 
      : [])
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

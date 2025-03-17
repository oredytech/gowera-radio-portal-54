
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
    mode === 'development' && {
      name: 'lovable-tagger-plugin',
      apply: 'serve',
      enforce: 'post' as const,
      transform(code, id) {
        if (mode === 'development' && typeof window !== 'undefined') {
          try {
            // Only attempt to use the tagger in development mode
            const componentTagger = require('lovable-tagger').componentTagger;
            return componentTagger().transform?.(code, id) || code;
          } catch (error) {
            console.warn('Failed to load lovable-tagger:', error);
            return code;
          }
        }
        return code;
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

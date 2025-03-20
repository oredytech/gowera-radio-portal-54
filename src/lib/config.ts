
// Environment configuration
interface EnvConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

// Default development config
const config: EnvConfig = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key',
};

export default config;


import { createClient } from '@supabase/supabase-js';
import config from './config';

// Initialize the Supabase client
export const supabase = createClient(
  config.supabaseUrl,
  config.supabaseAnonKey
);

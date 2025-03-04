
import { createClient } from '@supabase/supabase-js'

// Créez les variables d'environnement dans un fichier .env.local
// Remplacez ces valeurs par vos propres clés d'API Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

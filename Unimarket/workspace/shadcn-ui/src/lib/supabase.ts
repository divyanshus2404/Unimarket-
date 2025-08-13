import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database initialization SQL
export const initializeDatabase = async () => {
  const { error } = await supabase.rpc('initialize_marketplace_db');
  if (error) {
    console.error('Error initializing database:', error);
  }
};
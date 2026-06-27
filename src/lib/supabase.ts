import { createClient } from "@supabase/supabase-js";

// Uses process.env in Next.js/Node/Netlify SSR, but import.meta.env in Vite client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_URL : undefined) || "https://your-project.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_ANON_KEY : undefined) || "your-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

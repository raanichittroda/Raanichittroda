import { createClient } from "@supabase/supabase-js";

// Uses process.env in Next.js/Node/Netlify SSR, but import.meta.env in Vite client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_URL : undefined) || "https://your-project.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_ANON_KEY : undefined) || "your-anon-key";

// Polyfill WebSocket on server to prevent Supabase Realtime from crashing on older Node versions (like Node <22)
if (typeof window === "undefined" && !globalThis.WebSocket) {
  class DummyWebSocket {
    static CONNECTING = 0;
    static OPEN = 1;
    static CLOSING = 2;
    static CLOSED = 3;
    readyState = 3;
    constructor() {}
    close() {}
    send() {}
  }
  globalThis.WebSocket = DummyWebSocket as any;
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://fxwyodgchykwavfyrbxo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4d3lvZGdjaHlrd2F2ZnlyYnhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NDk5MzksImV4cCI6MjA1ODQyNTkzOX0.U2rSRaip3uv07-u0EB4skPcC8iTLQkgxgcpQx4iNPIQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

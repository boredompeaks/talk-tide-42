// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rgeynlfxtvyxxhortohj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnZXlubGZ4dHZ5eHhob3J0b2hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzNzY0MzgsImV4cCI6MjA1MDk1MjQzOH0.WpKprh7GY01Nk0QxStXRmn7w-ydH1VEjXDg7bXbAsk8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
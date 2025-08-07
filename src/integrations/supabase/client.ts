import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://casroknzdishifjrwkit.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhc3Jva256ZGlzaGlmanJ3a2l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzODc0NzUsImV4cCI6MjA2OTk2MzQ3NX0.JUcrit1iBoD6FkPRz6Ua1BctZPul8QefG3-fONKO_K0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jvuruwkqtjztikmckeyz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2dXJ1d2txdGp6dGlrbWNrZXl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NjE3MTgsImV4cCI6MjA2OTUzNzcxOH0.LvtBrh5GcE0v8QNCTaxscy33nLFmYCix0clk6adQ8L4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

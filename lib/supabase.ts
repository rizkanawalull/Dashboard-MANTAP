import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// PASTIKAN ADA KATA 'export' DI BAWAH INI
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
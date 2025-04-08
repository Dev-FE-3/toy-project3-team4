import { createClient } from '@supabase/supabase-js'

const SUPABASEURL = import.meta.env.VITE_SUPABASE_URL
const SUPABASEKEY = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient(SUPABASEURL, SUPABASEKEY)

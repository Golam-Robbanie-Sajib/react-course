// filepath: lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '../database.types'

// By creating the client here and exporting the instance, we ensure
// that every part of our application uses the exact same client object.
// This is known as a "singleton" pattern.
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
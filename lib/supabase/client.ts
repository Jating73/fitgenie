import { createBrowserClient } from '@supabase/ssr'

/**
 * Browser-side Supabase client.
 * Call this inside Client Components ('use client') and event handlers.
 * Reads NEXT_PUBLIC_ env vars so they are bundled into the client build.
 */
export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
}
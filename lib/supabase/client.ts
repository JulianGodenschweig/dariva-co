import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client (Client Components).
 * Uses the PUBLIC anon/publishable key only — never the service_role key here.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client — BRIEF.md §10.
 *
 * Uses the ANON key and relies on RLS. The four lead-capture tables grant anon
 * INSERT and nothing else, so this client physically cannot read a row back
 * even if a bug asked it to.
 *
 * `@supabase/ssr`, not `@supabase/auth-helpers-nextjs` — the latter is
 * deprecated.
 *
 * The service-role key is not used anywhere in this app. There is nothing here
 * that needs to bypass RLS. If that ever changes, the rule is: plain
 * `createClient` with `auth: { persistSession: false, autoRefreshToken: false }`,
 * never an SSR cookie client, and never in a component that ships to a browser.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Called from a Server Component render, where cookies are
            // read-only. Harmless here: these forms hold no session.
          }
        },
      },
    },
  );
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing ${name}. Set it in .env.local locally and in the Netlify site environment for deploys.`,
    );
  }
  return value;
}

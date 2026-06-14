import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase auth session on each request and keeps the auth
 * cookies in sync between the browser and the server.
 *
 * Step 2: refresh ONLY — no route gating yet.
 * Step 3 will add the approval/role gate (block unapproved users from
 * /courses, non-lecturers from /admin, redirect to /pending) where marked.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: do not run code between createServerClient and getUser().
  // getUser() revalidates the token and drives the cookie refresh above.
  await supabase.auth.getUser();

  // ── Step 3 will add the gate here ──────────────────────────────────────────
  // (e.g. send unauthenticated users away from /courses & /admin, and
  //  unapproved users to /pending). Intentionally left open in Step 2.

  return supabaseResponse;
}

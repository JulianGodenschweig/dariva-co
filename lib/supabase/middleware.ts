import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Routes that require a signed-in user.
const PROTECTED = ["/account", "/courses", "/admin", "/pending"];

function isUnder(path: string, base: string) {
  return path === base || path.startsWith(base + "/");
}

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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const needsAuth = PROTECTED.some((base) => isUnder(path, base));

  // Public routes (marketing, /login, /signup): just refresh the session.
  if (!needsAuth) return supabaseResponse;

  // Protected route, not signed in → login.
  if (!user) return redirectTo(request, supabaseResponse, "/login");

  // Signed in → check role + approval (RLS lets a user read their own row).
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, approved")
    .eq("id", user.id)
    .single();

  const isLecturer = profile?.role === "lecturer";
  const isApproved = !!profile?.approved;

  // /admin → lecturers only.
  if (isUnder(path, "/admin") && !isLecturer) {
    return redirectTo(request, supabaseResponse, "/account");
  }

  // /courses → approved students or lecturers; otherwise wait for approval.
  if (isUnder(path, "/courses") && !isApproved && !isLecturer) {
    return redirectTo(request, supabaseResponse, "/pending");
  }

  // /pending → if already cleared, no reason to sit here.
  if (isUnder(path, "/pending") && (isApproved || isLecturer)) {
    return redirectTo(request, supabaseResponse, "/account");
  }

  return supabaseResponse;
}

/** Redirect while preserving any auth cookies refreshed on `base`. */
function redirectTo(request: NextRequest, base: NextResponse, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  const res = NextResponse.redirect(url);
  base.cookies.getAll().forEach((cookie) => res.cookies.set(cookie));
  return res;
}

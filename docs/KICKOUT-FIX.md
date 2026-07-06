# "Thrown out of the portal" — session kick-out fix

Reported 2026-07-05 evening via WhatsApp, during a live-class enrollment
window: students and lecturers were getting bounced back to `/login` after
roughly 3 minutes of being signed in ("3 minutes and it threw me out"),
multiple users affected at once.

## Symptom

Signed-in users (students on `/courses`, lecturers on `/admin`) would
suddenly lose their session and land back on `/login`, ~3 minutes after
signing in. Worse under load (many people online at once, e.g. enrolling for
a live class).

## Root cause

`lib/supabase/middleware.ts` (`updateSession`) called `supabase.auth.getUser()`
**unconditionally on every request that matched the middleware**, before
checking whether the route even needed auth — including the public
marketing pages, `/login`, `/signup`, and `/api/*`. The middleware matcher in
`middleware.ts` is intentionally broad (everything except static assets), so
in practice this meant *every* request run through the app called `getUser()`.

`getUser()` is the call that revalidates/refreshes the session; when the
access token is due for a refresh it redeems the current refresh token for a
new one. The problem is concurrency: Next.js's `<Link>` component fires a
background *prefetch* request for every link that scrolls into view, and
`Navbar` (rendered on every page via `app/layout.tsx`, protected LMS pages
included) has 5 nav links + "My Account"/"Log in" + "Apply Now" all visible
above the fold, plus `app/courses/page.tsx` rendered a grid of course cards
(`app/courses/page.tsx:105-141`) as plain `<Link>`s with prefetch left on its
default. Loading one portal page could therefore fire off several
*simultaneous* prefetch requests, each an independent middleware invocation
(no shared memory between them on Vercel), each calling `getUser()` at
roughly the same moment.

When the access token happened to be in its refresh window, several of these
concurrent invocations would try to redeem the **same** refresh token at
once. Supabase's refresh-token rotation treats near-simultaneous redemption
of the same token outside its short grace window as reuse/replay and revokes
the whole session as a security measure — which is exactly what surfaced to
users as being "thrown out." The ~3 minute cadence matches how often that
refresh window recurred (see the dashboard note below); the "multiple users,
worse during the enrollment rush" pattern matches concurrency (more
simultaneous users/navigations = more simultaneous prefetch storms = more
chances to hit the race), not a fixed per-user timer — there is no
`setTimeout`/`setInterval`/idle-logout code anywhere in this app.

(We initially suspected we could special-case Next.js's prefetch requests
in the middleware by checking the `next-router-prefetch` header, per the
older, commonly-cited fix for this exact class of bug. Verified against the
installed Next.js 16.2.9 docs bundled in `node_modules/next` — that header
is now deliberately stripped from `request.headers` inside
`middleware`/`proxy` specifically to stop this kind of differential
handling, so that approach is a dead end on this Next.js version. Fixed at
the source instead — see below.)

## Fix

Two small, targeted changes — no dashboard/config assumptions required:

1. **`lib/supabase/middleware.ts`** — moved the `needsAuth` route check to
   the top of `updateSession()` and return immediately for any route that
   isn't under `/account`, `/courses`, `/admin`, or `/pending`, *before*
   creating the Supabase client or calling `getUser()`. Public pages
   (marketing site, `/login`, `/signup`, `/api/*`) no longer touch Supabase
   auth at all in the middleware, so none of their prefetch traffic can ever
   trigger a refresh call. This is the structural fix — it applies
   site-wide, on every page, not just one route.

2. **`app/courses/page.tsx`** — added `prefetch={false}` to the per-course
   `<Link>` in the course grid. This was the one remaining spot where
   several `<Link>`s to *protected* routes (`/courses/[slug]`, which do
   still hit the auth check) render together on one page, so it's the last
   concentrated source of concurrent protected-route prefetches. The list
   currently has 3 courses (`lib/courses.ts`) but is not bounded, so this
   also prevents the exposure from growing as more courses are added.

Nothing else in the auth flow needed to change — the cookie-forwarding
pattern in `updateSession()` (writing refreshed cookies onto both the
request and the returned response) already matched the `@supabase/ssr`
reference implementation, the browser client (`lib/supabase/client.ts`) is
correctly deduped to a single instance in the browser by `@supabase/ssr`
0.12.0's internal singleton cache (verified in
`node_modules/@supabase/ssr/dist/main/createBrowserClient.js`), and there is
no app code that signs users out or redirects to `/login` on a whim.

## How verified

- `npm run build` passes cleanly on Next.js 16.2.9 / Turbopack, same route
  output as before the change (`/account`, `/admin`, `/courses`,
  `/courses/[slug]`, `/pending` still listed as `ƒ` dynamic/middleware-gated
  routes; no new type errors).
- Read through every `redirect()`/`signOut()`/`onAuthStateChange` call site
  in `app/` and `components/` — confirmed none of them fire on a transient
  error; each protected page's own `getUser()` check (defense-in-depth,
  independent of middleware) is unchanged.
- Confirmed there is no timer, interval, or short JWT/cookie config
  anywhere in this repo (`grep` across `app/`, `components/`, `lib/`,
  `supabase/sql/*.sql` for `setTimeout`, `setInterval`, `maxAge`,
  `expires_in`, `180`, etc. — nothing relevant).
- Could not reproduce the exact 3-minute revocation against the live
  Supabase project from this environment (out of scope per instructions —
  the remote project was not touched). The fix directly removes the
  mechanism that produces concurrent refresh-token redemption from this
  codebase, which is the only code-level lever available for a
  rotation-reuse revocation.

## Dashboard setting to check (cannot be changed from code)

This isn't something in the repo, but it's worth the owner checking in the
Supabase Dashboard, since it directly controls how *often* the refresh race
window recurs and how forgiving Supabase is of near-simultaneous refreshes:

- **Authentication → Settings → "Access token (JWT) expiry limit"** — the
  Supabase default is 3600 seconds (1 hour). If this has been set to
  something unusually low (e.g. ~180 seconds), that alone doesn't cause a
  hard logout (the app should refresh silently either way), but it makes the
  refresh happen far more often, which is exactly what widens the window for
  the race described above. Recommend setting it back to the default (or at
  least a few thousand seconds) unless there's a specific reason it's short.
- **Authentication → Settings → "Refresh token rotation" → reuse interval**
  — Supabase's default (~10s) tolerates brief, near-simultaneous reuse of
  the same refresh token without revoking the session (this is precisely
  the safety valve for races like the one described here). If this has been
  set to 0 or disabled, any remaining concurrent refresh (e.g. two tabs
  open, or a slow connection retry) will revoke the session immediately
  instead of being tolerated. Recommend leaving it at the default.

Neither of these can be inspected or changed from this codebase (no
`supabase/config.toml` or auth SQL config is checked into this repo — auth
settings here are managed entirely via the hosted dashboard), so they are
called out here for the owner/dev to check directly.

## Pre-existing, unrelated to this bug

`npm run lint` currently fails immediately with `Invalid project directory
provided, no such directory: .../dariva.co/lint` — this is a pre-existing
`next lint` invocation issue, not something introduced by this fix (verified
`package.json`'s `lint` script and this repo's Next.js version were
untouched by these changes).

Separately, `next build` prints `The "middleware" file convention is
deprecated. Please use "proxy" instead.` This repo's `middleware.ts` still
runs correctly under Next.js 16.2.9 (confirmed via build output: `ƒ Proxy
(Middleware)` is present both before and after this fix), so it is not
implicated in this bug — just worth renaming to `proxy.ts` at some point
before Next.js removes the old convention (`npx @next/codemod@canary
middleware-to-proxy .`).

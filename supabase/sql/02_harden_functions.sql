-- ============================================================================
-- Dariva.co LMS — Step 1 hardening (applied as migration `harden_handle_new_user`)
-- ============================================================================
-- handle_new_user() only ever runs from the on_auth_user_created trigger.
-- Postgres fires trigger functions WITHOUT checking EXECUTE on the triggering
-- role, so removing the default PUBLIC grant does not affect signup — it just
-- stops the function being a callable REST endpoint (/rest/v1/rpc/...).
-- Clears Supabase security advisors 0028/0029 for this function.

revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- Note: public.is_lecturer() intentionally REMAINS executable by `authenticated`
-- because the profiles RLS policies call it during evaluation. It only ever
-- reports the CALLER's own lecturer status (via auth.uid()), so it leaks
-- nothing. Supabase advisor 0029 will still flag it — accepted by design.
-- Optional future hardening: move it into a non-exposed `private` schema.

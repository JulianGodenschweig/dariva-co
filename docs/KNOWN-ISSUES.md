# Known issues — pre-existing (logged, deferred)

Captured 2026-06-14 at the start of LMS Phase 1. These are **pre-existing** issues
in the public marketing site. Per client instruction they are **NOT** to be fixed
during the LMS build — handle them after the LMS ships.

1. **Missing `.river-surface` CSS class.** `components/ui.tsx` → `FeatureGrid`
   renders `className="river-surface ..."`, but `.river-surface` is not defined in
   `app/globals.css`. It's used live on `/about`, `/impact`, and `/program`, so
   those feature cards render without their intended surface background/border.
   (Also undefined but only referenced by dead code: `aurora`, `soft-grid`,
   `river-shimmer` in the unused `PageHero`; `surface` in `application-form.tsx`.)

2. **Dead code.** `components/sections/Waitlist.tsx` and
   `components/application-form.tsx` are not imported anywhere.

3. **Stray nested config.** `dariva.co/next.config.ts` (a leftover
   `output: 'export'` config) sits inside the repo and should be removed.

4. **Two styling philosophies + CSS dupes.** Navbar/Footer/Contact/program-pricing
   use heavy inline styles; Hero/sections use Tailwind + framer-motion.
   `app/globals.css` repeats rules (`scroll-behavior` ×3, `body { overflow-x }` ×2,
   `.animate-shimmer` defined twice with conflicting animations).

5. **Duplicated nav source.** Nav links live in both `lib/content.ts` (`navItems`,
   unused) and `components/layout/Navbar.tsx` (`links`). The Formspree endpoint is
   also hardcoded in components instead of reading `NEXT_PUBLIC_FORMSPREE_ENDPOINT`.

# Dariva.co — Mental Wellness Web Application

An immersive, scroll-driven web application for Dariva.co, a Namibian social
enterprise making mental wellness practical, affordable and accessible for
every community.

Content is sourced from *Dariva.co Website Development Content Draft*
(29.07.2026) and lives in a single typed module, `lib/site.ts`, so copy changes
never require touching layout code.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), static export |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS 4 (`@theme` tokens in `app/globals.css`) |
| Motion | Framer Motion 12 |
| Fonts | Sora (display) + Inter (body), self-hosted via `next/font` |

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to ./out
```

## The scroll system

Everything visual is built on four primitives in `components/motion/scroll.tsx`.

**`ZoomHero`** — the signature move. A tall scroll track pins a full-viewport
stage; as you scroll, the photograph recedes from a hard zoom-in (scale 1.85)
back to rest while an animated `clip-path` inset turns the full-bleed frame
into a floating rounded panel. It reads as pulling backwards through the scene
rather than as a slide transition. The headline recedes and fades, and a second
beat (body copy and calls to action) arrives once the first has cleared.

**`DepthImage`** — carries that language through the rest of the page. Each
image eases back from a slight over-scale as it crosses the viewport, so the
zoom-out feeling is continuous rather than a one-off hero trick.

**`ParallaxBand`** — a full-bleed photograph drifting against the scroll, used
to break long text stretches without asking for a click.

**`Reveal`** — IntersectionObserver adds a class, CSS does the animation, so
nothing runs on the main thread until an element is actually on screen.

Two implementation notes worth keeping:

- `Reveal`'s `clip` variant applies its `clip-path` to an **inner** element, not
  the one being observed. IntersectionObserver factors an element's own clip
  into its visible area, so a self-clipped target reports ratio 0 forever and
  can never reveal itself.
- Components that swap markup on `useReducedMotion` gate it behind a `mounted`
  flag (`useCalmMotion`). The media query is unavailable during SSR, so an
  ungated swap hydrates against different HTML than the server sent.

### Reduced motion

`prefers-reduced-motion: reduce` is honoured throughout. The hero drops its
pinning and scroll-linked transforms and lays both content beats out in normal
flow, so nothing the animated version reveals on scroll is lost. Marquees and
drift animations stop; reveals resolve to their final state.

## Application features

Beyond the marketing pages, three parts are genuinely interactive:

**Wellness Check-In** (`/assessment`) — fifteen statements across five
capacities (emotional awareness, stress and resilience, relationships and
communication, purpose and growth, support and connection). Reverse-scored
items are inverted so higher always means greater wellbeing; dimensions are
normalised to 0–100 and banded, and the lowest-scoring dimension drives a
programme recommendation. Results persist to `localStorage` so returning
visitors can compare. Keyboard-driven (keys 1–5).

It is deliberately **not** a clinical instrument. The disclaimer and crisis
signposting in `lib/assessment.ts` are surfaced on both the intro and results
screens, and the copy never frames output as a diagnosis.

**Resource library** (`/resources`) — live search across titles, summaries,
bodies and topics, plus type and topic filters and inline expansion.

**Enquiry form** (`/contact`) — client-side validation, then hands a fully
composed message to the visitor's mail client or WhatsApp. There is no backend,
so the form does not pretend to POST anywhere or show a fake success state.

## Structure

```
app/                      routes (11 pages + dynamic programme detail)
components/
  motion/scroll.tsx       scroll-zoom engine and reveal primitives
  layout/                 navbar, footer
  ui/                     buttons, section shells, page headers
  app/                    assessment, resource library, enquiry form
lib/
  site.ts                 all page content, typed
  assessment.ts           questions, scoring, disclaimers
  resources.ts            resource library data
public/images/            photography
```

## Photography

Free-licence photography from Unsplash, committed to `public/images/`. Each
image was visually reviewed for relevance before selection rather than trusted
by ID. Replacing any file in place with the same name is all that is needed to
swap in Dariva.co's own photography of its actual work — which would be a
meaningful upgrade over stock for an organisation whose credibility rests on
being local.

## Testing

Verified with Playwright across desktop (1440×900) and mobile (390×844):
all 12 routes for status, title, heading and horizontal overflow; the hero
zoom at four scroll depths; a full assessment run through to scored results
plus persistence across reload; resource filtering, search and accordion
expansion; form validation; the mobile drawer; and a reduced-motion pass.
Zero console errors, zero page errors, zero horizontal overflow.

# Dariva.co — Design Plan

Written before component code, per BRIEF.md §6. Section 5 is the self-critique
and section 6 records what the critique changed.

---

## 1. Palette — measured, not chosen

Sampled from the logo files with `tools-palette-extract.py` (Pillow, 5-bit
quantisation, alpha > 200, greys excluded on the chromatic pass).

| Source | Measured | Share |
|---|---|---|
| Script mark | `#28A8F0` — H 201.6° S 83.3% V 94.1% | 46.78% of `logo-script.png` opaque px |
| Tagline lockup | `#1820D8` — H 237.5° S 88.9% V 84.7% | 26.29% of `logo.png` opaque px |

The tagline colour is **not** a deep indigo — it is brighter and more saturated
than the cyan. Used raw it is unreadable as text and competes with the accent.
`--ink` therefore holds its hue (237°) and drops its value.

```css
--ink:    #12184F;  /* 16.11:1 on paper — headings, primary text, the anchor  */
--signal: #007ABF;  /*  4.51:1 on paper — links, focus rings, the hero object */
--wash:   #E8F1F8;  /*  section grounds, the breath between blocks            */
--paper:  #FBFCFD;  /*  page ground                                           */
--quiet:  #525F73;  /*   6.30:1 on paper — body copy, captions, secondary     */
```

One exception, deliberate: raw `#28A8F0` measures **2.57:1 and fails AA**, so it
never carries text or a focus ring. It is used only for the hero particle field
and large non-text graphics, where it is luminance rather than legibility. Same
hue as `--signal`, two stops apart. That is one accent colour, not two.

No second accent. No gradients. No purple. No glassmorphism.

---

## 2. Type

Three roles, self-hosted variable woff2, Latin subset, via `next/font/local`.

| Role | Face | Used for |
|---|---|---|
| Display | **Clash Display** (Fontshare, variable) | Headlines only |
| Body | **Space Grotesk** (variable) | All running copy |
| Micro-chrome | **Geist Mono** (variable) | Only genuinely indexed or measured things |

Banned as defaults: Inter as display, Playfair, Montserrat.

**Scale** — fluid, 8px baseline, line-heights land on the grid.

```
display-xl   clamp(3rem, 9vw, 8rem)          lh 0.95   tracking -0.03em   hero only
display-l    clamp(2.25rem, 5vw, 4.5rem)     lh 1.00   tracking -0.02em   section heads
display-m    clamp(1.75rem, 3vw, 2.75rem)    lh 1.10   tracking -0.01em   sub-heads
lede         clamp(1.125rem, 1.6vw, 1.375rem) lh 1.60                     one per section, max
body         1rem / 1.75  (16 / 28)                                       measure 62–68ch
micro        0.6875rem (11px)  tracking 0.12em  uppercase                 Geist Mono
```

16px body at 1.75 is the floor, not a target — it is what a mid-range Android
screen in daylight needs. Headlines are left-aligned throughout. Nothing is
centred except the single footer CTA line.

---

## 3. Micro-chrome — and what got deleted from it

The reference's mono chrome is its signature, but BRIEF.md §6 says *"if a label
is decorative, delete it"* and §13 bans *"01 / 02 / 03 markers on things that
are not actually a sequence."* Those two rules kill most of it.

**Deleted: the global `[ 003 /012 ]` section counter.** Twelve routes are not a
sequence and the sections within a page are not either. Counting them indexes
nothing. It is borrowed styling, so it goes.

**Kept, because it marks something true:**

- **The scale readout**, home page only, fixed to the right edge:
  `ONE · HOUSEHOLD · WORKPLACE · COMMUNITY · REGION` set vertically in Geist
  Mono, current stage in `--signal`, the rest in `--quiet`. This tracks the
  actual act of the hero sequence — it is a real position in a real progression,
  and it doubles as the reduced-motion user's map of what the static poster
  represents.
- **Programme structure**: the training is genuinely 3 months with defined
  modules, so `MONTH 01 / 03` on programme pages is earned.
- **The M&E table** on `/impact` — mono is correct for measured quantities, and
  it visually separates what Dariva *measures* from what it has *not yet
  measured*, which is the honest story that page has to tell.
- **Form field states** — `REQUIRED`, `N$3,000 STANDARD`, `N$1,500 SUBSIDISED`,
  and error states. Mono marks the machine-checked parts of a form.
- **Wordmark** in the header as `(DARIVA.CO)`, nav lowercase, external links
  carry `↗`.

Everything else that wanted a mono label does not get one.

---

## 4. Structure — the connecting stroke

The section-band idea (alternating `--wash` and `--paper` stripes) is rejected
in §5 below. What replaces it:

**The stroke.** Dariva's one genuinely distinctive asset is that the logo is a
*script* — a single continuous handwritten line. That is also, exactly, the
brand's thesis: things connect and carry onward. So the site's structural
device is one continuous `--signal` stroke that threads down the page, entering
at the hero and passing through every section, drawn on scroll via SVG
`stroke-dashoffset`.

It **connects** sections rather than dividing them. It is the opposite of a
hairline rule. It costs roughly 2 KB, is resolution-independent, inherits the
palette token, and in reduced-motion it simply renders fully drawn — static,
complete, no meaning lost.

**Environment as narrative, per Reference A.** Rather than stripes, the ground
shifts once, with intent, where the audience changes:

```
/  hero → about → programmes        --paper, rising to --wash
   workplace / institutional block   inverted: --ink ground, --paper text
   community counsellor → contact    back to --paper
```

One inversion, at the point the site stops speaking to a person and starts
speaking to an institution. Not decoration — a change of address.

**Rhythm.** 8px baseline grid. Section padding `clamp(6rem, 12vh, 10rem)`.
One idea per screen. Body measure capped at 68ch. No card grids: the nine
audiences collapse to three linked buckets (§7 of the brief), rendered as three
full-width rows with real internal hierarchy, not three identical boxes.

**Radius.** Not zero — a broadsheet's sharp corners read cold, and this is a
wellness brand. The script logo has round stroke terminals, so interactive
surfaces echo that: `--r-button: 999px` (full round), `--r-surface: 4px` on the
few surfaces that need one. Consistent, derived from the mark.

**Motion elsewhere.** `transform` and `opacity` only. Staggered section entry,
link underlines that draw, buttons that shift weight not size, 2px lift.
Mobile gets shorter travel, faster easings, and no parallax on text.

**Reduced motion** is a designed state: stroke fully drawn, hero replaced by its
resolved poster, all copy present, scale readout showing the full progression at
once. Nothing is hidden, nothing is deleted, nothing needs motion to be
understood.

---

## 5. Self-critique — "would I have produced this for any NGO brief?"

**Palette — partly yes, and that is fine.** Blue on near-white is the default
health/NGO register, and I cannot escape it because it is *measured from the
client's own logo*. Inventing a differentiating hue would violate §5. What I can
defend is that the values are derived rather than picked, that the raw cyan is
correctly identified as failing AA rather than shipped as a link colour, and
that there is genuinely only one accent. **No change**, but the near-white
`--paper` is pushed slightly cool (`#FBFCFD`) rather than the cream `#F4F1EA`
that calibration target (a) lands on.

**Type — yes, and that needed fixing.** "Large confident left-aligned grotesk
with mono labels" is precisely calibration target (c), the hairline broadsheet.
Clash Display + Geist Mono is currently the single most common pairing in the
reference-driven corner of the web. I am keeping the faces, because the brief
specifies them and they genuinely serve the mid-range-Android legibility
requirement. What I changed is everything they sit on: the mono is stripped back
to five earned uses instead of decorating the whole chrome, and the layout
device is a connecting curve rather than dividing rules.

**Layout — yes, badly, first time round.** My first pass was alternating
pale-blue and white section bands with a fixed `[ 003 /012 ]` counter. That is
the default layout of essentially every ministry and health-nonprofit site, and
the counter is cosplay borrowed from Reference B that indexes nothing real.
Both are now gone. This is the substantive revision.

**The remaining risk I have not fully solved:** an inverted `--ink` block is
itself a common device. I am accepting it because it is used *once*, at a
specific rhetorical moment, rather than as a repeating rhythm — but it is the
weakest idea here and the first thing I would re-examine after seeing it built.

---

## 6. What the critique changed

1. **Killed the global section counter.** Replaced with a scale readout on home
   only, tracking the hero's actual propagation stage — a real position in a
   real progression, and it doubles as the reduced-motion map.
2. **Killed alternating section bands.** Replaced with one deliberate ground
   inversion at the individual→institution pivot.
3. **Added the connecting stroke** as the structural device, derived from the
   script logo — a line that joins sections instead of rules that split them.
4. **Cut mono chrome to five earned uses** from "chrome everywhere".
5. **Set radius from the logo's round stroke terminals** rather than defaulting
   to zero, avoiding the broadsheet register.

---

## 7. Copy decisions

**Vision, reconciled.** The PDF states it twice:

- Home: *"To build emotionally resilient, self-sustaining communities throughout Namibia and Africa."*
- About: *"Emotionally resilient communities where every individual has access to practical mental wellness support."*

**Keeping the About wording. Dropping the Home wording.** The About version
names a testable end-state for a person — *every individual has access* — which
is the same claim as the long-term goal in §7 of the brief (a wellness coach
available to every household and business), so the two reinforce each other.
"Namibia and Africa" is not lost: the PDF's own footer CTA carries *"across
Namibia and Africa"* verbatim, so the geography still lands on every page.

**Nine audiences → three buckets**, each a link, not a list item:

| Bucket | Absorbs | Links to |
|---|---|---|
| Communities & Individuals | Communities, Youth, Graduates, Community Leaders | `/programmes` |
| Workplaces & Government | Businesses, Government | `/workplace` |
| Faith, Schools & NGOs | Schools, Churches, NGOs | `/community-counsellor` |

**Terminology.** `lib/content/terms.ts` exports
`{ practitioner: 'Counsellor', practice: 'Counselling' }`, defaulting to the
PDF. Nothing hardcodes either word. Worth noting the current repo is *mixed* —
45 "Counsellor/Counselling" against 34 "Coach/Coaching", because commit
`93ec2b4` renamed them site-wide and the later rebuild partly reverted it. The
token ends that permanently.

**Banned words** (§13) are checked at build time, not by hand: `empower`,
`holistic`, `transformative journey`, `unlock your potential`, `seamless`.

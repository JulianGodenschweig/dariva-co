import Link from "next/link";
import {
  Counter,
  DepthImage,
  ParallaxBand,
  Reveal,
  ZoomHero,
} from "@/components/motion/scroll";
import { Button, Dot, Eyebrow, Pill, Section } from "@/components/ui";
import {
  coachingProgramme,
  communityCounsellor,
  hero,
  impact,
  org,
  programmes,
  whoWeServe,
  whyDariva,
} from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* ---------- 1. The pull-back ---------------------------------- */}
      <ZoomHero
        image="/images/hero-plains.jpg"
        alt="Sunrise over open plains in Namibia"
        heightVh={340}
        outro={
          <div className="max-w-2xl">
            <p className="lede text-cream/80">{hero.body}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/programmes">{hero.cta}</Button>
              <Button href="/assessment" variant="outline">
                Free Wellness Check-In
              </Button>
            </div>
          </div>
        }
      >
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1 className="display-xl mt-6 max-w-5xl text-cream">{hero.title}</h1>
        <p className="mt-7 max-w-2xl font-display text-lg text-sand/90 md:text-2xl">
          {hero.subtitle}
        </p>
        <p className="eyebrow mt-8 text-cream/50">{org.tagline}</p>
      </ZoomHero>

      {/* ---------- 2. Why Dariva ------------------------------------- */}
      <Section className="surface-dark">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Why Dariva.co</Eyebrow>
              <h2 className="display-md mt-6 text-cream">{whyDariva.lede}</h2>
              <p className="mt-6 text-cream/65">{whyDariva.body}</p>
            </Reveal>
            <Reveal delay={2}>
              <ul className="mt-8 space-y-3.5">
                {whyDariva.points.map((point) => (
                  <Dot key={point}>{point}</Dot>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={3}>
              <p className="mt-10 border-l-2 border-ochre pl-6 font-display text-xl leading-snug text-sand">
                {whyDariva.closer}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal clip>
              <DepthImage
                src="/images/community-children.jpg"
                alt="Children from a Namibian community smiling together"
                className="aspect-[4/5] w-full lg:aspect-[4/4.4]"
                from={1.3}
              />
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-6">
              <Reveal clip delay={1}>
                <DepthImage
                  src="/images/coaching.jpg"
                  alt="A coaching conversation in progress"
                  className="aspect-[4/3] w-full"
                  from={1.24}
                />
              </Reveal>
              <Reveal clip delay={2}>
                <DepthImage
                  src="/images/hands-together.jpg"
                  alt="Hands joined together in a circle"
                  className="aspect-[4/3] w-full"
                  from={1.24}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------- 3. Programmes ------------------------------------- */}
      <Section id="programmes" className="bg-ink">
        <Reveal>
          <Eyebrow>Our Programmes</Eyebrow>
          <h2 className="display-lg mt-6 max-w-3xl text-cream">
            Three streams. One outcome — emotionally healthier people.
          </h2>
        </Reveal>

        <div className="mt-20 space-y-24 lg:space-y-32">
          {programmes.map((programme, i) => (
            <article
              key={programme.slug}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal clip>
                <DepthImage
                  src={programme.image}
                  alt={`${programme.title} at Dariva.co`}
                  className="aspect-[5/4] w-full"
                  from={1.26}
                />
              </Reveal>

              <Reveal delay={1}>
                <span className="font-display text-sm font-semibold tracking-[0.3em] text-ochre">
                  {programme.index}
                </span>
                <h3 className="display-md mt-4 text-cream">
                  {programme.title}
                </h3>
                <p className="mt-4 font-display text-lg text-sand/85">
                  {programme.tagline}
                </p>
                <p className="mt-5 leading-relaxed text-cream/65">
                  {programme.summary}
                </p>

                <div className="mt-8 rounded-xl border border-sand/12 bg-sand/[0.03] p-6">
                  <p className="eyebrow text-teal-light">Outcome</p>
                  <p className="mt-3 text-cream/85">{programme.outcome}</p>
                </div>

                <div className="mt-8">
                  <Button
                    href={`/programmes/${programme.slug}`}
                    variant="outline"
                  >
                    Explore {programme.title}
                  </Button>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </Section>

      {/* ---------- 4. Who we serve ----------------------------------- */}
      <ParallaxBand
        src="/images/community-joy.jpg"
        alt="A community gathering in celebration"
        className="py-28 md:py-36"
        strength={14}
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-14 lg:px-20">
          <Reveal>
            <Eyebrow>Who We Serve</Eyebrow>
            <h2 className="display-md mt-6 max-w-3xl text-cream">
              Wellness that reaches every corner of a community.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 overflow-hidden" aria-hidden="true">
          <div className="marquee-track flex w-max gap-4">
            {[...whoWeServe, ...whoWeServe].map((group, i) => (
              <span
                key={`${group}-${i}`}
                className="whitespace-nowrap rounded-full border border-sand/25 bg-ink/40 px-7 py-3.5 font-display text-lg text-cream/90 backdrop-blur-sm"
              >
                {group}
              </span>
            ))}
          </div>
        </div>

        {/* Non-animated equivalent for assistive tech and reduced motion */}
        <ul className="sr-only">
          {whoWeServe.map((group) => (
            <li key={group}>{group}</li>
          ))}
        </ul>
      </ParallaxBand>

      {/* ---------- 5. Coaching programme ----------------------------- */}
      <Section className="surface-dark">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <Reveal clip>
              <DepthImage
                src="/images/workshop.jpg"
                alt="A facilitated wellness workshop in session"
                className="aspect-[4/3] w-full"
              />
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {coachingProgramme.suitable.map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Mental Wellness Coaching</Eyebrow>
              <h2 className="display-md mt-6 text-cream">
                {coachingProgramme.tagline}
              </h2>
              {coachingProgramme.body.map((para) => (
                <p key={para} className="mt-5 leading-relaxed text-cream/65">
                  {para}
                </p>
              ))}
            </Reveal>

            <Reveal delay={2}>
              <p className="eyebrow mt-10 text-ochre">
                {coachingProgramme.benefitsLabel}
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {coachingProgramme.benefits.map((b) => (
                  <Dot key={b}>{b}</Dot>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------- 6. Impact ----------------------------------------- */}
      <Section className="bg-ink">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Impact & Monitoring</Eyebrow>
              <h2 className="display-md mt-6 text-cream">{impact.title}</h2>
              <p className="mt-6 leading-relaxed text-cream/65">
                {impact.lede}
              </p>
              <div className="mt-8">
                <Button href="/impact" variant="outline">
                  How we measure
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-sand/12 bg-sand/12 sm:grid-cols-3">
              {[
                { value: 10, suffix: "", label: "Impact indicators tracked" },
                { value: 3, suffix: "", label: "Core training streams" },
                { value: 9, suffix: "", label: "Audiences served" },
              ].map((stat, i) => (
                <Reveal key={stat.label} delay={(i + 1) as 1 | 2 | 3}>
                  <div className="h-full bg-ink-2 p-8">
                    <p className="font-display text-5xl font-bold text-ochre">
                      <Counter to={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-3 text-sm text-cream/60">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={2}>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {impact.measures.slice(0, 6).map((m) => (
                  <div
                    key={m}
                    className="rounded-lg border border-sand/10 bg-sand/[0.02] px-5 py-4 text-sm text-cream/70"
                  >
                    {m}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------- 7. Community Counsellor --------------------------- */}
      <ParallaxBand
        src="/images/volunteer.jpg"
        alt="A community volunteer at work"
        className="py-32 md:py-44"
        strength={12}
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-14 lg:px-20">
          <Reveal>
            <Eyebrow>Community Counsellor Programme</Eyebrow>
            <h2 className="display-lg mt-8 max-w-3xl text-cream">
              {communityCounsellor.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="lede mt-8 max-w-2xl text-cream/75">
              {communityCounsellor.body}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/community-counsellor">Become a Counsellor</Button>
              <Button href="/contact" variant="outline">
                Talk to us
              </Button>
            </div>
          </Reveal>
        </div>
      </ParallaxBand>

      {/* ---------- 8. Vision ----------------------------------------- */}
      <Section className="surface-dark text-center">
        <Reveal>
          <Eyebrow className="justify-center">Our Vision</Eyebrow>
          <p className="display-md mx-auto mt-8 max-w-4xl text-cream">
            {org.visionBroad}
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button href="/partner">Partner With Us</Button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-cream/70 transition-colors hover:text-ochre"
            >
              {org.email}
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { Counter, DepthImage, ParallaxBand, Reveal } from "@/components/motion/scroll";
import { Button, Eyebrow, PageHeader, Section, Tick } from "@/components/ui";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Business Wellness",
  description: business.body,
};

export default function BusinessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Business Wellness"
        title={business.title}
        lede={business.tagline}
        image="/images/training-room.jpg"
        alt="A workplace wellness training session"
      />

      <Section className="surface-dark">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="display-md text-cream">{business.body}</p>
            </Reveal>
            <Reveal delay={2}>
              <h2 className="eyebrow mt-14 text-ochre">Business benefits</h2>
              <ul className="mt-6 space-y-3.5">
                {business.benefits.map((b) => (
                  <Tick key={b}>{b}</Tick>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-12">
                <Button href="/contact">Request a workplace proposal</Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal clip>
              <DepthImage
                src="/images/notes-meeting.jpg"
                alt="Colleagues working through a wellness session"
                className="aspect-[4/3] w-full"
              />
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-sand/12 bg-sand/12">
                {[
                  { n: 8, label: "Workplace services" },
                  { n: 6, label: "Measured benefits" },
                  { n: 3, label: "Training streams" },
                ].map((s) => (
                  <div key={s.label} className="bg-ink-2 p-6 text-center">
                    <p className="font-display text-4xl font-bold text-ochre">
                      <Counter to={s.n} />
                    </p>
                    <p className="mt-2 text-xs text-cream/55">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="bg-ink">
        <Reveal>
          <Eyebrow>Services</Eyebrow>
          <h2 className="display-md mt-6 max-w-3xl text-cream">
            What we deliver inside organisations.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-sand/12 bg-sand/12 sm:grid-cols-2 lg:grid-cols-4">
          {business.services.map((service, i) => (
            <Reveal key={service} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className="h-full bg-ink-2 p-8 transition-colors duration-500 hover:bg-ink-3">
                <span className="font-display text-xs font-semibold tracking-[0.3em] text-ochre">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-cream">
                  {service}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <ParallaxBand
        src="/images/partnership.jpg"
        alt="A handshake between partners"
        className="py-32 md:py-40"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-14 lg:px-20">
          <Reveal>
            <h2 className="display-md max-w-3xl text-cream">
              Healthy employees build successful organisations.
            </h2>
            <p className="lede mt-6 max-w-2xl text-cream/75">
              Tell us the size of your team and what you are seeing — stress,
              turnover, conflict, burnout — and we will scope a programme
              around it.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact">Start a conversation</Button>
              <Button href="/impact" variant="outline">
                See how we measure impact
              </Button>
            </div>
          </Reveal>
        </div>
      </ParallaxBand>
    </>
  );
}

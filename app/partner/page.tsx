import type { Metadata } from "next";
import { DepthImage, ParallaxBand, Reveal } from "@/components/motion/scroll";
import { Button, Eyebrow, PageHeader, Section } from "@/components/ui";
import { impact, partner } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "Dariva.co welcomes partnerships with government, NGOs, businesses, schools, churches, donors and international organisations.",
};

export default function PartnerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partner With Us"
        title={partner.title}
        lede={partner.closer}
        image="/images/partnership.jpg"
        alt="Two partners shaking hands"
      />

      <Section className="surface-dark">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="display-md text-cream">{partner.body}</p>
              <ul className="mt-10 space-y-px overflow-hidden rounded-2xl border border-mist/12 bg-mist/12">
                {partner.partners.map((p, i) => (
                  <li
                    key={p}
                    className="flex items-center gap-5 bg-ink-2 px-7 py-5 transition-colors duration-500 hover:bg-ink-3"
                  >
                    <span className="font-display text-xs font-semibold tracking-[0.3em] text-azure">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg text-cream">{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal clip>
              <DepthImage
                src="/images/community-joy.jpg"
                alt="A community celebrating together"
                className="aspect-[4/5] w-full"
              />
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-8 rounded-2xl border border-royal/25 bg-royal/[0.06] p-8">
                <p className="eyebrow text-royal-light">
                  Accountability to funders
                </p>
                <p className="mt-4 leading-relaxed text-cream/75">
                  {impact.why}
                </p>
                <div className="mt-7">
                  <Button href="/impact" variant="outline">
                    See our M&amp;E framework
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <ParallaxBand
        src="/images/community-children.jpg"
        alt="Children in a Namibian community"
        className="py-32 md:py-44"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-14 lg:px-20">
          <Reveal>
            <Eyebrow>Together</Eyebrow>
            <h2 className="display-lg mt-8 max-w-4xl text-cream">
              {partner.closer}
            </h2>
            <div className="mt-12">
              <Button href="/contact">Start a partnership conversation</Button>
            </div>
          </Reveal>
        </div>
      </ParallaxBand>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DepthImage, Reveal } from "@/components/motion/scroll";
import { Button, Dot, Eyebrow, PageHeader, Section, Tick } from "@/components/ui";
import { programmes } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);
  if (!programme) return { title: "Programme not found" };
  return {
    title: programme.title,
    description: programme.summary,
    openGraph: {
      title: `${programme.title} | Dariva.co`,
      description: programme.summary,
      images: [{ url: programme.image }],
    },
  };
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);
  if (!programme) notFound();

  const others = programmes.filter((p) => p.slug !== slug);

  return (
    <>
      <PageHeader
        eyebrow={`Programme ${programme.index}`}
        title={programme.title}
        lede={programme.tagline}
        image={programme.image}
        alt={`${programme.title} at Dariva.co`}
      />

      <Section className="surface-dark">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="display-md text-cream">{programme.summary}</p>
              <div className="mt-10 rounded-2xl border border-royal/25 bg-royal/[0.06] p-8">
                <p className="eyebrow text-royal-light">Outcome</p>
                <p className="mt-4 font-display text-xl leading-snug text-cream">
                  {programme.outcome}
                </p>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <h2 className="eyebrow mt-16 text-azure">
                {programme.topicsLabel}
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {programme.topics.map((topic) => (
                  <Dot key={topic}>{topic}</Dot>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={3}>
              <h2 className="eyebrow mt-16 text-azure">
                {programme.benefitsLabel}
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {programme.benefits.map((benefit) => (
                  <Tick key={benefit}>{benefit}</Tick>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal clip>
                <DepthImage
                  src={programme.image}
                  alt=""
                  className="aspect-[4/5] w-full"
                  from={1.2}
                />
              </Reveal>
              <Reveal delay={2}>
                <div className="mt-8 rounded-2xl border border-mist/12 bg-mist/[0.03] p-8">
                  <h2 className="display-sm text-cream">Ready to start?</h2>
                  <p className="mt-3 text-sm leading-relaxed text-cream/60">
                    Tell us a little about yourself or your organisation and we
                    will come back with dates, format and pricing.
                  </p>
                  <div className="mt-7 flex flex-col gap-3">
                    <Button href="/contact">Enquire about this course</Button>
                    <Button href="/assessment" variant="outline">
                      Take the free check-in
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </Section>

      <Section className="bg-ink">
        <Reveal>
          <Eyebrow>Continue exploring</Eyebrow>
          <h2 className="display-md mt-6 text-cream">The other streams</h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {others.map((other, i) => (
            <Reveal key={other.slug} delay={((i + 1) as 1 | 2)}>
              <Link
                href={`/programmes/${other.slug}`}
                className="group flex h-full gap-6 overflow-hidden rounded-2xl border border-mist/12 bg-ink-2 p-6 transition-colors duration-500 hover:border-azure/40"
              >
                <img
                  src={other.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="hidden h-32 w-32 shrink-0 rounded-xl object-cover sm:block"
                />
                <div>
                  <span className="font-display text-xs font-semibold tracking-[0.3em] text-azure">
                    {other.index}
                  </span>
                  <h3 className="display-sm mt-2 text-cream transition-colors group-hover:text-azure">
                    {other.title}
                  </h3>
                  <p className="mt-2 text-sm text-cream/60">{other.tagline}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { DepthImage, ParallaxBand, Reveal } from "@/components/motion/scroll";
import { Button, Dot, Eyebrow, Section } from "@/components/ui";
import { communityCounsellor, programmes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Become a Community Counsellor",
  description: communityCounsellor.body,
};

const counselling = programmes.find((p) => p.slug === "basic-counselling")!;

export default function CommunityCounsellorPage() {
  return (
    <>
      <ParallaxBand
        src="/images/volunteer.jpg"
        alt="A community volunteer supporting others"
        className="flex min-h-[86vh] items-end pb-20 pt-40"
        strength={10}
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-14 lg:px-20">
          <Reveal>
            <Eyebrow>Community Counsellor Programme</Eyebrow>
            <h1 className="display-xl mt-8 max-w-4xl text-cream">
              {communityCounsellor.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>
        </div>
      </ParallaxBand>

      <Section className="surface-dark">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="display-md text-cream">{communityCounsellor.body}</p>
              <p className="lede mt-8 text-cream/70">
                {communityCounsellor.body2}
              </p>
            </Reveal>

            <Reveal delay={2}>
              <h2 className="eyebrow mt-16 text-azure">
                {counselling.topicsLabel}
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {counselling.topics.map((topic) => (
                  <Dot key={topic}>{topic}</Dot>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={3}>
              <div className="mt-14 rounded-2xl border border-azure/25 bg-azure/[0.06] p-8">
                <p className="eyebrow text-azure">The essential skill</p>
                <p className="mt-4 font-display text-xl leading-snug text-cream">
                  {counselling.outcome}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-cream/60">
                  Community counselling is powerful precisely because it knows
                  its limits. A large part of the course is recognising when a
                  situation needs a qualified professional — and having the
                  local referral contacts ready before you need them.
                </p>
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal clip>
                <DepthImage
                  src="/images/group-talk.jpg"
                  alt="A supportive group conversation"
                  className="aspect-[4/5] w-full"
                />
              </Reveal>
              <Reveal delay={2}>
                <div className="mt-8 rounded-2xl border border-mist/12 bg-mist/[0.03] p-8">
                  <h2 className="display-sm text-cream">
                    Graduates become better
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {counselling.benefits.map((b) => (
                      <Dot key={b}>{b}</Dot>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button href="/contact">Apply or ask a question</Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </Section>

      <Section className="bg-ink text-center">
        <Reveal>
          <Eyebrow className="justify-center">Ongoing support</Eyebrow>
          <p className="display-md mx-auto mt-8 max-w-4xl text-cream">
            Graduates receive ongoing coaching, supervision and opportunities to
            continue growing as community leaders.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button href="/programmes/basic-counselling">
              See the full course
            </Button>
            <Button href="/assessment" variant="outline">
              Take the free check-in
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

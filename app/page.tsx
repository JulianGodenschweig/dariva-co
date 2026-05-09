import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Cpu,
  HandHeart,
  HeartPulse,
  Landmark,
  MapPin,
  MessageCircleHeart,
  ShieldAlert,
  Sparkles,
  Waves,
  UsersRound
} from "lucide-react";
import { CTA, FeatureGrid, PricingCards, SectionHeading, StatBand, Timeline } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { faqs, journey, outcomes, pillars, programmes } from "@/lib/content";

export default function Home() {
  return (
    <>
{/* ── Hero: River metaphor, community warmth ── */}
<section className="aurora river-flow relative overflow-hidden">
<div className="absolute inset-0 soft-grid opacity-40" />
<div className="absolute inset-0 river-shimmer pointer-events-none" />
        <div className="container-page relative grid min-h-[calc(100vh-5rem)] items-center gap-12 py-14 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#b8d4d8] bg-white/70 px-4 py-2 text-sm font-semibold text-[#004d40]">
              <Waves size={14} />
              Namibia&apos;s community mental wellness ecosystem
            </p>
            <h1 className="text-balance text-5xl font-semibold tracking-[-0.04em] text-[#071822] sm:text-6xl lg:text-7xl">
              Like a river, wellness flows when the community opens the channel.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4e6878] sm:text-xl">
              Dariva.co builds community counsellors, supports mental wellness, creates economic pathways, and helps reduce the root causes of gender-based violence. <em>Dariva</em> means &ldquo;the river&rdquo; &mdash; and care should flow the same way.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/apply" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#071822] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00897b]">
                Apply Now <ArrowRight size={17} />
              </Link>
              <Link href="/program" className="inline-flex items-center justify-center rounded-full border border-[#b8d4d8] bg-white/70 px-6 py-3 text-sm font-semibold text-[#071822] transition hover:bg-white">
                Learn More
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#00897b] transition hover:text-[#004d40]">
                Partner With Us
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="relative mx-auto max-w-[560px]">
              <div className="surface river-pulse rounded-2xl p-5 sm:p-7">
                <div className="rounded-2xl bg-[#071822] p-6 text-white">
                  <p className="text-sm font-semibold text-white/64">The Dariva model</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">Where community becomes the current for change.</h2>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Community counsellors", icon: UsersRound },
                    { label: "WhatsApp-first access", icon: MessageCircleHeart },
                    { label: "AI-assisted support", icon: Cpu },
                    { label: "Measured outcomes", icon: CheckCircle2 }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="rounded-2xl border border-[#b8d4d8] bg-white p-4">
                        <Icon className="mb-5 text-[#00897b]" size={22} />
                        <p className="text-sm font-semibold text-[#071822]">{item.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
</div>
</section>

{/* ── River divider ── */}
<div className="container-page py-0"><div className="river-divider" /></div>

{/* ── Why: The broken channels ── */}
      <section className="section-pad bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Why Dariva.co exists"
            title="Support cannot only arrive after pain has become a crisis."
            text="Mental health support remains limited for many communities. Stigma keeps people silent. Unresolved trauma, daily stress, and lack of emotional support can become pressure points for family breakdown, violence, and social instability."
          />
          <Stagger className="grid gap-4">
            {[
              ["Limited access", "Many people do not know where to turn, or cannot reach trusted care early enough."],
              ["Stigma and silence", "Emotional pain is often hidden until it becomes harder, more expensive, and more dangerous to address."],
              ["Community pressure", "Without practical local support, stress and trauma can feed cycles of harm, including GBV drivers."]
            ].map(([title, text]) => (
              <StaggerItem key={title} className="rounded-2xl border border-[#b8d4d8] bg-[#f6faf9] p-6">
                <ShieldAlert className="mb-4 text-[#d84315]" size={24} />
                <h3 className="text-xl font-semibold text-[#071822]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#4e6878]">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

{/* ── Vision: The river flows ── */}
<section className="section-pad bg-[#e9f3f1] relative overflow-hidden">
<div className="absolute inset-0 river-shimmer pointer-events-none" />
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="The vision"
            title="Emotionally resilient communities where mental wellness is accessible, normalised, and practiced."
            text="Dariva.co is designed for prevention over crisis, community ownership over dependency, and a model that can grow across Namibia with credibility and care."
          />
          <div className="mt-12">
            <FeatureGrid items={pillars} />
          </div>
        </div>
      </section>

      {/* ── How it works: The journey ── */}
      <section className="section-pad bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="How it works"
            title="A clear journey from growth to service."
            text="The programme develops people, strengthens communities, and creates pathways for practical care work."
          />
          <Timeline items={journey} />
        </div>
      </section>

      {/* ── Impact stats ── */}
      <section className="section-pad bg-[#f6faf9]">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Impact"
            title="Dariva.co tracks the human changes that make communities safer."
            text="The goal is not activity for its own sake. The goal is stronger emotional literacy, earlier intervention, and local support that lasts."
          />
          <div className="mt-12">
            <StatBand />
          </div>
          <Stagger className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((outcome) => (
              <StaggerItem key={outcome} className="rounded-2xl border border-[#b8d4d8] bg-white p-5 text-center text-sm font-semibold text-[#071822]">
                {outcome}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── NEW: AI-Powered Digital Support (placeholder from blueprint) ── */}
      <section className="section-pad bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="AI-powered support"
            title="Technology that serves the community, not the other way around."
            text="Dariva.co is integrating AI-assisted tools to help community counsellors deliver better support, track outcomes, and reach more people through WhatsApp-first digital access."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Brain, title: "AI-assisted counselling prompts", text: "Counsellors get real-time guidance during sessions, helping them respond with confidence." },
              { icon: MessageCircleHeart, title: "WhatsApp-first access", text: "Community members reach support through the platform they already use every day." },
              { icon: Cpu, title: "Outcome tracking & insights", text: "Automated monitoring helps partners and funders see real impact without adding admin burden." },
              { icon: Sparkles, title: "Personalised learning paths", text: "Each counsellor's training adapts based on progress, community needs, and feedback." }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title} className="rounded-2xl border border-[#b8d4d8] bg-[#f6faf9] p-6">
                  <Icon className="mb-4 text-[#00897b]" size={24} />
                  <h3 className="text-lg font-semibold text-[#071822]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#4e6878]">{item.text}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ── NEW: Governance & Trust (placeholder from blueprint) ── */}
      <section className="section-pad bg-[#e9f3f1]">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Governance"
            title="Built with the discipline that communities deserve."
            text="Dariva.co operates with clear governance structures, safeguarding protocols, and transparent reporting — because trust is not optional when people bring their pain."
          />
          <div className="mt-12">
            <Stagger className="grid gap-4 md:grid-cols-3">
              {[
                { icon: Landmark, title: "Community Advisory Board", text: "Local voices guide programme decisions, cultural relevance, and safeguarding." },
                { icon: HeartPulse, title: "Clinical Oversight", text: "Qualified professionals supervise training content, referral quality, and ethical boundaries." },
                { icon: UsersRound, title: "Partner Accountability", text: "Implementation partners receive structured reporting, feedback loops, and shared learning." }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={item.title} className="surface rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(13,34,51,0.12)]">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e0f2f1] text-[#00897b]">
                      <Icon size={23} />
                    </div>
                    <h3 className="text-xl font-semibold tracking-[-0.01em] text-[#071822]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#4e6878]">{item.text}</p>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ── NEW: Roadmap — Where the river is flowing ── */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Roadmap"
            title="Where the river is flowing next."
            text="Dariva.co is moving from pilot to national infrastructure. Here is what is coming."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {[
              { phase: "Now", title: "Pilot Communities", items: ["Luderitz, Rehoboth, Mariental", "Train-the-Trainer programme", "WhatsApp intake & support", "Community counsellor certification"] },
              { phase: "Next", title: "Digital Health Layer", items: ["AI-assisted counselling tools", "Supabase-powered records & referrals", "Partner dashboard & reporting", "M&E automation"] },
              { phase: "Soon", title: "Regional Expansion", items: ["New partner communities across Namibia", "Graduate Development Programme", "Counsellor economy & income pathways", "National prevention network"] },
              { phase: "Future", title: "National Infrastructure", items: ["Government partnership framework", "Integrated referral pathways with MH professionals", "Scaled counsellor network (1,750+ by 2027)", "Self-sustaining community care economy"] }
            ].map((block) => (
              <Reveal key={block.title} className="rounded-2xl border border-[#b8d4d8] bg-[#f6faf9] p-6">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#00897b]">{block.phase}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[#071822]">{block.title}</h3>
                <ul className="mt-4 grid gap-2">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#4e6878]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00897b]" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partnership-ready ── */}
      <section className="section-pad bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Partnership-ready"
            title="Built for community trust and institutional confidence."
            text="Dariva.co is a practical implementation platform: training foundations, governance, partner alignment, measurable outcomes, local relevance, and adaptive learning."
          />
          <Reveal className="rounded-2xl border border-[#004d40]/40 bg-gradient-to-br from-[#071822] to-[#004d40] p-8 text-white river-pulse">
            <HandHeart className="mb-8 text-[#4db6ac]" size={34} />
            <h3 className="text-3xl font-semibold tracking-[-0.03em]">A movement with operating discipline.</h3>
            <p className="mt-4 text-base leading-8 text-white/70">
              Dariva.co can work with funders, government stakeholders, local organisations, schools, employers, and communities that want prevention to become normal practice.
            </p>
          </Reveal>
        </div>
      </section>

{/* ── NEW: Community Voice (testimony vibe) ── */}
<section className="river-cta section-pad text-white relative overflow-hidden">
        <Reveal className="container-page text-center">
          <p className="mx-auto max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
            &ldquo;A community that can speak about pain early is a community with more room for dignity, leadership, and safety.&rdquo;
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-white/52">Dariva.co community voice</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/apply" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#071822] transition hover:bg-[#e0f2f1]">
              Apply Now <ArrowRight size={17} />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Partner With Us
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── FAQ ── */}
      <section className="section-pad bg-[#e9f3f1]">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="FAQ" title="Clear answers for a serious model." />
          <div className="mx-auto mt-10 grid max-w-4xl gap-4">
            {faqs.map((faq) => (
              <Reveal key={faq.q} className="rounded-2xl border border-[#b8d4d8] bg-white p-6">
                <h3 className="text-lg font-semibold text-[#071822]">{faq.q}</h3>
                <p className="mt-3 text-sm leading-7 text-[#4e6878]">{faq.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programmes / Pricing ── */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Programmes"
            title="Invest in your growth and your community."
            text="Choose the programme that fits your journey. Each one is designed to build skills, deepen impact, and create real opportunities."
          />
          <div className="mt-12">
            <PricingCards items={programmes} />
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}

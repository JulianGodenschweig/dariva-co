import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Impact } from "@/components/sections/Impact";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Wave — Problem bg */}

      <Problem />
      {/* Wave — Solution bg */}

      <Solution />
      {/* Wave — Impact bg */}

      <Impact />

      {/* Founders' Vision */}
      <section className="section-pad bg-white reveal" id="founders-vision">
        <div className="container-page relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-[#1B9AD6]">
              FOUNDERS&apos; VISION
            </p>
            <blockquote className="relative">
              <span className="absolute -left-4 -top-4 text-6xl leading-none text-[#1B9AD6]/20">&ldquo;</span>
              <p className="text-xl leading-relaxed italic text-gray-700 sm:text-2xl">
                A community that can speak about pain early is a community
                with more room for dignity, leadership, and safety.
              </p>
              <span className="absolute -bottom-8 -right-4 text-6xl leading-none text-[#1B9AD6]/20">&rdquo;</span>
            </blockquote>
            <p className="mt-8 text-base font-semibold text-[#1B9AD6]">
              &mdash; Dariva.co
            </p>
          </div>
        </div>
      </section>

      {/* Wave — HowItWorks bg */}

      <HowItWorks />
      {/* Wave — Testimonials bg */}

      <Testimonials />
      {/* Closing section */}
      <section className="section-pad bg-deep reveal" id="contact">
        <div className="container-page relative z-10 text-center">
          <h2
            className="font-heading font-bold tracking-tight text-white"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.2 }}
          >
            Mental Wellness and the end of Gender-Based Violence
          </h2>
        </div>
      </section>
    </>
  );
}

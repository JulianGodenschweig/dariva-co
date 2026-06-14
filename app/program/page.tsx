import type { Metadata } from "next";
import Link from "next/link";
import { Brain, Handshake, HeartPulse, MessagesSquare, Route, UsersRound } from "lucide-react";
import { benefits, journey } from "@/lib/content";
import { CTA, FeatureGrid, SectionHeading, Timeline } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "Program",
  description: "Dariva.co's train-the-trainer model develops community counsellors through learning, practice, and incentive-based service."
};

export default function ProgramPage() {
  return (
    <>
      <section className="about-hero">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] opacity-80">Program</p>
        <h1>A practical path from training to trusted community care</h1>
        <p>Dariva.co develops community counsellors through a preventative mental wellness model that builds confidence, leadership, and income pathways.</p>
        <div className="river-wrap" aria-hidden="true">
          <svg className="river-svg" viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,45 C180,90 360,0 540,45 C720,90 900,0 1080,45 C1260,90 1440,0 1440,45 L1440,90 L0,90 Z" fill="rgba(255,255,255,0.12)"/>
            <path d="M0,60 C200,20 400,80 600,60 C800,40 1000,80 1200,60 C1300,50 1380,65 1440,60 L1440,90 L0,90 Z" fill="rgba(255,255,255,0.07)"/>
          </svg>
        </div>
      </section>

      <section className="section-pad reveal">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Overview"
            title="The programme turns care into capability."
            text="Through a train-the-trainer approach, Dariva.co equips people to learn, facilitate, mentor, and support others with clear boundaries and continuous support."
          />
          <div className="mt-12">
            <FeatureGrid
              items={[
                { title: "Mental wellness foundations", text: "Emotional literacy, stress, trauma awareness, and everyday support practices.", icon: Brain },
                { title: "End Gender-Based Violence", text: "Understanding drivers, warning signs, safer conversations, and referral pathways.", icon: HeartPulse },
                { title: "Leadership and communication", text: "Facilitation, trust-building, confidentiality, and community presence.", icon: MessagesSquare }
              ]}
            />
          </div>
        </div>
      </section>


      <section className="section-pad bg-mid reveal">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="The 3 phases"
            title="Learn. Practice. Earn impact."
            text="Each phase deepens skill, responsibility, and real-world contribution."
          />
          <Timeline items={journey} />
        </div>
      </section>

      {/* Pricing / Programme Fees section */}
      <section className="section-pad bg-river-light reveal">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Programme Fees"
            title="Choose your path"
            text="Dariva.co's Community Counsellor Training Programme."
          />
          <p style={{textAlign:'center',fontSize:'1.1rem',fontWeight:700,color:'#1A237E',marginTop:'24px',marginBottom:'8px'}}>Train-the-Trainer Programme</p>
          <div className="mt-4" style={{display:'flex',flexWrap:'wrap',gap:'32px',justifyContent:'center'}}>
            {/* Card 1 — Featured */}
            <div className="card-lift" style={{background:'white',borderRadius:'20px',padding:'40px 32px',border:'2px solid #1B9AD6',boxShadow:'0 8px 40px rgba(27,154,214,0.15)',position:'relative',flex:1,minWidth:'280px',maxWidth:'420px'}}>

              <h3 style={{fontSize:'1.3rem',fontWeight:700,color:'#1A237E',marginBottom:'8px'}}>Mental Wellness Counselling Training</h3>
               <p style={{color:'#1A237E',fontSize:'14px',marginBottom:'20px'}}>3-month Transformation Journey</p>
              <div style={{marginBottom:'24px'}}>
                <p style={{fontSize:'13px',color:'#1B9AD6',margin:'0 0 4px',fontWeight:600}}>N$ 190 Administrative Fee</p>
                <p style={{fontSize:'2.4rem',fontWeight:800,color:'#1A237E',margin:0}}>N$3,000</p>
                <p style={{color:'#1B9AD6',fontSize:'13px',margin:'4px 0 0'}}>Or</p>
                <p style={{color:'#1B9AD6',fontSize:'14px',margin:'4px 0 0'}}>N$1,000 per month for 3 months</p>
              </div>
              <ul style={{listStyle:'none',padding:0,margin:'0 0 28px',display:'flex',flexDirection:'column',gap:'10px'}}>
                {['Mental Wellness Training', 'Mental Wellness Counselling', 'Leadership & Mentorship Training'].map(f => (
                  <li key={f} style={{display:'flex',gap:'10px',alignItems:'flex-start',fontSize:'14px',color:'#374151'}}>
                    <span style={{color:'#1A237E',fontWeight:700,flexShrink:0}}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/apply" style={{display:'block',background:'linear-gradient(135deg,#1B9AD6,#1A237E)',color:'white',padding:'14px',borderRadius:'10px',textAlign:'center',textDecoration:'none',fontSize:'15px',fontWeight:700}}>
                Apply Now →
              </Link>
               <p style={{textAlign:'center',fontSize:'12px',color:'#9CA3AF',marginTop:'10px'}}>Payment Plan</p>
            </div>

          </div>
        </div>
      </section>

      <section className="section-pad reveal">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Benefits"
            title="A programme for personal growth and public value."
            text="Dariva.co is designed to strengthen the person, the household, and the community network around them."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <StaggerItem key={benefit} className="rounded-2xl border border-[#b8d4d8] bg-[#f6faf9] p-5 card-lift">
                <p className="font-semibold text-[#1A237E]">{benefit}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-pad bg-deep reveal">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {[
            { title: "Training", icon: Route, text: "Structured learning with practical community application." },
            { title: "Mentorship", icon: Handshake, text: "Guidance, feedback, and ethical boundaries as counsellors grow." },
            { title: "Network", icon: UsersRound, text: "A connected care economy with digital access and ongoing support." }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="card-lift rounded-2xl border border-white/10 bg-white/6 p-6">
                <Icon className="mb-6 text-[#1A237E]" size={28} />
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 opacity-70">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="bg-deep">
        <CTA />
      </div>
    </>
  );
}

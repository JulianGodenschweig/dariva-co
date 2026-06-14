"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykozqlp";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: new FormData(e.currentTarget),
      headers: { Accept: "application/json" },
    }).catch(() => {});

    setSubmitted(true);
    setSubmitting(false);
  }
  return (
    <main className="bg-river-light" style={{minHeight:'100vh',paddingTop:'40px',paddingBottom:'80px'}}>

      {/* Hero */}
      <section style={{background:'linear-gradient(135deg,#1A237E 0%,#1B9AD6 100%)',color:'white',padding:'80px 24px 60px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <p style={{fontSize:'13px',fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',opacity:0.8,marginBottom:'16px'}}>Get In Touch</p>
        <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',fontWeight:800,lineHeight:1.2,marginBottom:'20px',maxWidth:'700px',margin:'0 auto 20px'}}>
          Start a serious conversation about community mental wellness
        </h1>
        <p style={{fontSize:'1.1rem',opacity:0.9,maxWidth:'560px',margin:'0 auto',lineHeight:1.7}}>
          Reach out about applications, partnerships, implementation, funding, or bringing Dariva.co into your community.
        </p>
        <div className="river-wrap" aria-hidden="true">
          <svg className="river-svg" viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,45 C180,90 360,0 540,45 C720,90 900,0 1080,45 C1260,90 1440,0 1440,45 L1440,90 L0,90 Z" fill="rgba(255,255,255,0.12)"/>
            <path d="M0,60 C200,20 400,80 600,60 C800,40 1000,80 1200,60 C1300,50 1380,65 1440,60 L1440,90 L0,90 Z" fill="rgba(255,255,255,0.07)"/>
          </svg>
        </div>
      </section>


      {/* Contact cards + Form */}
      <section style={{maxWidth:'1100px',margin:'0 auto',padding:'60px 24px 0',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'start'}} className="contact-grid">

        {/* Left — info */}
        <div>
          <h2 style={{fontSize:'1.6rem',fontWeight:700,color:'#1A237E',marginBottom:'8px'}}>Partnership starts with one conversation.</h2>
          <p style={{color:'#4B5563',lineHeight:1.8,marginBottom:'36px'}}>
            Dariva.co builds emotionally resilient, self-sustaining communities in Namibia, Africa. We welcome conversations with funders, government partners, NGOs, communities, and individuals ready to serve.
          </p>

          {[
            { icon:'✉', label:'Email', value:'dariva.co001@gmail.com', href:'mailto:dariva.co001@gmail.com' },
            { icon:'📞', label:'Phone', value:'+264 81 340 4364', href:'tel:+264813404364' },
            { icon:'💬', label:'WhatsApp', value:'+264 81 340 4364', href:'https://wa.me/264813404364' },
            { icon:'📍', label:'Location', value:'Namibia, Africa', href:null },
          ].map(c => (
            <div key={c.label} className="card-lift reveal" style={{display:'flex',gap:'16px',alignItems:'flex-start',marginBottom:'24px',background:'white',borderRadius:'12px',padding:'18px 20px',boxShadow:'0 2px 12px rgba(27,154,214,0.08)'}}>
              <span style={{fontSize:'22px',flexShrink:0}}>{c.icon}</span>
              <div>
                <p style={{fontSize:'12px',fontWeight:600,color:'#1B9AD6',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'4px'}}>{c.label}</p>
                {c.href ? (
                  <a href={c.href} style={{color:'#0D1B2A',textDecoration:'none',fontWeight:500,fontSize:'15px'}}>{c.value}</a>
                ) : (
                  <p style={{color:'#0D1B2A',fontWeight:500,fontSize:'15px',margin:0}}>{c.value}</p>
                )}
              </div>
            </div>
          ))}

        </div>

        {/* Right — Formspree form */}
        <div style={{background:'white',borderRadius:'16px',padding:'40px 36px',boxShadow:'0 4px 30px rgba(27,154,214,0.10)',border:'1px solid #E5F3FB'}}>
          <h3 style={{fontSize:'1.3rem',fontWeight:700,color:'#1A237E',marginBottom:'6px'}}>Send us a message</h3>
          <p style={{color:'#6B7280',fontSize:'14px',marginBottom:'28px'}}>We respond within 24 hours.</p>

          {submitted ? (
            <div style={{textAlign:'center',padding:'60px 20px'}}>
              <CheckCircle2 size={48} className="mx-auto" style={{color:'#16a34a'}} />
              <h3 style={{fontSize:'1.3rem',fontWeight:700,color:'#1A237E',marginTop:'20px',marginBottom:'8px'}}>Submitted, thanks!</h3>
              <p style={{color:'#4B5563'}}>We&apos;ll get back to you soon.</p>
            </div>
          ) : (
          <form onSubmit={onSubmit} style={{display:'flex',flexDirection:'column',gap:'18px'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}} className="form-name-grid">
              <div>
                <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#374151',marginBottom:'6px'}}>First Name *</label>
                <input name="firstName" required placeholder="John" style={{width:'100%',padding:'11px 14px',border:'1px solid #D1D5DB',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
              </div>
              <div>
                <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#374151',marginBottom:'6px'}}>Last Name *</label>
                <input name="lastName" required placeholder="Doe" style={{width:'100%',padding:'11px 14px',border:'1px solid #D1D5DB',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
              </div>
            </div>

            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#374151',marginBottom:'6px'}}>Email *</label>
              <input name="email" type="email" required placeholder="you@example.com" style={{width:'100%',padding:'11px 14px',border:'1px solid #D1D5DB',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>

            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#374151',marginBottom:'6px'}}>Organisation / Role</label>
              <input name="organisation" placeholder="NGO, Funder, Community Partner..." style={{width:'100%',padding:'11px 14px',border:'1px solid #D1D5DB',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>

            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#374151',marginBottom:'6px'}}>Purpose of enquiry *</label>
              <select name="purpose" required style={{width:'100%',padding:'11px 14px',border:'1px solid #D1D5DB',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box',background:'white'}}>
                <option value="">Select one...</option>
                <option>Programme Application</option>
                <option>Funding / Grant Partnership</option>
                <option>Implementation Partnership</option>
                <option>Government / Policy Enquiry</option>
                <option>Media / Research</option>
                <option>General Question</option>
              </select>
            </div>

            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#374151',marginBottom:'6px'}}>Message *</label>
              <textarea name="message" required rows={5} placeholder="Tell us what you are building, who you serve, and where we can work together..." style={{width:'100%',padding:'11px 14px',border:'1px solid #D1D5DB',borderRadius:'8px',fontSize:'14px',outline:'none',resize:'vertical',boxSizing:'border-box'}} />
            </div>

            <input type="hidden" name="_subject" value="New Dariva.co Contact Form Submission" />
            <input type="text" name="_gotcha" style={{display:'none'}} />

            <button type="submit" disabled={submitting} style={{background:'linear-gradient(135deg,#1B9AD6,#1A237E)',color:'white',padding:'14px 28px',borderRadius:'10px',fontSize:'15px',fontWeight:700,border:'none',cursor:submitting?'not-allowed':'pointer',width:'100%',letterSpacing:'0.02em',opacity:submitting?0.6:1}}>
              {submitting ? 'Submitting...' : 'Send Message →'}
            </button>
            <p style={{fontSize:'12px',color:'#9CA3AF',textAlign:'center',margin:0}}>Your information is handled with full confidentiality.</p>
          </form>
          )}
        </div>
      </section>

      {/* Mobile grid fix */}
      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .form-name-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

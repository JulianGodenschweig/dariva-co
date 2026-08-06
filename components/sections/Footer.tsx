import Link from 'next/link';
import Image from 'next/image';
import { asset } from '@/lib/utils';

export default function Footer() {
  return (
    <footer style={{background:'linear-gradient(180deg,#0D1B2A 0%,#1A237E 100%)',color:'white',padding:'60px 24px 32px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr',gap:'48px',marginBottom:'48px'}} className="footer-grid">

          <div>
            <Image src={asset('/logo.png')} alt="Dariva.co" width={130} height={34} style={{objectFit:'contain',marginBottom:'16px',filter:'brightness(0) invert(1)'}} />
            <p style={{color:'rgba(255,255,255,0.75)',lineHeight:1.8,fontSize:'14px',maxWidth:'320px'}}>
              Dariva.co builds emotionally resilient, self-sustaining communities where mental wellness is accessible, normalised, and practiced across Namibia and Africa.
            </p>
            <div style={{display:'flex',gap:'16px',marginTop:'20px'}}>
              <a href="mailto:dariva.co001@gmail.com" style={{color:'rgba(255,255,255,0.75)',fontSize:'13px',textDecoration:'none'}}>✉ Email</a>
              <a href="https://wa.me/264813404364" style={{color:'#25D366',fontSize:'13px',textDecoration:'none'}}>💬 WhatsApp</a>
            </div>
          </div>

          <div>
            <p style={{fontWeight:700,fontSize:'13px',letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.5)',marginBottom:'16px'}}>Explore</p>
            {['/','/about','/program','/impact','/apply','/contact'].map((href) => (
              <Link key={href} href={href} style={{display:'block',color:'rgba(255,255,255,0.8)',textDecoration:'none',marginBottom:'10px',fontSize:'14px'}}>{href === '/' ? 'Home' : href.slice(1).charAt(0).toUpperCase() + href.slice(2)}</Link>
            ))}
          </div>

          <div>
            <p style={{fontWeight:700,fontSize:'13px',letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.5)',marginBottom:'16px'}}>Contact</p>
            <p style={{color:'rgba(255,255,255,0.8)',fontSize:'14px',marginBottom:'8px'}}>dariva.co001@gmail.com</p>
            <p style={{color:'rgba(255,255,255,0.8)',fontSize:'14px',marginBottom:'8px'}}>+264 81 340 4364</p>
            <p style={{color:'rgba(255,255,255,0.8)',fontSize:'14px',marginBottom:'24px'}}>Namibia, Africa</p>
            <Link href="/apply" style={{display:'inline-block',background:'#1B9AD6',color:'white',padding:'10px 22px',borderRadius:'8px',textDecoration:'none',fontSize:'14px',fontWeight:600}}>Apply Now →</Link>
          </div>
        </div>

        <div style={{borderTop:'1px solid rgba(255,255,255,0.1)',paddingTop:'24px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',margin:0}}>© 2026 Dariva.co. All rights reserved.</p>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',margin:0}}>Community Mental Wellness &amp; Ending Gender Based Violence</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}

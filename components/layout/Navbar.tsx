'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/program', label: 'Program' },
  { href: '/impact', label: 'Impact' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', s);
    return () => window.removeEventListener('scroll', s);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav style={{
        position:'fixed',top:0,left:0,right:0,zIndex:1000,height:'64px',
        display:'flex',alignItems:'center',justifyContent:'space-between',
        padding:'0 24px',
        background: scrolled ? 'rgba(255,255,255,0.96)' : 'white',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(27,154,214,0.13)' : '0 1px 0 #e5e7eb',
        transition:'all 0.3s ease',
      }}>
        <Link href="/" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="Dariva.co" width={130} height={34} style={{objectFit:'contain',display:'block'}} priority />
        </Link>

        {/* Desktop */}
        <div style={{display:'flex',gap:'28px',alignItems:'center'}} className="dariva-desktop-nav">
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{color:'#0D1B2A',textDecoration:'none',fontSize:'15px',fontWeight:500}}>
              {l.label}
            </Link>
          ))}
          <Link href="/apply" style={{background:'#1B9AD6',color:'white',padding:'9px 22px',borderRadius:'8px',textDecoration:'none',fontSize:'15px',fontWeight:600}}>
            Apply Now
          </Link>
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} aria-label="Menu" className="dariva-hamburger"
          style={{display:'none',flexDirection:'column',gap:'5px',background:'none',border:'none',cursor:'pointer',padding:'8px',zIndex:1001}}>
          <span style={{display:'block',width:'24px',height:'2px',background:'#0D1B2A',transition:'all 0.3s',transform:open?'rotate(45deg) translate(5px,5px)':'none'}}/>
          <span style={{display:'block',width:'24px',height:'2px',background:'#0D1B2A',transition:'all 0.3s',opacity:open?0:1}}/>
          <span style={{display:'block',width:'24px',height:'2px',background:'#0D1B2A',transition:'all 0.3s',transform:open?'rotate(-45deg) translate(5px,-5px)':'none'}}/>
        </button>
      </nav>

      {/* Mobile overlay */}
      <div style={{
        position:'fixed',top:'64px',left:0,right:0,bottom:0,
        background:'rgba(26,35,126,0.98)',
        zIndex:999,
        transform:open?'translateX(0)':'translateX(100%)',
        transition:'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'32px',
        pointerEvents:open?'all':'none',
      }}>
        {links.map(l => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
            style={{color:'white',textDecoration:'none',fontSize:'24px',fontWeight:600,letterSpacing:'0.02em'}}>
            {l.label}
          </Link>
        ))}
        <Link href="/apply" onClick={() => setOpen(false)}
          style={{background:'#1B9AD6',color:'white',padding:'14px 40px',borderRadius:'10px',textDecoration:'none',fontSize:'18px',fontWeight:700,marginTop:'8px'}}>
          Apply Now
        </Link>
        <a href="https://wa.me/264813404364" target="_blank" rel="noopener noreferrer"
          style={{color:'#25D366',fontSize:'16px',fontWeight:500,textDecoration:'none'}}>
          WhatsApp: +264 81 340 4364
        </a>
      </div>

      {/* CSS to show/hide desktop vs hamburger */}
      <style>{`
        .dariva-desktop-nav { display: flex !important; }
        .dariva-hamburger { display: none !important; }
        @media (max-width: 768px) {
          .dariva-desktop-nav { display: none !important; }
          .dariva-hamburger { display: flex !important; }
        }
      `}</style>
      <div style={{height:'64px'}}/>
    </>
  );
}

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/program', label: 'Program' },
  { href: '/coaches', label: 'Coaches' },
  { href: '/impact', label: 'Impact' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 90, 320], [1, 1, 0.55]);

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60));

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const pillStyle = {
    background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.8)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(26,35,126,0.08)',
    boxShadow: scrolled
      ? '0 10px 34px rgba(13,27,42,0.14)'
      : '0 6px 22px rgba(13,27,42,0.08)',
    transition: 'all 0.35s ease',
  };

  return (
    <>
      <motion.div
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '16px 20px', opacity: navOpacity }}
      >
        <div
          className="container-page"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}
        >
          {/* Logo pill */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{ ...pillStyle, borderRadius: '999px', padding: '8px 18px', display: 'flex', alignItems: 'center' }}
          >
            <Image src="/logo.png" alt="Dariva.co" width={116} height={30} style={{ objectFit: 'contain', display: 'block' }} priority />
          </Link>

          {/* Desktop links + CTA pill */}
          <div
            className="dariva-desktop-nav"
            style={{ ...pillStyle, borderRadius: '999px', padding: '6px', display: 'flex', alignItems: 'center', gap: '2px' }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  color: '#0D1B2A',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  padding: '9px 16px',
                  borderRadius: '999px',
                  transition: 'background 0.2s ease',
                }}
                className="dariva-nav-link"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/apply"
              style={{
                background: 'linear-gradient(135deg,#1A237E,#1B9AD6)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '999px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 700,
                marginLeft: '4px',
                boxShadow: '0 6px 16px rgba(27,154,214,0.35)',
              }}
            >
              Apply Now
            </Link>
          </div>

          {/* Hamburger pill (mobile) */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="dariva-hamburger"
            style={{
              ...pillStyle,
              borderRadius: '999px',
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              cursor: 'pointer',
              padding: '14px',
              zIndex: 1001,
            }}
          >
            <span style={{ display: 'block', width: '20px', height: '2px', background: '#0D1B2A', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(4px,4px)' : 'none' }} />
            <span style={{ display: 'block', width: '20px', height: '2px', background: '#0D1B2A', transition: 'all 0.3s', opacity: open ? 0 : 1 }} />
            <span style={{ display: 'block', width: '20px', height: '2px', background: '#0D1B2A', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
          </button>
        </div>
      </motion.div>

      {/* Mobile overlay */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(13,27,42,0.98)',
        zIndex: 999,
        transform: open ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '28px',
        pointerEvents: open ? 'all' : 'none',
      }}>
        {links.map((l, i) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
            style={{
              color: 'white', textDecoration: 'none', fontSize: '26px', fontWeight: 700, letterSpacing: '0.01em',
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(12px)',
              transition: `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`,
            }}>
            {l.label}
          </Link>
        ))}
        <Link href="/apply" onClick={() => setOpen(false)}
          style={{ background: 'linear-gradient(135deg,#1A237E,#1B9AD6)', color: 'white', padding: '14px 40px', borderRadius: '999px', textDecoration: 'none', fontSize: '18px', fontWeight: 700, marginTop: '8px' }}>
          Apply Now
        </Link>
        <a href="https://wa.me/264813404364" target="_blank" rel="noopener noreferrer"
          style={{ color: '#4FC3F7', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>
          WhatsApp: +264 81 340 4364
        </a>
      </div>

      <style>{`
        .dariva-desktop-nav { display: flex !important; }
        .dariva-hamburger { display: none !important; }
        .dariva-nav-link:hover { background: rgba(26,35,126,0.06); }
        @media (max-width: 900px) {
          .dariva-desktop-nav { display: none !important; }
          .dariva-hamburger { display: flex !important; }
        }
      `}</style>
      <div style={{ height: '82px' }} />
    </>
  );
}

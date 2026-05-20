import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, ShieldCheck, Compass, ShoppingBag, Eye, Zap, Heart } from 'lucide-react';

import { ThemeProvider } from './context/ThemeContext';
import UIUXProProvider, { Magnetic } from './components/UIUXProProvider';
import WatchExplodedView from './components/WatchExplodedView';
import WatchCarousel from './components/WatchCarousel';
import WatchCustomizer from './components/WatchCustomizer';
import './App.css';

function MainApp() {
  const [customizingWatch, setCustomizingWatch] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [heroMousePos, setHeroMousePos] = useState({ x: 0, y: 0 });

  // Handle hero mouse move tilt effect
  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setHeroMousePos({ x, y });
  };

  // Scroll to section helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Navigation Header */}
      <nav className="nav-header">
        <div className="nav-logo clickable">
          Chronos<span style={{ color: 'var(--primary)' }}>.</span>
        </div>
        
        <ul className="nav-links">
          <li>
            <a href="#hero" className="nav-link clickable" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
              Home
            </a>
          </li>
          <li>
            <a href="#exploded" className="nav-link clickable" onClick={(e) => { e.preventDefault(); scrollToSection('exploded'); }}>
              Exploded View
            </a>
          </li>
          <li>
            <a href="#collection" className="nav-link clickable" onClick={(e) => { e.preventDefault(); scrollToSection('collection'); }}>
              Collection
            </a>
          </li>
          <li>
            <a href="#lab" className="nav-link clickable" onClick={(e) => { e.preventDefault(); setCustomizingWatch(true); }}>
              Design Lab
            </a>
          </li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Cart Icon */}
          <div style={{ position: 'relative', cursor: 'pointer' }} className="clickable" onClick={() => setCustomizingWatch(true)}>
            <ShoppingBag size={20} />
            <div style={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: 'var(--primary)',
              color: 'black',
              fontSize: '0.6rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              0
            </div>
          </div>

          <Magnetic strength={0.3}>
            <button className="nav-cta clickable" onClick={() => setCustomizingWatch(true)}>
              Customize Lab
            </button>
          </Magnetic>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="hero" onMouseMove={handleHeroMouseMove} onMouseLeave={() => setHeroMousePos({ x: 0, y: 0 })}>
        <div className="hero-grid">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="hero-badge">
              <div className="hero-badge-pulse" />
              Swiss Chronometers Edition
            </div>
            
            <h1 className="hero-title">
              Temporal Precision <br />
              <span className="font-serif" style={{ color: 'var(--primary)', fontStyle: 'italic', textTransform: 'lowercase' }}>redefined.</span>
            </h1>
            
            <p className="hero-subtitle">
              Hand-assembled mechanical masterpieces forged with surgical-grade steel and calibrated with micro-second accuracy. Witness engineering in its purest form.
            </p>

            <div className="hero-actions">
              <Magnetic strength={0.25}>
                <button 
                  className="button-3d clickable" 
                  onClick={() => scrollToSection('exploded')}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  Explore Mechanics <ArrowRight size={16} />
                </button>
              </Magnetic>
              
              <button 
                className="clickable"
                onClick={() => scrollToSection('collection')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderBottom: '1px solid var(--primary)',
                  paddingBottom: '4px'
                }}
              >
                View Collection
              </button>
            </div>
          </motion.div>

          {/* Right Watch Graphic (Floating and Tilted) */}
          <div className="hero-visual">
            <div className="hero-glow-ring" />
            
            <motion.div
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                position: 'relative',
                zIndex: 10
              }}
              animate={{
                y: [0, -12, 0],
                rotateX: heroMousePos.y * -15,
                rotateY: heroMousePos.x * 15,
                rotateZ: [0, 2, -2, 0]
              }}
              transition={{
                y: { repeat: Infinity, duration: 5, ease: 'easeInOut' },
                rotateZ: { repeat: Infinity, duration: 10, ease: 'easeInOut' },
                rotateX: { type: 'spring', stiffness: 200, damping: 20 },
                rotateY: { type: 'spring', stiffness: 200, damping: 20 }
              }}
            >
              {/* Grand Showcase SVG Watch */}
              <svg width="280" height="360" viewBox="0 0 220 280">
                <defs>
                  {/* Steel textures */}
                  <linearGradient id="hero-steel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="25%" stopColor="#b8c2cc" />
                    <stop offset="45%" stopColor="#8d99ae" />
                    <stop offset="55%" stopColor="#f8f9fa" />
                    <stop offset="75%" stopColor="#4a5568" />
                    <stop offset="100%" stopColor="#b8c2cc" />
                  </linearGradient>
                  
                  <linearGradient id="hero-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#faf0d7" />
                    <stop offset="30%" stopColor="#d4af37" />
                    <stop offset="50%" stopColor="#aa7c11" />
                    <stop offset="70%" stopColor="#f3e5ab" />
                    <stop offset="85%" stopColor="#aa7c11" />
                    <stop offset="100%" stopColor="#d4af37" />
                  </linearGradient>

                  <linearGradient id="hero-gold-light" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f3e5ab" />
                    <stop offset="100%" stopColor="#d4af37" />
                  </linearGradient>
                  
                  <linearGradient id="hero-gold-dark" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#aa7c11" />
                    <stop offset="100%" stopColor="#805d08" />
                  </linearGradient>

                  <radialGradient id="hero-dial-grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1c1d22" />
                    <stop offset="70%" stopColor="#0b0c10" />
                    <stop offset="100%" stopColor="#020204" />
                  </radialGradient>
                  
                  <linearGradient id="hero-strap-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0f0f12" />
                    <stop offset="20%" stopColor="#1b1c21" />
                    <stop offset="50%" stopColor="#25272e" />
                    <stop offset="80%" stopColor="#1b1c21" />
                    <stop offset="100%" stopColor="#0f0f12" />
                  </linearGradient>

                  <filter id="hero-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="12" stdDeviation="15" floodColor="#000000" floodOpacity="0.7" />
                  </filter>
                </defs>

                {/* Strap with Realistic Textured Ribbing & Golden Stitches */}
                <g filter="url(#hero-shadow)">
                  {/* Top Strap */}
                  <path d="M 85,10 L 135,10 L 130,80 L 90,80 Z" fill="url(#hero-strap-grad)" />
                  {/* Bottom Strap */}
                  <path d="M 90,200 L 130,200 L 135,270 L 85,270 Z" fill="url(#hero-strap-grad)" />
                  
                  {/* Stitching lines */}
                  <path d="M 88,10 L 93,80" stroke="#d4af37" strokeWidth="0.8" strokeDasharray="3,2" strokeOpacity="0.4" />
                  <path d="M 132,10 L 127,80" stroke="#d4af37" strokeWidth="0.8" strokeDasharray="3,2" strokeOpacity="0.4" />
                  <path d="M 93,200 L 88,270" stroke="#d4af37" strokeWidth="0.8" strokeDasharray="3,2" strokeOpacity="0.4" />
                  <path d="M 127,200 L 132,270" stroke="#d4af37" strokeWidth="0.8" strokeDasharray="3,2" strokeOpacity="0.4" />
                  
                  {/* Strap End Steel Caps */}
                  <path d="M 85,10 L 135,10 L 135,14 L 85,14 Z" fill="url(#hero-steel-grad)" />
                  <path d="M 85,266 L 135,266 L 135,270 L 85,270 Z" fill="url(#hero-steel-grad)" />
                </g>

                {/* Stainless Steel Lugs & Outer Case with Chamfers */}
                <g filter="url(#hero-shadow)">
                  {/* Lugs */}
                  <path d="M 76,70 L 86,45 L 94,45 L 86,70 Z" fill="url(#hero-steel-grad)" stroke="#1a202c" strokeWidth="0.3" />
                  <path d="M 144,70 L 134,45 L 126,45 L 134,70 Z" fill="url(#hero-steel-grad)" stroke="#1a202c" strokeWidth="0.3" />
                  <path d="M 76,210 L 86,235 L 94,235 L 86,210 Z" fill="url(#hero-steel-grad)" stroke="#1a202c" strokeWidth="0.3" />
                  <path d="M 144,210 L 134,235 L 126,235 L 134,210 Z" fill="url(#hero-steel-grad)" stroke="#1a202c" strokeWidth="0.3" />

                  {/* Main Rounded Case */}
                  <rect x="74" y="68" width="72" height="144" rx="36" fill="url(#hero-steel-grad)" />
                  <circle cx="110" cy="140" r="58" fill="url(#hero-steel-grad)" stroke="#1e293b" strokeWidth="0.5" />
                  
                  {/* Crown Guard & Fluted Crown */}
                  <rect x="166" y="132" width="6" height="16" rx="1.5" fill="url(#hero-steel-grad)" stroke="#000" strokeWidth="0.4" />
                  <line x1="168" y1="133" x2="168" y2="147" stroke="#334155" strokeWidth="0.6" />
                  <line x1="170" y1="133" x2="170" y2="147" stroke="#334155" strokeWidth="0.6" />

                  {/* Polished Gold Bezel Inner Ring */}
                  <circle cx="110" cy="140" r="50" fill="url(#hero-gold-grad)" />
                  <circle cx="110" cy="140" r="48" fill="#0d0d0f" />
                </g>

                {/* Sunburst Dial Surface */}
                <circle cx="110" cy="140" r="44" fill="url(#hero-dial-grad)" />

                {/* Concentric Guilloche Lines on Dial */}
                <circle cx="110" cy="140" r="38" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                <circle cx="110" cy="140" r="30" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

                {/* Sub-dials (Chronographs) */}
                <g opacity="0.65">
                  {/* Left Chrono */}
                  <circle cx="94" cy="140" r="10" fill="rgba(0,0,0,0.4)" stroke="rgba(197, 168, 128, 0.2)" strokeWidth="0.5" />
                  <line x1="94" y1="140" x2="90" y2="136" stroke="#d4af37" strokeWidth="0.6" />
                  
                  {/* Bottom Chrono */}
                  <circle cx="110" cy="155" r="10" fill="rgba(0,0,0,0.4)" stroke="rgba(197, 168, 128, 0.2)" strokeWidth="0.5" />
                  <line x1="110" y1="155" x2="110" y2="148" stroke="#d4af37" strokeWidth="0.6" />
                </g>

                {/* Beveled 3D Hour Indexes */}
                <g>
                  {/* 12 o'clock (Dual Index) */}
                  <path d="M 108,100 L 112,100 L 111,107 L 109,107 Z" fill="url(#hero-gold-light)" />
                  <path d="M 110,100 L 112,100 L 111,107 Q 110,105 110,107 Z" fill="url(#hero-gold-dark)" />
                  
                  {/* 3 o'clock */}
                  <path d="M 148,138 L 148,142 L 141,141 L 141,139 Z" fill="url(#hero-gold-light)" />
                  <path d="M 148,140 L 148,142 L 141,141 Q 143,140 141,140 Z" fill="url(#hero-gold-dark)" />

                  {/* 6 o'clock */}
                  <path d="M 108,180 L 112,180 L 111,173 L 109,173 Z" fill="url(#hero-gold-light)" />
                  <path d="M 110,180 L 112,180 L 111,173 Q 110,175 110,173 Z" fill="url(#hero-gold-dark)" />

                  {/* 9 o'clock */}
                  <path d="M 72,138 L 72,142 L 79,141 L 79,139 Z" fill="url(#hero-gold-light)" />
                  <path d="M 72,140 L 72,142 L 79,141 Q 77,140 79,140 Z" fill="url(#hero-gold-dark)" />

                  {/* Other hour marks */}
                  <circle cx="127" cy="110" r="1.8" fill="url(#hero-gold-grad)" />
                  <circle cx="139" cy="122" r="1.8" fill="url(#hero-gold-grad)" />
                  <circle cx="139" cy="158" r="1.8" fill="url(#hero-gold-grad)" />
                  <circle cx="127" cy="170" r="1.8" fill="url(#hero-gold-grad)" />
                  <circle cx="93" cy="170" r="1.8" fill="url(#hero-gold-grad)" />
                  <circle cx="81" cy="158" r="1.8" fill="url(#hero-gold-grad)" />
                  <circle cx="81" cy="122" r="1.8" fill="url(#hero-gold-grad)" />
                  <circle cx="93" cy="110" r="1.8" fill="url(#hero-gold-grad)" />
                </g>

                {/* Sub-second ticks */}
                <circle cx="110" cy="140" r="43" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" strokeDasharray="1,2" />

                {/* Brand Text */}
                <text x="110" y="125" fontSize="5.5" fill="url(#hero-gold-grad)" fontWeight="700" textAnchor="middle" letterSpacing="1.8">CHRONOS</text>
                <text x="110" y="130" fontSize="3" fill="#cbd5e1" opacity="0.6" textAnchor="middle" letterSpacing="1">GENÈVE</text>

                {/* Faceted Metallic Hands (Dual-Polygon 3D look) */}
                <g>
                  {/* Hour Hand: angled at 10:10 (creased geometry) */}
                  <g transform="rotate(-30 110 140)">
                    {/* Left half - light gold */}
                    <polygon points="110,140 108.5,138 108.5,115 110,113" fill="url(#hero-gold-light)" />
                    {/* Right half - dark gold */}
                    <polygon points="110,140 111.5,138 111.5,115 110,113" fill="url(#hero-gold-dark)" />
                  </g>
                  
                  {/* Minute Hand: angled (creased geometry) */}
                  <g transform="rotate(40 110 140)">
                    {/* Left half - light gold */}
                    <polygon points="110,140 108.5,138 108.5,102 110,100" fill="url(#hero-gold-light)" />
                    {/* Right half - dark gold */}
                    <polygon points="110,140 111.5,138 111.5,102 110,100" fill="url(#hero-gold-dark)" />
                  </g>

                  {/* Sweep Second Hand in Polished Steel/Gold */}
                  <g transform="rotate(185 110 140)">
                    <line x1="110" y1="140" x2="110" y2="94" stroke="#d4af37" strokeWidth="0.6" />
                    <circle cx="110" cy="98" r="1.5" fill="#d4af37" />
                    {/* Counterweight */}
                    <line x1="110" y1="140" x2="110" y2="152" stroke="#d4af37" strokeWidth="1" />
                  </g>

                  {/* Polished Center Pin Cap */}
                  <circle cx="110" cy="140" r="3.2" fill="#1e293b" />
                  <circle cx="110" cy="140" r="2.2" fill="url(#hero-gold-grad)" />
                  <circle cx="110" cy="140" r="0.8" fill="#ffffff" opacity="0.7" />
                </g>

                {/* Sapphire Glass Reflection Overlay */}
                <path d="M 76,104 C 95,96 125,96 144,104 C 148,124 148,156 144,176 C 125,184 95,184 76,176 C 72,156 72,124 76,104 Z" 
                      fill="url(#hero-steel-grad)" opacity="0.06" pointerEvents="none" />
                
                {/* Modern Lens Flare Reflection Slash */}
                <path d="M 74,90 L 140,200 L 146,190 L 80,80 Z" fill="#ffffff" opacity="0.04" pointerEvents="none" />
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Exploded View Section */}
      <section id="exploded" style={{ paddingTop: '80px' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="font-serif" style={{ color: 'var(--primary)', fontStyle: 'italic', fontSize: '1.2rem', display: 'block', marginBottom: '8px' }}>
            Exploded View Anatomy
          </span>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Inside The Machine
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginTop: '8px', maxWidth: '600px', margin: '8px auto 0' }}>
            Scroll to disassemble the timepiece. Observe how components align into a single, cohesive mechanical construct.
          </p>
        </div>

        <WatchExplodedView />
      </section>

      {/* Collection / Carousel Section */}
      <WatchCarousel onCustomize={(model) => setCustomizingWatch(model)} />

      {/* Design Lab Promo Section */}
      <section style={{ padding: '120px 40px', background: 'radial-gradient(circle at center, rgba(197,168,128,0.06) 0%, transparent 60%)', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
          <Compass size={48} style={{ color: 'var(--primary)' }} />
          <h2 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', lineHeight: '1.1' }}>
            Design Your Own <br />Chronos Masterpiece
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px' }}>
            Enter the digital design lab to tailor the materials, straps, index details, and engrave a personal inscription directly onto the movement plates.
          </p>
          <Magnetic strength={0.25}>
            <button className="button-3d clickable" onClick={() => setCustomizingWatch(true)}>
              Enter Design Lab
            </button>
          </Magnetic>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="nav-logo" style={{ marginBottom: '20px' }}>
              Chronos<span style={{ color: 'var(--primary)' }}>.</span>
            </div>
            <p className="footer-desc">
              Forging fine Swiss automatic timepieces for collectors of precision mechanical engineering.
            </p>
          </div>
          
          <div className="footer-col">
            <h4>Collection</h4>
            <ul className="footer-links">
              <li><a href="#collection" className="footer-link clickable" onClick={(e) => { e.preventDefault(); scrollToSection('collection'); }}>The Odyssey</a></li>
              <li><a href="#collection" className="footer-link clickable" onClick={(e) => { e.preventDefault(); scrollToSection('collection'); }}>The Monarch</a></li>
              <li><a href="#collection" className="footer-link clickable" onClick={(e) => { e.preventDefault(); scrollToSection('collection'); }}>The Vanguard</a></li>
              <li><a href="#collection" className="footer-link clickable" onClick={(e) => { e.preventDefault(); scrollToSection('collection'); }}>The Stealth</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Anatomy</h4>
            <ul className="footer-links">
              <li><a href="#exploded" className="footer-link clickable" onClick={(e) => { e.preventDefault(); scrollToSection('exploded'); }}>Swiss Caliber</a></li>
              <li><a href="#exploded" className="footer-link clickable" onClick={(e) => { e.preventDefault(); scrollToSection('exploded'); }}>Case Engravings</a></li>
              <li><a href="#exploded" className="footer-link clickable" onClick={(e) => { e.preventDefault(); scrollToSection('exploded'); }}>Sapphire Crystal</a></li>
              <li><a href="#exploded" className="footer-link clickable" onClick={(e) => { e.preventDefault(); scrollToSection('exploded'); }}>Dial Assembly</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link clickable">Our Story</a></li>
              <li><a href="#" className="footer-link clickable">Chronometer Certification</a></li>
              <li><a href="#" className="footer-link clickable">Insured Shipping</a></li>
              <li><a href="#" className="footer-link clickable">Customer Vault</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Chronos Watch Company. All rights reserved. Crafted in Switzerland.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" className="footer-link clickable">Privacy Policy</a>
            <a href="#" className="footer-link clickable">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Watch Customizer Drawer / Modal Overlay */}
      <AnimatePresence>
        {customizingWatch && (
          <WatchCustomizer 
            activeModel={typeof customizingWatch === 'object' ? customizingWatch : null} 
            onClose={() => setCustomizingWatch(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UIUXProProvider>
        <MainApp />
      </UIUXProProvider>
    </ThemeProvider>
  );
}

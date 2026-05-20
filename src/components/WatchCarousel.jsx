import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, Eye, Zap, Shield, RotateCcw } from 'lucide-react';
import { Magnetic } from './UIUXProProvider';
import { useTheme } from '../context/ThemeContext';

const watchModels = [
  {
    id: 'odyssey',
    name: 'The Odyssey',
    tagline: 'Luxury Automatic Chronograph',
    price: '$2,450',
    colorName: 'Champagne Gold & Steel',
    accentColor: '#c5a880',
    specs: ['42mm Case', 'Valjoux 7750 Movement', '100m Water Resistant', 'Sapphire Back'],
    svgType: 'gold_steel'
  },
  {
    id: 'monarch',
    name: 'The Monarch',
    tagline: 'Classic Guilloché Dress Watch',
    price: '$1,890',
    colorName: 'Rose Gold & Alabaster',
    accentColor: '#e5b8a8',
    specs: ['40mm Case', 'Sellita SW200 Movement', '50m Water Resistant', 'Alligator Leather'],
    svgType: 'rose_white'
  },
  {
    id: 'vanguard',
    name: 'The Vanguard',
    tagline: 'Tactical Matte Titanium',
    price: '$2,990',
    colorName: 'Space Grey Titanium & Carbon',
    accentColor: '#00f2fe',
    specs: ['43mm Case', 'COSC Chronometer', '300m Helium Valve', 'Sandblasted Finish'],
    svgType: 'titanium_carbon'
  },
  {
    id: 'stealth',
    name: 'The Stealth',
    tagline: 'Obsidian Black Minimalist',
    price: '$1,650',
    colorName: 'Dlc Carbon & Matte Black',
    accentColor: '#ff007f',
    specs: ['41mm Case', 'Custom Caliber 11', '100m Water Resistant', 'Super-LumiNova Dark'],
    svgType: 'obsidian_black'
  }
];

export default function WatchCarousel({ onCustomize }) {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % watchModels.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + watchModels.length) % watchModels.length);
  };

  const handleMouseMove = (e, idx) => {
    if (idx !== activeIndex) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2); // -1 to 1
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2); // -1 to 1
    setMousePos({ x, y });
  };

  const renderWatchSVG = (type, active) => {
    // Determine materials
    let strapFill = '#111';
    let strapType = 'leather';
    let caseGrad = 'url(#cr-steel)';
    let bezelGrad = 'url(#cr-steel)';
    let dialGrad = 'url(#cr-dial-dark)';
    let accentColor = '#c5a880';
    let accentLight = 'url(#cr-accent-gold-light)';
    let accentDark = 'url(#cr-accent-gold-dark)';
    let hasSubdials = false;
    let strapStitch = 'rgba(255,255,255,0.06)';

    if (type === 'gold_steel') {
      strapFill = '#1b1b22';
      strapType = 'leather';
      caseGrad = 'url(#cr-steel)';
      bezelGrad = 'url(#cr-gold)';
      dialGrad = 'url(#cr-dial-dark)';
      accentColor = '#d4af37';
      accentLight = 'url(#cr-accent-gold-light)';
      accentDark = 'url(#cr-accent-gold-dark)';
      hasSubdials = true;
      strapStitch = '#d4af37';
    } else if (type === 'rose_white') {
      strapFill = '#4c2e24'; // deep brown leather
      strapType = 'leather';
      caseGrad = 'url(#cr-rose)';
      bezelGrad = 'url(#cr-rose)';
      dialGrad = 'url(#cr-dial-alabaster)';
      accentColor = '#c59d8f';
      accentLight = 'url(#cr-accent-rose-light)';
      accentDark = 'url(#cr-accent-rose-dark)';
      strapStitch = '#e5b8a8';
    } else if (type === 'titanium_carbon') {
      strapFill = '#3f3f46'; // tactical grey
      strapType = 'nato';
      caseGrad = 'url(#cr-titanium)';
      bezelGrad = 'url(#cr-titanium)';
      dialGrad = 'url(#cr-dial-carbon)';
      accentColor = '#00f2fe';
      accentLight = 'url(#cr-accent-blue-light)';
      accentDark = 'url(#cr-accent-blue-dark)';
    } else if (type === 'obsidian_black') {
      strapFill = '#09090b';
      strapType = 'leather';
      caseGrad = 'url(#cr-obsidian)';
      bezelGrad = 'url(#cr-obsidian)';
      dialGrad = 'url(#cr-dial-stealth)';
      accentColor = '#ff007f';
      accentLight = 'url(#cr-accent-pink-light)';
      accentDark = 'url(#cr-accent-pink-dark)';
      strapStitch = '#ff007f';
    }

    return (
      <svg width="220" height="280" viewBox="0 0 220 280">
        <defs>
          {/* Metal gradients */}
          <linearGradient id="cr-steel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="70%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          <linearGradient id="cr-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff8e7" />
            <stop offset="35%" stopColor="#d4af37" />
            <stop offset="60%" stopColor="#aa7c11" />
            <stop offset="85%" stopColor="#faf0d7" />
            <stop offset="100%" stopColor="#aa7c11" />
          </linearGradient>

          <linearGradient id="cr-rose" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff5f2" />
            <stop offset="35%" stopColor="#e5b8a8" />
            <stop offset="60%" stopColor="#ab7c6d" />
            <stop offset="85%" stopColor="#fdf1ec" />
            <stop offset="100%" stopColor="#8c584a" />
          </linearGradient>

          <linearGradient id="cr-titanium" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4d4d8" />
            <stop offset="40%" stopColor="#71717a" />
            <stop offset="75%" stopColor="#27272a" />
            <stop offset="100%" stopColor="#52525b" />
          </linearGradient>

          <linearGradient id="cr-obsidian" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#52525b" />
            <stop offset="40%" stopColor="#18181b" />
            <stop offset="75%" stopColor="#09090b" />
            <stop offset="100%" stopColor="#27272a" />
          </linearGradient>

          {/* Accent light/dark highlights for faceted hands/markers */}
          <linearGradient id="cr-accent-gold-light" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#faf0d7" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>
          <linearGradient id="cr-accent-gold-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#aa7c11" />
            <stop offset="100%" stopColor="#664600" />
          </linearGradient>

          <linearGradient id="cr-accent-rose-light" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff0eb" />
            <stop offset="100%" stopColor="#e5b8a8" />
          </linearGradient>
          <linearGradient id="cr-accent-rose-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ab7c6d" />
            <stop offset="100%" stopColor="#663b2f" />
          </linearGradient>

          <linearGradient id="cr-accent-blue-light" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#00f2fe" />
          </linearGradient>
          <linearGradient id="cr-accent-blue-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" />
            <stop offset="100%" stopColor="#005f66" />
          </linearGradient>

          <linearGradient id="cr-accent-pink-light" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ff007f" />
          </linearGradient>
          <linearGradient id="cr-accent-pink-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff007f" />
            <stop offset="100%" stopColor="#800040" />
          </linearGradient>

          {/* Strap cylinder shading */}
          <linearGradient id="cr-strap-shading" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.55" />
            <stop offset="25%" stopColor="#000" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.16" />
            <stop offset="75%" stopColor="#000" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
          </linearGradient>

          {/* Dial variations */}
          <radialGradient id="cr-dial-dark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e1f26" />
            <stop offset="85%" stopColor="#0c0d10" />
            <stop offset="100%" stopColor="#010102" />
          </radialGradient>

          <radialGradient id="cr-dial-alabaster" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="85%" stopColor="#f5f5f7" />
            <stop offset="100%" stopColor="#e2e2e6" />
          </radialGradient>

          <radialGradient id="cr-dial-carbon" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2c2d30" />
            <stop offset="80%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </radialGradient>

          <radialGradient id="cr-dial-stealth" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#131317" />
            <stop offset="90%" stopColor="#08080a" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>

          {/* Card shadow */}
          <filter id="cr-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000" floodOpacity="0.65" />
          </filter>
        </defs>

        {/* Strap with Cylindrical shading & details */}
        <g filter="url(#cr-shadow)">
          {strapType === 'leather' && (
            <g>
              <rect x="85" y="10" width="50" height="70" rx="3" fill={strapFill} />
              <rect x="85" y="200" width="50" height="70" rx="3" fill={strapFill} />
              <rect x="85" y="10" width="50" height="70" rx="3" fill="url(#cr-strap-shading)" />
              <rect x="85" y="200" width="50" height="70" rx="3" fill="url(#cr-strap-shading)" />
              
              {/* Stitching lines */}
              <line x1="88" y1="10" x2="88" y2="80" stroke={strapStitch} strokeWidth="0.8" strokeDasharray="3,2" strokeOpacity="0.35" />
              <line x1="132" y1="10" x2="132" y2="80" stroke={strapStitch} strokeWidth="0.8" strokeDasharray="3,2" strokeOpacity="0.35" />
              <line x1="88" y1="200" x2="88" y2="270" stroke={strapStitch} strokeWidth="0.8" strokeDasharray="3,2" strokeOpacity="0.35" />
              <line x1="132" y1="200" x2="132" y2="270" stroke={strapStitch} strokeWidth="0.8" strokeDasharray="3,2" strokeOpacity="0.35" />
            </g>
          )}

          {strapType === 'nato' && (
            <g>
              <rect x="88" y="5" width="44" height="270" fill={strapFill} />
              <rect x="88" y="5" width="44" height="270" fill="url(#cr-strap-shading)" />
              <line x1="110" y1="5" x2="110" y2="275" stroke="rgba(0,0,0,0.5)" strokeWidth="4" />
            </g>
          )}
        </g>

        {/* Case & Lugs with chamfers */}
        <g filter="url(#cr-shadow)">
          {/* Lugs */}
          <path d="M 76,70 L 86,45 L 94,45 L 86,70 Z" fill={caseGrad} />
          <path d="M 144,70 L 134,45 L 126,45 L 134,70 Z" fill={caseGrad} />
          <path d="M 76,210 L 86,235 L 94,235 L 86,210 Z" fill={caseGrad} />
          <path d="M 144,210 L 134,235 L 126,235 L 134,210 Z" fill={caseGrad} />

          {/* Case Ring */}
          <rect x="74" y="68" width="72" height="144" rx="36" fill={caseGrad} />
          <circle cx="110" cy="140" r="56" fill={caseGrad} />
          
          {/* Crown */}
          <rect x="164" y="132" width="6" height="16" rx="1.5" fill={bezelGrad} stroke="#000" strokeWidth="0.3" />
          <line x1="166" y1="133" x2="166" y2="147" stroke="rgba(0,0,0,0.4)" strokeWidth="0.6" />
          <line x1="168" y1="133" x2="168" y2="147" stroke="rgba(0,0,0,0.4)" strokeWidth="0.6" />

          {/* Bezel Ring */}
          <circle cx="110" cy="140" r="48" fill={bezelGrad} stroke="rgba(0,0,0,0.4)" strokeWidth="0.5" />
          <circle cx="110" cy="140" r="46" fill="#151518" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        </g>

        {/* Dial Surface */}
        <circle cx="110" cy="140" r="42" fill={dialGrad} />

        {/* Dial Guilloche / Textures */}
        {type === 'rose_white' && (
          <circle cx="110" cy="140" r="34" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
        )}
        {type === 'titanium_carbon' && (
          <g opacity="0.1">
            <line x1="72" y1="120" x2="148" y2="120" stroke="#fff" strokeWidth="0.5" />
            <line x1="72" y1="130" x2="148" y2="130" stroke="#fff" strokeWidth="0.5" />
            <line x1="72" y1="140" x2="148" y2="140" stroke="#fff" strokeWidth="0.5" />
            <line x1="72" y1="150" x2="148" y2="150" stroke="#fff" strokeWidth="0.5" />
            <line x1="72" y1="160" x2="148" y2="160" stroke="#fff" strokeWidth="0.5" />
          </g>
        )}

        {/* Chronograph sub-dials */}
        {hasSubdials && (
          <g opacity="0.5">
            <circle cx="96" cy="140" r="9" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <circle cx="110" cy="154" r="9" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <line x1="96" y1="140" x2="93" y2="137" stroke="#d4af37" strokeWidth="0.5" />
          </g>
        )}

        {/* Beveled 3D Hour Markers */}
        <g>
          {/* 12 */}
          <path d="M 108.5,103 L 111.5,103 L 110.5,108 L 109.5,108 Z" fill={accentLight} />
          <path d="M 110,103 L 111.5,103 L 110.5,108 Q 110,106.5 110,108 Z" fill={accentDark} />
          
          {/* 3 */}
          <path d="M 147,138.5 L 147,141.5 L 142,140.5 L 142,139.5 Z" fill={accentLight} />
          <path d="M 147,140 L 147,141.5 L 142,140.5 Q 143.5,140 142,140 Z" fill={accentDark} />

          {/* 6 */}
          <path d="M 108.5,177 L 111.5,177 L 110.5,172 L 109.5,172 Z" fill={accentLight} />
          <path d="M 110,177 L 111.5,177 L 110.5,172 Q 110,173.5 110,172 Z" fill={accentDark} />

          {/* 9 */}
          <path d="M 73,138.5 L 73,141.5 L 78,140.5 L 78,139.5 Z" fill={accentLight} />
          <path d="M 73,140 L 73,141.5 L 78,140.5 Q 75.5,140 78,140 Z" fill={accentDark} />

          {/* Sub markers */}
          {[30, 60, 120, 150, 210, 240, 300, 330].map((angle) => (
            <g key={angle} transform={`rotate(${angle}, 110, 140)`}>
              <circle cx="110" cy="107" r="1.2" fill={accentColor} opacity="0.7" />
            </g>
          ))}
        </g>

        {/* Brand Text */}
        <text x="110" y="125" fontSize="4.5" fill={accentColor} fontWeight="bold" textAnchor="middle" letterSpacing="1">CHRONOS</text>

        {/* Hands (Faceted 3D Metal creased look) */}
        <g>
          {/* Hour Hand: 10:10 angle */}
          <g transform="rotate(-30 110 140)">
            <polygon points="110,140 108.5,138 108.5,116 110,114" fill={accentLight} />
            <polygon points="110,140 111.5,138 111.5,116 110,114" fill={accentDark} />
          </g>
          
          {/* Minute Hand */}
          <g transform="rotate(40 110 140)">
            <polygon points="110,140 108.5,138 108.5,105 110,103" fill={accentLight} />
            <polygon points="110,140 111.5,138 111.5,105 110,103" fill={accentDark} />
          </g>

          {/* Sweep Second Hand */}
          <g transform="rotate(185 110 140)">
            <line x1="110" y1="140" x2="110" y2="97" stroke={type === 'rose_white' ? '#ab7c6d' : '#ef4444'} strokeWidth="0.6" />
            <circle cx="110" cy="100" r="1" fill={type === 'rose_white' ? '#ab7c6d' : '#ef4444'} />
          </g>

          {/* Center Pin */}
          <circle cx="110" cy="140" r="2.8" fill="#1e293b" />
          <circle cx="110" cy="140" r="1.8" fill={accentColor} />
        </g>
        
        {/* Glass reflection shine (Upgraded sapphire AR coat double glare) */}
        <circle cx="110" cy="140" r="41.5" fill="rgba(66, 133, 244, 0.02)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" pointerEvents="none" />
        <circle cx="110" cy="140" r="40.5" fill="none" stroke="rgba(66, 133, 244, 0.15)" strokeWidth="1" pointerEvents="none" />
        <path d="M 82,112 C 95,95 125,95 138,112 C 127,107 93,107 82,112 Z" fill="rgba(255, 255, 255, 0.28)" pointerEvents="none" />
        <path d="M 83,168 C 96,185 126,185 139,168 C 128,163 94,163 83,168 Z" fill="rgba(255, 255, 255, 0.1)" pointerEvents="none" />
      </svg>
    );
  };

  return (
    <section className="carousel-section" id="collection" style={{ padding: '100px 0', overflow: 'hidden', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="font-serif" style={{ color: 'var(--primary)', fontStyle: 'italic', fontSize: '1.2rem', display: 'block', marginBottom: '8px' }}>
            Exclusive Masterpieces
          </span>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Explore Our Collection
          </h2>
          <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--primary)', margin: '16px auto 0' }} />
        </div>

        {/* 3D Carousel Stage */}
        <div style={{
          position: 'relative',
          height: '470px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1200px',
          margin: '0 auto',
          maxWidth: '1000px'
        }}>
          {watchModels.map((model, idx) => {
            // Calculate distance to active
            const offset = (idx - activeIndex + watchModels.length) % watchModels.length;
            
            // Format distance in a circular list
            let displayOffset = offset;
            if (offset > watchModels.length / 2) {
              displayOffset = offset - watchModels.length;
            }

            const isActive = idx === activeIndex;
            const isLeft = displayOffset === -1 || (displayOffset === watchModels.length - 1 && watchModels.length > 2);
            const isRight = displayOffset === 1 || (displayOffset === -watchModels.length + 1 && watchModels.length > 2);
            const isVisible = isActive || isLeft || isRight;

            if (!isVisible) return null;

            // Styles based on positions
            let x = '0%';
            let rotateY = 0;
            let translateZ = 0;
            let opacity = 0;
            let zIndex = 0;

            if (isActive) {
              x = '0%';
              rotateY = hoveredCard === idx ? mousePos.x * 12 : 0;
              const rotateX = hoveredCard === idx ? -mousePos.y * 12 : 0;
              translateZ = 60;
              opacity = 1;
              zIndex = 10;
            } else if (isLeft) {
              x = '-65%';
              rotateY = 32;
              translateZ = -140;
              opacity = 0.45;
              zIndex = 5;
            } else if (isRight) {
              x = '65%';
              rotateY = -32;
              translateZ = -140;
              opacity = 0.45;
              zIndex = 5;
            }

            return (
              <motion.div
                key={model.id}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setMousePos({ x: 0, y: 0 });
                }}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(idx);
                  }
                }}
                animate={{
                  x,
                  rotateY,
                  rotateX: isActive && hoveredCard === idx ? -mousePos.y * 12 : 0,
                  z: translateZ,
                  opacity,
                  scale: isActive ? 1.05 : 0.85
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 24,
                  mass: 0.8
                }}
                className="glass-panel"
                render-radius="24px"
                style={{
                  position: 'absolute',
                  width: '330px',
                  height: '440px',
                  zIndex,
                  transformStyle: 'preserve-3d',
                  cursor: isActive ? 'default' : 'pointer',
                  borderRadius: '24px',
                  padding: '22px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: isActive 
                    ? '1px solid var(--primary)' 
                    : theme === 'dark' 
                      ? '1px solid rgba(255, 255, 255, 0.1)' 
                      : '1px solid rgba(0, 0, 0, 0.08)',
                  background: isActive 
                    ? 'var(--bg-card)' 
                    : theme === 'dark' 
                      ? 'rgba(15, 15, 18, 0.35)' 
                      : 'rgba(255, 255, 255, 0.35)',
                  boxShadow: isActive 
                    ? theme === 'dark' 
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 20px rgba(197,168,128,0.2)' 
                      : '0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 0 20px rgba(197,168,128,0.08)' 
                    : theme === 'dark'
                      ? '0 10px 25px rgba(0,0,0,0.5)'
                      : '0 10px 25px rgba(0,0,0,0.05)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                {/* 3D Depth visual highlights */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '16px',
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'var(--primary)',
                  fontWeight: 600
                }}>
                  {model.price}
                </div>

                {/* Inner Card Elements */}
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-muted)' }}>
                    {model.tagline}
                  </span>
                  <h3 style={{ fontSize: '1.6rem', marginTop: '4px', fontWeight: 800 }}>
                    {model.name}
                  </h3>
                </div>

                {/* Main Watch SVG Render (Scaled to fit nicely without overlap) */}
                <motion.div
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'translateZ(20px) scale(0.66)',
                    margin: '-30px 0'
                  }}
                  animate={{
                    rotateZ: isActive ? 0 : [0, 5, -5, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: 'easeInOut'
                  }}
                >
                  {renderWatchSVG(model.svgType, isActive)}
                </motion.div>

                {/* Specs / CTA (Translated forward on Z-axis to stay in front of watch straps) */}
                <div style={{ 
                  width: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '16px',
                  transform: 'translateZ(45px)',
                  transformStyle: 'preserve-3d'
                }}>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', maxWidth: '90%' }}
                    >
                      {model.specs.slice(0, 2).map((spec, i) => (
                        <span key={i} style={{ fontSize: '0.65rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.05)' }}>
                          {spec}
                        </span>
                      ))}
                    </motion.div>
                  )}

                  <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>
                    {isActive ? (
                      <>
                        <button 
                          className="clickable"
                          onClick={() => onCustomize(model)}
                          style={{
                            padding: '10px 18px',
                            borderRadius: '10px',
                            background: 'transparent',
                            color: 'var(--text-main)',
                            border: '1px solid var(--primary)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.3s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(197, 168, 128, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <RotateCcw size={14} /> Customize
                        </button>
                        <button 
                          className="clickable"
                          style={{
                            padding: '10px 18px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                            color: 'black',
                            border: 'none',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 8px 16px -4px rgba(197,168,128,0.4)'
                          }}
                        >
                          <ShoppingBag size={14} /> Buy Now
                        </button>
                      </>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Click to view
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Left Arrow */}
          <button 
            className="clickable"
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: '-60px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 20
            }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Arrow */}
          <button 
            className="clickable"
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: '-60px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 20
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Feature Grid Below Carousel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '30px',
          marginTop: '80px'
        }}>
          <div className="glass-panel" style={{ padding: '30px', borderRadius: '16px', display: 'flex', gap: '16px' }}>
            <Zap size={32} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>Swiss Automatic</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Equipped with legendary Swiss self-winding calibers, yielding 38+ hours of reserves.</p>
            </div>
          </div>
          <div className="glass-panel" style={{ padding: '30px', borderRadius: '16px', display: 'flex', gap: '16px' }}>
            <Shield size={32} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>5-Year Warranty</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Every chronometer undergoes 20 days of rigorous testing, covered by a 5-year guarantee.</p>
            </div>
          </div>
          <div className="glass-panel" style={{ padding: '30px', borderRadius: '16px', display: 'flex', gap: '16px' }}>
            <Eye size={32} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>Exhibition Windows</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Anti-reflective sapphire crystals front and back unveil the precision of the mechanical wheels.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

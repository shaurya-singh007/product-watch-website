import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, Eye, Zap, Shield, RotateCcw } from 'lucide-react';
import { Magnetic } from './UIUXProProvider';

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
    // Generate beautiful visual SVG styles based on the theme
    let strapColor = '#18181b';
    let caseColor = 'url(#steel-grad)';
    let bezelColor = '#1f1f23';
    let dialColor = '#121214';
    let accent = 'url(#gold-grad)';
    let handsColor = '#fff';

    if (type === 'rose_white') {
      strapColor = '#4c2e24'; // deep brown leather
      caseColor = 'linear-gradient(135deg, #fdf1ec, #e5b8a8, #ac7c6d)';
      caseColor = 'url(#rose-gold-grad)';
      bezelColor = 'url(#rose-gold-grad)';
      dialColor = '#f5f5f7';
      accent = '#ac7c6d';
      handsColor = '#ac7c6d';
    } else if (type === 'titanium_carbon') {
      strapColor = '#27272a';
      caseColor = 'url(#titanium-grad)';
      bezelColor = '#3f3f46';
      dialColor = '#111';
      accent = '#00f2fe';
      handsColor = '#00f2fe';
    } else if (type === 'obsidian_black') {
      strapColor = '#09090b';
      caseColor = 'url(#obsidian-grad)';
      bezelColor = '#18181b';
      dialColor = '#09090b';
      accent = '#ff007f';
      handsColor = '#fff';
    }

    return (
      <svg width="220" height="280" viewBox="0 0 220 280" style={{ filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))' }}>
        <defs>
          <linearGradient id="rose-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff2ee" />
            <stop offset="50%" stopColor="#e5b8a8" />
            <stop offset="100%" stopColor="#a37365" />
          </linearGradient>
          <linearGradient id="titanium-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4d4d8" />
            <stop offset="50%" stopColor="#71717a" />
            <stop offset="100%" stopColor="#27272a" />
          </linearGradient>
          <linearGradient id="obsidian-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3f3f46" />
            <stop offset="50%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
        </defs>

        {/* Strap */}
        <rect x="85" y="10" width="50" height="70" rx="3" fill={strapColor} />
        <rect x="85" y="200" width="50" height="70" rx="3" fill={strapColor} />
        <line x1="88" y1="10" x2="88" y2="80" stroke="rgba(255,255,255,0.07)" strokeDasharray="3,2" />
        <line x1="132" y1="10" x2="132" y2="80" stroke="rgba(255,255,255,0.07)" strokeDasharray="3,2" />
        <line x1="88" y1="200" x2="88" y2="270" stroke="rgba(255,255,255,0.07)" strokeDasharray="3,2" />
        <line x1="132" y1="200" x2="132" y2="270" stroke="rgba(255,255,255,0.07)" strokeDasharray="3,2" />

        {/* Watch Case */}
        <rect x="75" y="70" width="70" height="140" rx="35" fill={caseColor} />
        <circle cx="110" cy="140" r="56" fill={caseColor} />
        
        {/* Crown */}
        <rect x="164" y="132" width="6" height="16" rx="1.5" fill={type === 'gold_steel' ? 'url(#gold-grad)' : type === 'rose_white' ? 'url(#rose-gold-grad)' : '#555'} />

        {/* Bezel Ring */}
        <circle cx="110" cy="140" r="48" fill={bezelColor} stroke="rgba(0,0,0,0.3)" strokeWidth="1" />

        {/* Dial Face */}
        <circle cx="110" cy="140" r="42" fill={dialColor} />
        {/* Inner track */}
        <circle cx="110" cy="140" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

        {/* Hour Markers */}
        <circle cx="110" cy="103" r="1.5" fill={accent} />
        <circle cx="110" cy="177" r="1.5" fill={accent} />
        <circle cx="73" cy="140" r="1.5" fill={accent} />
        <circle cx="147" cy="140" r="1.5" fill={accent} />

        {/* Logo print */}
        <text x="110" y="122" fontSize="5" fill={type === 'rose_white' ? '#555' : '#8e8e93'} textAnchor="middle" letterSpacing="1">CHRONOS</text>

        {/* Watch Hands */}
        <line x1="110" y1="140" x2="95" y2="125" stroke={handsColor} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="110" y1="140" x2="135" y2="140" stroke={handsColor} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="110" y1="140" x2="110" y2="105" stroke="#ef4444" strokeWidth="0.75" />
        <circle cx="110" cy="140" r="3" fill="#fff" />
        <circle cx="110" cy="140" r="1" fill="#000" />
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
          height: '520px',
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
                style={{
                  position: 'absolute',
                  width: '340px',
                  height: '460px',
                  zIndex,
                  transformStyle: 'preserve-3d',
                  cursor: isActive ? 'default' : 'pointer'
                }}
                className="glass-panel"
                render-radius="24px"
                style={{
                  position: 'absolute',
                  width: '340px',
                  height: '460px',
                  zIndex,
                  transformStyle: 'preserve-3d',
                  cursor: isActive ? 'default' : 'pointer',
                  borderRadius: '24px',
                  padding: '30px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: isActive ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: isActive ? 'var(--bg-card)' : 'rgba(15, 15, 18, 0.35)',
                  boxShadow: isActive ? '0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 20px rgba(197,168,128,0.2)' : '0 10px 25px rgba(0,0,0,0.5)',
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

                {/* Main Watch SVG Render */}
                <motion.div
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'translateZ(30px)',
                    margin: '10px 0'
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

                {/* Specs / CTA */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
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

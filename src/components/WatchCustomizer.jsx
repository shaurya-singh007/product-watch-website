import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Settings2, Sparkles, ShoppingBag, Eye, RefreshCw } from 'lucide-react';

const cases = [
  { id: 'steel', name: 'Stainless Steel', color: '#c0c0c5', grad: 'url(#c-steel)', price: 0 },
  { id: 'gold', name: '18K Yellow Gold', color: '#d4af37', grad: 'url(#c-gold)', price: 400 },
  { id: 'rose', name: '18K Rose Gold', color: '#e5b8a8', grad: 'url(#c-rose)', price: 450 },
  { id: 'titanium', name: 'Matte Titanium', color: '#71717a', grad: 'url(#c-titanium)', price: 300 }
];

const straps = [
  { id: 'leather-black', name: 'Black Calf Leather', color: '#18181b', type: 'leather', stroke: 'rgba(255,255,255,0.08)', price: 0 },
  { id: 'leather-brown', name: 'Brown Crocodile Leather', color: '#4c2e24', type: 'leather', stroke: 'rgba(255,255,255,0.1)', price: 50 },
  { id: 'steel-oyster', name: 'Oyster Steel Bracelet', color: '#a1a1aa', type: 'bracelet', stroke: '#71717a', price: 200 },
  { id: 'nato-grey', name: 'Tactical Grey NATO', color: '#52525b', type: 'nato', stroke: '#27272a', price: 30 }
];

const accents = [
  { id: 'gold', name: 'Classic Gold', color: '#c5a880', price: 0 },
  { id: 'blue', name: 'Electric Blue', color: '#00d2ff', price: 50 },
  { id: 'red', name: 'Crimson Ruby', color: '#ff0055', price: 50 },
  { id: 'green', name: 'Emerald Green', color: '#00ffaa', price: 75 }
];

export default function WatchCustomizer({ activeModel, onClose }) {
  const [selectedCase, setSelectedCase] = useState(cases[0]);
  const [selectedStrap, setSelectedStrap] = useState(straps[0]);
  const [selectedAccent, setSelectedAccent] = useState(accents[0]);
  const [engraving, setEngraving] = useState('');
  const [showCaseBack, setShowCaseBack] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);

  // Initialize from model preset if available
  React.useEffect(() => {
    if (activeModel) {
      if (activeModel.id === 'monarch') {
        setSelectedCase(cases.find(c => c.id === 'rose') || cases[2]);
        setSelectedStrap(straps.find(s => s.id === 'leather-brown') || straps[1]);
        setSelectedAccent(accents.find(a => a.id === 'gold') || accents[0]);
      } else if (activeModel.id === 'vanguard') {
        setSelectedCase(cases.find(c => c.id === 'titanium') || cases[3]);
        setSelectedStrap(straps.find(s => s.id === 'nato-grey') || straps[3]);
        setSelectedAccent(accents.find(a => a.id === 'blue') || accents[1]);
      } else if (activeModel.id === 'stealth') {
        setSelectedCase(cases.find(c => c.id === 'titanium') || cases[3]);
        setSelectedStrap(straps.find(s => s.id === 'leather-black') || straps[0]);
        setSelectedAccent(accents.find(a => a.id === 'red') || accents[2]);
      }
    }
  }, [activeModel]);

  const basePrice = activeModel ? parseInt(activeModel.price.replace(/[^0-9]/g, '')) : 1800;
  const totalPrice = basePrice + selectedCase.price + selectedStrap.price + selectedAccent.price + (engraving ? 100 : 0);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setCartSuccess(true);
      setTimeout(() => setCartSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 99990,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(20px)'
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '1100px',
          height: '90vh',
          maxHeight: '750px',
          borderRadius: '28px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Left Side: 3D Watch Preview */}
        <div style={{
          background: 'radial-gradient(circle at center, rgba(197, 168, 128, 0.08) 0%, transparent 70%)',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '40px'
        }}>
          {/* Header */}
          <div style={{ position: 'absolute', top: '24px', left: '28px' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary)' }}>
              Chronos Lab
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              {activeModel ? activeModel.name : 'The Odyssey'} Custom
            </h3>
          </div>

          {/* Toggle View button (Front / Back) */}
          <button 
            className="clickable"
            onClick={() => setShowCaseBack(!showCaseBack)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '28px',
              padding: '8px 16px',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text-main)',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RefreshCw size={12} /> {showCaseBack ? 'View Dial Face' : 'View Engraved Back'}
          </button>

          {/* Watch SVG Render */}
          <motion.div
            key={showCaseBack ? 'back' : 'front'}
            initial={{ opacity: 0, rotateY: showCaseBack ? 180 : -180, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ width: '320px', height: '400px', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}
          >
            <svg width="100%" height="100%" viewBox="0 0 220 280">
              <defs>
                <linearGradient id="c-steel" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#9a9aa2" />
                  <stop offset="100%" stopColor="#2d2d30" />
                </linearGradient>
                <linearGradient id="c-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff7dd" />
                  <stop offset="50%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#806211" />
                </linearGradient>
                <linearGradient id="c-rose" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff0eb" />
                  <stop offset="50%" stopColor="#e5b8a8" />
                  <stop offset="100%" stopColor="#9c6c5e" />
                </linearGradient>
                <linearGradient id="c-titanium" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a1a1aa" />
                  <stop offset="50%" stopColor="#52525b" />
                  <stop offset="100%" stopColor="#27272a" />
                </linearGradient>
                
                {/* Dynamic Accent Gradients using overlay highlights */}
                <linearGradient id="c-accent-light" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                  <stop offset="100%" stopColor={selectedAccent.color} />
                </linearGradient>
                <linearGradient id="c-accent-dark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={selectedAccent.color} />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
                </linearGradient>

                {/* Strap shading overlay for 3D cylinder effect */}
                <linearGradient id="c-strap-shading" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#000000" stopOpacity="0.55" />
                  <stop offset="25%" stopColor="#000000" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.18" />
                  <stop offset="75%" stopColor="#000000" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
                </linearGradient>
                
                {/* Dial gradient */}
                <radialGradient id="c-dial-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#18181c" />
                  <stop offset="80%" stopColor="#0b0b0e" />
                  <stop offset="100%" stopColor="#020203" />
                </radialGradient>

                {/* Filter for shadows */}
                <filter id="c-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.6" />
                </filter>
              </defs>

              {/* Strap rendering */}
              <g filter="url(#c-shadow)">
                {selectedStrap.type === 'leather' && (
                  <g>
                    <rect x="86" y="15" width="48" height="65" rx="3" fill={selectedStrap.color} />
                    <rect x="86" y="200" width="48" height="65" rx="3" fill={selectedStrap.color} />
                    {/* Cylindrical shading */}
                    <rect x="86" y="15" width="48" height="65" rx="3" fill="url(#c-strap-shading)" />
                    <rect x="86" y="200" width="48" height="65" rx="3" fill="url(#c-strap-shading)" />
                    {/* Stitching lines */}
                    <path d="M 89,15 L 89,80" stroke={selectedStrap.stroke} strokeWidth="0.8" strokeDasharray="3,2" strokeOpacity="0.4" />
                    <path d="M 131,15 L 131,80" stroke={selectedStrap.stroke} strokeWidth="0.8" strokeDasharray="3,2" strokeOpacity="0.4" />
                    <path d="M 89,200 L 89,265" stroke={selectedStrap.stroke} strokeWidth="0.8" strokeDasharray="3,2" strokeOpacity="0.4" />
                    <path d="M 131,200 L 131,265" stroke={selectedStrap.stroke} strokeWidth="0.8" strokeDasharray="3,2" strokeOpacity="0.4" />
                  </g>
                )}

                {selectedStrap.type === 'bracelet' && (
                  <g>
                    <rect x="86" y="15" width="48" height="65" fill={selectedStrap.color} />
                    <rect x="86" y="200" width="48" height="65" fill={selectedStrap.color} />
                    {/* Cylindrical shading */}
                    <rect x="86" y="15" width="48" height="65" fill="url(#c-strap-shading)" />
                    <rect x="86" y="200" width="48" height="65" fill="url(#c-strap-shading)" />
                    {/* Bracelet Link Lines */}
                    <line x1="102" y1="15" x2="102" y2="80" stroke={selectedStrap.stroke} strokeWidth="1" strokeOpacity="0.5" />
                    <line x1="118" y1="15" x2="118" y2="80" stroke={selectedStrap.stroke} strokeWidth="1" strokeOpacity="0.5" />
                    <line x1="102" y1="200" x2="102" y2="265" stroke={selectedStrap.stroke} strokeWidth="1" strokeOpacity="0.5" />
                    <line x1="118" y1="200" x2="118" y2="265" stroke={selectedStrap.stroke} strokeWidth="1" strokeOpacity="0.5" />
                    {[25, 40, 55, 70, 210, 225, 240, 255].map((y) => (
                      <line key={y} x1="86" y1={y} x2="134" y2={y} stroke={selectedStrap.stroke} strokeWidth="0.75" strokeOpacity="0.5" />
                    ))}
                  </g>
                )}

                {selectedStrap.type === 'nato' && (
                  <g>
                    <rect x="88" y="5" width="44" height="270" fill={selectedStrap.color} />
                    <rect x="88" y="5" width="44" height="270" fill="url(#c-strap-shading)" />
                    <line x1="110" y1="5" x2="110" y2="275" stroke="#18181b" strokeWidth="5" strokeOpacity="0.4" />
                    <line x1="94" y1="5" x2="94" y2="275" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                    <line x1="126" y1="5" x2="126" y2="275" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                  </g>
                )}
              </g>

              {/* Case Body with lugs and bevels */}
              <g filter="url(#c-shadow)">
                {/* Lugs */}
                <path d="M 76,70 L 86,45 L 94,45 L 86,70 Z" fill={selectedCase.grad} />
                <path d="M 144,70 L 134,45 L 126,45 L 134,70 Z" fill={selectedCase.grad} />
                <path d="M 76,210 L 86,235 L 94,235 L 86,210 Z" fill={selectedCase.grad} />
                <path d="M 144,210 L 134,235 L 126,235 L 134,210 Z" fill={selectedCase.grad} />
                
                {/* Main Case Circle */}
                <circle cx="110" cy="140" r="54" fill={selectedCase.grad} />
                
                {/* Fluted Crown */}
                <rect x="163" y="132" width="5" height="16" rx="1.5" fill={selectedCase.grad} stroke="#000" strokeWidth="0.3" />
                <line x1="165" y1="133" x2="165" y2="147" stroke="rgba(0,0,0,0.4)" strokeWidth="0.5" />
                <line x1="167" y1="133" x2="167" y2="147" stroke="rgba(0,0,0,0.4)" strokeWidth="0.5" />
              </g>

              {!showCaseBack ? (
                /* FRONT VIEW */
                <>
                  {/* Bezel Ring */}
                  <circle cx="110" cy="140" r="48" fill="#1b1b1e" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
                  {/* Bezel ticks */}
                  <circle cx="110" cy="140" r="44" fill="none" stroke={selectedCase.color} strokeDasharray="1, 4" strokeWidth="1.2" strokeOpacity="0.45" />
                  
                  {/* Dial face */}
                  <circle cx="110" cy="140" r="40" fill="url(#c-dial-grad)" />

                  {/* Concentric Guilloche Lines on Dial */}
                  <circle cx="110" cy="140" r="34" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  <circle cx="110" cy="140" r="26" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

                  {/* Hour markers (3D Beveled Custom Accent) */}
                  <g>
                    {/* 12 o'clock */}
                    <path d="M 108,103 L 112,103 L 111,109 L 109,109 Z" fill="url(#c-accent-light)" />
                    <path d="M 110,103 L 112,103 L 111,109 Q 110,107 110,109 Z" fill="url(#c-accent-dark)" />
                    {/* 3 o'clock */}
                    <path d="M 147,138 L 147,142 L 141,141 L 141,139 Z" fill="url(#c-accent-light)" />
                    <path d="M 147,140 L 147,142 L 141,141 Q 143,140 141,140 Z" fill="url(#c-accent-dark)" />
                    {/* 6 o'clock */}
                    <path d="M 108,177 L 112,177 L 111,171 L 109,171 Z" fill="url(#c-accent-light)" />
                    <path d="M 110,177 L 112,177 L 111,171 Q 110,173 110,171 Z" fill="url(#c-accent-dark)" />
                    {/* 9 o'clock */}
                    <path d="M 73,138 L 73,142 L 79,141 L 79,139 Z" fill="url(#c-accent-light)" />
                    <path d="M 73,140 L 73,142 L 79,141 Q 77,140 79,140 Z" fill="url(#c-accent-dark)" />

                    {/* Dot markers for other hours */}
                    {[30, 60, 120, 150, 210, 240, 300, 330].map((angle) => (
                      <g key={angle} transform={`rotate(${angle}, 110, 140)`}>
                        <circle cx="110" cy="107" r="1.5" fill={selectedAccent.color} stroke="rgba(0,0,0,0.4)" strokeWidth="0.3" />
                      </g>
                    ))}
                  </g>

                  {/* Brand text */}
                  <text x="110" y="125" fontSize="4.5" fill={selectedAccent.color} fontWeight="700" textAnchor="middle" letterSpacing="1.2">CHRONOS</text>

                  {/* Hands (Faceted 3D Metal) */}
                  <g>
                    {/* Hour Hand: 10:10 angle */}
                    <g transform="rotate(-30 110 140)">
                      <polygon points="110,140 108.5,138 108.5,116 110,114" fill="url(#c-accent-light)" />
                      <polygon points="110,140 111.5,138 111.5,116 110,114" fill="url(#c-accent-dark)" />
                    </g>
                    
                    {/* Minute Hand */}
                    <g transform="rotate(40 110 140)">
                      <polygon points="110,140 108.5,138 108.5,104 110,102" fill="url(#c-accent-light)" />
                      <polygon points="110,140 111.5,138 111.5,104 110,102" fill="url(#c-accent-dark)" />
                    </g>

                    {/* Sweep Second Hand in Accent color */}
                    <g transform="rotate(185 110 140)">
                      <line x1="110" y1="140" x2="110" y2="96" stroke={selectedAccent.color} strokeWidth="0.6" />
                      <circle cx="110" cy="99" r="1.2" fill={selectedAccent.color} />
                    </g>

                    {/* Center Pin */}
                    <circle cx="110" cy="140" r="2.8" fill="#1b1b1e" />
                    <circle cx="110" cy="140" r="1.8" fill={selectedAccent.color} />
                  </g>
                  
                  {/* Glass reflections */}
                  <circle cx="110" cy="140" r="39.5" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" pointerEvents="none" />
                  <path d="M 85,115 Q 110,105 135,115 Q 110,110 85,115 Z" fill="rgba(255, 255, 255, 0.12)" pointerEvents="none" />
                  <path d="M 78,95 L 138,205 L 143,198 L 83,88 Z" fill="#ffffff" opacity="0.03" pointerEvents="none" />
                </>
              ) : (
                /* BACK VIEW (Shows engraving in real-time) */
                <>
                  <circle cx="110" cy="140" r="48" fill={selectedCase.grad} stroke="#222" strokeWidth="1" />
                  <circle cx="110" cy="140" r="42" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
                  <circle cx="110" cy="140" r="32" fill="#151518" />
                  
                  {/* Engraving Path */}
                  <path id="custom-engrave-path" d="M 85,140 A 25,25 0 0,1 135,140" fill="none" />
                  
                  {engraving ? (
                    <text fontSize="5.5" fontWeight="bold" fill="url(#c-gold)" textAnchor="middle">
                      <textPath href="#custom-engrave-path" startOffset="50%">
                        {engraving.toUpperCase()}
                      </textPath>
                    </text>
                  ) : (
                    <text x="110" y="142" fontSize="5" fill="#4b5563" textAnchor="middle" letterSpacing="0.5">
                      YOUR ENGRAVING HERE
                    </text>
                  )}

                  <text x="110" y="152" fontSize="4.5" fill="#71717a" textAnchor="middle" letterSpacing="0.5">
                    CHRONOS SWISS MADE
                  </text>
                </>
              )}
            </svg>
          </motion.div>

          {/* Pricing Info */}
          <div style={{ position: 'absolute', bottom: '28px', left: '28px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Price</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>
              ${totalPrice.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Right Side: Options Customizer Panel */}
        <div style={{
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflowY: 'auto'
        }}>
          {/* Close button */}
          <button 
            className="clickable"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text-main)',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>

          {/* Customization Options Scrollable Container */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '24px' }}>
            {/* 1. Case Finish */}
            <div>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                1. Select Case Material
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {cases.map((c) => (
                  <button
                    key={c.id}
                    className="clickable"
                    onClick={() => {
                      setSelectedCase(c);
                      setShowCaseBack(false);
                    }}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      background: selectedCase.id === c.id ? 'rgba(197, 168, 128, 0.08)' : 'rgba(255,255,255,0.02)',
                      border: selectedCase.id === c.id ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.06)',
                      color: 'var(--text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: c.color, border: '1px solid rgba(255,255,255,0.2)' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{c.name}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.price > 0 ? `+$${c.price}` : 'Included'}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Strap Selection */}
            <div>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                2. Select Strap
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {straps.map((s) => (
                  <button
                    key={s.id}
                    className="clickable"
                    onClick={() => setSelectedStrap(s)}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      background: selectedStrap.id === s.id ? 'rgba(197, 168, 128, 0.08)' : 'rgba(255,255,255,0.02)',
                      border: selectedStrap.id === s.id ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.06)',
                      color: 'var(--text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: s.color, border: '1px solid rgba(255,255,255,0.1)' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{s.name}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.price > 0 ? `+$${s.price}` : 'Included'}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Accent Colors */}
            <div>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                3. Dial Index Accent Color
              </h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                {accents.map((a) => (
                  <button
                    key={a.id}
                    className="clickable"
                    onClick={() => setSelectedAccent(a)}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.02)',
                      border: selectedAccent.id === a.id ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                    title={`${a.name} (+$${a.price})`}
                  >
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: a.color }} />
                    {selectedAccent.id === a.id && (
                      <div style={{ position: 'absolute', bottom: -2, right: -2, width: '14px', height: '14px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                        <Check size={8} color="black" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Engraving */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
                  4. Custom Engraving
                </h4>
                <span style={{ fontSize: '0.7rem', color: 'var(--primary)' }}>+$100</span>
              </div>
              <input 
                type="text"
                maxLength={15}
                placeholder="ENGRAVE INSCRIPTION (MAX 15 CHARS)"
                value={engraving}
                onChange={(e) => {
                  setEngraving(e.target.value);
                  setShowCaseBack(true);
                }}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '10px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--text-main)',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  letterSpacing: '1px',
                  outline: 'none'
                }}
                className="clickable"
              />
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              className="clickable"
              onClick={handleAddToCart}
              disabled={isAdding}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '14px',
                background: cartSuccess ? 'var(--success)' : 'linear-gradient(135deg, var(--primary), var(--accent))',
                color: 'black',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 12px 24px -6px rgba(197, 168, 128, 0.4)'
              }}
            >
              {isAdding ? (
                'Processing...'
              ) : cartSuccess ? (
                <>✓ Added to Chronometer Vault</>
              ) : (
                <>
                  <ShoppingBag size={18} /> Add Custom Spec To Vault
                </>
              )}
            </button>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', display: 'block' }}>
              Includes worldwide luxury insured shipping & signature presentation chest.
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

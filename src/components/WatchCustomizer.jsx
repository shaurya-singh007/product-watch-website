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
              </defs>

              {/* Strap rendering */}
              {selectedStrap.type === 'leather' && (
                <>
                  <rect x="86" y="15" width="48" height="65" rx="3" fill={selectedStrap.color} />
                  <rect x="86" y="200" width="48" height="65" rx="3" fill={selectedStrap.color} />
                  <line x1="89" y1="15" x2="89" y2="80" stroke={selectedStrap.stroke} strokeDasharray="3,2" />
                  <line x1="131" y1="15" x2="131" y2="80" stroke={selectedStrap.stroke} strokeDasharray="3,2" />
                  <line x1="89" y1="200" x2="89" y2="265" stroke={selectedStrap.stroke} strokeDasharray="3,2" />
                  <line x1="131" y1="200" x2="131" y2="265" stroke={selectedStrap.stroke} strokeDasharray="3,2" />
                </>
              )}

              {selectedStrap.type === 'bracelet' && (
                <>
                  {/* Outer oyster links */}
                  <rect x="86" y="15" width="48" height="65" fill={selectedStrap.color} />
                  <rect x="86" y="200" width="48" height="65" fill={selectedStrap.color} />
                  {/* Oyster rows */}
                  <line x1="102" y1="15" x2="102" y2="80" stroke={selectedStrap.stroke} strokeWidth="1" />
                  <line x1="118" y1="15" x2="118" y2="80" stroke={selectedStrap.stroke} strokeWidth="1" />
                  <line x1="102" y1="200" x2="102" y2="265" stroke={selectedStrap.stroke} strokeWidth="1" />
                  <line x1="118" y1="200" x2="118" y2="265" stroke={selectedStrap.stroke} strokeWidth="1" />
                  {/* horizontal link divisions */}
                  {[25, 40, 55, 70, 210, 225, 240, 255].map((y) => (
                    <line key={y} x1="86" y1={y} x2="134" y2={y} stroke={selectedStrap.stroke} strokeWidth="0.75" />
                  ))}
                </>
              )}

              {selectedStrap.type === 'nato' && (
                <>
                  <rect x="88" y="5" width="44" height="270" fill={selectedStrap.color} />
                  <line x1="110" y1="5" x2="110" y2="275" stroke="#3f3f46" strokeWidth="6" />
                  <line x1="94" y1="5" x2="94" y2="275" stroke="rgba(255,255,255,0.06)" />
                  <line x1="126" y1="5" x2="126" y2="275" stroke="rgba(255,255,255,0.06)" />
                </>
              )}

              {/* Case Body */}
              <circle cx="110" cy="140" r="54" fill={selectedCase.grad} />
              
              {/* Crown */}
              <rect x="163" y="132" width="5" height="16" rx="1.5" fill={selectedCase.grad} />

              {!showCaseBack ? (
                /* FRONT VIEW */
                <>
                  {/* Bezel Ring */}
                  <circle cx="110" cy="140" r="48" fill="#1b1b1e" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
                  {/* Bezel ticks */}
                  <circle cx="110" cy="140" r="43" fill="none" stroke={selectedCase.color} strokeDasharray="1, 5" strokeWidth="1.5" />
                  
                  {/* Dial face */}
                  <circle cx="110" cy="140" r="39" fill="#0c0c0e" />

                  {/* Hour markers custom colored */}
                  <circle cx="110" cy="107" r="1.5" fill={selectedAccent.color} />
                  <circle cx="110" cy="173" r="1.5" fill={selectedAccent.color} />
                  <circle cx="77" cy="140" r="1.5" fill={selectedAccent.color} />
                  <circle cx="143" cy="140" r="1.5" fill={selectedAccent.color} />

                  <g transform="rotate(30, 110, 140)"><circle cx="110" cy="107" r="1.2" fill={selectedAccent.color} opacity="0.6" /></g>
                  <g transform="rotate(60, 110, 140)"><circle cx="110" cy="107" r="1.2" fill={selectedAccent.color} opacity="0.6" /></g>
                  <g transform="rotate(120, 110, 140)"><circle cx="110" cy="107" r="1.2" fill={selectedAccent.color} opacity="0.6" /></g>
                  <g transform="rotate(150, 110, 140)"><circle cx="110" cy="107" r="1.2" fill={selectedAccent.color} opacity="0.6" /></g>
                  <g transform="rotate(210, 110, 140)"><circle cx="110" cy="107" r="1.2" fill={selectedAccent.color} opacity="0.6" /></g>
                  <g transform="rotate(240, 110, 140)"><circle cx="110" cy="107" r="1.2" fill={selectedAccent.color} opacity="0.6" /></g>
                  <g transform="rotate(300, 110, 140)"><circle cx="110" cy="107" r="1.2" fill={selectedAccent.color} opacity="0.6" /></g>
                  <g transform="rotate(330, 110, 140)"><circle cx="110" cy="107" r="1.2" fill={selectedAccent.color} opacity="0.6" /></g>

                  {/* Hands */}
                  <line x1="110" y1="140" x2="94" y2="124" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="110" y1="140" x2="132" y2="140" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="110" y1="140" x2="110" y2="108" stroke={selectedAccent.color} strokeWidth="0.8" />
                  
                  {/* Glass reflections */}
                  <circle cx="110" cy="140" r="38.5" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                  <path d="M 85,115 Q 110,105 135,115 Q 110,110 85,115 Z" fill="rgba(255, 255, 255, 0.15)" />
                </>
              ) : (
                /* BACK VIEW (Shows engraving in real-time) */
                <>
                  <circle cx="110" cy="140" r="48" fill={selectedCase.grad} stroke="#222" strokeWidth="1" />
                  <circle cx="110" cy="140" r="42" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
                  <circle cx="110" cy="140" r="32" fill="#18181b" />
                  
                  {/* Engraving Path */}
                  <path id="custom-engrave-path" d="M 85,140 A 25,25 0 0,1 135,140" fill="none" />
                  
                  {engraving ? (
                    <text fontSize="5.5" fontWeight="bold" fill="url(#c-gold)" textAnchor="middle">
                      <textPath href="#custom-engrave-path" startOffset="50%">
                        {engraving.toUpperCase()}
                      </textPath>
                    </text>
                  ) : (
                    <text x="110" y="142" fontSize="5" fill="#52525b" textAnchor="middle">
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

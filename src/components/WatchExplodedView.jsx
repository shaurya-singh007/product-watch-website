import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const watchComponents = [
  {
    id: 1,
    name: 'Strap',
    desc: 'Premium Italian calfskin leather strap with hand-stitched details and a brushed surgical-grade stainless steel buckle.',
    detail: 'Genuine leather, 20mm width, quick-release mechanism.'
  },
  {
    id: 2,
    name: 'Case',
    desc: '42mm surgical-grade 316L stainless steel case, finished with a combination of brushed and mirror-polished surfaces.',
    detail: 'Water-resistant up to 100m (10 ATM), double gasket crown.'
  },
  {
    id: 3,
    name: 'Bezel',
    desc: '120-click unidirectional rotating bezel featuring a scratch-proof ceramic insert with gold-plated markings.',
    detail: 'Ceramic bezel insert, high-grip knurled edge.'
  },
  {
    id: 4,
    name: 'Crystal',
    desc: 'Double-domed, scratch-resistant sapphire crystal with five layers of anti-reflective coating on the underside.',
    detail: 'Mohs hardness scale 9, ultra-clear reflection profile.'
  },
  {
    id: 5,
    name: 'Dial',
    desc: 'Sunburst finished black enamel dial adorned with individually hand-applied faceted gold hour indexes.',
    detail: 'Swiss Super-LumiNova® C3 luminous paint, date window frame.'
  },
  {
    id: 6,
    name: 'Hands',
    desc: 'Diamond-cut sword-shaped hour and minute hands, paired with a sweeping gold second hand for perfect timing.',
    detail: 'Polished gold-plated brass, luminous paint fill.'
  },
  {
    id: 7,
    name: 'Date Wheel',
    desc: 'Custom date wheel matching the dial typography, positioned perfectly at the 3 o’clock position.',
    detail: 'Precision-stamped numbers, rapid date adjustment setting.'
  },
  {
    id: 8,
    name: 'Movement',
    desc: 'Caliber 2824-2 Swiss mechanical automatic movement. Features 25 ruby jewels, self-winding rotor, and 38-hour power reserve.',
    detail: '28,800 vibrations per hour (4Hz), Etachron regulator system.'
  },
  {
    id: 9,
    name: 'Case Back',
    desc: 'Exhibition case back with a flat sapphire crystal window, showing off the decorated gold rotor and balance wheel.',
    detail: 'Engraved serial number, threaded screw-down seal.'
  }
];

export default function WatchExplodedView() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Maps scroll progress to overall movement states
  const watchX = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], ['0%', '0%', '-15vw', '-15vw']);
  const watchRotateX = useTransform(scrollYProgress, [0, 0.25, 0.85], [0, 48, 55]);
  const watchRotateY = useTransform(scrollYProgress, [0, 0.25, 0.85], [0, 0, 5]);
  const watchRotateZ = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0, -15, -30, -35]);
  const watchScale = useTransform(scrollYProgress, [0, 0.25, 0.85], [1, 0.85, 0.95]);

  // Individual component vertical shifts (explosion effect)
  // Layer indices are 0 to 8. Middle layer is index 4 (Dial).
  // Spacing should multiply out from the center to separate the stack vertically.
  const createExplosionY = (index) => {
    const centerIndex = 4;
    const baseOffset = (index - centerIndex) * 95; // base explosion height
    return useTransform(scrollYProgress, [0.15, 0.75], [0, baseOffset]);
  };

  const createLayerOpacity = (index) => {
    // Keep layers fully visible after assembling
    return useTransform(scrollYProgress, [0, 0.15], [0.85, 1]);
  };

  return (
    <div ref={containerRef} className="watch-exploded-section" style={{ height: '450vh', position: 'relative' }}>
      {/* Sticky Canvas Container */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px'
      }}>
        {/* Exploded Watch Visual Container */}
        <motion.div 
          style={{
            x: watchX,
            rotateX: watchRotateX,
            rotateY: watchRotateY,
            rotateZ: watchRotateZ,
            scale: watchScale,
            transformStyle: 'preserve-3d',
            position: 'relative',
            width: '450px',
            height: '450px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Connector Center Line (Guides visual depth) */}
          <motion.div 
            style={{
              position: 'absolute',
              width: '2px',
              height: '80%',
              background: 'linear-gradient(to bottom, transparent, rgba(197, 168, 128, 0.2), rgba(197, 168, 128, 0.4), rgba(197, 168, 128, 0.2), transparent)',
              zIndex: 0,
              transform: 'translateZ(-50px)',
              opacity: useTransform(scrollYProgress, [0.15, 0.3], [0, 0.8])
            }}
          />

          {/* SVG Definitions shared by layers */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              {/* Polished Steel Gradient with high contrast metallic light sweeps */}
              <linearGradient id="steel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="15%" stopColor="#d1d1d6" />
                <stop offset="30%" stopColor="#8e8e93" />
                <stop offset="45%" stopColor="#e5e5ea" />
                <stop offset="60%" stopColor="#ffffff" />
                <stop offset="75%" stopColor="#48484a" />
                <stop offset="90%" stopColor="#8e8e93" />
                <stop offset="100%" stopColor="#1c1c1e" />
              </linearGradient>

              <linearGradient id="steel-lug-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#8e8e93" />
                <stop offset="100%" stopColor="#3a3a3c" />
              </linearGradient>
              
              {/* Polished Gold Gradient with rich gold tones */}
              <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff6d6" />
                <stop offset="25%" stopColor="#e5c158" />
                <stop offset="50%" stopColor="#b58d20" />
                <stop offset="75%" stopColor="#e5c158" />
                <stop offset="100%" stopColor="#684e0c" />
              </linearGradient>

              {/* Rich Brass Gradient for movement gears */}
              <linearGradient id="brass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffe994" />
                <stop offset="40%" stopColor="#d4a331" />
                <stop offset="80%" stopColor="#7a550d" />
                <stop offset="100%" stopColor="#d4a331" />
              </linearGradient>

              {/* Radial Steel Finish for watch dial/plates */}
              <radialGradient id="radial-steel" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f2f2f7" />
                <stop offset="50%" stopColor="#c7c7cc" />
                <stop offset="80%" stopColor="#636366" />
                <stop offset="100%" stopColor="#2c2c2e" />
              </radialGradient>

              {/* Sunburst Black/Slate Dial Gradient */}
              <radialGradient id="dial-sunburst" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2c2c2e" />
                <stop offset="70%" stopColor="#1c1c1e" />
                <stop offset="100%" stopColor="#0c0c0d" />
              </radialGradient>

              {/* Leather strap realistic gradient (Padded volume) */}
              <linearGradient id="leather-strap" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0d0d0f" />
                <stop offset="15%" stopColor="#1c1c22" />
                <stop offset="50%" stopColor="#2d2d35" />
                <stop offset="85%" stopColor="#1c1c22" />
                <stop offset="100%" stopColor="#0d0d0f" />
              </linearGradient>

              {/* Ruby glass radial gradient */}
              <radialGradient id="ruby-grad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ff4d6d" />
                <stop offset="40%" stopColor="#ff0055" />
                <stop offset="85%" stopColor="#800020" />
                <stop offset="100%" stopColor="#4a0010" />
              </radialGradient>

              {/* Shadow filter for 3D depth */}
              <filter id="real-shadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#000000" floodOpacity="0.65" />
              </filter>
            </defs>
          </svg>

          {/* 1. STRAP LAYER */}
          <motion.div
            style={{
              position: 'absolute',
              y: createExplosionY(0),
              opacity: createLayerOpacity(0),
              zIndex: 90,
              transformStyle: 'preserve-3d'
            }}
          >
            <svg width="450" height="450" viewBox="0 0 450 450" fill="none">
              <g filter="url(#real-shadow)">
                {/* Upper Strap (Realistic padding shape) */}
                <path d="M 205,100 L 245,100 L 243,30 Q 225,28 207,30 Z" fill="url(#leather-strap)" />
                {/* Edge sealing lines */}
                <path d="M 206,100 L 208,30" stroke="#000" strokeWidth="1" opacity="0.8" />
                <path d="M 244,100 L 242,30" stroke="#000" strokeWidth="1" opacity="0.8" />
                {/* Real stitching (warm gold thread) */}
                <path d="M 208.5,100 L 210.5,33" stroke="#a38258" strokeDasharray="3,2.5" strokeWidth="1" opacity="0.85" />
                <path d="M 241.5,100 L 239.5,33" stroke="#a38258" strokeDasharray="3,2.5" strokeWidth="1" opacity="0.85" />
                
                {/* 3D Buckle */}
                <rect x="200" y="24" width="50" height="8" rx="2" fill="url(#steel-grad)" stroke="#222" strokeWidth="0.5" />
                <rect x="221" y="16" width="8" height="16" rx="1" fill="url(#steel-grad)" stroke="#222" strokeWidth="0.5" />

                {/* Lower Strap */}
                <path d="M 205,350 L 245,350 L 241,432 Q 225,435 209,432 Z" fill="url(#leather-strap)" />
                {/* Stitching */}
                <path d="M 208.5,350 L 212.5,429" stroke="#a38258" strokeDasharray="3,2.5" strokeWidth="1" opacity="0.85" />
                <path d="M 241.5,350 L 237.5,429" stroke="#a38258" strokeDasharray="3,2.5" strokeWidth="1" opacity="0.85" />
                {/* Edge seals */}
                <path d="M 206,350 L 210,432" stroke="#000" strokeWidth="1" opacity="0.8" />
                <path d="M 244,350 L 240,432" stroke="#000" strokeWidth="1" opacity="0.8" />
                {/* Strap holes with metal grommets */}
                {[370, 385, 400, 415].map(y => (
                  <g key={y}>
                    <circle cx="225" cy={y} r="2.5" fill="#18181b" />
                    <circle cx="225" cy={y} r="2" fill="#000" />
                  </g>
                ))}
              </g>
            </svg>
          </motion.div>

          {/* 2. CASE LAYER */}
          <motion.div
            style={{
              position: 'absolute',
              y: createExplosionY(1),
              opacity: createLayerOpacity(1),
              zIndex: 80,
              transformStyle: 'preserve-3d'
            }}
          >
            <svg width="450" height="450" viewBox="0 0 450 450" fill="none">
              <g filter="url(#real-shadow)">
                {/* Case Lugs Top with chamfered polished bevels */}
                <path d="M 194,160 L 210,100 L 240,100 L 256,160 Z" fill="url(#steel-lug-grad)" />
                <path d="M 194,160 L 200,160 L 212,102 L 210,100 Z" fill="#ffffff" opacity="0.4" /> {/* Polished edge highlight */}
                <path d="M 256,160 L 250,160 L 238,102 L 240,100 Z" fill="#2c2c2e" opacity="0.6" /> {/* Shadow side */}

                {/* Case Lugs Bottom */}
                <path d="M 194,290 L 210,350 L 240,350 L 256,290 Z" fill="url(#steel-lug-grad)" />
                <path d="M 194,290 L 200,290 L 212,348 L 210,350 Z" fill="#ffffff" opacity="0.4" />
                <path d="M 256,290 L 250,290 L 238,348 L 240,350 Z" fill="#2c2c2e" opacity="0.6" />

                {/* Main 3D Circular Case Body with polished rim highlight */}
                <circle cx="225" cy="225" r="76" fill="url(#steel-grad)" stroke="#1c1c1e" strokeWidth="1" />
                <circle cx="225" cy="225" r="74" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.5" />
                
                {/* Inner cutout where dial sits (deep hollow shadow) */}
                <circle cx="225" cy="225" r="62.5" fill="#000" stroke="#48484a" strokeWidth="2" />
                
                {/* Luxury 3D Knurled Crown on the right */}
                <g>
                  {/* Crown guard */}
                  <path d="M 295,212 L 302,216 L 302,234 L 295,238 Z" fill="url(#steel-grad)" />
                  {/* Fluted crown cylinder */}
                  <rect x="302" y="215" width="10" height="20" rx="1.5" fill="url(#gold-grad)" stroke="#3a2f0f" strokeWidth="0.5" />
                  {/* Crown ridges (teeth) */}
                  {[217, 219, 221, 223, 225, 227, 229, 231, 233].map(cy => (
                    <line key={cy} x1="302.5" y1={cy} x2="311.5" y2={cy} stroke="#3a2f0f" strokeWidth="1.2" />
                  ))}
                  {/* Crown Logo stamp */}
                  <circle cx="310" cy="225" r="2.5" fill="#ffd54f" opacity="0.7" />
                </g>
              </g>
            </svg>
          </motion.div>

          {/* 3. BEZEL LAYER */}
          <motion.div
            style={{
              position: 'absolute',
              y: createExplosionY(2),
              opacity: createLayerOpacity(2),
              zIndex: 70,
              transformStyle: 'preserve-3d'
            }}
          >
            <svg width="450" height="450" viewBox="0 0 450 450" fill="none">
              <g filter="url(#real-shadow)">
                {/* Outer Bezel Steel Ring with knurling details */}
                <circle cx="225" cy="225" r="67" fill="url(#steel-grad)" stroke="#1a1a1c" strokeWidth="1" />
                {/* High frequency knurled teeth simulation on outer rim */}
                <circle cx="225" cy="225" r="66" fill="none" stroke="#222" strokeWidth="1.5" strokeDasharray="1.5, 1" />
                
                {/* Bezel Insert (Deep Ceramic High-Gloss Black Ring) */}
                <circle cx="225" cy="225" r="62.5" fill="#101012" stroke="#2c2c2e" strokeWidth="1.5" />
                
                {/* Inner gold security ring */}
                <circle cx="225" cy="225" r="51.5" fill="none" stroke="url(#gold-grad)" strokeWidth="1" />

                {/* Bezel Markings (Polished Gold Numerals & Scale) */}
                <circle cx="225" cy="225" r="57" fill="none" stroke="url(#gold-grad)" strokeWidth="2.5" strokeDasharray="1, 8.35" />
                
                {/* Luminous pearl triangle at 12hr */}
                <polygon points="225,167 220,174 230,174" fill="url(#gold-grad)" />
                <circle cx="225" cy="172" r="1.8" fill="#e2ffd5" stroke="#7a5f15" strokeWidth="0.5" />

                {/* 15, 30, 45 indicators with realistic typography */}
                <text x="277" y="227.5" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif" fill="#ffffff" textAnchor="middle">15</text>
                <text x="225" y="279" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif" fill="#ffffff" textAnchor="middle">30</text>
                <text x="173" y="227.5" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif" fill="#ffffff" textAnchor="middle">45</text>
                
                {/* Ceramic radial reflection glare overlay */}
                <path d="M 180,180 A 62.5,62.5 0 0,1 270,180" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="5" />
              </g>
            </svg>
          </motion.div>

          {/* 4. CRYSTAL LAYER */}
          <motion.div
            style={{
              position: 'absolute',
              y: createExplosionY(3),
              opacity: createLayerOpacity(3),
              zIndex: 60,
              transformStyle: 'preserve-3d'
            }}
          >
            <svg width="450" height="450" viewBox="0 0 450 450" fill="none">
              {/* Semi-transparent double-domed sapphire crystal with luxury blue AR coating sheen */}
              <circle cx="225" cy="225" r="49" fill="rgba(66, 133, 244, 0.04)" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="0.5" />
              {/* Blue coating refraction ring */}
              <circle cx="225" cy="225" r="48.5" fill="none" stroke="rgba(66, 133, 244, 0.25)" strokeWidth="1.5" />

              {/* Realistic curved 3D reflections (key light glares) */}
              <path d="M 183,183 C 205,155 245,155 267,183 C 252,175 198,175 183,183 Z" fill="rgba(255, 255, 255, 0.35)" />
              {/* Soft diagonal highlight sweep */}
              <path d="M 184,250 C 210,215 240,215 266,250 C 245,235 205,235 184,250 Z" fill="rgba(255, 255, 255, 0.15)" />
              {/* Glass edge refraction ring */}
              <circle cx="225" cy="225" r="47.5" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* 5. DIAL LAYER */}
          <motion.div
            style={{
              position: 'absolute',
              y: createExplosionY(4),
              opacity: createLayerOpacity(4),
              zIndex: 50,
              transformStyle: 'preserve-3d'
            }}
          >
            <svg width="450" height="450" viewBox="0 0 450 450" fill="none">
              <g filter="url(#real-shadow)">
                {/* Main Dial Plate with high-end Slate Sunburst texture */}
                <circle cx="225" cy="225" r="48.5" fill="url(#dial-sunburst)" stroke="#1a1a1c" strokeWidth="0.75" />
                
                {/* Concentric guilloche texture rings */}
                <circle cx="225" cy="225" r="41" fill="none" stroke="#2a2a2e" strokeWidth="0.5" />
                <circle cx="225" cy="225" r="33" fill="none" stroke="#2a2a2e" strokeWidth="0.5" opacity="0.7" />

                {/* Sub-seconds outer railway track */}
                <circle cx="225" cy="225" r="45" fill="none" stroke="rgba(197, 168, 128, 0.3)" strokeWidth="0.8" strokeDasharray="0.5, 1.85" />

                {/* Hand-Applied 3D Gold Hour Indexes (Faceted layout) */}
                {/* Each hour marker has a bright side and shadow side to make them look 3D and metal */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => {
                  if (angle === 90) return null; // Date window sitting here
                  return (
                    <g transform={`rotate(${angle}, 225, 225)`} key={angle}>
                      {/* Left facet (bright) */}
                      <rect x="224" y="180" width="1" height="8" fill="#fff5d0" />
                      {/* Right facet (shadow) */}
                      <rect x="225" y="180" width="1" height="8" fill="#a88523" />
                      {/* Luminous dots at tips of markers */}
                      <circle cx="225" cy="189" r="0.8" fill="#e2ffd5" stroke="#7a5f15" strokeWidth="0.25" />
                    </g>
                  );
                })}
                
                {/* Double marker at 12 o'clock */}
                <g transform="rotate(0, 225, 225)">
                  <rect x="221.5" y="180" width="1" height="8" fill="#fff5d0" />
                  <rect x="222.5" y="180" width="1" height="8" fill="#a88523" />
                  <rect x="226.5" y="180" width="1" height="8" fill="#fff5d0" />
                  <rect x="227.5" y="180" width="1" height="8" fill="#a88523" />
                </g>

                {/* 3 O'clock Beveled Date Window Slot */}
                <g>
                  {/* Outer beveled frame */}
                  <rect x="254.5" y="219.5" width="14" height="11" rx="0.5" fill="none" stroke="url(#gold-grad)" strokeWidth="0.75" />
                  {/* Inner drop shadow slot cutout */}
                  <rect x="255.5" y="220.5" width="12" height="9" fill="#000000" />
                </g>
                
                {/* Branding text */}
                <text x="225" y="206" fontSize="6.5" fill="url(#gold-grad)" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1.2">CHRONOS</text>
                <text x="225" y="211" fontSize="3.5" fill="#8e8e93" fontFamily="sans-serif" textAnchor="middle">OFFICIALLY CERTIFIED</text>
                <text x="225" y="248" fontSize="4.5" fill="#c5a880" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.5">AUTOMATIC</text>
                <text x="225" y="254" fontSize="3" fill="#8e8e93" fontFamily="sans-serif" textAnchor="middle">SWISS MADE</text>
              </g>
            </svg>
          </motion.div>

          {/* 6. HANDS LAYER */}
          <motion.div
            style={{
              position: 'absolute',
              y: createExplosionY(5),
              opacity: createLayerOpacity(5),
              zIndex: 45,
              transformStyle: 'preserve-3d'
            }}
          >
            <svg width="450" height="450" viewBox="0 0 450 450" fill="none">
              <g filter="url(#real-shadow)">
                {/* Central pin base */}
                <circle cx="225" cy="225" r="5" fill="url(#gold-grad)" stroke="#444" strokeWidth="0.5" />

                {/* Hour Hand (Pointing at 10) - Faceted 3D */}
                <g transform="rotate(-60, 225, 225)">
                  {/* Left Facet (Reflecting key light) */}
                  <path d="M 225,225 L 221,225 L 223,193 L 225,190 Z" fill="#fff6d6" />
                  {/* Right Facet (In shadow) */}
                  <path d="M 225,225 L 229,225 L 227,193 L 225,190 Z" fill="#a37e1a" />
                  {/* Luminous center stripe */}
                  <path d="M 224.3,220 L 224.3,196 C 224.3,195 225.7,195 225.7,196 L 225.7,220 Z" fill="#e2ffd5" opacity="0.9" />
                </g>

                {/* Minute Hand (Pointing at 2) - Faceted 3D */}
                <g transform="rotate(60, 225, 225)">
                  {/* Left Facet (Reflecting key light) */}
                  <path d="M 225,225 L 222,225 L 223.5,182 L 225,178 Z" fill="#fff6d6" />
                  {/* Right Facet (In shadow) */}
                  <path d="M 225,225 L 228,225 L 226.5,182 L 225,178 Z" fill="#a37e1a" />
                  {/* Luminous center stripe */}
                  <path d="M 224.4,220 L 224.4,186 C 224.4,185 225.6,185 225.6,186 L 225.6,220 Z" fill="#e2ffd5" opacity="0.9" />
                </g>

                {/* Sweep Second Hand (Crimson Red with round balance counterweight) */}
                <g transform="rotate(150, 225, 225)">
                  <line x1="225" y1="238" x2="225" y2="173" stroke="#e63946" strokeWidth="0.8" />
                  {/* Round counterweight with gold pivot cap */}
                  <circle cx="225" cy="234" r="2.5" fill="none" stroke="#e63946" strokeWidth="0.75" />
                  <circle cx="225" cy="180" r="1.5" fill="#e2ffd5" stroke="#e63946" strokeWidth="0.5" />
                </g>
                
                {/* Polished center cap ring */}
                <circle cx="225" cy="225" r="2" fill="#ffffff" />
                <circle cx="225" cy="225" r="0.75" fill="#000" />
              </g>
            </svg>
          </motion.div>

          {/* 7. DATE WHEEL LAYER */}
          <motion.div
            style={{
              position: 'absolute',
              y: createExplosionY(6),
              opacity: createLayerOpacity(6),
              zIndex: 40,
              transformStyle: 'preserve-3d'
            }}
          >
            <svg width="450" height="450" viewBox="0 0 450 450" fill="none">
              <g filter="url(#real-shadow)">
                {/* Date Wheel Outer Ring */}
                <circle cx="225" cy="225" r="47.5" fill="none" stroke="#2a2a2e" strokeWidth="0.8" />
                {/* Main flat white/silver brushed metal disc ring */}
                <path d="M 225,176 
                         A 49,49 0 1,1 224.9,176 
                         L 224.9,188 
                         A 37,37 0 1,0 225,188 Z" 
                      fill="url(#radial-steel)" stroke="#b5b5ba" strokeWidth="0.5" />
                
                {/* Date Numerals stamped cleanly */}
                <text x="261.5" y="228" fontSize="7" fontWeight="bold" fontFamily="monospace" fill="#111112" textAnchor="middle">24</text>
                <text x="259.5" y="238" fontSize="7" fontWeight="bold" fontFamily="monospace" fill="#7d7d85" textAnchor="middle">25</text>
                <text x="254" y="247" fontSize="7" fontWeight="bold" fontFamily="monospace" fill="#a1a1aa" textAnchor="middle">26</text>
                <text x="246" y="255" fontSize="7" fontWeight="bold" fontFamily="monospace" fill="#a1a1aa" textAnchor="middle">27</text>
                
                <text x="260" y="218" fontSize="7" fontWeight="bold" fontFamily="monospace" fill="#7d7d85" textAnchor="middle">23</text>
                <text x="255.5" y="208" fontSize="7" fontWeight="bold" fontFamily="monospace" fill="#a1a1aa" textAnchor="middle">22</text>
                <text x="249" y="199" fontSize="7" fontWeight="bold" fontFamily="monospace" fill="#a1a1aa" textAnchor="middle">21</text>
              </g>
            </svg>
          </motion.div>

          {/* 8. MOVEMENT LAYER */}
          <motion.div
            style={{
              position: 'absolute',
              y: createExplosionY(7),
              opacity: createLayerOpacity(7),
              zIndex: 30,
              transformStyle: 'preserve-3d'
            }}
          >
            <svg width="450" height="450" viewBox="0 0 450 450" fill="none">
              <g filter="url(#real-shadow)">
                {/* Main Movement Plate (Brushed steel with perlage circular grains) */}
                <circle cx="225" cy="225" r="46.5" fill="url(#steel-grad)" stroke="#1a1a1c" strokeWidth="1" />
                {/* Gear ring track */}
                <circle cx="225" cy="225" r="46" fill="none" stroke="#222" strokeWidth="1" strokeDasharray="1.2, 0.8" />

                {/* Satin-Brushed Gold Bridges (Cutouts showing inner wheels) */}
                <path d="M 194,194 C 218,183 242,192 266,208 L 266,246 C 242,256 210,246 194,228 Z" fill="url(#brass-grad)" stroke="#5c430e" strokeWidth="0.5" />
                
                {/* Geneva stripes (Côtes de Genève) simulated on gold bridge */}
                <line x1="202" y1="190" x2="202" y2="240" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="2.5" />
                <line x1="215" y1="190" x2="215" y2="245" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="2.5" />
                <line x1="228" y1="190" x2="228" y2="250" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="2.5" />
                <line x1="241" y1="190" x2="241" y2="252" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="2.5" />

                {/* Skeleton hollow wells */}
                <circle cx="205" cy="215" r="8.5" fill="#0d0d0f" stroke="#3a2e10" strokeWidth="1" />
                <circle cx="245" cy="230" r="10.5" fill="#0d0d0f" stroke="#2c2c2e" strokeWidth="1" />

                {/* Interlocking 3D Gears */}
                {/* Gold Escape Wheel */}
                <g transform="rotate(25, 205, 215)">
                  <circle cx="205" cy="215" r="13" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5" strokeDasharray="1.2, 0.8" />
                  <circle cx="205" cy="215" r="11" fill="none" stroke="url(#gold-grad)" strokeWidth="0.5" />
                  {/* spokes */}
                  <line x1="193" y1="215" x2="217" y2="215" stroke="url(#gold-grad)" strokeWidth="0.8" />
                  <line x1="205" y1="203" x2="205" y2="227" stroke="url(#gold-grad)" strokeWidth="0.8" />
                  <circle cx="205" cy="215" r="2.5" fill="#555" stroke="#222" strokeWidth="0.5" />
                </g>

                {/* Silver Winding Gear */}
                <g transform="rotate(-40, 235, 205)">
                  <circle cx="235" cy="205" r="17" fill="none" stroke="url(#steel-grad)" strokeWidth="2" strokeDasharray="2, 0.8" />
                  <circle cx="235" cy="205" r="14" fill="none" stroke="url(#steel-grad)" strokeWidth="0.5" />
                  <line x1="218" y1="205" x2="252" y2="205" stroke="url(#steel-grad)" strokeWidth="0.8" />
                  <line x1="235" y1="188" x2="235" y2="222" stroke="url(#steel-grad)" strokeWidth="0.8" />
                  <circle cx="235" cy="205" r="3.5" fill="url(#gold-grad)" stroke="#222" strokeWidth="0.5" />
                </g>

                {/* Glowing Ruby Bearing (Incabloc Jewel) */}
                <circle cx="215" cy="245" r="15" fill="none" stroke="url(#gold-grad)" strokeWidth="1.2" />
                <line x1="200" y1="245" x2="230" y2="245" stroke="url(#gold-grad)" strokeWidth="1" />
                <line x1="215" y1="230" x2="215" y2="260" stroke="url(#gold-grad)" strokeWidth="1" />
                
                {/* Gemstone ruby glass core */}
                <circle cx="215" cy="245" r="4.5" fill="url(#ruby-grad)" stroke="#000" strokeWidth="0.5" />
                <circle cx="213.5" cy="243.5" r="1.2" fill="#fff" opacity="0.6" /> {/* Jewel glint */}

                {/* Blued Steel Screws (Holding plate) */}
                {[{cx: 192, cy: 192}, {cx: 255, cy: 195}, {cx: 252, cy: 248}].map((s, i) => (
                  <g key={i}>
                    {/* Deep blued metal head */}
                    <circle cx={s.cx} cy={s.cy} r="2.2" fill="#1e40af" stroke="#2563eb" strokeWidth="0.25" />
                    {/* Flathead screw slot */}
                    <line x1={s.cx - 1.5} y1={s.cy - 0.5} x2={s.cx + 1.5} y2={s.cy + 0.5} stroke="#000" strokeWidth="0.6" />
                  </g>
                ))}
              </g>
            </svg>
          </motion.div>

          {/* 9. CASE BACK LAYER */}
          <motion.div
            style={{
              position: 'absolute',
              y: createExplosionY(8),
              opacity: createLayerOpacity(8),
              zIndex: 20,
              transformStyle: 'preserve-3d'
            }}
          >
            <svg width="450" height="450" viewBox="0 0 450 450" fill="none">
              <g filter="url(#real-shadow)">
                {/* Outer Brushed Steel Back Cover */}
                <circle cx="225" cy="225" r="75" fill="url(#steel-grad)" stroke="#1a1a1c" strokeWidth="1.2" />
                
                {/* Opener grooves (six milled slots) */}
                <circle cx="225" cy="225" r="70.5" fill="none" stroke="#1d1d1f" strokeWidth="1.5" />
                {[0, 60, 120, 180, 240, 300].map(angle => (
                  <rect key={angle} x="221.5" y="150" width="7" height="4.5" fill="#0c0c0d" stroke="#2c2c2e" strokeWidth="0.5" transform={`rotate(${angle}, 225, 225)`} />
                ))}

                {/* Exhibition Sapphire Window Ring Frame */}
                <circle cx="225" cy="225" r="48" fill="url(#radial-steel)" stroke="#1a1a1c" strokeWidth="1.2" />
                <circle cx="225" cy="225" r="46.5" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />

                {/* 3D Gold Automatic Rotor (weighted self-winding oscillating weight) */}
                <g>
                  {/* Heavy outer weight block */}
                  <path d="M 225,225 M 225,187 A 38,38 0 0,1 262,225 L 225,225 Z" fill="url(#gold-grad)" stroke="#7a550d" strokeWidth="0.5" opacity="0.9" />
                  {/* Côtes de Genève stripes on rotor */}
                  <path d="M 225,187 A 38,38 0 0,1 262,225 L 225,225 Z" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" strokeDasharray="3, 6" />
                  {/* Central steel rotor pivot bearing */}
                  <circle cx="225" cy="225" r="7" fill="url(#steel-grad)" stroke="#222" strokeWidth="0.5" />
                  <circle cx="225" cy="225" r="4" fill="none" stroke="#666" strokeWidth="0.5" />
                  {/* Small bearings balls inside pivot */}
                  {[0, 60, 120, 180, 240, 300].map(angle => (
                    <circle key={angle} cx="225" cy="222.2" r="0.75" fill="#111" transform={`rotate(${angle}, 225, 225)`} />
                  ))}
                </g>

                {/* Sapphire exhibition flat glass window with specular glare */}
                <circle cx="225" cy="225" r="38" fill="rgba(66, 133, 244, 0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                <path d="M 197,203 Q 225,190 253,203 Q 225,198 197,203 Z" fill="rgba(255, 255, 255, 0.15)" />

                {/* Laser-Engraved Markings */}
                <path id="engrave-path-1" d="M 167,225 A 58,58 0 0,1 283,225" fill="none" />
                <text fontSize="5.5" fontWeight="bold" fontFamily="monospace" fill="#5c5c61" letterSpacing="0.2">
                  <textPath href="#engrave-path-1" startOffset="50%" textAnchor="middle">
                    CHRONOS WATCH CO. • 10 ATM WATER RESISTANT
                  </textPath>
                </text>
                
                <path id="engrave-path-2" d="M 283,225 A 58,58 0 0,1 167,225" fill="none" />
                <text fontSize="5.5" fontWeight="bold" fontFamily="monospace" fill="#5c5c61" letterSpacing="0.2">
                  <textPath href="#engrave-path-2" startOffset="50%" textAnchor="middle">
                    SAPPHIRE GLASS • SWISS AUTOMATIC • N° 0042/1000
                  </textPath>
                </text>
              </g>
            </svg>
          </motion.div>
        </motion.div>

        {/* Dynamic Descriptions panel on the Right */}
        <div style={{
          position: 'absolute',
          right: '8%',
          width: '38%',
          maxWidth: '500px',
          height: '80%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '20px',
          zIndex: 100
        }}>
          {watchComponents.map((comp, idx) => {
            // We want to highlight the description as we scroll through the components.
            // Map scroll progress to scale/opacity/color changes for each item.
            // Each item gets a target scroll window.
            const startScroll = 0.2 + idx * 0.065;
            const peakScroll = startScroll + 0.03;
            const endScroll = startScroll + 0.065;

            const opacity = useTransform(
              scrollYProgress, 
              [0.15, startScroll, peakScroll, endScroll, endScroll + 0.03], 
              [0.12, 0.25, 1, 1, 0.15]
            );
            
            const scale = useTransform(
              scrollYProgress, 
              [startScroll, peakScroll, endScroll], 
              [0.96, 1.02, 0.98]
            );

            const borderLeftColor = useTransform(
              scrollYProgress,
              [startScroll, peakScroll, endScroll],
              ['rgba(197, 168, 128, 0)', 'rgba(197, 168, 128, 1)', 'rgba(197, 168, 128, 0.1)']
            );

            const x = useTransform(
              scrollYProgress,
              [startScroll, peakScroll, endScroll],
              [10, 0, 5]
            );

            return (
              <motion.div
                key={comp.id}
                style={{
                  opacity,
                  scale,
                  x,
                  borderLeft: '3px solid',
                  borderLeftColor,
                  paddingLeft: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
                className="transition-smooth"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    color: 'var(--primary)',
                    fontWeight: 'bold'
                  }}>
                    {idx + 1}.
                  </span>
                  <h3 style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {comp.name}
                  </h3>
                </div>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-main)',
                  opacity: 0.9,
                  fontWeight: 300,
                  lineHeight: '1.4'
                }}>
                  {comp.desc}
                </p>
                <span style={{
                  fontSize: '0.75rem',
                  color: 'var(--primary)',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  opacity: 0.8
                }}>
                  {comp.detail}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll Progress Indicator (Left Side) */}
        <div style={{
          position: 'absolute',
          left: '5%',
          height: '60%',
          width: '1px',
          background: 'rgba(255,255,255,0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0'
        }}>
          {watchComponents.map((_, idx) => {
            const startScroll = 0.2 + idx * 0.065;
            const activeOpacity = useTransform(
              scrollYProgress,
              [startScroll - 0.02, startScroll, startScroll + 0.065, startScroll + 0.085],
              [0.3, 1, 1, 0.3]
            );

            return (
              <motion.div
                key={idx}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  boxShadow: '0 0 10px var(--primary)',
                  opacity: activeOpacity
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

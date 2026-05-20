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
              {/* Metallic Steel Gradient */}
              <linearGradient id="steel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#a3a3a8" />
                <stop offset="50%" stopColor="#3f3f42" />
                <stop offset="75%" stopColor="#a3a3a8" />
                <stop offset="100%" stopColor="#212124" />
              </linearGradient>
              
              {/* Metallic Gold Gradient */}
              <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fdf8e2" />
                <stop offset="30%" stopColor="#d4af37" />
                <stop offset="70%" stopColor="#8a6d21" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>

              {/* Metallic Brass Gradient */}
              <linearGradient id="brass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffeeaa" />
                <stop offset="40%" stopColor="#cc9933" />
                <stop offset="80%" stopColor="#775511" />
                <stop offset="100%" stopColor="#cc9933" />
              </linearGradient>

              {/* Radial Steel Finish */}
              <radialGradient id="radial-steel" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#dedede" />
                <stop offset="60%" stopColor="#7e7e85" />
                <stop offset="100%" stopColor="#252527" />
              </radialGradient>

              {/* Strap Pattern */}
              <pattern id="leather-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <rect width="10" height="10" fill="#18181b" />
                <path d="M 0,0 C 3,3 7,3 10,0" stroke="#101012" strokeWidth="0.8" fill="none" />
                <circle cx="5" cy="5" r="0.7" fill="#0c0c0e" />
              </pattern>
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
              <filter id="shadow-strap" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.45" />
              </filter>
              <g filter="url(#shadow-strap)">
                {/* Upper Strap */}
                <path d="M 205,100 L 245,100 L 245,30 L 205,30 Z" fill="url(#leather-pattern)" />
                {/* Upper Strap stitching */}
                <line x1="208" y1="100" x2="208" y2="30" stroke="#3f3f46" strokeDasharray="3,2" strokeWidth="1" />
                <line x1="242" y1="100" x2="242" y2="30" stroke="#3f3f46" strokeDasharray="3,2" strokeWidth="1" />
                
                {/* Golden Buckle */}
                <rect x="200" y="24" width="50" height="8" rx="3" fill="url(#gold-grad)" stroke="#8a6d21" strokeWidth="0.5" />
                <rect x="222" y="16" width="6" height="16" fill="url(#gold-grad)" />

                {/* Lower Strap */}
                <path d="M 205,350 L 245,350 L 243,430 L 207,430 Z" fill="url(#leather-pattern)" />
                {/* Lower Strap stitching */}
                <line x1="208" y1="350" x2="210" y2="430" stroke="#3f3f46" strokeDasharray="3,2" strokeWidth="1" />
                <line x1="242" y1="350" x2="240" y2="430" stroke="#3f3f46" strokeDasharray="3,2" strokeWidth="1" />
                {/* Strap adjustment holes */}
                <circle cx="225" cy="370" r="1.5" fill="#000" />
                <circle cx="225" cy="385" r="1.5" fill="#000" />
                <circle cx="225" cy="400" r="1.5" fill="#000" />
                <circle cx="225" cy="415" r="1.5" fill="#000" />
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
              <filter id="shadow-case" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor="#000" floodOpacity="0.4" />
              </filter>
              <g filter="url(#shadow-case)">
                {/* Case Lugs Top */}
                <path d="M 195,160 L 210,100 L 240,100 L 255,160 Z" fill="url(#steel-grad)" />
                {/* Case Lugs Bottom */}
                <path d="M 195,290 L 210,350 L 240,350 L 255,290 Z" fill="url(#steel-grad)" />
                {/* Main Circular Case Body */}
                <circle cx="225" cy="225" r="75" fill="url(#steel-grad)" stroke="#18181b" strokeWidth="1" />
                {/* Inner cutout where dial sits */}
                <circle cx="225" cy="225" r="62" fill="#101012" stroke="#2a2a2d" strokeWidth="1.5" />
                {/* Right Side Crown Guard & Crown */}
                <rect x="300" y="215" width="12" height="20" rx="2" fill="url(#gold-grad)" stroke="#8a6d21" strokeWidth="0.5" />
                <path d="M 296,218 L 300,216 L 300,234 L 296,232 Z" fill="url(#steel-grad)" />
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
              <filter id="shadow-bezel" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="10" stdDeviation="6" floodColor="#000" floodOpacity="0.35" />
              </filter>
              <g filter="url(#shadow-bezel)">
                {/* Knurled Outer Ring */}
                <circle cx="225" cy="225" r="66" fill="url(#steel-grad)" stroke="#1a1a1c" strokeWidth="1" />
                {/* Bezel Insert (Ceramic Dark Ring) */}
                <circle cx="225" cy="225" r="62" fill="#141416" stroke="#222" strokeWidth="0.5" />
                <circle cx="225" cy="225" r="50" fill="#000" fillOpacity="0" stroke="url(#gold-grad)" strokeWidth="1.5" />
                {/* Bezel Markings (Gold Ticks & Numbers) */}
                <circle cx="225" cy="225" r="56" fill="none" stroke="url(#gold-grad)" strokeWidth="3" strokeDasharray="1, 8.35" />
                {/* Bezel 12hr Triangle */}
                <polygon points="225,166 221,173 229,173" fill="#ff4d4d" />
                {/* 10, 20, 30, 40, 50 numeric indicators */}
                <text x="225" y="180" fontSize="7" fontWeight="bold" fill="#fff" textAnchor="middle">60</text>
                <text x="278" y="227" fontSize="7" fontWeight="bold" fill="#fff" textAnchor="middle">15</text>
                <text x="225" y="278" fontSize="7" fontWeight="bold" fill="#fff" textAnchor="middle">30</text>
                <text x="172" y="227" fontSize="7" fontWeight="bold" fill="#fff" textAnchor="middle">45</text>
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
              {/* Semi-transparent blue glass with reflection glare */}
              <circle cx="225" cy="225" r="49" fill="rgba(150, 210, 255, 0.08)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.5" />
              {/* Glare 1 */}
              <path d="M 185,185 C 200,165 250,165 265,185 C 255,180 195,180 185,185 Z" fill="rgba(255, 255, 255, 0.3)" />
              {/* Glare 2 (Diagonal Shine) */}
              <path d="M 190,260 Q 225,240 260,260 Q 225,250 190,260 Z" fill="rgba(255, 255, 255, 0.15)" />
              {/* Curved border shadow/light edge */}
              <circle cx="225" cy="225" r="48.5" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
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
              <filter id="shadow-dial" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000" floodOpacity="0.4" />
              </filter>
              <g filter="url(#shadow-dial)">
                {/* Main Dial Plate */}
                <circle cx="225" cy="225" r="48" fill="#121214" stroke="#252528" strokeWidth="0.5" />
                
                {/* Dial Concentric Circles Texture */}
                <circle cx="225" cy="225" r="42" fill="none" stroke="#1d1d21" strokeWidth="1" />
                <circle cx="225" cy="225" r="35" fill="none" stroke="#1d1d21" strokeWidth="0.75" />

                {/* Dial Gold Markers (Hours) */}
                {/* 12, 1, 2, 3... */}
                <rect x="223.5" y="180" width="3" height="8" rx="0.5" fill="url(#gold-grad)" />
                <rect x="223.5" y="262" width="3" height="8" rx="0.5" fill="url(#gold-grad)" />
                <rect x="180" y="223.5" width="8" height="3" rx="0.5" fill="url(#gold-grad)" />
                {/* 3 O'clock date slot instead of marker */}
                <rect x="255" y="220" width="14" height="10" rx="1" fill="#000" stroke="url(#gold-grad)" strokeWidth="0.5" />
                {/* Other hours */}
                <g transform="rotate(30, 225, 225)"><rect x="224" y="181" width="2" height="6" fill="url(#gold-grad)" /></g>
                <g transform="rotate(60, 225, 225)"><rect x="224" y="181" width="2" height="6" fill="url(#gold-grad)" /></g>
                <g transform="rotate(120, 225, 225)"><rect x="224" y="181" width="2" height="6" fill="url(#gold-grad)" /></g>
                <g transform="rotate(150, 225, 225)"><rect x="224" y="181" width="2" height="6" fill="url(#gold-grad)" /></g>
                <g transform="rotate(210, 225, 225)"><rect x="224" y="181" width="2" height="6" fill="url(#gold-grad)" /></g>
                <g transform="rotate(240, 225, 225)"><rect x="224" y="181" width="2" height="6" fill="url(#gold-grad)" /></g>
                <g transform="rotate(300, 225, 225)"><rect x="224" y="181" width="2" height="6" fill="url(#gold-grad)" /></g>
                <g transform="rotate(330, 225, 225)"><rect x="224" y="181" width="2" height="6" fill="url(#gold-grad)" /></g>
                
                {/* Branding text */}
                <text x="225" y="206" fontSize="6.5" fill="url(#gold-grad)" fontWeight="bold" textAnchor="middle" letterSpacing="1.5">CHRONOS</text>
                <text x="225" y="212" fontSize="3.5" fill="#8e8e93" textAnchor="middle">SWISS MADE</text>
                <text x="225" y="248" fontSize="4.5" fill="#c5a880" textAnchor="middle" letterSpacing="0.5">AUTOMATIC</text>
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
              <filter id="shadow-hands" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="1" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
              </filter>
              <g filter="url(#shadow-hands)">
                {/* Central Pin */}
                <circle cx="225" cy="225" r="4.5" fill="url(#gold-grad)" stroke="#553f10" strokeWidth="0.5" />

                {/* Hour Hand (Pointing at 10) */}
                <g transform="rotate(-60, 225, 225)">
                  <path d="M 223,225 L 223,197 L 225,192 L 227,197 L 227,225 Z" fill="url(#gold-grad)" stroke="#553f10" strokeWidth="0.5" />
                  {/* Luminous Fill */}
                  <rect x="224.2" y="200" width="1.6" height="20" fill="#e0ffd0" rx="0.5" />
                </g>

                {/* Minute Hand (Pointing at 2) */}
                <g transform="rotate(60, 225, 225)">
                  <path d="M 223.5,225 L 223.5,185 L 225,178 L 226.5,185 L 226.5,225 Z" fill="url(#gold-grad)" stroke="#553f10" strokeWidth="0.5" />
                  {/* Luminous Fill */}
                  <rect x="224.4" y="188" width="1.2" height="32" fill="#e0ffd0" rx="0.5" />
                </g>

                {/* Sweep Second Hand (Pointing at 5) */}
                <g transform="rotate(150, 225, 225)">
                  <line x1="225" y1="240" x2="225" y2="175" stroke="#d4af37" strokeWidth="0.75" />
                  {/* Counterweight circle */}
                  <circle cx="225" cy="235" r="2.5" fill="url(#gold-grad)" />
                  <circle cx="225" cy="180" r="1.5" fill="#ef4444" />
                </g>
                
                {/* Center cap */}
                <circle cx="225" cy="225" r="1.5" fill="#fff" />
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
              <filter id="shadow-date" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
              </filter>
              <g filter="url(#shadow-date)">
                {/* Date Wheel Outer Ring */}
                <circle cx="225" cy="225" r="47.5" fill="none" stroke="#252528" strokeWidth="1" />
                {/* Main flat white/silver ring */}
                <path d="M 225,177.5 
                         A 47.5,47.5 0 1,1 224.9,177.5 
                         L 224.9,188.5 
                         A 36.5,36.5 0 1,0 225,188.5 Z" 
                      fill="#e4e4e7" stroke="#b5b5ba" strokeWidth="0.5" />
                {/* Numbers printed around the ring */}
                <text x="261" y="228" fontSize="6.5" fill="#18181b" fontWeight="bold" textAnchor="middle">24</text>
                <text x="259" y="238" fontSize="6.5" fill="#a1a1aa" textAnchor="middle">25</text>
                <text x="254" y="247" fontSize="6.5" fill="#a1a1aa" textAnchor="middle">26</text>
                <text x="246" y="255" fontSize="6.5" fill="#a1a1aa" textAnchor="middle">27</text>
                <text x="237" y="260" fontSize="6.5" fill="#a1a1aa" textAnchor="middle">28</text>
                
                <text x="260" y="218" fontSize="6.5" fill="#a1a1aa" textAnchor="middle">23</text>
                <text x="256" y="208" fontSize="6.5" fill="#a1a1aa" textAnchor="middle">22</text>
                <text x="249" y="199" fontSize="6.5" fill="#a1a1aa" textAnchor="middle">21</text>
                <text x="240" y="193" fontSize="6.5" fill="#a1a1aa" textAnchor="middle">20</text>
                <text x="229" y="190" fontSize="6.5" fill="#a1a1aa" textAnchor="middle">19</text>
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
              <filter id="shadow-movement" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
              </filter>
              <g filter="url(#shadow-movement)">
                {/* Main Movement Plate */}
                <circle cx="225" cy="225" r="46.5" fill="url(#steel-grad)" stroke="#222" strokeWidth="1" />
                <circle cx="225" cy="225" r="45" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.75" />

                {/* Outer gearing teeth */}
                <circle cx="225" cy="225" r="46" fill="none" stroke="#4b5563" strokeWidth="1" strokeDasharray="1.5, 1" />

                {/* Brass Bridge plates */}
                <path d="M 195,195 C 220,185 240,195 265,210 L 265,245 C 240,255 210,245 195,230 Z" fill="url(#brass-grad)" stroke="#4a3b10" strokeWidth="0.5" />
                {/* Circular skeleton cutouts */}
                <circle cx="205" cy="215" r="8" fill="#18181b" stroke="#4a3b10" strokeWidth="0.5" />
                <circle cx="245" cy="230" r="10" fill="#18181b" stroke="#4b5563" strokeWidth="0.5" />

                {/* Interlocking Gears */}
                {/* Gear 1 (Gold/Brass) */}
                <g transform="rotate(25, 205, 215)">
                  <circle cx="205" cy="215" r="12" fill="url(#gold-grad)" stroke="#7a5b10" strokeWidth="0.5" />
                  <circle cx="205" cy="215" r="12" fill="none" stroke="#222" strokeWidth="1.5" strokeDasharray="1.5, 1" />
                  {/* spokes */}
                  <line x1="193" y1="215" x2="217" y2="215" stroke="#7a5b10" strokeWidth="1" />
                  <line x1="205" y1="203" x2="205" y2="227" stroke="#7a5b10" strokeWidth="1" />
                  <circle cx="205" cy="215" r="2.5" fill="#3f3f46" />
                </g>

                {/* Gear 2 (Silver Steel) */}
                <g transform="rotate(-40, 235, 205)">
                  <circle cx="235" cy="205" r="16" fill="url(#steel-grad)" stroke="#444" strokeWidth="0.5" />
                  <circle cx="235" cy="205" r="16" fill="none" stroke="#222" strokeWidth="1.5" strokeDasharray="2, 1" />
                  {/* spokes */}
                  <line x1="219" y1="205" x2="251" y2="205" stroke="#444" strokeWidth="1" />
                  <line x1="235" y1="189" x2="235" y2="221" stroke="#444" strokeWidth="1" />
                  <circle cx="235" cy="205" r="3.5" fill="url(#gold-grad)" />
                </g>

                {/* Escapement & Balance Wheel (Golden and rotating-looking) */}
                <circle cx="215" cy="245" r="14" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5" />
                <line x1="201" y1="245" x2="229" y2="245" stroke="url(#gold-grad)" strokeWidth="1.5" />
                <line x1="215" y1="231" x2="215" y2="259" stroke="url(#gold-grad)" strokeWidth="1.5" />
                <circle cx="215" cy="245" r="3.5" fill="#ef4444" /> {/* Synthetic Ruby Pivot */}

                {/* Small copper winding wheels */}
                <circle cx="250" cy="250" r="7" fill="url(#brass-grad)" stroke="#444" strokeWidth="0.5" strokeDasharray="1,1" />

                {/* Blued steel screws */}
                <circle cx="192" cy="192" r="1.8" fill="#1e3a8a" stroke="#2563eb" strokeWidth="0.25" />
                <line x1="191" y1="192" x2="193" y2="192" stroke="#000" strokeWidth="0.4" />
                
                <circle cx="255" cy="195" r="1.8" fill="#1e3a8a" stroke="#2563eb" strokeWidth="0.25" />
                <line x1="254" y1="195" x2="256" y2="195" stroke="#000" strokeWidth="0.4" />

                {/* Adjuster Regulator */}
                <path d="M 215,245 L 200,262 L 196,260 L 213,243 Z" fill="url(#steel-grad)" />
                <circle cx="198" cy="261" r="1.2" fill="url(#steel-grad)" />
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
              <filter id="shadow-back" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor="#000" floodOpacity="0.65" />
              </filter>
              <g filter="url(#shadow-back)">
                {/* Outer Brushed Backing */}
                <circle cx="225" cy="225" r="74" fill="url(#steel-grad)" stroke="#1a1a1c" strokeWidth="1" />
                {/* Threaded grooves */}
                <circle cx="225" cy="225" r="71" fill="none" stroke="#28282b" strokeWidth="0.5" />
                <circle cx="225" cy="225" r="68" fill="none" stroke="#1d1d1f" strokeWidth="1" />
                {/* Screw slots for opener */}
                <rect x="222" y="152" width="6" height="4" fill="#000" />
                <rect x="222" y="294" width="6" height="4" fill="#000" />
                <rect x="152" y="222" width="4" height="6" fill="#000" />
                <rect x="294" y="222" width="4" height="6" fill="#000" />

                {/* Exhibition window border */}
                <circle cx="225" cy="225" r="48" fill="url(#radial-steel)" stroke="#1c1c1e" strokeWidth="1" />
                {/* Sapphire exhibition window */}
                <circle cx="225" cy="225" r="38" fill="rgba(100, 150, 255, 0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                
                {/* Rotor (visible through window) */}
                <path d="M 225,225 M 225,190 A 35,35 0 0,1 260,225 L 225,225 Z" fill="url(#gold-grad)" opacity="0.8" />
                <circle cx="225" cy="225" r="5" fill="url(#steel-grad)" />

                {/* Engraving Text */}
                <path id="engrave-path-1" d="M 167,225 A 58,58 0 0,1 283,225" fill="none" />
                <text fontSize="5.5" fontWeight="bold" fill="#71717a">
                  <textPath href="#engrave-path-1" startOffset="50%" textAnchor="middle">
                    CHRONOS WATCH CO. • 10 ATM WATER RESISTANT
                  </textPath>
                </text>
                
                <path id="engrave-path-2" d="M 283,225 A 58,58 0 0,1 167,225" fill="none" />
                <text fontSize="5.5" fontWeight="bold" fill="#71717a">
                  <textPath href="#engrave-path-2" startOffset="50%" textAnchor="middle">
                    SAPPHIRE CRYSTAL • SWISS AUTOMATIC • N° 0042/1000
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

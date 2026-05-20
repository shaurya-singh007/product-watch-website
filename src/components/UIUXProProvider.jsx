import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Moon, Sun, MousePointer, MousePointerClick } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import '../UIUXPro.css';
import LiquidBackground from './LiquidBackground';

// ── Interactive Particle Background (Realistic 3D Luxury Dust Motes) ──
const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const mouse = useRef({ x: -1000, y: -1000, tx: -1000, ty: -1000 });
  const particles = useRef([]);
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const isDark = theme === 'dark';
    
    // Create floating dust particles with varying depth (Z)
    particles.current = Array.from({ length: 45 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 1.5 + 0.5, // Depth scaling factor
      radius: Math.random() * 1.8 + 0.6,
      baseSpeed: Math.random() * 0.15 + 0.05,
      angle: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.4 + 0.1
    }));

    const onMove = (e) => {
      mouse.current.tx = e.clientX;
      mouse.current.ty = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Interpolate mouse coordinates for fluid tracking
      const m = mouse.current;
      if (m.x === -1000) {
        m.x = m.tx;
        m.y = m.ty;
      } else {
        m.x += (m.tx - m.x) * 0.08;
        m.y += (m.ty - m.y) * 0.08;
      }

      particles.current.forEach((p) => {
        // Drift movement
        p.angle += 0.002;
        p.x += Math.cos(p.angle) * p.baseSpeed;
        p.y += Math.sin(p.angle) * p.baseSpeed - 0.08; // slow upward drift

        // Loop screen borders
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = h;

        // Gentle repulsion from cursor
        const dx = p.x - m.x;
        const dy = p.y - m.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let rx = 0, ry = 0;
        if (dist < 180) {
          const force = (180 - dist) / 180 * 12;
          rx = (dx / dist) * force * p.z;
          ry = (dy / dist) * force * p.z;
        }

        // Apply Z-axis scaling to size and opacity for realistic depth
        const finalX = p.x + rx;
        const finalY = p.y + ry;
        const size = p.radius * p.z;
        const alpha = p.opacity * p.z * (isDark ? 1 : 0.65);

        ctx.beginPath();
        ctx.arc(finalX, finalY, size, 0, Math.PI * 2);
        
        // Luxury champagne gold color theme for drifting dust motes
        ctx.fillStyle = isDark 
          ? `rgba(197, 168, 128, ${alpha})` 
          : `rgba(158, 127, 83, ${alpha * 0.85})`;
        ctx.shadowBlur = size * 1.5;
        ctx.shadowColor = 'rgba(197, 168, 128, 0.2)';
        ctx.fill();
      });
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;

      raf.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="pro-bg-canvas" style={{ zIndex: -1 }} />;
};

const CustomCursor = () => {
  const { cursorMode } = useTheme();
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (cursorMode === 'normal') return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Center coordinates
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const move = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, overwrite: 'auto' });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.22, overwrite: 'auto' });
    };

    const over = (e) => {
      const t = e.target;
      if (!t) return;

      const tag = t.tagName.toLowerCase();
      const isInteractive = t.tagName === 'BUTTON' || t.tagName === 'A' || t.closest('button') || t.closest('a') || t.classList.contains('clickable');
      const isMedia = t.tagName === 'IMG' || t.tagName === 'SVG' || t.closest('svg') || t.closest('img') || t.classList.contains('watch-graphics-container') || t.closest('.watch-graphics-container');
      const isHeading = t.tagName.match(/^H[1-6]$/);
      const isParagraph = tag === 'p' || tag === 'span' || tag === 'li' || tag === 'a' || t.childNodes.length === 1 && t.childNodes[0].nodeType === 3;
      const isCard = t.classList.contains('glass-panel') || t.closest('.glass-panel') || t.classList.contains('card-3d') || t.closest('.card-3d');
      const isSection = tag === 'section' || tag === 'header' || tag === 'footer' || t.closest('section') || t.closest('header') || t.closest('footer');
      
      if (isInteractive) {
        // High-contrast white inversion circle for buttons/links
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
        gsap.to(ring, { 
          scale: 3.5, 
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: 'transparent',
          borderWidth: '0px',
          duration: 0.3,
          ease: 'power3.out'
        });
      } else if (isMedia) {
        // Vibrant neon cyan color shift when hovering over watch images and graphics
        gsap.to(dot, { scale: 1.4, opacity: 0.9, backgroundColor: '#00f2fe', duration: 0.2 });
        gsap.to(ring, { 
          scale: 2.2, 
          backgroundColor: 'rgba(0, 242, 254, 0.15)',
          borderColor: '#00f2fe',
          borderWidth: '2px',
          duration: 0.3,
          ease: 'power3.out'
        });
      } else if (isHeading) {
        // Premium champagne gold color focus for headings
        gsap.to(dot, { scale: 0.6, opacity: 1, backgroundColor: 'var(--primary)', duration: 0.25 });
        gsap.to(ring, { 
          scale: 1.8, 
          backgroundColor: 'transparent',
          borderColor: 'var(--primary)',
          borderWidth: '3px',
          duration: 0.3,
          ease: 'power3.out'
        });
      } else if (isParagraph) {
        // Amber/Rose Gold color focus for normal text, paragraphs, spans, and lists
        gsap.to(dot, { scale: 0.7, opacity: 1, backgroundColor: '#e5b8a8', duration: 0.25 });
        gsap.to(ring, { 
          scale: 1.4, 
          backgroundColor: 'transparent',
          borderColor: '#e5b8a8',
          borderWidth: '1.5px',
          duration: 0.3,
          ease: 'power3.out'
        });
      } else if (isCard) {
        // Steel-silver color focus when reading cards or specifications panels
        gsap.to(dot, { scale: 1.1, opacity: 0.85, backgroundColor: '#cbd5e1', duration: 0.25 });
        gsap.to(ring, { 
          scale: 2.0, 
          backgroundColor: 'rgba(203, 213, 225, 0.08)',
          borderColor: '#cbd5e1',
          borderWidth: '2px',
          duration: 0.3,
          ease: 'power3.out'
        });
      } else if (isSection) {
        // Warm sunset amber glow for section bounds
        gsap.to(dot, { scale: 1.2, opacity: 0.9, backgroundColor: '#f59e0b', duration: 0.25 });
        gsap.to(ring, { 
          scale: 2.5, 
          backgroundColor: 'rgba(245, 158, 11, 0.05)',
          borderColor: '#f59e0b',
          borderWidth: '1.5px',
          duration: 0.3,
          ease: 'power3.out'
        });
      } else {
        // Restores default luxury gold styling
        gsap.to(dot, { scale: 1, opacity: 1, backgroundColor: 'var(--primary)', duration: 0.25 });
        gsap.to(ring, { 
          scale: 1, 
          backgroundColor: 'transparent',
          borderColor: 'var(--primary)',
          borderWidth: '2px',
          duration: 0.3,
          ease: 'power3.out'
        });
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [cursorMode]);

  if (cursorMode === 'normal') return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor" />
      <div ref={ringRef} className="custom-cursor-outline" />
    </>
  );
};

export const Magnetic = ({ children, strength = 0.3 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - (left + width / 2)) * strength,
        y: (e.clientY - (top + height / 2)) * strength,
        duration: 0.5,
        ease: 'power3.out',
      });
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.3)' });
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
    };
  }, [strength]);

  return <div ref={ref} className="magnetic-wrap">{children}</div>;
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="theme-toggle clickable" onClick={toggleTheme} aria-label="Toggle Theme">
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

const CursorToggle = () => {
  const { cursorMode, toggleCursorMode } = useTheme();
  return (
    <button 
      className="cursor-toggle clickable" 
      onClick={toggleCursorMode} 
      aria-label="Toggle Cursor Mode"
      style={{
        position: 'fixed',
        top: '84px',
        right: '24px',
        zIndex: 99995,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'var(--bg-card)',
        border: 'var(--glass-border)',
        color: 'var(--text-main)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backdropFilter: 'blur(12px)',
        boxShadow: 'var(--shadow-3d)',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.15)';
        e.currentTarget.style.boxShadow = '0 0 20px var(--glow-color), var(--shadow-hover)';
        e.currentTarget.style.background = 'var(--bg-glass)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'var(--shadow-3d)';
        e.currentTarget.style.background = 'var(--bg-card)';
      }}
    >
      {cursorMode === 'fancy' ? <MousePointerClick size={18} /> : <MousePointer size={18} />}
    </button>
  );
};

const UIUXProProvider = ({ children }) => {
  return (
    <>
      <div className="noise-overlay" />
      <CustomCursor />
      <ThemeToggle />
      <CursorToggle />
      <LiquidBackground />
      <InteractiveBackground />
      {children}
    </>
  );
};

export default UIUXProProvider;

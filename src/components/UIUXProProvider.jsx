import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Moon, Sun } from 'lucide-react';
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
    
    // Luxury color palette: warm champagne gold & amber tones
    const goldColors = isDark 
      ? ['rgba(197, 168, 128, 0.25)', 'rgba(230, 210, 180, 0.18)', 'rgba(165, 130, 80, 0.15)']
      : ['rgba(197, 168, 128, 0.18)', 'rgba(230, 210, 180, 0.12)', 'rgba(165, 130, 80, 0.1)'];

    // Initialize particles with 3D positions (X, Y, Z depth)
    const COUNT = 45; // Muted, clean count (not busy)
    const pts = [];
    for (let i = 0; i < COUNT; i++) {
      pts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 2.0 + 0.5, // Z depth: smaller z = closer (larger), larger z = far (smaller)
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 2.5 + 1.2,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
      });
    }
    particles.current = pts;

    const onMove = (e) => {
      mouse.current.tx = e.clientX;
      mouse.current.ty = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Smooth mouse lag
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.05;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        
        // Dynamic drift + mouse influence
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Gentle repulsion from cursor
        if (dist < 220) {
          const force = (220 - dist) / 220;
          p.vx += (dx / dist) * force * 0.06 / p.z;
          p.vy += (dy / dist) * force * 0.06 / p.z;
        }

        // Apply velocities & friction
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Wrap edges
        if (p.x < -50) p.x = w + 50;
        if (p.x > w + 50) p.x = -50;
        if (p.y < -50) p.y = h + 50;
        if (p.y > h + 50) p.y = -50;

        // Render as soft glowing 3D dust spheres (Size based on Z-depth)
        const size = p.r / p.z;
        const opacityMultiplier = Math.max(0, 1 - (p.z / 2.5)); // Fades as it gets further away
        
        ctx.beginPath();
        
        // Radial gradient for glow look
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2.5);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, 'transparent');
        
        ctx.arc(p.x, p.y, size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.globalAlpha = opacityMultiplier;
        ctx.fill();
      }
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
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let hovering = false;
    const move = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, overwrite: true });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.25, overwrite: true });
    };
    const over = (e) => {
      const t = e.target;
      const isText = t.childNodes.length === 1 && t.childNodes[0].nodeType === 3;
      const hit = t.tagName === 'BUTTON' || t.tagName === 'A' || t.closest('button') || t.closest('a') || t.classList.contains('clickable') || isText;
      
      if (hit && !hovering) {
        hovering = true;
        gsap.to(dot, { scale: 0.1, opacity: 0, duration: 0.2 });
        gsap.to(ring, { 
          scale: 3.5, 
          backgroundColor: 'white', 
          borderWidth: '0px',
          duration: 0.35,
          ease: 'power4.out'
        });
      } else if (!hit && hovering) {
        hovering = false;
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.25 });
        gsap.to(ring, { 
          scale: 1, 
          backgroundColor: 'transparent',
          borderWidth: '2px',
          duration: 0.35,
          ease: 'power4.out'
        });
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

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

const UIUXProProvider = ({ children }) => {
  return (
    <>
      <div className="noise-overlay" />
      <CustomCursor />
      <ThemeToggle />
      <LiquidBackground />
      <InteractiveBackground />
      {children}
    </>
  );
};

export default UIUXProProvider;

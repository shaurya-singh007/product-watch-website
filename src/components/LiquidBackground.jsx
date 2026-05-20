import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// Generate static premium 3D particles once to avoid re-creation on render
const PARTICLES = Array.from({ length: 40 }).map((_, i) => {
  const size = Math.random() * 4.5 + 1.5;
  const isGold = Math.random() > 0.4;
  const isBokeh = Math.random() > 0.85;
  const shape = Math.random() > 0.7 ? 'star' : 'circle';
  return {
    id: i,
    x: Math.random() * 100, // percentage x
    y: Math.random() * 100, // percentage y
    z: Math.random() * 400 - 200, // depth z from -200px to +200px
    size: isBokeh ? size * 4.5 + 8 : size,
    isGold,
    isBokeh,
    shape: isBokeh ? 'circle' : shape,
    speed: Math.random() * 0.4 + 0.15,
    initialRotation: Math.random() * 360,
    opacity: isBokeh ? Math.random() * 0.12 + 0.04 : Math.random() * 0.32 + 0.15
  };
});

export default function LiquidBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;
    const container = canvas.parentElement;
    if (!container) return;

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;
    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_is_light;
      varying vec2 v_uv;

      void main() {
        // Normalize coordinates
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
        
        // 1. Base Studio Ambient (charcoal slate vs light luxury ivory-eggshell)
        vec3 darkBG = vec3(0.045, 0.045, 0.05);
        vec3 lightBG = vec3(0.965, 0.96, 0.95);
        vec3 baseBackground = mix(darkBG, lightBG, u_is_light);
        
        // 2. Soft Fixed Key Light (Top Center)
        vec2 keyLightPos = vec2(0.0, 0.9);
        float keyDist = length(p - keyLightPos);
        
        float keyLightIntensity = mix(
          smoothstep(2.2, 0.0, keyDist) * 0.28,
          smoothstep(1.5, 0.0, keyDist) * 0.07, // softer/dimmer key light in light mode
          u_is_light
        );
        vec3 keyLightColor = mix(vec3(0.96, 0.92, 0.85), vec3(1.0, 1.0, 1.0), u_is_light);
        
        // 3. Mouse Reflector Glow (Dynamic Fill Light)
        vec2 mouse = (u_mouse.xy * 2.0 - u_resolution.xy) / u_resolution.y;
        float mouseDist = length(p - mouse);
        
        float mouseGlow = mix(
          smoothstep(1.5, 0.0, mouseDist) * 0.16,
          smoothstep(1.0, 0.0, mouseDist) * 0.04, // subtle warm spotlight follow in light mode
          u_is_light
        );
        vec3 goldReflectorColor = mix(vec3(0.77, 0.66, 0.50), vec3(0.65, 0.52, 0.38), u_is_light);
        
        // 4. Subtle Ambient Shading (Slow wave)
        float ambientWave = sin(p.x * 2.0 + u_time * 0.2) * cos(p.y * 2.0 - u_time * 0.15) * mix(0.015, 0.005, u_is_light);
        
        // 5. Heavy Vignette Effect
        float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        float targetVignette = mix(
          clamp(pow(16.0 * vignette, 0.55), 0.0, 1.0),
          clamp(pow(16.0 * vignette, 0.95), 0.94, 1.0), // very soft corners in light mode
          u_is_light
        );
        
        // Combine lights
        vec3 finalColor = baseBackground + (keyLightIntensity * keyLightColor) + (mouseGlow * goldReflectorColor) + ambientWave;
        
        // Apply vignette
        finalColor *= targetVignette;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function createShader(type, source) {
      const s = gl.createShader(type);
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return s;
    }

    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);

    const posLoc = gl.getAttribLocation(program, 'a_position');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const isLightLoc = gl.getUniformLocation(program, 'u_is_light');

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let tx = mx, ty = my;

    // Initialize CSS custom variables on container
    container.style.setProperty('--mouse-x', '0');
    container.style.setProperty('--mouse-y', '0');
    container.style.setProperty('--scroll-y', '0px');

    const onMove = e => { 
      tx = e.clientX; 
      ty = canvas.height - e.clientY; 
      
      // Calculate normalized positions (-1 to 1) for the 3D depth parallax
      const nx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ny = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      container.style.setProperty('--mouse-x', nx);
      container.style.setProperty('--mouse-y', ny);
    };
    window.addEventListener('mousemove', onMove);

    const onScroll = () => {
      container.style.setProperty('--scroll-y', `${window.scrollY}px`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let raf;
    function render(time) {
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      mx += (tx - mx) * 0.05; // smoother, slower lag
      my += (ty - my) * 0.05;
      gl.useProgram(program);
      gl.enableVertexAttribArray(posLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, time * 0.001);
      gl.uniform2f(mouseLoc, mx, my);
      gl.uniform1f(isLightLoc, theme === 'light' ? 1.0 : 0.0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [theme]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -2,
      pointerEvents: 'none',
      overflow: 'hidden',
      perspective: '800px',
      transformStyle: 'preserve-3d'
    }}>
      {/* 2D Liquid WebGL Canvas at the background layer */}
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          pointerEvents: 'none',
          opacity: 0.95,
          transform: 'translateZ(-400px) scale(1.6)' // Positioned far back to enable space for particles
        }}
      />
      
      {/* 3D Floating Particle Layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        transformStyle: 'preserve-3d',
        pointerEvents: 'none'
      }}>
        {PARTICLES.map(p => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              pointerEvents: 'none',
              opacity: theme === 'light' ? p.opacity * 0.45 : p.opacity,
              background: p.isGold
                ? 'linear-gradient(135deg, #fff3cd, #c5a880, #8a6d3b)'
                : theme === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.55)',
              boxShadow: p.isBokeh ? 'none' : p.isGold
                ? '0 0 10px rgba(197, 168, 128, 0.5)'
                : '0 0 8px rgba(255, 255, 255, 0.3)',
              borderRadius: p.shape === 'star' ? '0%' : '50%',
              clipPath: p.shape === 'star' 
                ? 'polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%)' 
                : 'none',
              filter: p.isBokeh ? 'blur(6px)' : 'none',
              // Dynamic transform: X/Y reaction scaling inversely with depth Z, plus vertical scrolling speed variance
              transform: `translate3d(
                calc(var(--mouse-x) * ${p.z * -0.07}px), 
                calc(var(--mouse-y) * ${p.z * -0.07}px - var(--scroll-y) * ${p.speed}), 
                ${p.z}px
              ) rotate(${p.initialRotation}deg)`,
              transition: 'transform 0.12s cubic-bezier(0.1, 0.85, 0.2, 1)'
            }}
          />
        ))}
      </div>
    </div>
  );
}

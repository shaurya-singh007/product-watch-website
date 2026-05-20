import { useEffect, useRef } from 'react';

export default function LiquidBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

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
      varying vec2 v_uv;

      void main() {
        // Normalize coordinates
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
        
        // 1. Base Studio Ambient Dark Tone
        vec3 darkBackground = vec3(0.045, 0.045, 0.05);
        
        // 2. Soft Fixed Key Light (Top Center)
        vec2 keyLightPos = vec2(0.0, 0.9);
        float keyDist = length(p - keyLightPos);
        float keyLightIntensity = smoothstep(2.2, 0.0, keyDist) * 0.28;
        vec3 keyLightColor = vec3(0.96, 0.92, 0.85); // Warm ivory studio light
        
        // 3. Mouse Reflector Glow (Dynamic Fill Light)
        vec2 mouse = (u_mouse.xy * 2.0 - u_resolution.xy) / u_resolution.y;
        float mouseDist = length(p - mouse);
        float mouseGlow = smoothstep(1.5, 0.0, mouseDist) * 0.16;
        vec3 goldReflectorColor = vec3(0.77, 0.66, 0.50); // Muted luxury gold reflection
        
        // 4. Subtle Ambient Shading (Slow wave)
        float ambientWave = sin(p.x * 2.0 + u_time * 0.2) * cos(p.y * 2.0 - u_time * 0.15) * 0.015;
        
        // 5. Heavy Vignette Effect
        float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        vignette = clamp(pow(16.0 * vignette, 0.55), 0.0, 1.0);
        
        // Combine lights
        vec3 finalColor = darkBackground + (keyLightIntensity * keyLightColor) + (mouseGlow * goldReflectorColor) + ambientWave;
        
        // Apply vignette
        finalColor *= vignette;
        
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

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let tx = mx, ty = my;

    const onMove = e => { 
      tx = e.clientX; 
      ty = canvas.height - e.clientY; 
    };
    window.addEventListener('mousemove', onMove);

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
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -2, 
        pointerEvents: 'none',
        opacity: 0.95
      }}
    />
  );
}

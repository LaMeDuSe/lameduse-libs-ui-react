import React, { useEffect, useRef } from 'react';

export interface InteractiveBgProps {
  effect: 'none' | 'plexus' | 'repulsion' | 'magnetic-glow' | 'constellation' | 'grid-warp';
  gradientBg?: string;
  color?: string;
  colorSecondary?: string;
  mouse: { x: number; y: number; active: boolean };
}

export const InteractiveBg: React.FC<InteractiveBgProps> = ({
  effect,
  gradientBg = 'bg-slate-950',
  color = 'rgba(1, 180, 182, 0.85)',
  colorSecondary = 'rgba(0, 128, 226, 0.85)',
  mouse
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgGlow1Ref = useRef<HTMLDivElement>(null);
  const bgGlow2Ref = useRef<HTMLDivElement>(null);

  // Store mouse in ref to avoid re-triggering the animation loop initialization on mouse move
  const mouseRef = useRef(mouse);
  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  // Helper to convert hex/rgb/rgba to custom opacity rgba (ReDoS-safe)
  const getRgba = (colorStr: string, opacity: number) => {
    if (colorStr.startsWith("rgba")) {
      const lastComma = colorStr.lastIndexOf(",");
      if (lastComma !== -1) {
        return colorStr.substring(0, lastComma + 1) + ` ${opacity})`;
      }
    }
    if (colorStr.startsWith("rgb")) {
      if (colorStr.endsWith(")")) {
        const base = colorStr.substring(0, colorStr.length - 1);
        return `${base.replace("rgb", "rgba")}, ${opacity})`;
      }
    }
    if (colorStr.startsWith("#")) {
      const hex = colorStr.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return `rgba(1, 180, 182, ${opacity})`;
  };

  useEffect(() => {
    if (effect === 'none') return;

    const canvas = canvasRef.current;
    let ctx: CanvasRenderingContext2D | null = null;

    if (effect !== 'magnetic-glow') {
      if (!canvas) return;
      ctx = canvas.getContext('2d');
      if (!ctx) return;
    }

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId: number;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseVx: number;
      baseVy: number;
      radius: number;
      baseX?: number;
      baseY?: number;
    }> = [];

    // Initialize effect coordinates
    const wInit = canvas ? canvas.clientWidth : window.innerWidth;
    const hInit = canvas ? canvas.clientHeight : 500;

    if (effect === 'plexus' || effect === 'repulsion' || effect === 'constellation') {
      const particleCount = effect === 'constellation' ? 55 : 45;
      for (let i = 0; i < particleCount; i++) {
        const vx = (Math.random() - 0.5) * 0.6;
        const vy = (Math.random() - 0.5) * 0.6;
        particles.push({
          x: Math.random() * wInit,
          y: Math.random() * hInit,
          vx: vx,
          vy: vy,
          baseVx: vx,
          baseVy: vy,
          radius: Math.random() * 2 + 1.2,
        });
      }
    } else if (effect === 'grid-warp') {
      const spacing = 35;
      const cols = Math.ceil(wInit / spacing) + 2;
      const rows = Math.ceil(hInit / spacing) + 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const baseX = (c - 0.5) * spacing;
          const baseY = (r - 0.5) * spacing;
          particles.push({
            x: baseX,
            y: baseY,
            vx: 0,
            vy: 0,
            baseVx: 0,
            baseVy: 0,
            radius: 1.5,
            baseX: baseX,
            baseY: baseY
          });
        }
      }
    }

    let glow1 = { x: 0, y: 0 };
    let glow2 = { x: 0, y: 0 };

    const animate = () => {
      const w = canvas ? canvas.width : window.innerWidth;
      const h = canvas ? canvas.height : 500;
      const m = mouseRef.current;

      if (effect === 'magnetic-glow') {
        let target1X = 0;
        let target1Y = 0;
        let target2X = 0;
        let target2Y = 0;
        if (m.active) {
          const relX = m.x / w - 0.5;
          const relY = m.y / h - 0.5;
          target1X = relX * 140;
          target1Y = relY * 140;
          target2X = -relX * 140;
          target2Y = -relY * 140;
        }

        glow1.x += (target1X - glow1.x) * 0.08;
        glow1.y += (target1Y - glow1.y) * 0.08;
        glow2.x += (target2X - glow2.x) * 0.08;
        glow2.y += (target2Y - glow2.y) * 0.08;

        if (bgGlow1Ref.current) {
          bgGlow1Ref.current.style.transform = `translate3d(${glow1.x}px, ${glow1.y}px, 0)`;
        }
        if (bgGlow2Ref.current) {
          bgGlow2Ref.current.style.transform = `translate3d(${glow2.x}px, ${glow2.y}px, 0)`;
        }
      } else if (ctx) {
        ctx.clearRect(0, 0, w, h);

        if (effect === 'plexus' || effect === 'repulsion' || effect === 'constellation') {
          particles.forEach((p) => {
            if (m.active) {
              const dx = m.x - p.x;
              const dy = m.y - p.y;
              const distance = Math.hypot(dx, dy);

              if (effect === 'plexus') {
                const gravityRadius = 250;
                if (distance < gravityRadius) {
                  const force = (1 - distance / gravityRadius) * 0.15;
                  const angle = Math.atan2(dy, dx);
                  p.vx += Math.cos(angle) * force;
                  p.vy += Math.sin(angle) * force;
                } else {
                  p.vx += (p.baseVx - p.vx) * 0.03;
                  p.vy += (p.baseVy - p.vy) * 0.03;
                }
              } else if (effect === 'repulsion') {
                const repulsionRadius = 180;
                if (distance < repulsionRadius) {
                  const force = (1 - distance / repulsionRadius) * 0.65;
                  const angle = Math.atan2(dy, dx);
                  p.vx -= Math.cos(angle) * force;
                  p.vy -= Math.sin(angle) * force;
                } else {
                  p.vx += (p.baseVx - p.vx) * 0.03;
                  p.vy += (p.baseVy - p.vy) * 0.03;
                }
              } else if (effect === 'constellation') {
                p.vx += (p.baseVx - p.vx) * 0.03;
                p.vy += (p.baseVy - p.vy) * 0.03;
              }
            } else {
              p.vx += (p.baseVx - p.vx) * 0.03;
              p.vy += (p.baseVy - p.vy) * 0.03;
            }

            p.vx *= 0.94;
            p.vy *= 0.94;

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) { p.x = 0; p.vx *= -1; }
            else if (p.x > w) { p.x = w; p.vx *= -1; }
            if (p.y < 0) { p.y = 0; p.vy *= -1; }
            else if (p.y > h) { p.y = h; p.vy *= -1; }

            ctx!.beginPath();
            ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx!.fillStyle = color;
            ctx!.shadowBlur = effect === 'constellation' ? 8 : 4;
            ctx!.shadowColor = color;
            ctx!.fill();
            ctx!.shadowBlur = 0;
          });

          if (effect === 'plexus') {
            for (let i = 0; i < particles.length; i++) {
              for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                const limit = 100;
                if (dist < limit) {
                  const opacity = (1 - dist / limit) * 0.28;
                  ctx!.beginPath();
                  ctx!.moveTo(p1.x, p1.y);
                  ctx!.lineTo(p2.x, p2.y);
                  ctx!.strokeStyle = getRgba(color, opacity);
                  ctx!.lineWidth = 0.8;
                  ctx!.stroke();
                }
              }
            }
          } else if (effect === 'constellation') {
            if (m.active) {
              particles.forEach((p) => {
                const dist = Math.hypot(m.x - p.x, m.y - p.y);
                const limit = 200;
                if (dist < limit) {
                  const opacity = (1 - dist / limit) * 0.45;
                  ctx!.beginPath();
                  ctx!.moveTo(p.x, p.y);
                  ctx!.lineTo(m.x, m.y);
                  ctx!.strokeStyle = getRgba(color, opacity);
                  ctx!.lineWidth = 0.9;
                  ctx!.stroke();
                }
              });

              ctx!.beginPath();
              ctx!.arc(m.x, m.y, 25, 0, Math.PI * 2);
              ctx!.strokeStyle = getRgba(colorSecondary, 0.4);
              ctx!.lineWidth = 1.2;
              ctx!.stroke();

              ctx!.beginPath();
              ctx!.arc(m.x, m.y, 4, 0, Math.PI * 2);
              ctx!.fillStyle = colorSecondary;
              ctx!.fill();
            }
          }
        } else if (effect === 'grid-warp') {
          particles.forEach((p) => {
            const baseX = p.baseX!;
            const baseY = p.baseY!;

            let targetX = baseX;
            let targetY = baseY;

            if (m.active) {
              const dx = m.x - baseX;
              const dy = m.y - baseY;
              const distance = Math.hypot(dx, dy);
              const warpRadius = 150;

              if (distance < warpRadius) {
                const force = (1 - distance / warpRadius) * 28;
                const angle = Math.atan2(dy, dx);
                targetX = baseX - Math.cos(angle) * force;
                targetY = baseY - Math.sin(angle) * force;
              }
            }

            p.x += (targetX - p.x) * 0.15;
            p.y += (targetY - p.y) * 0.15;

            ctx!.beginPath();
            ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx!.fillStyle = color;
            ctx!.fill();
          });

          const spacing = 35;
          const cols = Math.ceil(w / spacing) + 2;
          const rows = Math.ceil(h / spacing) + 2;

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const index = r * cols + c;
              if (index >= particles.length) continue;

              const pCurr = particles[index];

              if (c < cols - 1) {
                const pRight = particles[index + 1];
                if (pRight) {
                  ctx!.beginPath();
                  ctx!.moveTo(pCurr.x, pCurr.y);
                  ctx!.lineTo(pRight.x, pRight.y);
                  ctx!.strokeStyle = getRgba(color, 0.08);
                  ctx!.lineWidth = 0.5;
                  ctx!.stroke();
                }
              }

              if (r < rows - 1) {
                const pBottom = particles[index + cols];
                if (pBottom) {
                  ctx!.beginPath();
                  ctx!.moveTo(pCurr.x, pCurr.y);
                  ctx!.lineTo(pBottom.x, pBottom.y);
                  ctx!.strokeStyle = getRgba(color, 0.08);
                  ctx!.lineWidth = 0.5;
                  ctx!.stroke();
                }
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [effect, color, colorSecondary]);

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full z-0 overflow-hidden ${gradientBg}`}>
      {effect === 'magnetic-glow' && (
        <>
          <div className="absolute top-[30%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] pointer-events-none">
            <div ref={bgGlow1Ref} className="w-full h-full rounded-full" style={{ backgroundColor: color, filter: 'blur(95px)', opacity: 0.55 }} />
          </div>
          <div className="absolute bottom-[30%] right-[25%] translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] pointer-events-none">
            <div ref={bgGlow2Ref} className="w-full h-full rounded-full" style={{ backgroundColor: colorSecondary, filter: 'blur(95px)', opacity: 0.55 }} />
          </div>
        </>
      )}

      {effect !== 'none' && effect !== 'magnetic-glow' && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-85 pointer-events-none" />
      )}
    </div>
  );
};

export default InteractiveBg;

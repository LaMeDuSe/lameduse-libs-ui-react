import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout, SlideStyle, SlideStyles } from './HeroSliderStyles';
import Link from '../../components/Link';
import { LinkProps } from '../../components/Link/Link';

export interface Slide {
  title?: string;
  subtitle?: string;
  image?: string; // made optional
  textClassName?: string;
  buttons?: LinkProps[];
  style?: SlideLayout | SlideStyle;
  imgClassName?: string;
  bg?: string;
  
  /** Animated background gradient classes (Tailwind CSS). E.g. "bg-gradient-to-tr from-slate-950 via-indigo-950 to-slate-950" */
  gradientBg?: string;
  /** Interactive canvas/DOM background effect type to render instead of image */
  bgEffect?: 'none' | 'plexus' | 'repulsion' | 'magnetic-glow' | 'constellation' | 'grid-warp';
  /** Primary CSS color for particles or glow bubbles (e.g. "rgba(1, 180, 182, 0.85)") */
  bgEffectColor?: string;
  /** Secondary CSS color for glow bubbles or constellation target points (e.g. "rgba(0, 128, 226, 0.85)") */
  bgEffectColorSecondary?: string;
}

/**
 * HeroSlider Component
 * 
 * A customizable hero slider/carousel component that displays slides with images or interactive gradients,
 * titles, subtitles, and buttons. Supports auto-play functionality and various slide layouts.
 */
export interface HeroSliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
  enableShapeDivider?: boolean;
  enableAnimation?: boolean;
  bg?: string;
}

interface SlideInteractiveBgProps {
  effect: 'none' | 'plexus' | 'repulsion' | 'magnetic-glow' | 'constellation' | 'grid-warp';
  gradientBg?: string;
  color?: string;
  colorSecondary?: string;
  mouse: { x: number; y: number; active: boolean };
}

const SlideInteractiveBg: React.FC<SlideInteractiveBgProps> = ({
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

const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  autoPlay = true,
  interval = 5000,
  enableShapeDivider = false, 
  enableAnimation = false,
  bg = "bg-black"
}) => {
  const baseHeightClass = "h-[500px]";
  const dripExtraHeightClass = enableShapeDivider ? "h-[620px]" : baseHeightClass;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    });
  };

  const handleMouseLeave = () => {
    setMouse((prev) => ({ ...prev, active: false }));
  };

  const handleMouseEnter = () => {
    setMouse((prev) => ({ ...prev, active: true }));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval]);

  const currentSlide = slides[currentIndex];
  const layout = currentSlide.style
    ? typeof currentSlide.style === 'string'
      ? SlideStyles[currentSlide.style]
      : currentSlide.style
    : SlideStyles.default;

  const alignmentMap = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-left',
  };

  const liquidAnimation = {
    y: [0, 10, 0],
    scaleY: [1, 1.05, 1],
    transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative w-full ${dripExtraHeightClass} overflow-hidden ${bg} z-0 transition-all duration-300`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 z-10 overflow-hidden"
        >
          {slides[currentIndex].image ? (
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              className={`w-full h-full object-cover ${currentSlide.imgClassName || ''} `}
            />
          ) : (
            <SlideInteractiveBg
              effect={currentSlide.bgEffect || 'none'}
              gradientBg={currentSlide.gradientBg}
              color={currentSlide.bgEffectColor}
              colorSecondary={currentSlide.bgEffectColorSecondary}
              mouse={mouse}
            />
          )}
          
          <div className={`absolute top-0 left-0 w-full ${baseHeightClass} flex flex-col sm:justify-center text-white px-4 sm:px-20 ${alignmentMap[layout.align]} z-30`}>
            {layout.showTitle && (
                <h2 className={`mt-10 sm:mt-0 text-5xl ${currentSlide.textClassName || ''} text-heading`}>
                    {currentSlide.title}
                </h2>
            )}
            {layout.showSubtitle && (
                <p className={`text-xl ${currentSlide.textClassName || ''} text-body`}>
                    {currentSlide.subtitle}
                </p>
            )}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 gap-3 flex flex-wrap justify-center transition-all">
                {layout.showButton && currentSlide.buttons && currentSlide.buttons.map((button, index) => (
                    <Link
                        key={index}
                        style="solid"
                        type="white"
                        form="rounded"
                        size="large"
                        {...button}
                    >
                        {button.children}
                    </Link>
                ))}
            </div>
            <button
                onClick={goToPrev}
                className="absolute bottom-0 sm:bottom-auto sm:top-1/2 left-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70"
            >
                <ChevronLeft size={28} />
            </button>
            <button
                onClick={goToNext}
                className="absolute bottom-0 sm:bottom-auto sm:top-1/2 right-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70"
            >
                <ChevronRight size={28} />
            </button>

            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3 transition-all">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-4 h-4 rounded-full border border-white ${index === currentIndex ? 'bg-white' : 'bg-transparent'
                            }`}
                    />
                ))}
            </div>
          </div>
          {enableShapeDivider && (
            <motion.div className="absolute bottom-0 left-0 w-full leading-[0] z-20 pointer-events-none" animate={enableAnimation ? liquidAnimation : {}}>
                <svg
                    className="relative block w-[calc(100%+1.3px)] h-[120px] md:h-[150px]"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        className="fill-white"
                        transform="scale(1, -1) translate(0, -120)"
                    ></path>
                    <path
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.67-49.23V0Z"
                        className="fill-white"
                        opacity="0.3"
                        transform="scale(1, -1) translate(0, -120)"
                    ></path>
                </svg>
            </motion.div>
          )}
          </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default HeroSlider;
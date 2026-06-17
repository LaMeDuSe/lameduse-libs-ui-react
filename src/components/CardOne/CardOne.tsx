import React, { useState, useEffect, useRef } from "react";
import ImageImport from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link, { LinkProps } from "../Link/Link";
import IconText, { IconTextProps } from "../IconText/IconText";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Handle ESM/CJS interop for Next.js components
const Image = (ImageImport as any).default || ImageImport;

export interface CardOneProps {
  type?: "primary";
  className?: string;
  onClick?: () => void;
  image?: string | StaticImport;
  imageClassName?: string;
  imageHeight?: number;
  imageWidth?: number;
  imageAlt?: string;
  imageQuality?: number;
  description: string | React.ReactElement;
  title: string;
  link?: LinkProps;
  border?: "normal" | "no-border";
  rounded?: boolean;
  icons?: IconTextProps[];
  
  // New props for interactive animations (ripple removed)
  interactiveEffect?: "blob" | "particles" | "neon-grid" | "glitch";
  interactiveBgColor?: string;
  interactiveColor?: string;
  interactiveColorSecondary?: string;
}

// 1. Blob Component (Gooey Liquid Morphing Blobs - splits and merges)
const blobPaths = [
  "M140,90 C155,110 160,135 140,150 C120,165 95,170 70,160 C45,150 35,125 40,100 C45,75 65,55 90,50 C115,45 125,70 140,90 Z",
  "M150,100 C150,125 130,140 110,155 C90,170 65,160 50,140 C35,120 30,95 40,75 C50,55 75,45 100,45 C125,45 150,75 150,100 Z",
  "M135,85 C145,105 155,130 140,145 C125,160 85,165 65,150 C45,135 40,110 45,85 C50,60 75,50 100,50 C125,50 125,65 135,85 Z"
];

const BlobBg = ({ isVisible, isHovered, springX, springY, color, colorSecondary, bgColor }: { isVisible: boolean; isHovered: boolean; springX: any; springY: any; color?: string; colorSecondary?: string; bgColor?: string }) => {
  const filterId = useRef(`gooey-filter-${Math.random().toString(36).substr(2, 9)}`);
  const [ambientOffset, setAmbientOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setAmbientOffset({
        x: Math.sin(Date.now() / 1500) * 35,
        y: Math.cos(Date.now() / 1200) * 20
      });
    }, 40);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center overflow-hidden" style={{ backgroundColor: bgColor || "#0f172a" }}>
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id={filterId.current}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -9" result="goo" />
          </filter>
        </defs>
      </svg>

      <div 
        className="w-full h-full relative" 
        style={{ filter: `url(#${filterId.current})` }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full absolute inset-0">
          <defs>
            <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color || "#c084fc"} />
              <stop offset="100%" stopColor={colorSecondary || "#6366f1"} />
            </linearGradient>
          </defs>

          <motion.path
            d="M200,150 C240,150 260,170 260,200 C260,230 235,260 200,260 C165,260 140,230 140,200 C140,170 160,150 200,150 Z"
            animate={isVisible ? {
              d: [
                "M200,150 C240,150 260,170 260,200 C260,230 235,260 200,260 C165,260 140,230 140,200 C140,170 160,150 200,150 Z",
                "M200,160 C230,140 270,170 270,200 C270,230 230,250 200,250 C170,250 140,225 140,200 C140,175 170,180 200,160 Z",
                "M200,150 C245,165 255,185 255,200 C255,215 240,255 200,255 C160,255 145,220 145,200 C145,180 155,135 200,150 Z",
                "M200,150 C240,150 260,170 260,200 C260,230 235,260 200,260 C165,260 140,230 140,200 C140,170 160,150 200,150 Z"
              ]
            } : {}}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut"
            }}
            fill="url(#blobGrad)"
          />

          <motion.path
            d="M200,175 C215,175 225,185 225,200 C225,215 215,225 200,225 C185,225 175,215 175,200 C175,185 185,175 200,175 Z"
            animate={isVisible ? {
              d: [
                "M200,175 C215,175 225,185 225,200 C225,215 215,225 200,225 C185,225 175,215 175,200 C175,185 185,175 200,175 Z",
                "M200,165 C225,165 235,180 235,200 C235,220 220,235 200,235 C180,235 165,220 165,200 C165,180 175,165 200,165 Z",
                "M200,175 C215,175 225,185 225,200 C225,215 215,225 200,225 C185,225 175,215 175,200 C175,185 185,175 200,175 Z"
              ],
              x: ambientOffset.x,
              y: ambientOffset.y
            } : {}}
            transition={{
              d: { repeat: Infinity, duration: 6, ease: "easeInOut" },
              x: { type: "tween", ease: "linear", duration: 0.04 },
              y: { type: "tween", ease: "linear", duration: 0.04 }
            }}
            fill="url(#blobGrad)"
            opacity="0.85"
          />
        </svg>

        <motion.div
          style={{
            x: springX,
            y: springY,
            left: "50%",
            top: "50%",
            translateX: "-50%",
            translateY: "-50%"
          }}
          className="absolute w-28 h-28 rounded-full"
          animate={{
            scale: isHovered ? 1.05 : 0.85,
          }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div 
            className="w-full h-full rounded-full" 
            style={{ 
              background: `linear-gradient(135deg, ${color || "#c084fc"} 0%, ${colorSecondary || "#6366f1"} 100%)` 
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

// 2. Particles Component (Uses isHoveredRef to avoid effect resets on mouse enter/exit)
interface CanvasBgProps {
  isVisible: boolean;
  isHoveredRef: React.RefObject<boolean>;
  mousePosRef: React.RefObject<{ x: number; y: number }>;
  color?: string;
  bgColor?: string;
}

const ParticlesBg = ({ isVisible, isHoveredRef, mousePosRef, color, bgColor }: CanvasBgProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 300);
    let height = (canvas.height = canvas.offsetHeight || 250);

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });
    resizeObserver.observe(canvas);

    const particleCount = 30;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.3
      });
    }

    let hoverFactor = 0;

    const draw = () => {
      if (!isVisible) return;
      
      ctx.fillStyle = bgColor || "#09090b";
      ctx.fillRect(0, 0, width, height);

      // Read hover state directly from ref inside the loop so we don't restart useEffect
      const isHovered = isHoveredRef.current;
      const currentMouse = mousePosRef.current || { x: 0, y: 0 };
      const targetX = (currentMouse.x + 0.5) * width;
      const targetY = (currentMouse.y + 0.5) * height;

      if (isHovered) {
        hoverFactor += (1 - hoverFactor) * 0.1;
      } else {
        hoverFactor += (0 - hoverFactor) * 0.05;
      }

      const ambientFactor = 1 - hoverFactor;

      particles.forEach((p) => {
        if (hoverFactor > 0.01) {
          const dx = targetX - p.x;
          const dy = targetY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < 180) {
            p.vx += (dx / dist) * 0.12 * hoverFactor;
            p.vy += (dy / dist) * 0.12 * hoverFactor;
          }
        }

        if (ambientFactor > 0.01) {
          const cx = width / 2;
          const cy = height / 2;
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          
          p.vx -= (dx / dist) * 0.015 * ambientFactor;
          p.vy -= (dy / dist) * 0.015 * ambientFactor;
          
          p.vx += (-dy / dist) * 0.025 * ambientFactor;
          p.vy += (dx / dist) * 0.025 * ambientFactor;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;

        p.vx += (Math.random() - 0.5) * 0.03;
        p.vy += (Math.random() - 0.5) * 0.03;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color || "#8b5cf6";
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color || "#8b5cf6";
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    if (isVisible) {
      draw();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [isVisible, color, bgColor]); // Removed isHovered from dependencies to prevent restarts

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />;
};

// 3. NeonGrid Component (Uses isHoveredRef to avoid resets on mouse enter/exit)
const NeonGridBg = ({ isVisible, isHoveredRef, mousePosRef, color, bgColor }: CanvasBgProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 300);
    let height = (canvas.height = canvas.offsetHeight || 250);

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });
    resizeObserver.observe(canvas);

    const gridSize = 25;
    let warpFactor = 0;

    const draw = () => {
      if (!isVisible) return;

      ctx.fillStyle = bgColor || "#020617";
      ctx.fillRect(0, 0, width, height);

      const isHovered = isHoveredRef.current;
      const currentMouse = mousePosRef.current || { x: 0, y: 0 };
      const targetX = (currentMouse.x + 0.5) * width;
      const targetY = (currentMouse.y + 0.5) * height;

      if (isHovered) {
        warpFactor += (1 - warpFactor) * 0.1;
      } else {
        warpFactor += (0 - warpFactor) * 0.05;
      }

      ctx.strokeStyle = color ? `${color}22` : "rgba(99, 102, 241, 0.15)";
      ctx.lineWidth = 1;

      const time = Date.now() * 0.003;

      // Horizontal lines
      for (let y = gridSize; y < height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          let drawY = y;
          
          const dx = x - targetX;
          const dy = y - targetY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            drawY += dy * force * 0.28 * warpFactor;
          }
          
          const wave = Math.sin(x * 0.012 + time) * Math.cos(y * 0.008 + time * 0.5);
          drawY += wave * 7 * (1 - warpFactor);
          
          if (x === 0) ctx.moveTo(x, drawY);
          else ctx.lineTo(x, drawY);
        }
        ctx.stroke();
      }

      // Vertical lines
      for (let x = gridSize; x < width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= height; y += 10) {
          let drawX = x;
          
          const dx = x - targetX;
          const dy = y - targetY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            drawX += dx * force * 0.28 * warpFactor;
          }
          
          const wave = Math.cos(y * 0.012 + time) * Math.sin(x * 0.008 + time * 0.5);
          drawX += wave * 7 * (1 - warpFactor);
          
          if (y === 0) ctx.moveTo(drawX, y);
          else ctx.lineTo(drawX, y);
        }
        ctx.stroke();
      }

      // Glowing dots
      if (warpFactor > 0.01) {
        ctx.fillStyle = color || "#6366f1";
        for (let x = gridSize; x < width; x += gridSize) {
          for (let y = gridSize; y < height; y += gridSize) {
            const dx = x - targetX;
            const dy = y - targetY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
              const force = (80 - dist) / 80;
              ctx.beginPath();
              let px = x + dx * force * 0.28 * warpFactor;
              let py = y + dy * force * 0.28 * warpFactor;
              ctx.arc(px, py, 2 * force * warpFactor, 0, Math.PI * 2);
              ctx.shadowBlur = 8;
              ctx.shadowColor = color || "#6366f1";
              ctx.globalAlpha = force * warpFactor;
              ctx.fill();
            }
          }
        }
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    if (isVisible) {
      draw();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [isVisible, color, bgColor]); // Removed isHovered from dependencies to prevent restarts

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />;
};

// 4. Glitch Component (RGB Split, blocky digital scanlines, text alerts)
const GlitchBg = ({ isVisible, isHovered, color, colorSecondary, bgColor }: { isVisible: boolean; isHovered: boolean; color?: string; colorSecondary?: string; bgColor?: string }) => {
  const [glitchState, setGlitchState] = useState({ 
    rOffset: { x: 0, y: 0 }, 
    gOffset: { x: 0, y: 0 },
    bOffset: { x: 0, y: 0 },
    skew: 0, 
    opacity: 1, 
    scale: 1,
    noiseBlocks: [] as Array<{ x: number; y: number; w: number; h: number; color: string }>,
    glitchText: ""
  });

  useEffect(() => {
    if (!isVisible) return;

    const glitchTexts = ["SYS_OVERFLOW", "ERR_SYS_0x9F", "GLITCH_DETECTED", "HOLO_FAIL", "SYNC_LOST", "BUFFER_OVERRUN"];

    const interval = setInterval(() => {
      const isGlitching = Math.random() < (isHovered ? 0.40 : 0.08);
      
      if (isGlitching) {
        const blocks = [];
        if (isHovered) {
          const numBlocks = Math.floor(Math.random() * 4) + 1;
          for (let i = 0; i < numBlocks; i++) {
            blocks.push({
              x: Math.random() * 60 - 30,
              y: Math.random() * 180 - 90,
              w: Math.random() * 140 + 40,
              h: Math.random() * 12 + 2,
              color: Math.random() < 0.5 ? (color || "#ec4899") : (colorSecondary || "#06b6d4")
            });
          }
        }

        const maxOffset = isHovered ? 12 : 3;
        setGlitchState({
          rOffset: { x: (Math.random() - 0.5) * maxOffset, y: (Math.random() - 0.5) * maxOffset },
          gOffset: { x: (Math.random() - 0.5) * maxOffset, y: (Math.random() - 0.5) * maxOffset },
          bOffset: { x: (Math.random() - 0.5) * maxOffset, y: (Math.random() - 0.5) * maxOffset },
          skew: (Math.random() - 0.5) * (isHovered ? 25 : 4),
          opacity: Math.random() * 0.3 + 0.7,
          scale: Math.random() * 0.15 + 0.95,
          noiseBlocks: blocks,
          glitchText: Math.random() < 0.4 ? glitchTexts[Math.floor(Math.random() * glitchTexts.length)] : ""
        });
      } else {
        setGlitchState({
          rOffset: { x: 0, y: 0 },
          gOffset: { x: 0, y: 0 },
          bOffset: { x: 0, y: 0 },
          skew: 0,
          opacity: 1,
          scale: 1,
          noiseBlocks: [],
          glitchText: ""
        });
      }
    }, isHovered ? 90 : 350);

    return () => clearInterval(interval);
  }, [isVisible, isHovered, color, colorSecondary]);

  const primaryColor = color || "#ec4899";
  const secondaryColor = colorSecondary || "#06b6d4";

  return (
    <div
      className="w-full h-full absolute inset-0 flex items-center justify-center overflow-hidden select-none"
      style={{ backgroundColor: bgColor || "#08070b" }}
    >
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "16px 16px"
        }}
      />

      <motion.div
        animate={isVisible ? {
          rotate: [0, 360],
        } : {}}
        transition={{
          repeat: Infinity,
          duration: isHovered ? 6 : 18,
          ease: "linear"
        }}
        style={{
          opacity: glitchState.opacity,
          scale: glitchState.scale,
          skewX: glitchState.skew,
        }}
        className="w-32 h-32 relative"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full absolute inset-0 overflow-visible" style={{ mixBlendMode: "screen" }}>
          {/* Red Polygon Channel */}
          <g style={{ transform: `translate(${glitchState.rOffset.x}px, ${glitchState.rOffset.y}px)`, filter: "drop-shadow(0px 0px 3px #ff0000)" }}>
            <polygon points="100,50 145,72 100,94 55,72" fill="none" stroke="#ff0000" strokeWidth="2" />
            <polygon points="55,72 100,94 100,150 55,128" fill="none" stroke="#ff0000" strokeWidth="2" />
            <polygon points="100,94 145,72 145,128 100,150" fill="none" stroke="#ff0000" strokeWidth="2" />
          </g>

          {/* Green Polygon Channel */}
          <g style={{ transform: `translate(${glitchState.gOffset.x}px, ${glitchState.gOffset.y}px)`, filter: "drop-shadow(0px 0px 3px #00ff00)" }}>
            <polygon points="100,50 145,72 100,94 55,72" fill="none" stroke="#00ff00" strokeWidth="2" />
            <polygon points="55,72 100,94 100,150 55,128" fill="none" stroke="#00ff00" strokeWidth="2" />
            <polygon points="100,94 145,72 145,128 100,150" fill="none" stroke="#00ff00" strokeWidth="2" />
          </g>

          {/* Blue/Cyan Polygon Channel */}
          <g style={{ transform: `translate(${glitchState.bOffset.x}px, ${glitchState.bOffset.y}px)`, filter: "drop-shadow(0px 0px 3px #00ffff)" }}>
            <polygon points="100,50 145,72 100,94 55,72" fill="none" stroke="#00ffff" strokeWidth="2" />
            <polygon points="55,72 100,94 100,150 55,128" fill="none" stroke="#00ffff" strokeWidth="2" />
            <polygon points="100,94 145,72 145,128 100,150" fill="none" stroke="#00ffff" strokeWidth="2" />
            <circle cx="100" cy="94" r="4" fill="#00ffff" />
          </g>
        </svg>
      </motion.div>

      {/* Cyber scanline overlay blocks */}
      {glitchState.noiseBlocks.map((b, idx) => (
        <div
          key={idx}
          className="absolute opacity-80"
          style={{
            left: `calc(50% + ${b.x}px)`,
            top: `calc(50% + ${b.y}px)`,
            width: `${b.w}px`,
            height: `${b.h}px`,
            backgroundColor: b.color,
            boxShadow: `0 0 8px ${b.color}`
          }}
        />
      ))}

      {/* Flashing cyber alerts text */}
      {glitchState.glitchText && (
        <div 
          className="absolute font-mono text-xs font-bold tracking-widest pointer-events-none select-none opacity-80"
          style={{
            color: secondaryColor,
            textShadow: `0 0 5px ${secondaryColor}`,
            top: `${Math.random() * 60 + 20}%`,
            left: `${Math.random() * 50 + 10}%`
          }}
        >
          {glitchState.glitchText}
        </div>
      )}
    </div>
  );
};

// Main CardOne Component
const CardOne = (props: CardOneProps) => {
  props = { ...props };
  props.border = props.border ?? "normal";
  props.rounded = props.rounded ?? true;
  props.type = props.type ?? "primary";
  props.className = props.className ?? "";

  const [isHovered, setIsHovered] = useState(false);
  
  // Stable refs to store hover and mouse coordinates in real-time.
  // This prevents React state updates from forcing re-renders, solving the canvas flash/reset bug.
  const isHoveredRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });
  
  const [isVisible, setIsVisible] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Motion values to animate BlobBg without triggering React component re-renders
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15 });
  const springY = useSpring(y, { damping: 15 });

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width - 0.5;
    const my = (e.clientY - rect.top) / rect.height - 0.5;
    
    mousePosRef.current = { x: mx, y: my };
    x.set(mx * 300);
    y.set(my * 250);
  };

  let standard_class = "p-6 flex flex-col";
  let container_color_class = {
    "primary": "bg-white border-lameduse-primary",
  }[props.type];

  let border = {
    "normal": "border-2",
    "no-border": "",
  }[props.border];
  let rounded = props.rounded ? "rounded-lg" : "";

  return (
    <div
      ref={cardRef}
      onClick={props.onClick}
      className={`px-4 ${container_color_class} ${props.className} ${rounded} ${standard_class} ${border} transition-all duration-300 hover:shadow-lg`}
    >
      <div 
        ref={headerRef}
        onMouseEnter={() => {
          isHoveredRef.current = true;
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          setIsHovered(false);
          x.set(0);
          y.set(0);
        }}
        onMouseMove={handleMouseMove}
        className={`rounded-lg h-64 overflow-hidden flex justify-center items-center relative min-w-0 max-w-full`}
      >
        {props.interactiveEffect ? (
          <>
            {props.interactiveEffect === "blob" && (
              <BlobBg
                isVisible={isVisible}
                isHovered={isHovered}
                springX={springX}
                springY={springY}
                color={props.interactiveColor}
                colorSecondary={props.interactiveColorSecondary}
                bgColor={props.interactiveBgColor}
              />
            )}
            {props.interactiveEffect === "particles" && (
              <ParticlesBg
                isVisible={isVisible}
                isHoveredRef={isHoveredRef}
                mousePosRef={mousePosRef}
                color={props.interactiveColor}
                bgColor={props.interactiveBgColor}
              />
            )}
            {props.interactiveEffect === "neon-grid" && (
              <NeonGridBg
                isVisible={isVisible}
                isHoveredRef={isHoveredRef}
                mousePosRef={mousePosRef}
                color={props.interactiveColor}
                bgColor={props.interactiveBgColor}
              />
            )}
            {props.interactiveEffect === "glitch" && (
              <GlitchBg
                isVisible={isVisible}
                isHovered={isHovered}
                color={props.interactiveColor}
                colorSecondary={props.interactiveColorSecondary}
                bgColor={props.interactiveBgColor}
              />
            )}
          </>
        ) : props.image ? (
          <Image
            height={props.imageHeight ?? 500}
            width={props.imageWidth ?? 500}
            alt={props.imageAlt ?? "content"}
            className={`object-cover object-center h-full w-full ${props.imageClassName ?? ""}`}
            src={props.image}
            quality={props.imageQuality ?? 75}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            No Media
          </div>
        )}
      </div>
      <h2 className="text-2xl font-medium text-gray-900 mt-6 mb-3">{props.title}</h2>
      <p className="leading-relaxed text-base mb-6">{props.description}</p>
      <div className="mt-auto w-full">
        {props.icons?.map((icon, index) => (
          <IconText key={index} {...icon} />
        ))}
        {props.link && (
          <div className="w-fit flex mx-auto mt-4">
            <Link {...props.link} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardOne;
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
  
  // New props for interactive animations
  interactiveEffect?: "blob" | "particles" | "neon-grid" | "ripple" | "glitch";
  interactiveBgColor?: string;
  interactiveColor?: string;
  interactiveColorSecondary?: string;
}

// 1. Blob Component
const blobPaths = [
  "M140,90 C155,110 160,135 140,150 C120,165 95,170 70,160 C45,150 35,125 40,100 C45,75 65,55 90,50 C115,45 125,70 140,90 Z",
  "M150,100 C150,125 130,140 110,155 C90,170 65,160 50,140 C35,120 30,95 40,75 C50,55 75,45 100,45 C125,45 150,75 150,100 Z",
  "M135,85 C145,105 155,130 140,145 C125,160 85,165 65,150 C45,135 40,110 45,85 C50,60 75,50 100,50 C125,50 125,65 135,85 Z"
];

interface BlobBgProps {
  isVisible: boolean;
  isHovered: boolean;
  springX: any;
  springY: any;
  color?: string;
  colorSecondary?: string;
  bgColor?: string;
}

const BlobBg = ({ isVisible, springX, springY, color, colorSecondary, bgColor }: BlobBgProps) => {
  return (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center overflow-hidden" style={{ backgroundColor: bgColor || "#0f172a" }}>
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)]">
          <defs>
            <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color || "#c084fc"} />
              <stop offset="100%" stopColor={colorSecondary || "#6366f1"} />
            </linearGradient>
          </defs>
          <motion.path
            d={blobPaths[0]}
            animate={isVisible ? {
              d: [blobPaths[0], blobPaths[1], blobPaths[2], blobPaths[0]]
            } : {}}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut"
            }}
            fill="url(#blobGrad)"
          />
        </svg>
      </motion.div>
    </div>
  );
};

// 2. Particles Component
interface CanvasBgProps {
  isVisible: boolean;
  isHovered: boolean;
  mousePosRef: React.RefObject<{ x: number; y: number }>;
  color?: string;
  bgColor?: string;
}

const ParticlesBg = ({ isVisible, isHovered, mousePosRef, color, bgColor }: CanvasBgProps) => {
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

    const particleCount = 25;
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
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.3
      });
    }

    const draw = () => {
      if (!isVisible) return;
      
      ctx.fillStyle = bgColor || "#09090b";
      ctx.fillRect(0, 0, width, height);

      // Read real-time mouse coordinate from stable ref to avoid component re-renders
      const currentMouse = mousePosRef.current || { x: 0, y: 0 };
      const targetX = (currentMouse.x + 0.5) * width;
      const targetY = (currentMouse.y + 0.5) * height;

      particles.forEach((p) => {
        if (isHovered) {
          const dx = targetX - p.x;
          const dy = targetY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            p.vx += (dx / dist) * 0.08;
            p.vy += (dy / dist) * 0.08;
          }
        }

        p.vx *= 0.95;
        p.vy *= 0.95;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

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
  }, [isVisible, isHovered, color, bgColor]); // mousePosRef is omitted to prevent canvas reset on cursor move

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />;
};

// 3. NeonGrid Component
const NeonGridBg = ({ isVisible, isHovered, mousePosRef, color, bgColor }: CanvasBgProps) => {
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

    const draw = () => {
      if (!isVisible) return;

      ctx.fillStyle = bgColor || "#020617";
      ctx.fillRect(0, 0, width, height);

      const currentMouse = mousePosRef.current || { x: 0, y: 0 };
      const targetX = (currentMouse.x + 0.5) * width;
      const targetY = (currentMouse.y + 0.5) * height;

      ctx.strokeStyle = color ? `${color}22` : "rgba(99, 102, 241, 0.15)";
      ctx.lineWidth = 1;

      // Horizontal lines
      for (let y = gridSize; y < height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          let drawY = y;
          if (isHovered) {
            const dx = x - targetX;
            const dy = y - targetY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              const force = (120 - dist) / 120;
              drawY += dy * force * 0.25;
            }
          }
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
          if (isHovered) {
            const dx = x - targetX;
            const dy = y - targetY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              const force = (120 - dist) / 120;
              drawX += dx * force * 0.25;
            }
          }
          if (y === 0) ctx.moveTo(drawX, y);
          else ctx.lineTo(drawX, y);
        }
        ctx.stroke();
      }

      // Glowing dots
      if (isHovered) {
        ctx.fillStyle = color || "#6366f1";
        for (let x = gridSize; x < width; x += gridSize) {
          for (let y = gridSize; y < height; y += gridSize) {
            const dx = x - targetX;
            const dy = y - targetY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
              const force = (80 - dist) / 80;
              ctx.beginPath();
              let px = x + dx * force * 0.25;
              let py = y + dy * force * 0.25;
              ctx.arc(px, py, 2 * force, 0, Math.PI * 2);
              ctx.shadowBlur = 8;
              ctx.shadowColor = color || "#6366f1";
              ctx.globalAlpha = force;
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
  }, [isVisible, isHovered, color, bgColor]);

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />;
};

// 4. Ripple Component
const RippleBg = ({ isVisible, isHovered, mousePosRef, color, bgColor }: CanvasBgProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const ripplesRef = useRef<Array<{ x: number; y: number; r: number; alpha: number }>>([]);

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

    const draw = () => {
      if (!isVisible) return;

      ctx.fillStyle = bgColor || "#0f172a";
      ctx.fillRect(0, 0, width, height);

      const currentMouse = mousePosRef.current || { x: 0, y: 0 };
      const targetX = (currentMouse.x + 0.5) * width;
      const targetY = (currentMouse.y + 0.5) * height;

      if (isHovered) {
        const dx = targetX - lastMousePos.current.x;
        const dy = targetY - lastMousePos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 5 && ripplesRef.current.length < 15) {
          ripplesRef.current.push({
            x: targetX,
            y: targetY,
            r: 2,
            alpha: 0.8
          });
          lastMousePos.current = { x: targetX, y: targetY };
        }
      }

      ripplesRef.current.forEach((r) => {
        r.r += 2.0;
        r.alpha -= 0.025;

        ctx.strokeStyle = color || "#06b6d4";
        ctx.lineWidth = 2;
        ctx.globalAlpha = r.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = color || "#06b6d4";

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      });

      ripplesRef.current = ripplesRef.current.filter((r) => r.alpha > 0);

      animationFrameId = requestAnimationFrame(draw);
    };

    if (isVisible) {
      draw();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [isVisible, isHovered, color, bgColor]);

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />;
};

// 5. Glitch Component
const GlitchBg = ({ isVisible, isHovered, color, colorSecondary, bgColor }: { isVisible: boolean; isHovered: boolean; color?: string; colorSecondary?: string; bgColor?: string }) => {
  const [glitchState, setGlitchState] = useState({ x: 0, y: 0, skew: 0, opacity: 1, scale: 1 });

  useEffect(() => {
    if (!isVisible || !isHovered) {
      setGlitchState({ x: 0, y: 0, skew: 0, opacity: 1, scale: 1 });
      return;
    }

    const interval = setInterval(() => {
      if (Math.random() < 0.20) {
        setGlitchState({
          x: (Math.random() - 0.5) * 12,
          y: (Math.random() - 0.5) * 6,
          skew: (Math.random() - 0.5) * 20,
          opacity: Math.random() * 0.4 + 0.6,
          scale: Math.random() * 0.15 + 0.95
        });
      } else {
        setGlitchState({ x: 0, y: 0, skew: 0, opacity: 1, scale: 1 });
      }
    }, 120);

    return () => clearInterval(interval);
  }, [isVisible, isHovered]);

  const primaryColor = color || "#ec4899";
  const secondaryColor = colorSecondary || "#3b82f6";

  return (
    <div
      className="w-full h-full absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: bgColor || "#030712" }}
    >
      <motion.div
        animate={isVisible ? {
          rotate: [0, 360],
        } : {}}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "linear"
        }}
        style={{
          x: glitchState.x,
          y: glitchState.y,
          skewX: glitchState.skew,
          opacity: glitchState.opacity,
          scale: glitchState.scale,
        }}
        className="w-32 h-32 relative"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon
            points="100,50 145,72 100,94 55,72"
            fill="none"
            stroke={isHovered ? secondaryColor : primaryColor}
            strokeWidth="2"
            className="transition-colors duration-300"
          />
          <polygon
            points="55,72 100,94 100,150 55,128"
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
          />
          <polygon
            points="100,94 145,72 145,128 100,150"
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
          />
          <circle cx="100" cy="94" r="4" fill={secondaryColor} />
          <line x1="100" y1="50" x2="100" y2="94" stroke={secondaryColor} strokeWidth="1" strokeDasharray="2" />
          <line x1="55" y1="72" x2="100" y2="94" stroke={secondaryColor} strokeWidth="1" strokeDasharray="2" />
          <line x1="145" y1="72" x2="100" y2="94" stroke={secondaryColor} strokeWidth="1" strokeDasharray="2" />
        </svg>
      </motion.div>
      
      {isHovered && Math.abs(glitchState.x) > 2 && (
        <div className="absolute left-0 right-0 h-[2px] bg-cyan-400 opacity-60" style={{ top: `${Math.random() * 80 + 10}%` }} />
      )}
      {isHovered && Math.abs(glitchState.skew) > 5 && (
        <div className="absolute left-0 right-0 h-[1px] bg-pink-500 opacity-60" style={{ top: `${Math.random() * 80 + 10}%` }} />
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
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width - 0.5;
    const my = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Update ref for canvas animations
    mousePosRef.current = { x: mx, y: my };
    
    // Update motion values for Blob animation
    x.set(mx * 25);
    y.set(my * 25);
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mousePosRef.current = { x: 0, y: 0 };
        x.set(0);
        y.set(0);
      }}
      onMouseMove={handleMouseMove}
      onClick={props.onClick}
      className={`px-4 ${container_color_class} ${props.className} ${rounded} ${standard_class} ${border} transition-all duration-300 hover:shadow-lg`}
    >
      <div className={`rounded-lg h-64 overflow-hidden flex justify-center items-center relative min-w-0 max-w-full`}>
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
                isHovered={isHovered}
                mousePosRef={mousePosRef}
                color={props.interactiveColor}
                bgColor={props.interactiveBgColor}
              />
            )}
            {props.interactiveEffect === "neon-grid" && (
              <NeonGridBg
                isVisible={isVisible}
                isHovered={isHovered}
                mousePosRef={mousePosRef}
                color={props.interactiveColor}
                bgColor={props.interactiveBgColor}
              />
            )}
            {props.interactiveEffect === "ripple" && (
              <RippleBg
                isVisible={isVisible}
                isHovered={isHovered}
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
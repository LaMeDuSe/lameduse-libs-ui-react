import React, { useEffect, useRef } from "react";
import Link, { LinkProps } from "../Link/Link";
import { useMagnetic } from "../../hooks/useMagnetic";

export interface CTAProps {
  /** First button link parameters */
  first: LinkProps;
  /** Second button link parameters */
  second: LinkProps;
  /** Style variant of the CTA banner. Set to "technology" for animated background gradient, canvas plexus, and magnetic buttons. */
  variant?: "default" | "technology";
  /** Main title text of the banner */
  title?: string;
  /** Description text displayed under the title */
  description?: string;
  /** Animated background gradient classes (Tailwind CSS). E.g. "from-lameduse-primary via-lameduse-secondary to-lameduse-tertiary" */
  bgGradient?: string;
  /** Primary CSS color for plexus particles and ambient background glows (e.g. "rgba(1, 180, 182, 0.85)") */
  glowColor?: string;
}

const TechnologyCTA = (props: CTAProps) => {
  const {
    first,
    second,
    title,
    description,
    bgGradient = "from-lameduse-primary via-lameduse-secondary to-lameduse-tertiary",
    glowColor = "rgba(1, 180, 182, 0.85)"
  } = props;

  const bannerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgGlow1Ref = useRef<HTMLDivElement>(null);
  const bgGlow2Ref = useRef<HTMLDivElement>(null);

  const magneticContainerRef = useMagnetic(0.3, 120);

  useEffect(() => {
      const banner = bannerRef.current;
      const canvas = canvasRef.current;
      if (!banner || !canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const resizeCanvas = () => {
          canvas.width = canvas.clientWidth;
          canvas.height = canvas.clientHeight;
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

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

      // Initialize floating plexus particles
      const particles: Array<{
          x: number;
          y: number;
          vx: number;
          vy: number;
          baseVx: number;
          baseVy: number;
          radius: number;
      }> = [];

      const particleCount = 45;
      for (let i = 0; i < particleCount; i++) {
          const vx = (Math.random() - 0.5) * 0.55;
          const vy = (Math.random() - 0.5) * 0.55;
          particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              vx: vx,
              vy: vy,
              baseVx: vx,
              baseVy: vy,
              radius: Math.random() * 2 + 1.2,
          });
      }

      const mouse = {
          x: 0,
          y: 0,
          active: false,
      };

      const handleMouseMove = (e: MouseEvent) => {
          const rect = banner.getBoundingClientRect();
          mouse.x = e.clientX - rect.left;
          mouse.y = e.clientY - rect.top;
          mouse.active = true;

          // Parallax effect on soft glows
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;
          if (bgGlow1Ref.current) {
              bgGlow1Ref.current.style.transform = `translate3d(${relX * 25}px, ${relY * 25}px, 0)`;
          }
          if (bgGlow2Ref.current) {
              bgGlow2Ref.current.style.transform = `translate3d(${relX * -25}px, ${relY * -25}px, 0)`;
          }
      };

      const handleMouseLeave = () => {
          mouse.active = false;

          const shapes = [bgGlow1Ref, bgGlow2Ref];
          shapes.forEach((ref) => {
              if (ref.current) {
                  ref.current.style.transform = "translate3d(0px, 0px, 0)";
                  ref.current.style.transition = "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
              }
          });
      };

      const handleMouseEnter = () => {
          const shapes = [bgGlow1Ref, bgGlow2Ref];
          shapes.forEach((ref) => {
              if (ref.current) {
                  ref.current.style.transition = "transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
              }
          });
      };

      banner.addEventListener("mousemove", handleMouseMove);
      banner.addEventListener("mouseleave", handleMouseLeave);
      banner.addEventListener("mouseenter", handleMouseEnter);

      let animationFrameId: number;

      const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // 1. Particle physics and attraction logic
          particles.forEach((p) => {
              if (mouse.active) {
                  const dx = mouse.x - p.x;
                  const dy = mouse.y - p.y;
                  const distance = Math.hypot(dx, dy);
                  const gravityRadius = 240;

                  if (distance < gravityRadius) {
                      const force = (1 - distance / gravityRadius) * 0.13;
                      const angle = Math.atan2(dy, dx);
                      
                      p.vx += Math.cos(angle) * force;
                      p.vy += Math.sin(angle) * force;
                  } else {
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

              // Screen bounds containment
              if (p.x < 0) {
                  p.x = 0;
                  p.vx *= -1;
              } else if (p.x > canvas.width) {
                  p.x = canvas.width;
                  p.vx *= -1;
              }
              if (p.y < 0) {
                  p.y = 0;
                  p.vy *= -1;
              } else if (p.y > canvas.height) {
                  p.y = canvas.height;
                  p.vy *= -1;
              }

              if (p.x > canvas.width || p.y > canvas.height) {
                  p.x = Math.random() * canvas.width;
                  p.y = Math.random() * canvas.height;
              }

              // Draw outer glowing node
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
              ctx.fillStyle = glowColor;
              ctx.shadowBlur = 6;
              ctx.shadowColor = glowColor;
              ctx.fill();

              // Draw inner white core dot
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.radius * 0.45, 0, Math.PI * 2);
              ctx.fillStyle = "#ffffff";
              ctx.shadowBlur = 0;
              ctx.fill();
          });

          // 2. Connect neighbors
          for (let i = 0; i < particles.length; i++) {
              for (let j = i + 1; j < particles.length; j++) {
                  const p1 = particles[i];
                  const p2 = particles[j];
                  const dx = p1.x - p2.x;
                  const dy = p1.y - p2.y;
                  const dist = Math.hypot(dx, dy);
                  const connectionLimit = 95;

                  if (dist < connectionLimit) {
                      const opacity = (1 - dist / connectionLimit) * 0.25;
                      ctx.beginPath();
                      ctx.moveTo(p1.x, p1.y);
                      ctx.lineTo(p2.x, p2.y);
                      ctx.strokeStyle = getRgba(glowColor, opacity);
                      ctx.lineWidth = 0.85;
                      ctx.stroke();
                  }
              }
          }

          animationFrameId = requestAnimationFrame(animate);
      };
      animationFrameId = requestAnimationFrame(animate);

      return () => {
          window.removeEventListener("resize", resizeCanvas);
          banner.removeEventListener("mousemove", handleMouseMove);
          banner.removeEventListener("mouseleave", handleMouseLeave);
          banner.removeEventListener("mouseenter", handleMouseEnter);
          cancelAnimationFrame(animationFrameId);
      };
  }, [glowColor]);

  return (
    <div 
      ref={bannerRef}
      className={`bg-gradient-to-tr ${bgGradient} py-16 px-8 rounded-3xl text-center shadow-xl relative overflow-hidden w-full`}
    >
      {/* Parallax glows */}
      <div className="absolute -top-24 -left-24 w-72 h-72 pointer-events-none z-0">
        <div ref={bgGlow1Ref} className="w-full h-full bg-white/10 rounded-full filter blur-2xl transition-transform duration-200 ease-out" />
      </div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 pointer-events-none z-0">
        <div ref={bgGlow2Ref} className="w-full h-full bg-white/10 rounded-full filter blur-2xl transition-transform duration-200 ease-out" />
      </div>

      {/* Plexus Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80" 
      />

      {title && (
        <h3 className="text-white text-3xl sm:text-4xl font-bold mb-4 relative z-10 text-heading">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-white/80 max-w-2xl mx-auto mb-8 text-base sm:text-lg relative z-10 leading-relaxed text-body">
          {description}
        </p>
      )}

      <div ref={magneticContainerRef} className="relative z-10 text-center w-fit mx-auto sm:w-full flex flex-col sm:flex-row justify-center sm:space-x-4 px-4 sm:px-0 space-y-4 sm:space-y-0">
        <Link {...first} />
        <Link {...second} />
      </div>
    </div>
  );
};

const CTA = (props: CTAProps) => {
  const { variant = "default" } = props;

  if (variant === "technology") {
    return <TechnologyCTA {...props} />;
  }

  // Fallback to simple default CTA layout
  return (
    <div className="text-center w-fit mx-auto sm:w-full flex flex-col sm:flex-row justify-center sm:space-x-4 px-4 sm:px-0 space-y-4 sm:space-y-0 m-3">
      <Link {...props.first} />
      <Link {...props.second} />
    </div>
  );
};


export default CTA;
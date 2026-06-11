import { useEffect, useRef } from "react";

/**
 * useMagnetic Hook
 * 
 * Attaches magnetic cursor-attraction physics to all interactive children (links, buttons, or elements with '.magnetic-target')
 * within the container referenced by the returned ref.
 * 
 * @param {number} [strength=0.35] - The pull strength of the magnet (0 to 1).
 * @param {number} [radius=100] - The attraction radius in pixels.
 * @returns {React.RefObject<HTMLDivElement>} The ref to attach to the parent container.
 */
export function useMagnetic(strength = 0.35, radius = 100) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const elements = container.querySelectorAll("a, button, .magnetic-target");
        const items = Array.from(elements).map((el) => ({
            el: el as HTMLElement,
            cachedRect: null as DOMRect | null,
        }));

        const handleMouseMove = (e: MouseEvent) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            items.forEach((item) => {
                const { el } = item;
                
                let rect = item.cachedRect;
                if (!rect) {
                    rect = el.getBoundingClientRect();
                }

                // If rect has no dimensions (element not visible), skip
                if (rect.width === 0 || rect.height === 0) return;

                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const dx = mouseX - centerX;
                const dy = mouseY - centerY;
                const distance = Math.hypot(dx, dy);

                if (distance < radius) {
                    if (!item.cachedRect) {
                        item.cachedRect = rect;
                    }

                    const factor = 1 - distance / radius;
                    const x = dx * factor * strength;
                    const y = dy * factor * strength;

                    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                    el.style.transition = "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)";
                } else {
                    if (item.cachedRect) {
                        el.style.transform = "translate3d(0px, 0px, 0)";
                        el.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
                        item.cachedRect = null;
                    }
                }
            });
        };

        const handleMouseLeave = () => {
            items.forEach((item) => {
                item.el.style.transform = "translate3d(0px, 0px, 0)";
                item.el.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
                item.cachedRect = null;
            });
        };

        const handleScrollOrResize = () => {
            items.forEach((item) => {
                item.cachedRect = null;
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("scroll", handleScrollOrResize, { passive: true });
        window.addEventListener("resize", handleScrollOrResize);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("scroll", handleScrollOrResize);
            window.removeEventListener("resize", handleScrollOrResize);

            items.forEach((item) => {
                item.el.style.transform = "";
                item.el.style.transition = "";
            });
        };
    }, [strength, radius]);

    return containerRef;
}

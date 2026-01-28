import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout, SlideStyle, SlideStyles } from './HeroSliderStyles';
import Link from '../../components/Link';
import { LinkProps } from '../../components/Link/Link';
import { propagateServerField } from 'next/dist/server/lib/render-server';



export interface Slide {
  title?: string;
  subtitle?: string;
  image: string;
  textClassName?: string;
  buttons?: LinkProps[];
  style?: SlideLayout | SlideStyle;
  imgClassName ?: string;
  
}

/**
 * HeroSlider Component
 * 
 * A customizable hero slider/carousel component that displays slides with images, titles, subtitles, and buttons.
 * Supports auto-play functionality and various slide layouts.
 * 
 * Props:
 * @property {Slide[]} slides - An array of slide objects to be displayed in the slider.
 * @property {boolean} [autoPlay=true] - Whether the slider should auto-play.
 * @property {number} [interval=5000] - The interval (in milliseconds) between slide transitions when auto-playing.
 */
export interface HeroSliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
  enableShapeDivider?: boolean;
  enableAnimation?: boolean;
}

const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  autoPlay = true,
  interval = 5000,
  enableShapeDivider = false, 
  enableAnimation = false,
}) => {
  const baseHeightClass = "h-[500px]";

  const dripExtraHeightClass = enableShapeDivider ? "h-[620px]" : baseHeightClass;

  const [currentIndex, setCurrentIndex] = useState(0);

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
    y: [0, 10, 0], // Le masque descend de 15px (révélant plus d'image) puis remonte
    scaleY: [1, 1.05, 1], // Légère distorsion verticale pour l'élasticité
    transition: {
        duration: 4, // Durée d'un cycle (lent et visqueux)
        repeat: Infinity,
        ease: "easeInOut" as const
    }
  };

  return (
    <div className={`relative w-full ${dripExtraHeightClass} overflow-hidden bg-black z-0 transition-all duration-300`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-10"
        >
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            className={`w-full h-full object-cover ${currentSlide.imgClassName || ''} `}
          />
          
          <div className={`absolute top-0 left-0 w-full ${baseHeightClass} flex flex-col sm:justify-center text-white px-4 sm:px-20 ${alignmentMap[layout.align]} z-30`}>
            {layout.showTitle && (
                <h2 className={`mt-10 sm:mt-0 text-5xl ${currentSlide.textClassName}`}>
                    {currentSlide.title}
                </h2>
            )}
            {layout.showSubtitle && (
                <p className={`text-xl ${currentSlide.textClassName}`}>
                    {currentSlide.subtitle}
                </p>
            )}

            {/* Les boutons sont positionnés par rapport au bas de la zone de sécurité de 500px */}
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
            
            {/* Navigation et Pagination dans la zone de sécurité z-30 */}
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
        </motion.div>
      </AnimatePresence>
      {enableShapeDivider && (
        <motion.div className="absolute bottom-0 left-0 w-full leading-[0] z-20 pointer-events-none" animate={enableAnimation ? liquidAnimation : {}}>
            <svg
                // La hauteur ici (120px/150px) définit la taille de la zone "coulante".
                className="relative block w-[calc(100%+1.3px)] h-[120px] md:h-[150px]"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
            >
                {/* Ce chemin remplit le bas en laissant des "trous" en forme de gouttes vers le haut */}
                <path
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    className="fill-white" // C'est ici que la magie opère : le SVG est blanc.
                    transform="scale(1, -1) translate(0, -120)" // On retourne le SVG pour qu'il remplisse le bas.
                ></path>
                {/* Optionnel : une deuxième couche pour un effet de bordure plus douce */}
                <path
                    d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.67-49.23V0Z"
                    className="fill-white"
                    opacity="0.3"
                    transform="scale(1, -1) translate(0, -120)"
                ></path>
            </svg>
        </motion.div>
      )}
    </div>
  )
}

export default HeroSlider;
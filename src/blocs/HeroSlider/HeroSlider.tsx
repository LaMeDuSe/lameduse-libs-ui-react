import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout, SlideStyle, SlideStyles } from './HeroSliderStyles';
import Link from '../../components/Link';
import { LinkProps } from '../../components/Link/Link';



export interface Slide {
  title?: string;
  subtitle?: string;
  image: string;
  buttons?: LinkProps[];
  style?: SlideLayout | SlideStyle;
  imgClassName?: string;
}

export interface HeroSliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
}

const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  autoPlay = true,
  interval = 5000,
}) => {
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


  return (
    <div className="relative w-full min-h-[500px] overflow-hidden bg-black">
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
            className="w-full h-full object-cover ${slides.imgClassName}"
          />
          <div className={`absolute inset-0 bg-black/40 flex flex-col justify-center text-white px-4 sm:px-20 ${alignmentMap[layout.align]}`}>
            {layout.showTitle && (
              <h2 className={`text-5xl`}>
                {currentSlide.title}
              </h2>
            )}
            {layout.showSubtitle && (
              <p className={`text-xl`}>
                {currentSlide.subtitle}
              </p>
            )}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 gap-3 flex">
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

          </div>
          {/* Previous / Next Button*/}
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

          {/* Pages buttons */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full border border-white ${index === currentIndex ? 'bg-white' : 'bg-transparent'
                  }`}
              />
            ))}

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default HeroSlider;
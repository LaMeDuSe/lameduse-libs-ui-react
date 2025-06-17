import React, { useEffect, useState } from 'react';
import { Slide } from './hero_slider_type';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import getSlideLayout from "./get_slide_style";




interface HeroSliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
}

const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  autoPlay =true,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = ()=> {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev =() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide =(index: number) => {
    setCurrentIndex(index);
  };

  useEffect(()=> {
    if (!autoPlay) return;
    const timer =setInterval(goToNext, interval);
    return () =>clearInterval(timer);
  }, [currentIndex, autoPlay, interval]);

  const currentSlide = slides[currentIndex];
  const layout= getSlideLayout(currentSlide.style || 'default');

  const alignmentMap = {
    left:'items-start text-left',
    center:'items-center text-center',
    right:'items-end text-left',
  };


  return (
    <div className="relative w-full min-h-[500px] overflow-hidden bg-black">
    <AnimatePresence mode= "wait">
      <motion.div
        key= {slides[currentIndex].id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate= {{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition= {{ duration: 0.5 }}
        className="absolute inset-0 z-10"
      >
    <img
      src={slides[currentIndex].image}
      alt={slides[currentIndex].title}
      className="w-full h-full object-cover"
    />
    <div className={`absolute inset-0 bg-black/40 flex flex-col justify-center text-white px-4 ${alignmentMap[layout.align]}`}>
      {
        layout.showTitle && (
        <h2 className={`text-4xl`}>
        {currentSlide.title}
    </h2>
    )}
      {layout.showSubtitle && (
        <p className={`text-base`}>
        {currentSlide.subtitle}
        </p>
    )}
      {layout.showButton && currentSlide.buttonLabel && currentSlide.buttonUrl && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <a
            href={currentSlide.buttonUrl}
            className="mx-auto bg-white text-black px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-200 transition"
        >
            {currentSlide.buttonLabel}
        </a>
        </div>
      )}
      </div>
      {/* Boutons Précédent / Suivant */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70"
      >
        <ChevronLeft size= {28} />
      </button>
      <button
        onClick= {goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70"
      >
        <ChevronRight size={28} />
      </button>

      {/* Pagination */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, index)=> (
          <button
            key={index}
            onClick={() =>goToSlide(index)}
            className={`w-4 h-4 rounded-full border border-white ${
              index ===currentIndex ? 'bg-white' : 'bg-transparent'
            }`}
          />
        ))};
      
    </div>
  </motion.div>
</AnimatePresence>
</div>
  )}

export default HeroSlider;
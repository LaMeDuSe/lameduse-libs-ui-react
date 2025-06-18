import React, { useEffect, useState } from 'react';
import { Slide } from './hero_slider_type';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';



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

  const goToNext =() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = ()=> {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

    const goToSlide =(index: number) => {
    setCurrentIndex(index);
  };

  useEffect(()=> {
    if (!autoPlay) return;
    const timer =setInterval(goToNext, interval);
    return ()=> clearInterval(timer);
  }, [currentIndex, autoPlay, interval]);

  const currentSlide = slides[currentIndex];

  return (
    <div className= "relative w-full min-h-[500px] overflow-hidden bg-black">
    <AnimatePresence mode="wait">
      <motion.div
        key= {slides[currentIndex].id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit= {{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className= "absolute inset-0 z-10"
      >
    <img
      src={slides[currentIndex].image}
      alt={slides[currentIndex].title}
      className= "w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
      <h2 className= "text-4xl md:text-6xl font-bold mb-4">
        {slides[currentIndex].title}
      </h2>
      <p className="text-lg md:text-2xl mb-6">
        {slides[currentIndex].subtitle}
      </p>
      {slides[currentIndex].buttonLabel && slides[currentIndex].buttonUrl && (
        <a
          href= {slides[currentIndex].buttonUrl}
          className= "bg-white text-black px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-200 transition"
        >
          {slides[currentIndex].buttonLabel}
        </a>
      )}
      </div>
      {/* Boutons Précédent / Suivant */}
      <button
        onClick={goToPrev}
        className= "absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70"
      >
        <ChevronLeft size= {28} />
      </button>
      <button
        onClick={goToNext}
        className= "absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70"
      >
        <ChevronRight size= {28} />
      </button>

      {/* Pagination */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key= {index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full border border-white ${
              index ===currentIndex ? 'bg-white' : 'bg-transparent'
            }`}
          />
        ))}
      
    </div>
  </motion.div>
</AnimatePresence>
</div>
  )}

export default HeroSlider;
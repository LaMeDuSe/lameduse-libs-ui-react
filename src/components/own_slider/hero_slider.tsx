import React, { useEffect, useState } from 'react';
import { Slide } from './hero_slider_type';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSliderProps {
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

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval]);

  return (
    <div className="relative w-full min-h-[500px] bg-black overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
            <p className="text-lg md:text-2xl mb-6">{slide.subtitle}</p>
            {slide.buttonLabel && slide.buttonUrl && (
              <a
                href={slide.buttonUrl}
                className="bg-white text-black px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-200 transition"
              >
                {slide.buttonLabel}
              </a>
            )}
          </div>
        </div>
      ))}

      {/* Boutons Précédent / Suivant */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2 bg-white/20 text-white p-2 rounded-full hover:bg-white/40 transition"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2 bg-white/20 text-white p-2 rounded-full hover:bg-white/40 transition"
      >
        <ChevronRight size={28} />
      </button>

      {/* Pagination */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full border border-white transition ${
              index === currentIndex ? 'bg-white' : 'bg-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;

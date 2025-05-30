import React, { useState } from 'react';
import { SlideItem, HeroSliderProps } from './slider';
import { Pagination } from './PaginationProps.tsx';
import { NavigationButtons } from './NavigationButton.tsx';
import { useContext } from 'react';
import { SliderProvider, SliderContext, SliderState } from './slideProvider.tsx'; 


export default function HeroSlider({
  slides,
  className,
  width = '100%',
  height = '100vh'
}: HeroSliderProps) {

    const context=useContext(SliderContext);
    if (!context) {
        throw new Error("HeroSlider must be used within a SliderProvider");
    }
    const {activeSlide, setActiveSlide} = context;

    const goToNext = () => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className={className} style={{ width, height, position: 'relative', overflow: 'hidden' }}>
      <img
        src={slides[activeSlide].image}
        alt={slides[activeSlide].title || `Slide ${activeSlide + 1}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      <NavigationButtons onPrev={goToPrev} onNext={goToNext} />

      <Pagination
        total={slides.length}
        activeIndex={activeSlide}
        onSelect={setActiveSlide}
      />
    </div>
  );
}









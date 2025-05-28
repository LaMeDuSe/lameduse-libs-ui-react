import React, {useState} from 'react'



const SliderContext = React.createContext<SliderState | null>(null); //création du contexte pour partager des données

interface SliderState {
  activeSlide: number;
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>; //fonction pour changer l'index de la slide active
}

//déclaration du provider
function SliderProvider({ children }: { children: React.ReactNode }) {
  const [activeSlide, setActiveSlide] = useState(0); //état local, useState l'initialise à 0
  return (
    <SliderContext.Provider value={{ activeSlide, setActiveSlide }}>
      {children}
    </SliderContext.Provider>
  );
}

export { SliderContext, SliderProvider, SliderState };



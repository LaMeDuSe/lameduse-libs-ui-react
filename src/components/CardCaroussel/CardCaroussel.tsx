import React, { useState, useEffect } from "react";
// useState hook qui permet de créer un état local

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

type responsiveType = { 
  [key: number]: {
    items: number
  } 
}
const responsive: responsiveType = {
    0: {
        items: 1
    },
    500: {
        items: 2
    },
    900: {
        items: 3,
    },
    1400: {
        items: 4
    },
    1900 : {
        items: 5
    },
    3000: {
        items: 5
    }
};



export interface CardCarousselProps {
  Cards: React.ReactNode[];
  onClick?: () => void;
}
//definition d'un type pour les props

const CardCaroussel=({ Cards}: CardCarousselProps) => {
  const { width } = useWindowDimensions();
  //création du composznt CardCaroussel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
// currentIndex :Page de cartes affichée
// setCurrentIndex : fonction pour mettre à jour l'index
  const maxIndex = Cards.length - cardsPerPage;
  useEffect(() => {
    const keys = Object.keys(responsive)
      .filter((value) => parseInt(value) <= width)
      .sort((a, b) => parseInt(b) - parseInt(a));

    const matchedKey = parseInt(keys[0]);
    if (matchedKey) {
      setCardsPerPage(responsive[matchedKey].items);
    }
  }, [width]);
  const next = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const start = currentIndex * cardsPerPage; // cacul de l'index de départ
  const visibleCards = Cards.slice(currentIndex, currentIndex + cardsPerPage);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <button onClick={prev} className="text-xl px-3">&#60;</button>
        <button onClick={next} className="text-xl px-3">&#62;</button>
      </div>
      <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${cardsPerPage}, 1fr)` }}>
        {visibleCards.map((card, index) => (
          <div key={index} className="shadow rounded-lg overflow-hidden bg-white">
            {card}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-2">
      {(() => {
        const totalCards = Cards.length;
        const CompletePage = Math.ceil(totalCards / cardsPerPage);

        return Array.from({length: CompletePage }).map((_, i) => {
          let targetIndex=i*cardsPerPage;

          // Si c’est le dernier dot et la page est incomplète,
          // on ajuste pour ne pas avoir une page vide
          const last=totalCards-cardsPerPage;
          if (i===CompletePage-1 && targetIndex>last) {
            targetIndex=last;
          }

            return (
              <div
                key={i}
                onClick={() => setCurrentIndex(targetIndex)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  currentIndex === targetIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            );
          });
        })()}
      </div>
    </div>
  );
};

export default CardCaroussel;




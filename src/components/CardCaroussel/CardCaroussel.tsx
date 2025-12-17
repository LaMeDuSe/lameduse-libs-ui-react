import React, { useState, useEffect, useRef } from "react";
import { useResizeObserver } from "../../hooks/useResizeObserver";
import { useResponsiveCardsPerPage } from "../../hooks/useResponsiveCardsPerPage";

const GAP = 24;

type responsiveType = { 
  [key: number]: {
    items: number
  } 
}

const responsive: responsiveType = {
  0: { items: 1 },
  500: { items: 2 },
  900: { items: 3 },
  1400: { items: 4 },
  1900: { items: 5 },
};

export interface CardCarousselProps {
  Cards: React.ReactNode[];
  onClick?: () => void;
}

const CardCaroussel = ({ Cards = [], onClick  }: CardCarousselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0); // position par carte
  const [containerWidth, setContainerWidth] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // pour les dots

  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentOffset = useRef(0);

 
  useResizeObserver(containerRef, setContainerWidth);

  useResponsiveCardsPerPage(containerWidth, responsive, setCardsPerPage);

  const totalPages = Math.ceil(Cards.length / cardsPerPage);

  const cardWidth =
    cardsPerPage > 0
      ? (containerWidth - (GAP*cardsPerPage) * (cardsPerPage - 1)) / cardsPerPage
      : 300;

  const maxTranslateX = 0;
  const minTranslateX = -(
    (Cards.length - cardsPerPage) * (cardWidth + GAP)
  );

  useEffect(() => {
    const clampedIndex = Math.min(currentIndex, Cards.length - cardsPerPage);
    setTranslateX(-(clampedIndex * (cardWidth + GAP)));
  }, [currentIndex, cardWidth]);

  // Drag logic
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    currentOffset.current = translateX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    let nextX = currentOffset.current + delta;
    nextX = Math.max(minTranslateX, Math.min(maxTranslateX, nextX));
    setTranslateX(nextX);

    const page = Math.round(-nextX / ((cardWidth + GAP) * cardsPerPage));
    setCurrentPage(Math.max(0, Math.min(totalPages - 1, page)));
  };

  const handleMouseUp = () => {
    isDragging.current = false;

    const indexAfterDrag = Math.round(-translateX / (cardWidth + GAP));
    setCurrentIndex(indexAfterDrag);
  };

  const next = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev < Cards.length - cardsPerPage ? prev + 1 : prev;
      const page = Math.floor(nextIndex / cardsPerPage);
      setCurrentPage(page);
      return nextIndex;
    });
  };

  const prev = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev > 0 ? prev - 1 : prev;
      const page = Math.floor(nextIndex / cardsPerPage);
      setCurrentPage(page);
      return nextIndex;
    });
  };


  return (
    <div style={{ width: "100vw", overflowX: "hidden" }}>
      <div ref={containerRef} className="w-full mx-auto p-4">
        <div
          className="relative select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
          style={{
            overflow: "hidden",
            cursor: isDragging.current ? "grabbing" : "grab",
          }}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(${translateX}px)`,
              gap: `${GAP}px`,
              paddingLeft: `${GAP}px`,
              paddingRight: `${GAP}px`,
              width: "100%",
            }}
          >
            {Cards.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow overflow-hidden"
                style={{
                  width: `${cardWidth}px`,
                  flex: "0 0 auto",
                  marginLeft: i === 0 ? `${GAP}px` : undefined,
                  marginRight: i === Cards.length - 1 ? `${GAP}px` : undefined,
                }}
              >
                {card}
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              onClick={() => {
                setCurrentIndex(i * cardsPerPage);
                setCurrentPage(i);              
              }}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                currentPage === i ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex justify-center mt-2 gap-6">
          <button
            onClick={prev}
            className="text-xl px-3"
            aria-label="Previous"
          >
            &#60;
          </button>
          <button
            onClick={next}
            className="text-xl px-3"
            aria-label="Next"
          >
            &#62;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCaroussel;

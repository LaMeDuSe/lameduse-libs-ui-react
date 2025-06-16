import { useEffect } from "react";

type ResponsiveType = {
  [key: number]: {
    items: number;
  };
};

export const useResponsiveCardsPerPage = (
  containerWidth: number,
  responsive: ResponsiveType,
  setCardsPerPage: (val: number) => void
) => {
  useEffect(() => {
    const keys = Object.keys(responsive)
      .filter((value) => parseInt(value) <= containerWidth)
      .sort((a, b) => parseInt(b) - parseInt(a));

    const matchedKey = parseInt(keys[0]);
    if (matchedKey) {
      setCardsPerPage(responsive[matchedKey].items);
    }
  }, [containerWidth, responsive, setCardsPerPage]);
};

import React from "react";

export interface SlideItem {
  image: string;
  title: string;
  description: string;
}

export interface HeroSliderProps {
  className?: React.HTMLProps<HTMLDivElement>['className'];
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  slides: SlideItem[];
}






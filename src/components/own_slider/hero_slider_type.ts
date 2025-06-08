import { SlideStyle } from "./slide_style";


export interface Slide {
  id: number;
  title?: string;
  subtitle?: string;
  image: string;
  buttonLabel?: string;
  buttonUrl?: string;
  style?: SlideStyle;
}

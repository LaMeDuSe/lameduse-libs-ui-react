import React from "react";
import NextImageImport from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { motion} from 'framer-motion';

// Handle ESM/CJS interop for Next.js components
const NextImage = (NextImageImport as any).default || NextImageImport;

export interface HeadingProps {
  title: string | React.ReactElement;
  description: string | React.ReactElement;
  image?: string | StaticImport;
  imagealt?: string;
  theme?: "gradient" | "primary" | "secondary" | "tertiary" | "none";
  texteClassName?: string;
  enableShapeDivider?: boolean;
  enableAnimation?: boolean;
}


const Heading = (props: HeadingProps) => {
  // default values
  props = { ...props }; // copy to avoid modifying the original object
  props.texteClassName = props.texteClassName || "text-white";
  props.enableShapeDivider = props.enableShapeDivider ||false, 
  props.enableAnimation = props.enableAnimation || false,
  props.imagealt = props.imagealt || "heading image";
  const baseHeightClass = "h-[300px]";
  const baseHeightPixel= 300;
  const dripExtraHeightClass = props.enableShapeDivider ? "h-[420px]" : baseHeightClass;
  const dripExtraHeightPixel = props.enableShapeDivider ? 420 : baseHeightPixel;

  const liquidAnimation = {
    y: [0, 10, 0],
    scaleY: [1, 1.1, 1],
    transition: {
        duration: 4, 
        repeat: Infinity,
        ease: "easeInOut" as const
    }
  };

  let color_class = {
    "gradient": "gradiant-lameduse",
    "primary": "bg-lameduse-primary",
    "secondary": "bg-lameduse-secondary",
    "tertiary": "bg-lameduse-tertiary",
    "none": ""
  }[props.theme || (props.image ? "none" : "gradient")];

  return (
    <div className={`w-full relative ${color_class} ${dripExtraHeightClass} flex flex-col items-center justify-center `}>
      {props.image && <NextImage src={props.image} alt={props.imagealt} height={dripExtraHeightPixel} width={2000} className={`absolute w-full object-cover filter blur-sm brightness ${dripExtraHeightClass}`} />}
      <h1 className={`${props.texteClassName} z-10 text-center text-4xl mb-3 ${props.enableShapeDivider ? "-translate-y-[60px]" : ""}`}>{props.title}</h1>
      <p className={`${props.texteClassName} z-10 lg:text-2xl w-1/2 text-center ${props.enableShapeDivider ? "-translate-y-[60px]" : ""}`}>{props.description}</p>
      {props.enableShapeDivider && (
        <motion.div className="absolute -bottom-3 left-0 w-full leading-[0] z-20 pointer-events-none" animate={props.enableAnimation ? liquidAnimation : {}}>
            <svg
                className="relative block w-[calc(100%+1.3px)] h-[120px] md:h-[150px]"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
            >
                <path
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    className="fill-white"
                    transform="scale(1, -1) translate(0, -120)"
                ></path>
                <path
                    d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.67-49.23V0Z"
                    className="fill-white"
                    opacity="0.3"
                    transform="scale(1, -1) translate(0, -120)"
                ></path>
            </svg>
        </motion.div>
      )}
    </div>
  )
};

export default Heading;
import React from "react";
import NextImageImport from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { LameduseHeadingTheme, lameduseBackgroundColorClasses } from "../../theme";

// Handle ESM/CJS interop for Next.js components
const NextImage = (NextImageImport as any).default || NextImageImport;

export interface HeadingProps {
  title: string | React.ReactElement;
  description: string | React.ReactElement;
  image?: string | StaticImport;
  imagealt?: string;
  theme?: LameduseHeadingTheme;
  texteClassName?: string;
}


const Heading = (props: HeadingProps) => {
  // default values
  props = { ...props }; // copy to avoid modifying the original object

  props.imagealt = props.imagealt || "heading image";

  let color_class = lameduseBackgroundColorClasses[props.theme || "gradient"];

  return (
    <div className={`w-full relative ${color_class} h-[300px] flex flex-col items-center justify-center`}>
      {props.image && <NextImage src={props.image} alt={props.imagealt} height={300} width={2000} className="absolute w-full h-[300px] object-cover filter blur-sm brightness" />}
      <h1 className={`${props.texteClassName} z-10 text-center text-4xl mb-3`}>{props.title}</h1>
      <p className={`${props.texteClassName} z-10 lg:text-2xl w-1/2 text-center`}>{props.description}</p>
    </div>
  )
};

export default Heading;
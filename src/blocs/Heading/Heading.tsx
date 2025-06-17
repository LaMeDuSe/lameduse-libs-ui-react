import React from "react";
import NextImage from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface HeadingProps {
  title: string;
  description: string;
  image?: string | StaticImport;
  imagealt?: string;
  theme?: "gradient" | "primary" | "secondary" | "tertiary";
}

const Heading = (props: HeadingProps) => {
  // default values
  props = { ...props }; // copy to avoid modifying the original object

  props.imagealt = props.imagealt || "heading image";

  let color_class = {
    "gradient": "gradiant-lameduse",
    "primary": "bg-lameduse-primary",
    "secondary": "bg-lameduse-secondary",
    "tertiary": "bg-lameduse-tertiary",
  }[props.theme || "gradient"];

  return (
    <div className={`w-full relative ${color_class} h-[300px] flex flex-col items-center justify-center`}>
      {props.image && <NextImage src={props.image} alt={props.imagealt} height={300} width={2000} className="absolute w-full h-[300px] object-cover filter blur-sm brightness" />}
      <h1 className="z-10 text-white text-center text-4xl mb-3">{props.title}</h1>
      <p className="z-10 text-white lg:text-2xl w-1/2 text-center">{props.description}</p>
    </div>
  )
};

export default Heading;
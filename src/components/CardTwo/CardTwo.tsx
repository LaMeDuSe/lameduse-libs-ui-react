import React from "react";
import ImageImport from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import NextLinkImport from "next/link";

// Handle ESM/CJS interop for Next.js components
const Image = (ImageImport as any).default || ImageImport;
const NextLink = (NextLinkImport as any).default || NextLinkImport;


export interface CardTwoProps {
  type?: "primary";
  className?: string;
  onClick?: () => void;
  image: string | StaticImport;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageClassName?: string;
  imageQuality?: number;
  description: string;
  title: string;
  label: string
  link_url: string;
}

const CardTwo = (props: CardTwoProps) => {
  // default values
  props = { ...props }; // copy to avoid modifying the original object
  props.type = props.type ?? "primary";

  props.className = props.className ?? "";

  let color_classname = {
    "primary": "text-lameduse-primary",
  }[props.type]
  return (
    <div className={`${props.className} h-full`}>
      <NextLink href={props.link_url} target="_blank" className="block h-full">
        <div className="bg-gray-100 p-6 rounded-lg h-full">
          <Image width={props.imageWidth ?? 238} height={props.imageHeight ?? 160} className={`h-40 rounded w-full object-contain object-center mb-6 ${props.imageClassName ?? ""}`} src={props.image} alt={props.imageAlt ?? "content"} quality={props.imageQuality ?? 100} />
          <h3 className={`tracking-widest text-xs font-medium title-font ${color_classname}`}>{props.label}</h3>
          <h2 className={`text-lg text-black font-bold title-font mb-4`}>{props.title}</h2>
          <p className="leading-relaxed text-base">{props.description}</p>
        </div>
      </NextLink>
    </div>
  )
};

export default CardTwo;
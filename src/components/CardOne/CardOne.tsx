import React from "react";
import ImageImport from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "../Link/Link";

// Handle ESM/CJS interop for Next.js components
const Image = (ImageImport as any).default || ImageImport;


export interface CardOneProps {
  type?: "primary";
  className?: string;
  onClick?: () => void;
  image: string | StaticImport;
  imageHeight?: number;
  imageWidth?: number;
  imageClassName?: string;
  imageAlt?: string;
  description: string;
  title: string;
  link_url: string;
  link_text: string;
  border?: "normal" | "no-border";
  rounded?: boolean;
}

const CardOne = (props: CardOneProps) => {
  // default values
  props = { ...props }; // copy to avoid modifying the original object
  props.border = props.border ?? "normal";
  props.rounded = props.rounded ?? true;
  props.type = props.type ?? "primary";

  props.className = props.className ?? "";
  let standard_class = "p-6";
  let container_color_class = {
    "primary": "bg-white border-lameduse-primary",
  }[props.type]

  let border = {
    "normal": "border-2",
    "no-border": "",
  }[props.border];
  let rounded = props.rounded ? "rounded-lg" : "";
  return (
      <div className={`px-4 ${container_color_class} ${props.className} ${rounded} ${standard_class} ${border}`}>
        <div className={`rounded-lg h-64 overflow-hidden`}>
          <Image height={props.imageHeight ?? 500} width={props.imageWidth ?? 500} alt={props.imageAlt ?? "content"} className={`object-cover object-center h-full w-full ${props.imageClassName ?? ""}`} src={props.image} />
        </div>
        <h2 className="text-2xl font-medium text-gray-900 mt-6 mb-3">{props.title}</h2>
        <p className="leading-relaxed text-base">{props.description}</p>
        <div className=" w-fit flex mx-auto mt-6">
          <Link href={props.link_url} type={"primary"} form="rounded" style="solid" size="medium" className="border-0 py-2 px-5 focus:outline-none">{props.link_text}</Link>
        </div>
      </div>
  )
};

export default CardOne;
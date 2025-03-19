import React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";


export interface CardsProps {
  type?: "primary";
  className?: string;
  onClick?: () => void;
  image: string | StaticImport;
  description: string;
  title: string;
  link_url: string;
  link_text: string;
  border?: "true" | "false";
  rounded?: boolean;
}

const Cards = (props: CardsProps) => {
  // default values
  props = { ...props }; // copy to avoid modifying the original object
  props.border = props.border ?? "true";
  props.rounded = props.rounded ?? true;
  props.type = props.type ?? "primary";

  props.className = props.className ?? "";
  let container_color_class = {
    "primary": {
      "true": "border-lameduse-primary border-2 bg-white",
      "false": "bg-white",
    }
  }[props.type][props.border]

  let rounded = props.rounded ? "rounded-lg" : "";
  return (
      <div className={`px-4 ${container_color_class} ${props.className} ${rounded}`}>
        <div className="rounded-lg h-64 overflow-hidden">
          <Image height={500} width={500} alt="content" className="object-cover object-center h-full w-full" src={props.image} />
        </div>
        <h2 className="text-2xl font-medium text-gray-900 mt-6 mb-3">{props.title}</h2>
        <p className="leading-relaxed text-base">{props.description}</p>
        <Link href={props.link_url} className="flex mx-auto mt-6 w-fit text-white bg-lameduse-primary border-0 py-2 px-5 focus:outline-none hover:bg-lameduse-primary/90 rounded">{props.link_text}</Link>
      </div>
  )
};

export default Cards;
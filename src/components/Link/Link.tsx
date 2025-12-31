import React, { useContext } from "react";
import NextLinkImport from "next/link";

// Handle ESM/CJS interop for Next.js components
const NextLink = (NextLinkImport as any).default || NextLinkImport;



export interface LinkProps {
  children?: React.ReactNode;
  type?: "primary" | "secondary" | "tertiary" | "danger" | "white";
  style?: "solid" | "outline" | "text";
  form?: "rounded" | "pill" | "underline" | "underline-hover" | "none";
  size?: "small" | "medium" | "large";
  href?: string;
  nowrap?: boolean
  text_style?: "normal" | "bold";
  color_class?: string;
  className?: string;
  target?: string;
  onClick?: () => void;
}

const Link = (props: LinkProps) => {
  // default values
  props = {...props}; // copy to avoid modifying the original object
  props.type = props.type || "primary";
  props.style = props.style || "text";
  props.form = props.form || "underline";
  props.form = props.form || "rounded";
  props.size = props.size || "medium";
  props.text_style = props.text_style || "normal";
  props.target = props.target || "_self";
  props.className = props.className || "";
  props.href = props.href || "#";

  // classes
  let color_class = props.color_class || {
    "primary": {
      "solid": "bg-lameduse-primary text-white",
      "outline": "text-lameduse-primary border border-lameduse-primary",
      "text": "text-lameduse-primary",
    },
    "secondary": {
      "solid": "bg-lameduse-secondary text-white",
      "outline": "text-lameduse-secondary border border-lameduse-secondary",
      "text": "text-lameduse-secondary",
    },
    "tertiary": {
      "solid": "bg-lameduse-tertiary text-white",
      "outline": "text-lameduse-tertiary border border-lameduse-tertiary",
      "text": "text-lameduse-tertiary",
    },
    "danger": {
      "solid": "bg-lameduse-red text-white",
      "outline": "text-lameduse-red border border-lameduse-red",
      "text": "text-lameduse-red",
    },
    "white": {
      "solid": "bg-white text-lameduse-primary",
      "outline": "text-white border border-white",
      "text": "text-white",
    },
  }[props.type][props.style];
  let form_class = {
    "rounded": "rounded-md",
    "pill": "rounded-full",
    "underline": "underline",
    "underline-hover": "hover:underline",
    "none": "",
  }[props.form];
  let size_class = {
    "small": "px-3 py-1 text-sm",
    "medium": "px-4 py-2 text-base",
    "large": "px-5 py-3 text-lg",
  }[props.size];
  let text_style_class = {
    "normal": "",
    "bold": "font-bold",
  }[props.text_style];
  return (
    <NextLink
      className={`
        ${color_class}
        ${form_class}
        ${size_class}
        ${text_style_class}
        ${props.nowrap ? "whitespace-nowrap" : ""}
        ${props.className}
      `}
      onClick={props.onClick}
      href={props.href}
      target={props.target}
    >
      {props.children}
    </NextLink>
  )
};

export default Link;
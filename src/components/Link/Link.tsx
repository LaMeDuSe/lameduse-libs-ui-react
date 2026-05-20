import React, { useContext } from "react";
import NextLinkImport from "next/link";
import { LameduseColor, lameduseOutlineColorClasses, lameduseSolidColorClasses, lameduseTextColorClasses } from "../../theme";

// Handle ESM/CJS interop for Next.js components
const NextLink = (NextLinkImport as any).default || NextLinkImport;



export interface LinkProps {
  children?: React.ReactNode;
  type?: LameduseColor;
  style?: "solid" | "outline" | "text";
  form?: "rounded" | "pill" | "underline" | "underline-hover" | "none";
  size?: "small" | "medium" | "large" | "none";
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
    "solid": lameduseSolidColorClasses[props.type],
    "outline": lameduseOutlineColorClasses[props.type],
    "text": lameduseTextColorClasses[props.type],
  }[props.style];
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
    "none": "",
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
        ${props.nowrap ? "inline-block min-w-0 max-w-full truncate align-bottom" : ""}
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
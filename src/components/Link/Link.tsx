import React, { useState } from "react";
import NextLinkImport from "next/link";
import { LameduseColor, lameduseLinkColorHoverClasses, lameduseOutlineColorClasses, lameduseSolidColorClasses, lameduseTextColorClasses } from "../../theme";

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
  hover?: "scaleUp" | "nothing" | "scaleDown" | "color";
  hover_class?: string;
  clicked?: "bump" | "jump" | "none";
  clicked_class?: string;
}

const Link = (props: LinkProps) => {
  const [animationPhase, setAnimationPhase] = useState(0);
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
  props.hover = props.hover || "nothing";
  props.clicked = props.clicked || "none";

  const handleClick = () => {
    if (props.clicked === "jump") {
      setAnimationPhase(1);
      setTimeout(() => {
        setAnimationPhase(2);
        setTimeout(() => setAnimationPhase(0), 150);
      }, 150);
    } else if (props.clicked !== "none") {
      setAnimationPhase(1);
      setTimeout(() => setAnimationPhase(0), 150);
    }
    if (props.onClick) props.onClick();
  };

  // classes
  let clicked_class = props.clicked_class || {
    "bump" : `transition-transform duration-75 ${animationPhase === 1 ? "scale-95" : ""}`,
    "jump" : `transition-transform duration-200 ${
      animationPhase === 1 ? "-translate-y-2 scale-x-90 scale-y-110" :
      animationPhase === 2 ? "translate-y-1 scale-y-90 scale-x-110" : ""
    }`,
    "none" : "",
  }[props.clicked]

  let hover_class = props.hover_class || {
    "scaleUp": "transition duration-200 hover:ease-in-out hover:scale-110",
    "nothing" : "",
    "scaleDown": "transition duration-200 hover:ease-in-out hover:scale-90",
    "color": lameduseLinkColorHoverClasses[props.type][props.style]
  }[props.hover]

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
    "large": "px-8 sm:px-5 py-3 text-lg",
    "none": "",
  }[props.size];
  let text_style_class = {
    "normal": "",
    "bold": "font-bold",
  }[props.text_style];
  return (
    <NextLink
      className={`
        inline-block
        ${color_class}
        ${form_class}
        ${size_class}
        ${text_style_class}
        ${props.nowrap ? "inline-block min-w-0 max-w-full truncate align-bottom" : ""}
        ${props.className}
        ${hover_class}
        ${clicked_class}
      `}
      onClick={handleClick}
      href={props.href}
      target={props.target}
    >
      {props.children}
    </NextLink>
  )
};

export default Link;
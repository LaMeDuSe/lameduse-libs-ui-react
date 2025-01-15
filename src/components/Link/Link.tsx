import React, { useContext } from "react";
import { LameduseUIContext } from "../../context";



export interface LinkProps {
  label: string;
  type?: "primary" | "secondary" | "tertiary" | "danger";
  style?: "solid" | "outline" | "text";
  form?: "rounded" | "pill" | "underline" | "none";
  size?: "small" | "medium" | "large";
  color_class?: string;
  onClick?: () => void;
}

const Link = (props: LinkProps) => {
  const LameduseUICtx = useContext(LameduseUIContext);
  // default values
  props = {...props}; // copy to avoid modifying the original object
  props.type = props.type || "primary";
  props.style = props.style || "text";
  props.form = props.form || "underline";
  props.form = props.form || "rounded";
  props.size = props.size || "medium";

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
  }[props.type][props.style];
  let form_class = {
    "rounded": "rounded-md",
    "pill": "rounded-full",
    "underline": "underline",
    "none": "",
  }[props.form];
  let size_class = {
    "small": "px-3 py-1 text-sm",
    "medium": "px-4 py-2 text-base",
    "large": "px-5 py-3 text-lg",
  }[props.size];

  return (
    <LameduseUICtx.LowLinkComponent
      className={`
        ${color_class}
        ${form_class}
        ${size_class}
      `}
      onClick={props.onClick}
    >
      {props.label}
    </LameduseUICtx.LowLinkComponent>
  )
};

export default Link;
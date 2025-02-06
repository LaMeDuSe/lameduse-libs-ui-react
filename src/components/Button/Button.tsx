import React from "react";


export interface ButtonProps {
  label: string;
  type?: "primary" | "secondary" | "tertiary" | "danger" | "white";
  style?: "solid" | "outline";
  form?: "rounded" | "pill";
  size?: "small" | "medium" | "large";
  color_class?: string;
  className?: string;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  // default values
  props = {...props}; // copy to avoid modifying the original object
  props.type = props.type || "primary";
  props.style = props.style || "solid";
  props.form = props.form || "rounded";
  props.size = props.size || "medium";
  props.className = props.className || "";

  // classes
  let color_class = props.color_class || {
    "primary": {
      "solid": "bg-lameduse-primary text-white",
      "outline": "text-lameduse-primary border border-lameduse-primary",
    },
    "secondary": {
      "solid": "bg-lameduse-secondary text-white",
      "outline": "text-lameduse-secondary border border-lameduse-secondary",
    },
    "tertiary": {
      "solid": "bg-lameduse-tertiary text-white",
      "outline": "text-lameduse-tertiary border border-lameduse-tertiary",
    },
    "danger": {
      "solid": "bg-lameduse-red text-white",
      "outline": "text-lameduse-red border border-lameduse-red",
    },
    "white": {
      "solid": "bg-white text-lameduse-primary",
      "outline": "text-white border border-white",
    },
  }[props.type][props.style];
  let form_class = {
    "rounded": "rounded-md",
    "pill": "rounded-full",
  }[props.form];
  let size_class = {
    "small": "px-3 py-1 text-sm",
    "medium": "px-4 py-2 text-base",
    "large": "px-5 py-3 text-lg",
  }[props.size];
  return (
    <button
      className={`
        ${color_class}
        ${form_class}
        ${size_class}
        ${props.className}
      `}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  )
};

export default Button;
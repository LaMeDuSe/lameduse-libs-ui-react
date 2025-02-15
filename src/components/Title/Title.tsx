import React from "react";


export interface TitleProps {
  label: string;
  type?: "primary" | "secondary" | "tertiary" | "danger" | "white";
  className?: string;
  onClick?: () => void;
}

const Title = (props: TitleProps) => {
  // default values
  props = {...props}; // copy to avoid modifying the original object
  props.type = props.type || "primary";
  props.className = props.className || "";

  // classes
  let text_color_class = {
    "primary": "text-lameduse-primary",
    "secondary": "text-lameduse-secondary",
    "tertiary": "text-lameduse-tertiary",
    "danger": "text-lameduse-red",
    "white": "text-white"
  }[props.type];
  let bg_color_class = {
    "primary": "bg-lameduse-primary",
    "secondary": "bg-lameduse-secondary",
    "tertiary": "bg-lameduse-tertiary",
    "danger": "bg-lameduse-red",
    "white": "bg-white"
  }[props.type];
  return (
    <div className={`w-full ${props.className}`}>
        <h1 className={`sm:text-3xl text-2xl font-medium title-font mb-2 ${text_color_class}`}>{props.label}</h1>
        <div className={`h-1 w-20 ${bg_color_class} rounded`}></div>
    </div>
  )
};

export default Title;
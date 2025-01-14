import React from "react";


export interface ButtonProps {
  label: string;
  type: "primary" | "secondary" | "tertiary";
  style: "solid" | "outline";
  form: "rounded" | "pill";
  color_class?: string;
  onClick?: () => void;
}

const PropsDefault : ButtonProps = {
  label: "Button",
  type: "primary",
  style: "solid",
  form: "rounded",
}

const Button = (props: ButtonProps = PropsDefault) => {
  let color_class = props.color_class || {
    "primary": "bg-lameduse-primary text-lameduse-white",
    "secondary": "bg-lameduse-secondary text-lameduse-white",
    "tertiary": "bg-lameduse-tertiary text-lameduse-white",
  }[props.type];
  let style_class = {
    "solid": "shadow-md",
    "outline": "border border-lameduse-white",
  }[props.style];
  let form_class = {
    "rounded": "rounded-md",
    "pill": "rounded-full",
  }[props.form];
  return (
    <button
      className={`
        ${color_class}
        ${style_class}
        ${form_class}
      `}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  )
};

export default Button;
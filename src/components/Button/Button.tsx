import React, { useState } from "react";
import { LameduseColor, lameduseButtonColorHoverClasses, lameduseOutlineColorClasses, lameduseSolidColorClasses } from "../../theme";


export interface ButtonProps {
  label: string;
  type?: LameduseColor;
  style?: "solid" | "outline";
  form?: "rounded" | "pill";
  size?: "small" | "medium" | "large";
  color_class?: string;
  className?: string;
  onClick?: () => void;
  image?: string;
  imgClassName?:string;
  hover?: "scaleUp" | "nothing" | "scaleDown" | "color";
  hover_class?: string;
  clicked?: "bump" | "jump" | "none";
  clicked_class?: string;
}

const Button = (props: ButtonProps) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  // default values
  props = {...props}; // copy to avoid modifying the original object
  props.type = props.type || "primary";
  props.style = props.style || "solid";
  props.form = props.form || "rounded";
  props.size = props.size || "medium";
  props.className = props.className || "";
  props.imgClassName = props.imgClassName || "";
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
    "color": lameduseButtonColorHoverClasses[props.type][props.style]
  }[props.hover]

  let color_class = props.color_class || {
    "solid": lameduseSolidColorClasses[props.type],
    "outline": lameduseOutlineColorClasses[props.type],
  }[props.style];
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
    <div>
      <button
        className={`
          ${color_class}
          ${form_class}
          ${size_class}
          ${props.className}
          ${hover_class}
          ${clicked_class}
        `}
        onClick={handleClick}
      >
        {props.image && <img src={props.image} alt={props.label} className={props.imgClassName}/>}
        {props.label}
      </button>
    </div>
  )
};

export default Button;
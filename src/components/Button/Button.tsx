import React, { useState } from "react";


export interface ButtonProps {
  label: string;
  type?: "primary" | "secondary" | "tertiary" | "danger" | "white" | "gradient1" | "gradient2";
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
    "color": {
      "primary": {
        "solid" : "transition duration-100 hover:bg-opacity-80",
        "outline" : "transition duration-100 hover:border-opacity-70 hover:text-opacity-70"
      },
      "secondary": {
        "solid" : "transition duration-100 hover:bg-opacity-80",
        "outline" : "transition duration-100 hover:border-opacity-70 hover:text-opacity-70"
      },
      "tertiary": {
        "solid" : "transition duration-100 hover:bg-opacity-80",
        "outline" : "transition duration-100 hover:border-opacity-70 hover:text-opacity-70",
      },
      "danger": {
        "solid" : "transition duration-100 hover:bg-red-600",
        "outline" : "transition duration-100 hover:border-red-600 hover:text-red-600",
      },
      "white": {
        "solid" : "transition duration-100 hover:bg-gray-100",
        "outline" : "transition duration-100 hover:border-gray-300",
      },
      "gradient1": {
        "solid" : "transition duration-100 hover:opacity-80",
        "outline" : "transition duration-100 hover:opacity-80",
      },
      "gradient2": {
        "solid" : "transition duration-100 hover:opacity-80",
        "outline" : "transition duration-100 hover:opacity-80",
      }
    }[props.type][props.style]
  }[props.hover] 

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
    "gradient1": {
      "solid": "text-white bg-gradient-to-r from-lameduse-primary to-lameduse-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lameduse-secondary",
      "outline": "text-white bg-gradient-to-r from-lameduse-primary to-lameduse-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lameduse-secondary",
    },
    "gradient2": {
      "solid" : "text-white bg-gradient-to-r from-lameduse-secondary to-lameduse-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lameduse-tertiary",
      "outline" : "text-white bg-gradient-to-r from-lameduse-secondary to-lameduse-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lameduse-tertiary"
    }
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
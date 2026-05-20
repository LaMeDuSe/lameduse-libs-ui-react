import React from "react";
import { LameduseColor, lameduseBackgroundColorClasses, lameduseTextColorClasses } from "../../theme";


export interface TitleProps {
  label: string;
  type?: LameduseColor;
  className?: string;
  onClick?: () => void;
}

const Title = (props: TitleProps) => {
  // default values
  props = {...props}; // copy to avoid modifying the original object
  props.type = props.type || "primary";
  props.className = props.className || "";

  // classes
  let text_color_class = lameduseTextColorClasses[props.type];
  let bg_color_class = props.type === "danger" ? "bg-lameduse-red" : props.type === "white" ? "bg-white" : lameduseBackgroundColorClasses[props.type];
  return (
    <div className={`w-full ${props.className}`}>
        <h1 className={`sm:text-3xl text-2xl font-medium title-font mb-2 ${text_color_class}`}>{props.label}</h1>
        <div className={`h-1 w-20 ${bg_color_class} rounded`}></div>
    </div>
  )
};

export default Title;
import React from "react";


export interface ButtonProps {
  label: string;
}

const Button = (props: ButtonProps) => {
  return <button className="bg-blue-300 rounded-full w-20">{props.label}</button>;
};

export default Button;
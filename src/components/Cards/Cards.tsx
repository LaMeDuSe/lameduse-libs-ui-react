import React from "react";


export interface CardsProps {
  label: string;
  type?: "primary" | "secondary" | "tertiary" | "danger" | "white";
  className?: string;
  onClick?: () => void;
}

const Title = (props: CardsProps) => {
  // default values
  props = {...props}; // copy to avoid modifying the original object

  return (
    <div>

    </div>
  )
};

export default Title;
import React from "react";
import { LinkedInIcon, TwitterIcon } from "./icons";
import NextLink from "next/link";


export interface ButtonProps {
  icon: "LINKEDIN" | "TWITTER";
  href?: string;
  onClick?: () => void;
}

const IconMap = {
  "LINKEDIN": LinkedInIcon,
  "TWITTER": TwitterIcon,
};

const Icon = (props: ButtonProps) => {
  // default values
  props = { ...props }; // copy to avoid modifying the original object

  const IconObj = IconMap[props.icon];

  return (
    <NextLink href={props.href || "#"}>
      <IconObj/>
    </NextLink>
  )
};

export default Icon;
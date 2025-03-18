import React from "react";
import Link, { LinkProps } from "../Link/Link";



export interface CTAProps {
  first: LinkProps;
  second: LinkProps;
}

const CTA = (props: CTAProps) => {
  // const LameduseUICtx = useContext(LameduseUIContext);
  // default values
  props = {...props}; // copy to avoid modifying the original object

  let classes = "m-3";
  return (
    <div className="text-center w-full flex flex-row justify-center items-center">
      <Link {...props.first} />
      <Link {...props.second} />
    </div>
  )
};

export default CTA;
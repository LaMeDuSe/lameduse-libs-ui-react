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
    <div className="text-center w-fit mx-auto sm:w-full flex flex-col sm:flex-row justify-center sm:space-x-4 px-4 sm:px-0 space-y-4 sm:space-y-0">
      <Link {...props.first} />
      <Link {...props.second} />
    </div>
  )
};

export default CTA;
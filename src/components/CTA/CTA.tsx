import React, { useContext } from "react";
import { LameduseUIContext } from "../../context";
import Link from "../Link";
import { LinkProps } from "../Link/Link";



export interface CTAProps {
  label_first?: LinkProps["label"];
  href_first?: LinkProps["href"];
  style_first?: LinkProps["style"];
  type_first?: LinkProps["type"];
  target_first?: LinkProps["target"];

  label_second?: LinkProps["label"];
  href_second?: LinkProps["href"];
  style_second?: LinkProps["style"];
  type_second?: LinkProps["type"];
  target_second?: LinkProps["target"];

}

const CTA = (props: CTAProps) => {
  // const LameduseUICtx = useContext(LameduseUIContext);
  // default values
  props = {...props}; // copy to avoid modifying the original object
  props.label_first = props.label_first || "";
  props.href_first = props.href_first || "";
  props.style_first = props.style_first || "solid";
  props.type_first = props.type_first || "primary";
  props.target_first = props.target_first || "_self";

  props.label_second = props.label_second || "";
  props.href_second = props.href_second || "";
  props.style_second = props.style_second || "solid";
  props.type_second = props.type_second || "white";
  props.target_second = props.target_second || "_self";

  let classes = "m-3";
  return (
    <div className="text-center w-full flex flex-row justify-center items-center">
      <Link className={classes} 
        label={props.label_first}
        href={props.href_first}
        style={props.style_first}
        type={props.type_first}
        target={props.target_first}
        form="rounded"
      />
      <Link className={classes} 
        label={props.label_second}
        href={props.href_second}
        style={props.style_second}
        type={props.type_second}
        target={props.target_second}
        form="rounded"
      />
    </div>
  )
};

export default CTA;
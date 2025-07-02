import React from "react";


export interface TemplateProps {
  yesno: "YES" | "NO";
  onClick?: () => void;
}

const Template = (props: TemplateProps) => {
  // default values
  props = {...props}; // copy to avoid modifying the original object

  let yes_no = {
    "NO" : "NO",
    "YES" : "YES"
  }[props.yesno]

  return (
    <div>
      {"Not Implemented"} {yes_no}
    </div>
  )
};

export default Template;
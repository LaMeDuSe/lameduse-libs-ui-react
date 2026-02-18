import React, { useState } from "react";


export interface CheckBoxFormsProps {
  question: string;
  questionClassName?: string;
  answer: CheckBoxAnswerProps[]
  type?: "checkbox" | "radio";
  maxSelect?: number;
  cols?: number;
  style?: "row" | "col";
  colors?: "primary" | "secondary" | "tertiary" | "gradient1" | "gradient2" | "gradient3" | "gradient4";
  colors_class?: string;
};

export interface CheckBoxAnswerProps {
  answer: string;
  answerClassName?: string;
};

const CheckBoxForm = (props: CheckBoxFormsProps) => {
  props = {...props}; // copy to avoid modifying the original object
  const [values, setValues] = useState<string[]>([]);
  const inputType = props.type || "checkbox";
  const cols = props.cols || 1;
  const styles = props.style || "row";
  props.colors = props.colors || "primary";
  
  let colors_class = props.colors_class || {
    "primary": "bg-lameduse-primary",
    "secondary": "bg-lameduse-secondary",
    "tertiary": "bg-lameduse-tertiary",
    "gradient1": "bg-gradient-to-r from-lameduse-primary to-lameduse-secondary",
    "gradient2": "bg-gradient-to-r from-lameduse-secondary to-lameduse-tertiary",
    "gradient3": "bg-gradient-to-r from-lameduse-tertiary to-lameduse-primary",
    "gradient4": "bg-gradient-to-r from-lameduse-secondary via-lameduse-tertiary to-lameduse-primary",
  }[props.colors];

  let divStyle: string = "";
  if (styles === "col") {
    divStyle = `col-span-${cols} gap-2 `;
  } else {
    divStyle = `flex flex-wrap col-span-${cols} gap-5`;
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    if (inputType === "radio") {
      if (checked) setValues([value]);
    } else {
      if (checked) {
        if (props.maxSelect && values.length >= props.maxSelect) return;
        setValues((prev) => [...prev, value]);
      } else {
        setValues((prev) => prev.filter((item) => item !== value));
      }
    }
  };

  return (
    <div className={`grid grid-cols-${cols} gap-2 p-2.5`}>
      <p className={`${props.questionClassName} col-span-${cols}`}>{props.question}</p>
      <div className="w-full"></div>
      <div className={`${divStyle} `}>
      {props.answer.map((item, index) => {
        const isChecked = values.includes(item.answer);
        const isDisabled = inputType !== "radio" && props.maxSelect !== undefined && values.length >= props.maxSelect && !isChecked;
        return (
        <label key={index} className={`flex items-center justify-center px-4 py-2 my-2 gap-2 rounded-[50px] transition-all duration-200 ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${isChecked ? `${colors_class} text-white shadow-sm` : "bg-[#f0f0f0] text-gray-700 hover:bg-gray-200"}`}>
          <input
            type={inputType}
            value={item.answer}
            checked={isChecked}
            onChange={handleChange}
            disabled={isDisabled}
            className="sr-only"
          />
          <span className={item.answerClassName}>{item.answer}</span>
        </label>)
      })}
      </div>
    </div>
  );
}

export default CheckBoxForm;

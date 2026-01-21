import React, { useState } from "react";


export interface CheckBoxFormsProps {
  question: string;
  questionClassName?: string;
  answer: CheckBoxAnswerProps[]
  type?: "checkbox" | "radio";
  maxSelect?: number;
};

export interface CheckBoxAnswerProps {
  answer: string;
  answerClassName?: string;
};

const CheckBoxForm = (props: CheckBoxFormsProps) => {
  const [values, setValues] = useState<string[]>([]);
  const inputType = props.type || "checkbox";

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
    <div className="flex flex-col gap-2 p-2.5">
      <p className={props.questionClassName}>{props.question}</p>
      {props.answer.map((item, index) => {
        const isDisabled = inputType !== "radio" && props.maxSelect !== undefined && values.length >= props.maxSelect && !values.includes(item.answer);
        return (
        <label key={index} className={`flex items-center gap-2 ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
          <div className="relative flex items-center">
            <input
              type={inputType}
              value={item.answer}
              checked={values.includes(item.answer)}
              onChange={handleChange}
              disabled={isDisabled}
              className={`peer h-5 w-5 appearance-none border border-gray-300 transition-all checked:border-blue-500 checked:bg-blue-500 hover:shadow-md ${inputType === "radio" ? "rounded-full" : "rounded"} ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
            />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 peer-checked:opacity-100 text-white">
              {inputType === "radio" ? (
                <div className="h-2 w-2 rounded-full bg-white" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              )}
            </span>
          </div>
          <span className={item.answerClassName}>{item.answer}</span>
        </label>)
      })}
    </div>
  );
}

export default CheckBoxForm;

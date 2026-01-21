import React, { useState } from "react";

export interface FormGroupProps {
  question: string;
  questionClassName?: string;
  inputClassName?: string;
};

const FormGroup = (props: FormGroupProps) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="p-4">
      <form>
        <div className="flex-col flex mb-4 items-start">
          <label className={`${props.questionClassName} mb-2 text-sm font-medium text-gray-900`}>
            {props.question}
          </label>
          <input
            type="text"
            value={value}
            onChange={handleChange}
            className={`${props.inputClassName} bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5`}
          />
        </div>
      </form>
    </div>
  );
}

export default FormGroup;

import React, { useState } from "react";

export interface FormGroupProps {
  question: string;
  questionClassName?: string;
  inputClassName?: string;
  enableGlow?: boolean;
  gradientColors?: string;
  borderColors?: string;
};

const FormGroup = (props: FormGroupProps) => {
  const [value, setValue] = useState("");
  const { enableGlow = false } = props;
  const gradientColors = props.gradientColors || "from-lameduse-tertiary via-lameduse-secondary to-lameduse-tertiary";
  const borderColor = props.borderColors || "blue-300";


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="p-4">
      {enableGlow && (
      <style>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 3s ease-in-out infinite;
        }
      `}</style>
      )}
      <form>
        <div className="flex-col flex mb-4 items-start">
          <label className={`${props.questionClassName} mb-2 text-sm font-medium text-gray-900`}>
            {props.question}
          </label>
          {enableGlow ? (
          <div className="relative w-full group">
            <div className={`absolute -inset-px bg-[linear-gradient(30deg,var(--tw-gradient-stops))] ${gradientColors} rounded-lg blur-sm opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-move`}></div>
            <div className={`relative w-full p-[1px] bg-[linear-gradient(30deg,var(--tw-gradient-stops))] ${gradientColors} rounded-lg animate-gradient-move`}>
              <input
                type="text"
                value={value}
                onChange={handleChange}
                className={`${props.inputClassName} bg-gray-50 text-gray-900 text-sm rounded-md focus:outline-none block w-full p-2.5`}
              />
            </div>
          </div>
          ) : (
            <input
              type="text"
              value={value}
              onChange={handleChange}
              className={`${props.inputClassName} bg-gray-50 border border-${borderColor} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default FormGroup;

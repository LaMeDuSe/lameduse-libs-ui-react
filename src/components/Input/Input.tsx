import React, { useState } from "react";
import "./Input.css";

export interface InputProps {
  label?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  copy?: boolean;
  disabled?: boolean;
  className?: string;
  type?: string;
}

const Input = ({
  label,
  value,
  copy = false,
  disabled = false,
  className = "",
  type = "text",
  onChange,
}: InputProps) => {
  const [copied, setCopied] = useState(false);
  const [localValue, setLocalValue] = useState(value); 

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const wrapperClickHandler = (e: React.MouseEvent) => {
    if (copy) {
      e.stopPropagation();
      handleCopy();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e); 
    } else {
      setLocalValue(e.target.value); 
    }
  };

  return (
    <div className={`wrapper ${className}`}>
      {label && <label className="label">{label}</label>}

      <div
        onClick={wrapperClickHandler}
        className={`container ${disabled ? "container-disabled" : "container-enabled"} ${copy ? "copy-mode" : ""}`}
      >
        <input
          type={type}
          value={onChange ? value : localValue} 
          onChange={handleChange}
          disabled={copy ? false : disabled}
          readOnly={copy}
          className={`input ${(disabled || copy) ? "input-disabled" : ""}`}
        />

        {copy && (
          <span
            className={`icon ${copied ? "icon-success" : ""}`}
            aria-label="Copy"
            title={copied ? "Copié !" : "Copier"}
          >
            {copied ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>

            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
              </svg>

            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;

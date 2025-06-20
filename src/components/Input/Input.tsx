import React, { useState, useEffect } from "react";
import "./Input.css";
import { ComponentsFieldsCopyOnly } from "./CopyInput";
import Calendar from "../Calendar/Calendar";

export interface InputProps {
  label?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
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
  const [localValue, setLocalValue] = useState(value);
  const [showCalendar, setShowCalendar] = useState(false);

  const isDateType = type?.toLowerCase() === "date";

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    } else {
      setLocalValue(e.target.value);
    }
  };

  const handleDateSelect = (dateStr: string) => {
    if (onChange) {
      onChange(dateStr);
    } else {
      setLocalValue(dateStr);
    }
    setShowCalendar(false);
  };

  const effectiveValue = onChange ? value : localValue;

  
  const displayedValue =
    isDateType && !/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(effectiveValue)
      ? ""
      : effectiveValue;

  return (
    <div className={`wrapper ${className}`}>
      {label && !copy && <label className="label">{label}</label>}

      {copy ? (
        <ComponentsFieldsCopyOnly data={effectiveValue} label={label} />
      ) : (
        <div className={`container ${disabled ? "container-disabled" : "container-enabled"}`}>
          <input
            type="text"
            value={displayedValue}
            onChange={handleChange}
            disabled={disabled}
            className={`input ${disabled ? "input-disabled" : ""}`}
            placeholder={isDateType ? "jj/mm/aaaa" : ""}
            readOnly={isDateType} // rend non éditable à la main pour type=date
          />
          {isDateType && !disabled && (
            <span className="icon" onClick={() => setShowCalendar(!showCalendar)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
            </span>

          )}
        </div>
      )}

      {isDateType && showCalendar && !disabled && (
        <div className="calendar-wrapper">
          <Calendar
            year={new Date().getFullYear()}
            Month={new Date().getMonth()}
            onClick={(dateStr) => handleDateSelect(dateStr)}
            vueDate
            shape="square"
            color_style="light"
            translation="fr"
          />
        </div>
      )}
    </div>
  );
};

export default Input;

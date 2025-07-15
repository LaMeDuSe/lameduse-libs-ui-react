import React from "react";
import Input from "../Input/Input";
import Icon, { ButtonProps as IconProps } from "../Icon/Icon";
import './Form.css';

export interface FormField {
  name: string;
  label?: string;
  type?: string;
  value: string;
  imageSrc?: string;
  placeholder?: string;
  copy?: boolean;
  disabled?: boolean;
  className?: string;
  rowSize?: 1 | 2;
  verificate?: (val: string) => string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
}

export interface FormProps {
  fields: FormField[];
  layout?: "vertical" | "horizontal" | "grid";
  className?: string;
  icons?: IconProps[]; // Liste d'icônes à afficher à la fin
}

const Form = ({ fields, layout = "vertical", className = "", icons = [] }: FormProps) => {
  const rows: FormField[][] = [];
  let currentRow: FormField[] = [];

  fields.forEach((field) => {
    const size = field.rowSize ?? 2;
    currentRow.push(field);

    if (size === 1 || currentRow.length === 2) {
      rows.push(currentRow);
      currentRow = [];
    }
  });

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return (
    <form className={`form-container ${layout} ${className}`}>
      {rows.map((row, rowIndex) => (
        <div className="form-row" key={rowIndex}>
          {row.map((field) => (
            <div
              key={field.name}
              className={`form-field ${field.rowSize === 1 ? 'full-width' : 'half-width'}`}
            >
              {field.imageSrc && (
                <img src={field.imageSrc} alt="field-img" className="field-image" />
              )}
              <Input {...field} />
            </div>
          ))}
        </div>
      ))}

      {icons.length > 0 && (
        <div className="form-icons">
          {icons.map((iconProps, index) => (
            <Icon key={index} {...iconProps} />
          ))}
        </div>
      )}
    </form>
  );
};

export default Form;

import React from "react";
import FormGroup, { FormGroupProps } from "../../components/FormGroup/FormGroup";
import CheckBoxForm, { CheckBoxFormsProps } from "../../components/CheckBoxForm/CheckBoxForm";



export interface FormProps {
  form: (FormGroupProps | CheckBoxFormsProps)[];
}

const Form = (props: FormProps) => {
  return (
    <div className="w-full">
      {props.form.map((item, index) => {
        if ("answer" in item) {
          return <CheckBoxForm key={index} {...item} />;
        }
        return <FormGroup key={index} {...item} />;
      })}
    </div>
  )
};

export default Form;
import React from "react";
import FormGroup, { FormGroupProps } from "../../components/FormGroup/FormGroup";



export interface FormProps {
  form:FormGroupProps[]
}

const Form = (props: FormProps) => {
  props = {...props}; 
  

  return (
    <div className="w-full">
      {props.form.map((form, index) => (
        <FormGroup key={index} {...form} />
      ))}
    </div>
  )
};

export default Form;
// src/Form/DynamicFormBuilder.mog.tsx
import React from "react";
import Form from "./Form";
import type { FormProps } from "./Form";

const DynamicFormBuilder = (props: FormProps) => {
  return <Form {...props} />;
};

export default DynamicFormBuilder;

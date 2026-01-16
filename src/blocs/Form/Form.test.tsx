import React from "react";
import { render } from "@testing-library/react";
import { describe, test } from 'vitest';

import Form from "./Form";
import {FormGroupProps} from "../../components/FormGroup/FormGroup";


const form:FormGroupProps[] = [
  {
    question: "Your Question",
    questionClassName: "text-lameduse-primary",
    inputClassName: "w-500px"
  }
];

describe("Form", () => {
  test("renders the Form component", () => {
    render(<Form form={form} />);
  });
});
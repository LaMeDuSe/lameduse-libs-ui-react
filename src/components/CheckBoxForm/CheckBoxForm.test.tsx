import React from "react";
import { render } from "@testing-library/react";
import { describe, test } from 'vitest';

import CheckBoxForm, {CheckBoxAnswerProps} from "./CheckBoxForm";

const checkbox: CheckBoxAnswerProps[] = [
  {
    answer:"1",
    answerClassName:"text-bolt"
  },
  {
    answer:"2"
  }
];

describe("CheckBoxForm", () => {
  test("renders the CheckBoxForm component", () => {
    render(<CheckBoxForm question="How many days?" questionClassName="text-lameduse-primary" answer={checkbox}/>);
  });
});
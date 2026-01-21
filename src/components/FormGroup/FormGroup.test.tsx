import React from "react";
import { render } from "@testing-library/react";
import { describe, test } from 'vitest';

import FormGroup from "./FormGroup";

describe("FormGroup", () => {
  test("renders the FormGroup component", () => {
    render(<FormGroup question="Your Question" questionClassName="text-lameduse-primary" inputClassName="w-500px"/>);
  });
});
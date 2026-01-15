import React from "react";
import { render } from "@testing-library/react";
import { describe, test } from 'vitest';

import IconText from "./icon_text";


describe("Template", () => {
  test("renders the Template component", () => {
    render(<IconText icon={{icon:"LINKEDIN", size:"medium"}} text="this is a description" className="text-lameduse-primary" position="right"/>);
  });
});
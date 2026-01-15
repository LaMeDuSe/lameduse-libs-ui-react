import React from "react";
import { render } from "@testing-library/react";
import { describe, test } from 'vitest';

import IconText from "./IconText";


describe("IconText", () => {
  test("renders the IconText component", () => {
    render(<IconText icon={{icon:"LINKEDIN", size:"medium"}} text="this is a description" className="text-lameduse-primary" position="right"/>);
  });
});
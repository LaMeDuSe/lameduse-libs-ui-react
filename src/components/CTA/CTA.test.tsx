import React from "react";
import { render } from "@testing-library/react";

import CTA from "./CTA";

describe("Button", () => {
  test("renders the Button component", () => {
    render(<CTA label_first="Hello world!" label_second="Call me" />);
  });
});
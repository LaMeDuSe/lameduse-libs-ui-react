import React from "react";
import { render } from "@testing-library/react";

import Cards from "./Cards";

describe("Button", () => {
  test("renders the Button component", () => {
    render(<Cards label="Hello world!" type="primary" />);
  });
});
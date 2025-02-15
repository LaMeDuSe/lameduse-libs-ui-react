import React from "react";
import { render } from "@testing-library/react";

import Title from "./Title";

describe("Button", () => {
  test("renders the Button component", () => {
    render(<Title label="Hello world!" type="primary" />);
  });
});
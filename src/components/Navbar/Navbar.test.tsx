import React from "react";
import { render } from "@testing-library/react";

import Navbar from "./Navbar";

describe("Button", () => {
  test("renders the Button component", () => {
    render(<Navbar label="Hello world!" type="primary" />);
  });
});
import React from "react";
import { render } from "@testing-library/react";

import Link from "./Link";

describe("Button", () => {
  test("renders the Button component", () => {
    render(<Link label="Hello world!" />);
  });
});
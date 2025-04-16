import React from "react";
import { render } from "@testing-library/react";

import Template from "./Template";

describe("Template", () => {
  test("renders the Button component", () => {
    render(<Template yesno="YES" />);
  });
});
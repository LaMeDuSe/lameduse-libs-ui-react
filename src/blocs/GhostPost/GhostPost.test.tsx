import React from "react";
import { render } from "@testing-library/react";

import Template from "./GhostPost";

describe("Template", () => {
  test("renders the Button component", () => {
    render(<Template yesno="YES" />);
  });
});
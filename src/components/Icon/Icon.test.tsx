import React from "react";
import { render } from "@testing-library/react";

import Icon from "./Icon";

describe("Icon", () => {
  test("renders the Button component", () => {
    render(<Icon icon="TWITTER"/>);
  });
});
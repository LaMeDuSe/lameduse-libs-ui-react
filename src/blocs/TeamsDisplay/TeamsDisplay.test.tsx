import React from "react";
import { render } from "@testing-library/react";

import TeamsDisplay from "./TeamsDisplay";

describe("TeamsDisplay", () => {
  test("renders the TeamsDisplay component", () => {
    render(<TeamsDisplay TeamCards={[]} />);
  });
});
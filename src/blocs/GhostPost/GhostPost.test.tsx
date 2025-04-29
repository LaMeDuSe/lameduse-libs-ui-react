import React from "react";
import { render } from "@testing-library/react";

import GhostPost from "./GhostPost";

describe("GhostPost", () => {
  test("renders the GhostPost component", () => {
    render(<GhostPost yesno="YES" />);
  });
});
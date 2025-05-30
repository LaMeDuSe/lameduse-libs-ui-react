import React from "react";
import { render } from "@testing-library/react";

import Timeline from "./Timeline";

describe("Timeline", () => {
  test("renders the Timeline component", () => {
    render(<Timeline year="2025" content="test ceci est une phrase un peu longue pour voir ce que ça donne" />);
  });
});
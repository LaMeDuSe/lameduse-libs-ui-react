import React from "react";
import { render } from "@testing-library/react";

import Calendar from "./Calendar";

describe("Calendar", () => {
  test("renders the Calendar component", () => {
    render(<Calendar
      year={2025}
      Month={4}
      vueDate={true}
      shape='circle'
      color_style='dark'
      translation='fr'
      />);
  });
});
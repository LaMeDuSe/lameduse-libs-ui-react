import React from "react";
import { render } from "@testing-library/react";
import { describe, test } from 'vitest';

import ToggleButton from "./ToggleButton";

describe("ToggleButton", () => {
  test("renders the ToggleButton component", () => {
    render(<ToggleButton labelOn="On" labelOff="Off" type="primary" />);
  });
});
import React from "react";
import { render } from "@testing-library/react";
import { describe, test } from 'vitest';

import Template from "./Template";

describe("Template", () => {
  test("renders the Template component", () => {
    render(<Template yesno="YES" />);
  });
});
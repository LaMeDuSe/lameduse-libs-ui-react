import React from "react";
import { render } from "@testing-library/react";
import { describe, test } from 'vitest';

import Title from "./Title";

describe("Title", () => {
  test("renders the Title component", () => {
    render(<Title label="Hello world!" type="primary" />);
  });
});
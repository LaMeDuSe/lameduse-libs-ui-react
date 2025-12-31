import React from "react";
import { render } from "@testing-library/react";
import { describe, test } from 'vitest';

import Heading from "./Heading";

describe("Heading", () => {
  test("renders the Heading component", () => {
    render(<Heading title="hello world !" description="This is a basic description"/>);
  });
});
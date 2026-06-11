import React from "react";
import { render } from "@testing-library/react";
import { describe, test } from 'vitest';
import InteractiveBg from "./InteractiveBg";

describe("InteractiveBg", () => {
  test("renders the InteractiveBg component", () => {
    const mouse = { x: 0, y: 0, active: false };
    render(<InteractiveBg effect="plexus" mouse={mouse} />);
  });
});

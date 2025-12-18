import React from "react";
import { render } from "@testing-library/react";
import CardCaroussel from "./CardCaroussel";

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("CardCaroussel", () => {
  test("test the CardCaroussel component", () => {
    const mockCards = [
      <div key="1">Card 1</div>,
      <div key="2">Card 2</div>,
      <div key="3">Card 3</div>,
    ];

    render(<CardCaroussel Cards={mockCards} />);
  });
});

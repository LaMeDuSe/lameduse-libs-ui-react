import React from "react";
import { render } from "@testing-library/react";

import CardCaroussel from "./CardCaroussel";

describe("CardCaroussel", () => {
  test("renders the card_caroussel component", () => {
    render(<CardCaroussel yesno="YES" />);
  });
});


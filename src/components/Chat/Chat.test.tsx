import React from "react";
import { render } from "@testing-library/react";

import Chat from "./Chat";

describe("Chat", () => {
  test("renders the Chat component", () => {
    render(<Chat yesno="YES" />);
  });
});
import React from "react";
import { render } from "@testing-library/react";
import { MessageProps } from "./Message";
import Chat from "./Chat";

describe("Chat", () => {
  test("renders the Chat component", () => {
    const fakeMessages: MessageProps[] = [
      { id: 1, content: "Hello", author: "X" },
      { id: 2, content: "Sault!", author: "Y" },
    ];
    render(<Chat messages={fakeMessages} />);
  });
});
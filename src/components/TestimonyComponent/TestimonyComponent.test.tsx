import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import Testimony from "./TestimonyComponent";

describe("TestimonyComponent", () => {
  test("renders the Testimony component with provided text", () => {
    const testText = "This is a testimony.";
    render(<Testimony text={testText} />);

    // Vérifie que le texte est bien affiché
    expect(screen.getByText(testText)).toBeInTheDocument();
  });
});

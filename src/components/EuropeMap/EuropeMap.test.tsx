import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";

import EuropeMap from "./EuropeMap";

describe("EuropeMap", () => {
  test("renders the EuropeMap component", () => {
    render(<EuropeMap />);
  });

  test("renders an SVG element with the correct accessible label", () => {
    render(<EuropeMap />);
    expect(
      screen.getByRole("img", { name: /carte interactive de l'europe/i })
    ).toBeDefined();
  });

  test("renders France, Germany and Switzerland paths", () => {
    const { container } = render(<EuropeMap />);
    const paths = container.querySelectorAll("path");
    // context countries + 3 highlighted countries
    expect(paths.length).toBeGreaterThanOrEqual(3);
  });

  test("shows a tooltip when hovering over France", () => {
    const { container } = render(<EuropeMap />);
    const paths = Array.from(container.querySelectorAll("path"));
    // The France path is the first highlighted path (after context paths)
    const francePath = paths.find(
      (p) => p.getAttribute("fill") === "#2563EB"
    );
    expect(francePath).toBeDefined();
    fireEvent.mouseEnter(francePath!);
    const tooltip = screen.getByTestId("euromap-tooltip");
    expect(tooltip).toBeDefined();
    expect(tooltip.textContent).toMatch(/Paris/);
    expect(tooltip.textContent).toMatch(/68,0 millions/);
  });

  test("shows a tooltip when hovering over Germany", () => {
    const { container } = render(<EuropeMap />);
    const paths = Array.from(container.querySelectorAll("path"));
    const germanyPath = paths.find(
      (p) => p.getAttribute("fill") === "#16A34A"
    );
    expect(germanyPath).toBeDefined();
    fireEvent.mouseEnter(germanyPath!);
    const tooltip = screen.getByTestId("euromap-tooltip");
    expect(tooltip.textContent).toMatch(/Berlin/);
    expect(tooltip.textContent).toMatch(/84,3 millions/);
  });

  test("shows a tooltip when hovering over Switzerland", () => {
    const { container } = render(<EuropeMap />);
    const paths = Array.from(container.querySelectorAll("path"));
    const swissPath = paths.find(
      (p) => p.getAttribute("fill") === "#DC2626"
    );
    expect(swissPath).toBeDefined();
    fireEvent.mouseEnter(swissPath!);
    expect(screen.getByText("Suisse")).toBeDefined();
    expect(screen.getByText(/Berne/)).toBeDefined();
    expect(screen.getByText(/8,8 millions/)).toBeDefined();
  });

  test("hides the tooltip when mouse leaves a country", () => {
    const { container } = render(<EuropeMap />);
    const paths = Array.from(container.querySelectorAll("path"));
    const francePath = paths.find(
      (p) => p.getAttribute("fill") === "#2563EB"
    );
    expect(francePath).toBeDefined();
    fireEvent.mouseEnter(francePath!);
    expect(screen.getByTestId("euromap-tooltip")).toBeDefined();
    fireEvent.mouseLeave(francePath!);
    expect(screen.queryByTestId("euromap-tooltip")).toBeNull();
  });

  test("accepts a custom className prop", () => {
    const { container } = render(<EuropeMap className="my-custom-class" />);
    expect(
      container.querySelector(".my-custom-class")
    ).toBeDefined();
  });

  test("accepts custom width and height props", () => {
    const { container } = render(<EuropeMap width={600} height={400} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.width).toBe("600px");
    expect(wrapper.style.height).toBe("400px");
  });
});

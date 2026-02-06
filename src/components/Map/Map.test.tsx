import React from "react";
import { render } from "@testing-library/react";
import { describe, test, expect } from 'vitest';
import Map from "./Map";

describe("Map", () => {
  test("renders the map component", () => {
    const { container } = render(
      <Map
        lat={48.866667}
        lng={2.333333}
        apiKey={"YOUR_API_KEY"}
        zoom={14}
        width={600}
        height={400}
      />
    );
    
    const iframe = container.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe?.src).toContain('https://www.google.com/maps/embed/v1/place');
  });
});
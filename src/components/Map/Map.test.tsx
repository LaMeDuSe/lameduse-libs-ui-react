import React from "react";
import { render } from "@testing-library/react";
import { describe, test, expect } from 'vitest';
import Map from "./Map";

describe("Map", () => {
  test("renders the map component with lat/lng", () => {
    const { container } = render(
      <Map
        lat={48.866667}
        lng={2.333333}
        apiKey={"YOUR_API_KEY"}
      />
    );
    
    const iframe = container.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe?.src).toContain('q=48.866667,2.333333');
  });

  test("renders the map component with a q parameter", () => {
    const placeQuery = "Eiffel Tower, Paris, France";
    const { container } = render(
      <Map
        lat={0} // lat/lng are still required by the interface
        lng={0}
        q={placeQuery}
        apiKey={"YOUR_API_KEY"}
      />
    );
    
    const iframe = container.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe?.src).toContain(`q=${encodeURIComponent(placeQuery)}`);
  });
});
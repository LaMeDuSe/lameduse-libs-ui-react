import React from "react";
import { render } from "@testing-library/react";

import { describe, test } from 'vitest';

import StaticMap from "./Map";

describe("StaticMap", () => {
  test("renders the StaticMap component", () => {
    render(<StaticMap lat={48.866667} 
      lng={2.333333} 
      apiKey={"YOUR_API_KEY"} 
      zoom={14}
      width={600}
      height={400}
      mapType={"roadmap"}
      />
    );
  });
});
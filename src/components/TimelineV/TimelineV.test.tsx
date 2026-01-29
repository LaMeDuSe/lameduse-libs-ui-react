import React from "react";
import { render } from "@testing-library/react";

import TimelineV from "./TimelineV";

describe("TimelineV", () => {
  test("renders the Timeline component", () => {
    render(
      <TimelineV
        elements={[
          {
            title: "titre intéressant",
            content:
              "test ceci est une phrase un peu longue pour voir ce que ça donne",
            year: "2025",
          },
          {
            title: "titre intéressant",
            content: "Une autre phrase pour tester le composant TimelineV",
            year: "2024",
          },
        ]}
      />
    );
  });
});
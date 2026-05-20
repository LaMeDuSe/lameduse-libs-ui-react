import React from "react";
import { render } from "@testing-library/react";

import TimelineH from "./TimelineH";

describe("TimelineH", () => {
  test("renders the TimelineH component", () => {
    render(
      <TimelineH
        elements={[
          {
            title: "Titre intéressant",
            content:
              "Ceci est une phrase un peu longue pour voir ce que ça donne",
            year: "2024",
          },
          {
            title: "Titre intéressant",
            content: "Une autre phrase pour tester le composant TimelineH",
            year: "2025",
          },
        ]}
      />
    );
  });
});
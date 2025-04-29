import React from "react";
import { render } from "@testing-library/react";

import GhostPost from "./GhostPost";

describe("GhostPost", () => {
  test("renders the GhostPost component", () => {
    render(<GhostPost GhostContentAPIOptions={{
      url: 'https://blog.lamedusegroup.com',
      key: '525230ac593cf1cd6ce27e9ec8',
      version: "v5.0"
    }} />);
  });
});
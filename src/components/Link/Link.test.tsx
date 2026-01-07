import React from "react";
import { render } from "@testing-library/react";

import { describe, test } from 'vitest';

import Link from "./Link";

describe("Link", () => {
  test("renders the Link component", () => {
    render(<Link> Link </Link>);
  });
});
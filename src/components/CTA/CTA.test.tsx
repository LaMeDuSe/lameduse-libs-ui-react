import React from "react";
import { render } from "@testing-library/react";
import { describe, test } from 'vitest';

import CTA from "./CTA";
import { LinkProps } from "../Link/Link";

describe("CTA", () => {
  let params : {
      first : LinkProps,
      second : LinkProps
    } = {
    first : {
      children: 'See more',
      type: 'primary',
      style: 'solid',
      form: 'rounded',
      size: 'medium',
      href: '#'
    },
    second : {
      children: 'Call us',
      type: 'secondary',
      style: 'solid',
      form: 'rounded',
      size: 'medium',
      href: '#'
    }
  }
  test("renders the CTA component", () => {
    render(<CTA {...params} />);
  });
});
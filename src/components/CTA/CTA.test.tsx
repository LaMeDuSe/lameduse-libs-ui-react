import React from "react";
import { render } from "@testing-library/react";

import CTA from "./CTA";
import { LinkProps } from "../Link/Link";

describe("Button", () => {
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
  test("renders the Button component", () => {
    render(<CTA {...params} />);
  });
});
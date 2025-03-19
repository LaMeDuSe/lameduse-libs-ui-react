import React from "react";
import { render } from "@testing-library/react";

import Cards from "./Cards";

describe("Button", () => {
  test("renders the Button component", () => {
    render(<Cards
      type='primary'
      image='https://lamedusegroup.com/images/logo/Icon 2.png'
      description='This is a description'
      title='This is a title'
      link_url='/'
      link_text='Link'
    />);
  });
});
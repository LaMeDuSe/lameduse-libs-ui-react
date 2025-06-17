import React from "react";
import { render } from "@testing-library/react";

import CardTwo from "./CardTwo";

describe("CardTwo", () => {
  test("renders the CardTwo component", () => {
    render(<CardTwo
      type='primary'
      image='https://lamedusegroup.com/images/logo/Icon 2.png'
      description='This is a description'
      title='This is a title'
      link_url='/'
      label="AWS"
    />);
  });
});
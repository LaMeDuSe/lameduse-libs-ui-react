import React from "react";
import { render } from "@testing-library/react";
import { describe, test } from 'vitest';

import CardOne from "./CardOne";

describe("CardOne", () => {
  test("renders the CardOne component", () => {
    render(<CardOne
      type='primary'
      image='https://lamedusegroup.com/images/logo/Icon 2.png'
      description='This is a description'
      title='This is a title'
      link_url='/'
      link_text='Link'
    />);
  });
});
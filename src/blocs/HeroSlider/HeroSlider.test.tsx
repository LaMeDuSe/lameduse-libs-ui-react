import React from "react";
import { render } from "@testing-library/react";

import Template from "../../components/Template";
import HeroSlider from "./HeroSlider";

describe("Template", () => {
  test("renders the Template component", () => {
    render(<HeroSlider
      slides={[
        {
          title: 'Slide 1',
          subtitle: 'This is the second subtitle.',
          image: 'https://dummyimage.com/600x400/ff4cff/fff&text=Hello',
          buttons: [{
            children: 'Explorer',
            href: '#',
          }],
          style: 'right',
          imgClassName: 'blur-sm'
        },
      ]} />);
  });
});

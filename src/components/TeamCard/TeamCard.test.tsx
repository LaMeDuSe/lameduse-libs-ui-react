import React from "react";
import { render } from "@testing-library/react";

import TeamCard from "./TeamCard";

describe("TeamCard", () => {
  test("renders the TeamCard component", () => {
    render(<TeamCard
      link_url='/'
      firstname='Firstname'
      lastname='Name'
      image='https://lamedusegroup.com/images/code_2.png'
      title='Job name'
      email='mail@mail.com'
      url_linkedin='/'
      url_blog='/'
    />);
  });
});
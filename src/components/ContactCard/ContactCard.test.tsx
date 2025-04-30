import React from "react";
import { render } from "@testing-library/react";

import ContactCard from "./ContactCard";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";

describe("ContactCard", () => {
  test("renders the ContactCard component", () => {
    render(<ContactCard
      name="Book a call"
      first_line="With our team"
      second_line="Monday - Friday"
      third_line="9h - 20h (Paris time)"
      link_text="Book a call"
      link_url="https://contactusbookcall.lamedusegroup.com/"
      Icon={CalendarDaysIcon}
      />);
  });
});
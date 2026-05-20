import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from 'vitest';

import Navbar from "./Navbar";

describe("Navbar", () => {
  test("renders the Navbar component", () => {
    render(<Navbar  type='primary' 
      NavItems={[
        {
          type: "logo",
          position: "left",
          src: "https://lamedusegroup.com/images/logos/lameduse_logo_grad_text_primary_bg_white.webp",
          label: "LaMeDuSe",
          allowed_display: ["desktop"],
          height: 100,
          width: 300,
        },
        {
          type: "logo",
          position: "left",
          src: "https://lamedusegroup.com/images/logos/lameduse_logo_grad.webp",
          allowed_display: ["mobile-outside"],
          label: "LaMeDuSe",
          height: 75,
          width: 75,
        },
        {
          type: "logo",
          position: "left",
          src: "https://lamedusegroup.com/images/logos/lameduse_logo_grad.webp",
          allowed_display: ["mobile"],
          label: "LaMeDuSe",
          height: 100,
          width: 100,
        },
        {
          type: "link",
          position: "center",
          label: "Home",
          href: "#",
        },
        {
          type: "link",
          position: "center",
          label: "About",
          href: "#",
        },
        {
          type: "link",
          position: "center",
          label: "Services",
          href: "#",
        },
        {
          type: "link",
          position: "center",
          label: "Contact",
          href: "#",
        },
        {
          type: "dropdown",
          position: "right",
          label: "Dropdown",
          items: [
            {
              type: "link",
              position: "right",
              label: "Item 1",
              href: "#",
            },
            {
              type: "link",
              position: "right",
              label: "Item 2",
              href: "#",
            },
            {
              type: "link",
              position: "right",
              label: "Item 3",
              href: "#",
            },
          ]
        },
        {
          type: "link",
          position: "right",
          label: "Login",
          href: "#",
        },
        {
          type: "link",
          position: "right",
          label: "Sign Up",
          href: "#",
        },
      ]} />);
  });

  test("keeps long link labels on one line", () => {
    const longLabel = "This is a very long navbar item label";

    render(<Navbar
      type='primary'
      NavItems={[
        {
          type: "link",
          position: "center",
          label: longLabel,
          href: "#",
        },
      ]}
    />);

    expect(screen.getAllByText(longLabel).some((link) => link.className.includes("truncate"))).toBe(true);
  });
});
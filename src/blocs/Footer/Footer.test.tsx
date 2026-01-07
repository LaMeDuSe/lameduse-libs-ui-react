import React from "react";
import { render } from "@testing-library/react";
import { describe, test } from 'vitest';

import Footer from "./Footer";

describe("Footer", () => {
  test("renders the Button component", () => {
    let props = {
      companyInfos: {
        logo: "https://assets.lameduse.net/logo/lameduse_group_logo_grad_text_primary_bg_white.png",
        logo_size: { width: 192, height: 64 },
        description: "At LaMeDuSe Group we believe in innovation and creativity. We are a team of passionate who are dedicated to pushing the boundaries of technology and design.",
        name: "LaMeDuSe Group",
        address: "131 Rue Saint-Honoré 75001 Paris",
        email: "contact@lamedusegroup.com",
        phone: "+33 (0)9 72 17 39 01",
        id_number: "915248579",
      },
      links: [
        {
          title: 'Company',
          links: [
            { href: '/', label: 'About us' },
            { href: '/', label: 'Careers' },
            { href: '/', label: 'Contact us' },
            { href: '/', label: 'Privacy policy' },
          ],
        },
        {
          title: 'Services',
          links: [
            { href: '/', label: 'Web Development' },
            { href: '/', label: 'Mobile Development' },
            { href: '/', label: 'UI/UX Design' },
            { href: '/', label: 'Cloud Solutions' },
          ],
        },
      ]
    }
    render(<Footer {...props}/>);
  });
});
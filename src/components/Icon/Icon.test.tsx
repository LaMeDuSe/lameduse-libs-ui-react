import React from "react";
import { render } from "@testing-library/react";

import { describe, test } from 'vitest';


import Icon from "./Icon";

describe("Icon", () => {
  test("renders the TWITTER icon", () => {
    render(<Icon icon="TWITTER" />);
  });
  test("renders the LINKEDIN icon", () => {
    render(<Icon icon="LINKEDIN" />);
  });
  test("renders the DISCORD icon", () => {
    render(<Icon icon="DISCORD" />);
  });
  test("renders the GITHUB icon", () => {
    render(<Icon icon="GITHUB" />);
  });
  test("renders the MAILBOX icon", () => {
    render(<Icon icon="MAILBOX" />);
  });
  test("renders the CHECK icon", () => {
    render(<Icon icon="CHECK" />);
  });
  test("renders the OUTBOX icon", () => {
    render(<Icon icon="OUTBOX" />);
  });
  test("renders the INBOX icon", () => {
    render(<Icon icon="INBOX" />);
  });
  test("renders the WARNING icon", () => {
    render(<Icon icon="WARNING" />);
  });
  test("renders the CROSSMARK icon", () => {
    render(<Icon icon="CROSSMARK" />);
  });
  test("renders the BOX icon", () => {
    render(<Icon icon="BOX" />);
  });
  test("renders the LAMEDUSE icon", () => {
    render(<Icon icon="LAMEDUSE" />);
  });
  test("renders the IDENTITY CARD icon", () => {
    render(<Icon icon="IDENTITY CARD" />);
  });
});
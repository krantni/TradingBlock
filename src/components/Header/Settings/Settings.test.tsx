import * as React from "react";
import Settings from ".";
import { render } from "@testing-library/react";

describe("Settings", () => {
  it("renders", () => {
    const header = render(<Settings />);
    expect(header.container.firstElementChild?.getElementsByClassName("gear")).toBeTruthy();
  });
});

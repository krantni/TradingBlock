import * as React from "react";
import Header from ".";
import { render, screen } from "@testing-library/react";
import Provider from "provider/Provider";

describe("Header", () => {
  it("renders", () => {
    const header = render(
      <Provider>
        <Header />
      </Provider>
    );
    expect(header.getByText("The Trading Block")).toBeTruthy();
  });
});

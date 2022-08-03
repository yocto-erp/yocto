import { render } from "@testing-library/react";

import FormControl from "./form-control";

describe("FormControl", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<FormControl />);
    expect(baseElement).toBeTruthy();
  });
});

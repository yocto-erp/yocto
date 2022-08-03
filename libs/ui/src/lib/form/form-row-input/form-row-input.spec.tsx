import { render } from "@testing-library/react";

import FormRowInput from "./form-row-input";

describe("FormRowInput", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<FormRowInput />);
    expect(baseElement).toBeTruthy();
  });
});

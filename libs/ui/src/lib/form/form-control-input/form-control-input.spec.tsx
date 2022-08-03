import { render } from "@testing-library/react";

import FormControlInput from "./form-control-input";

describe("FormControlInput", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<FormControlInput />);
    expect(baseElement).toBeTruthy();
  });
});

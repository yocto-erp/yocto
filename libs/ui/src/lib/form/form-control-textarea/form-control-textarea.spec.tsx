import { render } from "@testing-library/react";

import FormControlTextarea from "./form-control-textarea";

describe("FormControlTextarea", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<FormControlTextarea />);
    expect(baseElement).toBeTruthy();
  });
});

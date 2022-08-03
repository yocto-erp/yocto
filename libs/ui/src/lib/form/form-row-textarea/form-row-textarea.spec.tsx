import { render } from "@testing-library/react";

import FormRowTextarea from "./form-row-textarea";

describe("FormRowTextarea", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<FormRowTextarea />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from "@testing-library/react";

import FormError from "./form-error";

describe("FormError", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<FormError />);
    expect(baseElement).toBeTruthy();
  });
});

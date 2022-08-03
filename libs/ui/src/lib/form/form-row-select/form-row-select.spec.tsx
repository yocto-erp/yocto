import { render } from "@testing-library/react";

import FormRowSelect from "./form-row-select";

describe("FormRowSelect", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<FormRowSelect />);
    expect(baseElement).toBeTruthy();
  });
});

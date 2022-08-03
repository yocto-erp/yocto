import { render } from "@testing-library/react";

import FormControlSelect from "./form-control-select";

describe("FormControlSelect", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<FormControlSelect />);
    expect(baseElement).toBeTruthy();
  });
});

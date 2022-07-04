import { render } from "@testing-library/react";

import BtnCreate from "./btn-create";

describe("BtnCreate", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<BtnCreate />);
    expect(baseElement).toBeTruthy();
  });
});

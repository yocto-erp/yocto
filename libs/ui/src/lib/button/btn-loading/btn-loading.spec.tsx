import { render } from "@testing-library/react";

import BtnLoading from "./btn-loading";

describe("BtnLoading", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<BtnLoading />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from "@testing-library/react";

import FormRow from "./form-row";

describe("FormRow", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <FormRow label="Label">
        <input type="text" className="form-control" />
      </FormRow>
    );
    expect(baseElement).toBeTruthy();
  });
});

import {render} from "@testing-library/react";

import FormRowInput from "./form-row-input";

describe("FormRowInput", () => {
  it("should render successfully", () => {
    const {baseElement} = render(<FormRowInput label={"abc"} name={"test"}/>);
    expect(baseElement).toBeTruthy();
  });
});

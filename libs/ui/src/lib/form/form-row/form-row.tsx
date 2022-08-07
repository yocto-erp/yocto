import { hasText } from "../../util";
import clsx from "clsx";
import {FORM_ROW_SIZE, FormRowProps} from "../constants";

export function FormRow({
  htmlFor,
  labelCol = 3,
  valueCol = 9,
  label,
  children,
  required,
  size = FORM_ROW_SIZE.MEDIUM
}: FormRowProps) {
  let els;
  if (hasText(label)) {
    els = (
      <>
        <label
          className={`col-sm-${labelCol} col-form-label col-form-label-${size}`}
          htmlFor={htmlFor}
        >
          {label} {required ? <span className={clsx("required")}></span> : ""}
        </label>
        <div className={`col-sm-${valueCol}`}>{children}</div>
      </>
    );
  } else {
    els = children;
  }
  return <div className="row align-items-center mb-3">{els}</div>;
}

export default FormRow;

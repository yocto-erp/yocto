import styles from "./form-row.module.scss";
import { hasText } from "../../util/string.util";
import clsx from "clsx";

/* eslint-disable-next-line */
export interface FormRowProps {
  labelCol?: number;
  valueCol?: number;
  label: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  children?: React.ReactNode;
}

export function FormRow({
  htmlFor,
  labelCol = 3,
  valueCol = 9,
  label,
  children,
  required,
}: FormRowProps) {
  let els;
  if (hasText(label)) {
    els = (
      <>
        <label
          className={`col-sm-${labelCol} col-form-label fs-6 fw-bolder text-dark`}
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

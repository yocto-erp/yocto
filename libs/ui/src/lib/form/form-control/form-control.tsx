import { hasText } from "../../util";
import clsx from "clsx";
import { FormControlProps } from "../constants";

export function FormControl(props: FormControlProps) {
  return (
    <div className={clsx(props.className)}>
      {hasText(props.label) && (
        <label htmlFor={props.htmlFor} className="form-label">
          {props.label}{" "}
          {props.required && <span className="text-danger">*</span>}
        </label>
      )}
      {props.children}
    </div>
  );
}

export default FormControl;

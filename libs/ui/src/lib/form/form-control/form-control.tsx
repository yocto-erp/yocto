import { hasText } from "../../util";
import clsx from "clsx";
import { FORM_ROW_SIZE, FormControlProps } from "../constants";

export function FormControl(props: FormControlProps) {
  return (
    <div className={clsx(props.className)}>
      {hasText(props.label) && (
        <label
          htmlFor={props.htmlFor}
          className={clsx("form-label", props.labelClass, {
            "col-form-label-sm": props.size === FORM_ROW_SIZE.SMALL,
            "col-form-label-lg": props.size === FORM_ROW_SIZE.LARGE,
          })}
        >
          {props.label}{" "}
          {props.required && <span className="text-danger">*</span>}
        </label>
      )}
      {props.children}
    </div>
  );
}

export default FormControl;

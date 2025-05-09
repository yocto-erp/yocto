import clsx from "clsx";
import { hasText } from "../../util";
import FormControl from "../form-control/form-control";
import {FORM_ROW_SIZE, FormControlSelectProps} from "../constants";
import { forwardRef } from "react";
import FormError from "../form-error/form-error";

export const FormControlSelect = forwardRef<HTMLSelectElement, FormControlSelectProps>(
  (
    { inputClass = "", size = FORM_ROW_SIZE.MEDIUM, ...props }: FormControlSelectProps,
    ref
  ) => {
    return (
      <FormControl
        label={props.label}
        className={props.className}
        required={props.required}
        size={size}
        labelClass={props.labelClass}
      >
        <select
          disabled={props.disabled}
          ref={ref}
          className={clsx("form-select", inputClass, `form-select-${size}`, {
            "is-invalid": hasText(props.error),
          })}
          onChange={props.onChange}
          name={props.name}
          onBlur={props.onBlur}
          value={props.value}
        >
          {(props.options || []).map((t) => (
            <option key={`${props.name}-${t.value}`} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {props.children}
        <FormError message={props.error} />
      </FormControl>
    );
  }
);

export default FormControlSelect;

import { forwardRef } from "react";
import {FORM_ROW_SIZE, FormRowSelectProps} from "../constants";
import { hasText } from "../../util";
import FormRow from "../form-row/form-row";
import clsx from "clsx";
import FormError from "../form-error/form-error";

export const FormRowSelect = forwardRef<HTMLSelectElement, FormRowSelectProps>(
  ({ inputClass = "", size = FORM_ROW_SIZE.MEDIUM, ...props }: FormRowSelectProps, ref) => {
    return (
      <FormRow
        label={props.label}
        required={props.required}
        htmlFor={props.htmlFor}
        labelCol={props.labelCol}
        valueCol={props.valueCol}
        size={size}
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
        <FormError message={props.error} />
      </FormRow>
    );
  }
);

export default FormRowSelect;

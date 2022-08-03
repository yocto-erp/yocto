import clsx from "clsx";
import { hasText } from "../../util";
import FormControl from "../form-control/form-control";
import { FormControlSelectProps } from "../constants";
import { forwardRef } from "react";
import FormError from "../form-error/form-error";

const FormControlSelect = forwardRef<HTMLSelectElement, FormControlSelectProps>(
  (
    { inputClass = "form-select-sm", ...props }: FormControlSelectProps,
    ref
  ) => {
    return (
      <FormControl
        label={props.label}
        className={props.className}
        required={props.required}
      >
        <select
          disabled={props.disabled}
          ref={ref}
          className={clsx("form-select", inputClass, {
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
      </FormControl>
    );
  }
);

export default FormControlSelect;

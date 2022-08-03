import { FormControlInputProps } from "../constants";
import FormControl from "../form-control/form-control";
import { forwardRef } from "react";
import { hasText } from "../../util";
import clsx from "clsx";
import FormError from "../form-error/form-error";

const FormControlInput = forwardRef<HTMLInputElement, FormControlInputProps>(
  (
    { inputClass = "form-control-sm", ...props }: FormControlInputProps,
    ref
  ) => {
    return (
      <FormControl
        label={props.label}
        className={props.className}
        required={props.required}
      >
        <input
          type={props.type}
          disabled={props.disabled}
          ref={ref}
          className={clsx("form-control", inputClass, {
            "is-invalid": hasText(props.error),
          })}
          readOnly={props.readOnly}
          onChange={props.onChange}
          name={props.name}
          onBlur={props.onBlur}
          value={props.value}
        />
        <FormError message={props.error} />
      </FormControl>
    );
  }
);

export default FormControlInput;

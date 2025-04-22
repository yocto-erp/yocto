import { FormControlInputProps } from "../constants";
import FormControl from "../form-control/form-control";
import { forwardRef } from "react";
import { hasText } from "../../util";
import clsx from "clsx";
import FormError from "../form-error/form-error";

export const FormControlInput = forwardRef<
  HTMLInputElement,
  FormControlInputProps
>(({ inputClass = "", size, ...props }: FormControlInputProps, ref) => {
  return (
    <FormControl
      label={props.label}
      className={props.className}
      required={props.required}
      size={size}
      labelClass={props.labelClass}
    >
      <input
        type={props.type}
        disabled={props.disabled}
        ref={ref}
        className={clsx("form-control", inputClass, `form-control-${size}`, {
          "is-invalid": hasText(props.error),
        })}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        onChange={props.onChange}
        name={props.name}
        onBlur={props.onBlur}
        value={props.value}
      />
      {props.children}
      <FormError message={props.error} />
    </FormControl>
  );
});

export default FormControlInput;

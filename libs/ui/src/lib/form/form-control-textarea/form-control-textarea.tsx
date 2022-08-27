import {
  forwardRef,
} from "react";
import { hasText } from "../../util";
import FormControl from "../form-control/form-control";
import clsx from "clsx";
import FormError from "../form-error/form-error";
import { FORM_ROW_SIZE, FormControlInputProps } from "../constants";

export interface FormControlTextareaProps extends FormControlInputProps {
  rows?: number;
}

export const FormControlTextarea = forwardRef<
  HTMLTextAreaElement,
  FormControlTextareaProps
>(
  (
    {
      inputClass = "",
      size = FORM_ROW_SIZE.MEDIUM,
      ...props
    }: FormControlTextareaProps,
    ref
  ) => {
    return (
      <FormControl
        label={props.label}
        className={props.className}
        required={props.required}
      >
        <textarea
          rows={props.rows}
          readOnly={props.readOnly}
          disabled={props.disabled}
          placeholder={props.placeholder}
          ref={ref}
          className={clsx("form-control", inputClass, `form-control-${size}`, {
            "is-invalid": hasText(props.error),
          })}
          onChange={props.onChange}
          name={props.name}
          onBlur={props.onBlur}
          value={props.value}
        />
        {props.children}
        <FormError message={props.error} />
      </FormControl>
    );
  }
);

export default FormControlTextarea;

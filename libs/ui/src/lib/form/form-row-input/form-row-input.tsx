import { FORM_ROW_SIZE, FormRowInputProps } from "../constants";
import { forwardRef } from "react";
import clsx from "clsx";
import { hasText } from "../../util";
import FormError from "../form-error/form-error";
import FormRow from "../form-row/form-row";

export const FormRowInput = forwardRef<HTMLInputElement, FormRowInputProps>(
  (
    {
      inputClass = "",
      size = FORM_ROW_SIZE.MEDIUM,
      ...props
    }: FormRowInputProps,
    ref
  ) => {
    return (
      <FormRow
        label={props.label}
        required={props.required}
        htmlFor={props.htmlFor}
        labelCol={props.labelCol}
        valueCol={props.valueCol}
        size={size}
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
        <FormError message={props.error} />
      </FormRow>
    );
  }
);

export default FormRowInput;

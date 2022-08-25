import { forwardRef } from "react";
import { FORM_ROW_SIZE, FormRowInputProps } from "../constants";
import FormRow from "../form-row/form-row";
import clsx from "clsx";
import FormError from "../form-error/form-error";
import { hasText } from "../../util";

export interface FormRowTextareaProps extends FormRowInputProps {
  rows?: number;
}

export const FormRowTextarea = forwardRef<HTMLTextAreaElement, FormRowTextareaProps>(
  (
    {
      inputClass = "",
      size = FORM_ROW_SIZE.MEDIUM,
      ...props
    }: FormRowTextareaProps,
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
        <textarea
          rows={props.rows}
          readOnly={props.readOnly}
          disabled={props.disabled}
          ref={ref}
          placeholder={props.placeholder}
          className={clsx("form-control", inputClass, `form-control-${size}`, {
            "is-invalid": hasText(props.error),
          })}
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

export default FormRowTextarea;

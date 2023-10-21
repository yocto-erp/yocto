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
      inputGroupClass = "",
      size = FORM_ROW_SIZE.MEDIUM,
      leftAddOn,
      rightAddOn,
      ...props
    }: FormRowInputProps,
    ref
  ) => {
    const input = (
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
    );

    return (
      <FormRow
        label={props.label}
        required={props.required}
        htmlFor={props.htmlFor}
        labelCol={props.labelCol}
        valueCol={props.valueCol}
        className={props.className}
        size={size}
        rowClass={props.rowClass}
      >
        {(leftAddOn || rightAddOn) && (
          <div
            className={clsx(`input-group input-group-${size}`, inputGroupClass, {
              "is-invalid": hasText(props.error),
            })}
          >
            {leftAddOn && (
              <span className={"input-group-text"}>{leftAddOn}</span>
            )}
            {input}
            {rightAddOn && (
              <span className={"input-group-text"}>{rightAddOn}</span>
            )}
          </div>
        )}
        {!leftAddOn && !rightAddOn && input}

        {props.children}
        <FormError message={props.error} />
      </FormRow>
    );
  }
);

export default FormRowInput;

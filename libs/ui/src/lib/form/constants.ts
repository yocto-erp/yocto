import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
} from "react";

export interface FormControlProps {
  label?: React.ReactNode;
  required?: boolean;
  children?: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

export interface FormControlInputProps extends FormControlProps {
  inputClass?: string;
  type?: HTMLInputTypeAttribute | undefined;
  readOnly?: boolean | undefined;
  onChange?: ChangeEventHandler;
  onBlur?: FocusEventHandler;
  name: string;
  value?: string;
  disabled?: boolean;
  error?: string;
}

export interface RawSelect {
  value: string;
  label: string;
}

export interface FormControlSelectProps extends FormControlInputProps {
  options: Array<RawSelect>;
}

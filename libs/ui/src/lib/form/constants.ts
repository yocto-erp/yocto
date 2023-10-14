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
  size?: FORM_ROW_SIZE;
}

export interface FormControlInputProps extends FormControlProps {
  inputClass?: string;
  type?: HTMLInputTypeAttribute | undefined;
  readOnly?: boolean | undefined;
  onChange?: ChangeEventHandler;
  onBlur?: FocusEventHandler;
  placeholder?: string;
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

export interface FormRowProps {
  labelCol?: number;
  valueCol?: number;
  label: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  children?: React.ReactNode;
  size?: FORM_ROW_SIZE;
  className?: string;
  rowClass?: string
}

export enum FORM_ROW_SIZE {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
}

export interface FormRowInputProps extends FormRowProps {
  inputClass?: string;
  type?: HTMLInputTypeAttribute | undefined;
  readOnly?: boolean | undefined;
  onChange?: ChangeEventHandler;
  onBlur?: FocusEventHandler;
  name: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  error?: string;
  leftAddOn?: React.ReactNode
  rightAddOn?: React.ReactNode
}

export interface FormRowSelectProps extends FormRowInputProps {
  options: Array<RawSelect>;
}

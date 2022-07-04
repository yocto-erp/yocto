import styles from "./btn-create.module.scss";
import { ButtonHTMLAttributes, MouseEventHandler } from "react";
import clsx from "clsx";

/* eslint-disable-next-line */
export interface BtnCreateProps extends ButtonHTMLAttributes<any> {
  className?: string;
  onClick?: MouseEventHandler | undefined;
  disabled?: boolean;
  isLoading?: boolean;
}

export function BtnCreate({
  disabled,
  className = "btn-primary",
  onClick,
  children,
  isLoading,
  ...props
}: BtnCreateProps) {
  return (
    <button
      disabled={disabled || isLoading}
      {...props}
      className={clsx("btn", className)}
      onClick={onClick}
      type={props.type || "button"}
    >
      {isLoading ? (
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <i className="bi bi-plus" />
      )}{" "}
      <span>{children}</span>
    </button>
  );
}

export default BtnCreate;

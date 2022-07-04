import styles from "./btn-loading.module.scss";
import { ButtonHTMLAttributes, MouseEventHandler } from "react";
import clsx from "clsx";

/* eslint-disable-next-line */
export interface BtnLoadingProps extends ButtonHTMLAttributes<any> {
  className?: string;
  onClick?: MouseEventHandler | undefined;
  disabled?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export function BtnLoading({
  disabled,
  className = "btn-primary",
  onClick,
  children,
  isLoading,
  ...props
}: BtnLoadingProps) {
  return (
    <button
      disabled={disabled || isLoading}
      {...props}
      className={clsx("btn", className)}
      onClick={onClick}
      type={props.type || "button"}
    >
      {isLoading ? (
        <span className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </span>
      ) : props.icon}{" "}
      <span>{children}</span>
    </button>
  );
}

export default BtnLoading;

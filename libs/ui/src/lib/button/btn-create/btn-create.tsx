import styles from "./btn-create.module.scss";
import { ButtonHTMLAttributes, MouseEventHandler } from "react";
import clsx from "clsx";
import BtnLoading from "../btn-loading/btn-loading";

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
    <BtnLoading
      {...props}
      disabled={disabled}
      className={className}
      onClick={onClick}
      isLoading={isLoading}
      icon={<i className="bi bi-plus" />}
    >
      {children}
    </BtnLoading>
  );
}

export default BtnCreate;

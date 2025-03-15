import React, { useMemo } from "react";
import clsx from "clsx";
import "./Card.scss";
import { Collapse } from "react-bootstrap";
import { Props } from "./constant";

export const Card: React.FC<Props> = ({
  collapse = false,
  title,
  toolbar,
  children,
  footer,
  className,
  bodyClassName,
  headerClassName,
  onToggleCollapse,
}) => {
  const titleEls = useMemo(() => {
    if (!title) {
      return null;
    }
    if (onToggleCollapse) {
      return (
        <div
          className={clsx("card-header collapse", headerClassName, {
            "on show": !collapse,
          })}
        >
          <div className={clsx("card-title")}>
            <button
              className={clsx(" btn btn-flush btn-icon")}
              onClick={() => onToggleCollapse()}
            >
              {title}
            </button>
          </div>
          {toolbar && <div className={"card-toolbar gap-1"}>{toolbar}</div>}
        </div>
      );
    }
    return (
      <div className={clsx("card-header")}>
        <div className={clsx("card-title")}>{title}</div>
        {toolbar && <div className={"card-toolbar gap-1"}>{toolbar}</div>}
      </div>
    );
  }, [onToggleCollapse, title, toolbar, collapse, headerClassName]);
  return (
    <div className={clsx("card my-card border", className)}>
      {titleEls}
      <Collapse in={!collapse}>
        <div>
          <div className={clsx("card-body", bodyClassName)}>{children}</div>
          {footer && <div className={"card-footer"}>{footer}</div>}
        </div>
      </Collapse>
    </div>
  );
};

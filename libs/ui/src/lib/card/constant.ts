import React from "react";

export interface Props {
  collapse?: boolean
  title?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  toolbar?: React.ReactNode
  bodyClassName?: string
  headerClassName?: string
  className?: string
  onToggleCollapse?: () => void
}

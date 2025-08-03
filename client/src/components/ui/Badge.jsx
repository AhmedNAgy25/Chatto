import React from "react";
import { cn } from "../../lib/utils";

const Badge = React.forwardRef(
  (
    {
      children,
      variant = "default",
      size = "default",
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = "badge font-medium no-select";

    const variants = {
      default: "badge-primary",
      secondary: "badge-secondary",
      accent: "badge-accent",
      success: "badge-success",
      warning: "badge-warning",
      error: "badge-error",
      outline: "badge-outline",
    };

    const sizes = {
      sm: "badge-sm",
      default: "",
      lg: "badge-lg",
    };

    const classes = cn(baseClasses, variants[variant], sizes[size], className);

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;

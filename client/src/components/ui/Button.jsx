import React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  (
    {
      children,
      variant = "default",
      size = "default",
      className = "",
      disabled = false,
      loading = false,
      as: Component = "button",
      ...props
    },
    ref
  ) => {
    const baseClasses = "btn transition-all duration-200 font-medium no-select";

    const variants = {
      default: "btn-primary",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      outline: "btn-outline",
      danger: "btn-error",
      success: "btn-success",
    };

    const sizes = {
      sm: "btn-sm",
      default: "",
      lg: "btn-lg",
    };

    const classes = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      disabled && "opacity-50 cursor-not-allowed",
      className
    );

    return (
      <Component
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <div className="loading loading-spinner loading-sm mr-2" />}
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";

export default Button;

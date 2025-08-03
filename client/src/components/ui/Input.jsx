import React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      icon,
      error,
      ...props
    },
    ref
  ) => {
    const baseClasses = "input w-full transition-all duration-200";

    const variants = {
      default: "input-bordered",
      ghost: "bg-transparent border-0 focus:outline-none focus:ring-0",
      error: "input-error",
    };

    const sizes = {
      sm: "input-sm",
      default: "",
      lg: "input-lg",
    };

    const classes = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      error && "input-error",
      className
    );

    if (icon) {
      return (
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
          <input ref={ref} className={cn(classes, "pl-10")} {...props} />
        </div>
      );
    }

    return <input ref={ref} className={classes} {...props} />;
  }
);

Input.displayName = "Input";

export default Input;

import React from "react";
import { cn } from "../../lib/utils";

const Card = React.forwardRef(
  (
    {
      children,
      className = "",
      variant = "default",
      padding = "default",
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "bg-base-100 border border-base-300",
      elevated: "bg-base-100 shadow-lg",
      ghost: "bg-base-100/50 backdrop-blur-sm",
      outline: "bg-transparent border border-base-300",
    };

    const paddings = {
      none: "",
      sm: "p-3 sm:p-4",
      default: "p-4 sm:p-6",
      lg: "p-6 sm:p-8",
      xl: "p-8 sm:p-12",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg",
          variants[variant],
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;

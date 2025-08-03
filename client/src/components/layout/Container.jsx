import React from "react";
import { cn } from "../../lib/utils";

const Container = React.forwardRef(
  (
    {
      children,
      className = "",
      maxWidth = "default",
      padding = "default",
      ...props
    },
    ref
  ) => {
    const maxWidths = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      default: "max-w-6xl",
      full: "max-w-full",
    };

    const paddings = {
      none: "",
      sm: "px-2 sm:px-4",
      default: "px-3 sm:px-4",
      lg: "px-4 sm:px-6 lg:px-8",
      xl: "px-6 sm:px-8 lg:px-12",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto",
          maxWidths[maxWidth],
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

Container.displayName = "Container";

export default Container;

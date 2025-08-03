import React from "react";
import { cn } from "../../lib/utils";

const Avatar = React.forwardRef(
  (
    { src, alt, size = "default", isOnline = false, className = "", ...props },
    ref
  ) => {
    const sizes = {
      xs: "size-6",
      sm: "size-8",
      default: "size-10",
      md: "size-12",
      lg: "size-16",
      xl: "size-24",
    };

    return (
      <div
        className={cn("relative flex-shrink-0", className)}
        ref={ref}
        {...props}
      >
        <img
          src={src || "/avatar.png"}
          alt={alt}
          className={cn(
            "object-cover rounded-full border-2 border-base-300",
            sizes[size]
          )}
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white animate-pulse" />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;

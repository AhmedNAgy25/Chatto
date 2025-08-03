import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../lib/utils";

const PasswordField = React.forwardRef(
  (
    { label, error, className = "", containerClassName = "", ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={cn("form-control w-full", containerClassName)}>
        {label && (
          <label className="label">
            <span className="label-text font-medium text-sm sm:text-base">
              {label}
            </span>
          </label>
        )}
        <div className="relative w-full">
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={cn(
              "input input-bordered w-full pr-10 text-sm sm:text-base",
              error && "input-error",
              className
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        {error && (
          <label className="label">
            <span className="label-text-alt text-error">{error}</span>
          </label>
        )}
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";

export default PasswordField;

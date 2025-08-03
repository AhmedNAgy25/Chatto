import React from "react";
import { cn } from "../../lib/utils";
import Input from "../ui/Input";

const FormField = ({ label, icon, error, className = "", ...props }) => {
  return (
    <div className={cn("form-control w-full", className)}>
      {label && (
        <label className="label">
          <span className="label-text font-medium text-sm sm:text-base">
            {label}
          </span>
        </label>
      )}

      <Input
        icon={icon}
        error={error}
        className="text-sm sm:text-base w-full"
        {...props}
      />

      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default FormField;

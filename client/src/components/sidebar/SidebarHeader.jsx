import React from "react";
import { cn } from "../../lib/utils";
import { Users, X } from "lucide-react";
import Button from "../ui/Button";

const SidebarHeader = ({
  title = "Contacts",
  onlineCount = 0,
  showOnlineOnly = false,
  onToggleOnlineOnly,
  onClose,
  showCloseButton = false,
  className = "",
}) => {
  return (
    <div
      className={cn("border-b border-base-300 w-full p-4 lg:p-5", className)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium">{title}</span>
        </div>

        {showCloseButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden btn-circle btn-sm"
          >
            <X className="size-5" />
          </Button>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <label className="cursor-pointer flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => onToggleOnlineOnly?.(e.target.checked)}
            className="checkbox checkbox-sm"
          />
          <span className="text-sm">Show online only</span>
        </label>
        <span className="text-xs text-green-500 font-medium">
          ({onlineCount} online)
        </span>
      </div>
    </div>
  );
};

export default SidebarHeader;

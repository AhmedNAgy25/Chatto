import React from "react";
import { cn } from "../../lib/utils";
import Avatar from "../ui/Avatar";

const ChatHeader = ({
  user,
  isOnline = false,
  isTyping = false,
  className = "",
}) => {
  if (!user) return null;

  return (
    <div
      className={cn(
        "border-b border-base-300 p-3 sm:p-4 hidden lg:block",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar
          src={user.profilePic}
          alt={user.fullName}
          size="default"
          isOnline={isOnline}
        />
        <div className="min-w-0 flex-1">
          <div className="font-medium truncate">{user.fullName}</div>
          <div
            className={cn(
              "text-sm",
              isOnline ? "text-green-500" : "text-zinc-400"
            )}
          >
            {isTyping ? "typing..." : isOnline ? "Online" : "Offline"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;

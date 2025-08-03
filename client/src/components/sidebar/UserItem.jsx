import React from "react";
import { cn } from "../../lib/utils";
import Avatar from "../ui/Avatar";
import Badge from "../ui/Badge";
import { Circle } from "lucide-react";

const UserItem = ({
  user,
  isSelected = false,
  isOnline = false,
  unreadCount = 0,
  latestMessage,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={() => onClick(user)}
      className={cn(
        "w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors relative",
        isSelected && "bg-base-300 ring-1 ring-primary",
        className
      )}
    >
      <div className="relative flex-shrink-0">
        <Avatar
          src={user.profilePic}
          alt={user.fullName}
          size="md"
          isOnline={isOnline}
        />

        {unreadCount > 0 && (
          <Badge
            variant="error"
            size="sm"
            className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </div>

      <div className="text-left min-w-0 flex-1">
        <div className="font-medium truncate flex items-center gap-2">
          {user.fullName}
          {isOnline && (
            <Circle className="size-2 fill-green-500 text-green-500" />
          )}
        </div>

        <div className="flex items-center justify-between">
          <div
            className={cn(
              "text-sm",
              isOnline ? "text-green-500" : "text-base-content/70"
            )}
          >
            {isOnline ? "Online" : "Offline"}
          </div>

          {latestMessage && (
            <div className="text-xs text-base-content/70 truncate max-w-[80px] lg:max-w-[120px]">
              {new Date(latestMessage.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          )}
        </div>

        {latestMessage && (
          <div className="text-xs text-base-content/70 truncate mt-1">
            {latestMessage.text
              ? latestMessage.text.length > 25
                ? latestMessage.text.substring(0, 25) + "..."
                : latestMessage.text
              : latestMessage.image
              ? "📷 Image"
              : "Message"}
          </div>
        )}
      </div>
    </button>
  );
};

export default UserItem;

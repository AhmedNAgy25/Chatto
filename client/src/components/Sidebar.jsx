import { useEffect, useState, useMemo } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { SidebarHeader, UserItem } from "./sidebar";

const Sidebar = ({ onUserSelect }) => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    allMessages,
    getAllMessages,
  } = useChatStore();

  const { onlineUsers, authUser } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
    if (allMessages.length === 0) {
      getAllMessages();
    }
  }, [getUsers, getAllMessages, allMessages.length]);

  const getLatestMessage = useMemo(() => {
    return (userId) => {
      const userMessages = allMessages.filter(
        (msg) => msg.senderId === userId || msg.receiverId === userId
      );
      return userMessages.length > 0
        ? userMessages[userMessages.length - 1]
        : null;
    };
  }, [allMessages]);

  const getUnreadCount = useMemo(() => {
    return (userId) => {
      return allMessages.filter(
        (msg) =>
          msg.senderId === userId &&
          msg.receiverId === authUser._id &&
          !msg.read
      ).length;
    };
  }, [allMessages, authUser._id]);

  const sortedUsers = useMemo(() => {
    return users.sort((a, b) => {
      const aLatest = getLatestMessage(a._id);
      const bLatest = getLatestMessage(b._id);

      if (!aLatest && !bLatest) return 0;
      if (!aLatest) return 1;
      if (!bLatest) return -1;

      return new Date(bLatest.createdAt) - new Date(aLatest.createdAt);
    });
  }, [users, getLatestMessage]);

  const filteredUsers = useMemo(() => {
    return showOnlineOnly
      ? sortedUsers.filter((user) => onlineUsers.includes(user._id))
      : sortedUsers;
  }, [showOnlineOnly, sortedUsers, onlineUsers]);

  const otherOnlineUsers = useMemo(() => {
    return onlineUsers.filter((id) => id !== authUser._id);
  }, [onlineUsers, authUser._id]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    if (onUserSelect) {
      onUserSelect();
    }
  };

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-full border-r border-base-300 flex flex-col transition-all duration-200 bg-base-100 shadow-lg lg:shadow-none">
      <SidebarHeader
        onlineCount={otherOnlineUsers.length}
        showOnlineOnly={showOnlineOnly}
        onToggleOnlineOnly={setShowOnlineOnly}
        onClose={onUserSelect}
        showCloseButton={true}
      />

      <div className="overflow-y-auto w-full py-3 flex-1 custom-scrollbar touch-scroll">
        {filteredUsers.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const unreadCount = getUnreadCount(user._id);
          const latestMessage = getLatestMessage(user._id);

          return (
            <UserItem
              key={user._id}
              user={user}
              isSelected={selectedUser?._id === user._id}
              isOnline={isOnline}
              unreadCount={unreadCount}
              latestMessage={latestMessage}
              onClick={handleUserSelect}
            />
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/70 py-4">
            {showOnlineOnly ? "No online users" : "No users found"}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

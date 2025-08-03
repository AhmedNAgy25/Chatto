import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import Avatar from "../components/ui/Avatar";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const isUserOnline = selectedUser
    ? onlineUsers.includes(selectedUser._id)
    : false;

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-4 sm:pt-8 lg:pt-20 px-2 sm:px-4 h-full">
        <div className="bg-base-100 rounded-lg shadow-lg w-full max-w-7xl h-[calc(100vh-2rem)] sm:h-[calc(100vh-4rem)] lg:h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden relative">
            <div className="lg:hidden absolute top-0 left-0 right-0 z-50 bg-base-100 border-b border-base-300 px-4 py-3 mobile-header-below-navbar">
              <div className="flex items-center justify-between">
                <button
                  onClick={toggleSidebar}
                  className={`
                    btn btn-sm btn-ghost
                    transition-all duration-300 ease-in-out
                    ${
                      isSidebarOpen
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100"
                    }
                  `}
                >
                  <Menu className="size-5" />
                </button>

                {selectedUser ? (
                  <div className="flex items-center gap-3 flex-1 justify-center">
                    <Avatar
                      src={selectedUser.profilePic}
                      alt={selectedUser.fullName}
                      size="sm"
                      isOnline={isUserOnline}
                    />
                    <div className="min-w-0 text-center">
                      <div className="font-medium truncate text-sm">
                        {selectedUser.fullName}
                      </div>
                      <div
                        className={`text-xs ${
                          isUserOnline ? "text-green-500" : "text-zinc-400"
                        }`}
                      >
                        {isUserOnline ? "Online" : "Offline"}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 text-center">
                    <div className="font-medium text-sm text-base-content/70">
                      Select a chat
                    </div>
                  </div>
                )}

                <div className="w-10"></div>
              </div>
            </div>

            <div
              className={`
                fixed lg:relative inset-y-0 left-0 z-[60]
                w-80 lg:w-72
                transform transition-transform duration-300 ease-in-out
                ${
                  isSidebarOpen
                    ? "translate-x-0"
                    : "-translate-x-full lg:translate-x-0"
                }
              `}
            >
              <Sidebar onUserSelect={closeSidebar} />
            </div>

            {isSidebarOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black/50 z-30"
                onClick={closeSidebar}
              />
            )}

            <div className="flex-1 relative min-w-0">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import MessageSkeleton from "./skeleton/MessageSkeleton";

function ChatContainer() {
  const {
    selectedUser,
    messages,
    getMessages,
    sendMessage,
    isMessagesLoading,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedUser) return;

    try {
      await sendMessage({ text: messageText }, selectedUser._id);
      setMessageText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="border-b border-base-300 p-4">
          <div className="flex items-center gap-3">
            <img
              src={selectedUser?.profilePic || "/avatar.png"}
              alt={selectedUser?.fullName}
              className="size-10 object-cover rounded-full"
            />
            <div>
              <div className="font-medium">{selectedUser?.fullName}</div>
              <div className="text-sm text-zinc-400">Online</div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-4">
          <MessageSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="border-b border-base-300 p-4">
        <div className="flex items-center gap-3">
          <img
            src={selectedUser?.profilePic || "/avatar.png"}
            alt={selectedUser?.fullName}
            className="size-10 object-cover rounded-full"
          />
          <div>
            <div className="font-medium">{selectedUser?.fullName}</div>
            <div className="text-sm text-zinc-400">Online</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-zinc-500 py-8">
            No messages yet. Start a conversation!
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`flex ${
                  message.senderId === authUser._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === authUser._id
                      ? "bg-primary text-primary-content"
                      : "bg-base-300"
                  }`}
                >
                  {message.text && <p>{message.text}</p>}
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Message"
                      className="mt-2 rounded-lg max-w-full"
                    />
                  )}
                  <div className="text-xs opacity-70 mt-1">
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="border-t border-base-300 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="flex-1 input input-bordered"
          />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatContainer;

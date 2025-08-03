import React, { useEffect, useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import MessageSkeleton from "./skeleton/MessageSkeleton";
import { ChatHeader, MessageList, MessageInput } from "./chat";

function ChatContainer() {
  const {
    selectedUser,
    messages,
    getMessages,
    sendMessage,
    isMessagesLoading,
    typingUsers,
    setupMessageListeners,
    emitTyping,
    markAllMessagesAsRead,
  } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  const [isSending, setIsSending] = useState(false);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id]);

  useEffect(() => {
    const setupListeners = () => {
      setupMessageListeners();
    };
    setupListeners();
  }, []);

  useEffect(() => {
    if (selectedUser && messages.length > 0) {
      markAllMessagesAsRead(selectedUser._id);
    }
  }, [selectedUser?._id, messages.length]);

  const handleSendMessage = async (messageData) => {
    if (!selectedUser) return;

    setIsSending(true);
    try {
      await sendMessage(messageData, selectedUser._id);

      emitTyping(false);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const isUserTyping = typingUsers[selectedUser?._id];
  const isUserOnline = selectedUser
    ? onlineUsers.includes(selectedUser._id)
    : false;

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col h-full lg:pt-0 pt-20">
        <ChatHeader
          user={selectedUser}
          isOnline={isUserOnline}
          isTyping={isUserTyping}
        />
        <div className="flex-1 overflow-hidden p-3 sm:p-4">
          <MessageSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full lg:pt-0 pt-20">
      <ChatHeader
        user={selectedUser}
        isOnline={isUserOnline}
        isTyping={isUserTyping}
      />

      <div className="flex-1 overflow-hidden">
        <MessageList
          messages={messages}
          currentUserId={authUser._id}
          isLoading={isMessagesLoading}
        />
      </div>

      <MessageInput
        onSendMessage={handleSendMessage}
        isSending={isSending}
        placeholder="Type a message..."
      />
    </div>
  );
}

export default ChatContainer;

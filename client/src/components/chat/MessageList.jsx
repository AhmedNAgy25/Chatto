import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import MessageBubble from "./MessageBubble";
import MessageSkeleton from "../skeleton/MessageSkeleton";

const MessageList = ({
  messages = [],
  currentUserId,
  isLoading = false,
  className = "",
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex-1 p-3 sm:p-4">
        <MessageSkeleton />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto custom-scrollbar touch-scroll">
        <div className="text-center text-zinc-500 py-8">
          <div className="max-w-sm mx-auto">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-lg font-medium mb-2">No messages yet</h3>
            <p className="text-sm">Start a conversation!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex-1 p-3 sm:p-4 overflow-y-auto custom-scrollbar touch-scroll",
        className
      )}
    >
      <div className="space-y-3 sm:space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message._id}
            message={message}
            isOwnMessage={message.senderId === currentUserId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;

import React from "react";
import { cn } from "../../lib/utils";
import ImageModal from "../ImageModal";

const MessageBubble = ({
  message,
  isOwnMessage,
  onImageClick,
  className = "",
}) => {
  const [modalImage, setModalImage] = React.useState(null);

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
    onImageClick?.(imageUrl);
  };

  return (
    <>
      <div
        className={cn(
          "flex",
          isOwnMessage ? "justify-end" : "justify-start",
          className
        )}
      >
        <div
          className={cn(
            "max-w-[85%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 rounded-lg",
            isOwnMessage ? "bg-primary text-primary-content" : "bg-base-300"
          )}
        >
          {message.text && (
            <p className="break-words text-sm sm:text-base">{message.text}</p>
          )}

          {message.image && (
            <div className="mt-2">
              <img
                src={message.image}
                alt="Message"
                className="rounded-lg max-w-full max-h-48 sm:max-h-64 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleImageClick(message.image)}
              />
            </div>
          )}

          <div
            className={cn(
              "text-xs opacity-70 mt-1",
              isOwnMessage ? "text-primary-content/70" : "text-base-content/70"
            )}
          >
            {new Date(message.createdAt).toLocaleTimeString()}
          </div>
        </div>
      </div>

      <ImageModal imageUrl={modalImage} onClose={() => setModalImage(null)} />
    </>
  );
};

export default MessageBubble;

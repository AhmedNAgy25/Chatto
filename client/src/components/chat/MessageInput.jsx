import React, { useRef, useState } from "react";
import { Send, Image as ImageIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import Button from "../ui/Button";

const MessageInput = ({
  onSendMessage,
  isSending = false,
  placeholder = "Type a message...",
  className = "",
}) => {
  const [messageText, setMessageText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const messageInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageText.trim() && !selectedImage) return;

    const messageData = {};
    if (messageText.trim()) {
      messageData.text = messageText;
    }
    if (selectedImage) {
      messageData.image = imagePreview;
    }

    await onSendMessage(messageData);
    setMessageText("");
    removeImage();

    setTimeout(() => {
      messageInputRef.current?.focus();
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      className={cn(
        "border-t border-base-300 bg-base-50/50 backdrop-blur-sm mt-auto",
        className
      )}
    >
      <form onSubmit={handleSubmit} className="p-3 sm:p-4 ">
        <div className="flex items-end gap-2 sm:gap-3 bg-base-100 rounded-xl border border-base-300 p-2 sm:p-3 shadow-sm">
          <div className="flex-1">
            <textarea
              ref={messageInputRef}
              placeholder={placeholder}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="textarea w-full resize-none min-h-[40px] sm:min-h-[44px] max-h-32 pr-12 border-0 bg-transparent focus:outline-none focus:ring-0 placeholder:text-base-content/50 text-sm sm:text-base"
              rows={1}
              disabled={isSending}
              style={{
                minHeight: "40px",
                maxHeight: "128px",
              }}
            />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isSending}
            title="Send image"
            className="p-1.5 sm:p-2 flex-shrink-0"
          >
            <ImageIcon className="size-5 sm:size-6 text-base-content/60 group-hover:text-primary transition-colors" />
          </Button>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          <Button
            type="submit"
            size="sm"
            disabled={isSending || (!messageText.trim() && !selectedImage)}
            title="Send message"
            className="px-3 sm:px-4 min-h-[40px] sm:min-h-[44px] flex-shrink-0"
          >
            {isSending ? (
              <div className="loading loading-spinner loading-sm" />
            ) : (
              <Send className="size-4 sm:size-5" />
            )}
          </Button>
        </div>
      </form>

      {imagePreview && (
        <div className="border-t border-base-300 p-3 sm:p-4">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-24 sm:max-h-32 rounded-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-6 flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageInput;

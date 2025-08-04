import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { socketService } from "../lib/socket";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  allMessages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  typingUsers: {},

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    const currentState = get();
    if (
      currentState.selectedUser?._id === userId &&
      currentState.messages.length > 0
    ) {
      return;
    }

    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });

      set((state) => {
        const existingMessages = state.allMessages.filter(
          (msg) => !(msg.senderId === userId || msg.receiverId === userId)
        );
        return {
          allMessages: [...existingMessages, ...res.data],
        };
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  getAllMessages: async () => {
    try {
      const res = await axiosInstance.get("/messages/all");
      set({ allMessages: res.data });

      const { selectedUser } = get();
      if (selectedUser) {
        const userMessages = res.data.filter(
          (msg) =>
            (msg.senderId === selectedUser._id &&
              msg.receiverId === useAuthStore.getState().authUser._id) ||
            (msg.senderId === useAuthStore.getState().authUser._id &&
              msg.receiverId === selectedUser._id)
        );
        set({ messages: userMessages });
      }
    } catch (error) {
      console.error("Failed to get all messages:", error);
    }
  },

  refreshMessages: async () => {
    try {
      await get().getAllMessages();
      const { selectedUser } = get();
      if (selectedUser) {
        await get().getMessages(selectedUser._id);
      }
    } catch (error) {
      console.error("Failed to refresh messages:", error);
    }
  },

  setSelectedUser: (selectedUser) => {
    const currentState = get();
    if (currentState.selectedUser?._id === selectedUser._id) {
      return;
    }

    set((state) => ({
      selectedUser,
      messages:
        state.selectedUser?._id === selectedUser._id ? state.messages : [],
    }));
  },

  sendMessage: async (message, receiverId) => {
    try {
      const res = await axiosInstance.post(
        `/messages/send/${receiverId}`,
        message
      );

      set((state) => ({
        messages: [...state.messages, res.data],
        allMessages: [...state.allMessages, res.data],
      }));

      socketService.emit("send_message", {
        message: res.data,
        receiverId,
      });

      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },

  addMessage: (message) => {
    set((state) => {
      const messageExists = state.messages.some(
        (msg) => msg._id === message._id
      );
      const allMessageExists = state.allMessages.some(
        (msg) => msg._id === message._id
      );

      if (messageExists && allMessageExists) {
        return state;
      }

      return {
        messages: messageExists ? state.messages : [...state.messages, message],
        allMessages: allMessageExists
          ? state.allMessages
          : [...state.allMessages, message],
      };
    });
  },

  markMessageAsRead: async (messageId) => {
    try {
      await axiosInstance.put(`/messages/${messageId}/read`);
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === messageId ? { ...msg, read: true } : msg
        ),
        allMessages: state.allMessages.map((msg) =>
          msg._id === messageId ? { ...msg, read: true } : msg
        ),
      }));
    } catch (error) {
      console.error("Failed to mark message as read:", error);
    }
  },

  markAllMessagesAsRead: async (userId) => {
    try {
      await axiosInstance.put(`/messages/${userId}/read-all`);
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.senderId === userId ? { ...msg, read: true } : msg
        ),
        allMessages: state.allMessages.map((msg) =>
          msg.senderId === userId ? { ...msg, read: true } : msg
        ),
      }));
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
    }
  },

  setTypingUser: (userId, isTyping) => {
    set((state) => ({
      typingUsers: {
        ...state.typingUsers,
        [userId]: isTyping,
      },
    }));
  },

  setupMessageListeners: () => {
    socketService.off("new_message");
    socketService.off("user_typing");
    socketService.off("user_stop_typing");
    socketService.off("connect");

    socketService.on("new_message", (data) => {
      const { message, senderId, receiverId } = data;
      const { authUser } = useAuthStore.getState();
      const { selectedUser } = get();

      if (senderId === authUser._id || receiverId === authUser._id) {
        set((state) => {
          const messageExists = state.allMessages.some(
            (msg) => msg._id === message._id
          );
          if (messageExists) {
            return state;
          }

          const newAllMessages = [...state.allMessages, message];

          let newMessages = state.messages;
          if (
            selectedUser &&
            (senderId === selectedUser._id || receiverId === selectedUser._id)
          ) {
            newMessages = [...state.messages, message];
          }

          return {
            messages: newMessages,
            allMessages: newAllMessages,
          };
        });
      }
    });

    socketService.on("user_typing", (data) => {
      get().setTypingUser(data.userId, true);
    });

    socketService.on("user_stop_typing", (data) => {
      get().setTypingUser(data.userId, false);
    });

    socketService.on("connect", () => {
      console.log("Socket connected, refreshing messages...");
      get().refreshMessages();
    });
  },

  emitTyping: (isTyping) => {
    const { selectedUser } = get();
    if (selectedUser) {
      socketService.emit(isTyping ? "typing_start" : "typing_stop", {
        userId: selectedUser._id,
      });
    }
  },
}));

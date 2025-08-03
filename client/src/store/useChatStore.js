import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

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
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  setSelectedUser: (selectedUser) => {
    set({ selectedUser, messages: [] }); // Clear messages when selecting a new user
  },
  sendMessage: async (message, receiverId) => {
    try {
      const res = await axiosInstance.post(
        `/messages/send/${receiverId}`,
        message
      );
      // Add the new message to the messages array
      set((state) => ({
        messages: [...state.messages, res.data],
      }));
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
}));

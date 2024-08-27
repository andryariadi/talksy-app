import { create } from "zustand";

const useConversationStore = create((set) => ({
  selectedConversation: null,
  messages: [],

  setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),

  setMessages: (messages) => set({ messages }),
}));

export default useConversationStore;

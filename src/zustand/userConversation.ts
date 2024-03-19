import { create } from "zustand";

interface ConversationState {
  selectedConversation: string | null;
  messages: string[];
  setSelectedConversation: (selectedConversation: string | null) => void;
  setMessages: (messages: string[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  messages: [],
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;

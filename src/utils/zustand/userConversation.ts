import { create } from "zustand";
import { IMessage, IUser } from "../interface/interface";

interface ConversationState {
  selectedConversation: IUser | null;
  messages: IMessage[];
  setSelectedConversation: (selectedConversation: IUser | null) => void;
  setMessages: (messages: IMessage[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  messages: [],
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;

import { create } from "zustand";
import { IMessage, IRecruiter, IUser } from "../interface/interface";

interface ConversationState {
  selectedConversation: IUser | null|IRecruiter
  messages: IMessage[];
  setSelectedConversation: (selectedConversation: IUser|IRecruiter | null) => void;
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

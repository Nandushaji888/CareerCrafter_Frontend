import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useConversation from "../zustand/userConversation";

// interface SendMessageResult {
//   loading: boolean;
//   sendMessage: (message: string) => void;
// }

const useSendMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const messageUrl = 'http://localhost:4005/api/messages';

  const sendMessage = async (message: string): Promise<void> => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${messageUrl}/send/${selectedConversation?._id}`,
        {
          message,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
      // console.log(messages);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;

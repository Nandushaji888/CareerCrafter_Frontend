import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import useConversation from '../zustand/userConversation';
import { IMessage } from '../interface/interface';

interface GetMessagesResult {
  messages: IMessage[];
  loading: boolean;
}

const useGetMessages = (): GetMessagesResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const { messages, setMessages, selectedConversation }= useConversation();
  const messageUrl = 'http://localhost:4005/api/messages';

  useEffect(() => {
    
    const getMessages = async (): Promise<void> => {
      
      setLoading(true);
      try {
        const response = await axios.get(`${messageUrl}/${selectedConversation?._id}`,{withCredentials:true});
        const data = response.data;
        console.log('response');
        console.log(response);
        
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;

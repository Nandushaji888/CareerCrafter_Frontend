import React, { useEffect, useRef, useState } from "react";
import Message from './Message'
import useGetMessages from "../../../utils/hooks/useGetMessages";
import MessageSkeleton from "../skeltons/MessageSkelton";
import useListenMessages from "../../../utils/hooks/useListenMessages";
import toast from "react-hot-toast";
import axios from "axios";
import useConversation from "../../../utils/zustand/userConversation";
import {  useParams } from "react-router-dom";

const Messages = () => {

  // const { loading, messages } = useGetMessages()
  const [loading, setLoading] = useState<boolean>(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const messageUrl = 'http://localhost:4005/api/messages';
  const { id } = useParams()
  useEffect(() => {
    const getMessages = async (): Promise<void> => {

      setLoading(true);
      try {
        const response = await axios.get(`${messageUrl}/${id}`, { withCredentials: true });
        const data = response.data;
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
    getMessages();
    

  }, [id]);


  useListenMessages()

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages,id]);
  return (
    <div className="px-4 flex-1 overflow-auto ">
      {
        !loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div key={message?._id || index} ref={index === messages.length - 1 ? lastMessageRef : null}>

            <Message message={message} />
          </div>
        ))
      }

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}

    </div>
  );
};

export default Messages;
